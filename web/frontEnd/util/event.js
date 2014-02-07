/**
 * @author bh-lay
 * util.events;
 *
 * var evevts = new util.events();
 * events.on('ready',function(){
 * 	//do something
 * });
 * events.emit('ready',args[0],args[1],args[2]);
 * 
 * or
 * //For your own object extend event
 * util.events.extend(this);
 * 
 */

window.util = window.util || {};

(function(exports){
	function ON(eventName,callback){
		//�¼����޸��¼�������һ���¼���
		if(!this.events[eventName]){
			this.events[eventName] = [];
		}
		this.events[eventName].push(callback);
	}
	function EMIT(eventName,args){
		//�¼����޸��¼�����������
		if(!this.events[eventName]){
			return
		}
		for(var i=0,total=this.events[eventName].length;i<total;i++){
			this.events[eventName][i].call(this.event_global || this,args);
		}
	}
	//�̳�
	function EXTEND(){
		this.events = {};
		this.on = ON;
		this.emit = EMIT;
	}
	function EVENTS(global){
		this.events = {};
		this.event_global = global || null;
		//console.log(this);
	}
	EVENTS.prototype = {
		'on' : ON,
		'emit' : EMIT
	};
	
	exports.events = EVENTS;
	exports.events.extend = EXTEND;
})(window.util);