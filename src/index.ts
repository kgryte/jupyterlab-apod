import {
	ILayoutRestorer,
	JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
	ICommandPalette
} from '@jupyterlab/apputils';

import {
	activate
} from './activate';

/**
 * Initialization data for the jupyterlab_apod extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
	'id': 'jupyterlab_apod',
	'autoStart': true,
	'requires': [ ICommandPalette, ILayoutRestorer ],
	'activate': activate
};

export default extension;
