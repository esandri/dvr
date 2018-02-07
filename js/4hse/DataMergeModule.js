let Parchment = Quill.import('parchment');

class DataMergeModule {
    constructor(quill, options = {}) {
        this.quill = quill;
        this.options = options;
        this.register();
    }

    register() {
        Quill.register(DataMergeBlot, true);
        Quill.register(DataMergeListBlot, true);
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
            let path = $('#' + this.confDialog_id + ' .datamerge-confDialog-name').val();
            if (this.confDialog.blot) {
                this.confDialog.blot.format('path',path);
            } else {
                this.quill.insertEmbed(this.confDialog.range.index, 'datamerge', {path: path}, Quill.sources.USER)
            }
            this.closeConfDialog();
        });

        window.onclick = (event) => {
            if (event.target === this.confDialog) {
                this.closeConfDialog();
            }
        };

        this.quill.root.addEventListener('click', (ev) => {
            const blot = Parchment.find(ev.target);
            if (blot instanceof DataMergeListBlot || blot instanceof DataMergeBlot) {
                this.openConfDialog({blot: blot});
            }
        });

    }

    /**
     * Set the model for datamerge of this document
     * @param DataMergeModel model
     */
    setModel(model) {
        this.model = model;
    }

    showData() {
        let dmlist = quill.editor.scroll.descendants(DataMergeBlot);
        dimlist.push(quill.editor.scroll.descendants(DataMergeListBlot);
        for(let i = 0; i < dmlist.length; i++) {
            let blot = dmlist[i];
            blot.showData(this.model);
        }
    }

    // dialog operations
    openConfDialog(options) {
        this.confDialog.blot = options.blot;
        this.confDialog.range = options.range||{index:0};

        const pathList = this.model.getPathList();
        const select_elem = $('#' + this.confDialog_id + ' .datamerge-confDialog-name')[0];

        // clear select
        select_elem.innerHTML = '';

        for(let i = 0; i < pathList.length; i++) {
            let path = pathList[i];
            let opt = document.createElement('option')
            opt.value = path.name;
            opt.innerHTML = path.description + ' - ' + path.type;
            select_elem.appendChild(opt);
        }

        this.confDialog.style.display = "block";
    };

    closeConfDialog() {
        this.confDialog.style.display = "none";
    };

}

const DataMergeModule_template =
    `<div class="datamerge-confDialog-content">
        <span class="datamerge-confDialog-close">&times;</span>
        <select class="datamerge-confDialog-name"></select>
        <input type="button" value="ok" class="datamerge-confDialog-ok"/>
    </div>`;

class DataMergeModel {
    getData(path){};
    getPathList(){};
}
