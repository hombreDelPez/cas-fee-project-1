import express from 'express';
import {noteController} from '../controllers/note-controller.js';

const router = express.Router();

router.get('/', noteController.getAllNotes);
router.get('/:id/', noteController.getSingleNote);
router.post('/', noteController.createNote);
router.put('/:id/', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export const noteRoutes = router;
