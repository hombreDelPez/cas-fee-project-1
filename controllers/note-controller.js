import {noteStorage} from '../services/note-storage.js';

export class NoteController {
    getAllNotes = async (req, res) => {
        res.json((await noteStorage.getNotes() || []));
    };

    getSingleNote = async (req, res) => {
        const passedNoteId = req.params.id;
        const foundNote = await noteStorage.getNoteById(passedNoteId);

        if (!foundNote) {
            res.status(404);
            res.send(`No note has been found with id=${passedNoteId}`);
        } else {
            res.json(foundNote);
        }
    };

    // TODO: Validate note object
    createNote = async (req, res) => {
        const createdNote = await noteStorage.addNote(req.body);

        res.location('/api/notes/' + createdNote._id);
        res.status(201);
        res.json(createdNote);
    };

    // TODO: Validate note object
    updateNote = async (req, res) => {
        const passedNote = req.body;
        const noteToUpdate = await noteStorage.getNoteById(passedNote._id);

        if (!noteToUpdate) {
            this.createNote(req, res);
        } else {
            res.json(await noteStorage.updateNote(passedNote));
        }
    };

    deleteNote = async (req, res) => {
        const passedNoteId = req.params.id;
        const noteToDelete = await noteStorage.getNoteById(passedNoteId);

        if (!noteToDelete) {
            res.status(400);
            res.send(`No note with id=${passedNoteId} exists. Therefore no deletion was executed.`);
        } else {
            res.json(await noteStorage.deleteNote(passedNoteId));
        }
    };
}

export const noteController = new NoteController();
