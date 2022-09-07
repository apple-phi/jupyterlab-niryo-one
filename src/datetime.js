import { ObjectBlock } from './block-helpers';

const DATE_BLOCK_CATEGORIES = [
  {
    kind: 'category',
    name: 'Datetime',
    colour: '210',
    contents: [
      new ObjectBlock(
        'date',
        'Date',
        'dtm.date',
        ['year', 'month', 'day'],
        '',
        'https://docs.python.org/3/library/datetime.html#datetime.date',
        '210'
      ).content
    ]
  }
];

export default DATE_BLOCK_CATEGORIES;
