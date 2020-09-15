$(document).ready(function () {
    var move = false;
    var _x, _y;
    $(".QRDiv2").mousedown(function (e) {
        move = true;
        _x = e.pageX - parseInt($(".qrbox").css("left"));
        _y = e.pageY - parseInt($(".qrbox").css("top"));
    });
    $(document).mousemove(function (e) {
        if (move) {
            var x = e.pageX - _x; //控件左上角到屏幕左上角的相对位置
            var y = e.pageY - _y;
            $(".qrbox").css({
                "top": y,
                "left": x
            });
        }
    }).mouseup(function () {
        move = false;
    });
})

$(document).ready(function () {
    var move = false;
    var _x, _y;
    $(".cSymbol").mousedown(function (e) {
        move = true;
        _x = e.pageX - parseInt($(".cSymbol").css("left"));
        _y = e.pageY - parseInt($(".cSymbol").css("top"));
    });
    $(document).mousemove(function (e) {
        if (move) {
            var x = e.pageX - _x; //控件左上角到屏幕左上角的相对位置
            var y = e.pageY - _y;
            $(".cSymbol").css({
                "top": y,
                "left": x
            });
        }
    }).mouseup(function () {
        move = false;
    });
})
$(document).ready(function () {
    var move = false;
    var _x, _y;
    $(".SCDiv1").mousedown(function (e) {
        move = true;
        _x = e.pageX - parseInt($(".stateContral").css("left"));
        _y = e.pageY - parseInt($(".stateContral").css("top"));
    });
    $(document).mousemove(function (e) {
        if (move) {
            var x = e.pageX - _x; //控件左上角到屏幕左上角的相对位置
            var y = e.pageY - _y;
            $(".stateContral").css({
                "top": y,
                "left": x
            });
        }
    }).mouseup(function () {
        move = false;
    });
})