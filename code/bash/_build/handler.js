const editJsonFile = require('edit-json-file');
const file = editJsonFile('package.json');
const del = require('del');
const zipdir = require('zip-dir');
const rootPath = process.argv[1].replace(/\\/g, '/').replace(/[\/]+/g, '/').split('/').slice(0, -4).join('/');

const scripts = file.get('scripts');
file.unset('scripts');
file.set('scripts', {"init": "bash code/bash/init/command.sh"});
file.save(() => {
    del.sync([`${file.get('name')}.zip`]);
    zipdir('./', {
        saveTo: `./${file.get('name')}.zip`, 
        each: path => {
            // console.log(path, "added!")
            // return ! /code$/.test(path);
        },
        filter: (path) => {
            path = path.replace(/\\/g, '/').replace(/[\/]+/g, '/');
            return !(new RegExp(`^${rootPath}/code/*`, 'g')).test(path) && !(new RegExp(`^${rootPath}/.git/*`, 'g')).test(path) && !(new RegExp(`^${rootPath}/tsconfig.json$`, 'g')).test(path);
        }
    }, function (err, buffer) {
        file.unset('scripts');
        file.set('scripts', scripts);
        file.save();
    });
});