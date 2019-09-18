░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░█░░█░████░░░░░█░░█░░██░░█░░░█░████░░░░░███░░█░░█░█░░░░████░░███░
░█░░█░█   ░░░░░█░░█░█  █░█░░░█░█   ░░░░░█  █░█░░█░█░░░░█   ░█   ░
░█░░█░███░░░░░░████░████░█░░░█░███░░░░░░███ ░█░░█░█░░░░███░░ ██░░
░████░█  ░░░░░░█  █░█  █░ █░█ ░█  ░░░░░░█  █░█░░█░█░░░░█  ░░░  █░
░█  █░████░░░░░█░░█░█░░█░░ █ ░░████░░░░░█░░█░ ██ ░████░████░███ ░
░ ░░ ░    ░░░░░ ░░ ░ ░░ ░░░ ░░░    ░░░░░ ░░ ░░  ░░    ░    ░   ░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

1. The goal is simplicity and efficiency. 😃

2. The project name and the files and directories should be in small letters and, if necessary, use the dash separator.

3. All modules should be 'async function'.

4. All code 'source' modules receive the 'options' parameters as the last input and are used with the 'callback' module.
4.1 We use the 'callback' module for the following reasons:
4.1.1 Dependency.
4.1.2 Log.
4.1.3 Sets the 'options' parameter.
4.2 If using a 'callback' module significantly reduces system speed, we will not use it at all:
4.2.1 http and socket server controllers Or any other module that is called too much.

5. All file configurations must have '.conf.json' extensions and be in the '/file/private/configuration' path.

6. Only the config module can read the configuration.conf.json file and the rest of the modules can use the config module.
6.1 'config module' first looks at the database and then looks at the 'configuration.conf.json'.
6.2 Even during runtime we follow the 'configuration.conf.json' file changes.

7. If we need 'dynamic import file', we should use the 'Import' module.
7.1 'Dependency' is not a 'dynamic import file'.
7.2 The extension is mandatory.

  ![Image description](https://raw.githubusercontent.com/alihejrati/server/master/file/private/documentation/screenshot%20(4).png)
 
  ![Image description](https://raw.githubusercontent.com/alihejrati/server/master/file/private/documentation/screenshot%20(1).png)
  
  ![Image description](https://raw.githubusercontent.com/alihejrati/server/master/file/private/documentation/screenshot%20(2).png)
 
  ![Image description](https://raw.githubusercontent.com/alihejrati/server/master/file/private/documentation/screenshot%20(3).png)