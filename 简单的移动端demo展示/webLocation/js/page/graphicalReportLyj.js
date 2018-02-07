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

    /*==六严禁图表数据==*/
    /*1.地区汇总，超速*/
    var option1 = {
        title: {
            text: "超速",
            x: 'center',
            y: '38%',
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
        series: [
            {
                name:'超速',
                type:'pie',
                center:	['50%', '40%'],
                radius: ['50%', '70%'],
                data: [
                    {
                        value: 2,
                        name: '怀化市'
                    },
                    {
                        value: 1,
                        name: '益阳市'
                    },
                    {
                        value: 3,
                        name: '常德市'
                    },
                    {
                        value: 5,
                        name: '岳阳市'
                    },
                    {
                        value: 7,
                        name: '邵阳市'
                    },
                    {
                        value: 2,
                        name: '衡阳市'
                    },
                    {
                        value: 4,
                        name: '湘潭市'
                    },
                    {
                        value: 2,
                        name: '株洲市'
                    },
                    {
                        value: 5,
                        name: '长沙市'
                    }
                ]
            }
        ]
    };

    /*2.企业汇总，超速*/
    var option2 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title: {
            text: "",
            x: 'center',
            y: '38%',
            offsetCenter:['50%', '55%'],
            textStyle: {
                color: '#000',
                fontSize: 10,
                fontWeight: 'lighter'
            }
        },
        series: [
            {
                name:'超速',
                type:'pie',
                center:	['50%', '40%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 2, name: '长沙富临长运集团有限公司'},
                    {value: 1, name: '湖南东方龙运业有限公司'},
                    {value: 2, name: '湖南省阳光运业有限公司'},
                    {value: 1, name: '湖南邵阳现代运业集团有限公司'},
                    {value: 2, name: '湖南省邵阳市川泸运业有限公司'},
                    {value: 1, name: '湖南火炬化工集团有限责任公司'},
                    {value: 2, name: '衡阳钢城集团有限公司'},
                    {value: 1, name: '衡阳公交客运总公司'},
                    {value: 2, name: '衡阳公交客运总公司'},
                    {value: 1, name: '湖南省常德开元运业集团有限公司'},
                ]
            }
        ]

    };

    /*3.地区汇总，凌晨2-5点*/
    var option3 = {
        title: {
            text: "凌晨2-5点违规运行",
            x: 'center',
            y: '38%',
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
        series: [
            {
                name:'凌晨2-5点违规运行',
                type:'pie',
                center:	['50%', '40%'],
                radius: ['50%', '70%'],
                data: [
                    {
                        value: 2,
                        name: '怀化市'
                    },
                    {
                        value: 1,
                        name: '益阳市'
                    },
                    {
                        value: 3,
                        name: '常德市'
                    },
                    {
                        value: 5,
                        name: '岳阳市'
                    },
                    {
                        value: 7,
                        name: '邵阳市'
                    },
                    {
                        value: 2,
                        name: '衡阳市'
                    },
                    {
                        value: 4,
                        name: '湘潭市'
                    },
                    {
                        value: 2,
                        name: '株洲市'
                    },
                    {
                        value: 5,
                        name: '长沙市'
                    }
                ]
            }
        ]
    };

    /*4.企业汇总，凌晨2-5点违规运行*/
    var option4 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title: {
            text: "",
            x: 'center',
            y: '38%',
            offsetCenter:['50%', '55%'],
            textStyle: {
                color: '#000',
                fontSize: 10,
                fontWeight: 'lighter'
            }
        },
        series: [
            {
                name:'凌晨2-5点违规运行',
                type:'pie',
                center:	['50%', '40%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 5, name: '长沙富临长运集团有限公司'},
                    {value: 1, name: '湖南东方龙运业有限公司'},
                    {value: 3, name: '湖南省阳光运业有限公司'},
                    {value: 2, name: '湖南邵阳现代运业集团有限公司'},
                    {value: 2, name: '湖南省邵阳市川泸运业有限公司'},
                    {value: 4, name: '湖南火炬化工集团有限责任公司'},
                    {value: 2, name: '衡阳钢城集团有限公司'},
                    {value: 1, name: '衡阳公交客运总公司'},
                    {value: 2, name: '衡阳公交客运总公司'},
                    {value: 3, name: '湖南省常德开元运业集团有限公司'},
                ]
            }
        ]

    };

    /*5.地区汇总，持续半小时无数据*/
    var option5 = {
        title: {
            text: "持续半小时无数据上传",
            x: 'center',
            y: '38%',
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
        series: [
            {
                name:'持续半小时无数据上传',
                type:'pie',
                center:	['50%', '40%'],
                radius: ['50%', '70%'],
                data: [
                    {
                        value: 1,
                        name: '怀化市'
                    },
                    {
                        value: 2,
                        name: '益阳市'
                    },
                    {
                        value: 3,
                        name: '常德市'
                    },
                    {
                        value: 5,
                        name: '岳阳市'
                    },
                    {
                        value: 4,
                        name: '邵阳市'
                    },
                    {
                        value: 6,
                        name: '衡阳市'
                    },
                    {
                        value: 7,
                        name: '湘潭市'
                    },
                    {
                        value: 10,
                        name: '株洲市'
                    },
                    {
                        value: 5,
                        name: '长沙市'
                    }
                ]
            }
        ]
    };

    /*6.企业汇总，持续半小时无数据*/
    var option6 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title: {
            text: "",
            x: 'center',
            y: '38%',
            offsetCenter:['50%', '55%'],
            textStyle: {
                color: '#000',
                fontSize: 10,
                fontWeight: 'lighter'
            }
        },
        series: [
            {
                name:'持续半小时无数据上传',
                type:'pie',
                center:	['50%', '40%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 4, name: '长沙富临长运集团有限公司'},
                    {value: 1, name: '湖南东方龙运业有限公司'},
                    {value: 3, name: '湖南省阳光运业有限公司'},
                    {value: 1, name: '湖南邵阳现代运业集团有限公司'},
                    {value: 2, name: '湖南省邵阳市川泸运业有限公司'},
                    {value: 4, name: '湖南火炬化工集团有限责任公司'},
                    {value: 2, name: '衡阳钢城集团有限公司'},
                    {value: 3, name: '衡阳公交客运总公司'},
                    {value: 2, name: '衡阳公交客运总公司'},
                    {value: 1, name: '湖南省常德开元运业集团有限公司'}
                ]
            }
        ]

    };

    var myChart = echarts.init(document.getElementById('pieShow'));
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
        } else if (selectKey1 == '2' && selectKey2 == '2'){ // option4
            myChart.clear();
            myChart.setOption(option4);
        } else if (selectKey1 == '1' && selectKey2 == '3'){ // option5
            myChart.clear();
            myChart.setOption(option5);
        } else { // selectKey1 == '2' && selectKey2 == '3'  // option6
            myChart.clear();
            myChart.setOption(option6);
        }
    });
});