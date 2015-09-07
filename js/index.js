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
        imagesLoader = null,
        $page1 = $('.page-1');

    if ($page1.length) {
        imagesLoader = new util.ImagesLoader(imgArr);
        imagesLoader.loaded();
        imagesLoader.allcompletes(function() {
            $page1.addClass('anim');
        });
    }

});