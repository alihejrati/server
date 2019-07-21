async function errorHandler(error, type: string) {
    if (divert.some(rx => ! rx.test(error))) {
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
    /^TypeError: console.log.\w* is not a function/
];

async function guard() {
    process.on('uncaughtException', async error => await errorHandler(error, 'uncaughtException'));
    process.on('unhandledRejection', async error => await errorHandler(error, 'unhandledRejection'));
    process.on('warning', async error => await errorHandler(error, 'warning'));
}

export default guard;