import path from 'path';
import fs from 'fs';
import * as cheerio from 'cheerio';

export class DocController {
    constructor() {
        const rootPath = path.resolve();
        this.docRootPath = path.join(rootPath, 'public/html/');
    }

    getIndexDocument = async (req, res) => {
        res.sendFile('index.html', {root: this.docRootPath});
    }

    getCreateDocument = (req, res) => {
        fs.readFile(`${this.docRootPath}note-detail.html`, 'utf8',
            DocController.readFileCallback('Create Note ', 'Create a new Note', req, res));
    }

    getEditDocument = (req, res) => {
        fs.readFile(`${this.docRootPath}note-detail.html`, 'utf8',
            DocController.readFileCallback('Edit Note ', 'Edit an existing Note', req, res));
    }

    static readFileCallback(titlePrefix, h1Text, req, res) {
        return (error, data) => {
            if (error) {
                throw error;
            }

            const doc = cheerio.load(data);

            const title = doc('title');
            title.text(`${titlePrefix}${title.text()}`);

            const h1 = doc('h1');
            h1.text(h1Text);

            res.set('Content-Type', 'text/html');
            res.send(doc.html());
        };
    }
}

export const docController = new DocController();
