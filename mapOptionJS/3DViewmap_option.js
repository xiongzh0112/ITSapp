var host = window.isLocal ? window.server : 'https://iserver.supermap.io',
    url = host + '/iserver/services/map-china400/rest/maps/China';
var map_3D_polygon, popup, deckgl_BodyLayer, deckgl_FaceLayer;
var monthdaysNum_2018 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var currentMonth = 1;
var currentDay = 5;
var currentHours = 1;
var attribution =
    "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Mapbox </a>" +
    " with <span>© <a href='https://iclient.supermap.io' target='_blank'>SuperMap iClient</a> | </span>" +
    " Map Data <span>© <a href='https://uber.github.io/kepler.gl' target='_blank'>kepler.gl</a></span> ";


load_3d_polygon();

function cleardeck_BodyLayer() {
    try {
        deckgl_BodyLayer.removeFromMap();
    } catch (e) {}
    deckgl_BodyLayer = undefined;
}
var pppd = 1;
var timetext = '2018-1-5 1:00:00';
var layerChangeType = "格网面";
timeUnit = "hours";
var bettewn_time = 1;


function add_deckglLayerbody_click() {

    try {
        deckgl_BodyLayer.removeFromMap();
    } catch (e) {}
    deckgl_BodyLayer = undefined;
    $.get(getdataFilePath(timetext, "格网面"), function(features) {
        widgets.loader.removeLoader();
        var newfeatures = [];
        addfeature(newfeatures, features.features)
        addLayer_Body(newfeatures);

    })
}

function add_deckglLayerface_click() {
    try {
        deckgl_FaceLayer.removeFromMap();
    } catch (e) {}
    add_deckgLayerface();
}

function load_3d_polygon() {
    map_3D_polygon = new mapboxgl.Map({
        container: 'map',

        style: {
            version: 8,
            sources: {
                'raster-tiles': {
                    attribution: attribution,
                    type: 'raster',
                    tiles: [url + '/zxyTileImage.png?z={z}&x={x}&y={y}'],
                    tileSize: 256
                }
            },
            layers: [{
                id: 'simple-tiles',
                type: 'raster',
                source: 'raster-tiles',
                minzoom: 0,
                maxzoom: 22
            }]
        },
        center: [104.1, 30.7],
        zoom: 11,
        pitch: 145,
        bearing: 125
    });
    map_3D_polygon.addControl(new mapboxgl.NavigationControl(), 'top-left');

    widgets.loader.showLoader('data loading...');
    $.get('data/jsondata/20180105jsondata/V2018010501.json', function(features) {
        widgets.loader.removeLoader();
        var newfeatures = [];
        addfeature(newfeatures, features.features)
        addLayer_Body(newfeatures);
        add_deckgLayerface();
    });

}

function addfeature(newfeatures, features) {
    for (i = 0; i < features.length; i++) {
        if (features[i].properties.value >= 0) {
            newfeatures.push(features[i])
        }
    }
}

function getdataFilePath(timetext, addLay_Type) {
    var dataPath;

    if (addLay_Type == "Grid") {
        dataPath = "data/jsondata/20180105jsondata/V" + getNum_currenttime(timetext) + ".json";
    } else if (addLay_Type == 'roadNet')
        dataPath = "data/roadsline_2018010501.json";
    return dataPath;
}
var animator;

function startAnimater() {
    animator = setInterval("animaterrun();", 2000);
}

function stopAnimater() {
    clearInterval(animator);
}



$(function() {
    $('.TSCInput').datepicker({
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
        currentText: 'Today Date',
        maxDate: 0,
        hideIfNoPrevNext: true,
        yearRange: '1950:2020',
    });
    $('.TSCInput').datepicker('setDate', '2018-1-5');
})

