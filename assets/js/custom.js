$(document).ready(function(){
    //aticles pagination
    var articles_page = 1, articles_per_page = 9;
    $('#more-articles').click(function(e){
        $button = $(this).prop('disabled', true);
        $item = $button.siblings('.content__news__feed')
            .find('.content__news__item').first();
        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/more_articles',
            data: { page: articles_page, per_page: articles_per_page }
        })
            .done(function(data) {
                //var data = { news: array, news_left: integer }
                data['news'].forEach(function(item, i, arr) {
                    //var item = { id: integer, title: string, date: string, image: string video: string }
                    var $new_item = $item.clone();
                    var $title = $new_item.find('h3 a');
                    $new_item.children('p').text(item['date']);
                    $title.text(item['title']);
                    $new_item.find('img').attr('src', item['image']);

                    cutText($title, 90);

                    if (item['video'] && item['video'].length > 0) {
                        $title.addClass('html5lightbox').attr('href', item['video']);
                        $new_item.children('a')
                            .addClass('html5lightbox')
                            .attr('href', item['video'])
                            .children('div').removeClass()
                            .addClass('content__news__item__video');
                    } else {
                        $title.attr('href','url/' + item['id']);
                        $new_item.children('a')
                            .removeClass('html5lightbox')
                            .attr('href','url/' + item['id'])
                            .children('div').removeClass()
                            .addClass('content__news__item__image');
                    }

                    $new_item.appendTo($button.siblings('.content__news__feed'));
                });
                
                $(".html5lightbox").html5lightbox();
                var left = data['news_left'];

                if (left < 1) {
                    $button.remove();
                } else if (left < articles_per_page) {
                    var plural;
                    $button.find('.articles-left').text(left);
                    switch (left) {
                      case 1:
                        plural = 'статья';
                        break;
                      case 2:
                      case 3:
                      case 4:
                        plural = 'статьи';
                        break;
                      default:
                        plural = 'статей';
                    }
                    $button.find('.articles-plural').text(plural);
                }

                articles_page += 1;
            })
            .always(function(){
                $button.prop('disabled', false);
            });
        e.preventDefault();
    });

    //additional news pagination
    var additional_page = 1, additional_per_page = 9;
    $('#additional-news').click(function(e){
        $button = $(this).prop('disabled', true);
        $item = $('.content__news__item--additional').first();
        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/additional_news',
            data: { page: additional_page, per_page: additional_per_page }
        })
            .done(function(data) {
                //var data = { news: array, news_left: integer }
                data['news'].forEach(function(item, i, arr) {
                    //var item = { id: integer, title: string, date: string, video: string }
                    var $new_item = $item.clone();
                    var $title = $new_item.find('h3 a');
                    $new_item.children('.btn-small').remove();
                    $new_item.children('p').text(item['date']);
                    $title.text(item['title']);

                    cutText($title, 230);

                    if (item['video'] && item['video'].length > 0) {
                        $new_item.children('hr')
                            .before('<a href="' + item['video'] + '" class="html5lightbox btn-small">Видео</a>');
                        $title.addClass('html5lightbox').attr('href', item['video']);
                    } else {
                        $title.attr('href','url/' + item['id']);
                    }

                    $new_item.appendTo('.content__news__feed--additional');
                });
                
                $(".html5lightbox").html5lightbox();
                var left = data['news_left'];

                if (left < 1) {
                    $button.remove();
                } else if (left < additional_per_page) {
                    var plural;
                    $button.find('.news-left').text(left);
                    switch (left) {
                      case 1:
                        plural = 'новость';
                        break;
                      case 2:
                      case 3:
                      case 4:
                        plural = 'новости';
                        break;
                      default:
                        plural = 'новостей';
                    }
                    $button.find('.news-plural').text(plural);
                }

                additional_page += 1;
            })
            .always(function(){
                $button.prop('disabled', false);
            });
        e.preventDefault();
    });

    //aticles pagination
    var reviews_page = 1, reviews_per_page = 6;
    $('#more-reviews').click(function(e){
        $button = $(this).prop('disabled', true);
        $item = $button.siblings('.content__become-client__reviews')
            .find('.content__become-client__review').first();
        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/more_articles',
            data: { page: reviews_page, per_page: reviews_per_page }
        })
            .done(function(data) {
                //var data = { news: array, news_left: integer }
                data['news'].forEach(function(item, i, arr) {
                    //var item = { id: integer, title: string, date: string, image: string video: string }
                    var $new_item = $item.clone();
                    $new_item.find('a').attr('href', item['image']);
                    $new_item.find('img').attr('src', item['image']);
                    $new_item.appendTo($button.siblings('.content__become-client__reviews'));
                });
                
                $(".html5lightbox").html5lightbox();
                var left = data['news_left'];

                if (left < 1) {
                    $button.remove();
                } else if (left < reviews_per_page) {
                    var plural;
                    $button.find('.reviews-left').text(left);
                    switch (left) {
                      case 1:
                        plural = 'отзыв';
                        break;
                      case 2:
                      case 3:
                      case 4:
                        plural = 'отзыва';
                        break;
                      default:
                        plural = 'отзывов';
                    }
                    $button.find('.reviews-plural').text(plural);
                }

                reviews_page += 1;
            })
            .always(function(){
                $button.prop('disabled', false);
            });
        e.preventDefault();
    });

    //modals
    $('.js-modal').click(function(){
        var $this = $(this);
        var modal_window = $('#' + $this.data('modal'));
        modal_window.fadeIn(200);
        modal_window.wrap('<div class="modal-wrapper"></div>')
            .after('<div class="body-fade"></div>');
        $('.body-fade').fadeTo(200,0.75);
        $('.body-fade').click(closeModal);

        var close_btn = modal_window.find('.js-modal-close');
        close_btn.off('click');
        close_btn.on('click', closeModal);

        function closeModal() {
            modal_window.fadeOut(200);
            $('.body-fade').fadeOut(200, function(){
                $(this).remove();
                modal_window.unwrap();
            });
        }
    });

    //counter form
    $('.counter-form').submit(function(e){
        $this = $(this);
        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/counter',
            data: $(this).serialize().replace('%2C','.')
        })
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
                e.preventDefault();
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
    var articles = $('article');
    if (news.length > 0 || projects.length > 0) {
        var main = news.find('.content__news__main');
        var imgs = news.find('.content__news__item__image');
        main = main.add(imgs).add(projects).add(articles);
        main.mouseenter(function(){
            $(this).find('img')
                .css({'transform': 'scale(1.1)'});
        });
        main.mouseleave(function(){
            $(this).find('img')
                .css({'transform': 'scale(1.0)'});
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

    //pay methods toggler
    $('.js-pay-methods').click(function(){
        $(this).toggleClass('active').next().slideToggle();
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
    $(".usual-form input[type='file']").change(function(){
        var fileName = $(this).val().split('/').pop().split('\\').pop();
        $(this).next('label').text('Выбран файл ' + fileName);
    });

    //district phone & worktime
    $('#district_contacts').change(function(){
        var phones = $(this).closest('.text-block').find('.district_phones').html('');
        var worktime = $(this).closest('.text-block').find('.district_worktime').html('');

        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/district_data',
            data: $(this).val()
        })
            .done(function(data) {
                //var data = { phones: array, worktime: array }
                data['phones'].forEach(function(item,i,data){
                    //var item = { title: string, phone: string }
                    var a = $('<a />')
                        .attr('href','tel:' + item['phone'])
                        .text(item['phone']);
                    var li = $('<li />').html(item['title']).after(a);
                    phones.append(li);
                });

                data['worktime'].forEach(function(item,i,data){
                    //var item = []
                    var li = $('<li />').html(item);
                    worktime.append(li);
                });
            });
    });

    //district contest
    $('#contest_contacts').change(function(){
        var parent = $(this).closest('.content__contest--extend');
        var text = parent.find('.contest-text').html('');
        var links = parent.children('.text-green-u');
        var link = links.first().clone();
        links.remove();
        var thumbs = parent.find('.content__contest__item');
        thumbs.first().before('Конкурсов нет');
        var thumb = thumbs.first().clone();
        thumb.find('.sm-ul li').remove();
        thumbs.remove();

        $.ajax({
            type: "POST",
            url: 'http://tr25.ostorodonodor.lclients.ru/contest_data',
            data: $(this).val()
        })
            .done(function(data) {
                // var data = { text: string, links: array, thumbs: array }
                text.html(data['text']);

                data['links'].forEach(function(item,i,data){
                    //var item = { title: string, path: string }
                    var new_link = link.clone().attr('href',item['path']).html(item['title']);
                    $('.js-press-nav').before(new_link);
                });

                data['thumbs'].forEach(function(item,i,data){
                    //var item = { "hash" => array }
                    var key = Object.keys(item)[0];
                    $('#' + key).children('div').html('');

                    item[key].forEach(function(thumbs_item,i,data){
                        //var thumbs_item = { title: string, links: array, download_all: string }
                        var new_thumb = thumb.clone();
                        new_thumb.find('h3').html(thumbs_item['title']);
                        new_thumb.children('a.text-green-u').attr('href', thumbs_item['download_all']);

                        thumbs_item['links'].forEach(function(links_item,i,data){
                            //var links_item = { title: string, path: string }
                            var thumb_link = $('<a />')
                                .attr('href', links_item['path'])
                                .html(links_item['title']);
                            new_thumb.find('.sm-ul')
                                .append(thumb_link);
                            thumb_link.wrap('<li></li>');
                            new_thumb.appendTo($('#' + key).children('div'));
                        });
                    });
                });
            });
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
        $('html, body').animate({
          scrollTop: 0
        }, 200);
    });

    //become client smooth scroll
    var links = $(".tabs-nav-cabinet a");
    links = links.filter(function(){
        return this.hash !== "";
    });

    if (links.length > 0) {
        links.on('click', function(event) {
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

        $(window).scroll(function(e) {
            var top = $(this).scrollTop();
            if (top + 150 < $(links.first().attr('href')).offset().top) {
                links.first().parent().addClass('active')
                        .siblings().removeClass('active');
            } else if (top + 150 > $(links.last().attr('href')).offset().top) {
                links.last().parent().addClass('active')
                        .siblings().removeClass('active');
            } else {
                links.each(function(index,link){
                    if (top + 150 >= $($(link).attr('href')).offset().top && top < $(links.get(index + 1)).offset().top) {
                        $(this).parent().addClass('active')
                            .siblings().removeClass('active');
                    }
                });
            }
        });
    }

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

    //select to menu
    $('.call-request').siblings().show();
    $('.tabs-mobile-menu').hide().siblings().show().each(function(){
        var ul = $(this).siblings().first();
        var active_tab = ul.children('li').index(ul.children('li.active'));
        if (active_tab > -1) {
            $($(this).children('li').removeClass('active')
                .get(active_tab)).addClass('active').show();
        }
    });

  } else {

    //unfixed right block
    $(window).off('scroll');
    $(window).scroll(function() {
        if (typeof rb !== 'undefined') rb.removeClass('content__right-block--fixed').css({'top':0, 'left':0});
    });

    //menu to select
    var menu_with_redirect = $('.tabs-nav-cabinet');
    var menu_anchor = $('.tabs-nav-info, .tabs-nav-info-inner');
    var mobile_menu;

    if (menu_with_redirect.find('.call-request').length == 0) {
        addMobileSelect(menu_with_redirect);
        menu_with_redirect.off('click');
        menu_with_redirect.click(function(e) {
            e.stopPropagation();
            $(this).children('.tabs-mobile-menu').find('li').not('.active').toggle();
        });
    } else {
        menu_with_redirect.find('.call-request').siblings().hide();
    }

    addMobileSelect(menu_anchor,true);

    function addMobileSelect(menu,with_hash=false) {
        menu.each(function(){

            $this = $(this);
            var original_ul = $this.find('ul').not('.tabs-mobile-menu');
            mobile_menu = $(this).children('.tabs-mobile-menu');

            if (mobile_menu.length == 0) {
                mobile_menu = original_ul.clone(true,true)
                    .addClass('tabs-mobile-menu')
                    .appendTo($this);
                if (mobile_menu.children('li.active').length == 0) {
                    mobile_menu.children('li').first().addClass('active');
                }
                mobile_menu.css({
                    'position': 'static',
                    'flex-direction': 'column'
                });
                if(with_hash) {
                    mobile_menu.children('li').click(function(){
                        if ($(this).is('.active')) {
                            $(this).siblings().toggle();
                        } else {
                            $(this).addClass('active').siblings().hide().removeClass('active');
                        }
                    });
                }
            } else {
                mobile_menu.show();
            }

            original_ul.hide();
        });
    }

    menu_anchor.each(function(){
        var ul = $(this).find('ul').not('.tabs-mobile-menu');
        var active_tab = ul.children('li').index(ul.children('li.active'));
        if (active_tab > -1) {
            $($(this).find('.tabs-mobile-menu').children('li').removeClass('active').hide()
                .get(active_tab)).addClass('active').show();
        }
    });

    $(document).click(function(e) {
        setTimeout(function(){
            var menu = $('.tabs-mobile-menu').find('li');
            if (menu.filter(":visible").length > 0 &&
                    menu.find('a').index(e.target) == -1) {
                menu.not('.active').hide();
            }
        },50);
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