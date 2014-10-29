
var mongo = require('../../lofox/DB.js');


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

/**
 * ������������
 *  �����û���Ϣ
 *
 **/
function handleData(docs,callback){
	var users = {};
	var uidsLength = 0;
	var overLength = 0;
	//��ȡ������Ҫ���û�id
	docs.forEach(function(item){
		if(item.uid){
			users[item.uid] = {};
		}
	});
	/**
	 * �����û���Ϣ�ֶ�
	 */
	function endFn(){
		docs.forEach(function(item){
			if(users[item.uid]){
				item.user = users[item.uid];
			}else if(item.user != null && typeof(item.user) == "object"){
				delete item.user.email;
			}else{
				item.user = {};
			}
		});
		callback&&callback(docs);
	}
	
	if(uidsLength == 0){
		endFn();
	}else{
		//����������Ҫ���û�id
		for(var id in users){
			uidsLength++;
			//��ȡ�����û���Ϣ
			getUserInfo(id,function(err,userInfo){
				overLength++;
				if(!err){
					users[id] = userInfo;
				}
				if(overLength == uidsLength){
					endFn();
				}
			});
		}
	}
}

//��ȡ�����б�
module.exports = function(data,callback){
	var data = data,
		cid = data['cid'] || '',
		limit_num = parseInt(data['limit']) || 10,
		skip_num = parseInt(data['skip']) || 0;
	
	var method = mongo.start();
	method.open({'collection_name':'comments'},function(err,collection){
		if(err){
			method.close();
			callback&&callback(err);
			return
		}
		
		var queryObj = {};
		if(data['cid'] && data['cid'].length > 1){
			queryObj.cid = data['cid'];
		}
		
		collection.find(queryObj,{limit:limit_num}).sort({time:-1}).skip(skip_num).toArray(function(err, docs) {
			if(err){
				callback&&callback(err);
				return;
			}
			//count the all list
			collection.count(queryObj,function(err,count){
				method.close();
				if(err){
					callback&&callback(err);
				}else{
					handleData(docs,function(list){
						callback&&callback(err,{
							'count': count,
							'list': list
						});
					});
				}
			});
		});
	});
};