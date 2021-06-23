import Datastore from 'nedb-promise';

export class NoteStorage {
    constructor(db) {
        const options = {filename: './data/notes.db', autoload: true};
        this.db = db || new Datastore(options);
    }

    async getNotes() {
        return await this.db.find({});
    }

    async getNoteById(id) {
        return await this.db.findOne({_id: id});
    }

    async addNote(note) {
        return this.db.insert(note);
    }

    async updateNote(note) {
        await this.db.update({_id: note._id}, note);
        return await this.getNoteById(note._id);
    }

    async deleteNote(noteId) {
        const noteToRemove = await this.getNoteById(noteId);
        await this.db.remove({_id: noteId}, {});

        return noteToRemove;
    }
}

export const noteStorage = new NoteStorage();
