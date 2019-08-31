import {
	Widget
} from '@phosphor/widgets';

import {
	Message
} from '@phosphor/messaging';

import {
	randomDate
} from './random_date';

interface APODResponse {
	copyright: string;
	date: string;
	explanation: string;
	media_type: 'video' | 'image';
	title: string;
	url: string;
};

/**
* APOD widget class.
*/
export class APODWidget extends Widget {
	/**
	* Construct a new APOD widget.
	*/
	constructor() {
		super();

		this.addClass( 'my-apodWidget' );

		// Add an image element to the panel:
		this.img = document.createElement( 'img' );
		this.node.appendChild( this.img );

		// Add a summary element to the panel:
		this.summary = document.createElement( 'p' );
		this.node.appendChild( this.summary );
	}

	/**
	* The image element associated with the widget.
	*/
	readonly img: HTMLImageElement;

	/**
	* The summary text element associated with the widget.
	*/
	readonly summary: HTMLParagraphElement;

	/**
	* Handle update requests for the widget.
	*/
	async onUpdateRequest( msg: Message ): Promise<void> {
		// Get a random date string in YYYY-MM-DD format:
		const date = randomDate();

		// Fetch info about a random picture:
		while ( true ) {
			const response = await fetch( `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}` );
			if ( !response.ok ) {
				const data = await response.json();
				if ( data.error ) {
					this.summary.innerText = data.error.message;
				} else {
					this.summary.innerText = response.statusText;
				}
				break;
			}
			const data = await response.json() as APODResponse;
			if ( data.media_type === 'image' ) {
				// Populate the image:
				this.img.src = data.url;
				this.img.title = data.title;
				this.summary.innerText = data.title;
				if ( data.copyright ) {
					this.summary.innerText += ` (Copyright ${data.copyright})`;
				}
				break;
			}
			console.log( 'Random APOD fetched was not an image.' );
		}
	}
}