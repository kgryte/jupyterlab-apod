import {
	JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
	ICommandPalette, MainAreaWidget
} from '@jupyterlab/apputils';

import {
	Widget
} from '@phosphor/widgets';

/**
 * Initialization data for the jupyterlab_apod extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
	'id': 'jupyterlab_apod',
	'autoStart': true,
	'requires': [ ICommandPalette ],
	'activate': function( app: JupyterFrontEnd, palette: ICommandPalette ) {
		console.log('JupyterLab extension jupyterlab_apod is activated!');

		// Create a blank content widget inside of a MainAreaWidget:
		const content = new Widget();
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
