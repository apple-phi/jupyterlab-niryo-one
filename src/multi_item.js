import * as Blockly from 'blockly';

export class _ListLikeObject {
  constructor(
    block_name,
    display_name,
    name_or_func,
    default_number = 3,
    tooltip = '',
    url = ''
  ) {
    this.block_name = block_name;
    this.display_name = display_name;
    this.name_or_func = name_or_func;
    this.default_number = default_number;
    this.tooltip = tooltip;
    this.url = url;
    this.content = { kind: 'block', type: this.block_name };
    this.register(this);
  }
  register(self) {
    Blockly.Blocks[this.block_name] = {
      init: function () {
        this.setHelpUrl(self.url);
        this.setStyle('list_blocks');
        this.itemCount_ = self.default_number;
        this.updateShape_();
        this.setOutput(true, null);
        this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
        this.setTooltip(self.tooltip);
      },
      mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
      },
      domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
      },
      saveExtraState: function () {
        return {
          itemCount: this.itemCount_
        };
      },
      loadExtraState: function (state) {
        this.itemCount_ = state['itemCount'];
        this.updateShape_();
      },
      decompose: function (workspace) {
        const containerBlock = workspace.newBlock(
          'lists_create_with_container'
        );
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
          const itemBlock = workspace.newBlock('lists_create_with_item');
          itemBlock.initSvg();
          connection.connect(itemBlock.previousConnection);
          connection = itemBlock.nextConnection;
        }
        return containerBlock;
      },
      compose: function (containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        const connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
          connections.push(itemBlock.valueConnection_);
          itemBlock =
            itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (let i = 0; i < this.itemCount_; i++) {
          const connection = this.getInput('ADD' + i).connection
            .targetConnection;
          if (connection && connections.indexOf(connection) === -1) {
            connection.disconnect();
          }
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        // Reconnect any child blocks.
        for (let i = 0; i < this.itemCount_; i++) {
          Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
      },
      saveConnections: function (containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        let i = 0;
        while (itemBlock) {
          const input = this.getInput('ADD' + i);
          itemBlock.valueConnection_ =
            input && input.connection.targetConnection;
          itemBlock =
            itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
          i++;
        }
      },
      updateShape_: function () {
        if (this.itemCount_ && this.getInput('EMPTY')) {
          this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
          this.appendDummyInput('EMPTY').appendField(self.display_name);
        }
        // Add new inputs.
        for (let i = 0; i < this.itemCount_; i++) {
          if (!this.getInput('ADD' + i)) {
            const input = this.appendValueInput('ADD' + i).setAlign(
              Blockly.Input.RIGHT
            );
            if (i === 0) {
              input.appendField(self.display_name);
            }
          }
        }
        // Remove deleted inputs.
        for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
          this.removeInput('ADD' + i);
        }
      }
    };

    Blockly.Python[this.block_name] = function (block) {
      const fields = [];
      for (let i = 0; i < this.itemCount_; i++) {
        fields.push(
          Blockly.Python.valueToCode(
            block,
            'ADD' + i,
            Blockly.Python.ORDER_ATOMIC
          ) || 'None'
        );
      }
      if (typeof self.name_or_func == 'string') {
        return [
          self.name_or_func + '(' + fields.join(',') + ')',
          Blockly.Python.ORDER_NONE
        ];
      }
      return [self.name_or_func(fields), Blockly.Python.ORDER_COLLECTION];
    };
    return self;
  }
}

