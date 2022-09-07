import * as Blockly from 'blockly';
import { PandasObject, PandasColors, PandasMethod } from './pandas_helpers';

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
        'https://pandas.pydata.org/docs/reference/api/pandas.Series.html',
        PandasColors.OBJECT
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
        'https://pandas.pydata.org/docs/reference/api/pandas.date_range.html',
        PandasColors.OBJECT
      ).content,
      new PandasObject(
        'pd_dataframe',
        'Data Frame',
        'pd.DataFrame',
        ['data', 'index', 'columns', 'dtype', 'copy'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html',
        PandasColors.OBJECT
      ).content,
      new PandasMethod(
        'df_dropna',
        'DF Drop NaN',
        'dropna',
        ['self', 'axis', 'how', 'thresh', 'subset', 'inplace'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dropna.html',
        PandasColors.FUNC
      ).content,
      new PandasMethod(
        'df_t',
        'DF Transpose',
        'transpose',
        ['self', 'copy'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.transpose.html',
        PandasColors.FUNC
      ).content,
      new PandasMethod(
        'df_cumsum',
        'DF CumSum',
        'cumsum',
        ['self', 'axis', 'skipna'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.transpose.html',
        PandasColors.FUNC
      ).content,
      new PandasMethod(
        'df_all',
        'DF All',
        'all',
        ['self', 'axis', 'bool_only', 'skipna', 'level'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.all.html',
        PandasColors.FUNC
      ).content,
      new PandasMethod(
        'df_any',
        'DF Any',
        'all',
        ['self', 'axis', 'bool_only', 'skipna', 'level'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.any.html',
        PandasColors.FUNC
      ).content,
      new PandasMethod(
        'df_plot',
        'DF Plot',
        'plot',
        ['data'],
        '',
        'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.html',
        PandasColors.FUNC
      ).content
    ]
  },
  {
    kind: 'SEP'
  }
];

export default PANDAS_BLOCK_CATEGORIES;
