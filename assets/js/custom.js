$(document).ready(function(){
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
    var search_close = $('.search-block-close');
    if (search_block.length > 0) {
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
});


//media queries

if (matchMedia) {
  var mq = window.matchMedia("(min-width: 960px)");
  var mq1 = window.matchMedia("(min-width: 768px)");
  WidthChange(mq);
  WidthChange1(mq1);
  mq.addListener(WidthChange);
  mq1.addListener(WidthChange1);
}

function WidthChange1(mql) {
    // if (mq1.matches) {
        // console.log('768');
    // } else {
        // console.log('767');
    // }
}
 
function WidthChange(mql) {
    if (mq.matches) {

    //nav menu & right block scroll
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
    });

  } else {
    // $(window).off('scroll');
    $(window).scroll(function() {
        // rb.removeClass('content__right-block_fixed').css({'top':0});
    });

  }
}