! function() {
    function o(o, n) {
        for (var i in n) o[i] = n[i];
        return o
    }
    var n = "zepto@^1.2.1",
        i = "openapp@~0.1.1",
        t = "cookie@~0.1.2",
        e = "mobile-download-banner@0.3.1/js/localstorage.js",
        a = "mobile-download-banner@0.3.1/index.js",
        d = {},
        r = d;
    define(a, [n, i, t, e], function(o, n, i) {
        var t, e = o("zepto"),
            a = o("openapp"),
            d = o("cookie"),
            r = o("./js/localStorage"),
            p = "banner140825",
            s = "hideapp",
            l = -1 != location.hostname.indexOf("51ping") ? ".51ping.com" : ".dianping.com",
            c = [],
            m = "Hide",
            h = function(o, n) {
                return Math.floor(Math.random() * (n - o)) + o
            },
            f = {
                init: function(o) {
                    o = o || {}, t = o.business || "default", r() && (this.options = o || {}, this.options.key && (c.push(p), p = this.options.key), "enableHippo" in this.options || !window._hip || (this.options.enableHippo = !0), -1 != location.href.indexOf("hideapp=1") && (document.cookie = "hideapp=1;expires=-1;path=/;domain:" + l), this.showBanner())
                },
                initHTML: function() {
                    var o = this.downloadBar = e(".footer-fix");
                    o.length > 0 && o.remove();
                    var n = '<div class="footer_banner Hide ' + t + '"><div class="footer-fix-inner"><i class="banner_close J_close_banner">x</i><div class="footer-open" id="footer_download"><i class="dp-icon"></i><p class="J_open_app wrap"></p><a class="imm-open J_open_app"></a></div></div></div>';
                    e("body").append(n), this.downloadBar = e(".footer_banner")
                },
                showBanner: function() {
                    c.length && this.removeKey(c), this.isShow() && 1 != localStorage.getItem(p) && 1 != d(s) && (this.initHTML(this.options), this.configBanner(), e(".J_close_banner").on("click", function() {
                        f.downloadBar.addClass(m), localStorage.setItem(p, 1), f.options.enableHippo && _hip.push(["mv", {
                            module: "index_footer_close",
                            action: "click"
                        }])
                    }), e(".J_open_app").each(function(o, n) {
                        var i = e(n),
                            t = f.options.appSchema || i.attr("data-schema") || "dianping://home?utm_=w_mhome_float",
                            d = window.navigator.userAgent,
                            r = d.match(/(ipad).*os\s([\d_]+)/i),
                            p = {
                                downloadUrl: f.options.downloadUrl || "http://m.api.dianping.com/downloadlink?redirect=3259",
                                androidDownloadUrl: f.options.androidDownloadUrl || ""
                            };
                        r ? (t = "dianpinghd://homepage?utm_=w_mhome_float", p.iosDownloadUrl = f.options.iosDownloadUrl || "https://itunes.apple.com/cn/app/da-zhong-dian-pinghd-mei-shi/id486691005?mt=8​") : p.iosDownloadUrl = f.options.iosDownloadUrl || "http://itunes.apple.com/cn/app/da-zhong-dian-ping-mei-shi/id351091731?mt=8";
                        var s = function(o) {
                            "ios" === o ? (f.options.enableHippo && _hip.push(r ? ["mv", {
                                module: "m_bottom_downloadipad",
                                action: "click"
                            }] : ["mv", {
                                module: "m_bottom_downloadi",
                                action: "click"
                            }]), location.href = p.iosDownloadUrl || p.downloadUrl) : "android" === o && (f.options.enableHippo && _hip.push(["mv", {
                                module: "m_bottom_downloada",
                                action: "click"
                            }]), location.href = p.androidDownloadUrl || p.downloadUrl)
                        };
                        p.onFail = s, (-1 != location.href.indexOf("m.dianping.com/tuan") || -1 != location.href.indexOf("m.51ping.com/tuan")) && (p.androidDownloadUrl = "http://m.dianping.com/transpage/storeInfo.action?targetKey=android&sourceName=DianPing_msitetoapptest1.apk"), i.on("click", function() {
                            a(t, p)
                        })
                    }))
                },
                removeKey: function(o) {
                    "string" == typeof o ? localStorage.removeItem(o) : o instanceof Array && o.forEach(function(o) {
                        localStorage.removeItem(o)
                    })
                },
                isShow: function() {
                    var o = location.href,
                        n = -1 == o.indexOf("hideapp=1") && -1 == o.indexOf("utm_source=qqbrowsersearch") && -1 == o.indexOf("utm_source=qqmobilebrowser") && -1 == o.indexOf("utm_source=uc_tubiao") && -1 == o.indexOf("source=dpinweixin") && -1 == o.indexOf("source=dpapp") && -1 == navigator.userAgent.indexOf("dianping") && -1 == navigator.userAgent.indexOf("360app");
                    return n
                },
                configBanner: function() {
                    var o = this.options.customBanner;
                    if (o) {
                        if (o.icon) {
                            var n = 'url("' + o.icon + '") no-repeat 0 0';
                            this.downloadBar.find(".dp-icon").css({
                                background: n,
                                "background-size": "28px 28px"
                            })
                        }
                        this.setDom(o)
                    } else e.when(f.fetchData()).done(function(o) {
                        f.chooseRule(o)
                    }).fail(function() {})
                },
                fetchData: function() {
                    var o = {
                            basic: [{
                                id: "all-time-4",
                                text: "0元吃喝玩乐，APP专享!",
                                button: "立即去抢",
                                url: "http://m.dianping.com/download/synthesislink?redirect=3253"
                            }],
                            "time-based": [{
                                id: "time-01",
                                text: "吃早餐,附近哪最靠谱?",
                                startTime: 5,
                                endTime: 10,
                                url: "http://i2.dpfile.com/download/DianPing_msitetoapp01.apk",
                                button: "立即查看"
                            }, {
                                id: "time-02",
                                text: "寻找午餐最佳去处!",
                                startTime: 10,
                                endTime: 14,
                                url: "http://i2.dpfile.com/download/DianPing_msitetoapp02.apk",
                                button: "立即查看"
                            }, {
                                id: "time-03",
                                text: "休息时间,去哪下午茶?",
                                startTime: 14,
                                endTime: 17,
                                url: "http://i2.dpfile.com/download/DianPing_msitetoapp03.apk",
                                button: "立即查看"
                            }, {
                                id: "time-04",
                                text: "吃晚饭了,出门搓一顿!",
                                startTime: 17,
                                endTime: 21,
                                url: "http://i2.dpfile.com/download/DianPing_msitetoapp04.apk",
                                button: "立即查看"
                            }, {
                                id: "time-05",
                                text: "夜深了,去哪吃夜宵?",
                                startTime: 21,
                                endTime: 29,
                                url: "http://i2.dpfile.com/download/DianPing_msitetoapp05.apk",
                                button: "立即查看"
                            }]
                        },
                        n = e.Deferred();
                    return n.resolve(o), n.promise()
                },
                chooseRule: function(o) {
                    if (o) {
                        var n = Object.keys(o),
                            i = h(0, n.length),
                            t = n[i],
                            e = o[t];
                        if ("basic" === t) {
                            var a = h(0, e.length);
                            f.setDom(e[a])
                        } else if ("time-based" === t) {
                            var d = (new Date).getHours();
                            e.forEach(function(o) {
                                var n = d >= o.startTime && d < o.endTime || d + 24 >= o.startTime && d + 24 < o.endTime;
                                n && f.setDom(o)
                            })
                        }
                    }
                },
                setDom: function(o) {
                    if (o) {
                        var n = e(".footer-open .wrap"),
                            i = e(".footer-open a");
                        if ("string" == typeof o.text ? n.text(o.text) : (e(".footer_banner").addClass("double_line"), n.append('<p class="line1">' + o.text[0] + "</p><p>" + o.text[1] + "</p>")), i.html(o.button), this.downloadBar.removeClass(m), this.options.androidDownloadUrl = o.url, this.options.enableHippo) {
                            var t = o.id || o.text;
                            this.setHippo(t)
                        }
                    }
                },
                setHippo: function(o) {
                    e("#footer_download").on("click", function() {
                        _hip.push(["mv", {
                            module: "m_bottom_float" + o,
                            action: "click"
                        }])
                    }), this.downloadBar.hasClass(m) || _hip.push(["mv", {
                        module: "m_bottom_float" + o,
                        action: "browse"
                    }])
                }
            };
        i.exports = f
    }, {
        main: !0,
        map: o({
            "./js/localStorage": e
        }, r)
    }), define(e, [], function(o, n, i) {
        var t = function() {
            var o = !1,
                n = "local_test";
            try {
                o = !!window.localStorage && null != window.localStorage, localStorage.setItem(n, 1), localStorage.removeItem(n)
            } catch (i) {
                return !1
            }
            return o
        };
        i.exports = t
    }, {
        map: r
    })
}();