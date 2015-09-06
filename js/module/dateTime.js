;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD模式
        define(factory);
    } else {
        // 全局模式
        factory();
    }
}(function() {

    function addZero(str){
        return parseInt(str,10) > 9 ? str : '0' + str;
    }

    return function dateTime(timestr) { // 时间转换
        var nowTime = (new Date()).getTime(),
            oldTime = timestr * 1000,
            oldDate = new Date(oldTime),
            oldYear = oldDate.getFullYear(),
            oldMonth = oldDate.getMonth() + 1,
            oldDay = oldDate.getDate(),
            diffDate = Math.abs(nowTime - oldTime),
            diffDay = parseInt(diffDate / 24 / 60 / 60 / 1000, 10),
            diffHoures = parseInt(diffDate / 60 / 60 / 1000, 10),
            diffMinutes = parseInt(diffDate / 60 / 1000, 10),
            diffseconds = parseInt(diffDate / 1000, 10),
            disTime = '刚刚';

        if (diffDay > 0) {
            disTime = oldYear + '-' + addZero(oldMonth) + '-' + addZero(oldDay);
        }
        if (diffDay == 0 && diffHoures > 0) {
            disTime = diffHoures + '小时前';
        }
        if (diffDay == 0 && diffHoures == 0 && diffMinutes > 0) {
            disTime = diffMinutes + '分前';
        }
        if (diffDay == 0 && diffHoures == 0 && diffMinutes == 0 && diffseconds > 0) {
            disTime = diffseconds + '秒前';
        }

        return disTime;
    };
}));