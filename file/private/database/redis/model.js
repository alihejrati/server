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

var redis = require('redis');

var db = redis.createClient({"host":"localhost","port":6379});

module.exports.db = db;