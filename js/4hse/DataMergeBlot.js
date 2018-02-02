let BlockEmbed = Quill.import('blots/block/embed');

class DataMergeBlot extends BlockEmbed {
    static create(value) {
        // super.create don't work!?
        let node = BlockEmbed.create.call(DataMergeBlot,value);
        node.innerHTML = value.path;
        node.className = 'datamerge-elem';

        return node;
    }

    static formats(node) {
        let format = {};
        format.path = node.innerHTML;
        return format;
    }

    static value(node) {
        return node.innerHTML;
    }

    format (name, value) {
        if (name === 'path') {
            this.domNode.innerHTML = value;
        }
    }
}
DataMergeBlot.blotName = 'datamerge';
DataMergeBlot.tagName = 'div';
DataMergeBlot.className = 'datamerge-elem';

Quill.register(DataMergeBlot);
