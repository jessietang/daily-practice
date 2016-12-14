/**
 * Created by jessietang on 12/8/2016.
 */
// 创建随机数的子线程
onmessage = function(e){
    var intArray = new Array(200);
    for(var i=0; i<200; i++){
        intArray[i] = parseInt(Math.random()*200,10);
    }
    postMessage(JSON.stringify(intArray));
    close();
};