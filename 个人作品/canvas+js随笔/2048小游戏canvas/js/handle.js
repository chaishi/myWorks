
//产生一个新方块儿，参数为方块儿的值
function getNewData(value){
	var xx = (Math.random() * 40 | 0 ) % 4;
	var yy = (Math.random() * 40 | 0 ) % 4;
	if(!gl.map[xx][yy].Img){
		gl.map[xx][yy].value = value;
		gl.map[xx][yy].Img = new Img({x:xx,y:yy},value);		
		gl.map[xx][yy].Img.drawByPos(gl.ctx,gl.stdWidth, gl.stdHeight);
	}else{
		getNewData(value);
	}
}

//画背景
function drawBack(){
	var back = new Background();
	back.draw(gl.ctx,gl.cvs);
}

//创建4 * 4地图
function initMap(){
	gl.map = [];
	gl.gameScore = 0;
	gl.gameover = false;
	document.getElementById("score").innerHTML = gl.gameScore;
	for(var i = 0; i < 4; i++){
		gl.map[i] = new Array();
		for(var j = 0; j < 4; j++){
			gl.map[i][j] = new Object();
			gl.map[i][j].value = 0;
			gl.map[i][j].flag = false;//标记是否合并过
		}
	}
	drawBack();
	getNewData(1);
	getNewData(1);
}


//查询已有方块儿
function searchRect(der){
	gl.queue.length = 0;
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(gl.map[i][j].Img){
				gl.map[i][j].Img.move(gl.ctx,gl.stdWidth, gl.stdHeight,der);
				gl.queue.push(gl.map[i][j].Img);
			}
		}
	}
}

//检查队列里的方块儿是否都移动完成
function checkQueue(){
	for(var i = 0, len = gl.queue.length; i < len; i++){
		if(!gl.queue[i].arrived){
			return false; //队列里还有未完成的方块儿
		}
	}
	return true;
}

//移动完成后，重绘地图
function reDrawMap(){
	for(var m = 0; m < 4; m++){
		for(var p = 0; p < 4; p++){	
			gl.map[m][p].flag = false;		
			if(gl.map[m][p].value > 0){			
				gl.map[m][p].Img = new Img({x:m,y:p},gl.map[m][p].value);
				gl.map[m][p].Img.img.position = {x:m,y:p};
				gl.map[m][p].Img.img.onload = function(){
					var x = this.position.x,y = this.position.y;
					gl.map[x][y].Img.drawByPos(gl.ctx,gl.stdWidth, gl.stdHeight);
				};		
			}else{
				if(gl.map[m][p].Img){
					delete gl.map[m][p].Img;
				}
			} 
		}
	}
	document.getElementById("score").innerHTML = gl.gameScore;
}


//设置方块儿终点坐标
function setOldPos(i,j,ki,kj){
	gl.map[i][j].value = 0;
	gl.map[i][j].Img.ePosition.x = ki;
	gl.map[i][j].Img.ePosition.y = kj;	
}

//向上运动时，遍历地图，寻找方块儿的终点目标(img.ePosition)，以便移动,参数:test用于标记是否需要移动
function searchMapUp(test){
	var flagMove = false;
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(gl.map[i][j].value > 0 ){//方块儿有值时				
				var t = gl.map[i][j].value;
				if(j == 0){
					setOldPos(i,j,i,j);
					gl.map[i][j].value = t;
				}
				for(var k = j - 1; k >= 0; k--){				
					if(gl.map[i][k].value > 0){//当上一个方块儿有值时
						//当方块儿的值与上一个方块儿的值相等时,合并
						if(gl.map[i][k].value == t && !gl.map[i][k].flag){
							if(test == 1){ //若只是检测能否移动，不改变终点目标
								setOldPos(i,j,i,k);
								gl.gameScore += Math.pow(2,gl.map[i][k].value);
								gl.map[i][k].value++;	
								gl.map[i][k].flag = true;		
								if(gl.map[i][k].value == 11)//出现2048游戏通关
									gl.gameWin = true;		
							}
							flagMove = true;						
						}else{//上方有方块儿，但2个方块儿的值不相同
							if(test == 1){
								setOldPos(i,j,i,k+1);
								gl.map[i][k+1].value = t;
							}								
							if(j != k + 1)
								flagMove = true;
						}
						break;
					}
					if(k == 0){
						if(test == 1){
							setOldPos(i,j,i,k);
							gl.map[i][k].value = t;
						}
						flagMove = true;
					}					
				}
			}
		}
	}
	return flagMove;
}

