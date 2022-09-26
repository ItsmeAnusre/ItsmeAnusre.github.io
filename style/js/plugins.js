/*-------------------------------------------------------------------------------------
[TABLE OF CONTENTS]
01. SMARTMENUS
02. STICKY HEADER
03. HAMBURGER MENU ICON
04. PICTUREFILL RETINA IMAGE
05. CUBE PORTFOLIO
06. FLICKITY
07. PROGRESSBAR
08. WAYPOINTS
09. COUNTER UP
10. COUNTDOWN
11. PLYR
12. AOS
13. ISOTOPE
18. VANILLA
19. BACKSTRETCH
20. EASING
21. PRETTIFY
-------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*	01. SMARTMENUS
/*-----------------------------------------------------------------------------------*/
/*! SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */
(function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(require("jquery")) : t(jQuery)
})(function($) {
    function initMouseDetection(t) {
        var e = ".smartmenus_mouse";
        if (mouseDetectionEnabled || t) mouseDetectionEnabled && t && ($(document).off(e), mouseDetectionEnabled = !1);
        else {
            var i = !0,
                s = null,
                o = {
                    mousemove: function(t) {
                        var e = {
                            x: t.pageX,
                            y: t.pageY,
                            timeStamp: (new Date).getTime()
                        };
                        if (s) {
                            var o = Math.abs(s.x - e.x),
                                a = Math.abs(s.y - e.y);
                            if ((o > 0 || a > 0) && 2 >= o && 2 >= a && 300 >= e.timeStamp - s.timeStamp && (mouse = !0, i)) {
                                var n = $(t.target).closest("a");
                                n.is("a") && $.each(menuTrees, function() {
                                    return $.contains(this.$root[0], n[0]) ? (this.itemEnter({
                                        currentTarget: n[0]
                                    }), !1) : void 0
                                }), i = !1
                            }
                        }
                        s = e
                    }
                };
            o[touchEvents ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut"] = function(t) {
                isTouchEvent(t.originalEvent) && (mouse = !1)
            }, $(document).on(getEventsNS(o, e)), mouseDetectionEnabled = !0
        }
    }

    function isTouchEvent(t) {
        return !/^(4|mouse)$/.test(t.pointerType)
    }

    function getEventsNS(t, e) {
        e || (e = "");
        var i = {};
        for (var s in t) i[s.split(" ").join(e + " ") + e] = t[s];
        return i
    }
    var menuTrees = [],
        mouse = !1,
        touchEvents = "ontouchstart" in window,
        mouseDetectionEnabled = !1,
        requestAnimationFrame = window.requestAnimationFrame || function(t) {
            return setTimeout(t, 1e3 / 60)
        },
        cancelAnimationFrame = window.cancelAnimationFrame || function(t) {
            clearTimeout(t)
        },
        canAnimate = !!$.fn.animate;
    return $.SmartMenus = function(t, e) {
        this.$root = $(t), this.opts = e, this.rootId = "", this.accessIdPrefix = "", this.$subArrow = null, this.activatedItems = [], this.visibleSubMenus = [], this.showTimeout = 0, this.hideTimeout = 0, this.scrollTimeout = 0, this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.idInc = 0, this.$firstLink = null, this.$firstSub = null, this.disabled = !1, this.$disableOverlay = null, this.$touchScrollingSub = null, this.cssTransforms3d = "perspective" in t.style || "webkitPerspective" in t.style, this.wasCollapsible = !1, this.init()
    }, $.extend($.SmartMenus, {
        hideAll: function() {
            $.each(menuTrees, function() {
                this.menuHideAll()
            })
        },
        destroy: function() {
            for (; menuTrees.length;) menuTrees[0].destroy();
            initMouseDetection(!0)
        },
        prototype: {
            init: function(t) {
                var e = this;
                if (!t) {
                    menuTrees.push(this), this.rootId = ((new Date).getTime() + Math.random() + "").replace(/\D/g, ""), this.accessIdPrefix = "sm-" + this.rootId + "-", this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0);
                    var i = ".smartmenus";
                    this.$root.data("smartmenus", this).attr("data-smartmenus-id", this.rootId).dataSM("level", 1).on(getEventsNS({
                        "mouseover focusin": $.proxy(this.rootOver, this),
                        "mouseout focusout": $.proxy(this.rootOut, this),
                        keydown: $.proxy(this.rootKeyDown, this)
                    }, i)).on(getEventsNS({
                        mouseenter: $.proxy(this.itemEnter, this),
                        mouseleave: $.proxy(this.itemLeave, this),
                        mousedown: $.proxy(this.itemDown, this),
                        focus: $.proxy(this.itemFocus, this),
                        blur: $.proxy(this.itemBlur, this),
                        click: $.proxy(this.itemClick, this)
                    }, i), "a"), i += this.rootId, this.opts.hideOnClick && $(document).on(getEventsNS({
                        touchstart: $.proxy(this.docTouchStart, this),
                        touchmove: $.proxy(this.docTouchMove, this),
                        touchend: $.proxy(this.docTouchEnd, this),
                        click: $.proxy(this.docClick, this)
                    }, i)), $(window).on(getEventsNS({
                        "resize orientationchange": $.proxy(this.winResize, this)
                    }, i)), this.opts.subIndicators && (this.$subArrow = $("<span/>").addClass("sub-arrow"), this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)), initMouseDetection()
                }
                if (this.$firstSub = this.$root.find("ul").each(function() {
                        e.menuInit($(this))
                    }).eq(0), this.$firstLink = this.$root.find("a").eq(0), this.opts.markCurrentItem) {
                    var s = /(index|default)\.[^#\?\/]*/i,
                        o = /#.*/,
                        a = window.location.href.replace(s, ""),
                        n = a.replace(o, "");
                    this.$root.find("a").each(function() {
                        var t = this.href.replace(s, ""),
                            i = $(this);
                        (t == a || t == n) && (i.addClass("current"), e.opts.markCurrentTree && i.parentsUntil("[data-smartmenus-id]", "ul").each(function() {
                            $(this).dataSM("parent-a").addClass("current")
                        }))
                    })
                }
                this.wasCollapsible = this.isCollapsible()
            },
            destroy: function(t) {
                if (!t) {
                    var e = ".smartmenus";
                    this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").off(e), e += this.rootId, $(document).off(e), $(window).off(e), this.opts.subIndicators && (this.$subArrow = null)
                }
                this.menuHideAll();
                var i = this;
                this.$root.find("ul").each(function() {
                    var t = $(this);
                    t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.dataSM("shown-before") && ((i.opts.subMenusMinWidth || i.opts.subMenusMaxWidth) && t.css({
                        width: "",
                        minWidth: "",
                        maxWidth: ""
                    }).removeClass("sm-nowrap"), t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.css({
                        zIndex: "",
                        top: "",
                        left: "",
                        marginLeft: "",
                        marginTop: "",
                        display: ""
                    })), 0 == (t.attr("id") || "").indexOf(i.accessIdPrefix) && t.removeAttr("id")
                }).removeDataSM("in-mega").removeDataSM("shown-before").removeDataSM("scroll-arrows").removeDataSM("parent-a").removeDataSM("level").removeDataSM("beforefirstshowfired").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeAttr("aria-expanded"), this.$root.find("a.has-submenu").each(function() {
                    var t = $(this);
                    0 == t.attr("id").indexOf(i.accessIdPrefix) && t.removeAttr("id")
                }).removeClass("has-submenu").removeDataSM("sub").removeAttr("aria-haspopup").removeAttr("aria-controls").removeAttr("aria-expanded").closest("li").removeDataSM("sub"), this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(), this.opts.markCurrentItem && this.$root.find("a.current").removeClass("current"), t || (this.$root = null, this.$firstLink = null, this.$firstSub = null, this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), menuTrees.splice($.inArray(this, menuTrees), 1))
            },
            disable: function(t) {
                if (!this.disabled) {
                    if (this.menuHideAll(), !t && !this.opts.isPopup && this.$root.is(":visible")) {
                        var e = this.$root.offset();
                        this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
                            position: "absolute",
                            top: e.top,
                            left: e.left,
                            width: this.$root.outerWidth(),
                            height: this.$root.outerHeight(),
                            zIndex: this.getStartZIndex(!0),
                            opacity: 0
                        }).appendTo(document.body)
                    }
                    this.disabled = !0
                }
            },
            docClick: function(t) {
                return this.$touchScrollingSub ? (this.$touchScrollingSub = null, void 0) : ((this.visibleSubMenus.length && !$.contains(this.$root[0], t.target) || $(t.target).closest("a").length) && this.menuHideAll(), void 0)
            },
            docTouchEnd: function() {
                if (this.lastTouch) {
                    if (!(!this.visibleSubMenus.length || void 0 !== this.lastTouch.x2 && this.lastTouch.x1 != this.lastTouch.x2 || void 0 !== this.lastTouch.y2 && this.lastTouch.y1 != this.lastTouch.y2 || this.lastTouch.target && $.contains(this.$root[0], this.lastTouch.target))) {
                        this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                        var t = this;
                        this.hideTimeout = setTimeout(function() {
                            t.menuHideAll()
                        }, 350)
                    }
                    this.lastTouch = null
                }
            },
            docTouchMove: function(t) {
                if (this.lastTouch) {
                    var e = t.originalEvent.touches[0];
                    this.lastTouch.x2 = e.pageX, this.lastTouch.y2 = e.pageY
                }
            },
            docTouchStart: function(t) {
                var e = t.originalEvent.touches[0];
                this.lastTouch = {
                    x1: e.pageX,
                    y1: e.pageY,
                    target: e.target
                }
            },
            enable: function() {
                this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), this.disabled = !1)
            },
            getClosestMenu: function(t) {
                for (var e = $(t).closest("ul"); e.dataSM("in-mega");) e = e.parent().closest("ul");
                return e[0] || null
            },
            getHeight: function(t) {
                return this.getOffset(t, !0)
            },
            getOffset: function(t, e) {
                var i;
                "none" == t.css("display") && (i = {
                    position: t[0].style.position,
                    visibility: t[0].style.visibility
                }, t.css({
                    position: "absolute",
                    visibility: "hidden"
                }).show());
                var s = t[0].getBoundingClientRect && t[0].getBoundingClientRect(),
                    o = s && (e ? s.height || s.bottom - s.top : s.width || s.right - s.left);
                return o || 0 === o || (o = e ? t[0].offsetHeight : t[0].offsetWidth), i && t.hide().css(i), o
            },
            getStartZIndex: function(t) {
                var e = parseInt(this[t ? "$root" : "$firstSub"].css("z-index"));
                return !t && isNaN(e) && (e = parseInt(this.$root.css("z-index"))), isNaN(e) ? 1 : e
            },
            getTouchPoint: function(t) {
                return t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0] || t
            },
            getViewport: function(t) {
                var e = t ? "Height" : "Width",
                    i = document.documentElement["client" + e],
                    s = window["inner" + e];
                return s && (i = Math.min(i, s)), i
            },
            getViewportHeight: function() {
                return this.getViewport(!0)
            },
            getViewportWidth: function() {
                return this.getViewport()
            },
            getWidth: function(t) {
                return this.getOffset(t)
            },
            handleEvents: function() {
                return !this.disabled && this.isCSSOn()
            },
            handleItemEvents: function(t) {
                return this.handleEvents() && !this.isLinkInMegaMenu(t)
            },
            isCollapsible: function() {
                return "static" == this.$firstSub.css("position")
            },
            isCSSOn: function() {
                return "inline" != this.$firstLink.css("display")
            },
            isFixed: function() {
                var t = "fixed" == this.$root.css("position");
                return t || this.$root.parentsUntil("body").each(function() {
                    return "fixed" == $(this).css("position") ? (t = !0, !1) : void 0
                }), t
            },
            isLinkInMegaMenu: function(t) {
                return $(this.getClosestMenu(t[0])).hasClass("mega-menu")
            },
            isTouchMode: function() {
                return !mouse || this.opts.noMouseOver || this.isCollapsible()
            },
            itemActivate: function(t, e) {
                var i = t.closest("ul"),
                    s = i.dataSM("level");
                if (s > 1 && (!this.activatedItems[s - 2] || this.activatedItems[s - 2][0] != i.dataSM("parent-a")[0])) {
                    var o = this;
                    $(i.parentsUntil("[data-smartmenus-id]", "ul").get().reverse()).add(i).each(function() {
                        o.itemActivate($(this).dataSM("parent-a"))
                    })
                }
                if ((!this.isCollapsible() || e) && this.menuHideSubMenus(this.activatedItems[s - 1] && this.activatedItems[s - 1][0] == t[0] ? s : s - 1), this.activatedItems[s - 1] = t, this.$root.triggerHandler("activate.smapi", t[0]) !== !1) {
                    var a = t.dataSM("sub");
                    a && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(a)
                }
            },
            itemBlur: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && this.$root.triggerHandler("blur.smapi", e[0])
            },
            itemClick: function(t) {
                var e = $(t.currentTarget);
                if (this.handleItemEvents(e)) {
                    if (this.$touchScrollingSub && this.$touchScrollingSub[0] == e.closest("ul")[0]) return this.$touchScrollingSub = null, t.stopPropagation(), !1;
                    if (this.$root.triggerHandler("click.smapi", e[0]) === !1) return !1;
                    var i = $(t.target).is(".sub-arrow"),
                        s = e.dataSM("sub"),
                        o = s ? 2 == s.dataSM("level") : !1,
                        a = this.isCollapsible(),
                        n = /toggle$/.test(this.opts.collapsibleBehavior),
                        r = /link$/.test(this.opts.collapsibleBehavior),
                        h = /^accordion/.test(this.opts.collapsibleBehavior);
                    if (s && !s.is(":visible")) {
                        if ((!r || !a || i) && (this.opts.showOnClick && o && (this.clickActivated = !0), this.itemActivate(e, h), s.is(":visible"))) return this.focusActivated = !0, !1
                    } else if (a && (n || i)) return this.itemActivate(e, h), this.menuHide(s), n && (this.focusActivated = !1), !1;
                    return this.opts.showOnClick && o || e.hasClass("disabled") || this.$root.triggerHandler("select.smapi", e[0]) === !1 ? !1 : void 0
                }
            },
            itemDown: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && e.dataSM("mousedown", !0)
            },
            itemEnter: function(t) {
                var e = $(t.currentTarget);
                if (this.handleItemEvents(e)) {
                    if (!this.isTouchMode()) {
                        this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                        var i = this;
                        this.showTimeout = setTimeout(function() {
                            i.itemActivate(e)
                        }, this.opts.showOnClick && 1 == e.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout)
                    }
                    this.$root.triggerHandler("mouseenter.smapi", e[0])
                }
            },
            itemFocus: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && (!this.focusActivated || this.isTouchMode() && e.dataSM("mousedown") || this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == e[0] || this.itemActivate(e, !0), this.$root.triggerHandler("focus.smapi", e[0]))
            },
            itemLeave: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && (this.isTouchMode() || (e[0].blur(), this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0)), e.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", e[0]))
            },
            menuHide: function(t) {
                if (this.$root.triggerHandler("beforehide.smapi", t[0]) !== !1 && (canAnimate && t.stop(!0, !0), "none" != t.css("display"))) {
                    var e = function() {
                        t.css("z-index", "")
                    };
                    this.isCollapsible() ? canAnimate && this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, t, e) : t.hide(this.opts.collapsibleHideDuration, e) : canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, t, e) : t.hide(this.opts.hideDuration, e), t.dataSM("scroll") && (this.menuScrollStop(t), t.css({
                        "touch-action": "",
                        "-ms-touch-action": "",
                        "-webkit-transform": "",
                        transform: ""
                    }).off(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()), t.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"), t.attr({
                        "aria-expanded": "false",
                        "aria-hidden": "true"
                    });
                    var i = t.dataSM("level");
                    this.activatedItems.splice(i - 1, 1), this.visibleSubMenus.splice($.inArray(t, this.visibleSubMenus), 1), this.$root.triggerHandler("hide.smapi", t[0])
                }
            },
            menuHideAll: function() {
                this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                for (var t = this.opts.isPopup ? 1 : 0, e = this.visibleSubMenus.length - 1; e >= t; e--) this.menuHide(this.visibleSubMenus[e]);
                this.opts.isPopup && (canAnimate && this.$root.stop(!0, !0), this.$root.is(":visible") && (canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration))), this.activatedItems = [], this.visibleSubMenus = [], this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.$root.triggerHandler("hideAll.smapi")
            },
            menuHideSubMenus: function(t) {
                for (var e = this.activatedItems.length - 1; e >= t; e--) {
                    var i = this.activatedItems[e].dataSM("sub");
                    i && this.menuHide(i)
                }
            },
            menuInit: function(t) {
                if (!t.dataSM("in-mega")) {
                    t.hasClass("mega-menu") && t.find("ul").dataSM("in-mega", !0);
                    for (var e = 2, i = t[0];
                        (i = i.parentNode.parentNode) != this.$root[0];) e++;
                    var s = t.prevAll("a").eq(-1);
                    s.length || (s = t.prevAll().find("a").eq(-1)), s.addClass("has-submenu").dataSM("sub", t), t.dataSM("parent-a", s).dataSM("level", e).parent().dataSM("sub", t);
                    var o = s.attr("id") || this.accessIdPrefix + ++this.idInc,
                        a = t.attr("id") || this.accessIdPrefix + ++this.idInc;
                    s.attr({
                        id: o,
                        "aria-haspopup": "true",
                        "aria-controls": a,
                        "aria-expanded": "false"
                    }), t.attr({
                        id: a,
                        role: "group",
                        "aria-hidden": "true",
                        "aria-labelledby": o,
                        "aria-expanded": "false"
                    }), this.opts.subIndicators && s[this.opts.subIndicatorsPos](this.$subArrow.clone())
                }
            },
            menuPosition: function(t) {
                var e, i, s = t.dataSM("parent-a"),
                    o = s.closest("li"),
                    a = o.parent(),
                    n = t.dataSM("level"),
                    r = this.getWidth(t),
                    h = this.getHeight(t),
                    u = s.offset(),
                    l = u.left,
                    c = u.top,
                    d = this.getWidth(s),
                    m = this.getHeight(s),
                    p = $(window),
                    f = p.scrollLeft(),
                    v = p.scrollTop(),
                    b = this.getViewportWidth(),
                    S = this.getViewportHeight(),
                    g = a.parent().is("[data-sm-horizontal-sub]") || 2 == n && !a.hasClass("sm-vertical"),
                    M = this.opts.rightToLeftSubMenus && !o.is("[data-sm-reverse]") || !this.opts.rightToLeftSubMenus && o.is("[data-sm-reverse]"),
                    w = 2 == n ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
                    T = 2 == n ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY;
                if (g ? (e = M ? d - r - w : w, i = this.opts.bottomToTopSubMenus ? -h - T : m + T) : (e = M ? w - r : d - w, i = this.opts.bottomToTopSubMenus ? m - T - h : T), this.opts.keepInViewport) {
                    var y = l + e,
                        I = c + i;
                    if (M && f > y ? e = g ? f - y + e : d - w : !M && y + r > f + b && (e = g ? f + b - r - y + e : w - r), g || (S > h && I + h > v + S ? i += v + S - h - I : (h >= S || v > I) && (i += v - I)), g && (I + h > v + S + .49 || v > I) || !g && h > S + .49) {
                        var x = this;
                        t.dataSM("scroll-arrows") || t.dataSM("scroll-arrows", $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]]).on({
                            mouseenter: function() {
                                t.dataSM("scroll").up = $(this).hasClass("scroll-up"), x.menuScroll(t)
                            },
                            mouseleave: function(e) {
                                x.menuScrollStop(t), x.menuScrollOut(t, e)
                            },
                            "mousewheel DOMMouseScroll": function(t) {
                                t.preventDefault()
                            }
                        }).insertAfter(t));
                        var A = ".smartmenus_scroll";
                        if (t.dataSM("scroll", {
                                y: this.cssTransforms3d ? 0 : i - m,
                                step: 1,
                                itemH: m,
                                subH: h,
                                arrowDownH: this.getHeight(t.dataSM("scroll-arrows").eq(1))
                            }).on(getEventsNS({
                                mouseover: function(e) {
                                    x.menuScrollOver(t, e)
                                },
                                mouseout: function(e) {
                                    x.menuScrollOut(t, e)
                                },
                                "mousewheel DOMMouseScroll": function(e) {
                                    x.menuScrollMousewheel(t, e)
                                }
                            }, A)).dataSM("scroll-arrows").css({
                                top: "auto",
                                left: "0",
                                marginLeft: e + (parseInt(t.css("border-left-width")) || 0),
                                width: r - (parseInt(t.css("border-left-width")) || 0) - (parseInt(t.css("border-right-width")) || 0),
                                zIndex: t.css("z-index")
                            }).eq(g && this.opts.bottomToTopSubMenus ? 0 : 1).show(), this.isFixed()) {
                            var C = {};
                            C[touchEvents ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp"] = function(e) {
                                x.menuScrollTouch(t, e)
                            }, t.css({
                                "touch-action": "none",
                                "-ms-touch-action": "none"
                            }).on(getEventsNS(C, A))
                        }
                    }
                }
                t.css({
                    top: "auto",
                    left: "0",
                    marginLeft: e,
                    marginTop: i - m
                })
            },
            menuScroll: function(t, e, i) {
                var s, o = t.dataSM("scroll"),
                    a = t.dataSM("scroll-arrows"),
                    n = o.up ? o.upEnd : o.downEnd;
                if (!e && o.momentum) {
                    if (o.momentum *= .92, s = o.momentum, .5 > s) return this.menuScrollStop(t), void 0
                } else s = i || (e || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(o.step));
                var r = t.dataSM("level");
                if (this.activatedItems[r - 1] && this.activatedItems[r - 1].dataSM("sub") && this.activatedItems[r - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(r - 1), o.y = o.up && o.y >= n || !o.up && n >= o.y ? o.y : Math.abs(n - o.y) > s ? o.y + (o.up ? s : -s) : n, t.css(this.cssTransforms3d ? {
                        "-webkit-transform": "translate3d(0, " + o.y + "px, 0)",
                        transform: "translate3d(0, " + o.y + "px, 0)"
                    } : {
                        marginTop: o.y
                    }), mouse && (o.up && o.y > o.downEnd || !o.up && o.y < o.upEnd) && a.eq(o.up ? 1 : 0).show(), o.y == n) mouse && a.eq(o.up ? 0 : 1).hide(), this.menuScrollStop(t);
                else if (!e) {
                    this.opts.scrollAccelerate && o.step < this.opts.scrollStep && (o.step += .2);
                    var h = this;
                    this.scrollTimeout = requestAnimationFrame(function() {
                        h.menuScroll(t)
                    })
                }
            },
            menuScrollMousewheel: function(t, e) {
                if (this.getClosestMenu(e.target) == t[0]) {
                    e = e.originalEvent;
                    var i = (e.wheelDelta || -e.detail) > 0;
                    t.dataSM("scroll-arrows").eq(i ? 0 : 1).is(":visible") && (t.dataSM("scroll").up = i, this.menuScroll(t, !0))
                }
                e.preventDefault()
            },
            menuScrollOut: function(t, e) {
                mouse && (/^scroll-(up|down)/.test((e.relatedTarget || "").className) || (t[0] == e.relatedTarget || $.contains(t[0], e.relatedTarget)) && this.getClosestMenu(e.relatedTarget) == t[0] || t.dataSM("scroll-arrows").css("visibility", "hidden"))
            },
            menuScrollOver: function(t, e) {
                if (mouse && !/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == t[0]) {
                    this.menuScrollRefreshData(t);
                    var i = t.dataSM("scroll"),
                        s = $(window).scrollTop() - t.dataSM("parent-a").offset().top - i.itemH;
                    t.dataSM("scroll-arrows").eq(0).css("margin-top", s).end().eq(1).css("margin-top", s + this.getViewportHeight() - i.arrowDownH).end().css("visibility", "visible")
                }
            },
            menuScrollRefreshData: function(t) {
                var e = t.dataSM("scroll"),
                    i = $(window).scrollTop() - t.dataSM("parent-a").offset().top - e.itemH;
                this.cssTransforms3d && (i = -(parseFloat(t.css("margin-top")) - i)), $.extend(e, {
                    upEnd: i,
                    downEnd: i + this.getViewportHeight() - e.subH
                })
            },
            menuScrollStop: function(t) {
                return this.scrollTimeout ? (cancelAnimationFrame(this.scrollTimeout), this.scrollTimeout = 0, t.dataSM("scroll").step = 1, !0) : void 0
            },
            menuScrollTouch: function(t, e) {
                if (e = e.originalEvent, isTouchEvent(e)) {
                    var i = this.getTouchPoint(e);
                    if (this.getClosestMenu(i.target) == t[0]) {
                        var s = t.dataSM("scroll");
                        if (/(start|down)$/i.test(e.type)) this.menuScrollStop(t) ? (e.preventDefault(), this.$touchScrollingSub = t) : this.$touchScrollingSub = null, this.menuScrollRefreshData(t), $.extend(s, {
                            touchStartY: i.pageY,
                            touchStartTime: e.timeStamp
                        });
                        else if (/move$/i.test(e.type)) {
                            var o = void 0 !== s.touchY ? s.touchY : s.touchStartY;
                            if (void 0 !== o && o != i.pageY) {
                                this.$touchScrollingSub = t;
                                var a = i.pageY > o;
                                void 0 !== s.up && s.up != a && $.extend(s, {
                                    touchStartY: i.pageY,
                                    touchStartTime: e.timeStamp
                                }), $.extend(s, {
                                    up: a,
                                    touchY: i.pageY
                                }), this.menuScroll(t, !0, Math.abs(i.pageY - o))
                            }
                            e.preventDefault()
                        } else void 0 !== s.touchY && ((s.momentum = 15 * Math.pow(Math.abs(i.pageY - s.touchStartY) / (e.timeStamp - s.touchStartTime), 2)) && (this.menuScrollStop(t), this.menuScroll(t), e.preventDefault()), delete s.touchY)
                    }
                }
            },
            menuShow: function(t) {
                if ((t.dataSM("beforefirstshowfired") || (t.dataSM("beforefirstshowfired", !0), this.$root.triggerHandler("beforefirstshow.smapi", t[0]) !== !1)) && this.$root.triggerHandler("beforeshow.smapi", t[0]) !== !1 && (t.dataSM("shown-before", !0), canAnimate && t.stop(!0, !0), !t.is(":visible"))) {
                    var e = t.dataSM("parent-a"),
                        i = this.isCollapsible();
                    if ((this.opts.keepHighlighted || i) && e.addClass("highlighted"), i) t.removeClass("sm-nowrap").css({
                        zIndex: "",
                        width: "auto",
                        minWidth: "",
                        maxWidth: "",
                        top: "",
                        left: "",
                        marginLeft: "",
                        marginTop: ""
                    });
                    else {
                        if (t.css("z-index", this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1), (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (t.css({
                                width: "auto",
                                minWidth: "",
                                maxWidth: ""
                            }).addClass("sm-nowrap"), this.opts.subMenusMinWidth && t.css("min-width", this.opts.subMenusMinWidth), this.opts.subMenusMaxWidth)) {
                            var s = this.getWidth(t);
                            t.css("max-width", this.opts.subMenusMaxWidth), s > this.getWidth(t) && t.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth)
                        }
                        this.menuPosition(t)
                    }
                    var o = function() {
                        t.css("overflow", "")
                    };
                    i ? canAnimate && this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, t, o) : t.show(this.opts.collapsibleShowDuration, o) : canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, t, o) : t.show(this.opts.showDuration, o), e.attr("aria-expanded", "true"), t.attr({
                        "aria-expanded": "true",
                        "aria-hidden": "false"
                    }), this.visibleSubMenus.push(t), this.$root.triggerHandler("show.smapi", t[0])
                }
            },
            popupHide: function(t) {
                this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                var e = this;
                this.hideTimeout = setTimeout(function() {
                    e.menuHideAll()
                }, t ? 1 : this.opts.hideTimeout)
            },
            popupShow: function(t, e) {
                if (!this.opts.isPopup) return alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.'), void 0;
                if (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), this.$root.dataSM("shown-before", !0), canAnimate && this.$root.stop(!0, !0), !this.$root.is(":visible")) {
                    this.$root.css({
                        left: t,
                        top: e
                    });
                    var i = this,
                        s = function() {
                            i.$root.css("overflow", "")
                        };
                    canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, s) : this.$root.show(this.opts.showDuration, s), this.visibleSubMenus[0] = this.$root
                }
            },
            refresh: function() {
                this.destroy(!0), this.init(!0)
            },
            rootKeyDown: function(t) {
                if (this.handleEvents()) switch (t.keyCode) {
                    case 27:
                        var e = this.activatedItems[0];
                        if (e) {
                            this.menuHideAll(), e[0].focus();
                            var i = e.dataSM("sub");
                            i && this.menuHide(i)
                        }
                        break;
                    case 32:
                        var s = $(t.target);
                        if (s.is("a") && this.handleItemEvents(s)) {
                            var i = s.dataSM("sub");
                            i && !i.is(":visible") && (this.itemClick({
                                currentTarget: t.target
                            }), t.preventDefault())
                        }
                }
            },
            rootOut: function(t) {
                if (this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), !this.opts.showOnClick || !this.opts.hideOnClick)) {
                    var e = this;
                    this.hideTimeout = setTimeout(function() {
                        e.menuHideAll()
                    }, this.opts.hideTimeout)
                }
            },
            rootOver: function(t) {
                this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0)
            },
            winResize: function(t) {
                if (this.handleEvents()) {
                    if (!("onorientationchange" in window) || "orientationchange" == t.type) {
                        var e = this.isCollapsible();
                        this.wasCollapsible && e || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(), this.menuHideAll()), this.wasCollapsible = e
                    }
                } else if (this.$disableOverlay) {
                    var i = this.$root.offset();
                    this.$disableOverlay.css({
                        top: i.top,
                        left: i.left,
                        width: this.$root.outerWidth(),
                        height: this.$root.outerHeight()
                    })
                }
            }
        }
    }), $.fn.dataSM = function(t, e) {
        return e ? this.data(t + "_smartmenus", e) : this.data(t + "_smartmenus")
    }, $.fn.removeDataSM = function(t) {
        return this.removeData(t + "_smartmenus")
    }, $.fn.smartmenus = function(options) {
        if ("string" == typeof options) {
            var args = arguments,
                method = options;
            return Array.prototype.shift.call(args), this.each(function() {
                var t = $(this).data("smartmenus");
                t && t[method] && t[method].apply(t, args)
            })
        }
        return this.each(function() {
            var dataOpts = $(this).data("sm-options") || null;
            if (dataOpts) try {
                dataOpts = eval("(" + dataOpts + ")")
            } catch (e) {
                dataOpts = null, alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.')
            }
            new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts))
        })
    }, $.fn.smartmenus.defaults = {
        isPopup: !1,
        mainMenuSubOffsetX: 0,
        mainMenuSubOffsetY: 0,
        subMenusSubOffsetX: 0,
        subMenusSubOffsetY: 0,
        subMenusMinWidth: "10em",
        subMenusMaxWidth: "30em",
        subIndicators: !0,
        subIndicatorsPos: "append",
        subIndicatorsText: "",
        scrollStep: 30,
        scrollAccelerate: !0,
        showTimeout: 150,
        hideTimeout: 150,
        showDuration: 0,
        showFunction: null,
        hideDuration: 0,
        hideFunction: function(t, e) {
            t.fadeOut(200, e)
        },
        collapsibleShowDuration: 0,
        collapsibleShowFunction: function(t, e) {
            t.slideDown(200, e)
        },
        collapsibleHideDuration: 0,
        collapsibleHideFunction: function(t, e) {
            t.slideUp(200, e)
        },
        showOnClick: !1,
        hideOnClick: !0,
        noMouseOver: !1,
        keepInViewport: !0,
        keepHighlighted: !0,
        markCurrentItem: !1,
        markCurrentTree: !0,
        rightToLeftSubMenus: !1,
        bottomToTopSubMenus: !1,
        collapsibleBehavior: "default"
    }, $
});
/*! SmartMenus jQuery Plugin Bootstrap 4 Addon - v0.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */
(function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "smartmenus"], t) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(require("jquery")) : t(jQuery)
})(function(t) {
    return t.extend(t.SmartMenus.Bootstrap = {}, {
        keydownFix: !1,
        init: function() {
            var e = t("ul.navbar-nav:not([data-sm-skip])");
            e.each(function() {
                function e() {
                    o.find("a.current").each(function() {
                        var e = t(this);
                        (e.hasClass("dropdown-item") ? e : e.parent()).addClass("active")
                    }), o.find("a.has-submenu").each(function() {
                        var e = t(this);
                        e.is('[data-toggle="dropdown"]') && e.dataSM("bs-data-toggle-dropdown", !0).removeAttr("data-toggle"), !n && e.hasClass("dropdown-toggle") && e.dataSM("bs-dropdown-toggle", !0).removeClass("dropdown-toggle")
                    })
                }

                function s() {
                    o.find("a.current").each(function() {
                        var e = t(this);
                        (e.hasClass("active") ? e : e.parent()).removeClass("active")
                    }), o.find("a.has-submenu").each(function() {
                        var e = t(this);
                        e.dataSM("bs-dropdown-toggle") && e.addClass("dropdown-toggle").removeDataSM("bs-dropdown-toggle"), e.dataSM("bs-data-toggle-dropdown") && e.attr("data-toggle", "dropdown").removeDataSM("bs-data-toggle-dropdown")
                    })
                }

                function i(t) {
                    var e = a.getViewportWidth();
                    (e != u || t) && (a.isCollapsible() ? o.addClass("sm-collapsible") : o.removeClass("sm-collapsible"), u = e)
                }
                var o = t(this),
                    a = o.data("smartmenus");
                if (!a) {
                    var n = o.is("[data-sm-skip-collapsible-behavior]"),
                        r = o.hasClass("ml-auto") || o.prevAll(".mr-auto").length > 0;
                    o.smartmenus({
                        subMenusSubOffsetX: -2,
                        subMenusSubOffsetY: 0,
                        subIndicators: !n,
                        collapsibleShowFunction: function(t, e) {
                            t.slideDown(200, e)
                        },
                        collapsibleHideFunction: function(t, e) {
                            t.slideUp(200, e)
                        },
                        rightToLeftSubMenus: 0,
                        bottomToTopSubMenus: o.closest(".fixed-bottom").length > 0,
                        bootstrapHighlightClasses: ""
                    }).on({
                        "show.smapi": function(e, s) {
                            var i = t(s),
                                o = i.dataSM("scroll-arrows");
                            o && o.css("background-color", i.css("background-color")), i.parent().addClass("show"), a.opts.keepHighlighted && i.dataSM("level") > 2 && i.prevAll("a").addClass(a.opts.bootstrapHighlightClasses)
                        },
                        "hide.smapi": function(e, s) {
                            var i = t(s);
                            i.parent().removeClass("show"), a.opts.keepHighlighted && i.dataSM("level") > 2 && i.prevAll("a").removeClass(a.opts.bootstrapHighlightClasses)
                        }
                    }), a = o.data("smartmenus"), e(), a.refresh = function() {
                        t.SmartMenus.prototype.refresh.call(this), e(), i(!0)
                    }, a.destroy = function(e) {
                        s(), t.SmartMenus.prototype.destroy.call(this, e)
                    }, n && (a.opts.collapsibleBehavior = "toggle");
                    var u;
                    i(), t(window).on("resize.smartmenus" + a.rootId, i)
                }
            }), e.length && !t.SmartMenus.Bootstrap.keydownFix && (t(document).off("keydown.bs.dropdown.data-api", ".dropdown-menu"), t.fn.dropdown && t.fn.dropdown.Constructor && t(document).on("keydown.bs.dropdown.data-api", ".dropdown-menu.show", t.fn.dropdown.Constructor._dataApiKeydownHandler), t.SmartMenus.Bootstrap.keydownFix = !0)
        }
    }), t(t.SmartMenus.Bootstrap.init), t
});
// SmartMenus mod - hide the menus on document click just in collapsible mode
$.SmartMenus.prototype._docClick = $.SmartMenus.prototype.docClick, $.SmartMenus.prototype._docTouchEnd = $.SmartMenus.prototype.docTouchEnd, $.SmartMenus.prototype.docClick = function(a) {
    this.isCollapsible() && this._docClick(a)
}, $.SmartMenus.prototype.docTouchEnd = function(a) {
    this.isCollapsible() && this._docTouchEnd(a)
}, $(function() {
    $(".navbar-nav").bind("click.smapi", function(a, b) {
        var c = $(this).data("smartmenus");
        if (c.isCollapsible()) {
            var d = $(b).dataSM("sub");
            if (d && d.is(":visible")) return c.menuHide(d), !1
        }
    })
});
/*-----------------------------------------------------------------------------------*/
/*	02. STICKY HEADER
/*-----------------------------------------------------------------------------------*/
/*!
 * Headhesive.js v1.2.3 - An on-demand sticky header
 * Author: Copyright (c) Mark Goodyear <@markgdyr> <http://markgoodyear.com>
 * Url: http://markgoodyear.com/labs/headhesive
 * License: MIT
 */
! function(t, e) {
    "function" == typeof define && define.amd ? define([], function() {
        return e()
    }) : "object" == typeof exports ? module.exports = e() : t.Headhesive = e()
}(this, function() {
    "use strict";
    var t = function(e, s) {
            for (var o in s) s.hasOwnProperty(o) && (e[o] = "object" == typeof s[o] ? t(e[o], s[o]) : s[o]);
            return e
        },
        e = function(t, e) {
            var s, o, i, n = Date.now || function() {
                    return (new Date).getTime()
                },
                l = null,
                c = 0,
                r = function() {
                    c = n(), l = null, i = t.apply(s, o), s = o = null
                };
            return function() {
                var f = n(),
                    h = e - (f - c);
                return s = this, o = arguments, 0 >= h ? (clearTimeout(l), l = null, c = f, i = t.apply(s, o), s = o = null) : l || (l = setTimeout(r, h)), i
            }
        },
        s = function() {
            return void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        },
        o = function(t, e) {
            for (var s = 0, o = t.offsetHeight; t;) s += t.offsetTop, t = t.offsetParent;
            return "bottom" === e && (s += o), s
        },
        i = function(e, s) {
            "querySelector" in document && "addEventListener" in window && (this.visible = !1, this.options = {
                offset: 300,
                offsetSide: "top",
                classes: {
                    clone: "headhesive",
                    stick: "headhesive--stick",
                    unstick: "headhesive--unstick"
                },
                throttle: 250,
                onInit: function() {},
                onStick: function() {},
                onUnstick: function() {},
                onDestroy: function() {}
            }, this.elem = "string" == typeof e ? document.querySelector(e) : e, this.options = t(this.options, s), this.init())
        };
    return i.prototype = {
        constructor: i,
        init: function() {
            if (this.clonedElem = this.elem.cloneNode(!0), this.clonedElem.className += " " + this.options.classes.clone, document.body.insertBefore(this.clonedElem, document.body.firstChild), "number" == typeof this.options.offset) this.scrollOffset = this.options.offset;
            else {
                if ("string" != typeof this.options.offset) throw new Error("Invalid offset: " + this.options.offset);
                this._setScrollOffset()
            }
            this._throttleUpdate = e(this.update.bind(this), this.options.throttle), this._throttleScrollOffset = e(this._setScrollOffset.bind(this), this.options.throttle), window.addEventListener("scroll", this._throttleUpdate, !1), window.addEventListener("resize", this._throttleScrollOffset, !1), this.options.onInit.call(this)
        },
        _setScrollOffset: function() {
            "string" == typeof this.options.offset && (this.scrollOffset = o(document.querySelector(this.options.offset), this.options.offsetSide))
        },
        destroy: function() {
            document.body.removeChild(this.clonedElem), window.removeEventListener("scroll", this._throttleUpdate), window.removeEventListener("resize", this._throttleScrollOffset), this.options.onDestroy.call(this)
        },
        stick: function() {
            this.visible || (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.stick, this.visible = !0, this.options.onStick.call(this))
        },
        unstick: function() {
            this.visible && (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.unstick, this.visible = !1, this.options.onUnstick.call(this))
        },
        update: function() {
            s() > this.scrollOffset ? this.stick() : this.unstick()
        }
    }, i
});
/*-----------------------------------------------------------------------------------*/
/*	03. HAMBURGER MENU ICON
/*-----------------------------------------------------------------------------------*/
/*!
 * jquery-hmbrgr.js v0.0.2
 * https://github.com/MorenoDiDomenico/jquery-hmbrgr
 *
 * Copyright 2015, Moreno Di Domenico
 * Released under the MIT license
 * http://mdd.mit-license.org
 *
 */
! function(a) {
    a.fn.hmbrgr = function(b) {
        function g(b) {
            a(b).css({
                width: c.width,
                height: c.height
            }).html("<span /><span /><span />").find("span").css({
                position: "absolute",
                width: "100%",
                height: c.barHeight,
                "border-radius": c.barRadius,
                "background-color": c.barColor,
                "transition-duration": c.speed + "ms"
            }), h(b), a.isFunction(c.onInit) && c.onInit.call(this)
        }

        function h(b) {
            a(b).data("clickable", !0).find("span").eq(0).css({
                top: d
            }), a(b).find("span").eq(1).css({
                top: e
            }), a(b).find("span").eq(2).css({
                top: f
            })
        }

        function i(b) {
            a(b).on("click", function(c) {
                c.preventDefault(), a(this).data("clickable") && (a(this).data("clickable", !1), a(b).toggleClass("cross"), a(b).hasClass("cross") ? j(b) : k(b))
            })
        }

        function j(b) {
            a(b).find("span").css({
                top: e
            }), setTimeout(function() {
                a(b).addClass(c.animation).data("clickable", !0), a.isFunction(c.onOpen) && c.onOpen.call(this)
            }, c.speed)
        }

        function k(b) {
            a(b).removeClass(c.animation), setTimeout(function() {
                h(b), a.isFunction(c.onClose) && c.onClose.call(this)
            }, c.speed)
        }
        var c = a.extend({
                width: 60,
                height: 50,
                speed: 200,
                barHeight: 8,
                barRadius: 0,
                barColor: "#ffffff",
                animation: "expand",
                onInit: null,
                onOpen: null,
                onClose: null
            }, b),
            d = 0,
            e = c.height / 2 - c.barHeight / 2,
            f = c.height - c.barHeight;
        return this.each(function() {
            g(this), i(this)
        })
    }
}(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	04. PICTUREFILL RETINA IMAGE
/*-----------------------------------------------------------------------------------*/
/*! Picturefill - v2.3.1 - 2015-04-09
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var a = window.styleMedia || window.media;
        if (!a) {
            var b = document.createElement("style"),
                c = document.getElementsByTagName("script")[0],
                d = null;
            b.type = "text/css", b.id = "matchmediajs-test", c.parentNode.insertBefore(b, c), d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle, a = {
                matchMedium: function(a) {
                    var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
                    return b.styleSheet ? b.styleSheet.cssText = c : b.textContent = c, "1px" === d.width
                }
            }
        }
        return function(b) {
            return {
                matches: a.matchMedium(b || "all"),
                media: b || "all"
            }
        }
    }()),
    function(a, b, c) {
        "use strict";

        function d(b) {
            "object" == typeof module && "object" == typeof module.exports ? module.exports = b : "function" == typeof define && define.amd && define("picturefill", function() {
                return b
            }), "object" == typeof a && (a.picturefill = b)
        }

        function e(a) {
            var b, c, d, e, f, i = a || {};
            b = i.elements || g.getAllElements();
            for (var j = 0, k = b.length; k > j; j++)
                if (c = b[j], d = c.parentNode, e = void 0, f = void 0, "IMG" === c.nodeName.toUpperCase() && (c[g.ns] || (c[g.ns] = {}), i.reevaluate || !c[g.ns].evaluated)) {
                    if (d && "PICTURE" === d.nodeName.toUpperCase()) {
                        if (g.removeVideoShim(d), e = g.getMatch(c, d), e === !1) continue
                    } else e = void 0;
                    (d && "PICTURE" === d.nodeName.toUpperCase() || !g.sizesSupported && c.srcset && h.test(c.srcset)) && g.dodgeSrcset(c), e ? (f = g.processSourceSet(e), g.applyBestCandidate(f, c)) : (f = g.processSourceSet(c), (void 0 === c.srcset || c[g.ns].srcset) && g.applyBestCandidate(f, c)), c[g.ns].evaluated = !0
                }
        }

        function f() {
            function c() {
                clearTimeout(d), d = setTimeout(h, 60)
            }
            g.initTypeDetects(), e();
            var d, f = setInterval(function() {
                    return e(), /^loaded|^i|^c/.test(b.readyState) ? void clearInterval(f) : void 0
                }, 250),
                h = function() {
                    e({
                        reevaluate: !0
                    })
                };
            a.addEventListener ? a.addEventListener("resize", c, !1) : a.attachEvent && a.attachEvent("onresize", c)
        }
        if (a.HTMLPictureElement) return void d(function() {});
        b.createElement("picture");
        var g = a.picturefill || {},
            h = /\s+\+?\d+(e\d+)?w/;
        g.ns = "picturefill",
            function() {
                g.srcsetSupported = "srcset" in c, g.sizesSupported = "sizes" in c, g.curSrcSupported = "currentSrc" in c
            }(), g.trim = function(a) {
                return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
            }, g.makeUrl = function() {
                var a = b.createElement("a");
                return function(b) {
                    return a.href = b, a.href
                }
            }(), g.restrictsMixedContent = function() {
                return "https:" === a.location.protocol
            }, g.matchesMedia = function(b) {
                return a.matchMedia && a.matchMedia(b).matches
            }, g.getDpr = function() {
                return a.devicePixelRatio || 1
            }, g.getWidthFromLength = function(a) {
                var c;
                if (!a || a.indexOf("%") > -1 != !1 || !(parseFloat(a) > 0 || a.indexOf("calc(") > -1)) return !1;
                a = a.replace("vw", "%"), g.lengthEl || (g.lengthEl = b.createElement("div"), g.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", g.lengthEl.className = "helper-from-picturefill-js"), g.lengthEl.style.width = "0px";
                try {
                    g.lengthEl.style.width = a
                } catch (d) {}
                return b.body.appendChild(g.lengthEl), c = g.lengthEl.offsetWidth, 0 >= c && (c = !1), b.body.removeChild(g.lengthEl), c
            }, g.detectTypeSupport = function(b, c) {
                var d = new a.Image;
                return d.onerror = function() {
                    g.types[b] = !1, e()
                }, d.onload = function() {
                    g.types[b] = 1 === d.width, e()
                }, d.src = c, "pending"
            }, g.types = g.types || {}, g.initTypeDetects = function() {
                g.types["image/jpeg"] = !0, g.types["image/gif"] = !0, g.types["image/png"] = !0, g.types["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), g.types["image/webp"] = g.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")
            }, g.verifyTypeSupport = function(a) {
                var b = a.getAttribute("type");
                if (null === b || "" === b) return !0;
                var c = g.types[b];
                return "string" == typeof c && "pending" !== c ? (g.types[b] = g.detectTypeSupport(b, c), "pending") : "function" == typeof c ? (c(), "pending") : c
            }, g.parseSize = function(a) {
                var b = /(\([^)]+\))?\s*(.+)/g.exec(a);
                return {
                    media: b && b[1],
                    length: b && b[2]
                }
            }, g.findWidthFromSourceSize = function(c) {
                for (var d, e = g.trim(c).split(/\s*,\s*/), f = 0, h = e.length; h > f; f++) {
                    var i = e[f],
                        j = g.parseSize(i),
                        k = j.length,
                        l = j.media;
                    if (k && (!l || g.matchesMedia(l)) && (d = g.getWidthFromLength(k))) break
                }
                return d || Math.max(a.innerWidth || 0, b.documentElement.clientWidth)
            }, g.parseSrcset = function(a) {
                for (var b = [];
                    "" !== a;) {
                    a = a.replace(/^\s+/g, "");
                    var c, d = a.search(/\s/g),
                        e = null;
                    if (-1 !== d) {
                        c = a.slice(0, d);
                        var f = c.slice(-1);
                        if (("," === f || "" === c) && (c = c.replace(/,+$/, ""), e = ""), a = a.slice(d + 1), null === e) {
                            var g = a.indexOf(","); - 1 !== g ? (e = a.slice(0, g), a = a.slice(g + 1)) : (e = a, a = "")
                        }
                    } else c = a, a = "";
                    (c || e) && b.push({
                        url: c,
                        descriptor: e
                    })
                }
                return b
            }, g.parseDescriptor = function(a, b) {
                var c, d = b || "100vw",
                    e = a && a.replace(/(^\s+|\s+$)/g, ""),
                    f = g.findWidthFromSourceSize(d);
                if (e)
                    for (var h = e.split(" "), i = h.length - 1; i >= 0; i--) {
                        var j = h[i],
                            k = j && j.slice(j.length - 1);
                        if ("h" !== k && "w" !== k || g.sizesSupported) {
                            if ("x" === k) {
                                var l = j && parseFloat(j, 10);
                                c = l && !isNaN(l) ? l : 1
                            }
                        } else c = parseFloat(parseInt(j, 10) / f)
                    }
                return c || 1
            }, g.getCandidatesFromSourceSet = function(a, b) {
                for (var c = g.parseSrcset(a), d = [], e = 0, f = c.length; f > e; e++) {
                    var h = c[e];
                    d.push({
                        url: h.url,
                        resolution: g.parseDescriptor(h.descriptor, b)
                    })
                }
                return d
            }, g.dodgeSrcset = function(a) {
                a.srcset && (a[g.ns].srcset = a.srcset, a.srcset = "", a.setAttribute("data-pfsrcset", a[g.ns].srcset))
            }, g.processSourceSet = function(a) {
                var b = a.getAttribute("srcset"),
                    c = a.getAttribute("sizes"),
                    d = [];
                return "IMG" === a.nodeName.toUpperCase() && a[g.ns] && a[g.ns].srcset && (b = a[g.ns].srcset), b && (d = g.getCandidatesFromSourceSet(b, c)), d
            }, g.backfaceVisibilityFix = function(a) {
                var b = a.style || {},
                    c = "webkitBackfaceVisibility" in b,
                    d = b.zoom;
                c && (b.zoom = ".999", c = a.offsetWidth, b.zoom = d)
            }, g.setIntrinsicSize = function() {
                var c = {},
                    d = function(a, b, c) {
                        b && a.setAttribute("width", parseInt(b / c, 10))
                    };
                return function(e, f) {
                    var h;
                    e[g.ns] && !a.pfStopIntrinsicSize && (void 0 === e[g.ns].dims && (e[g.ns].dims = e.getAttribute("width") || e.getAttribute("height")), e[g.ns].dims || (f.url in c ? d(e, c[f.url], f.resolution) : (h = b.createElement("img"), h.onload = function() {
                        if (c[f.url] = h.width, !c[f.url]) try {
                            b.body.appendChild(h), c[f.url] = h.width || h.offsetWidth, b.body.removeChild(h)
                        } catch (a) {}
                        e.src === f.url && d(e, c[f.url], f.resolution), e = null, h.onload = null, h = null
                    }, h.src = f.url)))
                }
            }(), g.applyBestCandidate = function(a, b) {
                var c, d, e;
                a.sort(g.ascendingSort), d = a.length, e = a[d - 1];
                for (var f = 0; d > f; f++)
                    if (c = a[f], c.resolution >= g.getDpr()) {
                        e = c;
                        break
                    }
                e && (e.url = g.makeUrl(e.url), b.src !== e.url && (g.restrictsMixedContent() && "http:" === e.url.substr(0, "http:".length).toLowerCase() ? void 0 !== window.console && console.warn("Blocked mixed content image " + e.url) : (b.src = e.url, g.curSrcSupported || (b.currentSrc = b.src), g.backfaceVisibilityFix(b))), g.setIntrinsicSize(b, e))
            }, g.ascendingSort = function(a, b) {
                return a.resolution - b.resolution
            }, g.removeVideoShim = function(a) {
                var b = a.getElementsByTagName("video");
                if (b.length) {
                    for (var c = b[0], d = c.getElementsByTagName("source"); d.length;) a.insertBefore(d[0], c);
                    c.parentNode.removeChild(c)
                }
            }, g.getAllElements = function() {
                for (var a = [], c = b.getElementsByTagName("img"), d = 0, e = c.length; e > d; d++) {
                    var f = c[d];
                    ("PICTURE" === f.parentNode.nodeName.toUpperCase() || null !== f.getAttribute("srcset") || f[g.ns] && null !== f[g.ns].srcset) && a.push(f)
                }
                return a
            }, g.getMatch = function(a, b) {
                for (var c, d = b.childNodes, e = 0, f = d.length; f > e; e++) {
                    var h = d[e];
                    if (1 === h.nodeType) {
                        if (h === a) return c;
                        if ("SOURCE" === h.nodeName.toUpperCase()) {
                            null !== h.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                            var i = h.getAttribute("media");
                            if (h.getAttribute("srcset") && (!i || g.matchesMedia(i))) {
                                var j = g.verifyTypeSupport(h);
                                if (j === !0) {
                                    c = h;
                                    break
                                }
                                if ("pending" === j) return !1
                            }
                        }
                    }
                }
                return c
            }, f(), e._ = g, d(e)
    }(window, window.document, new window.Image);
/*-----------------------------------------------------------------------------------*/
/*	05. CUBE PORTFOLIO
/*-----------------------------------------------------------------------------------*/
/*
 * Cube Portfolio - Responsive jQuery Grid Plugin
 *
 * version: 4.4.0 (15 November, 2018)
 * require: jQuery v1.8+
 *
 * Copyright 2013-2018, Mihai Buricea (http://scriptpie.com/cubeportfolio/live-preview/)
 * Licensed under CodeCanyon License (http://codecanyon.net/licenses)
 *
 */

! function(s, t, a, r) {
    "use strict";

    function l(t, e, n) {
        var i = this;
        if (s.data(t, "cubeportfolio")) throw new Error("cubeportfolio is already initialized. Destroy it before initialize again!");
        i.obj = t, i.$obj = s(t), s.data(i.obj, "cubeportfolio", i), e && e.sortToPreventGaps !== r && (e.sortByDimension = e.sortToPreventGaps, delete e.sortToPreventGaps), i.options = s.extend({}, s.fn.cubeportfolio.options, e, i.$obj.data("cbp-options")), i.isAnimating = !0, i.defaultFilter = i.options.defaultFilter, i.registeredEvents = [], i.queue = [], i.addedWrapp = !1, s.isFunction(n) && i.registerEvent("initFinish", n, !0);
        var o = i.$obj.children();
        i.$obj.addClass("cbp"), (0 === o.length || o.first().hasClass("cbp-item")) && (i.wrapInner(i.obj, "cbp-wrapper"), i.addedWrapp = !0), i.$ul = i.$obj.children().addClass("cbp-wrapper"), i.wrapInner(i.obj, "cbp-wrapper-outer"), i.wrapper = i.$obj.children(".cbp-wrapper-outer"), i.blocks = i.$ul.children(".cbp-item"), i.blocksOn = i.blocks, i.wrapInner(i.blocks, "cbp-item-wrapper"), i.plugins = {}, s.each(l.plugins, function(t, e) {
            var n = e(i);
            n && (i.plugins[t] = n)
        }), i.triggerEvent("afterPlugins"), i.removeAttrAfterStoreData = s.Deferred(), i.loadImages(i.$obj, i.display)
    }
    s.extend(l.prototype, {
        storeData: function(t, a) {
            var r = this;
            a = a || 0, t.each(function(t, e) {
                var n = s(e),
                    i = n.width(),
                    o = n.height();
                n.data("cbp", {
                    index: a + t,
                    indexInitial: a + t,
                    wrapper: n.children(".cbp-item-wrapper"),
                    widthInitial: i,
                    heightInitial: o,
                    width: i,
                    height: o,
                    widthAndGap: i + r.options.gapVertical,
                    heightAndGap: o + r.options.gapHorizontal,
                    left: null,
                    leftNew: null,
                    top: null,
                    topNew: null,
                    pack: !1
                })
            }), this.removeAttrAfterStoreData.resolve()
        },
        wrapInner: function(t, e) {
            var n, i, o;
            if (e = e || "", !(t.length && t.length < 1))
                for (t.length === r && (t = [t]), i = t.length - 1; 0 <= i; i--) {
                    for (n = t[i], (o = a.createElement("div")).setAttribute("class", e); n.childNodes.length;) o.appendChild(n.childNodes[0]);
                    n.appendChild(o)
                }
        },
        removeAttrImage: function(t) {
            this.removeAttrAfterStoreData.then(function() {
                t.removeAttribute("width"), t.removeAttribute("height"), t.removeAttribute("style")
            })
        },
        loadImages: function(e, o) {
            var a = this;
            requestAnimationFrame(function() {
                var t = e.find("img").map(function(t, e) {
                        if (e.hasAttribute("width") && e.hasAttribute("height")) {
                            if (e.style.width = e.getAttribute("width") + "px", e.style.height = e.getAttribute("height") + "px", e.hasAttribute("data-cbp-src")) return null;
                            if (null === a.checkSrc(e)) a.removeAttrImage(e);
                            else {
                                var n = s("<img>");
                                n.on("load.cbp error.cbp", function() {
                                    s(this).off("load.cbp error.cbp"), a.removeAttrImage(e)
                                }), e.srcset ? (n.attr("sizes", e.sizes || "100vw"), n.attr("srcset", e.srcset)) : n.attr("src", e.src)
                            }
                            return null
                        }
                        return a.checkSrc(e)
                    }),
                    i = t.length;
                0 !== i ? s.each(t, function(t, e) {
                    var n = s("<img>");
                    n.on("load.cbp error.cbp", function() {
                        s(this).off("load.cbp error.cbp"), 0 === --i && o.call(a)
                    }), e.srcset ? (n.attr("sizes", e.sizes), n.attr("srcset", e.srcset)) : n.attr("src", e.src)
                }) : o.call(a)
            })
        },
        checkSrc: function(t) {
            var e = t.srcset,
                n = t.src;
            if ("" === n) return null;
            var i = s("<img>");
            e ? (i.attr("sizes", t.sizes || "100vw"), i.attr("srcset", e)) : i.attr("src", n);
            var o = i[0];
            return o.complete && o.naturalWidth !== r && 0 !== o.naturalWidth ? null : o
        },
        display: function() {
            var t = this;
            t.width = t.$obj.outerWidth(), t.triggerEvent("initStartRead"), t.triggerEvent("initStartWrite"), 0 < t.width && (t.storeData(t.blocks), t.layoutAndAdjustment()), t.triggerEvent("initEndRead"), t.triggerEvent("initEndWrite"), t.$obj.addClass("cbp-ready"), t.runQueue("delayFrame", t.delayFrame)
        },
        delayFrame: function() {
            var t = this;
            requestAnimationFrame(function() {
                t.resizeEvent(), t.triggerEvent("initFinish"), t.isAnimating = !1, t.$obj.trigger("initComplete.cbp")
            })
        },
        resizeEvent: function() {
            var e = this;
            l["private"].resize.initEvent({
                instance: e,
                fn: function() {
                    e.triggerEvent("beforeResizeGrid");
                    var t = e.$obj.outerWidth();
                    t && e.width !== t && (e.width = t, "alignCenter" === e.options.gridAdjustment && (e.wrapper[0].style.maxWidth = ""), e.layoutAndAdjustment(), e.triggerEvent("resizeGrid")), e.triggerEvent("resizeWindow")
                }
            })
        },
        gridAdjust: function() {
            var r = this;
            "responsive" === r.options.gridAdjustment ? r.responsiveLayout() : (r.blocks.removeAttr("style"), r.blocks.each(function(t, e) {
                var n = s(e).data("cbp"),
                    i = e.getBoundingClientRect(),
                    o = r.columnWidthTruncate(i.right - i.left),
                    a = Math.round(i.bottom - i.top);
                n.height = a, n.heightAndGap = a + r.options.gapHorizontal, n.width = o, n.widthAndGap = o + r.options.gapVertical
            }), r.widthAvailable = r.width + r.options.gapVertical), r.triggerEvent("gridAdjust")
        },
        layoutAndAdjustment: function(t) {
            t && (this.width = this.$obj.outerWidth()), this.gridAdjust(), this.layout()
        },
        layout: function() {
            var t = this;
            t.computeBlocks(t.filterConcat(t.defaultFilter)), "slider" === t.options.layoutMode ? (t.sliderLayoutReset(), t.sliderLayout()) : (t.mosaicLayoutReset(), t.mosaicLayout()), t.blocksOff.addClass("cbp-item-off"), t.blocksOn.removeClass("cbp-item-off").each(function(t, e) {
                var n = s(e).data("cbp");
                n.left = n.leftNew, n.top = n.topNew, e.style.left = n.left + "px", e.style.top = n.top + "px"
            }), t.resizeMainContainer()
        },
        computeFilter: function(t) {
            this.computeBlocks(t), this.mosaicLayoutReset(), this.mosaicLayout(), this.filterLayout()
        },
        filterLayout: function() {
            this.blocksOff.addClass("cbp-item-off"), this.blocksOn.removeClass("cbp-item-off").each(function(t, e) {
                var n = s(e).data("cbp");
                n.left = n.leftNew, n.top = n.topNew, e.style.left = n.left + "px", e.style.top = n.top + "px"
            }), this.resizeMainContainer(), this.filterFinish()
        },
        filterFinish: function() {
            this.isAnimating = !1, this.$obj.trigger("filterComplete.cbp"), this.triggerEvent("filterFinish")
        },
        computeBlocks: function(t) {
            var e = this;
            e.blocksOnInitial = e.blocksOn, e.blocksOn = e.blocks.filter(t), e.blocksOff = e.blocks.not(t), e.triggerEvent("computeBlocksFinish", t)
        },
        responsiveLayout: function() {
            var a = this;
            a.cols = a[s.isArray(a.options.mediaQueries) ? "getColumnsBreakpoints" : "getColumnsAuto"](), a.columnWidth = a.columnWidthTruncate((a.width + a.options.gapVertical) / a.cols), a.widthAvailable = a.columnWidth * a.cols, "mosaic" === a.options.layoutMode && a.getMosaicWidthReference(), a.blocks.each(function(t, e) {
                var n, i = s(e).data("cbp"),
                    o = 1;
                "mosaic" === a.options.layoutMode && (o = a.getColsMosaic(i.widthInitial)), n = a.columnWidth * o - a.options.gapVertical, e.style.width = n + "px", i.width = n, i.widthAndGap = n + a.options.gapVertical, e.style.height = ""
            });
            var r = [];
            a.blocks.each(function(t, e) {
                s.each(s(e).find("img").filter("[width][height]"), function(t, e) {
                    var i = 0;
                    s(e).parentsUntil(".cbp-item").each(function(t, e) {
                        var n = s(e).width();
                        if (0 < n) return i = n, !1
                    });
                    var n = parseInt(e.getAttribute("width"), 10),
                        o = parseInt(e.getAttribute("height"), 10),
                        a = parseFloat((n / o).toFixed(10));
                    r.push({
                        el: e,
                        width: i,
                        height: Math.round(i / a)
                    })
                })
            }), s.each(r, function(t, e) {
                e.el.width = e.width, e.el.height = e.height, e.el.style.width = e.width + "px", e.el.style.height = e.height + "px"
            }), a.blocks.each(function(t, e) {
                var n = s(e).data("cbp"),
                    i = e.getBoundingClientRect(),
                    o = Math.round(i.bottom - i.top);
                n.height = o, n.heightAndGap = o + a.options.gapHorizontal
            })
        },
        getMosaicWidthReference: function() {
            var i = [];
            this.blocks.each(function(t, e) {
                var n = s(e).data("cbp");
                i.push(n.widthInitial)
            }), i.sort(function(t, e) {
                return t - e
            }), i[0] ? this.mosaicWidthReference = i[0] : this.mosaicWidthReference = this.columnWidth
        },
        getColsMosaic: function(t) {
            if (t === this.width) return this.cols;
            var e = t / this.mosaicWidthReference;
            return e = .79 <= e % 1 ? Math.ceil(e) : Math.floor(e), Math.min(Math.max(e, 1), this.cols)
        },
        getColumnsAuto: function() {
            if (0 === this.blocks.length) return 1;
            var t = this.blocks.first().data("cbp").widthInitial + this.options.gapVertical;
            return Math.max(Math.round(this.width / t), 1)
        },
        getColumnsBreakpoints: function() {
            var n, t = this,
                i = t.width;
            return s.each(t.options.mediaQueries, function(t, e) {
                if (i >= e.width) return n = e, !1
            }), n || (n = t.options.mediaQueries[t.options.mediaQueries.length - 1]), t.triggerEvent("onMediaQueries", n.options), n.cols
        },
        columnWidthTruncate: function(t) {
            return Math.floor(t)
        },
        resizeMainContainer: function() {
            var o, t = this,
                e = Math.max(t.freeSpaces.slice(-1)[0].topStart - t.options.gapHorizontal, 0);
            "alignCenter" === t.options.gridAdjustment && (o = 0, t.blocksOn.each(function(t, e) {
                var n = s(e).data("cbp"),
                    i = n.left + n.width;
                o < i && (o = i)
            }), t.wrapper[0].style.maxWidth = o + "px"), e !== t.height && (t.obj.style.height = e + "px", t.height !== r && (l["private"].modernBrowser ? t.$obj.one(l["private"].transitionend, function() {
                t.$obj.trigger("pluginResize.cbp")
            }) : t.$obj.trigger("pluginResize.cbp")), t.height = e), t.triggerEvent("resizeMainContainer")
        },
        filterConcat: function(t) {
            return t.replace(/\|/gi, "")
        },
        pushQueue: function(t, e) {
            this.queue[t] = this.queue[t] || [], this.queue[t].push(e)
        },
        runQueue: function(t, e) {
            var n = this.queue[t] || [];
            s.when.apply(s, n).then(s.proxy(e, this))
        },
        clearQueue: function(t) {
            this.queue[t] = []
        },
        registerEvent: function(t, e, n) {
            this.registeredEvents[t] || (this.registeredEvents[t] = []), this.registeredEvents[t].push({
                func: e,
                oneTime: n || !1
            })
        },
        triggerEvent: function(t, e) {
            var n, i, o = this;
            if (o.registeredEvents[t])
                for (n = 0, i = o.registeredEvents[t].length; n < i; n++) o.registeredEvents[t][n].func.call(o, e), o.registeredEvents[t][n].oneTime && (o.registeredEvents[t].splice(n, 1), n--, i--)
        },
        addItems: function(t, e, i) {
            var o = this;
            o.wrapInner(t, "cbp-item-wrapper"), o.$ul[i](t.addClass("cbp-item-loading").css({
                top: "100%",
                left: 0
            })), l["private"].modernBrowser ? t.last().one(l["private"].animationend, function() {
                o.addItemsFinish(t, e)
            }) : o.addItemsFinish(t, e), o.loadImages(t, function() {
                if (o.$obj.addClass("cbp-updateItems"), "append" === i) o.storeData(t, o.blocks.length), s.merge(o.blocks, t);
                else {
                    o.storeData(t);
                    var n = t.length;
                    o.blocks.each(function(t, e) {
                        s(e).data("cbp").index = n + t
                    }), o.blocks = s.merge(t, o.blocks)
                }
                o.triggerEvent("addItemsToDOM", t), o.triggerEvent("triggerSort"), o.layoutAndAdjustment(!0), o.elems && l["public"].showCounter.call(o.obj, o.elems)
            })
        },
        addItemsFinish: function(t, e) {
            this.isAnimating = !1, this.$obj.removeClass("cbp-updateItems"), t.removeClass("cbp-item-loading"), s.isFunction(e) && e.call(this, t), this.$obj.trigger("onAfterLoadMore.cbp", [t])
        },
        removeItems: function(t, e) {
            var o = this;
            o.$obj.addClass("cbp-updateItems"), l["private"].modernBrowser ? t.last().one(l["private"].animationend, function() {
                o.removeItemsFinish(t, e)
            }) : o.removeItemsFinish(t, e), t.each(function(t, i) {
                o.blocks.each(function(t, e) {
                    if (i === e) {
                        var n = s(e);
                        o.blocks.splice(t, 1), l["private"].modernBrowser ? (n.one(l["private"].animationend, function() {
                            n.remove()
                        }), n.addClass("cbp-removeItem")) : n.remove()
                    }
                })
            }), o.blocks.each(function(t, e) {
                s(e).data("cbp").index = t
            }), o.triggerEvent("triggerSort"), o.layoutAndAdjustment(!0), o.elems && l["public"].showCounter.call(o.obj, o.elems)
        },
        removeItemsFinish: function(t, e) {
            this.isAnimating = !1, this.$obj.removeClass("cbp-updateItems"), s.isFunction(e) && e.call(this, t)
        }
    }), s.fn.cubeportfolio = function(t, e, n) {
        return this.each(function() {
            if ("object" == typeof t || !t) return l["public"].init.call(this, t, e);
            if (l["public"][t]) return l["public"][t].call(this, e, n);
            throw new Error("Method " + t + " does not exist on jquery.cubeportfolio.js")
        })
    }, l.plugins = {}, s.fn.cubeportfolio.constructor = l
}(jQuery, window, document),
function(l, t, e, n) {
    "use strict";
    var i = l.fn.cubeportfolio.constructor;
    l.extend(i.prototype, {
        mosaicLayoutReset: function() {
            var n = this;
            n.blocksAreSorted = !1, n.blocksOn.each(function(t, e) {
                l(e).data("cbp").pack = !1, n.options.sortByDimension && (e.style.height = "")
            }), n.freeSpaces = [{
                leftStart: 0,
                leftEnd: n.widthAvailable,
                topStart: 0,
                topEnd: Math.pow(2, 18)
            }]
        },
        mosaicLayout: function() {
            for (var t = this, e = 0, n = t.blocksOn.length; e < n; e++) {
                var i = t.getSpaceIndexAndBlock();
                if (null === i) return t.mosaicLayoutReset(), t.blocksAreSorted = !0, t.sortBlocks(t.blocksOn, "widthAndGap", "heightAndGap", !0), void t.mosaicLayout();
                t.generateF1F2(i.spaceIndex, i.dataBlock), t.generateG1G2G3G4(i.dataBlock), t.cleanFreeSpaces(), t.addHeightToBlocks()
            }
            t.blocksAreSorted && t.sortBlocks(t.blocksOn, "topNew", "leftNew")
        },
        getSpaceIndexAndBlock: function() {
            var t = this,
                s = null;
            return l.each(t.freeSpaces, function(i, o) {
                var a = o.leftEnd - o.leftStart,
                    r = o.topEnd - o.topStart;
                return t.blocksOn.each(function(t, e) {
                    var n = l(e).data("cbp");
                    if (!0 !== n.pack) return n.widthAndGap <= a && n.heightAndGap <= r ? (n.pack = !0, s = {
                        spaceIndex: i,
                        dataBlock: n
                    }, n.leftNew = o.leftStart, n.topNew = o.topStart, !1) : void 0
                }), !t.blocksAreSorted && t.options.sortByDimension && 0 < i ? (s = null, !1) : null === s && void 0
            }), s
        },
        generateF1F2: function(t, e) {
            var n = this.freeSpaces[t],
                i = {
                    leftStart: n.leftStart + e.widthAndGap,
                    leftEnd: n.leftEnd,
                    topStart: n.topStart,
                    topEnd: n.topEnd
                },
                o = {
                    leftStart: n.leftStart,
                    leftEnd: n.leftEnd,
                    topStart: n.topStart + e.heightAndGap,
                    topEnd: n.topEnd
                };
            this.freeSpaces.splice(t, 1), i.leftStart < i.leftEnd && i.topStart < i.topEnd && (this.freeSpaces.splice(t, 0, i), t++), o.leftStart < o.leftEnd && o.topStart < o.topEnd && this.freeSpaces.splice(t, 0, o)
        },
        generateG1G2G3G4: function(i) {
            var o = this,
                a = [];
            l.each(o.freeSpaces, function(t, e) {
                var n = o.intersectSpaces(e, i);
                null !== n ? (o.generateG1(e, n, a), o.generateG2(e, n, a), o.generateG3(e, n, a), o.generateG4(e, n, a)) : a.push(e)
            }), o.freeSpaces = a
        },
        intersectSpaces: function(t, e) {
            var n = {
                leftStart: e.leftNew,
                leftEnd: e.leftNew + e.widthAndGap,
                topStart: e.topNew,
                topEnd: e.topNew + e.heightAndGap
            };
            if (t.leftStart === n.leftStart && t.leftEnd === n.leftEnd && t.topStart === n.topStart && t.topEnd === n.topEnd) return null;
            var i = Math.max(t.leftStart, n.leftStart),
                o = Math.min(t.leftEnd, n.leftEnd),
                a = Math.max(t.topStart, n.topStart),
                r = Math.min(t.topEnd, n.topEnd);
            return o <= i || r <= a ? null : {
                leftStart: i,
                leftEnd: o,
                topStart: a,
                topEnd: r
            }
        },
        generateG1: function(t, e, n) {
            t.topStart !== e.topStart && n.push({
                leftStart: t.leftStart,
                leftEnd: t.leftEnd,
                topStart: t.topStart,
                topEnd: e.topStart
            })
        },
        generateG2: function(t, e, n) {
            t.leftEnd !== e.leftEnd && n.push({
                leftStart: e.leftEnd,
                leftEnd: t.leftEnd,
                topStart: t.topStart,
                topEnd: t.topEnd
            })
        },
        generateG3: function(t, e, n) {
            t.topEnd !== e.topEnd && n.push({
                leftStart: t.leftStart,
                leftEnd: t.leftEnd,
                topStart: e.topEnd,
                topEnd: t.topEnd
            })
        },
        generateG4: function(t, e, n) {
            t.leftStart !== e.leftStart && n.push({
                leftStart: t.leftStart,
                leftEnd: e.leftStart,
                topStart: t.topStart,
                topEnd: t.topEnd
            })
        },
        cleanFreeSpaces: function() {
            this.freeSpaces.sort(function(t, e) {
                return t.topStart > e.topStart ? 1 : t.topStart < e.topStart ? -1 : t.leftStart > e.leftStart ? 1 : t.leftStart < e.leftStart ? -1 : 0
            }), this.correctSubPixelValues(), this.removeNonMaximalFreeSpaces()
        },
        correctSubPixelValues: function() {
            var t, e, n, i;
            for (t = 0, e = this.freeSpaces.length - 1; t < e; t++) n = this.freeSpaces[t], (i = this.freeSpaces[t + 1]).topStart - n.topStart <= 1 && (i.topStart = n.topStart)
        },
        removeNonMaximalFreeSpaces: function() {
            var t = this;
            t.uniqueFreeSpaces(), t.freeSpaces = l.map(t.freeSpaces, function(n, i) {
                return l.each(t.freeSpaces, function(t, e) {
                    if (i !== t) return e.leftStart <= n.leftStart && e.leftEnd >= n.leftEnd && e.topStart <= n.topStart && e.topEnd >= n.topEnd ? (n = null, !1) : void 0
                }), n
            })
        },
        uniqueFreeSpaces: function() {
            var e = [];
            l.each(this.freeSpaces, function(t, n) {
                l.each(e, function(t, e) {
                    if (e.leftStart === n.leftStart && e.leftEnd === n.leftEnd && e.topStart === n.topStart && e.topEnd === n.topEnd) return n = null, !1
                }), null !== n && e.push(n)
            }), this.freeSpaces = e
        },
        addHeightToBlocks: function() {
            var o = this;
            l.each(o.freeSpaces, function(t, i) {
                o.blocksOn.each(function(t, e) {
                    var n = l(e).data("cbp");
                    !0 === n.pack && (o.intersectSpaces(i, n) && -1 === i.topStart - n.topNew - n.heightAndGap && (e.style.height = n.height - 1 + "px"))
                })
            })
        },
        sortBlocks: function(t, o, a, r) {
            a = void 0 === a ? "leftNew" : a, r = void 0 === r ? 1 : -1, t.sort(function(t, e) {
                var n = l(t).data("cbp"),
                    i = l(e).data("cbp");
                return n[o] > i[o] ? r : n[o] < i[o] ? -r : n[a] > i[a] ? r : n[a] < i[a] ? -r : n.index > i.index ? r : n.index < i.index ? -r : void 0
            })
        }
    })
}(jQuery, window, document), jQuery.fn.cubeportfolio.options = {
        filters: "",
        search: "",
        layoutMode: "grid",
        sortByDimension: !1,
        drag: !0,
        auto: !1,
        autoTimeout: 5e3,
        autoPauseOnHover: !0,
        showNavigation: !0,
        showPagination: !0,
        rewindNav: !0,
        scrollByPage: !1,
        defaultFilter: "*",
        filterDeeplinking: !1,
        animationType: "fadeOut",
        gridAdjustment: "responsive",
        mediaQueries: !1,
        gapHorizontal: 10,
        gapVertical: 10,
        caption: "pushTop",
        displayType: "fadeIn",
        displayTypeSpeed: 400,
        lightboxDelegate: ".cbp-lightbox",
        lightboxGallery: !0,
        lightboxTitleSrc: "data-title",
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        singlePageDelegate: ".cbp-singlePage",
        singlePageDeeplinking: !0,
        singlePageStickyNavigation: !0,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageAnimation: "left",
        singlePageCallback: null,
        singlePageInlineDelegate: ".cbp-singlePageInline",
        singlePageInlineDeeplinking: !1,
        singlePageInlinePosition: "top",
        singlePageInlineInFocus: !0,
        singlePageInlineCallback: null,
        plugins: {}
    },
    function(a, o, r, t) {
        "use strict";
        var s = a.fn.cubeportfolio.constructor,
            l = a(o);
        s["private"] = {
            publicEvents: function(e, n, i) {
                var o = this;
                o.events = [], o.initEvent = function(t) {
                    0 === o.events.length && o.scrollEvent(), o.events.push(t)
                }, o.destroyEvent = function(n) {
                    o.events = a.map(o.events, function(t, e) {
                        if (t.instance !== n) return t
                    }), 0 === o.events.length && l.off(e)
                }, o.scrollEvent = function() {
                    var t;
                    l.on(e, function() {
                        clearTimeout(t), t = setTimeout(function() {
                            a.isFunction(i) && i.call(o) || a.each(o.events, function(t, e) {
                                e.fn.call(e.instance)
                            })
                        }, n)
                    })
                }
            },
            checkInstance: function(t) {
                var e = a.data(this, "cubeportfolio");
                if (!e) throw new Error("cubeportfolio is not initialized. Initialize it before calling " + t + " method!");
                return e.triggerEvent("publicMethod"), e
            },
            browserInfo: function() {
                var t, e, n = s["private"],
                    i = navigator.appVersion; - 1 !== i.indexOf("MSIE 8.") ? n.browser = "ie8" : -1 !== i.indexOf("MSIE 9.") ? n.browser = "ie9" : -1 !== i.indexOf("MSIE 10.") ? n.browser = "ie10" : o.ActiveXObject || "ActiveXObject" in o ? n.browser = "ie11" : /android/gi.test(i) ? n.browser = "android" : /iphone|ipad|ipod/gi.test(i) ? n.browser = "ios" : /chrome/gi.test(i) ? n.browser = "chrome" : n.browser = "", void 0 !== typeof n.styleSupport("perspective") && (t = n.styleSupport("transition"), n.transitionend = {
                    WebkitTransition: "webkitTransitionEnd",
                    transition: "transitionend"
                }[t], e = n.styleSupport("animation"), n.animationend = {
                    WebkitAnimation: "webkitAnimationEnd",
                    animation: "animationend"
                }[e], n.animationDuration = {
                    WebkitAnimation: "webkitAnimationDuration",
                    animation: "animationDuration"
                }[e], n.animationDelay = {
                    WebkitAnimation: "webkitAnimationDelay",
                    animation: "animationDelay"
                }[e], n.transform = n.styleSupport("transform"), t && e && n.transform && (n.modernBrowser = !0))
            },
            styleSupport: function(t) {
                var e, n = "Webkit" + t.charAt(0).toUpperCase() + t.slice(1),
                    i = r.createElement("div");
                return t in i.style ? e = t : n in i.style && (e = n), i = null, e
            }
        }, s["private"].browserInfo(), s["private"].resize = new s["private"].publicEvents("resize.cbp", 50, function() {
            if (o.innerHeight == screen.height) return !0
        })
    }(jQuery, window, document),
    function(a, t, e, n) {
        "use strict";
        var r = a.fn.cubeportfolio.constructor;
        r["public"] = {
            init: function(t, e) {
                new r(this, t, e)
            },
            destroy: function(t) {
                var e = r["private"].checkInstance.call(this, "destroy");
                e.triggerEvent("beforeDestroy"), a.removeData(this, "cubeportfolio"), e.blocks.removeData("cbp"), e.$obj.removeClass("cbp-ready").removeAttr("style"), e.$ul.removeClass("cbp-wrapper"), r["private"].resize.destroyEvent(e), e.$obj.off(".cbp"), e.blocks.removeClass("cbp-item-off").removeAttr("style"), e.blocks.find(".cbp-item-wrapper").each(function(t, e) {
                    var n = a(e),
                        i = n.children();
                    i.length ? i.unwrap() : n.remove()
                }), e.destroySlider && e.destroySlider(), e.$ul.unwrap(), e.addedWrapp && e.blocks.unwrap(), 0 === e.blocks.length && e.$ul.remove(), a.each(e.plugins, function(t, e) {
                    "function" == typeof e.destroy && e.destroy()
                }), a.isFunction(t) && t.call(e), e.triggerEvent("afterDestroy")
            },
            filter: function(t, e) {
                var n, i = r["private"].checkInstance.call(this, "filter");
                if (!i.isAnimating) {
                    if (i.isAnimating = !0, a.isFunction(e) && i.registerEvent("filterFinish", e, !0), a.isFunction(t)) {
                        if (void 0 === (n = t.call(i, i.blocks))) throw new Error("When you call cubeportfolio API `filter` method with a param of type function you must return the blocks that will be visible.")
                    } else {
                        if (i.options.filterDeeplinking) {
                            var o = location.href.replace(/#cbpf=(.*?)([#\?&]|$)/gi, "");
                            location.href = o + "#cbpf=" + encodeURIComponent(t), i.singlePage && i.singlePage.url && (i.singlePage.url = location.href)
                        }
                        i.defaultFilter = t, n = i.filterConcat(i.defaultFilter)
                    }
                    i.triggerEvent("filterStart", n), i.singlePageInline && i.singlePageInline.isOpen ? i.singlePageInline.close("promise", {
                        callback: function() {
                            i.computeFilter(n)
                        }
                    }) : i.computeFilter(n)
                }
            },
            showCounter: function(t, e) {
                var n = r["private"].checkInstance.call(this, "showCounter");
                a.isFunction(e) && n.registerEvent("showCounterFinish", e, !0), (n.elems = t).each(function() {
                    var t = a(this),
                        e = n.blocks.filter(t.data("filter")).length;
                    t.find(".cbp-filter-counter").text(e)
                }), n.triggerEvent("showCounterFinish", t)
            },
            appendItems: function(t, e) {
                r["public"].append.call(this, t, e)
            },
            append: function(t, e) {
                var n = r["private"].checkInstance.call(this, "append"),
                    i = a(t).filter(".cbp-item");
                n.isAnimating || i.length < 1 ? a.isFunction(e) && e.call(n, i) : (n.isAnimating = !0, n.singlePageInline && n.singlePageInline.isOpen ? n.singlePageInline.close("promise", {
                    callback: function() {
                        n.addItems(i, e, "append")
                    }
                }) : n.addItems(i, e, "append"))
            },
            prepend: function(t, e) {
                var n = r["private"].checkInstance.call(this, "prepend"),
                    i = a(t).filter(".cbp-item");
                n.isAnimating || i.length < 1 ? a.isFunction(e) && e.call(n, i) : (n.isAnimating = !0, n.singlePageInline && n.singlePageInline.isOpen ? n.singlePageInline.close("promise", {
                    callback: function() {
                        n.addItems(i, e, "prepend")
                    }
                }) : n.addItems(i, e, "prepend"))
            },
            remove: function(t, e) {
                var n = r["private"].checkInstance.call(this, "remove"),
                    i = a(t).filter(".cbp-item");
                n.isAnimating || i.length < 1 ? a.isFunction(e) && e.call(n, i) : (n.isAnimating = !0, n.singlePageInline && n.singlePageInline.isOpen ? n.singlePageInline.close("promise", {
                    callback: function() {
                        n.removeItems(i, e)
                    }
                }) : n.removeItems(i, e))
            },
            layout: function(t) {
                var e = r["private"].checkInstance.call(this, "layout");
                e.width = e.$obj.outerWidth(), e.isAnimating || e.width <= 0 || ("alignCenter" === e.options.gridAdjustment && (e.wrapper[0].style.maxWidth = ""), e.storeData(e.blocks), e.layoutAndAdjustment()), a.isFunction(t) && t.call(e)
            }
        }
    }(jQuery, window, document),
    function(h, t, b, e) {
        "use strict";
        var v = h.fn.cubeportfolio.constructor;
        h.extend(v.prototype, {
            updateSliderPagination: function() {
                var t, e, n = this;
                if (n.options.showPagination) {
                    for (t = Math.ceil(n.blocksOn.length / n.cols), n.navPagination.empty(), e = t - 1; 0 <= e; e--) h("<div/>", {
                        "class": "cbp-nav-pagination-item",
                        "data-slider-action": "jumpTo"
                    }).appendTo(n.navPagination);
                    n.navPaginationItems = n.navPagination.children()
                }
                n.enableDisableNavSlider()
            },
            destroySlider: function() {
                var t = this;
                "slider" === t.options.layoutMode && (t.$obj.removeClass("cbp-mode-slider"), t.$ul.removeAttr("style"), t.$ul.off(".cbp"), h(b).off(".cbp"), t.options.auto && t.stopSliderAuto())
            },
            nextSlider: function(t) {
                var e = this;
                if (e.isEndSlider()) {
                    if (!e.isRewindNav()) return;
                    e.sliderActive = 0
                } else e.options.scrollByPage ? e.sliderActive = Math.min(e.sliderActive + e.cols, e.blocksOn.length - e.cols) : e.sliderActive += 1;
                e.goToSlider()
            },
            prevSlider: function(t) {
                var e = this;
                if (e.isStartSlider()) {
                    if (!e.isRewindNav()) return;
                    e.sliderActive = e.blocksOn.length - e.cols
                } else e.options.scrollByPage ? e.sliderActive = Math.max(0, e.sliderActive - e.cols) : e.sliderActive -= 1;
                e.goToSlider()
            },
            jumpToSlider: function(t) {
                var e = this,
                    n = Math.min(t.index() * e.cols, e.blocksOn.length - e.cols);
                n !== e.sliderActive && (e.sliderActive = n, e.goToSlider())
            },
            jumpDragToSlider: function(t) {
                var e, n, i, o = this,
                    a = 0 < t;
                o.options.scrollByPage ? (e = o.cols * o.columnWidth, n = o.cols) : (e = o.columnWidth, n = 1), t = Math.abs(t), i = Math.floor(t / e) * n, 20 < t % e && (i += n), o.sliderActive = a ? Math.min(o.sliderActive + i, o.blocksOn.length - o.cols) : Math.max(0, o.sliderActive - i), o.goToSlider()
            },
            isStartSlider: function() {
                return 0 === this.sliderActive
            },
            isEndSlider: function() {
                return this.sliderActive + this.cols > this.blocksOn.length - 1
            },
            goToSlider: function() {
                this.enableDisableNavSlider(), this.updateSliderPosition()
            },
            startSliderAuto: function() {
                var t = this;
                t.isDrag ? t.stopSliderAuto() : t.timeout = setTimeout(function() {
                    t.nextSlider(), t.startSliderAuto()
                }, t.options.autoTimeout)
            },
            stopSliderAuto: function() {
                clearTimeout(this.timeout)
            },
            enableDisableNavSlider: function() {
                var t, e, n = this;
                n.isRewindNav() || (e = n.isStartSlider() ? "addClass" : "removeClass", n.navPrev[e]("cbp-nav-stop"), e = n.isEndSlider() ? "addClass" : "removeClass", n.navNext[e]("cbp-nav-stop")), n.options.showPagination && (t = n.options.scrollByPage ? Math.ceil(n.sliderActive / n.cols) : n.isEndSlider() ? n.navPaginationItems.length - 1 : Math.floor(n.sliderActive / n.cols), n.navPaginationItems.removeClass("cbp-nav-pagination-active").eq(t).addClass("cbp-nav-pagination-active")), n.customPagination && (t = n.options.scrollByPage ? Math.ceil(n.sliderActive / n.cols) : n.isEndSlider() ? n.customPaginationItems.length - 1 : Math.floor(n.sliderActive / n.cols), n.customPaginationItems.removeClass(n.customPaginationClass).eq(t).addClass(n.customPaginationClass))
            },
            isRewindNav: function() {
                return !this.options.showNavigation || !(this.blocksOn.length <= this.cols) && !!this.options.rewindNav
            },
            sliderItemsLength: function() {
                return this.blocksOn.length <= this.cols
            },
            sliderLayout: function() {
                var i = this;
                i.blocksOn.each(function(t, e) {
                    var n = h(e).data("cbp");
                    n.leftNew = i.columnWidth * t, n.topNew = 0, i.sliderFreeSpaces.push({
                        topStart: n.heightAndGap
                    })
                }), i.getFreeSpacesForSlider(), i.$ul.width(i.columnWidth * i.blocksOn.length - i.options.gapVertical)
            },
            getFreeSpacesForSlider: function() {
                var t = this;
                t.freeSpaces = t.sliderFreeSpaces.slice(t.sliderActive, t.sliderActive + t.cols), t.freeSpaces.sort(function(t, e) {
                    return t.topStart > e.topStart ? 1 : t.topStart < e.topStart ? -1 : void 0
                })
            },
            updateSliderPosition: function() {
                var t = this,
                    e = -t.sliderActive * t.columnWidth;
                v["private"].modernBrowser ? t.$ul[0].style[v["private"].transform] = "translate3d(" + e + "px, 0px, 0)" : t.$ul[0].style.left = e + "px", t.getFreeSpacesForSlider(), t.resizeMainContainer()
            },
            dragSlider: function() {
                var n, i, e, o, a, r = this,
                    s = h(b),
                    l = !1,
                    p = {},
                    c = !1;

                function u(t) {
                    r.$obj.removeClass("cbp-mode-slider-dragStart"), l = !0, 0 !== i ? (e.one("click.cbp", function(t) {
                        return !1
                    }), requestAnimationFrame(function() {
                        r.jumpDragToSlider(i), r.$ul.one(v["private"].transitionend, f)
                    })) : f.call(r), s.off(p.move), s.off(p.end)
                }

                function d(t) {
                    (8 < (i = n - g(t).x) || i < -8) && t.preventDefault(), r.isDrag = !0;
                    var e = o - i;
                    i < 0 && i < o ? e = (o - i) / 5 : 0 < i && o - i < -a && (e = (a + o - i) / 5 - a), v["private"].modernBrowser ? r.$ul[0].style[v["private"].transform] = "translate3d(" + e + "px, 0px, 0)" : r.$ul[0].style.left = e + "px"
                }

                function f() {
                    if (l = !1, r.isDrag = !1, r.options.auto) {
                        if (r.mouseIsEntered) return;
                        r.startSliderAuto()
                    }
                }

                function g(t) {
                    return void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (t = t.originalEvent.touches[0]), {
                        x: t.pageX,
                        y: t.pageY
                    }
                }
                r.isDrag = !1, "ontouchstart" in t || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints ? (p = {
                    start: "touchstart.cbp",
                    move: "touchmove.cbp",
                    end: "touchend.cbp"
                }, c = !0) : p = {
                    start: "mousedown.cbp",
                    move: "mousemove.cbp",
                    end: "mouseup.cbp"
                }, r.$ul.on(p.start, function(t) {
                    r.sliderItemsLength() || (c ? t : t.preventDefault(), r.options.auto && r.stopSliderAuto(), l ? h(e).one("click.cbp", function() {
                        return !1
                    }) : (e = h(t.target), n = g(t).x, i = 0, o = -r.sliderActive * r.columnWidth, a = r.columnWidth * (r.blocksOn.length - r.cols), s.on(p.move, d), s.on(p.end, u), r.$obj.addClass("cbp-mode-slider-dragStart")))
                })
            },
            sliderLayoutReset: function() {
                this.freeSpaces = [], this.sliderFreeSpaces = []
            }
        })
    }(jQuery, window, document), "function" != typeof Object.create && (Object.create = function(t) {
        function e() {}
        return e.prototype = t, new e
    }),
    function() {
        for (var a = 0, t = ["moz", "webkit"], e = 0; e < t.length && !window.requestAnimationFrame; e++) window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, e) {
            var n = (new Date).getTime(),
                i = Math.max(0, 16 - (n - a)),
                o = window.setTimeout(function() {
                    t(n + i)
                }, i);
            return a = n + i, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(),
    function(i, t, e, n) {
        "use strict";
        var o = i.fn.cubeportfolio.constructor;

        function a(e) {
            (this.parent = e).filterLayout = this.filterLayout, e.registerEvent("computeBlocksFinish", function(t) {
                e.blocksOn2On = e.blocksOnInitial.filter(t), e.blocksOn2Off = e.blocksOnInitial.not(t)
            })
        }
        a.prototype.filterLayout = function() {
            var t = this;

            function e() {
                t.blocks.removeClass("cbp-item-on2off cbp-item-off2on cbp-item-on2on").each(function(t, e) {
                    var n = i(e).data("cbp");
                    n.left = n.leftNew, n.top = n.topNew, e.style.left = n.left + "px", e.style.top = n.top + "px", e.style[o["private"].transform] = ""
                }), t.blocksOff.addClass("cbp-item-off"), t.$obj.removeClass("cbp-animation-" + t.options.animationType), t.filterFinish()
            }
            t.$obj.addClass("cbp-animation-" + t.options.animationType), t.blocksOn2On.addClass("cbp-item-on2on").each(function(t, e) {
                var n = i(e).data("cbp");
                e.style[o["private"].transform] = "translate3d(" + (n.leftNew - n.left) + "px, " + (n.topNew - n.top) + "px, 0)"
            }), t.blocksOn2Off.addClass("cbp-item-on2off"), t.blocksOff2On = t.blocksOn.filter(".cbp-item-off").removeClass("cbp-item-off").addClass("cbp-item-off2on").each(function(t, e) {
                var n = i(e).data("cbp");
                e.style.left = n.leftNew + "px", e.style.top = n.topNew + "px"
            }), t.blocksOn2Off.length ? t.blocksOn2Off.last().data("cbp").wrapper.one(o["private"].animationend, e) : t.blocksOff2On.length ? t.blocksOff2On.last().data("cbp").wrapper.one(o["private"].animationend, e) : t.blocksOn2On.length ? t.blocksOn2On.last().one(o["private"].transitionend, e) : e(), t.resizeMainContainer()
        }, a.prototype.destroy = function() {
            var t = this.parent;
            t.$obj.removeClass("cbp-animation-" + t.options.animationType)
        }, o.plugins.animationClassic = function(t) {
            return !o["private"].modernBrowser || i.inArray(t.options.animationType, ["boxShadow", "fadeOut", "flipBottom", "flipOut", "quicksand", "scaleSides", "skew"]) < 0 ? null : new a(t)
        }
    }(jQuery, window, document),
    function(o, t, e, n) {
        "use strict";
        var a = o.fn.cubeportfolio.constructor;

        function i(t) {
            (this.parent = t).filterLayout = this.filterLayout
        }
        i.prototype.filterLayout = function() {
            var i = this,
                t = i.$ul[0].cloneNode(!0);

            function e() {
                i.wrapper[0].removeChild(t), "sequentially" === i.options.animationType && i.blocksOn.each(function(t, e) {
                    o(e).data("cbp").wrapper[0].style[a["private"].animationDelay] = ""
                }), i.$obj.removeClass("cbp-animation-" + i.options.animationType), i.filterFinish()
            }
            t.setAttribute("class", "cbp-wrapper-helper"), i.wrapper[0].insertBefore(t, i.$ul[0]), requestAnimationFrame(function() {
                i.$obj.addClass("cbp-animation-" + i.options.animationType), i.blocksOff.addClass("cbp-item-off"), i.blocksOn.removeClass("cbp-item-off").each(function(t, e) {
                    var n = o(e).data("cbp");
                    n.left = n.leftNew, n.top = n.topNew, e.style.left = n.left + "px", e.style.top = n.top + "px", "sequentially" === i.options.animationType && (n.wrapper[0].style[a["private"].animationDelay] = 60 * t + "ms")
                }), i.blocksOn.length ? i.blocksOn.last().data("cbp").wrapper.one(a["private"].animationend, e) : i.blocksOnInitial.length ? i.blocksOnInitial.last().data("cbp").wrapper.one(a["private"].animationend, e) : e(), i.resizeMainContainer()
            })
        }, i.prototype.destroy = function() {
            var t = this.parent;
            t.$obj.removeClass("cbp-animation-" + t.options.animationType)
        }, a.plugins.animationClone = function(t) {
            return !a["private"].modernBrowser || o.inArray(t.options.animationType, ["fadeOutTop", "slideLeft", "sequentially"]) < 0 ? null : new i(t)
        }
    }(jQuery, window, document),
    function(a, t, e, n) {
        "use strict";
        var r = a.fn.cubeportfolio.constructor;

        function i(t) {
            (this.parent = t).filterLayout = this.filterLayout
        }
        i.prototype.filterLayout = function() {
            var n = this,
                t = n.$ul.clone(!0, !0);
            t[0].setAttribute("class", "cbp-wrapper-helper"), n.wrapper[0].insertBefore(t[0], n.$ul[0]);
            var i = t.find(".cbp-item").not(".cbp-item-off");

            function o() {
                n.wrapper[0].removeChild(t[0]), n.$obj.removeClass("cbp-animation-" + n.options.animationType), n.blocks.each(function(t, e) {
                    a(e).data("cbp").wrapper[0].style[r["private"].animationDelay] = ""
                }), n.filterFinish()
            }
            n.blocksAreSorted && n.sortBlocks(i, "top", "left"), i.children(".cbp-item-wrapper").each(function(t, e) {
                e.style[r["private"].animationDelay] = 50 * t + "ms"
            }), requestAnimationFrame(function() {
                n.$obj.addClass("cbp-animation-" + n.options.animationType), n.blocksOff.addClass("cbp-item-off"), n.blocksOn.removeClass("cbp-item-off").each(function(t, e) {
                    var n = a(e).data("cbp");
                    n.left = n.leftNew, n.top = n.topNew, e.style.left = n.left + "px", e.style.top = n.top + "px", n.wrapper[0].style[r["private"].animationDelay] = 50 * t + "ms"
                });
                var t = n.blocksOn.length,
                    e = i.length;
                0 === t && 0 === e ? o() : t < e ? i.last().children(".cbp-item-wrapper").one(r["private"].animationend, o) : n.blocksOn.last().data("cbp").wrapper.one(r["private"].animationend, o), n.resizeMainContainer()
            })
        }, i.prototype.destroy = function() {
            var t = this.parent;
            t.$obj.removeClass("cbp-animation-" + t.options.animationType)
        }, r.plugins.animationCloneDelay = function(t) {
            return !r["private"].modernBrowser || a.inArray(t.options.animationType, ["3dflip", "flipOutDelay", "foldLeft", "frontRow", "rotateRoom", "rotateSides", "scaleDown", "slideDelay", "unfold"]) < 0 ? null : new i(t)
        }
    }(jQuery, window, document),
    function(i, t, e, n) {
        "use strict";
        var o = i.fn.cubeportfolio.constructor;

        function a(t) {
            (this.parent = t).filterLayout = this.filterLayout
        }
        a.prototype.filterLayout = function() {
            var t = this,
                e = t.$ul[0].cloneNode(!0);

            function n() {
                t.wrapper[0].removeChild(e), t.$obj.removeClass("cbp-animation-" + t.options.animationType), t.filterFinish()
            }
            e.setAttribute("class", "cbp-wrapper-helper"), t.wrapper[0].insertBefore(e, t.$ul[0]), requestAnimationFrame(function() {
                t.$obj.addClass("cbp-animation-" + t.options.animationType), t.blocksOff.addClass("cbp-item-off"), t.blocksOn.removeClass("cbp-item-off").each(function(t, e) {
                    var n = i(e).data("cbp");
                    n.left = n.leftNew, n.top = n.topNew, e.style.left = n.left + "px", e.style.top = n.top + "px"
                }), t.blocksOn.length ? t.$ul.one(o["private"].animationend, n) : t.blocksOnInitial.length ? i(e).one(o["private"].animationend, n) : n(), t.resizeMainContainer()
            })
        }, a.prototype.destroy = function() {
            var t = this.parent;
            t.$obj.removeClass("cbp-animation-" + t.options.animationType)
        }, o.plugins.animationWrapper = function(t) {
            return !o["private"].modernBrowser || i.inArray(t.options.animationType, ["bounceBottom", "bounceLeft", "bounceTop", "moveLeft"]) < 0 ? null : new a(t)
        }
    }(jQuery, window, document),
    function(t, e, n, i) {
        "use strict";
        var o = t.fn.cubeportfolio.constructor;

        function a(t) {
            var e = this,
                n = t.options;
            e.parent = t, e.captionOn = n.caption, t.registerEvent("onMediaQueries", function(t) {
                t && t.hasOwnProperty("caption") ? e.captionOn !== t.caption && (e.destroy(), e.captionOn = t.caption, e.init()) : e.captionOn !== n.caption && (e.destroy(), e.captionOn = n.caption, e.init())
            }), e.init()
        }
        a.prototype.init = function() {
            var t = this;
            "" != t.captionOn && ("expand" === t.captionOn || o["private"].modernBrowser || (t.parent.options.caption = t.captionOn = "minimal"), t.parent.$obj.addClass("cbp-caption-active cbp-caption-" + t.captionOn))
        }, a.prototype.destroy = function() {
            this.parent.$obj.removeClass("cbp-caption-active cbp-caption-" + this.captionOn)
        }, o.plugins.caption = function(t) {
            return new a(t)
        }
    }(jQuery, window, document),
    function(l, t, e, n) {
        "use strict";
        var i = l.fn.cubeportfolio.constructor;

        function o(s) {
            (this.parent = s).registerEvent("initFinish", function() {
                s.$obj.on("click.cbp", ".cbp-caption-defaultWrap", function(t) {
                    if (t.preventDefault(), !s.isAnimating) {
                        s.isAnimating = !0;
                        var e = l(this),
                            n = e.next(),
                            i = e.parent(),
                            o = {
                                position: "relative",
                                height: n.outerHeight(!0)
                            },
                            a = {
                                position: "relative",
                                height: 0
                            };
                        if (s.$obj.addClass("cbp-caption-expand-active"), i.hasClass("cbp-caption-expand-open")) {
                            var r = a;
                            a = o, o = r, i.removeClass("cbp-caption-expand-open")
                        }
                        n.css(o), s.$obj.one("pluginResize.cbp", function() {
                            s.isAnimating = !1, s.$obj.removeClass("cbp-caption-expand-active"), 0 === o.height && (i.removeClass("cbp-caption-expand-open"), n.attr("style", ""))
                        }), s.layoutAndAdjustment(!0), n.css(a), requestAnimationFrame(function() {
                            i.addClass("cbp-caption-expand-open"), n.css(o), s.triggerEvent("gridAdjust"), s.triggerEvent("resizeGrid")
                        })
                    }
                })
            }, !0)
        }
        o.prototype.destroy = function() {
            this.parent.$obj.find(".cbp-caption-defaultWrap").off("click.cbp").parent().removeClass("cbp-caption-expand-active")
        }, i.plugins.captionExpand = function(t) {
            return "expand" !== t.options.caption ? null : new o(t)
        }
    }(jQuery, window, document),
    function(i, r, t, e) {
        "use strict";
        var s = i.fn.cubeportfolio.constructor;

        function n(a) {
            a.registerEvent("initEndWrite", function() {
                if (!(a.width <= 0)) {
                    var e = i.Deferred();
                    a.pushQueue("delayFrame", e), a.blocksOn.each(function(t, e) {
                        e.style[s["private"].animationDelay] = t * a.options.displayTypeSpeed + "ms"
                    });
                    var o = i(r);
                    n() ? a.$obj.addClass("cbp-displayType-appear") : (a.$obj.addClass("cbp-displayType-appear--initial"), o.on("resize.cbp scroll.cbp", function t() {
                        n() && (setTimeout(function() {
                            a.$obj.addClass("cbp-displayType-appear")
                        }, 400), o.off("resize.cbp scroll.cbp", t))
                    })), a.blocksOn.last().one(s["private"].animationend, function() {
                        a.$obj.removeClass("cbp-displayType-appear cbp-displayType-appear--initial"), a.blocksOn.each(function(t, e) {
                            e.style[s["private"].animationDelay] = ""
                        }), e.resolve()
                    })
                }

                function n() {
                    var t = a.$obj.offset().top,
                        e = t + a.$obj.outerHeight(),
                        n = o.scrollTop(),
                        i = n + o.height();
                    return n < e && t < i
                }
            }, !0)
        }
        s.plugins.displayAppear = function(t) {
            return s["private"].modernBrowser && "appear" === t.options.displayType && 0 !== t.blocksOn.length ? new n(t) : null
        }
    }(jQuery, window, document),
    function(e, t, n, i) {
        "use strict";
        var o = e.fn.cubeportfolio.constructor;

        function a(n) {
            n.registerEvent("initEndWrite", function() {
                if (!(n.width <= 0)) {
                    var t = e.Deferred();
                    n.pushQueue("delayFrame", t), n.blocksOn.each(function(t, e) {
                        e.style[o["private"].animationDelay] = t * n.options.displayTypeSpeed + "ms"
                    }), n.$obj.addClass("cbp-displayType-bottomToTop"), n.blocksOn.last().one(o["private"].animationend, function() {
                        n.$obj.removeClass("cbp-displayType-bottomToTop"), n.blocksOn.each(function(t, e) {
                            e.style[o["private"].animationDelay] = ""
                        }), t.resolve()
                    })
                }
            }, !0)
        }
        o.plugins.displayBottomToTop = function(t) {
            return o["private"].modernBrowser && "bottomToTop" === t.options.displayType && 0 !== t.blocksOn.length ? new a(t) : null
        }
    }(jQuery, window, document),
    function(n, t, e, i) {
        "use strict";
        var o = n.fn.cubeportfolio.constructor;

        function a(e) {
            e.registerEvent("initEndWrite", function() {
                if (!(e.width <= 0)) {
                    var t = n.Deferred();
                    e.pushQueue("delayFrame", t), e.obj.style[o["private"].animationDuration] = e.options.displayTypeSpeed + "ms", e.$obj.addClass("cbp-displayType-fadeIn"), e.$obj.one(o["private"].animationend, function() {
                        e.$obj.removeClass("cbp-displayType-fadeIn"), e.obj.style[o["private"].animationDuration] = "", t.resolve()
                    })
                }
            }, !0)
        }
        o.plugins.displayFadeIn = function(t) {
            return !o["private"].modernBrowser || "lazyLoading" !== t.options.displayType && "fadeIn" !== t.options.displayType || 0 === t.blocksOn.length ? null : new a(t)
        }
    }(jQuery, window, document),
    function(n, t, e, i) {
        "use strict";
        var o = n.fn.cubeportfolio.constructor;

        function a(e) {
            e.registerEvent("initEndWrite", function() {
                if (!(e.width <= 0)) {
                    var t = n.Deferred();
                    e.pushQueue("delayFrame", t), e.obj.style[o["private"].animationDuration] = e.options.displayTypeSpeed + "ms", e.$obj.addClass("cbp-displayType-fadeInToTop"), e.$obj.one(o["private"].animationend, function() {
                        e.$obj.removeClass("cbp-displayType-fadeInToTop"), e.obj.style[o["private"].animationDuration] = "", t.resolve()
                    })
                }
            }, !0)
        }
        o.plugins.displayFadeInToTop = function(t) {
            return o["private"].modernBrowser && "fadeInToTop" === t.options.displayType && 0 !== t.blocksOn.length ? new a(t) : null
        }
    }(jQuery, window, document),
    function(e, t, n, i) {
        "use strict";
        var o = e.fn.cubeportfolio.constructor;

        function a(n) {
            n.registerEvent("initEndWrite", function() {
                if (!(n.width <= 0)) {
                    var t = e.Deferred();
                    n.pushQueue("delayFrame", t), n.blocksOn.each(function(t, e) {
                        e.style[o["private"].animationDelay] = t * n.options.displayTypeSpeed + "ms"
                    }), n.$obj.addClass("cbp-displayType-sequentially"), n.blocksOn.last().one(o["private"].animationend, function() {
                        n.$obj.removeClass("cbp-displayType-sequentially"), n.blocksOn.each(function(t, e) {
                            e.style[o["private"].animationDelay] = ""
                        }), t.resolve()
                    })
                }
            }, !0)
        }
        o.plugins.displaySequentially = function(t) {
            return o["private"].modernBrowser && "sequentially" === t.options.displayType && 0 !== t.blocksOn.length ? new a(t) : null
        }
    }(jQuery, window, document),
    function(c, t, e, n) {
        "use strict";
        var i = c.fn.cubeportfolio.constructor;

        function o(t) {
            var e = this;
            e.parent = t, e.filters = c(t.options.filters), e.filterData = [], t.registerEvent("afterPlugins", function(t) {
                e.filterFromUrl(), e.registerFilter()
            }), t.registerEvent("resetFiltersVisual", function() {
                var o = t.options.defaultFilter.split("|");
                e.filters.each(function(t, e) {
                    var i = c(e).find(".cbp-filter-item");
                    i.removeClass("cbp-filter-item-active"), c.each(o, function(t, e) {
                        var n = i.filter('[data-filter="' + e + '"]');
                        if (n.length) return n.addClass("cbp-filter-item-active"), o.splice(t, 1), !1
                    })
                }), t.defaultFilter = t.options.defaultFilter
            })
        }
        o.prototype.registerFilter = function() {
            var s = this,
                l = s.parent,
                p = l.defaultFilter.split("|");
            s.wrap = s.filters.find(".cbp-l-filters-dropdownWrap").on({
                "mouseover.cbp": function() {
                    c(this).addClass("cbp-l-filters-dropdownWrap-open")
                },
                "mouseleave.cbp": function() {
                    c(this).removeClass("cbp-l-filters-dropdownWrap-open")
                }
            }), s.filters.each(function(t, i) {
                var e = c(i),
                    n = "*",
                    o = e.find(".cbp-filter-item"),
                    a = {};
                e.hasClass("cbp-l-filters-dropdown") && (a.wrap = e.find(".cbp-l-filters-dropdownWrap"), a.header = e.find(".cbp-l-filters-dropdownHeader"), a.headerText = a.header.text()), l.$obj.cubeportfolio("showCounter", o), c.each(p, function(t, e) {
                    if (o.filter('[data-filter="' + e + '"]').length) return n = e, p.splice(t, 1), !1
                }), c.data(i, "filterName", n), s.filterData.push(i), s.filtersCallback(a, o.filter('[data-filter="' + n + '"]'), o);
                var r = i.getAttribute("data-filter-parent");
                r && (e.removeClass("cbp-l-subfilters--active"), r === s.parent.defaultFilter && e.addClass("cbp-l-subfilters--active")), o.on("click.cbp", function() {
                    var t = c(this);
                    if (!t.hasClass("cbp-filter-item-active") && !l.isAnimating) {
                        s.filtersCallback(a, t, o), c.data(i, "filterName", t.data("filter"));
                        var e = c.map(s.filterData, function(t, e) {
                            var n = c(t),
                                i = t.getAttribute("data-filter-parent");
                            i && (i === c.data(s.filterData[0], "filterName") ? n.addClass("cbp-l-subfilters--active") : (n.removeClass("cbp-l-subfilters--active"), c.data(t, "filterName", "*"), n.find(".cbp-filter-item").removeClass("cbp-filter-item-active")));
                            var o = c.data(t, "filterName");
                            return "" !== o && "*" !== o ? o : null
                        });
                        e.length < 1 && (e = ["*"]);
                        var n = e.join("|");
                        l.defaultFilter !== n && l.$obj.cubeportfolio("filter", n)
                    }
                })
            })
        }, o.prototype.filtersCallback = function(t, e, n) {
            c.isEmptyObject(t) || (t.wrap.trigger("mouseleave.cbp"), t.headerText ? t.headerText = "" : t.header.html(e.html())), n.removeClass("cbp-filter-item-active"), e.addClass("cbp-filter-item-active")
        }, o.prototype.filterFromUrl = function() {
            var t = /#cbpf=(.*?)([#\?&]|$)/gi.exec(location.href);
            null !== t && (this.parent.defaultFilter = decodeURIComponent(t[1]))
        }, o.prototype.destroy = function() {
            this.filters.find(".cbp-filter-item").off(".cbp"), this.wrap.off(".cbp")
        }, i.plugins.filters = function(t) {
            return "" === t.options.filters ? null : new o(t)
        }
    }(jQuery, window, document),
    function(o, t, e, n) {
        "use strict";

        function i(i) {
            var e = i.options.gapVertical,
                n = i.options.gapHorizontal;
            i.registerEvent("onMediaQueries", function(t) {
                i.options.gapVertical = t && t.hasOwnProperty("gapVertical") ? t.gapVertical : e, i.options.gapHorizontal = t && t.hasOwnProperty("gapHorizontal") ? t.gapHorizontal : n, i.blocks.each(function(t, e) {
                    var n = o(e).data("cbp");
                    n.widthAndGap = n.width + i.options.gapVertical, n.heightAndGap = n.height + i.options.gapHorizontal
                })
            })
        }
        o.fn.cubeportfolio.constructor.plugins.changeGapOnMediaQueries = function(t) {
            return new i(t)
        }
    }(jQuery, window, document),
    function(a, t, e, n) {
        "use strict";
        var i = {},
            o = a.fn.cubeportfolio.constructor;

        function r(t) {
            var e = this;
            e.parent = t, e.options = a.extend({}, i, e.parent.options.plugins.inlineSlider), e.runInit(), t.registerEvent("addItemsToDOM", function() {
                e.runInit()
            })
        }

        function s(t) {
            var e = this;
            t.hasClass("cbp-slider-inline-ready") || (t.addClass("cbp-slider-inline-ready"), e.items = t.find(".cbp-slider-wrapper").children(".cbp-slider-item"), e.active = e.items.filter(".cbp-slider-item--active").index(), e.total = e.items.length - 1, e.updateLeft(), t.find(".cbp-slider-next").on("click.cbp", function(t) {
                t.preventDefault(), e.active < e.total ? (e.active++, e.updateLeft()) : e.active === e.total && (e.active = 0, e.updateLeft())
            }), t.find(".cbp-slider-prev").on("click.cbp", function(t) {
                t.preventDefault(), 0 < e.active ? (e.active--, e.updateLeft()) : 0 === e.active && (e.active = e.total, e.updateLeft())
            }))
        }
        s.prototype.updateLeft = function() {
            var n = this;
            n.items.removeClass("cbp-slider-item--active"), n.items.eq(n.active).addClass("cbp-slider-item--active"), n.items.each(function(t, e) {
                e.style.left = t - n.active + "00%"
            })
        }, r.prototype.runInit = function() {
            var o = this;
            o.parent.$obj.find(".cbp-slider-inline").not(".cbp-slider-inline-ready").each(function(t, e) {
                var n = a(e),
                    i = n.find(".cbp-slider-item--active").find("img")[0];
                i.hasAttribute("data-cbp-src") ? o.parent.$obj.on("lazyLoad.cbp", function(t, e) {
                    e.src === i.src && new s(n)
                }) : new s(n)
            })
        }, r.prototype.destroy = function() {
            this.parent.$obj.find(".cbp-slider-next").off("click.cbp"), this.parent.$obj.find(".cbp-slider-prev").off("click.cbp"), this.parent.$obj.off("lazyLoad.cbp"), this.parent.$obj.find(".cbp-slider-inline").each(function(t, e) {
                var n = a(e);
                n.removeClass("cbp-slider-inline-ready");
                var i = n.find(".cbp-slider-item");
                i.removeClass("cbp-slider-item--active"), i.removeAttr("style"), i.eq(0).addClass("cbp-slider-item--active")
            })
        }, o.plugins.inlineSlider = function(t) {
            return new r(t)
        }
    }(jQuery, window, document),
    function(a, t, e, n) {
        "use strict";
        var i = {
                loadingClass: "cbp-lazyload",
                threshold: 400
            },
            o = a.fn.cubeportfolio.constructor,
            r = a(t);

        function s(t) {
            var e = this;
            e.parent = t, e.options = a.extend({}, i, e.parent.options.plugins.lazyLoad), t.registerEvent("initFinish", function() {
                e.loadImages(), t.registerEvent("resizeMainContainer", function() {
                    e.loadImages()
                }), t.registerEvent("filterFinish", function() {
                    e.loadImages()
                }), o["private"].lazyLoadScroll.initEvent({
                    instance: e,
                    fn: e.loadImages
                })
            }, !0)
        }
        o["private"].lazyLoadScroll = new o["private"].publicEvents("scroll.cbplazyLoad", 50), s.prototype.loadImages = function() {
            var o = this,
                t = o.parent.$obj.find("img").filter("[data-cbp-src]");
            0 !== t.length && (o.screenHeight = r.height(), t.each(function(t, e) {
                var n = a(e.parentNode);
                if (o.isElementInScreen(e)) {
                    var i = e.getAttribute("data-cbp-src");
                    null === o.parent.checkSrc(a("<img>").attr("src", i)) ? (o.removeLazyLoad(e, i), n.removeClass(o.options.loadingClass)) : (n.addClass(o.options.loadingClass), a("<img>").on("load.cbp error.cbp", function() {
                        o.removeLazyLoad(e, i, n)
                    }).attr("src", i))
                } else n.addClass(o.options.loadingClass)
            }))
        }, s.prototype.removeLazyLoad = function(t, e, n) {
            var i = this;
            t.src = e, t.removeAttribute("data-cbp-src"), i.parent.removeAttrImage(t), i.parent.$obj.trigger("lazyLoad.cbp", t), n && (o["private"].modernBrowser ? a(t).one(o["private"].transitionend, function() {
                n.removeClass(i.options.loadingClass)
            }) : n.removeClass(i.options.loadingClass))
        }, s.prototype.isElementInScreen = function(t) {
            var e = t.getBoundingClientRect(),
                n = e.bottom + this.options.threshold,
                i = this.screenHeight + n - (e.top - this.options.threshold);
            return 0 <= n && n <= i
        }, s.prototype.destroy = function() {
            o["private"].lazyLoadScroll.destroyEvent(this)
        }, o.plugins.lazyLoad = function(t) {
            return new s(t)
        }
    }(jQuery, window, document),
    function(r, a, t, e) {
        "use strict";
        var i = {
                element: "",
                action: "click",
                loadItems: 3
            },
            s = r.fn.cubeportfolio.constructor;

        function n(t) {
            var n = this;
            n.parent = t, n.options = r.extend({}, i, n.parent.options.plugins.loadMore), n.loadMore = r(n.options.element).find(".cbp-l-loadMore-link"), 0 !== n.loadMore.length && (n.loadItems = n.loadMore.find(".cbp-l-loadMore-loadItems"), "0" === n.loadItems.text() && n.loadMore.addClass("cbp-l-loadMore-stop"), t.registerEvent("filterStart", function(e) {
                n.populateItems().then(function() {
                    var t = n.items.filter(n.parent.filterConcat(e)).length;
                    0 < t ? (n.loadMore.removeClass("cbp-l-loadMore-stop"), n.loadItems.html(t)) : n.loadMore.addClass("cbp-l-loadMore-stop")
                })
            }), n[n.options.action]())
        }
        n.prototype.populateItems = function() {
            var n = this;
            return n.items ? r.Deferred().resolve() : (n.items = r(), r.ajax({
                url: n.loadMore.attr("href"),
                type: "GET",
                dataType: "HTML"
            }).done(function(t) {
                var e = r.map(t.split(/\r?\n/), function(t, e) {
                    return r.trim(t)
                }).join("");
                0 !== e.length && r.each(r.parseHTML(e), function(t, e) {
                    r(e).hasClass("cbp-item") ? n.items = n.items.add(e) : r.each(e.children, function(t, e) {
                        r(e).hasClass("cbp-item") && (n.items = n.items.add(e))
                    })
                })
            }).fail(function() {
                n.items = null, n.loadMore.removeClass("cbp-l-loadMore-loading")
            }))
        }, n.prototype.populateInsertItems = function(t) {
            var n = this,
                i = [],
                o = n.parent.defaultFilter,
                a = 0;
            n.items.each(function(t, e) {
                if (a === n.options.loadItems) return !1;
                o && "*" !== o ? r(e).filter(n.parent.filterConcat(o)).length && (i.push(e), n.items[t] = null, a++) : (i.push(e), n.items[t] = null, a++)
            }), n.items = n.items.map(function(t, e) {
                return e
            }), 0 !== i.length ? n.parent.$obj.cubeportfolio("append", i, t) : n.loadMore.removeClass("cbp-l-loadMore-loading").addClass("cbp-l-loadMore-stop")
        }, n.prototype.click = function() {
            var n = this;

            function e() {
                n.loadMore.removeClass("cbp-l-loadMore-loading");
                var t, e = n.parent.defaultFilter;
                0 === (t = e && "*" !== e ? n.items.filter(n.parent.filterConcat(e)).length : n.items.length) ? n.loadMore.addClass("cbp-l-loadMore-stop") : n.loadItems.html(t)
            }
            n.loadMore.on("click.cbp", function(t) {
                t.preventDefault(), n.parent.isAnimating || n.loadMore.hasClass("cbp-l-loadMore-stop") || (n.loadMore.addClass("cbp-l-loadMore-loading"), n.populateItems().then(function() {
                    n.populateInsertItems(e)
                }))
            })
        }, n.prototype.auto = function() {
            var n = this,
                i = r(a),
                o = !1;

            function t() {
                if (!o && !n.loadMore.hasClass("cbp-l-loadMore-stop")) {
                    var t = n.loadMore.offset().top - 200;
                    i.scrollTop() + i.height() < t || (o = !0, n.populateItems().then(function() {
                        n.populateInsertItems(e)
                    }).fail(function() {
                        o = !1
                    }))
                }
            }

            function e() {
                var t, e = n.parent.defaultFilter;
                0 === (t = e && "*" !== e ? n.items.filter(n.parent.filterConcat(e)).length : n.items.length) ? n.loadMore.removeClass("cbp-l-loadMore-loading").addClass("cbp-l-loadMore-stop") : (n.loadItems.html(t), i.trigger("scroll.loadMore")), o = !1, 0 === n.items.length && (s["private"].loadMoreScroll.destroyEvent(n), n.parent.$obj.off("filterComplete.cbp"))
            }
            s["private"].loadMoreScroll = new s["private"].publicEvents("scroll.loadMore", 100), n.parent.$obj.one("initComplete.cbp", function() {
                n.loadMore.addClass("cbp-l-loadMore-loading").on("click.cbp", function(t) {
                    t.preventDefault()
                }), s["private"].loadMoreScroll.initEvent({
                    instance: n,
                    fn: function() {
                        n.parent.isAnimating || t()
                    }
                }), n.parent.$obj.on("filterComplete.cbp", function() {
                    t()
                }), t()
            })
        }, n.prototype.destroy = function() {
            this.loadMore.off(".cbp"), s["private"].loadMoreScroll && s["private"].loadMoreScroll.destroyEvent(this)
        }, s.plugins.loadMore = function(t) {
            var e = t.options.plugins;
            return t.options.loadMore && (e.loadMore || (e.loadMore = {}), e.loadMore.element = t.options.loadMore), t.options.loadMoreAction && (e.loadMore || (e.loadMore = {}), e.loadMore.action = t.options.loadMoreAction), e.loadMore && void 0 !== e.loadMore.selector && (e.loadMore.element = e.loadMore.selector, delete e.loadMore.selector), e.loadMore && e.loadMore.element ? new n(t) : null
        }
    }(jQuery, window, document),
    function(u, d, f, t) {
        "use strict";
        var l = u.fn.cubeportfolio.constructor,
            c = {},
            g = {},
            h = {
                delay: 0,
                offset: 100
            },
            e = {
                init: function(t, e) {
                    var o, a = this;
                    if (a.cubeportfolio = t, a.type = e, a.isOpen = !1, a.options = a.cubeportfolio.options, "lightbox" === e && (a.cubeportfolio.registerEvent("resizeWindow", function() {
                            a.resizeImage()
                        }), a.localOptions = u.extend({}, c, a.cubeportfolio.options.plugins.lightbox)), "singlePageInline" !== e) {
                        if (a.createMarkup(), "singlePage" === e) {
                            if (a.cubeportfolio.registerEvent("resizeWindow", function() {
                                    if (a.options.singlePageStickyNavigation) {
                                        var t = a.contentWrap[0].clientWidth;
                                        0 < t && (a.navigationWrap.width(t), a.navigation.width(t))
                                    }
                                }), a.options.singlePageDeeplinking) {
                                a.url = location.href, "#" === a.url.slice(-1) && (a.url = a.url.slice(0, -1));
                                p = (l = a.url.split("#cbp=")).shift();
                                if (u.each(l, function(t, i) {
                                        if (a.cubeportfolio.blocksOn.each(function(t, e) {
                                                var n = u(e).find(a.options.singlePageDelegate + '[href="' + i + '"]');
                                                if (n.length) return o = n, !1
                                            }), o) return !1
                                    }), o) {
                                    a.url = p;
                                    var n = o,
                                        i = n.attr("data-cbp-singlePage"),
                                        r = [];
                                    i ? r = n.closest(u(".cbp-item")).find('[data-cbp-singlePage="' + i + '"]') : a.cubeportfolio.blocksOn.each(function(t, e) {
                                        var n = u(e);
                                        n.not(".cbp-item-off") && n.find(a.options.singlePageDelegate).each(function(t, e) {
                                            u(e).attr("data-cbp-singlePage") || r.push(e)
                                        })
                                    }), a.openSinglePage(r, o[0])
                                } else if (l.length) {
                                    var s = f.createElement("a");
                                    s.setAttribute("href", l[0]), a.openSinglePage([s], s)
                                }
                            }
                            a.localOptions = u.extend({}, g, a.cubeportfolio.options.plugins.singlePage)
                        }
                    } else {
                        if (a.height = 0, a.createMarkupSinglePageInline(), a.cubeportfolio.registerEvent("resizeGrid", function() {
                                a.isOpen && a.close()
                            }), a.options.singlePageInlineDeeplinking) {
                            a.url = location.href, "#" === a.url.slice(-1) && (a.url = a.url.slice(0, -1));
                            var l, p = (l = a.url.split("#cbpi=")).shift();
                            u.each(l, function(t, i) {
                                if (a.cubeportfolio.blocksOn.each(function(t, e) {
                                        var n = u(e).find(a.options.singlePageInlineDelegate + '[href="' + i + '"]');
                                        if (n.length) return o = n, !1
                                    }), o) return !1
                            }), o && a.cubeportfolio.registerEvent("initFinish", function() {
                                a.openSinglePageInline(a.cubeportfolio.blocksOn, o[0])
                            }, !0)
                        }
                        a.localOptions = u.extend({}, h, a.cubeportfolio.options.plugins.singlePageInline)
                    }
                },
                createMarkup: function() {
                    var r = this,
                        t = "";
                    if ("singlePage" === r.type && "left" !== r.options.singlePageAnimation && (t = " cbp-popup-singlePage-" + r.options.singlePageAnimation), r.wrap = u("<div/>", {
                            "class": "cbp-popup-wrap cbp-popup-" + r.type + t,
                            "data-action": "lightbox" === r.type ? "close" : ""
                        }).on("click.cbp", function(t) {
                            if (!r.stopEvents) {
                                var e = u(t.target).attr("data-action");
                                r[e] && (r[e](), t.preventDefault())
                            }
                        }), "singlePage" === r.type ? (r.contentWrap = u("<div/>", {
                            "class": "cbp-popup-content-wrap"
                        }).appendTo(r.wrap), "ios" === l["private"].browser && r.contentWrap.css("overflow", "auto"), r.content = u("<div/>", {
                            "class": "cbp-popup-content"
                        }).appendTo(r.contentWrap)) : r.content = u("<div/>", {
                            "class": "cbp-popup-content"
                        }).appendTo(r.wrap), u("<div/>", {
                            "class": "cbp-popup-loadingBox"
                        }).appendTo(r.wrap), "ie8" === l["private"].browser && (r.bg = u("<div/>", {
                            "class": "cbp-popup-ie8bg",
                            "data-action": "lightbox" === r.type ? "close" : ""
                        }).appendTo(r.wrap)), "singlePage" === r.type && !1 === r.options.singlePageStickyNavigation ? r.navigationWrap = u("<div/>", {
                            "class": "cbp-popup-navigation-wrap"
                        }).appendTo(r.contentWrap) : r.navigationWrap = u("<div/>", {
                            "class": "cbp-popup-navigation-wrap"
                        }).appendTo(r.wrap), r.navigation = u("<div/>", {
                            "class": "cbp-popup-navigation"
                        }).appendTo(r.navigationWrap), r.closeButton = u("<div/>", {
                            "class": "cbp-popup-close",
                            title: "Close (Esc arrow key)",
                            "data-action": "close"
                        }).appendTo(r.navigation), r.nextButton = u("<div/>", {
                            "class": "cbp-popup-next",
                            title: "Next (Right arrow key)",
                            "data-action": "next"
                        }).appendTo(r.navigation), r.prevButton = u("<div/>", {
                            "class": "cbp-popup-prev",
                            title: "Previous (Left arrow key)",
                            "data-action": "prev"
                        }).appendTo(r.navigation), "singlePage" === r.type) {
                        r.options.singlePageCounter && (r.counter = u(r.options.singlePageCounter).appendTo(r.navigation), r.counter.text("")), r.content.on("click.cbp", r.options.singlePageDelegate, function(t) {
                            t.preventDefault();
                            var e, n, i = r.dataArray.length,
                                o = this.getAttribute("href");
                            for (e = 0; e < i; e++)
                                if (r.dataArray[e].url === o) {
                                    n = e;
                                    break
                                }
                            if (void 0 === n) {
                                var a = f.createElement("a");
                                a.setAttribute("href", o), r.dataArray = [{
                                    url: o,
                                    element: a
                                }], r.counterTotal = 1, r.nextButton.hide(), r.prevButton.hide(), r.singlePageJumpTo(0)
                            } else r.singlePageJumpTo(n - r.current)
                        });
                        var e = !1;
                        try {
                            var n = Object.defineProperty({}, "passive", {
                                get: function() {
                                    e = {
                                        passive: !0
                                    }
                                }
                            });
                            d.addEventListener("testPassive", null, n), d.removeEventListener("testPassive", null, n)
                        } catch (o) {}
                        var i = "onwheel" in f.createElement("div") ? "wheel" : "mousewheel";
                        r.contentWrap[0].addEventListener(i, function(t) {
                            t.stopImmediatePropagation()
                        }, e)
                    }
                    u(f).on("keydown.cbp", function(t) {
                        r.isOpen && (r.stopEvents || (a && t.stopImmediatePropagation(), 37 === t.keyCode ? r.prev() : 39 === t.keyCode ? r.next() : 27 === t.keyCode && r.close()))
                    })
                },
                createMarkupSinglePageInline: function() {
                    var n = this;
                    n.wrap = u("<div/>", {
                        "class": "cbp-popup-singlePageInline"
                    }).on("click.cbp", function(t) {
                        if (!n.stopEvents) {
                            var e = u(t.target).attr("data-action");
                            e && n[e] && (n[e](), t.preventDefault())
                        }
                    }), n.content = u("<div/>", {
                        "class": "cbp-popup-content"
                    }).appendTo(n.wrap), n.navigation = u("<div/>", {
                        "class": "cbp-popup-navigation"
                    }).appendTo(n.wrap), n.closeButton = u("<div/>", {
                        "class": "cbp-popup-close",
                        title: "Close (Esc arrow key)",
                        "data-action": "close"
                    }).appendTo(n.navigation)
                },
                destroy: function() {
                    var t = this,
                        e = u("body");
                    u(f).off("keydown.cbp"), e.off("click.cbp", t.options.lightboxDelegate), e.off("click.cbp", t.options.singlePageDelegate), t.content.off("click.cbp", t.options.singlePageDelegate), t.cubeportfolio.$obj.off("click.cbp", t.options.singlePageInlineDelegate), t.cubeportfolio.$obj.off("click.cbp", t.options.lightboxDelegate), t.cubeportfolio.$obj.off("click.cbp", t.options.singlePageDelegate), t.cubeportfolio.$obj.removeClass("cbp-popup-isOpening"), t.cubeportfolio.$obj.find(".cbp-item").removeClass("cbp-singlePageInline-active"), t.wrap.remove()
                },
                openLightbox: function(t, e) {
                    var s, n, l = this,
                        p = 0,
                        c = [];
                    if (!l.isOpen) {
                        if (a = !0, l.isOpen = !0, l.stopEvents = !1, l.dataArray = [], (l.current = null) === (s = e.getAttribute("href"))) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                        u.each(t, function(t, e) {
                            var n, i = e.getAttribute("href"),
                                o = i,
                                a = "isImage";
                            if (-1 === u.inArray(i, c)) {
                                if (s === i) l.current = p;
                                else if (!l.options.lightboxGallery) return;
                                if (/youtu\.?be/i.test(i)) {
                                    var r = i.lastIndexOf("v=") + 2;
                                    1 === r && (r = i.lastIndexOf("/") + 1), n = i.substring(r), /autoplay=/i.test(n) || (n += "&autoplay=1"), o = "//www.youtube.com/embed/" + (n = n.replace(/\?|&/, "?")), a = "isYoutube"
                                } else /vimeo\.com/i.test(i) ? (n = i.substring(i.lastIndexOf("/") + 1), /autoplay=/i.test(n) || (n += "&autoplay=1"), o = "//player.vimeo.com/video/" + (n = n.replace(/\?|&/, "?")), a = "isVimeo") : /www\.ted\.com/i.test(i) ? (o = "http://embed.ted.com/talks/" + i.substring(i.lastIndexOf("/") + 1) + ".html", a = "isTed") : /soundcloud\.com/i.test(i) ? (o = i, a = "isSoundCloud") : /(\.mp4)|(\.ogg)|(\.ogv)|(\.webm)/i.test(i) ? (o = -1 !== i.indexOf("|") ? i.split("|") : i.split("%7C"), a = "isSelfHostedVideo") : /\.mp3$/i.test(i) && (o = i, a = "isSelfHostedAudio");
                                l.dataArray.push({
                                    src: o,
                                    title: e.getAttribute(l.options.lightboxTitleSrc),
                                    type: a
                                }), p++
                            }
                            c.push(i)
                        }), l.counterTotal = l.dataArray.length, 1 === l.counterTotal ? (l.nextButton.hide(), l.prevButton.hide(), l.dataActionImg = "") : (l.nextButton.show(), l.prevButton.show(), l.dataActionImg = 'data-action="next"'), l.wrap.appendTo(f.body), l.scrollTop = u(d).scrollTop(), l.originalStyle = u("html").attr("style"), u("html").css({
                            overflow: "hidden",
                            marginRight: d.innerWidth - u(f).width()
                        }), l.wrap.addClass("cbp-popup-transitionend"), l.wrap.show(), n = l.dataArray[l.current], l[n.type](n)
                    }
                },
                openSinglePage: function(t, e) {
                    var i, o = this,
                        a = 0,
                        r = [];
                    if (!o.isOpen) {
                        if (o.cubeportfolio.singlePageInline && o.cubeportfolio.singlePageInline.isOpen && o.cubeportfolio.singlePageInline.close(), o.isOpen = !0, o.stopEvents = !1, o.dataArray = [], (o.current = null) === (i = e.getAttribute("href"))) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                        if (u.each(t, function(t, e) {
                                var n = e.getAttribute("href"); - 1 === u.inArray(n, r) && (i === n && (o.current = a), o.dataArray.push({
                                    url: n,
                                    element: e
                                }), a++), r.push(n)
                            }), o.counterTotal = o.dataArray.length, 1 === o.counterTotal ? (o.nextButton.hide(), o.prevButton.hide()) : (o.nextButton.show(), o.prevButton.show()), o.wrap.appendTo(f.body), o.scrollTop = u(d).scrollTop(), o.contentWrap.scrollTop(0), o.wrap.show(), o.finishOpen = 2, o.navigationMobile = u(), o.wrap.one(l["private"].transitionend, function() {
                                u("html").css({
                                    overflow: "hidden",
                                    marginRight: d.innerWidth - u(f).width()
                                }), o.wrap.addClass("cbp-popup-transitionend"), o.options.singlePageStickyNavigation && (o.wrap.addClass("cbp-popup-singlePage-sticky"), o.navigationWrap.width(o.contentWrap[0].clientWidth)), o.finishOpen--, o.finishOpen <= 0 && o.updateSinglePageIsOpen.call(o)
                            }), "ie8" !== l["private"].browser && "ie9" !== l["private"].browser || (u("html").css({
                                overflow: "hidden",
                                marginRight: d.innerWidth - u(f).width()
                            }), o.wrap.addClass("cbp-popup-transitionend"), o.options.singlePageStickyNavigation && (o.navigationWrap.width(o.contentWrap[0].clientWidth), setTimeout(function() {
                                o.wrap.addClass("cbp-popup-singlePage-sticky")
                            }, 1e3)), o.finishOpen--), o.wrap.addClass("cbp-popup-loading"), o.wrap.offset(), o.wrap.addClass("cbp-popup-singlePage-open"), o.options.singlePageDeeplinking && (o.url = o.url.split("#cbp=")[0], location.href = o.url + "#cbp=" + o.dataArray[o.current].url), u.isFunction(o.options.singlePageCallback) && o.options.singlePageCallback.call(o, o.dataArray[o.current].url, o.dataArray[o.current].element), "ios" === l["private"].browser) {
                            var s = o.contentWrap[0];
                            s.addEventListener("touchstart", function() {
                                var t = s.scrollTop,
                                    e = s.scrollHeight,
                                    n = t + s.offsetHeight;
                                0 === t ? s.scrollTop = 1 : n === e && (s.scrollTop = t - 1)
                            })
                        }
                    }
                },
                openSinglePageInline: function(t, e, n) {
                    var i, o, a, r = this;
                    if (n = n || !1, r.fromOpen = n, r.storeBlocks = t, r.storeCurrentBlock = e, r.isOpen) return o = r.cubeportfolio.blocksOn.index(u(e).closest(".cbp-item")), void(r.dataArray[r.current].url !== e.getAttribute("href") || r.current !== o ? r.cubeportfolio.singlePageInline.close("open", {
                        blocks: t,
                        currentBlock: e,
                        fromOpen: !0
                    }) : r.close());
                    if (r.isOpen = !0, r.stopEvents = !1, r.dataArray = [], (r.current = null) === (i = e.getAttribute("href"))) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                    if (a = u(e).closest(".cbp-item")[0], t.each(function(t, e) {
                            a === e && (r.current = t)
                        }), r.dataArray[r.current] = {
                            url: i,
                            element: e
                        }, u(r.dataArray[r.current].element).parents(".cbp-item").addClass("cbp-singlePageInline-active"), r.counterTotal = t.length, r.wrap.insertBefore(r.cubeportfolio.wrapper), r.topDifference = 0, "top" === r.options.singlePageInlinePosition) r.blocksToMove = t, r.top = 0;
                    else if ("bottom" === r.options.singlePageInlinePosition) r.blocksToMove = u(), r.top = r.cubeportfolio.height;
                    else if ("above" === r.options.singlePageInlinePosition) {
                        var s = u(t[r.current]).data("cbp").top;
                        r.top = s, t.each(function(t, e) {
                            var n = u(e).data("cbp"),
                                i = n.top,
                                o = i + n.heightAndGap;
                            s <= i || o > r.top && (r.top = o, r.topDifference = r.top - s)
                        }), r.blocksToMove = u(), t.each(function(t, e) {
                            if (t !== r.current) {
                                var n = u(e).data("cbp");
                                n.top + n.heightAndGap > r.top && (r.blocksToMove = r.blocksToMove.add(e))
                            } else r.blocksToMove = r.blocksToMove.add(e)
                        }), r.top = Math.max(r.top - r.options.gapHorizontal, 0)
                    } else {
                        var l = u(t[r.current]).data("cbp"),
                            p = l.top + l.heightAndGap;
                        r.top = p, r.blocksToMove = u(), t.each(function(t, e) {
                            var n = u(e).data("cbp"),
                                i = n.top,
                                o = i + n.height;
                            o <= p || (i >= p - n.height / 2 ? r.blocksToMove = r.blocksToMove.add(e) : p < o && i < p && (o > r.top && (r.top = o), o - p > r.topDifference && (r.topDifference = o - p)))
                        })
                    }
                    if (r.wrap[0].style.height = r.wrap.outerHeight(!0) + "px", r.deferredInline = u.Deferred(), r.options.singlePageInlineInFocus) {
                        r.scrollTop = u(d).scrollTop();
                        var c = r.cubeportfolio.$obj.offset().top + r.top - r.localOptions.offset;
                        r.scrollTop !== c ? u("html,body").animate({
                            scrollTop: c
                        }, 350).promise().then(function() {
                            r.resizeSinglePageInline(), r.deferredInline.resolve()
                        }) : (r.resizeSinglePageInline(), r.deferredInline.resolve())
                    } else r.resizeSinglePageInline(), r.deferredInline.resolve();
                    r.cubeportfolio.$obj.addClass("cbp-popup-singlePageInline-open"), r.wrap.css({
                        top: r.top
                    }), r.options.singlePageInlineDeeplinking && (r.url = r.url.split("#cbpi=")[0], location.href = r.url + "#cbpi=" + r.dataArray[r.current].url), u.isFunction(r.options.singlePageInlineCallback) && r.options.singlePageInlineCallback.call(r, r.dataArray[r.current].url, r.dataArray[r.current].element)
                },
                resizeSinglePageInline: function() {
                    var n = this;
                    n.height = 0 === n.top || n.top === n.cubeportfolio.height ? n.wrap.outerHeight(!0) : n.wrap.outerHeight(!0) - n.options.gapHorizontal, n.height += n.topDifference, n.storeBlocks.each(function(t, e) {
                        l["private"].modernBrowser ? e.style[l["private"].transform] = "" : e.style.marginTop = ""
                    }), n.blocksToMove.each(function(t, e) {
                        l["private"].modernBrowser ? e.style[l["private"].transform] = "translate3d(0px, " + n.height + "px, 0)" : e.style.marginTop = n.height + "px"
                    }), n.cubeportfolio.obj.style.height = n.cubeportfolio.height + n.height + "px"
                },
                revertResizeSinglePageInline: function() {
                    this.deferredInline = u.Deferred(), this.storeBlocks.each(function(t, e) {
                        l["private"].modernBrowser ? e.style[l["private"].transform] = "" : e.style.marginTop = ""
                    }), this.cubeportfolio.obj.style.height = this.cubeportfolio.height + "px"
                },
                appendScriptsToWrap: function(i) {
                    var o = this,
                        a = 0,
                        r = function(t) {
                            var e = f.createElement("script"),
                                n = t.src;
                            e.type = "text/javascript", e.readyState ? e.onreadystatechange = function() {
                                "loaded" != e.readyState && "complete" != e.readyState || (e.onreadystatechange = null, i[++a] && r(i[a]))
                            } : e.onload = function() {
                                i[++a] && r(i[a])
                            }, n ? e.src = n : e.text = t.text, o.content[0].appendChild(e)
                        };
                    r(i[0])
                },
                updateSinglePage: function(t, e, n) {
                    var i, o = this;
                    o.content.addClass("cbp-popup-content").removeClass("cbp-popup-content-basic"), !1 === n && o.content.removeClass("cbp-popup-content").addClass("cbp-popup-content-basic"), o.counter && (i = u(o.getCounterMarkup(o.options.singlePageCounter, o.current + 1, o.counterTotal)), o.counter.text(i.text())), o.fromAJAX = {
                        html: t,
                        scripts: e
                    }, o.finishOpen--, o.finishOpen <= 0 && o.updateSinglePageIsOpen.call(o)
                },
                updateSinglePageIsOpen: function() {
                    var t, e = this;
                    e.wrap.addClass("cbp-popup-ready"), e.wrap.removeClass("cbp-popup-loading"), e.content.html(e.fromAJAX.html), e.fromAJAX.scripts && e.appendScriptsToWrap(e.fromAJAX.scripts), e.fromAJAX = {}, e.cubeportfolio.$obj.trigger("updateSinglePageStart.cbp"), (t = e.content.find(".cbp-slider")).length ? (t.find(".cbp-slider-item").addClass("cbp-item"), e.slider = t.cubeportfolio({
                        layoutMode: "slider",
                        mediaQueries: [{
                            width: 1,
                            cols: 1
                        }],
                        gapHorizontal: 0,
                        gapVertical: 0,
                        caption: "",
                        coverRatio: ""
                    })) : e.slider = null, e.checkForSocialLinks(e.content), e.cubeportfolio.$obj.trigger("updateSinglePageComplete.cbp")
                },
                checkForSocialLinks: function(t) {
                    this.createFacebookShare(t.find(".cbp-social-fb")), this.createTwitterShare(t.find(".cbp-social-twitter")), this.createGooglePlusShare(t.find(".cbp-social-googleplus")), this.createPinterestShare(t.find(".cbp-social-pinterest"))
                },
                createFacebookShare: function(t) {
                    t.length && !t.attr("onclick") && t.attr("onclick", "window.open('http://www.facebook.com/sharer.php?u=" + encodeURIComponent(d.location.href) + "', '_blank', 'top=100,left=100,toolbar=0,status=0,width=620,height=400'); return false;")
                },
                createTwitterShare: function(t) {
                    t.length && !t.attr("onclick") && t.attr("onclick", "window.open('https://twitter.com/intent/tweet?source=" + encodeURIComponent(d.location.href) + "&text=" + encodeURIComponent(f.title) + "', '_blank', 'top=100,left=100,toolbar=0,status=0,width=620,height=300'); return false;")
                },
                createGooglePlusShare: function(t) {
                    t.length && !t.attr("onclick") && t.attr("onclick", "window.open('https://plus.google.com/share?url=" + encodeURIComponent(d.location.href) + "', '_blank', 'top=100,left=100,toolbar=0,status=0,width=620,height=450'); return false;")
                },
                createPinterestShare: function(t) {
                    if (t.length && !t.attr("onclick")) {
                        var e = "",
                            n = this.content.find("img")[0];
                        n && (e = n.src), t.attr("onclick", "window.open('http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(d.location.href) + "&media=" + e + "', '_blank', 'top=100,left=100,toolbar=0,status=0,width=620,height=400'); return false;")
                    }
                },
                updateSinglePageInline: function(t, e) {
                    var n = this;
                    n.content.html(t), e && n.appendScriptsToWrap(e), n.cubeportfolio.$obj.trigger("updateSinglePageInlineStart.cbp"), 0 !== n.localOptions.delay ? setTimeout(function() {
                        n.singlePageInlineIsOpen.call(n)
                    }, n.localOptions.delay) : n.singlePageInlineIsOpen.call(n)
                },
                singlePageInlineIsOpen: function() {
                    var e = this;

                    function n() {
                        e.wrap.addClass("cbp-popup-singlePageInline-ready"), e.wrap[0].style.height = "", e.resizeSinglePageInline(), e.cubeportfolio.$obj.trigger("updateSinglePageInlineComplete.cbp")
                    }
                    e.cubeportfolio.loadImages(e.wrap, function() {
                        var t = e.content.find(".cbp-slider");
                        t.length ? (t.find(".cbp-slider-item").addClass("cbp-item"), t.one("initComplete.cbp", function() {
                            e.deferredInline.done(n)
                        }), t.on("pluginResize.cbp", function() {
                            e.deferredInline.done(n)
                        }), e.slider = t.cubeportfolio({
                            layoutMode: "slider",
                            displayType: "default",
                            mediaQueries: [{
                                width: 1,
                                cols: 1
                            }],
                            gapHorizontal: 0,
                            gapVertical: 0,
                            caption: "",
                            coverRatio: ""
                        })) : (e.slider = null, e.deferredInline.done(n)), e.checkForSocialLinks(e.content)
                    })
                },
                isImage: function(t) {
                    var e = this;
                    new Image;
                    e.tooggleLoading(!0), e.cubeportfolio.loadImages(u('<div><img src="' + t.src + '"></div>'), function() {
                        e.updateImagesMarkup(t.src, t.title, e.getCounterMarkup(e.options.lightboxCounter, e.current + 1, e.counterTotal)), e.tooggleLoading(!1)
                    })
                },
                isVimeo: function(t) {
                    var e = this;
                    e.updateVideoMarkup(t.src, t.title, e.getCounterMarkup(e.options.lightboxCounter, e.current + 1, e.counterTotal))
                },
                isYoutube: function(t) {
                    var e = this;
                    e.updateVideoMarkup(t.src, t.title, e.getCounterMarkup(e.options.lightboxCounter, e.current + 1, e.counterTotal))
                },
                isTed: function(t) {
                    var e = this;
                    e.updateVideoMarkup(t.src, t.title, e.getCounterMarkup(e.options.lightboxCounter, e.current + 1, e.counterTotal))
                },
                isSoundCloud: function(t) {
                    var e = this;
                    e.updateVideoMarkup(t.src, t.title, e.getCounterMarkup(e.options.lightboxCounter, e.current + 1, e.counterTotal))
                },
                isSelfHostedVideo: function(t) {
                    var e = this;
                    e.updateSelfHostedVideo(t.src, t.title, e.getCounterMarkup(e.options.lightboxCounter, e.current + 1, e.counterTotal))
                },
                isSelfHostedAudio: function(t) {
                    var e = this;
                    e.updateSelfHostedAudio(t.src, t.title, e.getCounterMarkup(e.options.lightboxCounter, e.current + 1, e.counterTotal))
                },
                getCounterMarkup: function(t, e, n) {
                    if (!t.length) return "";
                    var i = {
                        current: e,
                        total: n
                    };
                    return t.replace(/\{\{current}}|\{\{total}}/gi, function(t) {
                        return i[t.slice(2, -2)]
                    })
                },
                updateSelfHostedVideo: function(t, e, n) {
                    var i;
                    this.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var o = '<div class="cbp-popup-lightbox-iframe"><video controls="controls" height="auto" style="width: 100%">';
                    for (i = 0; i < t.length; i++) /(\.mp4)/i.test(t[i]) ? o += '<source src="' + t[i] + '" type="video/mp4">' : /(\.ogg)|(\.ogv)/i.test(t[i]) ? o += '<source src="' + t[i] + '" type="video/ogg">' : /(\.webm)/i.test(t[i]) && (o += '<source src="' + t[i] + '" type="video/webm">');
                    o += 'Your browser does not support the video tag.</video><div class="cbp-popup-lightbox-bottom">' + (e ? '<div class="cbp-popup-lightbox-title">' + e + "</div>" : "") + n + "</div></div>", this.content.html(o), this.wrap.addClass("cbp-popup-ready"), this.preloadNearbyImages()
                },
                updateSelfHostedAudio: function(t, e, n) {
                    this.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var i = '<div class="cbp-popup-lightbox-iframe"><div class="cbp-misc-video"><audio controls="controls" height="auto" style="width: 75%"><source src="' + t + '" type="audio/mpeg">Your browser does not support the audio tag.</audio></div><div class="cbp-popup-lightbox-bottom">' + (e ? '<div class="cbp-popup-lightbox-title">' + e + "</div>" : "") + n + "</div></div>";
                    this.content.html(i), this.wrap.addClass("cbp-popup-ready"), this.preloadNearbyImages()
                },
                updateVideoMarkup: function(t, e, n) {
                    this.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var i = '<div class="cbp-popup-lightbox-iframe"><iframe src="' + t + '" frameborder="0" allowfullscreen scrolling="no"></iframe><div class="cbp-popup-lightbox-bottom">' + (e ? '<div class="cbp-popup-lightbox-title">' + e + "</div>" : "") + n + "</div></div>";
                    this.content.html(i), this.wrap.addClass("cbp-popup-ready"), this.preloadNearbyImages()
                },
                updateImagesMarkup: function(t, e, n) {
                    var i = this;
                    i.wrap.removeClass("cbp-popup-lightbox-isIframe");
                    var o = '<div class="cbp-popup-lightbox-figure"><img src="' + t + '" class="cbp-popup-lightbox-img" ' + i.dataActionImg + ' /><div class="cbp-popup-lightbox-bottom">' + (e ? '<div class="cbp-popup-lightbox-title">' + e + "</div>" : "") + n + "</div></div>";
                    i.content.html(o), i.wrap.addClass("cbp-popup-ready"), i.resizeImage(), i.preloadNearbyImages()
                },
                next: function() {
                    this[this.type + "JumpTo"](1)
                },
                prev: function() {
                    this[this.type + "JumpTo"](-1)
                },
                lightboxJumpTo: function(t) {
                    var e, n = this;
                    n.current = n.getIndex(n.current + t), n[(e = n.dataArray[n.current]).type](e)
                },
                singlePageJumpTo: function(t) {
                    var e = this;
                    e.current = e.getIndex(e.current + t), u.isFunction(e.options.singlePageCallback) && (e.resetWrap(), e.contentWrap.scrollTop(0), e.wrap.addClass("cbp-popup-loading"), e.slider && l["private"].resize.destroyEvent(u.data(e.slider[0], "cubeportfolio")), e.options.singlePageCallback.call(e, e.dataArray[e.current].url, e.dataArray[e.current].element), e.options.singlePageDeeplinking && (location.href = e.url + "#cbp=" + e.dataArray[e.current].url))
                },
                resetWrap: function() {
                    var t = this;
                    "singlePage" === t.type && t.options.singlePageDeeplinking && (location.href = t.url + "#"), "singlePageInline" === t.type && t.options.singlePageInlineDeeplinking && (location.href = t.url + "#")
                },
                getIndex: function(t) {
                    return (t %= this.counterTotal) < 0 && (t = this.counterTotal + t), t
                },
                close: function(e, t) {
                    var n = this;

                    function i() {
                        n.slider && l["private"].resize.destroyEvent(u.data(n.slider[0], "cubeportfolio")), n.content.html(""), n.wrap.detach(), n.cubeportfolio.$obj.removeClass("cbp-popup-singlePageInline-open cbp-popup-singlePageInline-close"), n.isOpen = !1, "promise" === e && u.isFunction(t.callback) && t.callback.call(n.cubeportfolio)
                    }

                    function o() {
                        var t = u(d).scrollTop();
                        n.resetWrap(), u(d).scrollTop(t), n.options.singlePageInlineInFocus && "promise" !== e ? u("html,body").animate({
                            scrollTop: n.scrollTop
                        }, 350).promise().then(function() {
                            i()
                        }) : i()
                    }
                    "singlePageInline" === n.type ? "open" === e ? (n.wrap.removeClass("cbp-popup-singlePageInline-ready"), u(n.dataArray[n.current].element).closest(".cbp-item").removeClass("cbp-singlePageInline-active"), n.isOpen = !1, n.openSinglePageInline(t.blocks, t.currentBlock, t.fromOpen)) : (n.height = 0, n.revertResizeSinglePageInline(), n.wrap.removeClass("cbp-popup-singlePageInline-ready"), n.cubeportfolio.$obj.addClass("cbp-popup-singlePageInline-close"), n.cubeportfolio.$obj.find(".cbp-item").removeClass("cbp-singlePageInline-active"), l["private"].modernBrowser ? n.wrap.one(l["private"].transitionend, function() {
                        o()
                    }) : o()) : "singlePage" === n.type ? (n.resetWrap(), n.stopScroll = !0, n.wrap.removeClass("cbp-popup-ready cbp-popup-transitionend cbp-popup-singlePage-open cbp-popup-singlePage-sticky"), u("html").css({
                        overflow: "",
                        marginRight: "",
                        position: ""
                    }), u(d).scrollTop(n.scrollTop), "ie8" !== l["private"].browser && "ie9" !== l["private"].browser || (n.slider && l["private"].resize.destroyEvent(u.data(n.slider[0], "cubeportfolio")), n.content.html(""), n.wrap.detach(), n.isOpen = !1), n.wrap.one(l["private"].transitionend, function() {
                        n.slider && l["private"].resize.destroyEvent(u.data(n.slider[0], "cubeportfolio")), n.content.html(""), n.wrap.detach(), n.isOpen = !1
                    })) : (a = !1, n.originalStyle ? u("html").attr("style", n.originalStyle) : u("html").css({
                        overflow: "",
                        marginRight: ""
                    }), u(d).scrollTop(n.scrollTop), n.slider && l["private"].resize.destroyEvent(u.data(n.slider[0], "cubeportfolio")), n.content.html(""), n.wrap.detach(), n.isOpen = !1)
                },
                tooggleLoading: function(t) {
                    this.stopEvents = t, this.wrap[t ? "addClass" : "removeClass"]("cbp-popup-loading")
                },
                resizeImage: function() {
                    if (this.isOpen) {
                        var t = this.content.find("img"),
                            e = t.parent(),
                            n = u(d).height() - (e.outerHeight(!0) - e.height()) - this.content.find(".cbp-popup-lightbox-bottom").outerHeight(!0);
                        t.css("max-height", n + "px")
                    }
                },
                preloadNearbyImages: function() {
                    for (var t = this, e = [t.getIndex(t.current + 1), t.getIndex(t.current + 2), t.getIndex(t.current + 3), t.getIndex(t.current - 1), t.getIndex(t.current - 2), t.getIndex(t.current - 3)], n = e.length - 1; 0 <= n; n--) "isImage" === t.dataArray[e[n]].type && t.cubeportfolio.checkSrc(t.dataArray[e[n]])
                }
            };

        function n(t) {
            var e = this;
            !1 === (e.parent = t).options.lightboxShowCounter && (t.options.lightboxCounter = ""), !1 === t.options.singlePageShowCounter && (t.options.singlePageCounter = ""), t.registerEvent("initStartRead", function() {
                e.run()
            }, !0)
        }
        var a = !1,
            i = !1,
            o = !1;
        n.prototype.run = function() {
            var r = this,
                s = r.parent,
                t = u(f.body);
            s.lightbox = null, s.options.lightboxDelegate && !i && (i = !0, s.lightbox = Object.create(e), s.lightbox.init(s, "lightbox"), t.on("click.cbp", s.options.lightboxDelegate, function(t) {
                t.preventDefault();
                var e = u(this),
                    i = e.attr("data-cbp-lightbox"),
                    n = r.detectScope(e),
                    o = n.data("cubeportfolio"),
                    a = [];
                o ? o.blocksOn.each(function(t, e) {
                    var n = u(e);
                    n.not(".cbp-item-off") && n.find(s.options.lightboxDelegate).each(function(t, e) {
                        i ? u(e).attr("data-cbp-lightbox") === i && a.push(e) : a.push(e)
                    })
                }) : a = i ? n.find(s.options.lightboxDelegate + "[data-cbp-lightbox=" + i + "]") : n.find(s.options.lightboxDelegate), s.lightbox.openLightbox(a, e[0])
            })), s.singlePage = null, s.options.singlePageDelegate && !o && (o = !0, s.singlePage = Object.create(e), s.singlePage.init(s, "singlePage"), t.on("click.cbp", s.options.singlePageDelegate, function(t) {
                t.preventDefault();
                var e = u(this),
                    i = e.attr("data-cbp-singlePage"),
                    n = r.detectScope(e),
                    o = n.data("cubeportfolio"),
                    a = [];
                o ? o.blocksOn.each(function(t, e) {
                    var n = u(e);
                    n.not(".cbp-item-off") && n.find(s.options.singlePageDelegate).each(function(t, e) {
                        i ? u(e).attr("data-cbp-singlePage") === i && a.push(e) : a.push(e)
                    })
                }) : a = i ? n.find(s.options.singlePageDelegate + "[data-cbp-singlePage=" + i + "]") : n.find(s.options.singlePageDelegate), s.singlePage.openSinglePage(a, e[0])
            })), s.singlePageInline = null, s.options.singlePageInlineDelegate && (s.singlePageInline = Object.create(e), s.singlePageInline.init(s, "singlePageInline"), s.$obj.on("click.cbp", s.options.singlePageInlineDelegate, function(t) {
                t.preventDefault();
                var e = u.data(this, "cbp-locked"),
                    n = u.data(this, "cbp-locked", +new Date);
                (!e || 300 < n - e) && s.singlePageInline.openSinglePageInline(s.blocksOn, this)
            }))
        }, n.prototype.detectScope = function(t) {
            var e, n, i;
            return (e = t.closest(".cbp-popup-singlePageInline")).length ? (i = t.closest(".cbp", e[0])).length ? i : e : (n = t.closest(".cbp-popup-singlePage")).length ? (i = t.closest(".cbp", n[0])).length ? i : n : (i = t.closest(".cbp")).length ? i : u(f.body)
        }, n.prototype.destroy = function() {
            var t = this.parent;
            u(f.body).off("click.cbp"), o = i = !1, t.lightbox && t.lightbox.destroy(), t.singlePage && t.singlePage.destroy(), t.singlePageInline && t.singlePageInline.destroy()
        }, l.plugins.popUp = function(t) {
            return new n(t)
        }
    }(jQuery, window, document),
    function(s, t, e, n) {
        "use strict";
        var i = s.fn.cubeportfolio.constructor;

        function o(t) {
            var n = this;
            n.parent = t, n.searchInput = s(t.options.search), n.searchInput.each(function(t, e) {
                var n = e.getAttribute("data-search");
                n || (n = "*"), s.data(e, "searchData", {
                    value: e.value,
                    el: n
                })
            });
            var i = null;
            n.searchInput.on("keyup.cbp paste.cbp", function(t) {
                t.preventDefault();
                var e = s(this);
                clearTimeout(i), i = setTimeout(function() {
                    n.runEvent.call(n, e)
                }, 350)
            }), n.searchNothing = n.searchInput.siblings(".cbp-search-nothing").detach(), n.searchNothingHeight = null, n.searchNothingHTML = n.searchNothing.html(), n.searchInput.siblings(".cbp-search-icon").on("click.cbp", function(t) {
                t.preventDefault(), n.runEvent.call(n, s(this).prev().val(""))
            })
        }
        o.prototype.runEvent = function(t) {
            var i = this,
                o = t.val(),
                a = t.data("searchData"),
                r = new RegExp(o, "i");
            a.value === o || i.parent.isAnimating || (0 < (a.value = o).length ? t.attr("value", o) : t.removeAttr("value"), i.parent.$obj.cubeportfolio("filter", function(t) {
                var e = t.filter(function(t, e) {
                    if (-1 < s(e).find(a.el).text().search(r)) return !0
                });
                if (0 === e.length && i.searchNothing.length) {
                    var n = i.searchNothingHTML.replace("{{query}}", o);
                    i.searchNothing.html(n), i.searchNothing.appendTo(i.parent.$obj), null === i.searchNothingHeight && (i.searchNothingHeight = i.searchNothing.outerHeight(!0)), i.parent.registerEvent("resizeMainContainer", function() {
                        i.parent.height = i.parent.height + i.searchNothingHeight, i.parent.obj.style.height = i.parent.height + "px"
                    }, !0)
                } else i.searchNothing.detach();
                return i.parent.triggerEvent("resetFiltersVisual"), e
            }, function() {
                t.trigger("keyup.cbp")
            }))
        }, o.prototype.destroy = function() {
            this.searchInput.off(".cbp"), this.searchInput.next(".cbp-search-icon").off(".cbp"), this.searchInput.each(function(t, e) {
                s.removeData(e)
            })
        }, i.plugins.search = function(t) {
            return "" === t.options.search ? null : new o(t)
        }
    }(jQuery, window, document),
    function(o, t, e, n) {
        "use strict";
        var i = {
                pagination: "",
                paginationClass: "cbp-pagination-active"
            },
            a = o.fn.cubeportfolio.constructor;

        function r(t) {
            var e = this;
            e.parent = t, e.options = o.extend({}, i, e.parent.options.plugins.slider);
            var n = o(e.options.pagination);
            0 < n.length && (e.parent.customPagination = n, e.parent.customPaginationItems = n.children(), e.parent.customPaginationClass = e.options.paginationClass, e.parent.customPaginationItems.on("click.cbp", function(t) {
                t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation(), e.parent.sliderStopEvents || e.parent.jumpToSlider(o(this))
            })), e.parent.registerEvent("gridAdjust", function() {
                e.sliderMarkup.call(e.parent), e.parent.registerEvent("gridAdjust", function() {
                    e.updateSlider.call(e.parent)
                })
            }, !0)
        }
        r.prototype.sliderMarkup = function() {
            var i = this;
            i.sliderStopEvents = !1, i.sliderActive = 0, i.$obj.one("initComplete.cbp", function() {
                i.$obj.addClass("cbp-mode-slider")
            }), i.nav = o("<div/>", {
                "class": "cbp-nav"
            }), i.nav.on("click.cbp", "[data-slider-action]", function(t) {
                if (t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation(), !i.sliderStopEvents) {
                    var e = o(this),
                        n = e.attr("data-slider-action");
                    i[n + "Slider"] && i[n + "Slider"](e)
                }
            }), i.options.showNavigation && (i.controls = o("<div/>", {
                "class": "cbp-nav-controls"
            }), i.navPrev = o("<div/>", {
                "class": "cbp-nav-prev",
                "data-slider-action": "prev"
            }).appendTo(i.controls), i.navNext = o("<div/>", {
                "class": "cbp-nav-next",
                "data-slider-action": "next"
            }).appendTo(i.controls), i.controls.appendTo(i.nav)), i.options.showPagination && (i.navPagination = o("<div/>", {
                "class": "cbp-nav-pagination"
            }).appendTo(i.nav)), (i.controls || i.navPagination) && i.nav.appendTo(i.$obj), i.updateSliderPagination(), i.options.auto && (i.options.autoPauseOnHover && (i.mouseIsEntered = !1, i.$obj.on("mouseenter.cbp", function(t) {
                i.mouseIsEntered = !0, i.stopSliderAuto()
            }).on("mouseleave.cbp", function(t) {
                i.mouseIsEntered = !1, i.startSliderAuto()
            })), i.startSliderAuto()), i.options.drag && a["private"].modernBrowser && i.dragSlider()
        }, r.prototype.updateSlider = function() {
            this.updateSliderPosition(), this.updateSliderPagination()
        }, r.prototype.destroy = function() {
            var t = this;
            t.parent.customPaginationItems && t.parent.customPaginationItems.off(".cbp"), (t.parent.controls || t.parent.navPagination) && (t.parent.nav.off(".cbp"), t.parent.nav.remove())
        }, a.plugins.slider = function(t) {
            return "slider" !== t.options.layoutMode ? null : new r(t)
        }
    }(jQuery, window, document),
    function(u, t, e, n) {
        "use strict";
        var i = {
                element: ""
            },
            o = u.fn.cubeportfolio.constructor;

        function a(e) {
            var n = this;
            n.parent = e, n.options = u.extend({}, i, n.parent.options.plugins.sort), n.element = u(n.options.element), 0 !== n.element.length && (n.sort = "", n.sortBy = "string:asc", n.element.on("click.cbp", ".cbp-sort-item", function(t) {
                t.preventDefault(), n.target = t.target, u(n.target).hasClass("cbp-l-dropdown-item--active") || e.isAnimating || (n.processSort(), e.$obj.cubeportfolio("filter", e.defaultFilter))
            }), e.registerEvent("triggerSort", function() {
                n.target && (n.processSort(), e.$obj.cubeportfolio("filter", e.defaultFilter))
            }), n.dropdownWrap = n.element.find(".cbp-l-dropdown-wrap").on({
                "mouseover.cbp": function() {
                    u(this).addClass("cbp-l-dropdown-wrap--open")
                },
                "mouseleave.cbp": function() {
                    u(this).removeClass("cbp-l-dropdown-wrap--open")
                }
            }), n.dropdownHeader = n.element.find(".cbp-l-dropdown-header"))
        }
        a.prototype.processSort = function() {
            var o = this,
                t = o.parent,
                e = (p = o.target).hasAttribute("data-sort"),
                n = p.hasAttribute("data-sortBy");
            if (e && n) o.sort = p.getAttribute("data-sort"), o.sortBy = p.getAttribute("data-sortBy");
            else if (e) o.sort = p.getAttribute("data-sort");
            else {
                if (!n) return;
                o.sortBy = p.getAttribute("data-sortBy")
            }
            var i = o.sortBy.split(":"),
                a = "string",
                r = 1;
            if ("int" === i[0] ? a = "int" : "float" === i[0] && (a = "float"), "desc" === i[1] && (r = -1), o.sort) {
                var s = [];
                t.blocks.each(function(t, e) {
                    var n = u(e),
                        i = n.find(o.sort).text();
                    "int" === a && (i = parseInt(i, 10)), "float" === a && (i = parseFloat(i, 10)), s.push({
                        sortText: i,
                        data: n.data("cbp")
                    })
                }), s.sort(function(t, e) {
                    var n = t.sortText,
                        i = e.sortText;
                    return "string" === a && (n = n.toUpperCase(), i = i.toUpperCase()), n < i ? -r : i < n ? r : 0
                }), u.each(s, function(t, e) {
                    e.data.index = t
                })
            } else {
                var l = []; - 1 === r && (t.blocks.each(function(t, e) {
                    l.push(u(e).data("cbp").indexInitial)
                }), l.sort(function(t, e) {
                    return e - t
                })), t.blocks.each(function(t, e) {
                    var n = u(e).data("cbp");
                    n.index = -1 === r ? l[n.indexInitial] : n.indexInitial
                })
            }
            t.sortBlocks(t.blocks, "index"), o.dropdownWrap.trigger("mouseleave.cbp");
            var p = u(o.target),
                c = u(o.target).parent();
            if (c.hasClass("cbp-l-dropdown-list")) o.dropdownHeader.html(p.html()), p.addClass("cbp-l-dropdown-item--active").siblings(".cbp-l-dropdown-item").removeClass("cbp-l-dropdown-item--active");
            else if (c.hasClass("cbp-l-direction")) {
                0 === p.index() ? c.addClass("cbp-l-direction--second").removeClass("cbp-l-direction--first") : c.addClass("cbp-l-direction--first").removeClass("cbp-l-direction--second")
            }
        }, a.prototype.destroy = function() {
            this.element.off("click.cbp")
        }, o.plugins.sort = function(t) {
            return new a(t)
        }
    }(jQuery, window, document);
/*-----------------------------------------------------------------------------------*/
/*	06. FLICKITY
/*-----------------------------------------------------------------------------------*/
/*!
 * Flickity PACKAGED v2.1.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */
! function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, o, a) {
        function l(t, e, n) {
            var s, o = "$()." + i + '("' + e + '")';
            return t.each(function(t, l) {
                var h = a.data(l, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + o);
                var c = h[e];
                if (!c || "_" == e.charAt(0)) return void r(o + " is not a valid method");
                var d = c.apply(h, n);
                s = void 0 === s ? d : s
            }), void 0 !== s ? s : t
        }

        function h(t, e) {
            t.each(function(t, n) {
                var s = a.data(n, i);
                s ? (s.option(e), s._init()) : (s = new o(n, e), a.data(n, i, s))
            })
        }
        a = a || e || t.jQuery, a && (o.prototype.option || (o.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = s.call(arguments, 1);
                return l(this, t, e)
            }
            return h(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var s = Array.prototype.slice,
        o = t.console,
        r = "undefined" == typeof o ? function() {} : function(t) {
            o.error(t)
        };
    return n(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return n.indexOf(e) == -1 && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return n != -1 && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
                var o = i[s],
                    r = n && n[o];
                r && (this.off(t, o), delete n[o]), o.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < h; e++) {
            var i = l[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function s() {
        if (!c) {
            c = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var s = n(e);
            o.isBoxSizeOuter = r = 200 == t(s.width), i.removeChild(e)
        }
    }

    function o(e) {
        if (s(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var o = n(e);
            if ("none" == o.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var c = a.isBorderBox = "border-box" == o.boxSizing, d = 0; d < h; d++) {
                var u = l[d],
                    f = o[u],
                    p = parseFloat(f);
                a[u] = isNaN(p) ? 0 : p
            }
            var g = a.paddingLeft + a.paddingRight,
                v = a.paddingTop + a.paddingBottom,
                m = a.marginLeft + a.marginRight,
                y = a.marginTop + a.marginBottom,
                b = a.borderLeftWidth + a.borderRightWidth,
                E = a.borderTopWidth + a.borderBottomWidth,
                S = c && r,
                C = t(o.width);
            C !== !1 && (a.width = C + (S ? 0 : g + b));
            var x = t(o.height);
            return x !== !1 && (a.height = x + (S ? 0 : v + E)), a.innerWidth = a.width - (g + b), a.innerHeight = a.height - (v + E), a.outerWidth = a.width + m, a.outerHeight = a.height + y, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = l.length,
        c = !1;
    return o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i],
                s = n + "MatchesSelector";
            if (t[s]) return s
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    };
    var n = Array.prototype.slice;
    i.makeArray = function(t) {
        if (Array.isArray(t)) return t;
        if (null === t || void 0 === t) return [];
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? n.call(t) : [t]
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var s = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n) return void s.push(t);
                e(t, n) && s.push(t);
                for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++) s.push(i[o])
            }
        }), s
    }, i.debounceMethod = function(t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
            s = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[s];
            clearTimeout(t);
            var e = arguments,
                o = this;
            this[s] = setTimeout(function() {
                n.apply(o, e), delete o[s]
            }, i)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var s = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var o = i.toDashed(n),
                r = "data-" + o,
                a = document.querySelectorAll("[" + r + "]"),
                l = document.querySelectorAll(".js-" + o),
                h = i.makeArray(a).concat(i.makeArray(l)),
                c = r + "-options",
                d = t.jQuery;
            h.forEach(function(t) {
                var i, o = t.getAttribute(r) || t.getAttribute(c);
                try {
                    i = o && JSON.parse(o)
                } catch (a) {
                    return void(s && s.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var l = new e(t, i);
                d && d.data(t, n, l)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {}, t.Flickity.Cell = e(t, t.getSize))
}(window, function(t, e) {
    function i(t, e) {
        this.element = t, this.parent = e, this.create()
    }
    var n = i.prototype;
    return n.create = function() {
        this.element.style.position = "absolute", this.element.setAttribute("aria-selected", "false"), this.x = 0, this.shift = 0
    }, n.destroy = function() {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.removeAttribute("aria-selected"), this.element.style[t] = ""
    }, n.getSize = function() {
        this.size = e(this.element)
    }, n.setPosition = function(t) {
        this.x = t, this.updateTarget(), this.renderPosition(t)
    }, n.updateTarget = n.setDefaultTarget = function() {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }, n.renderPosition = function(t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }, n.wrapShift = function(t) {
        this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
    }, n.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e())
}(window, function() {
    "use strict";

    function t(t) {
        this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
    }
    var e = t.prototype;
    return e.addCell = function(t) {
        if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }, e.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft",
            e = this.getLastCell(),
            i = e ? e.size[t] : 0,
            n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }, e.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, e.select = function() {
        this.changeSelected(!0)
    }, e.unselect = function() {
        this.changeSelected(!1)
    }, e.changeSelected = function(t) {
        var e = t ? "add" : "remove";
        this.cells.forEach(function(i) {
            i.element.classList[e]("is-selected"), i.element.setAttribute("aria-selected", t.toString())
        })
    }, e.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }, t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
}(window, function(t, e) {
    var i = {};
    return i.startAnimation = function() {
        this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
    }, i.animate = function() {
        this.applyDragForce(), this.applySelectedAttraction();
        var t = this.x;
        if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
            var e = this;
            requestAnimationFrame(function() {
                e.animate()
            })
        }
    }, i.positionSlider = function() {
        var t = this.x;
        this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), t += this.cursorPosition, t = this.options.rightToLeft ? -t : t;
        var i = this.getPositionValue(t);
        this.slider.style.transform = this.isAnimating ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
        var n = this.slides[0];
        if (n) {
            var s = -this.x - n.target,
                o = s / this.slidesWidth;
            this.dispatchEvent("scroll", null, [o, s])
        }
    }, i.positionSliderAtSelected = function() {
        this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider())
    }, i.getPositionValue = function(t) {
        return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
    }, i.settle = function(t) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]))
    }, i.shiftWrapCells = function(t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1)
    }, i._shiftCells = function(t, e, i) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n],
                o = e > 0 ? i : 0;
            s.wrapShift(o), e -= s.size.outerWidth
        }
    }, i._unshiftCells = function(t) {
        if (t && t.length)
            for (var e = 0; e < t.length; e++) t[e].wrapShift(0)
    }, i.integratePhysics = function() {
        this.x += this.velocity, this.velocity *= this.getFrictionFactor()
    }, i.applyForce = function(t) {
        this.velocity += t
    }, i.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }, i.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }, i.applyDragForce = function() {
        if (this.isDraggable && this.isPointerDown) {
            var t = this.dragX - this.x,
                e = t - this.velocity;
            this.applyForce(e)
        }
    }, i.applySelectedAttraction = function() {
        var t = this.isDraggable && this.isPointerDown;
        if (!t && !this.isFreeScrolling && this.slides.length) {
            var e = this.selectedSlide.target * -1 - this.x,
                i = e * this.options.selectedAttraction;
            this.applyForce(i)
        }
    }, i
}),
function(t, e) {
    if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(i, n, s, o, r, a) {
        return e(t, i, n, s, o, r, a)
    });
    else if ("object" == typeof module && module.exports) module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var i = t.Flickity;
        t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
    }
}(window, function(t, e, i, n, s, o, r) {
    function a(t, e) {
        for (t = n.makeArray(t); t.length;) e.appendChild(t.shift())
    }

    function l(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(d && d.error("Bad element for Flickity: " + (i || t)));
        if (this.element = i, this.element.flickityGUID) {
            var s = f[this.element.flickityGUID];
            return s.option(e), s
        }
        h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e), this._create()
    }
    var h = t.jQuery,
        c = t.getComputedStyle,
        d = t.console,
        u = 0,
        f = {};
    l.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    }, l.createMethods = [];
    var p = l.prototype;
    n.extend(p, e.prototype), p._create = function() {
        var e = this.guid = ++u;
        this.element.flickityGUID = e, f[e] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this);
        for (var i in this.options.on) {
            var n = this.options.on[i];
            this.on(i, n)
        }
        l.createMethods.forEach(function(t) {
            this[t]()
        }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
    }, p.option = function(t) {
        n.extend(this.options, t)
    }, p.activate = function() {
        if (!this.isActive) {
            this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
            var t = this._filterFindCellElements(this.element.children);
            a(t, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
            var e, i = this.options.initialIndex;
            e = this.isInitActivated ? this.selectedIndex : void 0 !== i && this.cells[i] ? i : 0, this.select(e, !1, !0), this.isInitActivated = !0, this.dispatchEvent("ready")
        }
    }, p._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
    }, p._filterFindCellElements = function(t) {
        return n.filterFindElements(t, this.options.cellSelector)
    }, p.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
    }, p._makeCells = function(t) {
        var e = this._filterFindCellElements(t),
            i = e.map(function(t) {
                return new s(t, this)
            }, this);
        return i
    }, p.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, p.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }, p.positionCells = function() {
        this._sizeCells(this.cells), this._positionCells(0)
    }, p._positionCells = function(t) {
        t = t || 0, this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
        var e = 0;
        if (t > 0) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, s = t; s < n; s++) {
            var o = this.cells[s];
            o.setPosition(e), e += o.size.outerWidth, this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }, p._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    }, p.updateSlides = function() {
        if (this.slides = [], this.cells.length) {
            var t = new o(this);
            this.slides.push(t);
            var e = "left" == this.originSide,
                i = e ? "marginRight" : "marginLeft",
                n = this._getCanCellFit();
            this.cells.forEach(function(e, s) {
                if (!t.cells.length) return void t.addCell(e);
                var r = t.outerWidth - t.firstMargin + (e.size.outerWidth - e.size[i]);
                n.call(this, s, r) ? t.addCell(e) : (t.updateTarget(), t = new o(this), this.slides.push(t), t.addCell(e))
            }, this), t.updateTarget(), this.updateSelectedSlide()
        }
    }, p._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t) return function() {
            return !1
        };
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e !== 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/),
            n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    }, p._init = p.reposition = function() {
        this.positionCells(), this.positionSliderAtSelected()
    }, p.getSize = function() {
        this.size = i(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var g = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return p.setCellAlign = function() {
        var t = g[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }, p.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }, p._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition,
                e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }, p._getGapCells = function(t, e, i) {
        for (var n = []; t > 0;) {
            var s = this.cells[e];
            if (!s) break;
            n.push(s), e += i, t -= s.size.outerWidth
        }
        return n
    }, p._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft,
                e = t ? "marginRight" : "marginLeft",
                i = t ? "marginLeft" : "marginRight",
                n = this.slideableWidth - this.getLastCell().size[i],
                s = n < this.size.innerWidth,
                o = this.cursorPosition + this.cells[0].size[e],
                r = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(t) {
                s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o), t.target = Math.min(t.target, r))
            }, this)
        }
    }, p.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), h && this.$element) {
            t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            var s = t;
            if (e) {
                var o = h.Event(e);
                o.type = t, s = o
            }
            this.$element.trigger(s, i)
        }
    }, p.select = function(t, e, i) {
        if (this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)), this.slides[t])) {
            var s = this.selectedIndex;
            this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [t]), t != s && this.dispatchEvent("change", null, [t]), this.dispatchEvent("cellSelect")
        }
    }, p._wrapSelect = function(t) {
        var e = this.slides.length,
            i = this.options.wrapAround && e > 1;
        if (!i) return t;
        var s = n.modulo(t, e),
            o = Math.abs(s - this.selectedIndex),
            r = Math.abs(s + e - this.selectedIndex),
            a = Math.abs(s - e - this.selectedIndex);
        !this.isDragSelect && r < o ? t += e : !this.isDragSelect && a < o && (t -= e), t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth)
    }, p.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }, p.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }, p.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(), this.selectedSlide = t, t.select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0])
    }, p.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }, p.selectCell = function(t, e, i) {
        var n = this.queryCell(t);
        if (n) {
            var s = this.getCellSlideIndex(n);
            this.select(s, e, i)
        }
    }, p.getCellSlideIndex = function(t) {
        for (var e = 0; e < this.slides.length; e++) {
            var i = this.slides[e],
                n = i.cells.indexOf(t);
            if (n != -1) return e
        }
    }, p.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t) return i
        }
    }, p.getCells = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getCell(t);
            i && e.push(i)
        }, this), e
    }, p.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }, p.getParentCell = function(t) {
        var e = this.getCell(t);
        return e ? e : (t = n.getParent(t, ".flickity-slider > *"), this.getCell(t))
    }, p.getAdjacentCellElements = function(t, e) {
        if (!t) return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (1 + 2 * t >= i) return this.getCellElements();
        for (var s = [], o = e - t; o <= e + t; o++) {
            var r = this.options.wrapAround ? n.modulo(o, i) : o,
                a = this.slides[r];
            a && (s = s.concat(a.getCellElements()))
        }
        return s
    }, p.queryCell = function(t) {
        return "number" == typeof t ? this.cells[t] : ("string" == typeof t && (t = this.element.querySelector(t)), this.getCell(t))
    }, p.uiChange = function() {
        this.emitEvent("uiChange")
    }, p.childUIPointerDown = function(t) {
        this.emitEvent("childUIPointerDown", [t])
    }, p.onresize = function() {
        this.watchCSS(), this.resize()
    }, n.debounceMethod(l, "onresize", 150), p.resize = function() {
        if (this.isActive) {
            this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }, p.watchCSS = function() {
        var t = this.options.watchCSS;
        if (t) {
            var e = c(this.element, ":after").content;
            e.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
        }
    }, p.onkeydown = function(t) {
        var e = document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !e) {
            var i = l.keyboardHandlers[t.keyCode];
            i && i.call(this)
        }
    }, l.keyboardHandlers = {
        37: function() {
            var t = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(), this[t]()
        },
        39: function() {
            var t = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(), this[t]()
        }
    }, p.focus = function() {
        var e = t.pageYOffset;
        this.element.focus(), t.pageYOffset != e && t.scrollTo(t.pageXOffset, e)
    }, p.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function(t) {
            t.destroy()
        }), this.element.removeChild(this.viewport), a(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
    }, p.destroy = function() {
        this.deactivate(), t.removeEventListener("resize", this), this.emitEvent("destroy"), h && this.$element && h.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete f[this.guid]
    }, n.extend(p, r), l.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.flickityGUID;
        return e && f[e]
    }, n.htmlInit(l, "flickity"), h && h.bridget && h.bridget("flickity", l), l.setJQuery = function(t) {
        h = t
    }, l.Cell = s, l
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
}(window, function(t, e) {
    function i() {}

    function n() {}
    var s = n.prototype = Object.create(e.prototype);
    s.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }, s.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }, s._bindStartEvent = function(e, i) {
        i = void 0 === i || i;
        var n = i ? "addEventListener" : "removeEventListener",
            s = "mousedown";
        t.PointerEvent ? s = "pointerdown" : "ontouchstart" in t && (s = "touchstart"), e[n](s, this)
    }, s.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, s.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier) return i
        }
    }, s.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }, s.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }, s.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }, s._pointerDown = function(t, e) {
        t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e))
    }, s.pointerDown = function(t, e) {
        this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    };
    var o = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return s._bindPostStartEvents = function(e) {
        if (e) {
            var i = o[e.type];
            i.forEach(function(e) {
                t.addEventListener(e, this)
            }, this), this._boundPointerEvents = i
        }
    }, s._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(e) {
            t.removeEventListener(e, this)
        }, this), delete this._boundPointerEvents)
    }, s.onmousemove = function(t) {
        this._pointerMove(t, t)
    }, s.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }, s.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }, s._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }, s.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }, s.onmouseup = function(t) {
        this._pointerUp(t, t)
    }, s.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }, s.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }, s._pointerUp = function(t, e) {
        this._pointerDone(), this.pointerUp(t, e)
    }, s.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }, s._pointerDone = function() {
        this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone()
    }, s._pointerReset = function() {
        this.isPointerDown = !1, delete this.pointerIdentifier
    }, s.pointerDone = i, s.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }, s.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }, s._pointerCancel = function(t, e) {
        this._pointerDone(), this.pointerCancel(t, e)
    }, s.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }, n.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }, n
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
}(window, function(t, e) {
    function i() {}
    var n = i.prototype = Object.create(e.prototype);
    n.bindHandles = function() {
        this._bindHandles(!0)
    }, n.unbindHandles = function() {
        this._bindHandles(!1)
    }, n._bindHandles = function(e) {
        e = void 0 === e || e;
        for (var i = e ? "addEventListener" : "removeEventListener", n = e ? this._touchActionValue : "", s = 0; s < this.handles.length; s++) {
            var o = this.handles[s];
            this._bindStartEvent(o, e), o[i]("click", this), t.PointerEvent && (o.style.touchAction = n)
        }
    }, n._touchActionValue = "none", n.pointerDown = function(t, e) {
        var i = this.okayPointerDown(t);
        i && (this.pointerDownPointer = e, t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]))
    };
    var s = {
            TEXTAREA: !0,
            INPUT: !0,
            SELECT: !0,
            OPTION: !0
        },
        o = {
            radio: !0,
            checkbox: !0,
            button: !0,
            submit: !0,
            image: !0,
            file: !0
        };
    return n.okayPointerDown = function(t) {
        var e = s[t.target.nodeName],
            i = o[t.target.type],
            n = !e || i;
        return n || this._pointerReset(), n
    }, n.pointerDownBlur = function() {
        var t = document.activeElement,
            e = t && t.blur && t != document.body;
        e && t.blur()
    }, n.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i)
    }, n._dragPointerMove = function(t, e) {
        var i = {
            x: e.pageX - this.pointerDownPointer.pageX,
            y: e.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i
    }, n.hasDragStarted = function(t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
    }, n.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e)
    }, n._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }, n._dragStart = function(t, e) {
        this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(t, e)
    }, n.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }, n._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }, n.dragMove = function(t, e, i) {
        t.preventDefault(), this.emitEvent("dragMove", [t, e, i])
    }, n._dragEnd = function(t, e) {
        this.isDragging = !1, setTimeout(function() {
            delete this.isPreventingClicks
        }.bind(this)), this.dragEnd(t, e)
    }, n.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }, n.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }, n._staticClick = function(t, e) {
        this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
            delete this.isIgnoringMouseUp
        }.bind(this), 400)))
    }, n.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }, i.getPointerPoint = e.getPointerPoint, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function s() {
        return {
            x: t.pageXOffset,
            y: t.pageYOffset
        }
    }
    n.extend(e.defaults, {
        draggable: ">1",
        dragThreshold: 3
    }), e.createMethods.push("_createDrag");
    var o = e.prototype;
    n.extend(o, i.prototype), o._touchActionValue = "pan-y";
    var r = "createTouch" in document,
        a = !1;
    o._createDrag = function() {
        this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.unbindDrag), this.on("cellChange", this.updateDraggable), r && !a && (t.addEventListener("touchmove", function() {}), a = !0)
    }, o.onActivateDrag = function() {
        this.handles = [this.viewport], this.bindHandles(), this.updateDraggable()
    }, o.onDeactivateDrag = function() {
        this.unbindHandles(), this.element.classList.remove("is-draggable")
    }, o.updateDraggable = function() {
        ">1" == this.options.draggable ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
    }, o.bindDrag = function() {
        this.options.draggable = !0, this.updateDraggable()
    }, o.unbindDrag = function() {
        this.options.draggable = !1, this.updateDraggable()
    }, o._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }, o._childUIPointerDownDrag = function(t) {
        t.preventDefault(), this.pointerDownFocus(t)
    }, o.pointerDown = function(e, i) {
        if (!this.isDraggable) return void this._pointerDownDefault(e, i);
        var n = this.okayPointerDown(e);
        n && (this._pointerDownPreventDefault(e), this.pointerDownFocus(e), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = s(), t.addEventListener("scroll", this), this._pointerDownDefault(e, i))
    }, o._pointerDownDefault = function(t, e) {
        this.pointerDownPointer = e, this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e])
    };
    var l = {
        INPUT: !0,
        TEXTAREA: !0,
        SELECT: !0
    };
    return o.pointerDownFocus = function(t) {
        var e = l[t.target.nodeName];
        e || this.focus()
    }, o._pointerDownPreventDefault = function(t) {
        var e = "touchstart" == t.type,
            i = "touch" == t.pointerType,
            n = l[t.target.nodeName];
        e || i || n || t.preventDefault()
    }, o.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }, o.pointerUp = function(t, e) {
        delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e)
    }, o.pointerDone = function() {
        t.removeEventListener("scroll", this), delete this.pointerDownScroll
    }, o.dragStart = function(e, i) {
        this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), t.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [i]))
    }, o.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i)
    }, o.dragMove = function(t, e, i) {
        if (this.isDraggable) {
            t.preventDefault(), this.previousDragX = this.dragX;
            var n = this.options.rightToLeft ? -1 : 1;
            this.options.wrapAround && (i.x = i.x % this.slideableWidth);
            var s = this.dragStartPosition + i.x * n;
            if (!this.options.wrapAround && this.slides.length) {
                var o = Math.max(-this.slides[0].target, this.dragStartPosition);
                s = s > o ? .5 * (s + o) : s;
                var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                s = s < r ? .5 * (s + r) : s
            }
            this.dragX = s, this.dragMoveTime = new Date,
                this.dispatchEvent("dragMove", t, [e, i])
        }
    }, o.dragEnd = function(t, e) {
        if (this.isDraggable) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
            } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e])
        }
    }, o.dragEndRestingSelect = function() {
        var t = this.getRestingPosition(),
            e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
            i = this._getClosestResting(t, e, 1),
            n = this._getClosestResting(t, e, -1),
            s = i.distance < n.distance ? i.index : n.index;
        return s
    }, o._getClosestResting = function(t, e, i) {
        for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function(t, e) {
                return t <= e
            } : function(t, e) {
                return t < e
            }; o(e, s) && (n += i, s = e, e = this.getSlideDistance(-t, n), null !== e);) e = Math.abs(e);
        return {
            distance: s,
            index: n - i
        }
    }, o.getSlideDistance = function(t, e) {
        var i = this.slides.length,
            s = this.options.wrapAround && i > 1,
            o = s ? n.modulo(e, i) : e,
            r = this.slides[o];
        if (!r) return null;
        var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (r.target + a)
    }, o.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
            e = this.previousDragX - this.dragX;
        return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0
    }, o.staticClick = function(t, e) {
        var i = this.getParentCell(t.target),
            n = i && i.element,
            s = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, s])
    }, o.onscroll = function() {
        var t = s(),
            e = this.pointerDownScroll.x - t.x,
            i = this.pointerDownScroll.y - t.y;
        (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.TapListener = e(t, t.Unipointer)
}(window, function(t, e) {
    function i(t) {
        this.bindTap(t)
    }
    var n = i.prototype = Object.create(e.prototype);
    return n.bindTap = function(t) {
        t && (this.unbindTap(), this.tapElement = t, this._bindStartEvent(t, !0))
    }, n.unbindTap = function() {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
    }, n.pointerUp = function(i, n) {
        if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
            var s = e.getPointerPoint(n),
                o = this.tapElement.getBoundingClientRect(),
                r = t.pageXOffset,
                a = t.pageYOffset,
                l = s.x >= o.left + r && s.x <= o.right + r && s.y >= o.top + a && s.y <= o.bottom + a;
            if (l && this.emitEvent("tap", [i, n]), "mouseup" != i.type) {
                this.isIgnoringMouseUp = !0;
                var h = this;
                setTimeout(function() {
                    delete h.isIgnoringMouseUp
                }, 400)
            }
        }
    }, n.destroy = function() {
        this.pointerDone(), this.unbindTap()
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    "use strict";

    function s(t, e) {
        this.direction = t, this.parent = e, this._create()
    }

    function o(t) {
        return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
    }
    var r = "http://www.w3.org/2000/svg";
    s.prototype = Object.create(i.prototype), s.prototype._create = function() {
        this.isEnabled = !0, this.isPrevious = this.direction == -1;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-button flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        e.appendChild(i), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, s.prototype.activate = function() {
        this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
    }, s.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element), i.prototype.destroy.call(this), this.element.removeEventListener("click", this)
    }, s.prototype.createSVG = function() {
        var t = document.createElementNS(r, "svg");
        t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(r, "path"),
            i = o(this.parent.options.arrowShape);
        return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t
    }, s.prototype.onTap = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }, s.prototype.handleEvent = n.handleEvent, s.prototype.onclick = function(t) {
        var e = document.activeElement;
        e && e == this.element && this.onTap(t, t)
    }, s.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
    }, s.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
    }, s.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && t.length > 1) return void this.enable();
        var e = t.length ? t.length - 1 : 0,
            i = this.isPrevious ? 0 : e,
            n = this.parent.selectedIndex == i ? "disable" : "enable";
        this[n]()
    }, s.prototype.destroy = function() {
        this.deactivate()
    }, n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }), e.createMethods.push("_createPrevNextButtons");
    var a = e.prototype;
    return a._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new s((-1), this), this.nextButton = new s(1, this), this.on("activate", this.activatePrevNextButtons))
    }, a.activatePrevNextButtons = function() {
        this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
    }, a.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
    }, e.PrevNextButton = s, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function s(t) {
        this.parent = t, this._create()
    }
    s.prototype = new i, s.prototype._create = function() {
        this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, s.prototype.activate = function() {
        this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
    }, s.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder), i.prototype.destroy.call(this)
    }, s.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }, s.prototype.addDots = function(t) {
        for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
            var r = document.createElement("li");
            r.className = "dot", r.setAttribute("aria-label", "Page dot " + (o + 1)), e.appendChild(r), i.push(r)
        }
        this.holder.appendChild(e), this.dots = this.dots.concat(i)
    }, s.prototype.removeDots = function(t) {
        var e = this.dots.splice(this.dots.length - t, t);
        e.forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    }, s.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"))
    }, s.prototype.onTap = function(t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }, s.prototype.destroy = function() {
        this.deactivate()
    }, e.PageDots = s, n.extend(e.defaults, {
        pageDots: !0
    }), e.createMethods.push("_createPageDots");
    var o = e.prototype;
    return o._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new s(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
    }, o.activatePageDots = function() {
        this.pageDots.activate()
    }, o.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }, o.updatePageDots = function() {
        this.pageDots.setDots()
    }, o.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }, e.PageDots = s, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function(t, e, i) {
    function n(t) {
        this.parent = t, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this)
    }
    n.prototype = Object.create(t.prototype), n.prototype.play = function() {
        if ("playing" != this.state) {
            var t = document.hidden;
            if (t) return void document.addEventListener("visibilitychange", this.onVisibilityPlay);
            this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()
        }
    }, n.prototype.tick = function() {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(), this.timeout = setTimeout(function() {
                e.parent.next(!0), e.tick()
            }, t)
        }
    }, n.prototype.stop = function() {
        this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange)
    }, n.prototype.clear = function() {
        clearTimeout(this.timeout)
    }, n.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused", this.clear())
    }, n.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }, n.prototype.visibilityChange = function() {
        var t = document.hidden;
        this[t ? "pause" : "unpause"]()
    }, n.prototype.visibilityPlay = function() {
        this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay)
    }, e.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }), i.createMethods.push("_createPlayer");
    var s = i.prototype;
    return s._createPlayer = function() {
        this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
    }, s.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
    }, s.playPlayer = function() {
        this.player.play()
    }, s.stopPlayer = function() {
        this.player.stop()
    }, s.pausePlayer = function() {
        this.player.pause()
    }, s.unpausePlayer = function() {
        this.player.unpause()
    }, s.deactivatePlayer = function() {
        this.player.stop(), this.element.removeEventListener("mouseenter", this)
    }, s.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
    }, s.onmouseleave = function() {
        this.player.unpause(), this.element.removeEventListener("mouseleave", this)
    }, i.Player = n, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    function n(t) {
        var e = document.createDocumentFragment();
        return t.forEach(function(t) {
            e.appendChild(t.element)
        }), e
    }
    var s = e.prototype;
    return s.insert = function(t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var s = this.cells.length;
            e = void 0 === e ? s : e;
            var o = n(i),
                r = e == s;
            if (r) this.slider.appendChild(o);
            else {
                var a = this.cells[e].element;
                this.slider.insertBefore(o, a)
            }
            if (0 === e) this.cells = i.concat(this.cells);
            else if (r) this.cells = this.cells.concat(i);
            else {
                var l = this.cells.splice(e, s - e);
                this.cells = this.cells.concat(i).concat(l)
            }
            this._sizeCells(i), this.cellChange(e, !0)
        }
    }, s.append = function(t) {
        this.insert(t, this.cells.length)
    }, s.prepend = function(t) {
        this.insert(t, 0)
    }, s.remove = function(t) {
        var e = this.getCells(t);
        if (e && e.length) {
            var n = this.cells.length - 1;
            e.forEach(function(t) {
                t.remove();
                var e = this.cells.indexOf(t);
                n = Math.min(e, n), i.removeFrom(this.cells, t)
            }, this), this.cellChange(n, !0)
        }
    }, s.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }, s.cellChange = function(t, e) {
        var i = this.selectedElement;
        this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [t]), this.select(this.selectedIndex), e && this.positionSliderAtSelected()
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    "use strict";

    function n(t) {
        if ("IMG" == t.nodeName) {
            var e = t.getAttribute("data-flickity-lazyload"),
                n = t.getAttribute("data-flickity-lazyload-src"),
                s = t.getAttribute("data-flickity-lazyload-srcset");
            if (e || n || s) return [t]
        }
        var o = "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]",
            r = t.querySelectorAll(o);
        return i.makeArray(r)
    }

    function s(t, e) {
        this.img = t, this.flickity = e, this.load()
    }
    e.createMethods.push("_createLazyload");
    var o = e.prototype;
    return o._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }, o.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0,
                i = this.getAdjacentCellElements(e),
                o = [];
            i.forEach(function(t) {
                var e = n(t);
                o = o.concat(e)
            }), o.forEach(function(t) {
                new s(t, this)
            }, this)
        }
    }, s.prototype.handleEvent = i.handleEvent, s.prototype.load = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this);
        var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
            e = this.img.getAttribute("data-flickity-lazyload-srcset");
        this.img.src = t, e && this.img.setAttribute("srcset", e), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset")
    }, s.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    }, s.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    }, s.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img),
            n = i && i.element;
        this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n)
    }, e.LazyLoader = s, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(t) {
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function(t, e) {
    function i(t, e, i) {
        return (e - t) * i + t
    }
    t.createMethods.push("_createAsNavFor");
    var n = t.prototype;
    return n._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function() {
                e.setNavCompanion(t)
            })
        }
    }, n.setNavCompanion = function(i) {
        i = e.getQueryElement(i);
        var n = t.data(i);
        if (n && n != this) {
            this.navCompanion = n;
            var s = this;
            this.onNavCompanionSelect = function() {
                s.navCompanionSelect()
            }, n.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
        }
    }, n.navCompanionSelect = function(t) {
        if (this.navCompanion) {
            var e = this.navCompanion.selectedCells[0],
                n = this.navCompanion.cells.indexOf(e),
                s = n + this.navCompanion.selectedCells.length - 1,
                o = Math.floor(i(n, s, this.navCompanion.cellAlign));
            if (this.selectCell(o, !1, t), this.removeNavSelectedElements(), !(o >= this.cells.length)) {
                var r = this.cells.slice(n, s + 1);
                this.navSelectedElements = r.map(function(t) {
                    return t.element
                }), this.changeNavSelectedClass("add")
            }
        }
    }, n.changeNavSelectedClass = function(t) {
        this.navSelectedElements.forEach(function(e) {
            e.classList[t]("is-nav-selected")
        })
    }, n.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }, n.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
    }, n.onNavStaticClick = function(t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n)
    }, n.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }, n.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function n(t) {
        if (Array.isArray(t)) return t;
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? h.call(t) : [t]
    }

    function s(t, e, o) {
        if (!(this instanceof s)) return new s(t, e, o);
        var r = t;
        return "string" == typeof t && (r = document.querySelectorAll(t)), r ? (this.elements = n(r), this.options = i({}, this.options), "function" == typeof e ? o = e : i(this.options, e), o && this.on("always", o), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(this.check.bind(this))) : void l.error("Bad element for imagesLoaded " + (r || t))
    }

    function o(t) {
        this.img = t
    }

    function r(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var a = t.jQuery,
        l = t.console,
        h = Array.prototype.slice;
    s.prototype = Object.create(e.prototype), s.prototype.options = {}, s.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, s.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && c[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var s = i[n];
                this.addImage(s)
            }
            if ("string" == typeof this.options.background) {
                var o = t.querySelectorAll(this.options.background);
                for (n = 0; n < o.length; n++) {
                    var r = o[n];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    };
    var c = {
        1: !0,
        9: !0,
        11: !0
    };
    return s.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var s = n && n[2];
                s && this.addBackground(s, t), n = i.exec(e.backgroundImage)
            }
    }, s.prototype.addImage = function(t) {
        var e = new o(t);
        this.images.push(e)
    }, s.prototype.addBackground = function(t, e) {
        var i = new r(t, e);
        this.images.push(i)
    }, s.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, s.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, t, e)
    }, s.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, o.prototype = Object.create(e.prototype), o.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, o.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, o.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, o.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, o.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, o.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, o.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype = Object.create(o.prototype), r.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, r.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, s.makeJQueryPlugin = function(e) {
        e = e || t.jQuery, e && (a = e, a.fn.imagesLoaded = function(t, e) {
            var i = new s(this, t, e);
            return i.jqDeferred.promise(a(this))
        })
    }, s.makeJQueryPlugin(), s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
}(window, function(t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return n._createImagesLoaded = function() {
        this.on("activate", this.imagesLoaded)
    }, n.imagesLoaded = function() {
        function t(t, i) {
            var n = e.getParentCell(i.img);
            e.cellSizeChange(n && n.element), e.options.freeScroll || e.positionSliderAtSelected()
        }
        if (this.options.imagesLoaded) {
            var e = this;
            i(this.slider).on("progress", t)
        }
    }, e
});
/*!
 * Flickity fullscreen v1.1.0
 * Enable fullscreen view for Flickity
 */
! function(e, t) {
    "function" == typeof define && define.amd ? define(["flickity/js/index"], t) : "object" == typeof module && module.exports ? module.exports = t(require("flickity")) : t(e.Flickity)
}(window, function(e) {
    "use strict";
    e.createMethods.push("_createFullscreen");
    var t = e.prototype;
    t._createFullscreen = function() {
        this.isFullscreen = !1, this.options.fullscreen && (this.viewFullscreenButton = new n("view", this), this.exitFullscreenButton = new n("exit", this), this.on("activate", this._changeFullscreenActive), this.on("deactivate", this._changeFullscreenActive))
    }, t._changeFullscreenActive = function() {
        var e = this.isActive ? "appendChild" : "removeChild";
        this.element[e](this.viewFullscreenButton.element), this.element[e](this.exitFullscreenButton.element);
        var t = this.isActive ? "activate" : "deactivate";
        this.viewFullscreenButton[t](), this.exitFullscreenButton[t]()
    }, t.viewFullscreen = function() {
        this._changeFullscreen(!0), this.focus()
    }, t.exitFullscreen = function() {
        this._changeFullscreen(!1)
    }, t._changeFullscreen = function(e) {
        if (this.isFullscreen != e) {
            this.isFullscreen = e;
            var t = e ? "add" : "remove";
            document.documentElement.classList[t]("is-flickity-fullscreen"), this.element.classList[t]("is-fullscreen"), this.resize(), this.isFullscreen && this.reposition(), this.dispatchEvent("fullscreenChange", null, [e])
        }
    }, t.toggleFullscreen = function() {
        this._changeFullscreen(!this.isFullscreen)
    };
    var i = t.setGallerySize;

    function n(e, t) {
        this.name = e, this.createButton(), this.createIcon(), this.onClick = function() {
            t[e + "Fullscreen"]()
        }, this.clickHandler = this.onClick.bind(this)
    }
    t.setGallerySize = function() {
        this.options.setGallerySize && (this.isFullscreen ? this.viewport.style.height = "" : i.call(this))
    }, e.keyboardHandlers[27] = function() {
        this.exitFullscreen()
    }, n.prototype.createButton = function() {
        var e = this.element = document.createElement("button");
        e.className = "flickity-button flickity-fullscreen-button flickity-fullscreen-button-" + this.name;
        var t, i = (t = this.name + " full-screen")[0].toUpperCase() + t.slice(1);
        e.setAttribute("aria-label", i), e.title = i
    };
    var s = "http://www.w3.org/2000/svg",
        l = {
            view: "M15,20,7,28h5v4H0V20H4v5l8-8Zm5-5,8-8v5h4V0H20V4h5l-8,8Z",
            exit: "M32,3l-7,7h5v4H18V2h4V7l7-7ZM3,32l7-7v5h4V18H2v4H7L0,29Z"
        };
    return n.prototype.createIcon = function() {
        var e = document.createElementNS(s, "svg");
        e.setAttribute("class", "flickity-button-icon"), e.setAttribute("viewBox", "0 0 32 32");
        var t = document.createElementNS(s, "path"),
            i = l[this.name];
        t.setAttribute("d", i), e.appendChild(t), this.element.appendChild(e)
    }, n.prototype.activate = function() {
        this.element.addEventListener("click", this.clickHandler)
    }, n.prototype.deactivate = function() {
        this.element.removeEventListener("click", this.clickHandler)
    }, e.FullscreenButton = n, e
});
/*-----------------------------------------------------------------------------------*/
/*	07. PROGRESSBAR
/*-----------------------------------------------------------------------------------*/
// ProgressBar.js 1.0.1
// https://kimmobrunfeldt.github.io/progressbar.js
// License: MIT
! function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.ProgressBar = a()
    }
}(function() {
    var a;
    return function b(a, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!a[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                a[g][0].call(k.exports, function(b) {
                    var c = a[g][1][b];
                    return e(c ? c : b)
                }, k, k.exports, b, a, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(b, c, d) {
            (function() {
                var b = this || Function("return this")(),
                    e = function() {
                        "use strict";

                        function e() {}

                        function f(a, b) {
                            var c;
                            for (c in a) Object.hasOwnProperty.call(a, c) && b(c)
                        }

                        function g(a, b) {
                            return f(b, function(c) {
                                a[c] = b[c]
                            }), a
                        }

                        function h(a, b) {
                            f(b, function(c) {
                                "undefined" == typeof a[c] && (a[c] = b[c])
                            })
                        }

                        function i(a, b, c, d, e, f, g) {
                            var h, i, k, l = f > a ? 0 : (a - f) / e;
                            for (h in b) b.hasOwnProperty(h) && (i = g[h], k = "function" == typeof i ? i : o[i], b[h] = j(c[h], d[h], k, l));
                            return b
                        }

                        function j(a, b, c, d) {
                            return a + (b - a) * c(d)
                        }

                        function k(a, b) {
                            var c = n.prototype.filter,
                                d = a._filterArgs;
                            f(c, function(e) {
                                "undefined" != typeof c[e][b] && c[e][b].apply(a, d)
                            })
                        }

                        function l(a, b, c, d, e, f, g, h, j, l, m) {
                            v = b + c + d, w = Math.min(m || u(), v), x = w >= v, y = d - (v - w), a.isPlaying() && (x ? (j(g, a._attachment, y), a.stop(!0)) : (a._scheduleId = l(a._timeoutHandler, s), k(a, "beforeTween"), b + c > w ? i(1, e, f, g, 1, 1, h) : i(w, e, f, g, d, b + c, h), k(a, "afterTween"), j(e, a._attachment, y)))
                        }

                        function m(a, b) {
                            var c = {},
                                d = typeof b;
                            return "string" === d || "function" === d ? f(a, function(a) {
                                c[a] = b
                            }) : f(a, function(a) {
                                c[a] || (c[a] = b[a] || q)
                            }), c
                        }

                        function n(a, b) {
                            this._currentState = a || {}, this._configured = !1, this._scheduleFunction = p, "undefined" != typeof b && this.setConfig(b)
                        }
                        var o, p, q = "linear",
                            r = 500,
                            s = 1e3 / 60,
                            t = Date.now ? Date.now : function() {
                                return +new Date
                            },
                            u = "undefined" != typeof SHIFTY_DEBUG_NOW ? SHIFTY_DEBUG_NOW : t;
                        p = "undefined" != typeof window ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame || setTimeout : setTimeout;
                        var v, w, x, y;
                        return n.prototype.tween = function(a) {
                            return this._isTweening ? this : (void 0 === a && this._configured || this.setConfig(a), this._timestamp = u(), this._start(this.get(), this._attachment), this.resume())
                        }, n.prototype.setConfig = function(a) {
                            a = a || {}, this._configured = !0, this._attachment = a.attachment, this._pausedAtTime = null, this._scheduleId = null, this._delay = a.delay || 0, this._start = a.start || e, this._step = a.step || e, this._finish = a.finish || e, this._duration = a.duration || r, this._currentState = g({}, a.from) || this.get(), this._originalState = this.get(), this._targetState = g({}, a.to) || this.get();
                            var b = this;
                            this._timeoutHandler = function() {
                                l(b, b._timestamp, b._delay, b._duration, b._currentState, b._originalState, b._targetState, b._easing, b._step, b._scheduleFunction)
                            };
                            var c = this._currentState,
                                d = this._targetState;
                            return h(d, c), this._easing = m(c, a.easing || q), this._filterArgs = [c, this._originalState, d, this._easing], k(this, "tweenCreated"), this
                        }, n.prototype.get = function() {
                            return g({}, this._currentState)
                        }, n.prototype.set = function(a) {
                            this._currentState = a
                        }, n.prototype.pause = function() {
                            return this._pausedAtTime = u(), this._isPaused = !0, this
                        }, n.prototype.resume = function() {
                            return this._isPaused && (this._timestamp += u() - this._pausedAtTime), this._isPaused = !1, this._isTweening = !0, this._timeoutHandler(), this
                        }, n.prototype.seek = function(a) {
                            a = Math.max(a, 0);
                            var b = u();
                            return this._timestamp + a === 0 ? this : (this._timestamp = b - a, this.isPlaying() || (this._isTweening = !0, this._isPaused = !1, l(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, b), this.pause()), this)
                        }, n.prototype.stop = function(a) {
                            return this._isTweening = !1, this._isPaused = !1, this._timeoutHandler = e, (b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.oCancelAnimationFrame || b.msCancelAnimationFrame || b.mozCancelRequestAnimationFrame || b.clearTimeout)(this._scheduleId), a && (k(this, "beforeTween"), i(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), k(this, "afterTween"), k(this, "afterTweenEnd"), this._finish.call(this, this._currentState, this._attachment)), this
                        }, n.prototype.isPlaying = function() {
                            return this._isTweening && !this._isPaused
                        }, n.prototype.setScheduleFunction = function(a) {
                            this._scheduleFunction = a
                        }, n.prototype.dispose = function() {
                            var a;
                            for (a in this) this.hasOwnProperty(a) && delete this[a]
                        }, n.prototype.filter = {}, n.prototype.formula = {
                            linear: function(a) {
                                return a
                            }
                        }, o = n.prototype.formula, g(n, {
                            now: u,
                            each: f,
                            tweenProps: i,
                            tweenProp: j,
                            applyFilter: k,
                            shallowCopy: g,
                            defaults: h,
                            composeEasingObject: m
                        }), "function" == typeof SHIFTY_DEBUG_NOW && (b.timeoutHandler = l), "object" == typeof d ? c.exports = n : "function" == typeof a && a.amd ? a(function() {
                            return n
                        }) : "undefined" == typeof b.Tweenable && (b.Tweenable = n), n
                    }();
                ! function() {
                    e.shallowCopy(e.prototype.formula, {
                        easeInQuad: function(a) {
                            return Math.pow(a, 2)
                        },
                        easeOutQuad: function(a) {
                            return -(Math.pow(a - 1, 2) - 1)
                        },
                        easeInOutQuad: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 2) : -.5 * ((a -= 2) * a - 2)
                        },
                        easeInCubic: function(a) {
                            return Math.pow(a, 3)
                        },
                        easeOutCubic: function(a) {
                            return Math.pow(a - 1, 3) + 1
                        },
                        easeInOutCubic: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 3) : .5 * (Math.pow(a - 2, 3) + 2)
                        },
                        easeInQuart: function(a) {
                            return Math.pow(a, 4)
                        },
                        easeOutQuart: function(a) {
                            return -(Math.pow(a - 1, 4) - 1)
                        },
                        easeInOutQuart: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2)
                        },
                        easeInQuint: function(a) {
                            return Math.pow(a, 5)
                        },
                        easeOutQuint: function(a) {
                            return Math.pow(a - 1, 5) + 1
                        },
                        easeInOutQuint: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 5) : .5 * (Math.pow(a - 2, 5) + 2)
                        },
                        easeInSine: function(a) {
                            return -Math.cos(a * (Math.PI / 2)) + 1
                        },
                        easeOutSine: function(a) {
                            return Math.sin(a * (Math.PI / 2))
                        },
                        easeInOutSine: function(a) {
                            return -.5 * (Math.cos(Math.PI * a) - 1)
                        },
                        easeInExpo: function(a) {
                            return 0 === a ? 0 : Math.pow(2, 10 * (a - 1))
                        },
                        easeOutExpo: function(a) {
                            return 1 === a ? 1 : -Math.pow(2, -10 * a) + 1
                        },
                        easeInOutExpo: function(a) {
                            return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (-Math.pow(2, -10 * --a) + 2)
                        },
                        easeInCirc: function(a) {
                            return -(Math.sqrt(1 - a * a) - 1)
                        },
                        easeOutCirc: function(a) {
                            return Math.sqrt(1 - Math.pow(a - 1, 2))
                        },
                        easeInOutCirc: function(a) {
                            return (a /= .5) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
                        },
                        easeOutBounce: function(a) {
                            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                        },
                        easeInBack: function(a) {
                            var b = 1.70158;
                            return a * a * ((b + 1) * a - b)
                        },
                        easeOutBack: function(a) {
                            var b = 1.70158;
                            return (a -= 1) * a * ((b + 1) * a + b) + 1
                        },
                        easeInOutBack: function(a) {
                            var b = 1.70158;
                            return (a /= .5) < 1 ? .5 * (a * a * (((b *= 1.525) + 1) * a - b)) : .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2)
                        },
                        elastic: function(a) {
                            return -1 * Math.pow(4, -8 * a) * Math.sin((6 * a - 1) * (2 * Math.PI) / 2) + 1
                        },
                        swingFromTo: function(a) {
                            var b = 1.70158;
                            return (a /= .5) < 1 ? .5 * (a * a * (((b *= 1.525) + 1) * a - b)) : .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2)
                        },
                        swingFrom: function(a) {
                            var b = 1.70158;
                            return a * a * ((b + 1) * a - b)
                        },
                        swingTo: function(a) {
                            var b = 1.70158;
                            return (a -= 1) * a * ((b + 1) * a + b) + 1
                        },
                        bounce: function(a) {
                            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                        },
                        bouncePast: function(a) {
                            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 2 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 2 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 2 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
                        },
                        easeFromTo: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2)
                        },
                        easeFrom: function(a) {
                            return Math.pow(a, 4)
                        },
                        easeTo: function(a) {
                            return Math.pow(a, .25)
                        }
                    })
                }(),
                function() {
                    function a(a, b, c, d, e, f) {
                        function g(a) {
                            return ((n * a + o) * a + p) * a
                        }

                        function h(a) {
                            return ((q * a + r) * a + s) * a
                        }

                        function i(a) {
                            return (3 * n * a + 2 * o) * a + p
                        }

                        function j(a) {
                            return 1 / (200 * a)
                        }

                        function k(a, b) {
                            return h(m(a, b))
                        }

                        function l(a) {
                            return a >= 0 ? a : 0 - a
                        }

                        function m(a, b) {
                            var c, d, e, f, h, j;
                            for (e = a, j = 0; 8 > j; j++) {
                                if (f = g(e) - a, l(f) < b) return e;
                                if (h = i(e), l(h) < 1e-6) break;
                                e -= f / h
                            }
                            if (c = 0, d = 1, e = a, c > e) return c;
                            if (e > d) return d;
                            for (; d > c;) {
                                if (f = g(e), l(f - a) < b) return e;
                                a > f ? c = e : d = e, e = .5 * (d - c) + c
                            }
                            return e
                        }
                        var n = 0,
                            o = 0,
                            p = 0,
                            q = 0,
                            r = 0,
                            s = 0;
                        return p = 3 * b, o = 3 * (d - b) - p, n = 1 - p - o, s = 3 * c, r = 3 * (e - c) - s, q = 1 - s - r, k(a, j(f))
                    }

                    function b(b, c, d, e) {
                        return function(f) {
                            return a(f, b, c, d, e, 1)
                        }
                    }
                    e.setBezierFunction = function(a, c, d, f, g) {
                        var h = b(c, d, f, g);
                        return h.displayName = a, h.x1 = c, h.y1 = d, h.x2 = f, h.y2 = g, e.prototype.formula[a] = h
                    }, e.unsetBezierFunction = function(a) {
                        delete e.prototype.formula[a]
                    }
                }(),
                function() {
                    function a(a, b, c, d, f, g) {
                        return e.tweenProps(d, b, a, c, 1, g, f)
                    }
                    var b = new e;
                    b._filterArgs = [], e.interpolate = function(c, d, f, g, h) {
                        var i = e.shallowCopy({}, c),
                            j = h || 0,
                            k = e.composeEasingObject(c, g || "linear");
                        b.set({});
                        var l = b._filterArgs;
                        l.length = 0, l[0] = i, l[1] = c, l[2] = d, l[3] = k, e.applyFilter(b, "tweenCreated"), e.applyFilter(b, "beforeTween");
                        var m = a(c, i, d, f, k, j);
                        return e.applyFilter(b, "afterTween"), m
                    }
                }(),
                function(a) {
                    function b(a, b) {
                        var c, d = [],
                            e = a.length;
                        for (c = 0; e > c; c++) d.push("_" + b + "_" + c);
                        return d
                    }

                    function c(a) {
                        var b = a.match(v);
                        return b ? (1 === b.length || a[0].match(u)) && b.unshift("") : b = ["", ""], b.join(A)
                    }

                    function d(b) {
                        a.each(b, function(a) {
                            var c = b[a];
                            "string" == typeof c && c.match(z) && (b[a] = e(c))
                        })
                    }

                    function e(a) {
                        return i(z, a, f)
                    }

                    function f(a) {
                        var b = g(a);
                        return "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")"
                    }

                    function g(a) {
                        return a = a.replace(/#/, ""), 3 === a.length && (a = a.split(""), a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), B[0] = h(a.substr(0, 2)), B[1] = h(a.substr(2, 2)), B[2] = h(a.substr(4, 2)), B
                    }

                    function h(a) {
                        return parseInt(a, 16)
                    }

                    function i(a, b, c) {
                        var d = b.match(a),
                            e = b.replace(a, A);
                        if (d)
                            for (var f, g = d.length, h = 0; g > h; h++) f = d.shift(), e = e.replace(A, c(f));
                        return e
                    }

                    function j(a) {
                        return i(x, a, k)
                    }

                    function k(a) {
                        for (var b = a.match(w), c = b.length, d = a.match(y)[0], e = 0; c > e; e++) d += parseInt(b[e], 10) + ",";
                        return d = d.slice(0, -1) + ")"
                    }

                    function l(d) {
                        var e = {};
                        return a.each(d, function(a) {
                            var f = d[a];
                            if ("string" == typeof f) {
                                var g = r(f);
                                e[a] = {
                                    formatString: c(f),
                                    chunkNames: b(g, a)
                                }
                            }
                        }), e
                    }

                    function m(b, c) {
                        a.each(c, function(a) {
                            for (var d = b[a], e = r(d), f = e.length, g = 0; f > g; g++) b[c[a].chunkNames[g]] = +e[g];
                            delete b[a]
                        })
                    }

                    function n(b, c) {
                        a.each(c, function(a) {
                            var d = b[a],
                                e = o(b, c[a].chunkNames),
                                f = p(e, c[a].chunkNames);
                            d = q(c[a].formatString, f), b[a] = j(d)
                        })
                    }

                    function o(a, b) {
                        for (var c, d = {}, e = b.length, f = 0; e > f; f++) c = b[f], d[c] = a[c], delete a[c];
                        return d
                    }

                    function p(a, b) {
                        C.length = 0;
                        for (var c = b.length, d = 0; c > d; d++) C.push(a[b[d]]);
                        return C
                    }

                    function q(a, b) {
                        for (var c = a, d = b.length, e = 0; d > e; e++) c = c.replace(A, +b[e].toFixed(4));
                        return c
                    }

                    function r(a) {
                        return a.match(w)
                    }

                    function s(b, c) {
                        a.each(c, function(a) {
                            var d, e = c[a],
                                f = e.chunkNames,
                                g = f.length,
                                h = b[a];
                            if ("string" == typeof h) {
                                var i = h.split(" "),
                                    j = i[i.length - 1];
                                for (d = 0; g > d; d++) b[f[d]] = i[d] || j
                            } else
                                for (d = 0; g > d; d++) b[f[d]] = h;
                            delete b[a]
                        })
                    }

                    function t(b, c) {
                        a.each(c, function(a) {
                            var d = c[a],
                                e = d.chunkNames,
                                f = e.length,
                                g = b[e[0]],
                                h = typeof g;
                            if ("string" === h) {
                                for (var i = "", j = 0; f > j; j++) i += " " + b[e[j]], delete b[e[j]];
                                b[a] = i.substr(1)
                            } else b[a] = g
                        })
                    }
                    var u = /(\d|\-|\.)/,
                        v = /([^\-0-9\.]+)/g,
                        w = /[0-9.\-]+/g,
                        x = new RegExp("rgb\\(" + w.source + /,\s*/.source + w.source + /,\s*/.source + w.source + "\\)", "g"),
                        y = /^.*\(/,
                        z = /#([0-9]|[a-f]){3,6}/gi,
                        A = "VAL",
                        B = [],
                        C = [];
                    a.prototype.filter.token = {
                        tweenCreated: function(a, b, c, e) {
                            d(a), d(b), d(c), this._tokenData = l(a)
                        },
                        beforeTween: function(a, b, c, d) {
                            s(d, this._tokenData), m(a, this._tokenData), m(b, this._tokenData), m(c, this._tokenData)
                        },
                        afterTween: function(a, b, c, d) {
                            n(a, this._tokenData), n(b, this._tokenData), n(c, this._tokenData), t(d, this._tokenData)
                        }
                    }
                }(e)
            }).call(null)
        }, {}],
        2: [function(a, b, c) {
            var d = a("./shape"),
                e = a("./utils"),
                f = function(a, b) {
                    this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}", this.containerAspectRatio = 1, d.apply(this, arguments)
                };
            f.prototype = new d, f.prototype.constructor = f, f.prototype._pathString = function(a) {
                var b = a.strokeWidth;
                a.trailWidth && a.trailWidth > a.strokeWidth && (b = a.trailWidth);
                var c = 50 - b / 2;
                return e.render(this._pathTemplate, {
                    radius: c,
                    "2radius": 2 * c
                })
            }, f.prototype._trailString = function(a) {
                return this._pathString(a)
            }, b.exports = f
        }, {
            "./shape": 7,
            "./utils": 8
        }],
        3: [function(a, b, c) {
            var d = a("./shape"),
                e = a("./utils"),
                f = function(a, b) {
                    this._pathTemplate = "M 0,{center} L 100,{center}", d.apply(this, arguments)
                };
            f.prototype = new d, f.prototype.constructor = f, f.prototype._initializeSvg = function(a, b) {
                a.setAttribute("viewBox", "0 0 100 " + b.strokeWidth), a.setAttribute("preserveAspectRatio", "none")
            }, f.prototype._pathString = function(a) {
                return e.render(this._pathTemplate, {
                    center: a.strokeWidth / 2
                })
            }, f.prototype._trailString = function(a) {
                return this._pathString(a)
            }, b.exports = f
        }, {
            "./shape": 7,
            "./utils": 8
        }],
        4: [function(a, b, c) {
            b.exports = {
                Line: a("./line"),
                Circle: a("./circle"),
                SemiCircle: a("./semicircle"),
                Path: a("./path"),
                Shape: a("./shape"),
                utils: a("./utils")
            }
        }, {
            "./circle": 2,
            "./line": 3,
            "./path": 5,
            "./semicircle": 6,
            "./shape": 7,
            "./utils": 8
        }],
        5: [function(a, b, c) {
            var d = a("shifty"),
                e = a("./utils"),
                f = {
                    easeIn: "easeInCubic",
                    easeOut: "easeOutCubic",
                    easeInOut: "easeInOutCubic"
                },
                g = function h(a, b) {
                    if (!(this instanceof h)) throw new Error("Constructor was called without new keyword");
                    b = e.extend({
                        duration: 800,
                        easing: "linear",
                        from: {},
                        to: {},
                        step: function() {}
                    }, b);
                    var c;
                    c = e.isString(a) ? document.querySelector(a) : a, this.path = c, this._opts = b, this._tweenable = null;
                    var d = this.path.getTotalLength();
                    this.path.style.strokeDasharray = d + " " + d, this.set(0)
                };
            g.prototype.value = function() {
                var a = this._getComputedDashOffset(),
                    b = this.path.getTotalLength(),
                    c = 1 - a / b;
                return parseFloat(c.toFixed(6), 10)
            }, g.prototype.set = function(a) {
                this.stop(), this.path.style.strokeDashoffset = this._progressToOffset(a);
                var b = this._opts.step;
                if (e.isFunction(b)) {
                    var c = this._easing(this._opts.easing),
                        d = this._calculateTo(a, c),
                        f = this._opts.shape || this;
                    b(d, f, this._opts.attachment)
                }
            }, g.prototype.stop = function() {
                this._stopTween(), this.path.style.strokeDashoffset = this._getComputedDashOffset()
            }, g.prototype.animate = function(a, b, c) {
                b = b || {}, e.isFunction(b) && (c = b, b = {});
                var f = e.extend({}, b),
                    g = e.extend({}, this._opts);
                b = e.extend(g, b);
                var h = this._easing(b.easing),
                    i = this._resolveFromAndTo(a, h, f);
                this.stop(), this.path.getBoundingClientRect();
                var j = this._getComputedDashOffset(),
                    k = this._progressToOffset(a),
                    l = this;
                this._tweenable = new d, this._tweenable.tween({
                    from: e.extend({
                        offset: j
                    }, i.from),
                    to: e.extend({
                        offset: k
                    }, i.to),
                    duration: b.duration,
                    easing: h,
                    step: function(a) {
                        l.path.style.strokeDashoffset = a.offset;
                        var c = b.shape || l;
                        b.step(a, c, b.attachment)
                    },
                    finish: function(a) {
                        e.isFunction(c) && c()
                    }
                })
            }, g.prototype._getComputedDashOffset = function() {
                var a = window.getComputedStyle(this.path, null);
                return parseFloat(a.getPropertyValue("stroke-dashoffset"), 10)
            }, g.prototype._progressToOffset = function(a) {
                var b = this.path.getTotalLength();
                return b - a * b
            }, g.prototype._resolveFromAndTo = function(a, b, c) {
                return c.from && c.to ? {
                    from: c.from,
                    to: c.to
                } : {
                    from: this._calculateFrom(b),
                    to: this._calculateTo(a, b)
                }
            }, g.prototype._calculateFrom = function(a) {
                return d.interpolate(this._opts.from, this._opts.to, this.value(), a)
            }, g.prototype._calculateTo = function(a, b) {
                return d.interpolate(this._opts.from, this._opts.to, a, b)
            }, g.prototype._stopTween = function() {
                null !== this._tweenable && (this._tweenable.stop(), this._tweenable = null)
            }, g.prototype._easing = function(a) {
                return f.hasOwnProperty(a) ? f[a] : a
            }, b.exports = g
        }, {
            "./utils": 8,
            shifty: 1
        }],
        6: [function(a, b, c) {
            var d = a("./shape"),
                e = a("./circle"),
                f = a("./utils"),
                g = function(a, b) {
                    this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0", this.containerAspectRatio = 2, d.apply(this, arguments)
                };
            g.prototype = new d, g.prototype.constructor = g, g.prototype._initializeSvg = function(a, b) {
                a.setAttribute("viewBox", "0 0 100 50")
            }, g.prototype._initializeTextContainer = function(a, b, c) {
                a.text.style && (c.style.top = "auto", c.style.bottom = "0", a.text.alignToBottom ? f.setStyle(c, "transform", "translate(-50%, 0)") : f.setStyle(c, "transform", "translate(-50%, 50%)"))
            }, g.prototype._pathString = e.prototype._pathString, g.prototype._trailString = e.prototype._trailString, b.exports = g
        }, {
            "./circle": 2,
            "./shape": 7,
            "./utils": 8
        }],
        7: [function(a, b, c) {
            var d = a("./path"),
                e = a("./utils"),
                f = "Object is destroyed",
                g = function h(a, b) {
                    if (!(this instanceof h)) throw new Error("Constructor was called without new keyword");
                    if (0 !== arguments.length) {
                        this._opts = e.extend({
                            color: "#555",
                            strokeWidth: 1,
                            trailColor: null,
                            trailWidth: null,
                            fill: null,
                            text: {
                                style: {
                                    color: null,
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    padding: 0,
                                    margin: 0,
                                    transform: {
                                        prefix: !0,
                                        value: "translate(-50%, -50%)"
                                    }
                                },
                                autoStyleContainer: !0,
                                alignToBottom: !0,
                                value: null,
                                className: "progressbar-text"
                            },
                            svgStyle: {
                                display: "block",
                                width: "100%"
                            },
                            warnings: !1
                        }, b, !0), e.isObject(b) && void 0 !== b.svgStyle && (this._opts.svgStyle = b.svgStyle), e.isObject(b) && e.isObject(b.text) && void 0 !== b.text.style && (this._opts.text.style = b.text.style);
                        var c, f = this._createSvgView(this._opts);
                        if (c = e.isString(a) ? document.querySelector(a) : a, !c) throw new Error("Container does not exist: " + a);
                        this._container = c, this._container.appendChild(f.svg), this._opts.warnings && this._warnContainerAspectRatio(this._container), this._opts.svgStyle && e.setStyles(f.svg, this._opts.svgStyle), this.svg = f.svg, this.path = f.path, this.trail = f.trail, this.text = null;
                        var g = e.extend({
                            attachment: void 0,
                            shape: this
                        }, this._opts);
                        this._progressPath = new d(f.path, g), e.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value)
                    }
                };
            g.prototype.animate = function(a, b, c) {
                if (null === this._progressPath) throw new Error(f);
                this._progressPath.animate(a, b, c)
            }, g.prototype.stop = function() {
                if (null === this._progressPath) throw new Error(f);
                void 0 !== this._progressPath && this._progressPath.stop()
            }, g.prototype.destroy = function() {
                if (null === this._progressPath) throw new Error(f);
                this.stop(), this.svg.parentNode.removeChild(this.svg), this.svg = null, this.path = null, this.trail = null, this._progressPath = null, null !== this.text && (this.text.parentNode.removeChild(this.text), this.text = null)
            }, g.prototype.set = function(a) {
                if (null === this._progressPath) throw new Error(f);
                this._progressPath.set(a)
            }, g.prototype.value = function() {
                if (null === this._progressPath) throw new Error(f);
                return void 0 === this._progressPath ? 0 : this._progressPath.value()
            }, g.prototype.setText = function(a) {
                if (null === this._progressPath) throw new Error(f);
                null === this.text && (this.text = this._createTextContainer(this._opts, this._container), this._container.appendChild(this.text)), e.isObject(a) ? (e.removeChildren(this.text), this.text.appendChild(a)) : this.text.innerHTML = a
            }, g.prototype._createSvgView = function(a) {
                var b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                this._initializeSvg(b, a);
                var c = null;
                (a.trailColor || a.trailWidth) && (c = this._createTrail(a), b.appendChild(c));
                var d = this._createPath(a);
                return b.appendChild(d), {
                    svg: b,
                    path: d,
                    trail: c
                }
            }, g.prototype._initializeSvg = function(a, b) {
                a.setAttribute("viewBox", "0 0 100 100")
            }, g.prototype._createPath = function(a) {
                var b = this._pathString(a);
                return this._createPathElement(b, a)
            }, g.prototype._createTrail = function(a) {
                var b = this._trailString(a),
                    c = e.extend({}, a);
                return c.trailColor || (c.trailColor = "#eee"), c.trailWidth || (c.trailWidth = c.strokeWidth), c.color = c.trailColor, c.strokeWidth = c.trailWidth, c.fill = null, this._createPathElement(b, c)
            }, g.prototype._createPathElement = function(a, b) {
                var c = document.createElementNS("http://www.w3.org/2000/svg", "path");
                return c.setAttribute("d", a), c.setAttribute("stroke", b.color), c.setAttribute("stroke-width", b.strokeWidth), b.fill ? c.setAttribute("fill", b.fill) : c.setAttribute("fill-opacity", "0"), c
            }, g.prototype._createTextContainer = function(a, b) {
                var c = document.createElement("div");
                c.className = a.text.className;
                var d = a.text.style;
                return d && (a.text.autoStyleContainer && (b.style.position = "relative"), e.setStyles(c, d), d.color || (c.style.color = a.color)), this._initializeTextContainer(a, b, c), c
            }, g.prototype._initializeTextContainer = function(a, b, c) {}, g.prototype._pathString = function(a) {
                throw new Error("Override this function for each progress bar")
            }, g.prototype._trailString = function(a) {
                throw new Error("Override this function for each progress bar")
            }, g.prototype._warnContainerAspectRatio = function(a) {
                if (this.containerAspectRatio) {
                    var b = window.getComputedStyle(a, null),
                        c = parseFloat(b.getPropertyValue("width"), 10),
                        d = parseFloat(b.getPropertyValue("height"), 10);
                    e.floatEquals(this.containerAspectRatio, c / d) || (console.warn("Incorrect aspect ratio of container", "#" + a.id, "detected:", b.getPropertyValue("width") + "(width)", "/", b.getPropertyValue("height") + "(height)", "=", c / d), console.warn("Aspect ratio of should be", this.containerAspectRatio))
                }
            }, b.exports = g
        }, {
            "./path": 5,
            "./utils": 8
        }],
        8: [function(a, b, c) {
            function d(a, b, c) {
                a = a || {}, b = b || {}, c = c || !1;
                for (var e in b)
                    if (b.hasOwnProperty(e)) {
                        var f = a[e],
                            g = b[e];
                        c && l(f) && l(g) ? a[e] = d(f, g, c) : a[e] = g
                    }
                return a
            }

            function e(a, b) {
                var c = a;
                for (var d in b)
                    if (b.hasOwnProperty(d)) {
                        var e = b[d],
                            f = "\\{" + d + "\\}",
                            g = new RegExp(f, "g");
                        c = c.replace(g, e)
                    }
                return c
            }

            function f(a, b, c) {
                for (var d = a.style, e = 0; e < p.length; ++e) {
                    var f = p[e];
                    d[f + h(b)] = c
                }
                d[b] = c
            }

            function g(a, b) {
                m(b, function(b, c) {
                    null !== b && void 0 !== b && (l(b) && b.prefix === !0 ? f(a, c, b.value) : a.style[c] = b)
                })
            }

            function h(a) {
                return a.charAt(0).toUpperCase() + a.slice(1)
            }

            function i(a) {
                return "string" == typeof a || a instanceof String
            }

            function j(a) {
                return "function" == typeof a
            }

            function k(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }

            function l(a) {
                if (k(a)) return !1;
                var b = typeof a;
                return "object" === b && !!a
            }

            function m(a, b) {
                for (var c in a)
                    if (a.hasOwnProperty(c)) {
                        var d = a[c];
                        b(d, c)
                    }
            }

            function n(a, b) {
                return Math.abs(a - b) < q
            }

            function o(a) {
                for (; a.firstChild;) a.removeChild(a.firstChild)
            }
            var p = "Webkit Moz O ms".split(" "),
                q = .001;
            b.exports = {
                extend: d,
                render: e,
                setStyle: f,
                setStyles: g,
                capitalize: h,
                isString: i,
                isFunction: j,
                isObject: l,
                forEachObject: m,
                floatEquals: n,
                removeChildren: o
            }
        }, {}]
    }, {}, [4])(4)
});
/*-----------------------------------------------------------------------------------*/
/*	08. WAYPOINTS
/*-----------------------------------------------------------------------------------*/
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);
/*-----------------------------------------------------------------------------------*/
/*	09. COUNTER UP
/*-----------------------------------------------------------------------------------*/
/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */
(function(e) {
    "use strict";
    e.fn.counterUp = function(t) {
        var n = e.extend({
            time: 400,
            delay: 10
        }, t);
        return this.each(function() {
            var t = e(this),
                r = n,
                i = function() {
                    var e = [],
                        n = r.time / r.delay,
                        i = t.text(),
                        s = /[0-9]+,[0-9]+/.test(i);
                    i = i.replace(/,/g, "");
                    var o = /^[0-9]+$/.test(i),
                        u = /^[0-9]+\.[0-9]+$/.test(i),
                        a = u ? (i.split(".")[1] || []).length : 0;
                    for (var f = n; f >= 1; f--) {
                        var l = parseInt(i / n * f);
                        u && (l = parseFloat(i / n * f).toFixed(a));
                        if (s)
                            while (/(\d+)(\d{3})/.test(l.toString())) l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                        e.unshift(l)
                    }
                    t.data("counterup-nums", e);
                    t.text("0");
                    var c = function() {
                        t.text(t.data("counterup-nums").shift());
                        if (t.data("counterup-nums").length) setTimeout(t.data("counterup-func"), r.delay);
                        else {
                            delete t.data("counterup-nums");
                            t.data("counterup-nums", null);
                            t.data("counterup-func", null)
                        }
                    };
                    t.data("counterup-func", c);
                    setTimeout(t.data("counterup-func"), r.delay)
                };
            t.waypoint(i, {
                offset: "100%",
                triggerOnce: !0
            })
        })
    }
})(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	10. COUNTDOWN
/*-----------------------------------------------------------------------------------*/
/*!
 * Countdown v0.1.0
 * https://github.com/fengyuanchen/countdown
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.defaults = a.extend({}, b.defaults, this.$element.data(), a.isPlainObject(d) ? d : {}), this.init()
    };
    b.prototype = {
        constructor: b,
        init: function() {
            var a = this.$element.html(),
                b = new Date(this.defaults.date || a);
            b.getTime() && (this.content = a, this.date = b, this.find(), this.defaults.autoStart && this.start())
        },
        find: function() {
            var a = this.$element;
            this.$days = a.find("[data-days]"), this.$hours = a.find("[data-hours]"), this.$minutes = a.find("[data-minutes]"), this.$seconds = a.find("[data-seconds]"), this.$days.length + this.$hours.length + this.$minutes.length + this.$seconds.length > 0 && (this.found = !0)
        },
        reset: function() {
            this.found ? (this.output("days"), this.output("hours"), this.output("minutes"), this.output("seconds")) : this.output()
        },
        ready: function() {
            var a, b = this.date,
                c = 100,
                d = 1e3,
                e = 6e4,
                f = 36e5,
                g = 864e5,
                h = {};
            return b ? (a = b.getTime() - (new Date).getTime(), 0 >= a ? (this.end(), !1) : (h.days = a, h.hours = h.days % g, h.minutes = h.hours % f, h.seconds = h.minutes % e, h.milliseconds = h.seconds % d, this.days = Math.floor(h.days / g), this.hours = Math.floor(h.hours / f), this.minutes = Math.floor(h.minutes / e), this.seconds = Math.floor(h.seconds / d), this.deciseconds = Math.floor(h.milliseconds / c), !0)) : !1
        },
        start: function() {
            !this.active && this.ready() && (this.active = !0, this.reset(), this.autoUpdate = this.defaults.fast ? setInterval(a.proxy(this.fastUpdate, this), 100) : setInterval(a.proxy(this.update, this), 1e3))
        },
        stop: function() {
            this.active && (this.active = !1, clearInterval(this.autoUpdate))
        },
        end: function() {
            this.date && (this.stop(), this.days = 0, this.hours = 0, this.minutes = 0, this.seconds = 0, this.deciseconds = 0, this.reset(), this.defaults.end())
        },
        destroy: function() {
            this.date && (this.stop(), this.$days = null, this.$hours = null, this.$minutes = null, this.$seconds = null, this.$element.empty().html(this.content), this.$element.removeData("countdown"))
        },
        fastUpdate: function() {
            --this.deciseconds >= 0 ? this.output("deciseconds") : (this.deciseconds = 9, this.update())
        },
        update: function() {
            --this.seconds >= 0 ? this.output("seconds") : (this.seconds = 59, --this.minutes >= 0 ? this.output("minutes") : (this.minutes = 59, --this.hours >= 0 ? this.output("hours") : (this.hours = 23, --this.days >= 0 ? this.output("days") : this.end())))
        },
        output: function(a) {
            if (!this.found) return void this.$element.empty().html(this.template());
            switch (a) {
                case "deciseconds":
                    this.$seconds.text(this.getSecondsText());
                    break;
                case "seconds":
                    this.$seconds.text(this.seconds);
                    break;
                case "minutes":
                    this.$minutes.text(this.minutes);
                    break;
                case "hours":
                    this.$hours.text(this.hours);
                    break;
                case "days":
                    this.$days.text(this.days)
            }
        },
        template: function() {
            return this.defaults.text.replace("%s", this.days).replace("%s", this.hours).replace("%s", this.minutes).replace("%s", this.getSecondsText())
        },
        getSecondsText: function() {
            return this.active && this.defaults.fast ? this.seconds + "." + this.deciseconds : this.seconds
        }
    }, b.defaults = {
        autoStart: !0,
        date: null,
        fast: !1,
        end: a.noop,
        text: "%s days, %s hours, %s minutes, %s seconds"
    }, b.setDefaults = function(c) {
        a.extend(b.defaults, c)
    }, a.fn.countdown = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("countdown");
            e || d.data("countdown", e = new b(this, c)), "string" == typeof c && a.isFunction(e[c]) && e[c]()
        })
    }, a.fn.countdown.constructor = b, a.fn.countdown.setDefaults = b.setDefaults, a(function() {
        a("[countdown]").countdown()
    })
});
/*-----------------------------------------------------------------------------------*/
/*	11. PLYR
/*-----------------------------------------------------------------------------------*/
"object" == typeof navigator && function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : e.Plyr = t()
}(this, function() {
    "use strict";
    var e = function(e) {
            return null != e ? e.constructor : null
        },
        t = function(e, t) {
            return Boolean(e && t && e instanceof t)
        },
        i = function(e) {
            return null == e
        },
        n = function(t) {
            return e(t) === Object
        },
        a = function(t) {
            return e(t) === String
        },
        s = function(e) {
            return Array.isArray(e)
        },
        r = function(e) {
            return t(e, NodeList)
        },
        l = function(e) {
            return i(e) || (a(e) || s(e) || r(e)) && !e.length || n(e) && !Object.keys(e).length
        },
        o = {
            nullOrUndefined: i,
            object: n,
            number: function(t) {
                return e(t) === Number && !Number.isNaN(t)
            },
            string: a,
            boolean: function(t) {
                return e(t) === Boolean
            },
            function: function(t) {
                return e(t) === Function
            },
            array: s,
            weakMap: function(e) {
                return t(e, WeakMap)
            },
            nodeList: r,
            element: function(e) {
                return t(e, Element)
            },
            textNode: function(t) {
                return e(t) === Text
            },
            event: function(e) {
                return t(e, Event)
            },
            cue: function(e) {
                return t(e, window.TextTrackCue) || t(e, window.VTTCue)
            },
            track: function(e) {
                return t(e, TextTrack) || !i(e) && a(e.kind)
            },
            url: function(e) {
                if (t(e, window.URL)) return !0;
                var i = e;
                e.startsWith("http://") && e.startsWith("https://") || (i = "http://" + e);
                try {
                    return !l(new URL(i).hostname)
                } catch (e) {
                    return !1
                }
            },
            empty: l
        },
        c = function() {
            var e = !1;
            try {
                var t = Object.defineProperty({}, "passive", {
                    get: function() {
                        return e = !0, null
                    }
                });
                window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
            } catch (e) {}
            return e
        }();

    function u(e, t, i) {
        var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            a = this,
            s = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
            r = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
        if (e && "addEventListener" in e && !o.empty(t) && o.function(i)) {
            var l = t.split(" "),
                u = r;
            c && (u = {
                passive: s,
                capture: r
            }), l.forEach(function(t) {
                a && a.eventListeners && n && a.eventListeners.push({
                    element: e,
                    type: t,
                    callback: i,
                    options: u
                }), e[n ? "addEventListener" : "removeEventListener"](t, i, u)
            })
        }
    }

    function d(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments[2],
            n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        u.call(this, e, t, i, !0, n, a)
    }

    function p(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments[2],
            n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        u.call(this, e, t, i, !1, n, a)
    }

    function h(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments[2],
            n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        u.call(this, e, t, function s() {
            p(e, t, s, n, a);
            for (var r = arguments.length, l = Array(r), o = 0; o < r; o++) l[o] = arguments[o];
            i.apply(this, l)
        }, !0, n, a)
    }

    function m(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (o.element(e) && !o.empty(t)) {
            var a = new CustomEvent(t, {
                bubbles: i,
                detail: Object.assign({}, n, {
                    plyr: this
                })
            });
            e.dispatchEvent(a)
        }
    }
    var f = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        g = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(),
        y = function(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        },
        v = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var i = [],
                        n = !0,
                        a = !1,
                        s = void 0;
                    try {
                        for (var r, l = e[Symbol.iterator](); !(n = (r = l.next()).done) && (i.push(r.value), !t || i.length !== t); n = !0);
                    } catch (e) {
                        a = !0, s = e
                    } finally {
                        try {
                            !n && l.return && l.return()
                        } finally {
                            if (a) throw s
                        }
                    }
                    return i
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();

    function b(e, t) {
        var i = e.length ? e : [e];
        Array.from(i).reverse().forEach(function(e, i) {
            var n = i > 0 ? t.cloneNode(!0) : t,
                a = e.parentNode,
                s = e.nextSibling;
            n.appendChild(e), s ? a.insertBefore(n, s) : a.appendChild(n)
        })
    }

    function k(e, t) {
        o.element(e) && !o.empty(t) && Object.entries(t).filter(function(e) {
            var t = v(e, 2)[1];
            return !o.nullOrUndefined(t)
        }).forEach(function(t) {
            var i = v(t, 2),
                n = i[0],
                a = i[1];
            return e.setAttribute(n, a)
        })
    }

    function w(e, t, i) {
        var n = document.createElement(e);
        return o.object(t) && k(n, t), o.string(i) && (n.innerText = i), n
    }

    function T(e, t, i, n) {
        t.appendChild(w(e, i, n))
    }

    function A(e) {
        o.nodeList(e) || o.array(e) ? Array.from(e).forEach(A) : o.element(e) && o.element(e.parentNode) && e.parentNode.removeChild(e)
    }

    function C(e) {
        for (var t = e.childNodes.length; t > 0;) e.removeChild(e.lastChild), t -= 1
    }

    function E(e, t) {
        return o.element(t) && o.element(t.parentNode) && o.element(e) ? (t.parentNode.replaceChild(e, t), e) : null
    }

    function S(e, t) {
        if (!o.string(e) || o.empty(e)) return {};
        var i = {},
            n = t;
        return e.split(",").forEach(function(e) {
            var t = e.trim(),
                a = t.replace(".", ""),
                s = t.replace(/[[\]]/g, "").split("="),
                r = s[0],
                l = s.length > 1 ? s[1].replace(/["']/g, "") : "";
            switch (t.charAt(0)) {
                case ".":
                    o.object(n) && o.string(n.class) && (n.class += " " + a), i.class = a;
                    break;
                case "#":
                    i.id = t.replace("#", "");
                    break;
                case "[":
                    i[r] = l
            }
        }), i
    }

    function P(e, t) {
        if (o.element(e)) {
            var i = t;
            o.boolean(i) || (i = !e.hasAttribute("hidden")), i ? e.setAttribute("hidden", "") : e.removeAttribute("hidden")
        }
    }

    function N(e, t, i) {
        if (o.element(e)) {
            var n = "toggle";
            return void 0 !== i && (n = i ? "add" : "remove"), e.classList[n](t), e.classList.contains(t)
        }
        return null
    }

    function L(e, t) {
        return o.element(e) && e.classList.contains(t)
    }

    function M(e, t) {
        var i = {
            Element: Element
        };
        return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function() {
            return Array.from(document.querySelectorAll(t)).includes(this)
        }).call(e, t)
    }

    function x(e) {
        return this.elements.container.querySelectorAll(e)
    }

    function _(e) {
        return this.elements.container.querySelector(e)
    }

    function q() {
        var e = document.activeElement;
        return e = e && e !== document.body ? document.querySelector(":focus") : null
    }
    var I, O, j, R = (I = document.createElement("span"), O = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
    }, j = Object.keys(O).find(function(e) {
        return void 0 !== I.style[e]
    }), !!o.string(j) && O[j]);
    var H, V = {
            isIE: !!document.documentMode,
            isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
            isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
            isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
        },
        B = {
            "audio/ogg": "vorbis",
            "audio/wav": "1",
            "video/webm": "vp8, vorbis",
            "video/mp4": "avc1.42E01E, mp4a.40.2",
            "video/ogg": "theora"
        },
        D = {
            audio: "canPlayType" in document.createElement("audio"),
            video: "canPlayType" in document.createElement("video"),
            check: function(e, t, i) {
                var n = V.isIPhone && i && D.playsinline,
                    a = D[e] || "html5" !== t;
                return {
                    api: a,
                    ui: a && D.rangeInput && ("video" !== e || !V.isIPhone || n)
                }
            },
            pip: !V.isIPhone && o.function(w("video").webkitSetPresentationMode),
            airplay: o.function(window.WebKitPlaybackTargetAvailabilityEvent),
            playsinline: "playsInline" in document.createElement("video"),
            mime: function(e) {
                var t = e.split("/"),
                    i = v(t, 1)[0];
                if (!this.isHTML5 || i !== this.type) return !1;
                var n = void 0;
                e && e.includes("codecs=") ? n = e : "audio/mpeg" === e ? n = "audio/mpeg;" : e in B && (n = e + '; codecs="' + B[e] + '"');
                try {
                    return Boolean(n && this.media.canPlayType(n).replace(/no/, ""))
                } catch (e) {
                    return !1
                }
            },
            textTracks: "textTracks" in document.createElement("video"),
            rangeInput: (H = document.createElement("input"), H.type = "range", "range" === H.type),
            touch: "ontouchstart" in document.documentElement,
            transitions: !1 !== R,
            reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
        },
        F = {
            getSources: function() {
                var e = this;
                return this.isHTML5 ? Array.from(this.media.querySelectorAll("source")).filter(function(t) {
                    return D.mime.call(e, t.getAttribute("type"))
                }) : []
            },
            getQualityOptions: function() {
                return F.getSources.call(this).map(function(e) {
                    return Number(e.getAttribute("size"))
                }).filter(Boolean)
            },
            extend: function() {
                if (this.isHTML5) {
                    var e = this;
                    Object.defineProperty(e.media, "quality", {
                        get: function() {
                            var t = F.getSources.call(e).find(function(t) {
                                return t.getAttribute("src") === e.source
                            });
                            return t && Number(t.getAttribute("size"))
                        },
                        set: function(t) {
                            var i = F.getSources.call(e).find(function(e) {
                                return Number(e.getAttribute("size")) === t
                            });
                            if (i) {
                                var n = e.media,
                                    a = n.currentTime,
                                    s = n.paused,
                                    r = n.preload,
                                    l = n.readyState;
                                e.media.src = i.getAttribute("src"), ("none" !== r || l) && (e.once("loadedmetadata", function() {
                                    e.currentTime = a, s || e.play()
                                }), e.media.load()), m.call(e, e.media, "qualitychange", !1, {
                                    quality: t
                                })
                            }
                        }
                    })
                }
            },
            cancelRequests: function() {
                this.isHTML5 && (A(F.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
            }
        };

    function U(e, t) {
        return t.split(".").reduce(function(e, t) {
            return e && e[t]
        }, e)
    }

    function z() {
        for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
        if (!i.length) return e;
        var a = i.shift();
        return o.object(a) ? (Object.keys(a).forEach(function(t) {
            o.object(a[t]) ? (Object.keys(e).includes(t) || Object.assign(e, y({}, t, {})), z(e[t], a[t])) : Object.assign(e, y({}, t, a[t]))
        }), z.apply(void 0, [e].concat(i))) : e
    }

    function W(e) {
        for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
        return o.empty(e) ? e : e.toString().replace(/{(\d+)}/g, function(e, t) {
            return i[t].toString()
        })
    }

    function K() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
        return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString())
    }

    function Y() {
        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/\w\S*/g, function(e) {
            return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
        })
    }

    function Q() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
        return (e = function() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
            return e = K(e, "-", " "), e = K(e, "_", " "), K(e = Y(e), " ", "")
        }(e)).charAt(0).toLowerCase() + e.slice(1)
    }

    function J(e) {
        var t = document.createElement("div");
        return t.appendChild(e), t.innerHTML
    }
    var $ = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (o.empty(e) || o.empty(t)) return "";
        var i = U(t.i18n, e);
        if (o.empty(i)) return "";
        var n = {
            "{seektime}": t.seekTime,
            "{title}": t.title
        };
        return Object.entries(n).forEach(function(e) {
            var t = v(e, 2),
                n = t[0],
                a = t[1];
            i = K(i, n, a)
        }), i
    };

    function G(e) {
        return o.array(e) ? e.filter(function(t, i) {
            return e.indexOf(t) === i
        }) : e
    }
    var X = function() {
        function e(t) {
            f(this, e), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
        }
        return g(e, [{
            key: "get",
            value: function(t) {
                if (!e.supported || !this.enabled) return null;
                var i = window.localStorage.getItem(this.key);
                if (o.empty(i)) return null;
                var n = JSON.parse(i);
                return o.string(t) && t.length ? n[t] : n
            }
        }, {
            key: "set",
            value: function(t) {
                if (e.supported && this.enabled && o.object(t)) {
                    var i = this.get();
                    o.empty(i) && (i = {}), z(i, t), window.localStorage.setItem(this.key, JSON.stringify(i))
                }
            }
        }], [{
            key: "supported",
            get: function() {
                try {
                    if (!("localStorage" in window)) return !1;
                    return window.localStorage.setItem("___test", "___test"), window.localStorage.removeItem("___test"), !0
                } catch (e) {
                    return !1
                }
            }
        }]), e
    }();

    function Z(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
        return new Promise(function(i, n) {
            try {
                var a = new XMLHttpRequest;
                if (!("withCredentials" in a)) return;
                a.addEventListener("load", function() {
                    if ("text" === t) try {
                        i(JSON.parse(a.responseText))
                    } catch (e) {
                        i(a.responseText)
                    } else i(a.response)
                }), a.addEventListener("error", function() {
                    throw new Error(a.status)
                }), a.open("GET", e, !0), a.responseType = t, a.send()
            } catch (e) {
                n(e)
            }
        })
    }

    function ee(e, t) {
        if (o.string(e)) {
            var i = o.string(t),
                n = function() {
                    return null !== document.getElementById(t)
                },
                a = function(e, t) {
                    e.innerHTML = t, i && n() || document.body.insertAdjacentElement("afterbegin", e)
                };
            if (!i || !n()) {
                var s = X.supported,
                    r = document.createElement("div");
                if (r.setAttribute("hidden", ""), i && r.setAttribute("id", t), s) {
                    var l = window.localStorage.getItem("cache-" + t);
                    if (null !== l) {
                        var c = JSON.parse(l);
                        a(r, c.content)
                    }
                }
                Z(e).then(function(e) {
                    o.empty(e) || (s && window.localStorage.setItem("cache-" + t, JSON.stringify({
                        content: e
                    })), a(r, e))
                }).catch(function() {})
            }
        }
    }
    var te = function(e) {
            return parseInt(e / 60 / 60 % 60, 10)
        },
        ie = function(e) {
            return parseInt(e / 60 % 60, 10)
        },
        ne = function(e) {
            return parseInt(e % 60, 10)
        };

    function ae() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (!o.number(e)) return ae(null, t, i);
        var n = function(e) {
                return ("0" + e).slice(-2)
            },
            a = te(e),
            s = ie(e),
            r = ne(e);
        return t || a > 0 ? a += ":" : a = "", (i && e > 0 ? "-" : "") + a + n(s) + ":" + n(r)
    }
    var se = {
        getIconUrl: function() {
            var e = new URL(this.config.iconUrl, window.location).host !== window.location.host || V.isIE && !window.svg4everybody;
            return {
                url: this.config.iconUrl,
                cors: e
            }
        },
        findElements: function() {
            try {
                return this.elements.controls = _.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                    play: x.call(this, this.config.selectors.buttons.play),
                    pause: _.call(this, this.config.selectors.buttons.pause),
                    restart: _.call(this, this.config.selectors.buttons.restart),
                    rewind: _.call(this, this.config.selectors.buttons.rewind),
                    fastForward: _.call(this, this.config.selectors.buttons.fastForward),
                    mute: _.call(this, this.config.selectors.buttons.mute),
                    pip: _.call(this, this.config.selectors.buttons.pip),
                    airplay: _.call(this, this.config.selectors.buttons.airplay),
                    settings: _.call(this, this.config.selectors.buttons.settings),
                    captions: _.call(this, this.config.selectors.buttons.captions),
                    fullscreen: _.call(this, this.config.selectors.buttons.fullscreen)
                }, this.elements.progress = _.call(this, this.config.selectors.progress), this.elements.inputs = {
                    seek: _.call(this, this.config.selectors.inputs.seek),
                    volume: _.call(this, this.config.selectors.inputs.volume)
                }, this.elements.display = {
                    buffer: _.call(this, this.config.selectors.display.buffer),
                    currentTime: _.call(this, this.config.selectors.display.currentTime),
                    duration: _.call(this, this.config.selectors.display.duration)
                }, o.element(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector("." + this.config.classNames.tooltip)), !0
            } catch (e) {
                return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
            }
        },
        createIcon: function(e, t) {
            var i = se.getIconUrl.call(this),
                n = (i.cors ? "" : i.url) + "#" + this.config.iconPrefix,
                a = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            k(a, z(t, {
                role: "presentation",
                focusable: "false"
            }));
            var s = document.createElementNS("http://www.w3.org/2000/svg", "use"),
                r = n + "-" + e;
            return "href" in s ? s.setAttributeNS("http://www.w3.org/1999/xlink", "href", r) : s.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r), a.appendChild(s), a
        },
        createLabel: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                i = {
                    pip: "PIP",
                    airplay: "AirPlay"
                }[e] || $(e, this.config);
            return w("span", Object.assign({}, t, {
                class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
            }), i)
        },
        createBadge: function(e) {
            if (o.empty(e)) return null;
            var t = w("span", {
                class: this.config.classNames.menu.value
            });
            return t.appendChild(w("span", {
                class: this.config.classNames.menu.badge
            }, e)), t
        },
        createButton: function(e, t) {
            var i = w("button"),
                n = Object.assign({}, t),
                a = Q(e),
                s = !1,
                r = void 0,
                l = void 0,
                c = void 0,
                u = void 0;
            switch ("type" in n || (n.type = "button"), "class" in n ? n.class.includes(this.config.classNames.control) || (n.class += " " + this.config.classNames.control) : n.class = this.config.classNames.control, e) {
                case "play":
                    s = !0, r = "play", c = "pause", l = "play", u = "pause";
                    break;
                case "mute":
                    s = !0, r = "mute", c = "unmute", l = "volume", u = "muted";
                    break;
                case "captions":
                    s = !0, r = "enableCaptions", c = "disableCaptions", l = "captions-off", u = "captions-on";
                    break;
                case "fullscreen":
                    s = !0, r = "enterFullscreen", c = "exitFullscreen", l = "enter-fullscreen", u = "exit-fullscreen";
                    break;
                case "play-large":
                    n.class += " " + this.config.classNames.control + "--overlaid", a = "play", r = "play", l = "play";
                    break;
                default:
                    r = a, l = e
            }
            s ? (i.appendChild(se.createIcon.call(this, u, {
                class: "icon--pressed"
            })), i.appendChild(se.createIcon.call(this, l, {
                class: "icon--not-pressed"
            })), i.appendChild(se.createLabel.call(this, c, {
                class: "label--pressed"
            })), i.appendChild(se.createLabel.call(this, r, {
                class: "label--not-pressed"
            }))) : (i.appendChild(se.createIcon.call(this, l)), i.appendChild(se.createLabel.call(this, r))), z(n, S(this.config.selectors.buttons[a], n)), k(i, n), "play" === a ? (o.array(this.elements.buttons[a]) || (this.elements.buttons[a] = []), this.elements.buttons[a].push(i)) : this.elements.buttons[a] = i;
            var d = this.config.classNames.controlPressed;
            return Object.defineProperty(i, "pressed", {
                enumerable: !0,
                get: function() {
                    return L(i, d)
                },
                set: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    N(i, d, e)
                }
            }), i
        },
        createRange: function(e, t) {
            var i = w("input", z(S(this.config.selectors.inputs[e]), {
                type: "range",
                min: 0,
                max: 100,
                step: .01,
                value: 0,
                autocomplete: "off",
                role: "slider",
                "aria-label": $(e, this.config),
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": 0
            }, t));
            return this.elements.inputs[e] = i, se.updateRangeFill.call(this, i), i
        },
        createProgress: function(e, t) {
            var i = w("progress", z(S(this.config.selectors.display[e]), {
                min: 0,
                max: 100,
                value: 0,
                role: "presentation",
                "aria-hidden": !0
            }, t));
            if ("volume" !== e) {
                i.appendChild(w("span", null, "0"));
                var n = {
                        played: "played",
                        buffer: "buffered"
                    }[e],
                    a = n ? $(n, this.config) : "";
                i.innerText = "% " + a.toLowerCase()
            }
            return this.elements.display[e] = i, i
        },
        createTime: function(e) {
            var t = S(this.config.selectors.display[e]),
                i = w("div", z(t, {
                    class: "plyr__time " + t.class,
                    "aria-label": $(e, this.config)
                }), "00:00");
            return this.elements.display[e] = i, i
        },
        createMenuItem: function(e) {
            var t = e.value,
                i = e.list,
                n = e.type,
                a = e.title,
                s = e.badge,
                r = void 0 === s ? null : s,
                l = e.checked,
                c = void 0 !== l && l,
                u = w("li"),
                d = w("label", {
                    class: this.config.classNames.control
                }),
                p = w("input", z(S(this.config.selectors.inputs[n]), {
                    type: "radio",
                    name: "plyr-" + n,
                    value: t,
                    checked: c,
                    class: "plyr__sr-only"
                })),
                h = w("span", {
                    hidden: ""
                });
            d.appendChild(p), d.appendChild(h), d.insertAdjacentHTML("beforeend", a), o.element(r) && d.appendChild(r), u.appendChild(d), i.appendChild(u)
        },
        formatTime: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return o.number(e) ? ae(e, te(this.duration) > 0, t) : e
        },
        updateTimeDisplay: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            o.element(e) && o.number(t) && (e.innerText = se.formatTime(t, i))
        },
        updateVolume: function() {
            this.supported.ui && (o.element(this.elements.inputs.volume) && se.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), o.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume))
        },
        setRange: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            o.element(e) && (e.value = t, se.updateRangeFill.call(this, e))
        },
        updateProgress: function(e) {
            var t = this;
            if (this.supported.ui && o.event(e)) {
                var i, n, a = 0;
                if (e) switch (e.type) {
                    case "timeupdate":
                    case "seeking":
                    case "seeked":
                        i = this.currentTime, n = this.duration, a = 0 === i || 0 === n || Number.isNaN(i) || Number.isNaN(n) ? 0 : (i / n * 100).toFixed(2), "timeupdate" === e.type && se.setRange.call(this, this.elements.inputs.seek, a);
                        break;
                    case "playing":
                    case "progress":
                        ! function(e, i) {
                            var n = o.number(i) ? i : 0,
                                a = o.element(e) ? e : t.elements.display.buffer;
                            if (o.element(a)) {
                                a.value = n;
                                var s = a.getElementsByTagName("span")[0];
                                o.element(s) && (s.childNodes[0].nodeValue = n)
                            }
                        }(this.elements.display.buffer, 100 * this.buffered)
                }
            }
        },
        updateRangeFill: function(e) {
            var t = o.event(e) ? e.target : e;
            if (o.element(t) && "range" === t.getAttribute("type")) {
                if (M(t, this.config.selectors.inputs.seek)) {
                    t.setAttribute("aria-valuenow", this.currentTime);
                    var i = se.formatTime(this.currentTime),
                        n = se.formatTime(this.duration),
                        a = $("seekLabel", this.config);
                    t.setAttribute("aria-valuetext", a.replace("{currentTime}", i).replace("{duration}", n))
                } else if (M(t, this.config.selectors.inputs.volume)) {
                    var s = 100 * t.value;
                    t.setAttribute("aria-valuenow", s), t.setAttribute("aria-valuetext", s + "%")
                } else t.setAttribute("aria-valuenow", t.value);
                V.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%")
            }
        },
        updateSeekTooltip: function(e) {
            var t = this;
            if (this.config.tooltips.seek && o.element(this.elements.inputs.seek) && o.element(this.elements.display.seekTooltip) && 0 !== this.duration) {
                var i = 0,
                    n = this.elements.progress.getBoundingClientRect(),
                    a = this.config.classNames.tooltip + "--visible",
                    s = function(e) {
                        N(t.elements.display.seekTooltip, a, e)
                    };
                if (this.touch) s(!1);
                else {
                    if (o.event(e)) i = 100 / n.width * (e.pageX - n.left);
                    else {
                        if (!L(this.elements.display.seekTooltip, a)) return;
                        i = parseFloat(this.elements.display.seekTooltip.style.left, 10)
                    }
                    i < 0 ? i = 0 : i > 100 && (i = 100), se.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * i), this.elements.display.seekTooltip.style.left = i + "%", o.event(e) && ["mouseenter", "mouseleave"].includes(e.type) && s("mouseenter" === e.type)
                }
            }
        },
        timeUpdate: function(e) {
            var t = !o.element(this.elements.display.duration) && this.config.invertTime;
            se.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || se.updateProgress.call(this, e)
        },
        durationUpdate: function() {
            if (this.supported.ui && (this.config.invertTime || !this.currentTime)) {
                if (this.duration >= Math.pow(2, 32)) return P(this.elements.display.currentTime, !0), void P(this.elements.progress, !0);
                o.element(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
                var e = o.element(this.elements.display.duration);
                !e && this.config.displayDuration && this.paused && se.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && se.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), se.updateSeekTooltip.call(this)
            }
        },
        toggleTab: function(e, t) {
            P(this.elements.settings.tabs[e], !t)
        },
        setQualityMenu: function(e) {
            var t = this;
            if (o.element(this.elements.settings.panes.quality)) {
                var i = this.elements.settings.panes.quality.querySelector("ul");
                o.array(e) && (this.options.quality = G(e).filter(function(e) {
                    return t.config.quality.options.includes(e)
                }));
                var n = !o.empty(this.options.quality) && this.options.quality.length > 1;
                if (se.toggleTab.call(this, "quality", n), se.checkMenu.call(this), n) {
                    C(i);
                    this.options.quality.sort(function(e, i) {
                        var n = t.config.quality.options;
                        return n.indexOf(e) > n.indexOf(i) ? 1 : -1
                    }).forEach(function(e) {
                        se.createMenuItem.call(t, {
                            value: e,
                            list: i,
                            type: "quality",
                            title: se.getLabel.call(t, "quality", e),
                            badge: function(e) {
                                var i = $("qualityBadge." + e, t.config);
                                return i.length ? se.createBadge.call(t, i) : null
                            }(e)
                        })
                    }), se.updateSetting.call(this, "quality", i)
                }
            }
        },
        getLabel: function(e, t) {
            switch (e) {
                case "speed":
                    return 1 === t ? $("normal", this.config) : t + "&times;";
                case "quality":
                    if (o.number(t)) {
                        var i = $("qualityLabel." + t, this.config);
                        return i.length ? i : t + "p"
                    }
                    return Y(t);
                case "captions":
                    return oe.getLabel.call(this);
                default:
                    return null
            }
        },
        updateSetting: function(e, t, i) {
            var n = this.elements.settings.panes[e],
                a = null,
                s = t;
            if ("captions" === e) a = this.currentTrack;
            else {
                if (a = o.empty(i) ? this[e] : i, o.empty(a) && (a = this.config[e].default), !o.empty(this.options[e]) && !this.options[e].includes(a)) return void this.debug.warn("Unsupported value of '" + a + "' for " + e);
                if (!this.config[e].options.includes(a)) return void this.debug.warn("Disabled value of '" + a + "' for " + e)
            }
            if (o.element(s) || (s = n && n.querySelector("ul")), o.element(s)) {
                this.elements.settings.tabs[e].querySelector("." + this.config.classNames.menu.value).innerHTML = se.getLabel.call(this, e, a);
                var r = s && s.querySelector('input[value="' + a + '"]');
                o.element(r) && (r.checked = !0)
            }
        },
        setCaptionsMenu: function() {
            var e = this,
                t = this.elements.settings.panes.captions.querySelector("ul"),
                i = oe.getTracks.call(this);
            if (se.toggleTab.call(this, "captions", i.length), C(t), se.checkMenu.call(this), i.length) {
                var n = i.map(function(i, n) {
                    return {
                        value: n,
                        checked: e.captions.toggled && e.currentTrack === n,
                        title: oe.getLabel.call(e, i),
                        badge: i.language && se.createBadge.call(e, i.language.toUpperCase()),
                        list: t,
                        type: "language"
                    }
                });
                n.unshift({
                    value: -1,
                    checked: !this.captions.toggled,
                    title: $("disabled", this.config),
                    list: t,
                    type: "language"
                }), n.forEach(se.createMenuItem.bind(this)), se.updateSetting.call(this, "captions", t)
            }
        },
        setSpeedMenu: function(e) {
            var t = this;
            if (this.config.controls.includes("settings") && this.config.settings.includes("speed") && o.element(this.elements.settings.panes.speed)) {
                o.array(e) ? this.options.speed = e : (this.isHTML5 || this.isVimeo) && (this.options.speed = [.5, .75, 1, 1.25, 1.5, 1.75, 2]), this.options.speed = this.options.speed.filter(function(e) {
                    return t.config.speed.options.includes(e)
                });
                var i = !o.empty(this.options.speed) && this.options.speed.length > 1;
                if (se.toggleTab.call(this, "speed", i), se.checkMenu.call(this), i) {
                    var n = this.elements.settings.panes.speed.querySelector("ul");
                    C(n), this.options.speed.forEach(function(e) {
                        se.createMenuItem.call(t, {
                            value: e,
                            list: n,
                            type: "speed",
                            title: se.getLabel.call(t, "speed", e)
                        })
                    }), se.updateSetting.call(this, "speed", n)
                }
            }
        },
        checkMenu: function() {
            var e = this.elements.settings.tabs,
                t = !o.empty(e) && Object.values(e).some(function(e) {
                    return !e.hidden
                });
            P(this.elements.settings.menu, !t)
        },
        toggleMenu: function(e) {
            var t = this.elements.settings.form,
                i = this.elements.buttons.settings;
            if (o.element(t) && o.element(i)) {
                var n = o.boolean(e) ? e : o.element(t) && t.hasAttribute("hidden");
                if (o.event(e)) {
                    var a = o.element(t) && t.contains(e.target),
                        s = e.target === this.elements.buttons.settings;
                    if (a || !a && !s && n) return;
                    s && e.stopPropagation()
                }
                o.element(i) && i.setAttribute("aria-expanded", n), o.element(t) && (P(t, !n), N(this.elements.container, this.config.classNames.menu.open, n), n ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", -1))
            }
        },
        getTabSize: function(e) {
            var t = e.cloneNode(!0);
            t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), Array.from(t.querySelectorAll("input[name]")).forEach(function(e) {
                var t = e.getAttribute("name");
                e.setAttribute("name", t + "-clone")
            }), e.parentNode.appendChild(t);
            var i = t.scrollWidth,
                n = t.scrollHeight;
            return A(t), {
                width: i,
                height: n
            }
        },
        showTab: function() {
            var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                i = this.elements.settings.menu,
                n = document.getElementById(t);
            if (o.element(n) && "tabpanel" === n.getAttribute("role")) {
                var a = i.querySelector('[role="tabpanel"]:not([hidden])'),
                    s = a.parentNode;
                if (Array.from(i.querySelectorAll('[aria-controls="' + a.getAttribute("id") + '"]')).forEach(function(e) {
                        e.setAttribute("aria-expanded", !1)
                    }), D.transitions && !D.reducedMotion) {
                    s.style.width = a.scrollWidth + "px", s.style.height = a.scrollHeight + "px";
                    var r = se.getTabSize.call(this, n);
                    d.call(this, s, R, function t(i) {
                        i.target === s && ["width", "height"].includes(i.propertyName) && (s.style.width = "", s.style.height = "", p.call(e, s, R, t))
                    }), s.style.width = r.width + "px", s.style.height = r.height + "px"
                }
                P(a, !0), a.setAttribute("tabindex", -1), P(n, !1);
                var l = x.call(this, '[aria-controls="' + t + '"]');
                Array.from(l).forEach(function(e) {
                    e.setAttribute("aria-expanded", !0)
                }), n.removeAttribute("tabindex"), n.querySelectorAll("button:not(:disabled), input:not(:disabled), [tabindex]")[0].focus()
            }
        },
        create: function(e) {
            var t = this;
            if (o.empty(this.config.controls)) return null;
            var i = w("div", S(this.config.selectors.controls.wrapper));
            if (this.config.controls.includes("restart") && i.appendChild(se.createButton.call(this, "restart")), this.config.controls.includes("rewind") && i.appendChild(se.createButton.call(this, "rewind")), this.config.controls.includes("play") && i.appendChild(se.createButton.call(this, "play")), this.config.controls.includes("fast-forward") && i.appendChild(se.createButton.call(this, "fast-forward")), this.config.controls.includes("progress")) {
                var n = w("div", S(this.config.selectors.progress));
                if (n.appendChild(se.createRange.call(this, "seek", {
                        id: "plyr-seek-" + e.id
                    })), n.appendChild(se.createProgress.call(this, "buffer")), this.config.tooltips.seek) {
                    var a = w("span", {
                        class: this.config.classNames.tooltip
                    }, "00:00");
                    n.appendChild(a), this.elements.display.seekTooltip = a
                }
                this.elements.progress = n, i.appendChild(this.elements.progress)
            }
            if (this.config.controls.includes("current-time") && i.appendChild(se.createTime.call(this, "currentTime")), this.config.controls.includes("duration") && i.appendChild(se.createTime.call(this, "duration")), this.config.controls.includes("mute") && i.appendChild(se.createButton.call(this, "mute")), this.config.controls.includes("volume")) {
                var s = w("div", {
                        class: "plyr__volume"
                    }),
                    r = {
                        max: 1,
                        step: .05,
                        value: this.config.volume
                    };
                s.appendChild(se.createRange.call(this, "volume", z(r, {
                    id: "plyr-volume-" + e.id
                }))), this.elements.volume = s, i.appendChild(s)
            }
            if (this.config.controls.includes("captions") && i.appendChild(se.createButton.call(this, "captions")), this.config.controls.includes("settings") && !o.empty(this.config.settings)) {
                var l = w("div", {
                    class: "plyr__menu",
                    hidden: ""
                });
                l.appendChild(se.createButton.call(this, "settings", {
                    id: "plyr-settings-toggle-" + e.id,
                    "aria-haspopup": !0,
                    "aria-controls": "plyr-settings-" + e.id,
                    "aria-expanded": !1
                }));
                var c = w("form", {
                        class: "plyr__menu__container",
                        id: "plyr-settings-" + e.id,
                        hidden: "",
                        "aria-labelled-by": "plyr-settings-toggle-" + e.id,
                        role: "tablist",
                        tabindex: -1
                    }),
                    u = w("div"),
                    d = w("div", {
                        id: "plyr-settings-" + e.id + "-home",
                        "aria-labelled-by": "plyr-settings-toggle-" + e.id,
                        role: "tabpanel"
                    }),
                    p = w("ul", {
                        role: "tablist"
                    });
                this.config.settings.forEach(function(i) {
                    var n = w("li", {
                            role: "tab",
                            hidden: ""
                        }),
                        a = w("button", z(S(t.config.selectors.buttons.settings), {
                            type: "button",
                            class: t.config.classNames.control + " " + t.config.classNames.control + "--forward",
                            id: "plyr-settings-" + e.id + "-" + i + "-tab",
                            "aria-haspopup": !0,
                            "aria-controls": "plyr-settings-" + e.id + "-" + i,
                            "aria-expanded": !1
                        }), $(i, t.config)),
                        s = w("span", {
                            class: t.config.classNames.menu.value
                        });
                    s.innerHTML = e[i], a.appendChild(s), n.appendChild(a), p.appendChild(n), t.elements.settings.tabs[i] = n
                }), d.appendChild(p), u.appendChild(d), this.config.settings.forEach(function(i) {
                    var n = w("div", {
                            id: "plyr-settings-" + e.id + "-" + i,
                            hidden: "",
                            "aria-labelled-by": "plyr-settings-" + e.id + "-" + i + "-tab",
                            role: "tabpanel",
                            tabindex: -1
                        }),
                        a = w("button", {
                            type: "button",
                            class: t.config.classNames.control + " " + t.config.classNames.control + "--back",
                            "aria-haspopup": !0,
                            "aria-controls": "plyr-settings-" + e.id + "-home",
                            "aria-expanded": !1
                        }, $(i, t.config));
                    n.appendChild(a);
                    var s = w("ul");
                    n.appendChild(s), u.appendChild(n), t.elements.settings.panes[i] = n
                }), c.appendChild(u), l.appendChild(c), i.appendChild(l), this.elements.settings.form = c, this.elements.settings.menu = l
            }
            return this.config.controls.includes("pip") && D.pip && i.appendChild(se.createButton.call(this, "pip")), this.config.controls.includes("airplay") && D.airplay && i.appendChild(se.createButton.call(this, "airplay")), this.config.controls.includes("fullscreen") && i.appendChild(se.createButton.call(this, "fullscreen")), this.config.controls.includes("play-large") && this.elements.container.appendChild(se.createButton.call(this, "play-large")), this.elements.controls = i, this.isHTML5 && se.setQualityMenu.call(this, F.getQualityOptions.call(this)), se.setSpeedMenu.call(this), i
        },
        inject: function() {
            var e = this;
            if (this.config.loadSprite) {
                var t = se.getIconUrl.call(this);
                t.cors && ee(t.url, "sprite-plyr")
            }
            this.id = Math.floor(1e4 * Math.random());
            var i = null;
            this.elements.controls = null;
            var n = {
                    id: this.id,
                    seektime: this.config.seekTime,
                    title: this.config.title
                },
                a = !0;
            o.string(this.config.controls) || o.element(this.config.controls) ? i = this.config.controls : o.function(this.config.controls) ? i = this.config.controls.call(this, n) : (i = se.create.call(this, {
                id: this.id,
                seektime: this.config.seekTime,
                speed: this.speed,
                quality: this.quality,
                captions: oe.getLabel.call(this)
            }), a = !1);
            var s = function(e) {
                var t = e;
                return Object.entries(n).forEach(function(e) {
                    var i = v(e, 2),
                        n = i[0],
                        a = i[1];
                    t = K(t, "{" + n + "}", a)
                }), t
            };
            a && (o.string(this.config.controls) ? i = s(i) : o.element(i) && (i.innerHTML = s(i.innerHTML)));
            var r, l = void 0;
            if (o.string(this.config.selectors.controls.container) && (l = document.querySelector(this.config.selectors.controls.container)), o.element(l) || (l = this.elements.container), o.element(i) ? l.appendChild(i) : i && l.insertAdjacentHTML("beforeend", i), o.element(this.elements.controls) || se.findElements.call(this), window.navigator.userAgent.includes("Edge") && (r = l, setTimeout(function() {
                    P(r, !0), r.offsetHeight, P(r, !1)
                }, 0)), this.config.tooltips.controls) {
                var c = this.config,
                    u = c.classNames,
                    d = c.selectors,
                    p = d.controls.wrapper + " " + d.labels + " ." + u.hidden,
                    h = x.call(this, p);
                Array.from(h).forEach(function(t) {
                    N(t, e.config.classNames.hidden, !1), N(t, e.config.classNames.tooltip, !0)
                })
            }
        }
    };

    function re(e) {
        var t = e;
        if (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) {
            var i = document.createElement("a");
            i.href = t, t = i.href
        }
        try {
            return new URL(t)
        } catch (e) {
            return null
        }
    }

    function le(e) {
        var t = new URLSearchParams;
        return o.object(e) && Object.entries(e).forEach(function(e) {
            var i = v(e, 2),
                n = i[0],
                a = i[1];
            t.set(n, a)
        }), t
    }
    var oe = {
            setup: function() {
                if (this.supported.ui)
                    if (!this.isVideo || this.isYouTube || this.isHTML5 && !D.textTracks) o.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && se.setCaptionsMenu.call(this);
                    else {
                        var e, t;
                        if (o.element(this.elements.captions) || (this.elements.captions = w("div", S(this.config.selectors.captions)), e = this.elements.captions, (t = this.elements.wrapper).parentNode.insertBefore(e, t.nextSibling)), V.isIE && window.URL) {
                            var i = this.media.querySelectorAll("track");
                            Array.from(i).forEach(function(e) {
                                var t = e.getAttribute("src"),
                                    i = re(t);
                                null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && Z(t, "blob").then(function(t) {
                                    e.setAttribute("src", window.URL.createObjectURL(t))
                                }).catch(function() {
                                    A(e)
                                })
                            })
                        }
                        var n = G(Array.from(navigator.languages || navigator.language || navigator.userLanguage).map(function(e) {
                                return e.split("-")[0]
                            })),
                            a = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
                        if ("auto" === a) a = v(n, 1)[0];
                        var s = this.storage.get("captions");
                        if (o.boolean(s) || (s = this.config.captions.active), Object.assign(this.captions, {
                                toggled: !1,
                                active: s,
                                language: a,
                                languages: n
                            }), this.isHTML5) {
                            var r = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                            d.call(this, this.media.textTracks, r, oe.update.bind(this))
                        }
                        setTimeout(oe.update.bind(this), 0)
                    }
            },
            update: function() {
                var e = this,
                    t = oe.getTracks.call(this, !0),
                    i = this.captions,
                    n = i.active,
                    a = i.language,
                    s = i.meta,
                    r = i.currentTrackNode,
                    l = Boolean(t.find(function(e) {
                        return e.language === a
                    }));
                this.isHTML5 && this.isVideo && t.filter(function(e) {
                    return !s.get(e)
                }).forEach(function(t) {
                    e.debug.log("Track added", t), s.set(t, {
                        default: "showing" === t.mode
                    }), t.mode = "hidden", d.call(e, t, "cuechange", function() {
                        return oe.updateCues.call(e)
                    })
                }), (l && this.language !== a || !t.includes(r)) && (oe.setLanguage.call(this, a), oe.toggle.call(this, n && l)), N(this.elements.container, this.config.classNames.captions.enabled, !o.empty(t)), (this.config.controls || []).includes("settings") && this.config.settings.includes("captions") && se.setCaptionsMenu.call(this)
            },
            toggle: function(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (this.supported.ui) {
                    var i = this.captions.toggled,
                        n = this.config.classNames.captions.active,
                        a = o.nullOrUndefined(e) ? !i : e;
                    if (a !== i) {
                        if (t || (this.captions.active = a, this.storage.set({
                                captions: a
                            })), !this.language && a && !t) {
                            var s = oe.getTracks.call(this),
                                r = oe.findTrack.call(this, [this.captions.language].concat(function(e) {
                                    if (Array.isArray(e)) {
                                        for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                                        return i
                                    }
                                    return Array.from(e)
                                }(this.captions.languages)), !0);
                            return this.captions.language = r.language, void oe.set.call(this, s.indexOf(r))
                        }
                        this.elements.buttons.captions && (this.elements.buttons.captions.pressed = a), N(this.elements.container, n, a), this.captions.toggled = a, se.updateSetting.call(this, "captions"), m.call(this, this.media, a ? "captionsenabled" : "captionsdisabled")
                    }
                }
            },
            set: function(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                    i = oe.getTracks.call(this);
                if (-1 !== e)
                    if (o.number(e))
                        if (e in i) {
                            if (this.captions.currentTrack !== e) {
                                this.captions.currentTrack = e;
                                var n = i[e],
                                    a = (n || {}).language;
                                this.captions.currentTrackNode = n, se.updateSetting.call(this, "captions"), t || (this.captions.language = a, this.storage.set({
                                    language: a
                                })), this.isVimeo && this.embed.enableTextTrack(a), m.call(this, this.media, "languagechange")
                            }
                            oe.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && oe.updateCues.call(this)
                        } else this.debug.warn("Track not found", e);
                else this.debug.warn("Invalid caption argument", e);
                else oe.toggle.call(this, !1, t)
            },
            setLanguage: function(e) {
                var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (o.string(e)) {
                    var i = e.toLowerCase();
                    this.captions.language = i;
                    var n = oe.getTracks.call(this),
                        a = oe.findTrack.call(this, [i]);
                    oe.set.call(this, n.indexOf(a), t)
                } else this.debug.warn("Invalid language argument", e)
            },
            getTracks: function() {
                var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return Array.from((this.media || {}).textTracks || []).filter(function(i) {
                    return !e.isHTML5 || t || e.captions.meta.has(i)
                }).filter(function(e) {
                    return ["captions", "subtitles"].includes(e.kind)
                })
            },
            findTrack: function(e) {
                var t = this,
                    i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    n = oe.getTracks.call(this),
                    a = function(e) {
                        return Number((t.captions.meta.get(e) || {}).default)
                    },
                    s = Array.from(n).sort(function(e, t) {
                        return a(t) - a(e)
                    }),
                    r = void 0;
                return e.every(function(e) {
                    return !(r = s.find(function(t) {
                        return t.language === e
                    }))
                }), r || (i ? s[0] : void 0)
            },
            getCurrentTrack: function() {
                return oe.getTracks.call(this)[this.currentTrack]
            },
            getLabel: function(e) {
                var t = e;
                return !o.track(t) && D.textTracks && this.captions.toggled && (t = oe.getCurrentTrack.call(this)), o.track(t) ? o.empty(t.label) ? o.empty(t.language) ? $("enabled", this.config) : e.language.toUpperCase() : t.label : $("disabled", this.config)
            },
            updateCues: function(e) {
                if (this.supported.ui)
                    if (o.element(this.elements.captions))
                        if (o.nullOrUndefined(e) || Array.isArray(e)) {
                            var t = e;
                            if (!t) {
                                var i = oe.getCurrentTrack.call(this);
                                t = Array.from((i || {}).activeCues || []).map(function(e) {
                                    return e.getCueAsHTML()
                                }).map(J)
                            }
                            var n = t.map(function(e) {
                                return e.trim()
                            }).join("\n");
                            if (n !== this.elements.captions.innerHTML) {
                                C(this.elements.captions);
                                var a = w("span", S(this.config.selectors.caption));
                                a.innerHTML = n, this.elements.captions.appendChild(a), m.call(this, this.media, "cuechange")
                            }
                        } else this.debug.warn("updateCues: Invalid input", e);
                else this.debug.warn("No captions element to render to")
            }
        },
        ce = {
            enabled: !0,
            title: "",
            debug: !1,
            autoplay: !1,
            autopause: !0,
            playsinline: !0,
            seekTime: 10,
            volume: 1,
            muted: !1,
            duration: null,
            displayDuration: !0,
            invertTime: !0,
            toggleInvert: !0,
            ratio: "16:9",
            clickToPlay: !0,
            hideControls: !0,
            resetOnEnd: !1,
            disableContextMenu: !0,
            loadSprite: !0,
            iconPrefix: "plyr",
            iconUrl: "https://cdn.plyr.io/3.3.12/plyr.svg",
            blankVideo: "https://cdn.plyr.io/static/blank.mp4",
            quality: {
                default: 576,
                options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240, "default"]
            },
            loop: {
                active: !1
            },
            speed: {
                selected: 1,
                options: [.5, .75, 1, 1.25, 1.5, 1.75, 2]
            },
            keyboard: {
                focused: !0,
                global: !1
            },
            tooltips: {
                controls: !1,
                seek: !0
            },
            captions: {
                active: !1,
                language: "auto",
                update: !1
            },
            fullscreen: {
                enabled: !0,
                fallback: !0,
                iosNative: !1
            },
            storage: {
                enabled: !0,
                key: "plyr"
            },
            controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
            settings: ["captions", "quality", "speed"],
            i18n: {
                restart: "Restart",
                rewind: "Rewind {seektime}s",
                play: "Play",
                pause: "Pause",
                fastForward: "Forward {seektime}s",
                seek: "Seek",
                seekLabel: "{currentTime} of {duration}",
                played: "Played",
                buffered: "Buffered",
                currentTime: "Current time",
                duration: "Duration",
                volume: "Volume",
                mute: "Mute",
                unmute: "Unmute",
                enableCaptions: "Enable captions",
                disableCaptions: "Disable captions",
                enterFullscreen: "Enter fullscreen",
                exitFullscreen: "Exit fullscreen",
                frameTitle: "Player for {title}",
                captions: "Captions",
                settings: "Settings",
                menuBack: "Go back to previous menu",
                speed: "Speed",
                normal: "Normal",
                quality: "Quality",
                loop: "Loop",
                start: "Start",
                end: "End",
                all: "All",
                reset: "Reset",
                disabled: "Disabled",
                enabled: "Enabled",
                advertisement: "Ad",
                qualityBadge: {
                    2160: "4K",
                    1440: "HD",
                    1080: "HD",
                    720: "HD",
                    576: "SD",
                    480: "SD"
                }
            },
            urls: {
                vimeo: {
                    sdk: "https://player.vimeo.com/api/player.js",
                    iframe: "https://player.vimeo.com/video/{0}?{1}",
                    api: "https://vimeo.com/api/v2/video/{0}.json"
                },
                youtube: {
                    sdk: "https://www.youtube.com/iframe_api",
                    api: "https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet"
                },
                googleIMA: {
                    sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
                }
            },
            listeners: {
                seek: null,
                play: null,
                pause: null,
                restart: null,
                rewind: null,
                fastForward: null,
                mute: null,
                volume: null,
                captions: null,
                fullscreen: null,
                pip: null,
                airplay: null,
                speed: null,
                quality: null,
                loop: null,
                language: null
            },
            events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "qualityrequested", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
            selectors: {
                editable: "input, textarea, select, [contenteditable]",
                container: ".plyr",
                controls: {
                    container: null,
                    wrapper: ".plyr__controls"
                },
                labels: "[data-plyr]",
                buttons: {
                    play: '[data-plyr="play"]',
                    pause: '[data-plyr="pause"]',
                    restart: '[data-plyr="restart"]',
                    rewind: '[data-plyr="rewind"]',
                    fastForward: '[data-plyr="fast-forward"]',
                    mute: '[data-plyr="mute"]',
                    captions: '[data-plyr="captions"]',
                    fullscreen: '[data-plyr="fullscreen"]',
                    pip: '[data-plyr="pip"]',
                    airplay: '[data-plyr="airplay"]',
                    settings: '[data-plyr="settings"]',
                    loop: '[data-plyr="loop"]'
                },
                inputs: {
                    seek: '[data-plyr="seek"]',
                    volume: '[data-plyr="volume"]',
                    speed: '[data-plyr="speed"]',
                    language: '[data-plyr="language"]',
                    quality: '[data-plyr="quality"]'
                },
                display: {
                    currentTime: ".plyr__time--current",
                    duration: ".plyr__time--duration",
                    buffer: ".plyr__progress__buffer",
                    loop: ".plyr__progress__loop",
                    volume: ".plyr__volume--display"
                },
                progress: ".plyr__progress",
                captions: ".plyr__captions",
                caption: ".plyr__caption",
                menu: {
                    quality: ".js-plyr__menu__list--quality"
                }
            },
            classNames: {
                type: "plyr--{0}",
                provider: "plyr--{0}",
                video: "plyr__video-wrapper",
                embed: "plyr__video-embed",
                embedContainer: "plyr__video-embed__container",
                poster: "plyr__poster",
                posterEnabled: "plyr__poster-enabled",
                ads: "plyr__ads",
                control: "plyr__control",
                controlPressed: "plyr__control--pressed",
                playing: "plyr--playing",
                paused: "plyr--paused",
                stopped: "plyr--stopped",
                loading: "plyr--loading",
                hover: "plyr--hover",
                tooltip: "plyr__tooltip",
                cues: "plyr__cues",
                hidden: "plyr__sr-only",
                hideControls: "plyr--hide-controls",
                isIos: "plyr--is-ios",
                isTouch: "plyr--is-touch",
                uiSupported: "plyr--full-ui",
                noTransition: "plyr--no-transition",
                menu: {
                    value: "plyr__menu__value",
                    badge: "plyr__badge",
                    open: "plyr--menu-open"
                },
                captions: {
                    enabled: "plyr--captions-enabled",
                    active: "plyr--captions-active"
                },
                fullscreen: {
                    enabled: "plyr--fullscreen-enabled",
                    fallback: "plyr--fullscreen-fallback"
                },
                pip: {
                    supported: "plyr--pip-supported",
                    active: "plyr--pip-active"
                },
                airplay: {
                    supported: "plyr--airplay-supported",
                    active: "plyr--airplay-active"
                },
                tabFocus: "plyr__tab-focus"
            },
            attributes: {
                embed: {
                    provider: "data-plyr-provider",
                    id: "data-plyr-embed-id"
                }
            },
            keys: {
                google: null
            },
            ads: {
                enabled: !1,
                publisherId: ""
            }
        },
        ue = {
            html5: "html5",
            youtube: "youtube",
            vimeo: "vimeo"
        },
        de = {
            audio: "audio",
            video: "video"
        };
    var pe = function() {},
        he = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                f(this, e), this.enabled = window.console && t, this.enabled && this.log("Debugging enabled")
            }
            return g(e, [{
                key: "log",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.log, console) : pe
                }
            }, {
                key: "warn",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.warn, console) : pe
                }
            }, {
                key: "error",
                get: function() {
                    return this.enabled ? Function.prototype.bind.call(console.error, console) : pe
                }
            }]), e
        }();

    function me() {
        if (this.enabled) {
            var e = this.player.elements.buttons.fullscreen;
            o.element(e) && (e.pressed = this.active), m.call(this.player, this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0), V.isIos || function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (o.element(e)) {
                    var i = x.call(this, "button:not(:disabled), input:not(:disabled), [tabindex]"),
                        n = i[0],
                        a = i[i.length - 1];
                    u.call(this, this.elements.container, "keydown", function(e) {
                        if ("Tab" === e.key && 9 === e.keyCode) {
                            var t = q();
                            t !== a || e.shiftKey ? t === n && e.shiftKey && (a.focus(), e.preventDefault()) : (n.focus(), e.preventDefault())
                        }
                    }, t, !1)
                }
            }.call(this.player, this.target, this.active)
        }
    }

    function fe() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        e ? this.scrollPosition = {
            x: window.scrollX || 0,
            y: window.scrollY || 0
        } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", N(this.target, this.player.config.classNames.fullscreen.fallback, e), me.call(this)
    }
    var ge = function() {
        function e(t) {
            var i = this;
            f(this, e), this.player = t, this.prefix = e.prefix, this.property = e.property, this.scrollPosition = {
                x: 0,
                y: 0
            }, d.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : this.prefix + "fullscreenchange", function() {
                me.call(i)
            }), d.call(this.player, this.player.elements.container, "dblclick", function(e) {
                o.element(i.player.elements.controls) && i.player.elements.controls.contains(e.target) || i.toggle()
            }), this.update()
        }
        return g(e, [{
            key: "update",
            value: function() {
                this.enabled ? this.player.debug.log((e.native ? "Native" : "Fallback") + " fullscreen enabled") : this.player.debug.log("Fullscreen not supported and fallback disabled"), N(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
            }
        }, {
            key: "enter",
            value: function() {
                this.enabled && (V.isIos && this.player.config.fullscreen.iosNative ? this.player.playing && this.target.webkitEnterFullscreen() : e.native ? this.prefix ? o.empty(this.prefix) || this.target[this.prefix + "Request" + this.property]() : this.target.requestFullscreen() : fe.call(this, !0))
            }
        }, {
            key: "exit",
            value: function() {
                if (this.enabled)
                    if (V.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), this.player.play();
                    else if (e.native)
                    if (this.prefix) {
                        if (!o.empty(this.prefix)) {
                            var t = "moz" === this.prefix ? "Cancel" : "Exit";
                            document["" + this.prefix + t + this.property]()
                        }
                    } else(document.cancelFullScreen || document.exitFullscreen).call(document);
                else fe.call(this, !1)
            }
        }, {
            key: "toggle",
            value: function() {
                this.active ? this.exit() : this.enter()
            }
        }, {
            key: "enabled",
            get: function() {
                return (e.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
            }
        }, {
            key: "active",
            get: function() {
                return !!this.enabled && (e.native ? (this.prefix ? document["" + this.prefix + this.property + "Element"] : document.fullscreenElement) === this.target : L(this.target, this.player.config.classNames.fullscreen.fallback))
            }
        }, {
            key: "target",
            get: function() {
                return V.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container
            }
        }], [{
            key: "native",
            get: function() {
                return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
            }
        }, {
            key: "prefix",
            get: function() {
                if (o.function(document.exitFullscreen)) return "";
                var e = "";
                return ["webkit", "moz", "ms"].some(function(t) {
                    return !(!o.function(document[t + "ExitFullscreen"]) && !o.function(document[t + "CancelFullScreen"])) && (e = t, !0)
                }), e
            }
        }, {
            key: "property",
            get: function() {
                return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
            }
        }]), e
    }();

    function ye(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return new Promise(function(i, n) {
            var a = new Image,
                s = function() {
                    delete a.onload, delete a.onerror, (a.naturalWidth >= t ? i : n)(a)
                };
            Object.assign(a, {
                onload: s,
                onerror: s,
                src: e
            })
        })
    }
    var ve = {
            addStyleHook: function() {
                N(this.elements.container, this.config.selectors.container.replace(".", ""), !0), N(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
            },
            toggleNativeControls: function() {
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
            },
            build: function() {
                var e = this;
                if (this.listeners.media(), !this.supported.ui) return this.debug.warn("Basic support only for " + this.provider + " " + this.type), void ve.toggleNativeControls.call(this, !0);
                o.element(this.elements.controls) || (se.inject.call(this), this.listeners.controls()), ve.toggleNativeControls.call(this), this.isHTML5 && oe.setup.call(this), this.volume = null, this.muted = null, this.speed = null, this.loop = null, this.quality = null, se.updateVolume.call(this), se.timeUpdate.call(this), ve.checkPlaying.call(this), N(this.elements.container, this.config.classNames.pip.supported, D.pip && this.isHTML5 && this.isVideo), N(this.elements.container, this.config.classNames.airplay.supported, D.airplay && this.isHTML5), N(this.elements.container, this.config.classNames.isIos, V.isIos), N(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout(function() {
                    m.call(e, e.media, "ready")
                }, 0), ve.setTitle.call(this), this.poster && ve.setPoster.call(this, this.poster, !1).catch(function() {}), this.config.duration && se.durationUpdate.call(this)
            },
            setTitle: function() {
                var e = $("play", this.config);
                if (o.string(this.config.title) && !o.empty(this.config.title) && (e += ", " + this.config.title), Array.from(this.elements.buttons.play || []).forEach(function(t) {
                        t.setAttribute("aria-label", e)
                    }), this.isEmbed) {
                    var t = _.call(this, "iframe");
                    if (!o.element(t)) return;
                    var i = o.empty(this.config.title) ? "video" : this.config.title,
                        n = $("frameTitle", this.config);
                    t.setAttribute("title", n.replace("{title}", i))
                }
            },
            togglePoster: function(e) {
                N(this.elements.container, this.config.classNames.posterEnabled, e)
            },
            setPoster: function(e) {
                var t = this;
                return arguments.length > 1 && void 0 !== arguments[1] && !arguments[1] || !this.poster ? (this.media.setAttribute("poster", e), function() {
                    var e = this;
                    return new Promise(function(t) {
                        return e.ready ? setTimeout(t, 0) : d.call(e, e.elements.container, "ready", t)
                    }).then(function() {})
                }.call(this).then(function() {
                    return ye(e)
                }).catch(function(i) {
                    throw e === t.poster && ve.togglePoster.call(t, !1), i
                }).then(function() {
                    if (e !== t.poster) throw new Error("setPoster cancelled by later call to setPoster")
                }).then(function() {
                    return Object.assign(t.elements.poster.style, {
                        backgroundImage: "url('" + e + "')",
                        backgroundSize: ""
                    }), ve.togglePoster.call(t, !0), e
                })) : Promise.reject(new Error("Poster already set"))
            },
            checkPlaying: function(e) {
                var t = this;
                N(this.elements.container, this.config.classNames.playing, this.playing), N(this.elements.container, this.config.classNames.paused, this.paused), N(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach(function(e) {
                    e.pressed = t.playing
                }), o.event(e) && "timeupdate" === e.type || ve.toggleControls.call(this)
            },
            checkLoading: function(e) {
                var t = this;
                this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout(function() {
                    N(t.elements.container, t.config.classNames.loading, t.loading), ve.toggleControls.call(t)
                }, this.loading ? 250 : 0)
            },
            toggleControls: function(e) {
                var t = this.elements.controls;
                t && this.config.hideControls && this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover))
            }
        },
        be = function() {
            function e(t) {
                f(this, e), this.player = t, this.lastKey = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.firstTouch = this.firstTouch.bind(this)
            }
            return g(e, [{
                key: "handleKey",
                value: function(e) {
                    var t = this,
                        i = e.keyCode ? e.keyCode : e.which,
                        n = "keydown" === e.type,
                        a = n && i === this.lastKey;
                    if (!(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) && o.number(i)) {
                        if (n) {
                            var s = q();
                            if (o.element(s) && s !== this.player.elements.inputs.seek && M(s, this.player.config.selectors.editable)) return;
                            switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(i) && (e.preventDefault(), e.stopPropagation()), i) {
                                case 48:
                                case 49:
                                case 50:
                                case 51:
                                case 52:
                                case 53:
                                case 54:
                                case 55:
                                case 56:
                                case 57:
                                    a || (t.player.currentTime = t.player.duration / 10 * (i - 48));
                                    break;
                                case 32:
                                case 75:
                                    a || this.player.togglePlay();
                                    break;
                                case 38:
                                    this.player.increaseVolume(.1);
                                    break;
                                case 40:
                                    this.player.decreaseVolume(.1);
                                    break;
                                case 77:
                                    a || (this.player.muted = !this.player.muted);
                                    break;
                                case 39:
                                    this.player.forward();
                                    break;
                                case 37:
                                    this.player.rewind();
                                    break;
                                case 70:
                                    this.player.fullscreen.toggle();
                                    break;
                                case 67:
                                    a || this.player.toggleCaptions();
                                    break;
                                case 76:
                                    this.player.loop = !this.player.loop
                            }!this.player.fullscreen.enabled && this.player.fullscreen.active && 27 === i && this.player.fullscreen.toggle(), this.lastKey = i
                        } else this.lastKey = null
                    }
                }
            }, {
                key: "toggleMenu",
                value: function(e) {
                    se.toggleMenu.call(this.player, e)
                }
            }, {
                key: "firstTouch",
                value: function() {
                    this.player.touch = !0, N(this.player.elements.container, this.player.config.classNames.isTouch, !0)
                }
            }, {
                key: "global",
                value: function() {
                    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                    this.player.config.keyboard.global && u.call(this.player, window, "keydown keyup", this.handleKey, e, !1), u.call(this.player, document.body, "click", this.toggleMenu, e), h.call(this.player, document.body, "touchstart", this.firstTouch)
                }
            }, {
                key: "container",
                value: function() {
                    var e = this;
                    !this.player.config.keyboard.global && this.player.config.keyboard.focused && d.call(this.player, this.player.elements.container, "keydown keyup", this.handleKey, !1), d.call(this.player, this.player.elements.container, "focusout", function(t) {
                        N(t.target, e.player.config.classNames.tabFocus, !1)
                    }), d.call(this.player, this.player.elements.container, "keydown", function(t) {
                        9 === t.keyCode && setTimeout(function() {
                            N(q(), e.player.config.classNames.tabFocus, !0)
                        }, 0)
                    }), d.call(this.player, this.player.elements.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", function(t) {
                        var i = e.player.elements.controls;
                        "enterfullscreen" === t.type && (i.pressed = !1, i.hover = !1);
                        var n = 0;
                        ["touchstart", "touchmove", "mousemove"].includes(t.type) && (ve.toggleControls.call(e.player, !0), n = e.player.touch ? 3e3 : 2e3), clearTimeout(e.player.timers.controls), e.player.timers.controls = setTimeout(function() {
                            return ve.toggleControls.call(e.player, !1)
                        }, n)
                    })
                }
            }, {
                key: "media",
                value: function() {
                    var e = this;
                    if (d.call(this.player, this.player.media, "timeupdate seeking seeked", function(t) {
                            return se.timeUpdate.call(e.player, t)
                        }), d.call(this.player, this.player.media, "durationchange loadeddata loadedmetadata", function(t) {
                            return se.durationUpdate.call(e.player, t)
                        }), d.call(this.player, this.player.media, "canplay", function() {
                            P(e.player.elements.volume, !e.player.hasAudio), P(e.player.elements.buttons.mute, !e.player.hasAudio)
                        }), d.call(this.player, this.player.media, "ended", function() {
                            e.player.isHTML5 && e.player.isVideo && e.player.config.resetOnEnd && e.player.restart()
                        }), d.call(this.player, this.player.media, "progress playing seeking seeked", function(t) {
                            return se.updateProgress.call(e.player, t)
                        }), d.call(this.player, this.player.media, "volumechange", function(t) {
                            return se.updateVolume.call(e.player, t)
                        }), d.call(this.player, this.player.media, "playing play pause ended emptied timeupdate", function(t) {
                            return ve.checkPlaying.call(e.player, t)
                        }), d.call(this.player, this.player.media, "waiting canplay seeked playing", function(t) {
                            return ve.checkLoading.call(e.player, t)
                        }), d.call(this.player, this.player.media, "playing", function() {
                            e.player.ads && e.player.ads.enabled && !e.player.ads.initialized && e.player.ads.managerPromise.then(function() {
                                return e.player.ads.play()
                            }).catch(function() {
                                return e.player.play()
                            })
                        }), this.player.supported.ui && this.player.config.clickToPlay && !this.player.isAudio) {
                        var t = _.call(this.player, "." + this.player.config.classNames.video);
                        if (!o.element(t)) return;
                        d.call(this.player, t, "click", function() {
                            e.player.config.hideControls && e.player.touch && !e.player.paused || (e.player.paused ? e.player.play() : e.player.ended ? (e.player.restart(), e.player.play()) : e.player.pause())
                        })
                    }
                    this.player.supported.ui && this.player.config.disableContextMenu && d.call(this.player, this.player.elements.wrapper, "contextmenu", function(e) {
                        e.preventDefault()
                    }, !1), d.call(this.player, this.player.media, "volumechange", function() {
                        e.player.storage.set({
                            volume: e.player.volume,
                            muted: e.player.muted
                        })
                    }), d.call(this.player, this.player.media, "ratechange", function() {
                        se.updateSetting.call(e.player, "speed"), e.player.storage.set({
                            speed: e.player.speed
                        })
                    }), d.call(this.player, this.player.media, "qualityrequested", function(t) {
                        e.player.storage.set({
                            quality: t.detail.quality
                        })
                    }), d.call(this.player, this.player.media, "qualitychange", function(t) {
                        se.updateSetting.call(e.player, "quality", null, t.detail.quality)
                    });
                    var i = this.player.config.events.concat(["keyup", "keydown"]).join(" ");
                    d.call(this.player, this.player.media, i, function(t) {
                        var i = t.detail,
                            n = void 0 === i ? {} : i;
                        "error" === t.type && (n = e.player.media.error), m.call(e.player, e.player.elements.container, t.type, !0, n)
                    })
                }
            }, {
                key: "controls",
                value: function() {
                    var e = this,
                        t = V.isIE ? "change" : "input",
                        i = function(t, i, n) {
                            var a = e.player.config.listeners[n],
                                s = !0;
                            o.function(a) && (s = a.call(e.player, t)), s && o.function(i) && i.call(e.player, t)
                        },
                        n = function(t, n, a, s) {
                            var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                                l = e.player.config.listeners[s],
                                c = o.function(l);
                            d.call(e.player, t, n, function(e) {
                                return i(e, a, s)
                            }, r && !c)
                        };
                    this.player.elements.buttons.play && Array.from(this.player.elements.buttons.play).forEach(function(t) {
                        n(t, "click", e.player.togglePlay, "play")
                    }), n(this.player.elements.buttons.restart, "click", this.player.restart, "restart"), n(this.player.elements.buttons.rewind, "click", this.player.rewind, "rewind"), n(this.player.elements.buttons.fastForward, "click", this.player.forward, "fastForward"), n(this.player.elements.buttons.mute, "click", function() {
                        e.player.muted = !e.player.muted
                    }, "mute"), n(this.player.elements.buttons.captions, "click", function() {
                        return e.player.toggleCaptions()
                    }), n(this.player.elements.buttons.fullscreen, "click", function() {
                        e.player.fullscreen.toggle()
                    }, "fullscreen"), n(this.player.elements.buttons.pip, "click", function() {
                        e.player.pip = "toggle"
                    }, "pip"), n(this.player.elements.buttons.airplay, "click", this.player.airplay, "airplay"), n(this.player.elements.buttons.settings, "click", function(t) {
                        se.toggleMenu.call(e.player, t)
                    }), n(this.player.elements.settings.form, "click", function(t) {
                        t.stopPropagation();
                        var n = function() {
                            var t = "plyr-settings-" + e.player.id + "-home";
                            se.showTab.call(e.player, t)
                        };
                        if (M(t.target, e.player.config.selectors.inputs.language)) i(t, function() {
                            e.player.currentTrack = Number(t.target.value), n()
                        }, "language");
                        else if (M(t.target, e.player.config.selectors.inputs.quality)) i(t, function() {
                            e.player.quality = t.target.value, n()
                        }, "quality");
                        else if (M(t.target, e.player.config.selectors.inputs.speed)) i(t, function() {
                            e.player.speed = parseFloat(t.target.value), n()
                        }, "speed");
                        else {
                            var a = t.target;
                            se.showTab.call(e.player, a.getAttribute("aria-controls"))
                        }
                    }), n(this.player.elements.inputs.seek, "mousedown mousemove", function(t) {
                        var i = e.player.elements.progress.getBoundingClientRect(),
                            n = 100 / i.width * (t.pageX - i.left);
                        t.currentTarget.setAttribute("seek-value", n)
                    }), n(this.player.elements.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", function(t) {
                        var i = t.currentTarget,
                            n = t.keyCode ? t.keyCode : t.which,
                            a = t.type;
                        if ("keydown" !== a && "keyup" !== a || 39 === n || 37 === n) {
                            var s = i.hasAttribute("play-on-seeked"),
                                r = ["mouseup", "touchend", "keyup"].includes(t.type);
                            s && r ? (i.removeAttribute("play-on-seeked"), e.player.play()) : !r && e.player.playing && (i.setAttribute("play-on-seeked", ""), e.player.pause())
                        }
                    }), n(this.player.elements.inputs.seek, t, function(t) {
                        var i = t.currentTarget,
                            n = i.getAttribute("seek-value");
                        o.empty(n) && (n = i.value), i.removeAttribute("seek-value"), e.player.currentTime = n / i.max * e.player.duration
                    }, "seek"), this.player.config.toggleInvert && !o.element(this.player.elements.display.duration) && n(this.player.elements.display.currentTime, "click", function() {
                        0 !== e.player.currentTime && (e.player.config.invertTime = !e.player.config.invertTime, se.timeUpdate.call(e.player))
                    }), n(this.player.elements.inputs.volume, t, function(t) {
                        e.player.volume = t.target.value
                    }, "volume"), V.isWebkit && Array.from(x.call(this.player, 'input[type="range"]')).forEach(function(t) {
                        n(t, "input", function(t) {
                            return se.updateRangeFill.call(e.player, t.target)
                        })
                    }), n(this.player.elements.progress, "mouseenter mouseleave mousemove", function(t) {
                        return se.updateSeekTooltip.call(e.player, t)
                    }), n(this.player.elements.controls, "mouseenter mouseleave", function(t) {
                        e.player.elements.controls.hover = !e.player.touch && "mouseenter" === t.type
                    }), n(this.player.elements.controls, "mousedown mouseup touchstart touchend touchcancel", function(t) {
                        e.player.elements.controls.pressed = ["mousedown", "touchstart"].includes(t.type)
                    }), n(this.player.elements.controls, "focusin focusout", function(t) {
                        var i = e.player,
                            n = i.config,
                            a = i.elements,
                            s = i.timers;
                        if (N(a.controls, n.classNames.noTransition, "focusin" === t.type), ve.toggleControls.call(e.player, "focusin" === t.type), "focusin" === t.type) {
                            setTimeout(function() {
                                N(a.controls, n.classNames.noTransition, !1)
                            }, 0);
                            var r = e.touch ? 3e3 : 4e3;
                            clearTimeout(s.controls), s.controls = setTimeout(function() {
                                return ve.toggleControls.call(e.player, !1)
                            }, r)
                        }
                    }), n(this.player.elements.inputs.volume, "wheel", function(t) {
                        var i = t.webkitDirectionInvertedFromDevice,
                            n = [t.deltaX, -t.deltaY].map(function(e) {
                                return i ? -e : e
                            }),
                            a = v(n, 2),
                            s = a[0],
                            r = a[1],
                            l = Math.sign(Math.abs(s) > Math.abs(r) ? s : r);
                        e.player.increaseVolume(l / 50);
                        var o = e.player.media.volume;
                        (1 === l && o < 1 || -1 === l && o > 0) && t.preventDefault()
                    }, "volume", !1)
                }
            }]), e
        }();
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var ke, we = (function(e, t) {
        var i;
        i = function() {
            var e = function() {},
                t = {},
                i = {},
                n = {};

            function a(e, t) {
                if (e) {
                    var a = n[e];
                    if (i[e] = t, a)
                        for (; a.length;) a[0](e, t), a.splice(0, 1)
                }
            }

            function s(t, i) {
                t.call && (t = {
                    success: t
                }), i.length ? (t.error || e)(i) : (t.success || e)(t)
            }

            function r(t, i, n, a) {
                var s, l, o = document,
                    c = n.async,
                    u = (n.numRetries || 0) + 1,
                    d = n.before || e,
                    p = t.replace(/^(css|img)!/, "");
                a = a || 0, /(^css!|\.css$)/.test(t) ? (s = !0, (l = o.createElement("link")).rel = "stylesheet", l.href = p) : /(^img!|\.(png|gif|jpg|svg)$)/.test(t) ? (l = o.createElement("img")).src = p : ((l = o.createElement("script")).src = t, l.async = void 0 === c || c), l.onload = l.onerror = l.onbeforeload = function(e) {
                    var o = e.type[0];
                    if (s && "hideFocus" in l) try {
                        l.sheet.cssText.length || (o = "e")
                    } catch (e) {
                        o = "e"
                    }
                    if ("e" == o && (a += 1) < u) return r(t, i, n, a);
                    i(t, o, e.defaultPrevented)
                }, !1 !== d(t, l) && o.head.appendChild(l)
            }

            function l(e, i, n) {
                var l, o;
                if (i && i.trim && (l = i), o = (l ? n : i) || {}, l) {
                    if (l in t) throw "LoadJS";
                    t[l] = !0
                }! function(e, t, i) {
                    var n, a, s = (e = e.push ? e : [e]).length,
                        l = s,
                        o = [];
                    for (n = function(e, i, n) {
                            if ("e" == i && o.push(e), "b" == i) {
                                if (!n) return;
                                o.push(e)
                            }--s || t(o)
                        }, a = 0; a < l; a++) r(e[a], n, i)
                }(e, function(e) {
                    s(o, e), a(l, e)
                }, o)
            }
            return l.ready = function(e, t) {
                return function(e, t) {
                    e = e.push ? e : [e];
                    var a, s, r, l = [],
                        o = e.length,
                        c = o;
                    for (a = function(e, i) {
                            i.length && l.push(e), --c || t(l)
                        }; o--;) s = e[o], (r = i[s]) ? a(s, r) : (n[s] = n[s] || []).push(a)
                }(e, function(e) {
                    s(t, e)
                }), l
            }, l.done = function(e) {
                a(e, [])
            }, l.reset = function() {
                t = {}, i = {}, n = {}
            }, l.isDefined = function(e) {
                return e in t
            }, l
        }, e.exports = i()
    }(ke = {
        exports: {}
    }, ke.exports), ke.exports);

    function Te(e) {
        return new Promise(function(t, i) {
            we(e, {
                success: t,
                error: i
            })
        })
    }

    function Ae(e) {
        e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, m.call(this, this.media, e ? "play" : "pause"))
    }
    var Ce = {
        setup: function() {
            var e = this;
            N(this.elements.wrapper, this.config.classNames.embed, !0), Ce.setAspectRatio.call(this), o.object(window.Vimeo) ? Ce.ready.call(this) : Te(this.config.urls.vimeo.sdk).then(function() {
                Ce.ready.call(e)
            }).catch(function(t) {
                e.debug.warn("Vimeo API failed to load", t)
            })
        },
        setAspectRatio: function(e) {
            var t = (o.string(e) ? e : this.config.ratio).split(":"),
                i = v(t, 2),
                n = 100 / i[0] * i[1];
            if (this.elements.wrapper.style.paddingBottom = n + "%", this.supported.ui) {
                var a = (240 - n) / 4.8;
                this.media.style.transform = "translateY(-" + a + "%)"
            }
        },
        ready: function() {
            var e = this,
                t = this,
                i = le({
                    loop: t.config.loop.active,
                    autoplay: t.autoplay,
                    byline: !1,
                    portrait: !1,
                    title: !1,
                    speed: !0,
                    transparent: 0,
                    gesture: "media",
                    playsinline: !this.config.fullscreen.iosNative
                }),
                n = t.media.getAttribute("src");
            o.empty(n) && (n = t.media.getAttribute(t.config.attributes.embed.id));
            var a, s = (a = n, o.empty(a) ? null : o.number(Number(a)) ? a : a.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : a),
                r = w("iframe"),
                l = W(t.config.urls.vimeo.iframe, s, i);
            r.setAttribute("src", l), r.setAttribute("allowfullscreen", ""), r.setAttribute("allowtransparency", ""), r.setAttribute("allow", "autoplay");
            var c = w("div", {
                poster: t.poster,
                class: t.config.classNames.embedContainer
            });
            c.appendChild(r), t.media = E(c, t.media), Z(W(t.config.urls.vimeo.api, s), "json").then(function(e) {
                if (!o.empty(e)) {
                    var i = new URL(e[0].thumbnail_large);
                    i.pathname = i.pathname.split("_")[0] + ".jpg", ve.setPoster.call(t, i.href).catch(function() {})
                }
            }), t.embed = new window.Vimeo.Player(r, {
                autopause: t.config.autopause,
                muted: t.muted
            }), t.media.paused = !0, t.media.currentTime = 0, t.supported.ui && t.embed.disableTextTrack(), t.media.play = function() {
                return Ae.call(t, !0), t.embed.play()
            }, t.media.pause = function() {
                return Ae.call(t, !1), t.embed.pause()
            }, t.media.stop = function() {
                t.pause(), t.currentTime = 0
            };
            var u = t.media.currentTime;
            Object.defineProperty(t.media, "currentTime", {
                get: function() {
                    return u
                },
                set: function(e) {
                    var i = t.embed,
                        n = t.media,
                        a = t.paused,
                        s = t.volume,
                        r = a && !i.hasPlayed;
                    n.seeking = !0, m.call(t, n, "seeking"), Promise.resolve(r && i.setVolume(0)).then(function() {
                        return i.setCurrentTime(e)
                    }).then(function() {
                        return r && i.pause()
                    }).then(function() {
                        return r && i.setVolume(s)
                    }).catch(function() {})
                }
            });
            var d = t.config.speed.selected;
            Object.defineProperty(t.media, "playbackRate", {
                get: function() {
                    return d
                },
                set: function(e) {
                    t.embed.setPlaybackRate(e).then(function() {
                        d = e, m.call(t, t.media, "ratechange")
                    }).catch(function(e) {
                        "Error" === e.name && se.setSpeedMenu.call(t, [])
                    })
                }
            });
            var p = t.config.volume;
            Object.defineProperty(t.media, "volume", {
                get: function() {
                    return p
                },
                set: function(e) {
                    t.embed.setVolume(e).then(function() {
                        p = e, m.call(t, t.media, "volumechange")
                    })
                }
            });
            var h = t.config.muted;
            Object.defineProperty(t.media, "muted", {
                get: function() {
                    return h
                },
                set: function(e) {
                    var i = !!o.boolean(e) && e;
                    t.embed.setVolume(i ? 0 : t.config.volume).then(function() {
                        h = i, m.call(t, t.media, "volumechange")
                    })
                }
            });
            var f = t.config.loop;
            Object.defineProperty(t.media, "loop", {
                get: function() {
                    return f
                },
                set: function(e) {
                    var i = o.boolean(e) ? e : t.config.loop.active;
                    t.embed.setLoop(i).then(function() {
                        f = i
                    })
                }
            });
            var g = void 0;
            t.embed.getVideoUrl().then(function(e) {
                g = e
            }).catch(function(t) {
                e.debug.warn(t)
            }), Object.defineProperty(t.media, "currentSrc", {
                get: function() {
                    return g
                }
            }), Object.defineProperty(t.media, "ended", {
                get: function() {
                    return t.currentTime === t.duration
                }
            }), Promise.all([t.embed.getVideoWidth(), t.embed.getVideoHeight()]).then(function(t) {
                var i = function(e, t) {
                    var i = function e(t, i) {
                        return 0 === i ? t : e(i, t % i)
                    }(e, t);
                    return e / i + ":" + t / i
                }(t[0], t[1]);
                Ce.setAspectRatio.call(e, i)
            }), t.embed.setAutopause(t.config.autopause).then(function(e) {
                t.config.autopause = e
            }), t.embed.getVideoTitle().then(function(i) {
                t.config.title = i, ve.setTitle.call(e)
            }), t.embed.getCurrentTime().then(function(e) {
                u = e, m.call(t, t.media, "timeupdate")
            }), t.embed.getDuration().then(function(e) {
                t.media.duration = e, m.call(t, t.media, "durationchange")
            }), t.embed.getTextTracks().then(function(e) {
                t.media.textTracks = e, oe.setup.call(t)
            }), t.embed.on("cuechange", function(e) {
                var i = e.cues,
                    n = (void 0 === i ? [] : i).map(function(e) {
                        return t = e.text, i = document.createDocumentFragment(), n = document.createElement("div"), i.appendChild(n), n.innerHTML = t, i.firstChild.innerText;
                        var t, i, n
                    });
                oe.updateCues.call(t, n)
            }), t.embed.on("loaded", function() {
                (t.embed.getPaused().then(function(e) {
                    Ae.call(t, !e), e || m.call(t, t.media, "playing")
                }), o.element(t.embed.element) && t.supported.ui) && t.embed.element.setAttribute("tabindex", -1)
            }), t.embed.on("play", function() {
                Ae.call(t, !0), m.call(t, t.media, "playing")
            }), t.embed.on("pause", function() {
                Ae.call(t, !1)
            }), t.embed.on("timeupdate", function(e) {
                t.media.seeking = !1, u = e.seconds, m.call(t, t.media, "timeupdate")
            }), t.embed.on("progress", function(e) {
                t.media.buffered = e.percent, m.call(t, t.media, "progress"), 1 === parseInt(e.percent, 10) && m.call(t, t.media, "canplaythrough"), t.embed.getDuration().then(function(e) {
                    e !== t.media.duration && (t.media.duration = e, m.call(t, t.media, "durationchange"))
                })
            }), t.embed.on("seeked", function() {
                t.media.seeking = !1, m.call(t, t.media, "seeked")
            }), t.embed.on("ended", function() {
                t.media.paused = !0, m.call(t, t.media, "ended")
            }), t.embed.on("error", function(e) {
                t.media.error = e, m.call(t, t.media, "error")
            }), setTimeout(function() {
                return ve.build.call(t)
            }, 0)
        }
    };

    function Ee(e) {
        var t = Object.entries({
            hd2160: 2160,
            hd1440: 1440,
            hd1080: 1080,
            hd720: 720,
            large: 480,
            medium: 360,
            small: 240,
            tiny: 144
        }).find(function(t) {
            return t.includes(e)
        });
        return t ? t.find(function(t) {
            return t !== e
        }) : "default"
    }

    function Se(e) {
        e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, m.call(this, this.media, e ? "play" : "pause"))
    }
    var Pe, Ne = {
            setup: function() {
                var e = this;
                N(this.elements.wrapper, this.config.classNames.embed, !0), Ne.setAspectRatio.call(this), o.object(window.YT) && o.function(window.YT.Player) ? Ne.ready.call(this) : (Te(this.config.urls.youtube.sdk).catch(function(t) {
                    e.debug.warn("YouTube API failed to load", t)
                }), window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || [], window.onYouTubeReadyCallbacks.push(function() {
                    Ne.ready.call(e)
                }), window.onYouTubeIframeAPIReady = function() {
                    window.onYouTubeReadyCallbacks.forEach(function(e) {
                        e()
                    })
                })
            },
            getTitle: function(e) {
                var t = this;
                if (o.function(this.embed.getVideoData)) {
                    var i = this.embed.getVideoData().title;
                    if (o.empty(i)) return this.config.title = i, void ve.setTitle.call(this)
                }
                var n = this.config.keys.google;
                o.string(n) && !o.empty(n) && Z(W(this.config.urls.youtube.api, e, n)).then(function(e) {
                    o.object(e) && (t.config.title = e.items[0].snippet.title, ve.setTitle.call(t))
                }).catch(function() {})
            },
            setAspectRatio: function() {
                var e = this.config.ratio.split(":");
                this.elements.wrapper.style.paddingBottom = 100 / e[0] * e[1] + "%"
            },
            ready: function() {
                var e = this,
                    t = e.media.getAttribute("id");
                if (o.empty(t) || !t.startsWith("youtube-")) {
                    var i = e.media.getAttribute("src");
                    o.empty(i) && (i = e.media.getAttribute(this.config.attributes.embed.id));
                    var n, a = (n = i, o.empty(n) ? null : n.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : n),
                        s = e.provider + "-" + Math.floor(1e4 * Math.random()),
                        r = w("div", {
                            id: s,
                            poster: e.poster
                        });
                    e.media = E(r, e.media);
                    var l = function(e) {
                        return "https://img.youtube.com/vi/" + a + "/" + e + "default.jpg"
                    };
                    ye(l("maxres"), 121).catch(function() {
                        return ye(l("sd"), 121)
                    }).catch(function() {
                        return ye(l("hq"))
                    }).then(function(t) {
                        return ve.setPoster.call(e, t.src)
                    }).then(function(t) {
                        t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover")
                    }).catch(function() {}), e.embed = new window.YT.Player(s, {
                        videoId: a,
                        playerVars: {
                            autoplay: e.config.autoplay ? 1 : 0,
                            controls: e.supported.ui ? 0 : 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                            modestbranding: 1,
                            disablekb: 1,
                            playsinline: 1,
                            widget_referrer: window ? window.location.href : null,
                            cc_load_policy: e.captions.active ? 1 : 0,
                            cc_lang_pref: e.config.captions.language
                        },
                        events: {
                            onError: function(t) {
                                if (!e.media.error) {
                                    var i = t.data,
                                        n = {
                                            2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                            5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                            100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                            101: "The owner of the requested video does not allow it to be played in embedded players.",
                                            150: "The owner of the requested video does not allow it to be played in embedded players."
                                        }[i] || "An unknown error occured";
                                    e.media.error = {
                                        code: i,
                                        message: n
                                    }, m.call(e, e.media, "error")
                                }
                            },
                            onPlaybackQualityChange: function() {
                                m.call(e, e.media, "qualitychange", !1, {
                                    quality: e.media.quality
                                })
                            },
                            onPlaybackRateChange: function(t) {
                                var i = t.target;
                                e.media.playbackRate = i.getPlaybackRate(), m.call(e, e.media, "ratechange")
                            },
                            onReady: function(t) {
                                var i = t.target;
                                Ne.getTitle.call(e, a), e.media.play = function() {
                                    Se.call(e, !0), i.playVideo()
                                }, e.media.pause = function() {
                                    Se.call(e, !1), i.pauseVideo()
                                }, e.media.stop = function() {
                                    i.stopVideo()
                                }, e.media.duration = i.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
                                    get: function() {
                                        return Number(i.getCurrentTime())
                                    },
                                    set: function(t) {
                                        e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, m.call(e, e.media, "seeking"), i.seekTo(t)
                                    }
                                }), Object.defineProperty(e.media, "playbackRate", {
                                    get: function() {
                                        return i.getPlaybackRate()
                                    },
                                    set: function(e) {
                                        i.setPlaybackRate(e)
                                    }
                                }), Object.defineProperty(e.media, "quality", {
                                    get: function() {
                                        return Ee(i.getPlaybackQuality())
                                    },
                                    set: function(e) {
                                        i.setPlaybackQuality(Ee(e))
                                    }
                                });
                                var n = e.config.volume;
                                Object.defineProperty(e.media, "volume", {
                                    get: function() {
                                        return n
                                    },
                                    set: function(t) {
                                        n = t, i.setVolume(100 * n), m.call(e, e.media, "volumechange")
                                    }
                                });
                                var s = e.config.muted;
                                Object.defineProperty(e.media, "muted", {
                                    get: function() {
                                        return s
                                    },
                                    set: function(t) {
                                        var n = o.boolean(t) ? t : s;
                                        s = n, i[n ? "mute" : "unMute"](), m.call(e, e.media, "volumechange")
                                    }
                                }), Object.defineProperty(e.media, "currentSrc", {
                                    get: function() {
                                        return i.getVideoUrl()
                                    }
                                }), Object.defineProperty(e.media, "ended", {
                                    get: function() {
                                        return e.currentTime === e.duration
                                    }
                                }), e.options.speed = i.getAvailablePlaybackRates(), e.supported.ui && e.media.setAttribute("tabindex", -1), m.call(e, e.media, "timeupdate"), m.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval(function() {
                                    e.media.buffered = i.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && m.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), m.call(e, e.media, "canplaythrough"))
                                }, 200), setTimeout(function() {
                                    return ve.build.call(e)
                                }, 50)
                            },
                            onStateChange: function(t) {
                                var i, n = t.target;
                                switch (clearInterval(e.timers.playing), e.media.seeking && [1, 2].includes(t.data) && (e.media.seeking = !1, m.call(e, e.media, "seeked")), t.data) {
                                    case -1:
                                        m.call(e, e.media, "timeupdate"), e.media.buffered = n.getVideoLoadedFraction(), m.call(e, e.media, "progress");
                                        break;
                                    case 0:
                                        Se.call(e, !1), e.media.loop ? (n.stopVideo(), n.playVideo()) : m.call(e, e.media, "ended");
                                        break;
                                    case 1:
                                        e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (Se.call(e, !0), m.call(e, e.media, "playing"), e.timers.playing = setInterval(function() {
                                            m.call(e, e.media, "timeupdate")
                                        }, 50), e.media.duration !== n.getDuration() && (e.media.duration = n.getDuration(), m.call(e, e.media, "durationchange")), se.setQualityMenu.call(e, (i = n.getAvailableQualityLevels(), o.empty(i) ? i : G(i.map(function(e) {
                                            return Ee(e)
                                        })))));
                                        break;
                                    case 2:
                                        e.muted || e.embed.unMute(), Se.call(e, !1)
                                }
                                m.call(e, e.elements.container, "statechange", !1, {
                                    code: t.data
                                })
                            }
                        }
                    })
                }
            }
        },
        Le = {
            setup: function() {
                this.media ? (N(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), N(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && N(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = w("div", {
                    class: this.config.classNames.video
                }), b(this.media, this.elements.wrapper), this.elements.poster = w("div", {
                    class: this.config.classNames.poster
                }), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? F.extend.call(this) : this.isYouTube ? Ne.setup.call(this) : this.isVimeo && Ce.setup.call(this)) : this.debug.warn("No media element found!")
            }
        },
        Me = function() {
            function e(t) {
                var i = this;
                f(this, e), this.player = t, this.publisherId = t.config.ads.publisherId, this.playing = !1, this.initialized = !1, this.elements = {
                    container: null,
                    displayContainer: null
                }, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(function(e, t) {
                    i.on("loaded", e), i.on("error", t)
                }), this.load()
            }
            return g(e, [{
                key: "load",
                value: function() {
                    var e = this;
                    this.enabled && (o.object(window.google) && o.object(window.google.ima) ? this.ready() : Te(this.player.config.urls.googleIMA.sdk).then(function() {
                        e.ready()
                    }).catch(function() {
                        e.trigger("error", new Error("Google IMA SDK failed to load"))
                    }))
                }
            }, {
                key: "ready",
                value: function() {
                    var e = this;
                    this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then(function() {
                        e.clearSafetyTimer("onAdsManagerLoaded()")
                    }), this.listeners(), this.setupIMA()
                }
            }, {
                key: "setupIMA",
                value: function() {
                    this.elements.container = w("div", {
                        class: this.player.config.classNames.ads
                    }), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container), this.requestAds()
                }
            }, {
                key: "requestAds",
                value: function() {
                    var e = this,
                        t = this.player.elements.container;
                    try {
                        this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(t) {
                            return e.onAdsManagerLoaded(t)
                        }, !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(t) {
                            return e.onAdError(t)
                        }, !1);
                        var i = new google.ima.AdsRequest;
                        i.adTagUrl = this.tagUrl, i.linearAdSlotWidth = t.offsetWidth, i.linearAdSlotHeight = t.offsetHeight, i.nonLinearAdSlotWidth = t.offsetWidth, i.nonLinearAdSlotHeight = t.offsetHeight, i.forceNonLinearFullSlot = !1, i.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(i)
                    } catch (e) {
                        this.onAdError(e)
                    }
                }
            }, {
                key: "pollCountdown",
                value: function() {
                    var e = this;
                    if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
                    this.countdownTimer = setInterval(function() {
                        var t = ae(Math.max(e.manager.getRemainingTime(), 0)),
                            i = $("advertisement", e.player.config) + " - " + t;
                        e.elements.container.setAttribute("data-badge-text", i)
                    }, 100)
                }
            }, {
                key: "onAdsManagerLoaded",
                value: function(e) {
                    var t = this,
                        i = new google.ima.AdsRenderingSettings;
                    i.restoreCustomPlaybackStateOnAdBreakComplete = !0, i.enablePreloading = !0, this.manager = e.getAdsManager(this.player, i), this.cuePoints = this.manager.getCuePoints(), o.empty(this.cuePoints) || this.cuePoints.forEach(function(e) {
                        if (0 !== e && -1 !== e && e < t.player.duration) {
                            var i = t.player.elements.progress;
                            if (o.element(i)) {
                                var n = 100 / t.player.duration * e,
                                    a = w("span", {
                                        class: t.player.config.classNames.cues
                                    });
                                a.style.left = n.toString() + "%", i.appendChild(a)
                            }
                        }
                    }), this.manager.setVolume(this.player.volume), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(e) {
                        return t.onAdError(e)
                    }), Object.keys(google.ima.AdEvent.Type).forEach(function(e) {
                        t.manager.addEventListener(google.ima.AdEvent.Type[e], function(e) {
                            return t.onAdEvent(e)
                        })
                    }), this.trigger("loaded")
                }
            }, {
                key: "onAdEvent",
                value: function(e) {
                    var t = this,
                        i = this.player.elements.container,
                        n = e.getAd(),
                        a = function(e) {
                            var i = "ads" + e.replace(/_/g, "").toLowerCase();
                            m.call(t.player, t.player.media, i)
                        };
                    switch (e.type) {
                        case google.ima.AdEvent.Type.LOADED:
                            this.trigger("loaded"), a(e.type), this.pollCountdown(!0), n.isLinear() || (n.width = i.offsetWidth, n.height = i.offsetHeight);
                            break;
                        case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                            a(e.type), this.loadAds();
                            break;
                        case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                            a(e.type), this.pauseContent();
                            break;
                        case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                            a(e.type), this.pollCountdown(), this.resumeContent();
                            break;
                        case google.ima.AdEvent.Type.STARTED:
                        case google.ima.AdEvent.Type.MIDPOINT:
                        case google.ima.AdEvent.Type.COMPLETE:
                        case google.ima.AdEvent.Type.IMPRESSION:
                        case google.ima.AdEvent.Type.CLICK:
                            a(e.type)
                    }
                }
            }, {
                key: "onAdError",
                value: function(e) {
                    this.cancel(), this.player.debug.warn("Ads error", e)
                }
            }, {
                key: "listeners",
                value: function() {
                    var e = this,
                        t = this.player.elements.container,
                        i = void 0;
                    this.player.on("ended", function() {
                        e.loader.contentComplete()
                    }), this.player.on("seeking", function() {
                        return i = e.player.currentTime
                    }), this.player.on("seeked", function() {
                        var t = e.player.currentTime;
                        o.empty(e.cuePoints) || e.cuePoints.forEach(function(n, a) {
                            i < n && n < t && (e.manager.discardAdBreak(), e.cuePoints.splice(a, 1))
                        })
                    }), window.addEventListener("resize", function() {
                        e.manager && e.manager.resize(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL)
                    })
                }
            }, {
                key: "play",
                value: function() {
                    var e = this,
                        t = this.player.elements.container;
                    this.managerPromise || this.resumeContent(), this.managerPromise.then(function() {
                        e.elements.displayContainer.initialize();
                        try {
                            e.initialized || (e.manager.init(t.offsetWidth, t.offsetHeight, google.ima.ViewMode.NORMAL), e.manager.start()), e.initialized = !0
                        } catch (t) {
                            e.onAdError(t)
                        }
                    }).catch(function() {})
                }
            }, {
                key: "resumeContent",
                value: function() {
                    this.elements.container.style.zIndex = "", this.playing = !1, this.player.currentTime < this.player.duration && this.player.play()
                }
            }, {
                key: "pauseContent",
                value: function() {
                    this.elements.container.style.zIndex = 3, this.playing = !0, this.player.pause()
                }
            }, {
                key: "cancel",
                value: function() {
                    this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
                }
            }, {
                key: "loadAds",
                value: function() {
                    var e = this;
                    this.managerPromise.then(function() {
                        e.manager && e.manager.destroy(), e.managerPromise = new Promise(function(t) {
                            e.on("loaded", t), e.player.debug.log(e.manager)
                        }), e.requestAds()
                    }).catch(function() {})
                }
            }, {
                key: "trigger",
                value: function(e) {
                    for (var t = this, i = arguments.length, n = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) n[a - 1] = arguments[a];
                    var s = this.events[e];
                    o.array(s) && s.forEach(function(e) {
                        o.function(e) && e.apply(t, n)
                    })
                }
            }, {
                key: "on",
                value: function(e, t) {
                    return o.array(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this
                }
            }, {
                key: "startSafetyTimer",
                value: function(e, t) {
                    var i = this;
                    this.player.debug.log("Safety timer invoked from: " + t), this.safetyTimer = setTimeout(function() {
                        i.cancel(), i.clearSafetyTimer("startSafetyTimer()")
                    }, e)
                }
            }, {
                key: "clearSafetyTimer",
                value: function(e) {
                    o.nullOrUndefined(this.safetyTimer) || (this.player.debug.log("Safety timer cleared from: " + e), clearTimeout(this.safetyTimer), this.safetyTimer = null)
                }
            }, {
                key: "enabled",
                get: function() {
                    return this.player.isHTML5 && this.player.isVideo && this.player.config.ads.enabled && !o.empty(this.publisherId)
                }
            }, {
                key: "tagUrl",
                get: function() {
                    return "https://go.aniview.com/api/adserver6/vast/?" + le({
                        AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                        AV_CHANNELID: "5a0458dc28a06145e4519d21",
                        AV_URL: window.location.hostname,
                        cb: Date.now(),
                        AV_WIDTH: 640,
                        AV_HEIGHT: 480,
                        AV_CDIM2: this.publisherId
                    })
                }
            }]), e
        }(),
        xe = {
            insertElements: function(e, t) {
                var i = this;
                o.string(t) ? T(e, this.media, {
                    src: t
                }) : o.array(t) && t.forEach(function(t) {
                    T(e, i.media, t)
                })
            },
            change: function(e) {
                var t = this;
                U(e, "sources.length") ? (F.cancelRequests.call(this), this.destroy.call(this, function() {
                    t.options.quality = [], A(t.media), t.media = null, o.element(t.elements.container) && t.elements.container.removeAttribute("class");
                    var i = e.sources,
                        n = e.type,
                        a = v(i, 1)[0],
                        s = a.provider,
                        r = void 0 === s ? ue.html5 : s,
                        l = a.src,
                        c = "html5" === r ? n : "div",
                        u = "html5" === r ? {} : {
                            src: l
                        };
                    Object.assign(t, {
                        provider: r,
                        type: n,
                        supported: D.check(n, r, t.config.playsinline),
                        media: w(c, u)
                    }), t.elements.container.appendChild(t.media), o.boolean(e.autoplay) && (t.config.autoplay = e.autoplay), t.isHTML5 && (t.config.crossorigin && t.media.setAttribute("crossorigin", ""), t.config.autoplay && t.media.setAttribute("autoplay", ""), o.empty(e.poster) || (t.poster = e.poster), t.config.loop.active && t.media.setAttribute("loop", ""), t.config.muted && t.media.setAttribute("muted", ""), t.config.playsinline && t.media.setAttribute("playsinline", "")), ve.addStyleHook.call(t), t.isHTML5 && xe.insertElements.call(t, "source", i), t.config.title = e.title, Le.setup.call(t), t.isHTML5 && ("tracks" in e && xe.insertElements.call(t, "track", e.tracks), t.media.load()), (t.isHTML5 || t.isEmbed && !t.supported.ui) && ve.build.call(t), t.fullscreen.update()
                }, !0)) : this.debug.warn("Invalid source format")
            }
        },
        _e = function() {
            function e(t, i) {
                var n = this;
                if (f(this, e), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = D.touch, this.media = t, o.string(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || o.nodeList(this.media) || o.array(this.media)) && (this.media = this.media[0]), this.config = z({}, ce, e.defaults, i || {}, function() {
                        try {
                            return JSON.parse(n.media.getAttribute("data-plyr-config"))
                        } catch (e) {
                            return {}
                        }
                    }()), this.elements = {
                        container: null,
                        buttons: {},
                        display: {},
                        progress: {},
                        inputs: {},
                        settings: {
                            menu: null,
                            panes: {},
                            tabs: {}
                        },
                        captions: null
                    }, this.captions = {
                        active: null,
                        currentTrack: -1,
                        meta: new WeakMap
                    }, this.fullscreen = {
                        active: !1
                    }, this.options = {
                        speed: [],
                        quality: []
                    }, this.debug = new he(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", D), !o.nullOrUndefined(this.media) && o.element(this.media))
                    if (this.media.plyr) this.debug.warn("Target already setup");
                    else if (this.config.enabled)
                    if (D.check().api) {
                        var a = this.media.cloneNode(!0);
                        a.autoplay = !1, this.elements.original = a;
                        var s = this.media.tagName.toLowerCase(),
                            r = null,
                            l = null;
                        switch (s) {
                            case "div":
                                if (r = this.media.querySelector("iframe"), o.element(r)) {
                                    if (l = re(r.getAttribute("src")), this.provider = function(e) {
                                            return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(e) ? ue.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? ue.vimeo : null
                                        }(l.toString()), this.elements.container = this.media, this.media = r, this.elements.container.className = "", l.searchParams.length) {
                                        var c = ["1", "true"];
                                        c.includes(l.searchParams.get("autoplay")) && (this.config.autoplay = !0), c.includes(l.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? this.config.playsinline = c.includes(l.searchParams.get("playsinline")) : this.config.playsinline = !0
                                    }
                                } else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
                                if (o.empty(this.provider) || !Object.keys(ue).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
                                this.type = de.video;
                                break;
                            case "video":
                            case "audio":
                                this.type = s, this.provider = ue.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), this.media.hasAttribute("playsinline") && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
                                break;
                            default:
                                return void this.debug.error("Setup failed: unsupported type")
                        }
                        this.supported = D.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new be(this), this.storage = new X(this), this.media.plyr = this, o.element(this.elements.container) || (this.elements.container = w("div"), b(this.media, this.elements.container)), ve.addStyleHook.call(this), Le.setup.call(this), this.config.debug && d.call(this, this.elements.container, this.config.events.join(" "), function(e) {
                            n.debug.log("event: " + e.type)
                        }), (this.isHTML5 || this.isEmbed && !this.supported.ui) && ve.build.call(this), this.listeners.container(), this.listeners.global(), this.fullscreen = new ge(this), this.ads = new Me(this), this.config.autoplay && this.play()) : this.debug.error("Setup failed: no support")
                    } else this.debug.error("Setup failed: no support");
                else this.debug.error("Setup failed: disabled by config");
                else this.debug.error("Setup failed: no suitable element passed")
            }
            return g(e, [{
                key: "play",
                value: function() {
                    return o.function(this.media.play) ? this.media.play() : null
                }
            }, {
                key: "pause",
                value: function() {
                    this.playing && o.function(this.media.pause) && this.media.pause()
                }
            }, {
                key: "togglePlay",
                value: function(e) {
                    (o.boolean(e) ? e : !this.playing) ? this.play(): this.pause()
                }
            }, {
                key: "stop",
                value: function() {
                    this.isHTML5 ? (this.pause(), this.restart()) : o.function(this.media.stop) && this.media.stop()
                }
            }, {
                key: "restart",
                value: function() {
                    this.currentTime = 0
                }
            }, {
                key: "rewind",
                value: function(e) {
                    this.currentTime = this.currentTime - (o.number(e) ? e : this.config.seekTime)
                }
            }, {
                key: "forward",
                value: function(e) {
                    this.currentTime = this.currentTime + (o.number(e) ? e : this.config.seekTime)
                }
            }, {
                key: "increaseVolume",
                value: function(e) {
                    var t = this.media.muted ? 0 : this.volume;
                    this.volume = t + (o.number(e) ? e : 0)
                }
            }, {
                key: "decreaseVolume",
                value: function(e) {
                    this.increaseVolume(-e)
                }
            }, {
                key: "toggleCaptions",
                value: function(e) {
                    oe.toggle.call(this, e, !1)
                }
            }, {
                key: "airplay",
                value: function() {
                    D.airplay && this.media.webkitShowPlaybackTargetPicker()
                }
            }, {
                key: "toggleControls",
                value: function(e) {
                    if (this.supported.ui && !this.isAudio) {
                        var t = L(this.elements.container, this.config.classNames.hideControls),
                            i = void 0 === e ? void 0 : !e,
                            n = N(this.elements.container, this.config.classNames.hideControls, i);
                        if (n && this.config.controls.includes("settings") && !o.empty(this.config.settings) && se.toggleMenu.call(this, !1), n !== t) {
                            var a = n ? "controlshidden" : "controlsshown";
                            m.call(this, this.media, a)
                        }
                        return !n
                    }
                    return !1
                }
            }, {
                key: "on",
                value: function(e, t) {
                    d.call(this, this.elements.container, e, t)
                }
            }, {
                key: "once",
                value: function(e, t) {
                    h.call(this, this.elements.container, e, t)
                }
            }, {
                key: "off",
                value: function(e, t) {
                    p(this.elements.container, e, t)
                }
            }, {
                key: "destroy",
                value: function(e) {
                    var t = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (this.ready) {
                        var n = function() {
                            document.body.style.overflow = "", t.embed = null, i ? (Object.keys(t.elements).length && (A(t.elements.buttons.play), A(t.elements.captions), A(t.elements.controls), A(t.elements.wrapper), t.elements.buttons.play = null, t.elements.captions = null, t.elements.controls = null, t.elements.wrapper = null), o.function(e) && e()) : (function() {
                                this && this.eventListeners && (this.eventListeners.forEach(function(e) {
                                    var t = e.element,
                                        i = e.type,
                                        n = e.callback,
                                        a = e.options;
                                    t.removeEventListener(i, n, a)
                                }), this.eventListeners = [])
                            }.call(t), E(t.elements.original, t.elements.container), m.call(t, t.elements.original, "destroyed", !0), o.function(e) && e.call(t.elements.original), t.ready = !1, setTimeout(function() {
                                t.elements = null, t.media = null
                            }, 200))
                        };
                        this.stop(), this.isHTML5 ? (clearTimeout(this.timers.loading), ve.toggleNativeControls.call(this, !0), n()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && o.function(this.embed.destroy) && this.embed.destroy(), n()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(n), setTimeout(n, 200))
                    }
                }
            }, {
                key: "supports",
                value: function(e) {
                    return D.mime.call(this, e)
                }
            }, {
                key: "isHTML5",
                get: function() {
                    return Boolean(this.provider === ue.html5)
                }
            }, {
                key: "isEmbed",
                get: function() {
                    return Boolean(this.isYouTube || this.isVimeo)
                }
            }, {
                key: "isYouTube",
                get: function() {
                    return Boolean(this.provider === ue.youtube)
                }
            }, {
                key: "isVimeo",
                get: function() {
                    return Boolean(this.provider === ue.vimeo)
                }
            }, {
                key: "isVideo",
                get: function() {
                    return Boolean(this.type === de.video)
                }
            }, {
                key: "isAudio",
                get: function() {
                    return Boolean(this.type === de.audio)
                }
            }, {
                key: "playing",
                get: function() {
                    return Boolean(this.ready && !this.paused && !this.ended)
                }
            }, {
                key: "paused",
                get: function() {
                    return Boolean(this.media.paused)
                }
            }, {
                key: "stopped",
                get: function() {
                    return Boolean(this.paused && 0 === this.currentTime)
                }
            }, {
                key: "ended",
                get: function() {
                    return Boolean(this.media.ended)
                }
            }, {
                key: "currentTime",
                set: function(e) {
                    if (this.duration) {
                        var t = o.number(e) && e > 0;
                        this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log("Seeking to " + this.currentTime + " seconds")
                    }
                },
                get: function() {
                    return Number(this.media.currentTime)
                }
            }, {
                key: "buffered",
                get: function() {
                    var e = this.media.buffered;
                    return o.number(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0
                }
            }, {
                key: "seeking",
                get: function() {
                    return Boolean(this.media.seeking)
                }
            }, {
                key: "duration",
                get: function() {
                    var e = parseFloat(this.config.duration),
                        t = (this.media || {}).duration,
                        i = o.number(t) && t !== 1 / 0 ? t : 0;
                    return e || i
                }
            }, {
                key: "volume",
                set: function(e) {
                    var t = e;
                    o.string(t) && (t = Number(t)), o.number(t) || (t = this.storage.get("volume")), o.number(t) || (t = this.config.volume), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !o.empty(e) && this.muted && t > 0 && (this.muted = !1)
                },
                get: function() {
                    return Number(this.media.volume)
                }
            }, {
                key: "muted",
                set: function(e) {
                    var t = e;
                    o.boolean(t) || (t = this.storage.get("muted")), o.boolean(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
                },
                get: function() {
                    return Boolean(this.media.muted)
                }
            }, {
                key: "hasAudio",
                get: function() {
                    return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)))
                }
            }, {
                key: "speed",
                set: function(e) {
                    var t = null;
                    o.number(e) && (t = e), o.number(t) || (t = this.storage.get("speed")), o.number(t) || (t = this.config.speed.selected), t < .1 && (t = .1), t > 2 && (t = 2), this.config.speed.options.includes(t) ? (this.config.speed.selected = t, this.media.playbackRate = t) : this.debug.warn("Unsupported speed (" + t + ")")
                },
                get: function() {
                    return Number(this.media.playbackRate)
                }
            }, {
                key: "quality",
                set: function(e) {
                    var t = this.config.quality,
                        i = this.options.quality;
                    if (i.length) {
                        var n = [!o.empty(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find(o.number);
                        if (!i.includes(n)) {
                            var a = function(e, t) {
                                return o.array(e) && e.length ? e.reduce(function(e, i) {
                                    return Math.abs(i - t) < Math.abs(e - t) ? i : e
                                }) : null
                            }(i, n);
                            this.debug.warn("Unsupported quality option: " + n + ", using " + a + " instead"), n = a
                        }
                        m.call(this, this.media, "qualityrequested", !1, {
                            quality: n
                        }), t.selected = n, this.media.quality = n
                    }
                },
                get: function() {
                    return this.media.quality
                }
            }, {
                key: "loop",
                set: function(e) {
                    var t = o.boolean(e) ? e : this.config.loop.active;
                    this.config.loop.active = t, this.media.loop = t
                },
                get: function() {
                    return Boolean(this.media.loop)
                }
            }, {
                key: "source",
                set: function(e) {
                    xe.change.call(this, e)
                },
                get: function() {
                    return this.media.currentSrc
                }
            }, {
                key: "poster",
                set: function(e) {
                    this.isVideo ? ve.setPoster.call(this, e, !1).catch(function() {}) : this.debug.warn("Poster can only be set for video")
                },
                get: function() {
                    return this.isVideo ? this.media.getAttribute("poster") : null
                }
            }, {
                key: "autoplay",
                set: function(e) {
                    var t = o.boolean(e) ? e : this.config.autoplay;
                    this.config.autoplay = t
                },
                get: function() {
                    return Boolean(this.config.autoplay)
                }
            }, {
                key: "currentTrack",
                set: function(e) {
                    oe.set.call(this, e, !1)
                },
                get: function() {
                    var e = this.captions,
                        t = e.toggled,
                        i = e.currentTrack;
                    return t ? i : -1
                }
            }, {
                key: "language",
                set: function(e) {
                    oe.setLanguage.call(this, e, !1)
                },
                get: function() {
                    return (oe.getCurrentTrack.call(this) || {}).language
                }
            }, {
                key: "pip",
                set: function(e) {
                    var t = "picture-in-picture",
                        i = "inline";
                    if (D.pip) {
                        var n = o.boolean(e) ? e : this.pip === i;
                        this.media.webkitSetPresentationMode(n ? t : i)
                    }
                },
                get: function() {
                    return D.pip ? this.media.webkitPresentationMode : null
                }
            }], [{
                key: "supported",
                value: function(e, t, i) {
                    return D.check(e, t, i)
                }
            }, {
                key: "loadSprite",
                value: function(e, t) {
                    return ee(e, t)
                }
            }, {
                key: "setup",
                value: function(t) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = null;
                    return o.string(t) ? n = Array.from(document.querySelectorAll(t)) : o.nodeList(t) ? n = Array.from(t) : o.array(t) && (n = t.filter(o.element)), o.empty(n) ? null : n.map(function(t) {
                        return new e(t, i)
                    })
                }
            }]), e
        }();
    return _e.defaults = (Pe = ce, JSON.parse(JSON.stringify(Pe))), _e
});
/*-----------------------------------------------------------------------------------*/
/*	12. AOS
/*-----------------------------------------------------------------------------------*/
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function() {
    return function(e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var i = n[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "dist/", t(0)
    }([function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                }
                return e
            },
            r = n(1),
            a = (o(r), n(6)),
            u = o(a),
            c = n(7),
            f = o(c),
            s = n(8),
            d = o(s),
            l = n(9),
            p = o(l),
            m = n(10),
            b = o(m),
            v = n(11),
            y = o(v),
            g = n(14),
            h = o(g),
            w = [],
            k = !1,
            x = document.all && !window.atob,
            j = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                startEvent: "DOMContentLoaded"
            },
            O = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (e && (k = !0), k) return w = (0, y.default)(w, j), (0, b.default)(w, j.once), w
            },
            S = function() {
                w = (0, h.default)(), O()
            },
            _ = function() {
                w.forEach(function(e, t) {
                    e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
                })
            },
            E = function(e) {
                return e === !0 || "mobile" === e && p.default.mobile() || "phone" === e && p.default.phone() || "tablet" === e && p.default.tablet() || "function" == typeof e && e() === !0
            },
            z = function(e) {
                return j = i(j, e), w = (0, h.default)(), E(j.disable) || x ? _() : (document.querySelector("body").setAttribute("data-aos-easing", j.easing), document.querySelector("body").setAttribute("data-aos-duration", j.duration), document.querySelector("body").setAttribute("data-aos-delay", j.delay), "DOMContentLoaded" === j.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? O(!0) : "load" === j.startEvent ? window.addEventListener(j.startEvent, function() {
                    O(!0)
                }) : document.addEventListener(j.startEvent, function() {
                    O(!0)
                }), window.addEventListener("resize", (0, f.default)(O, 50, !0)), window.addEventListener("orientationchange", (0, f.default)(O, 50, !0)), window.addEventListener("scroll", (0, u.default)(function() {
                    (0, b.default)(w, j.once)
                }, 99)), document.addEventListener("DOMNodeRemoved", function(e) {
                    var t = e.target;
                    t && 1 === t.nodeType && t.hasAttribute && t.hasAttribute("data-aos") && (0, f.default)(S, 50, !0)
                }), (0, d.default)("[data-aos]", S), w)
            };
        e.exports = {
            init: z,
            refresh: O,
            refreshHard: S
        }
    }, function(e, t) {}, , , , , function(e, t) {
        (function(t) {
            "use strict";

            function n(e, t, n) {
                function o(t) {
                    var n = b,
                        o = v;
                    return b = v = void 0, k = t, g = e.apply(o, n)
                }

                function r(e) {
                    return k = e, h = setTimeout(s, t), S ? o(e) : g
                }

                function a(e) {
                    var n = e - w,
                        o = e - k,
                        i = t - n;
                    return _ ? j(i, y - o) : i
                }

                function c(e) {
                    var n = e - w,
                        o = e - k;
                    return void 0 === w || n >= t || n < 0 || _ && o >= y
                }

                function s() {
                    var e = O();
                    return c(e) ? d(e) : void(h = setTimeout(s, a(e)))
                }

                function d(e) {
                    return h = void 0, E && b ? o(e) : (b = v = void 0, g)
                }

                function l() {
                    void 0 !== h && clearTimeout(h), k = 0, b = w = v = h = void 0
                }

                function p() {
                    return void 0 === h ? g : d(O())
                }

                function m() {
                    var e = O(),
                        n = c(e);
                    if (b = arguments, v = this, w = e, n) {
                        if (void 0 === h) return r(w);
                        if (_) return h = setTimeout(s, t), o(w)
                    }
                    return void 0 === h && (h = setTimeout(s, t)), g
                }
                var b, v, y, g, h, w, k = 0,
                    S = !1,
                    _ = !1,
                    E = !0;
                if ("function" != typeof e) throw new TypeError(f);
                return t = u(t) || 0, i(n) && (S = !!n.leading, _ = "maxWait" in n, y = _ ? x(u(n.maxWait) || 0, t) : y, E = "trailing" in n ? !!n.trailing : E), m.cancel = l, m.flush = p, m
            }

            function o(e, t, o) {
                var r = !0,
                    a = !0;
                if ("function" != typeof e) throw new TypeError(f);
                return i(o) && (r = "leading" in o ? !!o.leading : r, a = "trailing" in o ? !!o.trailing : a), n(e, t, {
                    leading: r,
                    maxWait: t,
                    trailing: a
                })
            }

            function i(e) {
                var t = "undefined" == typeof e ? "undefined" : c(e);
                return !!e && ("object" == t || "function" == t)
            }

            function r(e) {
                return !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
            }

            function a(e) {
                return "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) || r(e) && k.call(e) == d
            }

            function u(e) {
                if ("number" == typeof e) return e;
                if (a(e)) return s;
                if (i(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = i(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(l, "");
                var n = m.test(e);
                return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e
            }
            var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                f = "Expected a function",
                s = NaN,
                d = "[object Symbol]",
                l = /^\s+|\s+$/g,
                p = /^[-+]0x[0-9a-f]+$/i,
                m = /^0b[01]+$/i,
                b = /^0o[0-7]+$/i,
                v = parseInt,
                y = "object" == ("undefined" == typeof t ? "undefined" : c(t)) && t && t.Object === Object && t,
                g = "object" == ("undefined" == typeof self ? "undefined" : c(self)) && self && self.Object === Object && self,
                h = y || g || Function("return this")(),
                w = Object.prototype,
                k = w.toString,
                x = Math.max,
                j = Math.min,
                O = function() {
                    return h.Date.now()
                };
            e.exports = o
        }).call(t, function() {
            return this
        }())
    }, function(e, t) {
        (function(t) {
            "use strict";

            function n(e, t, n) {
                function i(t) {
                    var n = b,
                        o = v;
                    return b = v = void 0, O = t, g = e.apply(o, n)
                }

                function r(e) {
                    return O = e, h = setTimeout(s, t), S ? i(e) : g
                }

                function u(e) {
                    var n = e - w,
                        o = e - O,
                        i = t - n;
                    return _ ? x(i, y - o) : i
                }

                function f(e) {
                    var n = e - w,
                        o = e - O;
                    return void 0 === w || n >= t || n < 0 || _ && o >= y
                }

                function s() {
                    var e = j();
                    return f(e) ? d(e) : void(h = setTimeout(s, u(e)))
                }

                function d(e) {
                    return h = void 0, E && b ? i(e) : (b = v = void 0, g)
                }

                function l() {
                    void 0 !== h && clearTimeout(h), O = 0, b = w = v = h = void 0
                }

                function p() {
                    return void 0 === h ? g : d(j())
                }

                function m() {
                    var e = j(),
                        n = f(e);
                    if (b = arguments, v = this, w = e, n) {
                        if (void 0 === h) return r(w);
                        if (_) return h = setTimeout(s, t), i(w)
                    }
                    return void 0 === h && (h = setTimeout(s, t)), g
                }
                var b, v, y, g, h, w, O = 0,
                    S = !1,
                    _ = !1,
                    E = !0;
                if ("function" != typeof e) throw new TypeError(c);
                return t = a(t) || 0, o(n) && (S = !!n.leading, _ = "maxWait" in n, y = _ ? k(a(n.maxWait) || 0, t) : y, E = "trailing" in n ? !!n.trailing : E), m.cancel = l, m.flush = p, m
            }

            function o(e) {
                var t = "undefined" == typeof e ? "undefined" : u(e);
                return !!e && ("object" == t || "function" == t)
            }

            function i(e) {
                return !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
            }

            function r(e) {
                return "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) || i(e) && w.call(e) == s
            }

            function a(e) {
                if ("number" == typeof e) return e;
                if (r(e)) return f;
                if (o(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = o(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(d, "");
                var n = p.test(e);
                return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e
            }
            var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                c = "Expected a function",
                f = NaN,
                s = "[object Symbol]",
                d = /^\s+|\s+$/g,
                l = /^[-+]0x[0-9a-f]+$/i,
                p = /^0b[01]+$/i,
                m = /^0o[0-7]+$/i,
                b = parseInt,
                v = "object" == ("undefined" == typeof t ? "undefined" : u(t)) && t && t.Object === Object && t,
                y = "object" == ("undefined" == typeof self ? "undefined" : u(self)) && self && self.Object === Object && self,
                g = v || y || Function("return this")(),
                h = Object.prototype,
                w = h.toString,
                k = Math.max,
                x = Math.min,
                j = function() {
                    return g.Date.now()
                };
            e.exports = n
        }).call(t, function() {
            return this
        }())
    }, function(e, t) {
        "use strict";

        function n(e, t) {
            a.push({
                selector: e,
                fn: t
            }), !u && r && (u = new r(o), u.observe(i.documentElement, {
                childList: !0,
                subtree: !0,
                removedNodes: !0
            })), o()
        }

        function o() {
            for (var e, t, n = 0, o = a.length; n < o; n++) {
                e = a[n], t = i.querySelectorAll(e.selector);
                for (var r, u = 0, c = t.length; u < c; u++) r = t[u], r.ready || (r.ready = !0, e.fn.call(r, r))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = window.document,
            r = window.MutationObserver || window.WebKitMutationObserver,
            a = [],
            u = void 0;
        t.default = n
    }, function(e, t) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o() {
            return navigator.userAgent || navigator.vendor || window.opera || ""
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }(),
            r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            f = function() {
                function e() {
                    n(this, e)
                }
                return i(e, [{
                    key: "phone",
                    value: function() {
                        var e = o();
                        return !(!r.test(e) && !a.test(e.substr(0, 4)))
                    }
                }, {
                    key: "mobile",
                    value: function() {
                        var e = o();
                        return !(!u.test(e) && !c.test(e.substr(0, 4)))
                    }
                }, {
                    key: "tablet",
                    value: function() {
                        return this.mobile() && !this.phone()
                    }
                }]), e
            }();
        t.default = new f
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e, t, n) {
                var o = e.node.getAttribute("data-aos-once");
                t > e.position ? e.node.classList.add("aos-animate") : "undefined" != typeof o && ("false" === o || !n && "true" !== o) && e.node.classList.remove("aos-animate")
            },
            o = function(e, t) {
                var o = window.pageYOffset,
                    i = window.innerHeight;
                e.forEach(function(e, r) {
                    n(e, i + o, t)
                })
            };
        t.default = o
    }, function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(12),
            r = o(i),
            a = function(e, t) {
                return e.forEach(function(e, n) {
                    e.node.classList.add("aos-init"), e.position = (0, r.default)(e.node, t.offset)
                }), e
            };
        t.default = a
    }, function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(13),
            r = o(i),
            a = function(e, t) {
                var n = 0,
                    o = 0,
                    i = window.innerHeight,
                    a = {
                        offset: e.getAttribute("data-aos-offset"),
                        anchor: e.getAttribute("data-aos-anchor"),
                        anchorPlacement: e.getAttribute("data-aos-anchor-placement")
                    };
                switch (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)), a.anchor && document.querySelectorAll(a.anchor) && (e = document.querySelectorAll(a.anchor)[0]), n = (0, r.default)(e).top, a.anchorPlacement) {
                    case "top-bottom":
                        break;
                    case "center-bottom":
                        n += e.offsetHeight / 2;
                        break;
                    case "bottom-bottom":
                        n += e.offsetHeight;
                        break;
                    case "top-center":
                        n += i / 2;
                        break;
                    case "bottom-center":
                        n += i / 2 + e.offsetHeight;
                        break;
                    case "center-center":
                        n += i / 2 + e.offsetHeight / 2;
                        break;
                    case "top-top":
                        n += i;
                        break;
                    case "bottom-top":
                        n += e.offsetHeight + i;
                        break;
                    case "center-top":
                        n += e.offsetHeight / 2 + i
                }
                return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o
            };
        t.default = a
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
            return {
                top: n,
                left: t
            }
        };
        t.default = n
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            e = e || document.querySelectorAll("[data-aos]");
            var t = [];
            return [].forEach.call(e, function(e, n) {
                t.push({
                    node: e
                })
            }), t
        };
        t.default = n
    }])
});
/*-----------------------------------------------------------------------------------*/
/*	13. ISOTOPE
/*-----------------------------------------------------------------------------------*/
/*!
 * Isotope PACKAGED v3.0.4
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */
! function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, o);
                n = void 0 === n ? l : n
            }), void 0 !== n ? n : t
        }

        function h(t, e) {
            t.each(function(t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = n.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, o(a))
    }

    function o(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var n = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return o(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = 0,
                n = i[o];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; n;) {
                var r = s && s[n];
                r && (this.off(t, n), delete s[n]), n.apply(this, e), o += r ? 0 : 1, n = i[o]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function o(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function n() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            s.isBoxSizeOuter = r = 200 == t(n.width), i.removeChild(e)
        }
    }

    function s(e) {
        if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l],
                    c = s[f],
                    m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                I = a.borderTopWidth + a.borderBottomWidth,
                z = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (z ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length,
        d = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i],
                n = o + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function(t, e, i) {
        var o = t.prototype[e],
            n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            t && clearTimeout(t);
            var e = arguments,
                s = this;
            this[n] = setTimeout(function() {
                o.apply(s, e), delete s[n]
            }, i || 100)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var s = i.toDashed(n),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void(o && o.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t, i);
                l && l.data(t, n, u)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function o(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[r],
        h = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        d = o.prototype = Object.create(t.prototype);
    d.constructor = o, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function() {
        this.size = e(this.element)
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var o = h[i] || i;
            e[o] = t[i]
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            o = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            s = this.layout.size,
            r = o.indexOf("%") != -1 ? parseFloat(o) / 100 * s.width : parseInt(o, 10),
            a = n.indexOf("%") != -1 ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, d.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom",
            h = o ? "top" : "bottom",
            d = o ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            o = this.position.y,
            n = parseInt(t, 10),
            s = parseInt(e, 10),
            r = n === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i,
            u = e - o,
            h = {};
        h.transform = this.getTranslate(a, u), this.transition({
            to: h,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, d._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + n(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                o = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this), delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(c)
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) {
        return e(t, i, o, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, o, n) {
    "use strict";

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++l;
        this.element.outlayerGUID = n, f[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            o = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var n = m[o] || 1;
        return i * n
    }
    var u = t.console,
        h = t.jQuery,
        d = function() {},
        l = 0,
        f = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    o.extend(c, e.prototype), c.option = function(t) {
        o.extend(this.options, t)
    }, c._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n],
                r = new i(s, this);
            o.push(r)
        }
        return o
    }, c._filterFindItemElements = function(t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }, c.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, c.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function() {
        this.getSize()
    }, c.getSize = function() {
        this.size = i(this.element)
    }, c._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, c.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, c._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, c._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, c.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, c._positionItem = function(t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
    }, c._postLayout = function() {
        this.resizeContainer()
    }, c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function(t, e) {
        function i() {
            n.dispatchEvent(t + "Complete", null, [e])
        }

        function o() {
            r++, r == s && i()
        }
        var n = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, o)
        })
    }, c.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), h)
            if (this.$element = this.$element || h(this.element), e) {
                var n = h.Event(e);
                n.type = t, this.$element.trigger(n, i)
            } else this.$element.trigger(t, i)
    }, c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, c.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            o.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, c._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
    }, c._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            o = this._boundingRect,
            n = i(t),
            s = {
                left: e.left - o.left - n.marginLeft,
                top: e.top - o.top - n.marginTop,
                right: o.right - e.right - n.marginRight,
                bottom: o.bottom - e.bottom - n.marginBottom
            };
        return s
    }, c.handleEvent = o.handleEvent, c.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function() {
        this.resize()
    }, o.debounceMethod(s, "onresize", 100), c.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, c.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), o.removeFrom(this.items, t)
        }, this)
    }, c.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }, s.create = function(t, e) {
        var i = r(s);
        return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = n, s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        o = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, o.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() {
        n.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var o = i.prototype,
        n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function(t) {
        o[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function(t, e) {
        function n() {
            i.apply(this, arguments)
        }
        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, o.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            s = n / o,
            r = o - n % o,
            a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, o.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            o = e(i);
        this.containerWidth = o && o.innerWidth
    }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && e < 1 ? "round" : "ceil",
            o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
                x: this.columnWidth * s.col,
                y: s.y
            }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
        return r
    }, o._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }, o._getTopColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
        return e
    }, o._getColGroupY = function(t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, o._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols,
            o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, o._manageStamp = function(t) {
        var i = e(t),
            o = this._getElementOffset(t),
            n = this._getOption("originLeft"),
            s = n ? o.left : o.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, o._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, o._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, o.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        o = i.prototype,
        n = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = o._getOption;
    return o._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, o, n, s, r) {
    function a(t, e) {
        return function(i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n],
                    r = i.sortData[s],
                    a = o.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        d = e.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, l.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, l._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function() {
        function t() {
            e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        var e, i, o, n = this;
        this.once("layoutComplete", function() {
            e = !0, t()
        }), this.once("hideComplete", function() {
            i = !0, t()
        }), this.once("revealComplete", function() {
            o = !0, t()
        })
    }, l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return {
            matches: i,
            needReveal: o,
            needHide: n
        }
    }, l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t)
        } : "function" == typeof t ? function(e) {
            return t(e.element)
        } : function(e) {
            return o(e.element, t)
        }
    }, l.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    };
    var f = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                o = i[0],
                n = o.match(/^\[(.+)\]$/),
                s = n && n[1],
                r = e(s, o),
                a = d.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t))
            } : function(t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, l._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, l._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, l._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, l._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, l._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, l._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, l.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, l.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, d
});
/*-----------------------------------------------------------------------------------*/
/*	15. LIGHTGALLERY
/*-----------------------------------------------------------------------------------*/
/*! lightgallery - v1.6.12 - 2019-02-19
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2019 Sachin N; Licensed GPLv3 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b(b, d) {
            if (this.el = b, this.$el = a(b), this.s = a.extend({}, c, d), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = a(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(a(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
        }
        var c = {
            mode: "lg-slide",
            cssEasing: "ease",
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1
        };
        b.prototype.init = function() {
            var b = this;
            b.s.preload > b.$items.length && (b.s.preload = b.$items.length);
            var c = window.location.hash;
            c.indexOf("lg=" + this.s.galleryId) > 0 && (b.index = parseInt(c.split("&slide=")[1], 10), a("body").addClass("lg-from-hash"), a("body").hasClass("lg-on") || (setTimeout(function() {
                b.build(b.index)
            }), a("body").addClass("lg-on"))), b.s.dynamic ? (b.$el.trigger("onBeforeOpen.lg"), b.index = b.s.index || 0, a("body").hasClass("lg-on") || setTimeout(function() {
                b.build(b.index), a("body").addClass("lg-on")
            })) : b.$items.on("click.lgcustom", function(c) {
                try {
                    c.preventDefault(), c.preventDefault()
                } catch (a) {
                    c.returnValue = !1
                }
                b.$el.trigger("onBeforeOpen.lg"), b.index = b.s.index || b.$items.index(this), a("body").hasClass("lg-on") || (b.build(b.index), a("body").addClass("lg-on"))
            })
        }, b.prototype.build = function(b) {
            var c = this;
            c.structure(), a.each(a.fn.lightGallery.modules, function(b) {
                c.modules[b] = new a.fn.lightGallery.modules[b](c.el)
            }), c.slide(b, !1, !1, !1), c.s.keyPress && c.keyPress(), c.$items.length > 1 ? (c.arrow(), setTimeout(function() {
                c.enableDrag(), c.enableSwipe()
            }, 50), c.s.mousewheel && c.mousewheel()) : c.$slide.on("click.lg", function() {
                c.$el.trigger("onSlideClick.lg")
            }), c.counter(), c.closeGallery(), c.$el.trigger("onAfterOpen.lg"), c.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                c.$outer.removeClass("lg-hide-items"), clearTimeout(c.hideBartimeout), c.hideBartimeout = setTimeout(function() {
                    c.$outer.addClass("lg-hide-items")
                }, c.s.hideBarsDelay)
            }), c.$outer.trigger("mousemove.lg")
        }, b.prototype.structure = function() {
            var b, c = "",
                d = "",
                e = 0,
                f = "",
                g = this;
            for (a("body").append('<div class="lg-backdrop"></div>'), a(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), e = 0; e < this.$items.length; e++) c += '<div class="lg-item"></div>';
            if (this.s.controls && this.$items.length > 1 && (d = '<div class="lg-actions"><button class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (f = '<div class="lg-sub-html"></div>'), b = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + c + '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' + d + f + "</div></div>", a("body").append(b), this.$outer = a(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), g.setTop(), a(window).on("resize.lg orientationchange.lg", function() {
                    setTimeout(function() {
                        g.setTop()
                    }, 100)
                }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
                var h = this.$outer.find(".lg-inner");
                h.css("transition-timing-function", this.s.cssEasing), h.css("transition-duration", this.s.speed + "ms")
            }
            setTimeout(function() {
                a(".lg-backdrop").addClass("in")
            }), setTimeout(function() {
                g.$outer.addClass("lg-visible")
            }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = a(window).scrollTop()
        }, b.prototype.setTop = function() {
            if ("100%" !== this.s.height) {
                var b = a(window).height(),
                    c = (b - parseInt(this.s.height, 10)) / 2,
                    d = this.$outer.find(".lg");
                b >= parseInt(this.s.height, 10) ? d.css("top", c + "px") : d.css("top", "0px")
            }
        }, b.prototype.doCss = function() {
            return !! function() {
                var a = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                    b = document.documentElement,
                    c = 0;
                for (c = 0; c < a.length; c++)
                    if (a[c] in b.style) return !0
            }()
        }, b.prototype.isVideo = function(a, b) {
            var c;
            if (c = this.s.dynamic ? this.s.dynamicEl[b].html : this.$items.eq(b).attr("data-html"), !a) return c ? {
                html5: !0
            } : (console.error("lightGallery :- data-src is not pvovided on slide item " + (b + 1) + ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"), !1);
            var d = a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                g = a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
            return d ? {
                youtube: d
            } : e ? {
                vimeo: e
            } : f ? {
                dailymotion: f
            } : g ? {
                vk: g
            } : void 0
        }, b.prototype.counter = function() {
            this.s.counter && a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
        }, b.prototype.addHtml = function(b) {
            var c, d, e = null;
            if (this.s.dynamic ? this.s.dynamicEl[b].subHtmlUrl ? c = this.s.dynamicEl[b].subHtmlUrl : e = this.s.dynamicEl[b].subHtml : (d = this.$items.eq(b), d.attr("data-sub-html-url") ? c = d.attr("data-sub-html-url") : (e = d.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !e && (e = d.attr("title") || d.find("img").first().attr("alt")))), !c)
                if (void 0 !== e && null !== e) {
                    var f = e.substring(0, 1);
                    "." !== f && "#" !== f || (e = this.s.subHtmlSelectorRelative && !this.s.dynamic ? d.find(e).html() : a(e).html())
                } else e = "";
            ".lg-sub-html" === this.s.appendSubHtmlTo ? c ? this.$outer.find(this.s.appendSubHtmlTo).load(c) : this.$outer.find(this.s.appendSubHtmlTo).html(e) : c ? this.$slide.eq(b).load(c) : this.$slide.eq(b).append(e), void 0 !== e && null !== e && ("" === e ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [b])
        }, b.prototype.preload = function(a) {
            var b = 1,
                c = 1;
            for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++) this.loadContent(a + b, !1, 0);
            for (c = 1; c <= this.s.preload && !(a - c < 0); c++) this.loadContent(a - c, !1, 0)
        }, b.prototype.loadContent = function(b, c, d) {
            var e, f, g, h, i, j, k = this,
                l = !1,
                m = function(b) {
                    for (var c = [], d = [], e = 0; e < b.length; e++) {
                        var g = b[e].split(" ");
                        "" === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1])
                    }
                    for (var h = a(window).width(), i = 0; i < c.length; i++)
                        if (parseInt(c[i], 10) > h) {
                            f = d[i];
                            break
                        }
                };
            if (k.s.dynamic) {
                if (k.s.dynamicEl[b].poster && (l = !0, g = k.s.dynamicEl[b].poster), j = k.s.dynamicEl[b].html, f = k.s.dynamicEl[b].src, k.s.dynamicEl[b].responsive) {
                    m(k.s.dynamicEl[b].responsive.split(","))
                }
                h = k.s.dynamicEl[b].srcset, i = k.s.dynamicEl[b].sizes
            } else {
                if (k.$items.eq(b).attr("data-poster") && (l = !0, g = k.$items.eq(b).attr("data-poster")), j = k.$items.eq(b).attr("data-html"), f = k.$items.eq(b).attr("href") || k.$items.eq(b).attr("data-src"), k.$items.eq(b).attr("data-responsive")) {
                    m(k.$items.eq(b).attr("data-responsive").split(","))
                }
                h = k.$items.eq(b).attr("data-srcset"), i = k.$items.eq(b).attr("data-sizes")
            }
            var n = !1;
            k.s.dynamic ? k.s.dynamicEl[b].iframe && (n = !0) : "true" === k.$items.eq(b).attr("data-iframe") && (n = !0);
            var o = k.isVideo(f, b);
            if (!k.$slide.eq(b).hasClass("lg-loaded")) {
                if (n) k.$slide.eq(b).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + k.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + f + '"  allowfullscreen="true"></iframe></div></div>');
                else if (l) {
                    var p = "";
                    p = o && o.youtube ? "lg-has-youtube" : o && o.vimeo ? "lg-has-vimeo" : "lg-has-html5", k.$slide.eq(b).prepend('<div class="lg-video-cont ' + p + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + g + '" /></div></div>')
                } else o ? (k.$slide.eq(b).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), k.$el.trigger("hasVideo.lg", [b, f, j])) : k.$slide.eq(b).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + f + '" /></div>');
                if (k.$el.trigger("onAferAppendSlide.lg", [b]), e = k.$slide.eq(b).find(".lg-object"), i && e.attr("sizes", i), h) {
                    e.attr("srcset", h);
                    try {
                        picturefill({
                            elements: [e[0]]
                        })
                    } catch (a) {
                        console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.")
                    }
                }
                ".lg-sub-html" !== this.s.appendSubHtmlTo && k.addHtml(b), k.$slide.eq(b).addClass("lg-loaded")
            }
            k.$slide.eq(b).find(".lg-object").on("load.lg error.lg", function() {
                var c = 0;
                d && !a("body").hasClass("lg-from-hash") && (c = d), setTimeout(function() {
                    k.$slide.eq(b).addClass("lg-complete"), k.$el.trigger("onSlideItemLoad.lg", [b, d || 0])
                }, c)
            }), o && o.html5 && !l && k.$slide.eq(b).addClass("lg-complete"), !0 === c && (k.$slide.eq(b).hasClass("lg-complete") ? k.preload(b) : k.$slide.eq(b).find(".lg-object").on("load.lg error.lg", function() {
                k.preload(b)
            }))
        }, b.prototype.slide = function(b, c, d, e) {
            var f = this.$outer.find(".lg-current").index(),
                g = this;
            if (!g.lGalleryOn || f !== b) {
                var h = this.$slide.length,
                    i = g.lGalleryOn ? this.s.speed : 0;
                if (!g.lgBusy) {
                    if (this.s.download) {
                        var j;
                        j = g.s.dynamic ? !1 !== g.s.dynamicEl[b].downloadUrl && (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src) : "false" !== g.$items.eq(b).attr("data-download-url") && (g.$items.eq(b).attr("data-download-url") || g.$items.eq(b).attr("href") || g.$items.eq(b).attr("data-src")), j ? (a("#lg-download").attr("href", j), g.$outer.removeClass("lg-hide-download")) : g.$outer.addClass("lg-hide-download")
                    }
                    if (this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]), g.lgBusy = !0, clearTimeout(g.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                            g.addHtml(b)
                        }, i), this.arrowDisable(b), e || (b < f ? e = "prev" : b > f && (e = "next")), c) {
                        this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
                        var k, l;
                        h > 2 ? (k = b - 1, l = b + 1, 0 === b && f === h - 1 ? (l = 0, k = h - 1) : b === h - 1 && 0 === f && (l = 0, k = h - 1)) : (k = 0, l = 1), "prev" === e ? g.$slide.eq(l).addClass("lg-next-slide") : g.$slide.eq(k).addClass("lg-prev-slide"), g.$slide.eq(b).addClass("lg-current")
                    } else g.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), "prev" === e ? (this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(f).addClass("lg-next-slide")) : (this.$slide.eq(b).addClass("lg-next-slide"), this.$slide.eq(f).addClass("lg-prev-slide")), setTimeout(function() {
                        g.$slide.removeClass("lg-current"), g.$slide.eq(b).addClass("lg-current"), g.$outer.removeClass("lg-no-trans")
                    }, 50);
                    g.lGalleryOn ? (setTimeout(function() {
                        g.loadContent(b, !0, 0)
                    }, this.s.speed + 50), setTimeout(function() {
                        g.lgBusy = !1, g.$el.trigger("onAfterSlide.lg", [f, b, c, d])
                    }, this.s.speed)) : (g.loadContent(b, !0, g.s.backdropDuration), g.lgBusy = !1, g.$el.trigger("onAfterSlide.lg", [f, b, c, d])), g.lGalleryOn = !0, this.s.counter && a("#lg-counter-current").text(b + 1)
                }
                g.index = b
            }
        }, b.prototype.goToNextSlide = function(a) {
            var b = this,
                c = b.s.loop;
            a && b.$slide.length < 3 && (c = !1), b.lgBusy || (b.index + 1 < b.$slide.length ? (b.index++, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next")) : c ? (b.index = 0, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next")) : b.s.slideEndAnimatoin && !a && (b.$outer.addClass("lg-right-end"), setTimeout(function() {
                b.$outer.removeClass("lg-right-end")
            }, 400)))
        }, b.prototype.goToPrevSlide = function(a) {
            var b = this,
                c = b.s.loop;
            a && b.$slide.length < 3 && (c = !1), b.lgBusy || (b.index > 0 ? (b.index--, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev")) : c ? (b.index = b.$items.length - 1, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev")) : b.s.slideEndAnimatoin && !a && (b.$outer.addClass("lg-left-end"), setTimeout(function() {
                b.$outer.removeClass("lg-left-end")
            }, 400)))
        }, b.prototype.keyPress = function() {
            var b = this;
            this.$items.length > 1 && a(window).on("keyup.lg", function(a) {
                b.$items.length > 1 && (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()), 39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()))
            }), a(window).on("keydown.lg", function(a) {
                !0 === b.s.escKey && 27 === a.keyCode && (a.preventDefault(), b.$outer.hasClass("lg-thumb-open") ? b.$outer.removeClass("lg-thumb-open") : b.destroy())
            })
        }, b.prototype.arrow = function() {
            var a = this;
            this.$outer.find(".lg-prev").on("click.lg", function() {
                a.goToPrevSlide()
            }), this.$outer.find(".lg-next").on("click.lg", function() {
                a.goToNextSlide()
            })
        }, b.prototype.arrowDisable = function(a) {
            !this.s.loop && this.s.hideControlOnEnd && (a + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), a > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
        }, b.prototype.setTranslate = function(a, b, c) {
            this.s.useLeft ? a.css("left", b) : a.css({
                transform: "translate3d(" + b + "px, " + c + "px, 0px)"
            })
        }, b.prototype.touchMove = function(b, c) {
            var d = c - b;
            Math.abs(d) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), d, 0), this.setTranslate(a(".lg-prev-slide"), -this.$slide.eq(this.index).width() + d, 0), this.setTranslate(a(".lg-next-slide"), this.$slide.eq(this.index).width() + d, 0))
        }, b.prototype.touchEnd = function(a) {
            var b = this;
            "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                b.$outer.removeClass("lg-dragging"), a < 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToNextSlide(!0) : a > 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToPrevSlide(!0) : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"), b.$slide.removeAttr("style")
            }), setTimeout(function() {
                b.$outer.hasClass("lg-dragging") || "lg-slide" === b.s.mode || b.$outer.removeClass("lg-slide")
            }, b.s.speed + 100)
        }, b.prototype.enableSwipe = function() {
            var a = this,
                b = 0,
                c = 0,
                d = !1;
            a.s.enableSwipe && a.doCss() && (a.$slide.on("touchstart.lg", function(c) {
                a.$outer.hasClass("lg-zoomed") || a.lgBusy || (c.preventDefault(), a.manageSwipeClass(), b = c.originalEvent.targetTouches[0].pageX)
            }), a.$slide.on("touchmove.lg", function(e) {
                a.$outer.hasClass("lg-zoomed") || (e.preventDefault(), c = e.originalEvent.targetTouches[0].pageX, a.touchMove(b, c), d = !0)
            }), a.$slide.on("touchend.lg", function() {
                a.$outer.hasClass("lg-zoomed") || (d ? (d = !1, a.touchEnd(c - b)) : a.$el.trigger("onSlideClick.lg"))
            }))
        }, b.prototype.enableDrag = function() {
            var b = this,
                c = 0,
                d = 0,
                e = !1,
                f = !1;
            b.s.enableDrag && b.doCss() && (b.$slide.on("mousedown.lg", function(d) {
                b.$outer.hasClass("lg-zoomed") || b.lgBusy || a(d.target).text().trim() || (d.preventDefault(), b.manageSwipeClass(), c = d.pageX, e = !0, b.$outer.scrollLeft += 1, b.$outer.scrollLeft -= 1, b.$outer.removeClass("lg-grab").addClass("lg-grabbing"), b.$el.trigger("onDragstart.lg"))
            }), a(window).on("mousemove.lg", function(a) {
                e && (f = !0, d = a.pageX, b.touchMove(c, d), b.$el.trigger("onDragmove.lg"))
            }), a(window).on("mouseup.lg", function(g) {
                f ? (f = !1, b.touchEnd(d - c), b.$el.trigger("onDragend.lg")) : (a(g.target).hasClass("lg-object") || a(g.target).hasClass("lg-video-play")) && b.$el.trigger("onSlideClick.lg"), e && (e = !1, b.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
            }))
        }, b.prototype.manageSwipeClass = function() {
            var a = this.index + 1,
                b = this.index - 1;
            this.s.loop && this.$slide.length > 2 && (0 === this.index ? b = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (a = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(a).addClass("lg-next-slide")
        }, b.prototype.mousewheel = function() {
            var a = this;
            a.$outer.on("mousewheel.lg", function(b) {
                b.deltaY && (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(), b.preventDefault())
            })
        }, b.prototype.closeGallery = function() {
            var b = this,
                c = !1;
            this.$outer.find(".lg-close").on("click.lg", function() {
                b.destroy()
            }), b.s.closable && (b.$outer.on("mousedown.lg", function(b) {
                c = !!(a(b.target).is(".lg-outer") || a(b.target).is(".lg-item ") || a(b.target).is(".lg-img-wrap"))
            }), b.$outer.on("mousemove.lg", function() {
                c = !1
            }), b.$outer.on("mouseup.lg", function(d) {
                (a(d.target).is(".lg-outer") || a(d.target).is(".lg-item ") || a(d.target).is(".lg-img-wrap") && c) && (b.$outer.hasClass("lg-dragging") || b.destroy())
            }))
        }, b.prototype.destroy = function(b) {
            var c = this;
            b || (c.$el.trigger("onBeforeClose.lg"), a(window).scrollTop(c.prevScrollTop)), b && (c.s.dynamic || this.$items.off("click.lg click.lgcustom"), a.removeData(c.el, "lightGallery")), this.$el.off(".lg.tm"), a.each(a.fn.lightGallery.modules, function(a) {
                c.modules[a] && c.modules[a].destroy()
            }), this.lGalleryOn = !1, clearTimeout(c.hideBartimeout), this.hideBartimeout = !1, a(window).off(".lg"), a("body").removeClass("lg-on lg-from-hash"), c.$outer && c.$outer.removeClass("lg-visible"), a(".lg-backdrop").removeClass("in"), setTimeout(function() {
                c.$outer && c.$outer.remove(), a(".lg-backdrop").remove(), b || c.$el.trigger("onCloseAfter.lg")
            }, c.s.backdropDuration + 50)
        }, a.fn.lightGallery = function(c) {
            return this.each(function() {
                if (a.data(this, "lightGallery")) try {
                    a(this).data("lightGallery").init()
                } catch (a) {
                    console.error("lightGallery has not initiated properly")
                } else a.data(this, "lightGallery", new b(this, c))
            })
        }, a.fn.lightGallery.modules = {}
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                autoplay: !1,
                pause: 5e3,
                progressBar: !0,
                fourceAutoplay: !1,
                autoplayControls: !0,
                appendAutoplayControlsTo: ".lg-toolbar"
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.$el = a(c), !(this.core.$items.length < 2) && (this.core.s = a.extend({}, b, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
            };
        c.prototype.init = function() {
            var a = this;
            a.core.s.autoplayControls && a.controls(), a.core.s.progressBar && a.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), a.progress(), a.core.s.autoplay && a.$el.one("onSlideItemLoad.lg.tm", function() {
                a.startlAuto()
            }), a.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() {
                a.interval && (a.cancelAuto(), a.canceledOnTouch = !0)
            }), a.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {
                !a.interval && a.canceledOnTouch && (a.startlAuto(), a.canceledOnTouch = !1)
            })
        }, c.prototype.progress = function() {
            var a, b, c = this;
            c.$el.on("onBeforeSlide.lg.tm", function() {
                c.core.s.progressBar && c.fromAuto && (a = c.core.$outer.find(".lg-progress-bar"), b = c.core.$outer.find(".lg-progress"), c.interval && (b.removeAttr("style"), a.removeClass("lg-start"), setTimeout(function() {
                    b.css("transition", "width " + (c.core.s.speed + c.core.s.pause) + "ms ease 0s"), a.addClass("lg-start")
                }, 20))), c.fromAuto || c.core.s.fourceAutoplay || c.cancelAuto(), c.fromAuto = !1
            })
        }, c.prototype.controls = function() {
            var b = this;
            a(this.core.s.appendAutoplayControlsTo).append('<span class="lg-autoplay-button lg-icon"></span>'), b.core.$outer.find(".lg-autoplay-button").on("click.lg", function() {
                a(b.core.$outer).hasClass("lg-show-autoplay") ? (b.cancelAuto(), b.core.s.fourceAutoplay = !1) : b.interval || (b.startlAuto(), b.core.s.fourceAutoplay = b.fourceAutoplayTemp)
            })
        }, c.prototype.startlAuto = function() {
            var a = this;
            a.core.$outer.find(".lg-progress").css("transition", "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"), a.core.$outer.addClass("lg-show-autoplay"), a.core.$outer.find(".lg-progress-bar").addClass("lg-start"), a.interval = setInterval(function() {
                a.core.index + 1 < a.core.$items.length ? a.core.index++ : a.core.index = 0, a.fromAuto = !0, a.core.slide(a.core.index, !1, !1, "next")
            }, a.core.s.speed + a.core.s.pause)
        }, c.prototype.cancelAuto = function() {
            clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
        }, c.prototype.destroy = function() {
            this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
        }, a.fn.lightGallery.modules.autoplay = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
        }
        var c = {
                fullScreen: !0
            },
            d = function(b) {
                return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, c, this.core.s), this.init(), this
            };
        d.prototype.init = function() {
            var a = "";
            if (this.core.s.fullScreen) {
                if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)) return;
                a = '<span class="lg-fullscreen lg-icon"></span>', this.core.$outer.find(".lg-toolbar").append(a), this.fullScreen()
            }
        }, d.prototype.requestFullscreen = function() {
            var a = document.documentElement;
            a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen()
        }, d.prototype.exitFullscreen = function() {
            document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
        }, d.prototype.fullScreen = function() {
            var c = this;
            a(document).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
                c.core.$outer.toggleClass("lg-fullscreen-on")
            }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
                b() ? c.exitFullscreen() : c.requestFullscreen()
            })
        }, d.prototype.destroy = function() {
            b() && this.exitFullscreen(), a(document).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
        }, a.fn.lightGallery.modules.fullscreen = d
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                pager: !1
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.$el = a(c), this.core.s = a.extend({}, b, this.core.s), this.core.s.pager && this.core.$items.length > 1 && this.init(), this
            };
        c.prototype.init = function() {
            var b, c, d, e = this,
                f = "";
            if (e.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), e.core.s.dynamic)
                for (var g = 0; g < e.core.s.dynamicEl.length; g++) f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + e.core.s.dynamicEl[g].thumb + '" /></div></span>';
            else e.core.$items.each(function() {
                e.core.s.exThumbImage ? f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).attr(e.core.s.exThumbImage) + '" /></div></span>' : f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).find("img").attr("src") + '" /></div></span>'
            });
            c = e.core.$outer.find(".lg-pager-outer"), c.html(f), b = e.core.$outer.find(".lg-pager-cont"), b.on("click.lg touchend.lg", function() {
                var b = a(this);
                e.core.index = b.index(), e.core.slide(e.core.index, !1, !0, !1)
            }), c.on("mouseover.lg", function() {
                clearTimeout(d), c.addClass("lg-pager-hover")
            }), c.on("mouseout.lg", function() {
                d = setTimeout(function() {
                    c.removeClass("lg-pager-hover")
                })
            }), e.core.$el.on("onBeforeSlide.lg.tm", function(a, c, d) {
                b.removeClass("lg-pager-active"), b.eq(d).addClass("lg-pager-active")
            })
        }, c.prototype.destroy = function() {}, a.fn.lightGallery.modules.pager = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                thumbnail: !0,
                animateThumb: !0,
                currentPagerPosition: "middle",
                thumbWidth: 100,
                thumbHeight: "80px",
                thumbContHeight: 100,
                thumbMargin: 5,
                exThumbImage: !1,
                showThumbByDefault: !0,
                toogleThumb: !0,
                pullCaptionUp: !0,
                enableThumbDrag: !0,
                enableThumbSwipe: !0,
                swipeThreshold: 50,
                loadYoutubeThumbnail: !0,
                youtubeThumbSize: 1,
                loadVimeoThumbnail: !0,
                vimeoThumbSize: "thumbnail_small",
                loadDailymotionThumbnail: !0
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.$el = a(c), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"), this.left = 0, this.init(), this
            };
        c.prototype.init = function() {
            var a = this;
            this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function() {
                a.core.$outer.addClass("lg-thumb-open")
            }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb && this.core.doCss() ? (this.core.s.enableThumbDrag && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
        }, c.prototype.build = function() {
            function b(a, b, c) {
                var g, h = d.core.isVideo(a, c) || {},
                    i = "";
                h.youtube || h.vimeo || h.dailymotion ? h.youtube ? g = d.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + h.youtube[1] + "/" + d.core.s.youtubeThumbSize + ".jpg" : b : h.vimeo ? d.core.s.loadVimeoThumbnail ? (g = "//i.vimeocdn.com/video/error_" + f + ".jpg", i = h.vimeo[1]) : g = b : h.dailymotion && (g = d.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + h.dailymotion[1] : b) : g = b, e += '<div data-vimeo-id="' + i + '" class="lg-thumb-item" style="width:' + d.core.s.thumbWidth + "px; height: " + d.core.s.thumbHeight + "; margin-right: " + d.core.s.thumbMargin + 'px"><img src="' + g + '" /></div>', i = ""
            }
            var c, d = this,
                e = "",
                f = "",
                g = '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
            switch (this.core.s.vimeoThumbSize) {
                case "thumbnail_large":
                    f = "640";
                    break;
                case "thumbnail_medium":
                    f = "200x150";
                    break;
                case "thumbnail_small":
                    f = "100x75"
            }
            if (d.core.$outer.addClass("lg-has-thumb"), d.core.$outer.find(".lg").append(g), d.$thumbOuter = d.core.$outer.find(".lg-thumb-outer"), d.thumbOuterWidth = d.$thumbOuter.width(), d.core.s.animateThumb && d.core.$outer.find(".lg-thumb").css({
                    width: d.thumbTotalWidth + "px",
                    position: "relative"
                }), this.core.s.animateThumb && d.$thumbOuter.css("height", d.core.s.thumbContHeight + "px"), d.core.s.dynamic)
                for (var h = 0; h < d.core.s.dynamicEl.length; h++) b(d.core.s.dynamicEl[h].src, d.core.s.dynamicEl[h].thumb, h);
            else d.core.$items.each(function(c) {
                d.core.s.exThumbImage ? b(a(this).attr("href") || a(this).attr("data-src"), a(this).attr(d.core.s.exThumbImage), c) : b(a(this).attr("href") || a(this).attr("data-src"), a(this).find("img").attr("src"), c)
            });
            d.core.$outer.find(".lg-thumb").html(e), c = d.core.$outer.find(".lg-thumb-item"), c.each(function() {
                var b = a(this),
                    c = b.attr("data-vimeo-id");
                c && a.getJSON("//www.vimeo.com/api/v2/video/" + c + ".json?callback=?", {
                    format: "json"
                }, function(a) {
                    b.find("img").attr("src", a[0][d.core.s.vimeoThumbSize])
                })
            }), c.eq(d.core.index).addClass("active"), d.core.$el.on("onBeforeSlide.lg.tm", function() {
                c.removeClass("active"), c.eq(d.core.index).addClass("active")
            }), c.on("click.lg touchend.lg", function() {
                var b = a(this);
                setTimeout(function() {
                    (d.thumbClickable && !d.core.lgBusy || !d.core.doCss()) && (d.core.index = b.index(), d.core.slide(d.core.index, !1, !0, !1))
                }, 50)
            }), d.core.$el.on("onBeforeSlide.lg.tm", function() {
                d.animateThumb(d.core.index)
            }), a(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
                setTimeout(function() {
                    d.animateThumb(d.core.index), d.thumbOuterWidth = d.$thumbOuter.width()
                }, 200)
            })
        }, c.prototype.setTranslate = function(a) {
            this.core.$outer.find(".lg-thumb").css({
                transform: "translate3d(-" + a + "px, 0px, 0px)"
            })
        }, c.prototype.animateThumb = function(a) {
            var b = this.core.$outer.find(".lg-thumb");
            if (this.core.s.animateThumb) {
                var c;
                switch (this.core.s.currentPagerPosition) {
                    case "left":
                        c = 0;
                        break;
                    case "middle":
                        c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                        break;
                    case "right":
                        c = this.thumbOuterWidth - this.core.s.thumbWidth
                }
                this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (b.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || b.animate({
                    left: -this.left + "px"
                }, this.core.s.speed)) : this.core.doCss() || b.css("left", -this.left + "px"), this.setTranslate(this.left)
            }
        }, c.prototype.enableThumbDrag = function() {
            var b = this,
                c = 0,
                d = 0,
                e = !1,
                f = !1,
                g = 0;
            b.$thumbOuter.addClass("lg-grab"), b.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(a) {
                b.thumbTotalWidth > b.thumbOuterWidth && (a.preventDefault(), c = a.pageX, e = !0, b.core.$outer.scrollLeft += 1, b.core.$outer.scrollLeft -= 1, b.thumbClickable = !1, b.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.thumb", function(a) {
                e && (g = b.left, f = !0, d = a.pageX, b.$thumbOuter.addClass("lg-dragging"), g -= d - c, g > b.thumbTotalWidth - b.thumbOuterWidth && (g = b.thumbTotalWidth - b.thumbOuterWidth), g < 0 && (g = 0), b.setTranslate(g))
            }), a(window).on("mouseup.lg.thumb", function() {
                f ? (f = !1, b.$thumbOuter.removeClass("lg-dragging"), b.left = g, Math.abs(d - c) < b.core.s.swipeThreshold && (b.thumbClickable = !0)) : b.thumbClickable = !0, e && (e = !1, b.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
            })
        }, c.prototype.enableThumbSwipe = function() {
            var a = this,
                b = 0,
                c = 0,
                d = !1,
                e = 0;
            a.core.$outer.find(".lg-thumb").on("touchstart.lg", function(c) {
                a.thumbTotalWidth > a.thumbOuterWidth && (c.preventDefault(), b = c.originalEvent.targetTouches[0].pageX, a.thumbClickable = !1)
            }), a.core.$outer.find(".lg-thumb").on("touchmove.lg", function(f) {
                a.thumbTotalWidth > a.thumbOuterWidth && (f.preventDefault(), c = f.originalEvent.targetTouches[0].pageX, d = !0, a.$thumbOuter.addClass("lg-dragging"), e = a.left, e -= c - b, e > a.thumbTotalWidth - a.thumbOuterWidth && (e = a.thumbTotalWidth - a.thumbOuterWidth), e < 0 && (e = 0), a.setTranslate(e))
            }), a.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
                a.thumbTotalWidth > a.thumbOuterWidth && d ? (d = !1, a.$thumbOuter.removeClass("lg-dragging"), Math.abs(c - b) < a.core.s.swipeThreshold && (a.thumbClickable = !0), a.left = e) : a.thumbClickable = !0
            })
        }, c.prototype.toogle = function() {
            var a = this;
            a.core.s.toogleThumb && (a.core.$outer.addClass("lg-can-toggle"), a.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
                a.core.$outer.toggleClass("lg-thumb-open")
            }))
        }, c.prototype.thumbkeyPress = function() {
            var b = this;
            a(window).on("keydown.lg.thumb", function(a) {
                38 === a.keyCode ? (a.preventDefault(), b.core.$outer.addClass("lg-thumb-open")) : 40 === a.keyCode && (a.preventDefault(), b.core.$outer.removeClass("lg-thumb-open"))
            })
        }, c.prototype.destroy = function() {
            this.core.s.thumbnail && this.core.$items.length > 1 && (a(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
        }, a.fn.lightGallery.modules.Thumbnail = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b(a, b, c, d) {
            var e = this;
            if (e.core.$slide.eq(b).find(".lg-video").append(e.loadVideo(c, "lg-object", !0, b, d)), d)
                if (e.core.s.videojs) try {
                    videojs(e.core.$slide.eq(b).find(".lg-html5").get(0), e.core.s.videojsOptions, function() {
                        !e.videoLoaded && e.core.s.autoplayFirstVideo && this.play()
                    })
                } catch (a) {
                    console.error("Make sure you have included videojs")
                } else !e.videoLoaded && e.core.s.autoplayFirstVideo && e.core.$slide.eq(b).find(".lg-html5").get(0).play()
        }

        function c(a, b) {
            var c = this.core.$slide.eq(b).find(".lg-video-cont");
            c.hasClass("lg-has-iframe") || (c.css("max-width", this.core.s.videoMaxWidth), this.videoLoaded = !0)
        }

        function d(b, c, d) {
            var e = this,
                f = e.core.$slide.eq(c),
                g = f.find(".lg-youtube").get(0),
                h = f.find(".lg-vimeo").get(0),
                i = f.find(".lg-dailymotion").get(0),
                j = f.find(".lg-vk").get(0),
                k = f.find(".lg-html5").get(0);
            if (g) g.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
            else if (h) try {
                    $f(h).api("pause")
                } catch (a) {
                    console.error("Make sure you have included froogaloop2 js")
                } else if (i) i.contentWindow.postMessage("pause", "*");
                else if (k)
                if (e.core.s.videojs) try {
                    videojs(k).pause()
                } catch (a) {
                    console.error("Make sure you have included videojs")
                } else k.pause();
            j && a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay"));
            var l;
            l = e.core.s.dynamic ? e.core.s.dynamicEl[d].src : e.core.$items.eq(d).attr("href") || e.core.$items.eq(d).attr("data-src");
            var m = e.core.isVideo(l, d) || {};
            (m.youtube || m.vimeo || m.dailymotion || m.vk) && e.core.$outer.addClass("lg-hide-download")
        }
        var e = {
                videoMaxWidth: "855px",
                autoplayFirstVideo: !0,
                youtubePlayerParams: !1,
                vimeoPlayerParams: !1,
                dailymotionPlayerParams: !1,
                vkPlayerParams: !1,
                videojs: !1,
                videojsOptions: {}
            },
            f = function(b) {
                return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.videoLoaded = !1, this.init(), this
            };
        f.prototype.init = function() {
            var e = this;
            e.core.$el.on("hasVideo.lg.tm", b.bind(this)), e.core.$el.on("onAferAppendSlide.lg.tm", c.bind(this)), e.core.doCss() && e.core.$items.length > 1 && (e.core.s.enableSwipe || e.core.s.enableDrag) ? e.core.$el.on("onSlideClick.lg.tm", function() {
                var a = e.core.$slide.eq(e.core.index);
                e.loadVideoOnclick(a)
            }) : e.core.$slide.on("click.lg", function() {
                e.loadVideoOnclick(a(this))
            }), e.core.$el.on("onBeforeSlide.lg.tm", d.bind(this)), e.core.$el.on("onAfterSlide.lg.tm", function(a, b) {
                e.core.$slide.eq(b).removeClass("lg-video-playing")
            }), e.core.s.autoplayFirstVideo && e.core.$el.on("onAferAppendSlide.lg.tm", function(a, b) {
                if (!e.core.lGalleryOn) {
                    var c = e.core.$slide.eq(b);
                    setTimeout(function() {
                        e.loadVideoOnclick(c)
                    }, 100)
                }
            })
        }, f.prototype.loadVideo = function(b, c, d, e, f) {
            var g = "",
                h = 1,
                i = "",
                j = this.core.isVideo(b, e) || {};
            if (d && (h = this.videoLoaded ? 0 : this.core.s.autoplayFirstVideo ? 1 : 0), j.youtube) i = "?wmode=opaque&autoplay=" + h + "&enablejsapi=1", this.core.s.youtubePlayerParams && (i = i + "&" + a.param(this.core.s.youtubePlayerParams)), g = '<iframe class="lg-video-object lg-youtube ' + c + '" width="560" height="315" src="//www.youtube.com/embed/' + j.youtube[1] + i + '" frameborder="0" allowfullscreen></iframe>';
            else if (j.vimeo) i = "?autoplay=" + h + "&api=1", this.core.s.vimeoPlayerParams && (i = i + "&" + a.param(this.core.s.vimeoPlayerParams)), g = '<iframe class="lg-video-object lg-vimeo ' + c + '" width="560" height="315"  src="//player.vimeo.com/video/' + j.vimeo[1] + i + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            else if (j.dailymotion) i = "?wmode=opaque&autoplay=" + h + "&api=postMessage", this.core.s.dailymotionPlayerParams && (i = i + "&" + a.param(this.core.s.dailymotionPlayerParams)), g = '<iframe class="lg-video-object lg-dailymotion ' + c + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + j.dailymotion[1] + i + '" frameborder="0" allowfullscreen></iframe>';
            else if (j.html5) {
                var k = f.substring(0, 1);
                "." !== k && "#" !== k || (f = a(f).html()), g = f
            } else j.vk && (i = "&autoplay=" + h, this.core.s.vkPlayerParams && (i = i + "&" + a.param(this.core.s.vkPlayerParams)), g = '<iframe class="lg-video-object lg-vk ' + c + '" width="560" height="315" src="//vk.com/video_ext.php?' + j.vk[1] + i + '" frameborder="0" allowfullscreen></iframe>');
            return g
        }, f.prototype.loadVideoOnclick = function(a) {
            var b = this;
            if (a.find(".lg-object").hasClass("lg-has-poster") && a.find(".lg-object").is(":visible"))
                if (a.hasClass("lg-has-video")) {
                    var c = a.find(".lg-youtube").get(0),
                        d = a.find(".lg-vimeo").get(0),
                        e = a.find(".lg-dailymotion").get(0),
                        f = a.find(".lg-html5").get(0);
                    if (c) c.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    else if (d) try {
                            $f(d).api("play")
                        } catch (a) {
                            console.error("Make sure you have included froogaloop2 js")
                        } else if (e) e.contentWindow.postMessage("play", "*");
                        else if (f)
                        if (b.core.s.videojs) try {
                            videojs(f).play()
                        } catch (a) {
                            console.error("Make sure you have included videojs")
                        } else f.play();
                    a.addClass("lg-video-playing")
                } else {
                    a.addClass("lg-video-playing lg-has-video");
                    var g, h, i = function(c, d) {
                        if (a.find(".lg-video").append(b.loadVideo(c, "", !1, b.core.index, d)), d)
                            if (b.core.s.videojs) try {
                                videojs(b.core.$slide.eq(b.core.index).find(".lg-html5").get(0), b.core.s.videojsOptions, function() {
                                    this.play()
                                })
                            } catch (a) {
                                console.error("Make sure you have included videojs")
                            } else b.core.$slide.eq(b.core.index).find(".lg-html5").get(0).play()
                    };
                    b.core.s.dynamic ? (g = b.core.s.dynamicEl[b.core.index].src, h = b.core.s.dynamicEl[b.core.index].html, i(g, h)) : (g = b.core.$items.eq(b.core.index).attr("href") || b.core.$items.eq(b.core.index).attr("data-src"), h = b.core.$items.eq(b.core.index).attr("data-html"), i(g, h));
                    var j = a.find(".lg-object");
                    a.find(".lg-video").append(j), a.find(".lg-video-object").hasClass("lg-html5") || (a.removeClass("lg-complete"), a.find(".lg-video-object").on("load.lg error.lg", function() {
                        a.addClass("lg-complete")
                    }))
                }
        }, f.prototype.destroy = function() {
            this.videoLoaded = !1
        }, a.fn.lightGallery.modules.video = f
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = function() {
                var a = !1,
                    b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                return b && parseInt(b[2], 10) < 54 && (a = !0), a
            },
            c = {
                scale: 1,
                zoom: !0,
                actualSize: !0,
                enableZoomAfter: 300,
                useLeftForZoom: b()
            },
            d = function(b) {
                return this.core = a(b).data("lightGallery"), this.core.s = a.extend({}, c, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = a(window).width() / 2, this.pageY = a(window).height() / 2 + a(window).scrollTop()), this
            };
        d.prototype.init = function() {
            var b = this,
                c = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
            b.core.s.actualSize && (c += '<span id="lg-actual-size" class="lg-icon"></span>'), b.core.s.useLeftForZoom ? b.core.$outer.addClass("lg-use-left-for-zoom") : b.core.$outer.addClass("lg-use-transition-for-zoom"), this.core.$outer.find(".lg-toolbar").append(c), b.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(c, d, e) {
                var f = b.core.s.enableZoomAfter + e;
                a("body").hasClass("lg-from-hash") && e ? f = 0 : a("body").removeClass("lg-from-hash"), b.zoomabletimeout = setTimeout(function() {
                    b.core.$slide.eq(d).addClass("lg-zoomable")
                }, f + 30)
            });
            var d = 1,
                e = function(c) {
                    var d, e, f = b.core.$outer.find(".lg-current .lg-image"),
                        g = (a(window).width() - f.prop("offsetWidth")) / 2,
                        h = (a(window).height() - f.prop("offsetHeight")) / 2 + a(window).scrollTop();
                    d = b.pageX - g, e = b.pageY - h;
                    var i = (c - 1) * d,
                        j = (c - 1) * e;
                    f.css("transform", "scale3d(" + c + ", " + c + ", 1)").attr("data-scale", c), b.core.s.useLeftForZoom ? f.parent().css({
                        left: -i + "px",
                        top: -j + "px"
                    }).attr("data-x", i).attr("data-y", j) : f.parent().css("transform", "translate3d(-" + i + "px, -" + j + "px, 0)").attr("data-x", i).attr("data-y", j)
                },
                f = function() {
                    d > 1 ? b.core.$outer.addClass("lg-zoomed") : b.resetZoom(), d < 1 && (d = 1), e(d)
                },
                g = function(c, e, g, h) {
                    var i, j = e.prop("offsetWidth");
                    i = b.core.s.dynamic ? b.core.s.dynamicEl[g].width || e[0].naturalWidth || j : b.core.$items.eq(g).attr("data-width") || e[0].naturalWidth || j;
                    var k;
                    b.core.$outer.hasClass("lg-zoomed") ? d = 1 : i > j && (k = i / j, d = k || 2), h ? (b.pageX = a(window).width() / 2, b.pageY = a(window).height() / 2 + a(window).scrollTop()) : (b.pageX = c.pageX || c.originalEvent.targetTouches[0].pageX, b.pageY = c.pageY || c.originalEvent.targetTouches[0].pageY), f(), setTimeout(function() {
                        b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                    }, 10)
                },
                h = !1;
            b.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(a, c) {
                var d = b.core.$slide.eq(c).find(".lg-image");
                d.on("dblclick", function(a) {
                    g(a, d, c)
                }), d.on("touchstart", function(a) {
                    h ? (clearTimeout(h), h = null, g(a, d, c)) : h = setTimeout(function() {
                        h = null
                    }, 300), a.preventDefault()
                })
            }), a(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
                b.pageX = a(window).width() / 2, b.pageY = a(window).height() / 2 + a(window).scrollTop(), e(d)
            }), a("#lg-zoom-out").on("click.lg", function() {
                b.core.$outer.find(".lg-current .lg-image").length && (d -= b.core.s.scale, f())
            }), a("#lg-zoom-in").on("click.lg", function() {
                b.core.$outer.find(".lg-current .lg-image").length && (d += b.core.s.scale, f())
            }), a("#lg-actual-size").on("click.lg", function(a) {
                g(a, b.core.$slide.eq(b.core.index).find(".lg-image"), b.core.index, !0)
            }), b.core.$el.on("onBeforeSlide.lg.tm", function() {
                d = 1, b.resetZoom()
            }), b.zoomDrag(), b.zoomSwipe()
        }, d.prototype.resetZoom = function() {
            this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = a(window).width() / 2, this.pageY = a(window).height() / 2 + a(window).scrollTop()
        }, d.prototype.zoomSwipe = function() {
            var a = this,
                b = {},
                c = {},
                d = !1,
                e = !1,
                f = !1;
            a.core.$slide.on("touchstart.lg", function(c) {
                if (a.core.$outer.hasClass("lg-zoomed")) {
                    var d = a.core.$slide.eq(a.core.index).find(".lg-object");
                    f = d.prop("offsetHeight") * d.attr("data-scale") > a.core.$outer.find(".lg").height(), e = d.prop("offsetWidth") * d.attr("data-scale") > a.core.$outer.find(".lg").width(), (e || f) && (c.preventDefault(), b = {
                        x: c.originalEvent.targetTouches[0].pageX,
                        y: c.originalEvent.targetTouches[0].pageY
                    })
                }
            }), a.core.$slide.on("touchmove.lg", function(g) {
                if (a.core.$outer.hasClass("lg-zoomed")) {
                    var h, i, j = a.core.$slide.eq(a.core.index).find(".lg-img-wrap");
                    g.preventDefault(), d = !0, c = {
                        x: g.originalEvent.targetTouches[0].pageX,
                        y: g.originalEvent.targetTouches[0].pageY
                    }, a.core.$outer.addClass("lg-zoom-dragging"), i = f ? -Math.abs(j.attr("data-y")) + (c.y - b.y) : -Math.abs(j.attr("data-y")), h = e ? -Math.abs(j.attr("data-x")) + (c.x - b.x) : -Math.abs(j.attr("data-x")), (Math.abs(c.x - b.x) > 15 || Math.abs(c.y - b.y) > 15) && (a.core.s.useLeftForZoom ? j.css({
                        left: h + "px",
                        top: i + "px"
                    }) : j.css("transform", "translate3d(" + h + "px, " + i + "px, 0)"))
                }
            }), a.core.$slide.on("touchend.lg", function() {
                a.core.$outer.hasClass("lg-zoomed") && d && (d = !1, a.core.$outer.removeClass("lg-zoom-dragging"), a.touchendZoom(b, c, e, f))
            })
        }, d.prototype.zoomDrag = function() {
            var b = this,
                c = {},
                d = {},
                e = !1,
                f = !1,
                g = !1,
                h = !1;
            b.core.$slide.on("mousedown.lg.zoom", function(d) {
                var f = b.core.$slide.eq(b.core.index).find(".lg-object");
                h = f.prop("offsetHeight") * f.attr("data-scale") > b.core.$outer.find(".lg").height(), g = f.prop("offsetWidth") * f.attr("data-scale") > b.core.$outer.find(".lg").width(), b.core.$outer.hasClass("lg-zoomed") && a(d.target).hasClass("lg-object") && (g || h) && (d.preventDefault(), c = {
                    x: d.pageX,
                    y: d.pageY
                }, e = !0, b.core.$outer.scrollLeft += 1, b.core.$outer.scrollLeft -= 1, b.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.zoom", function(a) {
                if (e) {
                    var i, j, k = b.core.$slide.eq(b.core.index).find(".lg-img-wrap");
                    f = !0, d = {
                        x: a.pageX,
                        y: a.pageY
                    }, b.core.$outer.addClass("lg-zoom-dragging"), j = h ? -Math.abs(k.attr("data-y")) + (d.y - c.y) : -Math.abs(k.attr("data-y")), i = g ? -Math.abs(k.attr("data-x")) + (d.x - c.x) : -Math.abs(k.attr("data-x")), b.core.s.useLeftForZoom ? k.css({
                        left: i + "px",
                        top: j + "px"
                    }) : k.css("transform", "translate3d(" + i + "px, " + j + "px, 0)")
                }
            }), a(window).on("mouseup.lg.zoom", function(a) {
                e && (e = !1, b.core.$outer.removeClass("lg-zoom-dragging"), !f || c.x === d.x && c.y === d.y || (d = {
                    x: a.pageX,
                    y: a.pageY
                }, b.touchendZoom(c, d, g, h)), f = !1), b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
            })
        }, d.prototype.touchendZoom = function(a, b, c, d) {
            var e = this,
                f = e.core.$slide.eq(e.core.index).find(".lg-img-wrap"),
                g = e.core.$slide.eq(e.core.index).find(".lg-object"),
                h = -Math.abs(f.attr("data-x")) + (b.x - a.x),
                i = -Math.abs(f.attr("data-y")) + (b.y - a.y),
                j = (e.core.$outer.find(".lg").height() - g.prop("offsetHeight")) / 2,
                k = Math.abs(g.prop("offsetHeight") * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").height() + j),
                l = (e.core.$outer.find(".lg").width() - g.prop("offsetWidth")) / 2,
                m = Math.abs(g.prop("offsetWidth") * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").width() + l);
            (Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) && (d && (i <= -k ? i = -k : i >= -j && (i = -j)), c && (h <= -m ? h = -m : h >= -l && (h = -l)), d ? f.attr("data-y", Math.abs(i)) : i = -Math.abs(f.attr("data-y")), c ? f.attr("data-x", Math.abs(h)) : h = -Math.abs(f.attr("data-x")), e.core.s.useLeftForZoom ? f.css({
                left: h + "px",
                top: i + "px"
            }) : f.css("transform", "translate3d(" + h + "px, " + i + "px, 0)"))
        }, d.prototype.destroy = function() {
            var b = this;
            b.core.$el.off(".lg.zoom"), a(window).off(".lg.zoom"), b.core.$slide.off(".lg.zoom"), b.core.$el.off(".lg.tm.zoom"), b.resetZoom(), clearTimeout(b.zoomabletimeout), b.zoomabletimeout = !1
        }, a.fn.lightGallery.modules.zoom = d
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                hash: !0
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.core.s.hash && (this.oldHash = window.location.hash, this.init()), this
            };
        c.prototype.init = function() {
            var b, c = this;
            c.core.$el.on("onAfterSlide.lg.tm", function(a, b, d) {
                history.replaceState ? history.replaceState(null, null, window.location.pathname + window.location.search + "#lg=" + c.core.s.galleryId + "&slide=" + d) : window.location.hash = "lg=" + c.core.s.galleryId + "&slide=" + d
            }), a(window).on("hashchange.lg.hash", function() {
                b = window.location.hash;
                var a = parseInt(b.split("&slide=")[1], 10);
                b.indexOf("lg=" + c.core.s.galleryId) > -1 ? c.core.slide(a, !1, !1) : c.core.lGalleryOn && c.core.destroy()
            })
        }, c.prototype.destroy = function() {
            this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? history.replaceState ? history.replaceState(null, null, this.oldHash) : window.location.hash = this.oldHash : history.replaceState ? history.replaceState(null, document.title, window.location.pathname + window.location.search) : window.location.hash = "", this.core.$el.off(".lg.hash"))
        }, a.fn.lightGallery.modules.hash = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                share: !0,
                facebook: !0,
                facebookDropdownText: "Facebook",
                twitter: !0,
                twitterDropdownText: "Twitter",
                googlePlus: !0,
                googlePlusDropdownText: "GooglePlus",
                pinterest: !0,
                pinterestDropdownText: "Pinterest"
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.core.s.share && this.init(), this
            };
        c.prototype.init = function() {
            var b = this,
                c = '<span id="lg-share" class="lg-icon"><ul class="lg-dropdown" style="position: absolute;">';
            c += b.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + "</span></a></li>" : "", c += b.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + "</span></a></li>" : "", c += b.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.googlePlusDropdownText + "</span></a></li>" : "", c += b.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + "</span></a></li>" : "", c += "</ul></span>", this.core.$outer.find(".lg-toolbar").append(c), this.core.$outer.find(".lg").append('<div id="lg-dropdown-overlay"></div>'), a("#lg-share").on("click.lg", function() {
                b.core.$outer.toggleClass("lg-dropdown-active")
            }), a("#lg-dropdown-overlay").on("click.lg", function() {
                b.core.$outer.removeClass("lg-dropdown-active")
            }), b.core.$el.on("onAfterSlide.lg.tm", function(c, d, e) {
                setTimeout(function() {
                    a("#lg-share-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(b.getSahreProps(e, "facebookShareUrl") || window.location.href)), a("#lg-share-twitter").attr("href", "https://twitter.com/intent/tweet?text=" + b.getSahreProps(e, "tweetText") + "&url=" + encodeURIComponent(b.getSahreProps(e, "twitterShareUrl") || window.location.href)), a("#lg-share-googleplus").attr("href", "https://plus.google.com/share?url=" + encodeURIComponent(b.getSahreProps(e, "googleplusShareUrl") || window.location.href)), a("#lg-share-pinterest").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(b.getSahreProps(e, "pinterestShareUrl") || window.location.href) + "&media=" + encodeURIComponent(b.getSahreProps(e, "src")) + "&description=" + b.getSahreProps(e, "pinterestText"))
                }, 100)
            })
        }, c.prototype.getSahreProps = function(a, b) {
            var c = "";
            if (this.core.s.dynamic) c = this.core.s.dynamicEl[a][b];
            else {
                var d = this.core.$items.eq(a).attr("href"),
                    e = this.core.$items.eq(a).data(b);
                c = "src" === b ? d || e : e
            }
            return c
        }, c.prototype.destroy = function() {}, a.fn.lightGallery.modules.share = c
    }()
});
/*-----------------------------------------------------------------------------------*/
/*	16. MOUSEWHEEL
/*-----------------------------------------------------------------------------------*/
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
/*-----------------------------------------------------------------------------------*/
/*	17. VIDEO WRAPPER
/*-----------------------------------------------------------------------------------*/
! function(a, b, c, d) {
    "use strict";

    function e(b, c) {
        function d() {
            e.options.originalVideoW = e.options.$video[0].videoWidth, e.options.originalVideoH = e.options.$video[0].videoHeight, e.initialised || e.init()
        }
        var e = this;
        this.element = b, this.options = a.extend({}, g, c), this._defaults = g, this._name = f, this.options.$video = a(b), this.detectBrowser(), this.shimRequestAnimationFrame(), this.options.has3d = this.detect3d(), this.options.$videoWrap.css({
            position: "relative",
            overflow: "hidden",
            "z-index": "10"
        }), this.options.$video.css({
            position: "absolute",
            "z-index": "1"
        }), this.options.$video.on("canplay canplaythrough", d), this.options.$video[0].readyState > 3 && d()
    }
    var f = "backgroundVideo",
        g = {
            $videoWrap: a(".video-wrapper-inner"),
            $outerWrap: a(b),
            $window: a(b),
            minimumVideoWidth: 400,
            preventContextMenu: !1,
            parallax: !0,
            parallaxOptions: {
                effect: 1.5
            },
            pauseVideoOnViewLoss: !1
        };
    e.prototype = {
        init: function() {
            var a = this;
            this.initialised = !0, this.lastPosition = -1, this.ticking = !1, this.options.$window.resize(function() {
                a.positionObject()
            }), this.options.parallax && this.options.$window.on("scroll", function() {
                a.update()
            }), this.options.pauseVideoOnViewLoss && this.playPauseVideo(), this.options.preventContextMenu && this.options.$video.on("contextmenu", function() {
                return !1
            }), this.options.$window.trigger("resize")
        },
        requestTick: function() {
            var a = this;
            this.ticking || (b.requestAnimationFrame(a.positionObject.bind(a)), this.ticking = !0)
        },
        update: function() {
            this.lastPosition = b.pageYOffset, this.requestTick()
        },
        detect3d: function() {
            var a, e, f = c.createElement("p"),
                g = {
                    WebkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    MSTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            c.body.insertBefore(f, c.body.lastChild);
            for (a in g) f.style[a] !== d && (f.style[a] = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", e = b.getComputedStyle(f).getPropertyValue(g[a]));
            return f.parentNode.removeChild(f), e !== d && "none" !== e
        },
        detectBrowser: function() {
            var a = navigator.userAgent.toLowerCase();
            a.indexOf("chrome") > -1 || a.indexOf("safari") > -1 ? (this.options.browser = "webkit", this.options.browserPrexix = "-webkit-") : a.indexOf("firefox") > -1 ? (this.options.browser = "firefox", this.options.browserPrexix = "-moz-") : -1 !== a.indexOf("MSIE") || a.indexOf("Trident/") > 0 ? (this.options.browser = "ie", this.options.browserPrexix = "-ms-") : a.indexOf("Opera") > -1 && (this.options.browser = "opera", this.options.browserPrexix = "-o-")
        },
        scaleObject: function() {
            var a, b, c;
            return this.options.$videoWrap.width(this.options.$outerWrap.width()), this.options.$videoWrap.height(this.options.$outerWrap.height()), a = this.options.$window.width() / this.options.originalVideoW, b = this.options.$window.height() / this.options.originalVideoH, c = a > b ? a : b, c * this.options.originalVideoW < this.options.minimumVideoWidth && (c = this.options.minimumVideoWidth / this.options.originalVideoW), this.options.$video.width(c * this.options.originalVideoW), this.options.$video.height(c * this.options.originalVideoH), {
                xPos: -parseInt(this.options.$video.width() - this.options.$window.width()) / 2,
                yPos: parseInt(this.options.$video.height() - this.options.$window.height()) / 2
            }
        },
        positionObject: function() {
            var a = this,
                c = b.pageYOffset,
                d = this.scaleObject(this.options.$video, a.options.$videoWrap),
                e = d.xPos,
                f = d.yPos;
            f = this.options.parallax ? c >= 0 ? this.calculateYPos(f, c) : this.calculateYPos(f, 0) : -f, a.options.has3d ? (this.options.$video.css(a.options.browserPrexix + "transform3d", "translate3d(-" + e + "px, " + f + "px, 0)"), this.options.$video.css("transform", "translate3d(" + e + "px, " + f + "px, 0)")) : (this.options.$video.css(a.options.browserPrexix + "transform", "translate(-" + e + "px, " + f + "px)"), this.options.$video.css("transform", "translate(" + e + "px, " + f + "px)")), this.ticking = !1
        },
        calculateYPos: function(a, b) {
            var c, d;
            return c = parseInt(this.options.$videoWrap.offset().top), d = c - b, a = -(d / this.options.parallaxOptions.effect + a)
        },
        disableParallax: function() {
            this.options.$window.unbind(".backgroundVideoParallax")
        },
        playPauseVideo: function() {
            var a = this;
            this.options.$window.on("scroll.backgroundVideoPlayPause", function() {
                a.options.$window.scrollTop() < a.options.$videoWrap.height() ? a.options.$video.get(0).play() : a.options.$video.get(0).pause()
            })
        },
        shimRequestAnimationFrame: function() {
            for (var a = 0, c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !b.requestAnimationFrame; ++d) b.requestAnimationFrame = b[c[d] + "RequestAnimationFrame"], b.cancelAnimationFrame = b[c[d] + "CancelAnimationFrame"] || b[c[d] + "CancelRequestAnimationFrame"];
            b.requestAnimationFrame || (b.requestAnimationFrame = function(c) {
                var d = (new Date).getTime(),
                    e = Math.max(0, 16 - (d - a)),
                    f = b.setTimeout(function() {
                        c(d + e)
                    }, e);
                return a = d + e, f
            }), b.cancelAnimationFrame || (b.cancelAnimationFrame = function(a) {
                clearTimeout(a)
            })
        }
    }, a.fn[f] = function(b) {
        return this.each(function() {
            a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b))
        })
    }
}(jQuery, window, document);
/*-----------------------------------------------------------------------------------*/
/*	18. VANILLA
/*-----------------------------------------------------------------------------------*/
/*
 * Vanilla Form v. 2.1.0
 * Author: Michal Szepielak
 *
 * Product info and license terms:
 * http://codecanyon.net/item/vanilla-form-modern-responsive-contact-form/10447733
 */
var VanillaForm = function(a) {
    "use strict";

    function b() {
        function a() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    }

    function c(a) {
        var b = [];
        return a.each(function(a, c) {
            b[a] = new h(c)
        }), b.length <= 1 ? b[0] : b
    }

    function d() {
        var a = "9320087105434084715";
        return a = a.split(""), a = a.reverse().join("")
    }

    function e(a) {
        a.formFocused = !0
    }

    function f(a, b) {
        var c, d = document.querySelectorAll("[name=" + b.name + "]");
        for (c = 0; c < d.length; c++) d[c].classList.remove("error"), d[c].removeEventListener("focus", k[b.name], !1);
        delete k[b.name], k.length--, k.length <= 0 && (k.length = 0, a.setSubmitState("initial"))
    }

    function g(b) {
        var c = b.getBoundingClientRect(),
            d = Math.round(c.top) - 5,
            e = a.innerHeight;
        return 0 >= d ? void a.scrollBy(0, d) : void(d >= e && a.scrollBy(0, d - e + 30))
    }

    function h(d) {
        var e, f = this;
        return a.jQuery && d instanceof a.jQuery ? c(d) : d ? h.getInstanceByElement(d) instanceof h ? (console.warn("Duplicate initiation of form %s was prevented", d.getAttribute(i)), h.getInstanceByElement(d)) : (e = b(), d.setAttribute(i, e), l[e] = f, f.dict = {
            markedAsSpamError: "Your message was marked as spam and was not sent! Fix your message!",
            markedAsSpamServerError: "Your message was marked as SPAM and was not send.",
            sendSuccess: "We have received your inquiry. Stay tuned, we’ll get back to you very soon.",
            sendError: "Mail server has experienced an error. Please try again.",
            httpRequestError: "[%s] There was a problem with receiving response from mailing server",
            timeoutError: "Your request was timeout. Please try again.",
            parseResponseError: "Response from mailing server was unclear. Please contact administrator.",
            httpRequestConnectionError: "We couldn't connect to the server because of connection error. Please try again."
        }, f.responseTimeout = 5e3, f.httpRequest = null, f.url = d.action || location.href, f.form = d, f.processing = !1, f.submitButton = d.querySelector('[type="submit"]'), f.submitButton ? (f.notificationBox = d.querySelector(".notification-box"), f.notificationBox ? (f.notificationBox.addEventListener("click", function() {
            this.classList.remove("show-error"), this.classList.remove("show-success")
        }, !1), f.formFocused = !1, f.focusBound = null, f.init(), f) : (console.warn("Couldn't bind to submit button"), null)) : (console.warn("Couldn't bind to submit button"), null)) : (console.warn("Couldn't bind to form element"), null)
    }
    var i = "data-vf-id",
        j = "vanillaSendSuccess",
        k = {
            length: 0
        },
        l = {};
    return h.prototype.logError = function(a) {
        this.notify(a, "error")
    }, h.prototype.notify = function(a, b) {
        var c = this.notificationBox;
        return c ? (c.innerHTML = a, c.classList.add("show-" + (b || "error")), void g(c)) : void console.warn("Notification box not found")
    }, h.prototype.setSubmitState = function(a) {
        var b = this,
            c = b.submitButton,
            d = c.getAttribute("data-" + a),
            e = c.className.replace(/state-[a-z]+/gi, "");
        b.processing = "processing" === a, c.className = e + " state-" + a, c.value = d
    }, h.prototype.validateForm = function() {
        var b, c, e, g = this,
            h = g.form,
            i = h.elements,
            j = !1,
            l = !1,
            m = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        for (c = i.length - 1; c >= 0; --c) e = i[c], k[e.name] && f(g, e);
        for (c = i.length - 1; c >= 0; --c) e = i[c], j = !1, "" === e.value && e.required ? j = !0 : ("checkbox" === e.type && e.required && !e.checked && (j = !0), "email" !== e.type || "" === e.value || m.test(e.value) || (j = !0), "radio" === e.type && e.required && (document.querySelector("[name=" + e.name + "]:checked") || (j = !0))), j ? (e.classList.add("error"), k[e.name] || (k[e.name] = f.bind(null, g, e), k.length++), e.addEventListener("focus", k[e.name], !1), l = !0) : e.classList.remove("error"), l && g.setSubmitState("error");
        if (!l) {
            if (g.formFocused !== !0) return g.logError(g.dict.markedAsSpamError), !1;
            b = h.querySelector('[name="contact_secret"]'), b || (b = document.createElement("input"), b.type = "hidden", b.name = "contact_secret", h.appendChild(b)), b.value = d()
        }
        return setTimeout(function() {
            a.scrollBy(0, -1)
        }, 1), !l
    }, h.prototype.resetForm = function() {
        var a, b, c = this,
            d = c.form,
            e = c.submitButton;
        for (b = d.length - 1; b >= 0; --b) a = d[b], a !== e && (a.classList.remove("success"), a.value = "");
        c.setSubmitState("initial")
    }, h.prototype.successForm = function() {
        var a, b = this,
            c = {
                bubbles: !1,
                cancelable: !0,
                detail: b
            };
        a = new CustomEvent(j, c), b.form.dispatchEvent(a), a.defaultPrevented || (b.setSubmitState("success"), b.notify(b.dict.sendSuccess, "success"))
    }, h.prototype.processResponse = function(a) {
        var b, c = this,
            d = c.dict;
        try {
            b = JSON.parse(a)
        } catch (e) {
            console.error(e), b = {
                result: "ParseError"
            }
        }
        switch (b.result) {
            case "OK":
                c.successForm(d.sendSuccess), setTimeout(c.resetForm.bind(c), 4e3);
                break;
            case "NO_SPAM":
                c.logError(d.markedAsSpamServerError);
                break;
            case "SEND_ERROR":
                c.logError(d.sendError), c.setSubmitState("initial");
                break;
            case "ParseError":
                c.logError(d.parseResponseError)
        }
    }, h.prototype.requestStateChange = function() {
        var a = this,
            b = a.httpRequest;
        4 === b.readyState && (200 === b.status ? a.processResponse(b.responseText) : (a.setSubmitState("initial"), 0 === b.status ? a.logError(a.dict.httpRequestConnectionError) : a.logError(a.dict.httpRequestError.replace("%s", b.status))))
    }, h.prototype.init = function() {
        var b, c, d = this,
            f = d.form,
            g = d.submitButton,
            h = f.elements;
        if (f.addEventListener("submit", d.submitForm.bind(d), !0), a.XMLHttpRequest ? d.httpRequest = new XMLHttpRequest : a.ActiveXObject("Microsoft.XMLHTTP") && (d.httpRequest = new ActiveXObject("Microsoft.XMLHTTP")), d.focusBound = e.bind(null, d), !d.httpRequest) return console.error("Couldn't init XMLHttpRequest"), null;
        for (d.formFocused = !1, c = h.length - 1; c >= 0; --c) b = h[c], "submit" !== b.type && b.addEventListener("focus", d.focusBound, !1);
        g.value !== g.getAttribute("data-initial") && (g.setAttribute("data-initial", g.value), d.setSubmitState("initial"))
    }, h.prototype.send = function(a) {
        var b = this,
            c = b.httpRequest;
        c.open("POST", b.url, !0), c.timeout = b.responseTimeout, c.ontimeout = function() {
            b.logError(b.dict.timeoutError), b.setSubmitState("initial")
        }, c.send(a), c.onreadystatechange = b.requestStateChange.bind(b)
    }, h.prototype.submitForm = function(a) {
        var b = this,
            c = "";
        return a && (a.preventDefault(), a.stopPropagation()), b.processing ? void 0 : (b.validateForm() && (b.setSubmitState("processing"), c = new FormData(b.form), b.send(c)), !1)
    }, h.getInstanceByElement = function(a) {
        var b = a.getAttribute(i) || "";
        return l.hasOwnProperty(b) ? l[b] : null
    }, h
}(window);
/*-----------------------------------------------------------------------------------*/
/*	19. BACKSTRETCH
/*-----------------------------------------------------------------------------------*/
/*! Backstretch - v2.1.15 - 2017-06-22\n* Copyright (c) 2017 Scott Robbin;* Fork of improvements - by Daniel Cohen Gindi (danielgindi@gmail.com) Licensed MIT */
! function(a, b, c) {
    "use strict";

    function d(a) {
        return m.hasOwnProperty(a) ? a : "cover"
    }
    var e = /^.*(youtu\.be\/|youtube\.com\/v\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtube\.com\/watch\?.*\&v=)([^#\&\?]*).*/i;
    a.fn.backstretch = function(d, e) {
        var f = arguments;
        0 === a(b).scrollTop() && b.scrollTo(0, 0);
        var g;
        return this.each(function(b) {
            var h = a(this),
                i = h.data("backstretch");
            if (i) {
                if ("string" == typeof f[0] && "function" == typeof i[f[0]]) {
                    var j = i[f[0]].apply(i, Array.prototype.slice.call(f, 1));
                    return j === i && (j = c), void(j !== c && (g = g || [], g[b] = j))
                }
                e = a.extend(i.options, e), i.hasOwnProperty("destroy") && i.destroy(!0)
            }
            if (!d || d && 0 === d.length) {
                var k = h.css("background-image");
                k && "none" !== k ? d = [{
                    url: h.css("backgroundImage").replace(/url\(|\)|"|'/g, "")
                }] : a.error("No images were supplied for Backstretch, or element must have a CSS-defined background image.")
            }
            i = new n(this, d, e || {}), h.data("backstretch", i)
        }), g ? 1 === g.length ? g[0] : g : this
    }, a.backstretch = function(b, c) {
        return a("body").backstretch(b, c).data("backstretch")
    }, a.expr[":"].backstretch = function(b) {
        return a(b).data("backstretch") !== c
    }, a.fn.backstretch.defaults = {
        duration: 5e3,
        transition: "fade",
        transitionDuration: 0,
        animateFirst: !0,
        alignX: .5,
        alignY: .5,
        paused: !1,
        start: 0,
        preload: 2,
        preloadSize: 1,
        resolutionRefreshRate: 2500,
        resolutionChangeRatioThreshold: .1
    };
    var f = {
            wrap: {
                left: 0,
                top: 0,
                overflow: "hidden",
                margin: 0,
                padding: 0,
                height: "100%",
                width: "100%",
                zIndex: -999999
            },
            itemWrapper: {
                position: "absolute",
                display: "none",
                margin: 0,
                padding: 0,
                border: "none",
                width: "100%",
                height: "100%",
                zIndex: -999999
            },
            item: {
                position: "absolute",
                margin: 0,
                padding: 0,
                border: "none",
                width: "100%",
                height: "100%",
                maxWidth: "none"
            }
        },
        g = function() {
            var c = function(a) {
                    for (var b = 1; b < a.length; b++) {
                        for (var c = a[b], d = b; a[d - 1] && parseInt(a[d - 1].width, 10) > parseInt(c.width, 10);) a[d] = a[d - 1], --d;
                        a[d] = c
                    }
                    return a
                },
                d = function(a, c, d) {
                    for (var e, f, g = b.devicePixelRatio || 1, h = q(), i = (r(), c > a ? "portrait" : a > c ? "landscape" : "square"), j = 0, k = 0; k < d.length && (f = d[k], "string" == typeof f && (f = d[k] = {
                            url: f
                        }), f.pixelRatio && "auto" !== f.pixelRatio && parseFloat(f.pixelRatio) !== g || f.deviceOrientation && f.deviceOrientation !== h || f.windowOrientation && f.windowOrientation !== h || f.orientation && f.orientation !== i || (j = k, e = a, "auto" === f.pixelRatio && (a *= g), !(f.width >= e))); k++);
                    return d[Math.min(k, j)]
                },
                e = function(a, b) {
                    if ("string" == typeof a) a = a.replace(/{{(width|height)}}/g, b);
                    else if (a instanceof Array)
                        for (var c = 0; c < a.length; c++) a[c].src ? a[c].src = e(a[c].src, b) : a[c] = e(a[c], b);
                    return a
                };
            return function(b, f) {
                for (var g = b.width(), h = b.height(), i = [], j = function(a, b) {
                        return "width" === b ? g : "height" === b ? h : a
                    }, k = 0; k < f.length; k++)
                    if (a.isArray(f[k])) {
                        f[k] = c(f[k]);
                        var l = d(g, h, f[k]);
                        i.push(l)
                    } else {
                        "string" == typeof f[k] && (f[k] = {
                            url: f[k]
                        });
                        var m = a.extend({}, f[k]);
                        m.url = e(m.url, j), i.push(m)
                    }
                return i
            }
        }(),
        h = function(a) {
            return e.test(a.url) || a.isVideo
        },
        i = function(b, c, d, e, f) {
            var g = [],
                i = function(a) {
                    for (var b = 0; b < g.length; b++)
                        if (g[b].src === a.src) return g[b];
                    return g.push(a), a
                },
                j = function(a, b, c) {
                    "function" == typeof b && b.call(a, c)
                };
            return function b(c, d, e, f, g) {
                if ("undefined" != typeof c) {
                    a.isArray(c) || (c = [c]), arguments.length < 5 && "function" == typeof arguments[arguments.length - 1] && (g = arguments[arguments.length - 1]), d = "function" != typeof d && d ? d : 0, e = "function" == typeof e || !e || e < 0 ? c.length : Math.min(e, c.length), f = "function" != typeof f && f ? f : 1, d >= c.length && (d = 0, e = 0), f < 0 && (f = e), f = Math.min(f, e);
                    var k = c.slice(d + f, e - f);
                    if (c = c.slice(d, f), e = c.length, !e) return void j(c, g, !0);
                    for (var l, m = 0, n = function() {
                            m++, m === e && (j(c, g, !k), b(k, 0, 0, f, g))
                        }, o = 0; o < c.length; o++) h(c[o]) || (l = new Image, l.src = c[o].url, l = i(l), l.complete ? n() : a(l).on("load error", n))
                }
            }
        }(),
        j = function(b) {
            for (var c = [], d = 0; d < b.length; d++) "string" == typeof b[d] ? c.push({
                url: b[d]
            }) : a.isArray(b[d]) ? c.push(j(b[d])) : c.push(k(b[d]));
            return c
        },
        k = function(a, e) {
            return (a.centeredX || a.centeredY) && (b.console && b.console.log && b.console.log("jquery.backstretch: `centeredX`/`centeredY` is deprecated, please use `alignX`/`alignY`"), a.centeredX && (a.alignX = .5), a.centeredY && (a.alignY = .5)), a.speed !== c && (b.console && b.console.log && b.console.log("jquery.backstretch: `speed` is deprecated, please use `transitionDuration`"), a.transitionDuration = a.speed, a.transition = "fade"), a.resolutionChangeRatioTreshold !== c && (b.console.log("jquery.backstretch: `treshold` is a typo!"), a.resolutionChangeRatioThreshold = a.resolutionChangeRatioTreshold), a.fadeFirst !== c && (a.animateFirst = a.fadeFirst), a.fade !== c && (a.transitionDuration = a.fade, a.transition = "fade"), a.scale && (a.scale = d(a.scale)), l(a)
        },
        l = function(a, b) {
            return "left" === a.alignX ? a.alignX = 0 : "center" === a.alignX ? a.alignX = .5 : "right" === a.alignX ? a.alignX = 1 : (a.alignX !== c || b) && (a.alignX = parseFloat(a.alignX), isNaN(a.alignX) && (a.alignX = .5)), "top" === a.alignY ? a.alignY = 0 : "center" === a.alignY ? a.alignY = .5 : "bottom" === a.alignY ? a.alignY = 1 : (a.alignX !== c || b) && (a.alignY = parseFloat(a.alignY), isNaN(a.alignY) && (a.alignY = .5)), a
        },
        m = {
            cover: "cover",
            fit: "fit",
            "fit-smaller": "fit-smaller",
            fill: "fill"
        },
        n = function(c, d, e) {
            this.options = a.extend({}, a.fn.backstretch.defaults, e || {}), this.firstShow = !0, k(this.options, !0), this.images = j(a.isArray(d) ? d : [d]), this.options.paused && (this.paused = !0), this.options.start >= this.images.length && (this.options.start = this.images.length - 1), this.options.start < 0 && (this.options.start = 0), this.isBody = c === document.body;
            var h = a(b);
            this.$container = a(c), this.$root = this.isBody ? s ? h : a(document) : this.$container, this.originalImages = this.images, this.images = g(this.options.alwaysTestWindowResolution ? h : this.$root, this.originalImages), i(this.images, this.options.start || 0, this.options.preload || 1);
            var l = this.$container.children(".backstretch").first();
            if (this.$wrap = l.length ? l : a('<div class="backstretch"></div>').css(this.options.bypassCss ? {} : f.wrap).appendTo(this.$container), !this.options.bypassCss) {
                if (!this.isBody) {
                    var m = this.$container.css("position"),
                        n = this.$container.css("zIndex");
                    this.$container.css({
                        position: "static" === m ? "relative" : m,
                        zIndex: "auto" === n ? 0 : n
                    }), this.$wrap.css({
                        zIndex: -999998
                    })
                }
                this.$wrap.css({
                    position: this.isBody && s ? "fixed" : "absolute"
                })
            }
            this.index = this.options.start, this.show(this.index), h.on("resize.backstretch", a.proxy(this.resize, this)).on("orientationchange.backstretch", a.proxy(function() {
                this.isBody && 0 === b.pageYOffset && (b.scrollTo(0, 1), this.resize())
            }, this))
        },
        o = function(b) {
            var d = b.transition || "fade";
            "string" == typeof d && d.indexOf("|") > -1 && (d = d.split("|")), d instanceof Array && (d = d[Math.round(Math.random() * (d.length - 1))]);
            var e = b.new,
                f = b.old ? b.old : a([]);
            switch (d.toString().toLowerCase()) {
                default:
                    case "fade":
                    e.fadeIn({
                    duration: b.duration,
                    complete: b.complete,
                    easing: b.easing || c
                });
                break;
                case "fadeinout":
                        case "fade_in_out":
                        var g = function() {
                        e.fadeIn({
                            duration: b.duration / 2,
                            complete: b.complete,
                            easing: b.easing || c
                        })
                    };f.length ? f.fadeOut({
                        duration: b.duration / 2,
                        complete: g,
                        easing: b.easing || c
                    }) : g();
                    break;
                case "pushleft":
                        case "push_left":
                        case "pushright":
                        case "push_right":
                        case "pushup":
                        case "push_up":
                        case "pushdown":
                        case "push_down":
                        case "coverleft":
                        case "cover_left":
                        case "coverright":
                        case "cover_right":
                        case "coverup":
                        case "cover_up":
                        case "coverdown":
                        case "cover_down":
                        var h = d.match(/^(cover|push)_?(.*)$/),
                        i = "left" === h[2] ? "right" : "right" === h[2] ? "left" : "down" === h[2] ? "top" : "up" === h[2] ? "bottom" : "right",
                        j = {
                            display: ""
                        },
                        k = {};
                    if (j[i] = "-100%", k[i] = 0, e.css(j).animate(k, {
                            duration: b.duration,
                            complete: function() {
                                e.css(i, ""), b.complete.apply(this, arguments)
                            },
                            easing: b.easing || c
                        }), "push" === h[1] && f.length) {
                        var l = {};
                        l[i] = "100%", f.animate(l, {
                            duration: b.duration,
                            complete: function() {
                                f.css("display", "none")
                            },
                            easing: b.easing || c
                        })
                    }
            }
        };
    n.prototype = {
        resize: function() {
            try {
                var e = this.options.alwaysTestWindowResolution ? a(b) : this.$root,
                    f = e.width(),
                    h = e.height(),
                    j = f / (this._lastResizeContainerWidth || 0),
                    k = h / (this._lastResizeContainerHeight || 0),
                    l = this.options.resolutionChangeRatioThreshold || 0;
                if ((f !== this._lastResizeContainerWidth || h !== this._lastResizeContainerHeight) && (Math.abs(j - 1) >= l || isNaN(j) || Math.abs(k - 1) >= l || isNaN(k)) && (this._lastResizeContainerWidth = f, this._lastResizeContainerHeight = h, this.images = g(e, this.originalImages), this.options.preload && i(this.images, (this.index + 1) % this.images.length, this.options.preload), 1 === this.images.length && this._currentImage.url !== this.images[0].url)) {
                    var m = this;
                    clearTimeout(m._selectAnotherResolutionTimeout), m._selectAnotherResolutionTimeout = setTimeout(function() {
                        m.show(0)
                    }, this.options.resolutionRefreshRate)
                }
                var n, o, p = {
                        left: 0,
                        top: 0,
                        right: "auto",
                        bottom: "auto"
                    },
                    q = this.isBody ? this.$root.width() : this.$root.innerWidth(),
                    r = this.isBody ? b.innerHeight ? b.innerHeight : this.$root.height() : this.$root.innerHeight(),
                    s = this.$itemWrapper.data("width"),
                    t = this.$itemWrapper.data("height"),
                    u = s / t || 1,
                    v = this._currentImage.alignX === c ? this.options.alignX : this._currentImage.alignX,
                    w = this._currentImage.alignY === c ? this.options.alignY : this._currentImage.alignY,
                    x = d(this._currentImage.scale || this.options.scale);
                if ("fit" === x || "fit-smaller" === x) {
                    if (n = s, o = t, n > q || o > r || "fit-smaller" === x) {
                        var y = q / r;
                        y > u ? (n = Math.floor(r * u), o = r) : y < u ? (n = q, o = Math.floor(q / u)) : (n = q, o = r)
                    }
                } else "fill" === x ? (n = q, o = r) : (n = Math.max(r * u, q), o = Math.max(n / u, r));
                p.top = -(o - r) * w, p.left = -(n - q) * v, p.width = n, p.height = o, this.options.bypassCss || this.$wrap.css({
                    width: q,
                    height: r
                }).find(">.backstretch-item").not(".deleteable").each(function() {
                    var b = a(this);
                    b.find("img,video,iframe").css(p)
                });
                var z = a.Event("backstretch.resize", {
                    relatedTarget: this.$container[0]
                });
                this.$container.trigger(z, this)
            } catch (a) {}
            return this
        },
        show: function(b, d) {
            if (!(Math.abs(b) > this.images.length - 1)) {
                var e = this,
                    g = e.$wrap.find(">.backstretch-item").addClass("deleteable"),
                    i = e.videoWrapper,
                    j = {
                        relatedTarget: e.$container[0]
                    };
                e.$container.trigger(a.Event("backstretch.before", j), [e, b]), this.index = b;
                var k = e.images[b];
                clearTimeout(e._cycleTimeout), delete e.videoWrapper;
                var l = h(k);
                return l ? (e.videoWrapper = new p(k), e.$item = e.videoWrapper.$video.css("pointer-events", "none")) : e.$item = a("<img />"), e.$itemWrapper = a('<div class="backstretch-item">').append(e.$item), this.options.bypassCss ? e.$itemWrapper.css({
                    display: "none"
                }) : (e.$itemWrapper.css(f.itemWrapper), e.$item.css(f.item)), e.$item.bind(l ? "canplay" : "load", function(f) {
                    var h = a(this),
                        k = h.parent(),
                        m = k.data("options");
                    d && (m = a.extend({}, m, d));
                    var n = this.naturalWidth || this.videoWidth || this.width,
                        p = this.naturalHeight || this.videoHeight || this.height;
                    k.data("width", n).data("height", p);
                    var q = function(a) {
                            return m[a] !== c ? m[a] : e.options[a]
                        },
                        r = q("transition"),
                        s = q("transitionEasing"),
                        t = q("transitionDuration"),
                        u = function() {
                            i && (i.stop(), i.destroy()), g.remove(), !e.paused && e.images.length > 1 && e.cycle(), e.options.bypassCss || e.isBody || e.$container.css("background-image", "none"), a(["after", "show"]).each(function() {
                                e.$container.trigger(a.Event("backstretch." + this, j), [e, b])
                            }), l && e.videoWrapper.play()
                        };
                    e.firstShow && !e.options.animateFirst || !t || !r ? (k.show(), u()) : o({
                        new: k,
                        old: g,
                        transition: r,
                        duration: t,
                        easing: s,
                        complete: u
                    }), e.firstShow = !1, e.resize()
                }), e.$itemWrapper.appendTo(e.$wrap), e.$item.attr("alt", k.alt || ""), e.$itemWrapper.data("options", k), l || e.$item.attr("src", k.url), e._currentImage = k, e
            }
        },
        current: function() {
            return this.index
        },
        next: function() {
            var a = Array.prototype.slice.call(arguments, 0);
            return a.unshift(this.index < this.images.length - 1 ? this.index + 1 : 0), this.show.apply(this, a)
        },
        prev: function() {
            var a = Array.prototype.slice.call(arguments, 0);
            return a.unshift(0 === this.index ? this.images.length - 1 : this.index - 1), this.show.apply(this, a)
        },
        pause: function() {
            return this.paused = !0, this.videoWrapper && this.videoWrapper.pause(), this
        },
        resume: function() {
            return this.paused = !1, this.videoWrapper && this.videoWrapper.play(), this.cycle(), this
        },
        cycle: function() {
            if (this.images.length > 1) {
                clearTimeout(this._cycleTimeout);
                var b = this._currentImage && this._currentImage.duration || this.options.duration,
                    c = h(this._currentImage),
                    d = function() {
                        this.$item.off(".cycle"), this.paused || this.next()
                    };
                if (c) {
                    if (!this._currentImage.loop) {
                        var e = 0;
                        this.$item.on("playing.cycle", function() {
                            var b = a(this).data("player");
                            clearTimeout(e), e = setTimeout(function() {
                                b.pause(), b.$video.trigger("ended")
                            }, 1e3 * (b.getDuration() - b.getCurrentTime()))
                        }).on("ended.cycle", function() {
                            clearTimeout(e)
                        })
                    }
                    this.$item.on("error.cycle initerror.cycle", a.proxy(d, this))
                }
                c && !this._currentImage.duration ? this.$item.on("ended.cycle", a.proxy(d, this)) : this._cycleTimeout = setTimeout(a.proxy(d, this), b)
            }
            return this
        },
        destroy: function(c) {
            a(b).off("resize.backstretch orientationchange.backstretch"), this.videoWrapper && this.videoWrapper.destroy(), clearTimeout(this._cycleTimeout), c || this.$wrap.remove(), this.$container.removeData("backstretch")
        }
    };
    var p = function() {
        this.init.apply(this, arguments)
    };
    p.prototype.init = function(d) {
        var f, g = this,
            h = function() {
                g.$video = f, g.video = f[0]
            },
            i = "video";
        if (d.url instanceof Array || !e.test(d.url) || (i = "youtube"), g.type = i, "youtube" === i) {
            p.loadYoutubeAPI(), g.ytId = d.url.match(e)[2];
            var j = "https://www.youtube.com/embed/" + g.ytId + "?rel=0&autoplay=0&showinfo=0&controls=0&modestbranding=1&cc_load_policy=0&disablekb=1&iv_load_policy=3&loop=0&enablejsapi=1&origin=" + encodeURIComponent(b.location.origin);
            g.__ytStartMuted = !!d.mute || d.mute === c, f = a("<iframe />").attr({
                src_to_load: j
            }).css({
                border: 0,
                margin: 0,
                padding: 0
            }).data("player", g), d.loop && f.on("ended.loop", function() {
                g.__manuallyStopped || g.play()
            }), g.ytReady = !1, h(), b.YT ? (g._initYoutube(), f.trigger("initsuccess")) : a(b).one("youtube_api_load", function() {
                g._initYoutube(), f.trigger("initsuccess")
            })
        } else {
            f = a("<video>").prop("autoplay", !1).prop("controls", !1).prop("loop", !!d.loop).prop("muted", !!d.mute || d.mute === c).prop("preload", "auto").prop("poster", d.poster || "");
            for (var k = d.url instanceof Array ? d.url : [d.url], l = 0; l < k.length; l++) {
                var m = k[l];
                "string" == typeof m && (m = {
                    src: m
                }), a("<source>").attr("src", m.src).attr("type", m.type || null).appendTo(f)
            }
            f[0].canPlayType && k.length ? f.trigger("initsuccess") : f.trigger("initerror"), h()
        }
    }, p.prototype._initYoutube = function() {
        var c = this,
            d = b.YT;
        c.$video.attr("src", c.$video.attr("src_to_load")).removeAttr("src_to_load");
        var e = !!c.$video[0].parentNode;
        if (!e) {
            var f = a("<div>").css("display", "none !important").appendTo(document.body);
            c.$video.appendTo(f)
        }
        var g = new d.Player(c.video, {
            events: {
                onReady: function() {
                    c.__ytStartMuted && g.mute(), e || (c.$video[0].parentNode === f[0] && c.$video.detach(), f.remove()), c.ytReady = !0, c._updateYoutubeSize(), c.$video.trigger("canplay")
                },
                onStateChange: function(a) {
                    switch (a.data) {
                        case d.PlayerState.PLAYING:
                            c.$video.trigger("playing");
                            break;
                        case d.PlayerState.ENDED:
                            c.$video.trigger("ended");
                            break;
                        case d.PlayerState.PAUSED:
                            c.$video.trigger("pause");
                            break;
                        case d.PlayerState.BUFFERING:
                            c.$video.trigger("waiting");
                            break;
                        case d.PlayerState.CUED:
                            c.$video.trigger("canplay")
                    }
                },
                onPlaybackQualityChange: function() {
                    c._updateYoutubeSize(), c.$video.trigger("resize")
                },
                onError: function(a) {
                    c.hasError = !0, c.$video.trigger({
                        type: "error",
                        error: a
                    })
                }
            }
        });
        return c.ytPlayer = g, c
    }, p.prototype._updateYoutubeSize = function() {
        var a = this;
        switch (a.ytPlayer.getPlaybackQuality() || "medium") {
            case "small":
                a.video.videoWidth = 426, a.video.videoHeight = 240;
                break;
            case "medium":
                a.video.videoWidth = 640, a.video.videoHeight = 360;
                break;
            default:
            case "large":
                a.video.videoWidth = 854, a.video.videoHeight = 480;
                break;
            case "hd720":
                a.video.videoWidth = 1280, a.video.videoHeight = 720;
                break;
            case "hd1080":
                a.video.videoWidth = 1920, a.video.videoHeight = 1080;
                break;
            case "highres":
                a.video.videoWidth = 2560, a.video.videoHeight = 1440
        }
        return a
    }, p.prototype.play = function() {
        var a = this;
        return a.__manuallyStopped = !1, "youtube" === a.type ? a.ytReady && (a.$video.trigger("play"), a.ytPlayer.playVideo()) : a.video.play(), a
    }, p.prototype.pause = function() {
        var a = this;
        return a.__manuallyStopped = !1, "youtube" === a.type ? a.ytReady && a.ytPlayer.pauseVideo() : a.video.pause(), a
    }, p.prototype.stop = function() {
        var a = this;
        return a.__manuallyStopped = !0, "youtube" === a.type ? a.ytReady && (a.ytPlayer.pauseVideo(), a.ytPlayer.seekTo(0)) : (a.video.pause(), a.video.currentTime = 0), a
    }, p.prototype.destroy = function() {
        var a = this;
        return a.ytPlayer && a.ytPlayer.destroy(), a.$video.remove(), a
    }, p.prototype.getCurrentTime = function(a) {
        var b = this;
        return "youtube" !== b.type ? b.video.currentTime : b.ytReady ? b.ytPlayer.getCurrentTime() : 0
    }, p.prototype.setCurrentTime = function(a) {
        var b = this;
        return "youtube" === b.type ? b.ytReady && b.ytPlayer.seekTo(a, !0) : b.video.currentTime = a, b
    }, p.prototype.getDuration = function() {
        var a = this;
        return "youtube" !== a.type ? a.video.duration : a.ytReady ? a.ytPlayer.getDuration() : 0
    }, p.loadYoutubeAPI = function() {
        if (!b.YT) {
            a("script[src*=www\\.youtube\\.com\\/iframe_api]").length || a('<script type="text/javascript" src="https://www.youtube.com/iframe_api">').appendTo("body");
            var c = setInterval(function() {
                b.YT && b.YT.loaded && (a(b).trigger("youtube_api_load"), clearTimeout(c))
            }, 50)
        }
    };
    var q = function() {
            if ("matchMedia" in b) {
                if (b.matchMedia("(orientation: portrait)").matches) return "portrait";
                if (b.matchMedia("(orientation: landscape)").matches) return "landscape"
            }
            return screen.height > screen.width ? "portrait" : "landscape"
        },
        r = function() {
            return b.innerHeight > b.innerWidth ? "portrait" : b.innerWidth > b.innerHeight ? "landscape" : "square"
        },
        s = function() {
            var a = navigator.userAgent,
                c = navigator.platform,
                d = a.match(/AppleWebKit\/([0-9]+)/),
                e = !!d && d[1],
                f = a.match(/Fennec\/([0-9]+)/),
                g = !!f && f[1],
                h = a.match(/Opera Mobi\/([0-9]+)/),
                i = !!h && h[1],
                j = a.match(/MSIE ([0-9]+)/),
                k = !!j && j[1];
            return !((c.indexOf("iPhone") > -1 || c.indexOf("iPad") > -1 || c.indexOf("iPod") > -1) && e && e < 534 || b.operamini && "[object OperaMini]" === {}.toString.call(b.operamini) || h && i < 7458 || a.indexOf("Android") > -1 && e && e < 533 || g && g < 6 || "palmGetResource" in b && e && e < 534 || a.indexOf("MeeGo") > -1 && a.indexOf("NokiaBrowser/8.5.0") > -1 || k && k <= 6)
        }()
}(jQuery, window);
/*-----------------------------------------------------------------------------------*/
/*	20. EASING
/*-----------------------------------------------------------------------------------*/
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return n(e)
    }) : "object" == typeof module && "object" == typeof module.exports ? exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    function e(n) {
        var e = 7.5625,
            t = 2.75;
        return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + .75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + .9375 : e * (n -= 2.625 / t) * n + .984375
    }
    n.easing.jswing = n.easing.swing;
    var t = Math.pow,
        u = Math.sqrt,
        r = Math.sin,
        i = Math.cos,
        a = Math.PI,
        c = 1.70158,
        o = 1.525 * c,
        s = 2 * a / 3,
        f = 2 * a / 4.5;
    n.extend(n.easing, {
        def: "easeOutQuad",
        swing: function(e) {
            return n.easing[n.easing.def](e)
        },
        easeInQuad: function(n) {
            return n * n
        },
        easeOutQuad: function(n) {
            return 1 - (1 - n) * (1 - n)
        },
        easeInOutQuad: function(n) {
            return n < .5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2
        },
        easeInCubic: function(n) {
            return n * n * n
        },
        easeOutCubic: function(n) {
            return 1 - t(1 - n, 3)
        },
        easeInOutCubic: function(n) {
            return n < .5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2
        },
        easeInQuart: function(n) {
            return n * n * n * n
        },
        easeOutQuart: function(n) {
            return 1 - t(1 - n, 4)
        },
        easeInOutQuart: function(n) {
            return n < .5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2
        },
        easeInQuint: function(n) {
            return n * n * n * n * n
        },
        easeOutQuint: function(n) {
            return 1 - t(1 - n, 5)
        },
        easeInOutQuint: function(n) {
            return n < .5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2
        },
        easeInSine: function(n) {
            return 1 - i(n * a / 2)
        },
        easeOutSine: function(n) {
            return r(n * a / 2)
        },
        easeInOutSine: function(n) {
            return -(i(a * n) - 1) / 2
        },
        easeInExpo: function(n) {
            return 0 === n ? 0 : t(2, 10 * n - 10)
        },
        easeOutExpo: function(n) {
            return 1 === n ? 1 : 1 - t(2, -10 * n)
        },
        easeInOutExpo: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2
        },
        easeInCirc: function(n) {
            return 1 - u(1 - t(n, 2))
        },
        easeOutCirc: function(n) {
            return u(1 - t(n - 1, 2))
        },
        easeInOutCirc: function(n) {
            return n < .5 ? (1 - u(1 - t(2 * n, 2))) / 2 : (u(1 - t(-2 * n + 2, 2)) + 1) / 2
        },
        easeInElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s)
        },
        easeOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : t(2, -10 * n) * r((10 * n - .75) * s) + 1
        },
        easeInOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2 : t(2, -20 * n + 10) * r((20 * n - 11.125) * f) / 2 + 1
        },
        easeInBack: function(n) {
            return (c + 1) * n * n * n - c * n * n
        },
        easeOutBack: function(n) {
            return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2)
        },
        easeInOutBack: function(n) {
            return n < .5 ? t(2 * n, 2) * (7.189819 * n - o) / 2 : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2
        },
        easeInBounce: function(n) {
            return 1 - e(1 - n)
        },
        easeOutBounce: e,
        easeInOutBounce: function(n) {
            return n < .5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2
        }
    })
});
/*-----------------------------------------------------------------------------------*/
/*	21. PRETTIFY
/*-----------------------------------------------------------------------------------*/
! function() {
    /*
     Copyright (C) 2006 Google Inc.
     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at
          http://www.apache.org/licenses/LICENSE-2.0
     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
    */
    window.PR_SHOULD_USE_CONTINUATION = !0;
    (function() {
        function T(a) {
            function d(e) {
                var b = e.charCodeAt(0);
                if (92 !== b) return b;
                var a = e.charAt(1);
                return (b = w[a]) ? b : "0" <= a && "7" >= a ? parseInt(e.substring(1), 8) : "u" === a || "x" === a ? parseInt(e.substring(2), 16) : e.charCodeAt(1)
            }

            function f(e) {
                if (32 > e) return (16 > e ? "\\x0" : "\\x") + e.toString(16);
                e = String.fromCharCode(e);
                return "\\" === e || "-" === e || "]" === e || "^" === e ? "\\" + e : e
            }

            function b(e) {
                var b = e.substring(1, e.length - 1).match(/\\u[0-9A-Fa-f]{4}|\\x[0-9A-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\s\S]|-|[^-\\]/g);
                e = [];
                var a = "^" === b[0],
                    c = ["["];
                a && c.push("^");
                for (var a = a ? 1 : 0, g = b.length; a < g; ++a) {
                    var h = b[a];
                    if (/\\[bdsw]/i.test(h)) c.push(h);
                    else {
                        var h = d(h),
                            k;
                        a + 2 < g && "-" === b[a + 1] ? (k = d(b[a + 2]), a += 2) : k = h;
                        e.push([h, k]);
                        65 > k || 122 < h || (65 > k || 90 < h || e.push([Math.max(65, h) | 32, Math.min(k, 90) | 32]), 97 > k || 122 < h || e.push([Math.max(97, h) & -33, Math.min(k, 122) & -33]))
                    }
                }
                e.sort(function(e, a) {
                    return e[0] - a[0] || a[1] - e[1]
                });
                b = [];
                g = [];
                for (a = 0; a < e.length; ++a) h = e[a], h[0] <= g[1] + 1 ? g[1] = Math.max(g[1], h[1]) : b.push(g = h);
                for (a = 0; a < b.length; ++a) h = b[a],
                    c.push(f(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && c.push("-"), c.push(f(h[1])));
                c.push("]");
                return c.join("")
            }

            function v(e) {
                for (var a = e.source.match(/(?:\[(?:[^\x5C\x5D]|\\[\s\S])*\]|\\u[A-Fa-f0-9]{4}|\\x[A-Fa-f0-9]{2}|\\[0-9]+|\\[^ux0-9]|\(\?[:!=]|[\(\)\^]|[^\x5B\x5C\(\)\^]+)/g), c = a.length, d = [], g = 0, h = 0; g < c; ++g) {
                    var k = a[g];
                    "(" === k ? ++h : "\\" === k.charAt(0) && (k = +k.substring(1)) && (k <= h ? d[k] = -1 : a[g] = f(k))
                }
                for (g = 1; g < d.length; ++g) - 1 === d[g] && (d[g] = ++A);
                for (h = g = 0; g < c; ++g) k = a[g], "(" === k ? (++h, d[h] || (a[g] = "(?:")) : "\\" ===
                    k.charAt(0) && (k = +k.substring(1)) && k <= h && (a[g] = "\\" + d[k]);
                for (g = 0; g < c; ++g) "^" === a[g] && "^" !== a[g + 1] && (a[g] = "");
                if (e.ignoreCase && n)
                    for (g = 0; g < c; ++g) k = a[g], e = k.charAt(0), 2 <= k.length && "[" === e ? a[g] = b(k) : "\\" !== e && (a[g] = k.replace(/[a-zA-Z]/g, function(a) {
                        a = a.charCodeAt(0);
                        return "[" + String.fromCharCode(a & -33, a | 32) + "]"
                    }));
                return a.join("")
            }
            for (var A = 0, n = !1, l = !1, m = 0, c = a.length; m < c; ++m) {
                var p = a[m];
                if (p.ignoreCase) l = !0;
                else if (/[a-z]/i.test(p.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
                    n = !0;
                    l = !1;
                    break
                }
            }
            for (var w = {
                    b: 8,
                    t: 9,
                    n: 10,
                    v: 11,
                    f: 12,
                    r: 13
                }, r = [], m = 0, c = a.length; m < c; ++m) {
                p = a[m];
                if (p.global || p.multiline) throw Error("" + p);
                r.push("(?:" + v(p) + ")")
            }
            return new RegExp(r.join("|"), l ? "gi" : "g")
        }

        function U(a, d) {
            function f(a) {
                var c = a.nodeType;
                if (1 == c) {
                    if (!b.test(a.className)) {
                        for (c = a.firstChild; c; c = c.nextSibling) f(c);
                        c = a.nodeName.toLowerCase();
                        if ("br" === c || "li" === c) v[l] = "\n", n[l << 1] = A++, n[l++ << 1 | 1] = a
                    }
                } else if (3 == c || 4 == c) c = a.nodeValue, c.length && (c = d ? c.replace(/\r\n?/g, "\n") : c.replace(/[ \t\r\n]+/g,
                    " "), v[l] = c, n[l << 1] = A, A += c.length, n[l++ << 1 | 1] = a)
            }
            var b = /(?:^|\s)nocode(?:\s|$)/,
                v = [],
                A = 0,
                n = [],
                l = 0;
            f(a);
            return {
                a: v.join("").replace(/\n$/, ""),
                c: n
            }
        }

        function J(a, d, f, b, v) {
            f && (a = {
                h: a,
                l: 1,
                j: null,
                m: null,
                a: f,
                c: null,
                i: d,
                g: null
            }, b(a), v.push.apply(v, a.g))
        }

        function V(a) {
            for (var d = void 0, f = a.firstChild; f; f = f.nextSibling) var b = f.nodeType,
                d = 1 === b ? d ? a : f : 3 === b ? W.test(f.nodeValue) ? a : d : d;
            return d === a ? void 0 : d
        }

        function G(a, d) {
            function f(a) {
                for (var l = a.i, m = a.h, c = [l, "pln"], p = 0, w = a.a.match(v) || [], r = {}, e = 0, t = w.length; e <
                    t; ++e) {
                    var z = w[e],
                        q = r[z],
                        g = void 0,
                        h;
                    if ("string" === typeof q) h = !1;
                    else {
                        var k = b[z.charAt(0)];
                        if (k) g = z.match(k[1]), q = k[0];
                        else {
                            for (h = 0; h < A; ++h)
                                if (k = d[h], g = z.match(k[1])) {
                                    q = k[0];
                                    break
                                }
                            g || (q = "pln")
                        }!(h = 5 <= q.length && "lang-" === q.substring(0, 5)) || g && "string" === typeof g[1] || (h = !1, q = "src");
                        h || (r[z] = q)
                    }
                    k = p;
                    p += z.length;
                    if (h) {
                        h = g[1];
                        var B = z.indexOf(h),
                            D = B + h.length;
                        g[2] && (D = z.length - g[2].length, B = D - h.length);
                        q = q.substring(5);
                        J(m, l + k, z.substring(0, B), f, c);
                        J(m, l + k + B, h, K(q, h), c);
                        J(m, l + k + D, z.substring(D), f, c)
                    } else c.push(l +
                        k, q)
                }
                a.g = c
            }
            var b = {},
                v;
            (function() {
                for (var f = a.concat(d), l = [], m = {}, c = 0, p = f.length; c < p; ++c) {
                    var w = f[c],
                        r = w[3];
                    if (r)
                        for (var e = r.length; 0 <= --e;) b[r.charAt(e)] = w;
                    w = w[1];
                    r = "" + w;
                    m.hasOwnProperty(r) || (l.push(w), m[r] = null)
                }
                l.push(/[\0-\uffff]/);
                v = T(l)
            })();
            var A = d.length;
            return f
        }

        function y(a) {
            var d = [],
                f = [];
            a.tripleQuotedStrings ? d.push(["str", /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
                null, "'\""
            ]) : a.multiLineStrings ? d.push(["str", /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`"]) : d.push(["str", /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'"]);
            a.verbatimStrings && f.push(["str", /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
            var b = a.hashComments;
            b && (a.cStyleComments ? (1 < b ? d.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#"]) : d.push(["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
                null, "#"
            ]), f.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null])) : d.push(["com", /^#[^\r\n]*/, null, "#"]));
            a.cStyleComments && (f.push(["com", /^\/\/[^\r\n]*/, null]), f.push(["com", /^\/\*[\s\S]*?(?:\*\/|$)/, null]));
            if (b = a.regexLiterals) {
                var v = (b = 1 < b ? "" : "\n\r") ? "." : "[\\S\\s]";
                f.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" +
                    ("/(?=[^/*" + b + "])(?:[^/\\x5B\\x5C" + b + "]|\\x5C" + v + "|\\x5B(?:[^\\x5C\\x5D" + b + "]|\\x5C" + v + ")*(?:\\x5D|$))+/") + ")")])
            }(b = a.types) && f.push(["typ", b]);
            b = ("" + a.keywords).replace(/^ | $/g, "");
            b.length && f.push(["kwd", new RegExp("^(?:" + b.replace(/[\s,]+/g, "|") + ")\\b"), null]);
            d.push(["pln", /^\s+/, null, " \r\n\t\u00a0"]);
            b = "^.[^\\s\\w.$@'\"`/\\\\]*";
            a.regexLiterals && (b += "(?!s*/)");
            f.push(["lit", /^@[a-z_$][a-z_$@0-9]*/i, null], ["typ", /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null], ["pln", /^[a-z_$][a-z_$@0-9]*/i,
                null
            ], ["lit", /^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i, null, "0123456789"], ["pln", /^\\[\s\S]?/, null], ["pun", new RegExp(b), null]);
            return G(d, f)
        }

        function L(a, d, f) {
            function b(a) {
                var c = a.nodeType;
                if (1 == c && !A.test(a.className))
                    if ("br" === a.nodeName) v(a), a.parentNode && a.parentNode.removeChild(a);
                    else
                        for (a = a.firstChild; a; a = a.nextSibling) b(a);
                else if ((3 == c || 4 == c) && f) {
                    var d = a.nodeValue,
                        q = d.match(n);
                    q && (c = d.substring(0, q.index), a.nodeValue = c, (d = d.substring(q.index + q[0].length)) &&
                        a.parentNode.insertBefore(l.createTextNode(d), a.nextSibling), v(a), c || a.parentNode.removeChild(a))
                }
            }

            function v(a) {
                function b(a, c) {
                    var d = c ? a.cloneNode(!1) : a,
                        k = a.parentNode;
                    if (k) {
                        var k = b(k, 1),
                            e = a.nextSibling;
                        k.appendChild(d);
                        for (var f = e; f; f = e) e = f.nextSibling, k.appendChild(f)
                    }
                    return d
                }
                for (; !a.nextSibling;)
                    if (a = a.parentNode, !a) return;
                a = b(a.nextSibling, 0);
                for (var d;
                    (d = a.parentNode) && 1 === d.nodeType;) a = d;
                c.push(a)
            }
            for (var A = /(?:^|\s)nocode(?:\s|$)/, n = /\r\n?|\n/, l = a.ownerDocument, m = l.createElement("li"); a.firstChild;) m.appendChild(a.firstChild);
            for (var c = [m], p = 0; p < c.length; ++p) b(c[p]);
            d === (d | 0) && c[0].setAttribute("value", d);
            var w = l.createElement("ol");
            w.className = "linenums";
            d = Math.max(0, d - 1 | 0) || 0;
            for (var p = 0, r = c.length; p < r; ++p) m = c[p], m.className = "L" + (p + d) % 10, m.firstChild || m.appendChild(l.createTextNode("\u00a0")), w.appendChild(m);
            a.appendChild(w)
        }

        function t(a, d) {
            for (var f = d.length; 0 <= --f;) {
                var b = d[f];
                I.hasOwnProperty(b) ? E.console && console.warn("cannot override language handler %s", b) : I[b] = a
            }
        }

        function K(a, d) {
            a && I.hasOwnProperty(a) || (a = /^\s*</.test(d) ?
                "default-markup" : "default-code");
            return I[a]
        }

        function M(a) {
            var d = a.j;
            try {
                var f = U(a.h, a.l),
                    b = f.a;
                a.a = b;
                a.c = f.c;
                a.i = 0;
                K(d, b)(a);
                var v = /\bMSIE\s(\d+)/.exec(navigator.userAgent),
                    v = v && 8 >= +v[1],
                    d = /\n/g,
                    A = a.a,
                    n = A.length,
                    f = 0,
                    l = a.c,
                    m = l.length,
                    b = 0,
                    c = a.g,
                    p = c.length,
                    w = 0;
                c[p] = n;
                var r, e;
                for (e = r = 0; e < p;) c[e] !== c[e + 2] ? (c[r++] = c[e++], c[r++] = c[e++]) : e += 2;
                p = r;
                for (e = r = 0; e < p;) {
                    for (var t = c[e], z = c[e + 1], q = e + 2; q + 2 <= p && c[q + 1] === z;) q += 2;
                    c[r++] = t;
                    c[r++] = z;
                    e = q
                }
                c.length = r;
                var g = a.h;
                a = "";
                g && (a = g.style.display, g.style.display = "none");
                try {
                    for (; b < m;) {
                        var h = l[b + 2] || n,
                            k = c[w + 2] || n,
                            q = Math.min(h, k),
                            B = l[b + 1],
                            D;
                        if (1 !== B.nodeType && (D = A.substring(f, q))) {
                            v && (D = D.replace(d, "\r"));
                            B.nodeValue = D;
                            var N = B.ownerDocument,
                                u = N.createElement("span");
                            u.className = c[w + 1];
                            var y = B.parentNode;
                            y.replaceChild(u, B);
                            u.appendChild(B);
                            f < h && (l[b + 1] = B = N.createTextNode(A.substring(q, h)), y.insertBefore(B, u.nextSibling))
                        }
                        f = q;
                        f >= h && (b += 2);
                        f >= k && (w += 2)
                    }
                } finally {
                    g && (g.style.display = a)
                }
            } catch (x) {
                E.console && console.log(x && x.stack || x)
            }
        }
        var E = window,
            C = ["break,continue,do,else,for,if,return,while"],
            F = [
                [C, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
            ],
            H = [F, "alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
            O = [F, "abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
            P = [F, "abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield"],
            F = [F, "abstract,async,await,constructor,debugger,enum,eval,export,function,get,implements,instanceof,interface,let,null,set,undefined,var,with,yield,Infinity,NaN"],
            Q = [C, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
            R = [C, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
            C = [C, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
            S = /^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
            W = /\S/,
            X = y({
                keywords: [H, P, O, F, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", Q, R, C],
                hashComments: !0,
                cStyleComments: !0,
                multiLineStrings: !0,
                regexLiterals: !0
            }),
            I = {};
        t(X, ["default-code"]);
        t(G([], [
            ["pln", /^[^<?]+/],
            ["dec",
                /^<!\w[^>]*(?:>|$)/
            ],
            ["com", /^<\!--[\s\S]*?(?:-\->|$)/],
            ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/],
            ["lang-", /^<%([\s\S]+?)(?:%>|$)/],
            ["pun", /^(?:<[%?]|[%?]>)/],
            ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
            ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
            ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
            ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
        ]), "default-markup htm html mxml xhtml xml xsl".split(" "));
        t(G([
            ["pln", /^[\s]+/, null, " \t\r\n"],
            ["atv", /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null,
                "\"'"
            ]
        ], [
            ["tag", /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
            ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
            ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
            ["pun", /^[=<>\/]+/],
            ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i],
            ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i],
            ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i],
            ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i],
            ["lang-css", /^style\s*=\s*\'([^\']+)\'/i],
            ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]
        ]), ["in.tag"]);
        t(G([], [
            ["atv", /^[\s\S]+/]
        ]), ["uq.val"]);
        t(y({
            keywords: H,
            hashComments: !0,
            cStyleComments: !0,
            types: S
        }), "c cc cpp cxx cyc m".split(" "));
        t(y({
            keywords: "null,true,false"
        }), ["json"]);
        t(y({
            keywords: P,
            hashComments: !0,
            cStyleComments: !0,
            verbatimStrings: !0,
            types: S
        }), ["cs"]);
        t(y({
            keywords: O,
            cStyleComments: !0
        }), ["java"]);
        t(y({
            keywords: C,
            hashComments: !0,
            multiLineStrings: !0
        }), ["bash", "bsh", "csh", "sh"]);
        t(y({
            keywords: Q,
            hashComments: !0,
            multiLineStrings: !0,
            tripleQuotedStrings: !0
        }), ["cv", "py", "python"]);
        t(y({
            keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: 2
        }), ["perl", "pl", "pm"]);
        t(y({
            keywords: R,
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }), ["rb", "ruby"]);
        t(y({
            keywords: F,
            cStyleComments: !0,
            regexLiterals: !0
        }), ["javascript", "js", "ts", "typescript"]);
        t(y({
            keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
            hashComments: 3,
            cStyleComments: !0,
            multilineStrings: !0,
            tripleQuotedStrings: !0,
            regexLiterals: !0
        }), ["coffee"]);
        t(G([], [
            ["str", /^[\s\S]+/]
        ]), ["regex"]);
        var Y = E.PR = {
                createSimpleLexer: G,
                registerLangHandler: t,
                sourceDecorator: y,
                PR_ATTRIB_NAME: "atn",
                PR_ATTRIB_VALUE: "atv",
                PR_COMMENT: "com",
                PR_DECLARATION: "dec",
                PR_KEYWORD: "kwd",
                PR_LITERAL: "lit",
                PR_NOCODE: "nocode",
                PR_PLAIN: "pln",
                PR_PUNCTUATION: "pun",
                PR_SOURCE: "src",
                PR_STRING: "str",
                PR_TAG: "tag",
                PR_TYPE: "typ",
                prettyPrintOne: E.prettyPrintOne = function(a, d, f) {
                    f = f || !1;
                    d = d || null;
                    var b = document.createElement("div");
                    b.innerHTML = "<pre>" + a + "</pre>";
                    b = b.firstChild;
                    f && L(b, f, !0);
                    M({
                        j: d,
                        m: f,
                        h: b,
                        l: 1,
                        a: null,
                        i: null,
                        c: null,
                        g: null
                    });
                    return b.innerHTML
                },
                prettyPrint: E.prettyPrint = function(a, d) {
                    function f() {
                        for (var b = E.PR_SHOULD_USE_CONTINUATION ? c.now() + 250 : Infinity; p < t.length && c.now() < b; p++) {
                            for (var d = t[p], l = g, m = d; m = m.previousSibling;) {
                                var n = m.nodeType,
                                    u = (7 === n || 8 === n) && m.nodeValue;
                                if (u ? !/^\??prettify\b/.test(u) : 3 !== n || /\S/.test(m.nodeValue)) break;
                                if (u) {
                                    l = {};
                                    u.replace(/\b(\w+)=([\w:.%+-]+)/g, function(a, b, c) {
                                        l[b] = c
                                    });
                                    break
                                }
                            }
                            m = d.className;
                            if ((l !== g || r.test(m)) &&
                                !e.test(m)) {
                                n = !1;
                                for (u = d.parentNode; u; u = u.parentNode)
                                    if (q.test(u.tagName) && u.className && r.test(u.className)) {
                                        n = !0;
                                        break
                                    }
                                if (!n) {
                                    d.className += " prettyprinted";
                                    n = l.lang;
                                    if (!n) {
                                        var n = m.match(w),
                                            C;
                                        !n && (C = V(d)) && z.test(C.tagName) && (n = C.className.match(w));
                                        n && (n = n[1])
                                    }
                                    if (y.test(d.tagName)) u = 1;
                                    else var u = d.currentStyle,
                                        x = v.defaultView,
                                        u = (u = u ? u.whiteSpace : x && x.getComputedStyle ? x.getComputedStyle(d, null).getPropertyValue("white-space") : 0) && "pre" === u.substring(0, 3);
                                    x = l.linenums;
                                    (x = "true" === x || +x) || (x = (x = m.match(/\blinenums\b(?::(\d+))?/)) ?
                                        x[1] && x[1].length ? +x[1] : !0 : !1);
                                    x && L(d, x, u);
                                    M({
                                        j: n,
                                        h: d,
                                        m: x,
                                        l: u,
                                        a: null,
                                        i: null,
                                        c: null,
                                        g: null
                                    })
                                }
                            }
                        }
                        p < t.length ? E.setTimeout(f, 250) : "function" === typeof a && a()
                    }
                    for (var b = d || document.body, v = b.ownerDocument || document, b = [b.getElementsByTagName("pre"), b.getElementsByTagName("code"), b.getElementsByTagName("xmp")], t = [], n = 0; n < b.length; ++n)
                        for (var l = 0, m = b[n].length; l < m; ++l) t.push(b[n][l]);
                    var b = null,
                        c = Date;
                    c.now || (c = {
                        now: function() {
                            return +new Date
                        }
                    });
                    var p = 0,
                        w = /\blang(?:uage)?-([\w.]+)(?!\S)/,
                        r = /\bprettyprint\b/,
                        e = /\bprettyprinted\b/,
                        y = /pre|xmp/i,
                        z = /^code$/i,
                        q = /^(?:pre|code|xmp)$/i,
                        g = {};
                    f()
                }
            },
            H = E.define;
        "function" === typeof H && H.amd && H("google-code-prettify", [], function() {
            return Y
        })
    })();
}()