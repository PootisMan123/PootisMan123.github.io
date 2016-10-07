$(function () {
    "use strict";
    var ns = {};
    ns.myCursor = $('#myCursor').attr('src');
    ns.bomb = $('#bomb').attr('src');
    ns.blueflag = $('#blueflag').attr('src');
    ns.greenflag = $('#greenflag').attr('src');
    ns.gold = $('#gold').attr('src');
    ns.flame = $('#flame').attr('src');
    ns.cursorRep = $('<img src="' + ns.myCursor + '" style="position:absolute;top:0;left:0;z-index:102;display:none;">');
    ns.overlay = $('<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:transparent;z-index:100;">');
    $('body').append(ns.cursorRep);
    ns.cursorX = 0;
    ns.cursorY = 0;
    ns.locked = false;
    document.body.style.cursor = 'url(' + ns.myCursor + '), auto';
    function getRandomInt(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
    $('body').mousemove(function (event) {
        if (!ns.locked) {
            ns.cursorX = event.clientX;
            ns.cursorY = event.clientY;
        }
    });    
    (function () {
        var flag = '<img src="' + ns.blueflag + '" class="iamagame" style="position:absolute;top:0;left:0;z-index:101;">',
            flag_count = getRandomInt(5, 10),
            i,
            max_h = $(window).height() - 68,
            max_w = $(window).width() - 68,
            f,
            bomb = getRandomInt(1, flag_count);
        for (i = 1; i <= flag_count; i++) {
            f = $(flag);
            $.data(f[0], 'isChecked', false);
            $.data(f[0], 'isBomb', (i === bomb));
            f.click(function () {
                var cache = $(this);
                if ($.data(this, 'isBomb')) {
                    $('body').append(ns.overlay);
                    $(this).attr('src', ns.bomb);
                    ns.locked = true;
                    ns.cursorRep.css('top', ns.cursorY);
                    ns.cursorRep.css('left', ns.cursorX);
                    ns.cursorRep.show();
                    document.body.style.cursor = 'none';
                    ns.cursorRep.attr('z-index', '10');
                    ns.cursorRep.animate({
                        top: "-=200"
                    }, 1500).animate({
                        top: "+=140"
                    }, 2000, function() {
                        ns.cursorRep.attr('src', ns.flame);
                        setTimeout(function () {
                            document.body.style.cursor = 'auto';
                            ns.cursorRep.remove();
                            ns.overlay.remove();
                            $('.iamagame').remove();
                        }, 3000);
                    });
                } else {
                    if (!ns.locked) {
                        $(this).attr('src', ns.gold);
                    }
                }
                $.data(this, 'isChecked', true);
            });
            f.mouseenter(function () {
                if (!$.data(this, 'isChecked') && !ns.locked) {
                    $(this).attr('src', ns.greenflag);
                }
            });
            f.mouseleave(function () {
                if (!$.data(this, 'isChecked') && !ns.locked) {
                    $(this).attr('src', ns.blueflag);
                }
            });
            f.css('top', getRandomInt(268, max_h));
            f.css('left', getRandomInt(68, max_w));
            $('body').append(f);
        }
    }());
});


var $win = $(window),
    w = 0,h = 0,
    rgb = [],
    getWidth = function() {
        w = $win.width();
        h = $win.height();
    };

$win.resize(getWidth).mousemove(function(e) {
    
    rgb = [
        Math.round(e.pageX/w * 255),
        Math.round(e.pageY/h * 255),
        150
    ];
    
    $(document.body).css('background','rgb('+rgb.join(',')+')');
    
}).resize();

var colors = ['red', 'blue', 'green', 'cyan'],
    i = 0;

$("#clickMe").click(function(){ 
    $("body").css("backgroundColor", colors[i]);
    i = (i==colors.length-1) ? 0 : (i+1);
});