/**
 * Created by jessietang on 12/8/2016.
 */
//这是主线程
onmessage = function(e){
    var worker = new Worker('w1.js');
    worker.postMessage("");

    worker.onmessage = function(e){
        var data = e.data;
        var worker = new Worker('w2.js');
        worker.postMessage(data);

        worker.onmessage = function(e){
            var data = e.data;
            postMessage(data);
        };


    };
};