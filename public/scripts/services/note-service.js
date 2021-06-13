import {NoteStorage} from './data/note-storage.js';
import {Note} from './note.js';

export class NoteService {
    constructor(storage) {
        this.storage = storage || new NoteStorage();
    }

    getNotes(orderBy, filterBy) {
        let notes = this.storage.getNotes().map((n) => new Note(n.id, n.title, n.description,
            n.importance, n.createDate, n.dueDate, n.finished, n.finishDate));

        if (orderBy) {
            notes.sort(orderBy);
        }

        if (filterBy) {
            notes = notes.filter(filterBy);
        }

        return notes;
    }

    getNoteById(id) {
        const noteData = this.storage.getNoteById(id);

        return new Note(noteData.id, noteData.title, noteData.description, noteData.importance,
            noteData.createDate, noteData.dueDate, noteData.finished, noteData.finishDate);
    }

    addNote(note) {
        this.storage.addNote(note);
    }

    updateNote(note) {
        this.storage.updateNote(note);
    }
}

export const noteService = new NoteService();
