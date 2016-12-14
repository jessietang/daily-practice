/**
 * Created by jessietang on 12/8/2016.
 */
onmessage = function(e){
    var num = e.data;
    var result = 0;
    for(var i=0; i<=num; i++){
        result += i;
    }
    postMessage(result);
    // 通过e.data获得发送来的数据，然后将计算结果发送回主线程
};