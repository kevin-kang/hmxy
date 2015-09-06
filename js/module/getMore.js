;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD模式
        define(factory);
    } else {
        // 全局模式
        factory();
    }
}(function() {
    'use strict';

    return function getData(opt) {
        var opt = $.extend({
            data: '',
            url: '',
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: '',
            cb: function() {}
        }, opt || {});

        $.ajax({
            url: opt.url, //页数URL
            type: opt.type,
            dataType: opt.dataType,
            jsonpCallback: opt.jsonpCallback,
            data: opt.data,

            success: function(res) {
                opt.cb(res);
            }
        });
    };

}));