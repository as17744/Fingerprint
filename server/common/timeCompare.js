exports.timeCompare = function(timeString, standard) {
    const items = timeString.split(':');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const punchTime = new Date(year, month, day, items[0], items[1], items[2]);
    return punchTime < standard;
};