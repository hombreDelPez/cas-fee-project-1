import moment from 'moment';
import {Helper} from '../utils/helper';

export class Note {
    constructor(title, description, importance, dueDate) {
        this.id = Helper.uuidv4();
        this.title = title;
        this.description = description;
        this.importance = importance || 3;
        this.createDate = moment().format();
        this.dueDate = dueDate;
        this.finished = false;
        this.finishDate = null;
    }
}
