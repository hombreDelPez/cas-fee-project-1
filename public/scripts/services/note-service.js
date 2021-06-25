import {HttpHelper} from '../utils/http-helper.js';
import {Note} from './note.js';

export class NoteService {
    constructor() {
        this.apiBaseUrl = '/api/notes/';
        this.sorting = null;
        this.filtering = null;
    }

    async getNotes() {
        const apiData = await HttpHelper.ajax('get', this.apiBaseUrl, undefined);
        let notes = apiData.map((n) => new Note(n._id, n.title, n.description,
            n.importance, n.createDate, n.dueDate, n.finished, n.finishDate));

        if (this.sorting) {
            notes.sort(this.sorting);
        }

        if (this.filtering) {
            notes = notes.filter(this.filtering);
        }

        return notes;
    }

    async getNoteById(id) {
        return HttpHelper.ajax('get', this.apiBaseUrl + id, undefined);
    }

    async addNote(note) {
        await HttpHelper.ajax('post', this.apiBaseUrl, note);
    }

    async updateNote(note) {
        await HttpHelper.ajax('put', this.apiBaseUrl + note._id, note);
    }

    async deleteNote(noteId) {
        await HttpHelper.ajax('delete', this.apiBaseUrl + noteId, undefined);
    }
}

export const noteService = new NoteService();
