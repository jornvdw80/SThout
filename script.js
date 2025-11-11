
//https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file?page=1&tab=votes#tab-top
//https://www.beyondjava.net/html-includes

//=============
//First load: 
//=============

//function includeHtml () {
//    var includes = $('[data-include]')
//    $.each(includes, function () {
//        //var file = 'views/' + $(this).data('include') + '.html';
//        var file = $(this).data('include') + '.html';
//        $(this).load(file);
//        //alert(file);
//    })
//}

//$(function () {
//    var includes = $('[data-include]')
//    $.each(includes, function () {
//        var file = $(this).data('include') + '.html'
//        $(this).load(file)
//        //alert(file)
//    })
//})

//function includeHTML() {
//    var z, i, elmnt, file, xhttp;
//    /*loop through a collection of all HTML elements:*/
//    z = document.getElementsByTagName("*");
//    for (i = 0; i < z.length; i++) {
//        elmnt = z[i];
//        /*search for elements with a certain atrribute:*/
//        file = elmnt.getAttribute("w3-include-html");
//        if (file) {
//            /*make an HTTP request using the attribute value as the file name:*/
//            xhttp = new XMLHttpRequest();
//            xhttp.onreadystatechange = function () {
//                if (this.readyState == 4) {
//                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
//                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
//                    /*remove the attribute, and call this function once more:*/
//                    elmnt.removeAttribute("w3-include-html");
//                    includeHTML();
//                }
//            }
//            xhttp.open("GET", file, true);
//            xhttp.send();
//            /*exit the function:*/
//            return;
//        }
//    }
//}


//TODO: IExplorer

$(window).load(function () {
    //Show a loading gif on loading, with a timeout:
    setTimeout(function () { resetLoader() }, 1000);
    //includeHtml();
    //Set up swipers:
    initializeSwipers();
    //Ensure navigation menu's are shown correctly in all (!) circumstances.
    hideNavigate();
    makeShort();
    animateAside();
});

$(document).ready(function () {
    setBrowserStyle();
    getOSSettings();
    setEvents();
    goTo(getActiveMenu());
    initializeNews();
    initializeProducts();
    initializeEvents();   
});

var isMobile = false;
$(window).bind('resizeEnd', function () {
    if (!isMobile) {
        doResize();
    }
});

$(window).resize(function () {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    animateAside();
    this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
    }, 500);
});

document.addEventListener('scroll', function (e) {
    highLightActivePage();
    hideMenu();
});

function resetLoader() {
    $(".se-pre-con").fadeOut(750);
}

//==============
//Check browser:
//==============
function isIE() {
    ua = navigator.userAgent;
    //MSIE used to detect old browsers and Trident used to newer ones
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
}

function setBrowserStyle() {
    if (!isIE()) {
        document.getElementById("mainslides").style.display = "block";
        setStyle('basicMode', 'none');
        setStyle('warnings', 'none');
        setStyle('isIE', 'none');
    }
    else {
        document.getElementById("mainslides").style.display = "none";
        setStyle('basicMode', 'block');
        setStyle('warnings', 'block');
        setStyle('isIE', 'block');
    }
}

function setStyle(name, setting) {
    var items = document.getElementsByClassName(name);
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = setting;
    }
}


//================
//Set click event:
//================
function getOSSettings() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        isMobile = true;
        document.documentElement.requestFullscreen({ navigationUI: 'hide' });
        //alert("BUMMER! You are using a mobile device.");
    } else {
        // false for not mobile device
        isMobile = false;
        //alert("GREAT! You are not using a mobile device, probably it's a desktop or laptop.");
    }

    //Making "clicking" work on mobile devices, especially on iPhones:
    var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");
    $("a").bind(clickHandler, function (e) {
        //alert("clicked or tapped. This button used: " + clickHandler);
    });
    $("li").bind(clickHandler, function (e) {
        //alert("clicked or tapped. This button used: " + clickHandler);
    });
    $("button").bind(clickHandler, function (e) {
        //alert("clicked or tapped. This button used: " + clickHandler);
    });
    $("textarea").bind(clickHandler, function (e) {
        //alert("clicked or tapped. This button used: " + clickHandler);
    });
    //$("img").bind(clickHandler, function (e) {
    //    alert("clicked or tapped. This button used: " + clickHandler);
    //});
    $(".brandBullet").bind(clickHandler, function (e) {
        //alert("clicked or tapped. This button used: " + clickHandler);
    });
    $(".clickZone").bind(clickHandler, function (e) {
        //alert("clicked or tapped. This button used: " + clickHandler);
    });
    $(".popupClickZone").bind(clickHandler, function (e) {
        //alert("clicked or tapped. This button used: " + clickHandler);
    });
    $(".popupInfo").bind(clickHandler, function (e) {
        //alert("clicked or tapped. This button used: " + clickHandler);
    });
}


//================================
//Responsive aside with animation:
//================================
function getActiveMenu() { return $("#aside-nav ul li a.active").attr("name").replace("#", "") }
function resizeLastPage() { $height = $(window).innerHeight() - 240, $(".page5").height($height) }
function doResize() { goTo(getActiveMenu()); }
function animateAside() { hideMenu(); document.body.clientWidth <= 950 ? $('aside').slideUp(250) : $("aside").slideDown(250); }


