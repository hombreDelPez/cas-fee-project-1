import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import {noteRoutes} from './routes/note-routes.js';
import {errorHandler} from './middlewares/error-handler.js';
import {commonHandler} from './middlewares/common-handler.js';

const app = express();

app.use(bodyParser.json());
app.use(commonHandler.doLogging());
app.use(express.static(path.resolve('public')));
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '/public/')});
});
app.use('/api/notes', noteRoutes);
app.use(errorHandler.handleNotFound());
app.use(errorHandler.handleServerError());

const port = 3001;
app.listen(port, () => {
    console.log(`"Noting Matters" Server running at http://localhost:${port}`);
});
