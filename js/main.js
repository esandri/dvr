

$(document).ready(function() {

    var quill = new Quill('#editor', {
        modules: {
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strikeout'],
                    ['image', 'code-block'],
                    ['datamerge']
                ],
                handlers:  {
                    'datamerge': function() {
                        let dm = quill.getModule('datamerge');
                        console.log(dm);
                    }
                }
            },
            datamerge: true
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'  // or 'bubble'
    });

    $('.ql-strikeout').html('e');
    $('.ql-datamerge').html('d');

});



