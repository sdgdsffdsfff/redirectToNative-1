
"use strict";
define([], function() {
    function a(a) {
        var e, f = a.getAttribute("href") || (a.dataset ? a.dataset.href : a.getAttribute("data-href")), g = a.dataset ? a.dataset.pos : a.getAttribute("data-pos"), h = a.dataset ? a.dataset.param && JSON.parse(a.dataset.param) : a.getAttribute("data-param") && JSON.parse(a.getAttribute("data-param")), i = a.getAttribute("data-source"), j = a.getAttribute("data-stid"), k = a.getAttribute("gaevent");
        e = c(g, h, j, i),
        j = h && h.stid || !1,
        e ? (d ? d.src = e : (d = document.createElement("iframe"),
        d.src = e,
        d.style.display = "none",
        document.body.appendChild(d)),
        setTimeout(function() {
            f = b(f, "cevent", k),
            f = b(f, "stid", j),
            location.href = f
        }
        , 500)) : (f = b(f, "stid", j),
        location.href = f)
    }
    function b(a, b, c) {
        return !~a.indexOf(b) && c ? a += ~a.indexOf("?") ? "&" + b + "=" + c : "?" + b + "=" + c : a
    }
    function c(a, b, c, d) {
        var h = /\/deal\/(\d+)\.html$/
          , i = /^\/$/
          , j = /\/(?:poi|shop)\/(\d+)(?:\.html)?$/
          , k = "";
        switch (a) {
        case "banner":
            ~location.href.indexOf(e) && (k = f);
            break;
        case "footer":
            k = f;
            break;
        case "float_layer":
            i.test(location.pathname) ? (a = "index_" + a,
            k = f) : h.test(location.pathname) ? (a = "deal_" + a,
            k = f + "/deal?did=" + location.pathname.match(h)[1]) : j.test(location.pathname) && (a = "poi_" + a,
            k = f + "/merchant?id=" + location.pathname.match(j)[1]);
            break;
        case "deal_point":
        case "deal_promot":
            k = f + "/deal?did=" + location.pathname.match(h)[1];
            break;
        case "mingdian":
            k = f + "/todayspecial/list?id=" + b.id;
            break;
        case "merchant_point":
            var l = location.pathname.match(/\/poi\/(\d+)/);
            l && l[1] && (k = f + "/merchant?id=" + l[1]);
            break;
        case "deal_list":
            k = f + "/deal/list?group_category_id=" + b.group_category_id + "&category_id=" + b.category_id + "&category_name=" + b.category_name + "&sort=" + b.sort;
            break;
        case "comment_page":
            k = f + "/userreview?uid=" + b.uid
        }
        return k += ~k.indexOf("?") ? "&" : "/",
        k += "lch=" + g[d || a],
        c && (k += "&stid=" + c),
        k
    }
    var d, e = "i.meituan.com", f = "imeituan://www.meituan.com", g = {
        banner: "ibanner",
        footer: "ift",
        index_float_layer: "ibdownindex",
        deal_float_layer: "ibdowndeal",
        poi_float_layer: "ibdownpoi",
        mingdian: "imingdian",
        deal_point: "idealpoint",
        deal_promot: "idealpromote",
        merchant_point: "ipoipromote",
        daren_rule: "iDaren_rule",
        daren_comment: "iDaren_comment"
    };
    return function(b) {
        return ~window.navigator.userAgent.indexOf("MicroMessenger") ? !1 : (b.addEventListener("click", function(c) {
            c.preventDefault(),
            a(b)
        }
        , !0),
        void 0)
    }
}
);