function getNum_currenttime(standartTimeText) {
    var getTextTime = new Date(standartTimeText);
    var timeTextHours = getTextTime.getHours() < 10 ? "0" + getTextTime.getHours() : getTextTime.getHours();
    var HoursToInt = parseInt(timeTextHours, 10);
    var monthToInt;
    var DateToInt;
    var timeTextMonth;
    var timeTextDate;
    if (HoursToInt == 0) {
        var timeNode1 = standartTimeText.indexOf("-");
        var timeNode2 = standartTimeText.lastIndexOf('-');
        var timeNode3 = standartTimeText.indexOf(' ');
        HoursToInt = 24;
        timeTextHours = '24';
        monthToInt = parseInt(standartTimeText.slice((timeNode1 + 1), timeNode2));
        timeTextMonth = (monthToInt + 1) < 10 ? '' + "0" + (monthToInt + 1) : (monthToInt + 1);
        DateToInt = parseInt(standartTimeText.slice((timeNode2 + 1), timeNode3));
        timeTextDate = (DateToInt + 1) < 10 ? '' + "0" + (DateToInt + 1) : (DateToInt + 1);
    } else {
        timeTextMonth = (getTextTime.getMonth() + 1) < 10 ? "0" + (getTextTime.getMonth() + 1) : (getTextTime.getMonth() + 1);
        monthToInt = parseInt(timeTextMonth, 10);

        timeTextDate = getTextTime.getDate() < 10 ? "0" + getTextTime.getDate() : getTextTime.getDate();
        DateToInt = parseInt(timeTextDate, 10);
    }
    var numCurrentTime = '' + "2018" + timeTextMonth + timeTextDate + timeTextHours;

    return numCurrentTime;
}

function timeRunnerOneUnit(standartTimeText, timeUnit) {
    var getTextTime = new Date(standartTimeText);
    var timeTextYear = getTextTime.getFullYear();
    var timeTextHours = getTextTime.getHours() < 10 ? "0" + getTextTime.getHours() : getTextTime.getHours();
    var HoursToInt = parseInt(timeTextHours, 10);
    var monthToInt;
    var DateToInt;
    if (HoursToInt == 0) {
        var timeNode1 = standartTimeText.indexOf("-");
        var timeNode2 = standartTimeText.lastIndexOf('-');
        var timeNode3 = standartTimeText.indexOf(' ');
        HoursToInt = 24;
        monthToInt = parseInt(standartTimeText.slice((timeNode1 + 1), timeNode2));
        DateToInt = parseInt(standartTimeText.slice((timeNode2 + 1), timeNode3));

    } else {
        var timeTextMonth = (getTextTime.getMonth() + 1) < 10 ? "0" + (getTextTime.getMonth() + 1) : (getTextTime.getMonth() + 1);
        monthToInt = parseInt(timeTextMonth, 10);

        var timeTextDate = getTextTime.getDate() < 10 ? "0" + getTextTime.getDate() : getTextTime.getDate();
        DateToInt = parseInt(timeTextDate, 10);
    }



    if (timeUnit == 'day') {
        DateToInt++;
    } else if (timeUnit == 'hours') {
        HoursToInt++;
    }

    if (HoursToInt == 25) {
        HoursToInt = 1;
        DateToInt++;
    }

    if (DateToInt == (monthdaysNum_2018[monthToInt - 1] + 1)) {
        monthToInt++;
        DateToInt = 1;
    }

    var standart_currentTime = "2018" + '-' + monthToInt + '-' + DateToInt + ' ' + HoursToInt + ':00:00';


    return standart_currentTime;
}

function timeDelOneUnit(standartTimeText, timeUnit) {
    var getTextTime = new Date(standartTimeText);
    var timeTextYear = getTextTime.getFullYear();
    var timeTextHours = getTextTime.getHours() < 10 ? "0" + getTextTime.getHours() : getTextTime.getHours();
    var HoursToInt = parseInt(timeTextHours, 10);
    var monthToInt;
    var DateToInt;
    if (HoursToInt == 0) {
        var timeNode1 = standartTimeText.indexOf("-");
        var timeNode2 = standartTimeText.lastIndexOf('-');
        var timeNode3 = standartTimeText.indexOf(' ');
        HoursToInt = 24;
        monthToInt = parseInt(standartTimeText.slice((timeNode1 + 1), timeNode2));
        DateToInt = parseInt(standartTimeText.slice((timeNode2 + 1), timeNode3));
    } else {
        var timeTextMonth = (getTextTime.getMonth() + 1) < 10 ? "0" + (getTextTime.getMonth() + 1) : (getTextTime.getMonth() + 1);
        monthToInt = parseInt(timeTextMonth, 10);

        var timeTextDate = getTextTime.getDate() < 10 ? "0" + getTextTime.getDate() : getTextTime.getDate();
        DateToInt = parseInt(timeTextDate, 10);
    }
    if (timeUnit == 'day') {
        DateToInt--;
    } else if (timeUnit == 'hours') {
        HoursToInt--;
    }
    if (HoursToInt == 0) {
        HoursToInt = 24;
        DateToInt--;
    }
    if (DateToInt == 0) {
        monthToInt--;
        DateToInt = monthdaysNum_2018[monthToInt - 1];
    }
    var standart_currentTime = "2018" + '-' + monthToInt + '-' + DateToInt + ' ' + HoursToInt + ':00:00';

    return standart_currentTime;
}
write_DayNodeTime(timetext);

