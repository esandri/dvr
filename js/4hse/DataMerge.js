let BlockEmbed = Quill.import('blots/block/embed');

class DataMerge extends BlockEmbed {
    static create(value) {
        // super.create don't work!?
        let node = BlockEmbed.create.call(DataMerge,value);
        node.style.width = value + 'px';
        node.setAttribute('width', value);
        node.setAttribute('height', 100);
        node.className = 'datamerge-elem';
        node.innerHTML = 'Hi to all!';
        return node;
    }

    static formats(node) {
        let format = {};
        if (node.hasAttribute('height')) {
            format.height = node.getAttribute('height');
        }
        if (node.hasAttribute('width')) {
            format.width = node.getAttribute('width');
        }
        return format;
    }

    static value(node) {
        return node.getAttribute('width');
    }
}
DataMerge.blotName = 'datamerge';
DataMerge.tagName = 'div';

Quill.register(DataMerge);
