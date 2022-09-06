import * as Blockly from 'blockly';

export class PandasObject {
  constructor(
    block_name,
    display_name,
    py_name,
    fields,
    tooltip = '',
    url = ''
  ) {
    this.block_name = block_name;
    this.display_name = display_name;
    this.py_name = py_name;
    this.fields = fields;
    this.tooltip = tooltip;
    this.url = url;
    this.content = { kind: 'block', type: this.block_name };
    this.register(this);
  }
  register(self) {
    Blockly.Blocks[this.block_name] = {
      init: function () {
        this.appendDummyInput().appendField(self.display_name);
        this.appendDummyInput();
        for (const field of self.fields) {
          this.appendValueInput(field)
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field);
        }
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip(self.tooltip);
        this.setHelpUrl(self.url);
      }
    };
    Blockly.Python[this.block_name] = function (block) {
      let code = `${self.py_name}(`;
      for (const field of self.fields) {
        code += `${field}=${
          Blockly.Python.valueToCode(
            block,
            field,
            Blockly.Python.ORDER_ATOMIC
          ) || 'None'
        },`;
      }
      return code + ')\n';
    };
    return self;
  }
}
