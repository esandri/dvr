
class HSEModel extends DataMergeModel {
    getPathList() {
        return [
            { 'name':'project', 'description': 'project', 'type':'obejct' },
            { 'name':'project.name', 'description': 'name', 'type':'string' },
            { 'name':'project.plan', 'description': 'plan', 'type':'string' },
            { 'name':'project.offices', 'description': 'offices', 'type':'array' },
            { 'name':'project.offices.0', 'description': 'office', 'type':'obejct' },
            { 'name':'project.offices.0.name', 'description': 'name', 'type':'string' },
            { 'name':'project.offices.0.vat', 'description': 'vat', 'type':'string' },
            { 'name':'project.offices.0.address', 'description': 'address', 'type':'string' },
            { 'name':'project.offices.0.persons', 'description': 'persons', 'type':'array' },
            { 'name':'project.offices.0.persons.0', 'description': 'person', 'type':'object' },
            { 'name':'project.offices.0.persons.0.start_date', 'description': 'start_date', 'type':'date' },
            { 'name':'project.offices.0.persons.0.end_date', 'description': 'end_date', 'type':'date' },
            { 'name':'project.offices.0.persons.0.started_at', 'description': 'started_at', 'type':'date' },
            { 'name':'project.offices.0.persons.0.ended_at', 'description': 'ended_at', 'type':'date' },
            { 'name':'project.offices.0.persons.0.first_name', 'description': 'first_name', 'type':'string' },
            { 'name':'project.offices.0.persons.0.last_name', 'description': 'last_name', 'type':'string' },
            { 'name':'project.offices.0.persons.0.note', 'description': 'note', 'type':'string' },
            { 'name':'project.offices.0.persons.0.status', 'description': 'status', 'type':'string' },
            { 'name':'project.offices.0.persons.0.isEmployee', 'description': 'isEmployee', 'type':'boolean' },
            { 'name':'project.offices.0.persons.0.isPreventionPeople', 'description': 'isPreventionPeople', type:'boolean' },
            { 'name':'project.offices.0.persons.0.person.code', 'description': 'code', 'type':'string' }
        ];
    }

    /**
     * return the direct child of a path filtered by type
     * @param path string
     * @param filter object the filter to apply
     *                      - listTypes array list of type that we want
     *                      - include boolean if true extract only the given list types
     *                                        if false extract the list types not presents on listTypes
     * @return array the list of path (relative)
     */
    getChildren (path, filter) {
        let result = [];
        const list = this.getPathList();
        for (let i = 0; i < list.length; i++) {
            let p = list[i];
            let present = filter.listTypes.indexOf(p.type) >= 0;
            let satisfied = filter.include ? present:!present;
            if (satisfied) {
                result.push(p);
            }
        }
        return result;
    }

    /**
     * return the list of fields for the given path (probably only for object)
     * @param path
     */
    getFields(path) {
        const list = this.getChildren(path, {
            listTypes: ['array', 'object'],
            include: false
        });
        return list;
    }

    getData(path) {
        return HSEModel.byString(this.data, path);
    }

    static byString(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }

    static toString(o, base = []) {
        let r = [];
        if (o !== null && (typeof o === 'object' || typeof o === 'array')) {
            for (let k in o) {
                if (o.hasOwnProperty(k)) {
                    r.push([...base, k].join('.'));
                    let r_children = HSEModel.toString(o[k], [...base, k]);
                    if (r_children.length > 0) {
                        r.push(...r_children);
                    }
                }
            }
        }
        return r;
    }

    constructor() {
        super();
        this.path = {
            project: {
                name: 'Sample project',
                plan: '4HSE-50 Month',
                offices: [
                    {
                        name: 'Branch 1',
                        vat: '1234567890',
                        address: '15 avenue',
                        persons: [
                            {
                                "start_date":null,
                                "end_date":null,
                                "started_at":null,
                                "ended_at":null,
                                "person": {
                                    "first_name":"David",
                                    "last_name":"Passilongo",
                                    "note":"d.passilongo@e-time.it",
                                    "status":10,
                                    "isEmployee":1,
                                    "isPreventionPeople":0,
                                    "code":"d.passilongo"
                                }
                            }
                        ]
                    },
                ]
            }
        };
        this.data = {
            project: {
                name: 'E-time',
                plan: '4HSE-50 Month',
                offices: [
                    {
                        name: 'San Martino Buon Albergo',
                        vat: '032560402',
                        address: 'viale del Lavoro 45',
                        persons: [
                            {"person_office_id":"po58c685843ba1b","office_id":"1489398790361","person_id":"58c685188a053","start_date":null,"end_date":null,"work_hours":null,"work_turn":null,"work_night":null,"work_alone":null,"fit":null,"enabled":1,"project_id":"prj588f24f82c7ec","started_at":null,"ended_at":null,"person":{"person_id":"58c685188a053","first_name":"David","last_name":"Passilongo","street":null,"locality":null,"postal_code":null,"region":null,"country":null,"birth_date":null,"tax_code":null,"note":"d.passilongo@e-time.it","entity_id":null,"project_id":"prj588f24f82c7ec","started_at":null,"ended_at":null,"status":10,"isEmployee":1,"isPreventionPeople":0,"code":"d.passilongo","birth_place":null},"id":"po58c685843ba1b"},
                            {"person_office_id":"po58c6858444036","office_id":"1489398790361","person_id":"58c685188ab1c","start_date":null,"end_date":null,"work_hours":null,"work_turn":null,"work_night":null,"work_alone":null,"fit":null,"enabled":1,"project_id":"prj588f24f82c7ec","started_at":null,"ended_at":null,"person":{"person_id":"58c685188ab1c","first_name":"Emanuele","last_name":"Sandri","street":null,"locality":null,"postal_code":null,"region":null,"country":null,"birth_date":null,"tax_code":null,"note":"e.sandri@e-time.it","entity_id":"emanuele@e-time.it","project_id":"prj588f24f82c7ec","started_at":null,"ended_at":null,"status":10,"isEmployee":1,"isPreventionPeople":0,"code":"e.sandri","birth_place":null},"id":"po58c6858444036"},
                            {"person_office_id":"po58c6858451988","office_id":"1489398790361","person_id":"58c685188b09f","start_date":null,"end_date":null,"work_hours":null,"work_turn":null,"work_night":null,"work_alone":null,"fit":null,"enabled":1,"project_id":"prj588f24f82c7ec","started_at":null,"ended_at":null,"person":{"person_id":"58c685188b09f","first_name":"Federico","last_name":"Anselmi","street":null,"locality":null,"postal_code":null,"region":null,"country":null,"birth_date":null,"tax_code":null,"note":"f.anselmi@e-time.it","entity_id":null,"project_id":"prj588f24f82c7ec","started_at":null,"ended_at":null,"status":10,"isEmployee":1,"isPreventionPeople":0,"code":"f.anselmi","birth_place":null},"id":"po58c6858451988"}
                        ]
                    },
                    {
                        name: 'Capurso',
                        vat: '032560402',
                        address: 'Via della Stazione',
                        persons: []
                    }
                ]
            }
        }
    }
}

