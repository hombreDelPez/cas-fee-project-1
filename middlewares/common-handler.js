import moment from 'moment';

export class CommonHandler {
    doLogging = () => {
        let reqCount = 0;

        return (req, res, next) => {
            // eslint-disable-next-line no-console,max-len
            console.log(`${moment().format('DD.MM.YY HH:mm:ss')} | Request #${++reqCount} | ${req.method} | ${req.url}`);
            next();
        };
    }
}

export const commonHandler = new CommonHandler();
