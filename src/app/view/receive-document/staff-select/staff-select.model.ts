import { Staff } from './staff-model';

export class Contact {
    public departArray: Array<Depart> = new Array<Depart>();
    public staffArray: Array<Staff> = new Array<Staff>();

    public static parseJson(json: any) {
        const c = new Contact();
        const departArray = Depart.parseJson(json.departs);
        const staffArray = Staff.parseJson(json.staffs);
        c.departArray = departArray;
        c.staffArray = staffArray;
        return c;
    }
}

export class Depart {
    id: string;
    name: string;
    staffNum: string;

    public static parseJson(json: any) {
        const datas = new Array<Depart>();
        for (const item of json) {
            const d = new Depart();
            d.id = item.id;
            d.name = item.name;
            d.staffNum = item.staff_num;
            datas.push(d);
        }
        return datas;
    }
}
