require(['js/module/util', 'js/module/mfontsize'], function(util, login) {
	var $doc = $(document),
		$win = $(window),
		$contList = $('.cont-list'),
		$template = $('#template'),
		templateHtml = $template.html(),

		page = 1;

	function getMore() {
		$.ajax({
			url: 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activitylist', //页数URL
			type: 'GET',
			dataType: 'jsonp',
			data: {
				p: page
			},
			success: renderData
		});
	}

	function renderData(res) {
		res.forEach(function(v, k) {
			v.isvideo = util.isNull(v.is_video) ? 'style="display: none;"' : 'style="display: block;"';
			v.video = util.isNull(v.is_video) ? '#nogo' : v.thumb;
			v.isshow = util.isNull(v.thumb) && util.isNull(v.is_video) ? 'style="display: none;"' : 'style="display: -webkit-box"';

			util.isNull(v.is_video) && v.thumb.forEach(function(v1, k1){
				v.imgthumb.push('<img src="' + v1 + '" alt="">');
			});
			v.imgthumb = v.imgthumb.join('');

			v.comments = util.isNull(v.comments) ? '0' : v.comments;

			v.pinglun.forEach(function(v2, k2){
				v.pllist.push('<li><span class="plname">' + v2.student_name + '：</span><span class="plinfor">' + v2.comment + '</span></li>');
			});
			v.pllist = v.pllist.join('');

			util.tmpl(templateHtml, v);
		});
	}

	getMore();
});