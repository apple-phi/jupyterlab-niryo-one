import * as Blockly from 'blockly';

const libraries = {
    'numpy' : 'numpy np',
    'pandas' : 'pandas pd',
    'pyplot' : 'matplotlib.pyplot plt',
}
const options = Object.keys(libraries).map(x=>[x,x]);
options.push(["all","all"]);

Blockly.Blocks['install'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Install")
          .appendField(new Blockly.FieldDropdown(options), "choice");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.Python['install'] = function (block) {
    if (block.getFieldValue('choice') == 'all'){
        code = "!pip install ";
        for (key in libraries){
            code += " " + libraries[key].split()[0].split('.')[0];
        }
        return code;
    } else {
        return "!pip install " + libraries[block.getFieldValue('choice')].split()[0].split('.')[0];
    }
};



Blockly.Blocks['import'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Import")
          .appendField(new Blockly.FieldDropdown(options), "choice");
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.Python['import'] = function (block) {
    if (block.getFieldValue('choice') == 'all'){
        code = "";
        for (key in libraries){
            [a,b] = libraries[key].split();
            code += `import ${a} as ${b}\n`
        }
        return code;
    } else {
        [a,b] = libraries[block.getFieldValue('choice')].split();
        return `import ${a} as ${b}\n`;
    }
};


Blockly.Blocks['exec'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Import")
      this.appendDummyInput().appendField(
            new Blockly.FieldTextInput('print("hi")'),
            'CODE'
          );
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

Blockly.Python['exec'] = function (block) {
    return block.getFieldValue('CODE')
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
        { kind: 'block', type: 'exec' }
      ]
    },
    {
      kind: 'SEP'
    }
  ];

  export default GENERAL_BLOCK_CATEGORIES;