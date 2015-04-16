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

test("改变图片位置move()测试:向左",function(){
	var img = new Img({x:2,y:2},2);
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	cvs.width = window.innerWidth * 0.8;
	cvs.height = cvs.width;
	var width = (cvs.width / 4 - 5 ) | 0;
	var height = width;
	var x = img.sPosition.x * width + 15;
	var y = img.sPosition.y * height + 15;
	img.ePosition.x = 1; img.ePosition.y = 1;
	deepEqual(img.move(ctx,width,height,37),{posX:x - 20,posY:y},"移动未超出限制范围,移动后的x减少20,y不变");
	strictEqual(img.step,20,"测试移动距离，改变20");
	delete cvs;
	
	var img = new Img({x:0,y:2},2);
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	cvs.width = window.innerWidth * 0.8;
	cvs.height = cvs.width;
	var width = (cvs.width / 4 - 5 ) | 0;
	var height = width;
	var x = img.sPosition.x * width + 15;
	var y = img.sPosition.y * height + 15;
	img.ePosition.x = 0; img.ePosition.y = 0;
	deepEqual(img.move(ctx,width,height,37),{posX: 15,posY:y},"移动超出限制范围,移动后的x不变,y不变");
	strictEqual(img.step,0,"超出边框，还原.step = 0");
	delete cvs;
	
});

test("改变图片位置move()测试:向上",function(){
	var img = new Img({x:1,y:2},2);
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	cvs.width = window.innerWidth * 0.8;
	cvs.height = cvs.width;
	var width = (cvs.width / 4 - 5 ) | 0;
	var height = width;
	var x = img.sPosition.x * width + 15;
	var y = img.sPosition.y * height + 15;
	deepEqual(img.move(ctx,width,height,38),{posX:x,posY:y - 20},"移动未超出限制范围,移动后的x不变,y减少20");
	strictEqual(img.step,20,"测试移动距离，改变20");
	delete cvs;
	
	var img = new Img({x:1,y:0},2);
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	cvs.width = window.innerWidth * 0.8;
	cvs.height = cvs.width;
	var width = (cvs.width / 4 - 5 ) | 0;
	var height = width;
	var x = img.sPosition.x * width + 15;
	var y = img.sPosition.y * height + 15;
	img.ePosition.x = 0; img.ePosition.y = 0;
	deepEqual(img.move(ctx,width,height,38),{posX: x, posY:15},"移动超出限制范围,移动后的x不变,y不变");
	strictEqual(img.step,0,"超出边框，还原.step = 0");
	delete cvs;
});

test("改变图片位置move()测试:向右",function(){
	var img = new Img({x:1,y:2},3);
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	cvs.width = window.innerWidth * 0.8;
	cvs.height = cvs.width;
	var width = (cvs.width / 4 - 5 ) | 0;
	var height = width;
	var x = img.sPosition.x * width + 15;
	var y = img.sPosition.y * height + 15;
	deepEqual(img.move(ctx,width,height,39),{posX: x + 20, posY: y },"移动未超出限制范围,移动后 x 增加20， y 不变");
	strictEqual(img.step,20,"测试移动距离，改变20"); 
	delete cvs;
	
	var img = new Img({x:3,y:0},3);
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	cvs.width = window.innerWidth * 0.8;
	cvs.height = cvs.width;
	var width = (cvs.width / 4 - 5 ) | 0;
	var height = width;
	var x = img.sPosition.x * width + 15;
	var y = img.sPosition.y * height + 15;
	img.ePosition.x = 3; img.ePosition.y = 3;
	deepEqual(img.move(ctx,width,height,39),{posX: img.ePosition.x * width + 15, posY:y},"移动超出限制范围,移动后的x不变,y不变");
	strictEqual(img.step,0,"超出边框，还原.step = 0");
	delete cvs;
});

test("改变图片位置move()测试:向下",function(){
	var img = new Img({x:1,y:2},2);
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	cvs.width = window.innerWidth * 0.8;
	cvs.height = cvs.width;
	var width = (cvs.width / 4 - 5 ) | 0;
	var height = width;
	var x = img.sPosition.x * width + 15;
	var y = img.sPosition.y * height + 15;
	deepEqual(img.move(ctx,width,height,40),{posX:x,posY:y + 20},"移动后的x不变,y增加20");
	strictEqual(img.step,20,"测试移动距离，改变20");
	delete cvs;
	
	var img = new Img({x:0,y:3},10);
	var cvs = document.createElement('canvas');
	var ctx = cvs.getContext('2d');
	cvs.width = window.innerWidth * 0.8;
	cvs.height = cvs.width;
	var width = (cvs.width / 4 - 5 ) | 0;
	var height = width;
	var x = img.sPosition.x * width + 15;
	var y = img.sPosition.y * height + 15;
	img.ePosition.x = 3; img.ePosition.y = 3;
	deepEqual(img.move(ctx,width,height,40),{posX: x, posY:img.ePosition.y * height + 15},"移动超出限制范围,移动后的x不变,y不变");
	strictEqual(img.step,0,"超出边框，还原.step = 0");
	delete cvs;
});

