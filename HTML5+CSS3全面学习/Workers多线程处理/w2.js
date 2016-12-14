/**
 * Created by jessietang on 12/8/2016.
 */
//筛选的子线程
onmessage = function(e){
    var intArray = JSON.parse(e.data);
    var resultStr = "";
    for(var i=0; i<intArray.length; i++){
        if(intArray[i] % 3 == 0){
            if(resultStr != ""){
                resultStr += ";";
            }
            resultStr += intArray[i];
        }
    }
    postMessage(resultStr);
};