let Parchment = Quill.import('parchment');

class DataMergeModule extends Module {
    static register() {
        Quill.register(DataMergeBlot, true);
    }

    constructor() {
        super();

    }
}



Quill.register('modules/datamerge', function(quill, options) {

    quill.root.addEventListener('click', function (ev) {
        const blot = Parchment.find(ev.target);
        if (blot instanceof DataMergeBlot) {
            openConfDialog();
        }
    });

    let confDialog_id = 'datamerge-' + Math.floor(Math.random() * 999999);
    let confDialog = document.createElement('div');
    confDialog.setAttribute('id',confDialog_id);
    confDialog.className = 'datamerge-confDialog';
    confDialog.innerHTML =
    `<div class="datamerge-confDialog-content">
        <span class="datamerge-confDialog-close">&times;</span>
        <p>Some text in the Modal..</p>
    </div>`;
    document.documentElement.appendChild(confDialog);

    let openConfDialog = function() {
        confDialog.style.display = "block";
    };

    let closeConfDialog = function() {
        confDialog.style.display = "none";
    };


    $('#' + confDialog_id + ' .datamerge-confDialog-close').click(function(ev) {
        closeConfDialog();
    });

    window.onclick = function(event) {
        if (event.target === confDialog) {
            closeConfDialog();
        }
    }
});



