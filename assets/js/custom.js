$(document).ready(function(){
    //modals
    $('.js-modal').click(function(){
        var $this = $(this);
        var modal_window = $('#' + $this.data('modal'));

        $(window).scrollTop(0,0);

        modal_window.fadeIn(200);
        $('body').append('<div class="body-fade"></div>');
        $('.body-fade').fadeTo(200,0.75);
        $('.body-fade').click(closeModal);

        var close_btn = modal_window.find('.js-modal-close');
        close_btn.off('click');
        close_btn.on('click', closeModal);

        function closeModal() {
            modal_window.fadeOut(200);
            $('.body-fade').fadeOut(200, function(){
                $(this).remove();
            });
        }
    });

    //counter form
    $('.counter-form').submit(function(e){
        $this = $(this);
        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/counter',
            data: $(this).serialize().replace('%2C','.'
        )})
            .done(function(data) {
                $this.css({'visibility':'hidden'})
                    .before('<p class="counter-success">Показания переданы.<br>Спасибо, Валерий.</p>');
            })
            .fail(function(data) {
                $this.css({'visibility':'hidden'})
                    .before('<p class="counter-error">Показания не переданы.<br><span>Попробуйте еще раз<br>или обратитесь к специалисту</span></p>');
            });
        e.preventDefault();
    });

    //recourse, call request form
    submitUsualForm(
        $('#modal-recourse-form'),
        'http://tr25.ostorodonodor.lclients.ru/recourse'
    );
    submitUsualForm(
        $('#call-request-form'),
        'http://tr25.ostorodonodor.lclients.ru/recourse'
    );
    function submitUsualForm(form,url){
        form.submit(function(e){
            $this = $(this);
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize()
            })
                .done(function() {
                    $this.siblings('.form-success').show();
                })
                .fail(function() {
                    $this.siblings('.form-error').show();
                })
                .always(function(){
                    $this.hide().siblings()
                        .not('.js-modal-close')
                        .not('.form-success')
                        .not('.form-error').hide();
                    $(window).scrollTop(0,0);
                });
            e.preventDefault();
        });
    }

    //news cutter
    var news = $('.content__news__item h3 a');
    var extend_news = $('.content__news__item--additional h3 a');
    cutText(news,90);
    cutText(extend_news,230);

    //search cutter
    var search_text = $('.search-result__text');
    var search_header = $('.search-result__header');
    cutText(search_text,180);
    cutText(search_header,75);

    function cutText(strings,length) {
        strings.each(function(){
            var string = $(this).html();
            if (string.length > length) {
                $(this).html(string.slice(0,length) + '...');
            }
        });
    }

    //header banner animation
    var banner_outer = $('.header-banner');
    if(banner_outer.length > 0) {
        var banner_inner = $('.header-banner-content');
        banner_outer.css('height','100%');
        banner_inner.css('transform','translateY(0%)');
        $('.header-banner-close').click(function(){
            banner_outer.css('height','0%');
            banner_inner.css('transform','translateY(-100%)');
        });
    }

    //address chooser
    $('#address_street').val('hide');
    $('#address_house').val('hide');
    rb = $('.content__right-block');
    if($('.content__right-block:visible').length > 0) {
        rb_left = rb.offset()['left'];
        rb_width = rb.outerWidth();
    }

    $('#address_house').one('change', function(){
        $('.content__left-block').css({'display':'inline-block'});
        $('.content__right-block').show();
        if(rb.length > 0) {
            rb_left = rb.offset()['left'];
            rb_width = rb.outerWidth();
        }
    });
    $('#address_street').change(function(){
        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/houses',
            data: $(this).val()
        })
            .done(function(data) {
                var house_select = $('#address_house');
                house_select.children('option').slice(1).remove();
                data['houses'].forEach(function(item,i,data){ // CHANGE TO REAL DATA
                house_select
                    .append($("<option></option>")
                    .attr("value",item)
                    .text(item)); 
                });
                initSelect(null, $('#address_house'));
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

    //press-centre & info tabs
    var nav = $('.tabs-nav');
    var press_nav = $('.js-press-nav').length > 0 ? true : false;
    if (nav.length > 0) {
        $('.tabs-nav').each(function(){
            $(this).siblings(".tab-content").hide().first().show();
            var li_first = $(this).find("li:first");
            li_first.addClass("active");
            press_nav ? li_first.children('a').addClass("btn-blue") : null;
            $(this).find("li").on('click', function (e) {
                e.preventDefault();
                var li = $(this);
                li.addClass("active").siblings().removeClass("active");
                if (press_nav) {
                    li.find('a').addClass("btn-blue");
                    li.siblings().children("a").removeClass('btn-blue');
                }
                var href = $(this).find('a').attr('href');
                $(href).siblings('.tab-content:visible').fadeOut(200,function(){
                    $(href).fadeIn(200);
                });
                history.pushState(null, null, href);
            });

            var hash = $.trim( window.location.hash );

            if (hash) $(this).find('a[href$="'+hash+'"]').trigger('click');
            $(window).scrollTop(0,0);
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
            return false;
        }
    }

    //carousel
    var carousel = $('.owl-carousel');
    if (carousel.length > 0) {
        $('.owl-carousel').owlCarousel({
            loop:true,
            nav:true,
            items:1,
            dots:true,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            smartSpeed: 1000,
            navText:["&lt;","&gt;"]
        });
    }

    //slider controls position
    var controls = $('.owl-nav');
    if (controls.length > 0) {
        controls.wrap('<div class="owl-wrapper"></div>');
    }

    //Kenneth Burns animation
    var news = $('.content__news__feed');
    var projects = $('.content__press__project').not('.no-image');
    if (news.length > 0 || projects.length > 0) {
        var main = news.find('.content__news__main');
        var imgs = news.find('.content__news__item__image img');
        main = main.add(projects);
        main.mouseenter(function(){
            $(this).find('img')
                .css({'transform': 'scale(1.1)'});
        });
        main.mouseleave(function(){
            $(this).find('img')
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
            var menu_items = $(this).next('ul.select-options');
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active');
                menu_items.hide();
            });
            $(this).toggleClass('active');
            menu_items.toggle();
            if ($styledSelect.offset()['top'] + 
                $styledSelect.outerHeight() +
                menu_items.outerHeight() > $('.footer').offset()['top']) {

                var extended_height = menu_items.offset()['top'] + 
                    menu_items.outerHeight() - $('.footer').offset()['top'] + 20;
                $('.content__wrapper').css('margin-bottom', extended_height);
            }
        });

        $listItems.off('click');
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel')).change();
            $list.hide();
            $('.content__wrapper').css('margin-bottom',0);
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
            $('.content__wrapper').css('margin-bottom',0);
        });

    }

    //contest extend
    var contest_desc = $('.content__contest__description');
    if (contest_desc.length > 0) {
        var full_desc = contest_desc.clone()
            .removeClass('content__contest__description')
            .addClass('content__contest--extend')
            .hide().insertAfter(contest_desc);
        cutText(contest_desc,120);

    }
    $('.js-contest').click(function(){
        var parent = $(this).closest('.content__contest');
        parent.find('.content__contest--extend').show();
        parent.find('.content__contest__description').hide();
        $(this).hide();
        return false;
    });

    //pay methods toggler
    $('.js-pay-methods').click(function(){
        $(this).toggleClass('active').next().toggle();
        return false;
    });

    //togglers
    var togglers = $('.toggler');
    if (togglers.length > 0) {
        $('.content__myhome-accordion__header').slice(1,-1).addClass('shadow-middle');
        $('.content__myhome-accordion__header').first().addClass('shadow-first');
        $('.content__myhome-accordion__header').last().addClass('shadow-last');
        togglers.parent().click(function(){
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

    //money mask
    $(".money").numericInput({ allowFloat: true});

    //file input label
    $("#recourse-window input[type='file']").change(function(){
        var fileName = $(this).val().split('/').pop().split('\\').pop();
        $(this).next('label').text('Выбран файл ' + fileName);
    });

    //phone mask
    if ($("#phone").length > 0) {
        $("#phone").mask('0 (000) 000-0000');
    }

    //recourse textarea reorder
    document.body.onkeydown = function(event) {
        var e = event || window.event;
        var code = e.keyCode || e.which;
        var activeEl = document.activeElement.id;
        if(code == 13 && e.ctrlKey) {
            if(activeEl == "recourse") {
                document.getElementById('recourse').value += "\n";
            } else {
                return false;
            }
        } else if(code == 13 && activeEl == "recourse") {
            var recourse = document.getElementById('recourse').value;
            recourse = recourse.replace(/^\s+/, "");
            if(recourse != "") {
                $('#recourse-form').submit();
            } else {
                return false;
            }
       }
    }

    $('#recourse-form').submit(function(e){
        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/recourse',
            data: $('#recourse-form').serialize()
        })
            .done(function(data) {
                var message = $('.content__recourse__message').first().clone().hide();
                message.find('.content__recourse__user-name')
                    .text($('.profile__name').text().split(' ')[1]);
                message.find('.content__recourse__body h2')
                    .text($('#recourse-form').find('textarea').val());
                message.insertAfter($('.content__recourse__message').last()).fadeIn(500);
            })
            .fail(function(data) {
                $('#recourse-form [type=submit]').showError('Сообщение не отправлено, попробуйте еще раз');
            });

        e.preventDefault();
    });

    $.fn.extend({
        showError: function (text) {
            $('p.error').remove();
            var error_message = $('<p />', {
                'class': 'error',
                'text': text
            })
            .css({
                'top': $(this).offset()['top'] - 230,
                'left': $(this).offset()['left']
            })
            .insertAfter(this).fadeIn(300);
        }
    });

    //scroll to top button
    $('.scroll-top').click(function(){
        $(window).scrollTop(0,0);
    });

    //become client smooth scroll
    $(".tabs-nav-cabinet a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        var height = $('.nav-menu').outerHeight() + 20;
        $(hash).css({
            'padding-top': height,
            'margin-top': '-' + height + 'px',
            'background-clip': 'content-box'
        });
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 600, function(){
          window.location.hash = hash;
        });
      }
    });

    //become client toggler
    $('.block-toggler').click(function(){
        $(this).siblings('.hidden-block').toggle();
        return false;
    });
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
        rb_width = $('.content__left-block').outerWidth() / 2;
        rb_left = ($(this).innerWidth() - $('.content__wrapper').first().outerWidth()) / 2 + $('.content__left-block').outerWidth() + 43;
        if (rb.hasClass('content__right-block--fixed')) {
            rb.css({'left':rb_left});
        }
        rb.css({'width':rb_width});
    });
    lb = $('.content__left-block');
    $(window).scroll(function() {
        var top = $(this).scrollTop();
        var mm = $('.main-menu');
        var nm = $('.nav-menu');
        var h_total = mm.outerHeight() + mm.offset()['top'];
        if (top >= h_total && !nm.hasClass('fxd')) {
            nm.addClass('fxd');
            mm.css('margin-bottom',nm.outerHeight());
        } else if(top < h_total && nm.hasClass('fxd')){
            nm.removeClass('fxd');
            mm.css('margin-bottom',0);
        }

        if (typeof rb !== 'undefined' && typeof rb_left !== 'undefined' && rb.length > 0) {
            var footer = $('footer').outerHeight();
            var doc_total = $('.content').outerHeight() - rb.outerHeight() + 37;
            var pos = lb.offset()['top'];
            var bh_total = pos - nm.outerHeight() - 10;
            if (top >= bh_total && 
                !rb.hasClass('content__right-block--fixed') &&
                 lb.outerHeight() > rb.outerHeight() ) {
                rb.addClass('content__right-block--fixed')
                    .css({'top':nm.outerHeight() + 10,'left':rb_left,'width':rb_width});
            } else if(top < bh_total && rb.hasClass('content__right-block--fixed') ){
                rb.removeClass('content__right-block--fixed').css({'top': 0, 'left': 0});

            }
            if(top > doc_total && lb.outerHeight() > rb.outerHeight() ) {
                rb.removeClass('content__right-block--fixed')
                    .css({'top': doc_total - pos + nm.outerHeight() + 10, 'left': 0});
            }
        }
    });

    //contest extend position
    $('.js-contest').each(function(){
       $(this).appendTo($(this).parent().next('.content__contest__main')); 
    });

    //description replace image
    $('.read-more__img').each(function(){
       $(this).insertAfter($(this).siblings('.read-more__right-block')); 
    });

  } else {

    //unfixed right block
    $(window).off('scroll');
    $(window).scroll(function() {
        rb.removeClass('content__right-block--fixed').css({'top':0, 'left':0});
    });

    //menu to select
    $('.tabs-nav-cabinet').one('click', function() {
        $this = $(this);
        if ($this.find('.call-request').length == 0) {
            var top = $this.outerHeight();
            $this.find('ul').clone().addClass('cabinet-mobile-menu').appendTo($this).find('li').remove('.active');
        }
    });
    $('.tabs-nav-cabinet').click(function(e) {
        e.stopPropagation();
        $('.cabinet-mobile-menu').find('li').toggle();
    });
    $(document).click(function() {
        $('.cabinet-mobile-menu').find('li').hide();
    });

    //contest extend position
    $('.js-contest').each(function(){
       $(this).appendTo($(this).parent().next('.content__contest__time')); 
    });

    //description replace image
    $('.read-more__img').each(function(){
       $(this).insertBefore($(this).siblings('.read-more__right-block'));
    });
  }
}