$(document).ready(function() {
    $('.TF_LeftTopChartBtn').click(function() {
        openCloseEchart1('.TF_LeftTopChart');

    })
    $('.TF_LeftBottomChartBtn').click(function() {
        openCloseEchart1('.TF_LeftBottomChart');
    })
    $('.TF_RightChartBtn').click(function() {
        openCloseEchart1('.TF_RightTopChart');
        openCloseEchart1('.TF_RightTable');
        openCloseEchart1('.TF_RightBox');
    })

})

function openCloseEchart1(echartName) {
    if ($(echartName).css('display') == 'none') {
        $(echartName).css('display', 'block');
    } else
        $(echartName).css('display', 'none');
}

function processFailed(e) {
    widgets.alert.showAlert(e.error.errorMsg, false);
}

var pre_map, loadVectNet, loadVect_now, loadVect_pre, searchResultLayer = new SuperMap.Layer.Vector("VectorBySelected"),
    lotx,
    loty, stylebySelect = {
        strokeColor: "red",
        strokeWidth: 10,
        fillColor: "#red",
        fillOpacity: "1"
    },
    url_China_WGS1984 = "http://localhost:8090/iserver/services/map-china400/rest/maps/China_4326",
    map_China_WGS1984 = new SuperMap.Layer.TiledDynamicRESTLayer("China", url_China_WGS1984, {
        transparent: true,
        cacheEnabled: true
    }),
    url_roadnet = "http://localhost:8090/iserver/services/map-WGS1984_MCT/rest/maps/roads_2018010501@MapManager";
var obj_timeLine = [],
    obj_ture_data = [],
    obj_analysis_data = [],
    obj_time = [];

var dataPath = 'data/281998.csv';
var currentTimeNode = '2018-10-5 1:00:00';
var table_Unit = 'hours';
var drawTabel1Obj = [];
var roadId = 281998;
Init_previewMap();

function Init_previewMap() {
    pre_map = new SuperMap.Map("previewMap", {
        controls: [

            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.OverviewMap(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })
        ],
        allOverlays: true
    });
    map_China_WGS1984.events.on({ "layerInitialized": pre_map_addLayer1 });
}
var loadnetColorClassUrl;
var tiandituLayer;
var tianMarkerLayer;
var loadNetWGS2000layer;
var loadNetWGS2000Url = "http://localhost:8090/iserver/services/map-WGS1984_MCT/rest/maps/roads_2018010501@MapManager";

function pre_map_addLayer1() {
    loadnetColorClassUrl = "http://localhost:8090/iserver/services/map-WGS1984_MCT/rest/maps/roads_2018010501_colorClass@RasterMapWGS19841";
    loadNetWGS2000layer = new SuperMap.Layer.TiledDynamicRESTLayer("colorRoadNet", loadNetWGS2000Url, {
        transparent: true,
        cacheEnabled: true
    });

    loadVectNet = new SuperMap.Layer.TiledDynamicRESTLayer("roadNet", loadNetWGS2000Url, {
        transparent: true,
        cacheEnabled: true
    });
    tiandituLayer = new SuperMap.Layer.WMTS({
        name: "vec",
        url: "https://t0.tianditu.gov.cn/vec_c/wmts?tk=1d109683f4d84198e37a38c442d68311",
        layer: "vec",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        opacity: 1,
        requestEncoding: "KVP"
    });
    tianMarkerLayer = new SuperMap.Layer.WMTS({
        name: "vec",
        url: "https://t0.tianditu.gov.cn/eia_c/wmts?tk=1d109683f4d84198e37a38c442d68311",
        layer: "eia",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        opacity: 1,
        requestEncoding: "KVP"
    });

    loadVectNet.events.on({
        "layerInitialized": pre_map_addLayer2
    });
}

function pre_map_addLayer2() {
    pre_map.addLayers([map_China_WGS1984, loadVectNet, tiandituLayer, tianMarkerLayer, loadNetWGS2000layer, searchResultLayer]);
    pre_map.setCenter(new SuperMap.LonLat(104.1, 30.7), 11);
}

