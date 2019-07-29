async function check(key: string, value: string, options: options) {
    const cap = await mongodb.findOne('captcha', {
        key: key
    }, {sort: {'createdAt': -1}});

    if (cap && cap['createdAt'] && cap['value'] && cap['value'] == value) {
        const startDate = cap['createdAt'];
        const endDate = options['endDate'] || new Date();
        const diff = npm.dateTimestampDiff.convertDateToAge(startDate, endDate);
        

        options['year']   = options['year']   || 0;
        options['month']  = options['month']  || 0;
        options['day']    = options['day']    || 0;
        options['hour']   = options['hour']   || 0;
        options['minute'] = options['minute'] || 0;
        options['second'] = options['second'] || 0;


        const flag =
            (diff.year || 0) <= options['year']
            &&
            (diff.month || 0) <= options['month']
            &&
            (diff.day || 0) <= options['day']
            &&
            (diff.hour || 0) <= options['hour']
            &&
            (diff.minute || 0) <= options['minute']
            &&
            (diff.second || 0) <= options['second'];

        return flag ? diff : false;
        
    } else {
        return false;
    }
}

export default callback(check);