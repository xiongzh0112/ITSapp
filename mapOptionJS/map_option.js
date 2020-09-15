var currentTime = "2018-1-5 1:00:00";
var currentMonth = 1;
var currentDay = 5;
var currentHours = 1;
var currentDate = new Date(currentTime);
var currentWeek = weeks[currentDate.getDay()];
var monthdaysNum_2018 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var url_China_WGS1984 = "http://localhost:8090/iserver/services/map-china400/rest/maps/China_4326";
var rasterturl_Head = "http://localhost:8090/iserver/services/map-WGS1984_MCT/rest/maps/";
var rasterurl = [];
var rasterurlByGoup = [];
var raster_toMesh_url = [];
var raster_toMeshName = [];
var raster_toMesh_urlByGoup = [];
var raster_toMeshNameByGoup = [];
var road_speadFieldGroup = [];
addall_rasterurl();

function addall_rasterurl() {

    var year = 2018;



    for (i = 0; i < 12; i++) {

        var dayRaster_urlByGroup = [];
        var dayRasterToMesh_urlByGroup = [];
        var dayRasterToMeshNameByGroup = [];
        var dayRoadSpeedFieldNameByGroup = [];
        for (j = 0; j < monthdaysNum_2018[i]; j++) {
            var hoursRaster_urlByGroup = [];
            var hoursRasterToMesh_urlByGroup = [];
            var hoursRasterToMeshNameByGroup = [];
            var hoursRoadSpeedFieldNameByGroup = [];
            for (n = 0; n < 24; n++) {

                var temporary_raster_url = rasterturl_Head + 'D' + parseInt((year + StringtoDouble(i + 1) + StringtoDouble(j + 1) + StringtoDouble(n + 1)), 10) + '@RasterMapWGS1984';
                var temporary_rasterToMesh_url = rasterturl_Head + 'DV' + parseInt((year + StringtoDouble(i + 1) + StringtoDouble(j + 1) + StringtoDouble(n + 1)), 10) + '@RasterMapWGS1984';
                var temperary_rasterToMeshName = 'DV' + parseInt((year + StringtoDouble(i + 1) + StringtoDouble(j + 1) + StringtoDouble(n + 1)), 10) + '@RasterMapWGS1984';
                var temperary_RoadSpeedFieldNameByGroup = "Speed" + parseInt((year + StringtoDouble(i + 1) + StringtoDouble(j + 1) + StringtoDouble(n + 1)), 10);
                rasterurl.push(temporary_raster_url);
                raster_toMesh_url.push(temporary_rasterToMesh_url);
                raster_toMeshName.push(temperary_rasterToMeshName);
                hoursRaster_urlByGroup.push(temporary_raster_url);
                hoursRasterToMesh_urlByGroup.push(temporary_rasterToMesh_url);
                hoursRasterToMeshNameByGroup.push(temperary_rasterToMeshName);
                hoursRoadSpeedFieldNameByGroup.push(temperary_RoadSpeedFieldNameByGroup);
            }

            dayRaster_urlByGroup.push(hoursRaster_urlByGroup);
            dayRasterToMesh_urlByGroup.push(hoursRasterToMesh_urlByGroup);
            dayRasterToMeshNameByGroup.push(hoursRasterToMeshNameByGroup);
            dayRoadSpeedFieldNameByGroup.push(hoursRoadSpeedFieldNameByGroup);
        }

        rasterurlByGoup.push(dayRaster_urlByGroup);
        raster_toMesh_urlByGoup.push(dayRasterToMesh_urlByGroup);
        raster_toMeshNameByGoup.push(dayRasterToMeshNameByGroup);
        road_speadFieldGroup.push(dayRoadSpeedFieldNameByGroup);
    }

}

function StringtoDouble(num) {
    var Mystring;
    if (num < 10) {
        Mystring = '' + "0" + num;
    } else Mystring = '' + num;
    return Mystring;
}

function getNum_by_singleNum(month, day, hours) {
    var Num_by_singleNum = '' + StringtoDouble(month) + StringtoDouble(day) + StringtoDouble(hours);
    return Num_by_singleNum;
}