function addEchartsByUnit(temp_tableName, tempObj, timeUnit) {
    var timeLine_data = [];
    var true_data = [];
    var pre_data = [];
    var dif_ture_pre_data = [];
    var ARIMA_data = [];
    var RNN_data = [];
    var CNN_data = [];
    var LSTM_data = [];
    if (timeUnit == "hours") {
        timeLine_data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        for (i = 0; i < 24; i++) {
            true_data.push(tempObj[i].trueDate);
            pre_data.push(tempObj[i].analysisData);
            ARIMA_data.push(tempObj[i].ARIMA_data);
            RNN_data.push(tempObj[i].RNN_data);
            CNN_data.push(tempObj[i].CNN_data);
            LSTM_data.push(tempObj[i].LSTM_dataa);
            dif_ture_pre_data.push((tempObj[i].trueDate - tempObj[i].analysisData).toFixed(2));
        }
    } else if (timeUnit == "day") {
        for (i = 0; i < 14; i++) {
            timeLine_data.push(tempObj[i].Time.slice((tempObj[i].Time.indexOf('-') + 1), (tempObj[i].Time.indexOf(" "))));
            true_data.push(tempObj[i].trueDate);
            pre_data.push(tempObj[i].analysisData);
            dif_ture_pre_data.push((tempObj[i].trueDate - tempObj[i].analysisData).toFixed(2));
        }
    }

    twoLineChart = echarts.init(document.getElementById(temp_tableName));
    diff_Chart = echarts.init(document.getElementById("echartbox1"));
    var colors = ['#ffaaff', '#ff0113', '#88ff66', "#b109cb", "#000"];
    var option1 = {
        title: {
            text: currentTimeNode.slice(0, currentTimeNode.indexOf(" ")) + "   MF-BiLSTM Prediction(km/h)",
            top: 20
        },
        color: colors,

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['Error', "Truth", "MF-BiLSTM"]
        },
        grid: {
            top: 50,
            bottom: 25
        },
        xAxis: {
            name: 'Hour',
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[4]
                }
            },
            axisPointer: {
                label: {
                    formatter: function(params) {
                        return '   Hour  ' + params.value + "：00";
                    }
                }
            },
            data: timeLine_data

        },
        yAxis: {

            type: 'value'
        },
        series: [{
                name: 'Error',
                type: 'line',
                smooth: true,
                data: dif_ture_pre_data
            },
            {
                name: 'Truth',
                type: 'line',
                smooth: true,
                data: true_data
            },
            {
                name: 'MF-BiLSTM',
                type: 'line',
                smooth: true,
                data: pre_data
            }
        ]
    };

    var option2 = {
        color: colors,
        title: {
            text: currentTimeNode.slice(0, currentTimeNode.indexOf(" ")) + "   Comparison of Baseline Models(km/h)",
            top: 20
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['Truth', 'MF-BiLSTM', "ARIMA", "RNN", "LSTM", "CNN"]
        },
        grid: {
            top: 50,
            bottom: 25
        },
        xAxis: {
            type: 'category',
            name: 'Hour',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[4]
                }
            },
            axisPointer: {
                label: {
                    formatter: function(params) {
                        return 'MFBiLSTM:' + params.value +
                            (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: timeLine_data
        },
        yAxis: [{
            type: 'value',

            min: "20"
        }],
        series: [{
                name: 'Truth',
                type: 'line',
                xAxisIndex: 0,
                smooth: true,
                data: true_data
            },
            {
                name: 'MF-BiLSTM',
                type: 'line',
                smooth: true,
                data: pre_data
            },
            {
                name: 'ARIMA',
                type: 'line',
                smooth: true,
                data: ARIMA_data
            },
            {
                name: 'RNN',
                type: 'line',
                smooth: true,
                data: RNN_data
            },
            {
                name: 'LSTM',
                type: 'line',
                smooth: true,
                data: LSTM_data
            },
            {
                name: 'CNN',
                type: 'line',
                smooth: true,
                data: CNN_data
            }


        ]
    };


    twoLineChart.clear();
    diff_Chart.clear();

    twoLineChart.setOption(option2);
    diff_Chart.setOption(option1);

}


getAllTimeNodeObj_csv(281998);

function getAllTimeNodeObj_csv(road_id) {

    dataPath = 'data/' + road_id + '.csv';
    var tempRoadObj;
    $.get(dataPath, function(features) {
        obj_time = [];
        var roadData = features;
        var obj_timeNode = [];
        var num_enter = roadData.indexOf('\n', 0);

        for (i = 0; i < roadData.length; i = num_enter) {
            var single_obj = {};
            var tempSingle_obj = roadData.slice(i, roadData.indexOf('\n', i));
            var commaNum1 = tempSingle_obj.indexOf(',');
            tempTime = tempSingle_obj.slice(0, commaNum1) + ":00";

            single_obj.Time = '2018-' + tempTime.slice(tempTime.indexOf("/") + 1, tempTime.lastIndexOf("/")) + '-' + tempTime.slice(tempTime.lastIndexOf('/') + 1, tempTime.indexOf(' ')) + ' ' + tempTime.slice(tempTime.indexOf(' ') + 1);
            var commaNum2 = tempSingle_obj.indexOf(',', (commaNum1 + 1));
            single_obj.trueDate = tempSingle_obj.slice((tempSingle_obj.indexOf(',') + 1), commaNum2);
            var commaNum3 = tempSingle_obj.indexOf(',', (commaNum2 + 1));
            single_obj.analysisData = tempSingle_obj.slice(commaNum2 + 1, commaNum3);
            var commaNum4 = tempSingle_obj.indexOf(',', (commaNum3 + 1));
            single_obj.ARIMA_data = tempSingle_obj.slice(commaNum3 + 1, commaNum4);
            var commaNum5 = tempSingle_obj.indexOf(',', (commaNum4 + 1));
            single_obj.RNN_data = tempSingle_obj.slice(commaNum4 + 1, commaNum5);
            var commaNum6 = tempSingle_obj.indexOf(',', (commaNum5 + 1));
            single_obj.CNN_data = tempSingle_obj.slice(commaNum5 + 1, commaNum6);
            single_obj.LSTM_data = tempSingle_obj.slice(tempSingle_obj.lastIndexOf(',') + 1);
            obj_time.push(single_obj);
            num_enter = roadData.indexOf('\n', i) + 1;
        }
        console.log(obj_time)
        return obj_time;

    })
}

function getObjByTimeNode(timeNode) {

}

function getNum_TimeNode(temp_Timenode) {
    tmepTime = new Date(temp_Timenode);
    var tempHourstext = tmepTime.getHours() < 10 ? "0" + tmepTime.getHours() : tmepTime.getHours();
    var tempMonthtext = (tmepTime.getMonth() + 1) < 10 ? "0" + (tmepTime.getMonth() + 1) : (tmepTime.getMonth() + 1);
    var tempDatetext = tmepTime.getDate() < 10 ? "0" + tmepTime.getDate() : tmepTime.getDate();
    return ("2018" + tempMonthtext + tempDatetext + tempHourstext);
}

function getNextUnitTimeNode(timeUnit, temp_Timenode) {
    var tmepTime = new Date(temp_Timenode);
    var tempHourstext = tmepTime.getHours() < 10 ? "0" + tmepTime.getHours() : tmepTime.getHours();
    var tempMonthtext = (tmepTime.getMonth() + 1) < 10 ? "0" + (tmepTime.getMonth() + 1) : (tmepTime.getMonth() + 1);
    var tempDatetext = tmepTime.getDate() < 10 ? "0" + tmepTime.getDate() : tmepTime.getDate();
    if (timeUnit == 'hours') {
        var temphoursToInt = parseInt(tempHourstext) + 1;
        tempHourstext = temphoursToInt < 10 ? "0" + temphoursToInt : temphoursToInt;
        var temptime2 = new Date('' + 2018 + '-' + tempMonthtext + '-' + tempDatetext + ' ' + tempHourstext + ":00:00");
        tempHourstext = temptime2.getHours() < 10 ? "0" + temptime2.getHours() : temptime2.getHours();
        tempMonthtext = (temptime2.getMonth() + 1) < 10 ? "0" + (temptime2.getMonth() + 1) : (temptime2.getMonth() + 1);
        tempDatetext = temptime2.getDate() < 10 ? "0" + temptime2.getDate() : temptime2.getDate();
    } else if (timeUnit = 'day') {
        var temptime2 = new Date('' + 2018 + '-' + tempMonthtext + '-' + tempDatetext + ' ' + '24' + ":00:00");
        tempMonthtext = (temptime2.getMonth() + 1) < 10 ? "0" + (temptime2.getMonth() + 1) : (temptime2.getMonth() + 1);
        tempDatetext = temptime2.getDate() < 10 ? "0" + temptime2.getDate() : temptime2.getDate();
    }
    return ('' + 2018 + '-' + tempMonthtext + '-' + tempDatetext + ' ' + tempHourstext + ":00:00");
}

function getHoursOrDayObjs(temp_timenode, featureObj, timeUnit) {
    drawTabel1Obj = [];
    var temptime = new Date(temp_timenode);

    var num_TimeNodeday = getNum_TimeNode(temp_timenode);
    var num_TimeNodeHours = getNum_TimeNode(temp_timenode.slice(0, temp_timenode.indexOf(" ")) + " 00:00:00");
    if (timeUnit == 'hours') {
        var drawNum = 0;
        for (i = 0; i < featureObj.length; i++) {
            if (getNum_TimeNode(featureObj[i].Time) >= num_TimeNodeHours) {
                if (drawNum < 24) {
                    drawNum++;
                    drawTabel1Obj.push(featureObj[i]);
                }
            }
        }
    } else if (timeUnit = "day") {
        var drawNum = 0;
        for (i = temptime.getHours(); i < featureObj.length; i += 24) {
            if (getNum_TimeNode(featureObj[i].Time) >= num_TimeNodeday) {
                if (drawNum < 14) {
                    drawNum++;
                    drawTabel1Obj.push(featureObj[i]);
                }
            }
        }
    }
    return drawTabel1Obj;
}

function changeTileTime() {
    $(".TF_TimeBox1").text($('.TF_RB_2_1_2').val());
}

function changeEchart() {
    console.log(obj_time);
    addEchartsByUnit("echartbox2", getHoursOrDayObjs(currentTimeNode, obj_time, 'hours'), 'hours');
}
$(function() {
    $('.TF_RB_2_1_2').datepicker({
        dateFormat: 'yy-mm-dd',
        dayNamesMin: ['7', '1', '2', '3', '4', '5', '6'],
        monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        altField: '#abc',
        altFormat: 'dd/mm/yy',
        showWeek: true,
        weekHeader: 'week',
        firstDay: 1,
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        closeText: 'Close',
        currentText: 'today Date',
        maxDate: 0,
        hideIfNoPrevNext: true,
        yearRange: '1950:2020',
    });
    $('.TF_RB_2_1_2').datepicker('setDate', '2018-10-05');
})
$(document).ready(function() {
    $(".TF_RB_2_1_2").change(function() {
        currentTimeNode = $('.TF_RB_2_1_2').val() + ' 01:00:00';
        changeTileTime();
    })
    $('.TF_RB_2_3_1').click(function() {
        changeEchart();
        SearchRoadByRoadID(roadId);
    })
    $(".TF_RB_2_2_2").change(function() {
        roadId = $(".TF_RB_2_2_2 option:selected").val();
        getAllTimeNodeObj_csv(roadId);
    })
    $(".TF_RB_2_3_2").click(function() {
        searchResultLayer.removeAllFeatures();
        twoLineChart = echarts.init(document.getElementById("echartbox2"));
        diff_Chart = echarts.init(document.getElementById("echartbox1"));
        twoLineChart.clear();
        diff_Chart.clear();
    })
})

function selectRoadbyClick(roadId_1) {
    roadId = roadId_1;
    $(".TF_RB_2_2_2").val(roadId_1);

    getAllTimeNodeObj_csv(roadId_1);
}

function pre_mapPan() {
    var pxX = (pre_map.center.lon - lotx) / 40;
    var pxY = (pre_map.center.lat - loty) / 40;
    var moveX1, moveX2, moveX3, moveX4, moveX5, moveX6, moveX7, moveX8, moveX9, moveX10, moveX11, moveX12, moveX13, moveX14, moveX15, moveX16, moveX17, moveX18, moveX19, moveX20,
        moveY1, moveY2, moveY3, moveY4, moveY5, moveY6, moveY7, moveY8, moveY9, moveY10, moveY11, moveY12, moveY13, moveY14, moveY15, moveY16, moveY17, moveY18, moveY19, move20;
    move1X = pre_map.center.lon - pxX;
    move2X = pre_map.center.lon - pxX * 2;
    move3X = pre_map.center.lon - pxX * 3;
    move4X = pre_map.center.lon - pxX * 4;
    move5X = pre_map.center.lon - pxX * 5;
    move6X = pre_map.center.lon - pxX * 6;
    move7X = pre_map.center.lon - pxX * 7;
    move8X = pre_map.center.lon - pxX * 8;
    move9X = pre_map.center.lon - pxX * 9;
    move10X = pre_map.center.lon - pxX * 10;
    move11X = pre_map.center.lon - pxX * 11;
    move12X = pre_map.center.lon - pxX * 12;
    move13X = pre_map.center.lon - pxX * 13;
    move14X = pre_map.center.lon - pxX * 14;
    move15X = pre_map.center.lon - pxX * 15;
    move16X = pre_map.center.lon - pxX * 16;
    move17X = pre_map.center.lon - pxX * 17;
    move18X = pre_map.center.lon - pxX * 18;
    move19X = pre_map.center.lon - pxX * 19;
    move20X = pre_map.center.lon - pxX * 20;
    move21X = pre_map.center.lon - pxX * 21;
    move22X = pre_map.center.lon - pxX * 22;
    move23X = pre_map.center.lon - pxX * 23;
    move24X = pre_map.center.lon - pxX * 24;
    move25X = pre_map.center.lon - pxX * 25;
    move26X = pre_map.center.lon - pxX * 26;
    move27X = pre_map.center.lon - pxX * 27;
    move28X = pre_map.center.lon - pxX * 28;
    move29X = pre_map.center.lon - pxX * 29;
    move30X = pre_map.center.lon - pxX * 30;
    move31X = pre_map.center.lon - pxX * 31;
    move32X = pre_map.center.lon - pxX * 32;
    move33X = pre_map.center.lon - pxX * 33;
    move34X = pre_map.center.lon - pxX * 34;
    move35X = pre_map.center.lon - pxX * 35;
    move36X = pre_map.center.lon - pxX * 36;
    move37X = pre_map.center.lon - pxX * 37;
    move38X = pre_map.center.lon - pxX * 38;
    move39X = pre_map.center.lon - pxX * 39;
    move40X = lotx;
    move1Y = pre_map.center.lat - pxY;
    move2Y = pre_map.center.lat - pxY * 2;
    move3Y = pre_map.center.lat - pxY * 3;
    move4Y = pre_map.center.lat - pxY * 4;
    move5Y = pre_map.center.lat - pxY * 5;
    move6Y = pre_map.center.lat - pxY * 6;
    move7Y = pre_map.center.lat - pxY * 7;
    move8Y = pre_map.center.lat - pxY * 8;
    move9Y = pre_map.center.lat - pxY * 9;
    move10Y = pre_map.center.lat - pxY * 10;
    move11Y = pre_map.center.lat - pxY * 11;
    move12Y = pre_map.center.lat - pxY * 12;
    move13Y = pre_map.center.lat - pxY * 13;
    move14Y = pre_map.center.lat - pxY * 14;
    move15Y = pre_map.center.lat - pxY * 15;
    move16Y = pre_map.center.lat - pxY * 16;
    move17Y = pre_map.center.lat - pxY * 17;
    move18Y = pre_map.center.lat - pxY * 18;
    move19Y = pre_map.center.lat - pxY * 19;
    move20Y = pre_map.center.lat - pxY * 20;
    move21Y = pre_map.center.lat - pxY * 21;
    move22Y = pre_map.center.lat - pxY * 22;
    move23Y = pre_map.center.lat - pxY * 23;
    move24Y = pre_map.center.lat - pxY * 24;
    move25Y = pre_map.center.lat - pxY * 25;
    move26Y = pre_map.center.lat - pxY * 26;
    move27Y = pre_map.center.lat - pxY * 27;
    move28Y = pre_map.center.lat - pxY * 28;
    move29Y = pre_map.center.lat - pxY * 29;
    move30Y = pre_map.center.lat - pxY * 30;
    move31Y = pre_map.center.lat - pxY * 31;
    move32Y = pre_map.center.lat - pxY * 32;
    move33Y = pre_map.center.lat - pxY * 33;
    move34Y = pre_map.center.lat - pxY * 34;
    move35Y = pre_map.center.lat - pxY * 35;
    move36Y = pre_map.center.lat - pxY * 36;
    move37Y = pre_map.center.lat - pxY * 37;
    move38Y = pre_map.center.lat - pxY * 38;
    move39Y = pre_map.center.lat - pxY * 39;
    move40Y = loty;
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move1X, move1Y), Ingrace+11)", "500");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move2X, move2Y), Ingrace+11)", "530");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move3X, move3Y), Ingrace+11)", "560");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move4X, move4Y), Ingrace+11)", "590");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move5X, move5Y), Ingrace+11)", "620");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move6X, move6Y), Ingrace+11)", "650");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move7X, move7Y), Ingrace+11)", "680");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move8X, move8Y), Ingrace+11)", "710");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move9X, move9Y), Ingrace+11)", "740");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move10X, move10Y), Ingrace+11)", "770");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move11X, move11Y), Ingrace+11)", "800");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move12X, move12Y), Ingrace+11)", "830");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move13X, move13Y), Ingrace+11)", "860");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move14X, move14Y), Ingrace+11)", "890");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move15X, move15Y), Ingrace+11)", "910");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move16X, move16Y), Ingrace+11)", "940");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move17X, move17Y), Ingrace+11)", "970");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move18X, move18Y), Ingrace+11)", "1000");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move19X, move19Y), Ingrace+11)", "1030");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move20X, move20Y), Ingrace+11)", "1060");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move21X, move21Y), Ingrace+11)", "1090");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move22X, move22Y), Ingrace+11)", "1120");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move23X, move23Y), Ingrace+11)", "1150");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move24X, move24Y), Ingrace+11)", "1180");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move25X, move25Y), Ingrace+11)", "1210");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move26X, move26Y), Ingrace+11)", "1240");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move27X, move27Y), Ingrace+11)", "1270");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move28X, move28Y), Ingrace+11)", "1300");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move29X, move29Y), Ingrace+11)", "1330");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move30X, move30Y), Ingrace+11)", "1360");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move31X, move31Y), Ingrace+11)", "1390");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move32X, move32Y), Ingrace+11)", "1420");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move33X, move33Y), Ingrace+11)", "1450");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move34X, move34Y), Ingrace+11)", "1480");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move35X, move35Y), Ingrace+11)", "1510");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move36X, move36Y), Ingrace+11)", "1540");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move37X, move37Y), Ingrace+11)", "1570");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move38X, move38Y), Ingrace+11)", "1600");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move39X, move39Y), Ingrace+11)", "1630");
    setTimeout("pre_map.setCenter(new SuperMap.LonLat(move40X, move40Y), Ingrace+11)", "1660");
}
var Ingrace;

