;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD模式
        define(factory);
    } else {
        // 全局模式
        factory();
    }
}(function() {
    'use strict'
    var ie6 = !!window.ActiveXObject && !window.XMLHttpRequest,
        $doc = $(document);

    function templeteInit(tmplStr, dataJson) { //简单模板替换,tmplStr要替换的内容为{xxx},dataJson为对象
        return tmplStr.replace(/\{([^\}]+)\}/g, function(k, v) {
            return dataJson[v] ? dataJson[v] : dataJson;
        });
    }

    function isie6Hover(ele, cls) {
        if (ie6) {
            $doc.on('mouseenter', ele, hinit).on('mouseleave', ele, function() {
                $(this).toggleClass(cls);
            });
        }
    }

    function cutString(str, num, strSub) { //截取字符串
        var btyeLen = strLen(str);

        if (btyeLen > (num * 2)) {
            return str.substring(0, num) + strSub;
        }
        return str;
    }

    function isNull(data) {
        return (data == '' || data == undefined || data == null);
    }

    function strLen(str) { //获取中英文字符长度一个中文占两个字符
        var i, sum = 0;
        for (i = 0; i < str.length; i++) {
            if ((str.charCodeAt(i) >= 0) && (str.charCodeAt(i) <= 255)) {
                sum = sum + 1;
            } else {
                sum = sum + 2;
            }
        }
        return sum;
    }

    function cur(ele, mark) {
        var mark = mark || 'cur';
        $(ele).addClass(mark).siblings().removeClass(mark);
    }

    function tab(tabBtnBox, tabBtn, tabContBox, tabCont, mark, active) {
        var active = active || 'click';

        $(tabBtnBox).on(active, tabBtn, function() {
            var idx = $(this).index();
            cur(this,mark);
            $(tabContBox).find(tabCont).eq(idx).show().siblings().hide();
        });
    }

    function query(query){
        var subUrl = location.search.slice(location.search.indexOf('?') + 1),
            subArr = subUrl.split('&') || [],
            querystr = '';

        return subArr.forEach(function(v){
            v.indexOf(query + '=') === 0 && (querystr = v.slice(query.length + 1))
        }), querystr;
    }


    return {
        tmpl: templeteInit,
        ie6Hover: isie6Hover,
        isIE6: ie6,
        cutStr: cutString,
        isNull: isNull,
        tab: tab,
        query: query,
        strLen: strLen
    };
}));