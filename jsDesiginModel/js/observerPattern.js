var Observer = (function(){
	function obj() {
	    this.fns = [];
	}
	obj.prototype = {
		constructor:obj,
	    subscribe: function (fn) {
	        this.fns.push(fn);
	    },
	    unsubscribe: function (fn) {
	        for(var i = 0, len = this.fns.length; i < len; i += 1){
	        	if(this.fns[i] === fn){
	        		delete this.fns[i];
	        		break;
	        	}
	        }
	    },
	    update: function (data) {
	       for(var i = 0, len = this.fns.length; i < len; i += 1){
	       		if(typeof this.fns[i] === "function"){
	       			this.fns[i](data);
	       		}
	       }
	    }
	};
	return obj;
})();

//console.log(new Observer());


/*//测试
var o = new Observer;
var f1 = function (data) {
    console.log('Robbin: ' + data + ', 赶紧干活了！');
};

var f2 = function (data) {
    console.log('Randall: ' + data + ', 找他加点工资去！');
};

o.subscribe(f1);
o.subscribe(f2);

o.update("Tom回来了！")

//退订f1
o.unsubscribe(f1);
//再来验证
o.update("Tom回来了！");  */ 