function mapenlarge() {
    judgeIngrace();

    if (Ingrace == 3) {

        pre_map.zoomIn();
        setTimeout("pre_map.zoomIn()", "150");
        setTimeout("pre_map.zoomIn()", "300");
    } else if (Ingrace == 1) {
        pre_map.zoomIn();
    } else if (Ingrace == 2) {

        pre_map.zoomIn();
        setTimeout("pre_map.zoomIn()", "150");
    } else if (Ingrace == 4) {

        pre_map.zoomIn();
        setTimeout("pre_map.zoomIn()", "150");
        setTimeout("pre_map.zoomIn()", "300");
        setTimeout("pre_map.zoomIn()", "450");
    } else if (Ingrace == 5) {

        pre_map.zoomIn();
        setTimeout("pre_map.zoomIn()", "150");
        setTimeout("pre_map.zoomIn()", "300");
        setTimeout("pre_map.zoomIn()", "450");
        setTimeout("pre_map.zoomIn()", "600");
    } else if (Ingrace == 6) {
        pre_map.zoomIn();
        setTimeout("pre_map.zoomIn()", "150");
        setTimeout("pre_map.zoomIn()", "300");
        setTimeout("pre_map.zoomIn()", "450");
        setTimeout("pre_map.zoomIn()", "600");
        setTimeout("pre_map.zoomIn()", "750");
    }
    if (Ingrace == -3) {
        pre_map.zoomOut();
        setTimeout("pre_map.zoomOut()", "30");
        setTimeout("pre_map.zoomOut()", "60");
    } else if (Ingrace == -1) {
        pre_map.zoomOut();
    } else if (Ingrace == -2) {
        pre_map.zoomOut();
        setTimeout("pre_map.zoomOut()", "30");
    } else if (Ingrace == -4) {

        pre_map.zoomOut();
        setTimeout("pre_map.zoomOut()", "30");
        setTimeout("pre_map.zoomOut()", "60");
        setTimeout("pre_map.zoomOut()", "90");
    } else if (Ingrace == -5) {

        pre_map.zoomOut();
        setTimeout("pre_map.zoomOut()", "30");
        setTimeout("pre_map.zoomOut()", "60");
        setTimeout("pre_map.zoomOut()", "90");
        setTimeout("pre_map.zoomOut()", "120");
    } else if (Ingrace == -6) {
        pre_map.zoomOut();
        setTimeout("pre_map.zoomOut()", "30");
        setTimeout("pre_map.zoomOut()", "60");
        setTimeout("pre_map.zoomOut()", "90");
        setTimeout("pre_map.zoomOut()", "120");
        setTimeout("pre_map.zoomOut()", "150");
    }
}

