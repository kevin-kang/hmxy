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
        return (data == '' || data == undefined || data == null || data == 0);
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
            cur(this, mark);
            $(tabContBox).find(tabCont).eq(idx).show().siblings().hide();
        });
    }

    function query(query) {
        var subUrl = location.search.slice(location.search.indexOf('?') + 1),
            subArr = subUrl.split('&') || [],
            querystr = '';

        return subArr.forEach(function(v) {
            v.indexOf(query + '=') === 0 && (querystr = v.slice(query.length + 1))
        }), querystr;
    }
    /**
     * [Queue 队列]
     */
    function Queue() {
        this.queue = [];
    }

    $.extend(Queue.prototype, {
        addqueue: function() {
            if (arguments.length == 0) {
                return -1;
            }
            var i = 0,
                len = arguments.length;
            for (; i < len; i++) {
                this.queue.push(arguments[i]);
            }
        },

        dequeue: function() {
            if (this.queue.length == 0) {
                return null
            } else {
                return this.queue.shift();
            }
        }
    });

    /**
     * [ImagesLoader 图片加载队列]
     */
    function ImagesLoader() { //图片加载队列
        Queue.apply(this, arguments);
        this.init.apply(this, arguments);
    }

    ImagesLoader.prototype = new Queue();
    $.extend(ImagesLoader.prototype, {
        addImagesQueue: function() {
            var that = this,
                arr = that.imagesArr;
            $.each(arr, function() {
                that.addqueue(this);
            });
        },

        imagesProgress: function() {
            var that = this,
                len = that.maxNum,
                pet = that.total;

            $('.text em').eq(0).text(pet);
            $('.progress div').css({
                'width': ((100 / len) * pet) + '%'
            });
        },

        allcompletes: function(cb) {
            var cb = cb || function() {};
            $('.progress div').on('webkitTransitionEnd', function() {
                if (this.total == this.maxNum) {
                    $('.loading').hide();
                    cb();
                }
            });
        },

        loaded: function() {
            var that = this;

            $('.loading').show();
            if (that.queue.length > 0) {
                $('.loading').show();
                $('.text em').eq(1).text(that.maxNum);
                that.image.onload = that.image.onerror = function() {
                    that.total++;
                    that.imagesProgress();
                    setTimeout(function() {
                        that.loaded();
                    }, 80);
                };
                that.image.src = that.dequeue();
            }
        },

        init: function(imagesArr) {
            this.maxNum = imagesArr.length;
            this.image = new Image();
            this.total = 0;
            this.imagesArr = imagesArr;
            this.addImagesQueue();
        }
    });

    return {
        tmpl: templeteInit,
        ie6Hover: isie6Hover,
        isIE6: ie6,
        cutStr: cutString,
        isNull: isNull,
        tab: tab,
        query: query,
        strLen: strLen,
        ImagesLoader: ImagesLoader
    };
}));