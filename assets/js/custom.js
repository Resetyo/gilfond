$(document).ready(function(){
    //address chooser
    $('#address_street').val('hide');
    $('#address_house').val('hide');
    $('#address_house').one('change', function(){
        $('.content__myhome-accordion').css({'display':'inline-block'});
        $('.content__myhome-debt').show();
        rb = $('.content__myhome-debt');
        if(rb.length > 0) {
            rb_left = rb.offset()['left'];
            rb_width = rb.outerWidth();
        }
    });
    $('#address_street').change(function(){
        $.ajax({
            type: "POST",
            url: '/',
            data: $(this).val(),
            error: function(data) { //only for demonstration, change to success
                data = [1,2,3,4,5]; //only for demonstration, just remove it
                data.forEach(function(item,i,data){
                $('#address_house')
                    .append($("<option></option>")
                    .attr("value",item)
                    .text(item)); 
                });
            }
        });
    });

    //payment calc
    if ($('#payment-sum').length > 0) {
        paymentCalc();
        $('#payment-sum').keyup(paymentCalc);
        function paymentCalc () {
                var sum = parseFloat($('#payment-sum').val().replace(',','.'));
                sum = sum > 0 ? sum : 0;
                var comission = parseFloat($('#bank-comission').text()/100);
                var comission_rub = (sum * comission);
                $('#bank-comission-rub').text(comission_rub.toFixed(2));
                $('#sum-with-comission').text((sum + comission_rub).toFixed(2));
            }
    }

    //search block
    var search_block = $('.search-block');
    if (search_block.length > 0) {
        var search_close = $('.search-block-close');
        $('.nav-menu__items__search').click(function(){
            search_block.slideDown();
            $('body').append('<div class="body-fade"></div>');
            $('.body-fade').fadeTo(200,0.5);
        });
        search_close.click(function(){
            search_block.slideUp();
            $('.body-fade').fadeOut(200, function(){
                $(this).remove();
            });
        });
    }

    //news animation
    var news = $('.content__news');
    if (news.length > 0) {
        var main = news.find('.content__news__main');
        var imgs = news.find('.content__news__item__image img');
        main.mouseenter(function(){
            $(this).find('.content__news__main__image img')
                .css({'transform': 'scale(1.1)'});
        });
        main.mouseleave(function(){
            $(this).find('.content__news__main__image img')
                .css({'transform': 'scale(1.0)'});
        });
        imgs.mouseover(function(){
            $(this).css({'transform': 'scale(1.1)'});
        });
        imgs.mouseleave(function(){
            $(this).css({'transform': 'scale(1.0)'});
        });

    }

    //togglers
    var togglers = $('.toggler');
    if (togglers.length > 0) {
        $('.content__myhome-accordion__header').slice(1,-1).addClass('shadow-middle');
        $('.content__myhome-accordion__header').first().addClass('shadow-first');
        $('.content__myhome-accordion__header').last().addClass('shadow-last');
        togglers.click(function(){
            var header = $(this).parent();
            var item = header.parent();
            var prev_item = item.prev();
            var next_item = item.next();
            var prev_button = prev_item.find('.content__myhome-accordion__header').children('a');
            var curr_button = item.find('.content__myhome-accordion__header').children('a');
            var next_button = next_item.find('.content__myhome-accordion__header').children('a');

            if (curr_button.hasClass('toggler-open') && !next_button.hasClass('toggler-open') && prev_button.hasClass('toggler-open')) {
                item.removeClass('mb15');
            }
            if (!curr_button.hasClass('toggler-open') && !next_button.hasClass('toggler-open') && prev_button.hasClass('toggler-open')) {
                item.addClass('mb15');
            }
            if (curr_button.hasClass('toggler-open') && next_button.hasClass('toggler-open') && !prev_button.hasClass('toggler-open')) {
                prev_item.removeClass('mb15');
            }
            if (curr_button.hasClass('toggler-open') && !next_button.hasClass('toggler-open') && !prev_button.hasClass('toggler-open')) {
                item.removeClass('mb15');
                prev_item.removeClass('mb15');
            }
            if (!curr_button.hasClass('toggler-open') && next_button.hasClass('toggler-open') && !prev_button.hasClass('toggler-open')) {
                prev_item.addClass('mb15');
            }
            if (!curr_button.hasClass('toggler-open') && !next_button.hasClass('toggler-open') && !prev_button.hasClass('toggler-open')) {
                item.addClass('mb15');
                prev_item.addClass('mb15');
            }
            header.toggleClass('shadow-along').children('a').toggleClass('toggler-open');
            header.next('div').slideToggle('fast');

            return false;
        });
    }
});


//media queries

if (matchMedia) {
  var mq = window.matchMedia("(min-width: 960px)");
  var mq1 = window.matchMedia("(min-width: 1360px)");
  WidthChange(mq);
  WidthChange1(mq1);
  mq.addListener(WidthChange);
  mq1.addListener(WidthChange1);
}

function WidthChange1(mql) {
}
 
function WidthChange(mql) {
  if (mq.matches) {
    //nav menu & right block scroll
    $(window).resize(function() {
        rb_width = $('.content__myhome-accordion').outerWidth() / 2;
        rb_left = ($(this).outerWidth() - $('.content__wrapper').outerWidth()) / 2 + $('.content__myhome-accordion').outerWidth() + 43;
        if (rb.hasClass('content__myhome-accordion_fixed')) {
            rb.css({'left':rb_left});
        }
        rb.css({'width':rb_width});
    });
    lb = $('.content__myhome-accordion');
    var h_nav = $('.nav-menu').outerHeight();
    $(window).scroll(function() {
        var top = $(this).scrollTop();
        var mm = $('.main-menu');
        var nm = $('.nav-menu');
        var h_total = mm.outerHeight() + mm.offset()['top'];

        if (top >= h_total && !nm.hasClass('fxd')) {
            nm.addClass('fxd');
        } else if(top < h_total && nm.hasClass('fxd') ){
            nm.removeClass('fxd');
        }

        if (typeof rb !== 'undefined' && rb.length > 0) {
            var footer = $('footer').outerHeight();
            var doc_total = $('.content').outerHeight() - rb.outerHeight() + 37;
            var pos = lb.offset()['top'];
            var bh_total = pos - nm.outerHeight() - 10;
            if (top >= bh_total && 
                !rb.hasClass('content__myhome-accordion_fixed') &&
                 lb.outerHeight() > rb.outerHeight() ) {
                rb.addClass('content__myhome-accordion_fixed')
                    .css({'top':nm.outerHeight() + 10,'left':rb_left,'width':rb_width});
            } else if(top < bh_total && rb.hasClass('content__myhome-accordion_fixed') ){
                rb.removeClass('content__myhome-accordion_fixed').css({'top': 0, 'left': 0});

            }
            if(top > doc_total && lb.outerHeight() > rb.outerHeight() ) {
                rb.removeClass('content__myhome-accordion_fixed')
                    .css({'top': doc_total - pos + nm.outerHeight() + 10, 'left': 0});
            }
        }
    });

  } else {
    $(window).off('scroll');
    $(window).scroll(function() {
        rb.removeClass('content__myhome-accordion_fixed').css({'top':0, 'left':0});
    });

  }
}