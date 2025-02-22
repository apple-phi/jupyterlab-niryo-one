import * as Blockly from 'blockly';
import DEFAULT_BLOCK_CATEGORIES from './default_blocks';
import PANDAS_BLOCK_CATEGORIES from './pandas';
import NUMPY_BLOCK_CATEGORIES from './numpy';
import GENERAL_BLOCK_CATEGORIES from './general';
import DATETIME_BLOCK_CATEGORIES from './datetime';
import SIGTECH_BLOCK_CATEGORIES from './sigtech';
import MUTATOR from './mutator';

// import 'blockly/python';
/*
 *  Blocks definition
 */
Blockly.Blocks['test_block'] = {
  init: function () {
    // this.appendDummyInput().appendField(
    //   new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
    //   'BLEH'
    // );
    this.appendDummyInput();
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput('BLEH'),
      'NAME'
    );
    this.appendValueInput('start').setCheck(null);
    this.setInputsInline(false);
    this.appendDummyInput();
    this.appendDummyInput();
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setOutput(true, null);
  }
  // toplevel_init: 'woah'
};

Blockly.Python['test_block'] = function (block) {
  return 'sus', 'sussest';
};

Blockly.Blocks['sus_block'] = {
  init: function () {
    this.appendDummyInput().appendField('                   ');
    this.appendStatementInput('NAME').setCheck(null);
    this.appendDummyInput();
    this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField('sus');
    this.appendDummyInput().setAlign(Blockly.ALIGN_CENTRE).appendField('block');
    this.appendDummyInput();
    this.setInputsInline(false);
    this.setColour(0);
    this.setTooltip('sus');
    this.setHelpUrl('sus');
  }
};
Blockly.Python['sus_block'] = function (block) {
  var statements_name = Blockly.Python.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '!open https://pydis.com/.env;';
  return code;
};

// Creating a toolbox containing all the main (default) blocks
// and adding the niryo categories.
const TOOLBOX = {
  kind: 'categoryToolbox',
  contents: [
    ...GENERAL_BLOCK_CATEGORIES,
    ...SIGTECH_BLOCK_CATEGORIES,
    ...PANDAS_BLOCK_CATEGORIES,
    ...NUMPY_BLOCK_CATEGORIES,
    ...DATETIME_BLOCK_CATEGORIES,
    {
      kind: 'SEP'
    },
    {
      kind: 'category',
      name: 'Sus',
      colour: '210',
      contents: [
        {
          kind: 'block',
          type: 'test_block'
        },
        {
          kind: 'block',
          type: 'sus_block'
        },
        MUTATOR,
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
    {
      kind: 'SEP'
    },
    ...DEFAULT_BLOCK_CATEGORIES
  ]
};
const SigBlock = {
  Blocks: Blockly.Blocks,
  Generator: Blockly.Python,
  Toolbox: TOOLBOX
};

export default SigBlock;
