
var mongo = require('../../lofox/DB.js');
var parse = require('../../lofox/parse.js');

//����һ������
module.exports = function(data,callback){
	var item = {
		'content' : parse.encodeHtml(data.content),
		'time' : new Date().getTime(),
		'cid' : data.cid
	};
	if(!item.cid){
		callback && callback('missing argument : cid');
		return;
	}
	//��¼�û�ֻ��id�������û���¼����
	if(data.uid){
		item.uid = data.uid;
	}else{
		item.user = data.user;
	}
	
	
	var method = mongo.start();
	method.open({'collection_name':'comments'},function(err,collection){
		collection.insert(item,function(err,result){
			if(err) {
				callback && callback(err);
			}else {
				callback && callback(null,item);
			}
			method.close();
		});
	});
};