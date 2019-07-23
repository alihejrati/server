/*


  _    _    ___    ___    ___   _             _   ___  
 | \  / |  / _ \  |   \  | __| | |         _ | | / __| 
 | |\/| | | (_) | | |) | | _|  | |__      | || | \__ \ 
 |_|  |_|  \___/  |___/  |___| |____| (_)  \__/  |___/ 


*/

var redis = require('redis');

var db = redis.createClient({"host":"localhost","port":6379});

module.exports.db = db;