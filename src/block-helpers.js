import * as Blockly from 'blockly';

export const BlockColors = { OBJECT: 230, FUNC: 110 };

export class BlockBase {
  constructor(
    block_name,
    display_name,
    py_name,
    fields,
    tooltip = '',
    url = '',
    color = BlockColors.OBJECT
  ) {
    this.block_name = block_name;
    this.display_name = display_name;
    this.py_name = py_name;
    this.fields = fields;
    this.tooltip = tooltip;
    this.url = url;
    this.color = color;
    this.content = { kind: 'block', type: this.block_name };
    this.register(this).activate(self);
    console.log(this.content);
  }
  register(self) {
    console.log(`$registering ${self.block_name}`);
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
        this.setColour(self.color);
        this.setTooltip(self.tooltip);
        this.setHelpUrl(self.url);
      }
    };
    return self;
  }
}

export class ObjectBlock extends BlockBase {
  constructor(...args) {
    super(...args);
    this.activate(this);
  }
  activate(self) {
    console.log(`$activating ${self.block_name}`);
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

export class MethodBlock extends BlockBase {
  constructor(...args) {
    super(...args);
    this.activate(this);
  }

  activate(self) {
    console.log(`$activating ${self.block_name}`);
    Blockly.Python[this.block_name] = function (block) {
      let _fields = [...self.fields];
      let obj = Blockly.Python.valueToCode(
        block,
        _fields.shift(),
        Blockly.Python.ORDER_ATOMIC
      );
      let code = `${obj}.${self.py_name}(`;
      for (const field of _fields) {
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

export class Generic extends BlockBase {
  constructor(func, ...args) {
    super(...args);
    this.func = func;
    this.activate(this);
  }

  activate(self) {
    console.log(`$activating ${self.block_name}`);
    Blockly.Python[this.block_name] = function (block) {
      let _fields = [...self.fields];
      let obj = Blockly.Python.valueToCode(
        block,
        _fields.shift(),
        Blockly.Python.ORDER_ATOMIC
      );
      return [self.func(obj, _fields), Blockly.Python.ORDER_FUNCTION_CALL];
    };
    return self;
  }
}

export function join_kwargs(_fields) {
  let code = '';
  for (const field of _fields) {
    const field_value = Blockly.Python.valueToCode(
      block,
      field,
      Blockly.Python.ORDER_ATOMIC
    );
    code += `${field_value ? `${field}=${field_value}, ` : ''}`;
  }
  return code;
}

export function join_args(_fields) {
  let code = '';
  for (const field of _fields) {
    const field_value = Blockly.Python.valueToCode(
      block,
      field,
      Blockly.Python.ORDER_ATOMIC
    );
    code += `${field_value ? `${field_value}, ` : ''}`;
  }
  return code;
}
