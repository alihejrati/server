async function send(req, res, options: options) {
    function resSend(data) {
        return res.status(req['_'].status).send(data);
    }
    function standard(arrayList) {
        let counter = 0;
        const jsonObj = {};
        for (const iterator of arrayList) {
            if (iterator.label) {
                const key = `${iterator.label.split('/').slice(1).join('.')}`;
                delete iterator['label'];
                const value = npm.objectPath.get(jsonObj, key);
                if (value) {
                    if (Array.isArray(value)) {
                        value.push(iterator);
                        npm.objectPath.set(jsonObj, key, value); 
                    } else {
                        npm.objectPath.set(jsonObj, key, [value, iterator]); 
                    }
                } else {
                    npm.objectPath.set(jsonObj, key, iterator); 
                }
            } else {
                jsonObj[counter] = iterator;
                counter++;
            }
        }
        return jsonObj;
    }
    req['_'].response.length == 0 ? resSend(null) : req['_'].response.length == 1 && !req['_'].response[0]['label'] ? resSend(req['_'].response[0]) : resSend(standard(req['_'].response));
}

export default callback(send);