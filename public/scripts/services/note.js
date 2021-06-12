import moment from 'moment';
import {Helper} from '../utils/helper';

export class Note {
    constructor(id = undefined, title, description,
                importance, createDate = undefined,
                dueDate, finished = false, finishDate) {
        this.id = id || Helper.uuidv4();
        this.title = title;
        this.description = description;
        this.importance = importance || 3;
        this.createDate = createDate || moment().format();
        this.dueDate = dueDate;
        this.finished = finished;
        this.finishDate = finishDate;
    }
}
