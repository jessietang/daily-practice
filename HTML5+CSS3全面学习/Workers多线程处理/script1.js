/**
 * Created by jessietang on 12/8/2016.
 */
onmessage = function(e){
    var intArray = new Array(200);
    var intStr = "";
    for(var i=0; i<200; i++){
        intArray[i] = parseInt(Math.random()*200,10);
        if(i != 0){
            intStr += ";";
        }
        intStr += intArray[i];
    }
    var worker;
    worker = new Worker('script2.js');
    //worker.postMessage(JSON.stringify(intArray)); //把随机数组提交给子线程进行筛选工作
    worker.postMessage(intStr);

    worker.onmessage = function(e){ //从子线程接收数据
        postMessage(e.data); // 把数据返回给子页面
    };
};