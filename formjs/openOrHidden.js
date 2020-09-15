//快捷导航
$(document).ready(function() {
    $(".openQuickList").click(function() {
        $(".quickList").toggle();
    });
});
//快捷菜单
$(document).ready(function() {
    $(document).click(function() {
        $(".quickList").hide();
    });
    $(".qucik").click(function() {
        return false;
    });
});
//查询
$(document).ready(function() {
    $(".qb").click(function() {
        $("#query").fadeToggle();
    });
});
$(document).ready(function() {
        $(".QRcloseBtn").click(function() {
            $("#query").fadeOut();
        });
    })
    //信息框
$(document).ready(function() {
        $(".sideBarLink").click(function() {
            $("#mbox").fadeToggle();
        });
    })
    //右边栏
$(document).ready(function() {
    $(".rb").click(function() {
        $("#rightBar1").fadeToggle();
    });
});
$(document).ready(function() {
    $(".rb").click(function() {
        $("#rightBar2").fadeToggle();
    });
});
//符号化
$(document).ready(function() {
    $(".cs").click(function() {
        $(".cSymbol").fadeToggle();
    });
})
$(document).ready(function() {
    $(".CScloseBtn").click(function() {
        $(".cSymbol").fadeToggle();
    });
})
$(document).ready(function() {
    $(".MLcloseBtn").click(function() {
        $(".lbnav").fadeToggle();
    });
})