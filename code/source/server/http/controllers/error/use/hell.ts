async function hell(req, res, next, options: options) {
    res.send({
        _: req['_'],
    });
}

export default callback(hell);