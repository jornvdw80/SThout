
//=============
//First load: 
//=============
var initialLoad = !0;
$(document).ready(function () {
    initialLoad && (
        setEvents(),
        goTo(getActiveMenu())),
        resizeLastPage(),
        initializeNews(),
        initializeProducts(),
        initializeEvents(),
        initializeSwipers(),
        $("#circle-action").css("visibility", "hidden"), $("footer").css("visibility", "hidden"),
        initialLoad = !1;
    $(window).resize(function () {
        doResize();
    });
});


//==============
//Check browser:
//==============
function isIE() {
    ua = navigator.userAgent;
    //MSIE used to detect old browsers and Trident used to newer ones
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}
//Create an alert to show if the browser is IE or not
if (isIE()) {
    alert('U maakt gebruik van Internet Explorer.\n Deze website werkt daardoor niet optimaal. \n Maak gebruik van een recentere browser!');
}


//================================
//Responsive aside with animation:
//================================
function getActiveMenu() { return $("#aside-nav ul li a.active").attr("name").replace("#", "") }
function resizeLastPage() { $height = $(window).innerHeight() - 240, $(".page5").height($height) }
function doResize() { getActiveMenu(); document.body.clientWidth <= 950 ? $("aside").slideUp(250) : $("aside").slideDown(250); resizeLastPage(); }


//==============================
//Set upcoming and past events:
//==============================
function setEvents() {$("#eventsList li").each(function () { var t = "future", e = (new Date).toDateString(); Date.parse(e) > Date.parse($(this).attr("id")) && (t = "past"), $(this).addClass(t) })}


//=====================
//Products:
//=====================

// Add active class to the first button (highlight it)
function initializeProducts() {
    var header = document.getElementById("products");
    var btns = header.getElementsByClassName("productBtn");
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        if (i == 0) {
            item.className += " activeProductBtn";
            document.getElementById(item.innerHTML).className = "collapse in";
            return;
        }
    }
}

function showProducts(target) {
    goTo('portfolio');
    var header = document.getElementById("products");
    var btns = header.getElementsByClassName("productBtn");
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        item.className = item.className.replace(" activeProductBtn", "");
        if (item.innerHTML === target) {
            item.className += " activeProductBtn";
            document.getElementById(item.innerHTML).className = "collapse in";
        }
        else {
            document.getElementById(item.innerHTML).className = "collapse";
        }
    }
}

//NOT USED:
function hideAllProducts() {
    var btns = document.getElementsByClassName("productBtn");
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        document.getElementById(item.innerHTML).className = 'collapse';
    }
}


//=====================
//News:
//=====================

// Add active class to the first button (highlight it)
function initializeNews() {
    var header = document.getElementById('news');
    var btns = header.getElementsByClassName('newsBtn');
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        var currentYear = new Date().getFullYear();
        var currentItem = new Date(item.innerHTML).getFullYear();
        if (currentItem == currentYear || i == 0) {
            item.className += ' activeNewsBtn';
            document.getElementById(item.innerHTML).className = 'collapse in';
            return;
        }
    }
}

function showNews(target) {
    goTo('news');
    var header = document.getElementById("news");
    var btns = header.getElementsByClassName("newsBtn");
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        item.className = item.className.replace(" activeNewsBtn", "");
        if (item.innerHTML === target) {
            item.className += " activeNewsBtn";
            document.getElementById(item.innerHTML).className = "collapse in";
        }
        else {
            document.getElementById(item.innerHTML).className = "collapse";
        }
    }
}

function toggleNewsInfo(e, info) {
    var isVisible = true;
    var item = $(info);
    var element = $(".newsInfo");
    if (item.is(":visible")) { isVisible = false; }
    element.slideUp();
    if (isVisible) { item.slideDown(); } else { item.slideUp(); };
    e.scrollIntoView({ behavior: "smooth", block: "center" });
}

//NOT USED:
function hideAllNews() {
    var btns = document.getElementsByClassName('newsBtn');
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        document.getElementById(item.innerHTML).className = 'collapse';
    }
}


//=====================
//Events:
//=====================

// Add active class to the current button (highlight it)
function initializeEvents() {
    var header = document.getElementById('years');
    var btns = header.getElementsByClassName('yearBtn');
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        var currentYear = new Date().getFullYear();
        var currentItem = new Date(item.innerHTML).getFullYear();
        if (currentItem == currentYear || i == 0) {
            item.className += " activeYearBtn";
            document.getElementById(item.innerHTML).className = "collapse in";
        }
    }
}

function showEvents(target) {
    goTo('events');
    var header = document.getElementById("events");
    var btns = header.getElementsByClassName("yearBtn");
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        item.className = item.className.replace(" activeYearBtn", "");
        if (item.innerHTML === target) {
            item.className += " activeYearBtn";
            document.getElementById(item.innerHTML).className = "collapse in";
        }
        else {
            document.getElementById(item.innerHTML).className = "collapse";
        }
    }
}

