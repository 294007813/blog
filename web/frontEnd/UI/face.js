/**
 * @author bh-lay
 * 
 * UI.face();
 * UI
 * user Interface 
 * user Interaction
 * 
 * Function depends on
 *		JQUERY
 * 	load
 **/
window.UI = window.UI || {};
(function(exports){	
	var faceData = null;
	var faceData = [
		{src : "1bishi.gif", title : "����"},
		{src : "2cahan.gif", title : "����"},
		{src : "3daxiao.gif", title : "��Ц"},
		{src : "4deyi.gif", title : "����"},
		{src : "5fanbaiyan.gif", title : "������"},
		{src : "6hengheng.gif", title : "�ߺ�"},
		{src : "7huaixiao.gif", title : "��Ц"},
		{src : "8jingkong.gif", title : "����"},
		{src : "9kaixin.gif", title : "����"},
		{src : "10keai.gif", title : "�ɰ�"},
		{src : "11kelian.gif", title : "����"},
		{src : "12ku.gif", title : "��"},
		{src : "13liuhan.gif", title : "����"},
		{src : "14nanguo.gif", title : "�ѹ�"},
		{src : "15qinqin.gif", title : "����"},
		{src : "16semimi.gif", title : "ɫ����"},
		{src : "17shengqi.gif", title : "����"},
		{src : "18shuijiao.gif", title : "˯��"},
		{src : "19tiaopi.gif", title : "��Ƥ"},
		{src : "20touxiao.gif", title : "͵Ц"},
		{src : "21wabikong.gif", title : "�ڱǿ�"},
		{src : "22weiqu.gif", title : "ί��"},
		{src : "23yiwen.gif", title : "����"},
		{src : "24yun.gif", title : "��"},
		{src : "25zhuakuang.gif", title : "ץ��"},
		{src : "26ohhehe.gif", title : "Ŷ�Ǻ�"},
		{src : "27aoman.gif", title : "����"},
		{src : "28ganga.gif", title : "����"},
		{src : "29guzhang.gif", title : "����"},
		{src : "30haixiu.gif", title : "����"},
		{src : "31jingya.gif", title : "����"},
		{src : "32kulou.gif", title : "����"},
		{src : "33qiaoda.gif", title : "�ô�"},
		{src : "34qiudale.gif", title : "�ܴ���"},
		{src : "35zaijian.gif", title : "�ټ�"},
		{src : "36bianzhu.gif", title : "����"},
		{src : "37dongji.gif", title : "����"},
		{src : "38qidao.gif", title : "��"},
		{src : "39ohyes.gif", title : "ŶҲ"},
		{src : "51okey.gif", title : "ok"},
		{src : "52dabian.gif", title : "���"},
		{src : "53damuzhi.gif", title : "��Ĵָ"},
		{src : "54daohecai.gif", title : "���Ȳ�"},
		{src : "55ding.gif", title : "��"},
		{src : "56wen.gif", title : "��"},
		{src : "57meigui.gif", title : "õ��"},
		{src : "58paishou.gif", title : "����"},
		{src : "59shuai.gif", title : "˥"},
		{src : "60son.gif", title : "̫��"},
		{src : "61xin.gif", title : "��"},
		{src : "62xinsui.gif", title : "����"},
		{src : "63ye.gif", title : "Ү"},
		{src : "64moon.gif", title : "����"},
		{src : "65v5.gif", title : "v5"},
		{src : "66geili.gif", title : "����"},
		{src : "67jiong.gif", title : "\u56e7"},
		{src : "68zhai.gif", title : "լ"},
		{src : "69diujidan.gif", title : "������"},
		{src : "70shengdanshu.gif", title : "ʥ����"},
		{src : "71shoutao.gif", title : "����"},
		{src : "72tongqian.gif", title : "ͭǮ"},
		{src : "73wazi.gif", title : "����"},
		{src : "74xiandanchaoren.gif", title : "�̵�����"}
	];
	
	var require = new loader({
		'pop' : '/js/api/UI/pop.js'
	});
	require.load('pop');
	
	var faceTpl = '<a href="javascript:void(0)" title="{title}" style="background-image:url(/weibo/assets/images/face/{src})" ></a>';
	var faceCSS = ['<style type="text/css" data-module="face">',
		'.face_edit_cnt{overflow:hidden;border:1px solid #ddd;background:#fff;}',
		'.face_edit{width:279px;margin:-1px 0px 0px -1px;overflow:hidden;background:#fff;}',
		'.face_edit a{display:block;float:left;width:30px;height:30px;margin:0px;border:1px solid #eee;border-bottom: none;border-right: none;background-position:center center;background-repeat: no-repeat;',
			'transition:0.1s;',
			'-moz-transition-duration: 0.1s;',
			'-webkit-transition-duration: 0.1s;',
			'-o-transition-duration: 0.1s;}',
		'.face_edit a:hover{background-color: #ddd}',
		'.face_edit a:active{background-color: #bbb}',
	'</style>'].join('');
	$(function(){
		$('head').append(faceCSS);
	});
	
//	function getData (callback){
//		$.ajax({
//			'url' : '',
//			'type' : 'GET', 
//			'success' : function(d){
//				var data = eval('(' + d  + ')');
//				callback&&callback(data.list);
//			}
//		});
//	}
	function render(tpl,data){
		var txt = '';
		for(var i=0 in data){
			txt += tpl.replace(/{(\w*)}/g,function(){
				var key = arguments[1];
				return data[i][key] || '';
			});
		}
		return txt;
	}
	function renderFace(dom){
		var html = render(faceTpl,faceData);
		html = '<div class="face_edit">' + html + '</html>';
		dom.html(html);
	}
	function FACE(param){
		var param = param || {};
		var top = param['top'] || 200,
			 left = param['left'] || 200;
		
		var this_face = this;
		this.callback = param['callback'] || null;
		this.closeFn = param['closeFn'] || null;
		this.pop = UI.plane({
			'width' : 280,
			'top' : top,
			'left' : left,
			'html' : '<div class="face_edit_cnt"><div class="pro_loading"></div></div>',
			'closeFn' : function(){
				this_face.closeFn&&this_face.closeFn();
			}
		});
		this.dom = this.pop.dom;
//		if(faceData){
			renderFace(this_face.pop.dom.find('.face_edit_cnt'));
//		}else{
//			getData(function(data){
//				faceData = data;
//				renderFace(this_face.pop.dom.find('.face_edit_cnt'));
//			});
//		}
		
		this.pop.dom.on('click','.face_edit a',function(){
			this_face.close();
			this_face.callback&&this_face.callback($(this).attr('title'));
		});
	}
	FACE.prototype = {
		'close' : function(){
			this.pop.close();
			this.closeFn&&this.closeFn();
		}
	};
	exports.face = function(param){
		return new FACE(param);
	}
})(window.UI);