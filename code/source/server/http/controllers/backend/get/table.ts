async function table(req, res, next) {
    await view.send('?', '/table/read', req, res, {next: next, variables: {
        title: Tools.isString(req.params.table),
        table: Tools.isString(req.params.table),
        columns: ['name', 'office', 'salary', 'position', 'start_date', 'extn'].reverse(),
        order: [true, false, true, true, false, true].reverse(),
        service: {
            read: '/service/table'
        }
    }});
}

export default table;