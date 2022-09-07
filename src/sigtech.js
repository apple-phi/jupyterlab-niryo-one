import { MethodBlock, ObjectBlock } from './block-helpers';

const SIGTECH_BLOCK_CATEGORIES = [
  {
    kind: 'category',
    name: 'Sigtech',
    colour: '210',
    contents: [
      new ObjectBlock(
        'sig_obj_get',
        'Obj Get',
        'sig.obj.get',
        ['name', 'symbology'],
        '',
        'https://guide.sigtech.com/learning-resources/readme/1-your-first-sigtech-strategy',
        '210'
      ).content,
      {
        kind: 'category',
        name: 'Strategy',
        colour: '210',
        contents: [
          new ObjectBlock(
            'basket_strategy',
            'BasketStrategy',
            'sig.BasketStrategy',
            [
              'constituent_names',
              'weights',
              'rebalance_frequency',
              'rebalance_dates',
              'rebalance_bdc',
              'intersecting_business_days',
              'instant_sizing',
              'convert_long_short_weight',
              'use_db_for_short_version',
              'unit_type'
            ],
            '',
            'https://docs.sigtech.com/latest/api/sigtech.framework.strategies.basket_strategies.BasketStrategy.html',
            '210'
          ).content
        ]
      },
      {
        kind: 'category',
        name: 'Plotting',
        colour: '210',
        contents: [
          new MethodBlock(
            'perfplot',
            'Strategy Perfplot',
            'plot.performance',
            ['strategy', 'fallback', 'aum'],
            '',
            'https://platform.sigtech.com/docs/api/sigtech.framework.strategies.components.plot_wrapper.PlotWrapper.html#sigtech.framework.strategies.components.plot_wrapper.PlotWrapper'
          ).content
        ]
      }
    ]
  }
];

export default SIGTECH_BLOCK_CATEGORIES;
