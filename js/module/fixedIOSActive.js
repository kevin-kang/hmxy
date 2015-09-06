;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD模式
        define(factory);
    } else {
        // 全局模式
        factory();
    }
}(function(){
    'use strict';
    document.body.addEventListener('touchstart', function () { }); //解决IOS :active无效
}));
