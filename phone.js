require(['js/module/util', 'js/module/mfontsize'], function(util) {
    var $doc = $(document),
        $win = $(window),
        $page2 = $('.page-2'),
        $ipt = $('.ipt'),
        $iptBtn = $('.ipt-btn'),
        $keyboard = $('.keyboard'),
        $delBtn = $('.del'),
        $okBtn = $('.ok'),
        $keyboardKey = $keyboard.find('li').not('.del, .ok'),
        userInfor = JSON.parse(localStorage.getItem('iheima.com'));

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

    $iptBtn.on('touchend', addPhone); //提交
    $ipt.on('touchend', showKeyboard); //输入框
    $keyboardKey.on('touchend', changeInputValue); //键盘按键
    $okBtn.on('touchend', hideKeyboard); //完成按键
    $delBtn.on('touchend', delInputValue); //删除按键

    history.replaceState(null, '首页', 'http://app.iheima.com/special/teachersday/');


});