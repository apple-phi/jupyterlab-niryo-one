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

export function join_kwargs(block, _fields) {
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

export function join_args(block, _fields) {
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

export class KwargsBase {
  constructor(
    block_name,
    display_name,
    py_name,
    p_basic_fields,
    t_basic_fields,
    optional_fields,
    tooltip = '',
    url = '',
    color = BlockColors.OBJECT
  ) {
    this.block_name = block_name;
    this.display_name = display_name;
    this.py_name = py_name;
    this.p_basic_fields = p_basic_fields;
    this.t_basic_fields = t_basic_fields;
    this.optional_fields = optional_fields;
    this.tooltip = tooltip;
    this.url = url;
    this.color = color;
    this.content = { kind: 'block', type: this.block_name };
    this.register(this).activate(this);
    console.log(this.content);
  }

  register(self) {
    console.log(`$registering ${self.block_name}`);

    Blockly.Blocks['_' + self.block_name] = {
      init: function () {
        for (const field of self.t_basic_fields) {
          this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox('TRUE'), field)
            .appendField(field);
        }
        for (const field of self.t_basic_fields) {
          this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox('FALSE'), field)
            .appendField(field);
        }
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      }
    };

    Blockly.Blocks[self.block_name] = {
      init: function () {
        this.appendDummyInput().appendField(self.display_name);
        // this.appendDummyInput();
        for (const field of self.p_basic_fields + self.t_basic_fields) {
          this.appendValueInput(field)
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(field);
        }

        this.setOutput(true, null);
        this.setColour(self.color);
        this.setTooltip(self.tooltip);
        this.setHelpUrl(self.url);
        this.setMutator(new Blockly.Mutator([]));
        this.storage = Object.assign(
          {},
          ...self.t_basic_fields.map(x => {
            x: 'TRUE';
          }),
          ...self.optional_fields.map(x => {
            x: 'FALSE';
          })
        );
      },
      //load json dict
      loadExtraState: function (state) {
        console.log('loadExtraState');
        for (let [key, value] of Object.entries(state)){
          if (this.storage[key] !== value){
            this.storage[key] = value;
            if (value=="TRUE"){
              this.appendValueInput(key).setCheck(null);
            }else{
              this.removeInput(key);
            }
          }
        }
      },
      //Serialise to json, return some dict
      saveExtraState: function () {
        console.log('saveExtraState');
        return {...this.storage};
      },
      decompose: function(workspace) {
        console.log('decompose');
        var topBlock = workspace.newBlock('_'+self.block_name);
        for (let [key, value] of Object.entries(this.storage)){
          topBlock.setFieldValue(value,key);
        }
        topBlock.initSvg();
        return topBlock;
      },
      compose: function(topBlock) {
        console.log('compose');
        console.log(this.storage);
        for (let [key, value] of Object.entries(this.storage)){
          let new_v = topBlock.getFieldValue(key);
          console.log(key,new_v,value)
          if (value !== new_v){
            this.storage[key] = new_v;
            if (new_v=="TRUE"){
              this.appendValueInput(key).setCheck(null);
            }else{
              console.log('aaaa');
              this.removeInput(key);
            }
          }
        };

  }
    };
    return self;
  }
}
