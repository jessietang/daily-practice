var Taskmgr = Taskmgr || {};

//实现javascript类模型的三部曲：
// 1.基类工厂
Taskmgr.Class = function() {
	// 定义了所有的对象实现，传入的第一个参数为父对象，最后一个参数为该类的实现
    var len = arguments.length;
    var P = arguments[0];
    var F = arguments[len-1];
// 定义子类的构造函数名称 initialize
// 新建对象时，首先会执行initialize方法，如果没有的话，则执行父对象的initialize方法，沿着这个链向上寻找，直到找到，当然顶级的对象，必须有定义initialize方法
// 意思就是，使用 Taskmgr.Class() 创建出来的类，在实例化时会【主动帮你执行下初始化函数 initialize】
    var C = typeof F.initialize == "function" ?
        F.initialize :
        function(){ P.prototype.initialize.apply(this, arguments); };

    if (len > 1) {
		// 实现子对象能够访问父对象的属性及方法
        var newArgs = [C, P].concat(
                Array.prototype.slice.call(arguments).slice(1, len-1), F);
        Taskmgr.inherit.apply(null, newArgs);
    } else {
		// 返回的对象的原型指向自定义的对象（最后一个参数）
        C.prototype = F;
    }
    return C;
};
// 2.属性继承
Taskmgr.inherit = function(C, P) {
   var F = function() {};
   F.prototype = P.prototype;
   C.prototype = new F;
   var i, l, o;
   for(i=2, l=arguments.length; i<l; i++) {
       o = arguments[i];
       if(typeof o === "function") {
           o = o.prototype;
       }
       Taskmgr.extend(C.prototype, o);
   }
};
// 3.属性扩展
Taskmgr.extend = function(destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        var sourceIsEvt = typeof window.Event == "function"
                          && source instanceof window.Event;

        if (!sourceIsEvt
           && source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};