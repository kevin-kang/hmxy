require(['js/module/util', 'js/module/mfontsize'], function(util) {
	var $doc = $(document),
		$win = $(window),
		$body = $('body'),
		$contList = $('.cont-list'),
		$template = $('#template'),
		$btmlayer = $('.btm-layer'),
		$user = $('.user'),
		$zoomimg = $('.zoomimg'),
		templateHtml = $template.html(),
		userInfor = JSON.parse(localStorage.getItem('iheima.com')),
		page = 1;


	$user.find('span').html(userInfor.nickname);
	$user.find('img').attr('src', userInfor.headimgurl);
	/**
	 * [getMore 获取列表数据]
	 */
	$.ajax({
		url: 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activitylist', //页数URL
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		data: {
			openid: userInfor.openid
		},
		// jsonpCallback: 'jsonp',
		success: renderData
	});

	/**
	 * [renderData 渲染列表]
	 * @param  {[obj]} res [返回数据结果]
	 */
	function renderData(res) {
		var htmlPart = [];

		res.forEach(function(v, k) {
			v.imgthumb = [];
			v.pllist = [];
			v.zanlist = [];
			v.isiframe = util.isNull(v.is_video) ? ' ' : '<iframe src="' + v.thumb + '" frameborder="0" allowfullscreen></iframe>';

			v.isshow = util.isNull(v.is_video) ? ' ' : 'isdis';
			v.desdis = util.isNull(v.description) ? 'isdis' : ' ';
			v.description = util.isNull(v.description) ? ' ' : v.description;
			v.isgood = util.isNull(v.iszan) ? ' ' : 'cur';

			if (util.isNull(v.is_video)) {
				v.thumb = v.thumb ? v.thumb.split(',') : [];
				v.s_thumb = v.s_thumb ? v.s_thumb.split(',') : [];
				v.s_thumb.forEach(function(v1, k1) {
					v.imgthumb.push('<img bigsrc="' + v.thumb[k1] + '" src="' + v1 + '" alt="">');
				});
			}

			v.imgthumb = v.imgthumb.join('') ? v.imgthumb.join('') : ' ';

			v.comments = util.isNull(v.comments) ? '0' : v.comments;

			v.pinglun.forEach(function(v2, k2) {
				v.pllist.push('<li><span class="plname">' + v2.student_name + '：</span><span class="plinfor">' + v2.comment + '</span></li>');
			});
			v.pllist = v.pllist.join('') ? v.pllist.join('') : ' ';
			v.ispl = util.isNull(v.pllist) ? 'isdis' : ' ';

			v.zans.forEach(function(v3, k3) {
				v.zanlist.push('<span>' + v3.nickname + '</span>');
			});
			v.zanlist = util.isNull(v.zanlist) ? ' ' : v.zanlist.join('，');

			v.isgl = util.isNull(v.zanlist) ? 'isdis' : '';

			v.isdis = util.isNull(v.zanlist) && util.isNull(v.pllist) ? 'isdis' : ' ';

			htmlPart.push(util.tmpl(templateHtml, v));
		});

		$contList.append(htmlPart.join(''));

		$body.addClass('anim');

		$user.css('opacity', 1);

		localStorage.setItem('fromlist', 1);
	}

	/**
	 * [postZan 点赞]
	 */
	function postZan() {
		var $target = $(this),
			aid = $target.parents('dl').data('aid'),
			spanhtml = '<span>' + userInfor.nickname + '</span>';

		if ($target.hasClass('cur')) {
			return false;
		}
		$target.html(parseInt($target.html(), 10) + 1);
		$.ajax({
			url: 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activityzan', //页数URL
			type: 'GET',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			data: {
				openid: userInfor.openid,
				aid: aid,
				nickname: userInfor.nickname
			}
		});

		if ($target.parents('dl').find('.good-pl').hasClass('isdis')) {
			$target.parents('dl').find('.good-pl').removeClass('isdis');
			$target.parents('dl').find('.goodlist').removeClass('isdis');
		} else {
			spanhtml = spanhtml + '，';
		}
		$(spanhtml).prependTo($target.parents('dl').find('.goodlist'));
		$target.addClass('cur');
	}
	/**
	 * [postPl 评论]
	 */
	function postPl() {
		var $target = $(this),
			$iptpl = $target.parents('dd').find('.ipt-pl'),
			$goodpl = $target.parents('dd').find('.good-pl'),
			aid = $target.parents('dl').data('aid'),
			textareaValue = $.trim($target.siblings('textarea').val()).replace(/</g, '&lt;').replace(/>/g, '&gt;'),
			lihtml = '<li><span class="plname">' + userInfor.nickname + '：</span><span class="plinfor">' + textareaValue + '</span></li>';

		if ($target.data('posting') || textareaValue.length == 0) {
			return false;
		}

		$target.parents('dl').find('.pl').html(parseInt($target.parents('dl').find('.pl').html(), 10) + 1);
		$target.data('posting', 1);
		$.ajax({
			url: 'http://app.iheima.com/?app=ihmactivity&controller=h5&action=activitycomment', //页数URL
			type: 'GET',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			data: {
				openid: userInfor.openid,
				aid: aid,
				nickname: userInfor.nickname,
				comment: textareaValue
			},
			success: function() {
				$target.data('posting', 0);
				$iptpl.hide();
				$goodpl.removeClass('isdis');
				$target.parents('dd').removeClass('ipt-pl-show');
				$target.siblings('textarea').val('');

			}
		});

		if ($target.parents('dl').find('.good-pl').hasClass('isdis')) {
			$target.parents('dl').find('.good-pl').removeClass('isdis').find('.pllist').removeClass('isdis');
		}

		$(lihtml).appendTo($target.parents('dl').find('.pllist'));
	}

	function showpl() {
		var $target = $(this),
			$iptpl = $target.parents('dd').find('.ipt-pl'),
			$goodpl = $target.parents('dd').find('.good-pl');

		$target.parents('dd').toggleClass('ipt-pl-show');
		$iptpl.toggle();

		if ($.trim($goodpl.find('.goodlist').html()) || $.trim($goodpl.find('.pllist').html())) {
			$goodpl.toggleClass('isdis');
		}
	}

	function fadeMaskLayer() {
		var $target = $(this);
		setTimeout(function() {
			$target.css({
				opacity: 0
			});
			$target.data('hides', 1);
			$('.btm-layer').addClass('anim');
		}, 3000);
	}

	function hideMasklayer() {
		var $target = $(this);

		if ($target.data('hides')) {
			$body.removeClass('anim');
			$('.mask-layer').hide().data('hides', 0);
			$('.img-1, .img-2').hide().data('hides', 0);
		}
	}
	// getMore();
	// 
	function shareShow() {
		$('.img-2').show().css('opacity', 1).data('hides', 1);;
		$('.mask-layer').show().css('opacity', 1).data('hides', 1);;
	}

	function lookZoomImg() {
		var $target = $(this),
			bigsrc = $target.attr('bigsrc');

		$zoomimg.show().css('opacity', 1).find('img').attr('src', bigsrc);
	}

	function hideZoomImg(e) {
		$(this).removeAttr('style');
	}

	$btmlayer.on('touchend', shareShow);

	$body.on('webkitTransitionEnd transitionend', '.anim .img-1, .anim .mask-layer', fadeMaskLayer);

	$body.on('touchstart', '.img-1, .img-2, .mask-layer', hideMasklayer);

	$contList.on('touchend', '.good', postZan)
		.on('touchend', '.pl', showpl)
		.on('touchend', '.sub-btn', postPl)
		.on('click', '.media img', lookZoomImg);

	$zoomimg.on('click', hideZoomImg);


});