function write_DayNodeTime(standartTimeText) {

    var nextTime1;
    var nextTime2;
    var nextTime3;
    var nextTime4;
    var nextTime5;
    var nextTime6;
    var preTime1;
    var preTime2;
    var preTime3;
    var preTime4;
    var preTime5;
    var preTime6;
    var current_TimeUnit = $("#timeUnit_sel option:selected").val();

    if (current_TimeUnit == 'day') {

        if (standartTimeText.slice(0, standartTimeText.indexOf(' ')) == '2018-12-31') {
            nextTime1 = "-";

        } else {

            nextTime1 = timeRunnerOneUnit(timetext, 'day');

        }
        if (nextTime1 == '-') {
            nextTime2 = '-';
        } else if (nextTime1.slice(0, standartTimeText.indexOf(' ')) == '2018-12-31') {
            nextTime2 = '-';
            nextTime1 = nextTime1.slice(5, nextTime1.indexOf(" "));
        } else {
            nextTime2 = timeRunnerOneUnit(nextTime1, 'day');
            nextTime1 = nextTime1.slice(5, nextTime1.indexOf(" "));

        }
        if (nextTime2 == '-') {
            nextTime3 = '-';
        } else if (nextTime2.slice(0, standartTimeText.indexOf(' ')) == '2018-12-31') {
            nextTime3 = '-';
            nextTime2 = nextTime2.slice(5, nextTime2.indexOf(" "));
        } else {
            nextTime3 = timeRunnerOneUnit(nextTime2, 'day');
            nextTime2 = nextTime2.slice(5, nextTime2.indexOf(" "));
        }
        if (nextTime3 == '-') {
            nextTime4 = '-';
        } else if (nextTime3.slice(0, standartTimeText.indexOf(' ')) == '2018-12-31') {
            nextTime4 = '-';
            nextTime3 = nextTime3.slice(5, nextTime3.indexOf(" "));
        } else {
            nextTime4 = timeRunnerOneUnit(nextTime3, 'day');
            nextTime3 = nextTime3.slice(5, nextTime3.indexOf(" "));
        }
        if (nextTime4 == '-') {
            nextTime5 = '-';
        } else if (nextTime4.slice(0, standartTimeText.indexOf(' ')) == '2018-12-31') {
            nextTime5 = '-';
            nextTime4 = nextTime4.slice(5, nextTime4.indexOf(" "));
        } else {
            nextTime5 = timeRunnerOneUnit(nextTime4, 'day');
            nextTime4 = nextTime4.slice(5, nextTime4.indexOf(" "));
        }
        if (nextTime5 == '-') {
            nextTime6 = '-';
        } else if (nextTime5.slice(0, standartTimeText.indexOf(' ')) == '2018-12-31') {
            nextTime6 = '-';
            nextTime5 = nextTime5.slice(5, nextTime5.indexOf(" "));
        } else {
            nextTime6 = timeRunnerOneUnit(nextTime5, 'day');
            nextTime5 = nextTime5.slice(5, nextTime5.indexOf(" "));
            nextTime6 = nextTime6.slice(5, nextTime6.indexOf(" "));
        }


        if (standartTimeText.slice(0, standartTimeText.indexOf(' ')) == '2018-1-1') {
            preTime1 = "-";

        } else {

            preTime1 = timeDelOneUnit(timetext, 'day');

        }
        if (preTime1 == '-') {
            preTime2 = '-';
        } else if (preTime1.slice(0, standartTimeText.indexOf(' ')) == '2018-1-1') {
            preTime2 = '-';
            preTime1 = preTime1.slice(5, preTime1.indexOf(" "));

        } else {
            preTime2 = timeDelOneUnit(preTime1, 'day');
            preTime1 = preTime1.slice(5, preTime1.indexOf(" "));
        }
        if (preTime2 == '-') {
            preTime3 = '-';
        } else if (preTime2.slice(0, standartTimeText.indexOf(' ')) == '2018-1-1') {
            preTime3 = '-';
            preTime2 = preTime2.slice(5, preTime2.indexOf(" "));
        } else {
            preTime3 = timeDelOneUnit(preTime2, 'day');
            preTime2 = preTime2.slice(5, preTime2.indexOf(" "));
        }
        if (preTime3 == '-') {
            preTime4 = '-';
        } else if (preTime3.slice(0, standartTimeText.indexOf(' ')) == '2018-1-1') {
            preTime4 = '-';
            preTime3 = preTime3.slice(5, preTime3.indexOf(" "));
        } else {
            preTime4 = timeDelOneUnit(preTime3, 'day');
            preTime3 = preTime3.slice(5, preTime3.indexOf(" "));
        }
        if (preTime4 == '-') {
            preTime5 = '-';
        } else if (preTime4.slice(0, standartTimeText.indexOf(' ')) == '2018-1-1') {
            preTime5 = '-';
            preTime4 = preTime4.slice(5, preTime4.indexOf(" "));
        } else {
            preTime5 = timeDelOneUnit(preTime4, 'day');
            preTime4 = preTime4.slice(5, preTime4.indexOf(" "));
        }
        if (preTime5 == '-') {
            preTime6 = '-';
        } else if (preTime5.slice(0, standartTimeText.indexOf(' ')) == '2018-1-1') {
            preTime6 = '-';
            preTime5 = preTime5.slice(5, preTime5.indexOf(" "));
        } else {
            preTime6 = timeDelOneUnit(preTime5, 'day');
            preTime5 = preTime5.slice(5, preTime5.indexOf(" "));
            preTime6 = preTime6.slice(5, preTime6.indexOf(" "));
        }

    } else {

        if (standartTimeText == '2018-12-31 23:00:00') {
            nextTime1 = "-";
        } else {
            nextTime1 = timeRunnerOneUnit(timetext, 'hours');

        }
        if (nextTime1 == '-') {
            nextTime2 = '-';
        } else if (nextTime1 == '2018-12-31 23:00:00') {
            nextTime2 = '-';
            nextTime1 = nextTime1.slice(nextTime1.indexOf(" ") + 1, nextTime1.lastIndexOf(":"));
        } else {
            nextTime2 = timeRunnerOneUnit(nextTime1, 'hours');
            nextTime1 = nextTime1.slice(nextTime1.indexOf(" ") + 1, nextTime1.lastIndexOf(":"));

        }
        if (nextTime2 == '-') {
            nextTime3 = '-';
        } else if (nextTime2 == '2018-12-31 23:00:00') {
            nextTime3 = '-';
            nextTime2 = nextTime2.slice(nextTime2.indexOf(" ") + 1, nextTime2.lastIndexOf(":"));
        } else {
            nextTime3 = timeRunnerOneUnit(nextTime2, 'hours');
            nextTime2 = nextTime2.slice(nextTime2.indexOf(" ") + 1, nextTime2.lastIndexOf(":"));

        }
        if (nextTime3 == '-') {
            nextTime4 = '-';
        } else if (nextTime3 == '2018-12-31 23:00:00') {
            nextTime4 = '-';
            nextTime3 = nextTime3.slice(nextTime3.indexOf(" ") + 1, nextTime3.lastIndexOf(":"));
        } else {
            nextTime4 = timeRunnerOneUnit(nextTime3, 'hours');

            nextTime3 = nextTime3.slice(nextTime3.indexOf(" ") + 1, nextTime3.lastIndexOf(":"));
        }
        if (nextTime4 == '-') {
            nextTime5 = '-';
        } else if (nextTime4 == '2018-12-31 23:00:00') {
            nextTime5 = '-';
            nextTime4 = nextTime4.slice(nextTime4.indexOf(" ") + 1, nextTime4.lastIndexOf(":"));
        } else {
            nextTime5 = timeRunnerOneUnit(nextTime4, 'hours');

            nextTime4 = nextTime4.slice(nextTime4.indexOf(" ") + 1, nextTime4.lastIndexOf(":"));
        }
        if (nextTime5 == '-') {
            nextTime6 = '-';
        } else if (nextTime5 == '2018-12-31 23:00:00') {
            nextTime6 = '-';
            nextTime5 = nextTime5.slice(nextTime5.indexOf(" ") + 1, nextTime5.lastIndexOf(":"));
        } else {
            nextTime6 = timeRunnerOneUnit(nextTime5, 'hours');

            nextTime5 = nextTime5.slice(nextTime5.indexOf(" ") + 1, nextTime5.lastIndexOf(":"));
            nextTime6 = nextTime6.slice(nextTime6.indexOf(" ") + 1, nextTime6.lastIndexOf(":"));
        }


        if (standartTimeText == '2018-1-1 1:00:00') {
            preTime1 = "-";

        } else {
            preTime1 = timeDelOneUnit(timetext, 'hours');

        }
        if (preTime1 == '-') {
            preTime2 = '-';
        } else if (preTime1 == '2018-1-1 1:00:00') {
            preTime2 = '-';
            preTime1 = preTime1.slice(preTime1.indexOf(" ") + 1, preTime1.lastIndexOf(":"));
        } else {
            preTime2 = timeDelOneUnit(preTime1, 'hours');

            preTime1 = preTime1.slice(preTime1.indexOf(" ") + 1, preTime1.lastIndexOf(":"));
        }
        if (preTime2 == '-') {
            preTime3 = '-';
        } else if (preTime2 == '2018-1-1 1:00:00') {
            preTime3 = '-';
            preTime2 = preTime2.slice(preTime2.indexOf(" ") + 1, preTime2.lastIndexOf(":"));
        } else {
            preTime3 = timeDelOneUnit(preTime2, 'hours');

            preTime2 = preTime2.slice(preTime2.indexOf(" ") + 1, preTime2.lastIndexOf(":"));
        }
        if (preTime3 == '-') {
            preTime4 = '-';
        } else if (preTime3 == '2018-1-1 1:00:00') {
            preTime4 = '-';
            preTime3 = preTime3.slice(preTime3.indexOf(" ") + 1, preTime3.lastIndexOf(":"));
        } else {
            preTime4 = timeDelOneUnit(preTime3, 'hours');

            preTime3 = preTime3.slice(preTime3.indexOf(" ") + 1, preTime3.lastIndexOf(":"));
        }
        if (preTime4 == '-') {
            preTime5 = '-';
        } else if (preTime4 == '2018-1-1 1:00:00') {
            preTime5 = '-';
            preTime4 = preTime4.slice(preTime4.indexOf(" ") + 1, preTime4.lastIndexOf(":"));
        } else {
            preTime5 = timeDelOneUnit(preTime4, 'hours');

            preTime4 = preTime4.slice(preTime4.indexOf(" ") + 1, preTime4.lastIndexOf(":"));
        }
        if (preTime5 == '-') {
            preTime6 = '-';
        } else if (preTime5 == '2018-1-1 1:00:00') {
            preTime6 = '-';
            preTime5 = preTime5.slice(preTime5.indexOf(" ") + 1, preTime5.lastIndexOf(":"));
        } else {
            preTime6 = timeDelOneUnit(preTime5, 'hours');
            preTime5 = preTime5.slice(preTime5.indexOf(" ") + 1, preTime5.lastIndexOf(":"));
            preTime6 = preTime6.slice(preTime6.indexOf(" ") + 1, preTime6.lastIndexOf(":"));
        }
    }
    $(function() {
        $('.TT11').text(nextTime1);
        $('.TT12').text(nextTime2);
        $('.TT13').text(nextTime3);
        $('.TT14').text(nextTime4);
        $('.TT15').text(nextTime5);
        $('.TT16').text(nextTime6);
        $('.TT9').text(preTime1);
        $('.TT8').text(preTime2);
        $('.TT7').text(preTime3);
        $('.TT6').text(preTime4);
        $('.TT5').text(preTime5);
        $('.TT4').text(preTime6);
    })
}

