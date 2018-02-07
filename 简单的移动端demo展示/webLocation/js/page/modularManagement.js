/**
 * Created by jessietang on 2017/6/29.
 */
$(function(){
    var option = {
        title: {
            text: "接入平台总数: 27",
            x: 'center',
            y: '55%',
            offsetCenter:['50%', '55%'],
            textStyle: {
                color: '#000',
                fontSize: 10,
                fontWeight: 'lighter'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'left',
            data:['正常在线平台数','断线平台数','从链路短线数']
        },
        series: [
            {
                name:'接入平台链接情况',
                type:'pie',
                center:	['50%', '60%'],
                radius: ['45%', '65%'],
                data:[
                    {value:21, name:'正常在线平台数'},
                    {value:4, name:'断线平台数'},
                    {value:2, name:'从链路短线数'}
                ],
            }
        ]
    };


    var myChart = echarts.init(document.getElementById('modularPie'));
    myChart.setOption(option);
});