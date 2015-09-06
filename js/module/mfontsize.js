;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD模式
        define(factory);
    } else {
        // 全局模式
        factory();
    }
}(function() {
	'use strict';
	var docEl = document.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) {
				return;
			}
			docEl.style.fontSize = 20 * (clientWidth / 640) + 'px'; //这里的20是指在640是px的设计稿中字的基本大小
		};
	if (!document.addEventListener) {
		return;
	}
	// document.addEventListener('DOMContentLoaded', recalc, false);
	window.addEventListener(resizeEvt, recalc, false);
	recalc();
	

}));