function toggleEventsInfo(e, info) {
    var isVisible = true;
    var item = $(info);
    var element = $(".eventInfo");
    if (item.is(":visible")) { isVisible = false; }
    element.slideUp();
    if (isVisible) { item.slideDown(); } else { item.slideUp(); };
    e.scrollIntoView({ behavior: "smooth", block: "center" });
}

//NOT USED:
function hideAllEvents() {
    var btns = document.getElementsByClassName("yearBtn");
    for (var i = 0; i < btns.length; i++) {
        var item = btns[i];
        document.getElementById(item.innerHTML).className = "collapse";
    };
}


//==============
//Navigation:
//==============
function openUrl(url) {
    return !window.open(url);
}

function closeModal() {
    goTo('portfolio');
    document.getElementById("myModal").style.display = "none";
    goTo('portfolio');
}

function goToPrevious() {
    if ($(".active")[0].id == "first") { goTo(document.getElementById("last").getAttribute("name").replace("#", "")) } else { var o = $(".active").closest("li").prev("li").find("a").attr("name").replace("#", ""); goTo(o) }
}

function goToNext() {
    if ($(".active")[0].id == "last") { goTo(document.getElementById("first").getAttribute("name").replace("#", "")) } else { var o = $(".active").closest("li").next("li").find("a").attr("name").replace("#", ""); goTo(o) }
}

function goToActive() {
    goTo($(".active")[0].getAttribute("name").replace("#", ""));
}

function goTo(o) {
    //initializeNews();
    //initializeProducts();
    $("html,body").animate({ scrollTop: $("#" + o).offset().top - 78 }, 900);
    if (o != $(".active").attr("name").replace("#", "")) {
        $("#main-nav a").each(function () {
            var t = $(this), a = $(t.attr("name"));
            a.position().top <= o && a.position().top + a.height() > o ? t.addClass("active") : t.removeClass("active")
        });
        $("#aside-nav a").each(function () {
            var t = $(this), a = $(t.attr("name"));
            a.position().top <= o && a.position().top + a.height() > o ? t.addClass("active") : t.removeClass("active")
        });
    }
}


//==============
//KeyStrokes:
//==============
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        //alert('Esc key pressed.');
        closeModal();
    }
}


//==============
//Image swipers:
//==============
var swiper1 = new Swiper();
var swiper2 = new Swiper();

