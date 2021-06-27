import path from 'path';
import fs from 'fs';
import * as cheerio from 'cheerio';

export class ErrorHandler {
    constructor() {
        const rootPath = path.resolve();
        this.errorDocsRootPath = path.join(rootPath, 'public/html/error/');
    }

    // eslint-disable-next-line no-unused-vars
    handleNotFound = (req, res, next) => {
        res.status(404);
        res.sendFile('404.html', {root: this.errorDocsRootPath});
    }

    // eslint-disable-next-line no-unused-vars
    handleServerError = (err, req, res, next) => {
        fs.readFile(`${this.errorDocsRootPath}500.html`, 'utf8', (error, data) => {
            res.status(500);

            if (error) {
                res.sendFile('500.html', {root: this.errorDocsRootPath});
            }

            const doc = cheerio.load(data);
            doc('div.error > p').text(err);

            res.set('Content-Type', 'text/html');
            res.send(doc.html());
        });
    };
}

export const errorHandler = new ErrorHandler();
