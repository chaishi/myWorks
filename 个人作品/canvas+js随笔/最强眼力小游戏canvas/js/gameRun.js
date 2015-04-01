/**
 * @stone
 * global object is for global variable
 * all the notes is English
 * the first word's first letter of variable and function name is lower, the others' first letter is upper
 */
window.onload = function(){
	var global = {
		lives:3,//生命数
		gate:1, //通过数
		index:0,
		speed:[5,6,9,10,12,15,18],//运动速度，随着关数增加而增加
		times:5,//运动次数，随着关数增加而增加
		period:10,//时间段
		imgObeject:[],//0 is for the cup, 1 is for its shadow2
		imgUrl:["images/ing/cup.png","images/ing/shadow1.png","images/ing/shadow2.png","images/ing/coin.png"],
		cvs:null,
		ctx:null,
		arr:null,//the sort of drawing the cups,double array
		openFlag:true,//judge the cup if is open:0 means the cups are closed, 1 means the cups are open
		cupRect:[ //the three cups position
		         {left:0,top:50,right:90,bottom:140,coins:false},
			     {left:110,top:50,right:200,bottom:140,coins:true},
		         {left:220,top:50,right:310,bottom:140,coins:false}
		],
		shadowPoint:[ //the three cups' shadows position
		             {left:0,top:125,right:90,bottom:215},
					 {left:110,top:125,right:200,bottom:215},
				     {left:220,top:125,right:310,bottom:215}
	    ],
	    coinPoint:{x:null,y:null}
	};
	init();
	function init(){
		//create Image object. 0 is for the cup, 1 is for its shadow2
		for(var i = 0; i < 4; i++){
			global.imgObeject[i] = new Image();
			global.imgObeject[i].src = global.imgUrl[i];
		}
		//the cups drawing sort. double array
		global.arr = [[0, 1, 2], [1, 0, 2], [1, 2, 0], [2, 1, 0],[0,2,1],[2,0,1]];
		//create canvas.
		global.cvs = document.getElementById('cvs1');
		global.ctx = global.cvs.getContext('2d');
		drawCups(-1,0);
		gameRun();
	}
	
	//addEvent click
	global.cvs.addEventListener("click", function (evt) { 
		if(!global.openFlag){
			var mousePos = getMousePos(global.cvs, evt); 
			var flag = false;
			for(var i = 0; i < 3; i++){
				if(pointInRect(mousePos,global.cupRect[i])){
					if(global.cupRect[i].coins){ //如果有金币
						global.coinPoint.x = global.cupRect[i].left + 25;
						global.coinPoint.y = global.cupRect[i].top + 65;
						flag = true;
						global.gate++;
						global.times += 2;
						if(global.times % 4 == 0 ){
							global.period--;
							if(global.period <= 1)
								global.period = 1;
						}
						if(global.times % 6 == 0){
							global.index++;
							if(global.index >= 6 )
								global.index = 6;
						}
						document.getElementById("gate").innerHTML = global.gate;
					}else{
						global.lives--;
						document.getElementById("life").innerHTML = global.lives;
						if(global.lives == 0){
							localStorage.setItem("gameScore",global.gate);
							location.href = "gameAfter.html";
						}
					}
					openCup(i,flag);
					global.openFlag = true;
				}
			}
		}
	}, false); 
	
	//Get Mouse Position 
	function getMousePos(canvas, evt) { 
	    var rect = canvas.getBoundingClientRect(); //get canvas rectangle area
	    return { 
	       x: evt.clientX - rect.left * (canvas.width / rect.width),
	       y: evt.clientY - rect.top * (canvas.height / rect.height)
	    };
	}
	
	//draw the coins,when the cups stop rotate or game start
	function drawCoins(){
		global.ctx.drawImage(global.imgObeject[3], global.coinPoint.x, global.coinPoint.y, 40 , 30 );
	}
	/**
	 *draw cups and its shadow according their rectangle or point
	 *flag1 < 0, draw cups and their shadow, flag >=0; open the cup
	 *flag2 means the sort of drawing cups
	 */
	function drawCups(flag1,flag2){
		if(flag1 < 0){
			for(var i = 0; i < 3; i++){
				var j = global.arr[flag2][i];
				global.ctx.drawImage(global.imgObeject[1], global.shadowPoint[j].left, global.shadowPoint[j].top, 90 , 90 );
				global.ctx.drawImage(global.imgObeject[0], global.cupRect[j].left, global.cupRect[j].top, 90 , 90 );
			}
		}else{
			for(var i = 0; i < 3; i++){
				if(i == flag1)
					global.ctx.drawImage(global.imgObeject[2], global.shadowPoint[i].left, global.shadowPoint[i].top, 90 , 90 );
				else
					global.ctx.drawImage(global.imgObeject[1], global.shadowPoint[i].left, global.shadowPoint[i].top, 90 , 90 );
				global.ctx.drawImage(global.imgObeject[0], global.cupRect[i].left, global.cupRect[i].top, 90 , 90 );
			}
		}
	}

	//that the cups move toward top means open the cup,then stay 1 second, finally toward down until to the suitable position
	function openCup(i,flag){
		var timer1 = setTimeout(function(){openCup(i,flag);},20);
		if(global.cupRect[i].top <= 10){
			clearTimeout(timer1);
			setTimeout(function(){towardDown(i,flag);},1000);
		}else{
			global.shadowPoint[i].top += 1;
			global.cupRect[i].top -= 1;
			global.ctx.clearRect(0,0,global.cvs.width,global.cvs.height);
			if(flag)
				drawCoins();
			drawCups(i);
		}
		function towardDown(i,flag){
			var timer2 = setTimeout(function(){towardDown(i,flag);},20);
			if(global.cupRect[i].top >= 50){
				clearTimeout(timer2);
				drawCups(-1,0);
			}else{
				global.shadowPoint[i].top -= 1;
				global.cupRect[i].top += 1;
				global.ctx.clearRect(0,0,global.cvs.width,global.cvs.height);
				if(flag)
					drawCoins();
				drawCups(i,0);
			}
		}
	}
	
	//the rectangle is vertical,and judge that if the point is in the rectangle 
	function pointInRect(point,rect){
		if(point.x >= rect.left && point.x <= rect.right &&
		   point.y >= rect.top && point.y <=rect.bottom
		)
			return true;
		return false;
	}
	
	//the cups' move style
	//旋转原点横坐标,旋转原点纵坐标,椭圆长轴,椭圆短轴,旋转起点角度,旋转终点角度,移动速度,移动图片,sort:叠放次序,swap:哪2个几个杯子交换
	//var argums1 = {Ox:55,Oy:50,a:55,b:30,start:-180,end:180,speed:1,sort:0,swap:0,};
	var argums1;
	var argums2;
	var start1, start2, flag,TIMER,num;
	function gameRun(){
		var start = document.getElementById("start");
		start.onclick = function(){
			if(global.openFlag){
				num = 0;
				for(var i = 0; i < 3; i++){
					if(global.cupRect[i].coins){ //如果有金币
						global.coinPoint.x = global.cupRect[i].left + 25;
						global.coinPoint.y = global.cupRect[i].top + 65;
						openCup(i,true);break;
					}
				}
				setTimeout(function(){run();},4000);
				global.openFlag = false;
			}
		};
	}
	
	//get the argums1 and argums2
	function run(){
		var random;
		if(Math.round(Math.random()*10) % 2){
			random = {start1:0,end1:-180,start2:-180,end2: -360};
			flag = 1;
		}else{
			random = {start1:-360,end1: -180,start2:-180,end2:0};
			flag = 0;
		}
		var th = Math.round(Math.random()*10) % 3;
		switch(th){
		case 0:{
			argums1 = {Ox:55,Oy:50,a:55,b:30,start:random.start1, end:random.end1,sort:0};
			argums2 = {Ox:55,Oy:50,a:55,b:30,start:random.start2, end:random.end2,sort:1};
			for(var k = 0; k < 3; k++){
				if(global.cupRect[k].left == 0)
					argums1.swap = k;
				if(global.cupRect[k].left == 110)
					argums2.swap = k;
			}
		}break;
		case 1:{
			argums1 = {Ox:165,Oy:50,a:55,b:30,start:random.start1, end:random.end1,sort:2};
			argums2 = {Ox:165,Oy:50,a:55,b:30,start:random.start2, end:random.end2,sort:3};
			for(var k = 0; k < 3; k++){
				if(global.cupRect[k].left == 110)
					argums1.swap = k;
				if(global.cupRect[k].left == 220)
					argums2.swap = k;
			}
		}break;
		case 2:{
			argums1 = {Ox:110,Oy:50,a:110,b:50,start:random.start1, end:random.end1,sort:0};
			argums2 = {Ox:110,Oy:50,a:110,b:50,start:random.start2, end:random.end2,sort:3};
			for(var k = 0; k < 3; k++){
				if(global.cupRect[k].left == 0)
					argums1.swap = k;
				if(global.cupRect[k].left == 220)
					argums2.swap = k;
			}
		}break;
		}
		start1 = argums1.start;start2 = argums2.start;
		animate(argums1,argums2);
	}
	function animate(args1,args2){
		 global.ctx.clearRect(0,0,global.cvs.width,global.cvs.height);
      	 if(args1.start < args1.end){
      		start1 += global.speed[global.index]; start2 += global.speed[global.index];
      	 }
      	 else{
      		start1 -= global.speed[global.index]; start2 -= global.speed[global.index];
      	 }
      	 var cup1 = args1.swap,cup2 = args2.swap;
      	 global.cupRect[cup1].left = args1.a*Math.cos(start1 * Math.PI / 180) + args1.Ox;
      	 global.cupRect[cup1].top  = args1.b*Math.sin(start1 * Math.PI / 180) + args1.Oy;
      	 global.cupRect[cup2].left = args2.a*Math.cos(start2 * Math.PI / 180) + args2.Ox;
       	 global.cupRect[cup2].top  = args2.b*Math.sin(start2 * Math.PI / 180) + args2.Oy;
      	 global.shadowPoint[cup1].left = global.cupRect[cup1].left;
      	 global.shadowPoint[cup1].top = global.cupRect[cup1].top + 75;
      	 global.shadowPoint[cup2].left = global.cupRect[cup2].left;
      	 global.shadowPoint[cup2].top = global.cupRect[cup2].top + 75;
      	 if(flag%2 != 0){
      		 drawCups(-1,args1.sort);
      	 }else{
      		 drawCups(-1,args2.sort);
      	 }
      	TIMER = setTimeout(function(){animate(args1,args2);},global.period);
      	if(args1.start < args1.end && start1 >= args1.end || args1.start > args1.end && start1 <= args1.end){
      		 clearTimeout(TIMER);
      		 num++;
      		 var f1 = global.cupRect[cup1].coins, f2 = global.cupRect[cup2].coins;
          	 if( f1 != f2){
          		global.cupRect[cup1].coins = f2;
          		global.cupRect[cup2].coins = f1;
          	 }
          	 if(num <= global.times){
          		 run();
          	 }
      	}
	}
};