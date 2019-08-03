async function begin(req, res, next) {
    await view.send('?', '/t1/t2', req, res, {next: next});
}

export default begin;