import * as currentDir from 'current-dir';
import * as fileExists from 'file-exists';

async function fileExist(path: string) {
    return fileExists.sync(`${currentDir()}/${path}`.replace(/\\/g, '/').replace(/\/+/g, '/'));
}

async function Import(path: string): Promise<any> {
    path = `/${path}`.replace(/\\/g, '/').replace(/\/+/g, '/');
    let extensions = (path.split('/').pop() || '').split('.');
    const filename = extensions.shift();
    path = extensions.length == 0 ? `${path}.ts` : path;
    extensions = extensions.length == 0 ? ['ts'] : extensions;
    
    if (extensions.length == 1) {
        switch (extensions[0]) {
            case 'ts':
                let changedPath = path.replace(/\.ts$/g, '.js');
                if (await fileExist(changedPath)) {
                    path = changedPath;
                } else {
                    path = `/compile/${changedPath}`;
                }
                break;
        
            default:
                break;
        }
    }

    if (await fileExist(path)) {
        console.log['kernel/import']({
            level: 'trace',
            path: `${currentDir()}/${path}`.replace(/\\/g, '/').replace(/\/+/g, '/')
        });
        return import(`${currentDir()}/${path}`.replace(/\\/g, '/').replace(/\/+/g, '/'));   
    } else {
        console.log['kernel/import']({
            level: 'warn',
            path: `${currentDir()}/${path}`.replace(/\\/g, '/').replace(/\/+/g, '/')
        });
        return undefined; 
    }
}

global.Import = Import;

export default Import;