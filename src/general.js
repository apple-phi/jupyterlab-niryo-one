import * as Blockly from 'blockly';
import { ListLikeObject, DictLikeObject } from './multi_item';
import { Generic, join_args } from './block-helpers';

const libraries = {
  numpy: 'numpy np',
  pandas: 'pandas pd',
  pyplot: 'matplotlib.pyplot plt',
  datetime: 'datetime dtm',
  sigtech: 'sigtech.framework sig;sig.init();'
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
    for (const key in libraries) {
      code += ' ' + libraries[key].split(' ')[0].split('.')[0];
    }
    return code;
  } else {
    return (
      '!pip install ' +
      libraries[block.getFieldValue('choice')].split(' ')[0].split('.')[0]
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
    for (const key in libraries) {
      const [a, b] = libraries[key].split(' ');
      code += `import ${a} as ${b}\n`;
    }
    return code;
  } else {
    return `import ${libraries[block.getFieldValue('choice')].replace(
      ' ',
      ' as '
    )}\n`;
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

// Blockly.Blocks['link'] = {
//   init: function () {
//     this.appendDummyInput().appendField('Link');
//     this.appendValueInput('NAME1').setCheck(null);
//     this.appendDummyInput().appendField('to');
//     this.appendValueInput('NAME2').setCheck(null);
//     this.setOutput(true, null);
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   }
// };
// Blockly.Python['link'] = function (block) {
//   var v_1 = Blockly.Python.valueToCode(
//     block,
//     'NAME1',
//     Blockly.Python.ORDER_ATOMIC
//   );
//   var v_2 = Blockly.Python.valueToCode(
//     block,
//     'NAME2',
//     Blockly.Python.ORDER_ATOMIC
//   );

//   var code = v_1 + ':' + v_2;

//   return [code, Blockly.Python.ORDER_ATOMIC];
// };

Blockly.Blocks['set_val'] = {
  init: function () {
    this.appendDummyInput().appendField('Set');
    this.appendValueInput('NAME1').setCheck(null);
    this.appendDummyInput().appendField('to');
    this.appendValueInput('NAME2').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.Python['set_val'] = function (block) {
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

  var code = v_1 + '=' + v_2;

  return code;
};

Blockly.Blocks['get_index'] = {
  init: function () {
    this.appendValueInput('NAME1').setCheck(null);
    this.appendDummyInput().appendField('index');
    this.appendValueInput('NAME2').setCheck(null);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
Blockly.Python['get_index'] = function (block) {
  var v_1 = Blockly.Python.valueToCode(
    block,
    'NAME1',
    Blockly.Python.ORDER_ATOMIC
  );
  //TODO: work with int
  var v_2 = Blockly.Python.valueToCode(
    block,
    'NAME2',
    Blockly.Python.ORDER_ATOMIC
  );

  var code = v_1 + '[' + v_2 + ']';

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['slice'] = {
  init: function () {
    this.appendDummyInput().appendField('Slice');
    this.appendValueInput('start').setCheck(null);
    this.appendDummyInput().appendField(':');
    this.appendValueInput('stop').setCheck(null);
    this.appendDummyInput().appendField(':');
    this.appendValueInput('step').setCheck(null);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(
      'https://stackoverflow.com/questions/509211/understanding-slicing'
    );
  }
};
Blockly.Python['slice'] = function (block) {
  var value_start = Blockly.Python.valueToCode(
    block,
    'start',
    Blockly.Python.ORDER_ATOMIC
  );
  var value_stop = Blockly.Python.valueToCode(
    block,
    'stop',
    Blockly.Python.ORDER_ATOMIC
  );
  var value_step = Blockly.Python.valueToCode(
    block,
    'step',
    Blockly.Python.ORDER_ATOMIC
  );
  var code = `slice(${value_start || 'None'}, ${value_stop || 'None'}, ${
    value_step || 'None'
  })`;
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

const GENERAL_BLOCK_CATEGORIES = [
  {
    kind: 'category',
    name: 'General',
    colour: '210',
    contents: [
      { kind: 'block', type: 'install' },
      { kind: 'block', type: 'import' },
      { kind: 'block', type: 'exec' },
      { kind: 'block', type: 'set_val' },
      { kind: 'block', type: 'get_index' },
      { kind: 'block', type: 'slice' },
      // { kind: 'block', type: 'link' },
      new ListLikeObject('set', 'set', (_,array) => '{' + join_args(block,array) + '}')
        .content,
      new DictLikeObject('dict', 'dict', (_,array) => '{' + array.map(([a,b])=>`${a}:${b}`).join(',') + '}')
        .content,
      new ListLikeObject('index', 'index', (block,array) => '[' + join_args(block,array) + ']')
        .content
      //new Generic((obj, fields)=>obj+'['+join_args(fields)+']','index','index',).content,
    ]
  }
];

export default GENERAL_BLOCK_CATEGORIES;
