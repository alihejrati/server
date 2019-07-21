import stack from '../../../../components/stack/stack';

async function boot(options: options) {
    global.stack = stack;
}

export default callback(boot);