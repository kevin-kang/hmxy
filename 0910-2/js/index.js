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
    } else {
        imagesLoader.loaded();
        imagesLoader.allcompletes(function() {
            $page1.show().addClass('anim');
        });

        login(url, WXcode, function(data) { //微信授权
            ismobile = data.mobile;
            if (ismobile) {
                $page2.hide();
            }
            openid = data.openid;
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