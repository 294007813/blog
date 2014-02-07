/**
 *	@author bh-lay
 * 
 */
window.util = window.util || {};
/**
 * until.drag(handle_dom,dom,fn);
 */
(function uploaderClosure(exports){
	var staticID = 0;
	var upCnt_tpl = ['<div class="uploaderCnt"></div>'].join('');
	var up_tpl = ['<div class="uploaderItem uploader{ID}">',
		'<iframe id="uploader{ID}" name="uploader{ID}" width="0" height="0" marginwidth="0" frameborder="0" src="about:blank"></iframe>',
		'<form method="post" action="{action}" enctype="multipart/form-data" name="uploader" target="uploader{ID}">',
			'<input name="{fileinputname}" type="file" multiple="multiple" class="uploader_btn" title="��ѡ��ͼƬ"/>',
		'</form>',
	'</div>'].join('');
	
	var up_css = ['<style type="text/css" data-module="birthday">',
		'.uploaderCnt{width:0px;height:0px;position:absolute;left:0px;top:0px;z-index:1000000;}',
		'.uploaderItem{position:absolute;overflow:hidden;}',
		'.uploader_btn{position:absolute;width:200%;height:100%;top:0px;right:0px;',
			'opacity:0;filter:Alpha(opacity=0);cursor:pointer}',
	'</style>'].join('');
	//������������
	var global_cnt = $(upCnt_tpl);

	$('body').append(global_cnt);
	$('head').append(up_css);
	
	
	//iframe����
	function iframe_load(iframe,load){
		if (iframe.attachEvent){
			iframe.attachEvent("onload", function(){
				load&&load.call(iframe.contentDocument);
			});
		}else{
			iframe.onload = function(){
				load&&load.call(iframe.contentDocument);
			};
		}
	}
	//��ȡ�ļ���Ϣ
	function getFilesFromInput(input){
		var returns = [];
		if(input.value.length > 0){
			if(input.files){ 
				for(var i=0,total=input.files.length;i<total;i++){
					returns.push({
						'name' : input.files[i]['name'],
						'size' : input.files[i]['size']
					})
				}
			}else{
				returns.push({
					'name' : input.value.split(/\\/).pop()
				});
			}
		}
		return returns;
	}
	//��ʼ�������ϴ�ģ��
	function initSingleUp(uploaderDom,btn,ID,this_up){
				//	alert(uploaderDom.parent()[0].tagName);
		//�¼�����
		var inputDom = uploaderDom.find('.uploader_btn');
		var iframe = uploaderDom.find('iframe')[0];
		
		//��ͣ�¼�
		function overFn(){
			var cur_btn = $(this);
			var offset = cur_btn.offset();
			cur_btn.addClass('hover');
			uploaderDom.css({
				'top' : offset.top,
				'left' : offset.left,
				'width' : cur_btn.outerWidth(),
				'height' : cur_btn.outerHeight(),
				'display' : 'block'
			});
		}
		//Ϊ��ť����ͣ�¼�
		btn.mouseenter(overFn);
		
		uploaderDom.on('mouseleave',function(){
			uploaderDom.hide();
			btn.removeClass('hover')
			btn.removeClass('active');
		}).on('mousedown',function(){
			btn.removeClass('hover')
			btn.addClass('active');
		}).on('mousemove',function(e){
			var oW = uploaderDom.width();
			var oL = uploaderDom.offset().left;
			var mL = e.pageX;
			inputDom.css('right',oL+oW-mL-25);
		}).on('change','.uploader_btn',function(){
			var ipt = this;
			//����Ƿ���ѡ���ļ�
			var files = getFilesFromInput(ipt);
			if(files.length > 0){
				//�����ϴ�ǰ�¼�
				this_up.emit('beforeUpload',[ID,files]);
				if(this_up.can_upload){
					btn.unbind('mouseover',overFn);
					uploaderDom.hide();
					//��ʼ�ϴ��ļ�
					$(this).parents('form').submit();
					//�����ϴ��¼�
					this_up.emit('startUpload',[ID,files]);
				}else{
					ipt.outerHTML = ipt.outerHTML;
				}
			}
		});
		iframe_load(iframe,function(){
			var strData = this.body.innerHTML;
			var jsonData = {ret : 201};
			
			if(strData.length>5){
				jsonData = eval('(' + strData + ')');
			}
			if(jsonData && jsonData.ret == 200){
				var result = [];
				for(var i in jsonData.data){
					result.push({
						'url' : jsonData.data[i]['src'],
						'name' : jsonData.data[i]['name']
					});
				}
				//�����ϴ�����¼�
				this_up.emit('success',[
					ID,
					result
				]);
			}else{
				//�����ϴ�ʧ���¼�
				this_up.emit('success',[ID]);
			}
			//�Ƴ��ϴ�ģ��dom
			uploaderDom.remove();
		});
	}
	//�����µĵ����ϴ�ģ��
	function createSingleUp(){
		var ID = ++staticID;
		var this_up = this;
		var action = this.action;
		var btn = this.dom;
		var fileinputname = this.fileinputname;

		//�����µ�html
		var html = up_tpl.replace(/{(\w*)}/g,function(){
			var key = arguments[1];
			if(key == 'ID'){
				return ID
			}else if(key == 'action'){
				return action
			}else if(key == 'fileinputname'){
				return fileinputname
			}
		});
		var uploaderDom  = $(html);
		
	//	$('body').append(uploaderDom);
		global_cnt.append(uploaderDom);
		
		/**
		 * �����ʱ����Ϊ�˴���IE7�첽����iframe��BUG
		 * ������кõİ취����  mail:bh_lay@126.com
		 */
		setTimeout(function(){
			initSingleUp(uploaderDom,btn,ID,this_up);
		},100);
	}
	
	////

	function uploader(param){
		var this_up = this;
		//�¼���
		this.events = {};
		this.action = param['action'] || "/weibo/index.php?view=ajax&action=uploadAvatar&jsOptimization=1";
		//���ϴ�������DOM
		this.dom = param['dom'];
		this.fileinputname = param['fileinputname'] || 'photos';
		//�Ƿ���ϴ�
		this.can_upload = true;
		
		createSingleUp.call(this);
		this.on('startUpload',function(){
			createSingleUp.call(this_up);
		});
		
	}
	uploader.prototype = {
		'on' : function (eventName,callback){
			//�¼����޸��¼�������һ���¼���
			if(!this.events[eventName]){
				this.events[eventName] = [];
			}
			this.events[eventName].push(callback);
			return this;
		},
		'emit' : function (eventName,args){
			//�¼����޸��¼�����������
			if(!this.events[eventName]){
				return
			}
			args = args || null;
			for(var i=0,total=this.events[eventName].length;i<total;i++){
				this.events[eventName][i].apply(this.event_global || this , args);
			}
		}
	};
	exports.uploader = uploader;
})(window.util);