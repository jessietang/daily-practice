/**
 * Created by jessietang on 11/11/2016.
 */
;(function($, window, document, undefined){
    var TabFun = function(ele, opt){
        this.$element = ele;
        this.defaults = {
            "tabNav": ".tabNav > li",
            "tabContent": ".tabContent > div",
            "currentClass": "current",
            "currentContentClass": "currentContent",
            "eventType": "click"
        };
        this.options = $.extend({}, this.defaults, opt);
    };

    TabFun.prototype = {
        tabSwitch: function(){
            var _thisObj = this;
            console.log(this.$element.find(_thisObj.options.tabNav));
            this.$element.find(_thisObj.options.tabNav).each(function(){ // 用this.$element， 而不是this
                var _this = $(this);
                _this.bind(_thisObj.options.eventType, function(){
                    _this.addClass(_thisObj.options.currentClass).siblings().removeClass(_thisObj.options.currentClass);
                    var index = _this.index();
                    _thisObj.$element.find(_thisObj.options.tabContent).eq(index).addClass(_thisObj.options.currentContentClass).
                        siblings().removeClass(_thisObj.options.currentContentClass);
                    //下面这种写法是错误的，仔细品味~~  _thisObj.options.tabContent这个只是一个dom对象，不是$对象
                    //_thisObj.options.tabContent.eq(index).addClass(_thisObj.options.currentContentClass).siblings().removeClass(_thisObj.options.currentContentClass);
                });
            });
        }
    };

    $.fn.tab = function(options){
        var tabFun = new TabFun(this, options);
        tabFun.tabSwitch();
    };
})(jQuery, window, document);