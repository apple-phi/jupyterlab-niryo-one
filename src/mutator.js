import * as Blockly from 'blockly';

Blockly.Blocks['checkboxboi'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox('FALSE'), 'NAME1')
      .appendField('bleh1');
    this.appendDummyInput()
      .appendField(new Blockly.FieldCheckbox('FALSE'), 'NAME2')
      .appendField('bleh2');
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['mutata'] = {
  init: function () {
    this.appendValueInput('NAME').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setMutator(new Blockly.Mutator([]));
    this.storage = {'NAME1':"FALSE",'NAME2':"FALSE"};
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
    var topBlock = workspace.newBlock('checkboxboi');
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

const MUTATOR = { kind: 'block', type: 'mutata' };
export default MUTATOR;