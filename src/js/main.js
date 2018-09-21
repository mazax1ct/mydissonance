//активация кнопки "наверх"
$(window).scroll(function () {
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

$(document).ready(function() {
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
  })
  //открытие/закрытие меню на мобильном
  $(".js-categories-menu").click(function() {
    $(this).toggleClass("is-active");
    $(".categories-menu__list").slideToggle();
    return false;
  });

  //открытие/закрытие корзины в шапке
  $(".js-cart-open").click(function() {
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
});