function getNum_currenttime(standtimetext) {
    var getTextTime = new Date(standtimetext);

    var timeTextHours = getTextTime.getHours() < 10 ? "0" + getTextTime.getHours() : getTextTime.getHours();
    var HoursToInt = parseInt(timeTextHours, 10);
    var monthToInt;
    var DateToInt;
    var timeTextMonth;
    var timeTextDate;
    if (HoursToInt == 0) {

        var timeNode1 = standtimetext.indexOf("-");
        var timeNode2 = standtimetext.lastIndexOf('-');
        var timeNode3 = standtimetext.indexOf(' ');
        HoursToInt = 24;
        timeTextHours = '24';

        monthToInt = parseInt(standtimetext.slice((timeNode1 + 1), timeNode2));

        timeTextMonth = (monthToInt) < 10 ? '' + "0" + (monthToInt) : (monthToInt);

        DateToInt = parseInt(standtimetext.slice((timeNode2 + 1), timeNode3));
        timeTextDate = (DateToInt) < 10 ? '' + "0" + (DateToInt) : (DateToInt);


    } else {
        timeTextMonth = (getTextTime.getMonth() + 1) < 10 ? "0" + (getTextTime.getMonth() + 1) : (getTextTime.getMonth() + 1);
        monthToInt = parseInt(timeTextMonth, 10);

        timeTextDate = getTextTime.getDate() < 10 ? "0" + getTextTime.getDate() : getTextTime.getDate();
        DateToInt = parseInt(timeTextDate, 10);
    }
    var numCurrentTime = '' + "2018" + timeTextMonth + timeTextDate + timeTextHours;
    return numCurrentTime;
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

function getRasterTypeByGroupArray(timetext, urlarray) {
    getNum_Month_day_hours(timetext);
    getUrl = urlarray[currentMonth - 1][currentDay - 1][currentHours - 1];
    return getUrl;
}

function getRasterUrlByTime(timetext) {
    var tempUrl = rasterturl_Head + 'D' + getNum_currenttime(timetext) + "@RasterMapWGS1984";
    return tempUrl;
}

function getUrlByUrlArray(timetext, urlarray) {

    getNum_Month_day_hours(timetext);
    var i = currentMonth - 1;
    var days_bymonth = 0;
    var j = currentDay - 1;
    var k = currentHours + 1 - 1;
    for (i; i > -1; i--) {
        days_bymonth = days_bymonth + parseInt(monthdaysNum_2018[i], 10);
    }
    days_bymonth = j + days_bymonth;
    var allhours = days_bymonth * 24 + k;

    var getUrl = urlarray[allhours - 1];

    return getUrl;
}

var roadLine_map, mousePointLayer, loadVectorLayer, vectorLayerPoint, lotx, loty, vectorlayer_Allgeometry, drawPoint,
    infowin = null,
    stylebySelect = {
        strokeColor: "red",
        strokeWidth: 10,
        fillColor: "#red",
        fillOpacity: "1"
    },
    mousePointstyle = {
        strokeColor: "#304DBE",
        strokeWidth: 1,
        pointerEvents: "visiblePainted",
        fillColor: "#304DBE",
        fillOpacity: 0.5,
        pointRadius: 2
    },
    RasterSearchPointstyle = {
        strokeColor: "rgb(255,55,66)",
        strokeWidth: 2,
        pointerEvents: "visiblePainted",
        fillColor: "rgb(255,244,66)",
        fillOpacity: 0.8,
        pointRadius: 6
    };

map_China_WGS1984 = new SuperMap.Layer.TiledDynamicRESTLayer("China", url_China_WGS1984, {
    transparent: true,
    cacheEnabled: true
});

mousePointLayer = new SuperMap.Layer.Vector("mousepointLayer");
vectorLayerPoint = new SuperMap.Layer.Vector("VectorPoint Layer");
loadVectorLayer = new SuperMap.Layer.Vector("VectorBySelect");
drawPoint = new SuperMap.Control.DrawFeature(mousePointLayer, SuperMap.Handler.Point)
drawPoint.events.on({
    "featureadded": drawCompleted
});
var markerLayer = new SuperMap.Layer.Markers("Markers");
var load_raster_geometry, rasterlayer, rastertoVect;

var RasterMap, rasterMapY, rasterMapX, rasterMapZoom;

var stylechangeBySel = {
        strokeColor: "#eeff55",
        strokeWidth: "2.5",
        fillColor: "#ffcf99",
        fillOpacity: "0.8"
    },
    stylebeforeSel = {
        strokeColor: "#eeff55",
        strokeWidth: "2.5",
        fillColor: "#ffcf99",
        fillOpacity: "0.8"
    };
var timeUnit = "hours";
var chartAnimoter;
var optionRaster;
var RasterSearchmap, map_China_WGS1984byrasterSearch, rasterSearchlayer, road_vecterByRasterSearch, rasterSearchPointLayer, drawRasterSearPoint;
var HeatMap, HeatmapVectLoad, roadHeatLayer, HeatMap_China_WGS1984, features_heatmap, heatLay_DatechangeStatic = 1;

var tianditu_lay1;
var tiandituMark_layr1;

function processFailed(e) {
    widgets.alert.showAlert(e.error.errorMsg, false);
}

function drawCompleted(drawGeometryArgs) {
    drawPoint.deactivate();
    var feature = new SuperMap.Feature.Vector();
    feature.geometry = drawGeometryArgs.feature.geometry,
        feature.style = mousePointstyle;
    mousePointLayer.addFeatures(feature);
    var getFeatureParameter, getFeatureService;
    getFeatureParameter = new SuperMap.REST.GetFeaturesByBufferParameters({
        bufferDistance: 0.002,
        datasetNames: ["MapManager:roads_2018010501"],
        returnContent: true,
        geometry: drawGeometryArgs.feature.geometry
    });
    getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(url_mapdata, {
        eventListeners: {
            "processCompleted": MousePointprocessCompleted,
            "processFailed": processFailed
        }
    });
    getFeatureService.processAsync(getFeatureParameter);
}

function MousePointprocessCompleted(getFeaturesEventArgs) {
    var i, len, features, result = getFeaturesEventArgs.result,
        tempTime = currentTime;

    if (result && result.features) {
        features = result.features;
        for (i = 0, len = features.length; i < len; i++) {
            if (i == 0) {
                var point = features[i].geometry,
                    size = new SuperMap.Size(33, 22),
                    offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                    icon = new SuperMap.Icon("images/Car1.ico", size, offset);
                var pointlenth1 = Math.round(point.components.length / 2);
                var pointlenth2 = Math.round(point.components[pointlenth1].components.length);
                features[i].style = {
                    strokeColor: "red",
                    strokeWidth: 10,
                    fillColor: "#red",
                    fillOpacity: "0.8"
                };
                var marker = new SuperMap.Marker(new SuperMap.LonLat(point.components[pointlenth1].components[0].x, point.components[pointlenth1].components[0].y), icon)
                var feature = features[i];
                marker.attributes = feature.attributes;
                marker.events.on({
                    "click": openInfoWin,
                    "touchstart": openInfoWin,
                    "scope": marker
                });
                markerLayer.addMarker(marker);
                var tempydate = [];
                for (n = 0; n < 24; n++) {
                    var tempFieldName = "SPEED" + getNum_currenttime(tempTime);
                    tempydate.push(parseInt(feature.attributes[tempFieldName], 10));
                    tempTime = timeRunnerOneUnit(tempTime, "hours");
                }
                console.log(feature);
                vectorLoad_chart(tempydate);

            }
        }
    }

    loadVectorLayer.addFeatures(features);
}

function openInfoWin() {
    closeInfoWin();
    var marker = this;
    var lonlat = marker.getLonLat();
    var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
    contentHTML += '<table id="table1" style="color: white; background-color: #053ba8;height: 210px;width: 250px;text-align: center;vertical-align: middle;border-collapse:collapse;cursor:pointer;opacity: 0.8;box-shadow: 0 0 8px #053ba8;"><tr style="width: 250px;height: 25px;line-height: 25px;background-color: #1EABE3;text-align: center; vertical-align: middle;"><th class="SX1" style="border: 1px white solid;font-size: 16px;font-weight:800;">Road ID</th></tr><tr style="width: 250px;height: 40px;line-height: 40px;"><td class="SX2" style="border: 1px white solid;font-size: 14px;font-weight: 500;">' + marker.attributes.SMID + '</td></tr><tr style="width: 250px;height: 25px;line-height: 25px;background-color: #1EABE3;text-align: center; vertical-align: middle;"><th class="SX3" style="border: 1px white solid;font-size: 16px;font-weight:800;">Name</th></tr><tr style="width: 250px;height: 40px;line-height: 40px;"><td class="SX4" style="border: 1px white solid;font-size: 14px;font-weight: 500;">' + "Linjiang Middle Road: Linjiang East Road, Renmin South Road" + '</td></tr><tr style="width: 250px;height: 25px;line-height: 25px; background-color: #1EABE3;text-align: center; vertical-align: middle;"><th class="SX5" style="border: 1px white solid;font-size: 16px;font-weight:800;">Speed</th></tr><tr style="width: 250px;height: 40px;line-height: 40px;"><td class="SX6" style="border: 1px white solid;font-size: 14px;font-weight: 500;">' + marker.attributes['' + "SPEED" + getNum_currenttime(currentTime)] + '</td></tr></table>'
    var size = new SuperMap.Size(0, 11);
    var offset = new SuperMap.Pixel(0, -size.h);
    var icon = new SuperMap.Icon("images/Car1.ico", size, offset);
    var popup = new SuperMap.Popup.FramedCloud("popwin",
        new SuperMap.LonLat(lonlat.lon, lonlat.lat),
        null,
        contentHTML,
        icon,
        true);

    infowin = popup;
    roadLine_map.addPopup(popup);
}

function clearmap() {
    document.getElementById('map').innerHTML = "";
}

function add_roadLine_mapInto_map() {
    clearmap();
    Init_roadLine_map();
}

function loadRastermap() {
    optionRaster = 'timeAnimoter';
    clearmap();
    closeControl_searchRastermap();
    closeControl_roadLine_map();
    Control_closeheatmap();
    Init_Rastermap();
    openControl_rasterAnimoter();
}

function judgeColor(feature) {
    if (feature.attributes.value < 24.9215500) {
        feature.style = rasterColorStyle1;
    } else if (feature.attributes.value < 30.6945167) {
        feature.style = rasterColorStyle2;
    } else if (feature.attributes.value < 35.8790333) {
        feature.style = rasterColorStyle3;
    } else if (feature.attributes.value < 41.9216833) {
        feature.style = rasterColorStyle4;
    } else if (feature.attributes.value < 49.9163667) {
        feature.style = rasterColorStyle5;
    } else if (feature.attributes.value < 62.0652833) {
        feature.style = rasterColorStyle6;
    } else if (feature.attributes.value < 81.0988667) {
        feature.style = rasterColorStyle7;
    } else {
        feature.style = rasterColorStyle8;
    }
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

var url_roadnet = "http://localhost:8090/iserver/services/map-WGS1984_MCT/rest/maps/roads_2018010501@RasterMapWGS1984",
    url_roadnet_data = "http://localhost:8090/iserver/services/data-ChengDuLuWang/rest/data",
    url_roadPoints = "http://localhost:8090/iserver/services/map-WGS1984_MCT/rest/maps/loadPoints2018010501@RasterMapWGS1984",
    url_mapdata = 'http://localhost:8090/iserver/services/data-WGS1984_MCT/rest/data';

Init_roadLine_map();

function Init_roadLine_map() {

    roadLine_map = new SuperMap.Map("map", {
        controls: [

            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }), drawPoint
        ],
        allOverlays: true
    });
    roadLine_map.events.on({
        "click": callbackFunction
    });
    roadLine_map.addControl(new SuperMap.Control.LayerSwitcher(), new SuperMap.Pixel(42, 80));

    map_China_WGS1984.events.on({ "layerInitialized": roadLine_map_addLayer1 });
}
var loadnetColorClassLayer;
var loadnetColorClassUrl;
var tiandituLayer;
var tianMarkerLayer;

