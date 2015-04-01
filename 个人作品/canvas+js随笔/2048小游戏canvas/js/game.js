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
(function(){
	gl.cvs = document.getElementById('canvas');
	gl.ctx = gl.cvs.getContext('2d');
	setCanvasSize();
	initMap();
	//再玩儿一次
	document.getElementById("moreTime").onclick = function(){
		initMap();
	};

	document.onkeydown = function(event){
		var e = event || window.event;
		derection(e.keyCode);
	};
	
	function setCanvasSize(){
		if(window.innerWidth < window.innerHeight){
			gl.cvs.width = window.innerWidth * 0.8;
			gl.cvs.height = gl.cvs.width;
		}else{
			gl.cvs.height = window.innerHeight * 0.8;
			gl.cvs.width = gl.cvs.height;
		}
		if(gl.cvs.width < 200){
			gl.cvs.width = 200;
			gl.cvs.height = 200;
		}else if(gl.cvs.width > 500){
			gl.cvs.width = 500;
			gl.cvs.height = 500;
		}
	}
	
	function derection(der){
		if(!checkQueue()) //一次滑动完成之前不能继续滑动
			return;
		gameover();//判断游戏是否结束
		var flagMove = false;
		switch(der){
			case 37:flagMove = searchMapLeft(1);break;
			case 38:flagMove = searchMapUp(1);break;
			case 39:flagMove = searchMapRight(1);break;
			case 40:flagMove = searchMapDown(1);break;
			default:break;
		}
		if(flagMove)
			slide(der);
	}
	function slide(der){
		gl.ctx.clearRect(0,0,gl.cvs.width,gl.cvs.height);
		var back = new Background();
		back.draw(gl.ctx,gl.cvs);
		searchRect(der);		
		if(checkQueue()){
			reDrawMap();
			if(!gameWin()){
				getNewData(1);
			}
		}else{
			window.requestAnimationFrame(function(){slide(der);});
		}
	}

	function gameover(){
		var f1 = searchMapLeft(0),
			f2 = searchMapUp(0),
			f3 = searchMapRight(0),
			f4 = searchMapDown(0);
		if( f1 || f2 || f3 || f4){			
			return false;
		}else{
			document.onkeydown = null;
			document.removeEventListener("touchstart",touchstart,false);
			document.removeEventListener("touchmove",touchmove,false);
			document.removeEventListener("touchend",touchend,false);
			alert("游戏结束啦！");
			return true;
		}	
	}

	function gameWin(){
		if(gl.gameWin){
			alert("恭喜你，通过成功！！！");
			document.onkeydown = null;
			document.removeEventListener("touchstart",touchstart,false);
			document.removeEventListener("touchmove",touchmove,false);
			document.removeEventListener("touchend",touchend,false);
			return true;
		}				
		return false;
	}

	
	var startPos = {x:null,y:null}, endPos = {x: null,y: null};
	document.addEventListener("touchstart",touchstart,false);
	function touchstart(event){
		var touch = event.touches[0];
		startPos.x = touch.pageX;
		startPos.y = touch.pageY;	
		document.addEventListener("touchmove",touchmove,false);
		document.addEventListener("touchend",touchend,false);
	}	
	
	function touchmove(event){
		var touch = event.touches[0];
		endPos.x = touch.pageX;
		endPos.y = touch.pageY;
		computeDirection();
	}
	
	function touchend(){
		document.removeEventListener("touchmove",touchmove,false);
		document.addEventListener("touchend",touchend,false);
	}
	
	//计算滑动方向
	function computeDirection(){
		if(!checkQueue()) //一次滑动完成之前不能继续滑动
			return;
		gameover();//判断游戏是否结束
		
		var flagMove = false;
		var x0 = endPos.x - startPos.x,
			y0 = endPos.y - startPos.y;
		if(x0 > 0 && Math.abs(x0) > Math.abs(y0) 
		|| x0 > 0 && Math.abs(x0) > Math.abs(y0)){
			flagMove = searchMapRight(1);//alert("right");
			der = 39;
		}else if(y0 < 0 && Math.abs(x0) < Math.abs(y0) 
			  || y0 < 0 && Math.abs(x0) < Math.abs(y0)){
			flagMove = searchMapUp(1);//alert("top");
			der = 38;
		}else if(x0 < 0 && Math.abs(x0) > Math.abs(y0) 
			  || x0 < 0 && Math.abs(x0) > Math.abs(y0)){
			flagMove = searchMapLeft(1);//alert("left");
			der = 37;
		}else if(y0 > 0 && Math.abs(x0) < Math.abs(y0) 
				|| y0 > 0 && Math.abs(x0) < Math.abs(y0)){
			flagMove = searchMapDown(1);//alert("down");
			der = 40;
		}
		if(flagMove)
			slide(der);
	}
})();
