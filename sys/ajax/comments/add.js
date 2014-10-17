
var mongo = require('../../lofox/DB.js');
var parse = require('../../lofox/parse.js');

function getUserInfo(id,callback){
	var method = mongo.start();
	method.open({'collection_name':'user'},function(err,collection){
		if(err){
			callback && callback(err);
			return;
		}
		collection.find({'id' : id}).toArray(function(err, docs) {
			method.close();
			if(err || docs.length == 0){
				callback && callback(err);
				return;
			}
			delete docs[0]['password'];
			callback && callback(null,docs[0]);
		});
	});
}
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
				if(data.uid){
					//��ȡ�û���Ϣ
					getUserInfo(data.uid,function(err,userInfo){
						if(!err){
							item.user = userInfo;
						}
						callback && callback(null,item);
					});
				}else{
					callback && callback(null,item);
				}
			
			}
			method.close();
		});
	});
};