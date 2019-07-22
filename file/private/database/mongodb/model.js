/*


  _    _    ___    ___    ___   _             _   ___  
 | \  / |  / _ \  |   \  | __| | |         _ | | / __| 
 | |\/| | | (_) | | |) | | _|  | |__      | || | \__ \ 
 |_|  |_|  \___/  |___/  |___| |____| (_)  \__/  |___/ 

  ___   _    _   _  _     _     _    _   ___     __     _     _      _     
 |   \  \ \ / / | \| |   /_\   | \  / | |_ _|  / __|   /_\   | |    | |    
 | |) |  \ V /  | .` |  / _ \  | |\/| |  | |  | (__   / _ \  | |__  | |__  
 |___/    |_|   |_|\_| /_/ \_\ |_|  |_| |___|  \___| /_/ \_\ |____| |____| 

 _    _         __   ___   ___     _     _____   ___   ___        ___  _    _  
 \ \ / /      / __| | _ \ | __|   /_\   |_   _| | __| |   \      | _ ) \ \ / / 
  \ V /      | (__  |   / | _|   / _ \    | |   | _|  | |) |     | _ \  \ V /  
   |_|        \___| |_|_\ |___| /_/ \_\   |_|   |___| |___/      |___/   |_|   

        _     _      ___   _  _   ___      _   ___     _     _____   ___  
       /_\   | |    |_ _| | || | | __|  _ | | | _ \   /_\   |_   _| |_ _| 
      / _ \  | |__   | |  | __ | | _|  | || | |   /  / _ \    | |    | |  
     /_/ \_\ |____| |___| |_||_| |___|  \__/  |_|_\ /_/ \_\   |_|   |___| 


*/

var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

var db = mongoose.createConnection('mongodb://localhost:27017/db', {useNewUrlParser: true});

var db_stack = db.model('stack', new mongoose.Schema({"stack":{"type":"Array","default":[]},"sort":{"type":"Number","default":1}}, {timestamps: true}));
var db_user = db.model('user', new mongoose.Schema({"username":{"type":"String"},"password":{"type":"String"},"sort":{"type":"Number","default":1}}, {timestamps: true}));
var db_config = db.model('config', new mongoose.Schema({"key":"String","value":{"type":"Object","default":{}},"sort":{"type":"Number","default":1}}, {timestamps: true}));

module.exports.db_stack = db_stack;
module.exports.db_user = db_user;
module.exports.db_config = db_config;