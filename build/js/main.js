//активация кнопки "наверх", залипание части шапки, закрытие корзины
$(window).scroll(function () {
  $(".small-cart__dropdown").removeClass('is-open');

  if ($(this).scrollTop() > 100) {
    $('.header__bottom-inner').addClass('scrolled');
    $('.js-to-top').addClass('is-active');
  } else {
    $('.header__bottom-inner').removeClass('scrolled');
    $('.js-to-top').removeClass('is-active');
  }
});

//скролл наверх при нажитии кнопки "наверх"
$('.js-to-top').click(function () {
  $('body, html').animate({
      scrollTop: 0
  }, 300);
  return false;
});

var selector;

$(document).ready(function() {
  $(".ajax-area-wrap").each(function() {
		var $ajaxAreaWrap = $(this),
			ajaxAreaWrap = {
				top: 0,
				height: 0
			},
			$btn = $('.pagen-ajax-load'),
			btn = {
				title: $btn.attr('title'),
				href: $btn.attr('href')
			},
			scrollTop = $(document).scrollTop(),
			win = windowSizeGet(),
			ajaxLoadInProcess = false;

		// Window Events
		$(window).on('resize', function() {
			win = windowSizeGet();
			ajaxAreaSizeDefine();
		});

		$(window).on('scroll', function() {
			scrollTop = $(document).scrollTop();
			ajaxAreaSizeDefine();
			if (scrollTop > ajaxAreaWrap.top + ajaxAreaWrap.height - win.height && !ajaxLoadInProcess && $btn.is(':visible')) {
				itemsLoadAjax($btn.attr('href'));
			}
		});

		// Button Events
		$btn.on('click', function() {
			$btn.addClass('effect-spin');
			History.pushState(null, btn.title, btn.href);
			itemsLoadAjax(btn.href);
			return false;
		});

		function itemsLoadAjax(href) {
			ajaxLoadInProcess = true;
			$.get(href, function(data) {
				var $btnInData = $(data).find(".pagen-ajax-load"),
					$ajaxAreaWrapInData = $(data).find(".ajax-area-wrap");
				if ($btnInData.length > 0) {
					$btn.attr('href', $btnInData.attr('href'));
				} else {
					$btn.parents('.button-holder').fadeOut();
				}
				$ajaxAreaWrap.append($ajaxAreaWrapInData.html());
				$btn.removeClass('effect-spin');
				setTimeout(function() {
          ajaxLoadInProcess = false;
        }, 1000);
			});
		}

		function ajaxAreaSizeDefine() {
			ajaxAreaWrap.top = $ajaxAreaWrap.offset().top;
			ajaxAreaWrap.height = $ajaxAreaWrap.outerHeight();
		}
  });

  //слайдер баннер
  if ($('.js-main-banner').length) {
    $('.js-main-banner').slick({
      mobileFirst: true,
      autoplay: true,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            arrows: true,
            dots: false,
            prevArrow: '<button class="slick-prev" type="button" title="Назад"><i class="ion-ios-arrow-back"></i></button>',
            nextArrow: '<button class="slick-next" type="button" title="Вперед"><i class="ion-ios-arrow-forward"></i></button>',
          }
        }
      ]
    });
  }

  //кастомный селект
  selector = $('.js-select').selectize();

  //скролл к контенту
  $('.banner-block__button').click(function() {
    if($('body').width()> 1199){
      var scroll = $('.page-content').offset().top - 60;
    } else {
      var scroll = $('.page-content').offset().top;
    }
    $('body, html').animate({
        scrollTop: scroll
    }, 300);
  });

  //открытие/закрытие меню на мобильном
  $(".js-categories-menu").click(function() {
    $(this).toggleClass("is-active");
    $(".categories-menu__list").slideToggle();
    return false;
  });

  //открытие/закрытие корзины в шапке
  $(".header__cart").on('click', '.js-cart-open', function() {
    $(".small-cart__dropdown").toggleClass('is-open');
    return false;
  });

  //закрытие корзины в шапке
  $(document).click(function(event) {
    if($('.small-cart__dropdown').hasClass('is-open')) {
      if($(event.target).closest('.small-cart__dropdown').length) return;
        $('.small-cart__dropdown').removeClass("is-open");
        event.stopPropagation();
    }
  });

  //открытие попапа регистрации
  $("[data-fancybox='form-popup']").fancybox({
    touch: false,
    infobar: false,
    toolbar: false,
    smallBtn: false,
    buttons: ["close"],
    animationEffect: false,
    arrows: false
	});

  //закрытие попапа
  $('.js-popup-close').on('click', function() {
  	$.fancybox.close();
  	return false;
  });

  //маска для поля ввода телефона
  if ($(".js-phone").length) {
    $(".js-phone").mask("+7 (999) 999-99-99");
  }

  //зум картинок на деталке
  if ($('#zoom').length) {
    $("#zoom").elevateZoom({
      gallery:'gallery',
      cursor: 'pointer',
      galleryActiveClass: 'active',
      //imageCrossfade: true,
      loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif',
      zoomWindowOffetx: 10,
      zoomWindowOffety: -3
    });
  }

  //скролл к блоку алфавита
  $('.alphabeth__list a').click(function () {
    if($('body').width()> 1199){
      var scrollTo = $($(this).attr('href')).offset().top - 60;
    } else {
      var scrollTo = $($(this).attr('href')).offset().top;
    }
    $('body, html').animate({
        scrollTop: scrollTo
    }, 300);
  });

  //слайдер на странице "о нас"
  if ($('.js-about-slider').length) {
    $('.js-about-slider').slick({
      mobileFirst: true,
      autoplay: true,
      arrows: false,
      dots: true
    });
  }

  //открытие/закрытие описания разделов фильтра
  $(".js-filter-text-opener").click(function() {
    $(".filter-text[data-text=" + $(this).attr("data-text") + "]").slideToggle();
    return false;
  });

  //открытие/закрытие фильтра
  $(".js-filter-opener").click(function() {
    $(".filter").slideToggle();
    return false;
  });
});

function windowSizeGet() {
	var win = {
		width: $(window).width(),
		height: $(window).height()
	}
	return win;
}
