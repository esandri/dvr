let Parchment = Quill.import('parchment');

Quill.register('modules/datamerge', function(quill, options) {
    console.log('bla bla bla');
    quill.root.addEventListener('click', function (ev) {
        const blot = Parchment.find(ev.target);
        if (blot instanceof DataMergeBlot) {
            let w = prompt('set new value');
            if (w) {
                blot.format('width',w);
            }
        }
    });
});
