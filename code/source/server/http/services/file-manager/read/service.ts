function pathFix(path: string): string {
    return path.replace(/^\/file\/public\/upload/g, '').replace(/\.+/g, '.').replace(/\.+$/g, '').replace(/\/+/g, '/').replace(/\/+$/g, '') || '/';
}

async function service(req, res, next, options: options) {
    const path = Tools.isString(req.body.path);
    const ext = `${path}`.replace(/\/+/g, '/').replace(/\/+$/g, '').split('.').slice(1);
    const PATH = `/file/public/upload/${path.split('.')[0]}`.replace(/\./g, '').replace(/\/+/g, '/').replace(/\/+$/g, '');

    let json: any = {
        name: '',
        type: "folder",
        path: pathFix(PATH + ext.join('.')),
        size: 0,
        items: []
    };

    try {
        const items = npm.fs.readdirSync(`${npm.currentDir()}/${PATH}`);
        const Size = await new Promise((resolve, reject) => {
            npm.getFolderSize(`${npm.currentDir()}/${PATH}`, (err, size) => {
                resolve(size);
            });
        }); 
        json.size = Size;
        for (let i = 0; i < items.length; i++) {
            const stats = npm.fs.statSync(`${npm.currentDir()}/${PATH}/${items[i]}`);
            const sizeDir = await new Promise((resolve, reject) => {
                npm.getFolderSize(`${npm.currentDir()}/${PATH}/${items[i]}`, (err, size) => {
                    resolve(size);
                });
            }); 
            
            if (stats.isFile()) {
                json.items.push({
                    "name": items[i],
                    "type": "file",
                    "path": pathFix(`${PATH}/${items[i]}` + ext.join('.')),
                    "size": stats["size"]
                });
            }
            if (stats.isDirectory()) {
                json.items.push({
                    "name": items[i],
                    "type": "folder",
                    "path": pathFix(`${PATH}/${items[i]}` + ext.join('.')),
                    "size": sizeDir,
                    "items": []
                });
            }
        }
    } catch (error) {
        json = {
            "name": "",
            "type": "folder",
            "path": pathFix(PATH + ext.join('.')),
            "size": 0,
            "items": []
        };
    }
    await response.attach(json, req, res);
}

export default service;