import Tools from '../../../../components/tools/tools';

async function boot(options: options) {
    global.Tools = Tools;
}

export default callback(boot);