function roadLine_map_addLayer1() {
    loadnetColorClassUrl = "http://localhost:8090/iserver/services/map-WGS1984_MCT/rest/maps/roads_2018010501@MapManager";
    loadnetColorClassLayer = new SuperMap.Layer.TiledDynamicRESTLayer("成都道路色彩", loadnetColorClassUrl, {
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
    loadnetlayer = new SuperMap.Layer.TiledDynamicRESTLayer("成都路网", url_roadnet, {
        transparent: true,
        cacheEnabled: true
    });

    vectorlayer_Allgeometry = new SuperMap.Layer.Vector("VectorLayer_Allgeometry");

    loadnetlayer.events.on({
        "layerInitialized": roadLine_map_addLayer2
    });

}

function roadLine_map_addLayer2() {

    roadLine_map.addLayers([map_China_WGS1984, loadnetlayer, tiandituLayer, tianMarkerLayer, loadnetColorClassLayer, loadVectorLayer, mousePointLayer, markerLayer]);
    roadLine_map.setCenter(new SuperMap.LonLat(104.1, 30.7), 11);
}

function callbackFunction() {
    closeInfoWin();
    mousePointLayer.removeAllFeatures();
    markerLayer.clearMarkers();
    loadVectorLayer.removeAllFeatures();
    drawPoint.activate();
}

function closeInfoWin() {
    if (infowin) {
        try {
            infowin.hide();
            infowin.destroy();
        } catch (e) {}
    }
}

var map_China_WGS1984byraster;

function Init_Rastermap() {
    RasterMap = new SuperMap.Map("map", {
        controls: [

            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.OverviewMap(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })
        ],
        allOverlays: true
    });

    RasterMap.addControl(new SuperMap.Control.LayerSwitcher(), new SuperMap.Pixel(42, 480));
    map_China_WGS1984byraster = new SuperMap.Layer.TiledDynamicRESTLayer("中国（底图）", url_China_WGS1984, {
        transparent: true,
        cacheEnabled: true
    });
    map_China_WGS1984byraster.events.on({ "layerInitialized": rastermap_addLayer1 });
}


function rastermap_addLayer1() {
    load_raster_geometry = new SuperMap.Layer.TiledDynamicRESTLayer("成都路网", url_roadnet, {
        transparent: true,
        cacheEnabled: true
    });

    rasterlayer = new SuperMap.Layer.TiledDynamicRESTLayer("路况栅格", getRasterTypeByGroupArray(currentTime, rasterurlByGoup), {
        transparent: true,
        cacheEnabled: true
    });
    rastertoVect = new SuperMap.Layer.Vector("VectorBySelect");
    load_raster_geometry.events.on({
        "layerInitialized": rastermap_addLayer2
    });
}

function rastermap_addLayer2() {
    RasterMap.addLayers([map_China_WGS1984byraster, rasterlayer, load_raster_geometry, rastertoVect]);
    RasterMap.setCenter(new SuperMap.LonLat(104.1, 30.7), 11);
    var callbacks = {
        over: changestyle,
        out: restorestyle
    };
    selectFeature = new SuperMap.Control.SelectFeature(rastertoVect, {
        callbacks: callbacks
    });
    RasterMap.addControl(selectFeature);
    selectFeature.activate();
    rasterlayer.visibility = true;
    rasterlayer.redraw();
    if (optionRaster == 'timeAnimoter')
        queryBySQL_raster();
}

function changestyle(feature) {
    stylebeforeSel = feature.style;
    feature.style = stylechangeBySel;
    rastertoVect.redraw();
    $('#over_feature_color').css("background-color", stylebeforeSel.fillColor);
    $('#over_feature_text').html(feature.attributes.value);
}

function restorestyle(feature) {
    feature.style = stylebeforeSel;
    rastertoVect.redraw();
}

function queryBySQL_raster() {
    rastertoVect.removeAllFeatures();
    var queryParam, queryBySQLParams, queryBySQLService;
    var currentRasterVecterName = getRasterTypeByGroupArray(currentTime, raster_toMeshNameByGoup);

    queryParam = new SuperMap.REST.FilterParameter({
        name: currentRasterVecterName,
        attributeFilter: "value>0"
    });
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: [queryParam]
    });
    queryBySQLService = new SuperMap.REST.QueryBySQLService(getRasterTypeByGroupArray(currentTime, raster_toMesh_urlByGoup), {
        eventListeners: {
            "processCompleted": processCompleted_raster,
            "processFailed": processFailed
        }
    });
    queryBySQLService.processAsync(queryBySQLParams);
}

function processCompleted_raster(queryEventArgs) {
    var i, j, feature,
        result = queryEventArgs.result;
    if (result && result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];
                    judgeColor(feature);
                    rastertoVect.addFeatures(feature);
                }
            }
        }
    }
}

function clear_rasterlayer() {
    try {
        RasterMap.removeLayer(rasterlayer, true);
    } catch (e) {}

}

function clear_road_layer() {
    try {
        RasterMap.removeLayer(load_raster_geometry, true);
    } catch (e) {

    }
}

function add_rasterlayer() {
    rasterlayer = new SuperMap.Layer.TiledDynamicRESTLayer("路况栅格", getRasterUrlByTime(currentTime), {
        transparent: true,
        cacheEnabled: true
    });
    rasterlayer.events.on({ "layerInitialized": addRasterThemelayer })
}

function addRasterThemelayer() {
    RasterMap.setLayerIndex(load_raster_geometry, 2);
    RasterMap.addLayer(rasterlayer);
    rasterlayer.redraw();

    RasterMap.setLayerIndex(rasterlayer, 1);
    try {
        rastertoVect.removeAllFeatures();
    } catch (e) {}
    queryBySQL_raster();
}

function add_road_layer() {
    load_raster_geometry = new SuperMap.Layer.TiledDynamicRESTLayer("成都路网", url_roadnet, {
        transparent: true,
        cacheEnabled: true
    });
    load_raster_geometry.events.on({ "layerInitialized": addroadThemelayer })
}

function addroadThemelayer() {
    RasterMap.addLayer(load_raster_geometry);
}
var obj_rasterAnimoter;

function startRasterAnimoter(time_unit) {
    obj_rasterAnimoter = setInterval("rasterAnimoter_Run(\'" + time_unit + "\');", 2500);
}

function stopRasterAnimoter() {
    clearInterval(obj_rasterAnimoter);
    clear_rasterlayer();
    add_rasterlayer();
}

function rasterAnimoter_Run(time_unit) {
    clickToright();
    if (parseInt(getNum_currenttime(currentTime)) > 2018011122) {
        clearInterval(obj_rasterAnimoter);
        clickToright();
    }
}

function startRasterMeshAnimoter(time_unit) {

    obj_rasterAnimoter = setInterval("rasterAnimoter_Run(\'" + time_unit + "\');", 2500);
}

function rastertoVectAnimoter_Run(time_unit) {

    currentTime = timeRunnerOneUnit(currentTime, time_unit);
    $('.HMD3').text(currentTime);
    clear_rasterToMesh();
    clear_rasterlayer();
    if (currentTime == '2018-1-5 11:00:00') {
        clearInterval(obj_rasterAnimoter);
        setTimeout("add_rasterlayer();", 0);
        add_rasterToMesh();
    }
}

function add_rasterToMesh() {

    queryBySQL_raster();
}

function clear_rasterToMesh() {
    rastertoVect.removeAllFeatures();
}

function Searchrank(rankNum) {
    RankNumselected = rankNum;
    var selectlayer = "roads_2018010501@MapManager";
    var url_roadChaneg1 = "http://localhost:8090/iserver/services/map-WGS1984_MCT/rest/maps/roads_2018010501@MapManager";
    var fieldname_ranking = getRasterTypeByGroupArray(currentTime, road_speadFieldGroup) + 'rank';
    SearchBySQL_Onlyone(selectlayer, fieldname_ranking, RankNumselected, url_roadChaneg1);

}

function SearchBySQL_Onlyone(layername, selectfieldname, IDNum, url) {
    loadVectorLayer.removeAllFeatures();
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

function processCompleted_Onlyone(queryEventArgs) {
    var i, j, feature, tempTime = currentTime,
        n,
        result = queryEventArgs.result;
    if (result && result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {

                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];
                    feature.style = stylebySelect;
                    loadVectorLayer.addFeatures(feature);
                    var tempydate = [];
                    for (n = 0; n < 24; n++) {
                        var tempFieldName = "Speed" + getNum_currenttime(tempTime);
                        tempydate.push(parseInt(feature.attributes[tempFieldName], 10));
                        tempTime = timeRunnerOneUnit(tempTime, "hours");
                    }

                    vectorLoad_chart(tempydate);

                }
            }
        }
    }

    featureSel = feature;
    var TB_attribute_LoadGrade = parseInt(featureSel.attributes.SmLength);
    var TB_attribute_LoadID = featureSel.attributes[getRasterTypeByGroupArray(currentTime, road_speadFieldGroup) + 'rank'];
    var TB_attribute_LoadState = ('' + featureSel.attributes[getRasterTypeByGroupArray(currentTime, road_speadFieldGroup)]).slice(0, 7);
    var TB_attribute_LoadName = featureSel.attributes.TTI_NAME;
    lotx = (feature.geometry.bounds.left + feature.geometry.bounds.right) / 2;
    loty = (feature.geometry.bounds.bottom + feature.geometry.bounds.top) / 2;
    getattributeoption('attributeTB_1', 'attributeTB_2', 'attributeTB_3', 'attributeTB_name', TB_attribute_LoadGrade, TB_attribute_LoadID, TB_attribute_LoadState, TB_attribute_LoadName);
    mapenlarge();
    roadLine_mapPan();
    vectorLoad_chart();
}

var Ingrace;

