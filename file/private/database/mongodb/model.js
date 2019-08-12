/*

  _    _    ___    ___    ___   _     
 | \  / |  / _ \  |   \  | __| | |    
 | |\/| | | (_) | | |) | | _|  | |__  
 |_|  |_|  \___/  |___/  |___| |____| 


*/

var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

var baran = mongoose.createConnection('mongodb://localhost:27017/SERVER#baran', {useNewUrlParser: true});
var db = mongoose.createConnection('mongodb://localhost:27017/SERVER#db', {useNewUrlParser: true});

var baran_faq = baran.model('faq', new mongoose.Schema({"question":{"type":"String","required":true,"unique":true},"answer":{"type":"String","required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var baran_game = baran.model('game', new mongoose.Schema({"title":{"type":"String","required":true},"description":{"type":"String"},"type":{"type":"String","enum":["indore","outdor"],"required":true},"url":{"type":"String"},"imgs":{"type":["String"]},"suggest":{"type":"String"},"players":{"type":"String"},"age":{"type":"String","enum":["child","teen","young"],"required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var baran_manualwork = baran.model('manualwork', new mongoose.Schema({"title":{"type":"String","required":true},"description":{"type":"String"},"level":{"type":"String","enum":["easy","medium","hard"],"required":true},"url":{"type":"String"},"imgs":{"type":["String"]},"suggest":{"type":"String"},"requiredsupplies":{"type":[{"key":"String","value":"String"}]},"Kind":{"type":["String"],"required":true},"primarysubstance":{"type":["String"],"required":true},"time":{"type":{"count":"integer","step":"integer","unit":{"type":"String","enum":["sec","min","hour"],"default":"min"}}},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_captcha = db.model('captcha', new mongoose.Schema({"key":{"type":"String","index":true,"required":true},"value":{"type":"String","index":true,"required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_config = db.model('config', new mongoose.Schema({"key":{"type":"String","index":true,"unique":true,"required":true},"value":{"type":"Object","default":{}},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_permission = db.model('permission', new mongoose.Schema({"label":"String","name":{"type":"String","index":true,"unique":true,"required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_request = db.model('request', new mongoose.Schema({"response":{"type":"Object"},"_":{"type":"Object"},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_role = db.model('role', new mongoose.Schema({"label":"String","name":{"type":"String","index":true,"unique":true,"required":true},"permission":["ObjectId"],"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_socket = db.model('socket', new mongoose.Schema({"state":{"type":"String","enum":["connect","disconnect"],"index":true,"required":true},"socketId":{"type":"String","index":true,"required":true},"event":{"type":"Object"},"message":{"type":"Object"},"_":{"type":"Object"},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_stack = db.model('stack', new mongoose.Schema({"stack":{"type":"Array","default":[]},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_user = db.model('user', new mongoose.Schema({"username":{"type":"String","index":true,"unique":true,"required":true},"password":{"type":"String","index":true,"required":true},"role":{"type":"ObjectId","index":true,"required":true},"view":{"type":"ObjectId","index":true,"required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));
var db_view = db.model('view', new mongoose.Schema({"label":"String","name":{"type":"String","index":true,"unique":true,"required":true},"branch":{"type":"Object","index":true,"required":true,"default":{"@frontend":"/basic","@backend":"/robust/html/RTL/vertical-overlay-menu-template"}},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false}}}, {timestamps: true}));

module.exports.baran_faq = baran_faq;
module.exports.baran_game = baran_game;
module.exports.baran_manualwork = baran_manualwork;
module.exports.db_captcha = db_captcha;
module.exports.db_config = db_config;
module.exports.db_permission = db_permission;
module.exports.db_request = db_request;
module.exports.db_role = db_role;
module.exports.db_socket = db_socket;
module.exports.db_stack = db_stack;
module.exports.db_user = db_user;
module.exports.db_view = db_view;

/*

  ___   ___   ___   ___    ___   ___  
 / __| | __| | __| |   \  | __| | _ \ 
 \__ \ | _|  | _|  | |) | | _|  |   / 
 |___/ |___| |___| |___/  |___| |_|_\ 


*/

(async () => {
    const document = await baran_faq.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [{"question":"چطوری بارانی بشم؟!","answer":"کافیه تا دفتر باران بیای :)"}];
    if (!value) {
        const database = 'baran';
        const collection  = 'faq';
        const documents = await baran_faq.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await baran_game.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'baran';
        const collection  = 'game';
        const documents = await baran_game.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await baran_manualwork.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'baran';
        const collection  = 'manualwork';
        const documents = await baran_manualwork.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_captcha.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'captcha';
        const documents = await db_captcha.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_config.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [{"key":"\\code\\source\\components\\captcha\\check.conf.json","value":{"expire":{"minute":6}}},{"key":"\\code\\source\\components\\model\\redis\\set.conf.json","value":{"expire":900}},{"key":"\\code\\source\\server\\http\\listen.conf.json","value":[{"name":"frontend","host":"0.0.0.0","port":"8080"},{"name":"backend","host":"0.0.0.0","port":"8081"}]},{"key":"\\code\\source\\server\\socket\\listen.conf.json","value":{"name":"socket","host":"localhost","port":"3000"}},{"key":"\\code\\source\\server\\http\\router.conf.json","value":{"/backend/تست2/تست":"/test/test2.php"}},{"key":"\\code\\source\\server\\socket\\router.conf.json","value":{"/تست2/تست":"/test/test2.php"}},{"key":"\\code\\source\\server\\http\\cookies.conf.json","value":{"name":"SERVER:server/http","expire":86400000}},{"key":"\\code\\source\\server\\socket\\cookies.conf.json","value":{"name":"SERVER:server/socket","expire":86400000}},{"key":"\\npm\\jwt.conf.json","value":{"secret":"secret-CODE"}},{"key":"\\code\\source\\server\\http\\status.conf.json","value":{"continue":100,"switchingProtocols":101,"processing":102,"successful":200,"created":201,"accepted":202,"nonAuthoritativeInformation":203,"noContent":204,"resetContent":205,"partialContent":206,"multiStatus":207,"alreadyReported":208,"iMUsed":226,"multipleChoices":300,"movedPermanently":301,"found":302,"seeOther":303,"notModified":304,"useProxy":305,"unused":306,"temporaryRedirect":307,"permanentRedirect":308,"badRequest":400,"unauthorized":401,"paymentRequired":402,"forbidden":403,"notFound":404,"methodNotAllowed":405,"notAcceptable":406,"proxyAuthenticationRequired":407,"requestTimeout":408,"conflict":409,"gone":410,"lengthRequired":411,"preconditionFailed":412,"requestEntityTooLarge":413,"requestURITooLong":414,"unsupportedMediaType":415,"requestedRangeNotSatisfiable":416,"expectationFailed":417,"teapot":418,"enhanceYourCalm":420,"unprocessableEntity":422,"locked":423,"failedDependency":424,"reservedForWebDAV":425,"upgradeRequired":426,"preconditionRequired":428,"tooManyRequests":429,"requestHeaderFieldsTooLarge":431,"noResponse":444,"retryWithMicrosoft":449,"blockedByWindowsParentalControls":450,"unavailableForLegalReasons":451,"clientClosedRequest":499,"internalServerError":500,"notImplemented":501,"badGateway":502,"serviceUnavailable":503,"gatewayTimeout":504,"httpVersionNotSupported":505,"variantAlsoNegotiates":506,"insufficientStorage":507,"loopDetected":508,"bandwidthLimitExceeded":509,"notExtended":510,"networkAuthenticationRequired":511,"networkReadTimeoutError":598,"networkConnectTimeoutError":599}},{"key":"\\code\\source\\server\\http\\service\\test\\test2\\service.conf.json","value":{"enable":true,"captcha":false,"controller":["*"],"method":["get","post"],"permission":["sdda","adads=adsa","adsad-asda-ads-a-d-d"]}},{"key":"\\code\\source\\server\\http\\service\\authuntication\\signup\\username-password\\service.conf.json","value":{"enable":true,"captcha":true,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\authuntication\\signin\\username-password\\service.conf.json","value":{"enable":true,"captcha":true,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\authuntication\\signout\\username-password\\service.conf.json","value":{"enable":true,"captcha":true,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\captcha\\create\\service.conf.json","value":{"enable":true,"captcha":false,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\permission\\assignment\\service.conf.json","value":{"enable":true,"captcha":true,"controller":["*"],"method":["post"],"permission":["*"]}},{"key":"\\code\\source\\server\\socket\\service\\test\\test2\\service.conf.json","value":{"enable":true,"captcha":true,"permission":[]}}];
    if (!value) {
        const database = 'db';
        const collection  = 'config';
        const documents = await db_config.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_permission.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [{"label":"","name":"*"}];
    if (!value) {
        const database = 'db';
        const collection  = 'permission';
        const documents = await db_permission.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_request.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'request';
        const documents = await db_request.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_role.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'role';
        const documents = await db_role.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_socket.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'socket';
        const documents = await db_socket.insertMany(seed, { ordered: false });
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

(async () => {
    const document = await db_view.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'view';
        const documents = await db_view.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();