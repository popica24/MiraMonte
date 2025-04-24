/* main js */
(function ($) {
  "use strict";

  $(document).ready(function () {
    /* Mobaile menu slider */
    $(".navbar-toggler").on("click", function () {
      $(".lh-sidebar-overlay").fadeIn();
      $(".lh-mobile-menu").addClass("lh-menu-open");
    });
    $(".lh-sidebar-overlay, .lh-close").on("click", function () {
      $(".lh-sidebar-overlay").fadeOut();
      $(".lh-mobile-menu").removeClass("lh-menu-open");
    });

    function ResponsiveMobilemsMenu() {
      var $msNav = $(".lh-menu-content"),
        $msNavSubMenu = $msNav.find(".sub-menu");
      $msNavSubMenu.parent().prepend('<span class="menu-toggle"></span>');

      $msNav.on("click", "li a, .menu-toggle", function (e) {
        var $this = $(this);
        if ($this.attr("href") === "#" || $this.hasClass("menu-toggle")) {
          e.preventDefault();
          if ($this.siblings("ul:visible").length) {
            $this.parent("li").removeClass("active");
            $this.siblings("ul").slideUp();
            $this.parent("li").find("li").removeClass("active");
            $this.parent("li").find("ul:visible").slideUp();
          } else {
            $this.parent("li").addClass("active");
            $this
              .closest("li")
              .siblings("li")
              .removeClass("active")
              .find("li")
              .removeClass("active");
            $this.closest("li").siblings("li").find("ul:visible").slideUp();
            $this.siblings("ul").slideDown();
          }
        }
      });
    }

    ResponsiveMobilemsMenu();

    /* Room Tabs */
    if ($(".room-content").length > 0 && $(".nav-link.active").length > 0) {
      $(".room-content").addClass("hidden");
      var activeRoomNum = $(".nav-link.active").attr("id");
      if (activeRoomNum) {
        activeRoomNum = activeRoomNum.split("-")[1];
        $("#room-" + activeRoomNum + "-content").removeClass("hidden");
        $(".room-active-" + activeRoomNum).removeClass("hidden");
      }

      // Unified click handler for all room selectors
      $("[id^='room-'][id$='-selector']").on("click", function () {
        // Get the room number from the id
        const roomNum = $(this).attr("id").split("-")[1];

        // Remove active class from all selectors
        $("[id^='room-'][id$='-selector']").removeClass("active");

        // Add active class to clicked selector
        $(this).addClass("active");

        // Hide all content divs
        $(".room-content").addClass("hidden");
        $(".room-active-1").addClass("hidden");
        $(".room-active-2").addClass("hidden");
        $(".room-active-3").addClass("hidden");
        $(".room-active-4").addClass("hidden");
        $(".room-active-5").addClass("hidden");
        $(".room-active-6").addClass("hidden");

        // Show the content for the selected room
        $("#room-" + roomNum + "-content").removeClass("hidden");
        $(".room-active-" + roomNum).removeClass("hidden");
      });
    }

    // Function to get previous slide image
    function get_prev_slick_img() {
      var prevSlide = $(".lh-slider .slick-current").prev();
      if (prevSlide.length === 0) {
        prevSlide = $(".lh-slider .slick-slide").last();
      }
      var prevSlideImg = prevSlide.find("img").attr("src");
      if (prevSlideImg) {
        $(".prev-slick-img img").attr("src", prevSlideImg);
      }
    }

    // Function to get next slide image
    function get_next_slick_img() {
      var nextSlide = $(".lh-slider .slick-current").next();
      if (nextSlide.length === 0) {
        nextSlide = $(".lh-slider .slick-slide").first();
      }
      var nextSlideImg = nextSlide.find("img").attr("src");
      if (nextSlideImg) {
        $(".next-slick-img img").attr("src", nextSlideImg);
      }
    }

    // Initialize Testimonials slider only if the element exists
    if ($(".lh-slider").length > 0) {
      // Check if already initialized
      if (!$(".lh-slider").hasClass("slick-initialized")) {
        $(".lh-slider").slick({
          rows: 1,
          dots: false,
          arrows: true,
          infinite: true,
          speed: 1500,
          slidesToShow: 1,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: false,
                arrows: false,
              },
            },
          ],
        });
      }
    }

    // Window load and resize event
    $(window).on("load resize", function () {
      setTimeout(function () {
        // Make sure slider is initialized
        if ($(".lh-slider").hasClass("slick-initialized")) {
          // Check if navigation arrows already have our custom elements
          if ($(".lh-slider .slick-prev .prev-slick-arrow").length === 0) {
            $(".lh-slider .slick-prev").prepend(
              '<div class="prev-slick-arrow arrow-icon"><span>&#60;</span></div><div class="prev-slick-img slick-thumb-nav"><img src="/prev.jpg" class="img-responsive"></div>'
            );
          }

          if ($(".lh-slider .slick-next .next-slick-arrow").length === 0) {
            $(".lh-slider .slick-next").append(
              '<div class="next-slick-arrow arrow-icon"><span>&#62;</span></div><div class="next-slick-img slick-thumb-nav"><img src="/next.jpg" class="img-responsive"></div>'
            );
          }

          // Only call these functions if the slider has slides
          if ($(".lh-slider .slick-slide").length > 0) {
            try {
              get_prev_slick_img();
              get_next_slick_img();
            } catch (e) {
              console.error("Error updating slider navigation images:", e);
            }
          }
        }
      }, 100);
    });

    // Color selection
    $(".lh-color li").click(function () {
      $(".lh-color li").removeClass("active-colors");
      $(this).addClass("active-colors");
    });

    /* Color show */
    $(".c1").click(function () {
      $("#add_class").remove();
    });
    $(".c2").click(function () {
      $("#add_class").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/color-1.css" id="add_class">'
      );
    });
    $(".c3").click(function () {
      $("#add_class").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/color-2.css" id="add_class">'
      );
    });
    $(".c4").click(function () {
      $("#add_class").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/color-3.css" id="add_class">'
      );
    });
    $(".c5").click(function () {
      $("#add_class").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/color-4.css" id="add_class">'
      );
    });
    $(".c6").click(function () {
      $("#add_class").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/color-5.css" id="add_class">'
      );
    });
    $(".c7").click(function () {
      $("#add_class").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/color-6.css" id="add_class">'
      );
    });
    $(".c8").click(function () {
      $("#add_class").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/color-7.css" id="add_class">'
      );
    });
    $(".c9").click(function () {
      $("#add_class").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/color-8.css" id="add_class">'
      );
    });

    /* Dark mode */
    $(".dark-mode li").click(function () {
      $(".dark-mode li").removeClass("active-dark-mode");
      $(this).addClass("active-dark-mode");
    });

    $(".dark").click(function () {
      $("#add_dark_mode").remove();
      $("head").append(
        '<link rel="stylesheet" class="dark-link-mode" href="assets/css/dark.css" id="add_dark_mode">'
      );
    });
    $(".white").click(function () {
      $("#add_dark_mode").remove();
    });

    /* Skin mode */
    $(".skin-1").click(function () {
      $("#add_skin").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/shape-1.css" id="add_skin">'
      );
      $(".skin-mode li").removeClass("active");
      $(this).addClass("active");
    });
    $(".skin-2").click(function () {
      $("#add_skin").remove();
      $("head").append(
        '<link rel="stylesheet" href="assets/css/shape-2.css" id="add_skin">'
      );
      $(".skin-mode li").removeClass("active");
      $(this).addClass("active");
    });
    $(".skin-3").click(function () {
      $("#add_skin").remove();
      $(".skin-mode li").removeClass("active");
      $(this).addClass("active");
    });

    /* Slider room details */
    if ($(".slider-for").length > 0 && $(".slider-nav").length > 0) {
      $(".slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: ".slider-nav",
      });
      $(".slider-nav").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ".slider-for",
        focusOnSelect: true,
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });
    }

    /* Input date */
    if ($.fn.calendar) {
      $("#date_1").calendar({
        type: "date",
      });
      $("#date_2").calendar({
        type: "date",
      });
    }

    /* Replace all SVG images with inline SVG */
    $('img.svg-img[src$=".svg"]').each(function () {
      var $img = $(this);
      var imgURL = $img.attr("src");
      var attributes = $img.prop("attributes");

      $.get(
        imgURL,
        function (data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find("svg");

          // Remove any invalid XML tags
          $svg = $svg.removeAttr("xmlns:a");

          // Loop through IMG attributes and apply on SVG
          $.each(attributes, function () {
            $svg.attr(this.name, this.value);
          });

          // Replace IMG with SVG
          $img.replaceWith($svg);
        },
        "xml"
      );
    });

    /* Blog Sider */
    if ($(".blog-slider").length > 0) {
      $(".blog-slider").slick({
        slidesToShow: 4,
        infinite: true,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }

    /* Copyright year */
    var date = new Date().getFullYear();
    if (document.getElementById("copyright_year")) {
      document.getElementById("copyright_year").innerHTML = date;
    }
  });
})(jQuery);
