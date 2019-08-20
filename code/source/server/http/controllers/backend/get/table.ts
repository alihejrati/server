async function table(req, res, next) {
    const status = req['_'].carry.config.statusCode;
    const $table = Tools.isString(req.params.table).split(':');
    let flag = false;
    let cat = ''
    let tbl = '';
    if ($table.length == 1) {
        tbl = $table[0];
        flag = true;
    }
    if ($table.length == 2) {
        cat = $table[0];
        tbl = $table[1];
        flag = true;
    }
    
    const table = await mongodb.findOne('table', {
        category: cat,
        name: tbl
    });
    if (table && flag) {
        await view.send('?', '/table/read', req, res, {next: next, variables: {
            title: table.pagetitle || `گزارش گیری از جدول "${table.label || table.name}"`,
            table: table.name,
            label: table.label,
            description: table.description,
            columns: table.columns,
            buttons: table.buttons,
            service: table.service,
            form: table.form
        }});
    } else {
        req['_'].status = status.notFound;
        next();
    }
    
}

export default table;