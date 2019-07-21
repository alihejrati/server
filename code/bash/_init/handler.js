const cfonts = require('cfonts');
const fs = require('fs');
const currentDir = require('current-dir');
const gulp = require('gulp');
const jsonTree = require('gulp-json-tree');
const editJsonFile = require('edit-json-file');
const file = editJsonFile('package.json');
const name = process.argv[1].replace(/\\/g, '/').replace(/\/+/g, '/').split('/').slice(0, -4).pop();

const scripts = {
    "init": "bash code/bash/_init/command.sh",
    "build": "bash code/bash/_build/command.sh",
    "start": "bash code/bash/_start/command.sh"
};

file.unset('scripts');
file.set('main', 'driver.sh');
file.set('name', name);
file.set('scripts', scripts);
file.set('author', 'alihejrati');
file.set('telegram', '@alihejrati75');
file.save();

const stream = gulp.src('file/private/configuration/**/*.conf.json')
.pipe(jsonTree({
    filename: 'configuration.conf.json'
}))
.pipe(gulp.dest('.'))

stream.on('end', function() {
    // file: mongodb/model.js
    const connection = [];
    const schema = [];
    const moduleExport = [];
    const configuration = require(`${currentDir()}/configuration.conf.json`);
    const keys = Object.keys(configuration);
    for (const key of keys) {
        const _key = key.toLowerCase().split('\\');
        if (/^\\database\\mongodb\\[a-zA-Z0-9]+\\dsn.conf.json$/g.test(key)) {
            connection.push(`var ${_key[3]} = mongoose.createConnection('${configuration[key]}', {useNewUrlParser: true});`);
        }
        if (/^\\database\\mongodb\\[a-zA-Z0-9]+\\collection\\[a-zA-Z0-9]+\\schema.conf.json$/g.test(key)) {
            configuration[key].sort = {
                "type": "Number",
                "default": 1
            };
            schema.push(`var ${_key[3]}_${_key[5]} = ${_key[3]}.model('${_key[5]}', new mongoose.Schema(${JSON.stringify(configuration[key])}, {timestamps: true}));`);
            moduleExport.push(`module.exports.${_key[3]}_${_key[5]} = ${_key[3]}_${_key[5]};`);
        }
    }
    const header = cfonts.render('model.js\ndynamically created by alihejrati', {
        font: 'simple',              // define the font face
        align: 'left',              // define text alignment
        colors: ['system'],         // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 0,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: true,                // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',             // define how many character can be on one line
    });
    const file = `/*\n${header.string}\n*/\n\nvar mongoose = require('mongoose');\n\nmongoose.set('useCreateIndex', true);\nmongoose.set('useFindAndModify', false);\n\n${connection.join('\n')}\n\n${schema.join('\n')}\n\n${moduleExport.join('\n')}`;
    fs.writeFile(`${currentDir()}/file/private/database/mongodb/model.js`, file, function(err) {
        if(err) {
            return console.log(err);
        }
        const time = new Date();
        console.log(`[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] Generated mongodb/model.js`);
    }); 
});
stream.on('end', function() {
    // file: redis/model.js
    const connection = [];
    const moduleExport = [];
    const configuration = require(`${currentDir()}/configuration.conf.json`);
    const keys = Object.keys(configuration);
    for (const key of keys) {
        const _key = key.toLowerCase().split('\\');
        if (/^\\database\\redis\\[a-zA-Z0-9]+\\dsn.conf.json$/g.test(key)) {
            connection.push(`var ${_key[3]} = redis.createClient(${JSON.stringify(configuration[key])});`);
            moduleExport.push(`module.exports.${_key[3]} = ${_key[3]};`);
        }
    }
    const header = cfonts.render('model.js\ndynamically created by alihejrati', {
        font: 'simple',              // define the font face
        align: 'left',              // define text alignment
        colors: ['system'],         // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 0,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: true,                // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',             // define how many character can be on one line
    });
    const file = `/*\n${header.string}\n*/\n\nvar redis = require('redis');\n\n${connection.join('\n')}\n\n${moduleExport.join('\n')}`;
    fs.writeFile(`${currentDir()}/file/private/database/redis/model.js`, file, function(err) {
        if(err) {
            return console.log(err);
        }
        const time = new Date();
        console.log(`[${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] Generated redis/model.js`);
    }); 
});
stream.on('end', function() {
});