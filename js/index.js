require(['js/module/util', 'js/module/login', 'js/module/mfontsize'], function(util, login) {
    var $doc = $(document),
        $page1 = $('.page-1'),
        imgArr = [
            'css/img/bg.jpg',
            'css/img/img-1.png',
            'css/img/img-2.png',
            'css/img/img-3.png',
            'css/img/img-4.png',
            'css/img/img-5.png',
            'css/img/txt-1.png',
            'css/img/txt-1-2.png'
        ],
        imgArrPhone = [
            'css/img/bg.jpg',
            'css/img/txt-2.png',
            'css/img/txt-3.png',
            'css/img/img-6.png',
            'css/img/del.png',
        ],
        imagesLoader = imagesLoader2 = null,
        WXcode = util.query('code'),
        baseUrl = encodeURIComponent('http://app.iheima.com/special/teachersday'),
        userInfor = JSON.parse(localStorage.getItem('iheima.com')),
        url = 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activityauthbackhome',
        goUrl = 'phone.html';

    try {
        if (!WXcode) {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe7d51503312986a8&redirect_uri=' + baseUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            return false;
        } else {
            imagesLoader = new util.ImagesLoader(imgArr);
            imagesLoader.loaded();
            imagesLoader.allcompletes(function() {
                $page1.addClass('anim');
                imagesLoader2 = new util.ImagesLoader(imgArrPhone);
                imagesLoader2.loaded();
            });

            login(url, WXcode, function(data) { //微信授权
                if (data.mobile) {
                    goUrl = 'list.html';
                    alert('有了');
                }
            });
        }
        alert('cs');
        function goPhone(e) {
            alert('不行了');
            location.href = goUrl;
        }

        $doc.on('touchend', '.page', goPhone);
    } catch (e) {
        alert("出错：" + e);
    }

});