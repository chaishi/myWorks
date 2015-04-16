/*function Dog(){
	this.name = "dog";
	this.age = 23;
}
*/
var Dog = (function(){
	function obj(pra,bools){
		var me = this;
		me.name = pra.name;
		me.age = pra.age;
		me.bools = bools;
	}
	obj.prototype.sayname = function(){
		console.log(this.name);
	};
	return obj;
})();
//图片对象
var Img = (function(){
	function obj(position,value){
		var me = this;
		if(position.x > 3)
			position.x = 3;
		if(position.y > 3)
			position.y = 3;
		me.sPosition = position; //图片开始的位置
		me.ePosition = {x:null,y:null};//图片移动的目标位置
		me.step = 0;
		me.arrived = false;//false表示需要移动，true表示不需要再移动
		me.value = value;
		me.img = new Image();
		me.img.src = "/2048_imgVersion/images/" + me.value + ".png";
	}
	//按坐标绘制图片,参数：ctx为canvas上下文; width:图片宽度，height:图片高度
	obj.prototype.drawByPos = function(ctx,width,height){
		var me = this;
		var x = me.sPosition.x * width + 15, 
			y = me.sPosition.y *height + 15;
		ctx.drawImage(me.img, x, y, width - 10 ,height - 10);
	};

	//改变图片位置
	obj.prototype.move = function(ctx,width,height,der){
		var me = this,
			x = me.sPosition.x * width + 15,
			y = me.sPosition.y * height + 15;	
		me.step += 20;
		switch(der){
		case 37:{//向左,x减小		
			x = x - me.step;
			if(x <= me.ePosition.x * width + 15){
				x = me.ePosition.x * width + 15;
				me.sPosition.x = 0;
				me.step = 0;
				me.arrived = true;
			}	
		}break;
		case 38:{//向上,y减小		
			y = y - me.step;
			if(y <= me.ePosition.y * height + 15){
				y = me.ePosition.y * height + 15;
				me.sPosition.y = 0;
				me.step = 0;
				me.arrived = true;
			}	
		}break;
		case 39:{//向右,x增加		
			x = x + me.step;
			if(x >= me.ePosition.x * width + 15){
				x = me.ePosition.x * width + 15;
				me.sPosition.x = me.ePosition.x;
				me.step = 0;
				me.arrived = true;
			}	
		}break;
		case 40:{//向下,y增加		
			y = y + me.step;
			if(y >= me.ePosition.y * height + 15){
				y = me.ePosition.y * height + 15;
				me.sPosition.y = me.ePosition.y;
				me.step = 0;
				me.arrived = true;
			}				
		}break;
		}
		ctx.drawImage(me.img,x, y , width - 10 ,height - 10);
	};
	return obj;
})();


//背景对象
var Background = (function(){
	function obj(){
	}
	obj.prototype.draw = function(ctx,cvs){
		ctx.fillStyle = "#BCAD9D";
		ctx.fillRect(0,0,gl.cvs.width,gl.cvs.height);
		this.addRect(ctx,cvs);
	};
	obj.prototype.addRect = function(ctx,cvs){
		gl.stdWidth = (cvs.width / 4 - 5 ) | 0;
		gl.stdHeight = gl.stdWidth;
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				ctx.fillStyle = "#CDBFB5";
				ctx.fillRect(i * gl.stdWidth + 15,j * gl.stdHeight + 15,gl.stdWidth-10,gl.stdHeight-10);
			}
		}		
	};
	return obj;
})();
