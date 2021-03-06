require(['js/module/util', 'js/module/login', 'js/module/mfontsize'], function(util, login) {
    var $doc = $(document),
        $page1 = $('.page-1'),
        $page2 = $('.page-2'),
        $ipt = $('.ipt'),
        $iptBtn = $('.ipt-btn'),
        $keyboard = $('.keyboard'),
        $delBtn = $('.del'),
        $okBtn = $('.ok'),
        $keyboardKey = $keyboard.find('li').not('.del, .ok'),
        imgArr = [
            'css/img/bg.jpg',
            'css/img/img-1.png',
            'css/img/img-2.png',
            'css/img/img-3.png',
            'css/img/img-4.png',
            'css/img/img-5.png',
            'css/img/txt-1.png',
            'css/img/txt-1-2.png',
            'css/img/txt-2.png',
            'css/img/txt-3.png',
            'css/img/img-6.png',
            'css/img/del.png'
        ],
        imagesLoader = new util.ImagesLoader(imgArr),
        WXcode = util.query('code'),
        baseUrl = encodeURIComponent('http://app.iheima.com/special/teachersday'),
        openid = '',
        ismobile = '',
        url = 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activityauthbackhome';


    if (localStorage.getItem('fromlist') == 1 || !WXcode) {
        localStorage.setItem('fromlist', 0);
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe7d51503312986a8&redirect_uri=' + baseUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
        return false;
    }

    function shareInit() {

        $.ajax({
            url: 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activityjssdk',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                url: encodeURIComponent(location.href.split('#')[0])
            },
            jsonp: 'jsoncallback',
            success: function(res) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名，见附录1
                    jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        });

        var shareData = {
            title: '黑马学院的导师朋友圈', // 分享标题
            desc: '黑马学院价值千亿的朋友圈', // 分享描述
            link: 'http://app.iheima.com/special/teachersday', // 分享链接
            imgUrl: 'http://upload.iheima.com/activity/teacher/boss.jpg', // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        };

        wx.ready(function() {

            wx.onMenuShareTimeline(shareData);

            wx.onMenuShareAppMessage(shareData);
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
    }

    shareInit();


    if (WXcode) {

        login(url, WXcode, function(data) { //微信授权
            ismobile = data.mobile;
            openid = data.openid;

            if (ismobile) {
                $page2.hide();
            }

            if (util.isNull(openid)) {
                location.href = 'http://app.iheima.com/special/teachersday';
                return false;
            }

            imagesLoader.loaded();
        });

        imagesLoader.allcompletes(function() {
            $page1.show().addClass('anim');
        });

    }

    function goPhone(e) {
        if (ismobile) {
            location.href = 'list.html';
        } else {
            $page2.show().addClass('anim');
        }
        $page1.hide().removeClass('anim');
    }

    function showKeyboard() {
        if ($keyboard.css('display') != 'block' && $ipt.text() == '手机号') {
            $ipt.data('dft-val', $ipt.text()).text('').addClass('cur');
        }
        $keyboard.addClass('isshow');
    }

    function hideKeyboard() {
        $keyboard.removeClass('isshow');
        if (util.isNull($ipt.text())) {
            $ipt.text($ipt.data('dft-val')).removeClass('cur');
        }
    }

    function changeInputValue(e) {
        var $target = $(this),
            keyValue = $target.text(),
            iptValue = $ipt.text(),
            newValue = iptValue + keyValue;

        $ipt.text(newValue);
    }

    function delInputValue(e) {
        var $target = $(this),
            iptValueLen = $ipt.text().length - 1,
            newValue = $ipt.text().slice(0, iptValueLen);

        $ipt.text(newValue);
    }

    function addPhone() { //提交手机号

        if (!/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/g.test($ipt.text())) {
            alert('手机号错误！');
            return false;
        }

        $.ajax({
            url: 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activitymobile',
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: {
                openid: openid,
                mobile: $ipt.text()
            },
            success: function(res) {

                if (res == '1000') {
                    hideKeyboard();
                    var updataUserInfor = JSON.parse(localStorage.getItem('iheima.com'));

                    updataUserInfor.mobile = $ipt.text();

                    localStorage.setItem('iheima.com', JSON.stringify(updataUserInfor));

                    location.href = 'list.html' //列表页
                } else {
                    alert('参数错误');
                }
            }
        });
    }

    $iptBtn.on('touchend', addPhone); //提交
    $ipt.on('touchend', showKeyboard); //输入框
    $keyboardKey.on('touchend', changeInputValue); //键盘按键
    $okBtn.on('touchend', hideKeyboard); //完成按键
    $delBtn.on('touchend', delInputValue); //删除按键

    $page1.on('touchend', goPhone); //显示手机号页

    // history.go(-1);

});