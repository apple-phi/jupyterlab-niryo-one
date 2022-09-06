import * as Blockly from 'blockly';
import { PandasObject } from './pandas_helpers';

const PANDAS_BLOCK_CATEGORIES = [
  {
    kind: 'SEP'
  },
  {
    kind: 'category',
    name: 'Pandas',
    colour: '210',
    contents: [
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
