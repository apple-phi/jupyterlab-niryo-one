import * as Blockly from 'blockly';
import { ObjectBlock, BlockColors, MethodBlock } from './block-helpers';

const PANDAS_BLOCK_CATEGORIES = [
  {
    kind: 'SEP'
  },
  {
    kind: 'category',
    name: 'Pandas',
    colour: '210',
    contents: [
      {
        kind: 'category',
        name: 'Objects',
        color: '210',
        contents: [
          new ObjectBlock(
            'pd_series',
            'Series',
            'pd.Series',
            ['data', 'index', 'dtype', 'name', 'copy'],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.Series.html',
            BlockColors.OBJECT
          ).content,
          new ObjectBlock(
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
            BlockColors.OBJECT
          ).content,
          new ObjectBlock(
            'pd_dataframe',
            'Data Frame',
            'pd.DataFrame',
            ['data', 'index', 'columns', 'dtype', 'copy'],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html',
            BlockColors.OBJECT
          ).content
        ]
      },
      {
        kind: 'category',
        name: 'Functions',
        color: '210',
        contents: [
          new MethodBlock(
            'df_dropna',
            'DF Drop NaN',
            'dropna',
            ['self', 'axis', 'how', 'thresh', 'subset', 'inplace'],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dropna.html',
            BlockColors.FUNC
          ).content,
          new MethodBlock(
            'df_t',
            'DF Transpose',
            'transpose',
            ['self', 'copy'],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.transpose.html',
            BlockColors.FUNC
          ).content,
          new MethodBlock(
            'df_cumsum',
            'DF CumSum',
            'cumsum',
            ['self', 'axis', 'skipna'],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.transpose.html',
            BlockColors.FUNC
          ).content,
          new MethodBlock(
            'df_all',
            'DF All',
            'all',
            ['self', 'axis', 'bool_only', 'skipna', 'level'],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.all.html',
            BlockColors.FUNC
          ).content,
          new MethodBlock(
            'df_any',
            'DF Any',
            'all',
            ['self', 'axis', 'bool_only', 'skipna', 'level'],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.any.html',
            BlockColors.FUNC
          ).content,
          new MethodBlock(
            'df_plot',
            'DF Plot',
            'plot',
            // '__getattr__(["plot",plt.figure()][0])',
            ['data'],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.html',
            BlockColors.FUNC
          ).content,
          new ObjectBlock(
            'pd_concat',
            'Concat',
            'pd.concat',
            [
              'objs',
              'axis',
              'join',
              'ignore_index',
              'keys',
              'levels',
              'names',
              'verify_integrity',
              'sort',
              'copy'
            ],
            '',
            'https://pandas.pydata.org/docs/reference/api/pandas.concat.html',
            BlockColors.FUNC
          ).content
        ]
      }
    ]
  },
  {
    kind: 'SEP'
  }
];

export default PANDAS_BLOCK_CATEGORIES;
