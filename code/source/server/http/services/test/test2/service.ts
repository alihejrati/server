async function service(req, res, next, options: options) {
    options['service'].code(291);
    await response.attach({
        name: 'mmd!'
    }, req, res);
    options['service'].code(296);
    await response.attach('OOk!!!!', req, res);
}

export default callback(service, Promise.all([
    import('../../_/prerequisite')
]));