export class ListLikeObject {
  constructor(
    block_name,
    display_name,
    name_or_func,
    default_number = 4,
    tooltip = '',
    url = ''
  ) {
    this.block_name = block_name;
    this.display_name = display_name;
    this.name_or_func = name_or_func;
    this.default_number = default_number;
    this.tooltip = tooltip;
    this.url = url;
    this.content = { kind: 'block', type: this.block_name };
    this.register(this);
  }
  register(self) {
    Blockly.Blocks[this.block_name] = {
      init: function () {
        this.setHelpUrl(self.url);
        this.setStyle('list_blocks');
        this.itemCount_ = self.default_number;
        this.updateShape_();
        this.setOutput(true, null);
        this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
        this.setTooltip(self.tooltip);
      },
      mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_/2);
        return container;
      },
      domToMutation: function (xmlElement) {
        this.itemCount_ = 2 * parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
      },
      saveExtraState: function () {
        return {
          itemCount: this.itemCount_
        };
      },
      loadExtraState: function (state) {
        this.itemCount_ = state['itemCount'];
        this.updateShape_();
      },
      decompose: function (workspace) {
        const containerBlock = workspace.newBlock(
          'lists_create_with_container'
        );
        containerBlock.initSvg();
        let connection = containerBlock.getInput('STACK').connection;
        for (let i = 0; i < this.itemCount_; i++) {
          let itemBlock = workspace.newBlock('lists_create_with_item');
          itemBlock.initSvg();
          connection.connect(itemBlock.previousConnection);
          connection = itemBlock.nextConnection;
        }
        return containerBlock;
      },
      compose: function (containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        // Count number of inputs.
        const connections = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
          connections.push(itemBlock.valueConnection_);
          itemBlock =
            itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        // Disconnect any children that don't belong.
        for (let i = 0; i < this.itemCount_; i++) {
          const connection = this.getInput('ADD' + i).connection
            .targetConnection;
          if (connection && connections.indexOf(connection) === -1) {
            connection.disconnect();
          }
        }
        this.itemCount_ = connections.length/2;
        this.updateShape_();
        // Reconnect any child blocks.
        for (let i = 0; i < this.itemCount_; i++) {
          Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
        }
      },
      saveConnections: function (containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock('STACK');
        let i = 0;
        while (itemBlock) {
          const input = this.getInput('ADD' + i);
          itemBlock.valueConnection_ =
            input && input.connection.targetConnection;
          itemBlock =
            itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
          i++;
        }
      },
      updateShape_: function () {
        if (this.itemCount_ && this.getInput('EMPTY')) {
          this.removeInput('EMPTY');
        } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
          this.appendDummyInput('EMPTY').appendField(self.display_name);
        }
        // Add new inputs.
        for (let i = 0; i < this.itemCount_; i++) {
          if (!this.getInput('ADD' + i)) {
            const input = this.appendValueInput('ADD' + i)
              .setAlign(
              Blockly.Input.RIGHT
            );
            if (i === 0) {
              input.appendField(self.display_name);
            }
            input.appendField(i%2?'to':'Link').setAlign(Blockly.Input.RIGHT);
          }
        }
        // Remove deleted inputs.
        for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
          this.removeInput('ADD' + i);
        }
      }
    };

    Blockly.Python[this.block_name] = function (block) {
      const fields = [];
      for (let i = 0; i < this.itemCount_; i++) {
        fields.push(
          Blockly.Python.valueToCode(
            block,
            'ADD' + i,
            Blockly.Python.ORDER_ATOMIC
          ) || 'None'
        );
      }
      if (typeof self.name_or_func == 'string') {
        return [
          self.name_or_func + '(' + fields.join(',') + ')',
          Blockly.Python.ORDER_NONE
        ];
      }
      return [self.name_or_func(fields), Blockly.Python.ORDER_COLLECTION];
    };
    return self;
  }
}

