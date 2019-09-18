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
var hampa = mongoose.createConnection('mongodb://localhost:27017/SERVER#hampa', {useNewUrlParser: true});

var baran_faq = baran.model('faq', new mongoose.Schema({"question":{"type":"String","required":true,"unique":true},"answer":{"type":"String","required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var baran_game = baran.model('game', new mongoose.Schema({"title":{"type":"String","required":true},"description":{"type":"String"},"type":{"type":"String","enum":["indore","outdor"],"required":true},"url":{"type":"String"},"imgs":{"type":["String"]},"suggest":{"type":"String"},"players":{"type":"String"},"age":{"type":"String","enum":["child","teen","young"],"required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var baran_manualwork = baran.model('manualwork', new mongoose.Schema({"title":{"type":"String","required":true},"description":{"type":"String"},"level":{"type":"String","enum":["easy","medium","hard"],"required":true},"url":{"type":"String"},"imgs":{"type":["String"]},"suggest":{"type":"String"},"requiredsupplies":{"type":[{"key":"String","value":"String"}]},"Kind":{"type":["String"],"required":false},"primarysubstance":{"type":["String"],"required":false},"time":{"type":{"count":"integer","step":"integer","unit":{"type":"String","enum":["sec","min","hour"],"default":"min"}}},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var baran_teachingpoint = baran.model('teachingpoint', new mongoose.Schema({"title":{"type":"String","required":true,"unique":true},"description":{"type":"String","required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_captcha = db.model('captcha', new mongoose.Schema({"key":{"type":"String","index":true,"required":true},"value":{"type":"String","index":true,"required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_config = db.model('config', new mongoose.Schema({"key":{"type":"String","index":true,"unique":true,"required":true},"value":{"type":"Object","default":{}},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_email = db.model('email', new mongoose.Schema({"state":{"type":"Boolean","required":true,"default":false},"code":{"type":"String","required":true,"unique":true},"transporter":{"type":"Object","required":true},"mailOptions":{"type":"Object","required":true},"response":{"type":"Object","required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_permission = db.model('permission', new mongoose.Schema({"label":"String","name":{"type":"String","index":true,"unique":true,"required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_request = db.model('request', new mongoose.Schema({"response":{"type":"Object"},"_":{"type":"Object"},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_role = db.model('role', new mongoose.Schema({"label":"String","name":{"type":"String","index":true,"unique":true,"required":true},"permission":["ObjectId"],"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_sms = db.model('sms', new mongoose.Schema({"app":{"type":"String","required":true},"server":{"type":"String","enum":["dandelion","kavenegar"],"required":true},"code":{"type":"String"},"mobile":{"type":["String"],"required":true},"json":{"type":"Object","required":true},"result":{"type":"Object","required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_socket = db.model('socket', new mongoose.Schema({"state":{"type":"String","enum":["connect","disconnect"],"index":true,"required":true},"socketId":{"type":"String","index":true,"required":true},"event":{"type":"Object"},"message":{"type":"Object"},"_":{"type":"Object"},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_stack = db.model('stack', new mongoose.Schema({"stack":{"type":"Array","default":[]},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_table = db.model('table', new mongoose.Schema({"category":{"type":"String"},"name":{"type":"String","required":true,"unique":true},"label":{"type":"String"},"description":{"type":"String"},"pagetitle":{"type":"String"},"columns":{"type":"Object","required":true},"buttons":{"type":"Object","required":true,"default":{"copy":{"extend":"copy","text":"copy","html":{"title":"رونوشت"},"attr":{"title":"رونوشت","btn":"copy"}},"csv":{"extend":"csv","text":"csv","html":{"title":"لیست"},"attr":{"title":"لیست","btn":"csv"}},"excel":{"extend":"excel","text":"excel","html":{"title":"اکسل"},"attr":{"title":"اکسل","btn":"excel"}},"pdf":{"extend":"pdf","text":"pdf","html":{"title":"کتاب الکترونیک"},"attr":{"title":"کتاب الکترونیک","btn":"pdf"}},"print":{"extend":"print","text":"print","html":{"title":"چاپ"},"attr":{"title":"چاپ","btn":"print"}},"del-multi":{"extend":"copyHtml5","text":"del-multi","html":{"title":"حذف رکورد های انتخابی"},"attr":{"title":"حذف رکورد های انتخابی","btn":"del-multi"}},"add":{"extend":"copyHtml5","text":"add","html":{"title":"اضافه کردن سطر جدید"},"attr":{"title":"اضافه کردن سطر جدید","btn":"add"}}}},"service":{"type":"Object"},"form":{"type":["Object"]},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_user = db.model('user', new mongoose.Schema({"username":{"type":"String","index":true,"unique":true,"required":true},"password":{"type":"String","index":true,"required":true},"role":{"type":"ObjectId","index":true,"required":true},"view":{"type":"ObjectId","index":true,"required":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var db_view = db.model('view', new mongoose.Schema({"label":"String","name":{"type":"String","index":true,"unique":true,"required":true},"branch":{"type":"Object","index":true,"required":true,"default":{"@frontend":"/basic","@backend":"/robust/html/RTL/vertical-overlay-menu-template"}},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));
var hampa_ngobikereg = hampa.model('ngobikereg', new mongoose.Schema({"name":{"type":"String","required":true},"fullname":{"type":"String","required":true},"email":{"type":"String","required":true,"unique":true},"sort":{"type":"Number","default":1},"tag":{"type":["String"],"default":[]},"flag":{"type":"Object","default":{"hide":false,"delete":false}}}, {timestamps: true}));

module.exports.baran_faq = baran_faq;
module.exports.baran_game = baran_game;
module.exports.baran_manualwork = baran_manualwork;
module.exports.baran_teachingpoint = baran_teachingpoint;
module.exports.db_captcha = db_captcha;
module.exports.db_config = db_config;
module.exports.db_email = db_email;
module.exports.db_permission = db_permission;
module.exports.db_request = db_request;
module.exports.db_role = db_role;
module.exports.db_sms = db_sms;
module.exports.db_socket = db_socket;
module.exports.db_stack = db_stack;
module.exports.db_table = db_table;
module.exports.db_user = db_user;
module.exports.db_view = db_view;
module.exports.hampa_ngobikereg = hampa_ngobikereg;

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
    const document = await baran_teachingpoint.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [{"title":"نکته","description":"توضیح"}];
    if (!value) {
        const database = 'baran';
        const collection  = 'teachingpoint';
        const documents = await baran_teachingpoint.insertMany(seed, { ordered: false });
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
    const seed = [{"key":"\\code\\source\\components\\email\\send.conf.json","value":{"service":"gmail","auth":{"user":"server.mail.nodejs","pass":"admin@admin"}}},{"key":"\\code\\source\\components\\sms\\dandelion\\send.conf.json","value":{"method":"POST","url":"https://api.ghasedak.io/v2/sms/send/simple","apikey":"a53d4003d0bf383aa4c64516a9b0ad55f26d8dd73c2d6310089b089f00226116","linenumber":"10008566,300002525,5000121212,2000235,10008642,210002100,5000570"}},{"key":"\\code\\source\\components\\sms\\kavenegar\\send.conf.json","value":{"apikey":"79423173534746456D56615544557333307851617A7A41516F6879724C4F53466B386E716E716E6135486F3D","sender":"1000596446"}},{"key":"\\code\\source\\components\\captcha\\check.conf.json","value":{"expire":{"minute":6}}},{"key":"\\code\\source\\components\\model\\redis\\set.conf.json","value":{"expire":3600000}},{"key":"\\code\\source\\server\\http\\listen.conf.json","value":[{"name":"frontend","host":"192.168.1.106","port":"8080"},{"name":"backend","host":"192.168.1.106","port":"8081"},{"name":"browser","host":"192.168.1.106","port":"8082"}]},{"key":"\\code\\source\\server\\socket\\listen.conf.json","value":{"name":"socket","host":"192.168.1.106","port":"3000"}},{"key":"\\code\\source\\server\\http\\router.conf.json","value":{"/backend/تست2/تست":"/test/test2.php"}},{"key":"\\code\\source\\server\\socket\\router.conf.json","value":{"/تست2/تست":"/test/test2.php"}},{"key":"\\code\\source\\server\\http\\cookies.conf.json","value":{"name":"SERVER:server/http","expire":86400000}},{"key":"\\code\\source\\server\\socket\\cookies.conf.json","value":{"name":"SERVER:server/socket","expire":86400000}},{"key":"\\npm\\jwt.conf.json","value":{"secret":"secret-CODE"}},{"key":"\\code\\source\\server\\http\\view\\hell.conf.json","value":{"VIEW":"status","PAGE":"spaghetti"}},{"key":"\\code\\source\\server\\http\\status.conf.json","value":{"continue":100,"switchingProtocols":101,"processing":102,"successful":200,"created":201,"accepted":202,"nonAuthoritativeInformation":203,"noContent":204,"resetContent":205,"partialContent":206,"multiStatus":207,"alreadyReported":208,"iMUsed":226,"multipleChoices":300,"movedPermanently":301,"found":302,"seeOther":303,"notModified":304,"useProxy":305,"unused":306,"temporaryRedirect":307,"permanentRedirect":308,"badRequest":400,"unauthorized":401,"paymentRequired":402,"forbidden":403,"notFound":404,"methodNotAllowed":405,"notAcceptable":406,"proxyAuthenticationRequired":407,"requestTimeout":408,"conflict":409,"gone":410,"lengthRequired":411,"preconditionFailed":412,"requestEntityTooLarge":413,"requestURITooLong":414,"unsupportedMediaType":415,"requestedRangeNotSatisfiable":416,"expectationFailed":417,"teapot":418,"enhanceYourCalm":420,"unprocessableEntity":422,"locked":423,"failedDependency":424,"reservedForWebDAV":425,"upgradeRequired":426,"preconditionRequired":428,"tooManyRequests":429,"requestHeaderFieldsTooLarge":431,"noResponse":444,"retryWithMicrosoft":449,"blockedByWindowsParentalControls":450,"unavailableForLegalReasons":451,"clientClosedRequest":499,"internalServerError":500,"notImplemented":501,"badGateway":502,"serviceUnavailable":503,"gatewayTimeout":504,"httpVersionNotSupported":505,"variantAlsoNegotiates":506,"insufficientStorage":507,"loopDetected":508,"bandwidthLimitExceeded":509,"notExtended":510,"networkAuthenticationRequired":511,"networkReadTimeoutError":598,"networkConnectTimeoutError":599}},{"key":"\\code\\source\\server\\http\\service\\test\\test2\\service.conf.json","value":{"enable":true,"captcha":false,"controller":["*"],"method":["get","post"],"permission":["sdda","adads=adsa","adsad-asda-ads-a-d-d"]}},{"key":"\\code\\source\\server\\http\\service\\--hampa\\ngos\\riding-bike\\register\\service.conf.json","value":{"enable":true,"captcha":true,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\authuntication\\signup\\username-password\\service.conf.json","value":{"enable":true,"captcha":true,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\authuntication\\signin\\username-password\\service.conf.json","value":{"enable":true,"captcha":true,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\authuntication\\signout\\username-password\\service.conf.json","value":{"enable":true,"captcha":false,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\captcha\\create\\service.conf.json","value":{"enable":true,"captcha":false,"controller":["*"],"method":["post"],"permission":[]}},{"key":"\\code\\source\\server\\http\\service\\permission\\assignment\\service.conf.json","value":{"enable":true,"captcha":true,"controller":["*"],"method":["post"],"permission":["*"]}},{"key":"\\code\\source\\server\\socket\\service\\test\\test2\\service.conf.json","value":{"enable":true,"captcha":true,"permission":[]}}];
    if (!value) {
        const database = 'db';
        const collection  = 'config';
        const documents = await db_config.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();

(async () => {
    const document = await db_email.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'email';
        const documents = await db_email.insertMany(seed, { ordered: false });
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
    const document = await db_sms.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'db';
        const collection  = 'sms';
        const documents = await db_sms.insertMany(seed, { ordered: false });
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
    const document = await db_table.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [{"category":"","name":"tables","label":"جداول","description":"گزارش گیری از جدول های منطقی","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del:link","orderable":false,"visible":true,"html":{"title":"حذف:لینک"}},"buttons":{"title":"دکمه ها","data":"buttons","defaultContent":"یافت نشد","orderable":false,"visible":true,"html":{"title":"قابلیت مرتب سازی ندارد"}},"columns":{"title":"ستون ها","data":"columns","defaultContent":"یافت نشد","orderable":false,"visible":true,"html":{"title":"قابلیت مرتب سازی ندارد"}},"description":{"title":"توضیحات","data":"description","defaultContent":"یافت نشد","orderable":false,"visible":true,"html":{"title":"قابلیت مرتب سازی ندارد"}},"label":{"title":"برچسب","data":"label","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس برچسب"}},"name":{"title":"نام","data":"name","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس نام"}}},"service":{"read":{"server":"http","route":"/service/crud/read"},"del":{"server":"http","route":"/service/crud/delete"},"edit":{"server":"http","route":"/service/crud/update"},"link":{"server":"http","route":"/service/redirect?url=/table/:name"},"insert":{"server":"http","route":"/service/crud/insert"},"count":{"server":"http","route":"/service/crud/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"pagetitle":{"type":"text","required":false,"html":{"right":true,"label":"عنوان صفحه","example":"مثال: گزارش گیری","key":"pagetitle"}},"category":{"type":"text","required":false,"html":{"right":true,"label":"نام دسته","example":"مثال: بایگانی","key":"category"}},"name":{"type":"text","required":true,"html":{"right":true,"label":"نام جدول","example":"مثال: پرونده ها ","key":"name"}},"label":{"type":"text","required":true,"html":{"right":false,"label":"برچسب جدول","example":"مثال: پرونده های کارکنان","key":"label"}},"description":{"type":"textarea","required":false,"html":{"right":false,"label":"توضیحات","example":"مثال: این جدول پرونده های کارکنان و سوابق کاری آنان را نگهداری میکند.","key":"description"}}},{"columns":{"type":"object","max":-1,"element":{"key":{"type":"text","required":true,"html":{"right":true,"label":"نام ستون","example":"مثال: tools","key":"columns.$key.name","p_key":["columns.$key.name"]}},"value":{"title":{"type":"text","required":true,"html":{"right":true,"label":"نام مستعار برای ستون","example":"مثال: ابزارها","key":"columns.$key.title","p_key":["columns.$key.name"]}},"defaultContent":{"type":"text","required":true,"html":{"right":false,"label":"مقدار پیشفرض ستون","example":"مثال: del:edit:check","key":"columns.$key.defaultContent","p_key":["columns.$key.name"]}},"orderable":{"type":"boolean","required":true,"html":{"right":false,"label":"آیا قابلیت مرتب سازی بر اساس این ستون فعال باشد؟!","example":"مثال: true","key":"columns.$key.orderable","p_key":["columns.$key.name"]}},"visible":{"type":"boolean","required":true,"html":{"right":false,"label":"آیا این ستون قابل مشاهده باشد؟!","example":"مثال: true","key":"columns.$key.visible","p_key":["columns.$key.name"]}},"html":{"type":"object","max":-1,"element":{"key":{"type":"text","required":true,"html":{"right":true,"label":"نام مشخصه","example":"مثال: title","key":"columns.$key.html.$key2.name","p_key":["columns.$key.name","columns.$key.html.$key2.name"]}},"value":{"value":{"type":"text","required":true,"html":{"right":false,"label":"مقدار مشخصه","example":"مثال: برچسب","key":"columns.$key.html.$key2.value","p_key":["columns.$key.name","columns.$key.html.$key2.name"]}}}}}}}}},{"service":{"type":"object","max":-1,"element":{"key":{"type":"text","required":true,"html":{"right":true,"label":"نام سرویس","example":"مثال: read","key":"service.$key.name","p_key":["service.$key.name"]}},"value":{"server":{"type":"selectbox","required":true,"html":{"right":true,"label":"سرور گیرنده درخواست","case":["HTTP","SOCKET"],"example":"مثال: http","key":"service.$key.server","p_key":["service.$key.name"]}},"route":{"type":"text","required":true,"html":{"right":false,"label":"مسیر درخواست","example":"مثال: /service/crud/read","key":"service.$key.route","p_key":["service.$key.name"]}}}}}}]},{"category":"baran","name":"game","label":"بازی ها","description":"گزارش گیری از جدول بازی ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"age":{"title":"رده سنی","data":"age","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس رده های سنی"}},"players":{"title":"بازیکنان","data":"players","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس بازیکنان"}},"suggest":{"title":"پیشنهاد","data":"suggest","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس پیشنهاد ها"}},"type":{"title":"نوع","data":"type","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس نوع"}},"description":{"title":"توضیحات","data":"description","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس توضیحات"}},"title":{"title":"عنوان","data":"title","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس عنوان ها"}}},"service":{"read":{"server":"http","route":"/service/--baran/game/read"},"del":{"server":"http","route":"/service/--baran/game/delete"},"edit":{"server":"http","route":"/service/--baran/game/update"},"insert":{"server":"http","route":"/service/--baran/game/create"},"count":{"server":"http","route":"/service/--baran/game/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"title":{"type":"text","required":true,"html":{"right":true,"label":"عنوان","example":"","key":"title"}},"age":{"type":"selectbox","required":true,"html":{"right":true,"label":"رده سنی","case":["child","teen","young"],"example":"","key":"age"}},"type":{"type":"selectbox","required":true,"html":{"right":true,"label":"نوع","case":["indore","outdor"],"example":"","key":"type"}},"hasBall":{"type":"boolean","required":true,"html":{"right":true,"label":"آیا این بازی به توپ نیاز دارد؟","example":"","key":"hasBall"}},"description":{"type":"textarea","required":true,"html":{"right":false,"label":"توضیحات","example":"","key":"description"}},"suggest":{"type":"textarea","required":true,"html":{"right":false,"label":"پیشنهادات","example":"","key":"suggest"}},"players":{"type":"textarea","required":true,"html":{"right":false,"label":"بازیکنان","example":"","key":"players"}}},{"url":{"type":"TEXT-file-one","required":true,"html":{"right":true,"label":"لینک کاور","example":"","key":"url"}},"imgs":{"type":"object","max":-1,"element":{"key":{"type":"TEXT-file-one-required","required":false,"html":{"right":true,"label":"فایل","example":"","key":"imgs.$key.url","p_key":["imgs.$key.url"]}},"value":{}}}}]},{"category":"baran","name":"manualwork","label":"کاردستی ها","description":"گزارش گیری از جدول کاردستی ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"suggest":{"title":"پیشنهاد","data":"suggest","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس پیشنهاد ها"}},"level":{"title":"سطح","data":"level","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس سطح ها"}},"description":{"title":"توضیحات","data":"description","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس توضیحات"}},"title":{"title":"عنوان","data":"title","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس عنوان ها"}}},"service":{"read":{"server":"http","route":"/service/--baran/manual-work/read"},"del":{"server":"http","route":"/service/--baran/manual-work/delete"},"edit":{"server":"http","route":"/service/--baran/manual-work/update"},"insert":{"server":"http","route":"/service/--baran/manual-work/create"},"count":{"server":"http","route":"/service/--baran/manual-work/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"title":{"type":"text","required":true,"html":{"right":true,"label":"عنوان","example":"","key":"title"}},"level":{"type":"selectbox","required":true,"html":{"right":true,"label":"سطح","case":["easy","medium","hard"],"example":"","key":"level"}},"description":{"type":"textarea","required":true,"html":{"right":false,"label":"توضیحات","example":"","key":"description"}},"suggest":{"type":"textarea","required":true,"html":{"right":false,"label":"پیشنهادات","example":"","key":"suggest"}}},{"Kind":{"type":"String[]","required":true,"html":{"right":true,"label":"نوع کاردستی","example":"","key":"Kind"}},"primarysubstance":{"type":"String[]","required":true,"html":{"right":false,"label":"مواد اولیه","example":"","key":"primarysubstance"}},"requiredsupplies":{"type":"object","max":-1,"element":{"key":{"type":"text","required":true,"html":{"right":true,"label":"ماده مورد نیاز","example":"","key":"requiredsupplies.$key.key","p_key":["requiredsupplies.$key.key"]}},"value":{"value":{"type":"text","required":true,"html":{"right":true,"label":"مقدار","example":"","key":"requiredsupplies.$key.value","p_key":["requiredsupplies.$key.key"]}}}}}},{"count":{"type":"TEXT-int","required":true,"html":{"right":true,"label":"تعداد","example":"","key":"time.count"}},"step":{"type":"TEXT-int","required":true,"html":{"right":true,"label":"بازه","example":"","key":"time.step"}},"unit":{"type":"selectbox","required":true,"html":{"right":true,"label":"بازه","case":["sec","min","hour"],"example":"","key":"time.unit"}}},{"url":{"type":"TEXT-file-one","required":true,"html":{"right":true,"label":"لینک کاور","example":"","key":"url"}},"imgs":{"type":"object","max":-1,"element":{"key":{"type":"TEXT-file-one-required","required":false,"html":{"right":true,"label":"فایل","example":"","key":"imgs.$key.url","p_key":["imgs.$key.url"]}},"value":{}}}}]},{"category":"baran","name":"faq","label":"پرسش و پاسخ ها","description":"گزارش گیری از جدول پرسش و پاسخ ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"answer":{"title":"پاسخ","data":"answer","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس پاسخ ها"}},"question":{"title":"پرسش","data":"question","defaultContent":"یافت نشد","orderable":false,"visible":true,"html":{"title":"مرتب سازی براساس پرسش ها"}}},"service":{"read":{"server":"http","route":"/service/--baran/faq/read"},"del":{"server":"http","route":"/service/--baran/faq/delete"},"edit":{"server":"http","route":"/service/--baran/faq/update"},"insert":{"server":"http","route":"/service/--baran/faq/create"},"count":{"server":"http","route":"/service/--baran/faq/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"answer":{"type":"textarea","required":true,"html":{"right":false,"label":"پاسخ","example":"","key":"answer"}},"question":{"type":"textarea","required":true,"html":{"right":true,"label":"پرسش","example":"","key":"question"}}}]},{"category":"baran","name":"teachingpoint","label":"نکات اموزشی","description":"گزارش گیری از جدول نکات آموزشی","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"title":{"title":"عنوان","data":"title","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس عنوان ها"}},"description":{"title":"توضیحات","data":"description","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس توضیحات ها"}}},"service":{"read":{"server":"http","route":"/service/--baran/teachingpoint/read"},"del":{"server":"http","route":"/service/--baran/teachingpoint/delete"},"edit":{"server":"http","route":"/service/--baran/teachingpoint/update"},"insert":{"server":"http","route":"/service/--baran/teachingpoint/create"},"count":{"server":"http","route":"/service/--baran/teachingpoint/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"title":{"type":"textarea","required":true,"html":{"right":false,"label":"عنوان","example":"","key":"title"}},"description":{"type":"textarea","required":true,"html":{"right":true,"label":"توضیحات","example":"","key":"description"}}}]},{"category":"hampa","name":"register","label":"لیست ثبت نام ها","description":"گزارش گیری از جدول لیست ثبت نام ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"email":{"title":"پست الکترونیک","data":"email","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس پست های الکترونیک"}},"fullname":{"title":"نام خانوادگی","data":"fullname","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس نام های خانوادگی"}},"name":{"title":"نام","data":"name","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس نام ها"}}},"service":{"read":{"server":"http","route":"/service/--hampa/register/read"},"del":{"server":"http","route":"/service/--hampa/register/delete"},"edit":{"server":"http","route":"/service/--hampa/register/update"},"insert":{"server":"http","route":"/service/--hampa/register/create"},"count":{"server":"http","route":"/service/--hampa/register/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"email":{"type":"text","required":true,"html":{"right":false,"label":"پست الکترونیک","example":"","key":"email"}},"name":{"type":"text","required":true,"html":{"right":true,"label":"نام","example":"","key":"name"}},"fullname":{"type":"text","required":true,"html":{"right":true,"label":"نام خانوادگی","example":"","key":"fullname"}}}]},{"category":"","name":"permission","label":"مجوز های دسترسی","description":"گزاراشات مدیریتی - مجوز های دسترسی","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"label":{"title":"برچسب","data":"label","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس برچسب ها"}},"name":{"title":"نام","data":"name","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس نام ها"}}},"service":{"read":{"server":"http","route":"/service/--server/permission/read"},"del":{"server":"http","route":"/service/--server/permission/delete"},"edit":{"server":"http","route":"/service/--server/permission/update"},"insert":{"server":"http","route":"/service/--server/permission/create"},"count":{"server":"http","route":"/service/--server/permission/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"label":{"type":"text","required":true,"html":{"right":true,"label":"برچسب","example":"","key":"label"}},"name":{"type":"text","required":true,"html":{"right":true,"label":"نام","example":"","key":"name"}}}]},{"category":"","name":"role","label":"نقش های کاربری","description":"گزاراشات مدیریتی - نقش های کاربری","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"label":{"title":"برچسب","data":"label","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس برچسب ها"}},"name":{"title":"نام","data":"name","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس نام ها"}}},"service":{"read":{"server":"http","route":"/service/--server/role/read"},"del":{"server":"http","route":"/service/--server/role/delete"},"edit":{"server":"http","route":"/service/--server/role/update"},"insert":{"server":"http","route":"/service/--server/role/create"},"count":{"server":"http","route":"/service/--server/role/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"label":{"type":"text","required":true,"html":{"right":true,"label":"برچسب","example":"","key":"label"}},"name":{"type":"text","required":true,"html":{"right":true,"label":"نام","example":"","key":"name"}}}]},{"category":"","name":"user","label":"کاربران","description":"گزاراشات مدیریتی - کاربران","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"username":{"title":"نام کاربری","data":"username","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس نام های کاربری"}},"password":{"title":"رمزعبور","data":"password","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس رمزهای عبور"}}},"service":{"read":{"server":"http","route":"/service/--server/user/read"},"del":{"server":"http","route":"/service/--server/user/delete"},"edit":{"server":"http","route":"/service/--server/user/update"},"insert":{"server":"http","route":"/service/authuntication/signup/username-password"},"count":{"server":"http","route":"/service/--server/user/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"username":{"type":"text","required":true,"html":{"right":true,"label":"نام کاربری","example":"","key":"username"}},"password":{"type":"text","required":true,"html":{"right":true,"label":"رمزعبور","example":"","key":"password"}}}]},{"category":"","name":"view","label":"پوسته ها","description":"گزاراشات مدیریتی - پوسته ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"label":{"title":"برچسب","data":"label","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس برچسب ها"}},"name":{"title":"نام","data":"name","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس نام ها"}}},"service":{"read":{"server":"http","route":"/service/--server/viewss/read"},"del":{"server":"http","route":"/service/--server/viewss/delete"},"edit":{"server":"http","route":"/service/--server/viewss/update"},"insert":{"server":"http","route":"/service/--server/viewss/create"},"count":{"server":"http","route":"/service/--server/viewss/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}},"label":{"type":"text","required":true,"html":{"right":true,"label":"برچسب","example":"","key":"label"}},"name":{"type":"text","required":true,"html":{"right":true,"label":"نام","example":"","key":"name"}}}]},{"category":"","name":"config","label":"کانفیگ ها","description":"گزاراشات مدیریتی - کانفیگ ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"value":{"title":"محتوا","data":"value","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس محتوا ها"}},"key":{"title":"کلید","data":"key","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس کلید ها"}}},"service":{"read":{"server":"http","route":"/service/--server/config/read"},"del":{"server":"http","route":"/service/--server/config/delete"},"edit":{"server":"http","route":"/service/--server/config/update"},"insert":{"server":"http","route":"/service/--server/config/create"},"count":{"server":"http","route":"/service/--server/config/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}}}]},{"category":"","name":"captcha","label":"کپچا ها","description":"گزاراشات مدیریتی - کپچا ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"value":{"title":"محتوا","data":"value","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس محتوا ها"}},"key":{"title":"کلید","data":"key","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس کلید ها"}}},"service":{"read":{"server":"http","route":"/service/--server/captcha/read"},"del":{"server":"http","route":"/service/--server/captcha/delete"},"edit":{"server":"http","route":"/service/--server/captcha/update"},"insert":{"server":"http","route":"/service/--server/captcha/create"},"count":{"server":"http","route":"/service/--server/captcha/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}}}]},{"category":"","name":"request","label":"درخواست ها","description":"گزاراشات مدیریتی - درخواست ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"response":{"title":"پاسخ درخواست","data":"response","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس پاسخ ها"}},"_":{"title":"اطلاعات درخواست","data":"_","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس اطلاعات ها"}}},"service":{"read":{"server":"http","route":"/service/--server/request/read"},"del":{"server":"http","route":"/service/--server/request/delete"},"edit":{"server":"http","route":"/service/--server/request/update"},"insert":{"server":"http","route":"/service/--server/request/create"},"count":{"server":"http","route":"/service/--server/request/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}}}]},{"category":"","name":"socket","label":"سوکت ها","description":"گزاراشات مدیریتی - سوکت ها","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"state":{"title":"وضعیت سوکت","data":"state","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس وضعیت ها"}},"socketId":{"title":"شناسه سوکت","data":"socketId","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس شناسه ها"}},"event":{"title":"رویداد","data":"event","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس رویداد ها"}},"message":{"title":"پیام","data":"message","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس پیام ها"}},"_":{"title":"اطلاعات درخواست","data":"_","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس اطلاعات"}}},"service":{"read":{"server":"http","route":"/service/--server/socket/read"},"del":{"server":"http","route":"/service/--server/socket/delete"},"edit":{"server":"http","route":"/service/--server/socket/update"},"insert":{"server":"http","route":"/service/--server/socket/create"},"count":{"server":"http","route":"/service/--server/socket/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}}}]},{"category":"","name":"email","label":"پست های الکترونیک","description":"گزاراشات مدیریتی - پست های الکترونیک","pagetitle":"","columns":{"tools":{"title":"ابزارها","data":"tools","defaultContent":"del","orderable":false,"visible":true,"html":{"title":"حذف"}},"state":{"title":"وضعیت","data":"state","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس وضعیت ها"}},"code":{"title":"کد","data":"code","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس کد ها"}},"transporter":{"title":"سرویس فرستنده","data":"transporter","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس سرویس دهندگان"}},"mailOptions":{"title":"تنظیمات","data":"mailOptions","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس تنظیمات"}},"response":{"title":"پاسخ","data":"response","defaultContent":"یافت نشد","orderable":true,"visible":true,"html":{"title":"مرتب سازی براساس پاسخ ها"}}},"service":{"read":{"server":"http","route":"/service/--server/email/read"},"del":{"server":"http","route":"/service/--server/email/delete"},"edit":{"server":"http","route":"/service/--server/email/update"},"insert":{"server":"http","route":"/service/--server/email/create"},"count":{"server":"http","route":"/service/--server/email/count"}},"form":[{"tag":{"type":"String[]","required":true,"html":{"right":true,"label":"برچسب های جستجو","example":"","key":"tag"}}}]}];
    if (!value) {
        const database = 'db';
        const collection  = 'table';
        const documents = await db_table.insertMany(seed, { ordered: false });
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

(async () => {
    const document = await hampa_ngobikereg.findOne({}).sort({}).select({});
    const value = JSON.parse(JSON.stringify(document));
    const seed = [];
    if (!value) {
        const database = 'hampa';
        const collection  = 'ngobikereg';
        const documents = await hampa_ngobikereg.insertMany(seed, { ordered: false });
        documents.length > 0 ? console.debug('seeder: (mongodb, ' + database + ', ' + collection + ', ' + documents.length + ')') : null;
    } 
})();