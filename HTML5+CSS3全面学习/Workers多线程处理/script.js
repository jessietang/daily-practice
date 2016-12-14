/**
 * Created by jessietang on 12/8/2016.
 */
onmessage = function(e){
    var intStr = e.data;
    var intArray = intStr.split(';');
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