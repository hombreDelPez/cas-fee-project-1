export class CommonHandler {
    doLogging = () => {
        let reqCount = 0;

        return (req, res, next) => {
            console.log(`#${++reqCount} | ${req.method} | ${req.url}`);
            next();
        }
    }
}

export const commonHandler = new CommonHandler();
