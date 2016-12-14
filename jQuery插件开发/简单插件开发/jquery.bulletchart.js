/**
 * 子弹图插件，基于网上的一个控件改编而成
 * 网上原插件地址：https://github.com/NETTUTS/An-In-Depth-Review-of-the-jQuery-Widget-Factory
 * http://net.tutsplus.com/tutorials/javascript-ajax/an-in-depth-review-of-jquerys-widget-factory/
 * 日期：2013-6-5
 * @author 张书振
 */
(function($) {

    $.fn.bulletchart = function(options) {
        var settings = {
            // 宽度为相对于容器的百分比: 0 - 100
            size: 100,

            // 显示的图形有两种，一种是bar，只是以竖线显示，另一种是marker，以矩形条显示
            // title 是显示的名称，value是百分比值 0-100，css可以指定颜色值 green,blue,purple,red,orange,cyan
            //  [{ title: 'Sample Bar', value: 75, css: '' }],
            bars: [],

            //  [{ title: 'Sample Marker', value: 50, css: 'green' }],
            markers: [],

            // 刻度必须是百分比数值 ： 0 - 100
            ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        };
        settings = $.extend(settings, options || {});

        return this.each(function() {
            init($(this));
        });
        /**
         * 初始化插件函数
         * @param $target 将要应用插件的目标DOM节点，是个jQuery对象
         */
        function init($target) {
            $target.addClass("bullet-chart");
            // 设置图标的显示宽度，百分比
            $target.css("width", settings.size + "%");

            //添加legend
            var $legend = $("<div class='legend'></div>").appendTo($target);
            var legendIndex = 0;
            $.each(settings.bars, function() { // 此循环遍历添加bar类型 legend内容
                var $legendItem = $("<div class='legend-item'></div>")
                    .attr("data-index", legendIndex++) // 给每个legendItem添加索引，便于单击事件处理  
                    .appendTo($legend);
                var $legendSymbol = $("<span class='legend-symbol bar'></span>").appendTo($legendItem);
                $legendSymbol.addClass(this.css);
                var $legendLabel = $("<span class='legend-label'></span>").appendTo($legendItem);
                $legendLabel.text(this.title);
            });
            $.each(settings.markers, function() { // 此循环遍历添加marker类型 legend内容
                var $legendItem = $("<div class='legend-item'></div>")
                    .attr("data-index", legendIndex++)
                    .appendTo($legend);
                var $legendSymbol = $("<span class='legend-symbol marker'></span>").appendTo($legendItem);
                $legendSymbol.addClass(this.css);
                var $legendLabel = $("<span class='legend-label'></span>").appendTo($legendItem);
                $legendLabel.text(this.title);
            });

            //添加图表
            var $container = $("<div class='chart-container'></div>").appendTo($target);
            var $tickbar = $("<div class='tick-bar'></div>").appendTo($target);
            //刻度
            $.each(settings.ticks, function() {
                $("<span class='tick'></span>")
                    .css("left", this + "%")
                    .appendTo($tickbar);
                $("<span class='tick-label'><span>")
                    .css("left", this + "%")
                    .text(this)
                    .appendTo($tickbar);
            });
            //绘制bar 和 marker 图形
            $.each(settings.bars, function() {
                $("<div class='bar'></div>")
                    .addClass(this.css)
                    .animate({ width : this.value + "%" })
                    .appendTo($container);
            });
            $.each(settings.markers, function() {
                $("<div class='marker'></div>")
                    .addClass(this.css)
                    .css("left", this.value + "%")
                    .appendTo($container);
            });

            // 这里就是第三步的内容，为legend添加事件，鼠标单击事件，显示或隐藏相应的bar和marker图形
            $(".legend-item", $target).toggle(
                function(event) {
                    var $legendItem = $(this);
                    $legendItem.addClass("fade");
                    $(".chart-container>.bar, .chart-container>.marker", $target).eq($legendItem.attr("data-index"))
                        .fadeOut();
                },
                function(event) {
                    var $legendItem = $(this);
                    $legendItem.removeClass("fade");
                    $(".chart-container>.bar, .chart-container>.marker", $target).eq($legendItem.attr("data-index"))
                        .fadeIn();
                }
            );
        }
    };
})(jQuery);