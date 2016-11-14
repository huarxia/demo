$(function () {
    var index  = document.location.href.split('#')[1];
    if (!!index) {
        htmlScrollTop($('[hook-name = items]').find('.item-' + index)[0]);
    }
    $('.rollbar').click(function () {
        $('html,body').animate({'scrollTop': 0}, 618);
    });
    $('.affix-top li').click(function () {
        var me = $(this);
        $('[hook-name = items]').find('div').each(function () {
            if ($(this).hasClass(me.attr('class'))) {
                htmlScrollTop($(this)[0]);
            }
        });
    });
    $(window).resize(function () {
        scrolls();
    });
    $(window).scroll(function(){
        scrolls();
    });
    function scrolls() {
        if ($('#navs').offset().top - $(window).scrollTop() > 0) {
            $('nav').css({'position': 'absolute', 'top': 0, 'left': 0});
        }else {
            navxy();
        }
    }
    function htmlScrollTop($$){
        $('html,body').animate({'scrollTop': $$.offsetTop + 108}, 618,function () {
            if ($('nav')[0].offsetTop === 0) {
                navxy();
            }
        });
    }
    function navxy() {
        $('nav').css({'position': 'fixed', 'top': 0, 'left': $('#navs')[0].offsetLeft});
    }
});