function mapenlarge() {
    judgeIngrace();

    if (Ingrace == 3) {

        roadLine_map.zoomIn();
        setTimeout("roadLine_map.zoomIn()", "150");
        setTimeout("roadLine_map.zoomIn()", "300");
    } else if (Ingrace == 1) {
        roadLine_map.zoomIn();
    } else if (Ingrace == 2) {

        roadLine_map.zoomIn();
        setTimeout("roadLine_map.zoomIn()", "150");
    } else if (Ingrace == 4) {

        roadLine_map.zoomIn();
        setTimeout("roadLine_map.zoomIn()", "150");
        setTimeout("roadLine_map.zoomIn()", "300");
        setTimeout("roadLine_map.zoomIn()", "450");
    } else if (Ingrace == 5) {

        roadLine_map.zoomIn();
        setTimeout("roadLine_map.zoomIn()", "150");
        setTimeout("roadLine_map.zoomIn()", "300");
        setTimeout("roadLine_map.zoomIn()", "450");
        setTimeout("roadLine_map.zoomIn()", "600");
    } else if (Ingrace == 6) {
        roadLine_map.zoomIn();
        setTimeout("roadLine_map.zoomIn()", "150");
        setTimeout("roadLine_map.zoomIn()", "300");
        setTimeout("roadLine_map.zoomIn()", "450");
        setTimeout("roadLine_map.zoomIn()", "600");
        setTimeout("roadLine_map.zoomIn()", "750");
    }
    if (Ingrace == -3) {

        roadLine_map.zoomOut();
        setTimeout("roadLine_map.zoomOut()", "30");
        setTimeout("roadLine_map.zoomOut()", "60");
    } else if (Ingrace == -1) {
        roadLine_map.zoomOut();
    } else if (Ingrace == -2) {

        roadLine_map.zoomOut();
        setTimeout("roadLine_map.zoomOut()", "30");
    } else if (Ingrace == -4) {

        roadLine_map.zoomOut();
        setTimeout("roadLine_map.zoomOut()", "30");
        setTimeout("roadLine_map.zoomOut()", "60");
        setTimeout("roadLine_map.zoomOut()", "90");
    } else if (Ingrace == -5) {

        roadLine_map.zoomOut();
        setTimeout("roadLine_map.zoomOut()", "30");
        setTimeout("roadLine_map.zoomOut()", "60");
        setTimeout("roadLine_map.zoomOut()", "90");
        setTimeout("roadLine_map.zoomOut()", "120");
    } else if (Ingrace == -6) {
        roadLine_map.zoomOut();
        setTimeout("roadLine_map.zoomOut()", "30");
        setTimeout("roadLine_map.zoomOut()", "60");
        setTimeout("roadLine_map.zoomOut()", "90");
        setTimeout("roadLine_map.zoomOut()", "120");
        setTimeout("roadLine_map.zoomOut()", "150");
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

function roadLine_mapPan() {
    var pxX = (roadLine_map.center.lon - lotx) / 40;
    var pxY = (roadLine_map.center.lat - loty) / 40;
    var moveX1, moveX2, moveX3, moveX4, moveX5, moveX6, moveX7, moveX8, moveX9, moveX10, moveX11, moveX12, moveX13, moveX14, moveX15, moveX16, moveX17, moveX18, moveX19, moveX20,
        moveY1, moveY2, moveY3, moveY4, moveY5, moveY6, moveY7, moveY8, moveY9, moveY10, moveY11, moveY12, moveY13, moveY14, moveY15, moveY16, moveY17, moveY18, moveY19, move20;
    move1X = roadLine_map.center.lon - pxX;
    move2X = roadLine_map.center.lon - pxX * 2;
    move3X = roadLine_map.center.lon - pxX * 3;
    move4X = roadLine_map.center.lon - pxX * 4;
    move5X = roadLine_map.center.lon - pxX * 5;
    move6X = roadLine_map.center.lon - pxX * 6;
    move7X = roadLine_map.center.lon - pxX * 7;
    move8X = roadLine_map.center.lon - pxX * 8;
    move9X = roadLine_map.center.lon - pxX * 9;
    move10X = roadLine_map.center.lon - pxX * 10;
    move11X = roadLine_map.center.lon - pxX * 11;
    move12X = roadLine_map.center.lon - pxX * 12;
    move13X = roadLine_map.center.lon - pxX * 13;
    move14X = roadLine_map.center.lon - pxX * 14;
    move15X = roadLine_map.center.lon - pxX * 15;
    move16X = roadLine_map.center.lon - pxX * 16;
    move17X = roadLine_map.center.lon - pxX * 17;
    move18X = roadLine_map.center.lon - pxX * 18;
    move19X = roadLine_map.center.lon - pxX * 19;
    move20X = roadLine_map.center.lon - pxX * 20;
    move21X = roadLine_map.center.lon - pxX * 21;
    move22X = roadLine_map.center.lon - pxX * 22;
    move23X = roadLine_map.center.lon - pxX * 23;
    move24X = roadLine_map.center.lon - pxX * 24;
    move25X = roadLine_map.center.lon - pxX * 25;
    move26X = roadLine_map.center.lon - pxX * 26;
    move27X = roadLine_map.center.lon - pxX * 27;
    move28X = roadLine_map.center.lon - pxX * 28;
    move29X = roadLine_map.center.lon - pxX * 29;
    move30X = roadLine_map.center.lon - pxX * 30;
    move31X = roadLine_map.center.lon - pxX * 31;
    move32X = roadLine_map.center.lon - pxX * 32;
    move33X = roadLine_map.center.lon - pxX * 33;
    move34X = roadLine_map.center.lon - pxX * 34;
    move35X = roadLine_map.center.lon - pxX * 35;
    move36X = roadLine_map.center.lon - pxX * 36;
    move37X = roadLine_map.center.lon - pxX * 37;
    move38X = roadLine_map.center.lon - pxX * 38;
    move39X = roadLine_map.center.lon - pxX * 39;
    move40X = lotx;
    move1Y = roadLine_map.center.lat - pxY;
    move2Y = roadLine_map.center.lat - pxY * 2;
    move3Y = roadLine_map.center.lat - pxY * 3;
    move4Y = roadLine_map.center.lat - pxY * 4;
    move5Y = roadLine_map.center.lat - pxY * 5;
    move6Y = roadLine_map.center.lat - pxY * 6;
    move7Y = roadLine_map.center.lat - pxY * 7;
    move8Y = roadLine_map.center.lat - pxY * 8;
    move9Y = roadLine_map.center.lat - pxY * 9;
    move10Y = roadLine_map.center.lat - pxY * 10;
    move11Y = roadLine_map.center.lat - pxY * 11;
    move12Y = roadLine_map.center.lat - pxY * 12;
    move13Y = roadLine_map.center.lat - pxY * 13;
    move14Y = roadLine_map.center.lat - pxY * 14;
    move15Y = roadLine_map.center.lat - pxY * 15;
    move16Y = roadLine_map.center.lat - pxY * 16;
    move17Y = roadLine_map.center.lat - pxY * 17;
    move18Y = roadLine_map.center.lat - pxY * 18;
    move19Y = roadLine_map.center.lat - pxY * 19;
    move20Y = roadLine_map.center.lat - pxY * 20;
    move21Y = roadLine_map.center.lat - pxY * 21;
    move22Y = roadLine_map.center.lat - pxY * 22;
    move23Y = roadLine_map.center.lat - pxY * 23;
    move24Y = roadLine_map.center.lat - pxY * 24;
    move25Y = roadLine_map.center.lat - pxY * 25;
    move26Y = roadLine_map.center.lat - pxY * 26;
    move27Y = roadLine_map.center.lat - pxY * 27;
    move28Y = roadLine_map.center.lat - pxY * 28;
    move29Y = roadLine_map.center.lat - pxY * 29;
    move30Y = roadLine_map.center.lat - pxY * 30;
    move31Y = roadLine_map.center.lat - pxY * 31;
    move32Y = roadLine_map.center.lat - pxY * 32;
    move33Y = roadLine_map.center.lat - pxY * 33;
    move34Y = roadLine_map.center.lat - pxY * 34;
    move35Y = roadLine_map.center.lat - pxY * 35;
    move36Y = roadLine_map.center.lat - pxY * 36;
    move37Y = roadLine_map.center.lat - pxY * 37;
    move38Y = roadLine_map.center.lat - pxY * 38;
    move39Y = roadLine_map.center.lat - pxY * 39;
    move40Y = loty;
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move1X, move1Y), Ingrace+11)", "500");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move2X, move2Y), Ingrace+11)", "530");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move3X, move3Y), Ingrace+11)", "560");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move4X, move4Y), Ingrace+11)", "590");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move5X, move5Y), Ingrace+11)", "620");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move6X, move6Y), Ingrace+11)", "650");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move7X, move7Y), Ingrace+11)", "680");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move8X, move8Y), Ingrace+11)", "710");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move9X, move9Y), Ingrace+11)", "740");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move10X, move10Y), Ingrace+11)", "770");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move11X, move11Y), Ingrace+11)", "800");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move12X, move12Y), Ingrace+11)", "830");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move13X, move13Y), Ingrace+11)", "860");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move14X, move14Y), Ingrace+11)", "890");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move15X, move15Y), Ingrace+11)", "910");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move16X, move16Y), Ingrace+11)", "940");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move17X, move17Y), Ingrace+11)", "970");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move18X, move18Y), Ingrace+11)", "1000");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move19X, move19Y), Ingrace+11)", "1030");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move20X, move20Y), Ingrace+11)", "1060");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move21X, move21Y), Ingrace+11)", "1090");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move22X, move22Y), Ingrace+11)", "1120");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move23X, move23Y), Ingrace+11)", "1150");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move24X, move24Y), Ingrace+11)", "1180");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move25X, move25Y), Ingrace+11)", "1210");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move26X, move26Y), Ingrace+11)", "1240");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move27X, move27Y), Ingrace+11)", "1270");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move28X, move28Y), Ingrace+11)", "1300");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move29X, move29Y), Ingrace+11)", "1330");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move30X, move30Y), Ingrace+11)", "1360");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move31X, move31Y), Ingrace+11)", "1390");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move32X, move32Y), Ingrace+11)", "1420");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move33X, move33Y), Ingrace+11)", "1450");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move34X, move34Y), Ingrace+11)", "1480");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move35X, move35Y), Ingrace+11)", "1510");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move36X, move36Y), Ingrace+11)", "1540");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move37X, move37Y), Ingrace+11)", "1570");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move38X, move38Y), Ingrace+11)", "1600");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move39X, move39Y), Ingrace+11)", "1630");
    setTimeout("roadLine_map.setCenter(new SuperMap.LonLat(move40X, move40Y), Ingrace+11)", "1660");
}

