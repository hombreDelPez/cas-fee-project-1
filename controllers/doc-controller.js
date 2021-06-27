import path from 'path';

export class DocController {
    constructor() {
        const rootPath = path.resolve();
        this.publicRootPath = path.join(rootPath, 'public/');
    }

    getIndexDocument = async (req, res) => {
        res.sendFile('html/index.html', {root: this.publicRootPath});
    }

    getCreateDocument = async (req, res) => {
        res.sendFile('html/note-detail.html', {root: this.publicRootPath});
    }

    getEditDocument = async (req, res) => {
        res.sendFile('html/note-detail.html', {root: this.publicRootPath});
    }
}

export const docController = new DocController();
