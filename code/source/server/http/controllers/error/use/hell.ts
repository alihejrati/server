async function hell(req, res, next, options: options) {
    await view.send('/basic', '/t1/t2', req, res, {
        variables: npm.jsonPrettyHtml.default({
            _: req['_']
        })
    });
}

export default callback(hell);