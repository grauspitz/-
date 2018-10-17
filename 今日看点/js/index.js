/*用户点击不同的导航，跳转到不同的页面*/
$(function(){
	$('.contentLeft ul').on({
		click:function(){
			if($(this).text()=="首页"){
				// 注意相对的是印日的文件的路径
				$('.contentRight').load('pages/home.html');
				return;
			}
			if($(this).text()=="栏目管理"){
				$('.contentRight').load('pages/category.html');
				return;
			}
			if($(this).text()=="资讯管理"){
				$('.contentRight').load('pages/info.html');
				return;
			}
			if($(this).text()=="用户管理"){
				$('.contentRight').load('pages/user.html');
				return;
			}
		}
	},'li');
})






