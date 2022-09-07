import * as Blockly from 'blockly';
import { PandasObject, PandasColors } from './pandas_helpers';

const PANDAS_BLOCK_CATEGORIES = [
  {
    kind: 'SEP'
  },
  {
    kind: 'category',
    name: 'Pandas',
    colour: '210',
    contents: [
      new PandasObject(
        'pd_series',
        'Series',
        'pd.Series',
        ['data', 'index', 'dtype', 'name', 'copy'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.Series.html'
      ).content,
      new PandasObject(
        'pd_date_range',
        'Date Range',
        'pd.date_range',
        [
          'start',
          'end',
          'periods',
          'freq',
          'tz',
          'normalize',
          'name',
          'inclusive'
        ],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.date_range.html'
      ).content,
      new PandasObject(
        'pd_dataframe',
        'Data Frame',
        'pd.DataFrame',
        ['data', 'index', 'columns', 'dtype', 'copy'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html'
      ).content,
      new PandasObject(
        'df_dropna',
        'DF Drop NaN',
        'pd.DataFrame.dropna',
        ['self', 'axis', 'how', 'thresh', 'subset', 'inplace'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dropna.html',
        PandasColors.FUNC
      ).content,
      new PandasObject(
        'df_t',
        'DF Transpose',
        'pd.DataFrame.transpose',
        ['self', 'copy'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.transpose.html',
        PandasColors.FUNC
      ).content,
      new PandasObject(
        'df_cumsum',
        'DF CumSum',
        'pd.DataFrame.cumsum',
        ['self', 'axis', 'skipna'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.transpose.html',
        PandasColors.FUNC
      ).content
    ]
  },
  {
    kind: 'SEP'
  }
];

export default PANDAS_BLOCK_CATEGORIES;