//向下运动时
function searchMapDown(test){
	var flagMove = false;
	for(var i = 0; i < 4; i++){
		for(var j = 3; j >= 0; j--){
			if(gl.map[i][j].value > 0){				
				var t = gl.map[i][j].value;
				if(j == 3){
					setOldPos(i,j,i,j);gl.map[i][j].value = t;
				}
				for(var k = j + 1; k < 4; k++){					
					if(gl.map[i][k].value > 0){
						if(gl.map[i][k].value == t && !gl.map[i][k].flag){
							if(test == 1){
								setOldPos(i,j,i,k);
								gl.gameScore += Math.pow(2,gl.map[i][k].value);
								gl.map[i][k].value++;	
								gl.map[i][k].flag = true;	
								if(gl.map[i][k].value == 11)//出现2048游戏通关
									gl.gameWin = true;	
							}	
							flagMove = true;								
						}else{
							if(test == 1){
								setOldPos(i,j,i,k-1);
								gl.map[i][k-1].value = t;	
							}
							if(j != k - 1)
								flagMove = true;	
						}
						break;
					}
					if(k == 3){
						if(test == 1){
							setOldPos(i,j,i,k);
							gl.map[i][k].value = t;
						}
						flagMove = true;
					}					
				}
			}
		}
	}
	return flagMove;
}

//向左运动时
function searchMapLeft(test){
	var flagMove = false;
	for(var j = 0; j < 4; j++){
		for(var i = 0; i < 4; i++){
			if(gl.map[i][j].value > 0){				
				var t = gl.map[i][j].value;
				if(i == 0){
					setOldPos(i,j,i,j);
					gl.map[i][j].value = t;
				}
				for(var k = i - 1; k >= 0; k--){					
					if(gl.map[k][j].value > 0){
						if(gl.map[k][j].value == t && !gl.map[k][j].flag){
							if(test == 1){
								setOldPos(i,j,k,j);
								gl.gameScore += Math.pow(2,gl.map[k][j].value);
								gl.map[k][j].value++;	
								gl.map[k][j].flag = true;
								if(gl.map[k][j].value == 11)//出现2048游戏通关
									gl.gameWin = true;
							}
							flagMove = true;
						}else{
							if(test == 1){
								setOldPos(i,j,k+1,j);
								gl.map[k+1][j].value = t;	
							}
							if(i != k + 1)
								flagMove = true;
						}
						break;
					}
					if(k == 0){
						if(test == 1){
							setOldPos(i,j,k,j);
							gl.map[k][j].value = t;
						}
						flagMove = true;
					}					
				}
			}
		}
	}
	return flagMove;
}

//向右运动时
function searchMapRight(test){
	var flagMove = false;
	for(var j = 0; j < 4; j++){
		for(var i = 3; i >= 0; i--){
			if(gl.map[i][j].value > 0){	
				var t = gl.map[i][j].value;		
				if(i == 3){
					setOldPos(i,j,i,j);
					gl.map[i][j].value = t;
				}
				for(var k = i + 1; k < 4; k++){					
					if(gl.map[k][j].value > 0){
						if(gl.map[k][j].value == t && !gl.map[k][j].flag){
							if(test == 1){
								setOldPos(i,j,k,j);
								gl.gameScore += Math.pow(2,gl.map[k][j].value);
								gl.map[k][j].value++;
								gl.map[k][j].flag = true;			
								if(gl.map[k][j].value == 11)//出现2048游戏通关
									gl.gameWin = true;
							}	
							flagMove = true;									
						}else{
							if(test == 1){
								setOldPos(i,j,k-1,j);
								gl.map[k-1][j].value = t;	
							}
							if(i != k - 1)
								flagMove = true;	
						}
						break;
					}
					if(k == 3){
						if(test == 1){
							setOldPos(i,j,k,j);
							gl.map[k][j].value = t;
						}
						flagMove = true;
					}					
				}
			}
		}
	}
	return flagMove;
}