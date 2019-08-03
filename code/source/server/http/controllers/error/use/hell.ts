async function hell(req, res, next) {
    await view.send('/basic', '/t1/t2', req, res, {
        next: next,
        variables: npm.jsonPrettyHtml.default({
            _: req['_']
        })
    });
}

export default hell;