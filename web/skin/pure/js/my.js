/*
 * ����:������
 * ���ͣ�http://bh-lay.com/
 * Copyright (c) 2012-2018 С���ջ
 */

//С�绹����������ie6������֮��
function fixie6(){
	$('body').prepend("<div id='killie6'><h1>�Բ������޷��������������</h1><p>������������ڹ��ϣ������޷������鿴�������ݡ�<a href='http://bh-lay.com/about/2012-07-30/42.html'>Ϊʲô��֧���ҵ��������</a><br/>�Ƽ���ʹ��<a href='http://chrome.360.cn/'>360���������</a><a href='http://www.google.com/chrome/?hl=zh-CN'>�ȸ������</a>���ӽ��쿪ʼ������ŵ�ҳ��Ч����</p></div>");
	$('head').append("<style> #killie6{display:none;padding:50px;background:#aaa;} #killie6 a{text-decoration:underline;padding:1em;} #toolbar{position:'absolute'}</style>");
	$('#killie6').slideDown(1000);
	$('.share_list dl').css({float:'none'});
	$('#toolbar').css({top:$(document).scrollTop()+$(window).height()/2});
	$(window).scroll(function(){
		$('#toolbar').css({top:$(document).scrollTop()+$(window).height()/2});
	});
	$('.nav>ul>li>a').mouseenter(function(){$(this).next().css({position: 'absolute',display:'block',marginLeft:'-50%',width: '80px'});});
	$('.nav>ul>li').mouseleave(function(){$('.nav>ul>li>ul').hide();});
}
//�Զ������������
$.fn.autoKey=function(){
	var searchBox = $(this);
	var title=searchBox.val(); 
	searchBox.click(function(){if(searchBox.val()==title){searchBox.val("");}}).blur(function(){if(searchBox.val()=="") {searchBox.val(title);}}); 
	return searchBox;
}
//��ʾ��ͼ���
$.fn.showBigPic=function (){
	var imgList = $(this);
	var src;
	$('body').append("<div class='lay_show' style='display:none;'><img src=''/></div>");
	imgList.css({cursor:'pointer'}).click(function(){
		src = $(this).attr('src');
		$('.lay_show').css({height:$(document).height()});
		$('.lay_show img').attr({src:src});
		setTimeout(function(){$('.lay_show img').animate({marginTop:($(window).height()-$('.lay_show img').height())/2+$(document).scrollTop()},300);},1);
		$('.lay_show').fadeIn('slow');
	});
	$('.lay_show').click(function(){$('.lay_show').fadeOut('slow');});
	return imgList;
}
//ͼ����������
$.fn.photoMode=function (){
	$('body').append("<div class='lay_show'><div class='lay_exist'>X</div><div class='lay_img'><img alt=' ' src=' ' /><div class='lay_title'></div><div class='lay_over'>�Ѿ������б��յ㣬����������</div></div><a class='lay_prev'>��</a><a class='lay_next'>��</a></div>");
	var imgList = $(this);
	var total=imgList.length;
	var bigPic = $('.lay_show>.lay_img>img');
	var i, width, height, marginT, src, alt;
	imgList.parent().css({cursor:'pointer'});
	function over(){$('.lay_over').slideDown(200).delay(800).fadeOut(800);}
	$(".lay_exist").click(function(){$(this).parent().fadeOut('slow');});
	if(total==1){$('.lay_next, .lay_prev').hide();}
	function change(src,alt){
		$('.lay_title').html((i+1)+'/'+total+'��'+alt);
		bigPic.fadeOut('300');
		setTimeout(function(){
			bigPic.attr('src',src);
			setTimeout(function(){
				width = bigPic.width();
				height = bigPic.height();
				marginT = ($(window).height()-$('.lay_show img').height())/2+$(document).scrollTop();
				if (marginT<0){marginT=0;}
				$('.lay_show .lay_img').animate({'width': width,'height': height,'marginTop':marginT},300);
				setTimeout(function(){bigPic.fadeIn('300');},400);
			},10);
		},800);
	}
	imgList.click(function(){
		src = $(this).attr('src');
		alt = $(this).attr('alt');
		i = imgList.index(this);
		$('.lay_show').fadeIn('800').css({height:$(document).height()+400});
		change(src,alt);
	});
	//ǰһ��
	function prev(){
		if (i>0){
			src = imgList.eq(--i).attr('src');
			alt = imgList.eq(i).attr('alt');
			change(src,alt);
		}else{over();i=total;}
	}
	//��һ��
	function next(){
		if (i<total-1){
			src = imgList.eq(++i).attr('src');
			alt = imgList.eq(i).attr('alt');
			change(src,alt);
		}else{over(); i=-1;}
	}
	//���Ҽ���ҳ
	$(window).keydown(function(event){
		if($('.lay_show').css('display')=='block'){
			switch(event.keyCode) {
				case 37:prev();
				break
				case 39:next();
				break
				case 27:$('.lay_show').fadeOut('slow');
				break
			}
		}
	});
	$('.lay_next').click(function(){next();});
	$('.lay_prev').click(function(){prev();});
	$('.lay_next, .lay_prev').mouseover(function(){$(this).animate({width:'60'},500)}).mouseout(function(){$(this).animate({width:'40'},500)});
	return imgList;
}
//�ɹرղ��
$.fn.shutDown=function(){
  $(this).prepend('<div class="close">X</div>');
  $(".close").click(function(){$(this).parent().slideUp('slow');});
  return this;
}
//�Ķ�ģʽ���Ȩ���Ӻ���
function readMode(article,show,hide){
	var article =$(article);
	var show =$(show);
	var hide =$(hide);
	var url = window.location.href;
	$('#toolbar').append('<div class="read ico" title="ʹ���Ķ�ģʽ">�Ķ�ģʽ</div><div class="exitread ico" title="�˳��Ķ�ģʽ">ҳ��ģʽ</div>');
	$('.read').click(function(){
		article.animate({fontSize: '24px'},'slow');
		hide.css('display','none');
		show.animate({width:'100%'},'slow');
		$('.read').slideUp('slow');
		$('.exitread').slideDown('slow');
	});
	$('.exitread').click(function(){
		article.animate({fontSize: '14px'},'1000');
		setTimeout(function (){hide.fadeIn('500');},1000);
		show.animate({width:'700px'},'1000');
		$('.exitread').slideUp('slow');
		$('.read').slideDown('slow');
	});
	article.find('h3').append("<a class='hide' href='"+url+"' title='С���ջ'>�鿴ԭ��</a>");
	article.find('p').eq(3).append("<a class='hide' href='"+url+"' title='С���ջ'>С���ջ</a>");
}
//��ӹ������ظ�λ�õİ�ť����
function scrollReply(lyb){
	var lyb = $(lyb);
	$('#toolbar').append('<div class="reply ico" title="���Իظ�">���Իظ�</div>');  
	$('.reply').click(function(){
		var top=lyb.offset().top-150;
		//alert(top);
		$('html,body').animate({scrollTop:top},800);
	});
}
//�ַ���Ч��
function accordion(page){
	var pic = $(page);
	var i;
	var timer;
	pic.mouseenter(function(){
		clearTimeout(timer);
		i=pic.index(this);
		timer = setTimeout(function(){
			pic.not(pic.eq(i)).animate({width:'44px'},'1000');
			pic.eq(i).animate({width:'500px'},'1000');
		},100);
	}).parent().parent().mouseleave(function(){
		setTimeout(function(){
			pic.animate({width:'135px'},'slow');
		},200);
	});
}