function getattributeoption(DIV_ID1, DIV_ID2, DIV_ID3, DIV_ID4, input_HTML1, input_HTML2, input_HTML3, input_HTML4) {
    TB_option(DIV_ID1, input_HTML1);
    TB_option(DIV_ID2, input_HTML2);
    TB_option(DIV_ID3, input_HTML3);
    TB_option(DIV_ID4, input_HTML4);
}

function TB_option(DIV_ID, input_HTML) {
    clearDIVByID(DIV_ID);
    getDIV_TB = document.getElementById(DIV_ID);
    getDIV_TB.innerHTML = input_HTML;
}

function clearDIVByID(DIV_ID) {
    document.getElementById(DIV_ID).innerHTML = '';
}

function loadRankTable() {
    loadVectorLayer.removeAllFeatures();
    Searchrank_changeTable(1);
    Searchrank_changeTable(2);
    Searchrank_changeTable(3);
    Searchrank_changeTable(4);
    Searchrank_changeTable(5);
    Searchrank_changeTable(6);
    Searchrank_changeTable(7);
    Searchrank_changeTable(8);
    Searchrank_changeTable(9);
    Searchrank_changeTable(10);

    getattributeoption('attributeTB_1', 'attributeTB_2', 'attributeTB_3', 'attributeTB_name', '-----', '-----', '-----', "------------");
}

function Searchrank_changeTable(rankNum) {
    RankNumselected = rankNum;
    var selectlayer = "roads_2018010501@RasterMapWGS1984";
    var fieldname_ranking = getRasterTypeByGroupArray(currentTime, road_speadFieldGroup) + 'rank';
    SearchBySQL_Onlyone_changeTable(selectlayer, fieldname_ranking, RankNumselected, url_roadnet);
}

function SearchBySQL_Onlyone_changeTable(layername, selectfieldname, IDNum, url) {

    var queryParam, queryBySQLParams, queryBySQLService;
    queryParam = new SuperMap.REST.FilterParameter({
        name: layername,
        attributeFilter: selectfieldname + "=" + IDNum
    });
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: [queryParam]
    });
    queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {
        eventListeners: { "processCompleted": processCompleted_Onlyone_changeTable, "processFailed": processFailed }
    });
    queryBySQLService.processAsync(queryBySQLParams);
}

function processCompleted_Onlyone_changeTable(queryEventArgs) {
    var i, j, feature,
        result = queryEventArgs.result;
    if (result && result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];
                }

            }
        }
    }
    var TB_attribute_LoadGrade = parseInt(feature.attributes.SmLength);
    var TB_attribute_LoadRand = parseInt(feature.attributes[getRasterTypeByGroupArray(currentTime, road_speadFieldGroup) + 'rank']);
    var TB_attribute_LoadState = ('' + feature.attributes[getRasterTypeByGroupArray(currentTime, road_speadFieldGroup)]).slice(0, 7);
    var TB_attribute_LoadName = feature.attributes.TTI_NAME;
    var rankTbX1 = 'rankTB' + TB_attribute_LoadRand + '_1';
    var rankTbX2 = 'rankTB' + TB_attribute_LoadRand + '_2';
    var rankTbX3 = 'rankTB' + TB_attribute_LoadRand + '_3';

    ChangeTableByFeature(rankTbX1, rankTbX2, rankTbX3, TB_attribute_LoadName, TB_attribute_LoadGrade, TB_attribute_LoadState)
}

function ChangeTableByFeature(rankTbX1, rankTbX2, rankTbX3, Rank_input_HTML_X1, Rank_input_HTML_X2, Rank_input_HTML_X3) {
    TB_option(rankTbX1, Rank_input_HTML_X1);
    TB_option(rankTbX2, Rank_input_HTML_X2);
    TB_option(rankTbX3, Rank_input_HTML_X3);
}

$(document).ready(function() {
    $('#timeUnit_sel').change(function() {
        var current_timeUnit = $('#timeUnit_sel option:selected').val();
        if (current_timeUnit == "day") {
            $("#timeBarHourChoose").css('display', "block");

        } else {
            $("#timeBarHourChoose").css('display', "none");
        }
        write_DayNodeTime(currentTime);

    })
    $('#Chose_CurrentTime').change(function() {
        currentTime = $('#Chose_CurrentTime').val() + ' ' + $('.TT10').text() + ':00';
        $('.HMD3').text(currentTime);
        write_DayNodeTime(currentTime);
    })
    $('#timeBarHourChoose').change(function() {
        $('.TT10').text($('#timeBarHourChoose option:selected').text());
        currentTime = $('#Chose_CurrentTime').val() + ' ' + $('.TT10').text() + ':00';
        $('.HMD3').text(currentTime);
        clear_rasterlayer();
        add_rasterlayer();

    })
    $('.toRight').click(function() {

        if (parseInt(getNum_currenttime(currentTime)) < 2018011123) {
            clickToright();

        } else {
            resetCurrentTime();
        }
    })

    $('.toLeft').click(function() {
        if (parseInt(getNum_currenttime(currentTime)) > 2018010501) {
            clickToleft();
        } else {

            resetCurrentTime();
        }
    })
    $('.timeResetDiv').click(function() {
        resetCurrentTime();

    })
})

function clickToright() {
    if (parseInt(getNum_currenttime(currentTime)) < 2018010501) {
        clearInterval(obj_rasterAnimoter);
        resetCurrentTime();
    } else if (parseInt(getNum_currenttime(currentTime)) < 2018011123) {
        currentTime = timeRunnerOneUnit(currentTime, $("#timeUnit_sel option:selected").val());

        $('.HMD3').text(currentTime);
        write_DayNodeTime(currentTime);
        getCurrentHours();
        $('#Chose_CurrentTime').val(currentTime.slice(0, currentTime.indexOf(' ')));
        clear_rasterlayer();
        setTimeout(' add_rasterlayer();', 0);

    } else {
        clearInterval(obj_rasterAnimoter);
        resetCurrentTime();
    }

}

function clickToleft() {
    currentTime = timeDelOneUnit(currentTime, $("#timeUnit_sel option:selected").val());
    $('.HMD3').text(currentTime);
    write_DayNodeTime(currentTime);
    getCurrentHours();
    $('#Chose_CurrentTime').val(currentTime.slice(0, currentTime.indexOf(' ')));
    clear_rasterlayer();
    add_rasterlayer();
}

function resetCurrentTime() {
    clearInterval(obj_rasterAnimoter);
    currentTime = '2018-1-5 1:00:00';
    $('.HMD3').text(currentTime);
    write_DayNodeTime(currentTime);
    getCurrentHours();
    $('#Chose_CurrentTime').val(currentTime.slice(0, currentTime.indexOf(' ')));
    $('.playAndStop').attr('title', '播放');
    $('.playAndStop').css("background-image", 'url(./picture/播放.png)');
    loadRastermap()
}
write_DayNodeTime(currentTime);

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

            nextTime1 = timeRunnerOneUnit(currentTime, 'day');

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

            preTime1 = timeDelOneUnit(currentTime, 'day');

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
            nextTime1 = timeRunnerOneUnit(currentTime, 'hours');

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
            preTime1 = timeDelOneUnit(currentTime, 'hours');

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

