let Parchment = Quill.import('parchment');

/**
 * The class module for quill DataMerge extensions
 */
class DataMergeModule {
    constructor(quill, options = {}) {
        this.quill = quill;
        this.options = options;
        this.register();
    }

    /**
     * Do the registration of Blot
     */
    register() {
        Quill.register(DataMergeBlot, true);
        Quill.register(DataMergeListBlot, true);

        // event listener to open dialog when a user click on one of DataMerge blots
        this.quill.root.addEventListener('click', (ev) => {
            const blot = Parchment.find(ev.target.parentElement);
            if (blot instanceof DataMergeListBlot || blot instanceof DataMergeBlot) {
                this.openConfDialog({blot: blot});
            }
        });

        this.initDialog();

    }

    /**
     * Initialize the config dialog
     */
    initDialog() {
        // any dialog has a her own unique id
        this.confDialog_id = 'datamerge-' + Math.floor(Math.random() * 999999);
        this.confDialog = document.createElement('div');
        this.confDialog.setAttribute('id',this.confDialog_id);
        this.confDialog.className = 'datamerge-confDialog';
        this.confDialog.innerHTML = DataMergeModule_template;

        document.documentElement.appendChild(this.confDialog);

        // if the path changes => reload fields list
        $('#' + this.confDialog_id + ' .datamerge-confDialog-name').change((ev) => {
            let path = $('#' + this.confDialog_id + ' .datamerge-confDialog-name').val();
            this.setFieldsList(path);
        });

        // the click on close
        $('#' + this.confDialog_id + ' .datamerge-confDialog-close').click((ev) => {
            this.closeConfDialog();
        });

        // the click on ok
        $('#' + this.confDialog_id + ' .datamerge-confDialog-ok').click((ev) => {
            let path = $('#' + this.confDialog_id + ' .datamerge-confDialog-name').val();
            let fields = $('#' + this.confDialog_id + ' .datamerge-confDialog-fields').val();
            if (this.confDialog.blot) {
                this.confDialog.blot.format('path',path);
                this.confDialog.blot.format('fields',fields);
            } else {
                this.quill.insertEmbed(this.confDialog.range.index, 'datamerge', {path: path, fields: fields}, Quill.sources.USER)
            }
            this.closeConfDialog();
        });

        // the click outside the dialog
        window.onclick = (event) => {
            if (event.target === this.confDialog) {
                this.closeConfDialog();
            }
        };
    }

    /**
     * Set the model for datamerge of this document
     * @param DataMergeModel model
     */
    setModel(model) {
        this.model = model;
    }

    /**
     * Show the code view for alla the DataMerge Blot
     */
    showCode() {
        let dmlist = quill.editor.scroll.descendants(DataMergeBlot);
        dmlist.push(...quill.editor.scroll.descendants(DataMergeListBlot));
        for(let i = 0; i < dmlist.length; i++) {
            let blot = dmlist[i];
            blot.showCode();
        }
    }

    /**
     * Show the data view for alla the DataMerge Blot
     */
    showData() {
        let dmlist = quill.editor.scroll.descendants(DataMergeBlot);
        dmlist.push(...quill.editor.scroll.descendants(DataMergeListBlot));
        for(let i = 0; i < dmlist.length; i++) {
            let blot = dmlist[i];
            blot.showData(this.model);
        }
    }

    // dialog operations
    openConfDialog(options) {
        this.confDialog.blot = options.blot;
        this.confDialog.range = options.range||{index:0};

        const oldPath = this.confDialog.blot.getPath();

        // path
        const pathList = this.model.getPathList();
        const select_path_elem = $('#' + this.confDialog_id + ' .datamerge-confDialog-name')[0];

        // clear select path
        select_path_elem.innerHTML = '';

        // and repopulate it
        for (let i = 0; i < pathList.length; i++) {
            let path = pathList[i];
            let opt = document.createElement('option')
            opt.value = path.name;
            opt.innerHTML = path.description + ' - ' + path.type;
            if (path.name === oldPath) {
                opt.selected = true;
            }
            select_path_elem.appendChild(opt);
        }

        // initialize the field list
        this.setFieldsList(oldPath);

        this.confDialog.style.display = "block";
    };

    setFieldsList(path) {
        // fields
        if (this.confDialog.blot instanceof DataMergeListBlot) {
            const fieldList = this.model.getFields(path);
            const select_field_elem = $('#' + this.confDialog_id + ' .datamerge-confDialog-fields')[0];
            const oldFields = this.confDialog.blot.getFields();

            // clear select fields
            select_field_elem.innerHTML = '';

            // and repopulate it
            for (let i = 0; i < fieldList.length; i++) {
                let field = fieldList[i];
                let opt = document.createElement('option')
                opt.value = field.name;
                opt.innerHTML = field.description + ' - ' + field.type;
                if (oldFields.indexOf(field.name) >= 0) {
                    opt.selected = true;
                }
                select_field_elem.appendChild(opt);
            }
        }

    }

    closeConfDialog() {
        this.confDialog.style.display = "none";
    };

}

const DataMergeModule_template =
    `<div class="datamerge-confDialog-content">
        <span class="datamerge-confDialog-close">&times;</span>
        <select class="datamerge-confDialog-name"></select>
        <br/>
        <select class="datamerge-confDialog-fields" multiple></select>
        <br/>
        <input type="button" value="ok" class="datamerge-confDialog-ok"/>
    </div>`;

class DataMergeModel {
    getData(path){};
    getPathList(){};
}
