function parser(req, json) {
    const url = req['_'].route.path.relative;
    console.debug('-------------------------------json-->', json);
    console.debug('-------------------------------url-->', req['_'].route.path.relative);
    const keys = Object.keys(json);
    let _json = {};

    for (const key of keys) {
        let left = '';
        let chunks = key.replace(/\]/g, '').split('[');

        if (chunks.length == 1) {
            _json[key] = json[key];
            try {
                if (!isNaN(Number(_json[key]))) {
                    _json[key] = Number(_json[key]);
                    continue;
                }
                if (_json[key] == "true") {
                    _json[key] = true;
                    continue;
                }
                if (_json[key] == "false") {
                    _json[key] = false;
                    continue;
                }
            } catch (error) {

            }
        } else {
            let rightside = '';
            let leftside = key;
            let temp = JSON.parse(JSON.stringify(json[key]));
            try {
                if (!isNaN(Number(temp))) {
                    temp = Number(temp);
                }
                if (temp == "true") {
                    temp = true;
                }
                if (temp == "false") {
                    temp = false;
                }
            } catch (error) {

            }
            let lastChunk = '';
            let merge = false;
            for (const chunk of chunks.reverse()) {
                rightside = `["${chunk}"]` + rightside;
                // console.debug(_json)
                if (chunk) {
                    if (leftside == leftside.replace((new RegExp(`\\["${chunk}\\"]$`, 'g')), '').replace(/\[/g,
                        '["').replace(/\]/g, '"]').replace(/\"+/g, '"')) {
                        leftside = leftside.replace((new RegExp(`\\${chunk}\\$`, 'g')), '').replace(/\[/g, '["')
                            .replace(/\]/g, '"]').replace(/\"+/g, '"');
                    } else {
                        leftside = leftside.replace((new RegExp(`\\["${chunk}\\"]$`, 'g')), '').replace(/\[/g,
                            '["')
                            .replace(/\]/g, '"]').replace(/\"+/g, '"');
                    }

                    if (key.replace(/\[/g, '["').replace(/\]/g, '"]').replace(/\"+/g, '"') == leftside) {
                        // correction
                        leftside = leftside.split('[').slice(0, leftside.split('[').length - 1).join('[')
                    }
                    if (chunk == leftside) {
                        // correction
                        leftside = '';
                    }
                    if (true) {
                        // master correction!
                        const reg = (str) => str
                            .replace(/\(/g, '\\(')
                            .replace(/\)/g, '\\)')
                            .replace(/\//g, '\\\/')
                            .replace(/\\/g, '\\\\\\')
                            .replace(/\"/g, '\\\\\\"')
                            .replace(/\[/g, '\\\\\\[')
                            .replace(/\]/g, '\\\\\\]');
                        const q = reg(`["${chunk}"]`);
                        leftside = leftside.replace(new RegExp(eval(`"${q}"`), 'g'), '');
                    }



                    console.debug(`key: ${key} | chunk: ${chunk} | leftside: ${leftside} | Object | rightside: ${rightside}`);
                    temp = {
                        [`${chunk}`]: temp
                    };
                    try {
                        //console.debug(`-------------------> leftside: ${leftside} | chunk: ${chunk} |`, `_json.${leftside} |`, `["${chunk}"]`, `_json.${leftside}`.replace(new RegExp(`\\["${chunk}"\\]$`, 'g'), ''))
                        let test = `${leftside}`.replace(new RegExp(`\\["${chunk}"\\]$`, 'g'), '');
                        if (test && eval(`_json.${test}`)) {
                            eval(`_json.${test}=Object.assign(_json.${test}, temp)`);
                            merge = true;
                            break;
                        }
                    } catch (error) {

                    }
                    try {
                        if (eval(`_json.${leftside}`)) {
                            eval(`_json.${leftside}=Object.assign(_json.${leftside}, temp)`);
                            merge = true;
                            break;
                        }
                    } catch (error) { }
                } else {
                    leftside = leftside.replace((new RegExp(`\\[${chunk}\\]$`, 'g')), '').replace(/\[/g, '["')
                        .replace(/\]/g, '"]').replace(/\"+/g, '"');;
                    // console.debug(`key: ${key} | chunk: ${chunk} | leftside: ${leftside} | Array | _json.${leftside}`);
                    if (!Array.isArray(temp)) {
                        temp = [temp];

                    }
                    try {
                        if (Array.isArray(eval(`_json.${leftside}`))) {
                            eval(`_json.${leftside}.push(temp)`);
                            merge = true;
                            break;
                        }
                    } catch (error) { }
                }
                lastChunk = chunk;
            }
            if (!merge) {
                _json = Object.assign(_json, JSON.parse(JSON.stringify(temp)));
            }
        }
    }

    if (url == '/backend/service/--baran/game/create') {
        _json['url'] = _json['url'].replace(/\_\_DOT\_\_/g, '.');
        _json['hasBall'] = _json['hasBall'] == 'on';
        _json['imgs'] = JSON.parse(JSON.stringify(Object.values( _json['imgs'])).replace(/\_\_DOT\_\_/g, '.')).map(e => e.url);
    }
    if (url == '/backend/service/--baran/manual-work/create') {
        _json['url'] = _json['url'].replace(/\_\_DOT\_\_/g, '.');
        _json['requiredsupplies'] = Object.values(_json['requiredsupplies']);
        _json['imgs'] = JSON.parse(JSON.stringify(Object.values( _json['imgs'])).replace(/\_\_DOT\_\_/g, '.')).map(e => e.url);
    }

    console.debug('*********************************************************', _json);
    return _json;
}

export default parser;