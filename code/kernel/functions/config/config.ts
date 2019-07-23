import * as currentDir from 'current-dir';
import * as editJsonFile from 'edit-json-file';
import * as gulp from 'gulp';
import * as jsonTree from 'gulp-json-tree';
import nodeWatch from 'node-watch';

const Model = require(`${currentDir()}/file/private/database/mongodb/model.js`)['db_config'];

let configuration = editJsonFile('configuration.conf.json');

semaphore.on('/module/logger/ready', () => {
    global.config = config;
    semaphore.emit('/module/config/ready');
});

nodeWatch(`${currentDir()}/file/private/configuration`, { recursive: true }, (event, name) => {
    const stream = gulp.src('file/private/configuration/**/*.conf.json')
    .pipe(jsonTree({filename: 'configuration.conf.json'}))
    .pipe(gulp.dest('.'))
    stream.on('end', function() {
        configuration = editJsonFile('configuration.conf.json');
        if (/logger\.conf\.json$/g.test(name) && event == 'update') {
            semaphore.emit('/module/config/change[logger.conf.json]', configuration.data['\\code\\kernel\\functions\\logger.conf.json']);
        } 
    });
});

async function config(key: string) {
    let value = configuration.data[key];
    if (! /logger\.conf\.json$/g.test(key)) {
        const document = await Model.findOne({key: key}).sort({}).select({}) || {};
        value = (JSON.parse(JSON.stringify(document)))['value'] || value;
    }
    console.log['kernel/config']({
        level: value ? 'trace' : 'warn',
        key: key,
        value: value
    });
    return value;
}

export default config;