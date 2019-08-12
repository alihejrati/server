async function errorHandler(error, type: string) {
    let flag = true;
    for (const rx of divert) {
        if (rx.test(error.toString())) {
            flag = false;
            break;
        }
    }
    if (flag) {
        const level = ['warning'].indexOf(type) >= 0 ? type : 'error';
        let err: string = '';

        err += `<error handler>`;
        err += (`type: ${type}`);
        err += (`${error}`);
        err += `</error handler>`;

        console.log[level](err);
    }
}

const divert = [
    /^TypeError: console.log.\w* is not a function/,
    /.*MongoError: Client Error: bad object in message: BSONObj exceeded maximum nested object depth: 200/,
    /.*EBUSY: resource busy or locked.*/,
];

async function guard() {
    process.on('uncaughtException', async error => await errorHandler(error, 'uncaughtException'));
    process.on('unhandledRejection', async error => await errorHandler(error, 'unhandledRejection'));
    process.on('warning', async error => await errorHandler(error, 'warning'));
}

export default guard;