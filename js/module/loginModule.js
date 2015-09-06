define(['module/util'], function(util) {
    'use strict';

    return function(url, WXcode) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                code: WXcode
            },
            success: function(res) {
                if (res) {
                    localStorage.setItem('www.tripsters.cn', JSON.stringify(res));
                }
            }
        });
    }
});

// {"id":"10850","nickname":"kevin","gender":"m","avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM6DeNyD8sOl4Wmyq9U65pm5PEECAWsHb0TH2xicxL7tyz42iboNOJTY5J8JXeNR3IPNZRMQhMl2icJicg/0","from":"weixin","identity":"1","followers_count":"0","friends_count":"0","location":"北京 朝阳","description":null,"country":"","points":"100","gold":"0","growth":"0","nation":null,"occupation":"","trip":"","idle":null,"phone":null,"black_tag":null}
