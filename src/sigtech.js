import { MethodBlock } from './block-helpers';

const SIGTECH_BLOCK_CATEGORIES = [
  {
    kind: 'category',
    name: 'Sigtech',
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
];

export default SIGTECH_BLOCK_CATEGORIES;
