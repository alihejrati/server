async function service(req, res, next, options: options) {
    const status = req['_'].carry.config.statusCode;
    
    const question = typeof req.body.question == 'string' ? req.body.question : '';
    const answer = typeof req.body.answer == 'string' ? req.body.answer : '';
    const tag = Array.isArray(req.body.tag) ? req.body.tag : []; 
    let error = null;

    try {
        const query = await mongodb.findOneAndUpdate('faq', {question: question}, {
            answer: answer,
            $addToSet: {tag: {$each: tag}}
        }, {database: 'baran', errorHandler: err => error = err});
    
        if (query) {
            await response.attach(null, req, res);
        } else {
            options['service'].code(status.notModified);
            await response.attach(error, req, res);
        }
    } catch (error) {
        options['service'].code(status.notModified);
        await response.attach(error, req, res);
    }
}

export default service;