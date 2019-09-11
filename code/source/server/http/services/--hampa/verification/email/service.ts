async function service(req, res, next, options: options) {
    const code = Tools.isString(req.query.code);

    try {
        const query = await mongodb.findOne('email', {
            code: code
        }, { errorHandler: error => options['service'].error = error });

        if (query) {
            const Query = await mongodb.findOne('ngobikereg', {
                email: query.mailOptions.to,
                'flag.emailVerification': false
            }, { database: 'hampa', errorHandler: error => options['service'].error = error });

            if (Query) {
                const RES = await mongodb.findOneAndUpdate('ngobikereg', {_id: Query._id}, {
                    'flag.emailVerification': true
                }, { database: 'hampa', options: {runValidators: true}, errorHandler: error => options['service'].error = error });
                if (RES) {
                    await response.attach(null, req, res);
                } else {
                    options['service'].code(options['service'].status.failedDependency);
                    await response.attach(null, req, res);
                }
            } else {
                options['service'].code(options['service'].status.failedDependency);
                await response.attach(null, req, res);
            }
        } else {
            options['service'].code(options['service'].status.notModified);
            await response.attach(options['service'].error, req, res);
        }
    } catch (error) {
        console.error('---------error------->', error)
        options['service'].code(options['service'].status.conflict);
        await response.attach(error, req, res);
    }
}

export default service;