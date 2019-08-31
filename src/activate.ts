import {
	ILayoutRestorer,
	JupyterFrontEnd
} from '@jupyterlab/application';

import {
	ICommandPalette,
	MainAreaWidget,
	WidgetTracker
} from '@jupyterlab/apputils';

import {
	APODWidget
} from './apod_widget';

/**
* Activate the APOD widget extension.
*/
export function activate( app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer ) {
	console.log( 'JupyterLab extension jupyterlab_apod is activated!' );

	let widget: MainAreaWidget<APODWidget>;
	
	// Add an application command:
	const command: string = 'apod:open';
	app.commands.addCommand( command, {
		'label': 'Random Astronomy Picture',
		'execute': function execute() {
			if ( !widget ) {
				// Create a widget:
				const content = new APODWidget();
				const widget = new MainAreaWidget({
					'content': content
				});
				widget.id = 'apod-jupyterlab';
				widget.title.label = 'Astronomy Picture';
				widget.title.closable = true;
			}
			if ( !tracker.has( widget ) ) {
				// Track the state of the widget for later restoration:
				tracker.add( widget );
			}
			if ( !widget.isAttached ) {
				// Attach the widget to the main work area:
				app.shell.add( widget, 'main' );
			}
			// Refresh the picture in the widget:
			widget.content.update();
			
			// Activate the widget:
			app.shell.activateById( widget.id );
		}
	});

	// Add the command to the palette:
	palette.addItem({
		'command': command,
		'category': 'Tutorial'
	});

	// Track and restore the widget state:
	let tracker = new WidgetTracker<MainAreaWidget<APODWidget>>({
		'namespace': 'apod'
	});

	restorer.restore( tracker, {
		'command': command,
		'name': function name() {
			return 'apod';
		}
	});
}