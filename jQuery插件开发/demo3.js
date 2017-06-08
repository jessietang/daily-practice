/**
 * Created by jessietang on 11/10/2016.
 */

//用自调用匿名函数包裹你的代码
//将系统变量以变量形式传递到插件内部
//好的做法是我们在代码开头加一个分号，这在任何时候都是一个好的习惯。
;(function($, window, document, undefined){
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt){
        this.$element = ele;
        this.defaults = {
            "color": "red",
            "fontSize": "12px",
            "textDecoration": "none"
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    //定义beautify的方法
    Beautifier.prototype = {
        beautify: function(){
            return this.$element.css({
                "color": this.options.color,
                "fontSize": this.options.fontSize,
                "textDecoration": this.options.textDecoration
            }).each(function(){
                $(this).append("------------"+$(this).attr("href"));
            });
        }
    };
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options){
        //创建Beautifier的实例
        var beautifier = new Beautifier(this, options);
        //调用方法
        return beautifier.beautify();
    };
})(jQuery, window, document);