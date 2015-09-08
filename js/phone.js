require(['js/module/util', 'js/module/login', 'js/module/mfontsize'], function(util, login) {
    var $doc = $(document),
        $win = $(window),
        $page2 = $('.page-2'),
        $ipt = $('.ipt'),
        $iptBtn = $('.ipt-btn'),
        $keyboard = $('.keyboard'),
        $delBtn = $('.del'),
        $okBtn = $('.ok'),
        $keyboardKey = $keyboard.find('li').not('.del, .ok'),
        WXcode = util.query('code'),
        url = 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activityauthbackhome';

    WXcode && login(url, WXcode); //微信授权

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

    function verifyPhone(e) { //验证手机号
        var phone = $ipt.text();

        if (!/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/g.test(phone)) {
            alert('手机号错误！');
            return false;
        }
    }

    function addPhone() { //提交手机号

        if(!verifyPhone()){
            return false;
        }

        $.ajax({
            url: 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activitymobile',
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: {
                openid: userInfor.openid,
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

    $iptBtn.on('click', addPhone); //提交
    $ipt.on('click', showKeyboard); //输入框
    $keyboardKey.on('click', changeInputValue); //键盘按键
    $okBtn.on('click', hideKeyboard); //完成按键
    $delBtn.on('click', delInputValue); //删除按键

});