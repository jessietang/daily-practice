/**
 * Created by jessietang on 12/8/2016.
 */
//此线程用来计算fibonacci数列
var fibonacci = function(n){
    return n<2 ? n : arguments.callee(n-1) + arguments.callee(n-2);
};
onmessage = function(e){
    var n = parseInt(e.data,10);
    postMessage(fibonacci(n));
};