import * as Blockly from 'blockly';
import { PandasObject } from './pandas_helpers';

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
      new PandasObject('pd_series2', 'Series', 'pd.Series', ['data', 'name'])
        .content,
      new PandasObject('pd_date_range', 'Date Range', 'pd.date_range', [
        'start',
        'end',
        'periods',
        'tz',
        'normalize',
        'name'
      ]).content
    ]
  },
  {
    kind: 'SEP'
  }
];

export default PANDAS_BLOCK_CATEGORIES;
