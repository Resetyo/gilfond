$(document).ready(function(){
    //address chooser
    $('#address_street').val('hide');
    $('#address_house').val('hide');
    rb = $('.content__myhome-debt');
    $('#address_house').one('change', function(){
        $('.content__myhome-accordion').css({'display':'inline-block'});
        $('.content__myhome-debt').show();
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
                data = [
                    Math.round(Math.random()*100),
                    Math.round(Math.random()*100),
                    Math.round(Math.random()*100),
                    Math.round(Math.random()*100),
                    Math.round(Math.random()*100),
                    Math.round(Math.random()*100),
                    Math.round(Math.random()*100),
                    Math.round(Math.random()*100)
                ];                   //only for demonstration, just remove it
                var house_select = $('#address_house');
                house_select.children('option').slice(1).remove();
                data.forEach(function(item,i,data){
                house_select
                    .append($("<option></option>")
                    .attr("value",item)
                    .text(item)); 
                });
                initSelect(null, $('#address_house'));
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

    //press-centre tabs
    var nav = $('.inner-nav');
    if (nav.length > 0) {
        $(".tab-content").hide().first().show();
        $(".inner-nav li:first").addClass("active").children('a').addClass("btn-blue");

        $(".inner-nav a").on('click', function (e) {
            e.preventDefault();
            $(this).closest('li').addClass("active").siblings().removeClass("active");
            $(this).closest('li a').addClass("btn-blue");
            $(this).closest('li').siblings().children("a").removeClass('btn-blue');
            var tab = $($(this).attr('href'));
            tab.siblings('.tab-content:visible').fadeOut(200,function(){
                tab.fadeIn(200);
            });
            history.pushState(null, null, $(this).attr('href'));
        });

        var hash = $.trim( window.location.hash );

        if (hash) $('.inner-nav a[href$="'+hash+'"]').trigger('click');
        $(window).scrollTop(0,0);
    }

    //carousel
    var carousel = $('.owl-carousel');
    if (carousel.length > 0) {
        $('.owl-carousel').owlCarousel({
            loop:true,
            nav:true,
            items:1,
            dots:false,
            navText:["&lt;","&gt;"]
        });
    }

    //search block
    var search_block = $('.search-block');
    if (search_block.length > 0) {
        var search_close = $('.search-block-close');
        $('.nav-menu__items__search').click(function(){
            search_block.slideDown();
            $('body').append('<div class="body-fade"></div>');
            $('.body-fade').fadeTo(200,0.5);
            $('.body-fade').click(closeSearch);
        });

        search_close.click(closeSearch);

        function closeSearch() {
            search_block.slideUp();
            $('.body-fade').fadeOut(200, function(){
                $(this).remove();
            });
        }
    }

    //slider controls position
    var controls = $('.owl-nav');
    if (controls.length > 0) {
        controls.wrap('<div class="content__wrapper" style="position:relative;"></div>');
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

    //custom select
    $('select').each(initSelect);
    function initSelect(i, self) {
        var $this = $(self), numberOfOptions = $(self).children('option').length;
        if (!$this.hasClass('select-hidden')) {
            $this.addClass('select-hidden'); 
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');
            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());
          
            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);
        } else {
            var $styledSelect = $this.next('div.select-styled');
            var $list = $styledSelect.next('.select-options');

            $list.html('');
        }

      
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
      
        var $listItems = $list.children('li');
      
        $styledSelect.text($this.find('option:selected').text());
        $styledSelect.off('click');
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.off('click');
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel')).change();
            $list.hide();
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    }
    //togglers
    var togglers = $('.toggler');
    if (togglers.length > 0) {
        $('.content__myhome-accordion__header').slice(1,-1).addClass('shadow-middle');
        $('.content__myhome-accordion__header').first().addClass('shadow-first');
        $('.content__myhome-accordion__header').last().addClass('shadow-last');
        togglers.parent().click(function(){
        // togglers.click(function(){
            // var header = $(this).parent();
            var header = $(this);
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
  var mq = window.matchMedia("(min-width: 961px)");
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
        rb_left = ($(this).innerWidth() - $('.content__wrapper').first().outerWidth()) / 2 + $('.content__myhome-accordion').outerWidth() + 43;
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

        if (typeof rb !== 'undefined' && typeof rb_left !== 'undefined' && rb.length > 0) {
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