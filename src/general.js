import * as Blockly from 'blockly';
import { ListLikeObject } from './multi_item';
import { Generic, join_args } from './pandas_helpers';


const libraries = {
  numpy: 'numpy np',
  pandas: 'pandas pd',
  pyplot: 'matplotlib.pyplot plt',
  datetime: 'datetime dtm'
};
const options = Object.keys(libraries).map(x => [x, x]);
options.push(['all', 'all']);

Blockly.Blocks['install'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Install')
      .appendField(new Blockly.FieldDropdown(options), 'choice');
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['install'] = function (block) {
  if (block.getFieldValue('choice') == 'all') {
    code = '!pip install ';
    for (key in libraries) {
      code += ' ' + libraries[key].split(" ")[0].split('.')[0];
    }
    return code;
  } else {
    return (
      '!pip install ' +
      libraries[block.getFieldValue('choice')].split(" ")[0].split('.')[0]
    );
  }
};

Blockly.Blocks['import'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Import')
      .appendField(new Blockly.FieldDropdown(options), 'choice');
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['import'] = function (block) {
  if (block.getFieldValue('choice') == 'all') {
    var code = '';
    for (key in libraries) {
      const [a, b] = libraries[key].split(" ");
      code += `import ${a} as ${b}\n`;
    }
    return code;
  } else {
    return `import ${libraries[block.getFieldValue('choice')].replace(' ',' as ')}\n`;
  }
};

Blockly.Blocks['exec'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Exec')
      .appendField(new Blockly.FieldTextInput('print("hi")'), 'CODE');
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Python['exec'] = function (block) {
  return block.getFieldValue('CODE');
};

Blockly.Blocks['link'] = {
  init: function () {
    this.appendDummyInput().appendField('Link');
    this.appendValueInput('NAME1').setCheck(null);
    this.appendDummyInput().appendField('to');
    this.appendValueInput('NAME2').setCheck(null);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.Python['link'] = function (block) {
  var v_1 = Blockly.Python.valueToCode(
    block,
    'NAME1',
    Blockly.Python.ORDER_ATOMIC
  );
  var v_2 = Blockly.Python.valueToCode(
    block,
    'NAME2',
    Blockly.Python.ORDER_ATOMIC
  );

  var code = v_1 + ':' + v_2;

  return [code, Blockly.Python.ORDER_ATOMIC];
};







const GENERAL_BLOCK_CATEGORIES = [
  {
    kind: 'SEP'
  },
  {
    kind: 'category',
    name: 'Misc',
    colour: '210',
    contents: [
      { kind: 'block', type: 'install' },
      { kind: 'block', type: 'import' },
      { kind: 'block', type: 'exec' },
      { kind: 'block', type: 'link' },
      new ListLikeObject('set','set',array=>'{'+array.join(',')+'}').content,
      new ListLikeObject('dict','dict',array=>'{'+array.join(',')+'}').content,
      new ListLikeObject('index','index',array=>'['+array.join(',')+']').content,
      //new Generic((obj, fields)=>obj+'['+join_args(fields)+']','index','index',).content,
    ]
  },
  {
    kind: 'SEP'
  }
];

export default GENERAL_BLOCK_CATEGORIES;
