//全局变量
var gl = {
	cvs:null,
	ctx:null,
	stdWidth:0,//方块儿宽度
	stdHeight:0,
	gameScore:0,//游戏总分
	gameWin:false,//是否通关
	map:[],//地图
	queue:[]//动画队列
};
var game = {
	startPos: {x:null,y:null},
	endPos:{x: null,y: null},
	init:function(){
		game.setCanvasSize();
		handle.initMap();
	},
	run:function(){
		game.init();
		game.addEvent();
	},
	addEvent:function(){
		document.getElementById("moreTime").onclick = function(){
			initMap();
		};
		document.onkeydown = function(event){
			var e = event || window.event;
			game.derection(e.keyCode);
		};
		
		document.addEventListener("touchstart",game.touchstart,false);
	},
	gameover:function(){
		var f1 = handle.searchMapLeft(0),
			f2 = handle.searchMapUp(0),
			f3 = handle.searchMapRight(0),
			f4 = handle.searchMapDown(0);
		if( f1 || f2 || f3 || f4){			
			return false;
		}else{
			document.onkeydown = null;
			document.removeEventListener("touchstart",game.touchstart,false);
			document.removeEventListener("touchmove",game.touchmove,false);
			document.removeEventListener("touchend",game.touchend,false);
			alert("游戏结束啦！");
			return true;
		}	
	},
	gameWin:function(){
		if(gl.gameWin){
			alert("恭喜你，通过成功！！！");
			document.onkeydown = null;
			document.removeEventListener("touchstart",game.touchstart,false);
			document.removeEventListener("touchmove",game.touchmove,false);
			document.removeEventListener("touchend",game.touchend,false);
			return true;
		}				
		return false;
	},
	setCanvasSize:function(){
		gl.cvs = document.getElementById('canvas');
		gl.ctx = gl.cvs.getContext('2d');
		if(window.innerWidth < window.innerHeight){
			gl.cvs.width = window.innerWidth * 0.8;
			gl.cvs.height = gl.cvs.width;
		}else{
			gl.cvs.height = window.innerHeight * 0.8;
			gl.cvs.width = gl.cvs.height;
		}
		if(gl.cvs.width < 250){
			gl.cvs.width = 250;
			gl.cvs.height = 250;
		}else if(gl.cvs.width > 400){
			gl.cvs.width = 400;
			gl.cvs.height = 400;
		}
	},
	derection:function(der){
		if(!handle.checkQueue()) //一次滑动完成之前不能继续滑动
			return;
		/*game.gameover();//判断游戏是否结束*/
		var flagMove = false;
		switch(der){
			case 37:flagMove = handle.searchMapLeft(1);break;
			case 38:flagMove = handle.searchMapUp(1);break;
			case 39:flagMove = handle.searchMapRight(1);break;
			case 40:flagMove = handle.searchMapDown(1);break;
			default:break;
		}
		if(flagMove)
			game.slide(der);
		else{
			game.gameover();//判断游戏是否结束
		}
	},
	slide:function(der){
		gl.ctx.clearRect(0,0,gl.cvs.width,gl.cvs.height);
		var back = new Background();
		back.draw(gl.ctx,gl.cvs);
		handle.searchRect(der);		
		if(handle.checkQueue()){			
			if(!game.gameWin()){
				handle.reDrawMap();
				handle.getNewData(1);
			}
		}else{
			window.requestAnimationFrame(function(){game.slide(der);});
		}
	},
	touchstart:function(event){
		var touch = event.touches[0];
		game.startPos.x = touch.pageX;
		game.startPos.y = touch.pageY;
		document.addEventListener("touchmove",game.touchmove,false);
		document.addEventListener("touchend",game.touchend,false);
	},
	touchmove:function(event){
		var touch = event.touches[0];
		game.endPos.x = touch.pageX;
		game.endPos.y = touch.pageY;
		game.computeDirection();
	},
	touchend:function(){
		document.removeEventListener("touchmove",game.touchmove,false);
		document.removeEventListener("touchend",game.touchend,false);
	},
	computeDirection:function(){
		if(!checkQueue()) //一次滑动完成之前不能继续滑动
			return;
		game.gameover();//判断游戏是否结束
		
		var flagMove = false;
		var x0 = game.endPos.x - game.startPos.x,
			y0 = game.endPos.y - game.startPos.y;
		if(x0 > 0 && Math.abs(x0) > Math.abs(y0) 
		|| x0 > 0 && Math.abs(x0) > Math.abs(y0)){
			flagMove = searchMapRight(1);//("right");
			der = 39;
		}else if(y0 < 0 && Math.abs(x0) < Math.abs(y0) 
			  || y0 < 0 && Math.abs(x0) < Math.abs(y0)){
			flagMove = searchMapUp(1);//("top");
			der = 38;
		}else if(x0 < 0 && Math.abs(x0) > Math.abs(y0) 
			  || x0 < 0 && Math.abs(x0) > Math.abs(y0)){
			flagMove = searchMapLeft(1);//("left");
			der = 37;
		}else if(y0 > 0 && Math.abs(x0) < Math.abs(y0) 
				|| y0 > 0 && Math.abs(x0) < Math.abs(y0)){
			flagMove = searchMapDown(1);//("down");
			der = 40;
		}
		if(flagMove)
			game.slide(der);
	},
};
game.run();

