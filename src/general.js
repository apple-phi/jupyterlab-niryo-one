import * as Blockly from 'blockly';

Blockly.Blocks['install'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Install")
          .appendField(new Blockly.FieldDropdown([["numpy","numpy"], ["pandas","pandas"], ["both","all"]]), "choice");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.Python['install'] = function (block) {
    var choice = block.getFieldValue('choice');
    if (choice == 'all'){
        choice = 'numpy, pandas';
    }
    return `!pip install ${choice}\n`;
};

Blockly.Blocks['import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Import")
          .appendField(new Blockly.FieldDropdown([["numpy","numpy"], ["pandas","pandas"], ["both","all"]]), "choice");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.Python['import'] = function (block) {
    switch (block.getFieldValue('choice')){
        case 'all': return 'import numpy as np, pandas as pd\n';
        case 'numpy': return 'import numpy as np\n';
        case 'pandas': return 'import pandas as pd\n';
    }
};


const GENERAL_BLOCK_CATEGORIES = [
    {
      kind: 'SEP'
    },
    {
      kind: 'category',
      name: 'Misc',
      colour: '210',
      contents: [
        { kind: 'block', type: 'install' },
        { kind: 'block', type: 'import' },
        {
          kind: 'block',
          type: 'pd_series'
        },
        { kind: 'block', type: 'pd_date_range' }
      ]
    },
    {
      kind: 'SEP'
    }
  ];

  export default GENERAL_BLOCK_CATEGORIES;