//==============================
//Set upcoming and past events:
//==============================
function setEvents() { $("#eventsList li").each(function () { var t = "future", e = (new Date).toDateString(); Date.parse(e) > Date.parse($(this).attr("id")) && (t = "past"), $(this).addClass(t) }) }


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

function openGoogleMaps() {
    return !window.open('https://goo.gl/maps/rth2eMBuX1s8G3udA');
}

//TODO: test on iPhone?
function copyToClipboard(id) {
    let copyTextarea = document.querySelector('#' + id);
    copyTextarea.focus();
    copyTextarea.select();
    try {
        let successful = document.execCommand('copy');
        //let msg = successful ? 'successful' : 'unsuccessful';
        //alert('Copy text command was ' + msg);
        toggleTooltip(id);
    } catch (err) {
        alert('Het kopiëren is mislukt!');
    }
}

function toggleTooltip(id) {
    clearTimeout(timeout);
    var element = 'copy' + id;
    var popup = document.getElementById(element);
    popup.classList.toggle("show");
    //popup.fadeOut('fast'); => gives exception!
    var timeout = setTimeout(function () {
        document.getElementById(element).classList.toggle("show");
    }, 1500);
}

function clearSelection() {
    if (document.selection)
        document.selection.empty();
    else if (window.getSelection)
        window.getSelection().removeAllRanges();
}

function closeWarning () {
    document.getElementById("warning").style.display = "none";
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
    o = o.replace("#", "");
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
    hideMenu();
}


//==============
//KeyStrokes:
//==============
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        closeModal();
    }
    else if (evt.keyCode == 38) {
        goToPrevious();
    }
    else if (evt.keyCode == 40) {
        goToNext();
    }
}


//==============
//Image swiper:
//==============

var swiper1;
var swiper2;

function initializeSwipers() {
    if (!isIE()) {
        swiper1 = new Swiper(".swiper1", { slidesPerView: 1, spaceBetween: 200, loop: !0, preloadImages: !1, lazy: !0, effect: "flip", flipEffect: { rotate: 30, slideShadows: !1 }, autoplay: { delay: 3500, disableOnInteraction: !1 }, pagination: { el: ".swiper-pagination1", clickable: !0, dynamicBullets: !0 }, navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }, keyboard: { enabled: !0, onlyInViewport: !1 } });
        swiper2 = new Swiper(".swiper2", { slidesPerView: 1, spaceBetween: 200, loop: !0, preloadImages: !1, lazy: !0, effect: "flip", flipEffect: { rotate: 30, slideShadows: !1 }, pagination: { el: ".swiper-pagination2", clickable: !0, dynamicBullets: !0 }, navigation: { nextEl: ".swiper-button-next2", prevEl: ".swiper-button-prev2" }, keyboard: { enabled: !0, onlyInViewport: !1 }, mousewheel: { invert: !0 } });
    }
}

function openModal(index) {
    if (!isIE()) {
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
        });
        var toggle = true;
        swiper2.on('slideChange', function () {
            $(".popupInfo").hide();
            togglePopupInfo();//.slideUp('fast');
            toggle = false;
        });
        swiper2.slideToLoop(index - 1);
        if (toggle) {
            togglePopupInfo();
        }
    }
}

function selectPopupSlide(index) {
    swiper2.slideToLoop(index - 1);
    $(".slideTitle").focus();
}

function togglePopupInfo() {
    var isVisible = false;
    var duration = 500;
    var item = $(".popupInfo");
    if (item.is(":visible")) { isVisible = true; }
    item.fadeOut(duration);
    if (isVisible) { item.fadeOut(duration); } else { item.fadeIn(duration); }
}


//===============================
//Add some animation to the menu:
//===============================

function showNavigate() { $("#navigate ul").css({ opacity: "0.9" }) }
function hideNavigate() { $("#navigate ul").css({ opacity: "0.5" }) }
function makeTall() { $("#main-nav").addClass("menu-down"), $("#header").css({ opacity: "1" }), document.body.clientWidth > 950 && $("aside").slideUp(250), $("#main-nav ul").slideDown(250) }
function makeShort() { $("#main-nav").removeClass("menu-down"), $("#main-nav ul").slideUp(250), document.body.clientWidth > 950 && $("aside").slideDown(250), $("#header").css({ opacity: "0.9" }) }

function toggleMenuClick() {
    var isVisible = false;
    if ($("#main-nav ul").is(":visible")) { isVisible = true; }
    $("#main-nav ul").slideUp(250);
    if (isVisible) {
        hideNavigate();
        makeShort();
    } else {
        showNavigate();
        makeTall();
    }
}

function hideMenu() {
    var isVisible = false;
    if ($("#main-nav ul").is(":visible")) { isVisible = true; }
    if (isVisible) {
        hideNavigate();
        makeShort();
    }
}

//Highlight active page on menu
function highLightActivePage() {
    var o = $(document).scrollTop() + 156, a = $(".active");
    $("#main-nav a").each(function () {
        var t = $(this), a = $(t.attr("name"));
        a.position().top <= o && a.position().top + a.height() > o ? t.addClass("active") : t.removeClass("active")
    }),
        $("#aside-nav a").each(function () {
            var t = $(this), a = $(t.attr("name"));
            a.position().top <= o && a.position().top + a.height() > o ? t.addClass("active") : t.removeClass("active")
        }), 0 == $(".active").length && a.addClass("active");
}
