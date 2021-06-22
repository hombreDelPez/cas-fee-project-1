import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import {noteRoutes} from './routes/note-routes.js';

const app = express();

app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '/public/')});
});

app.use('/api/notes', noteRoutes);

const port = 3001;

app.listen(port, () => {
    console.log(`"Noting Matters" Server running at http://localhost:${port}`);
});
