import path from 'path';

export class ErrorHandler {
    // eslint-disable-next-line arrow-body-style
    handleNotFound = (rootPath) => {
        // eslint-disable-next-line no-unused-vars
        return (req, res, next) => {
            res.status(404);
            res.sendFile('html/error/404.html', {root: path.join(rootPath, '/public/')});
        };
    };

    // eslint-disable-next-line arrow-body-style
    handleServerError = (rootPath) => {
        // eslint-disable-next-line no-unused-vars
        return (err, req, res, next) => {
            res.status(500);
            res.sendFile('html/error/500.html', {root: path.join(rootPath, '/public/')});
        };
    };
}

export const errorHandler = new ErrorHandler();