function getCurrentHours() {
    getNum_Month_day_hours(currentTime);
    $('.TT10').text(currentHours + ":00");
}
var layerRasterVis = true;
var layerVocterVis = true;
$(document).ready(function() {
    $('.SCReset').click(function() {
        clearInterval(obj_rasterAnimoter);
        layerRasterVis = load_raster_geometry.visibility;
        layerVocterVis = rastertoVect.visibility;
        $('.SCInput').val(currentTime.slice(0, currentTime.indexOf(' ')));
        if (layerRasterVis == true) {
            $(".SCLSelectRaster").val("open");
        } else {
            $(".SCLSelectRaster").val("close");
        }
        if (layerVocterVis == true) {
            $(".SCLSelectVecter").val("open");
        } else {
            $(".SCLSelectVecter").val("close");
        }
    })
    $('.SCBtn1').click(function() {
        if ($(".SCLSelectRaster option:selected").val() == 'open') {
            load_raster_geometry.setVisibility(true);
        } else {
            load_raster_geometry.setVisibility(false);
        }
        if ($(".SCLSelectVecter option:selected").val() == 'open') {
            rastertoVect.setVisibility(true);
        } else {
            rastertoVect.setVisibility(false);
        }
        currentTime = $('.SCInput').val() + ' ' + $(".SCTSelect1 option:selected").text() + ':00';
        $('.HMD3').text(currentTime);
        write_DayNodeTime(currentTime);
        getCurrentHours();
        $('#Chose_CurrentTime').val(currentTime.slice(0, currentTime.indexOf(' ')));
        if (parseInt(getNum_currenttime(currentTime)) < 2018010501) {
            resetCurrentTime();
        } else if (parseInt(getNum_currenttime(currentTime)) < 2018011123) {
            clear_rasterlayer();
            add_rasterlayer();
        } else {
            resetCurrentTime();
        }
    })
})

function loadRasterSearchMap() {
    clearmap();
    closeControl_roadLine_map();
    closeControl_rasterAnimoter();
    Control_closeheatmap();
    Init_RasterSeartchMap();
    openControl_searchRastermap();
}

function Init_RasterSeartchMap() {
    rasterSearchPointLayer = new SuperMap.Layer.Vector("pointLayer");
    drawRasterSearPoint = new SuperMap.Control.DrawFeature(rasterSearchPointLayer, SuperMap.Handler.Point);
    drawRasterSearPoint.events.on({ "featureadded": drawRasterPointCompleted });
    RasterSearchmap = new SuperMap.Map("map", {
        controls: [

            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.OverviewMap(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }), drawRasterSearPoint
        ],
        allOverlays: true
    });
    RasterSearchmap.events.on({ "click": RasterSearchmapClick() })


    RasterSearchmap.addControl(new SuperMap.Control.LayerSwitcher(), new SuperMap.Pixel(42, 480));
    map_China_WGS1984byrasterSearch = new SuperMap.Layer.TiledDynamicRESTLayer("China", url_China_WGS1984, {
        transparent: true,
        cacheEnabled: true
    });
    rasterSearchlayer = new SuperMap.Layer.TiledDynamicRESTLayer("road_raster", getRasterTypeByGroupArray(currentTime, rasterurlByGoup), {
        transparent: true,
        cacheEnabled: true
    });
    road_vecterByRasterSearch = new SuperMap.Layer.TiledDynamicRESTLayer("road_net", url_roadnet, {
        transparent: true,
        cacheEnabled: true
    });

    map_China_WGS1984byrasterSearch.events.on({ "layerInitialized": rasterSearchmap_addLayer1 });

}

function rasterSearchmap_addLayer1() {
    RasterSearchmap.addLayers([map_China_WGS1984byrasterSearch, road_vecterByRasterSearch, rasterSearchlayer, rasterSearchPointLayer]);
    RasterSearchmap.setCenter(new SuperMap.LonLat(104.15, 30.679526912131), 12);
    setTimeout("RasterSearchmap.zoomOut();", 300);
}

function drawRasterSearchPoint() {
    rasterSearchPointLayer.removeAllFeatures();
    drawRasterSearPoint.activate();
}

function drawRasterPointCompleted(drawGeometryArgs) {
    drawRasterSearPoint.deactivate();

    var feature = new SuperMap.Feature.Vector();
    feature.geometry = drawGeometryArgs.feature.geometry,
        feature.style = RasterSearchPointstyle;
    console.log(feature);
    rasterSearchPointLayer.addFeatures(feature);
    var lon = feature.geometry.x;
    var lat = feature.geometry.y;
    var lonlat = { lon, lat };
    clickPointlonlat = lonlat;


    query(lonlat);
}

function rasterPointLayer_add(lonlat) {
    rasterSearchPointLayer.removeAllFeatures();
    var point = new SuperMap.Geometry.Point(lonlat.lon, lonlat.lat);
    var feature = new SuperMap.Feature.Vector(point);
    feature.style = RasterSearchPointstyle;
    rasterSearchPointLayer.addFeatures([feature]);

}

function query(lonlat) {
    console.log(lonlat);

    if (!!lonlat) {

        var gridCellQueryParam = new SuperMap.REST.GetGridCellInfosParameter({
            datasetName: 'D' + getNum_currenttime(currentTime),
            dataSourceName: "RasterMapWGS1984",
            X: lonlat.lon,
            Y: lonlat.lat
        });
        var gridCellQueryService = new SuperMap.REST.GetGridCellInfosService("http://localhost:8090/iserver/services/data-WGS1984_MCT/rest/data", {
            'eventListeners': {
                'processCompleted': querySuccess,
                'processFailed': queryFailed
            }
        });
        gridCellQueryService.processAsync(gridCellQueryParam);
    } else {
        widgets.alert.showAlert(resources.msg_geographicPosition, false, 240);
    }
}
var clickPointlonlat;

function Echart_query(lonlat) {
    if (!!lonlat) {
        var gridCellQueryParam = new SuperMap.REST.GetGridCellInfosParameter({
            datasetName: 'D' + getNum_currenttime(currentTime),
            dataSourceName: "RasterMapWGS1984",
            X: lonlat.lon,
            Y: lonlat.lat
        });
        var gridCellQueryService = new SuperMap.REST.GetGridCellInfosService("http://localhost:8090/iserver/services/data-WGS1984_MCT/rest/data", {
            'eventListeners': {
                'processCompleted': Echarts_querySuccess,
                'processFailed': queryFailed
            }
        });
        gridCellQueryService.processAsync(gridCellQueryParam);
    } else {
        widgets.alert.showAlert(resources.msg_geographicPosition, false, 240);
    }
}
var timeEchartsNodeValue;

function Echarts_querySuccess(evt) {
    timeEchartsNodeValue = evt.result.value;

}



function creatEcharts(initialValue) {
    myChart = echarts.init(document.getElementById('echartbox1'));
    var ydata = initialValue;
    var titletext_rasterEcharts;
    var xAxisBarDate;
    if (timeUnit == 'hours') {
        xAxisBarDate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        titletext_rasterEcharts = 'Hour';
    } else {
        xAxisBarDate = ['*', '*', '*', '*', '*', '*', '*'];
        titletext_rasterEcharts = 'Day';
    }
    option = {
        title: {
            text: titletext_rasterEcharts,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['Cur_Speed']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    readOnly: false
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: true,
            start: 0,
            end: 100,
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: xAxisBarDate
        }],
        yAxis: [{
            type: 'value',
            scale: true,
            name: 'Speed',
            max: 120,
            min: 0,
            boundaryGap: [0.2, 0.2],
            splitNumber: 10
        }],
        series: [{
            name: 'Cur_Speed',
            type: 'line',
            data: ydata
        }]
    };
    var timeEchartsNode;
    if (timeUnit == "hours") {
        timeEchartsNode = 24;
    } else {
        timeEchartsNode = 7;
    }
    var timeBeginNun = 0;

    Echart_query(clickPointlonlat);
    chartAnimoter = setInterval(function() {
        clearRasterSearchLayer();
        addRAsterSearchLayer();
        timeBeginNun++;
        if (timeUnit == 'hours') {
            axisData = currentTime.slice(currentTime.indexOf(' ') + 1, currentTime.indexOf(':'));
        } else {
            var current_week = new Date(currentTime.slice(0, currentTime.indexOf(" ")) + ' 1:00:00');
            weekNun = current_week.getDay();
            axisData = weeks[weekNun];
        }
        ydata.shift();
        ydata.push(timeEchartsNodeValue - 0);
        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        myChart.setOption({
            xAxis: [{
                type: 'category',
                boundaryGap: true,
                data: option.xAxis[0].data
            }],
            series: [{
                name: 'Cur_Speed',
                type: 'line',
                data: ydata
            }]
        });

        currentTime = timeRunnerOneUnit(currentTime, timeUnit);
        $('.HMD3').text(currentTime);
        if (timeBeginNun == timeEchartsNode) {
            clearInterval(chartAnimoter);
        } else {
            Echart_query(clickPointlonlat);
        }
    }, 1400);

    myChart.clear();
    myChart.setOption(option);

}