function getNum_Month_day_hours(standartTimeText) {
    var getTextTime = new Date(standartTimeText);
    var timeTextHours = getTextTime.getHours() < 10 ? "0" + getTextTime.getHours() : getTextTime.getHours();
    var HoursToInt = parseInt(timeTextHours, 10);
    var monthToInt;
    var DateToInt;
    if (HoursToInt == 0) {
        var timeNode1 = standartTimeText.indexOf("-");
        var timeNode2 = standartTimeText.lastIndexOf('-');
        var timeNode3 = standartTimeText.indexOf(' ');
        HoursToInt = 24;
        monthToInt = parseInt(standartTimeText.slice((timeNode1 + 1), timeNode2));
        DateToInt = parseInt(standartTimeText.slice((timeNode2 + 1), timeNode3));

    } else {
        var timeTextMonth = (getTextTime.getMonth() + 1) < 10 ? "0" + (getTextTime.getMonth() + 1) : (getTextTime.getMonth() + 1);
        monthToInt = parseInt(timeTextMonth, 10);

        var timeTextDate = getTextTime.getDate() < 10 ? "0" + getTextTime.getDate() : getTextTime.getDate();
        DateToInt = parseInt(timeTextDate, 10);
    }
    currentMonth = monthToInt;
    currentDay = DateToInt;
    currentHours = HoursToInt;
}

