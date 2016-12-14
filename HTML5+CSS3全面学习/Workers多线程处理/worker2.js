/**
 * Created by jessietang on 12/8/2016.
 */
onmessage = function(e){
    postMessage("worker says: "+e.data); // 通过e.data获得发送来的数据，然后将获取到的数据发送回主线程
};