function querySuccess(evt) {
    drawEchartbyRasterPoint(evt);
}

function queryFailed(evt) {
    alert("!");
    clearInterval(chartAnimoter);
    myChart.clear();
}


function drawEchartbyRasterPoint(evt) {
    var echartYnum = evt.result.value;
}

function addrasterEcharts() {
    var echartYnumGroup;
    if (timeUnit == "hours") {
        echartYnumGroup = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    } else if (timeUnit == "day") {
        echartYnumGroup = [0, 0, 0, 0, 0, 0, 0]
    }
    creatEcharts(echartYnumGroup);
}

function clearRasterSearchLayer() {
    try {
        RasterSearchmap.removeLayer(rasterSearchlayer, true);
    } catch (e) {}
}

function addRAsterSearchLayer() {
    rasterSearchlayer = new SuperMap.Layer.TiledDynamicRESTLayer("路况栅格", getRasterUrlByTime(currentTime), {
        transparent: true,
        cacheEnabled: true
    });
    rasterSearchlayer.events.on({ "layerInitialized": addRasterSearchThemelayer })

}

function addRasterSearchThemelayer() {
    RasterSearchmap.setLayerIndex(rasterSearchPointLayer, 3);
    RasterSearchmap.addLayer(rasterSearchlayer);
    RasterSearchmap.setLayerIndex(rasterSearchlayer, 2);
}
$(document).ready(function() {
    $('.TSCBtn1').click(function() {
        clearInterval(chartAnimoter);
        if (timeUnit == "day") {
            if ($(".TSCSelect1").val() == "defaultime") {
                $(".TSCSelect1").val("defaultime1");
                currentTime = $(".TSCInput").val() + ' 1:00:00';
                $('.HMD3').text(currentTime);
            } else {
                currentTime = $(".TSCInput").val() + ' ' + $(".TSCSelect1 option:selected").text() + ":00";
                $('.HMD3').text(currentTime);
            }
        } else {
            currentTime = $(".TSCInput").val() + ' 1:00:00';
            $('.HMD3').text(currentTime);
        }
        clearRasterSearchLayer();
        addRAsterSearchLayer();

    })
})
$(document).ready(function() {
    $('.STBtn1').click(function() {
        clearInterval(chartAnimoter);
        timeUnit = "day";
        if ($(".TSCSelect1").val() == "defaultime") {
            $(".TSCSelect1").val("defaultime1");
            currentTime = $(".TSCInput").val() + ' 1:00:00';
            $('.HMD3').text(currentTime);
        } else {
            currentTime = $(".TSCInput").val() + ' ' + $(".TSCSelect1 option:selected").text() + ":00";
            $('.HMD3').text(currentTime);
        }
    })
    $('.STBtn2').click(function() {
        clearInterval(chartAnimoter);
        timeUnit = "hours";

        $(".TSCSelect1").val("defaultime1");
        currentTime = $(".TSCInput").val() + ' 1:00:00';
        $('.HMD3').text(currentTime);
    })

    $(".TSCReset").click(function() {
        clearInterval(chartAnimoter);
        currentTime = '2018-1-5 1:00:00';
        $('.HMD3').text(currentTime);
        $('.TSCInput').datepicker('setDate', '2018-1-5');
        $(".TSCSelect1").val("defaultime");
    })
    $('.SCBtn3').click(function() {
        clearInterval(chartAnimoter);
        if (timeUnit == "day") {
            if ($(".TSCSelect1").val() == "defaultime") {
                $(".TSCSelect1").val("defaultime1");
                currentTime = $(".TSCInput").val() + ' 1:00:00';
                $('.HMD3').text(currentTime);
            } else {
                currentTime = $(".TSCInput").val() + ' ' + $(".TSCSelect1 option:selected").text() + ":00";
                $('.HMD3').text(currentTime);
            }
        } else {
            currentTime = $(".TSCInput").val() + ' 1:00:00';
            $('.HMD3').text(currentTime);
        }
        drawRasterSearchPoint();
    })
    $('.SCBtn4').click(function() {
        clearInterval(chartAnimoter);
        if (timeUnit == "day") {
            if ($(".TSCSelect1").val() == "defaultime") {
                $(".TSCSelect1").val("defaultime1");
                currentTime = $(".TSCInput").val() + ' 1:00:00';
                $('.HMD3').text(currentTime);
            } else {
                currentTime = $(".TSCInput").val() + ' ' + $(".TSCSelect1 option:selected").text() + ":00";
                $('.HMD3').text(currentTime);
            }
        } else {
            currentTime = $(".TSCInput").val() + ' 1:00:00';
            $('.HMD3').text(currentTime);
        }
        addrasterEcharts();
    })

})

var rasterColorStyle1 = {
        strokeColor: "#000",
        strokeWidth: "0.8",
        fillColor: '"rgb(242, 241, 162)"',
        fillOpacity: "0.7"
    },
    rasterColorStyle2 = {
        strokeColor: "#000",
        strokeWidth: "0.8",
        fillColor: "rgb(252, 250, 88)",
        fillOpacity: "0.7"
    },
    rasterColorStyle3 = {
        strokeColor: "#000",
        strokeWidth: "0.8",
        fillColor: "rgb(255,255,0)",
        fillOpacity: "0.7"
    },
    rasterColorStyle4 = {
        strokeColor: "#000",
        strokeWidth: "0.8",
        fillColor: "rgb(255,88,0)",
        fillOpacity: "0.7"
    },
    rasterColorStyle5 = {
        strokeColor: "#000",
        strokeWidth: "0.8",
        fillColor: "rgb(247,5,138)",
        fillOpacity: "0.7"
    },
    rasterColorStyle6 = {
        strokeColor: "#000",
        strokeWidth: "0.8",
        fillColor: "rgb(206,7,237)",
        fillOpacity: "0.7"
    },
    rasterColorStyle7 = {
        strokeColor: "#000",
        strokeWidth: "0.8",
        fillColor: "rgb(111,25,209)",
        fillOpacity: "0.7"
    },
    rasterColorStyle8 = {
        strokeColor: "#000",
        strokeWidth: "0.8",
        fillColor: "rgb(7,29,173)",
        fillOpacity: "0.7"
    }

$(document).ready(function() {
    $('.searchLoad_Time').change(function() {
        currentTime = '' + $(".searchLoad_Time").val() + ' ' + $('.selectLoad_Time option:selected').text() + ":00";
        $('.HMD3').text(currentTime);
        loadRankTable();
    })
    $('.selectLoad_Time').change(function() {
        currentTime = '' + $(".searchLoad_Time").val() + ' ' + $('.selectLoad_Time option:selected').text() + ":00";
        $('.HMD3').text(currentTime);
        loadRankTable();
    })
    $("select.searchLoadByClass").change(function() {
        getAllLoadfieldInfoBySql(url_roadnet, 'roads_2018010501@RasterMapWGS1984');
    })
    $('#seachload_bySel_bnt1').click(function() {

        var selectlayer = "roads_2018010501@RasterMapWGS1984";
        if ($(".searchLoadByClass option:selected").val() == "LoadRank") {
            var RankNumselected = $('#loadFeildSelet option:selected').val();
            var fieldname_ranking = getRasterTypeByGroupArray(currentTime, road_speadFieldGroup) + 'rank';
            SearchBySQL_Onlyone(selectlayer, fieldname_ranking, RankNumselected, url_roadnet);
        } else if (($(".searchLoadByClass option:selected").val() == "LoadName")) {
            var feildName = "TTI_NAME";

            var feild_selected = $('#loadFeildSelet option:selected').val();
            SearchBySQL_Onlyone(selectlayer, feildName, feild_selected, url_roadnet);
        } else if (($(".searchLoadByClass option:selected").val() == "LoadID")) {
            var feildName = "SmID";

            var feild_selected = $('#loadFeildSelet option:selected').val();
            SearchBySQL_Onlyone(selectlayer, feildName, feild_selected, url_roadnet);

        }
    })
    $('#seachload_byText_bnt1').click(function() {

        var selectlayer = "roads_2018010501@RasterMapWGS1984";
        if ($(".searchLoadByClass option:selected").val() == "LoadRank") {
            var RankNumselected = $('#loadFeildText').val();
            var fieldname_ranking = getRasterTypeByGroupArray(currentTime, road_speadFieldGroup) + 'rank';
            SearchBySQL_Onlyone(selectlayer, fieldname_ranking, RankNumselected, url_roadnet);
        } else if (($(".searchLoadByClass option:selected").val() == "LoadID")) {
            var feildName = "SmID";

            var feild_selected = $('#loadFeildText').val();
            SearchBySQL_Onlyone(selectlayer, feildName, feild_selected, url_roadnet);

        }
    })

})

getAllLoadfieldInfoBySql(url_roadnet, 'roads_2018010501@RasterMapWGS1984');