// export class DictLikeObject {
//     constructor(
//       block_name,
//       display_name,
//       name_or_func,
//       default_number = 3,
//       tooltip = '',
//       url = ''
//     ) {
//       this.block_name = block_name;
//       this.display_name = display_name;
//       this.name_or_func = name_or_func;
//       this.default_number = default_number;
//       this.tooltip = tooltip;
//       this.url = url;
//       this.content = { kind: 'block', type: this.block_name };
//       this.register(this);
//     }
//     register(self) {
//       Blockly.Blocks[this.block_name] = {
//         init: function () {
//           this.setHelpUrl(self.url);
//           this.setStyle('list_blocks');
//           this.itemCount_ = self.default_number;
//           this.updateShape_();
//           this.setOutput(true, null);
//           this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
//           this.setTooltip(self.tooltip);
//         },
//         mutationToDom: function () {
//           const container = Blockly.utils.xml.createElement('mutation');
//           container.setAttribute('items', this.itemCount_);
//           return container;
//         },
//         domToMutation: function (xmlElement) {
//           this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
//           this.updateShape_();
//         },
//         saveExtraState: function () {
//           return {
//             itemCount: this.itemCount_
//           };
//         },
//         loadExtraState: function (state) {
//           this.itemCount_ = state['itemCount'];
//           this.updateShape_();
//         },
//         decompose: function (workspace) {
//           const containerBlock = workspace.newBlock(
//             'lists_create_with_container'
//           );
//           containerBlock.initSvg();
//           let connection = containerBlock.getInput('STACK').connection;
//           for (let i = 0; i < this.itemCount_; i++) {
//             const itemBlock = workspace.newBlock('lists_create_with_item');
//             itemBlock.initSvg();
//             connection.connect(itemBlock.previousConnection);
//             connection = itemBlock.nextConnection;
//           }
//           return containerBlock;
//         },
//         compose: function (containerBlock) {
//           let itemBlock = containerBlock.getInputTargetBlock('STACK');
//           // Count number of inputs.
//           const connections = [];
//           while (itemBlock && !itemBlock.isInsertionMarker()) {
//             connections.push(itemBlock.valueConnection_);
//             itemBlock =
//               itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
//           }
//           // Disconnect any children that don't belong.
//           for (let i = 0; i < this.itemCount_; i++) {
//             const connection = this.getInput('ADD' + i).connection
//               .targetConnection;
//             if (connection && connections.indexOf(connection) === -1) {
//               connection.disconnect();
//             }
//           }
//           this.itemCount_ = connections.length;
//           this.updateShape_();
//           // Reconnect any child blocks.
//           for (let i = 0; i < this.itemCount_; i++) {
//             Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
//             Blockly.Mutator.reconnect(connections[i], this, 'ADD2' + i);
//           }
//         },
//         saveConnections: function (containerBlock) {
//           let itemBlock = containerBlock.getInputTargetBlock('STACK');
//           let i = 0;
//           while (itemBlock) {
//             const input = this.getInput('ADD' + i);
//             itemBlock.valueConnection_ =
//               input && input.connection.targetConnection;
//             itemBlock =
//               itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
//             i++;
//           }
//         },
//         updateShape_: function () {
//           if (this.itemCount_ && this.getInput('EMPTY')) {
//             this.removeInput('EMPTY');
//           } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
//             this.appendDummyInput('EMPTY').appendField(self.display_name);
//           }
//           // Add new inputs.
//           for (let i = 0; i < this.itemCount_; i++) {
//             if (!this.getInput('ADD' + i)) {
//               if (i === 0) {
//                 input.appendField(self.display_name);
//                 this.appendDummyInput();
//               }
//               const input = this.appendValueInput('ADD' + i).setCheck(null).appendField('Link')
//               this.appendDummyInput();
//               this.appendValueInput('ADD2' + i).setCheck(null).appendField('to');
//               this.appendDummyInput();
//             }
//           }
//           // Remove deleted inputs.
//           for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
//             this.removeInput('ADD' + i);
//             this.removeInput('ADD2' + i);
//           }
//         }
//       };
  
//       Blockly.Python[this.block_name] = function (block) {
//         const fields = [];
//         for (let i = 0; i < this.itemCount_; i++) {
//           fields.push([
//             Blockly.Python.valueToCode(
//               block,
//               'ADD' + i,
//               Blockly.Python.ORDER_ATOMIC
//             ) || 'None',
//             Blockly.Python.valueToCode(
//               block,
//               'ADD' + i,
//               Blockly.Python.ORDER_ATOMIC
//             ) || 'None']
//           );
//         }
//         console.log(fields);
//         if (typeof self.name_or_func == 'string') {
//           return [
//             self.name_or_func + '(' + fields.map((a,b)=>`${a}:${b}`).join(',') + ')',
//             Blockly.Python.ORDER_COLLECTION
//           ];
//         }
//         return [self.name_or_func(fields), Blockly.Python.ORDER_COLLECTION];
//       };
//       return self;
//     }
//   }
