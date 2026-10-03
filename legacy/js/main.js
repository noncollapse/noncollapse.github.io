---
layout: null
sitemap:
  exclude: 'no'
---
function toggleMobileMenu() {
  $('.navigation-wrapper').toggleClass('visible');
  var expanded = $('.navigation-wrapper').hasClass('visible');
  $('.btn-mobile-menu').attr('aria-expanded', String(expanded)).text(expanded ? 'Close menu' : 'Menu');
}

$(document).ready(function () {
  $('a.panel-button').click(function (e) {
    if ($('.content-wrapper').hasClass('showing')) {
      var clickedHash = $(this).attr('href').split('#')[1];
      var currentHash = window.location.hash.substring(1);
      if (clickedHash === currentHash) {
        $('.content-wrapper').removeClass('animated slideInRight')
        $('.panel-cover').removeClass('panel-cover--collapsed')
        $('.panel-cover').css('max-width', '100%')
        $('.panel-cover').animate({'width': '100%'}, 400, swing = 'swing', function () {})
        $('.content-wrapper').removeClass('showing')
        history.pushState("", document.title, window.location.pathname + window.location.search);
        //window.location.hash = '' // leaves #
        e.preventDefault();
        return;
      }
      var targetElement = $('#' + clickedHash); // 根据锚点查找目标元素
      if (targetElement.length) {  // 如果目标元素存在
        $('html, body').animate({
          scrollTop: targetElement.offset().top // 滚动到目标元素的位置
        }, 400); // 400ms的滚动动画
      }

    } else {

      $('.panel-cover').addClass('panel-cover--collapsed');
      currentWidth = $('.panel-cover').width()
      if (currentWidth < 960) {
        $('.panel-cover').addClass('panel-cover--collapsed')
        $('.content-wrapper').addClass('animated slideInRight')
      } else {
        $('.panel-cover').css('max-width', currentWidth)
        $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
      }
      $('.content-wrapper').addClass('showing');
    }
  })

  if (window.location.hash === '#projects' || window.location.hash === '#aboutme') {
    $('a.panel-button').filter(function () {
      return this.hash === window.location.hash;
    }).first().trigger('click');
  }

  if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  $('.btn-mobile-menu').click(function () {
    toggleMobileMenu();
  })

  $('.navigation-wrapper .projects-button, .navigation-wrapper .about-button').click(function () {
    toggleMobileMenu();
  })
})