//Initialize Swipers
function initializeSwipers() {
    swiper1 = new Swiper('.swiper1', {
        slidesPerView: 1,
        spaceBetween: 200,
        loop: true,
        preloadImages: false,
        lazy: true,
        effect: 'flip',
        flipEffect: {
            rotate: 30,
            slideShadows: false,
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination1',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
    });

    swiper2 = new Swiper('.swiper2', {
        slidesPerView: 1,
        spaceBetween: 200,
        loop: true,
        preloadImages: false,
        lazy: true,
        effect: 'flip',
        flipEffect: {
            rotate: 30,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination2',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        mousewheel: {
            invert: true,
        },
    }); 
}

function openModal(index) {
    $(".popupInfo").hide();
    document.getElementById("myModal").style.display = "block";
    swiper2.destroy(false, false); //important, otherwise freaky behaviour!!!!
    swiper2 = new Swiper('.swiper2', {
        slidesPerView: 1,
        spaceBetween: 200,
        loop: true,
        preloadImages: false,
        lazy: true,
        effect: 'flip',
        flipEffect: {
            rotate: 30,
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination2',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        mousewheel: {
            invert: true,
        },
        //on: {
        //    slideChange: function slideChange(swiper2) {
        //        //onClick.bind(swiper2)
        //        //swiper2.update();
        //        //alert(swiper2.activeIndex);
        //        //if (swiper.history.initialized && swiper.params.cssMode) {
        //        //    swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        //        //}
        //    }
        //}
    });
    var toggle = true;
    swiper2.on('slideChange', function () {
        //$(this).trigger('click');
        $(".popupInfo").hide();
        togglePopupInfo();//.slideUp('fast');
        toggle = false;
        //$(".popupInfo").style.display = "none";
        //resetHoverTouch();
        //resetTouchEnd();
        //alert('test');
    });

    //swiper2.slideTo(index);
    swiper2.slideToLoop(index - 1);
    if (toggle) {
        togglePopupInfo();
    }
}

function selectPopupSlide(index) {
    swiper2.slideToLoop(index - 1);
    $(".slideTitle").focus();
}

function togglePopupInfo() {
    var isVisible = false;
    var duration = 500;
    if ($(".popupInfo").is(":visible")) { isVisible = true; }
    $(".popupInfo").fadeOut(duration);
    if (isVisible) { $(".popupInfo").fadeOut(duration); } else { $(".popupInfo").fadeIn(duration); }
    $(".slideTitle").focus();
}


////===============================
////Add some animation to the menu:
////===============================
////<script type="text/javascript" src="http://code.jquery.com/jquery.js"></script>
//function doNothing() { }
//function showNavigate() { $("#navigate ul").css({ opacity: "0.9" }) }
//function hideNavigate() { $("#navigate ul").css({ opacity: "0.5" }) }
//function makeTall() { $("#main-nav").addClass("menu-down"), $("#header").css({ opacity: "1" }), document.body.clientWidth > 950 && $("aside").slideUp(250), $("#main-nav ul").slideDown(250) }
//function makeShort() { $("#main-nav").removeClass("menu-down"), $("#main-nav ul").slideUp(250), document.body.clientWidth > 950 && $("aside").slideDown(250), $("#header").css({ opacity: "0.9" }) }
//function toggleMenu() { $("#main-nav.menu-down") && makeShort() } $(document).ready(function () { $("#header").hoverIntent(makeTall, doNothing, ".menu-icon"), $("#main-nav ul").hover(doNothing, makeShort), $("#navigate ul").hover(showNavigate, hideNavigate) });

//function toggleMenuClick() {
//    var isVisible = false;
//    if ($("#main-nav ul").is(":visible")) { isVisible = true; }
//    $("#main-nav ul").slideUp(250);
//    if (isVisible) { $("aside").slideDown(); $("#main-nav ul").slideUp(); } else { $("aside").slideUp(); $("#main-nav ul").slideDown(); }
//}


////==============================
////Highlight active page on menu:
////==============================
//function onScroll(t) {
//    toggleMenu();
//    var o = $(document).scrollTop() + 156, a = $(".active");
//    $("#main-nav a").each(function () {
//        var t = $(this), a = $(t.attr("name"));
//        a.position().top <= o && a.position().top + a.height() > o ? t.addClass("active") : t.removeClass("active")
//    }),
//    $("#aside-nav a").each(function () {
//        var t = $(this), a = $(t.attr("name"));
//        a.position().top <= o && a.position().top + a.height() > o ? t.addClass("active") : t.removeClass("active")
//        }), 0 == $(".active").length && a.addClass("active")
//    }
//    var t = -1; $(document).ready(function () {
//    t && clearTimeout(t), t = setTimeout($(window).on("scroll", onScroll), 100)
//});


////==============
////hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
////==============
////http://cherne.net/brian/resources/jquery.hoverIntent.html
////You may use hoverIntent under the terms of the MIT license. Basically that
////means you are free to use hoverIntent as long as this header is left intact.
////Copyright 2007, 2014 Brian Cherne
//!function (e) { e.fn.hoverIntent = function (t, n, o) { var r = { interval: 400, sensitivity: 6, timeout: 0 }; r = "object" == typeof t ? e.extend(r, t) : e.isFunction(n) ? e.extend(r, { over: t, out: n, selector: o }) : e.extend(r, { over: t, out: t, selector: n }); var v, i, u, s, h = function (e) { v = e.pageX, i = e.pageY }, I = function (t, n) { return n.hoverIntent_t = clearTimeout(n.hoverIntent_t), Math.sqrt((u - v) * (u - v) + (s - i) * (s - i)) < r.sensitivity ? (e(n).off("mousemove.hoverIntent", h), n.hoverIntent_s = !0, r.over.apply(n, [t])) : (u = v, s = i, n.hoverIntent_t = setTimeout(function () { I(t, n) }, r.interval), void 0) }, a = function (e, t) { return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = !1, r.out.apply(t, [e]) }, c = function (t) { var n = e.extend({}, t), o = this; o.hoverIntent_t && (o.hoverIntent_t = clearTimeout(o.hoverIntent_t)), "mouseenter" === t.type ? (u = n.pageX, s = n.pageY, e(o).on("mousemove.hoverIntent", h), o.hoverIntent_s || (o.hoverIntent_t = setTimeout(function () { I(n, o) }, r.interval))) : (e(o).off("mousemove.hoverIntent", h), o.hoverIntent_s && (o.hoverIntent_t = setTimeout(function () { a(n, o) }, r.timeout))) }; return this.on({ "mouseenter.hoverIntent": c, "mouseleave.hoverIntent": c }, r.selector) } }(jQuery);


////==============================
////Automatic Slideshow: NOT USED
////==============================
////CHECK: https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_ref_js_carousel2&stacked=h
//var timeout;
//var slideIndex = 0;
//showSlides();

//function showSlides() {
//    var i;
//    var slides = document.getElementsByClassName("slides");
//    var dots = document.getElementsByClassName("dot");
//    for (i = 0; i < slides.length; {
//        slides[i].style.display = "none",
//    }
//    slideIndex++;
//    if (slideIndex > slides.length) {slideIndex = 1; }
//    if (slideIndex < 1) { slideIndex = slides.length}
//        for (i = 0; i < dots.length; {
//            dots[i].className = dots[i].className.replace(" current", "");
//        }
//        slides[slideIndex - 1].style.display = "block";
//        dots[slideIndex - 1].className += " current";
//        timeout = setTimeout(showSlides, 4500);
//    }

//function selectWithIndicator(index) {
//    clearTimeout(timeout);
//    slideIndex = index;
//    showSlides();
//}

//function selectWithArrow(index) {
//    clearTimeout(timeout);
//    slideIndex += (index - 1);
//    showSlides();
//}