function getCurrentHours() {
    getNum_Month_day_hours(timetext);
    $('.TT10').text(currentHours + ":00");
}

function clickToright() {
    if (parseInt(getNum_currenttime(timetext)) < 2018010501) {
        stop3DAnimoter();
        alert("超出时间范围！")
        resetCurrentTime();
    } else if (parseInt(getNum_currenttime(timetext)) < 2018011122) {
        timetext = timeRunnerOneUnit(timetext, $("#timeUnit_sel option:selected").val());
        $('#time_head1').text(timetext);
        write_DayNodeTime(timetext);
        getCurrentHours();
        $('.TSCInput').val(timetext.slice(0, timetext.indexOf(' ')));
        cleardeck_BodyLayer();
        setTimeout('add_deckglLayerbody_click();', 0);

    } else {
        clearInterval(animator);
        alert('超出时间范围！');
        resetCurrentTime();
    }

}

function clickToleft() {

    if (parseInt(getNum_currenttime(timetext)) < 2018010501) {
        stop3DAnimoter();
        alert("超出时间范围！")
        resetCurrentTime();
    } else if (parseInt(getNum_currenttime(timetext)) < 2018010723) {
        timetext = timeDelOneUnit(timetext, $("#timeUnit_sel option:selected").val());
        $('#time_head1').text(timetext);
        write_DayNodeTime(timetext);
        getCurrentHours();
        $('.TSCInput').val(timetext.slice(0, timetext.indexOf(' ')));
        cleardeck_BodyLayer();
        setTimeout('add_deckglLayerbody_click();', 0);
    } else {
        clearInterval(animator);
        alert('超出时间范围！');
        resetCurrentTime();
    }
}
$(document).ready(function() {
    $(".toRight").click(function() {
        if (deckgl_FaceLayer) {
            deckgl_FaceLayer.removeFromMap();
            deckgl_FaceLayer = undefined;
        }

        clickToright();
    })
    $(".TSCReset,.timeReset").click(function() {
        if (deckgl_FaceLayer) {
            deckgl_FaceLayer.removeFromMap();
            deckgl_FaceLayer = undefined;
        }
        resetCurrentTime();
    })
    $('#timeUnit_sel').change(function() {

        write_DayNodeTime(timetext);

    })

    $('.toLeft').click(function() {
        if (deckgl_FaceLayer) {
            deckgl_FaceLayer.removeFromMap();
            deckgl_FaceLayer = undefined;
        }
        clickToleft();
    })
    $('.TSCBtn1').click(function() {
        clearInterval(animator);
        if (timeUnit == "day") {
            if ($(".TSCSelect1").val() == "defaultime") {
                $(".TSCSelect1").val("defaultime1");
                timetext = $(".TSCInput").val() + ' 1:00:00';

            } else
                timetext = $(".TSCInput").val() + ' ' + $(".TSCSelect1 option:selected").text() + ":00";
        } else {
            timetext = $(".TSCInput").val() + ' ' + $(".TSCSelect1 option:selected").text() + ":00";

        }
        $('#time_head1').text(timetext);
        write_DayNodeTime(timetext);
        getCurrentHours();
        cleardeck_BodyLayer();

        if (deckgl_FaceLayer) {
            deckgl_BodyLayer.removeFromMap();
            deckgl_BodyLayer = undefined;
            add_deckglLayerface_click();


        } else
            add_deckglLayerbody_click();

    })
})
$(document).ready(function() {
    $('.playAndStop3D').click(function() {
        if (deckgl_FaceLayer) {
            deckgl_FaceLayer.removeFromMap();
            deckgl_FaceLayer = undefined;
        }
        if ($('.playAndStop3D').attr('title') == 'Stop') {
            stop3DAnimoter();
        } else {
            start3DAnimoter();
        }
    })
})

