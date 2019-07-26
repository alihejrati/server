/*


  _    _    ___    ___    ___   _     
 | \  / |  / _ \  |   \  | __| | |    
 | |\/| | | (_) | | |) | | _|  | |__  
 |_|  |_|  \___/  |___/  |___| |____| 


*/

var redis = require('redis');

var db = redis.createClient({"host":"localhost","port":6379});

module.exports.db = db;