/**
 * Created by rain on 2015/10/3.
 */


(function($){  //’‚—˘”√£∫ console.log($('form').serializeJson());
    $.fn.serializeJson=function(){
        var serializeObj={};
        var array=this.serializeArray();//[obje]
        var str=this.serialize();
        $(array).each(function(){
            if(serializeObj[this.name]){
                if($.isArray(serializeObj[this.name])){
                    serializeObj[this.name].push(this.value);
                }else{
                    serializeObj[this.name]=[serializeObj[this.name],this.value];
                }
            }else{
                serializeObj[this.name]=this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);
