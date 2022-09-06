import * as Blockly from 'blockly';

Blockly.Blocks['nan'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("NaN");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("Not a Number");
   this.setHelpUrl("");
    }
  };

  Blockly.Python['nan'] = function(block) {
    return ['np.nan', Blockly.Python.ORDER_NONE];
  };  

const NUMPY_BLOCK_CATEGORIES = [
    {
      kind: 'SEP'
    },
    {
      kind: 'category',
      name: 'Numpy',
      colour: '210',
      contents: [
        {
          kind: 'block',
          type: 'nan'
        },
      ]
    },
  ];
  
export default NUMPY_BLOCK_CATEGORIES;