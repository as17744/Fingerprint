const zstuAjax = (url, data, type) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url,
            data,
            type,
            dataType: 'json',
            success(resp) {
                resolve(resp);
            },
            error(resp) {
                reject(resp);
            }
        })
    })
};
export default zstuAjax;