function judgeIngrace() {
    var longX_Y = featureSel.geometry.bounds.right + featureSel.geometry.bounds.top - featureSel.geometry.bounds.bottom - featureSel.geometry.bounds.left;
    if (longX_Y <= 0.002) {
        Ingrace = 5;
    } else if (longX_Y <= 0.005) {
        Ingrace = 4;
    } else if (longX_Y <= 0.01) {
        Ingrace = 3;
    } else if (longX_Y <= 0.03) {
        Ingrace = 2;
    } else if (longX_Y <= 0.06) {
        Ingrace = 1;
    } else if (longX_Y < 0.15) {
        Ingrace = 0;
    } else if (longX_Y < 0.5) {
        Ingrace = -1;
    } else {
        Ingrace = -3;
    }
}

function SearchRoadByRoadID(roadId_1) {
    idNumselected = roadId_1;
    var selectlayer = "roads_2018010501@MapManager";
    var fieldname = "TTI_id";
    SearchBySQL_Onlyone(selectlayer, fieldname, idNumselected, url_roadnet);
}

function SearchBySQL_Onlyone(layername, selectfieldname, IDNum, url) {
    searchResultLayer.removeAllFeatures();
    var queryParam, queryBySQLParams, queryBySQLService;
    queryParam = new SuperMap.REST.FilterParameter({
        name: layername,
        attributeFilter: selectfieldname + "=" + IDNum
    });
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: [queryParam]
    });
    queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {
        eventListeners: { "processCompleted": processCompleted_Onlyone, "processFailed": processFailed }
    });
    queryBySQLService.processAsync(queryBySQLParams);

}
var featureSel;

function processCompleted_Onlyone(queryEventArgs) {
    var i, j, feature,

        result = queryEventArgs.result;
    if (result && result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {

                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];
                    feature.style = stylebySelect;
                    searchResultLayer.addFeatures(feature);
                }
            }
        }

    }
    featureSel = feature;
    lotx = (feature.geometry.bounds.left + feature.geometry.bounds.right) / 2;
    loty = (feature.geometry.bounds.bottom + feature.geometry.bounds.top) / 2;
    mapenlarge();
    pre_mapPan();
}