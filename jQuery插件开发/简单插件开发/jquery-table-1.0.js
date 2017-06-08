/**
 * Created by jessietang on 11/10/2016.
 */
;(function($, window, document, undefined){
    var TableFun = function(ele, opt){
        this.$element = ele;
        this.defaults = {
            "oddClass": "oddClass",
            "evenClass": "evenClass",
            "currentClass": "currentClass",
            "eventType1": "mouseover",
            "eventType2": "mouseout"
        };
        this.options = $.extend({},this.defaults,opt);
    };

    TableFun.prototype = {
        changeBgColor: function(){
            this.$element.find("tr:odd").addClass(this.options.oddClass);
            this.$element.find("tr:even").addClass(this.options.evenClass);
            var _thisObj = this;
            this.$element.find('tr').bind(_thisObj.options.eventType1, function(){
                $(this).addClass(_thisObj.options.currentClass);
            }).bind(_thisObj.options.eventType2, function(){
                $(this).removeClass(_thisObj.options.currentClass);
            });
            /*this.$element.find("tr").each(function(){
                var _this = $(this);
                _this.bind(_thisObj.options.eventType1, function(){
                    $(this).addClass(_thisObj.options.currentClass);
                    console.log('1');
                });
            });
            this.$element.find("tr").each(function(){
                var _this = $(this);
                _this.bind(_thisObj.options.eventType2, function(){
                    $(this).removeClass(_thisObj.options.currentClass);
                });
            });*/
            /*this.$element.find("tr").bind(_thisObj.options.eventType1, function(){ //
                $(this).addClass(_thisObj.options.currentClass);
                //最开始这样写：this.options.currentClass，一直报错，原因是这里的this应该单独保存
            });
            this.$element.find("tr").bind(_thisObj.options.eventType2, function(){
                $(this).removeClass(_thisObj.options.currentClass);
            });*/
        }
    };

    $.fn.table = function(options){
        var tableFun = new TableFun(this, options);
        tableFun.changeBgColor();
    };
})(jQuery, window, document);