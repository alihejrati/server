async function service(req, res, next, options: options) {
    const path = Tools.isString(req.body.path);
    const ext = `${path}`.replace(/\/+/g, '/').replace(/\/+$/g, '').split('.').slice(1);
    const PATH = `${npm.currentDir()}/file/public/upload/${path.split('.')[0]}`.replace(/\./g, '').replace(/\/+/g, '/').replace(/\/+$/g, '');

    try {
        console.debug('----------->', path)
        if (req.files.file) {
            console.debug('----------->', Object.keys(req.files.file))
            req.files.file.mv(PATH + "/" + req.files.file.name);
            // await new Promise((resolve, reject) => {
                // npm.fs.writeFile(PATH + "/" + req.files.file.name, req.filse.file.data, async function (err) {
                //     if (err) {throw err} else {
                //         await response.attach(null, req, res);
                //     }
                // });
            // });

        } else {
            throw 'Error';
        }
    } catch (error) {
        console.error('----------------------------------------------------------->', error);
        options['service'].code(options['service'].status.conflict);
        await response.attach(options['service'].error, req, res);
    }
}

export default service;