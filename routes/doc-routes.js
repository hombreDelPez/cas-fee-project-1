import express from 'express';
import {docController} from '../controllers/doc-controller.js';

const router = express.Router();

router.get('/', docController.getIndexDocument);
router.get('/create/', docController.getCreateDocument);
router.get('/edit', docController.getEditDocument);

export const docRoutes = router;
