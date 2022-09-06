import * as Blockly from 'blockly';

Blockly.Blocks['install_pd'] = {
  init: function () {
    this.appendDummyInput().appendField('Install Pandas');
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setColour(230);
  }
};
Blockly.Python['install_pd'] = function (block) {
  return `
!pip install pandas
    `;
};

Blockly.Blocks['import_pd'] = {
  init: function () {
    this.appendDummyInput().appendField('Import Pandas');
    this.setNextStatement(true, null);
    this.setPreviousStatement(true, null);
    this.setColour(230);
  }
};
Blockly.Python['import_pd'] = function (block) {
  return `
import pandas as pd
  `;
};

Blockly.Blocks['pd_series'] = {
  init: function () {
    this.appendDummyInput().appendField('Series');
    this.appendDummyInput();
    this.appendValueInput('data')
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('data');
    this.appendValueInput('name')
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('name');
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('Function parameter should be of type Array');
    this.setHelpUrl('https://pandas.pydata.org/docs/user_guide/10min.html');
  }
};
Blockly.Python['pd_series'] = function (block) {
  var value_data = Blockly.Python.valueToCode(
    block,
    'data',
    Blockly.Python.ORDER_ATOMIC
  );
  var value_name = Blockly.Python.valueToCode(
    block,
    'name',
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  var code = `pd.Series(${value_data || 'None'}, name=${value_name || 'None'}${
    value_data ? '' : ', dtype="float64"'
  })`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['pd_date_range'] = {
  init: function () {
    this.appendDummyInput().appendField('Date Range');
    this.appendDummyInput();
    this.appendValueInput('start')
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('start');
    this.appendValueInput('end')
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('end');
    this.appendValueInput('periods')
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('periods');
    this.appendValueInput('tz')
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('timezone');
    this.appendValueInput('normalize')
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('normalize');
    this.appendValueInput('NAME')
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('name');
    this.setOutput(true, null);
    this.setColour(230);
    this.setHelpUrl(
      'https://pandas.pydata.org/docs/reference/api/pandas.date_range.html'
    );
  }
};
Blockly.Python['pd_date_range'] = function (block) {
  var value_start = Blockly.Python.valueToCode(
    block,
    'start',
    Blockly.Python.ORDER_ATOMIC
  );
  var value_end = Blockly.Python.valueToCode(
    block,
    'end',
    Blockly.Python.ORDER_ATOMIC
  );
  var value_periods = Blockly.Python.valueToCode(
    block,
    'periods',
    Blockly.Python.ORDER_ATOMIC
  );
  var value_tz = Blockly.Python.valueToCode(
    block,
    'tz',
    Blockly.Python.ORDER_ATOMIC
  );
  var value_normalize = Blockly.Python.valueToCode(
    block,
    'normalize',
    Blockly.Python.ORDER_ATOMIC
  );
  var value_name = Blockly.Python.valueToCode(
    block,
    'NAME',
    Blockly.Python.ORDER_ATOMIC
  );
  // TODO: Assemble Python into code variable.
  var code = `pd.date_range(start=${value_start || 'None'}, end=${
    value_end || 'None'
  }, periods=${value_periods || 'None'}, tz=${value_tz || 'None'}, normalize=${
    value_normalize || 'None'
  }, name=${value_name || 'None'})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

const PANDAS_BLOCK_CATEGORIES = [
  {
    kind: 'SEP'
  },
  {
    kind: 'category',
    name: 'Pandas',
    colour: '210',
    contents: [
      { kind: 'block', type: 'install_pd' },
      { kind: 'block', type: 'import_pd' },
      {
        kind: 'block',
        type: 'pd_series'
      },
      { kind: 'block', type: 'pd_date_range' }
    ]
  },
  {
    kind: 'SEP'
  }
];

export default PANDAS_BLOCK_CATEGORIES;
