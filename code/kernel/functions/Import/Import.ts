import * as currentDir from 'current-dir';
import * as fileExists from 'file-exists';

async function Import(path: string): Promise<any> {
    path = `${currentDir()}/${path}`.replace(/\\/g, '/').replace(/\/+/g, '/');
    if (fileExists.sync(path)) {
        console.log['kernel/import']({
            level: 'trace',
            path: path
        });
        return import(path);   
    } else {
        console.log['kernel/import']({
            level: 'warn',
            path: path
        });
        return undefined; 
    }
}

global.Import = Import;

export default Import;