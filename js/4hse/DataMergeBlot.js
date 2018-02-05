let BlockEmbed = Quill.import('blots/block/embed');

class DataMergeBlot extends BlockEmbed {
    static create(value) {
        // super.create don't work!?
        let node = BlockEmbed.create.call(DataMergeBlot,value);
        node.setAttribute('path', value.path);
        node.innerHTML = value.path;
        node.className = 'datamerge-elem';

        return node;
    }

    static formats(node) {
        let format = {};
        format.path = node.getAttribute('path');
        return format;
    }

    static value(node) {
        return node.getAttribute('path');
    }

    format (name, value) {
        if (name === 'path') {
            this.domNode.setAttribute('path', value);
            this.domNode.innerHTML = value;
        }
    }

    showData (model) {
        let val = model.getData(this.domNode.getAttribute('path'));
        this.domNode.innerHTML = val;
    }
}
DataMergeBlot.blotName = 'datamerge';
DataMergeBlot.tagName = 'div';
DataMergeBlot.className = 'datamerge-elem';

Quill.register(DataMergeBlot);
