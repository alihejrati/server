import * as mongoose from 'mongoose';

async function slave(flag: boolean, role, permissions, req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;
    const list: string[] = [];
    for (const permission of permissions) {
        if (typeof permission === 'string' && permission != '*') {
            list.push(permission);
        }
    }
    if (list.length != 0 && role && typeof role === 'string') {
        const permissions_id = await mongodb.find('permission', { name: {$in: list} }, {select: {_id: 1}}) || [];
        if (permissions_id.length == list.length) {
            const query = mongoose.Types.ObjectId.isValid(role) ? {_id: role} : {name: role};
            const record = await mongodb.findOneAndUpdate('role', query, { $addToSet: {permission: { $each: permissions_id }} }, {options: {}});
            if (record) {
                if (flag) {
                    await response.attach(null, req, res);
                }
                return status.successful;
            } else {
                if (flag) {
                    options['service'].code(status.notModified);
                    await response.attach(null, req, res);
                }
                return status.notModified;
            }
        } else {
            if (flag) {
                options['service'].code(status.notAcceptable);
                await response.attach(null, req, res);
            }
            return status.notAcceptable;
        }
    } else {
        if (flag) {
            options['service'].code(status.noContent);
            await response.attach(null, req, res);
        }
        return status.noContent;
    }
}

async function service(req, res, next, options: options) {
    const role = typeof req.body['role'] === 'string' ? req.body['role'] || '' : '';
    const permissions = Array.isArray(req.body['permissions']) ? req.body['permissions'] : [];
    await slave(true, role, permissions, req, res, next, options);
}

export default service;
export {slave};