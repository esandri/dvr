let Parchment = Quill.import('parchment');

class DataMergeModule {
    register() {
        Quill.register(DataMergeBlot, true);
        this.confDialog_id = 'datamerge-' + Math.floor(Math.random() * 999999);
        this.confDialog = document.createElement('div');
        this.confDialog.setAttribute('id',this.confDialog_id);
        this.confDialog.className = 'datamerge-confDialog';
        this.confDialog.innerHTML = DataMergeModule_template;

        document.documentElement.appendChild(this.confDialog);

        $('#' + this.confDialog_id + ' .datamerge-confDialog-close').click((ev) => {
            this.closeConfDialog();
        });
        $('#' + this.confDialog_id + ' .datamerge-confDialog-ok').click((ev) => {
            let name = $('#' + this.confDialog_id + ' .datamerge-confDialog-name').val();
            this.quill.insertEmbed(this.confDialog.range.index, 'datamerge', {path: name}, Quill.sources.USER)
            this.closeConfDialog();
        });

        window.onclick = (event) => {
            if (event.target === this.confDialog) {
                this.closeConfDialog();
            }
        };

        this.quill.root.addEventListener('click', function (ev) {
            const blot = Parchment.find(ev.target);
            if (blot instanceof DataMergeBlot) {
                this.openConfDialog();
            }
        });

    }
    openConfDialog(options) {
        this.confDialog.range = options.range||{index:0};
        this.confDialog.style.display = "block";
    };

    closeConfDialog() {
        this.confDialog.style.display = "none";
    };

    constructor(quill, options = {}) {
        this.quill = quill;
        this.options = options;
        this.register();
    }

}

Quill.register('modules/datamerge', DataMergeModule);

const DataMergeModule_template =
    `<div class="datamerge-confDialog-content">
        <span class="datamerge-confDialog-close">&times;</span>
        <input type="text" value="office.person" placeholder="inset the data name" class="datamerge-confDialog-name"/>
        <input type="button" value="ok" class="datamerge-confDialog-ok"/>
    </div>`;
