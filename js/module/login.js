define(['js/module/util'], function(util) {
    'use strict';

    return function(url, WXcode, cb) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                code: WXcode
            },
            success: function(res) {
                if (res.id) {
                    localStorage.setItem('iheima.com', JSON.stringify(res));
                    cb && cb();
                }
            }
        });
    }
});
