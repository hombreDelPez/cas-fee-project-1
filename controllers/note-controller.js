import {noteStorage} from '../services/note-storage.js';

export class NoteController {
    getAllNotes = async (req, res) => {
        res.json((await noteStorage.getNotes() || []));
    };

    getSingleNote = async (req, res) => {
        const foundNote = await noteStorage.getNoteById(req.params.id);

        if(!foundNote) {
            res.status(404);
            res.send('No note has been found with id=' + req.params.id);
        } else {
            res.json(foundNote);
        }
    };

    createNote = async (req, res) => {
        const createdNote = await noteStorage.addNote(req.body);

        res.location('/api/notes/' + createdNote._id);
        res.status(201);
        res.json(createdNote);
    };

    updateNote = async (req, res) => {
        res.json(await noteStorage.updateNote(req.body));
    };

    deleteNote = async (req, res) => {
        res.json(await noteStorage.deleteNote(req.params.id));
    };
}

export const noteController = new NoteController();
