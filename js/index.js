require(['js/module/util', 'js/module/mfontsize'], function(util) {
    var imgArr = [
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
        $page1 = $('.page-1');

    imagesLoader = new util.ImagesLoader(imgArr);
    imagesLoader.loaded();
    imagesLoader.allcompletes(function() {
        $page1.addClass('anim');
        $page1.find('.img-5').on('webkitAnimationEnd animationEnd', goPhone);
        imagesLoader2 = new util.ImagesLoader(imgArrPhone);
        imagesLoader2.loaded();
    });

    function goPhone(e) {
        setTimeout(function() {
            location.href = 'phone.html'
        }, 3000);
    }

    $page1.on('click', goPhone);

});