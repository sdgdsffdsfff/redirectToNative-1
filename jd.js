M.define("html5_2015", function(a) {
    var b = function(c) {
        this.init(c)
    };
    M.object.merge(b.prototype, {
        init: function(c) {
            if (M.object.isObject(c)) {
                if (c && c.head) {
                    this.head = true
                } else {
                    this.head = false
                }
                if (c && c.footer) {
                    this.footer = true;
                    this.footerInit(c.footer)
                }
                if (c && c.appDown) {
                    this.appdownInit(c.appDown)
                }
            }
        },
        headRender: function() {
            var c = this;
            $("#layout_jdKey").on("click", function() {
                if ($("#layout_jdBar").css("display") == "none") {
                    $("#layout_jdBar").show()
                } else {
                    $("#layout_jdBar").hide()
                }
            });
            $("#layout_urlblack").on("click", function() {
                c.pageBack()
            })
        },
        pageBack: function() {
            var c = window.location.href;
            if (/#top/.test(c)) {
                window.history.go(-2);
                window.location.load(window.location.href)
            } else {
                window.history.back()
            }
        },
        footerInit: function(d) {
            var c = this;
            if (d) {
                if (M.object.isObject(d)) {
                    c.toPcHomeUrl = d.toPcHomeUrl ? d.toPcHomeUrl : "http://www.jd.com/#m"
                } else {
                    c.toPcHomeUrl = "http://www.jd.com/#m"
                }
            }
        },
        footerRender: function() {
            var c = this;
            $("#layout_toPcHome").on("click", function() {
                c.toPcHome()
            })
        },
        toPcHome: function() {
            var c = this;
            M.cookie.setCookie("pcm", "1", 1, "", ".jd.com");
            window.location.href = c.toPcHomeUrl
        },
        appdownInit: function(d) {
            var c = this;
            if (d) {
                if (M.object.isObject(d)) {
                    if (d.withScreen) {
                        c.appDownWithScreen = true
                    } else {
                        c.appDownWithScreen = false
                    }
                } else {
                    c.appDownWithScreen = false
                }
                c.appdownShow = true;
                c.hasAppDown = true;
                c.downloadHideTime = 1;
                if (d.downloadHideTime) {
                    c.downloadHideTime = argObj.downloadHideTime
                }
            } else {
                c.hasAppDown = false
            }
        },
        appdownHtml: function() {
            var d = this;
            var c = [];
            c.push('<div id="layout_appdown" class="tryme' + (d.appDownWithScreen ? " onfoot" : "") + '">');
            c.push("<div>");
            c.push('<div id="layout_close_appdown" class="later"></div>');
            c.push('<a id="layout_open_app" class="trynow" href="javascript:void(0);"></a>');
            c.push("<span>客户端首单<br>满79元送79元</span>");
            c.push("</div>");
            c.push("</div>");
            return c.join("")
        },
        appdownBind: function() {
            var e = this;
            var d = {
                openAppBtnId: "layout_open_app",
                closePanelBtnId: "layout_close_appdown",
                closePanelId: "layout_appdown",
                closeCallblack: function() {
                    $("#layout_appdown").attr("search_land_searchTransformation_show", "true")
                },
                closeCallblackSource: null
            };
            var c = $;
            c.downloadAppPlugIn(d)
        },
        appdownRender: function() {
            var d = this;
            var c = d.appdownHtml();
            $("#layout_top").after(c);
            d.appdownBind()
        },
        run: function() {
            if (this.footer) {
                this.footerRender()
            }
            if (this.head) {
                this.headRender()
            }
            if (this.hasAppDown) {
                this.appdownRender()
            }
        }
    });
    a.clazz = b
});
(function() {
    var D = navigator.userAgent;
    var e = (D.match(/Chrome\/([\d.]+)/) || D.match(/CriOS\/([\d.]+)/)) ? true : false;
    var G = (D.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
    var p = (D.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
    var x = (!p && D.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
    var f = navigator.userAgent.indexOf("MicroMessenger") >= 0;
    var t = false;
    var v = "plugIn_downloadAppPlugIn_loadIframe";
    var k = false;
    var c = 0;
    var b = {};
    var o = {};
    var A = null;
    var u = {};
    var d = window.Zepto || window.jQuery ? true : false;
    var n = [];

    function C() {
        WeixinJSBridge.invoke("getInstallState", {
            packageName: "com.jingdong.app.mall",
            packageUrl: "openApp.jdMobile://"
        }, function(K) {
            var L = K.err_msg,
                s = 0;
            if (L.indexOf("get_install_state:yes") > -1) {
                t = true
            }
        })
    }

    function J(L, K, s) {
        if (d) {
            A("#" + L).bind(K, s)
        } else {
            A("#" + L).addEventListener(K, s, !1)
        }
    }

    function h(s) {
        var K = (s || "mGen") + (++c);
        return K
    }
    if (f) {
        if (window.WeixinJSBridge && WeixinJSBridge.invoke) {
            C()
        } else {
            document.addEventListener("WeixinJSBridgeReady", C, !1)
        }
    }
    if (window.$LAB) {
        $LAB.setOptions({
            AlwaysPreserveOrder: true
        }).script("http://h5.m.jd.com/active/track/mping.min.js")
    } else {
        var z = document.getElementsByTagName("script");
        var F = false;
        for (i = 0; i < z.length; i++) {
            if (z[i].src && z[i].src.indexOf("/active/track/mping.min.js") != -1) {
                F = true;
                break
            }
        }
        if (!F) {
            var q = document.createElement("script");
            q.type = "text/javascript";
            q.src = "http://h5.m.jd.com/active/track/mping.min.js";
            q.onerror = function() {
                l.removeChild(q)
            };
            var l = document.getElementsByTagName("head")[0];
            l.appendChild(q)
        }
    }
    if (d) {
        A = window.$;
        u = window.$
    } else {
        A = function(s) {
            if (typeof s == "object") {
                return s
            }
            return document.querySelector(s)
        };
        if (!window.$) {
            window.$ = u = A
        } else {
            u = window.$
        }
    }
    window.onblur = function() {
        for (var s = 0; s < n.length; s++) {
            clearTimeout(n[s])
        }
    };

    function E(L) {
        var K = document.cookie.indexOf(L + "=");
        if (K == -1) {
            return null
        }
        K = K + L.length + 1;
        var s = document.cookie.indexOf(";", K);
        if (s == -1) {
            s = document.cookie.length
        }
        return document.cookie.substring(K, s)
    }

    function r(L, O, s, P, N) {
        var Q = L + "=" + escape(O);
        if (s != "") {
            var K = new Date();
            K.setTime(K.getTime() + s * 24 * 3600 * 1000);
            Q += ";expires=" + K.toGMTString()
        }
        if (P != "") {
            Q += ";path=" + P
        }
        if (N != "") {
            Q += ";domain=" + N
        }
        document.cookie = Q
    }

    function g(s) {
        var L = {
            downAppURl: "http://h5.m.jd.com/active/download/download.html?channel=jd-m",
            downAppIos: "http://union.m.jd.com/download/go.action?to=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fid414245413&client=apple&unionId=12532&subunionId=m-top&key=e4dd45c0f480d8a08c4621b4fff5de74",
            downWeixin: "http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850",
            downIpad: "https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8",
            inteneUrl: "openApp.jdMobile://360buy?type=1",
            inteneUrlParams: null,
            openAppBtnId: "",
            closePanelBtnId: "",
            closePanelId: "",
            closeCallblack: null,
            closeCallblackSource: null,
            cookieFlag: null,
            noRecord: false
        };
        if (s) {
            for (var K in s) {
                if (K && s[K]) {
                    L[K] = s[K]
                }
            }
        }
        return L
    }

    function w(N, s) {
        var R = j(N);
        var O = null;
        if (f) {
            var K = null;
            if (t) {
                K = R
            } else {
                K = N.downWeixin
            }
            location.href = K;
            return
        }
        if (p) {
            O = N.downIpad
        } else {
            if (x) {
                O = N.downAppIos
            } else {
                O = N.downAppURl
            }
        }
        if (e) {
            if (G) {
                var Q = R;
                R = y(Q)
            }
        }
        document.querySelector("#" + v).src = R;
        var P = Date.now();
        if (s) {
            var L = setTimeout(function() {
                I(P, O)
            }, 500);
            n.push(L)
        }
    }

    function I(L, K) {
        var s = Date.now();
        if (L && (s - L) < (500 + 200)) {
            window.location.href = K
        }
    }

    function j(K) {
        var S = [];
        var O = K.inteneUrlParams;
        var Q = {
            category: "jump",
            des: "productDetail",
            sourceType: "JSHOP_SOURCE_TYPE",
            sourceValue: "JSHOP_SOURCE_VALUE"
        };
        if (O) {
            for (var R in O) {
                if (R && O[R]) {
                    S.push('"' + R + '":"' + O[R] + '"')
                }
            }
        } else {
            for (var R in Q) {
                if (R && Q[R]) {
                    S.push('"' + R + '":"' + Q[R] + '"')
                }
            }
        }
        try {
            S.push('"m_param":' + MPing.EventSeries.getSeries())
        } catch (P) {
            S.push('"m_param":null')
        }
        var L = "{" + S.join(",") + "}";
        var N = K.inteneUrl.split("?");
        var s = null;
        if (N.length == 2) {
            s = N[0] + "?" + N[1] + "&params=" + L
        } else {
            s = N[0] + "?params=" + L
        }
        return s
    }

    function y(s) {
        return "intent://m.jd.com/#Intent;scheme=" + s + ";package=com.jingdong.app.mall;end"
    }

    function H(s) {
        if (s.openAppBtnId) {
            b[s.openAppBtnId] = s;
            J(s.openAppBtnId, "click", function() {
                var O = this.getAttribute("id");
                var K = b[O];
                if (!k) {
                    var L = document.createElement("iframe");
                    L.id = v;
                    document.body.appendChild(L);
                    document.getElementById(v).style.display = "none";
                    document.getElementById(v).style.width = "0px";
                    document.getElementById(v).style.height = "0px";
                    k = true
                }
                var N = K.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + K.cookieFlag : "downloadAppPlugIn_downCloseDate";
                r(N, Date.now() + "_2592000000", 60, "/", "m.jd.com");
                B("MDownLoadFloat_OpenNow");
                w(K, true)
            })
        }
    }

    function a(L) {
        if (L.closePanelBtnId && L.closePanelId) {
            b[L.closePanelBtnId] = L;
            var Q = L.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + L.cookieFlag : "downloadAppPlugIn_downCloseDate";
            var O = E(Q);
            var P = null;
            if (O) {
                P = O.split("_");
                if (P.length == 2) {
                    P[0] = parseInt(P[0], 10);
                    P[1] = parseInt(P[1], 10)
                } else {
                    P = null
                }
            }
            var K = Date.now();
            if (!L.noRecord && P && P.length == 2 && (K - P[0]) < P[1]) {
                document.querySelector("#" + L.closePanelId).style.display = "none";
                if (L.closeCallblack) {
                    var N = L.closeCallblackSource ? L.closeCallblackSource : null;
                    L.closeCallblack.call(N)
                }
                return
            } else {
                document.querySelector("#" + L.closePanelId).style.display = "block"
            }
            J(L.closePanelBtnId, "click", function() {
                B("MDownLoadFloat_Close");
                var U = this.getAttribute("id");
                var R = b[U];
                var T = R.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + R.cookieFlag : "downloadAppPlugIn_downCloseDate";
                if (!R.noRecord) {
                    r(T, Date.now() + "_259200000", 60, "/", "m.jd.com")
                }
                document.querySelector("#" + R.closePanelId).style.display = "none";
                if (R.closeCallblack) {
                    var S = R.closeCallblackSource ? R.closeCallblackSource : null;
                    R.closeCallblack.call(S)
                }
            })
        }
    }

    function B(K) {
        try {
            var L = new MPing.inputs.Click(K);
            L.event_param = "";
            var s = new MPing();
            s.send(L)
        } catch (N) {}
    }

    function m(s) {
        var K = g(s);
        H(K);
        a(K)
    }
    u.downloadAppPlugIn = m;
    u.downloadAppPlugInOpenApp = function(s) {
        var K = g(s);
        w(K)
    }
})();