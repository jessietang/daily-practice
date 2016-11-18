/**
 * Created by jessietang on 11/16/2016.
 */
var counter1 = require('./util/counter.js');
var counter2 = require('./util/counter.js');

console.log(counter1.count()); // 11
console.log(counter2.count()); // 12
console.log(counter2.count()); // 13

/*一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初
始化模块的导出对象。之后，缓存起来的导出对象被重复利用。*/

/*可以看到，counter.js并没有因为被require了两次而初始化两次。*/