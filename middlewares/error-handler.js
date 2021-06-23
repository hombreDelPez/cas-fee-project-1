export class ErrorHandler {
    handleNotFound = () => {
        // eslint-disable-next-line no-unused-vars
        return (req, res, next) => {
            res.status(404);
            res.send('404 - Not Found');
        };
    };

    handleServerError = () => {
        // eslint-disable-next-line no-unused-vars
        return (err, req, res, next) => {
            res.status(500);
            res.send('500 - An Error occurred');
        };
    };
}

export const errorHandler = new ErrorHandler();
