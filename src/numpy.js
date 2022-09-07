import * as Blockly from 'blockly';
import { ObjectBlock, BlockColors, MethodBlock } from './block-helpers';

class Const {
  constructor(
    block_name,
    display_name,
    py_name,
    tooltip = '',
    url = '',
    order = Blockly.Python.ORDER_ATOMIC
  ) {
    this.block_name = block_name;
    this.display_name = display_name;
    this.py_name = py_name;
    this.tooltip = tooltip;
    this.url = url;
    this.content = { kind: 'block', type: this.block_name };
    this.order = order;
    this.register(this);
  }
  register(self) {
    Blockly.Blocks[this.block_name] = {
      init: function () {
        this.appendDummyInput().appendField(self.display_name);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip(self.tooltip);
        this.setHelpUrl(self.url);
      }
    };
    // Blockly.Blocks[this.block_name].toplevel_init = 'import pandas as pd\n\n';
    Blockly.Python[self.block_name] = function (block) {
      return [self.py_name, self.order];
    };
    return self;
  }
}

const NUMPY_BLOCK_CATEGORIES = [
  {
    kind: 'category',
    name: 'Numpy',
    colour: '210',
    contents: [
      {
        kind: 'category',
        name: 'Constants',
        colour: '210',
        contents: [
          new Const('npnan', 'NaN', 'np.nan').content,
          new Const('npinf', 'Infinity', 'np.inf').content,
          new Const('npninf', '-Infinity', 'np.NINF').content,
          new Const('npnzero', '-0', 'np.NZERO').content,
          new Const('nppi', 'Pi', 'np.pi').content
        ]
      },
      {
        kind: 'category',
        name: 'Array',
        colour: '210',
        contents: [
          new ObjectBlock(
            'nparray',
            'Array',
            'np.array',
            'object,dtype,copy,order,subok,ndmin,like'.split(',')
          ).content
        ]
      }
    ]
  }
];

export default NUMPY_BLOCK_CATEGORIES;
