test('创建Img 对象测试1 ',function(){
	var img = new Img({x:1,y:2},1);
	deepEqual(img.sPosition,{x:1,y:2},"检测.sPosition结果为{x:1,y:2}!");
	deepEqual(img.ePosition,{x:null,y:null},"检测.ePosition,结果为{x:null,y:null}");
	strictEqual(img.step,0,"检测.step结果为0!");
	ok(img.arrived == false,"检测arrived,结果为:false");
	strictEqual(img.value,1,"检测.value,结果为1");
	strictEqual(img.img.src,"http://192.168.1.115:8020/2048_imgVersion/images/1.png","图片路径检测");
});

test('创建Img 对象测试2 ',function(){
	var img = new Img({x:4,y:4},11);
	deepEqual(img.sPosition,{x:3,y:3},"检测.sPosition结果为{x:3,y:3}!");
	deepEqual(img.ePosition,{x:null,y:null},"检测.ePosition,结果为{x:null,y:null}");
	strictEqual(img.step,0,"检测.step结果为0!");
	ok(img.arrived == false,"检测arrived,结果为:false");
	strictEqual(img.value,11,"检测.value,结果为11");
	strictEqual(img.img.src,"http://192.168.1.115:8020/2048_imgVersion/images/11.png","图片路径检测");
});


