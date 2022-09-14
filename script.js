(function($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function(func, threshold, execAsap) {
    var timeout;

    return function debounced() {
      var obj = this,
        args = arguments;

      function delayed() {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      }

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };
  // smartresize 
  jQuery.fn[sr] = function(fn) {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
  };

})(jQuery, 'smartresize');

var $ = jQuery;

(function() {

  ///////////////////////////////
  // Set Home Slideshow Height
  ///////////////////////////////

  function setHomeBannerHeight() {
    var windowHeight = jQuery(window).height();
    jQuery('#header').height(windowHeight);
  }

  ///////////////////////////////
  // Center Home Slideshow Text
  ///////////////////////////////

  function centerHomeBannerText() {
    var bannerText = jQuery('#header > .center');
    var bannerTextTop = (jQuery('#header').actual('height') / 2) - (jQuery('#header > .center').actual('height') / 2) - 40;
    bannerText.css('padding-top', bannerTextTop + 'px');
    bannerText.show();
  }

  function setHeaderBackground() {
    var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top 

    if (scrollTop > 300 || jQuery(window).width() < 700) {
      jQuery('#header .top').addClass('solid');
    } else {
      jQuery('#header .top').removeClass('solid');
    }
  }

  ///////////////////////////////
  // Initialize
  ///////////////////////////////

  jQuery.noConflict();
  setHomeBannerHeight();
  centerHomeBannerText();

  //Resize events
  jQuery(window).smartresize(function() {
    setHomeBannerHeight();
    centerHomeBannerText();
  });

})();

///////////////////////////////
// Smooth Scroll
///////////////////////////////

smoothScroll.init();

///////////////////////////////
// Animate Css
///////////////////////////////
var $ = jQuery;

function animationHover(element, animation) {
  element = $(element);
  element.hover(
    function() {
      element.addClass('animated ' + animation);
    },
    function() {
      //wait for animation to finish before removing classes
      window.setTimeout(function() {
        element.removeClass('animated ' + animation);
      }, 2000);
    });
}

$(document).ready(function() {
  $('#scrollToContent').each(function() {
    animationHover(this, 'pulse');
  });
});

///////////////////////////////
// Header Fixed
///////////////////////////////

var menu = $('#navigation');
var origOffsetY = menu.offset().top;

function scroll() {
  if ($(window).scrollTop() >= origOffsetY) {
    $('#navigation').addClass('nav-wrap');
    $('#services').addClass('exp');
    //$('.content').addClass('menu-padding');
  } else {
    $('#navigation').removeClass('nav-wrap');
    $('#services').removeClass('exp');
    //$('.content').removeClass('menu-padding');
  }
}

document.onscroll = scroll;

///////////////////////////////
// Testimonial Slide
///////////////////////////////

$(document).ready(function() {

  $("#testimonial-container").owlCarousel({

    navigation: false, // Show next and prev buttons
    slideSpeed: 700,
    paginationSpeed: 400,
    singleItem: true,
  });

});

$(document).ready(function() {
  $("#skype").click(function(e) {
    e.preventDefault();
    window.open('skype:richymel', '_blank');
    return false;
  });

  // Subscribe was pressed
  $("#subscribe").click(function(e) {
    e.preventDefault();
    if (validation()) {
      subscribeUser(e);
    }

  });
});

function subscribeUser(e) {
  console.log("Subscribe pressed");
  var requestData = {
    "email_address": $('#user_email').val(),
    "status": "subscribed",
    "merge_fields": {
      "FNAME": $('#user_name').val()
    }
  };
  console.log(requestData);
  //prepare the POST request
  requestData = JSON.stringify(requestData);
  console.log("stringified:");
  console.log(requestData);

  var options = {
    method: "post",
    contentType: "application/json",
    payload: requestData
  };
  //Execute the API call
  console.log("calling MailChimp");
  var subscribeOK = true; //simiulate ok
  if (subscribeOK) {
    $('#subscribe').hide();
    //Input protect
    $('#user_name').keypress(function(e) {
      e.preventDefault();
    });
    $('#user_email').keypress(function(e) {
      e.preventDefault();
    });
    $('#subscriberTag').text('Preferred Customer:');
    $("#subscribedOK").show();
  }
}

function validation() {
  var user_email = $('#user_email').val();
  var user_name = $('#user_name').val();
  var errors = false;
  $('#error1').hide();
  $('#error2').hide();

  if (!checkValidName(user_name)) {
    console.log('name is invalid!');
    $('#error1').show();
    errors = true;
    $('#user_name').focus();
  } else {
    //Capitalixe user name
    user_name = user_name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
    $('#user_name').val(user_name);
  }
  if (!checkValidEmail(user_email)) {
    console.log('email is invalid!');
    $('#error2').show();
    if (!errors) {
      $('#user_email').focus();
    }
    errors = true;
  }

  return !(errors); /* false  if errors */

}

function checkValidName(str) {
  return !(!str || str.trim().length < 2);
}

function checkValidEmail(str) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)) {
    return true;
  }
  return false;
}