function stop3DAnimoter() {
    $('.playAndStop3D').attr('title', 'Play');
    $('.playAndStop3D').css("background-image", 'url(./picture/Play.png)');

    stopAnimater();
}

function start3DAnimoter() {
    $('.playAndStop3D').attr('title', 'Stop');
    $('.playAndStop3D').css("background-image", 'url(./picture/Play.png)');
    startAnimater();
}

function resetCurrentTime() {

    stop3DAnimoter();

    timetext = '2018-1-5 1:00:00';

    $('#time_head1').text(timetext);
    write_DayNodeTime(timetext);
    getCurrentHours();
    $('.TSCInput').val(timetext.slice(0, timetext.indexOf(' ')));
    $('.playAndStop3D').attr('title', 'Play');
    $('.playAndStop3D').css("background-image", 'url(./picture/Play.png)');
    load_3d_polygon();
}

function animaterrun() {

    if (parseInt(getNum_currenttime(timetext), 10) < 2018010501) {
        clearInterval(animator);
        resetCurrentTime();
    } else if (parseInt(getNum_currenttime(timetext), 10) < 2018011123) {

        clickToright();
    } else {
        clickToright();

    }

}

function addLayer_Body(features) {


    deckgl_BodyLayer = new mapboxgl.supermap.DeckglLayer('polygon-layer', {
        data: features,
        props: {
            stroked: false,
            extruded: true,
            filled: true,
            opacity: 0.2,
            autoHighlight: true,
            highlightColor: [255, 255, 0, 255],
            lightSettings: {
                lightsPosition: [-73, 40, 5000, -74, 41, 5000],
                ambientRatio: 0.2,
                diffuseRatio: 0.5,
                specularRatio: 0.3,
                lightsStrength: [1.0, 0.0, 2.0, 0.0],
                numberOfLights: 2
            },
            onHover: function(feature) {
                pppf = feature;
                if (!popup) {
                    popup = new mapboxgl.Popup({
                        anchor: 'bottom',
                        closeButton: false,
                        offset: {
                            'bottom': [0, -10],
                        }
                    });
                }
                if (!feature.object) {
                    popup.remove();
                    return;
                }
                popup.setHTML("Speed： " + feature.object.properties.value);
                popup.setLngLat(map_3D_polygon.unproject([feature.x, feature.y]));
                popup.addTo(map_3D_polygon);
            }
        },
        callback: {
            getPolygon: function(feature) {
                if (!feature.geometry || !feature.geometry.coordinates) {
                    return [0, 0];
                }
                return feature.geometry.coordinates;
            },
            getElevation: function(d) {
                return d.properties.value * 30;
            },
            getFillColor: function(feature) {
                if (feature.properties.value >= 0 && feature.properties.value < 24.9) {
                    return [242, 241, 162];
                } else if (feature.properties.value >= 24.9 && feature.properties.value < 30.7) {
                    return [252, 250, 88];
                } else if (feature.properties.value >= 30.7 && feature.properties.value < 35.9) {
                    return [255, 225, 0];
                } else if (feature.properties.value >= 35.9 && feature.properties.value < 41.9) {
                    return [255, 98, 0];
                } else if (feature.properties.value >= 41.9 && feature.properties.value < 49.9) {
                    return [247, 5, 138];
                } else if (feature.properties.value >= 49.9 && feature.properties.value < 62.1) {
                    return [206, 7, 237];
                } else if (feature.properties.value >= 62.1 && feature.properties.value < 81.1) {
                    return [111, 25, 209];
                } else if (feature.properties.value >= 81.1) {
                    return [7, 29, 173];
                }
                return [0, 0, 0, 0];
            },
        }
    });
    map_3D_polygon.addLayer(deckgl_BodyLayer);

}
$(document).ready(function() {
    $('#add_deckg_face').click(function() {
        if (deckgl_FaceLayer) {
            deckgl_FaceLayer.removeFromMap();
            deckgl_FaceLayer = undefined;
        } else
            add_deckgLayerface();
    })
    $('#add_deckg_body').click(function() {
        if (deckgl_BodyLayer.visibility == false) {
            deckgl_BodyLayer.setVisibility(true);
        } else {
            deckgl_BodyLayer.setVisibility(false);
        }
    })
})

