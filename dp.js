! function() {
    var n = "openapp@0.1.10/index.js",
        i = {},
        o = i;
    define(n, [], function(n, i, o) {
        var e = navigator.userAgent,
            a = e.match(/android/i),
            t = e.match(/(ipad|iphone|ipod).*os\s([\d_]+)/i),
            r = function(n, i) {
                var o = +new Date,
                    r = function() {
                        var n = a && i.androidDownloadUrl ? i.androidDownloadUrl : t && i.iosDownloadUrl ? i.iosDownloadUrl : i.downloadUrl;
                        n && (location.href = n)
                    },
                    d = function() {
                        i.onFail && i.onFail(a ? "android" : t ? "ios" : ""), r()
                    },
                    c = function(n) {
                        var i = {};
                        return i.isWeChat = /MicroMessenger/i.test(n), i.isChrome = n.match(/Chrome/), i.isChrome && (i.version = +n.match(/Chrome\/?(\d*)/)[1]), i
                    }(e),
                    s = function() {
                        setTimeout(function() {
                            var n = +new Date - o;
                            1e3 > n && d()
                        }, 800)
                    },
                    l = function() {
                        var i = document.createElement("div");
                        i.style.visibility = "hidden", i.innerHTML = '<iframe src="' + n + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(i), s()
                    },
                    h = function() {
                        var i = n.split("://");
                        location.href = "intent://" + i[1] + "#Intent;scheme=" + i[0] + ";package=com.dianping.v1;end", s()
                    };
                a ? c.isWeChat ? l() : c.isChrome && c.version >= 25 ? h() : l() : t ? (s(), window.location = n) : r()
            };
        o.exports = r
    }, {
        main: !0,
        map: o
    })
}();