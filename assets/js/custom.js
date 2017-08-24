$(document).ready(function(){
    //modal complete
    $(".modal form").submit(function(e){
        $.ajax({
            type: "POST",
            url: '',
            data: $(this).serialize(),
            success: function(data) {
                $(".modal-complete").show();
            },
            error: function(data) {
                $(".modal-complete").show(); //only for demonstration, remove it
            }
        });
        $('.modal form').hide();
        setTimeout(function(){
            $('.modal').modal('hide');
        }, 2000);
        e.preventDefault();
    });

    //block with plus
    $('.content__unfolding__plus').on("click", function(e) {
        var t = $(this);
        if(t.hasClass('open')) {
            t.removeClass('open').css({'transform': 'rotate(0deg)'});
            t.parent().next("p").slideUp('100');
        } else {
            t.addClass('open').css({'transform': 'rotate(45deg)'});
            t.parent().next("p").slideDown('100');
        }
    });

    //label animation
    $(".live-labels input").val('');
    $('.live-labels').on("focus", "input", function(e) {
        if( !$(this).hasClass('moved-label') ){
            $(this).prev().addClass('moved-label');
        }
        if($(this).attr('id') == 'phone') {
            $("#phone").attr('placeholder', "_ (___)___-__-__");
        }
    });
    $('.live-labels').on("blur", "input", function(e) {
        if( $(this).val() == '' ) {
            $(this).prev().removeClass('moved-label');
        }
        if($(this).attr('id') == 'phone') {
            $("#phone").attr('placeholder', "");
        }
    });

    //reviews pagination
    var list = $('.content__table').find('.reviews-carousel');
    if(list.length > 10){
        list.slice(10).hide();
        var more_button = $('.content__reviews__more');
        var i = 0;
        more_button.css({'display': 'inline-block'}).click(function(){
            i++;
            list.slice(10*i, 10*(i+1)).show();
            if(list.length <= 10*(i+1)){
                more_button.hide();
            }
            if(list.length <= 10*(i+2)){
                $('.content__reviews__more-count').text(list.length - 10*(i+1));
            }
        });
    }
});


//media queries

if (matchMedia) {
  var mq = window.matchMedia("(min-width: 1024px)");
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