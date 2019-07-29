async function begin(req, res, next, options: options) {
    await view.send('?', '/t1/t2', req, res) == 'next' ? next() : null;
}

export default callback(begin);