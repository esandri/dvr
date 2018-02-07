let BlockEmbed = Quill.import('blots/block/embed');

class DataMergeListBlot extends BlockEmbed {
    static create(value) {
        // super.create don't work!?
        let node = BlockEmbed.create.call(DataMergeListBlot,value);
        node.setAttribute('path', value.path);
        node.setAttribute('fields', value.fields);
        node.innerHTML = value.path;
        node.className = 'datamergelist-elem';

        return node;
    }

    static formats(node) {
        let format = {};
        format.path = this.getPath(node);
        format.fields = this.getFields(node);
        return format;
    }

    static value(node) {
        return this.getPath(node);
    }

    static getPath (node) {
        return node.getAttribute('path');
    }

    static getFields (node) {
        let fields = node.getAttribute('fields');
        if (typeof fields === 'string') {
            return fields.split(',');
        } else {
            return [];
        }
    }

    format (name, value) {
        if (name === 'path') {
            this.domNode.setAttribute('path', value);
            this.domNode.innerHTML = value;
        }
        if (name === 'fields') {
            this.domNode.setAttribute('fields', fields);
        }
    }

    /**
     * Replace blot content with model data
     * @param DataMergeModel model the model to use to show data
     */
    showData (model) {
        let list = model.getData(DataMergeListBlot.getPath(this.domNode));
        let fields = DataMergeListBlot.getFields(this.domNode);
        if (fields.length === 0 ) {
            fields = model.getFields();
        }
        this.domNode.innerHTML = DataMergeListBlot.createTable(list, fields);
    }

    static createTable (list, fields) {
        let rows = [];
        for (let index in list) {
            if (list.hasOwnProperty(index)) {
                const listElem = list[index];
                let cols = [];
                for (let iField = 0; iField < fields.length; iField++) {
                    const fieldName = fields[iField];
                    cols.push(listElem[fieldName]);
                }

                rows.push('<td>' + cols.join('</td><td>') + '</td>');
            }
        }
        node.innerHTML = '<table><tr>' + rows.join('</tr><tr>') + '</tr></table>';
    }

}
DataMergeListBlot.blotName = 'datamergelist';
DataMergeListBlot.tagName = 'div';
DataMergeListBlot.className = 'datamergelist-elem';

Quill.register(DataMergeListBlot);
