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

5. All file configurations must have '.conf.json' extensions and be in the '/file/private/configuration' path.

6. Only the config module can read the configuration.conf.json file and the rest of the modules can use the config module.
6.1 'config module' first looks at the database and then looks at the 'configuration.conf.json'.
6.2 Changes to 'configuration.conf.json' are not considered at run time and are unimportant.

7. If we need 'dynamic import file', we should use the 'Import' module.
7.1 'Dependency' is not a 'dynamic import file'.
