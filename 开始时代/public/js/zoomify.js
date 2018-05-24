/**
 * Created by Carry on 12/4/2017.
 */
/*! Zoomify - v0.2.4 - https://github.com/indrimuska/zoomify - (c) 2015 Indri Muska - MIT */
!function (a) {
    Zoomify = function (b, c) {
        var d = this;
        this._zooming = !1, this._zoomed = !1, this._timeout = null, this.$shadow = null, this.$image = a(b).addClass("zoomify"), this.options = a.extend({}, Zoomify.DEFAULTS, this.$image.data(), c), this.$image.on("click", function () {
            d.zoom()
        }), a(window).on("resize", function () {
            d.reposition()
        }), a(document).on("scroll", function () {
            d.reposition()
        })
    }, Zoomify.DEFAULTS = {duration: 200, easing: "linear", scale: .9}, Zoomify.prototype.transition = function (a, b) {
        a.css({"-webkit-transition": b, "-moz-transition": b, "-ms-transition": b, "-o-transition": b, transition: b})
    }, Zoomify.prototype.addTransition = function (a) {
        this.transition(a, "all " + this.options.duration + "ms " + this.options.easing)
    }, Zoomify.prototype.removeTransition = function (b, c) {
        var d = this;
        clearTimeout(this._timeout), this._timeout = setTimeout(function () {
            d.transition(b, ""), a.isFunction(c) && c.call(d)
        }, this.options.duration)
    }, Zoomify.prototype.transform = function (a) {
        this.$image.css({
            "-webkit-transform": a,
            "-moz-transform": a,
            "-ms-transform": a,
            "-o-transform": a,
            transform: a
        })
    }, Zoomify.prototype.transformScaleAndTranslate = function (a, b, c, d) {
        this.addTransition(this.$image), this.transform("scale(" + a + ") translate(" + b + "px, " + c + "px)"), this.removeTransition(this.$image, d)
    }, Zoomify.prototype.zoom = function () {
        this._zooming || (this._zoomed ? this.zoomOut() : this.zoomIn())
    }, Zoomify.prototype.zoomIn = function () {
        var b = this, c = this.$image.css("transform");
        this.transition(this.$image, "none"), this.transform("none");
        var d = this.$image.offset(), e = this.$image.outerWidth(), f = this.$image.outerHeight(),
            g = this.$image[0].naturalWidth || +(1 / 0), h = this.$image[0].naturalHeight || +(1 / 0),
            i = a(window).width(), j = a(window).height(), k = Math.min(g, i * this.options.scale) / e,
            l = Math.min(h, j * this.options.scale) / f, m = Math.min(k, l), n = (-d.left + (i - e) / 2) / m,
            o = (-d.top + (j - f) / 2 + a(document).scrollTop()) / m;
        this.transform(c), this._zooming = !0, this.$image.addClass("zoomed").trigger("zoom-in.zoomify"), setTimeout(function () {
            b.addShadow(), b.transformScaleAndTranslate(m, n, o, function () {
                b._zooming = !1, b.$image.trigger("zoom-in-complete.zoomify")
            }), b._zoomed = !0
        })
    }, Zoomify.prototype.zoomOut = function () {
        var a = this;
        this._zooming = !0, this.$image.trigger("zoom-out.zoomify"), this.transformScaleAndTranslate(1, 0, 0, function () {
            a._zooming = !1, a.$image.removeClass("zoomed").trigger("zoom-out-complete.zoomify")
        }), this.removeShadow(), this._zoomed = !1
    }, Zoomify.prototype.reposition = function () {
        this._zoomed && (this.transition(this.$image, "none"), this.zoomIn())
    }, Zoomify.prototype.addShadow = function () {
        var b = this;
        this._zoomed || (b.$shadow && b.$shadow.remove(), this.$shadow = a('<div class="zoomify-shadow"></div>'), a("body").append(this.$shadow), this.addTransition(this.$shadow), this.$shadow.on("click", function () {
            b.zoomOut()
        }), setTimeout(function () {
            b.$shadow.addClass("zoomed")
        }, 10))
    }, Zoomify.prototype.removeShadow = function () {
        var a = this;
        this.$shadow && (this.addTransition(this.$shadow), this.$shadow.removeClass("zoomed"), this.$image.one("zoom-out-complete.zoomify", function () {
            a.$shadow && a.$shadow.remove(), a.$shadow = null
        }))
    }, a.fn.zoomify = function (b) {
        return this.each(function () {
            var c = a(this), d = c.data("zoomify");
            d || c.data("zoomify", d = new Zoomify(this, "object" == typeof b && b)), "string" == typeof b && ["zoom", "zoomIn", "zoomOut", "reposition"].indexOf(b) >= 0 && d[b]()
        })
    }
}(jQuery);