$(document).ready(function(){
//��ӹ�����
	$('body').append('<div id="toolbar"><div class="backtop ico" title="���ض���">���ض���</div></div>');
	$('.backtop').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
//ʹ�ò��������
	if($('.article img').length>0){$('.article img').photoMode();}
	if($('.photo img').length>0){$('.photo img').showBigPic();}
	if($('#keyboard').length>0){$('#keyboard').autoKey();}
	if($(".shutdown").length>0){$('.shutdown').shutDown();}

	if($('#uyan_frame').length>0){scrollReply('#uyan_frame');}
	if($(".article").length>0){readMode('.article','.main','.sidebar');}
	if($('#lay_accordion').length>0){accordion('#lay_accordion li');}
	if($.browser.msie){if($.browser.version=="6.0"||$.browser.version=="7.0"){fixie6();}}

//ģ��߿���Ӱ����չ��Ч��
	$(".box").mouseover(function(){$(this).addClass("shadow")}).mouseout(function(){$(this).removeClass("shadow")});
	if($(".caption").length>0){$(".caption").click(function(){$(this).next().slideToggle('slow');});}

//ȥ��Ĭ��ͼ��
	if($('.picText').length>0){
		var i = 0;
		for(i=0;i<$('.picText img').length;i++){
			var src=$('.picText img').eq(i).attr('src').slice(-10,-4);
			if(src=='notimg'){$('.picText img').eq(i).hide();}
		}
	}

//����ѶУ�ѽ���ͼ
	function focusPhoto(){
		var i=0;
		var totoal=$('.focusphoto>dl>dd').length;
		function write(i){
			var title = $('.focusphoto>dl>dd>a').eq(i).attr('title');
			$('.focusphoto>dl>dd').eq(i).append('<p class="none">'+title+'</p>');
		}
		for (i=0;i<totoal;i++){write(i);}
		$('.focusphoto>dl>dd').mouseenter(function(){$(this).find('p').slideDown('200');});
		$('.focusphoto>dl>dd').mouseleave(function(){$(this).find('p').slideUp('1000');});
	}
	if($(".focusphoto").length>0){focusPhoto();}

//���԰���ӰЧ��
	$(".lyk input,.lyk textarea,.lyk .button input").focus(function(){$(this).parent().addClass('shadow');}).blur(function(){$(".lyk dd").removeClass('shadow');});

});