$(function(){
	// 关闭提示条，并且不再显示
	var noteBox = $('.j-noteBox');
	var storage = noteBox.data('storage');
	if (localStorage.getItem('followSuc') != storage) {
		var tpl = 
			'<div class="yellowBar clearfix">'+
				'<div class="row">'+
					'网易云课堂微专业，帮助你掌握专业技能，令你求职或加薪多一份独特优势！'+
					'<a class="check" href="#">立即查看></a>'+
					'<div class="notNote">'+
						'<i class="x"></i>'+
						' 不再提醒'+
					'</div>'+
				'</div>'+
			'</div>';
		noteBox.append(tpl);
		var notNote = $('.notNote');
		var yellowBar = $('.yellowBar');
		notNote.on('click',function(){
			localStorage.setItem('followSuc', storage);
			yellowBar.hide();
		});
	}
	// END
	// 关注按钮
	var followBox = $('.j-followBox');
	var followed = $('.j-followed');
	var follow = $('.j-follow');
	var auth = new Auth();
	followBox.on('click',function(){
		// 如果没有关注，那么，登入后点击变成关注；并post给服务器状态（不过网易没有提供post接口）
		auth.hasLogin();
		console.log(auth.isLogin);
		if (auth.isLogin) {
			if (follow.hasClass('f-none')) {
				followed.addClass('f-none');
				follow.removeClass('f-none');
			}else{
				follow.addClass('f-none');
				followed.removeClass('f-none');
			}
		}
		// END
	});
	// END
	// 获取是否登入的状态ajax
	function Auth(){
		this.isLogin = 0;
	}
	Auth.prototype.hasLogin =  function(){
		var that = this;
		$.get(
			'http://study.163.com/webDev/login.htm',
			// MD5是个不可逆的算法，但是可以用彩虹表暴力破解，因为算法是固定的。
			{userName: '95B9941B277CAF1C77EE35FEE66FC5F6',password: 'A972AEC008FD064F00AE77C3A6472CC2'}
			)
		.done(function(res){
			// console.log(res);
			if (res == 1) {
				console.log('登入成功');
				that.isLogin = 1;
			}else{
				console.log('用户名或者密码有误');
				that.isLogin = 0;
			}
		})
		.fail(function(){
			console.log('登入失败');
			that.isLogin = -1;
		});
	}
	// END
});
