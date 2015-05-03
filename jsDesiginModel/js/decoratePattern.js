//汉堡包计价系统(Hambergur)

var Hambergur = {};

Hambergur.addMeterial = function(meterial){
	Hambergur[meterial].prototype = this;
	return new Hambergur[meterial];
}

Hambergur.cost = function(){
	return 3;
};


//蔬菜
Hambergur.vegetables = function(){
	var price = this.vegetables.prototype.cost();
	this.cost = function(){
		return price + 1;
	};
};

//牛肉
Hambergur.beef = function(){
	var price = this.beef.prototype.cost();
	this.cost = function(){
		return price + 2;
	};
};

//肉松
Hambergur.meatFloss = function(){
	var price = this.meatFloss.prototype.cost();
	this.cost = function(){
		return price + 1.5;
	};
};

//鸡蛋
Hambergur.egg = function(){
	var price = this.egg.prototype.cost();
	this.cost = function(){
		return price + 1;
	};
};


var Hambergur1 = Hambergur;
Hambergur1 = Hambergur1.addMeterial("vegetables");
Hambergur1 = Hambergur1.addMeterial("egg");
var price = Hambergur1.cost();
//console.log(price);

