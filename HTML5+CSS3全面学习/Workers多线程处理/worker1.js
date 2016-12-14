/**
 * Created by jessietang on 12/8/2016.
 */
onmessage = function(evt){
    var d = evt.data; //通过evt.data获得发送来的数据
    postMessage(d); //将获得到的数据发送回主线程
};