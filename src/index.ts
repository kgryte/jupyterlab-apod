import {
	JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
	ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';

import {
	Widget
} from '@phosphor/widgets';

interface APODResponse {
	copyright: string;
	date: string;
	explanation: string;
	media_type: 'video' | 'image';
	title: string;
	url: string;
};

function randomDate() {
	const start = ( new Date( 2010, 1, 1 ) ).getTime();
	const end = ( new Date() ).getTime();
	const d = new Date( start + (Math.random()*(end-start)) );
	return d.toISOString().slice( 0, 10 );
}

/**
 * Initialization data for the jupyterlab_apod extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
	'id': 'jupyterlab_apod',
	'autoStart': true,
	'requires': [ ICommandPalette ],
	'activate': async function( app: JupyterFrontEnd, palette: ICommandPalette ) {
		console.log('JupyterLab extension jupyterlab_apod is activated!');

		// Create a blank content widget inside of a MainAreaWidget:
		const content = new Widget();
		const widget = new MainAreaWidget({
			'content': content
		});
		widget.id = 'apod-jupyterlab';
		widget.title.label = 'Astronomy Picture';
		widget.title.closable = true;

		// Add an image element to the content:
		let img = document.createElement( 'img' );
		content.node.appendChild( img );

		// Get a random date string in YYYY-MM-DD format:
		const date = randomDate();

		// Fetch info about a random picture:
		const response = await fetch( `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}` );
		const data = await response.json() as APODResponse;

		if ( data.media_type === 'image' ) {
			// Populate the image:
			img.src = data.url;
			img.title = data.title;
		} else {
			console.log( 'Random APOD was not a picture.' );
		}

		// Add an application command:
		const command: string = 'apod:open';
		app.commands.addCommand( command, {
			'label': 'Random Astronomy Picture',
			'execute': function() {
				if ( !widget.isAttached ) {
					// Attach the widget to the main work area if it's not there:
					app.shell.add( widget, 'main' );
				}
				// Activate the widget:
				app.shell.activateById( widget.id );
			}
		});

		// Add the command to the palette:
		palette.addItem({
			'command': command,
			'category': 'Tutorial'
		});
	}
};

export default extension;
