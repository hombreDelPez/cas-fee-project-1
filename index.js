import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import {noteRoutes} from './routes/note-routes.js';
import {errorHandler} from './middlewares/error-handler.js';
import {commonHandler} from './middlewares/common-handler.js';

const app = express();
const rootPath = path.resolve();

app.use(bodyParser.json());
app.use(commonHandler.doLogging());
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('public/html')));
app.get('/', (req, res) => {
    res.sendFile('html/index.html', {root: path.join(rootPath, '/public/')});
});
app.use('/api/notes', noteRoutes);
app.use(errorHandler.handleNotFound(rootPath));
app.use(errorHandler.handleServerError(rootPath));

const port = 3001;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`"Noting Matters" Server running at http://localhost:${port}`);
});
