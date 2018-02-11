//let BlockEmbed = Quill.import('blots/block/embed');

class DataMergeListBlot extends BlockEmbed {
    static create(value) {
        // super.create don't work!?
        let node = BlockEmbed.create.call(DataMergeListBlot,value);
        node.setAttribute('path', value.path);
        node.setAttribute('fields', value.fields);
        node.className = 'datamergelist-elem';

        let nodeCode = document.createElement('div');
        nodeCode.className = 'datamerge-elem-code';

        let nodeRender = document.createElement('div');
        nodeRender.className = 'datamerge-elem-render';

        node.appendChild(nodeCode);
        node.appendChild(nodeRender);

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

    getPath () {
        return DataMergeListBlot.getPath(this.domNode);
    }

    /**
     * Return the list of field as an array of strings
     * @param node the node of the blot
     * @return the list of fields as an array of string, an empty array if the attribute is not set
     */
    static getFields (node) {
        let fields = node.getAttribute('fields');
        if (typeof fields === 'string' && fields.length > 0) {
            return fields.split(',');
        } else {
            return [];
        }
    }

    /**
     * Return the list of field as an array of strings
     * @return the list of fields as an array of string, an empty array if the attribute is not set
     */
    getFields () {
        return DataMergeListBlot.getFields(this.domNode);
    }

    /**
     * Return the list of field as an array of object
     * @param model the model
     * @return the list of fields as an array of string, an empty array if the attribute is not set
     *            { name, description, type }
     */
    getFieldsModel (model) {
        let path = this.getPath();
        let fields = DataMergeListBlot.getFields(this.domNode);
        if (fields.length === 0 ) {
            fields = model.getFields(path);
        } else {
            if (model.getTypeByName(path) === 'array') {
                path += '.0';
            }
            fields = model.getFieldsByName(fields, path);
        }
        return fields;
    }

    /**
     *  @inheritDoc
     */
    format (name, value) {
        if (name === 'path') {
            this.domNode.setAttribute('path', value);
            $(this.domNode).children('.datamerge-elem-code').html(value);
        }
        if (name === 'fields') {
            this.domNode.setAttribute('fields', value);
        }
    }

    /**
     * Switch to code path view
     */
    switchToCode() {
        $(this.domNode).children('.datamerge-elem-code').show(); // = 'table';
        $(this.domNode).children('.datamerge-elem-render').hide(); // = 'none';
    }

    /**
     * Switch to render data view
     */
    switchToRender() {
        $(this.domNode).children('.datamerge-elem-code').hide(); // = 'none';
        $(this.domNode).children('.datamerge-elem-render').show(); // = 'block';
    }

    /**
     * Replace blot content with path code
     **/
    showCode () {
        this.switchToCode();
    }

    /**
     * Replace blot content with model data
     * @param DataMergeModel model the model to use to show data
     */
    showData (model) {
        const path = this.getPath();
        let list = model.getData(path);
        let fields = this.getFieldsModel(model);

        $(this.domNode).children('.datamerge-elem-render').html(DataMergeListBlot.createTable(list, fields));
        this.switchToRender();
    }

    /**
     * Create the string representation of the table with the list of elements
     * A row for any element in the list
     * A col for any field
     * @param array list the list of elements to render
     * @param array list of fields to render for any row
     * @return string representation of the table
     */
    static createTable (list, fields) {
        let rows = [];

        // create header
        let cols = [];
        for (let iField = 0; iField < fields.length; iField++) {
            const currField = fields[iField];
            cols.push(currField.description);
        }
        rows.push('<th>' + cols.join('</th><th>') + '</th>');

        for (let index in list) {
            if (list.hasOwnProperty(index)) {
                const listElem = list[index];
                cols = [];
                for (let iField = 0; iField < fields.length; iField++) {
                    const currField = fields[iField];
                    let simpleName = currField.name.substr(currField.name.lastIndexOf('.')+1);
                    cols.push(listElem[simpleName]);
                }

                rows.push('<td>' + cols.join('</td><td>') + '</td>');
            }
        }
        return '<table><tr>' + rows.join('</tr><tr>') + '</tr></table>';
    }

}
DataMergeListBlot.blotName = 'datamergelist';
DataMergeListBlot.tagName = 'div';
DataMergeListBlot.className = 'datamergelist-elem';

Quill.register(DataMergeListBlot);
