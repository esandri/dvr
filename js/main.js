
let quill = null;
$(document).ready(function() {

    Quill.register('modules/datamerge', DataMergeModule);

    quill = new Quill('#editor', {
        modules: {
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block'],
                    ['datamerge']
                ],
                handlers:  {
                    'datamerge': function() {
                        let dm = quill.getModule('datamerge');
                        dm.openConfDialog({range: quill.getSelection()});
                    }
                }
            },
            datamerge: true
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
    });

    let dm = quill.getModule('datamerge');
    dm.setModel(new HSEModel());

    $('.ql-datamerge').html('{}');

});
