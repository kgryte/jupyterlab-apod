import {
	JupyterFrontEnd
} from '@jupyterlab/application';

import {
	ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';

import {
	APODWidget
} from './apod_widget';

/**
* Activate the APOD widget extension.
*/
export function activate( app: JupyterFrontEnd, palette: ICommandPalette ) {
	console.log( 'JupyterLab extension jupyterlab_apod is activated!' );

	// Create a widget:
	const content = new APODWidget();
	const widget = new MainAreaWidget({
		'content': content
	});
	widget.id = 'apod-jupyterlab';
	widget.title.label = 'Astronomy Picture';
	widget.title.closable = true;
	
	// Add an application command:
	const command: string = 'apod:open';
	app.commands.addCommand( command, {
		'label': 'Random Astronomy Picture',
		'execute': function execute() {
			if ( !widget.isAttached ) {
				// Attach the widget to the main work area if it's not there:
				app.shell.add( widget, 'main' );
			}
			// Refresh the picture in the widget
			content.update();
			
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