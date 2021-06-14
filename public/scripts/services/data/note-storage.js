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
        return this.notes.find((n) => n.id === id);
    }

    addNote(note) {
        this.notes.push(note);
        this.saveNotesToLocalStorageInternal(this.notes);
    }

    updateNote(note) {
        this.notes[this.getArrayIndexOfNoteInternal(note)] = note;
        this.saveNotesToLocalStorageInternal(this.notes);
    }

    deleteNote(noteId) {
        this.notes.splice(this.getArrayIndexOfNoteInternal({id: noteId}), 1);
        this.saveNotesToLocalStorageInternal(this.notes);
    }

    getArrayIndexOfNoteInternal(note) {
        return this.notes.findIndex((n) => n.id === note.id);
    }
}
