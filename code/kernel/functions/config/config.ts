import * as editJsonFile from 'edit-json-file';

let configuration = editJsonFile('configuration.conf.json');

semaphore.on('/module/logger/ready', () => {
    global.config = config;
    semaphore.emit('/module/config/ready');
});

async function config(key: string) {
    const value = configuration.data[key];
    console.log['kernel/config']({
        level: value ? 'trace' : 'warn',
        key: key,
        value: value
    });
    return value;
}

export default config;