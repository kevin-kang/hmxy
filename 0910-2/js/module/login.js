define(['js/module/util'], function(util) {
    'use strict';

    return function(url, WXcode, cb) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: {
                code: WXcode
            },
            success: function(res) {
                localStorage.setItem('iheima.com', JSON.stringify(res));
                cb && cb(res);
            }
        });
    }
});
