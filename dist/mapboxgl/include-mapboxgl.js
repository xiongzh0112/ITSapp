﻿/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function() {
    var r = new RegExp("(^|(.*?\\/))(include-mapboxgl\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'),
        targetScript;
    for (var i = 0; i < s.length; i++) {
        var src = s[i].getAttribute('src');
        if (src) {
            var m = src.match(r);
            if (m) {
                targetScript = s[i];
                break;
            }
        }
    }

    function inputScript(url) {
        var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
        document.writeln(script);
    }

    function inputCSS(url) {
        var css = '<link rel="stylesheet" href="' + url + '">';
        document.writeln(css);
    }

    function inArray(arr, item) {
        for (i in arr) {
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }

    function supportES6() {
        var code = "'use strict'; class Foo {}; class Bar extends Foo {};";
        try {
            (new Function(code))();
        } catch (err) {
            return false;
        }
        if (!Array.from) {
            return false;
        }
        return true;
    }

    //加载类库资源文件
    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        if (!inArray(includes, 'mapbox-gl-enhance') && !inArray(excludes, 'mapbox-gl')) {
            inputCSS('libs/mapbox-gl-js/1.6.1/mapbox-gl.css');
            inputScript('libs/mapbox-gl-js/1.6.1/mapbox-gl.js');
        }
        if (inArray(includes, 'mapbox-gl-enhance')) {
            inputCSS("libs/mapbox-gl-js-enhance/1.2.0/mapbox-gl-enhance.css");
            inputScript("libs/mapbox-gl-js-enhance/1.2.0/mapbox-gl-enhance.js");
        }
        if (inArray(includes, 'draw')) {
            inputCSS("libs/mapbox-gl-js/plugins/mapbox-gl-draw/1.0.9/mapbox-gl-draw.css");
            inputScript("libs/mapbox-gl-js/plugins/mapbox-gl-draw/1.0.9/mapbox-gl-draw.js");
        }
        if (inArray(includes, 'compare')) {
            inputCSS('libs/mapbox-gl-js/plugins/mapbox-gl-compare/0.3.0/mapbox-gl-compare.css');
            inputScript('libs/mapbox-gl-js/plugins/mapbox-gl-compare/0.3.0/mapbox-gl-compare.js');
        }
        if (inArray(includes, 'mapv')) {
            inputScript('libs/mapv/2.0.43/mapv.min.js');
        }
        if (inArray(includes, 'echarts')) {
            inputScript('libs/echarts/4.5.0/echarts.min.js');
            inputScript("libs/echarts-liquidfill/echarts-liquidfill.min.js");
            inputScript("libs/echartsLayer/EchartsLayer.min.js");
        }
        if (inArray(includes, 'echarts-vue')) {
            inputScript('libs/echarts/4.5.0/echarts.min.js');
            inputScript("libs/vue-echarts/4.0.4/vue-echarts.min.js");
            inputScript("libs/echarts-liquidfill/echarts-liquidfill.min.js");
            inputScript("libs/echartsLayer/EchartsLayer.min.js");
        }
        if (inArray(includes, 'three')) {
            inputScript("libs/three/92/three.min.js");
        }
        if (inArray(includes, 'antd')) {
            inputCSS("libs/antd/3.25.3/antd.min.css");
            inputScript("libs/moment/2.24.0/moment.min.js");
            inputScript("libs/antd/3.25.3/antd.min.js");
        }
        if (inArray(includes, 'deck')) {
            inputScript("libs/deck.gl/5.1.3/deck.gl.min.js");
        }
        if (!inArray(excludes, 'iclient-mapboxgl')) {
            if (supportES6()) {
                inputScript("dist/mapboxgl/iclient-mapboxgl-es6.min.js");
            } else {
                inputScript("dist/mapboxgl/iclient-mapboxgl.min.js");
            }
        }
        if (!inArray(excludes, 'iclient-mapboxgl-css')) {
            inputCSS("dist/mapboxgl/iclient-mapboxgl.min.css");
        }
        if (inArray(includes, 'LoaderSupport')) {
            inputScript("libs/three/plugins/loaders/LoaderCommons.js");
            inputScript("libs/three/plugins/loaders/LoaderBuilder.js");
            inputScript("libs/three/plugins/loaders/LoaderWorkerSupport.js");
        }
        if (inArray(includes, 'OBJLoader')) {
            inputScript("libs/three/plugins/loaders/OBJLoader.js");
        }
        if (inArray(includes, 'OBJLoader2')) {
            inputScript("libs/three/plugins/loaders/OBJLoader2.js");
        }
        if (inArray(includes, 'MTLLoader')) {
            inputScript("libs/three/plugins/loaders/MTLLoader.js");
        }
        if (inArray(includes, 'GLTFLoader')) {
            inputScript("libs/three/plugins/loaders/GLTFLoader.js");
        }
        if (inArray(includes, 'proj4')) {
            inputScript('libs/proj4/2.6.0/proj4.js');
        }
        if (inArray(includes, 'echarts-gl')) {
            inputScript("libs/echarts-gl/1.1.1/echarts-gl.min.js");
        }
        if (inArray(includes, 'shapefile')) {
            inputScript("libs/shapefile/shapefile.js");
        }
        if (inArray(includes, 'jsonsql')) {
            inputScript("libs/jsonsql/jsonsql.js");
        }
        if (inArray(includes, 'geostats')) {
            inputScript("libs/geostats/geostats.js");
        }
        if (inArray(includes, 'canvg')) {
            inputScript('libs/canvg/3.0.2/canvg.min.js');
        }
        if (inArray(includes, 'convert')) {
            inputScript("libs/xml-js/1.6.8/xml-js.min.js");
        }
        if (inArray(includes, 'ant-design-vue')) {
            inputCSS("libs/ant-design-vue/1.3.9/antd.min.css");
            inputScript("libs/ant-design-vue/1.3.9/antd.min.js");
        }
        if (inArray(includes, 'xlsx')) {
            inputScript('libs/xlsx/0.15.3/xlsx.core.min.js');
        }
        if (inArray(includes, 'iclient-mapboxgl-vue')) {
            inputCSS("dist/mapboxgl/iclient-mapboxgl-vue.css");
            inputScript("dist/mapboxgl/iclient-mapboxgl-vue.min.js");
        }
        if (inArray(includes, 'iclient-mapboxgl-react')) {
            inputCSS("dist/mapboxgl/iclient-mapboxgl-react.css");
            inputScript("dist/mapboxgl/iclient-mapboxgl-react.min.js");
        }
    }

    load();
    window.isLocal = true;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();