function add_deckgLayerface() {
    var data_file = "data/roadsline_2018010501.json";
    $.get(data_file, function(features) {
        widgets.loader.removeLoader();
        addLayer_Face(features.features);
    });
}

function addLayer_Face(features) {
    var tempfieldName = "" + "Speed" + getNum_currenttime(timetext);
    deckgl_FaceLayer = new mapboxgl.supermap.DeckglLayer('polygon-layer', {
        data: features,
        props: {
            'map': map_3D_polygon,
            'id': "deckgl_FaceLayer",
            stroked: false,
            extruded: true,
            filled: true,
            opacity: 0.4,
            autoHighlight: true,
            highlightColor: [255, 255, 0, 255],
            lightSettings: {
                lightsPosition: [-73, 40, 5000, -74, 41, 5000],
                ambientRatio: 0.2,
                diffuseRatio: 0.5,
                specularRatio: 0.3,
                lightsStrength: [1.0, 0.0, 2.0, 0.0],
                numberOfLights: 2
            },
            onHover: function(feature) {
                pppf = feature;
                if (!popup) {
                    popup = new mapboxgl.Popup({
                        anchor: 'bottom',
                        closeButton: false,
                        offset: {
                            'bottom': [0, -10],
                        }
                    });
                }
                if (!feature.object) {
                    popup.remove();
                    return;
                }
                popup.setHTML("Point Count： " + feature.object.properties[tempfieldName]);
                popup.setLngLat(map.unproject([feature.x, feature.y]));
                popup.addTo(map);
            }
        },
        callback: {
            getPolygon: function(feature) {
                if (!feature.geometry || !feature.geometry.coordinates) {
                    return [0, 0];
                }
                return feature.geometry.coordinates;
            },
            getElevation: function(d) {
                return d.properties[tempfieldName] * 20;
            },
            getFillColor: function(feature) {
                if (feature.properties[tempfieldName] >= 0 && feature.properties[tempfieldName] < 24.9215500) {
                    return [242, 241, 162];
                } else if (feature.properties[tempfieldName] >= 24.9215500 && feature.properties[tempfieldName] < 30.6945167) {
                    return [252, 250, 88];
                } else if (feature.properties[tempfieldName] >= 30.6945167 && feature.properties[tempfieldName] < 35.8790333) {
                    return [255, 225, 0];
                } else if (feature.properties[tempfieldName] >= 35.8790333 && feature.properties[tempfieldName] < 41.9216833) {
                    return [255, 98, 0];
                } else if (feature.properties[tempfieldName] >= 41.9216833 && feature.properties[tempfieldName] < 49.9163667) {
                    return [247, 5, 138];
                } else if (feature.properties[tempfieldName] >= 49.9163667 && feature.properties[tempfieldName] < 62.0652833) {
                    return [206, 7, 237];
                } else if (feature.properties[tempfieldName] >= 62.0652833 && feature.properties[tempfieldName] < 81.0988667) {
                    return [111, 25, 209];
                } else if (feature.properties[tempfieldName] >= 81.0988667) {
                    return [7, 29, 173];
                }
                return [0, 0, 0, 0];
            },
        }
    });
    map_3D_polygon.addLayer(deckgl_FaceLayer);
}

function cleardeck_FaceLayer() {
    try {
        deckgl_FaceLayer.removeFromMap();

    } catch (e) {}
    deckgl_FaceLayer = undefined;
}