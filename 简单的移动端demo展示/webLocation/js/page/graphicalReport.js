/**
 * Created by jessietang on 2017/6/29.
 */
$(function(){
    /*==顶部tab标签切换==*/
    $('.graphicalReport .tab .tab-list').each(function(index){
        var _this = $(this);
        var index = index;
        _this.click(function(){
            if(index == 0){
                window.location.href = './graphicalReport.html';
            }else if(index == 1){
                window.location.href = './graphicalReportLyj.html';
            }
        });
    });



    /*==统计分析图表数据==*/
    /*1. 地区汇总，地区*/
    var option1 = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '0',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 1]
        },
        yAxis: {
            type: 'category',
            data: ['怀化市','益阳市','张家界市','常德市','岳阳市','邵阳市','衡阳市','湘潭市','株洲市','长沙市','湖南省']
        },
        series: [
            {
                name: '数量',
                type: 'bar',
                data: [18, 23, 29, 10, 13, 63, 82, 23, 29, 10, 44]
            }

        ]
    };
    /*2. 接入平台汇总，地区*/
    var option2 = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '0',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 1]
        },
        yAxis: {
            type: 'category',
            data: ['怀化市','益阳市','张家界市','常德市','岳阳市','邵阳市','衡阳市','湘潭市','株洲市','长沙市','湖南省']
        },
        series: [
            {
                name: '数量',
                type: 'bar',
                data: [22, 13, 49, 10, 73, 13, 22, 13, 25, 11, 64]
            }

        ]
    };
    /*3. 地区汇总，企业*/
    var option3 = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '-50%',
            right: '4%',
            top: '0',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 1],
        },
        yAxis: {
            show: false,
            type: 'category',
            data: ['长沙富临长运集团有限公司','湖南东方龙运业有限公司','湖南省阳光运业有限公司','湖南邵阳现代运业集团有限公司','湖南省邵阳市川泸运业有限公司','湖南火炬化工集团有限责任公司','衡阳钢城集团有限公司','衡阳公交客运总公司','湖南省常德开元运业集团有限公司','湖南怀化长锋运业有限责任公司'],
        },
        series: [
            {
                name: '数量',
                type: 'bar',
                data: [22, 13, 59, 10, 53, 13, 12, 33, 25, 66]
            }

        ]
    };
    /*4.接入平台汇总，企业*/
    var option4 = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '-50%',
            right: '4%',
            top: '0',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 1],
        },
        yAxis: {
            show: false,
            type: 'category',
            data: ['长沙富临长运集团有限公司','湖南东方龙运业有限公司','湖南省阳光运业有限公司','湖南邵阳现代运业集团有限公司','湖南省邵阳市川泸运业有限公司','湖南火炬化工集团有限责任公司','衡阳钢城集团有限公司','衡阳公交客运总公司','湖南省常德开元运业集团有限公司','湖南怀化长锋运业有限责任公司'],
        },
        series: [
            {
                name: '数量',
                type: 'bar',
                data: [50, 23, 89, 19, 53, 10, 22, 33, 25, 51]
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('dataShow'));
    myChart.setOption(option1);



    /*==筛选列表展示隐藏==*/
    $('.filterIndicator .filter-list .showKey').on('click', function(e){
        var e = e || window.event;
        e.stopPropagation();
        var _this = $(this);
        _this.parent().toggleClass('open');
        _this.parent().find('.singleList').fadeToggle();
    });

    $('.singleList li').on('click', function(e){
        var e = e || window.event;
        e.stopPropagation();
        var _this = $(this);
        var selectKey = _this.text();
        var key = _this.attr('key');
        //alert(key);
        console.log(_this.closest('.showKey'));
        _this.parent().parent().find('.showKey').text(selectKey);
        _this.parent().parent().find('.showKey').attr("key", key);
        _this.parent().fadeToggle();
        var selectKey1 = $('.showKey1').attr('key'); // 第一个筛选选出的值
        var selectKey2 = $('.showKey2').attr('key'); // 第二个筛选选出的值
        if(selectKey1 == '1' && selectKey2 == '1'){ // option1
            myChart.clear();
            myChart.setOption(option1);
        } else if (selectKey1 == '2' && selectKey2 == '1'){ // option2
            myChart.clear();
            myChart.setOption(option2);
        } else if (selectKey1 == '1' && selectKey2 == '2'){ // option3
            myChart.clear();
            myChart.setOption(option3);
        }else{ // selectKey1 == '2' && selectKey2 == '2'
            myChart.clear();
            myChart.setOption(option4);
        }
    });

});