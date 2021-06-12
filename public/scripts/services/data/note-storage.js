export class NoteStorage {
    constructor() {
        this.localStorageKey = 'notes_store';
        this.notes = this.getNotesFromLocalStorageInternal();
        this.saveNotesToLocalStorageInternal(this.notes);
    }

    saveNotesToLocalStorageInternal(notes) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(notes));
    }

    getNotesFromLocalStorageInternal() {
        return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    }

    getNotes() {
        return this.notes;
    }

    getNoteById(id) {
        return this.notes.find(n => n.id === id);
    }

    addNote(note) {
        this.notes.push(note);
        this.saveNotesToLocalStorageInternal(this.notes);
    }

    updateNote(note) {
        let index = this.notes.findIndex(n => n.id === note.id);
        this.notes[index] = note;
        this.saveNotesToLocalStorageInternal(this.notes);
    }
}
