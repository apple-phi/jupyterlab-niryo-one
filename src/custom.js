import * as Blockly from 'blockly';
import DEFAULT_BLOCK_CATEGORIES from './default_blocks';
// import 'blockly/python';
/*
 *  Blocks definition
 */
Blockly.Blocks['test_block'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
      'BLEH'
    );
    this.appendDummyInput();
  }
  // toplevel_init: 'woah'
};

Blockly.Python['test_block'] = function (block) {
  return 'sus';
};

// Creating a toolbox containing all the main (default) blocks
// and adding the niryo categories.
const TOOLBOX_NIRYO = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Test',
      colour: '210',
      contents: [
        {
          kind: 'block',
          type: 'test_block'
        }
        // {
        //   kind: 'block',
        //   type: 'string_length'
        // }
        // {
        //   kind: 'block',
        //   type: 'niryo_one_connect'
        // }
      ]
    },
    ...DEFAULT_BLOCK_CATEGORIES
  ]
};
const BlocklyNiryo = {
  Blocks: Blockly.Blocks,
  Generator: Blockly.Python,
  Toolbox: TOOLBOX_NIRYO
};

export default BlocklyNiryo;
