async function check(key: string, value: string, options: options) {
    const cap = await mongodb.findOne('captcha', {key: key, value: value}, {sort: {'createdAt': -1}});

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

        diff.year   = diff.year   || 0;
        diff.month  = diff.month  || 0;
        diff.day    = diff.day    || 0;
        diff.hour   = diff.hour   || 0;
        diff.minute = diff.minute || 0;
        diff.second = diff.second || 0;

        const flag = (diff.second + diff.minute*60 + diff.hour*60*60 + diff.day*24*60*60 + diff.month*30*24*60*60 + diff.year*12*30*24*60*60) <= (options['second'] + options['minute']*60 + options['hour']*60*60 + options['day']*24*60*60 + options['month']*30*24*60*60 + options['year']*12*30*24*60*60);

        return flag ? diff : false;
        
    } else {
        return false;
    }
}

export default callback(check);