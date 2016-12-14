/**
 * Created by jessietang on 12/8/2016.
 */
onmessage = function(e){
    //var intArray = JSON.parse(e.data); //还原整数数组
    var intArray = e.data.split(';');
    var resultStr = "";
    for(var i=0; i<intArray.length; i++){
        if(intArray[i] % 3 == 0){
            if(resultStr != ""){
                resultStr += ";";
            }
            resultStr += intArray[i];
        }
    }
    postMessage(resultStr); // 将值返回给父线程
    close(); //关闭子线程
};