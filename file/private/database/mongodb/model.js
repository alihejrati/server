/*

  _    _    ___    ___    ___   _     
 | \  / |  / _ \  |   \  | __| | |    
 | |\/| | | (_) | | |) | | _|  | |__  
 |_|  |_|  \___/  |___/  |___| |____| 


*/

var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

var db = mongoose.createConnection('mongodb://localhost:27017/db', {useNewUrlParser: true});

var db_config = db.model('config', new mongoose.Schema({"key":{"type":"String","index":true,"unique":true,"required":true},"value":{"type":"Object","default":{}},"sort":{"type":"Number","default":1}}, {timestamps: true}));
var db_stack = db.model('stack', new mongoose.Schema({"stack":{"type":"Array","default":[]},"sort":{"type":"Number","default":1}}, {timestamps: true}));
var db_user = db.model('user', new mongoose.Schema({"username":{"type":"String"},"password":{"type":"String"},"sort":{"type":"Number","default":1}}, {timestamps: true}));

module.exports.db_config = db_config;
module.exports.db_stack = db_stack;
module.exports.db_user = db_user;

/*

  ___   ___   ___   ___    ___   ___  
 / __| | __| | __| |   \  | __| | _ \ 
 \__ \ | _|  | _|  | |) | | _|  |   / 
 |___/ |___| |___| |___/  |___| |_|_\ 


*/

(async () => {
    const document = await db_config.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [{"key":"\\code\\source\\server\\http\\listen.conf.json","value":[{"name":"frontend","host":"localhost","port":"8080"},{"name":"backend","host":"localhost","port":"8081"}]},{"key":"\\code\\source\\server\\socket\\listen.conf.json","value":{"name":"socket","host":"localhost","port":"3000"}}];
    if (!value) {
        const database = 'db';
        const collection  = 'config';
        const documents = await db_config.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_stack.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'stack';
        const documents = await db_stack.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_user.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'user';
        const documents = await db_user.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();