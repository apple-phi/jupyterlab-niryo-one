import * as Blockly from 'blockly';

export const PandasColors = { OBJECT: 230, FUNC: 110 };

export class PandasObject {
  constructor(
    block_name,
    display_name,
    py_name,
    fields,
    tooltip = '',
    url = '',
    color = PandasColors.OBJECT
  ) {
    this.block_name = block_name;
    this.display_name = display_name;
    this.py_name = py_name;
    this.fields = fields;
    this.tooltip = tooltip;
    this.url = url;
    this.color = color;
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
        const field_value = Blockly.Python.valueToCode(
          block,
          field,
          Blockly.Python.ORDER_ATOMIC
        );
        code += `${field_value ? `${field}=${field_value}, ` : ''}`;
      }
      return [code + ')', Blockly.Python.ORDER_FUNCTION_CALL];
    };
    return self;
  }
}
