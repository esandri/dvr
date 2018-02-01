let BlockEmbed = Quill.import('blots/block/embed');

class DataMergeBlot extends BlockEmbed {
    static create(value) {
        // super.create don't work!?
        let node = BlockEmbed.create.call(DataMergeBlot,value);
        node.style.width = value + 'px';
        node.style.height = '100px';
        node.setAttribute('width', value);
        node.setAttribute('height', 100);
        node.className = 'datamerge-elem';

        let path = document.createElement('div');
        path.style.width = value + 'px';
        path.style.height = '100px';
        path.style.position = 'relative';
        path.style.top = '0px';
        path.style.left = '0';
        path.onclick = function(ev) {
            console.log('pass');
            ev.stopPropagation();
            ev.cancelBubble = true;
        };
        node.appendChild(path);
        path.innerText = 'Hi all!'

        let mask = document.createElement('div');
        mask.style.width = value + 'px';
        mask.style.height = '100px';
        mask.style.position = 'relative';
        mask.style.top = '-100px';
        mask.style.left = '0';
        mask.style.zIndex = '100';
        mask.onclick = function(ev) {
            console.log('You can\'t pass');
            ev.stopPropagation();
            ev.cancelBubble = true;
        };
        node.appendChild(mask);



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

    format (name, value) {
        if (name === 'width') {
            this.domNode.style.width = value + 'px';
            this.domNode.setAttribute('width', value);
        }
    }
}
DataMergeBlot.blotName = 'datamerge';
DataMergeBlot.tagName = 'div';

Quill.register(DataMergeBlot);
