import {noteStorage} from '../services/note-storage.js';
import {Note} from '../public/scripts/services/note.js';

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

    createNote = async (req, res) => {
        const tryParse = NoteController.tryParseNote(req.body);
        if (!tryParse.isValid) {
            res.status(400);
            res.send('Object in request body is not valid!');
        } else {
            const createdNote = await noteStorage.addNote(tryParse.note);
            res.location(`/api/notes/${createdNote._id}`);
            res.status(201);
            res.json(createdNote);
        }
    };

    updateNote = async (req, res) => {
        const passedNote = req.body;
        const noteToUpdate = await noteStorage.getNoteById(passedNote._id);
        const tryParse = NoteController.tryParseNote(passedNote);

        if (!tryParse.isValid) {
            res.status(400);
            res.send('Object in request body is not valid!');
        } else {
            // eslint-disable-next-line no-lonely-if
            if (!noteToUpdate) {
                this.createNote(req, res);
            } else {
                res.json(await noteStorage.updateNote(passedNote));
            }
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

    static tryParseNote(payload) {
        if (!payload.title || !payload.description || !payload.importance
            || !payload.createDate || !payload.dueDate) {
            return {isValid: false};
        }

        if (typeof payload.finished !== 'boolean') {
            return {isValid: false};
        }

        if (payload.finished) {
            if (typeof payload.finishDate === 'undefined') {
                return {isValid: false};
            }
        }

        const note = new Note(payload._id, payload.title, payload.description, payload.importance,
            payload.createDate, payload.dueDate, payload.finished, payload.finishDate);

        return {isValid: true, note};
    }
}

export const noteController = new NoteController();
