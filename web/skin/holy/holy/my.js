/*
 * ����:������
 * ���ͣ�http://bh-lay.com/
 * Copyright (c) 2012-2018 С���ջ
**/

var holy={};

//�Զ������������
$.fn.autoKey=function(){
	var searchBox = $(this);
	var title=searchBox.val(); 
	searchBox.click(function(){if(searchBox.val()==title){searchBox.val("");}}).blur(function(){if(searchBox.val()==""){searchBox.val(title);}}); 
	return searchBox;
}
//��̬��ʾ������
$.fn.showTitle=function(){
	var imgList = $(this);
	var total=imgList.length;
	var boxH;
	$.each(imgList,function(){$(this).after('<span>'+$(this).attr('alt')+'</span>');});
	imgList.parent().mouseenter(function(){
		$(this).find('span').stop().animate({bottom:'0'},300);
	}).mouseleave(function(){
		boxH=$(this).find('span').outerHeight();
		$(this).find('span').stop().animate({bottom:-boxH},600);
	});
	return imgList;
}
//�ɹرղ��
$.fn.shutDown=function(){
	$(this).prepend('<div class="close">X</div>');
	$(".close").click(function(){$(this).parent().slideUp('slow');});
	return this;
}

//��������֤
holy.checkForm=function (){
	$("#searchform").submit(function(){
		if($('#searchform .inputText').val()==""||$('#searchform .inputText').val()=="����վ������"){return false;}
	});
}
//�Զ�����
function diySkin(){
	var Rand = Math.floor(Math.random()*4);
	switch(Rand){
		case 0:$('body').addClass('skin_a');
		break
		case 1:$('body').addClass('skin_b');
		break
		case 2:$('body').addClass('skin_c');
		break
		case 3:$('body').addClass('skin_d');
		break
		default:$('body').addClass('skin_a');
	}
}
//ͼ����������
$.fn.gallery=function (){
	if($('.lay_show').length==0){$('body').append("<div class='lay_show'><div class='lay_exist'>X</div><div class='lay_img'><img alt='' src='' /><div class='lay_title'></div><div class='lay_over'>�Ѿ������б��յ㣬����������</div></div><a class='lay_prev'>��</a><a class='lay_next'>��</a></div>");}
	var imgList = $(this);
	var bigPic = $('.lay_show>.lay_img>img');
	var total=imgList.length;
	var i, width, height, marginT, src, alt,timer;
	imgList.css({cursor:'pointer'});
	$(".lay_exist").click(function(){$(this).parent().fadeOut('slow');});
	if(total==1){$('.lay_next, .lay_prev').hide();}
	function change(src,alt){//�л���ͼ����
		$('.lay_title').html((i+1)+'/'+total+'��'+alt);
		bigPic.fadeOut('300');
		clearTimeout(timer);
		timer=setTimeout(function(){
			bigPic.attr('src',src);
			setTimeout(function(){
				width = bigPic.width();
				height = bigPic.height();
				marginT = ($(window).height()-$('.lay_show img').height())/2+$(document).scrollTop();
				if (marginT<0){marginT=0;}
				$('.lay_show .lay_img').stop().animate({'width': width,'height': height,'marginTop':marginT},300);
				setTimeout(function(){bigPic.stop().fadeIn('300');},400);
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
	function over(){$('.lay_over').slideDown(200).delay(800).fadeOut(800);}
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
	$('.lay_next, .lay_prev').mouseover(function(){$(this).stop().animate({width:'60'},500)}).mouseout(function(){$(this).stop().animate({width:'40'},500)});
	return imgList;
}



//������ʾ�ڲ����ص�p��ǩ
function showDetail(box){
	$(box).mouseenter(function(){
		$(this).find('p').stop().fadeTo('600',1);
	}).mouseleave(function(){
		$(this).find('p').stop().fadeTo('600',0);
	});
}

//��ӹ���������λ�ð�ť����
holy.flyTo=function(obj,title,classN){//�����ֱ��ǣ�Ҫ�������Ķ������ɰ�ť���֣����ɰ�ť��class
	var obj = $(obj);
	$('#toolbar').append("<div class='ico "+classN+"'title='"+title+"'>"+title+"</div>");  
	$('.reply').click(function(){
		var top=obj.offset().top-150;
		$('html,body').animate({scrollTop:top},800);
	});
}
//�ַ���Ч��
holy.accordion=function(){
	var pic = $('#lay_accordion li');
	var i=0;//li������ֵ
	var timer;
	var maxW=500;//�����
	var minW=(pic.parent().parent().width()-maxW)/4;//��С���
	var midW=pic.parent().parent().width()/5;//�������
	$.each(pic,function(){$(this).prepend('<b></b>');});
	pic.mouseenter(function(){
		clearTimeout(timer);
		i=pic.index(this);
		timer = setTimeout(function(){
			pic.not(pic.eq(i)).stop().animate({width:minW},'100');
			pic.eq(i).stop().animate({width:maxW},'100');
		},200);
	}).parent().mouseleave(function(){
		clearTimeout(timer);
		timer = setTimeout(function(){
			pic.stop().animate({width:midW},'slow');
		},500);
	});
}
//������
holy.toolBar=function(){
	$('body').append('<div id="toolbar"><div class="backtop ico" title="�ɵ�����ȥ">���ض���</div></div>');
	$('.backtop').click(function(){$('html,body').stop().animate({scrollTop: '0px'}, 800);});
	$(window).scroll(function(){
		if($(window).scrollTop()<=100) {
			$(".backtop").css({visibility:"hidden"});
		}else{
			$(".backtop").css({visibility:"visible"});
		}
	});
}
//�Ķ�ģʽ���Ȩ���Ӻ���
holy.readMode=function (article,show,hide){
	$('#toolbar').append('<div class="read ico" title="�Ķ�ģʽ��˧��">�Ķ�ģʽ</div><div class="exitread ico" title="�ص�����ģʽ��">ҳ��ģʽ</div>');
	var article =$(article);
	var show =$(show);
	var hide =$(hide);
	var url = window.location.href;
	var reader =$('.read');
	var exitread =$('.exitread');
	reader.click(function(){
		article.animate({fontSize: '24px'},'slow');
		hide.css('display','none');
		show.animate({width:'100%'},'slow');
		reader.slideUp('slow');
		exitread.slideDown('slow');
	});
	exitread.click(function(){
		article.animate({fontSize: '14px'},'1000');
		setTimeout(function (){hide.fadeIn('500');},1000);
		show.animate({width:'650px'},'1000');
		exitread.slideUp('slow');
		reader.slideDown('slow');
	});
	article.find('h3').append("<a class='hide' href='"+url+"' title='С���ջ'>�鿴ԭ��</a>");
	article.find('p').eq(3).append("<a class='hide' href='"+url+"' title='С���ջ'>С���ջ</a>");
}
//tabЧ��
holy.tab=function(tabName){//����������ID
	var btn=$(tabName).find('.caption').find('li');
	var showBox=$(tabName).find('.list').find('ul');
	var boxH=showBox.height();
	var i=0;
	btn.eq(i).addClass('on');
	btn.click(function(){
		btn.eq(i).removeClass('on');
		i=btn.index(this);
		btn.eq(i).addClass('on');
		showBox.eq(0).stop().animate({marginTop:-i*boxH},'500');
	});
}
//�ٲ���
holy.wFall=function (){
	var box = $('#waterfall').children("dl");
	var boxer = [];//������ݵ�����
	var timer;
	var total = box.length;
	var dlNo=0;//ҳ�����Ѿ����ɵ�dl����
	var i=0;//Դdl������ֵ
	$.each(box,function(){boxer.push($(this).html());});//��ȡԴ���ݣ���������
	$('#waterfall').html("<div style='padding:0px 10px;' class='box'><p>��ҳ����ٲ���Ч���Ǿ�����ʹ��jquery���ʵ�֣�������ʱ�����������İ��������֮�����Ͼ����������ǵĸ��˻��ŶӴ�ҵ��Ŀ�������ע���£�����</p></div><div class='col' id='colA'></div><div class='col' id='colB'></div><div class='col' id='colC'></div><div class='col' id='colD'></div><div id='addMore'>��ʾ����</div>");//�����µĿ�ܽṹ
	var colA=$('#colA');
	var colB=$('#colB');
	var colC=$('#colC');
	var colD=$('#colD');
	var hA,hB,hC,hD;//�����ĸ߶�
	function show(showdlNo){//��������ݣ�����Ϊ��ӵ�����
		for(var n=0;n<showdlNo;n++){
			hA = colA.height();
			hB = colB.height();
			hC = colC.height();
			hD = colD.height();
			if(i==total){i=0}
			if(hA<=hB&&hA<=hC&&hA<=hD){colA.append("<dl id='wf"+dlNo+"'>"+boxer[i++]+"</dl>");
			}else if(hB<=hC&&hB<=hD){colB.append("<dl id='wf"+dlNo+"'>"+boxer[i++]+"</dl>");
			}else if(hC<=hD){colC.append("<dl id='wf"+dlNo+"'>"+boxer[i++]+"</dl>");
			}else{colD.append("<dl id='wf"+dlNo+"'>"+boxer[i++]+"</dl>");}
			$('#wf'+dlNo++).fadeIn('300');
		}
	}
	show(8);//ҳ���ʼ��ʾ�˸�dl
	$(window).scroll(function(){
		if(dlNo<40){//����ҳ���еĹ�������ʾdl������
			clearTimeout(timer);
			timer = setTimeout(function(){
				if($(document).scrollTop()+$(window).height()>$(document).height()-300){show(4);}
			},500);
		}else{$('#addMore').fadeIn('200');}
	});
	$('#addMore').click(function(){show(8)});
}
//С�绹����������ie6������֮��
holy.fixie6=function (){
	$('head').append("<script src='/skin/holy/iepng.js' type='text/javascript'></script><style>#killie6{height:140px;padding:40px 200px 0px;background:#fff;font-size:16px;border-bottom:5px solid #444;color:#222}#killie6 h1{text-align:center;font-size:20px;border-bottom:1px dashed #ddd;}#killie6 a{text-decoration:underline;padding-right:1em;color:#800;}#toolbar{position:'absolute'}#killie6 a:hover{color:red}.skin_a,.skin_b,.skin_c,body{background-position:center 180px;}</style>");
	$('body').prepend("<div id='killie6'><h1>�ϴ��鷳��������������ɣ�</h1><p>���ͣ���˵��ģ���ô�ϵ����������ô�����ð���̫out������ʾ�¹��������еĲ�����Ч���п����޷������鿴Ŷ���Ƽ���ʹ��<a href='http://chrome.360.cn/'>360���������</a>��<a href='http://www.google.com/chrome/?hl=zh-CN'>�ȸ������</a>��������������ŵ�ҳ��Ч���ɣ�<a href='http://bh-lay.com/about/2012-07-30/42.html'>Ϊʲô��֧���ҵ��������</a></p></div>");
	EvPNG.fix('div,a,span');
	$(window).scroll(function(){$('#toolbar').css({top:$(document).scrollTop()+$(window).height()/2});});
}
//�л����� 
holy.fixurl=function (){
	var hostname=window.location.hostname;
	if(hostname!="bh-lay.com"){window.location.hostname="bh-lay.com"}
}
//������Ϣ
function medetail(){
	$('#aboutme .weibo').css({display:'block',height:'0',paddingTop:'0'});
	$('#aboutme').mouseenter(function(){
		$('#aboutme .weibo').stop().animate({height:'35',paddingTop:'10'},'200');
	}).mouseleave(function(){
		$('#aboutme .weibo').stop().animate({height:'0',paddingTop:'0'},300);
	});
}

//�ͻ�����ҳ��
function serviceList(){
	$('#serviceList div a').css({display:'block'}).mouseover(function(){
		$(this).prev().stop().fadeTo('300',1);
	}).mouseout(function(){
		$(this).prev().stop().fadeTo('300',0);
	});
}


$(document).ready(function(){
//�������� ie6��7
	//holy.fixurl();
	if($.browser.msie){if($.browser.version=="6.0"||$.browser.version=="7.0"){holy.fixie6();}}
//������
	if($('#toolbar').length==0){holy.toolBar();}
	if($('#uyan_frame').length>0){holy.flyTo('#uyan_frame','��˵������','reply');}
	if($(".article").length>0){holy.readMode('.article','.main','.sidebar');}
	
//ʹ�ò��������
	if($('.article img').length>0){$('.article img').gallery();}
	if($('.photo img').length>0){$('.photo img').gallery();}

	if($('#keyboard').length>0){
		$('#keyboard').autoKey();
		holy.checkForm();
	}
	
	if($("#tabOne").length>0){holy.tab('#tabOne');}
	if($("#tabTwo").length>0){holy.tab('#tabTwo');}
	
	if($('.picText').length>0){showDetail('.picText div');}

	if($('#lay_accordion').length>0){holy.accordion();}
	if($('.grid').length>0){$('.grid img').showTitle();}
	
	if($('#focusTitle').length>0){diySkin();}
	if($('#aboutme').length>0){medetail();}
	if($('#serviceList').length>0){serviceList();}
	
	if($('#waterfall').length>0){holy.wFall();}
	if($('.codeArea').length>0){$('head').append("<script src='/skin/holy/codeArea.js' type='text/javascript'></script>");}
	if($(".shutdown").length>0){$('.shutdown').shutDown();}
});