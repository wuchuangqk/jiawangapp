import { ListItem } from './list-item-model';

export class List {
    id: number;
    title: string;
    createDate: Date;
    doneDate: Date;
    done: boolean;
    items: ListItem[];

    constructor( title: string ) {
        this.title = title;
        this.createDate = new Date();
        this.done = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}