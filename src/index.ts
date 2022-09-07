import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IBlocklyRegistry } from 'jupyterlab-blockly';
// import { BlocklyNiryo } from './niryo_one_python_generators';
import SigBlock from './custom';

/**
 * Initialization data for the jupyterlab-niryo-one extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-niryo-one:plugin',
  autoStart: true,
  requires: [IBlocklyRegistry],
  activate: (app: JupyterFrontEnd, blockly: IBlocklyRegistry) => {
    console.log('JupyterLab extension sigtest is activated!');
    // blockly.registerBlocks('niryo', BlocklyNiryo.Blocks);
    blockly.registerGenerator('sigtech', SigBlock.Generator);
    blockly.registerToolbox('sigtech', SigBlock.Toolbox);
  }
};

export default plugin;