function getAllLoadfieldInfoBySql(load_url, loadmapName) {
    $("#loadFeildSelet").empty();

    var queryParam, queryBySQLParams, queryBySQLService;
    queryParam = new SuperMap.REST.FilterParameter({
        name: loadmapName,
        attributeFilter: "SmID>0"
    });
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: [queryParam]
    });
    queryBySQLService = new SuperMap.REST.QueryBySQLService(load_url, {
        eventListeners: { "processCompleted": getLoadFieldInfoProcessCompleted, "processFailed": processFailed }
    });
    queryBySQLService.processAsync(queryBySQLParams);
}

function getLoadFieldInfoProcessCompleted(queryEventArgs) {
    var i, j, feature, k = 0,
        result = queryEventArgs.result;
    if (result && result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];
                    if ($(".searchLoadByClass option:selected").val() == "LoadName")
                        $("#loadFeildSelet").append("<option value=" + feature.attributes.TTI_NAME + '>' + feature.attributes.TTI_NAME + "</option>");
                    else if ($(".searchLoadByClass option:selected").val() == "LoadID")
                        $("#loadFeildSelet").append("<option value=" + feature.attributes.SmID + '>' + feature.attributes.SmID + "</option>");
                    else if ($(".searchLoadByClass option:selected").val() == "LoadRank")
                        if (parseInt(feature.attributes.Speed2018010501rank, 10) > 0) {
                            k++;
                            $("#loadFeildSelet").append("<option value=" + k + '>' + k + "</option>");
                        }

                }
            }
        }

    }
}

function vectorLoad_chart(inputydata) {

    var VectorLoadChart = echarts.init(document.getElementById('VecterLoadEchart1'));

    var titletext_rasterEcharts;
    var ydata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ydata[0] = inputydata[0];
    var xAxisBarDate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    titletext_rasterEcharts = 'Speed In a Day';
    option = {
        title: {
            text: titletext_rasterEcharts,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data: ['Speed(km/h)'],

        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    readOnly: false
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: true,
            start: 0,
            end: 100,
        },
        xAxis: [{
            type: 'category',

            name: 'Hour',
            boundaryGap: true,
            data: xAxisBarDate

        }],
        yAxis: [{
            type: 'value',
            fontSize: 18,
            scale: true,
            name: '(km/h)',
            max: 70,
            min: 0,
            splitNumber: 13,
            boundaryGap: [1, 1]
        }],
        series: [{
            name: '(km/h)',
            type: 'line',
            smooth: true,
            data: inputydata
        }]
    };
    VectorLoadChart.clear();
    VectorLoadChart.setOption(option);
}

function openControl_Map1() {
    $('#rightBar1').css('display', 'block');
    $('#rightBar2').css('display', 'block');
}

function closeControl_Map1() {
    $('#rightBar1').css('display', 'none');
    $('#rightBar2').css('display', 'none');
    $('.qrbox').css('display', 'none');
    $('.lbnav').css('display', 'none');
}

function openControl_searchRastermap() {
    $('#colorSymbol').css('display', 'block');
    $('.switchTime').css('display', 'block');
    $('.timeStateContral').css('display', 'block');
}

function closeControl_searchRastermap() {
    $('#colorSymbol').css('display', 'none');
    $('.switchTime').css('display', 'none');
    $('.timeStateContral').css('display', 'none');
}

function openControl_rasterAnimoter() {
    document.getElementById("colorSymbol").style.display = "block";
    $('.BtimeLine').css("display", "block");
    $('.stateContral').css('display', 'block');
}

function closeControl_rasterAnimoter() {
    document.getElementById("colorSymbol").style.display = "none";
    $('.BtimeLine').css("display", "none");
    $('.stateContral').css('display', 'none');
}

function loadHeatmap() {
    clearmap();
    closeControl_searchRastermap();
    closeControl_Map1();
    closeControl_rasterAnimoter();
    Control_openHeatmap()
    InitHeatmap();
}

function InitHeatmap() {
    HeatMap = new SuperMap.Map("map", {
        controls: [
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.OverviewMap(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })
        ],
        allOverlays: true
    });

    HeatMap.addControl(new SuperMap.Control.LayerSwitcher(), new SuperMap.Pixel(42, 180));
    HeatMap_China_WGS1984 = new SuperMap.Layer.TiledDynamicRESTLayer("ChinaMap", url_China_WGS1984, {
        transparent: true,
        cacheEnabled: true
    });
    roadHeatLayer = new SuperMap.Layer.HeatMapLayer(
        "heatMap", {
            "radius": 45,
            "featureWeight": "Speed2018010501",
            "featureRadius": "geoRadius"
        }
    );
    HeatMap_China_WGS1984.events.on({ "layerInitialized": Heatmap_addLayer1 });
}

function Heatmap_addLayer1() {

    HeatmapVectLoad = new SuperMap.Layer.TiledDynamicRESTLayer("LoadNet", url_roadnet, {
        transparent: true,
        cacheEnabled: true
    });

    HeatmapVectLoad.events.on({
        "layerInitialized": Heatmap_addLayer2
    });
}

function Heatmap_addLayer2() {
    HeatMap.addLayers([HeatMap_China_WGS1984, HeatmapVectLoad]);
    HeatMap.setCenter(new SuperMap.LonLat(104.1, 30.7), 12);
}

function clearHeatLayer() {
    heatLay_DatechangeStatic = 1;
    roadHeatLayer.removeAllFeatures();
}

function createHeatPoints() {
    var radius = 30;
    if (parseInt($('.STAWWeight2').val(), 10) < 15) {
        radius = 30;
        $('.STAWWeight2').val('');
    } else if (parseInt($('.STAWWeight2').val(), 10) < 75) {
        radius = parseInt($('.STAWWeight2').val(), 10);
    } else {
        radius = 30;
        $('.STAWWeight2').val('');
    }
    var unit = 'px',
        useGeoRadius = false;
    if ("degree" == unit) {
        useGeoRadius = true;
    }
    roadHeatLayer.radius = radius;
    roadHeatLayer.addFeatures(features_heatmap);

    HeatMap.addLayer(roadHeatLayer);
}

function getfeature_heatMap(load_url, loadmapName) {

    var queryParam, queryBySQLParams, queryBySQLService;
    queryParam = new SuperMap.REST.FilterParameter({
        name: loadmapName,
        attributeFilter: "SmID>0"
    });
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: [queryParam]
    });
    queryBySQLService = new SuperMap.REST.QueryBySQLService(load_url, {
        eventListeners: { "processCompleted": getfeature_heatProcessCompleted, "processFailed": processFailed }
    });
    queryBySQLService.processAsync(queryBySQLParams);
}

function getfeature_heatProcessCompleted(queryEventArgs) {

    var i, j, feature, k = 0,
        result = queryEventArgs.result;
    if (result && result.recordsets) {
        features_heatmap = result.recordsets[0].features;
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];
                }
            }
        }
    }
    createHeatPoints();
}
$(document).ready(function() {
    $(".STAWDivBtn1").click(function() {
        if (heatLay_DatechangeStatic == 1) {
            heatLay_DatechangeStatic = 0;
            clearHeatLayer();
            getfeature_heatMap(url_roadPoints, 'loadPoints' + '2018010501' + '@RasterMapWGS1984');
        } else if (heatLay_DatechangeStatic == 0) {
            var radius = 30;
            if (parseInt($('.STAWWeight2').val(), 10) < 15) {
                radius = 30;
                $('.STAWWeight2').val('');
            } else if (parseInt($('.STAWWeight2').val(), 10) < 75) {
                radius = parseInt($('.STAWWeight2').val(), 10);
            } else {
                radius = 30;
                $('.STAWWeight2').val('');
            }
            roadHeatLayer.radius = radius;
            roadHeatLayer.featureWeight = "Speed" + getNum_currenttime(currentTime);
            roadHeatLayer.redraw();
        }
    })
    $('.STAWDivBtn2').click(function() {
        clearHeatLayer();
    })
    $('.STAWTime2_1').change(function() {
        if ($('.STAWTime2_2 option:selected').val() == 'noSel') {
            currentTime = $('.STAWTime2_1').val() + ' ' + "1:00:00";
        } else {
            currentTime = $('.STAWTime2_1').val() + ' ' + ($('.STAWTime2_2 option:selected').text());
        }
        $('.HMD3').text(currentTime);
    })
    $('.STAWTime2_2').change(function() {
        currentTime = $('.STAWTime2_1').val() + ' ' + ($('.STAWTime2_2 option:selected').text());
        $('.HMD3').text(currentTime);
    })
})

function Control_openHeatmap() {
    $(".selectTimeAndWeight").css("display", "block");
}

function Control_closeheatmap() {
    $(".selectTimeAndWeight").css("display", "none");
}

function showAnalysisMainForm() {
    $('.analysisForm').css('display', 'block');
}

function closeAnalysisMainForm() {
    $('.analysisForm').css('display', 'none');
}