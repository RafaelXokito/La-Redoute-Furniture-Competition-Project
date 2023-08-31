function keyFrameSupported() {
  var t = $(".op-boutique:visible"),
    n = t.find(".opco-animation-mobile1"),
    u = t.find(".opco-animation-mobile2"),
    r,
    i;
  n.length > 0 &&
    ((r = !1),
    (i = n.css("transform")),
    setTimeout(function () {
      var t = "lr-keyFrameSupported";
      n.css("transform") === i
        ? (Utils.StorageManager.CreateStorageValue(t, !1), animeJsKeyFrame())
        : Utils.StorageManager.CreateStorageValue(t, !0);
    }, 2e3));
}
function animeJsKeyFrame() {
  var i = $(".op-boutique:visible"),
    t = i.find(".opco-animation-mobile1"),
    n = i.find(".opco-animation-mobile2");
  setInterval(function () {
    t.animate({ top: "-42px" }, "slow"),
      t.animate({ opacity: 0 }),
      t.animate({ opacity: 0, top: "42px" }, "slow"),
      n.animate({ opacity: 1, top: "0" }, "slow"),
      n.animate({ opacity: 1, top: "0" }, "slow"),
      t.animate({ opacity: 1, top: "0" }, "slow"),
      n.animate({ opacity: 1, top: "-42px" }, "slow"),
      n.animate({ opacity: 0 }),
      n.animate({ opacity: 0, top: "42px" }, "slow");
  }, 5e3);
}
function getParentBootstrapValidator(n) {
  return n == null
    ? null
    : n.data("bootstrapValidator") == null
    ? getParentBootstrapValidator(n.parent())
    : n;
}
function CheckKeyCodeNoNumberFNLN(n) {
  return (
    (keyPressed = String.fromCharCode(n.which || n.keyCode)),
    keyPressed == "1" ||
    keyPressed == "2" ||
    keyPressed == "3" ||
    keyPressed == "4" ||
    keyPressed == "5" ||
    keyPressed == "6" ||
    keyPressed == "7" ||
    keyPressed == "8" ||
    keyPressed == "9" ||
    keyPressed == "0"
      ? !1
      : !0
  );
}
function applyNoNumber(n) {
  n != null &&
    n.length != 0 &&
    n.attr("onkeypress", "if(!CheckKeyCodeNoNumberFNLN(event)) return false");
}
function applyOnlyNumber(n) {
  if (n != null && n.length != 0)
    n.on("keypress", function (n) {
      CheckKeyCodeNoNumberFNLN(n) && n.preventDefault();
    });
}
function CheckKeyCodeNoSpace(n) {
  return (
    (keyPressed = String.fromCharCode(n.which || n.keyCode)),
    keyPressed == " " ? !1 : !0
  );
}
function applyNoSpace(n) {
  n != null &&
    n.length != 0 &&
    n.attr("onkeypress", "if(!CheckKeyCodeNoSpace(event)) return false");
}
function LogVisit() {
  var n = document.referrer,
    t = document.location.pathname + document.location.search;
  (t = t.replace(/\?/g, "$**$").replace(/&/g, "$*$")),
    (n = n.replace(/\?/g, "$**$").replace(/&/g, "$*$")),
    (n = n.substring(0, 600)),
    $.ajax({
      async: !0,
      cache: !1,
      url: "/ServiceGeneric/LogVisit",
      data: { currentPage: t, referrerPage: n },
      success: function () {},
      error: function () {},
    });
}
function getEmailRegex() {
  return /^([A-Za-z0-9_\-\+\.]){1,32}\@([A-Za-z0-9_\-\.]){1,32}\.([A-Za-z]{2,10})$/;
}
function FinaliseTrackingForDirectCall() {
  _OmnitureTracking.finaliseTrackingForDirectCall();
}
function FinaliseTracking() {
  _OmnitureTracking.finaliseTracking();
}
var Page,
  UiBloc,
  _UiHeader,
  _UiLayerWaiting,
  _LaRedoute,
  dropdownEvent,
  omnitureSessionVarsToClear,
  _OmnitureTracking,
  UiLogAs,
  Utils,
  popinEvent,
  UiAccountLayer,
  UiWishlistLayer;
if (
  ((function (n, t) {
    typeof module == "object" && typeof module.exports == "object"
      ? (module.exports = n.document
          ? t(n, !0)
          : function (n) {
              if (!n.document)
                throw new Error("jQuery requires a window with a document");
              return t(n);
            })
      : t(n);
  })(typeof window != "undefined" ? window : this, function (n, t) {
    function ri(n) {
      var t = n.length,
        r = i.type(n);
      return r === "function" || i.isWindow(n)
        ? !1
        : n.nodeType === 1 && t
        ? !0
        : r === "array" ||
          t === 0 ||
          (typeof t == "number" && t > 0 && t - 1 in n);
    }
    function ui(n, t, r) {
      if (i.isFunction(t))
        return i.grep(n, function (n, i) {
          return !!t.call(n, i, n) !== r;
        });
      if (t.nodeType)
        return i.grep(n, function (n) {
          return (n === t) !== r;
        });
      if (typeof t == "string") {
        if (ue.test(t)) return i.filter(t, n, r);
        t = i.filter(t, n);
      }
      return i.grep(n, function (n) {
        return i.inArray(n, t) >= 0 !== r;
      });
    }
    function hr(n, t) {
      do n = n[t];
      while (n && n.nodeType !== 1);
      return n;
    }
    function oe(n) {
      var t = (fi[n] = {});
      return (
        i.each(n.match(h) || [], function (n, i) {
          t[i] = !0;
        }),
        t
      );
    }
    function cr() {
      u.addEventListener
        ? (u.removeEventListener("DOMContentLoaded", a, !1),
          n.removeEventListener("load", a, !1))
        : (u.detachEvent("onreadystatechange", a), n.detachEvent("onload", a));
    }
    function a() {
      (u.addEventListener ||
        event.type === "load" ||
        u.readyState === "complete") &&
        (cr(), i.ready());
    }
    function yr(n, t, r) {
      if (r === undefined && n.nodeType === 1) {
        var u = "data-" + t.replace(vr, "-$1").toLowerCase();
        if (((r = n.getAttribute(u)), typeof r == "string")) {
          try {
            r =
              r === "true"
                ? !0
                : r === "false"
                ? !1
                : r === "null"
                ? null
                : +r + "" === r
                ? +r
                : ar.test(r)
                ? i.parseJSON(r)
                : r;
          } catch (f) {}
          i.data(n, t, r);
        } else r = undefined;
      }
      return r;
    }
    function ei(n) {
      var t;
      for (t in n)
        if ((t !== "data" || !i.isEmptyObject(n[t])) && t !== "toJSON")
          return !1;
      return !0;
    }
    function pr(n, t, r, u) {
      if (i.acceptData(n)) {
        var s,
          e,
          h = i.expando,
          l = n.nodeType,
          o = l ? i.cache : n,
          f = l ? n[h] : n[h] && h;
        if (
          (f && o[f] && (u || o[f].data)) ||
          r !== undefined ||
          typeof t != "string"
        )
          return (
            f || (f = l ? (n[h] = c.pop() || i.guid++) : h),
            o[f] || (o[f] = l ? {} : { toJSON: i.noop }),
            (typeof t == "object" || typeof t == "function") &&
              (u
                ? (o[f] = i.extend(o[f], t))
                : (o[f].data = i.extend(o[f].data, t))),
            (e = o[f]),
            u || (e.data || (e.data = {}), (e = e.data)),
            r !== undefined && (e[i.camelCase(t)] = r),
            typeof t == "string"
              ? ((s = e[t]), s == null && (s = e[i.camelCase(t)]))
              : (s = e),
            s
          );
      }
    }
    function wr(n, t, u) {
      if (i.acceptData(n)) {
        var e,
          s,
          h = n.nodeType,
          f = h ? i.cache : n,
          o = h ? n[i.expando] : i.expando;
        if (f[o]) {
          if (t && ((e = u ? f[o] : f[o].data), e)) {
            for (
              i.isArray(t)
                ? (t = t.concat(i.map(t, i.camelCase)))
                : (t in e)
                ? (t = [t])
                : ((t = i.camelCase(t)), (t = (t in e) ? [t] : t.split(" "))),
                s = t.length;
              s--;

            )
              delete e[t[s]];
            if (u ? !ei(e) : !i.isEmptyObject(e)) return;
          }
          (u || (delete f[o].data, ei(f[o]))) &&
            (h
              ? i.cleanData([n], !0)
              : r.deleteExpando || f != f.window
              ? delete f[o]
              : (f[o] = null));
        }
      }
    }
    function vt() {
      return !0;
    }
    function it() {
      return !1;
    }
    function dr() {
      try {
        return u.activeElement;
      } catch (n) {}
    }
    function gr(n) {
      var i = nu.split("|"),
        t = n.createDocumentFragment();
      if (t.createElement) while (i.length) t.createElement(i.pop());
      return t;
    }
    function f(n, t) {
      var e,
        u,
        s = 0,
        r =
          typeof n.getElementsByTagName !== o
            ? n.getElementsByTagName(t || "*")
            : typeof n.querySelectorAll !== o
            ? n.querySelectorAll(t || "*")
            : undefined;
      if (!r)
        for (r = [], e = n.childNodes || n; (u = e[s]) != null; s++)
          !t || i.nodeName(u, t) ? r.push(u) : i.merge(r, f(u, t));
      return t === undefined || (t && i.nodeName(n, t)) ? i.merge([n], r) : r;
    }
    function be(n) {
      oi.test(n.type) && (n.defaultChecked = n.checked);
    }
    function eu(n, t) {
      return i.nodeName(n, "table") &&
        i.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr")
        ? n.getElementsByTagName("tbody")[0] ||
            n.appendChild(n.ownerDocument.createElement("tbody"))
        : n;
    }
    function ou(n) {
      return (n.type = (i.find.attr(n, "type") !== null) + "/" + n.type), n;
    }
    function su(n) {
      var t = ye.exec(n.type);
      return t ? (n.type = t[1]) : n.removeAttribute("type"), n;
    }
    function li(n, t) {
      for (var u, r = 0; (u = n[r]) != null; r++)
        i._data(u, "globalEval", !t || i._data(t[r], "globalEval"));
    }
    function hu(n, t) {
      if (t.nodeType === 1 && i.hasData(n)) {
        var u,
          f,
          o,
          s = i._data(n),
          r = i._data(t, s),
          e = s.events;
        if (e) {
          delete r.handle, (r.events = {});
          for (u in e)
            for (f = 0, o = e[u].length; f < o; f++) i.event.add(t, u, e[u][f]);
        }
        r.data && (r.data = i.extend({}, r.data));
      }
    }
    function ke(n, t) {
      var u, e, f;
      if (t.nodeType === 1) {
        if (((u = t.nodeName.toLowerCase()), !r.noCloneEvent && t[i.expando])) {
          f = i._data(t);
          for (e in f.events) i.removeEvent(t, e, f.handle);
          t.removeAttribute(i.expando);
        }
        u === "script" && t.text !== n.text
          ? ((ou(t).text = n.text), su(t))
          : u === "object"
          ? (t.parentNode && (t.outerHTML = n.outerHTML),
            r.html5Clone &&
              n.innerHTML &&
              !i.trim(t.innerHTML) &&
              (t.innerHTML = n.innerHTML))
          : u === "input" && oi.test(n.type)
          ? ((t.defaultChecked = t.checked = n.checked),
            t.value !== n.value && (t.value = n.value))
          : u === "option"
          ? (t.defaultSelected = t.selected = n.defaultSelected)
          : (u === "input" || u === "textarea") &&
            (t.defaultValue = n.defaultValue);
      }
    }
    function cu(t, r) {
      var u = i(r.createElement(t)).appendTo(r.body),
        f = n.getDefaultComputedStyle
          ? n.getDefaultComputedStyle(u[0]).display
          : i.css(u[0], "display");
      return u.detach(), f;
    }
    function lu(n) {
      var r = u,
        t = ai[n];
      return (
        t ||
          ((t = cu(n, r)),
          (t !== "none" && t) ||
            ((ot = (
              ot || i("<iframe frameborder='0' width='0' height='0'/>")
            ).appendTo(r.documentElement)),
            (r = (ot[0].contentWindow || ot[0].contentDocument).document),
            r.write(),
            r.close(),
            (t = cu(n, r)),
            ot.detach()),
          (ai[n] = t)),
        t
      );
    }
    function vu(n, t) {
      return {
        get: function () {
          var i = n();
          if (i != null) {
            if (i) {
              delete this.get;
              return;
            }
            return (this.get = t).apply(this, arguments);
          }
        },
      };
    }
    function wu(n, t) {
      if (t in n) return t;
      for (
        var r = t.charAt(0).toUpperCase() + t.slice(1), u = t, i = pu.length;
        i--;

      )
        if (((t = pu[i] + r), t in n)) return t;
      return u;
    }
    function bu(n, t) {
      for (var f, r, o, e = [], u = 0, s = n.length; u < s; u++)
        ((r = n[u]), r.style) &&
          ((e[u] = i._data(r, "olddisplay")),
          (f = r.style.display),
          t
            ? (e[u] || f !== "none" || (r.style.display = ""),
              r.style.display === "" &&
                et(r) &&
                (e[u] = i._data(r, "olddisplay", lu(r.nodeName))))
            : e[u] ||
              ((o = et(r)),
              ((f && f !== "none") || !o) &&
                i._data(r, "olddisplay", o ? f : i.css(r, "display"))));
      for (u = 0; u < s; u++)
        ((r = n[u]), r.style) &&
          ((t && r.style.display !== "none" && r.style.display !== "") ||
            (r.style.display = t ? e[u] || "" : "none"));
      return n;
    }
    function ku(n, t, i) {
      var r = to.exec(t);
      return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t;
    }
    function du(n, t, r, u, f) {
      for (
        var e = r === (u ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
          o = 0;
        e < 4;
        e += 2
      )
        r === "margin" && (o += i.css(n, r + w[e], !0, f)),
          u
            ? (r === "content" && (o -= i.css(n, "padding" + w[e], !0, f)),
              r !== "margin" &&
                (o -= i.css(n, "border" + w[e] + "Width", !0, f)))
            : ((o += i.css(n, "padding" + w[e], !0, f)),
              r !== "padding" &&
                (o += i.css(n, "border" + w[e] + "Width", !0, f)));
      return o;
    }
    function gu(n, t, u) {
      var o = !0,
        f = t === "width" ? n.offsetWidth : n.offsetHeight,
        e = k(n),
        s = r.boxSizing() && i.css(n, "boxSizing", !1, e) === "border-box";
      if (f <= 0 || f == null) {
        if (
          ((f = d(n, t, e)),
          (f < 0 || f == null) && (f = n.style[t]),
          yt.test(f))
        )
          return f;
        (o = s && (r.boxSizingReliable() || f === n.style[t])),
          (f = parseFloat(f) || 0);
      }
      return f + du(n, t, u || (s ? "border" : "content"), o, e) + "px";
    }
    function e(n, t, i, r, u) {
      return new e.prototype.init(n, t, i, r, u);
    }
    function tf() {
      return (
        setTimeout(function () {
          rt = undefined;
        }),
        (rt = i.now())
      );
    }
    function bt(n, t) {
      var r,
        i = { height: n },
        u = 0;
      for (t = t ? 1 : 0; u < 4; u += 2 - t)
        (r = w[u]), (i["margin" + r] = i["padding" + r] = n);
      return t && (i.opacity = i.width = n), i;
    }
    function rf(n, t, i) {
      for (
        var u, f = (st[t] || []).concat(st["*"]), r = 0, e = f.length;
        r < e;
        r++
      )
        if ((u = f[r].call(i, t, n))) return u;
    }
    function eo(n, t, u) {
      var f,
        l,
        p,
        a,
        o,
        b,
        y,
        w,
        c = this,
        v = {},
        s = n.style,
        h = n.nodeType && et(n),
        e = i._data(n, "fxshow");
      u.queue ||
        ((o = i._queueHooks(n, "fx")),
        o.unqueued == null &&
          ((o.unqueued = 0),
          (b = o.empty.fire),
          (o.empty.fire = function () {
            o.unqueued || b();
          })),
        o.unqueued++,
        c.always(function () {
          c.always(function () {
            o.unqueued--, i.queue(n, "fx").length || o.empty.fire();
          });
        })),
        n.nodeType === 1 &&
          ("height" in t || "width" in t) &&
          ((u.overflow = [s.overflow, s.overflowX, s.overflowY]),
          (y = i.css(n, "display")),
          (w = lu(n.nodeName)),
          y === "none" && (y = w),
          y === "inline" &&
            i.css(n, "float") === "none" &&
            (r.inlineBlockNeedsLayout && w !== "inline"
              ? (s.zoom = 1)
              : (s.display = "inline-block"))),
        u.overflow &&
          ((s.overflow = "hidden"),
          r.shrinkWrapBlocks() ||
            c.always(function () {
              (s.overflow = u.overflow[0]),
                (s.overflowX = u.overflow[1]),
                (s.overflowY = u.overflow[2]);
            }));
      for (f in t)
        if (((l = t[f]), uo.exec(l))) {
          if (
            (delete t[f],
            (p = p || l === "toggle"),
            l === (h ? "hide" : "show"))
          )
            if (l === "show" && e && e[f] !== undefined) h = !0;
            else continue;
          v[f] = (e && e[f]) || i.style(n, f);
        }
      if (!i.isEmptyObject(v)) {
        e ? "hidden" in e && (h = e.hidden) : (e = i._data(n, "fxshow", {})),
          p && (e.hidden = !h),
          h
            ? i(n).show()
            : c.done(function () {
                i(n).hide();
              }),
          c.done(function () {
            var t;
            i._removeData(n, "fxshow");
            for (t in v) i.style(n, t, v[t]);
          });
        for (f in v)
          (a = rf(h ? e[f] : 0, f, c)),
            f in e ||
              ((e[f] = a.start),
              h &&
                ((a.end = a.start),
                (a.start = f === "width" || f === "height" ? 1 : 0)));
      }
    }
    function oo(n, t) {
      var r, f, e, u, o;
      for (r in n)
        if (
          ((f = i.camelCase(r)),
          (e = t[f]),
          (u = n[r]),
          i.isArray(u) && ((e = u[1]), (u = n[r] = u[0])),
          r !== f && ((n[f] = u), delete n[r]),
          (o = i.cssHooks[f]),
          o && "expand" in o)
        ) {
          (u = o.expand(u)), delete n[f];
          for (r in u) r in n || ((n[r] = u[r]), (t[r] = e));
        } else t[f] = e;
    }
    function uf(n, t, r) {
      var e,
        o,
        s = 0,
        l = wt.length,
        f = i.Deferred().always(function () {
          delete c.elem;
        }),
        c = function () {
          if (o) return !1;
          for (
            var s = rt || tf(),
              t = Math.max(0, u.startTime + u.duration - s),
              h = t / u.duration || 0,
              i = 1 - h,
              r = 0,
              e = u.tweens.length;
            r < e;
            r++
          )
            u.tweens[r].run(i);
          return (
            f.notifyWith(n, [u, i, t]),
            i < 1 && e ? t : (f.resolveWith(n, [u]), !1)
          );
        },
        u = f.promise({
          elem: n,
          props: i.extend({}, t),
          opts: i.extend(!0, { specialEasing: {} }, r),
          originalProperties: t,
          originalOptions: r,
          startTime: rt || tf(),
          duration: r.duration,
          tweens: [],
          createTween: function (t, r) {
            var f = i.Tween(
              n,
              u.opts,
              t,
              r,
              u.opts.specialEasing[t] || u.opts.easing
            );
            return u.tweens.push(f), f;
          },
          stop: function (t) {
            var i = 0,
              r = t ? u.tweens.length : 0;
            if (o) return this;
            for (o = !0; i < r; i++) u.tweens[i].run(1);
            return t ? f.resolveWith(n, [u, t]) : f.rejectWith(n, [u, t]), this;
          },
        }),
        h = u.props;
      for (oo(h, u.opts.specialEasing); s < l; s++)
        if (((e = wt[s].call(u, n, h, u.opts)), e)) return e;
      return (
        i.map(h, rf, u),
        i.isFunction(u.opts.start) && u.opts.start.call(n, u),
        i.fx.timer(i.extend(c, { elem: n, anim: u, queue: u.opts.queue })),
        u
          .progress(u.opts.progress)
          .done(u.opts.done, u.opts.complete)
          .fail(u.opts.fail)
          .always(u.opts.always)
      );
    }
    function vf(n) {
      return function (t, r) {
        typeof t != "string" && ((r = t), (t = "*"));
        var u,
          f = 0,
          e = t.toLowerCase().match(h) || [];
        if (i.isFunction(r))
          while ((u = e[f++]))
            u.charAt(0) === "+"
              ? ((u = u.slice(1) || "*"), (n[u] = n[u] || []).unshift(r))
              : (n[u] = n[u] || []).push(r);
      };
    }
    function yf(n, t, r, u) {
      function e(s) {
        var h;
        return (
          (f[s] = !0),
          i.each(n[s] || [], function (n, i) {
            var s = i(t, r, u);
            if (typeof s != "string" || o || f[s]) {
              if (o) return !(h = s);
            } else return t.dataTypes.unshift(s), e(s), !1;
          }),
          h
        );
      }
      var f = {},
        o = n === bi;
      return e(t.dataTypes[0]) || (!f["*"] && e("*"));
    }
    function ki(n, t) {
      var u,
        r,
        f = i.ajaxSettings.flatOptions || {};
      for (r in t) t[r] !== undefined && ((f[r] ? n : u || (u = {}))[r] = t[r]);
      return u && i.extend(!0, n, u), n;
    }
    function yo(n, t, i) {
      for (var o, e, u, f, s = n.contents, r = n.dataTypes; r[0] === "*"; )
        r.shift(),
          e === undefined &&
            (e = n.mimeType || t.getResponseHeader("Content-Type"));
      if (e)
        for (f in s)
          if (s[f] && s[f].test(e)) {
            r.unshift(f);
            break;
          }
      if (r[0] in i) u = r[0];
      else {
        for (f in i) {
          if (!r[0] || n.converters[f + " " + r[0]]) {
            u = f;
            break;
          }
          o || (o = f);
        }
        u = u || o;
      }
      if (u) return u !== r[0] && r.unshift(u), i[u];
    }
    function po(n, t, i, r) {
      var h,
        u,
        f,
        s,
        e,
        o = {},
        c = n.dataTypes.slice();
      if (c[1]) for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
      for (u = c.shift(); u; )
        if (
          (n.responseFields[u] && (i[n.responseFields[u]] = t),
          !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)),
          (e = u),
          (u = c.shift()),
          u)
        )
          if (u === "*") u = e;
          else if (e !== "*" && e !== u) {
            if (((f = o[e + " " + u] || o["* " + u]), !f))
              for (h in o)
                if (
                  ((s = h.split(" ")),
                  s[1] === u && ((f = o[e + " " + s[0]] || o["* " + s[0]]), f))
                ) {
                  f === !0
                    ? (f = o[h])
                    : o[h] !== !0 && ((u = s[0]), c.unshift(s[1]));
                  break;
                }
            if (f !== !0)
              if (f && n.throws) t = f(t);
              else
                try {
                  t = f(t);
                } catch (l) {
                  return {
                    state: "parsererror",
                    error: f ? l : "No conversion from " + e + " to " + u,
                  };
                }
          }
      return { state: "success", data: t };
    }
    function di(n, t, r, u) {
      var f;
      if (i.isArray(t))
        i.each(t, function (t, i) {
          r || bo.test(n)
            ? u(n, i)
            : di(n + "[" + (typeof i == "object" ? t : "") + "]", i, r, u);
        });
      else if (r || i.type(t) !== "object") u(n, t);
      else for (f in t) di(n + "[" + f + "]", t[f], r, u);
    }
    function wf() {
      try {
        return new n.XMLHttpRequest();
      } catch (t) {}
    }
    function ts() {
      try {
        return new n.ActiveXObject("Microsoft.XMLHTTP");
      } catch (t) {}
    }
    function bf(n) {
      return i.isWindow(n)
        ? n
        : n.nodeType === 9
        ? n.defaultView || n.parentWindow
        : !1;
    }
    var c = [],
      l = c.slice,
      ir = c.concat,
      ti = c.push,
      rr = c.indexOf,
      ct = {},
      gf = ct.toString,
      tt = ct.hasOwnProperty,
      ii = "".trim,
      r = {},
      ur = "1.11.0",
      i = function (n, t) {
        return new i.fn.init(n, t);
      },
      ne = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      te = /^-ms-/,
      ie = /-([\da-z])/gi,
      re = function (n, t) {
        return t.toUpperCase();
      },
      p,
      or,
      sr,
      h,
      fi,
      lt,
      o,
      lr,
      ar,
      vr,
      ot,
      ai,
      ff,
      of,
      sf,
      dt,
      gi,
      ni,
      nr,
      tr,
      kf,
      df;
    (i.fn = i.prototype = {
      jquery: ur,
      constructor: i,
      selector: "",
      length: 0,
      toArray: function () {
        return l.call(this);
      },
      get: function (n) {
        return n != null
          ? n < 0
            ? this[n + this.length]
            : this[n]
          : l.call(this);
      },
      pushStack: function (n) {
        var t = i.merge(this.constructor(), n);
        return (t.prevObject = this), (t.context = this.context), t;
      },
      each: function (n, t) {
        return i.each(this, n, t);
      },
      map: function (n) {
        return this.pushStack(
          i.map(this, function (t, i) {
            return n.call(t, i, t);
          })
        );
      },
      slice: function () {
        return this.pushStack(l.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (n) {
        var i = this.length,
          t = +n + (n < 0 ? i : 0);
        return this.pushStack(t >= 0 && t < i ? [this[t]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor(null);
      },
      push: ti,
      sort: c.sort,
      splice: c.splice,
    }),
      (i.extend = i.fn.extend = function () {
        var r,
          e,
          t,
          f,
          o,
          s,
          n = arguments[0] || {},
          u = 1,
          c = arguments.length,
          h = !1;
        for (
          typeof n == "boolean" && ((h = n), (n = arguments[u] || {}), u++),
            typeof n == "object" || i.isFunction(n) || (n = {}),
            u === c && ((n = this), u--);
          u < c;
          u++
        )
          if ((o = arguments[u]) != null)
            for (f in o)
              ((r = n[f]), (t = o[f]), n !== t) &&
                (h && t && (i.isPlainObject(t) || (e = i.isArray(t)))
                  ? (e
                      ? ((e = !1), (s = r && i.isArray(r) ? r : []))
                      : (s = r && i.isPlainObject(r) ? r : {}),
                    (n[f] = i.extend(h, s, t)))
                  : t !== undefined && (n[f] = t));
        return n;
      }),
      i.extend({
        expando: "jQuery" + (ur + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (n) {
          throw new Error(n);
        },
        noop: function () {},
        isFunction: function (n) {
          return i.type(n) === "function";
        },
        isArray:
          Array.isArray ||
          function (n) {
            return i.type(n) === "array";
          },
        isWindow: function (n) {
          return n != null && n == n.window;
        },
        isNumeric: function (n) {
          return n - parseFloat(n) >= 0;
        },
        isEmptyObject: function (n) {
          var t;
          for (t in n) return !1;
          return !0;
        },
        isPlainObject: function (n) {
          var t;
          if (!n || i.type(n) !== "object" || n.nodeType || i.isWindow(n))
            return !1;
          try {
            if (
              n.constructor &&
              !tt.call(n, "constructor") &&
              !tt.call(n.constructor.prototype, "isPrototypeOf")
            )
              return !1;
          } catch (u) {
            return !1;
          }
          if (r.ownLast) for (t in n) return tt.call(n, t);
          for (t in n);
          return t === undefined || tt.call(n, t);
        },
        type: function (n) {
          return n == null
            ? n + ""
            : typeof n == "object" || typeof n == "function"
            ? ct[gf.call(n)] || "object"
            : typeof n;
        },
        globalEval: function (t) {
          t &&
            i.trim(t) &&
            (
              n.execScript ||
              function (t) {
                n.eval.call(n, t);
              }
            )(t);
        },
        camelCase: function (n) {
          return n.replace(te, "ms-").replace(ie, re);
        },
        nodeName: function (n, t) {
          return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function (n, t, i) {
          var u,
            r = 0,
            f = n.length,
            e = ri(n);
          if (i) {
            if (e) {
              for (; r < f; r++) if (((u = t.apply(n[r], i)), u === !1)) break;
            } else for (r in n) if (((u = t.apply(n[r], i)), u === !1)) break;
          } else if (e) {
            for (; r < f; r++)
              if (((u = t.call(n[r], r, n[r])), u === !1)) break;
          } else
            for (r in n) if (((u = t.call(n[r], r, n[r])), u === !1)) break;
          return n;
        },
        trim:
          ii && !ii.call("﻿ ")
            ? function (n) {
                return n == null ? "" : ii.call(n);
              }
            : function (n) {
                return n == null ? "" : (n + "").replace(ne, "");
              },
        makeArray: function (n, t) {
          var r = t || [];
          return (
            n != null &&
              (ri(Object(n))
                ? i.merge(r, typeof n == "string" ? [n] : n)
                : ti.call(r, n)),
            r
          );
        },
        inArray: function (n, t, i) {
          var r;
          if (t) {
            if (rr) return rr.call(t, n, i);
            for (
              r = t.length, i = i ? (i < 0 ? Math.max(0, r + i) : i) : 0;
              i < r;
              i++
            )
              if (i in t && t[i] === n) return i;
          }
          return -1;
        },
        merge: function (n, t) {
          for (var r = +t.length, i = 0, u = n.length; i < r; ) n[u++] = t[i++];
          if (r !== r) while (t[i] !== undefined) n[u++] = t[i++];
          return (n.length = u), n;
        },
        grep: function (n, t, i) {
          for (var u, f = [], r = 0, e = n.length, o = !i; r < e; r++)
            (u = !t(n[r], r)), u !== o && f.push(n[r]);
          return f;
        },
        map: function (n, t, i) {
          var u,
            r = 0,
            e = n.length,
            o = ri(n),
            f = [];
          if (o) for (; r < e; r++) (u = t(n[r], r, i)), u != null && f.push(u);
          else for (r in n) (u = t(n[r], r, i)), u != null && f.push(u);
          return ir.apply([], f);
        },
        guid: 1,
        proxy: function (n, t) {
          var u, r, f;
          return (typeof t == "string" && ((f = n[t]), (t = n), (n = f)),
          !i.isFunction(n))
            ? undefined
            : ((u = l.call(arguments, 2)),
              (r = function () {
                return n.apply(t || this, u.concat(l.call(arguments)));
              }),
              (r.guid = n.guid = n.guid || i.guid++),
              r);
        },
        now: function () {
          return +new Date();
        },
        support: r,
      }),
      i.each(
        "Boolean Number String Function Array Date RegExp Object Error".split(
          " "
        ),
        function (n, t) {
          ct["[object " + t + "]"] = t.toLowerCase();
        }
      ),
      (p = (function (n) {
        function u(n, t, i, u) {
          var w, h, c, v, k, y, d, a, nt, g;
          if (
            ((t ? t.ownerDocument || t : s) !== e && p(t),
            (t = t || e),
            (i = i || []),
            !n || typeof n != "string")
          )
            return i;
          if ((v = t.nodeType) !== 1 && v !== 9) return [];
          if (l && !u) {
            if ((w = or.exec(n)))
              if ((c = w[1])) {
                if (v === 9)
                  if (((h = t.getElementById(c)), h && h.parentNode)) {
                    if (h.id === c) return i.push(h), i;
                  } else return i;
                else if (
                  t.ownerDocument &&
                  (h = t.ownerDocument.getElementById(c)) &&
                  et(t, h) &&
                  h.id === c
                )
                  return i.push(h), i;
              } else {
                if (w[2]) return b.apply(i, t.getElementsByTagName(n)), i;
                if (
                  (c = w[3]) &&
                  r.getElementsByClassName &&
                  t.getElementsByClassName
                )
                  return b.apply(i, t.getElementsByClassName(c)), i;
              }
            if (r.qsa && (!o || !o.test(n))) {
              if (
                ((a = d = f),
                (nt = t),
                (g = v === 9 && n),
                v === 1 && t.nodeName.toLowerCase() !== "object")
              ) {
                for (
                  y = vt(n),
                    (d = t.getAttribute("id"))
                      ? (a = d.replace(sr, "\\$&"))
                      : t.setAttribute("id", a),
                    a = "[id='" + a + "'] ",
                    k = y.length;
                  k--;

                )
                  y[k] = a + yt(y[k]);
                (nt = (gt.test(n) && ii(t.parentNode)) || t), (g = y.join(","));
              }
              if (g)
                try {
                  return b.apply(i, nt.querySelectorAll(g)), i;
                } catch (tt) {
                } finally {
                  d || t.removeAttribute("id");
                }
            }
          }
          return vr(n.replace(lt, "$1"), t, i, u);
        }
        function ni() {
          function n(r, u) {
            return (
              i.push(r + " ") > t.cacheLength && delete n[i.shift()],
              (n[r + " "] = u)
            );
          }
          var i = [];
          return n;
        }
        function h(n) {
          return (n[f] = !0), n;
        }
        function c(n) {
          var t = e.createElement("div");
          try {
            return !!n(t);
          } catch (i) {
            return !1;
          } finally {
            t.parentNode && t.parentNode.removeChild(t), (t = null);
          }
        }
        function ti(n, i) {
          for (var u = n.split("|"), r = n.length; r--; )
            t.attrHandle[u[r]] = i;
        }
        function pi(n, t) {
          var i = t && n,
            r =
              i &&
              n.nodeType === 1 &&
              t.nodeType === 1 &&
              (~t.sourceIndex || li) - (~n.sourceIndex || li);
          if (r) return r;
          if (i) while ((i = i.nextSibling)) if (i === t) return -1;
          return n ? 1 : -1;
        }
        function hr(n) {
          return function (t) {
            var i = t.nodeName.toLowerCase();
            return i === "input" && t.type === n;
          };
        }
        function cr(n) {
          return function (t) {
            var i = t.nodeName.toLowerCase();
            return (i === "input" || i === "button") && t.type === n;
          };
        }
        function tt(n) {
          return h(function (t) {
            return (
              (t = +t),
              h(function (i, r) {
                for (var u, f = n([], i.length, t), e = f.length; e--; )
                  i[(u = f[e])] && (i[u] = !(r[u] = i[u]));
              })
            );
          });
        }
        function ii(n) {
          return n && typeof n.getElementsByTagName !== ut && n;
        }
        function wi() {}
        function vt(n, i) {
          var e,
            f,
            s,
            o,
            r,
            h,
            c,
            l = hi[n + " "];
          if (l) return i ? 0 : l.slice(0);
          for (r = n, h = [], c = t.preFilter; r; ) {
            (!e || (f = nr.exec(r))) &&
              (f && (r = r.slice(f[0].length) || r), h.push((s = []))),
              (e = !1),
              (f = tr.exec(r)) &&
                ((e = f.shift()),
                s.push({ value: e, type: f[0].replace(lt, " ") }),
                (r = r.slice(e.length)));
            for (o in t.filter)
              (f = at[o].exec(r)) &&
                (!c[o] || (f = c[o](f))) &&
                ((e = f.shift()),
                s.push({ value: e, type: o, matches: f }),
                (r = r.slice(e.length)));
            if (!e) break;
          }
          return i ? r.length : r ? u.error(n) : hi(n, h).slice(0);
        }
        function yt(n) {
          for (var t = 0, r = n.length, i = ""; t < r; t++) i += n[t].value;
          return i;
        }
        function ri(n, t, i) {
          var r = t.dir,
            u = i && r === "parentNode",
            e = bi++;
          return t.first
            ? function (t, i, f) {
                while ((t = t[r])) if (t.nodeType === 1 || u) return n(t, i, f);
              }
            : function (t, i, o) {
                var s,
                  h,
                  c = [a, e];
                if (o) {
                  while ((t = t[r]))
                    if ((t.nodeType === 1 || u) && n(t, i, o)) return !0;
                } else
                  while ((t = t[r]))
                    if (t.nodeType === 1 || u) {
                      if (
                        ((h = t[f] || (t[f] = {})),
                        (s = h[r]) && s[0] === a && s[1] === e)
                      )
                        return (c[2] = s[2]);
                      if (((h[r] = c), (c[2] = n(t, i, o)))) return !0;
                    }
              };
        }
        function ui(n) {
          return n.length > 1
            ? function (t, i, r) {
                for (var u = n.length; u--; ) if (!n[u](t, i, r)) return !1;
                return !0;
              }
            : n[0];
        }
        function pt(n, t, i, r, u) {
          for (var e, o = [], f = 0, s = n.length, h = t != null; f < s; f++)
            (e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
          return o;
        }
        function fi(n, t, i, r, u, e) {
          return (
            r && !r[f] && (r = fi(r)),
            u && !u[f] && (u = fi(u, e)),
            h(function (f, e, o, s) {
              var l,
                c,
                a,
                p = [],
                y = [],
                w = e.length,
                k = f || ar(t || "*", o.nodeType ? [o] : o, []),
                v = n && (f || !t) ? pt(k, p, n, o, s) : k,
                h = i ? (u || (f ? n : w || r) ? [] : e) : v;
              if ((i && i(v, h, o, s), r))
                for (l = pt(h, y), r(l, [], o, s), c = l.length; c--; )
                  (a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
              if (f) {
                if (u || n) {
                  if (u) {
                    for (l = [], c = h.length; c--; )
                      (a = h[c]) && l.push((v[c] = a));
                    u(null, (h = []), l, s);
                  }
                  for (c = h.length; c--; )
                    (a = h[c]) &&
                      (l = u ? nt.call(f, a) : p[c]) > -1 &&
                      (f[l] = !(e[l] = a));
                }
              } else (h = pt(h === e ? h.splice(w, h.length) : h)), u ? u(null, e, h, s) : b.apply(e, h);
            })
          );
        }
        function ei(n) {
          for (
            var s,
              u,
              r,
              o = n.length,
              h = t.relative[n[0].type],
              c = h || t.relative[" "],
              i = h ? 1 : 0,
              l = ri(
                function (n) {
                  return n === s;
                },
                c,
                !0
              ),
              a = ri(
                function (n) {
                  return nt.call(s, n) > -1;
                },
                c,
                !0
              ),
              e = [
                function (n, t, i) {
                  return (
                    (!h && (i || t !== ht)) ||
                    ((s = t).nodeType ? l(n, t, i) : a(n, t, i))
                  );
                },
              ];
            i < o;
            i++
          )
            if ((u = t.relative[n[i].type])) e = [ri(ui(e), u)];
            else {
              if (((u = t.filter[n[i].type].apply(null, n[i].matches)), u[f])) {
                for (r = ++i; r < o; r++) if (t.relative[n[r].type]) break;
                return fi(
                  i > 1 && ui(e),
                  i > 1 &&
                    yt(
                      n
                        .slice(0, i - 1)
                        .concat({ value: n[i - 2].type === " " ? "*" : "" })
                    ).replace(lt, "$1"),
                  u,
                  i < r && ei(n.slice(i, r)),
                  r < o && ei((n = n.slice(r))),
                  r < o && yt(n)
                );
              }
              e.push(u);
            }
          return ui(e);
        }
        function lr(n, i) {
          var r = i.length > 0,
            f = n.length > 0,
            o = function (o, s, h, c, l) {
              var y,
                d,
                w,
                k = 0,
                v = "0",
                g = o && [],
                p = [],
                nt = ht,
                tt = o || (f && t.find.TAG("*", l)),
                it = (a += nt == null ? 1 : Math.random() || 0.1),
                rt = tt.length;
              for (
                l && (ht = s !== e && s);
                v !== rt && (y = tt[v]) != null;
                v++
              ) {
                if (f && y) {
                  for (d = 0; (w = n[d++]); )
                    if (w(y, s, h)) {
                      c.push(y);
                      break;
                    }
                  l && (a = it);
                }
                r && ((y = !w && y) && k--, o && g.push(y));
              }
              if (((k += v), r && v !== k)) {
                for (d = 0; (w = i[d++]); ) w(g, p, s, h);
                if (o) {
                  if (k > 0) while (v--) g[v] || p[v] || (p[v] = di.call(c));
                  p = pt(p);
                }
                b.apply(c, p),
                  l &&
                    !o &&
                    p.length > 0 &&
                    k + i.length > 1 &&
                    u.uniqueSort(c);
              }
              return l && ((a = it), (ht = nt)), g;
            };
          return r ? h(o) : o;
        }
        function ar(n, t, i) {
          for (var r = 0, f = t.length; r < f; r++) u(n, t[r], i);
          return i;
        }
        function vr(n, i, u, f) {
          var s,
            e,
            o,
            c,
            a,
            h = vt(n);
          if (!f && h.length === 1) {
            if (
              ((e = h[0] = h[0].slice(0)),
              e.length > 2 &&
                (o = e[0]).type === "ID" &&
                r.getById &&
                i.nodeType === 9 &&
                l &&
                t.relative[e[1].type])
            ) {
              if (
                ((i = (t.find.ID(o.matches[0].replace(k, d), i) || [])[0]), !i)
              )
                return u;
              n = n.slice(e.shift().value.length);
            }
            for (s = at.needsContext.test(n) ? 0 : e.length; s--; ) {
              if (((o = e[s]), t.relative[(c = o.type)])) break;
              if (
                (a = t.find[c]) &&
                (f = a(
                  o.matches[0].replace(k, d),
                  (gt.test(e[0].type) && ii(i.parentNode)) || i
                ))
              ) {
                if ((e.splice(s, 1), (n = f.length && yt(e)), !n))
                  return b.apply(u, f), u;
                break;
              }
            }
          }
          return (
            wt(n, h)(f, i, !l, u, (gt.test(n) && ii(i.parentNode)) || i), u
          );
        }
        var it,
          r,
          t,
          st,
          oi,
          wt,
          ht,
          y,
          rt,
          p,
          e,
          v,
          l,
          o,
          g,
          ct,
          et,
          f = "sizzle" + -new Date(),
          s = n.document,
          a = 0,
          bi = 0,
          si = ni(),
          hi = ni(),
          ci = ni(),
          bt = function (n, t) {
            return n === t && (rt = !0), 0;
          },
          ut = typeof undefined,
          li = -2147483648,
          ki = {}.hasOwnProperty,
          w = [],
          di = w.pop,
          gi = w.push,
          b = w.push,
          ai = w.slice,
          nt =
            w.indexOf ||
            function (n) {
              for (var t = 0, i = this.length; t < i; t++)
                if (this[t] === n) return t;
              return -1;
            },
          kt =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          i = "[\\x20\\t\\r\\n\\f]",
          ft = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
          vi = ft.replace("w", "w#"),
          yi =
            "\\[" +
            i +
            "*(" +
            ft +
            ")" +
            i +
            "*(?:([*^$|!~]?=)" +
            i +
            "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
            vi +
            ")|)|)" +
            i +
            "*\\]",
          dt =
            ":(" +
            ft +
            ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
            yi.replace(3, 8) +
            ")*)|.*)\\)|)",
          lt = new RegExp(
            "^" + i + "+|((?:^|[^\\\\])(?:\\\\.)*)" + i + "+$",
            "g"
          ),
          nr = new RegExp("^" + i + "*," + i + "*"),
          tr = new RegExp("^" + i + "*([>+~]|" + i + ")" + i + "*"),
          ir = new RegExp("=" + i + "*([^\\]'\"]*?)" + i + "*\\]", "g"),
          rr = new RegExp(dt),
          ur = new RegExp("^" + vi + "$"),
          at = {
            ID: new RegExp("^#(" + ft + ")"),
            CLASS: new RegExp("^\\.(" + ft + ")"),
            TAG: new RegExp("^(" + ft.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + yi),
            PSEUDO: new RegExp("^" + dt),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                i +
                "*(even|odd|(([+-]|)(\\d*)n|)" +
                i +
                "*(?:([+-]|)" +
                i +
                "*(\\d+)|))" +
                i +
                "*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + kt + ")$", "i"),
            needsContext: new RegExp(
              "^" +
                i +
                "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                i +
                "*((?:-\\d)?\\d*)" +
                i +
                "*\\)|)(?=[^-]|$)",
              "i"
            ),
          },
          fr = /^(?:input|select|textarea|button)$/i,
          er = /^h\d$/i,
          ot = /^[^{]+\{\s*\[native \w/,
          or = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          gt = /[+~]/,
          sr = /'|\\/g,
          k = new RegExp("\\\\([\\da-f]{1,6}" + i + "?|(" + i + ")|.)", "ig"),
          d = function (n, t, i) {
            var r = "0x" + t - 65536;
            return r !== r || i
              ? t
              : r < 0
              ? String.fromCharCode(r + 65536)
              : String.fromCharCode((r >> 10) | 55296, (r & 1023) | 56320);
          };
        try {
          b.apply((w = ai.call(s.childNodes)), s.childNodes),
            w[s.childNodes.length].nodeType;
        } catch (yr) {
          b = {
            apply: w.length
              ? function (n, t) {
                  gi.apply(n, ai.call(t));
                }
              : function (n, t) {
                  for (var i = n.length, r = 0; (n[i++] = t[r++]); );
                  n.length = i - 1;
                },
          };
        }
        (r = u.support = {}),
          (oi = u.isXML = function (n) {
            var t = n && (n.ownerDocument || n).documentElement;
            return t ? t.nodeName !== "HTML" : !1;
          }),
          (p = u.setDocument = function (n) {
            var a,
              u = n ? n.ownerDocument || n : s,
              h = u.defaultView;
            return u === e || u.nodeType !== 9 || !u.documentElement
              ? e
              : ((e = u),
                (v = u.documentElement),
                (l = !oi(u)),
                h &&
                  h !== h.top &&
                  (h.addEventListener
                    ? h.addEventListener(
                        "unload",
                        function () {
                          p();
                        },
                        !1
                      )
                    : h.attachEvent &&
                      h.attachEvent("onunload", function () {
                        p();
                      })),
                (r.attributes = c(function (n) {
                  return (n.className = "i"), !n.getAttribute("className");
                })),
                (r.getElementsByTagName = c(function (n) {
                  return (
                    n.appendChild(u.createComment("")),
                    !n.getElementsByTagName("*").length
                  );
                })),
                (r.getElementsByClassName =
                  ot.test(u.getElementsByClassName) &&
                  c(function (n) {
                    return (
                      (n.innerHTML =
                        "<div class='a'></div><div class='a i'></div>"),
                      (n.firstChild.className = "i"),
                      n.getElementsByClassName("i").length === 2
                    );
                  })),
                (r.getById = c(function (n) {
                  return (
                    (v.appendChild(n).id = f),
                    !u.getElementsByName || !u.getElementsByName(f).length
                  );
                })),
                r.getById
                  ? ((t.find.ID = function (n, t) {
                      if (typeof t.getElementById !== ut && l) {
                        var i = t.getElementById(n);
                        return i && i.parentNode ? [i] : [];
                      }
                    }),
                    (t.filter.ID = function (n) {
                      var t = n.replace(k, d);
                      return function (n) {
                        return n.getAttribute("id") === t;
                      };
                    }))
                  : (delete t.find.ID,
                    (t.filter.ID = function (n) {
                      var t = n.replace(k, d);
                      return function (n) {
                        var i =
                          typeof n.getAttributeNode !== ut &&
                          n.getAttributeNode("id");
                        return i && i.value === t;
                      };
                    })),
                (t.find.TAG = r.getElementsByTagName
                  ? function (n, t) {
                      if (typeof t.getElementsByTagName !== ut)
                        return t.getElementsByTagName(n);
                    }
                  : function (n, t) {
                      var i,
                        r = [],
                        f = 0,
                        u = t.getElementsByTagName(n);
                      if (n === "*") {
                        while ((i = u[f++])) i.nodeType === 1 && r.push(i);
                        return r;
                      }
                      return u;
                    }),
                (t.find.CLASS =
                  r.getElementsByClassName &&
                  function (n, t) {
                    if (typeof t.getElementsByClassName !== ut && l)
                      return t.getElementsByClassName(n);
                  }),
                (g = []),
                (o = []),
                (r.qsa = ot.test(u.querySelectorAll)) &&
                  (c(function (n) {
                    (n.innerHTML =
                      "<select t=''><option selected=''></option></select>"),
                      n.querySelectorAll("[t^='']").length &&
                        o.push("[*^$]=" + i + "*(?:''|\"\")"),
                      n.querySelectorAll("[selected]").length ||
                        o.push("\\[" + i + "*(?:value|" + kt + ")"),
                      n.querySelectorAll(":checked").length ||
                        o.push(":checked");
                  }),
                  c(function (n) {
                    var t = u.createElement("input");
                    t.setAttribute("type", "hidden"),
                      n.appendChild(t).setAttribute("name", "D"),
                      n.querySelectorAll("[name=d]").length &&
                        o.push("name" + i + "*[*^$|!~]?="),
                      n.querySelectorAll(":enabled").length ||
                        o.push(":enabled", ":disabled"),
                      n.querySelectorAll("*,:x"),
                      o.push(",.*:");
                  })),
                (r.matchesSelector = ot.test(
                  (ct =
                    v.webkitMatchesSelector ||
                    v.mozMatchesSelector ||
                    v.oMatchesSelector ||
                    v.msMatchesSelector)
                )) &&
                  c(function (n) {
                    (r.disconnectedMatch = ct.call(n, "div")),
                      ct.call(n, "[s!='']:x"),
                      g.push("!=", dt);
                  }),
                (o = o.length && new RegExp(o.join("|"))),
                (g = g.length && new RegExp(g.join("|"))),
                (a = ot.test(v.compareDocumentPosition)),
                (et =
                  a || ot.test(v.contains)
                    ? function (n, t) {
                        var r = n.nodeType === 9 ? n.documentElement : n,
                          i = t && t.parentNode;
                        return (
                          n === i ||
                          !!(
                            i &&
                            i.nodeType === 1 &&
                            (r.contains
                              ? r.contains(i)
                              : n.compareDocumentPosition &&
                                n.compareDocumentPosition(i) & 16)
                          )
                        );
                      }
                    : function (n, t) {
                        if (t)
                          while ((t = t.parentNode)) if (t === n) return !0;
                        return !1;
                      }),
                (bt = a
                  ? function (n, t) {
                      if (n === t) return (rt = !0), 0;
                      var i =
                        !n.compareDocumentPosition - !t.compareDocumentPosition;
                      return i
                        ? i
                        : ((i =
                            (n.ownerDocument || n) === (t.ownerDocument || t)
                              ? n.compareDocumentPosition(t)
                              : 1),
                          i & 1 ||
                            (!r.sortDetached &&
                              t.compareDocumentPosition(n) === i))
                        ? n === u || (n.ownerDocument === s && et(s, n))
                          ? -1
                          : t === u || (t.ownerDocument === s && et(s, t))
                          ? 1
                          : y
                          ? nt.call(y, n) - nt.call(y, t)
                          : 0
                        : i & 4
                        ? -1
                        : 1;
                    }
                  : function (n, t) {
                      if (n === t) return (rt = !0), 0;
                      var i,
                        r = 0,
                        o = n.parentNode,
                        h = t.parentNode,
                        f = [n],
                        e = [t];
                      if (o && h) {
                        if (o === h) return pi(n, t);
                      } else
                        return n === u
                          ? -1
                          : t === u
                          ? 1
                          : o
                          ? -1
                          : h
                          ? 1
                          : y
                          ? nt.call(y, n) - nt.call(y, t)
                          : 0;
                      for (i = n; (i = i.parentNode); ) f.unshift(i);
                      for (i = t; (i = i.parentNode); ) e.unshift(i);
                      while (f[r] === e[r]) r++;
                      return r
                        ? pi(f[r], e[r])
                        : f[r] === s
                        ? -1
                        : e[r] === s
                        ? 1
                        : 0;
                    }),
                u);
          }),
          (u.matches = function (n, t) {
            return u(n, null, null, t);
          }),
          (u.matchesSelector = function (n, t) {
            if (
              ((n.ownerDocument || n) !== e && p(n),
              (t = t.replace(ir, "='$1']")),
              r.matchesSelector &&
                l &&
                (!g || !g.test(t)) &&
                (!o || !o.test(t)))
            )
              try {
                var i = ct.call(n, t);
                if (
                  i ||
                  r.disconnectedMatch ||
                  (n.document && n.document.nodeType !== 11)
                )
                  return i;
              } catch (f) {}
            return u(t, e, null, [n]).length > 0;
          }),
          (u.contains = function (n, t) {
            return (n.ownerDocument || n) !== e && p(n), et(n, t);
          }),
          (u.attr = function (n, i) {
            (n.ownerDocument || n) !== e && p(n);
            var f = t.attrHandle[i.toLowerCase()],
              u =
                f && ki.call(t.attrHandle, i.toLowerCase())
                  ? f(n, i, !l)
                  : undefined;
            return u !== undefined
              ? u
              : r.attributes || !l
              ? n.getAttribute(i)
              : (u = n.getAttributeNode(i)) && u.specified
              ? u.value
              : null;
          }),
          (u.error = function (n) {
            throw new Error("Syntax error, unrecognized expression: " + n);
          }),
          (u.uniqueSort = function (n) {
            var u,
              f = [],
              t = 0,
              i = 0;
            if (
              ((rt = !r.detectDuplicates),
              (y = !r.sortStable && n.slice(0)),
              n.sort(bt),
              rt)
            ) {
              while ((u = n[i++])) u === n[i] && (t = f.push(i));
              while (t--) n.splice(f[t], 1);
            }
            return (y = null), n;
          }),
          (st = u.getText = function (n) {
            var r,
              i = "",
              u = 0,
              t = n.nodeType;
            if (t) {
              if (t === 1 || t === 9 || t === 11) {
                if (typeof n.textContent == "string") return n.textContent;
                for (n = n.firstChild; n; n = n.nextSibling) i += st(n);
              } else if (t === 3 || t === 4) return n.nodeValue;
            } else while ((r = n[u++])) i += st(r);
            return i;
          }),
          (t = u.selectors = {
            cacheLength: 50,
            createPseudo: h,
            match: at,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (n) {
                return (
                  (n[1] = n[1].replace(k, d)),
                  (n[3] = (n[4] || n[5] || "").replace(k, d)),
                  n[2] === "~=" && (n[3] = " " + n[3] + " "),
                  n.slice(0, 4)
                );
              },
              CHILD: function (n) {
                return (
                  (n[1] = n[1].toLowerCase()),
                  n[1].slice(0, 3) === "nth"
                    ? (n[3] || u.error(n[0]),
                      (n[4] = +(n[4]
                        ? n[5] + (n[6] || 1)
                        : 2 * (n[3] === "even" || n[3] === "odd"))),
                      (n[5] = +(n[7] + n[8] || n[3] === "odd")))
                    : n[3] && u.error(n[0]),
                  n
                );
              },
              PSEUDO: function (n) {
                var i,
                  t = !n[5] && n[2];
                return at.CHILD.test(n[0])
                  ? null
                  : (n[3] && n[4] !== undefined
                      ? (n[2] = n[4])
                      : t &&
                        rr.test(t) &&
                        (i = vt(t, !0)) &&
                        (i = t.indexOf(")", t.length - i) - t.length) &&
                        ((n[0] = n[0].slice(0, i)), (n[2] = t.slice(0, i))),
                    n.slice(0, 3));
              },
            },
            filter: {
              TAG: function (n) {
                var t = n.replace(k, d).toLowerCase();
                return n === "*"
                  ? function () {
                      return !0;
                    }
                  : function (n) {
                      return n.nodeName && n.nodeName.toLowerCase() === t;
                    };
              },
              CLASS: function (n) {
                var t = si[n + " "];
                return (
                  t ||
                  ((t = new RegExp("(^|" + i + ")" + n + "(" + i + "|$)")) &&
                    si(n, function (n) {
                      return t.test(
                        (typeof n.className == "string" && n.className) ||
                          (typeof n.getAttribute !== ut &&
                            n.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (n, t, i) {
                return function (r) {
                  var f = u.attr(r, n);
                  return f == null
                    ? t === "!="
                    : t
                    ? ((f += ""),
                      t === "="
                        ? f === i
                        : t === "!="
                        ? f !== i
                        : t === "^="
                        ? i && f.indexOf(i) === 0
                        : t === "*="
                        ? i && f.indexOf(i) > -1
                        : t === "$="
                        ? i && f.slice(-i.length) === i
                        : t === "~="
                        ? (" " + f + " ").indexOf(i) > -1
                        : t === "|="
                        ? f === i || f.slice(0, i.length + 1) === i + "-"
                        : !1)
                    : !0;
                };
              },
              CHILD: function (n, t, i, r, u) {
                var s = n.slice(0, 3) !== "nth",
                  o = n.slice(-4) !== "last",
                  e = t === "of-type";
                return r === 1 && u === 0
                  ? function (n) {
                      return !!n.parentNode;
                    }
                  : function (t, i, h) {
                      var v,
                        k,
                        c,
                        l,
                        y,
                        w,
                        b = s !== o ? "nextSibling" : "previousSibling",
                        p = t.parentNode,
                        g = e && t.nodeName.toLowerCase(),
                        d = !h && !e;
                      if (p) {
                        if (s) {
                          while (b) {
                            for (c = t; (c = c[b]); )
                              if (
                                e
                                  ? c.nodeName.toLowerCase() === g
                                  : c.nodeType === 1
                              )
                                return !1;
                            w = b = n === "only" && !w && "nextSibling";
                          }
                          return !0;
                        }
                        if (((w = [o ? p.firstChild : p.lastChild]), o && d)) {
                          for (
                            k = p[f] || (p[f] = {}),
                              v = k[n] || [],
                              y = v[0] === a && v[1],
                              l = v[0] === a && v[2],
                              c = y && p.childNodes[y];
                            (c = (++y && c && c[b]) || (l = y = 0) || w.pop());

                          )
                            if (c.nodeType === 1 && ++l && c === t) {
                              k[n] = [a, y, l];
                              break;
                            }
                        } else if (
                          d &&
                          (v = (t[f] || (t[f] = {}))[n]) &&
                          v[0] === a
                        )
                          l = v[1];
                        else
                          while (
                            (c = (++y && c && c[b]) || (l = y = 0) || w.pop())
                          )
                            if (
                              (e
                                ? c.nodeName.toLowerCase() === g
                                : c.nodeType === 1) &&
                              ++l &&
                              (d && ((c[f] || (c[f] = {}))[n] = [a, l]),
                              c === t)
                            )
                              break;
                        return (l -= u), l === r || (l % r == 0 && l / r >= 0);
                      }
                    };
              },
              PSEUDO: function (n, i) {
                var e,
                  r =
                    t.pseudos[n] ||
                    t.setFilters[n.toLowerCase()] ||
                    u.error("unsupported pseudo: " + n);
                return r[f]
                  ? r(i)
                  : r.length > 1
                  ? ((e = [n, n, "", i]),
                    t.setFilters.hasOwnProperty(n.toLowerCase())
                      ? h(function (n, t) {
                          for (var u, f = r(n, i), e = f.length; e--; )
                            (u = nt.call(n, f[e])), (n[u] = !(t[u] = f[e]));
                        })
                      : function (n) {
                          return r(n, 0, e);
                        })
                  : r;
              },
            },
            pseudos: {
              not: h(function (n) {
                var i = [],
                  r = [],
                  t = wt(n.replace(lt, "$1"));
                return t[f]
                  ? h(function (n, i, r, u) {
                      for (var e, o = t(n, null, u, []), f = n.length; f--; )
                        (e = o[f]) && (n[f] = !(i[f] = e));
                    })
                  : function (n, u, f) {
                      return (i[0] = n), t(i, null, f, r), !r.pop();
                    };
              }),
              has: h(function (n) {
                return function (t) {
                  return u(n, t).length > 0;
                };
              }),
              contains: h(function (n) {
                return function (t) {
                  return (
                    (t.textContent || t.innerText || st(t)).indexOf(n) > -1
                  );
                };
              }),
              lang: h(function (n) {
                return (
                  ur.test(n || "") || u.error("unsupported lang: " + n),
                  (n = n.replace(k, d).toLowerCase()),
                  function (t) {
                    var i;
                    do
                      if (
                        (i = l
                          ? t.lang
                          : t.getAttribute("xml:lang") ||
                            t.getAttribute("lang"))
                      )
                        return (
                          (i = i.toLowerCase()),
                          i === n || i.indexOf(n + "-") === 0
                        );
                    while ((t = t.parentNode) && t.nodeType === 1);
                    return !1;
                  }
                );
              }),
              target: function (t) {
                var i = n.location && n.location.hash;
                return i && i.slice(1) === t.id;
              },
              root: function (n) {
                return n === v;
              },
              focus: function (n) {
                return (
                  n === e.activeElement &&
                  (!e.hasFocus || e.hasFocus()) &&
                  !!(n.type || n.href || ~n.tabIndex)
                );
              },
              enabled: function (n) {
                return n.disabled === !1;
              },
              disabled: function (n) {
                return n.disabled === !0;
              },
              checked: function (n) {
                var t = n.nodeName.toLowerCase();
                return (
                  (t === "input" && !!n.checked) ||
                  (t === "option" && !!n.selected)
                );
              },
              selected: function (n) {
                return (
                  n.parentNode && n.parentNode.selectedIndex, n.selected === !0
                );
              },
              empty: function (n) {
                for (n = n.firstChild; n; n = n.nextSibling)
                  if (n.nodeType < 6) return !1;
                return !0;
              },
              parent: function (n) {
                return !t.pseudos.empty(n);
              },
              header: function (n) {
                return er.test(n.nodeName);
              },
              input: function (n) {
                return fr.test(n.nodeName);
              },
              button: function (n) {
                var t = n.nodeName.toLowerCase();
                return (t === "input" && n.type === "button") || t === "button";
              },
              text: function (n) {
                var t;
                return (
                  n.nodeName.toLowerCase() === "input" &&
                  n.type === "text" &&
                  ((t = n.getAttribute("type")) == null ||
                    t.toLowerCase() === "text")
                );
              },
              first: tt(function () {
                return [0];
              }),
              last: tt(function (n, t) {
                return [t - 1];
              }),
              eq: tt(function (n, t, i) {
                return [i < 0 ? i + t : i];
              }),
              even: tt(function (n, t) {
                for (var i = 0; i < t; i += 2) n.push(i);
                return n;
              }),
              odd: tt(function (n, t) {
                for (var i = 1; i < t; i += 2) n.push(i);
                return n;
              }),
              lt: tt(function (n, t, i) {
                for (var r = i < 0 ? i + t : i; --r >= 0; ) n.push(r);
                return n;
              }),
              gt: tt(function (n, t, i) {
                for (var r = i < 0 ? i + t : i; ++r < t; ) n.push(r);
                return n;
              }),
            },
          }),
          (t.pseudos.nth = t.pseudos.eq);
        for (it in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0,
        })
          t.pseudos[it] = hr(it);
        for (it in { submit: !0, reset: !0 }) t.pseudos[it] = cr(it);
        return (
          (wi.prototype = t.filters = t.pseudos),
          (t.setFilters = new wi()),
          (wt = u.compile = function (n, t) {
            var r,
              u = [],
              e = [],
              i = ci[n + " "];
            if (!i) {
              for (t || (t = vt(n)), r = t.length; r--; )
                (i = ei(t[r])), i[f] ? u.push(i) : e.push(i);
              i = ci(n, lr(e, u));
            }
            return i;
          }),
          (r.sortStable = f.split("").sort(bt).join("") === f),
          (r.detectDuplicates = !!rt),
          p(),
          (r.sortDetached = c(function (n) {
            return n.compareDocumentPosition(e.createElement("div")) & 1;
          })),
          c(function (n) {
            return (
              (n.innerHTML = "<a href='#'></a>"),
              n.firstChild.getAttribute("href") === "#"
            );
          }) ||
            ti("type|href|height|width", function (n, t, i) {
              if (!i)
                return n.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2);
            }),
          (r.attributes &&
            c(function (n) {
              return (
                (n.innerHTML = "<input/>"),
                n.firstChild.setAttribute("value", ""),
                n.firstChild.getAttribute("value") === ""
              );
            })) ||
            ti("value", function (n, t, i) {
              if (!i && n.nodeName.toLowerCase() === "input")
                return n.defaultValue;
            }),
          c(function (n) {
            return n.getAttribute("disabled") == null;
          }) ||
            ti(kt, function (n, t, i) {
              var r;
              if (!i)
                return n[t] === !0
                  ? t.toLowerCase()
                  : (r = n.getAttributeNode(t)) && r.specified
                  ? r.value
                  : null;
            }),
          u
        );
      })(n)),
      (i.find = p),
      (i.expr = p.selectors),
      (i.expr[":"] = i.expr.pseudos),
      (i.unique = p.uniqueSort),
      (i.text = p.getText),
      (i.isXMLDoc = p.isXML),
      (i.contains = p.contains);
    var fr = i.expr.match.needsContext,
      er = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      ue = /^.[^:#\[\.,]*$/;
    (i.filter = function (n, t, r) {
      var u = t[0];
      return (
        r && (n = ":not(" + n + ")"),
        t.length === 1 && u.nodeType === 1
          ? i.find.matchesSelector(u, n)
            ? [u]
            : []
          : i.find.matches(
              n,
              i.grep(t, function (n) {
                return n.nodeType === 1;
              })
            )
      );
    }),
      i.fn.extend({
        find: function (n) {
          var t,
            r = [],
            u = this,
            f = u.length;
          if (typeof n != "string")
            return this.pushStack(
              i(n).filter(function () {
                for (t = 0; t < f; t++) if (i.contains(u[t], this)) return !0;
              })
            );
          for (t = 0; t < f; t++) i.find(n, u[t], r);
          return (
            (r = this.pushStack(f > 1 ? i.unique(r) : r)),
            (r.selector = this.selector ? this.selector + " " + n : n),
            r
          );
        },
        filter: function (n) {
          return this.pushStack(ui(this, n || [], !1));
        },
        not: function (n) {
          return this.pushStack(ui(this, n || [], !0));
        },
        is: function (n) {
          return !!ui(
            this,
            typeof n == "string" && fr.test(n) ? i(n) : n || [],
            !1
          ).length;
        },
      });
    var ft,
      u = n.document,
      fe = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
      ee = (i.fn.init = function (n, t) {
        var r, f;
        if (!n) return this;
        if (typeof n == "string") {
          if (
            ((r =
              n.charAt(0) === "<" &&
              n.charAt(n.length - 1) === ">" &&
              n.length >= 3
                ? [null, n, null]
                : fe.exec(n)),
            r && (r[1] || !t))
          ) {
            if (r[1]) {
              if (
                ((t = t instanceof i ? t[0] : t),
                i.merge(
                  this,
                  i.parseHTML(
                    r[1],
                    t && t.nodeType ? t.ownerDocument || t : u,
                    !0
                  )
                ),
                er.test(r[1]) && i.isPlainObject(t))
              )
                for (r in t)
                  i.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
              return this;
            }
            if (((f = u.getElementById(r[2])), f && f.parentNode)) {
              if (f.id !== r[2]) return ft.find(n);
              (this.length = 1), (this[0] = f);
            }
            return (this.context = u), (this.selector = n), this;
          }
          return !t || t.jquery
            ? (t || ft).find(n)
            : this.constructor(t).find(n);
        }
        return n.nodeType
          ? ((this.context = this[0] = n), (this.length = 1), this)
          : i.isFunction(n)
          ? typeof ft.ready != "undefined"
            ? ft.ready(n)
            : n(i)
          : (n.selector !== undefined &&
              ((this.selector = n.selector), (this.context = n.context)),
            i.makeArray(n, this));
      });
    (ee.prototype = i.fn),
      (ft = i(u)),
      (or = /^(?:parents|prev(?:Until|All))/),
      (sr = { children: !0, contents: !0, next: !0, prev: !0 }),
      i.extend({
        dir: function (n, t, r) {
          for (
            var f = [], u = n[t];
            u &&
            u.nodeType !== 9 &&
            (r === undefined || u.nodeType !== 1 || !i(u).is(r));

          )
            u.nodeType === 1 && f.push(u), (u = u[t]);
          return f;
        },
        sibling: function (n, t) {
          for (var i = []; n; n = n.nextSibling)
            n.nodeType === 1 && n !== t && i.push(n);
          return i;
        },
      }),
      i.fn.extend({
        has: function (n) {
          var t,
            r = i(n, this),
            u = r.length;
          return this.filter(function () {
            for (t = 0; t < u; t++) if (i.contains(this, r[t])) return !0;
          });
        },
        closest: function (n, t) {
          for (
            var r,
              f = 0,
              o = this.length,
              u = [],
              e =
                fr.test(n) || typeof n != "string"
                  ? i(n, t || this.context)
                  : 0;
            f < o;
            f++
          )
            for (r = this[f]; r && r !== t; r = r.parentNode)
              if (
                r.nodeType < 11 &&
                (e
                  ? e.index(r) > -1
                  : r.nodeType === 1 && i.find.matchesSelector(r, n))
              ) {
                u.push(r);
                break;
              }
          return this.pushStack(u.length > 1 ? i.unique(u) : u);
        },
        index: function (n) {
          return n
            ? typeof n == "string"
              ? i.inArray(this[0], i(n))
              : i.inArray(n.jquery ? n[0] : n, this)
            : this[0] && this[0].parentNode
            ? this.first().prevAll().length
            : -1;
        },
        add: function (n, t) {
          return this.pushStack(i.unique(i.merge(this.get(), i(n, t))));
        },
        addBack: function (n) {
          return this.add(
            n == null ? this.prevObject : this.prevObject.filter(n)
          );
        },
      }),
      i.each(
        {
          parent: function (n) {
            var t = n.parentNode;
            return t && t.nodeType !== 11 ? t : null;
          },
          parents: function (n) {
            return i.dir(n, "parentNode");
          },
          parentsUntil: function (n, t, r) {
            return i.dir(n, "parentNode", r);
          },
          next: function (n) {
            return hr(n, "nextSibling");
          },
          prev: function (n) {
            return hr(n, "previousSibling");
          },
          nextAll: function (n) {
            return i.dir(n, "nextSibling");
          },
          prevAll: function (n) {
            return i.dir(n, "previousSibling");
          },
          nextUntil: function (n, t, r) {
            return i.dir(n, "nextSibling", r);
          },
          prevUntil: function (n, t, r) {
            return i.dir(n, "previousSibling", r);
          },
          siblings: function (n) {
            return i.sibling((n.parentNode || {}).firstChild, n);
          },
          children: function (n) {
            return i.sibling(n.firstChild);
          },
          contents: function (n) {
            return i.nodeName(n, "iframe")
              ? n.contentDocument || n.contentWindow.document
              : i.merge([], n.childNodes);
          },
        },
        function (n, t) {
          i.fn[n] = function (r, u) {
            var f = i.map(this, t, r);
            return (
              n.slice(-5) !== "Until" && (u = r),
              u && typeof u == "string" && (f = i.filter(u, f)),
              this.length > 1 &&
                (sr[n] || (f = i.unique(f)), or.test(n) && (f = f.reverse())),
              this.pushStack(f)
            );
          };
        }
      ),
      (h = /\S+/g),
      (fi = {}),
      (i.Callbacks = function (n) {
        n = typeof n == "string" ? fi[n] || oe(n) : i.extend({}, n);
        var o,
          u,
          h,
          f,
          e,
          c,
          t = [],
          r = !n.once && [],
          l = function (i) {
            for (
              u = n.memory && i,
                h = !0,
                e = c || 0,
                c = 0,
                f = t.length,
                o = !0;
              t && e < f;
              e++
            )
              if (t[e].apply(i[0], i[1]) === !1 && n.stopOnFalse) {
                u = !1;
                break;
              }
            (o = !1),
              t && (r ? r.length && l(r.shift()) : u ? (t = []) : s.disable());
          },
          s = {
            add: function () {
              if (t) {
                var r = t.length;
                (function e(r) {
                  i.each(r, function (r, u) {
                    var f = i.type(u);
                    f === "function"
                      ? (n.unique && s.has(u)) || t.push(u)
                      : u && u.length && f !== "string" && e(u);
                  });
                })(arguments),
                  o ? (f = t.length) : u && ((c = r), l(u));
              }
              return this;
            },
            remove: function () {
              return (
                t &&
                  i.each(arguments, function (n, r) {
                    for (var u; (u = i.inArray(r, t, u)) > -1; )
                      t.splice(u, 1), o && (u <= f && f--, u <= e && e--);
                  }),
                this
              );
            },
            has: function (n) {
              return n ? i.inArray(n, t) > -1 : !!(t && t.length);
            },
            empty: function () {
              return (t = []), (f = 0), this;
            },
            disable: function () {
              return (t = r = u = undefined), this;
            },
            disabled: function () {
              return !t;
            },
            lock: function () {
              return (r = undefined), u || s.disable(), this;
            },
            locked: function () {
              return !r;
            },
            fireWith: function (n, i) {
              return (
                t &&
                  (!h || r) &&
                  ((i = i || []),
                  (i = [n, i.slice ? i.slice() : i]),
                  o ? r.push(i) : l(i)),
                this
              );
            },
            fire: function () {
              return s.fireWith(this, arguments), this;
            },
            fired: function () {
              return !!h;
            },
          };
        return s;
      }),
      i.extend({
        Deferred: function (n) {
          var u = [
              ["resolve", "done", i.Callbacks("once memory"), "resolved"],
              ["reject", "fail", i.Callbacks("once memory"), "rejected"],
              ["notify", "progress", i.Callbacks("memory")],
            ],
            f = "pending",
            r = {
              state: function () {
                return f;
              },
              always: function () {
                return t.done(arguments).fail(arguments), this;
              },
              then: function () {
                var n = arguments;
                return i
                  .Deferred(function (f) {
                    i.each(u, function (u, e) {
                      var o = i.isFunction(n[u]) && n[u];
                      t[e[1]](function () {
                        var n = o && o.apply(this, arguments);
                        n && i.isFunction(n.promise)
                          ? n
                              .promise()
                              .done(f.resolve)
                              .fail(f.reject)
                              .progress(f.notify)
                          : f[e[0] + "With"](
                              this === r ? f.promise() : this,
                              o ? [n] : arguments
                            );
                      });
                    }),
                      (n = null);
                  })
                  .promise();
              },
              promise: function (n) {
                return n != null ? i.extend(n, r) : r;
              },
            },
            t = {};
          return (
            (r.pipe = r.then),
            i.each(u, function (n, i) {
              var e = i[2],
                o = i[3];
              (r[i[1]] = e.add),
                o &&
                  e.add(
                    function () {
                      f = o;
                    },
                    u[n ^ 1][2].disable,
                    u[2][2].lock
                  ),
                (t[i[0]] = function () {
                  return (
                    t[i[0] + "With"](this === t ? r : this, arguments), this
                  );
                }),
                (t[i[0] + "With"] = e.fireWith);
            }),
            r.promise(t),
            n && n.call(t, t),
            t
          );
        },
        when: function (n) {
          var t = 0,
            u = l.call(arguments),
            r = u.length,
            e = r !== 1 || (n && i.isFunction(n.promise)) ? r : 0,
            f = e === 1 ? n : i.Deferred(),
            h = function (n, t, i) {
              return function (r) {
                (t[n] = this),
                  (i[n] = arguments.length > 1 ? l.call(arguments) : r),
                  i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i);
              };
            },
            o,
            c,
            s;
          if (r > 1)
            for (
              o = new Array(r), c = new Array(r), s = new Array(r);
              t < r;
              t++
            )
              u[t] && i.isFunction(u[t].promise)
                ? u[t]
                    .promise()
                    .done(h(t, s, u))
                    .fail(f.reject)
                    .progress(h(t, c, o))
                : --e;
          return e || f.resolveWith(s, u), f.promise();
        },
      }),
      (i.fn.ready = function (n) {
        return i.ready.promise().done(n), this;
      }),
      i.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function (n) {
          n ? i.readyWait++ : i.ready(!0);
        },
        ready: function (n) {
          if (n === !0 ? !--i.readyWait : !i.isReady) {
            if (!u.body) return setTimeout(i.ready);
            ((i.isReady = !0), n !== !0 && --i.readyWait > 0) ||
              (lt.resolveWith(u, [i]),
              i.fn.trigger && i(u).trigger("ready").off("ready"));
          }
        },
      }),
      (i.ready.promise = function (t) {
        if (!lt)
          if (((lt = i.Deferred()), u.readyState === "complete"))
            setTimeout(i.ready);
          else if (u.addEventListener)
            u.addEventListener("DOMContentLoaded", a, !1),
              n.addEventListener("load", a, !1);
          else {
            u.attachEvent("onreadystatechange", a), n.attachEvent("onload", a);
            var r = !1;
            try {
              r = n.frameElement == null && u.documentElement;
            } catch (e) {}
            r &&
              r.doScroll &&
              (function f() {
                if (!i.isReady) {
                  try {
                    r.doScroll("left");
                  } catch (n) {
                    return setTimeout(f, 50);
                  }
                  cr(), i.ready();
                }
              })();
          }
        return lt.promise(t);
      }),
      (o = typeof undefined);
    for (lr in i(r)) break;
    (r.ownLast = lr !== "0"),
      (r.inlineBlockNeedsLayout = !1),
      i(function () {
        var t,
          n,
          i = u.getElementsByTagName("body")[0];
        i &&
          ((t = u.createElement("div")),
          (t.style.cssText =
            "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px"),
          (n = u.createElement("div")),
          i.appendChild(t).appendChild(n),
          typeof n.style.zoom !== o &&
            ((n.style.cssText =
              "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1"),
            (r.inlineBlockNeedsLayout = n.offsetWidth === 3) &&
              (i.style.zoom = 1)),
          i.removeChild(t),
          (t = n = null));
      }),
      (function () {
        var n = u.createElement("div");
        if (r.deleteExpando == null) {
          r.deleteExpando = !0;
          try {
            delete n.test;
          } catch (t) {
            r.deleteExpando = !1;
          }
        }
        n = null;
      })(),
      (i.acceptData = function (n) {
        var t = i.noData[(n.nodeName + " ").toLowerCase()],
          r = +n.nodeType || 1;
        return r !== 1 && r !== 9
          ? !1
          : !t || (t !== !0 && n.getAttribute("classid") === t);
      }),
      (ar = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/),
      (vr = /([A-Z])/g),
      i.extend({
        cache: {},
        noData: {
          "applet ": !0,
          "embed ": !0,
          "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
        },
        hasData: function (n) {
          return (
            (n = n.nodeType ? i.cache[n[i.expando]] : n[i.expando]),
            !!n && !ei(n)
          );
        },
        data: function (n, t, i) {
          return pr(n, t, i);
        },
        removeData: function (n, t) {
          return wr(n, t);
        },
        _data: function (n, t, i) {
          return pr(n, t, i, !0);
        },
        _removeData: function (n, t) {
          return wr(n, t, !0);
        },
      }),
      i.fn.extend({
        data: function (n, t) {
          var f,
            u,
            e,
            r = this[0],
            o = r && r.attributes;
          if (n === undefined) {
            if (
              this.length &&
              ((e = i.data(r)), r.nodeType === 1 && !i._data(r, "parsedAttrs"))
            ) {
              for (f = o.length; f--; )
                (u = o[f].name),
                  u.indexOf("data-") === 0 &&
                    ((u = i.camelCase(u.slice(5))), yr(r, u, e[u]));
              i._data(r, "parsedAttrs", !0);
            }
            return e;
          }
          return typeof n == "object"
            ? this.each(function () {
                i.data(this, n);
              })
            : arguments.length > 1
            ? this.each(function () {
                i.data(this, n, t);
              })
            : r
            ? yr(r, n, i.data(r, n))
            : undefined;
        },
        removeData: function (n) {
          return this.each(function () {
            i.removeData(this, n);
          });
        },
      }),
      i.extend({
        queue: function (n, t, r) {
          var u;
          if (n)
            return (
              (t = (t || "fx") + "queue"),
              (u = i._data(n, t)),
              r &&
                (!u || i.isArray(r)
                  ? (u = i._data(n, t, i.makeArray(r)))
                  : u.push(r)),
              u || []
            );
        },
        dequeue: function (n, t) {
          t = t || "fx";
          var r = i.queue(n, t),
            e = r.length,
            u = r.shift(),
            f = i._queueHooks(n, t),
            o = function () {
              i.dequeue(n, t);
            };
          u === "inprogress" && ((u = r.shift()), e--),
            u &&
              (t === "fx" && r.unshift("inprogress"),
              delete f.stop,
              u.call(n, o, f)),
            !e && f && f.empty.fire();
        },
        _queueHooks: function (n, t) {
          var r = t + "queueHooks";
          return (
            i._data(n, r) ||
            i._data(n, r, {
              empty: i.Callbacks("once memory").add(function () {
                i._removeData(n, t + "queue"), i._removeData(n, r);
              }),
            })
          );
        },
      }),
      i.fn.extend({
        queue: function (n, t) {
          var r = 2;
          return (typeof n != "string" && ((t = n), (n = "fx"), r--),
          arguments.length < r)
            ? i.queue(this[0], n)
            : t === undefined
            ? this
            : this.each(function () {
                var r = i.queue(this, n, t);
                i._queueHooks(this, n),
                  n === "fx" && r[0] !== "inprogress" && i.dequeue(this, n);
              });
        },
        dequeue: function (n) {
          return this.each(function () {
            i.dequeue(this, n);
          });
        },
        clearQueue: function (n) {
          return this.queue(n || "fx", []);
        },
        promise: function (n, t) {
          var r,
            f = 1,
            e = i.Deferred(),
            u = this,
            o = this.length,
            s = function () {
              --f || e.resolveWith(u, [u]);
            };
          for (
            typeof n != "string" && ((t = n), (n = undefined)), n = n || "fx";
            o--;

          )
            (r = i._data(u[o], n + "queueHooks")),
              r && r.empty && (f++, r.empty.add(s));
          return s(), e.promise(t);
        },
      });
    var at = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      w = ["Top", "Right", "Bottom", "Left"],
      et = function (n, t) {
        return (
          (n = t || n),
          i.css(n, "display") === "none" || !i.contains(n.ownerDocument, n)
        );
      },
      b = (i.access = function (n, t, r, u, f, e, o) {
        var s = 0,
          c = n.length,
          h = r == null;
        if (i.type(r) === "object") {
          f = !0;
          for (s in r) i.access(n, t, s, r[s], !0, e, o);
        } else if (
          u !== undefined &&
          ((f = !0),
          i.isFunction(u) || (o = !0),
          h &&
            (o
              ? (t.call(n, u), (t = null))
              : ((h = t),
                (t = function (n, t, r) {
                  return h.call(i(n), r);
                }))),
          t)
        )
          for (; s < c; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
        return f ? n : h ? t.call(n) : c ? t(n[0], r) : e;
      }),
      oi = /^(?:checkbox|radio)$/i;
    (function () {
      var i = u.createDocumentFragment(),
        n = u.createElement("div"),
        t = u.createElement("input");
      if (
        (n.setAttribute("className", "t"),
        (n.innerHTML = "  <link/><table></table><a href='/a'>a</a>"),
        (r.leadingWhitespace = n.firstChild.nodeType === 3),
        (r.tbody = !n.getElementsByTagName("tbody").length),
        (r.htmlSerialize = !!n.getElementsByTagName("link").length),
        (r.html5Clone =
          u.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>"),
        (t.type = "checkbox"),
        (t.checked = !0),
        i.appendChild(t),
        (r.appendChecked = t.checked),
        (n.innerHTML = "<textarea>x</textarea>"),
        (r.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue),
        i.appendChild(n),
        (n.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
        (r.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (r.noCloneEvent = !0),
        n.attachEvent &&
          (n.attachEvent("onclick", function () {
            r.noCloneEvent = !1;
          }),
          n.cloneNode(!0).click()),
        r.deleteExpando == null)
      ) {
        r.deleteExpando = !0;
        try {
          delete n.test;
        } catch (f) {
          r.deleteExpando = !1;
        }
      }
      i = n = t = null;
    })(),
      (function () {
        var t,
          i,
          f = u.createElement("div");
        for (t in { submit: !0, change: !0, focusin: !0 })
          (i = "on" + t),
            (r[t + "Bubbles"] = i in n) ||
              (f.setAttribute(i, "t"),
              (r[t + "Bubbles"] = f.attributes[i].expando === !1));
        f = null;
      })();
    var si = /^(?:input|select|textarea)$/i,
      se = /^key/,
      he = /^(?:mouse|contextmenu)|click/,
      br = /^(?:focusinfocus|focusoutblur)$/,
      kr = /^([^.]*)(?:\.(.+)|)$/;
    (i.event = {
      global: {},
      add: function (n, t, r, u, f) {
        var w,
          y,
          b,
          p,
          s,
          c,
          l,
          a,
          e,
          k,
          d,
          v = i._data(n);
        if (v) {
          for (
            r.handler && ((p = r), (r = p.handler), (f = p.selector)),
              r.guid || (r.guid = i.guid++),
              (y = v.events) || (y = v.events = {}),
              (c = v.handle) ||
                ((c = v.handle = function (n) {
                  return typeof i !== o && (!n || i.event.triggered !== n.type)
                    ? i.event.dispatch.apply(c.elem, arguments)
                    : undefined;
                }),
                (c.elem = n)),
              t = (t || "").match(h) || [""],
              b = t.length;
            b--;

          )
            ((w = kr.exec(t[b]) || []),
            (e = d = w[1]),
            (k = (w[2] || "").split(".").sort()),
            e) &&
              ((s = i.event.special[e] || {}),
              (e = (f ? s.delegateType : s.bindType) || e),
              (s = i.event.special[e] || {}),
              (l = i.extend(
                {
                  type: e,
                  origType: d,
                  data: u,
                  handler: r,
                  guid: r.guid,
                  selector: f,
                  needsContext: f && i.expr.match.needsContext.test(f),
                  namespace: k.join("."),
                },
                p
              )),
              (a = y[e]) ||
                ((a = y[e] = []),
                (a.delegateCount = 0),
                (s.setup && s.setup.call(n, u, k, c) !== !1) ||
                  (n.addEventListener
                    ? n.addEventListener(e, c, !1)
                    : n.attachEvent && n.attachEvent("on" + e, c))),
              s.add &&
                (s.add.call(n, l), l.handler.guid || (l.handler.guid = r.guid)),
              f ? a.splice(a.delegateCount++, 0, l) : a.push(l),
              (i.event.global[e] = !0));
          n = null;
        }
      },
      remove: function (n, t, r, u, f) {
        var y,
          o,
          s,
          b,
          p,
          a,
          c,
          l,
          e,
          w,
          k,
          v = i.hasData(n) && i._data(n);
        if (v && (a = v.events)) {
          for (t = (t || "").match(h) || [""], p = t.length; p--; ) {
            if (
              ((s = kr.exec(t[p]) || []),
              (e = k = s[1]),
              (w = (s[2] || "").split(".").sort()),
              !e)
            ) {
              for (e in a) i.event.remove(n, e + t[p], r, u, !0);
              continue;
            }
            for (
              c = i.event.special[e] || {},
                e = (u ? c.delegateType : c.bindType) || e,
                l = a[e] || [],
                s =
                  s[2] &&
                  new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                b = y = l.length;
              y--;

            )
              (o = l[y]),
                (f || k === o.origType) &&
                  (!r || r.guid === o.guid) &&
                  (!s || s.test(o.namespace)) &&
                  (!u || u === o.selector || (u === "**" && o.selector)) &&
                  (l.splice(y, 1),
                  o.selector && l.delegateCount--,
                  c.remove && c.remove.call(n, o));
            b &&
              !l.length &&
              ((c.teardown && c.teardown.call(n, w, v.handle) !== !1) ||
                i.removeEvent(n, e, v.handle),
              delete a[e]);
          }
          i.isEmptyObject(a) && (delete v.handle, i._removeData(n, "events"));
        }
      },
      trigger: function (t, r, f, e) {
        var l,
          a,
          o,
          p,
          c,
          h,
          w,
          y = [f || u],
          s = tt.call(t, "type") ? t.type : t,
          v = tt.call(t, "namespace") ? t.namespace.split(".") : [];
        if (
          ((o = h = f = f || u), f.nodeType !== 3 && f.nodeType !== 8) &&
          !br.test(s + i.event.triggered) &&
          (s.indexOf(".") >= 0 &&
            ((v = s.split(".")), (s = v.shift()), v.sort()),
          (a = s.indexOf(":") < 0 && "on" + s),
          (t = t[i.expando] ? t : new i.Event(s, typeof t == "object" && t)),
          (t.isTrigger = e ? 2 : 3),
          (t.namespace = v.join(".")),
          (t.namespace_re = t.namespace
            ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (t.result = undefined),
          t.target || (t.target = f),
          (r = r == null ? [t] : i.makeArray(r, [t])),
          (c = i.event.special[s] || {}),
          e || !c.trigger || c.trigger.apply(f, r) !== !1)
        ) {
          if (!e && !c.noBubble && !i.isWindow(f)) {
            for (
              p = c.delegateType || s, br.test(p + s) || (o = o.parentNode);
              o;
              o = o.parentNode
            )
              y.push(o), (h = o);
            h === (f.ownerDocument || u) &&
              y.push(h.defaultView || h.parentWindow || n);
          }
          for (w = 0; (o = y[w++]) && !t.isPropagationStopped(); )
            (t.type = w > 1 ? p : c.bindType || s),
              (l =
                (i._data(o, "events") || {})[t.type] && i._data(o, "handle")),
              l && l.apply(o, r),
              (l = a && o[a]),
              l &&
                l.apply &&
                i.acceptData(o) &&
                ((t.result = l.apply(o, r)),
                t.result === !1 && t.preventDefault());
          if (
            ((t.type = s),
            !e &&
              !t.isDefaultPrevented() &&
              (!c._default || c._default.apply(y.pop(), r) === !1) &&
              i.acceptData(f) &&
              a &&
              f[s] &&
              !i.isWindow(f))
          ) {
            (h = f[a]), h && (f[a] = null), (i.event.triggered = s);
            try {
              f[s]();
            } catch (b) {}
            (i.event.triggered = undefined), h && (f[a] = h);
          }
          return t.result;
        }
      },
      dispatch: function (n) {
        n = i.event.fix(n);
        var e,
          f,
          t,
          r,
          o,
          s = [],
          h = l.call(arguments),
          c = (i._data(this, "events") || {})[n.type] || [],
          u = i.event.special[n.type] || {};
        if (
          ((h[0] = n),
          (n.delegateTarget = this),
          !u.preDispatch || u.preDispatch.call(this, n) !== !1)
        ) {
          for (
            s = i.event.handlers.call(this, n, c), e = 0;
            (r = s[e++]) && !n.isPropagationStopped();

          )
            for (
              n.currentTarget = r.elem, o = 0;
              (t = r.handlers[o++]) && !n.isImmediatePropagationStopped();

            )
              (!n.namespace_re || n.namespace_re.test(t.namespace)) &&
                ((n.handleObj = t),
                (n.data = t.data),
                (f = (
                  (i.event.special[t.origType] || {}).handle || t.handler
                ).apply(r.elem, h)),
                f !== undefined &&
                  (n.result = f) === !1 &&
                  (n.preventDefault(), n.stopPropagation()));
          return u.postDispatch && u.postDispatch.call(this, n), n.result;
        }
      },
      handlers: function (n, t) {
        var f,
          e,
          u,
          o,
          h = [],
          s = t.delegateCount,
          r = n.target;
        if (s && r.nodeType && (!n.button || n.type !== "click"))
          for (; r != this; r = r.parentNode || this)
            if (r.nodeType === 1 && (r.disabled !== !0 || n.type !== "click")) {
              for (u = [], o = 0; o < s; o++)
                (e = t[o]),
                  (f = e.selector + " "),
                  u[f] === undefined &&
                    (u[f] = e.needsContext
                      ? i(f, this).index(r) >= 0
                      : i.find(f, this, null, [r]).length),
                  u[f] && u.push(e);
              u.length && h.push({ elem: r, handlers: u });
            }
        return s < t.length && h.push({ elem: this, handlers: t.slice(s) }), h;
      },
      fix: function (n) {
        if (n[i.expando]) return n;
        var e,
          o,
          s,
          r = n.type,
          f = n,
          t = this.fixHooks[r];
        for (
          t ||
            (this.fixHooks[r] = t = he.test(r)
              ? this.mouseHooks
              : se.test(r)
              ? this.keyHooks
              : {}),
            s = t.props ? this.props.concat(t.props) : this.props,
            n = new i.Event(f),
            e = s.length;
          e--;

        )
          (o = s[e]), (n[o] = f[o]);
        return (
          n.target || (n.target = f.srcElement || u),
          n.target.nodeType === 3 && (n.target = n.target.parentNode),
          (n.metaKey = !!n.metaKey),
          t.filter ? t.filter(n, f) : n
        );
      },
      props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
      fixHooks: {},
      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function (n, t) {
          return (
            n.which == null &&
              (n.which = t.charCode != null ? t.charCode : t.keyCode),
            n
          );
        },
      },
      mouseHooks: {
        props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
        filter: function (n, t) {
          var i,
            e,
            r,
            f = t.button,
            o = t.fromElement;
          return (
            n.pageX == null &&
              t.clientX != null &&
              ((e = n.target.ownerDocument || u),
              (r = e.documentElement),
              (i = e.body),
              (n.pageX =
                t.clientX +
                ((r && r.scrollLeft) || (i && i.scrollLeft) || 0) -
                ((r && r.clientLeft) || (i && i.clientLeft) || 0)),
              (n.pageY =
                t.clientY +
                ((r && r.scrollTop) || (i && i.scrollTop) || 0) -
                ((r && r.clientTop) || (i && i.clientTop) || 0))),
            !n.relatedTarget &&
              o &&
              (n.relatedTarget = o === n.target ? t.toElement : o),
            n.which ||
              f === undefined ||
              (n.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0),
            n
          );
        },
      },
      special: {
        load: { noBubble: !0 },
        focus: {
          trigger: function () {
            if (this !== dr() && this.focus)
              try {
                return this.focus(), !1;
              } catch (n) {}
          },
          delegateType: "focusin",
        },
        blur: {
          trigger: function () {
            if (this === dr() && this.blur) return this.blur(), !1;
          },
          delegateType: "focusout",
        },
        click: {
          trigger: function () {
            if (
              i.nodeName(this, "input") &&
              this.type === "checkbox" &&
              this.click
            )
              return this.click(), !1;
          },
          _default: function (n) {
            return i.nodeName(n.target, "a");
          },
        },
        beforeunload: {
          postDispatch: function (n) {
            n.result !== undefined && (n.originalEvent.returnValue = n.result);
          },
        },
      },
      simulate: function (n, t, r, u) {
        var f = i.extend(new i.Event(), r, {
          type: n,
          isSimulated: !0,
          originalEvent: {},
        });
        u ? i.event.trigger(f, null, t) : i.event.dispatch.call(t, f),
          f.isDefaultPrevented() && r.preventDefault();
      },
    }),
      (i.removeEvent = u.removeEventListener
        ? function (n, t, i) {
            n.removeEventListener && n.removeEventListener(t, i, !1);
          }
        : function (n, t, i) {
            var r = "on" + t;
            n.detachEvent &&
              (typeof n[r] === o && (n[r] = null), n.detachEvent(r, i));
          }),
      (i.Event = function (n, t) {
        if (!(this instanceof i.Event)) return new i.Event(n, t);
        n && n.type
          ? ((this.originalEvent = n),
            (this.type = n.type),
            (this.isDefaultPrevented =
              n.defaultPrevented ||
              (n.defaultPrevented === undefined &&
                (n.returnValue === !1 ||
                  (n.getPreventDefault && n.getPreventDefault())))
                ? vt
                : it))
          : (this.type = n),
          t && i.extend(this, t),
          (this.timeStamp = (n && n.timeStamp) || i.now()),
          (this[i.expando] = !0);
      }),
      (i.Event.prototype = {
        isDefaultPrevented: it,
        isPropagationStopped: it,
        isImmediatePropagationStopped: it,
        preventDefault: function () {
          var n = this.originalEvent;
          ((this.isDefaultPrevented = vt), n) &&
            (n.preventDefault ? n.preventDefault() : (n.returnValue = !1));
        },
        stopPropagation: function () {
          var n = this.originalEvent;
          ((this.isPropagationStopped = vt), n) &&
            (n.stopPropagation && n.stopPropagation(), (n.cancelBubble = !0));
        },
        stopImmediatePropagation: function () {
          (this.isImmediatePropagationStopped = vt), this.stopPropagation();
        },
      }),
      i.each(
        { mouseenter: "mouseover", mouseleave: "mouseout" },
        function (n, t) {
          i.event.special[n] = {
            delegateType: t,
            bindType: t,
            handle: function (n) {
              var u,
                f = this,
                r = n.relatedTarget,
                e = n.handleObj;
              return (
                (r && (r === f || i.contains(f, r))) ||
                  ((n.type = e.origType),
                  (u = e.handler.apply(this, arguments)),
                  (n.type = t)),
                u
              );
            },
          };
        }
      ),
      r.submitBubbles ||
        (i.event.special.submit = {
          setup: function () {
            if (i.nodeName(this, "form")) return !1;
            i.event.add(this, "click._submit keypress._submit", function (n) {
              var r = n.target,
                t =
                  i.nodeName(r, "input") || i.nodeName(r, "button")
                    ? r.form
                    : undefined;
              t &&
                !i._data(t, "submitBubbles") &&
                (i.event.add(t, "submit._submit", function (n) {
                  n._submit_bubble = !0;
                }),
                i._data(t, "submitBubbles", !0));
            });
          },
          postDispatch: function (n) {
            n._submit_bubble &&
              (delete n._submit_bubble,
              this.parentNode &&
                !n.isTrigger &&
                i.event.simulate("submit", this.parentNode, n, !0));
          },
          teardown: function () {
            if (i.nodeName(this, "form")) return !1;
            i.event.remove(this, "._submit");
          },
        }),
      r.changeBubbles ||
        (i.event.special.change = {
          setup: function () {
            if (si.test(this.nodeName))
              return (
                (this.type === "checkbox" || this.type === "radio") &&
                  (i.event.add(this, "propertychange._change", function (n) {
                    n.originalEvent.propertyName === "checked" &&
                      (this._just_changed = !0);
                  }),
                  i.event.add(this, "click._change", function (n) {
                    this._just_changed &&
                      !n.isTrigger &&
                      (this._just_changed = !1),
                      i.event.simulate("change", this, n, !0);
                  })),
                !1
              );
            i.event.add(this, "beforeactivate._change", function (n) {
              var t = n.target;
              si.test(t.nodeName) &&
                !i._data(t, "changeBubbles") &&
                (i.event.add(t, "change._change", function (n) {
                  !this.parentNode ||
                    n.isSimulated ||
                    n.isTrigger ||
                    i.event.simulate("change", this.parentNode, n, !0);
                }),
                i._data(t, "changeBubbles", !0));
            });
          },
          handle: function (n) {
            var t = n.target;
            if (
              this !== t ||
              n.isSimulated ||
              n.isTrigger ||
              (t.type !== "radio" && t.type !== "checkbox")
            )
              return n.handleObj.handler.apply(this, arguments);
          },
          teardown: function () {
            return i.event.remove(this, "._change"), !si.test(this.nodeName);
          },
        }),
      r.focusinBubbles ||
        i.each({ focus: "focusin", blur: "focusout" }, function (n, t) {
          var r = function (n) {
            i.event.simulate(t, n.target, i.event.fix(n), !0);
          };
          i.event.special[t] = {
            setup: function () {
              var u = this.ownerDocument || this,
                f = i._data(u, t);
              f || u.addEventListener(n, r, !0), i._data(u, t, (f || 0) + 1);
            },
            teardown: function () {
              var u = this.ownerDocument || this,
                f = i._data(u, t) - 1;
              f
                ? i._data(u, t, f)
                : (u.removeEventListener(n, r, !0), i._removeData(u, t));
            },
          };
        }),
      i.fn.extend({
        on: function (n, t, r, u, f) {
          var o, e;
          if (typeof n == "object") {
            typeof t != "string" && ((r = r || t), (t = undefined));
            for (o in n) this.on(o, t, r, n[o], f);
            return this;
          }
          if (
            (r == null && u == null
              ? ((u = t), (r = t = undefined))
              : u == null &&
                (typeof t == "string"
                  ? ((u = r), (r = undefined))
                  : ((u = r), (r = t), (t = undefined))),
            u === !1)
          )
            u = it;
          else if (!u) return this;
          return (
            f === 1 &&
              ((e = u),
              (u = function (n) {
                return i().off(n), e.apply(this, arguments);
              }),
              (u.guid = e.guid || (e.guid = i.guid++))),
            this.each(function () {
              i.event.add(this, n, u, r, t);
            })
          );
        },
        one: function (n, t, i, r) {
          return this.on(n, t, i, r, 1);
        },
        off: function (n, t, r) {
          var u, f;
          if (n && n.preventDefault && n.handleObj)
            return (
              (u = n.handleObj),
              i(n.delegateTarget).off(
                u.namespace ? u.origType + "." + u.namespace : u.origType,
                u.selector,
                u.handler
              ),
              this
            );
          if (typeof n == "object") {
            for (f in n) this.off(f, t, n[f]);
            return this;
          }
          return (
            (t === !1 || typeof t == "function") && ((r = t), (t = undefined)),
            r === !1 && (r = it),
            this.each(function () {
              i.event.remove(this, n, r, t);
            })
          );
        },
        trigger: function (n, t) {
          return this.each(function () {
            i.event.trigger(n, t, this);
          });
        },
        triggerHandler: function (n, t) {
          var r = this[0];
          if (r) return i.event.trigger(n, t, r, !0);
        },
      });
    var nu =
        "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      ce = / jQuery\d+="(?:null|\d+)"/g,
      tu = new RegExp("<(?:" + nu + ")[\\s/>]", "i"),
      hi = /^\s+/,
      iu = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      ru = /<([\w:]+)/,
      uu = /<tbody/i,
      le = /<|&#?\w+;/,
      ae = /<(?:script|style|link)/i,
      ve = /checked\s*(?:[^=]|=\s*.checked.)/i,
      fu = /^$|\/(?:java|ecma)script/i,
      ye = /^true\/(.*)/,
      pe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      s = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: r.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
      },
      we = gr(u),
      ci = we.appendChild(u.createElement("div"));
    (s.optgroup = s.option),
      (s.tbody = s.tfoot = s.colgroup = s.caption = s.thead),
      (s.th = s.td),
      i.extend({
        clone: function (n, t, u) {
          var e,
            c,
            s,
            o,
            h,
            l = i.contains(n.ownerDocument, n);
          if (
            (r.html5Clone || i.isXMLDoc(n) || !tu.test("<" + n.nodeName + ">")
              ? (s = n.cloneNode(!0))
              : ((ci.innerHTML = n.outerHTML),
                ci.removeChild((s = ci.firstChild))),
            (!r.noCloneEvent || !r.noCloneChecked) &&
              (n.nodeType === 1 || n.nodeType === 11) &&
              !i.isXMLDoc(n))
          )
            for (e = f(s), h = f(n), o = 0; (c = h[o]) != null; ++o)
              e[o] && ke(c, e[o]);
          if (t)
            if (u)
              for (h = h || f(n), e = e || f(s), o = 0; (c = h[o]) != null; o++)
                hu(c, e[o]);
            else hu(n, s);
          return (
            (e = f(s, "script")),
            e.length > 0 && li(e, !l && f(n, "script")),
            (e = h = c = null),
            s
          );
        },
        buildFragment: function (n, t, u, e) {
          for (
            var c, o, b, h, p, w, a, k = n.length, v = gr(t), l = [], y = 0;
            y < k;
            y++
          )
            if (((o = n[y]), o || o === 0))
              if (i.type(o) === "object") i.merge(l, o.nodeType ? [o] : o);
              else if (le.test(o)) {
                for (
                  h = h || v.appendChild(t.createElement("div")),
                    p = (ru.exec(o) || ["", ""])[1].toLowerCase(),
                    a = s[p] || s._default,
                    h.innerHTML = a[1] + o.replace(iu, "<$1></$2>") + a[2],
                    c = a[0];
                  c--;

                )
                  h = h.lastChild;
                if (
                  (!r.leadingWhitespace &&
                    hi.test(o) &&
                    l.push(t.createTextNode(hi.exec(o)[0])),
                  !r.tbody)
                )
                  for (
                    o =
                      p === "table" && !uu.test(o)
                        ? h.firstChild
                        : a[1] === "<table>" && !uu.test(o)
                        ? h
                        : 0,
                      c = o && o.childNodes.length;
                    c--;

                  )
                    i.nodeName((w = o.childNodes[c]), "tbody") &&
                      !w.childNodes.length &&
                      o.removeChild(w);
                for (
                  i.merge(l, h.childNodes), h.textContent = "";
                  h.firstChild;

                )
                  h.removeChild(h.firstChild);
                h = v.lastChild;
              } else l.push(t.createTextNode(o));
          for (
            h && v.removeChild(h),
              r.appendChecked || i.grep(f(l, "input"), be),
              y = 0;
            (o = l[y++]);

          )
            if (
              (!e || i.inArray(o, e) === -1) &&
              ((b = i.contains(o.ownerDocument, o)),
              (h = f(v.appendChild(o), "script")),
              b && li(h),
              u)
            )
              for (c = 0; (o = h[c++]); ) fu.test(o.type || "") && u.push(o);
          return (h = null), v;
        },
        cleanData: function (n, t) {
          for (
            var u,
              s,
              f,
              e,
              a = 0,
              h = i.expando,
              l = i.cache,
              v = r.deleteExpando,
              y = i.event.special;
            (u = n[a]) != null;
            a++
          )
            if ((t || i.acceptData(u)) && ((f = u[h]), (e = f && l[f]), e)) {
              if (e.events)
                for (s in e.events)
                  y[s] ? i.event.remove(u, s) : i.removeEvent(u, s, e.handle);
              l[f] &&
                (delete l[f],
                v
                  ? delete u[h]
                  : typeof u.removeAttribute !== o
                  ? u.removeAttribute(h)
                  : (u[h] = null),
                c.push(f));
            }
        },
      }),
      i.fn.extend({
        text: function (n) {
          return b(
            this,
            function (n) {
              return n === undefined
                ? i.text(this)
                : this.empty().append(
                    ((this[0] && this[0].ownerDocument) || u).createTextNode(n)
                  );
            },
            null,
            n,
            arguments.length
          );
        },
        append: function () {
          return this.domManip(arguments, function (n) {
            if (
              this.nodeType === 1 ||
              this.nodeType === 11 ||
              this.nodeType === 9
            ) {
              var t = eu(this, n);
              t.appendChild(n);
            }
          });
        },
        prepend: function () {
          return this.domManip(arguments, function (n) {
            if (
              this.nodeType === 1 ||
              this.nodeType === 11 ||
              this.nodeType === 9
            ) {
              var t = eu(this, n);
              t.insertBefore(n, t.firstChild);
            }
          });
        },
        before: function () {
          return this.domManip(arguments, function (n) {
            this.parentNode && this.parentNode.insertBefore(n, this);
          });
        },
        after: function () {
          return this.domManip(arguments, function (n) {
            this.parentNode &&
              this.parentNode.insertBefore(n, this.nextSibling);
          });
        },
        remove: function (n, t) {
          for (
            var r, e = n ? i.filter(n, this) : this, u = 0;
            (r = e[u]) != null;
            u++
          )
            t || r.nodeType !== 1 || i.cleanData(f(r)),
              r.parentNode &&
                (t && i.contains(r.ownerDocument, r) && li(f(r, "script")),
                r.parentNode.removeChild(r));
          return this;
        },
        empty: function () {
          for (var n, t = 0; (n = this[t]) != null; t++) {
            for (n.nodeType === 1 && i.cleanData(f(n, !1)); n.firstChild; )
              n.removeChild(n.firstChild);
            n.options && i.nodeName(n, "select") && (n.options.length = 0);
          }
          return this;
        },
        clone: function (n, t) {
          return (
            (n = n == null ? !1 : n),
            (t = t == null ? n : t),
            this.map(function () {
              return i.clone(this, n, t);
            })
          );
        },
        html: function (n) {
          return b(
            this,
            function (n) {
              var t = this[0] || {},
                u = 0,
                e = this.length;
              if (n === undefined)
                return t.nodeType === 1
                  ? t.innerHTML.replace(ce, "")
                  : undefined;
              if (
                typeof n == "string" &&
                !ae.test(n) &&
                (r.htmlSerialize || !tu.test(n)) &&
                (r.leadingWhitespace || !hi.test(n)) &&
                !s[(ru.exec(n) || ["", ""])[1].toLowerCase()]
              ) {
                n = n.replace(iu, "<$1></$2>");
                try {
                  for (; u < e; u++)
                    (t = this[u] || {}),
                      t.nodeType === 1 &&
                        (i.cleanData(f(t, !1)), (t.innerHTML = n));
                  t = 0;
                } catch (o) {}
              }
              t && this.empty().append(n);
            },
            null,
            n,
            arguments.length
          );
        },
        replaceWith: function () {
          var n = arguments[0];
          return (
            this.domManip(arguments, function (t) {
              (n = this.parentNode),
                i.cleanData(f(this)),
                n && n.replaceChild(t, this);
            }),
            n && (n.length || n.nodeType) ? this : this.remove()
          );
        },
        detach: function (n) {
          return this.remove(n, !0);
        },
        domManip: function (n, t) {
          n = ir.apply([], n);
          var h,
            u,
            c,
            o,
            v,
            s,
            e = 0,
            l = this.length,
            p = this,
            w = l - 1,
            a = n[0],
            y = i.isFunction(a);
          if (
            y ||
            (l > 1 && typeof a == "string" && !r.checkClone && ve.test(a))
          )
            return this.each(function (i) {
              var r = p.eq(i);
              y && (n[0] = a.call(this, i, r.html())), r.domManip(n, t);
            });
          if (
            l &&
            ((s = i.buildFragment(n, this[0].ownerDocument, !1, this)),
            (h = s.firstChild),
            s.childNodes.length === 1 && (s = h),
            h)
          ) {
            for (o = i.map(f(s, "script"), ou), c = o.length; e < l; e++)
              (u = s),
                e !== w &&
                  ((u = i.clone(u, !0, !0)), c && i.merge(o, f(u, "script"))),
                t.call(this[e], u, e);
            if (c)
              for (
                v = o[o.length - 1].ownerDocument, i.map(o, su), e = 0;
                e < c;
                e++
              )
                (u = o[e]),
                  fu.test(u.type || "") &&
                    !i._data(u, "globalEval") &&
                    i.contains(v, u) &&
                    (u.src
                      ? i._evalUrl && i._evalUrl(u.src)
                      : i.globalEval(
                          (
                            u.text ||
                            u.textContent ||
                            u.innerHTML ||
                            ""
                          ).replace(pe, "")
                        ));
            s = h = null;
          }
          return this;
        },
      }),
      i.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (n, t) {
          i.fn[n] = function (n) {
            for (var u, r = 0, f = [], e = i(n), o = e.length - 1; r <= o; r++)
              (u = r === o ? this : this.clone(!0)),
                i(e[r])[t](u),
                ti.apply(f, u.get());
            return this.pushStack(f);
          };
        }
      ),
      (ai = {}),
      (function () {
        var t,
          i,
          n = u.createElement("div"),
          f =
            "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        (n.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
          (t = n.getElementsByTagName("a")[0]),
          (t.style.cssText = "float:left;opacity:.5"),
          (r.opacity = /^0.5/.test(t.style.opacity)),
          (r.cssFloat = !!t.style.cssFloat),
          (n.style.backgroundClip = "content-box"),
          (n.cloneNode(!0).style.backgroundClip = ""),
          (r.clearCloneStyle = n.style.backgroundClip === "content-box"),
          (t = n = null),
          (r.shrinkWrapBlocks = function () {
            var t, r, n, e;
            if (i == null) {
              if (((t = u.getElementsByTagName("body")[0]), !t)) return;
              (e =
                "border:0;width:0;height:0;position:absolute;top:0;left:-9999px"),
                (r = u.createElement("div")),
                (n = u.createElement("div")),
                t.appendChild(r).appendChild(n),
                (i = !1),
                typeof n.style.zoom !== o &&
                  ((n.style.cssText = f + ";width:1px;padding:1px;zoom:1"),
                  (n.innerHTML = "<div></div>"),
                  (n.firstChild.style.width = "5px"),
                  (i = n.offsetWidth !== 3)),
                t.removeChild(r),
                (t = r = n = null);
            }
            return i;
          });
      })();
    var au = /^margin/,
      yt = new RegExp("^(" + at + ")(?!px)[a-z%]+$", "i"),
      k,
      d,
      de = /^(top|right|bottom|left)$/;
    n.getComputedStyle
      ? ((k = function (n) {
          return n.ownerDocument.defaultView.getComputedStyle(n, null);
        }),
        (d = function (n, t, r) {
          var e,
            o,
            s,
            u,
            f = n.style;
          return (
            (r = r || k(n)),
            (u = r ? r.getPropertyValue(t) || r[t] : undefined),
            r &&
              (u !== "" ||
                i.contains(n.ownerDocument, n) ||
                (u = i.style(n, t)),
              yt.test(u) &&
                au.test(t) &&
                ((e = f.width),
                (o = f.minWidth),
                (s = f.maxWidth),
                (f.minWidth = f.maxWidth = f.width = u),
                (u = r.width),
                (f.width = e),
                (f.minWidth = o),
                (f.maxWidth = s))),
            u === undefined ? u : u + ""
          );
        }))
      : u.documentElement.currentStyle &&
        ((k = function (n) {
          return n.currentStyle;
        }),
        (d = function (n, t, i) {
          var o,
            f,
            e,
            r,
            u = n.style;
          return (
            (i = i || k(n)),
            (r = i ? i[t] : undefined),
            r == null && u && u[t] && (r = u[t]),
            yt.test(r) &&
              !de.test(t) &&
              ((o = u.left),
              (f = n.runtimeStyle),
              (e = f && f.left),
              e && (f.left = n.currentStyle.left),
              (u.left = t === "fontSize" ? "1em" : r),
              (r = u.pixelLeft + "px"),
              (u.left = o),
              e && (f.left = e)),
            r === undefined ? r : r + "" || "auto"
          );
        })),
      (function () {
        function a() {
          var f,
            t,
            r = u.getElementsByTagName("body")[0];
          r &&
            ((f = u.createElement("div")),
            (t = u.createElement("div")),
            (f.style.cssText = l),
            r.appendChild(f).appendChild(t),
            (t.style.cssText =
              "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%"),
            i.swap(r, r.style.zoom != null ? { zoom: 1 } : {}, function () {
              c = t.offsetWidth === 4;
            }),
            (o = !0),
            (s = !1),
            (h = !0),
            n.getComputedStyle &&
              ((s = (n.getComputedStyle(t, null) || {}).top !== "1%"),
              (o =
                (n.getComputedStyle(t, null) || { width: "4px" }).width ===
                "4px")),
            r.removeChild(f),
            (t = r = null));
        }
        var f,
          e,
          c,
          o,
          s,
          h,
          t = u.createElement("div"),
          l = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
          v =
            "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        (t.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
          (f = t.getElementsByTagName("a")[0]),
          (f.style.cssText = "float:left;opacity:.5"),
          (r.opacity = /^0.5/.test(f.style.opacity)),
          (r.cssFloat = !!f.style.cssFloat),
          (t.style.backgroundClip = "content-box"),
          (t.cloneNode(!0).style.backgroundClip = ""),
          (r.clearCloneStyle = t.style.backgroundClip === "content-box"),
          (f = t = null),
          i.extend(r, {
            reliableHiddenOffsets: function () {
              if (e != null) return e;
              var i,
                n,
                f,
                t = u.createElement("div"),
                r = u.getElementsByTagName("body")[0];
              if (r)
                return (
                  t.setAttribute("className", "t"),
                  (t.innerHTML =
                    "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                  (i = u.createElement("div")),
                  (i.style.cssText = l),
                  r.appendChild(i).appendChild(t),
                  (t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                  (n = t.getElementsByTagName("td")),
                  (n[0].style.cssText =
                    "padding:0;margin:0;border:0;display:none"),
                  (f = n[0].offsetHeight === 0),
                  (n[0].style.display = ""),
                  (n[1].style.display = "none"),
                  (e = f && n[0].offsetHeight === 0),
                  r.removeChild(i),
                  (t = r = null),
                  e
                );
            },
            boxSizing: function () {
              return c == null && a(), c;
            },
            boxSizingReliable: function () {
              return o == null && a(), o;
            },
            pixelPosition: function () {
              return s == null && a(), s;
            },
            reliableMarginRight: function () {
              var r, f, t, i;
              if (h == null && n.getComputedStyle) {
                if (((r = u.getElementsByTagName("body")[0]), !r)) return;
                (f = u.createElement("div")),
                  (t = u.createElement("div")),
                  (f.style.cssText = l),
                  r.appendChild(f).appendChild(t),
                  (i = t.appendChild(u.createElement("div"))),
                  (i.style.cssText = t.style.cssText = v),
                  (i.style.marginRight = i.style.width = "0"),
                  (t.style.width = "1px"),
                  (h = !parseFloat(
                    (n.getComputedStyle(i, null) || {}).marginRight
                  )),
                  r.removeChild(f);
              }
              return h;
            },
          });
      })(),
      (i.swap = function (n, t, i, r) {
        var f,
          u,
          e = {};
        for (u in t) (e[u] = n.style[u]), (n.style[u] = t[u]);
        f = i.apply(n, r || []);
        for (u in t) n.style[u] = e[u];
        return f;
      });
    var vi = /alpha\([^)]*\)/i,
      ge = /opacity\s*=\s*([^)]*)/,
      no = /^(none|table(?!-c[ea]).+)/,
      to = new RegExp("^(" + at + ")(.*)$", "i"),
      io = new RegExp("^([+-])=(" + at + ")", "i"),
      ro = { position: "absolute", visibility: "hidden", display: "block" },
      yu = { letterSpacing: 0, fontWeight: 400 },
      pu = ["Webkit", "O", "Moz", "ms"];
    i.extend({
      cssHooks: {
        opacity: {
          get: function (n, t) {
            if (t) {
              var i = d(n, "opacity");
              return i === "" ? "1" : i;
            }
          },
        },
      },
      cssNumber: {
        columnCount: !0,
        fillOpacity: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: { float: r.cssFloat ? "cssFloat" : "styleFloat" },
      style: function (n, t, u, f) {
        if (n && n.nodeType !== 3 && n.nodeType !== 8 && n.style) {
          var o,
            c,
            e,
            s = i.camelCase(t),
            h = n.style;
          if (
            ((t = i.cssProps[s] || (i.cssProps[s] = wu(h, s))),
            (e = i.cssHooks[t] || i.cssHooks[s]),
            u !== undefined)
          ) {
            if (
              ((c = typeof u),
              c === "string" &&
                (o = io.exec(u)) &&
                ((u = (o[1] + 1) * o[2] + parseFloat(i.css(n, t))),
                (c = "number")),
              u == null || u !== u)
            )
              return;
            if (
              (c !== "number" || i.cssNumber[s] || (u += "px"),
              r.clearCloneStyle ||
                u !== "" ||
                t.indexOf("background") !== 0 ||
                (h[t] = "inherit"),
              !e || !("set" in e) || (u = e.set(n, u, f)) !== undefined)
            )
              try {
                (h[t] = ""), (h[t] = u);
              } catch (l) {}
          } else
            return e && "get" in e && (o = e.get(n, !1, f)) !== undefined
              ? o
              : h[t];
        }
      },
      css: function (n, t, r, u) {
        var s,
          f,
          e,
          o = i.camelCase(t);
        return ((t = i.cssProps[o] || (i.cssProps[o] = wu(n.style, o))),
        (e = i.cssHooks[t] || i.cssHooks[o]),
        e && "get" in e && (f = e.get(n, !0, r)),
        f === undefined && (f = d(n, t, u)),
        f === "normal" && t in yu && (f = yu[t]),
        r === "" || r)
          ? ((s = parseFloat(f)), r === !0 || i.isNumeric(s) ? s || 0 : f)
          : f;
      },
    }),
      i.each(["height", "width"], function (n, t) {
        i.cssHooks[t] = {
          get: function (n, r, u) {
            if (r)
              return n.offsetWidth === 0 && no.test(i.css(n, "display"))
                ? i.swap(n, ro, function () {
                    return gu(n, t, u);
                  })
                : gu(n, t, u);
          },
          set: function (n, u, f) {
            var e = f && k(n);
            return ku(
              n,
              u,
              f
                ? du(
                    n,
                    t,
                    f,
                    r.boxSizing() &&
                      i.css(n, "boxSizing", !1, e) === "border-box",
                    e
                  )
                : 0
            );
          },
        };
      }),
      r.opacity ||
        (i.cssHooks.opacity = {
          get: function (n, t) {
            return ge.test(
              (t && n.currentStyle ? n.currentStyle.filter : n.style.filter) ||
                ""
            )
              ? 0.01 * parseFloat(RegExp.$1) + ""
              : t
              ? "1"
              : "";
          },
          set: function (n, t) {
            var r = n.style,
              u = n.currentStyle,
              e = i.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
              f = (u && u.filter) || r.filter || "";
            ((r.zoom = 1),
            (t >= 1 || t === "") &&
              i.trim(f.replace(vi, "")) === "" &&
              r.removeAttribute &&
              (r.removeAttribute("filter"), t === "" || (u && !u.filter))) ||
              (r.filter = vi.test(f) ? f.replace(vi, e) : f + " " + e);
          },
        }),
      (i.cssHooks.marginRight = vu(r.reliableMarginRight, function (n, t) {
        if (t)
          return i.swap(n, { display: "inline-block" }, d, [n, "marginRight"]);
      })),
      i.each({ margin: "", padding: "", border: "Width" }, function (n, t) {
        (i.cssHooks[n + t] = {
          expand: function (i) {
            for (
              var r = 0, f = {}, u = typeof i == "string" ? i.split(" ") : [i];
              r < 4;
              r++
            )
              f[n + w[r] + t] = u[r] || u[r - 2] || u[0];
            return f;
          },
        }),
          au.test(n) || (i.cssHooks[n + t].set = ku);
      }),
      i.fn.extend({
        css: function (n, t) {
          return b(
            this,
            function (n, t, r) {
              var f,
                e,
                o = {},
                u = 0;
              if (i.isArray(t)) {
                for (f = k(n), e = t.length; u < e; u++)
                  o[t[u]] = i.css(n, t[u], !1, f);
                return o;
              }
              return r !== undefined ? i.style(n, t, r) : i.css(n, t);
            },
            n,
            t,
            arguments.length > 1
          );
        },
        show: function () {
          return bu(this, !0);
        },
        hide: function () {
          return bu(this);
        },
        toggle: function (n) {
          return typeof n == "boolean"
            ? n
              ? this.show()
              : this.hide()
            : this.each(function () {
                et(this) ? i(this).show() : i(this).hide();
              });
        },
      }),
      (i.Tween = e),
      (e.prototype = {
        constructor: e,
        init: function (n, t, r, u, f, e) {
          (this.elem = n),
            (this.prop = r),
            (this.easing = f || "swing"),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = u),
            (this.unit = e || (i.cssNumber[r] ? "" : "px"));
        },
        cur: function () {
          var n = e.propHooks[this.prop];
          return n && n.get ? n.get(this) : e.propHooks._default.get(this);
        },
        run: function (n) {
          var t,
            r = e.propHooks[this.prop];
          return (
            (this.pos = this.options.duration
              ? (t = i.easing[this.easing](
                  n,
                  this.options.duration * n,
                  0,
                  1,
                  this.options.duration
                ))
              : (t = n)),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            r && r.set ? r.set(this) : e.propHooks._default.set(this),
            this
          );
        },
      }),
      (e.prototype.init.prototype = e.prototype),
      (e.propHooks = {
        _default: {
          get: function (n) {
            var t;
            return n.elem[n.prop] != null &&
              (!n.elem.style || n.elem.style[n.prop] == null)
              ? n.elem[n.prop]
              : ((t = i.css(n.elem, n.prop, "")), !t || t === "auto" ? 0 : t);
          },
          set: function (n) {
            i.fx.step[n.prop]
              ? i.fx.step[n.prop](n)
              : n.elem.style &&
                (n.elem.style[i.cssProps[n.prop]] != null || i.cssHooks[n.prop])
              ? i.style(n.elem, n.prop, n.now + n.unit)
              : (n.elem[n.prop] = n.now);
          },
        },
      }),
      (e.propHooks.scrollTop = e.propHooks.scrollLeft = {
        set: function (n) {
          n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now);
        },
      }),
      (i.easing = {
        linear: function (n) {
          return n;
        },
        swing: function (n) {
          return 0.5 - Math.cos(n * Math.PI) / 2;
        },
      }),
      (i.fx = e.prototype.init),
      (i.fx.step = {});
    var rt,
      pt,
      uo = /^(?:toggle|show|hide)$/,
      nf = new RegExp("^(?:([+-])=|)(" + at + ")([a-z%]*)$", "i"),
      fo = /queueHooks$/,
      wt = [eo],
      st = {
        "*": [
          function (n, t) {
            var f = this.createTween(n, t),
              s = f.cur(),
              u = nf.exec(t),
              e = (u && u[3]) || (i.cssNumber[n] ? "" : "px"),
              r =
                (i.cssNumber[n] || (e !== "px" && +s)) &&
                nf.exec(i.css(f.elem, n)),
              o = 1,
              h = 20;
            if (r && r[3] !== e) {
              (e = e || r[3]), (u = u || []), (r = +s || 1);
              do (o = o || ".5"), (r = r / o), i.style(f.elem, n, r + e);
              while (o !== (o = f.cur() / s) && o !== 1 && --h);
            }
            return (
              u &&
                ((r = f.start = +r || +s || 0),
                (f.unit = e),
                (f.end = u[1] ? r + (u[1] + 1) * u[2] : +u[2])),
              f
            );
          },
        ],
      };
    (i.Animation = i.extend(uf, {
      tweener: function (n, t) {
        i.isFunction(n) ? ((t = n), (n = ["*"])) : (n = n.split(" "));
        for (var r, u = 0, f = n.length; u < f; u++)
          (r = n[u]), (st[r] = st[r] || []), st[r].unshift(t);
      },
      prefilter: function (n, t) {
        t ? wt.unshift(n) : wt.push(n);
      },
    })),
      (i.speed = function (n, t, r) {
        var u =
          n && typeof n == "object"
            ? i.extend({}, n)
            : {
                complete: r || (!r && t) || (i.isFunction(n) && n),
                duration: n,
                easing: (r && t) || (t && !i.isFunction(t) && t),
              };
        return (
          (u.duration = i.fx.off
            ? 0
            : typeof u.duration == "number"
            ? u.duration
            : u.duration in i.fx.speeds
            ? i.fx.speeds[u.duration]
            : i.fx.speeds._default),
          (u.queue == null || u.queue === !0) && (u.queue = "fx"),
          (u.old = u.complete),
          (u.complete = function () {
            i.isFunction(u.old) && u.old.call(this),
              u.queue && i.dequeue(this, u.queue);
          }),
          u
        );
      }),
      i.fn.extend({
        fadeTo: function (n, t, i, r) {
          return this.filter(et)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: t }, n, i, r);
        },
        animate: function (n, t, r, u) {
          var o = i.isEmptyObject(n),
            e = i.speed(t, r, u),
            f = function () {
              var t = uf(this, i.extend({}, n), e);
              (o || i._data(this, "finish")) && t.stop(!0);
            };
          return (
            (f.finish = f),
            o || e.queue === !1 ? this.each(f) : this.queue(e.queue, f)
          );
        },
        stop: function (n, t, r) {
          var u = function (n) {
            var t = n.stop;
            delete n.stop, t(r);
          };
          return (
            typeof n != "string" && ((r = t), (t = n), (n = undefined)),
            t && n !== !1 && this.queue(n || "fx", []),
            this.each(function () {
              var o = !0,
                t = n != null && n + "queueHooks",
                e = i.timers,
                f = i._data(this);
              if (t) f[t] && f[t].stop && u(f[t]);
              else for (t in f) f[t] && f[t].stop && fo.test(t) && u(f[t]);
              for (t = e.length; t--; )
                e[t].elem === this &&
                  (n == null || e[t].queue === n) &&
                  (e[t].anim.stop(r), (o = !1), e.splice(t, 1));
              (o || !r) && i.dequeue(this, n);
            })
          );
        },
        finish: function (n) {
          return (
            n !== !1 && (n = n || "fx"),
            this.each(function () {
              var t,
                f = i._data(this),
                r = f[n + "queue"],
                e = f[n + "queueHooks"],
                u = i.timers,
                o = r ? r.length : 0;
              for (
                f.finish = !0,
                  i.queue(this, n, []),
                  e && e.stop && e.stop.call(this, !0),
                  t = u.length;
                t--;

              )
                u[t].elem === this &&
                  u[t].queue === n &&
                  (u[t].anim.stop(!0), u.splice(t, 1));
              for (t = 0; t < o; t++)
                r[t] && r[t].finish && r[t].finish.call(this);
              delete f.finish;
            })
          );
        },
      }),
      i.each(["toggle", "show", "hide"], function (n, t) {
        var r = i.fn[t];
        i.fn[t] = function (n, i, u) {
          return n == null || typeof n == "boolean"
            ? r.apply(this, arguments)
            : this.animate(bt(t, !0), n, i, u);
        };
      }),
      i.each(
        {
          slideDown: bt("show"),
          slideUp: bt("hide"),
          slideToggle: bt("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (n, t) {
          i.fn[n] = function (n, i, r) {
            return this.animate(t, n, i, r);
          };
        }
      ),
      (i.timers = []),
      (i.fx.tick = function () {
        var r,
          n = i.timers,
          t = 0;
        for (rt = i.now(); t < n.length; t++)
          (r = n[t]), r() || n[t] !== r || n.splice(t--, 1);
        n.length || i.fx.stop(), (rt = undefined);
      }),
      (i.fx.timer = function (n) {
        i.timers.push(n), n() ? i.fx.start() : i.timers.pop();
      }),
      (i.fx.interval = 13),
      (i.fx.start = function () {
        pt || (pt = setInterval(i.fx.tick, i.fx.interval));
      }),
      (i.fx.stop = function () {
        clearInterval(pt), (pt = null);
      }),
      (i.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (i.fn.delay = function (n, t) {
        return (
          (n = i.fx ? i.fx.speeds[n] || n : n),
          (t = t || "fx"),
          this.queue(t, function (t, i) {
            var r = setTimeout(t, n);
            i.stop = function () {
              clearTimeout(r);
            };
          })
        );
      }),
      (function () {
        var i,
          n,
          f,
          e,
          t = u.createElement("div");
        t.setAttribute("className", "t"),
          (t.innerHTML =
            "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
          (i = t.getElementsByTagName("a")[0]),
          (f = u.createElement("select")),
          (e = f.appendChild(u.createElement("option"))),
          (n = t.getElementsByTagName("input")[0]),
          (i.style.cssText = "top:1px"),
          (r.getSetAttribute = t.className !== "t"),
          (r.style = /top/.test(i.getAttribute("style"))),
          (r.hrefNormalized = i.getAttribute("href") === "/a"),
          (r.checkOn = !!n.value),
          (r.optSelected = e.selected),
          (r.enctype = !!u.createElement("form").enctype),
          (f.disabled = !0),
          (r.optDisabled = !e.disabled),
          (n = u.createElement("input")),
          n.setAttribute("value", ""),
          (r.input = n.getAttribute("value") === ""),
          (n.value = "t"),
          n.setAttribute("type", "radio"),
          (r.radioValue = n.value === "t"),
          (i = n = f = e = t = null);
      })(),
      (ff = /\r/g),
      i.fn.extend({
        val: function (n) {
          var t,
            r,
            f,
            u = this[0];
          return arguments.length
            ? ((f = i.isFunction(n)),
              this.each(function (r) {
                var u;
                this.nodeType === 1 &&
                  ((u = f ? n.call(this, r, i(this).val()) : n),
                  u == null
                    ? (u = "")
                    : typeof u == "number"
                    ? (u += "")
                    : i.isArray(u) &&
                      (u = i.map(u, function (n) {
                        return n == null ? "" : n + "";
                      })),
                  (t =
                    i.valHooks[this.type] ||
                    i.valHooks[this.nodeName.toLowerCase()]),
                  (t && "set" in t && t.set(this, u, "value") !== undefined) ||
                    (this.value = u));
              }))
            : u
            ? ((t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()]),
              t && "get" in t && (r = t.get(u, "value")) !== undefined)
              ? r
              : ((r = u.value),
                typeof r == "string" ? r.replace(ff, "") : r == null ? "" : r)
            : void 0;
        },
      }),
      i.extend({
        valHooks: {
          option: {
            get: function (n) {
              var t = i.find.attr(n, "value");
              return t != null ? t : i.text(n);
            },
          },
          select: {
            get: function (n) {
              for (
                var o,
                  t,
                  s = n.options,
                  u = n.selectedIndex,
                  f = n.type === "select-one" || u < 0,
                  h = f ? null : [],
                  c = f ? u + 1 : s.length,
                  e = u < 0 ? c : f ? u : 0;
                e < c;
                e++
              )
                if (
                  ((t = s[e]),
                  (t.selected || e === u) &&
                    (r.optDisabled
                      ? !t.disabled
                      : t.getAttribute("disabled") === null) &&
                    (!t.parentNode.disabled ||
                      !i.nodeName(t.parentNode, "optgroup")))
                ) {
                  if (((o = i(t).val()), f)) return o;
                  h.push(o);
                }
              return h;
            },
            set: function (n, t) {
              for (
                var f, r, u = n.options, o = i.makeArray(t), e = u.length;
                e--;

              )
                if (((r = u[e]), i.inArray(i.valHooks.option.get(r), o) >= 0))
                  try {
                    r.selected = f = !0;
                  } catch (s) {
                    r.scrollHeight;
                  }
                else r.selected = !1;
              return f || (n.selectedIndex = -1), u;
            },
          },
        },
      }),
      i.each(["radio", "checkbox"], function () {
        (i.valHooks[this] = {
          set: function (n, t) {
            if (i.isArray(t))
              return (n.checked = i.inArray(i(n).val(), t) >= 0);
          },
        }),
          r.checkOn ||
            (i.valHooks[this].get = function (n) {
              return n.getAttribute("value") === null ? "on" : n.value;
            });
      });
    var ut,
      ef,
      v = i.expr.attrHandle,
      yi = /^(?:checked|selected)$/i,
      g = r.getSetAttribute,
      kt = r.input;
    i.fn.extend({
      attr: function (n, t) {
        return b(this, i.attr, n, t, arguments.length > 1);
      },
      removeAttr: function (n) {
        return this.each(function () {
          i.removeAttr(this, n);
        });
      },
    }),
      i.extend({
        attr: function (n, t, r) {
          var u,
            f,
            e = n.nodeType;
          if (n && e !== 3 && e !== 8 && e !== 2) {
            if (typeof n.getAttribute === o) return i.prop(n, t, r);
            if (
              ((e === 1 && i.isXMLDoc(n)) ||
                ((t = t.toLowerCase()),
                (u = i.attrHooks[t] || (i.expr.match.bool.test(t) ? ef : ut))),
              r !== undefined)
            )
              if (r === null) i.removeAttr(n, t);
              else
                return u && "set" in u && (f = u.set(n, r, t)) !== undefined
                  ? f
                  : (n.setAttribute(t, r + ""), r);
            else
              return u && "get" in u && (f = u.get(n, t)) !== null
                ? f
                : ((f = i.find.attr(n, t)), f == null ? undefined : f);
          }
        },
        removeAttr: function (n, t) {
          var r,
            u,
            e = 0,
            f = t && t.match(h);
          if (f && n.nodeType === 1)
            while ((r = f[e++]))
              (u = i.propFix[r] || r),
                i.expr.match.bool.test(r)
                  ? (kt && g) || !yi.test(r)
                    ? (n[u] = !1)
                    : (n[i.camelCase("default-" + r)] = n[u] = !1)
                  : i.attr(n, r, ""),
                n.removeAttribute(g ? r : u);
        },
        attrHooks: {
          type: {
            set: function (n, t) {
              if (!r.radioValue && t === "radio" && i.nodeName(n, "input")) {
                var u = n.value;
                return n.setAttribute("type", t), u && (n.value = u), t;
              }
            },
          },
        },
      }),
      (ef = {
        set: function (n, t, r) {
          return (
            t === !1
              ? i.removeAttr(n, r)
              : (kt && g) || !yi.test(r)
              ? n.setAttribute((!g && i.propFix[r]) || r, r)
              : (n[i.camelCase("default-" + r)] = n[r] = !0),
            r
          );
        },
      }),
      i.each(i.expr.match.bool.source.match(/\w+/g), function (n, t) {
        var r = v[t] || i.find.attr;
        v[t] =
          (kt && g) || !yi.test(t)
            ? function (n, t, i) {
                var u, f;
                return (
                  i ||
                    ((f = v[t]),
                    (v[t] = u),
                    (u = r(n, t, i) != null ? t.toLowerCase() : null),
                    (v[t] = f)),
                  u
                );
              }
            : function (n, t, r) {
                if (!r)
                  return n[i.camelCase("default-" + t)]
                    ? t.toLowerCase()
                    : null;
              };
      }),
      (kt && g) ||
        (i.attrHooks.value = {
          set: function (n, t, r) {
            if (i.nodeName(n, "input")) n.defaultValue = t;
            else return ut && ut.set(n, t, r);
          },
        }),
      g ||
        ((ut = {
          set: function (n, t, i) {
            var r = n.getAttributeNode(i);
            return (
              r || n.setAttributeNode((r = n.ownerDocument.createAttribute(i))),
              (r.value = t += ""),
              i === "value" || t === n.getAttribute(i) ? t : void 0
            );
          },
        }),
        (v.id = v.name = v.coords = function (n, t, i) {
          var r;
          if (!i)
            return (r = n.getAttributeNode(t)) && r.value !== ""
              ? r.value
              : null;
        }),
        (i.valHooks.button = {
          get: function (n, t) {
            var i = n.getAttributeNode(t);
            if (i && i.specified) return i.value;
          },
          set: ut.set,
        }),
        (i.attrHooks.contenteditable = {
          set: function (n, t, i) {
            ut.set(n, t === "" ? !1 : t, i);
          },
        }),
        i.each(["width", "height"], function (n, t) {
          i.attrHooks[t] = {
            set: function (n, i) {
              if (i === "") return n.setAttribute(t, "auto"), i;
            },
          };
        })),
      r.style ||
        (i.attrHooks.style = {
          get: function (n) {
            return n.style.cssText || undefined;
          },
          set: function (n, t) {
            return (n.style.cssText = t + "");
          },
        }),
      (of = /^(?:input|select|textarea|button|object)$/i),
      (sf = /^(?:a|area)$/i),
      i.fn.extend({
        prop: function (n, t) {
          return b(this, i.prop, n, t, arguments.length > 1);
        },
        removeProp: function (n) {
          return (
            (n = i.propFix[n] || n),
            this.each(function () {
              try {
                (this[n] = undefined), delete this[n];
              } catch (t) {}
            })
          );
        },
      }),
      i.extend({
        propFix: { for: "htmlFor", class: "className" },
        prop: function (n, t, r) {
          var f,
            u,
            o,
            e = n.nodeType;
          if (n && e !== 3 && e !== 8 && e !== 2)
            return (
              (o = e !== 1 || !i.isXMLDoc(n)),
              o && ((t = i.propFix[t] || t), (u = i.propHooks[t])),
              r !== undefined
                ? u && "set" in u && (f = u.set(n, r, t)) !== undefined
                  ? f
                  : (n[t] = r)
                : u && "get" in u && (f = u.get(n, t)) !== null
                ? f
                : n[t]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (n) {
              var t = i.find.attr(n, "tabindex");
              return t
                ? parseInt(t, 10)
                : of.test(n.nodeName) || (sf.test(n.nodeName) && n.href)
                ? 0
                : -1;
            },
          },
        },
      }),
      r.hrefNormalized ||
        i.each(["href", "src"], function (n, t) {
          i.propHooks[t] = {
            get: function (n) {
              return n.getAttribute(t, 4);
            },
          };
        }),
      r.optSelected ||
        (i.propHooks.selected = {
          get: function (n) {
            var t = n.parentNode;
            return (
              t &&
                (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
              null
            );
          },
        }),
      i.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          i.propFix[this.toLowerCase()] = this;
        }
      ),
      r.enctype || (i.propFix.enctype = "encoding"),
      (dt = /[\t\r\n\f]/g),
      i.fn.extend({
        addClass: function (n) {
          var o,
            t,
            r,
            u,
            s,
            f,
            e = 0,
            c = this.length,
            l = typeof n == "string" && n;
          if (i.isFunction(n))
            return this.each(function (t) {
              i(this).addClass(n.call(this, t, this.className));
            });
          if (l)
            for (o = (n || "").match(h) || []; e < c; e++)
              if (
                ((t = this[e]),
                (r =
                  t.nodeType === 1 &&
                  (t.className
                    ? (" " + t.className + " ").replace(dt, " ")
                    : " ")),
                r)
              ) {
                for (s = 0; (u = o[s++]); )
                  r.indexOf(" " + u + " ") < 0 && (r += u + " ");
                (f = i.trim(r)), t.className !== f && (t.className = f);
              }
          return this;
        },
        removeClass: function (n) {
          var o,
            t,
            r,
            u,
            s,
            f,
            e = 0,
            c = this.length,
            l = arguments.length === 0 || (typeof n == "string" && n);
          if (i.isFunction(n))
            return this.each(function (t) {
              i(this).removeClass(n.call(this, t, this.className));
            });
          if (l)
            for (o = (n || "").match(h) || []; e < c; e++)
              if (
                ((t = this[e]),
                (r =
                  t.nodeType === 1 &&
                  (t.className
                    ? (" " + t.className + " ").replace(dt, " ")
                    : "")),
                r)
              ) {
                for (s = 0; (u = o[s++]); )
                  while (r.indexOf(" " + u + " ") >= 0)
                    r = r.replace(" " + u + " ", " ");
                (f = n ? i.trim(r) : ""),
                  t.className !== f && (t.className = f);
              }
          return this;
        },
        toggleClass: function (n, t) {
          var r = typeof n;
          return typeof t == "boolean" && r === "string"
            ? t
              ? this.addClass(n)
              : this.removeClass(n)
            : i.isFunction(n)
            ? this.each(function (r) {
                i(this).toggleClass(n.call(this, r, this.className, t), t);
              })
            : this.each(function () {
                if (r === "string")
                  for (
                    var t, f = 0, u = i(this), e = n.match(h) || [];
                    (t = e[f++]);

                  )
                    u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
                else
                  (r === o || r === "boolean") &&
                    (this.className &&
                      i._data(this, "__className__", this.className),
                    (this.className =
                      this.className || n === !1
                        ? ""
                        : i._data(this, "__className__") || ""));
              });
        },
        hasClass: function (n) {
          for (var i = " " + n + " ", t = 0, r = this.length; t < r; t++)
            if (
              this[t].nodeType === 1 &&
              (" " + this[t].className + " ").replace(dt, " ").indexOf(i) >= 0
            )
              return !0;
          return !1;
        },
      }),
      i.each(
        "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
          " "
        ),
        function (n, t) {
          i.fn[t] = function (n, i) {
            return arguments.length > 0
              ? this.on(t, null, n, i)
              : this.trigger(t);
          };
        }
      ),
      i.fn.extend({
        hover: function (n, t) {
          return this.mouseenter(n).mouseleave(t || n);
        },
        bind: function (n, t, i) {
          return this.on(n, null, t, i);
        },
        unbind: function (n, t) {
          return this.off(n, null, t);
        },
        delegate: function (n, t, i, r) {
          return this.on(t, n, i, r);
        },
        undelegate: function (n, t, i) {
          return arguments.length === 1
            ? this.off(n, "**")
            : this.off(t, n || "**", i);
        },
      });
    var pi = i.now(),
      wi = /\?/,
      so = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    (i.parseJSON = function (t) {
      if (n.JSON && n.JSON.parse) return n.JSON.parse(t + "");
      var f,
        r = null,
        u = i.trim(t + "");
      return u &&
        !i.trim(
          u.replace(so, function (n, t, i, u) {
            return (f && t && (r = 0), r === 0)
              ? n
              : ((f = i || t), (r += !u - !i), "");
          })
        )
        ? Function("return " + u)()
        : i.error("Invalid JSON: " + t);
    }),
      (i.parseXML = function (t) {
        var r, u;
        if (!t || typeof t != "string") return null;
        try {
          n.DOMParser
            ? ((u = new DOMParser()), (r = u.parseFromString(t, "text/xml")))
            : ((r = new ActiveXObject("Microsoft.XMLDOM")),
              (r.async = "false"),
              r.loadXML(t));
        } catch (f) {
          r = undefined;
        }
        return (
          (r &&
            r.documentElement &&
            !r.getElementsByTagName("parsererror").length) ||
            i.error("Invalid XML: " + t),
          r
        );
      });
    var nt,
      y,
      ho = /#.*$/,
      hf = /([?&])_=[^&]*/,
      co = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      lo = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      ao = /^(?:GET|HEAD)$/,
      vo = /^\/\//,
      cf = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      lf = {},
      bi = {},
      af = "*/".concat("*");
    try {
      y = location.href;
    } catch (is) {
      (y = u.createElement("a")), (y.href = ""), (y = y.href);
    }
    (nt = cf.exec(y.toLowerCase()) || []),
      i.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: y,
          type: "GET",
          isLocal: lo.test(nt[1]),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": af,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /xml/, html: /html/, json: /json/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": i.parseJSON,
            "text xml": i.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (n, t) {
          return t ? ki(ki(n, i.ajaxSettings), t) : ki(i.ajaxSettings, n);
        },
        ajaxPrefilter: vf(lf),
        ajaxTransport: vf(bi),
        ajax: function (n, t) {
          function w(n, t, s, h) {
            var v,
              it,
              nt,
              y,
              w,
              c = t;
            e !== 2 &&
              ((e = 2),
              k && clearTimeout(k),
              (l = undefined),
              (b = h || ""),
              (u.readyState = n > 0 ? 4 : 0),
              (v = (n >= 200 && n < 300) || n === 304),
              s && (y = yo(r, u, s)),
              (y = po(r, y, u, v)),
              v
                ? (r.ifModified &&
                    ((w = u.getResponseHeader("Last-Modified")),
                    w && (i.lastModified[f] = w),
                    (w = u.getResponseHeader("etag")),
                    w && (i.etag[f] = w)),
                  n === 204 || r.type === "HEAD"
                    ? (c = "nocontent")
                    : n === 304
                    ? (c = "notmodified")
                    : ((c = y.state), (it = y.data), (nt = y.error), (v = !nt)))
                : ((nt = c), (n || !c) && ((c = "error"), n < 0 && (n = 0))),
              (u.status = n),
              (u.statusText = (t || c) + ""),
              v ? g.resolveWith(o, [it, c, u]) : g.rejectWith(o, [u, c, nt]),
              u.statusCode(p),
              (p = undefined),
              a &&
                d.trigger(v ? "ajaxSuccess" : "ajaxError", [u, r, v ? it : nt]),
              tt.fireWith(o, [u, c]),
              a &&
                (d.trigger("ajaxComplete", [u, r]),
                --i.active || i.event.trigger("ajaxStop")));
          }
          typeof n == "object" && ((t = n), (n = undefined)), (t = t || {});
          var s,
            c,
            f,
            b,
            k,
            a,
            l,
            v,
            r = i.ajaxSetup({}, t),
            o = r.context || r,
            d = r.context && (o.nodeType || o.jquery) ? i(o) : i.event,
            g = i.Deferred(),
            tt = i.Callbacks("once memory"),
            p = r.statusCode || {},
            it = {},
            rt = {},
            e = 0,
            ut = "canceled",
            u = {
              readyState: 0,
              getResponseHeader: function (n) {
                var t;
                if (e === 2) {
                  if (!v)
                    for (v = {}; (t = co.exec(b)); )
                      v[t[1].toLowerCase()] = t[2];
                  t = v[n.toLowerCase()];
                }
                return t == null ? null : t;
              },
              getAllResponseHeaders: function () {
                return e === 2 ? b : null;
              },
              setRequestHeader: function (n, t) {
                var i = n.toLowerCase();
                return e || ((n = rt[i] = rt[i] || n), (it[n] = t)), this;
              },
              overrideMimeType: function (n) {
                return e || (r.mimeType = n), this;
              },
              statusCode: function (n) {
                var t;
                if (n)
                  if (e < 2) for (t in n) p[t] = [p[t], n[t]];
                  else u.always(n[u.status]);
                return this;
              },
              abort: function (n) {
                var t = n || ut;
                return l && l.abort(t), w(0, t), this;
              },
            };
          if (
            ((g.promise(u).complete = tt.add),
            (u.success = u.done),
            (u.error = u.fail),
            (r.url = ((n || r.url || y) + "")
              .replace(ho, "")
              .replace(vo, nt[1] + "//")),
            (r.type = t.method || t.type || r.method || r.type),
            (r.dataTypes = i
              .trim(r.dataType || "*")
              .toLowerCase()
              .match(h) || [""]),
            r.crossDomain == null &&
              ((s = cf.exec(r.url.toLowerCase())),
              (r.crossDomain = !!(
                s &&
                (s[1] !== nt[1] ||
                  s[2] !== nt[2] ||
                  (s[3] || (s[1] === "http:" ? "80" : "443")) !==
                    (nt[3] || (nt[1] === "http:" ? "80" : "443")))
              ))),
            r.data &&
              r.processData &&
              typeof r.data != "string" &&
              (r.data = i.param(r.data, r.traditional)),
            yf(lf, r, t, u),
            e === 2)
          )
            return u;
          (a = r.global),
            a && i.active++ == 0 && i.event.trigger("ajaxStart"),
            (r.type = r.type.toUpperCase()),
            (r.hasContent = !ao.test(r.type)),
            (f = r.url),
            r.hasContent ||
              (r.data &&
                ((f = r.url += (wi.test(f) ? "&" : "?") + r.data),
                delete r.data),
              r.cache === !1 &&
                (r.url = hf.test(f)
                  ? f.replace(hf, "$1_=" + pi++)
                  : f + (wi.test(f) ? "&" : "?") + "_=" + pi++)),
            r.ifModified &&
              (i.lastModified[f] &&
                u.setRequestHeader("If-Modified-Since", i.lastModified[f]),
              i.etag[f] && u.setRequestHeader("If-None-Match", i.etag[f])),
            ((r.data && r.hasContent && r.contentType !== !1) ||
              t.contentType) &&
              u.setRequestHeader("Content-Type", r.contentType),
            u.setRequestHeader(
              "Accept",
              r.dataTypes[0] && r.accepts[r.dataTypes[0]]
                ? r.accepts[r.dataTypes[0]] +
                    (r.dataTypes[0] !== "*" ? ", " + af + "; q=0.01" : "")
                : r.accepts["*"]
            );
          for (c in r.headers) u.setRequestHeader(c, r.headers[c]);
          if (r.beforeSend && (r.beforeSend.call(o, u, r) === !1 || e === 2))
            return u.abort();
          ut = "abort";
          for (c in { success: 1, error: 1, complete: 1 }) u[c](r[c]);
          if (((l = yf(bi, r, t, u)), l)) {
            (u.readyState = 1),
              a && d.trigger("ajaxSend", [u, r]),
              r.async &&
                r.timeout > 0 &&
                (k = setTimeout(function () {
                  u.abort("timeout");
                }, r.timeout));
            try {
              (e = 1), l.send(it, w);
            } catch (ft) {
              if (e < 2) w(-1, ft);
              else throw ft;
            }
          } else w(-1, "No Transport");
          return u;
        },
        getJSON: function (n, t, r) {
          return i.get(n, t, r, "json");
        },
        getScript: function (n, t) {
          return i.get(n, undefined, t, "script");
        },
      }),
      i.each(["get", "post"], function (n, t) {
        i[t] = function (n, r, u, f) {
          return (
            i.isFunction(r) && ((f = f || u), (u = r), (r = undefined)),
            i.ajax({ url: n, type: t, dataType: f, data: r, success: u })
          );
        };
      }),
      i.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (n, t) {
          i.fn[t] = function (n) {
            return this.on(t, n);
          };
        }
      ),
      (i._evalUrl = function (n) {
        return i.ajax({
          url: n,
          type: "GET",
          dataType: "script",
          async: !1,
          global: !1,
          throws: !0,
        });
      }),
      i.fn.extend({
        wrapAll: function (n) {
          if (i.isFunction(n))
            return this.each(function (t) {
              i(this).wrapAll(n.call(this, t));
            });
          if (this[0]) {
            var t = i(n, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && t.insertBefore(this[0]),
              t
                .map(function () {
                  for (
                    var n = this;
                    n.firstChild && n.firstChild.nodeType === 1;

                  )
                    n = n.firstChild;
                  return n;
                })
                .append(this);
          }
          return this;
        },
        wrapInner: function (n) {
          return i.isFunction(n)
            ? this.each(function (t) {
                i(this).wrapInner(n.call(this, t));
              })
            : this.each(function () {
                var t = i(this),
                  r = t.contents();
                r.length ? r.wrapAll(n) : t.append(n);
              });
        },
        wrap: function (n) {
          var t = i.isFunction(n);
          return this.each(function (r) {
            i(this).wrapAll(t ? n.call(this, r) : n);
          });
        },
        unwrap: function () {
          return this.parent()
            .each(function () {
              i.nodeName(this, "body") || i(this).replaceWith(this.childNodes);
            })
            .end();
        },
      }),
      (i.expr.filters.hidden = function (n) {
        return (
          (n.offsetWidth <= 0 && n.offsetHeight <= 0) ||
          (!r.reliableHiddenOffsets() &&
            ((n.style && n.style.display) || i.css(n, "display")) === "none")
        );
      }),
      (i.expr.filters.visible = function (n) {
        return !i.expr.filters.hidden(n);
      });
    var wo = /%20/g,
      bo = /\[\]$/,
      pf = /\r?\n/g,
      ko = /^(?:submit|button|image|reset|file)$/i,
      go = /^(?:input|select|textarea|keygen)/i;
    (i.param = function (n, t) {
      var r,
        u = [],
        f = function (n, t) {
          (t = i.isFunction(t) ? t() : t == null ? "" : t),
            (u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t));
        };
      if (
        (t === undefined && (t = i.ajaxSettings && i.ajaxSettings.traditional),
        i.isArray(n) || (n.jquery && !i.isPlainObject(n)))
      )
        i.each(n, function () {
          f(this.name, this.value);
        });
      else for (r in n) di(r, n[r], t, f);
      return u.join("&").replace(wo, "+");
    }),
      i.fn.extend({
        serialize: function () {
          return i.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var n = i.prop(this, "elements");
            return n ? i.makeArray(n) : this;
          })
            .filter(function () {
              var n = this.type;
              return (
                this.name &&
                !i(this).is(":disabled") &&
                go.test(this.nodeName) &&
                !ko.test(n) &&
                (this.checked || !oi.test(n))
              );
            })
            .map(function (n, t) {
              var r = i(this).val();
              return r == null
                ? null
                : i.isArray(r)
                ? i.map(r, function (n) {
                    return { name: t.name, value: n.replace(pf, "\r\n") };
                  })
                : { name: t.name, value: r.replace(pf, "\r\n") };
            })
            .get();
        },
      }),
      (i.ajaxSettings.xhr =
        n.ActiveXObject !== undefined
          ? function () {
              return (
                (!this.isLocal &&
                  /^(get|post|head|put|delete|options)$/i.test(this.type) &&
                  wf()) ||
                ts()
              );
            }
          : wf);
    var ns = 0,
      gt = {},
      ht = i.ajaxSettings.xhr();
    if (n.ActiveXObject)
      i(n).on("unload", function () {
        for (var n in gt) gt[n](undefined, !0);
      });
    return (
      (r.cors = !!ht && "withCredentials" in ht),
      (ht = r.ajax = !!ht),
      ht &&
        i.ajaxTransport(function (n) {
          if (!n.crossDomain || r.cors) {
            var t;
            return {
              send: function (r, u) {
                var e,
                  f = n.xhr(),
                  o = ++ns;
                if (
                  (f.open(n.type, n.url, n.async, n.username, n.password),
                  n.xhrFields)
                )
                  for (e in n.xhrFields) f[e] = n.xhrFields[e];
                n.mimeType &&
                  f.overrideMimeType &&
                  f.overrideMimeType(n.mimeType),
                  n.crossDomain ||
                    r["X-Requested-With"] ||
                    (r["X-Requested-With"] = "XMLHttpRequest");
                for (e in r)
                  r[e] !== undefined && f.setRequestHeader(e, r[e] + "");
                f.send((n.hasContent && n.data) || null),
                  (t = function (r, e) {
                    var s, c, h;
                    if (t && (e || f.readyState === 4))
                      if (
                        (delete gt[o],
                        (t = undefined),
                        (f.onreadystatechange = i.noop),
                        e)
                      )
                        f.readyState !== 4 && f.abort();
                      else {
                        (h = {}),
                          (s = f.status),
                          typeof f.responseText == "string" &&
                            (h.text = f.responseText);
                        try {
                          c = f.statusText;
                        } catch (l) {
                          c = "";
                        }
                        s || !n.isLocal || n.crossDomain
                          ? s === 1223 && (s = 204)
                          : (s = h.text ? 200 : 404);
                      }
                    h && u(s, c, h, f.getAllResponseHeaders());
                  }),
                  n.async
                    ? f.readyState === 4
                      ? setTimeout(t)
                      : (f.onreadystatechange = gt[o] = t)
                    : t();
              },
              abort: function () {
                t && t(undefined, !0);
              },
            };
          }
        }),
      i.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /(?:java|ecma)script/ },
        converters: {
          "text script": function (n) {
            return i.globalEval(n), n;
          },
        },
      }),
      i.ajaxPrefilter("script", function (n) {
        n.cache === undefined && (n.cache = !1),
          n.crossDomain && ((n.type = "GET"), (n.global = !1));
      }),
      i.ajaxTransport("script", function (n) {
        if (n.crossDomain) {
          var t,
            r = u.head || i("head")[0] || u.documentElement;
          return {
            send: function (i, f) {
              (t = u.createElement("script")),
                (t.async = !0),
                n.scriptCharset && (t.charset = n.scriptCharset),
                (t.src = n.url),
                (t.onload = t.onreadystatechange = function (n, i) {
                  (i ||
                    !t.readyState ||
                    /loaded|complete/.test(t.readyState)) &&
                    ((t.onload = t.onreadystatechange = null),
                    t.parentNode && t.parentNode.removeChild(t),
                    (t = null),
                    i || f(200, "success"));
                }),
                r.insertBefore(t, r.firstChild);
            },
            abort: function () {
              if (t) t.onload(undefined, !0);
            },
          };
        }
      }),
      (gi = []),
      (ni = /(=)\?(?=&|$)|\?\?/),
      i.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
          var n = gi.pop() || i.expando + "_" + pi++;
          return (this[n] = !0), n;
        },
      }),
      i.ajaxPrefilter("json jsonp", function (t, r, u) {
        var f,
          o,
          e,
          s =
            t.jsonp !== !1 &&
            (ni.test(t.url)
              ? "url"
              : typeof t.data == "string" &&
                !(t.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
                ni.test(t.data) &&
                "data");
        if (s || t.dataTypes[0] === "jsonp")
          return (
            (f = t.jsonpCallback = i.isFunction(t.jsonpCallback)
              ? t.jsonpCallback()
              : t.jsonpCallback),
            s
              ? (t[s] = t[s].replace(ni, "$1" + f))
              : t.jsonp !== !1 &&
                (t.url += (wi.test(t.url) ? "&" : "?") + t.jsonp + "=" + f),
            (t.converters["script json"] = function () {
              return e || i.error(f + " was not called"), e[0];
            }),
            (t.dataTypes[0] = "json"),
            (o = n[f]),
            (n[f] = function () {
              e = arguments;
            }),
            u.always(function () {
              (n[f] = o),
                t[f] && ((t.jsonpCallback = r.jsonpCallback), gi.push(f)),
                e && i.isFunction(o) && o(e[0]),
                (e = o = undefined);
            }),
            "script"
          );
      }),
      (i.parseHTML = function (n, t, r) {
        if (!n || typeof n != "string") return null;
        typeof t == "boolean" && ((r = t), (t = !1)), (t = t || u);
        var f = er.exec(n),
          e = !r && [];
        return f
          ? [t.createElement(f[1])]
          : ((f = i.buildFragment([n], t, e)),
            e && e.length && i(e).remove(),
            i.merge([], f.childNodes));
      }),
      (nr = i.fn.load),
      (i.fn.load = function (n, t, r) {
        if (typeof n != "string" && nr) return nr.apply(this, arguments);
        var u,
          o,
          s,
          f = this,
          e = n.indexOf(" ");
        return (
          e >= 0 && ((u = n.slice(e, n.length)), (n = n.slice(0, e))),
          i.isFunction(t)
            ? ((r = t), (t = undefined))
            : t && typeof t == "object" && (s = "POST"),
          f.length > 0 &&
            i
              .ajax({ url: n, type: s, dataType: "html", data: t })
              .done(function (n) {
                (o = arguments),
                  f.html(u ? i("<div>").append(i.parseHTML(n)).find(u) : n);
              })
              .complete(
                r &&
                  function (n, t) {
                    f.each(r, o || [n.responseText, t, n]);
                  }
              ),
          this
        );
      }),
      (i.expr.filters.animated = function (n) {
        return i.grep(i.timers, function (t) {
          return n === t.elem;
        }).length;
      }),
      (tr = n.document.documentElement),
      (i.offset = {
        setOffset: function (n, t, r) {
          var e,
            o,
            s,
            h,
            u,
            c,
            v,
            l = i.css(n, "position"),
            a = i(n),
            f = {};
          l === "static" && (n.style.position = "relative"),
            (u = a.offset()),
            (s = i.css(n, "top")),
            (c = i.css(n, "left")),
            (v =
              (l === "absolute" || l === "fixed") &&
              i.inArray("auto", [s, c]) > -1),
            v
              ? ((e = a.position()), (h = e.top), (o = e.left))
              : ((h = parseFloat(s) || 0), (o = parseFloat(c) || 0)),
            i.isFunction(t) && (t = t.call(n, r, u)),
            t.top != null && (f.top = t.top - u.top + h),
            t.left != null && (f.left = t.left - u.left + o),
            "using" in t ? t.using.call(n, f) : a.css(f);
        },
      }),
      i.fn.extend({
        offset: function (n) {
          if (arguments.length)
            return n === undefined
              ? this
              : this.each(function (t) {
                  i.offset.setOffset(this, n, t);
                });
          var t,
            f,
            u = { top: 0, left: 0 },
            r = this[0],
            e = r && r.ownerDocument;
          if (e)
            return ((t = e.documentElement), !i.contains(t, r))
              ? u
              : (typeof r.getBoundingClientRect !== o &&
                  (u = r.getBoundingClientRect()),
                (f = bf(e)),
                {
                  top:
                    u.top + (f.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                  left:
                    u.left +
                    (f.pageXOffset || t.scrollLeft) -
                    (t.clientLeft || 0),
                });
        },
        position: function () {
          if (this[0]) {
            var n,
              r,
              t = { top: 0, left: 0 },
              u = this[0];
            return (
              i.css(u, "position") === "fixed"
                ? (r = u.getBoundingClientRect())
                : ((n = this.offsetParent()),
                  (r = this.offset()),
                  i.nodeName(n[0], "html") || (t = n.offset()),
                  (t.top += i.css(n[0], "borderTopWidth", !0)),
                  (t.left += i.css(n[0], "borderLeftWidth", !0))),
              {
                top: r.top - t.top - i.css(u, "marginTop", !0),
                left: r.left - t.left - i.css(u, "marginLeft", !0),
              }
            );
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var n = this.offsetParent || tr;
              n && !i.nodeName(n, "html") && i.css(n, "position") === "static";

            )
              n = n.offsetParent;
            return n || tr;
          });
        },
      }),
      i.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (n, t) {
          var r = /Y/.test(t);
          i.fn[n] = function (u) {
            return b(
              this,
              function (n, u, f) {
                var e = bf(n);
                if (f === undefined)
                  return e
                    ? t in e
                      ? e[t]
                      : e.document.documentElement[u]
                    : n[u];
                e
                  ? e.scrollTo(
                      r ? i(e).scrollLeft() : f,
                      r ? f : i(e).scrollTop()
                    )
                  : (n[u] = f);
              },
              n,
              u,
              arguments.length,
              null
            );
          };
        }
      ),
      i.each(["top", "left"], function (n, t) {
        i.cssHooks[t] = vu(r.pixelPosition, function (n, r) {
          if (r)
            return (r = d(n, t)), yt.test(r) ? i(n).position()[t] + "px" : r;
        });
      }),
      i.each({ Height: "height", Width: "width" }, function (n, t) {
        i.each(
          { padding: "inner" + n, content: t, "": "outer" + n },
          function (r, u) {
            i.fn[u] = function (u, f) {
              var e = arguments.length && (r || typeof u != "boolean"),
                o = r || (u === !0 || f === !0 ? "margin" : "border");
              return b(
                this,
                function (t, r, u) {
                  var f;
                  return i.isWindow(t)
                    ? t.document.documentElement["client" + n]
                    : t.nodeType === 9
                    ? ((f = t.documentElement),
                      Math.max(
                        t.body["scroll" + n],
                        f["scroll" + n],
                        t.body["offset" + n],
                        f["offset" + n],
                        f["client" + n]
                      ))
                    : u === undefined
                    ? i.css(t, r, o)
                    : i.style(t, r, u, o);
                },
                t,
                e ? u : undefined,
                e,
                null
              );
            };
          }
        );
      }),
      (i.fn.size = function () {
        return this.length;
      }),
      (i.fn.andSelf = i.fn.addBack),
      typeof define == "function" &&
        define.amd &&
        define("jquery", [], function () {
          return i;
        }),
      (kf = n.jQuery),
      (df = n.$),
      (i.noConflict = function (t) {
        return (
          n.$ === i && (n.$ = df), t && n.jQuery === i && (n.jQuery = kf), i
        );
      }),
      typeof t === o && (n.jQuery = n.$ = i),
      i
    );
  }),
  typeof jQuery == "undefined")
)
  throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (n) {
  "use strict";
  var t = n.fn.jquery.split(" ")[0].split(".");
  if (
    (t[0] < 2 && t[1] < 9) ||
    (t[0] == 1 && t[1] == 9 && t[2] < 1) ||
    t[0] > 3
  )
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4"
    );
})(jQuery),
  +(function (n) {
    "use strict";
    function r(t) {
      var i,
        r =
          t.attr("data-target") ||
          ((i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
      return n(r);
    }
    function i(i) {
      return this.each(function () {
        var u = n(this),
          r = u.data("bs.collapse"),
          f = n.extend({}, t.DEFAULTS, u.data(), typeof i == "object" && i);
        !r && f.toggle && /show|hide/.test(i) && (f.toggle = !1),
          r || u.data("bs.collapse", (r = new t(this, f))),
          typeof i == "string" && r[i]();
      });
    }
    var t = function (i, r) {
        (this.$element = n(i)),
          (this.options = n.extend({}, t.DEFAULTS, r)),
          (this.$trigger = n(
            '[data-toggle="collapse"][href="#' +
              i.id +
              '"],[data-toggle="collapse"][data-target="#' +
              i.id +
              '"]'
          )),
          (this.transitioning = null),
          this.options.parent
            ? (this.$parent = this.getParent())
            : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
          this.options.toggle && this.toggle();
      },
      u;
    (t.VERSION = "3.3.7"),
      (t.TRANSITION_DURATION = 350),
      (t.DEFAULTS = { toggle: !0 }),
      (t.prototype.dimension = function () {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height";
      }),
      (t.prototype.show = function () {
        var f, r, e, u, o, s;
        if (
          !this.transitioning &&
          !this.$element.hasClass("in") &&
          ((r =
            this.$parent &&
            this.$parent.children(".panel").children(".in, .collapsing")),
          !r ||
            !r.length ||
            ((f = r.data("bs.collapse")), !f || !f.transitioning)) &&
          ((e = n.Event("show.bs.collapse")),
          this.$element.trigger(e),
          !e.isDefaultPrevented())
        ) {
          if (
            (r &&
              r.length &&
              (i.call(r, "hide"), f || r.data("bs.collapse", null)),
            (u = this.dimension()),
            this.$element
              .removeClass("collapse")
              .addClass("collapsing")
              [u](0)
              .attr("aria-expanded", !0),
            this.$trigger.removeClass("collapsed").attr("aria-expanded", !0),
            (this.transitioning = 1),
            (o = function () {
              this.$element
                .removeClass("collapsing")
                .addClass("collapse in")
                [u](""),
                (this.transitioning = 0),
                this.$element.trigger("shown.bs.collapse");
            }),
            !n.support.transition)
          )
            return o.call(this);
          (s = n.camelCase(["scroll", u].join("-"))),
            this.$element
              .one("bsTransitionEnd", n.proxy(o, this))
              .emulateTransitionEnd(t.TRANSITION_DURATION)
              [u](this.$element[0][s]);
        }
      }),
      (t.prototype.hide = function () {
        var r, i, u;
        if (
          !this.transitioning &&
          this.$element.hasClass("in") &&
          ((r = n.Event("hide.bs.collapse")),
          this.$element.trigger(r),
          !r.isDefaultPrevented())
        ) {
          if (
            ((i = this.dimension()),
            this.$element[i](this.$element[i]())[0].offsetHeight,
            this.$element
              .addClass("collapsing")
              .removeClass("collapse in")
              .attr("aria-expanded", !1),
            this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
            (this.transitioning = 1),
            (u = function () {
              (this.transitioning = 0),
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse")
                  .trigger("hidden.bs.collapse");
            }),
            !n.support.transition)
          )
            return u.call(this);
          this.$element[i](0)
            .one("bsTransitionEnd", n.proxy(u, this))
            .emulateTransitionEnd(t.TRANSITION_DURATION);
        }
      }),
      (t.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      }),
      (t.prototype.getParent = function () {
        return n(this.options.parent)
          .find(
            '[data-toggle="collapse"][data-parent="' +
              this.options.parent +
              '"]'
          )
          .each(
            n.proxy(function (t, i) {
              var u = n(i);
              this.addAriaAndCollapsedClass(r(u), u);
            }, this)
          )
          .end();
      }),
      (t.prototype.addAriaAndCollapsedClass = function (n, t) {
        var i = n.hasClass("in");
        n.attr("aria-expanded", i),
          t.toggleClass("collapsed", !i).attr("aria-expanded", i);
      }),
      (u = n.fn.collapse),
      (n.fn.collapse = i),
      (n.fn.collapse.Constructor = t),
      (n.fn.collapse.noConflict = function () {
        return (n.fn.collapse = u), this;
      });
    n(document).on(
      "click.bs.collapse.data-api",
      '[data-toggle="collapse"]',
      function (t) {
        var u = n(this);
        u.attr("data-target") || t.preventDefault();
        var f = r(u),
          e = f.data("bs.collapse"),
          o = e ? "toggle" : u.data();
        i.call(f, o);
      }
    );
  })(jQuery),
  +(function (n) {
    "use strict";
    function t() {
      var i = document.createElement("bootstrap"),
        t = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        },
        n;
      for (n in t) if (i.style[n] !== undefined) return { end: t[n] };
      return !1;
    }
    (n.fn.emulateTransitionEnd = function (t) {
      var i = !1,
        u = this,
        r;
      n(this).one("bsTransitionEnd", function () {
        i = !0;
      });
      return (
        (r = function () {
          i || n(u).trigger(n.support.transition.end);
        }),
        setTimeout(r, t),
        this
      );
    }),
      n(function () {
        ((n.support.transition = t()), n.support.transition) &&
          (n.event.special.bsTransitionEnd = {
            bindType: n.support.transition.end,
            delegateType: n.support.transition.end,
            handle: function (t) {
              if (n(t.target).is(this))
                return t.handleObj.handler.apply(this, arguments);
            },
          });
      });
  })(jQuery),
  (function (t) {
    var r = function (n, i) {
      (this.$form = t(n)),
        (this.options = t.extend({}, r.DEFAULT_OPTIONS, i)),
        (this.$invalidField = null),
        (this.$submitButton = null),
        (this.STATUS_NOT_VALIDATED = "NOT_VALIDATED"),
        (this.STATUS_VALIDATING = "VALIDATING"),
        (this.STATUS_INVALID = "INVALID"),
        (this.STATUS_VALID = "VALID");
      var u = (function () {
          for (
            var n = 3, t = document.createElement("div"), i = t.all || [];
            (t.innerHTML = "<!--[if gt IE " + ++n + "]><br><![endif]-->"), i[0];

          );
          return n > 4 ? n : !n;
        })(),
        f = document.createElement("div");
      (this._changeEvent = u === 9 || !("oninput" in f) ? "keyup" : "input"),
        (this._submitIfValid = null),
        this._init();
    };
    (r.DEFAULT_OPTIONS = {
      elementClass: "bv-form",
      message: "This value is not valid",
      threshold: null,
      excluded: [":disabled", ":hidden", ":not(:visible)"],
      feedbackIcons: { valid: null, invalid: null, validating: null },
      submitButtons: '[type="submit"]',
      submitHandler: null,
      submitHandlerCaller: null,
      live: "enabled",
      fields: null,
    }),
      (r.prototype = {
        constructor: r,
        _init: function () {
          var u = this,
            o = {
              excluded: this.$form.attr("data-bv-excluded"),
              trigger: this.$form.attr("data-bv-trigger"),
              message: this.$form.attr("data-bv-message"),
              submitButtons: this.$form.attr("data-bv-submitbuttons"),
              threshold: this.$form.attr("data-bv-threshold"),
              live: this.$form.attr("data-bv-live"),
              fields: {},
              feedbackIcons: {
                valid: this.$form.attr("data-bv-feedbackicons-valid"),
                invalid: this.$form.attr("data-bv-feedbackicons-invalid"),
                validating: this.$form.attr("data-bv-feedbackicons-validating"),
              },
            },
            n,
            i,
            e,
            h,
            r,
            s,
            f,
            c;
          this.$form
            .attr("novalidate", "novalidate")
            .addClass(this.options.elementClass)
            .on("submit.bv", function (n) {
              n.preventDefault(), u.validate();
            })
            .on("click", this.options.submitButtons, function () {
              (u.$submitButton = t(this)), (u._submitIfValid = !0);
            })
            .find("[name], [data-bv-field]")
            .each(function () {
              var c = t(this),
                a,
                l,
                v;
              if (!u._isExcluded(c)) {
                (a = c.attr("name") || c.attr("data-bv-field")), (l = {});
                for (i in t.fn.bootstrapValidator.validators)
                  if (
                    ((n = t.fn.bootstrapValidator.validators[i]),
                    (e = c.attr("data-bv-" + i.toLowerCase()) + ""),
                    (f =
                      "function" == typeof n.enableByHtml5
                        ? n.enableByHtml5(t(this))
                        : null),
                    (f && e != "false") ||
                      (f !== !0 && ("" == e || "true" == e)))
                  ) {
                    (n.html5Attributes = n.html5Attributes || {
                      message: "message",
                    }),
                      (l[i] = t.extend({}, f == !0 ? {} : f, l[i]));
                    for (s in n.html5Attributes)
                      (h = n.html5Attributes[s]),
                        (r = c.attr("data-bv-" + i.toLowerCase() + "-" + s)),
                        r &&
                          ("true" == r ? (r = !0) : "false" == r && (r = !1),
                          (l[i][h] = r));
                  }
                (v = {
                  trigger: c.attr("data-bv-trigger"),
                  message: c.attr("data-bv-message"),
                  container: c.attr("data-bv-container"),
                  selector: c.attr("data-bv-selector"),
                  threshold: c.attr("data-bv-threshold"),
                  validators: l,
                }),
                  t.isEmptyObject(v.validators) ||
                    t.isEmptyObject(v) ||
                    (c.attr("data-bv-field", a),
                    (o.fields[a] = t.extend({}, v, o.fields[a])));
              }
            })
            .end()
            .find(this.options.submitButtons)
            .each(function () {
              t("<input/>")
                .attr("type", "hidden")
                .attr("name", t(this).attr("name"))
                .val(t(this).val())
                .appendTo(u.$form);
            }),
            (this.options = t.extend(!0, this.options, o));
          for (c in this.options.fields) this._initField(c);
          this.setLiveMode(this.options.live);
        },
        _initField: function (n) {
          var u, r, e, a;
          if (
            this.options.fields[n] != null &&
            this.options.fields[n].validators != null
          ) {
            if (((u = this.getFieldElements(n)), u == null)) {
              delete this.options.fields[n];
              return;
            }
            for (r in this.options.fields[n].validators)
              t.fn.bootstrapValidator.validators[r] ||
                delete this.options.fields[n].validators[r];
            var f = this,
              o = u.attr("type"),
              v =
                "radio" == o ||
                "checkbox" == o ||
                "file" == o ||
                "SELECT" == u[0].tagName
                  ? "change"
                  : f._changeEvent,
              s = u.length,
              h = s == 1 || "radio" == o || "checkbox" == o;
            for (e = 0; e < s; e++) {
              var i = t(u[e]),
                c = i.parents(".form-group"),
                l = this.options.fields[n].container
                  ? c.find(this.options.fields[n].container)
                  : this._getMessageContainer(i);
              i.attr("data-bv-field") || i.attr("data-bv-field", n);
              i.on(v + ".update.bv", function () {
                (f._submitIfValid = !1),
                  h
                    ? f.updateStatus(n, f.STATUS_NOT_VALIDATED, null)
                    : f.updateElementStatus(
                        t(this),
                        f.STATUS_NOT_VALIDATED,
                        null
                      );
              });
              i.data("bv.messages", l);
              for (r in this.options.fields[n].validators)
                i.data("bv.result." + r, this.STATUS_NOT_VALIDATED),
                  (h && e != s - 1) ||
                    t("<small/>")
                      .css("display", "none")
                      .attr("data-bv-validator", r)
                      .attr("data-bv-validator-for", n)
                      .html(
                        this.options.fields[n].validators[r].message ||
                          this.options.fields[n].message ||
                          this.options.message
                      )
                      .addClass("help-block")
                      .appendTo(l);
              this.options.feedbackIcons &&
                this.options.feedbackIcons.validating &&
                this.options.feedbackIcons.invalid &&
                this.options.feedbackIcons.valid &&
                (!h || e == s - 1) &&
                (c.addClass("has-feedback"),
                (a = t("<i/>")
                  .css("display", "none")
                  .addClass("form-control-feedback")
                  .attr("data-bv-icon-for", n)
                  .insertAfter(i)),
                c.find("label").length == 0 && a.css("top", "0"));
            }
            this.options.fields[n].enabled == null &&
              (this.options.fields[n].enabled = !0);
          }
        },
        _getMessageContainer: function (n) {
          var i = n.parent(),
            t,
            u,
            r;
          if (i.hasClass("form-group")) return i;
          if (((t = i.attr("class")), !t)) return this._getMessageContainer(i);
          for (t = t.split(" "), u = t.length, r = 0; r < u; r++)
            if (
              /^col-(xs|sm|md|lg)-\d+$/.test(t[r]) ||
              /^col-(xs|sm|md|lg)-offset-\d+$/.test(t[r])
            )
              return i;
          return this._getMessageContainer(i);
        },
        _submit: function () {
          if (!this.isValid()) {
            if (
              ("submitted" == this.options.live && this.setLiveMode("enabled"),
              this.$invalidField)
            ) {
              var n = this.$invalidField.parents(".tab-pane"),
                i;
              n &&
                (i = n.attr("id")) &&
                t('a[href="#' + i + '"][data-toggle="tab"]').trigger(
                  "click.bs.tab.data-api"
                ),
                this.$invalidField.focus();
            }
            return;
          }
          this.options.submitHandler &&
          "function" == typeof this.options.submitHandler
            ? this.options.submitHandler.call(
                this,
                this,
                this.$form,
                this.$submitButton
              )
            : this.disableSubmitButtons(!0).defaultSubmit();
        },
        _isExcluded: function (n) {
          var r, i;
          if (this.options.excluded)
            for (
              "string" == typeof this.options.excluded &&
                (this.options.excluded = t.map(
                  this.options.excluded.split(","),
                  function (n) {
                    return t.trim(n);
                  }
                )),
                r = this.options.excluded.length,
                i = 0;
              i < r;
              i++
            )
              if (
                ("string" == typeof this.options.excluded[i] &&
                  n.is(this.options.excluded[i])) ||
                ("function" == typeof this.options.excluded[i] &&
                  this.options.excluded[i].call(this, n, this) == !0)
              )
                return !0;
          return !1;
        },
        _exceedThreshold: function (n) {
          var u = n.attr("data-bv-field"),
            t = this.options.fields[u].threshold || this.options.threshold,
            i,
            r;
          return t
            ? ((i = n.attr("type")),
              (r =
                [
                  "button",
                  "checkbox",
                  "file",
                  "hidden",
                  "image",
                  "radio",
                  "reset",
                  "submit",
                ].indexOf(i) != -1),
              r || n.val().length >= t)
            : !0;
        },
        getFieldElements: function (n) {
          var i = this.options.fields[n].selector
            ? t(this.options.fields[n].selector)
            : this.$form.find('[name="' + n + '"]');
          return i.length == 0 ? null : i;
        },
        setLiveMode: function (n) {
          var i, r;
          if (((this.options.live = n), "submitted" == n)) return this;
          i = this;
          for (r in this.options.fields)
            (function (u) {
              var f = i.getFieldElements(u),
                o;
              if (f) {
                var e = f.attr("type"),
                  s = f.length,
                  c = s == 1 || "radio" == e || "checkbox" == e,
                  l =
                    i.options.fields[r].trigger ||
                    i.options.trigger ||
                    ("radio" == e ||
                    "checkbox" == e ||
                    "file" == e ||
                    "SELECT" == f[0].tagName
                      ? "change"
                      : i._changeEvent),
                  h = t
                    .map(l.split(" "), function (n) {
                      return n + ".live.bv";
                    })
                    .join(" ");
                for (o = 0; o < s; o++)
                  "enabled" == n
                    ? t(f[o]).on(h, function () {
                        i._exceedThreshold(t(this)) &&
                          (c
                            ? i.validateField(u)
                            : i.validateFieldElement(t(this), !1));
                      })
                    : t(f[o]).off(h);
              }
            })(r);
          return this;
        },
        disableSubmitButtons: function (n) {
          return (
            n
              ? this.options.live != "disabled" &&
                this.$form
                  .find(this.options.submitButtons)
                  .attr("disabled", "disabled")
              : this.$form
                  .find(this.options.submitButtons)
                  .removeAttr("disabled"),
            this
          );
        },
        validate: function () {
          if (!this.options.fields) return this;
          this.disableSubmitButtons(!0);
          for (var n in this.options.fields) this.validateField(n);
          return this.$submitButton && this._submit(), this;
        },
        validateField: function (n) {
          for (
            var r = this.getFieldElements(n),
              u = r.attr("type"),
              f = "radio" == u || "checkbox" == u ? 1 : r.length,
              i = 0;
            i < f;
            i++
          )
            this.validateFieldElement(t(r[i]), f == 1);
          return this;
        },
        validateFieldElement: function (n, i) {
          var u = this,
            e = n.attr("data-bv-field"),
            s = this.options.fields[e].validators,
            r,
            f,
            o;
          if (!this.options.fields[e].enabled || this._isExcluded(n))
            return this;
          for (r in s)
            if (
              (n.data("bv.dfs." + r) && n.data("bv.dfs." + r).reject(),
              (o = n.data("bv.result." + r)),
              o != this.STATUS_VALID && o != this.STATUS_INVALID) &&
              (n.data("bv.result." + r, this.STATUS_VALIDATING),
              (f = t.fn.bootstrapValidator.validators[r].validate(
                this,
                n,
                s[r]
              )),
              "object" == typeof f
                ? (i
                    ? this.updateStatus(e, this.STATUS_VALIDATING, r)
                    : this.updateElementStatus(n, this.STATUS_VALIDATING, r),
                  n.data("bv.dfs." + r, f),
                  f.done(function (n, t, r) {
                    n.removeData("bv.dfs." + t),
                      i
                        ? u.updateStatus(
                            n.attr("data-bv-field"),
                            r ? u.STATUS_VALID : u.STATUS_INVALID,
                            t
                          )
                        : u.updateElementStatus(
                            n,
                            r ? u.STATUS_VALID : u.STATUS_INVALID,
                            t
                          ),
                      r && u._submitIfValid == !0 && u._submit();
                  }))
                : "boolean" == typeof f &&
                  (i
                    ? this.updateStatus(
                        e,
                        f ? this.STATUS_VALID : this.STATUS_INVALID,
                        r
                      )
                    : this.updateElementStatus(
                        n,
                        f ? this.STATUS_VALID : this.STATUS_INVALID,
                        r
                      )),
              !f)
            )
              break;
          return this;
        },
        updateStatus: function (n, i, r) {
          for (
            var f = this.getFieldElements(n),
              e = f.attr("type"),
              o = "radio" == e || "checkbox" == e ? 1 : f.length,
              u = 0;
            u < o;
            u++
          )
            this.updateElementStatus(t(f[u]), i, r);
          return this;
        },
        updateElementStatus: function (n, i, r) {
          var l = this,
            a = n.attr("data-bv-field"),
            o = n.parents(".form-group"),
            p = n.data("bv.messages"),
            u = p.find(".help-block[data-bv-validator]"),
            e = o.find('.form-control-feedback[data-bv-icon-for="' + a + '"]'),
            v,
            s,
            y,
            f,
            h,
            c;
          if (r) n.data("bv.result." + r, i);
          else
            for (v in this.options.fields[a].validators)
              n.data("bv.result." + v, i);
          (s = n.parents(".tab-pane")),
            s &&
              (y = s.attr("id")) &&
              (f = t('a[href="#' + y + '"][data-toggle="tab"]').parent());
          switch (i) {
            case this.STATUS_VALIDATING:
              this.disableSubmitButtons(!0),
                o.removeClass("has-success").removeClass("has-error"),
                r
                  ? u
                      .filter('.help-block[data-bv-validator="' + r + '"]')
                      .hide()
                  : u.hide(),
                e &&
                  e
                    .removeClass(this.options.feedbackIcons.valid)
                    .removeClass(this.options.feedbackIcons.invalid)
                    .addClass(this.options.feedbackIcons.validating)
                    .show(),
                f &&
                  f.removeClass("bv-tab-success").removeClass("bv-tab-error");
              break;
            case this.STATUS_INVALID:
              this.disableSubmitButtons(!0),
                o.removeClass("has-success").addClass("has-error"),
                r
                  ? u.filter('[data-bv-validator="' + r + '"]').show()
                  : u.show(),
                e &&
                  e
                    .removeClass(this.options.feedbackIcons.valid)
                    .removeClass(this.options.feedbackIcons.validating)
                    .addClass(this.options.feedbackIcons.invalid)
                    .show(),
                f && f.removeClass("bv-tab-success").addClass("bv-tab-error");
              break;
            case this.STATUS_VALID:
              r ? u.filter('[data-bv-validator="' + r + '"]').hide() : u.hide(),
                (h =
                  u.filter(function () {
                    var i = t(this).css("display"),
                      r = t(this).attr("data-bv-validator");
                    return (
                      "block" == i || n.data("bv.result." + r) != l.STATUS_VALID
                    );
                  }).length == 0),
                this.disableSubmitButtons(!h),
                e &&
                  e
                    .removeClass(this.options.feedbackIcons.invalid)
                    .removeClass(this.options.feedbackIcons.validating)
                    .removeClass(this.options.feedbackIcons.valid)
                    .addClass(
                      h
                        ? this.options.feedbackIcons.valid
                        : this.options.feedbackIcons.invalid
                    )
                    .show(),
                (c = function (i) {
                  return (
                    i
                      .find(".help-block[data-bv-validator]")
                      .filter(function () {
                        var r = t(this).css("display"),
                          i = t(this).attr("data-bv-validator");
                        return (
                          "block" == r ||
                          (n.data("bv.result." + i) &&
                            n.data("bv.result." + i) != l.STATUS_VALID)
                        );
                      }).length == 0
                  );
                }),
                o
                  .removeClass("has-error has-success")
                  .addClass(c(o) ? "has-success" : "has-error"),
                f &&
                  f
                    .removeClass("bv-tab-success")
                    .removeClass("bv-tab-error")
                    .addClass(c(s) ? "bv-tab-success" : "bv-tab-error");
              break;
            case this.STATUS_NOT_VALIDATED:
            default:
              this.disableSubmitButtons(!1),
                o.removeClass("has-success").removeClass("has-error"),
                r
                  ? u
                      .filter('.help-block[data-bv-validator="' + r + '"]')
                      .hide()
                  : u.hide(),
                e &&
                  e
                    .removeClass(this.options.feedbackIcons.valid)
                    .removeClass(this.options.feedbackIcons.invalid)
                    .removeClass(this.options.feedbackIcons.validating)
                    .hide(),
                f &&
                  f.removeClass("bv-tab-success").removeClass("bv-tab-error");
          }
          return this;
        },
        isValidField: function (r) {
          for (
            fields = this.getFieldElements(r),
              type = fields.attr("type"),
              n = "radio" == type || "checkbox" == type ? 1 : fields.length,
              i = 0;
            i < n;
            i++
          )
            if ((($field = t(fields[i])), !this._isExcluded($field)))
              for (validatorName in this.options.fields[r].validators) {
                if (
                  ((status = $field.data("bv.result." + validatorName)),
                  status == this.STATUS_NOT_VALIDATED ||
                    status == this.STATUS_VALIDATING)
                )
                  return !1;
                if (status == this.STATUS_INVALID)
                  return (this.$invalidField = $field), !1;
              }
          return !0;
        },
        isValid: function () {
          var i, n, r, e, u, o, s, f;
          for (n in this.options.fields)
            if (
              this.options.fields[n] != null &&
              this.options.fields[n].enabled
            )
              for (
                i = this.getFieldElements(n),
                  e = i.attr("type"),
                  s = "radio" == e || "checkbox" == e ? 1 : i.length,
                  f = 0;
                f < s;
                f++
              )
                if (((r = t(i[f])), !this._isExcluded(r)))
                  for (o in this.options.fields[n].validators) {
                    if (
                      ((u = r.data("bv.result." + o)),
                      u == this.STATUS_NOT_VALIDATED ||
                        u == this.STATUS_VALIDATING)
                    )
                      return !1;
                    if (u == this.STATUS_INVALID)
                      return (this.$invalidField = r), !1;
                  }
          return !0;
        },
        defaultSubmit: function () {
          this.$form.off("submit.bv").submit();
        },
        resetForm: function (n) {
          var r, i, e, f, o, u;
          for (r in this.options.fields) {
            for (i = this.getFieldElements(r), e = i.length, u = 0; u < e; u++)
              for (o in this.options.fields[r].validators)
                t(i[u]).removeData("bv.dfs." + o);
            this.updateStatus(r, this.STATUS_NOT_VALIDATED, null),
              n &&
                ((f = i.attr("type")),
                "radio" == f || "checkbox" == f
                  ? i.removeAttr("checked").removeAttr("selected")
                  : i.val(""));
          }
          return (
            (this.$invalidField = null),
            (this.$submitButton = null),
            this.disableSubmitButtons(!1),
            this
          );
        },
        enableFieldValidators: function (n, t) {
          return (
            (this.options.fields[n].enabled = t),
            this.updateStatus(n, this.STATUS_NOT_VALIDATED, null),
            this
          );
        },
      }),
      (t.fn.bootstrapValidator = function (n) {
        var i = arguments;
        return this.each(function () {
          var f = t(this),
            u = f.data("bootstrapValidator"),
            e = "object" == typeof n && n;
          u || ((u = new r(this, e)), f.data("bootstrapValidator", u)),
            "string" == typeof n &&
              u[n].apply(u, Array.prototype.slice.call(i, 1));
        });
      }),
      (t.fn.bootstrapValidator.validators = {}),
      (t.fn.bootstrapValidator.Constructor = r),
      (t.fn.bootstrapValidator.helpers = {
        date: function (n, t, i, r) {
          var u;
          if (
            n < 1e3 ||
            n > 9999 ||
            t == 0 ||
            t > 12 ||
            ((u = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]),
            (n % 400 == 0 || (n % 100 != 0 && n % 4 == 0)) && (u[1] = 29),
            i < 0 || i > u[t - 1])
          )
            return !1;
          if (r === !0) {
            var f = new Date(),
              e = f.getFullYear(),
              o = f.getMonth(),
              s = f.getDate();
            return (
              n < e || (n == e && t - 1 < o) || (n == e && t - 1 == o && i < s)
            );
          }
          return !0;
        },
      });
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.callback = {
      validate: function (t, i, r) {
        var f = i.val(),
          u;
        return r.callback && "function" == typeof r.callback
          ? ((u = new n.Deferred()),
            u.resolve(i, "callback", r.callback.call(this, f, t)),
            u)
          : !0;
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.date = {
      html5Attributes: { message: "message", format: "format" },
      validate: function (t, i, r) {
        var b = i.val(),
          v;
        if (b == "") return !0;
        r.format = r.format || "MM/DD/YYYY";
        var o = r.format.split(" "),
          c = o[0],
          l = o.length > 1 ? o[1] : null,
          k = o.length > 2 ? o[2] : null,
          a = b.split(" "),
          f = a[0],
          u = a.length > 1 ? a[1] : null;
        if (
          o.length != a.length ||
          i.val().length != 10 ||
          ((v = f.indexOf("/") != -1 ? "/" : f.indexOf("-") != -1 ? "-" : null),
          v == null)
        )
          return !1;
        (f = f.split(v)), (c = c.split(v));
        var y = f[c.indexOf("YYYY")],
          p = f[c.indexOf("MM")],
          w = f[c.indexOf("DD")],
          s = null,
          e = null,
          h = null;
        return l &&
          (((l = l.split(":")), (u = u.split(":")), l.length != u.length) ||
            ((e = u.length > 0 ? u[0] : null),
            (s = u.length > 1 ? u[1] : null),
            (h = u.length > 2 ? u[2] : null),
            h && ((h = parseInt(h, 10)), h < 0 || h > 60)) ||
            (e && ((e = parseInt(e, 10)), e < 0 || e >= 24 || (k && e > 12))) ||
            (s && ((s = parseInt(s, 10)), s < 0 || s > 59)))
          ? !1
          : ((w = parseInt(w, 10)),
            (p = parseInt(p, 10)),
            (y = parseInt(y, 10)),
            n.fn.bootstrapValidator.helpers.date(y, p, w));
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.different = {
      html5Attributes: { message: "message", field: "field" },
      validate: function (n, t, i) {
        var u = t.val(),
          r;
        return u == ""
          ? !0
          : ((r = n.getFieldElements(i.field)), r == null)
          ? !0
          : u != r.val()
          ? (n.updateStatus(i.field, n.STATUS_VALID, "different"), !0)
          : !1;
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.emailAddress = {
      enableByHtml5: function (n) {
        return "email" == n.attr("type");
      },
      validate: function (n, t) {
        var r = t.val(),
          u;
        return r == ""
          ? !0
          : ((u = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            u.test(r));
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.identical = {
      html5Attributes: { message: "message", field: "field" },
      validate: function (n, t, i) {
        var u = t.val(),
          r;
        return u == ""
          ? !0
          : ((r = n.getFieldElements(i.field)), r == null)
          ? !0
          : u == r.val()
          ? (n.updateStatus(i.field, n.STATUS_VALID, "identical"), !0)
          : !1;
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.notEmpty = {
      enableByHtml5: function (n) {
        var t = n.attr("required") + "";
        return "required" == t || "true" == t;
      },
      validate: function (t, i) {
        var u = i.attr("type");
        return "radio" == u || "checkbox" == u
          ? t.getFieldElements(i.attr("data-bv-field")).filter(":checked")
              .length > 0
          : n.trim(i.val()) != "";
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.phone = {
      html5Attributes: { message: "message", country: "country" },
      validate: function (n, t, i) {
        var r = t.val(),
          u;
        if (r == "") return !0;
        u = (i.country || "US").toUpperCase();
        switch (u) {
          case "US":
          default:
            return (
              (r = r.replace(/\D/g, "")),
              /^(?:(1\-?)|(\+1 ?))?\(?(\d{3})[\)\-\.]?(\d{3})[\-\.]?(\d{4})$/.test(
                r
              ) && r.length == 10
            );
        }
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.regexp = {
      html5Attributes: { message: "message", regexp: "regexp" },
      enableByHtml5: function (n) {
        var t = n.attr("pattern");
        return t ? { regexp: t } : !1;
      },
      validate: function (n, t, i) {
        var r = t.val(),
          u;
        return r == ""
          ? !0
          : ((u =
              "string" == typeof i.regexp ? new RegExp(i.regexp) : i.regexp),
            u.test(r));
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.stringLength = {
      html5Attributes: { message: "message", min: "min", max: "max" },
      enableByHtml5: function (n) {
        var t = n.attr("maxlength");
        return t ? { max: parseInt(t, 10) } : !1;
      },
      validate: function (t, i, r) {
        var f = i.val(),
          u;
        return f == ""
          ? !0
          : ((u = n.trim(f).length),
            (r.min && u < r.min) || (r.max && u > r.max))
          ? !1
          : !0;
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.zipCode = {
      html5Attributes: { message: "message", country: "country" },
      validate: function (n, t, i) {
        var r = t.val(),
          u;
        if (r == "" || !i.country) return !0;
        u = (i.country || "US").toUpperCase();
        switch (u) {
          case "BE":
            return /^\d{4}$/.test(r);
          case "CA":
            return /(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}\s?[0-9]{1}(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}/i.test(
              r
            );
          case "DK":
            return /^(DK(-|\s)?)?\d{4}$/i.test(r);
          case "GB":
            return this._gb(r);
          case "IT":
            return /^(I-|IT-)?\d{5}$/i.test(r);
          case "NL":
            return /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(r);
          case "SE":
            return /^(S-)?\d{3}\s?\d{2}$/i.test(r);
          case "US":
          default:
            return /^\d{4,5}([\-]\d{4})?$/.test(r);
        }
      },
      _gb: function (n) {
        for (
          var i = "[ABCDEFGHIJKLMNOPRSTUWYZ]",
            u = "[ABCDEFGHKLMNOPQRSTUVWXY]",
            e = "[ABCDEFGHJKPMNRSTUVWXY]",
            o = "[ABEHMNPRVWXY]",
            r = "[ABDEFGHJLNPQRSTUWXYZ]",
            f = [
              new RegExp(
                "^(" +
                  i +
                  "{1}" +
                  u +
                  "?[0-9]{1,2})(\\s*)([0-9]{1}" +
                  r +
                  "{2})$",
                "i"
              ),
              new RegExp(
                "^(" +
                  i +
                  "{1}[0-9]{1}" +
                  e +
                  "{1})(\\s*)([0-9]{1}" +
                  r +
                  "{2})$",
                "i"
              ),
              new RegExp(
                "^(" +
                  i +
                  "{1}" +
                  u +
                  "{1}?[0-9]{1}" +
                  o +
                  "{1})(\\s*)([0-9]{1}" +
                  r +
                  "{2})$",
                "i"
              ),
              new RegExp(
                "^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$",
                "i"
              ),
              /^(GIR)(\s*)(0AA)$/i,
              /^(BFPO)(\s*)([0-9]{1,4})$/i,
              /^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i,
              /^([A-Z]{4})(\s*)(1ZZ)$/i,
              /^(AI-2640)$/i,
            ],
            t = 0;
          t < f.length;
          t++
        )
          if (f[t].test(n)) return !0;
        return !1;
      },
    };
  })(window.jQuery),
  (function (n) {
    n.fn.bootstrapValidator.validators.updatePhoneInformationChecking = {
      validate: function (t, i) {
        var u, f, o, e;
        return Utils.Common.getCountry() === "co.uk" &&
          contextInfo.Customer.IsLoggedIn === !1
          ? !0
          : ((f = i.val()), f.length === 11)
          ? ((o = function () {
              n("#oneClickNext").find("button").attr("disabled", !0),
                n(".checkout-sticky-button").attr("disabled", !0);
            }),
            (e = function () {
              n("#oneClickNext").find("button").removeAttr("disabled"),
                n(".checkout-sticky-button").removeAttr("disabled");
            }),
            n.ajax({
              cache: !1,
              url: "/customerservices/updatemobile/",
              data: { telephone: f },
              beforeSend: function () {
                i.attr("disabled", !0).addClass("disabled"), o();
              },
              success: function (n) {
                (u = n[0].Value === !0 ? !0 : !1),
                  i.removeAttr("disabled").removeClass("disabled"),
                  e();
              },
              error: function (n, t, i) {
                console.error(
                  "AJAX on " +
                    this.url +
                    " method " +
                    this.type +
                    " status " +
                    n.status +
                    " statusText " +
                    n.statusText +
                    " error " +
                    i +
                    " response " +
                    n.responseText
                ),
                  (u = !1);
              },
              complete: function () {
                i.removeAttr("disabled").removeClass("disabled"), e();
              },
            }),
            !0)
          : u;
      },
    };
  })(window.jQuery),
  (function (n) {
    "use strict";
    function t() {}
    var i = /xyz/.test(function () {
      xyz;
    })
      ? /\b_super\b/
      : /.*/;
    (t.extend = function (n) {
      var e = this.prototype,
        u = Object.create(e),
        r,
        f;
      for (r in n)
        u[r] =
          typeof n[r] == "function" && typeof e[r] == "function" && i.test(n[r])
            ? (function (n, t) {
                return function () {
                  var r = this._super,
                    i;
                  return (
                    (this._super = e[n]),
                    (i = t.apply(this, arguments)),
                    (this._super = r),
                    i
                  );
                };
              })(r, n[r])
            : n[r];
      return (
        (f =
          typeof u.init == "function"
            ? u.hasOwnProperty("init")
              ? u.init
              : function () {
                  e.init.apply(this, arguments);
                }
            : function () {}),
        (f.prototype = u),
        (u.constructor = f),
        (f.extend = t.extend),
        f
      );
    }),
      (n.Class = t);
  })(this),
  (window.pageEvent = { loaded: "page.loaded" }),
  (Page = Class.extend({
    init: function (n, t, i, r) {
      var u = this,
        o,
        s,
        f,
        p;
      (this.$container = $("#corePage")),
        (this.$eventContainer = $("#eventContainer")),
        $.extend(this, JSON.parse($("#dataGlobal").text())),
        (this.shortCountry = this.country.replace("co.", "")),
        (this.appPath = ""),
        (this.screenSize = _LaRedoute.getScreenType());
      $(window).on("resize", function () {
        (u.screenSize = _LaRedoute.getScreenType()),
          u.$container.trigger("page.size.change");
      });
      if (
        ((this.isMobile = this.screenSize === 1),
        (this.isTablet = this.screenSize > 1 && this.screenSize < 4),
        (this.isDesktop = this.screenSize === 4),
        (this.tracking = {}),
        $.extend(this.tracking, window.wa_data),
        (this.isLogged = tc_vars.user_logged),
        (this.asyncBlocs = {}),
        (this.postInitCb = []),
        (this.state = "init"),
        (this.urlSuffixe = ".aspx"),
        (this.lang = this.getLang()),
        typeof t === varType.fn && t.apply(this),
        window.defaultBlocsAlreadyLoaded === undefined
          ? ((this.defaultListBlocks = JSON.parse(
              $("#dataDefaultListBlocks").text()
            )),
            (this.Blocs =
              typeof n == "object"
                ? $.extend(this.defaultListBlocks, n)
                : this.defaultListBlocks),
            (window.defaultBlocsAlreadyLoaded = "loaded"))
          : (this.Blocs = typeof n == "object" ? n : {}),
        delete this.defaultListBlocks,
        (o = window.pageNameJS[u.name]),
        (s = window[i]),
        (this.Model =
          typeof s === varType.fn
            ? new s(i, t)
            : new window.Model("Generic", t)),
        t || (t = {}),
        !t.isChildPage)
      ) {
        var h = "Services" + o,
          c = window[h],
          l = r || "Tracking" + o,
          a = window[l];
        (this.Services =
          typeof c === varType.fn
            ? new c(h, this)
            : new window.Services("Generic", this)),
          (this.Tracking =
            typeof a === varType.fn
              ? new a(l, this)
              : new window.Tracking("Generic", this));
      }
      if (
        (u.Model.isChildProduct || t.isChildPage || window.FinaliseTracking(),
        typeof this.Blocs == "object")
      ) {
        f = 0;
        for (f in this.Blocs)
          if (this.Blocs[f].indexOf(",") !== -1)
            this.asyncBlocs[f] = this.Blocs[f];
          else
            try {
              (this.Blocs[f] = new window[this.Blocs[f]](this, this.Blocs[f])),
                this.Blocs[f].isLoaded();
            } catch (g) {
              console.error(
                "Page.ctor : can't create blocs instance " +
                  f +
                  " for page " +
                  window.location.pathname +
                  " [" +
                  g.message +
                  "]"
              );
            }
      }
      $(window).on("load", function () {
        for (f in u.asyncBlocs) {
          var n = u.asyncBlocs[f].split(",")[0];
          (u.Blocs[f] = new window[n](u, n)), u.Blocs[f].isLoaded();
        }
        u.postInitCb.forEach(function (n) {
          n.cb.call(u, n.params);
        }),
          (u.state = "ready");
      });
      var v = !0,
        e = JSON.parse(localStorage.getItem("localPersoData")),
        y = this.isLogged !== "";
      if (e !== null) {
        var w = new Date(e.hasBeenSet),
          b = e.userLogged,
          k = new Date(),
          d = (k.getTime() - w.getTime()) / 36e5;
        d < 2 && b === y && ((v = !1), (window.perso_data = e));
      }
      if (
        contextInfo.Configuration.ConfigFlags
          .EnableGetCustomerPersonalisationData &&
        v
      ) {
        u.Model.$eventContainer.trigger(
          window.globalServiceEvent.getPersonnalisationDataRequested
        );
        u.Model.$eventContainer.on(
          window.globalServiceEvent.getPersonnalisationDataSucceeded,
          function (n, t) {
            window.perso_data = t;
            var i = t;
            (i.hasBeenSet = new Date()),
              (i.userLogged = y),
              localStorage.setItem("localPersoData", JSON.stringify(i));
          }
        );
      }
      u.Model.isChildProduct ||
        t.isChildPage ||
        ((p = u.Tracking.dataLayer.eVar6 || "CUST12345"),
        (window.kafkaNotification = function (n) {
          n = window.kafkaMock;
          var t = n.header.functionalHeader,
            i = t.businessObjectNature + "." + t.businessEventType;
          t.correlationId === p && u.Model.$eventContainer.trigger(i, [n]);
        }));
    },
    PushPostInitCallback: function (n, t) {
      typeof n == "function" &&
        (this.state === "init"
          ? this.postInitCb.push({ cb: n, params: t })
          : n.call(this, t));
    },
    waitForBlockLoad: function (n, t, i, r) {
      var f = this,
        u;
      if (typeof n == "string" && typeof i == "function") {
        if (
          ((u = this.Blocs[n]),
          $.inArray(typeof u, ["object", "undefined"]) > -1)
        )
          return i.apply(t, r);
        if (typeof u == "string") {
          u = u.replace(",async", "");
          this.$container.on(u + ".loaded", function () {
            return i.apply(t, r);
          });
        }
      }
    },
    Update: function () {
      for (i in this.Blocs) this.Blocs[i].Update();
    },
    DisplayErrorMessage: function (n, t, i) {
      var u, r, f;
      (i = i === undefined ? "default" : i),
        typeof n == "string"
          ? ((u = n), (r = $(u)))
          : ((r = n), (u = r.selector)),
        r.prev(".error-tooltip").length === 0
          ? $("<div>", { class: "error-tooltip " + i, html: t }).insertBefore(u)
          : ((f = r.prev(".error-tooltip")),
            f.removeClass().addClass("error-tooltip " + i),
            f.find("span").text("errorMessage"),
            f.slideDown(300));
    },
    HideErrorMessage: function (n) {
      var t;
      (t = typeof n == "string" ? $(n) : n),
        t.prev(".error-tooltip").slideUp(300);
    },
    DisplayPopOverMessage: function (n, t, i, r) {
      $(n)
        .attr("data-toggle", "popover")
        .popover({
          html: !0,
          trigger: "manual",
          placement: r !== undefined ? r : "top",
          content: t,
        })
        .popover("toggle"),
        setTimeout(
          function () {
            $(n).popover("hide");
          },
          i !== undefined ? i : 4e3
        );
    },
    HidePopOverMessage: function (n) {
      $(n).popover("hide");
    },
    GetCurrentPage: function () {
      return $("body").data("pagename");
    },
    getLang: function () {
      return this.countryCode.substring(0, 2);
    },
    isSite: function (n) {
      return this.siteId == n;
    },
    isSiteBE: function () {
      return this.isSite(Utils.Enum.SiteId.BE);
    },
    isSiteCH: function () {
      return this.isSite(Utils.Enum.SiteId.CH);
    },
    isSiteCOM: function () {
      return this.isSite(Utils.Enum.SiteId.COM);
    },
    isSiteES: function () {
      return this.isSite(Utils.Enum.SiteId.ES);
    },
    isSiteFR: function () {
      return this.isSite(Utils.Enum.SiteId.FR);
    },
    isSiteIT: function () {
      return this.isSite(Utils.Enum.SiteId.IT);
    },
    isSitePL: function () {
      return this.isSite(Utils.Enum.SiteId.PL);
    },
    isSitePT: function () {
      return this.isSite(Utils.Enum.SiteId.PT);
    },
    isSiteRU: function () {
      return this.isSite(Utils.Enum.SiteId.RU);
    },
    isSiteUK: function () {
      return this.isSite(Utils.Enum.SiteId.UK);
    },
    isLoaded: function () {
      window.$eventContainer.trigger(pageEvent.loaded);
    },
  })),
  (UiBloc = Class.extend({
    init: function (n, t, i) {
      (this.Page = n),
        (this.Name = t || "Unnamed UI Bloc"),
        n && (this.Model = n.Model),
        typeof i == "object" && (this.Parent = i);
    },
    isLoaded: function () {
      this.Page.$container.trigger(this.Name + ".loaded"),
        window.$eventContainer.trigger(this.Name + ".loaded");
    },
  })),
  (function (n, t) {
    "use strict";
    n.Model = n.Class.extend({
      init: function (n, i) {
        var r = this,
          u = "";
        (r.Name = n),
          t.extend(r, JSON.parse(t("#mainModel").text())),
          t.extend(r, JSON.parse(t("#LR_dataLayer").text())),
          (r.siteName = window.siteName[r.site]),
          typeof i === varType.obj && t.extend(r, i),
          r.pageName || (r.pageName = "no value"),
          (r.$container = t("#corePage")),
          (r.$eventContainer = t("#eventContainer"));
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    (n.globalServiceEvent = {
      addToCartRequested: "service.addToCart.requested",
      addToCartAnswered: "service.addToCart.answered",
      addToCartSucceeded: "service.addToCart.succeeded",
      addToCartFailed: "service.addToCart.failed",
      addLoyaltyToCartRequested: "service.addLoyaltyToCart.requested",
      addLoyaltyToCartAnswered: "service.addLoyaltyToCart.answered",
      addLoyaltyToCartSucceeded: "service.addLoyaltyToCart.succeeded",
      addLoyaltyToCartFailed: "service.addLoyaltyToCart.failed",
      getPersonnalisationDataRequested:
        "service.getPersonnalisationData.requested",
      getPersonnalisationDataAnswered:
        "service.getPersonnalisationData.answered",
      getPersonnalisationDataSucceeded:
        "service.getPersonnalisationData.succeeded",
      getPersonnalisationDataFailed: "service.getPersonnalisationData.failed",
    }),
      (n.Services = Class.extend({
        init: function (i, r) {
          var u = this,
            f = r.Model;
          u.Name = i;
          var e = function (n) {
              return t.ajax({
                async: !1,
                cache: !1,
                dataType: "json",
                url: "/shoppingbasket/additemtocart",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(n),
              });
            },
            o = function (n) {
              var i = {
                async: !0,
                cache: !1,
                url: "/serviceproduct/addloyaltytocart",
                type: "POST",
              };
              return n && (i.data = JSON.stringify(n)), t.ajax(i);
            },
            s = function () {
              return t.ajax({
                cache: !0,
                dataType: "json",
                type: "GET",
                url: "/servicemyaccount/getcustomerpersonalisation.aspx",
                contentType: "application/json;charset=utf-8",
                processData: !1,
              });
            };
          (u.catchError = function (n, t) {
            console.error(
              "AJAX on: " +
                n.url +
                " --- method: " +
                n.type +
                " --- status: " +
                t.status +
                " --- statusText: " +
                t.statusText
            );
          }),
            (u.initiateEvents = function (n, t) {
              n.forEach(function (n) {
                var i = n[0],
                  r = n[1];
                f.$eventContainer.on(t[i + "Requested"], function (n, e, o) {
                  r(e)
                    .done(function (n) {
                      setTimeout(function () {
                        f.$eventContainer.trigger(t[i + "Succeeded"], [n, o]);
                      }, 10);
                    })
                    .fail(function (n) {
                      u.catchError(this, n),
                        f.$eventContainer.trigger(t[i + "Failed"], [o]);
                    })
                    .complete(function () {
                      f.$eventContainer.trigger(t[i + "Answered"], [o]);
                    });
                });
              });
            }),
            u.initiateEvents(
              [
                ["addToCart", e],
                ["addLoyaltyToCart", o],
                ["getPersonnalisationData", s],
              ],
              n.globalServiceEvent
            );
        },
      }));
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    (n.DC_Data = {}),
      (n.trackingRule = {
        global: {
          PRODUCT_ADDTOCART: "DC_Global_Product_AddToBasket",
          LOYALTY_ADDTOCART: "DC_Global_LoyaltyProgram_AddToBasket",
          INBENTA_POPINDISPLAYED: "DC_MRS_Inbenta_PopInDisplayed",
        },
      }),
      (n.globalTrackingEvent = {
        EARLYBIRDS_NOT_LOADED: "eb.notLoaded",
        SHOPPING_TOOL_USED: "global.shoppingTool.used",
        dataLayerUpdated: "tracking.dataLayer.updated",
        ADOBE_DATALAYER_READY: "dataLayerReadyforAdobe",
      }),
      (n.Tracking = n.Class.extend({
        init: function (i, r) {
          var f = this,
            o = r.Model,
            w = n._satellite.track,
            v = n.Utils,
            y = n.trackingRule.global,
            b = n.globalTrackingEvent,
            u = {},
            ut = n.globalServiceEvent,
            e = v.StorageManager,
            h = v.Enum.StorageName,
            ft = n.contextInfo.Customer.UserId,
            s = n.tc_vars,
            pt = "522008758",
            et = h.INTERACTION_TIMER,
            k = h.PAGE_ORIGIN,
            d = h.PRODUCT_ORIGIN,
            l = "eVar71",
            c = e.readLocalStorageValue(h.USED_TOOL) || "",
            a = n.Utils.UrlManager.GetHashValue("opeco"),
            ot = e.readLocalStorageValue(h.FLASHSALE_ORIGIN),
            wt = {
              fr: "5524e512191874e63bd75a8c",
              be: "598185d6db7a79128875cf3a",
              ch: "598185dcb6cb8b128e66bc9d",
              com: "598185ffb6cb8b128e66bcb1",
              es: "598185ccb6cb8b128e66bc98",
              it: "598185e5b6cb8b128e66bca2",
              pt: "598185ba63ed1112c8040822",
              ru: "598185ecb6cb8b128e66bca7",
              uk: "5791efd26da682002291ce8e",
            },
            bt = {
              fr: "5524e518191874e63bd75a8d",
              be: "598185d6db7a79128875cf39",
              ch: "598185dcb6cb8b128e66bc9c",
              com: "598185ffb6cb8b128e66bcb0",
              es: "598185ccb6cb8b128e66bc97",
              it: "598185e5b6cb8b128e66bca1",
              pt: "598185ba63ed1112c8040821",
              ru: "598185ecb6cb8b128e66bca6",
              uk: "5791efd26da682002291ce8a",
            },
            st = "wa_data",
            kt = !o.isChildProduct && !o.isChildPage,
            g = null,
            ht = 18e5,
            nt,
            rt;
          (f.Name = i),
            (f._track = w),
            (f.dataLayer = u),
            (f.storage_ = e),
            (f.storageName = h);
          var ct = t(n),
            dt = t("#inbenta-start"),
            tt = function (t) {
              if (t === null) return "";
              if (typeof t === n.varType.str) return t;
              var i = "_",
                e = u.channel || "",
                f = t.type + i + t.subType + i + e.toUpperCase(),
                r = t.extraData;
              return (
                r &&
                  (typeof r === n.varType.obj
                    ? r.forEach(function (n) {
                        f += i + n;
                      })
                    : (f += i + r)),
                f
              );
            },
            gt = function () {
              return document.referrer.replace(/^(https?:\/\/)|(\/.*$)/g, "");
            },
            p = function () {
              yt() ? ti() : vt(), e.createLocalStorageValue(et, +new Date());
            },
            lt = function () {
              nt !== undefined && clearTimeout(nt);
            },
            ni = function (t) {
              (f.dataLayer = u = t), (n[st] = u);
            },
            at = function (t) {
              (n.DC_Data[y.LOYALTY_ADDTOCART] = {
                ProductId: pt,
                Zone: t || "landing",
              }),
                w(y.LOYALTY_ADDTOCART);
            },
            ti = function () {
              e.createLocalStorageValue(k, u.pageName),
                (nt = setTimeout(vt, ht));
            },
            vt = function () {
              e.eraseLocalStorageValue(k);
            },
            yt = function () {
              var n = e.readLocalStorageValue(et);
              return n === null || +new Date() - n < ht;
            },
            ii = function (t) {
              return (
                typeof t === n.varType.str && (t = t.toLowerCase()),
                e.createLocalStorageValue(h.LAST_SEARCH_ID, t)
              );
            },
            it = function (n) {
              return e.createLocalStorageValue(h.SHOPPING_TOOL, n);
            },
            ri = function () {
              var n = {},
                i,
                u,
                f,
                t,
                e;
              if (
                (n.info || (n.info = {}),
                ft &&
                  (n.datasources = [{ id: wt[r.country], original_id: ft }]),
                s.user_clusterNum && (n.info.cluster_num = s.user_clusterNum),
                s.app_segment &&
                  ((n.info.appweb_promo = s.app_segment.substring(6, 7)),
                  (n.info.appweb_nb_order = s.app_segment.substring(5, 6)),
                  (n.info.appweb_gender = s.app_segment.substring(4, 5)),
                  (n.info.appweb_age_range = s.app_segment.substring(2, 4)),
                  (n.info.appweb_price_range = s.app_segment.substring(1, 2))),
                s.app_lifestyle &&
                  ((n.info.lifestyle_family = s.app_lifestyle.substring(2, 3)),
                  (n.info.lifestyle_size = s.app_lifestyle.substring(1, 2)),
                  (n.info.lifestyle_personae = s.app_lifestyle.substring(
                    0,
                    1
                  ))),
                tC.internalvars &&
                  ((n.info.cUserIdCriteo = tC.internalvars.email_sha256),
                  (n.info.pUserIdCriteo = tC.internalvars.visitor_id)),
                (i = v.CookieManager.ReadCookie("cto_bundle")),
                (n.info.ctoBundleCriteo = v.CookieManager.ReadCookie(
                  "cto_bundle"
                )),
                (n.info.ctoBundleCriteo = i !== null ? i : ""),
                (u = v.CookieManager.ReadCookie("Segmentation")),
                u !== null)
              )
                for (f = u.split("&"), t = 0; t < f.length; t++)
                  (e = f[t].split("=")),
                    e[0] === "engagement" && (n.info.audiences = e[1]);
              return n;
            },
            ui = function (n) {
              return n
                .match(/[a-z]+/gi)
                .map(function (n) {
                  return n.charAt(0).toUpperCase() + n.substr(1).toLowerCase();
                })
                .join("");
            };
          (f.destroy_tracking = function () {
            ct.off("focus", p).off("blur", lt);
          }),
            (f.expose_dataLayer = function () {
              p(), (n[st] = u);
            }),
            (f.launchDirectCall = function (t, i) {
              typeof i === n.varType.obj && (n.DC_Data[t] = i), w(t);
            }),
            (f.set_shoppingTool = function (n) {
              (c = tt(n)),
                o.channel === "pdp"
                  ? (f.productOrigin = c)
                  : document.hasFocus() && it(c);
            }),
            (f.set_productOrigin = function (n) {
              return e.createLocalStorageValue(d, tt(n));
            }),
            (f.update_dataLayer = function (n) {
              t.extend(u, n);
            }),
            (f.update_dataLayer_error = function (n) {
              var t = f.dataLayer.events.split(",");
              t.push("event31=1"),
                f.update_dataLayer({
                  pageName: o.countryCode + ":ERROR:TechnicalErrorInternal",
                  events: t.join(),
                  prop48: window.location.href,
                  prop49: "TechnicalErrorInternal",
                  prop56: n ? ui(n) : "AjaxError",
                });
            });
          o.$eventContainer
            .on(ut.addToCartSucceeded, function (t, i, r) {
              var o = e.readLocalStorageValue(d),
                u = JSON.parse(i.AnalyticsDataLayer),
                s = !1;
              r && (s = r.hasATBlayer),
                (u.hasATBlayer = s || !1),
                (u.prop26 = u.eVar68 = i.ServicesDataLayer.SiteName || ""),
                o !== null &&
                  ((u.eVar80 = o), (u.prop60 = o), e.eraseLocalStorageValue(d)),
                r &&
                  (r.addedFromBasketWishlist || r.addedFromWishlistProduct) &&
                  (typeof u.events === n.varType.str
                    ? (u.events += ",event102")
                    : (u.events = "event102"),
                  (u.prop12 = u.eVar12 = "wishlist")),
                f.launchDirectCall(y.PRODUCT_ADDTOCART, u),
                r && r.hasLoyalty && at(r.componant);
            })
            .on(ut.addLoyaltyToCartSucceeded, function (n, t, i) {
              var r;
              i && (r = i.componant), at(r);
            })
            .on(b.SHOPPING_TOOL_USED, function (n, t) {
              e.createLocalStorageValue(
                h.USED_TOOL,
                tt({ type: t.type, subType: t.subType, extraData: t.extraData })
              ),
                (t.keyword || t.guidedNavId) && ii(t.keyword || t.guidedNavId),
                t.type === "SEARCH" &&
                  t.extraData.length >= 2 &&
                  (t.extraData[1] === "keyword-autocompletion"
                    ? e.createLocalStorageValue(l, "autocompletion")
                    : t.extraData[1] === "cat-autocompletion"
                    ? e.createLocalStorageValue(l, "cat-autocompletion")
                    : t.extraData[1] === "history"
                    ? e.createLocalStorageValue(l, "search-history")
                    : t.extraData[1] === "internal" &&
                      e.createLocalStorageValue(l, "no-autocompletion"));
            });
          if (kt) {
            ct.on("focus", function () {
              p(), o.channel !== "pdp" && it(c);
            }).on("blur", lt);
            t.ajaxSetup({
              error: function (n, t, i) {
                f.update_dataLayer_error(
                  this.type + n.status + n.statusText + i
                );
              },
            }),
              (u = JSON.parse(t("#analyticsDataLayer").text())),
              yt() && (g = e.readLocalStorageValue(k)),
              o.customer !== undefined &&
                o.customer.customerNumber !== undefined &&
                (u.eVar6 = u.prop10 = o.customer.customerNumber),
              u.eVar1 && (u.eVar59 = u.eVar1),
              u.eVar6 && (u.eVar77 = u.eVar6),
              g !== null && (u.prop66 = g),
              (u.prop39 = o.isLoggedIn
                ? "islogged"
                : o.isIdentified
                ? "isidentified"
                : "isnotlogged"),
              ot !== null &&
                ((u.eVar72 = ot), e.eraseLocalStorageValue(h.FLASHSALE_ORIGIN)),
              (rt = e.readLocalStorageValue(l)),
              rt && ((u.eVar71 = rt), e.eraseLocalStorageValue(l)),
              document.hasFocus() && p(),
              a
                ? ((a = a.replace(/_/g, "-")),
                  f.set_shoppingTool({
                    type: "INTERNAL",
                    subType:
                      a.indexOf("hubvf") > -1 || a.indexOf(":vf") > -1
                        ? "VentesFlash"
                        : "Opeco",
                    extraData: ["other", a],
                  }))
                : document.referrer.indexOf("laredoute") === -1 &&
                  f.set_shoppingTool({
                    type: "EXTERNAL",
                    subType: gt() || "null",
                  }),
              o.channel !== "pdp" &&
                (c && f.update_dataLayer({ prop60: c }),
                document.hasFocus() && it(c)),
              (u.prop26 = u.eVar68 = o.siteName),
              o.breadcrumb !== undefined &&
                ((u.prop6 = u.prop7 = u.prop8 = u.prop9 = ""),
                o.breadcrumb.forEach(function (n) {
                  switch (n.level) {
                    case 0:
                      o.pageType !== "SearchPage" &&
                        (u.prop26 = u.eVar68 = n.name);
                      break;
                    case 1:
                      u.prop6 = n.name;
                      break;
                    case 2:
                      u.prop7 = n.name;
                      break;
                    case 3:
                      u.prop8 = n.name;
                      break;
                    case 4:
                      u.prop9 = n.name;
                  }
                })),
              (u.prop43 = o.isLRAndMe ? "loyaltyprogram" : "notloyaltyprogram"),
              u.pageName || (u.pageName = "no value"),
              u.pageName.replace("GB:", "UK:"),
              (n.pageType = u.pageType),
              (n.virtualSite = u.virtualSite),
              (n.wa_data_backup = {}),
              t.extend(n.wa_data_backup, u),
              ni(u);
            try {
              n.dispatchEvent && n.CustomEvent
                ? o.$eventContainer[0].dispatchEvent(
                    new CustomEvent(b.ADOBE_DATALAYER_READY)
                  )
                : console.log("Custom Events are not available");
            } catch (fi) {
              console.error("Error while trying to dispatch a CustomEvent");
            }
            o.$eventContainer.trigger(b.dataLayerUpdated);
            n.Utils.Common.onEarlyBirdsLoad(function () {
              n._ebq.push(["init", bt[r.country]]),
                n._ebq.push(["identify", ri()]);
            });
            f.isScriptInitClickForInbentaScript = !0;
            dt.on("click", function () {
              f.isScriptInitClickForInbentaScript
                ? (f.isScriptInitClickForInbentaScript = !1)
                : f.launchDirectCall(y.INBENTA_POPINDISPLAYED);
            });
          }
        },
      }));
  })(window, window.jQuery),
  $(function () {
    var f, t;
    $("#layerLogin").on("click", function () {
      window.location.href = "/login/login";
    });
    if (
      (_LaRedoute.getScreenType() > 1 &&
        ($(".title-hamburger").show(), $("#layerLogin").show()),
      Utils.Common.getCountry() === "fr" && $(".tooltip-popin").popin(),
      $(".reinsurance-popin").popin({
        onLoad: function (n) {
          n.find(".container").css("width", "auto"),
            n.find("#ct_services").css("width", "auto"),
            n.find("#ct_services").find("h2").first().hide(),
            n.find("#ct_ctn").css("width", "auto"),
            n.find("#ct_menu").hide(),
            n.find("#ct_main").css("width", "auto"),
            n.find("#contenu_service .encadre").css("width", "auto"),
            n
              .find("#contenu_service .encadre .right")
              .css({ width: "auto", float: "none", "padding-left": "45px" }),
            n.find(".lienback").hide(),
            n
              .find("#contenu_service .right")
              .css({ width: "auto", float: "none" });
        },
      }),
      $("#openCountryChoice").hover(function () {
        $("#ulCountryLinks").length ||
          ($.ajax({
            url: "/servicefooter/rendercountrylinks",
            success: function (n) {
              var t, u, r, f;
              if (n != null) {
                for (
                  t = document.createElement("ul"),
                    t.id = "ulCountryLinks",
                    t.classList.add("apply-tooltip"),
                    t.classList.add("tooltip"),
                    t.setAttribute("data-trigger", "#openCountryChoice"),
                    t.setAttribute("data-position", "top"),
                    t.setAttribute("data-style", "black"),
                    t.setAttribute("data-show-close", "false"),
                    i = 0;
                  i < n.length;
                  i++
                )
                  (u = document.createElement("li")),
                    (r = document.createElement("a")),
                    r.classList.add("last-bottom-footer-country-link"),
                    (r.href = n[i].URL),
                    (r.innerHTML = n[i].Name),
                    u.appendChild(r),
                    t.appendChild(u);
                (f = document.getElementById("openCountryChoice")),
                  f && f.insertAdjacentElement("afterend", t),
                  $("#ulCountryLinks.apply-tooltip").tooltip();
              }
            },
          }),
          $("#ulCountryLinks.apply-tooltip").tooltip(open));
      }),
      (f = $(".js-basket-content-info")),
      (t = $(".footer-reinsurance-row")),
      f.length > 0)
    ) {
      var o = f.attr("data-redoute-pdt"),
        s = f.attr("data-market-pdt"),
        h = f.attr("data-regular-pdt"),
        c = f.attr("data-bulky-pdt"),
        e = o + s + h + c,
        u = t.find(".footer-col-1"),
        r = t.find(".footer-col-2"),
        n = t.find(".footer-col-3"),
        l = t.find(".footer-col-4");
      t.find(".reinsurance-block").removeClass("hidden"),
        t.find(".reinsurance-link").removeClass("hidden"),
        t.find(".reinsurance-block").hide(),
        u.find(".lr-icon-clock").show(),
        r.find(".lr-icon-delivery-white").show(),
        n.find(".lr-icon-return").show(),
        n.find(".reinsurance-link").hide(),
        n.find(".reinsurance-popin-3").show(),
        e === "TrueFalseFalseTrue" &&
          (t.find(".reinsurance-block").hide(),
          u.find(".lr-icon-paymentcard").show(),
          r.find(".lr-icon-furniture").show(),
          r.find(".reinsurance-direct-label").show(),
          r.find(".reinsurance-bulky-label").hide(),
          n.find(".lr-icon-return").show(),
          n.find(".reinsurance-link").hide(),
          n.find(".reinsurance-popin-7").show()),
        e === "FalseTrueTrueFalse" &&
          (t.find(".reinsurance-block").hide(),
          u.find(".lr-icon-paymentcard").show(),
          r.find(".lr-icon-certificate").show(),
          n.find(".lr-icon-return").show(),
          n.find(".reinsurance-link").hide(),
          n.find(".reinsurance-popin-8").show()),
        e === "TrueFalseTrueTrue" &&
          (t.find(".reinsurance-block").hide(),
          u.find(".lr-icon-delivery-white").show(),
          r.find(".lr-icon-furniture").show(),
          r.find(".reinsurance-direct-label").hide(),
          r.find(".reinsurance-bulky-label").show(),
          n.find(".lr-icon-return").show(),
          n.find(".reinsurance-link").hide(),
          n.find(".reinsurance-popin-9").show()),
        e === "TrueTrueFalseTrue" &&
          (t.find(".reinsurance-block").hide(),
          u.find(".lr-icon-furniture").show(),
          r.find(".lr-icon-certificate").show(),
          n.find(".lr-icon-return").show(),
          n.find(".reinsurance-link").hide(),
          n.find(".reinsurance-popin-10").show()),
        e === "TrueTrueTrueFalse" &&
          (t.find(".reinsurance-block").hide(),
          u.find(".lr-icon-delivery-white").show(),
          r.find(".lr-icon-certificate").show(),
          n.find(".lr-icon-return").show(),
          n.find(".reinsurance-link").hide(),
          n.find(".reinsurance-popin-11").show()),
        e === "TrueTrueTrueTrue" &&
          (t.find(".reinsurance-block").hide(),
          u.find(".lr-icon-furniture").show(),
          r.find(".lr-icon-certificate").show(),
          n.find(".lr-icon-return").show(),
          n.find(".reinsurance-link").hide(),
          n.find(".reinsurance-popin-12").show()),
        l.find(".lr-icon-locker").show();
    }
    t.find(".reinsurance-link").each(function () {
      var n = $(this).attr("data-popin-id"),
        t = $(this).attr("data-url"),
        i = {
          class: "popin reinsurance-popin",
          "data-url": t,
          "data-preload": "false",
          "data-block": ".static-page-container",
          "data-trigger": ".reinsurance-popin-" + n,
          "data-track-name": "STATICPAGE",
          "data-track-merge-url": "true",
        };
      $(this).find(".reinsurance-popin").remove(),
        $(this).append($("<div>", i));
    }),
      $("#footerExpandServices").click(function () {
        var n = $(this);
        $.ajax({
          url: "/servicefooter/loadcolumns",
          success: function (t) {
            t.IsSuccess === !0 &&
              (n.hide().prev().replaceWith(t.Html),
              n.remove(),
              $("#footer").trigger("footer.expanded"));
          },
        });
      });
  }),
  (_UiHeader = (function (n, t) {
    return {
      Init: function () {
        var r = this,
          i;
        t("#iconProfil").on("click", function () {
          typeof _page.Blocs.AccountLayer == "undefined" &&
            (n.location =
              _LaRedoute.getScreenType() == 1 && _page.isMobileDevice
                ? "/myaccount/myaccount" + _LaRedoute.urlSuffixe
                : n._page.isSiteUK()
                ? "/myaccount/myaccount" + _LaRedoute.urlSuffixe
                : "/myaccount/ordertracingall" + _LaRedoute.urlSuffixe);
        });
        i = t("#newsletterContainer");
        t("#iconNewsletter").on("click", function () {
          n._page.isMobileDevice &&
            i.length > 0 &&
            t("html, body").animate({ scrollTop: i.offset().top - 85 });
        });
      },
    };
  })(window, jQuery)),
  (function () {
    "use strict";
    function c(n, t, i) {
      "addEventListener" in window
        ? n.addEventListener(t, i, !1)
        : "attachEvent" in window && n.attachEvent("on" + t, i);
    }
    function rt() {
      for (
        var i = ["moz", "webkit", "o", "ms"], n = 0;
        n < i.length && !r;
        n += 1
      )
        r = window[i[n] + "RequestAnimationFrame"];
      r || t(" RequestAnimationFrame not supported");
    }
    function ut() {
      var n = "Host page";
      return (
        window.top !== window.self &&
          (n = window.parentIFrame
            ? window.parentIFrame.getId()
            : "Nested host page"),
        n
      );
    }
    function l(n) {
      return u + "[" + ut() + "]" + n;
    }
    function t(t) {
      n.log && "object" == typeof window.console && console.log(l(t));
    }
    function ft(n) {
      "object" == typeof window.console && console.warn(l(n));
    }
    function et(r) {
      function o() {
        function t() {
          p(f), v(), n.resizedCallback(f);
        }
        c("Height"), c("Width"), w(t, f, "resetPage");
      }
      function g(i) {
        var r = i.id;
        t(" Removing iFrame: " + r),
          i.parentNode.removeChild(i),
          n.closedCallback(r),
          t(" --");
      }
      function it() {
        var n = e.substr(h).split(":");
        return {
          iframe: document.getElementById(n[0]),
          id: n[0],
          height: n[1],
          width: n[2],
          type: n[3],
        };
      }
      function c(i) {
        var e = Number(n["max" + i]),
          o = Number(n["min" + i]),
          r = i.toLowerCase(),
          u = Number(f[r]);
        if (o > e)
          throw new Error(
            "Value for min" + i + " can not be greater than max" + i
          );
        t(" Checking " + r + " is in range " + o + "-" + e),
          u < o && ((u = o), t(" Set " + r + " to min value")),
          u > e && ((u = e), t(" Set " + r + " to max value")),
          (f[r] = "" + u);
      }
      function rt() {
        var i = r.origin,
          u = f.iframe.src.split("/").slice(0, 3).join("/");
        if (
          n.checkOrigin &&
          (t(" Checking connection is from: " + u), "" + i != "null" && i !== u)
        )
          throw new Error(
            "Unexpected message received from: " +
              i +
              " for " +
              f.iframe.id +
              ". Message was: " +
              r.data +
              ". This error can be disabled by adding the checkOrigin: false option."
          );
        return !0;
      }
      function ut() {
        return u === ("" + e).substr(0, h);
      }
      function et() {
        var n = f.type in { true: 1, false: 1 };
        return n && t(" Ignoring init message from meta parent page"), n;
      }
      function l(n) {
        return e.substr(e.indexOf(":") + nt + n);
      }
      function ot(i) {
        t(
          " MessageCallback passed: {iframe: " +
            f.iframe.id +
            ", message: " +
            i +
            "}"
        ),
          n.messageCallback({ iframe: f.iframe, message: JSON.parse(i) }),
          t(" --");
      }
      function st() {
        if (null === f.iframe)
          throw new Error("iFrame (" + f.id + ") does not exist on " + tt);
        return !0;
      }
      function b(n) {
        var t = n.getBoundingClientRect();
        return (
          a(),
          {
            x: parseInt(t.left, 10) + parseInt(i.x, 10),
            y: parseInt(t.top, 10) + parseInt(i.y, 10),
          }
        );
      }
      function k(n) {
        function e() {
          (i = u), d(), t(" --");
        }
        function o() {
          return { x: Number(f.width) + r.x, y: Number(f.height) + r.y };
        }
        var r = n ? b(f.iframe) : { x: 0, y: 0 },
          u = o();
        t(
          " Reposition requested from iFrame (offset x:" +
            r.x +
            " y:" +
            r.y +
            ")"
        ),
          window.top !== window.self
            ? window.parentIFrame
              ? n
                ? parentIFrame.scrollToOffset(u.x, u.y)
                : parentIFrame.scrollTo(f.width, f.height)
              : ft(
                  " Unable to scroll to requested position, window.parentIFrame not found"
                )
            : e();
      }
      function d() {
        !1 !== n.scrollCallback(i) && v();
      }
      function ht(n) {
        function e(n) {
          var u = b(n);
          t(" Moving to in page link (#" + r + ") at x: " + u.x + " y: " + u.y),
            (i = { x: u.x, y: u.y }),
            d(),
            t(" --");
        }
        var r = n.split("#")[1] || "",
          u = decodeURIComponent(r),
          f = document.getElementById(u) || document.getElementsByName(u)[0];
        window.top !== window.self
          ? window.parentIFrame
            ? parentIFrame.moveToAnchor(r)
            : t(
                " In page link #" +
                  r +
                  " not found and window.parentIFrame not found"
              )
          : f
          ? e(f)
          : t(" In page link #" + r + " not found");
      }
      function ct() {
        switch (f.type) {
          case "close":
            g(f.iframe), n.resizedCallback(f);
            break;
          case "message":
            ot(l(6));
            break;
          case "scrollTo":
            k(!1);
            break;
          case "scrollToOffset":
            k(!0);
            break;
          case "inPageLink":
            ht(l(9));
            break;
          case "reset":
            y(f);
            break;
          case "init":
            o(), n.initCallback(f.iframe);
            break;
          default:
            o();
        }
      }
      var e = r.data,
        f = {};
      ut() &&
        (t(" Received: " + e),
        (f = it()),
        !et() && st() && rt() && (ct(), (s = !1)));
    }
    function a() {
      null === i &&
        ((i = {
          x:
            window.pageXOffset !== undefined
              ? window.pageXOffset
              : document.documentElement.scrollLeft,
          y:
            window.pageYOffset !== undefined
              ? window.pageYOffset
              : document.documentElement.scrollTop,
        }),
        t(" Get page position: " + i.x + "," + i.y));
    }
    function v() {
      null !== i &&
        (window.scrollTo(i.x, i.y),
        t(" Set page position: " + i.x + "," + i.y),
        (i = null));
    }
    function y(n) {
      function i() {
        p(n), e("reset", "reset", n.iframe);
      }
      t(
        " Size reset requested by " +
          ("init" === n.type ? "host page" : "iFrame")
      ),
        a(),
        w(i, n, "init");
    }
    function p(i) {
      function r(n) {
        (i.iframe.style[n] = i[n] + "px"),
          t(" IFrame (" + i.iframe.id + ") " + n + " set to " + i[n] + "px");
      }
      n.sizeHeight && r("height"), n.sizeWidth && r("width");
    }
    function w(n, i, u) {
      u !== i.type && r ? (t(" Requesting animation frame"), r(n)) : n();
    }
    function e(n, i, r) {
      t("[" + n + "] Sending msg to iframe (" + i + ")"),
        r.contentWindow.postMessage(u + i, "*");
    }
    function b() {
      function u() {
        function r(r) {
          Infinity !== n[r] &&
            0 !== n[r] &&
            ((i.style[r] = n[r] + "px"), t(" Set " + r + " = " + n[r] + "px"));
        }
        r("maxHeight"), r("minHeight"), r("maxWidth"), r("minWidth");
      }
      function f(n) {
        return (
          "" === n &&
            ((i.id = n = "iFrameResizer" + d++),
            t(" Added missing iframe ID: " + n + " (" + i.src + ")")),
          n
        );
      }
      function o() {
        t(
          " IFrame scrolling " +
            (n.scrolling ? "enabled" : "disabled") +
            " for " +
            r
        ),
          (i.style.overflow = !1 === n.scrolling ? "hidden" : "auto"),
          (i.scrolling = !1 === n.scrolling ? "no" : "yes");
      }
      function h() {
        ("number" == typeof n.bodyMargin || "0" === n.bodyMargin) &&
          ((n.bodyMarginV1 = n.bodyMargin),
          (n.bodyMargin = "" + n.bodyMargin + "px"));
      }
      function l() {
        return (
          r +
          ":" +
          n.bodyMarginV1 +
          ":" +
          n.sizeWidth +
          ":" +
          n.log +
          ":" +
          n.interval +
          ":" +
          n.enablePublicMethods +
          ":" +
          n.autoResize +
          ":" +
          n.bodyMargin +
          ":" +
          n.heightCalculationMethod +
          ":" +
          n.bodyBackground +
          ":" +
          n.bodyPadding +
          ":" +
          n.tolerance
        );
      }
      function a(t) {
        c(i, "load", function () {
          var r = s;
          e("iFrame.onload", t, i),
            !r &&
              n.heightCalculationMethod in it &&
              y({ iframe: i, height: 0, width: 0, type: "init" });
        }),
          e("init", t, i);
      }
      var i = this,
        r = f(i.id);
      o(), u(), h(), a(l());
    }
    function ot(n) {
      if ("object" != typeof n)
        throw new TypeError("Options is not an object.");
    }
    function k(t) {
      (t = t || {}), ot(t);
      for (var i in f)
        f.hasOwnProperty(i) && (n[i] = t.hasOwnProperty(i) ? t[i] : f[i]);
    }
    function o() {
      function n(n) {
        if (n.tagName)
          if ("IFRAME" !== n.tagName.toUpperCase())
            throw new TypeError(
              "Expected <IFRAME> tag, found <" + n.tagName + ">."
            );
          else b.call(n);
        else throw new TypeError("Object is not a valid DOM element");
      }
      return function (t, i) {
        k(t);
        switch (typeof i) {
          case "undefined":
          case "string":
            Array.prototype.forEach.call(
              document.querySelectorAll(i || "iframe"),
              n
            );
            break;
          case "object":
            n(i);
            break;
          default:
            throw new TypeError("Unexpected data type (" + typeof i + ").");
        }
      };
    }
    function st(n) {
      n.fn.iFrameResize = function (n) {
        return k(n), this.filter("iframe").each(b).end();
      };
    }
    var d = 0,
      s = !0,
      g = "message",
      nt = g.length,
      u = "[iFrameSizer]",
      h = u.length,
      tt = "",
      i = null,
      r = window.requestAnimationFrame,
      it = { max: 1, scroll: 1, bodyScroll: 1, documentElementScroll: 1 },
      n = {},
      f = {
        autoResize: !0,
        bodyBackground: null,
        bodyMargin: null,
        bodyMarginV1: 8,
        bodyPadding: null,
        checkOrigin: !0,
        enablePublicMethods: !1,
        heightCalculationMethod: "offset",
        interval: 32,
        log: !1,
        maxHeight: Infinity,
        maxWidth: Infinity,
        minHeight: 0,
        minWidth: 0,
        scrolling: !1,
        sizeHeight: !0,
        sizeWidth: !1,
        tolerance: 0,
        closedCallback: function () {},
        initCallback: function () {},
        messageCallback: function () {},
        resizedCallback: function () {},
        scrollCallback: function () {
          return !0;
        },
      };
    rt(),
      c(window, "message", et),
      window.jQuery && st(jQuery),
      typeof define == "function" && define.amd
        ? define([], o)
        : typeof module == "object" && typeof module.exports == "object"
        ? (module.exports = o())
        : (window.iFrameResize = o());
  })(),
  (_UiLayerWaiting = (function (n, t) {
    var i = null;
    return {
      Show: function (n) {
        t("#waitingDiv").length == 0 &&
          ((n == null || n == "") && (n = ""),
          t("body").append(
            '<div id="waitingDiv" class="modalPaiement"><div class="waitingText loading loading-bottom" >' +
              n +
              "</div></div>"
          ));
      },
      Hide: function () {
        t("#waitingDiv").length != 0 && t("#waitingDiv").remove();
      },
    };
  })(window, jQuery)),
  (function (n, t) {
    var i = "field",
      u = "popin",
      r = "has-error",
      f = "hide";
    n.UiLoginLayer = n.UiBloc.extend({
      init: function (e, o) {
        var s = this;
        s._super(e, o);
        var l = "textBox_loginPage_alreadyCustomer_loginMail",
          a = "#" + l,
          v = "textBox_loginPage_alreadyCustomer_password",
          y = "#" + v,
          h = "submitted";
        (s.loaded = !1), (s.shouldOpen = !1), (s.redirectToLocation = null);
        var c = t("<div>", {
            id: "loginLayer",
            class: "popin",
            "data-url": "/login/login.aspx?isLoginLayer=true",
            "data-position": "defined",
            "data-track-name": "COMPTE:login",
            "data-track-merge-url": "false",
          }),
          p = function () {
            t("#loginError").addClass(f).removeClass(r),
              t("#inputEmail, #inputPassword").removeClass("has-error");
          },
          b = function () {
            t("#loginError").removeClass(f).show().addClass(r),
              t("#inputEmail, #inputPassword").addClass("has-error"),
              n._satellite.track("DC_Login_FormSubmission_Errors");
          },
          w = function (n) {
            if (n) {
              var r = n.find(a),
                u = n.find(y),
                f = t("#textBox_loginPage_newCustomer_registerMail");
              r &&
                u &&
                f &&
                (r.data(i) || r.field(),
                u.data(i) || u.field(),
                f.data(i) || f.field(),
                r.data(i) && r.data(i).update(),
                u.data(i) && u.data(i).update(),
                f.data(i) && f.data(i).update(),
                u.val() !== "" &&
                  r.val() !== "" &&
                  n.find("button").attr("disabled", !1));
            }
          },
          k = function (i) {
            (s.loaded = !0),
              i
                .find(".login-block h2")
                .css({ marginBottom: "15px", textAlign: "left" });
            var e = i.find("#accountLogin");
            (s.Page.Blocs.SocialLogin = new SocialProfileReach5(
              s,
              "SocialProfileReach5"
            )),
              n.reach5 &&
                n.reach5("on", "ready", function () {
                  s.Page.Blocs.SocialLogin.$containerSocialLogin.removeLoading();
                });
            e.off("submit").on("submit", function (u) {
              var o = t(this),
                e,
                c;
              if ((u.preventDefault(), i.data(h) === !0)) return !1;
              (e = o.data("bootstrapValidator")),
                (c = t(".g-recaptcha")),
                e.validateField(l),
                e.validateField(v),
                c.length > 0 && c.is(":visible") && e.validateField("captcha"),
                e.isValid() &&
                  (i.addLoading(),
                  i.data(h, !0),
                  s.redirectToLocation &&
                    o.find("#redirectTo").val(s.redirectToLocation),
                  t.ajax({
                    url: "/serviceaccount/login",
                    type: "POST",
                    data: o.serialize(),
                    dataType: "json",
                    success: function (u) {
                      if (u.IsSuccess === !0 && u.RedirectUrl)
                        n.location.href = u.RedirectUrl;
                      else if (
                        u.IsSuccess === !0 &&
                        (u.RedirectUrl === null || u.RedirectUrl === "") &&
                        typeof s.onLoginSuccess == "function"
                      )
                        s.onLoginSuccess();
                      else {
                        u.RedirectUrl && (n.location.href = u.RedirectUrl),
                          i.removeLoading(),
                          typeof grecaptcha != "undefined" &&
                            grecaptcha.reset(),
                          u.ShowCaptcha && t("#captchaArea").removeClass(f),
                          t.each(u.Errors, function (n, u) {
                            if (u) {
                              var f;
                              i.data(h, !1),
                                n === "ErrorMessagePassword"
                                  ? ((f = "AccountError"),
                                    t("#" + f)
                                      .children(".snackbar_content")
                                      .html(u),
                                    b())
                                  : n === "ErrorMessageUsername" &&
                                    ((f = "notAnAccountError"),
                                    t("#" + f).html(u)),
                                t("#" + f)
                                  .show()
                                  .closest(".form-group")
                                  .removeClass("has-success")
                                  .addClass(r);
                            }
                          });
                        var e = "DC_Login_Captcha";
                        u.ForgotPasswordWarning
                          ? ((n.wa_data.prop42 = "forgotpasswordreminder"),
                            n._satellite.track(e))
                          : u.ShowCaptcha &&
                            ((n.wa_data.prop42 = "captcha"),
                            n._satellite.track(e));
                      }
                    },
                    error: function () {
                      i.data(h, !1), i.removeLoading();
                    },
                  }));
            });
            i.find(a).click(function () {
              t("#notAnAccountError").hide(),
                t("#inputEmail").removeClass(r),
                p();
            }),
              i.find(y).click(function () {
                t("#AccountError").hide(),
                  t("#inputPassword").removeClass(r),
                  p();
              }),
              s.shouldOpen && (i.data(u).open(), w(i));
          };
        (s.open = function (t) {
          s.loaded
            ? (n._page.loginPage || (n._page.loginPage = new n.loginPage()),
              c.data(u).open(),
              w(c))
            : (s.shouldOpen = !0),
            typeof t == "function" && (s.onLoginSuccess = t);
        }),
          (s.close = function () {
            c.data(u).close();
          }),
          c.popin({ context: s, onLoad: k, preload: !0 });
      },
    });
  })(window, jQuery),
  Array.prototype.find ||
    (Array.prototype.find = function (n) {
      "use strict";
      var t;
      if (this == null)
        throw new TypeError(
          "Array.prototype.find a été appelé sur null ou undefined"
        );
      if (typeof n != "function")
        throw new TypeError("predicate doit être une fonction");
      var i = Object(this),
        u = i.length >>> 0,
        f = arguments[1],
        r;
      for (t = 0; t < u; t++) if (((r = i[t]), n.call(f, r, t, i))) return r;
      return undefined;
    }),
  String.prototype.startsWith ||
    (function () {
      "use strict";
      var n = (function () {
          try {
            var n = {},
              t = Object.defineProperty,
              i = t(n, n, n) && t;
          } catch (r) {}
          return i;
        })(),
        i = {}.toString,
        t = function (n) {
          var u, f, r;
          if (this == null) throw TypeError();
          if (((u = String(this)), n && i.call(n) == "[object RegExp]"))
            throw TypeError();
          var e = u.length,
            o = String(n),
            s = o.length,
            h = arguments.length > 1 ? arguments[1] : undefined,
            t = h ? Number(h) : 0;
          if ((t != t && (t = 0), (f = Math.min(Math.max(t, 0), e)), s + f > e))
            return !1;
          for (r = -1; ++r < s; )
            if (u.charCodeAt(f + r) != o.charCodeAt(r)) return !1;
          return !0;
        };
      n
        ? n(String.prototype, "startsWith", {
            value: t,
            configurable: !0,
            writable: !0,
          })
        : (String.prototype.startsWith = t);
    })(),
  Array.prototype.findIndex ||
    Object.defineProperty(Array.prototype, "findIndex", {
      value: function (n) {
        var i, r, u, t, f;
        if (this == null) throw new TypeError('"this" is null or not defined');
        if (((i = Object(this)), (r = i.length >>> 0), typeof n != "function"))
          throw new TypeError("predicate must be a function");
        for (u = arguments[1], t = 0; t < r; ) {
          if (((f = i[t]), n.call(u, f, t, i))) return t;
          t++;
        }
        return -1;
      },
    }),
  String.prototype.replaceAll ||
    Object.defineProperty(String.prototype, "replaceAll", {
      value: function (n, t) {
        return Object.prototype.toString.call(n).toLowerCase() ===
          "[object regexp]"
          ? this.replace(n, t)
          : this.replace(new RegExp(n, "g"), t);
      },
    }),
  (function () {
    function n(n, t) {
      t = t || { bubbles: !1, cancelable: !1, detail: undefined };
      var i = document.createEvent("CustomEvent");
      return i.initCustomEvent(n, t.bubbles, t.cancelable, t.detail), i;
    }
    if (typeof window.CustomEvent == "function") return !1;
    (n.prototype = window.Event.prototype), (window.CustomEvent = n);
  })(),
  (_LaRedoute = (function (n, t, i) {
    return {
      init: function () {
        if (
          ((this.enableBasketItemCount = t("body").data(
            "enablebasketitemcount"
          )),
          (this.enableWishlistItemCount = t("body").data(
            "enablewishlistitemcount"
          )),
          (this.getBasketItemCountTries = 0),
          (this.getWishlistItemCountTries = 0),
          (this.noOfItemsInCart = 0),
          (this.currentOrientation = this.getScreenType()),
          (this.appPath = ""),
          (this.urlSuffixe = ".aspx"),
          (this.newsletterMessageClass = "newsletter-message"),
          (this.newsletterMessageEmptyClass = "empty"),
          (this.newsletterMessageNoCheckClass = "no-checked"),
          (this.newsletterMessageNotEmailClass = "not-email"),
          (this.newsletterFormSelector = "#newsletter"),
          (this.newsletterCheckSelector = "#newsletter_check"),
          (this.newsletterInputSelector = "#newsletter_field"),
          (this.commonNewsletterMessageClass = "common-newsletter-message"),
          (this.commonNewsletterMessageEmptyClass = "common-empty"),
          (this.commonNewsletterMessageNotEmailClass = "common-not-email"),
          (this.commonNewsletterFormSelector = "#common_newsletter"),
          (this.commonNewsletterInputSelector = "#common_newsletter_field"),
          (this.appPicture = t("#dl-app-picture")),
          (this.dataGlobal =
            t("#dataGlobal").length > 0
              ? JSON.parse(t.trim(t("#dataGlobal").text()))
              : {}),
          t("#customerProps").length > 0)
        ) {
          var i = JSON.parse(t.trim(t("#customerProps").text()));
          n.contextInfo.Customer.IsLoggedIn &&
            localStorage.setItem("isEmployee", i.isEmployee);
        }
        (n.callbackFunctions = {}), this.initEvents();
      },
      initEvents: function () {
        function p() {
          u.hasClass("inbenta-start--full") || b();
        }
        function w() {
          u.hasClass("inbenta-start--reduced") || b();
        }
        function b() {
          u.toggleClass("inbenta-start--reduced"),
            u.toggleClass("inbenta-start--full");
        }
        var i = this,
          r,
          o;
        t("input").focusout(function () {
          (input = t(this)),
            (inputId = t(this).attr("id")),
            (parentId = t(this).parents(".form-group").attr("id")),
            t(input).val() != "" ||
              t("#" + parentId).hasClass("has-error") ||
              t("#" + inputId + "_Error").hide();
        }),
          t("#cnil_privacy_btn_close").click(function () {
            t("#cnil_privacy").hide();
          }),
          t(".close-layer").click(function () {
            t("#cnil_privacy").hide();
          });
        t(".mainSiteLink").on("click", function (n) {
          n.preventDefault();
          var i = new Date();
          i.setTime(i.getTime() + 18e5),
            (document.cookie =
              "sitemode=full; path=/; expires=" +
              i.toGMTString() +
              "; domain=" +
              document.domain.substring(document.domain.indexOf(".laredoute"))),
            (location.href = t(this).data("href"));
        });
        t(n).on("load", function () {
          i.enableBasketItemCount && i.updateBasketCountItem(),
            i.enableWishlistItemCount && i.updateWishlistCountItem(),
            t(
              ".field > input:not(#passwordDisplaytextBox_loginPage_alreadyCustomer_password)"
            ).field(),
            t(".open-option-panel").optionPanel(),
            t(".plugin-popin").popin(),
            t(".apply-popin").popin(),
            t(".plugin-tooltip").tooltip(),
            t(".apply-tooltip").tooltip(),
            t(".apply-carousel").carousel(),
            t(".apply-side-panel").sidePanel(),
            t(".apply-dropdown").dropdown(),
            t(".apply-slider").slider(),
            t(".apply-progressbar").progressBar(),
            t(".apply-readmore").readmore();
        });
        var v = Utils.Enum.Form.Input.Email.ValidationRegExp,
          y = i.newsletterInputSelector,
          e = i.newsletterCheckSelector,
          f = i.newsletterMessageClass,
          s = i.newsletterMessageNoCheckClass;
        t("#header,#footer").on(
          "submit",
          i.newsletterFormSelector,
          function (n) {
            n.preventDefault();
            var r = t(this).find(y).val().trim();
            r != ""
              ? (t(this).find(".block-success").hide(),
                v.test(r) === !0
                  ? (t(this).find(e).length > 0 &&
                      t(this).find(e).isChecked()) ||
                    t(this).find(e).length === 0
                    ? _LaRedoute.newsletterRegistration(this, r, "footer")
                    : t(this)
                        .find("." + f + "." + s)
                        .show()
                  : t(this)
                      .find("." + f + "." + i.newsletterMessageNotEmailClass)
                      .show())
              : t(this)
                  .find("." + f + "." + i.newsletterMessageEmptyClass)
                  .show();
          }
        );
        t(i.commonNewsletterFormSelector).on("submit", function (n) {
          n.preventDefault();
          var r = t(i.commonNewsletterInputSelector).val();
          r != ""
            ? v.test(r) === !0
              ? (t(i.commonNewsletterCheckSelector).length > 0 &&
                  t(i.commonNewsletterCheckSelector).isChecked()) ||
                t(i.commonNewsletterCheckSelector).length === 0
                ? _LaRedoute.newsletterRegistration(this, r, "common")
                : t(
                    "." +
                      i.commonNewsletterMessageClass +
                      "." +
                      i.commonNewsletterMessageNoCheckClass
                  ).show()
              : t(
                  "." +
                    i.commonNewsletterMessageClass +
                    "." +
                    i.commonNewsletterMessageNotEmailClass
                ).show()
            : t(
                "." +
                  i.commonNewsletterMessageClass +
                  "." +
                  i.commonNewsletterMessageEmptyClass
              ).show();
        });
        t(y).on("keydown", function () {
          t("." + f + ":not(." + s + ")").hide();
        });
        t(i.commonNewsletterInputSelector).on("keydown", function () {
          t(
            "." +
              i.commonNewsletterMessageClass +
              ":not(." +
              i.commonNewsletterMessageNoCheckClass +
              ")"
          ).hide();
        });
        t(e).on("click", function () {
          t("." + f + "." + s).hide(),
            t("." + f + "." + Utils.Enum.Class.BlockInfo.Success).hide();
        });
        t(i.commonNewsletterCheckSelector).on("click", function () {
          t(
            "." +
              i.commonNewsletterMessageClass +
              "." +
              i.commonNewsletterMessageNoCheckClass
          ).hide(),
            t(
              "." +
                i.commonNewsletterMessageClass +
                "." +
                Utils.Enum.Class.BlockInfo.Success
            ).hide();
        });
        var g = function () {
            t("html,body").animate({ scrollTop: 0 }, 300);
          },
          u = t("#inbenta-start"),
          h,
          c = t(n).scrollTop();
        t(n).on("scroll", function () {
          h && n.clearTimeout(h),
            (h = n.setTimeout(function () {
              var i = t(n).scrollTop();
              if (n.innerHeight + n.pageYOffset >= document.body.offsetHeight) {
                w();
                return;
              }
              if (i <= 0) {
                p();
                return;
              }
              i > c ? w() : c > i && p(), (c = i);
            }, 25));
        });
        if (((r = t("#backToTop")), r.length > 0)) {
          (o = u && u.length > 0 && u.css("visibility") === "visible"),
            o && r.addClass("withInbentaButton--green");
          r.on("click", function () {
            g();
          });
          var l,
            k = "visibility-h",
            a = u.css("bottom"),
            nt = function () {
              r.addClass("in");
            },
            d = function () {
              r.removeClass("in"),
                setTimeout(function () {
                  r.addClass(k);
                }, 150);
            },
            tt = function () {
              r
                .css("bottom", a)
                .addClass("withInbentaButton--black aboveInbenta")
                .removeClass("withInbentaButton--green"),
                setTimeout(function () {
                  r.css("bottom", parseInt(a.replace("px", "")) + 64 + "px");
                }, 100);
            },
            it = function () {
              r.css("bottom", a)
                .addClass("withInbentaButton--green")
                .removeClass("withInbentaButton--black aboveInbenta");
            };
          t(n).on("scroll", function () {
            l && n.clearTimeout(l),
              (l = n.setTimeout(function () {
                var n = t(this).scrollTop(),
                  u = t("body").height(),
                  i = u - n;
                n > 200 && i > 900
                  ? (r.removeClass(k),
                    setTimeout(function () {
                      nt(), o && !r.hasClass("aboveInbenta") && tt();
                    }, 150))
                  : (n < 150 || i < 900) &&
                    (o && r.hasClass("aboveInbenta")
                      ? (it(),
                        setTimeout(function () {
                          d();
                        }, 150))
                      : d());
              }, 100));
          });
        }
        this.appPicture.length > 0 &&
          this.appPicture.attr("src", this.getAppPicto()).parent().show(),
          Utils.Common.isOldAndroid() && t("body").addClass("old-android");
      },
      getAppPicto: function () {
        var n = "/images/Common/",
          t = Utils.Common.getCountryCode().toLowerCase();
        return (
          Utils.Common.isAppleDevice()
            ? (n += this.hasAppPicto("Apple")
                ? Utils.Enum.AppPicture.Apple[t]
                : Utils.Enum.AppPicture.Apple["default"])
            : Utils.Common.isAndroidDevice()
            ? (n += this.hasAppPicto("Android")
                ? Utils.Enum.AppPicture.Android[t]
                : Utils.Enum.AppPicture.Android["default"])
            : (n = ""),
          n
        );
      },
      hasAppPicto: function (n) {
        return Utils.Enum.AppPicture[n][
          Utils.Common.getCountryCode().toLowerCase()
        ] !== i
          ? !0
          : !1;
      },
      updateBasketCountItem: function () {
        var n = this;
        return t.ajax({
          cache: !1,
          url: this.appPath + "/shoppingbasket/basketitemcount/",
          data: {},
          success: function (n) {
            n > 0 &&
              (t(".lr-icon.lr-icon-basket .badge").text(n),
              (_LaRedoute.getBasketItemCountTries = 0),
              (_LaRedoute.noOfItemsInCart = n));
          },
          error: function (t, i, r) {
            ++_LaRedoute.getBasketItemCountTries > 3
              ? console.error(
                  "AJAX on " +
                    this.url +
                    " method " +
                    this.type +
                    " status " +
                    t.status +
                    " statusText " +
                    t.statusText +
                    " error " +
                    r +
                    " response " +
                    t.responseText
                )
              : setTimeout(_LaRedoute.updateBasketCountItem.call(n), 500);
          },
        });
      },
      updateWishlistCountItem: function () {
        var n = this;
        return t.ajax({
          cache: !1,
          url: n.appPath + "/servicewishlistnosession/getwishlistitemcount",
          data: {},
          success: function (n) {
            var i = t(".lr-icon.lr-icon-wishlist-border .badge");
            n > 0
              ? (i.text(n), (_LaRedoute.getWishlistItemCountTries = 0))
              : i.text("");
          },
          error: function (t, i, r) {
            ++_LaRedoute.getWishlistItemCountTries > 3
              ? console.error(
                  "AJAX on " +
                    this.url +
                    " method " +
                    this.type +
                    " status " +
                    t.status +
                    " statusText " +
                    t.statusText +
                    " error " +
                    r +
                    " response " +
                    t.responseText
                )
              : setTimeout(_LaRedoute.updateWishlistCountItem.call(n), 500);
          },
        });
      },
      getAppleAppURL: function () {
        if (this.dataGlobal.country !== i) {
          var n;
          switch (this.dataGlobal.countryCode) {
            case "nl-BE":
              n = "nl";
              break;
            default:
              n = this.dataGlobal.country;
          }
          return "https://itunes.apple.com/" + n + "/app/id393136788";
        }
        return t("#dl-app-link").data("apple");
      },
      loadAppPushFromDeviceType: function () {
        var n = t("#dl-app-link"),
          i = t("#dl-app-picture");
        n.length > 0 &&
          (i.attr("src", this.getAppPicto()),
          Utils.Common.isAndroidDevice()
            ? n.attr("href", n.data("android")).show()
            : Utils.Common.isAppleDevice()
            ? n.attr("href", this.getAppleAppURL()).show()
            : t("#divMobilePush").hide());
      },
      newsletterRegistration: function (n, i, r) {
        var o = this,
          u = n instanceof t ? n : t(n),
          f = null,
          e;
        return (
          (f =
            r === "footer"
              ? [
                  o.newsletterMessageClass,
                  Utils.Enum.Class.BlockInfo.Default,
                  Utils.Enum.Class.BlockInfo.Success,
                ]
              : [
                  o.commonNewsletterMessageClass,
                  Utils.Enum.Class.BlockInfo.Default,
                  Utils.Enum.Class.BlockInfo.Success,
                ]),
          (e = "." + f.join(".")),
          t.ajax({
            cache: !1,
            url: o.appPath + "/customerservices/newslettersubscribefr",
            data: {
              email: i,
              zone: r,
              virtualsite: t("#idVirtualSite").val(),
              serviceName: "",
            },
            beforeSend: function (n) {
              u.addLoading(), n.status !== 200 && u.removeLoading();
            },
            success: function (n) {
              t(e).length === 0 &&
                t("<div />", { class: f.join(" ") }).appendTo(u),
                t(".newsletter-message").hide(),
                t(e).text(n.message).show(),
                n.isSuccess === !1 &&
                  t(e).removeClass("block-success").addClass("text-danger");
            },
            error: function () {
              throw "Newsletter registration: Failure";
            },
            complete: function () {
              u.removeLoading();
            },
          })
        );
      },
      getScreenType: function (t) {
        var i = n
          .getComputedStyle(document.body, ":after")
          .getPropertyValue("content");
        i = parseInt(i.replace(/'/g, "").replace(/"/g, ""));
        switch (t) {
          case "object":
            if (i === 1) return { id: 1, name: "xs" };
            if (i === 2) return { id: 2, name: "sm" };
            if (i === 3) return { id: 3, name: "md" };
            if (i === 4) return { id: 4, name: "lg" };
          case "name":
            if (i === 1) return "xs";
            if (i === 2) return "sm";
            if (i === 3) return "md";
            if (i === 4) return "lg";
          default:
            return i;
        }
      },
      updateOrientation: function () {
        var t = this;
        t.currentOrientation = t.getScreenType();
      },
      LoadMyRedouteLightBox: function (n, i, r, u) {
        var o = this,
          f = t("#divMyRedouteLightboxPlaceholder"),
          e;
        f &&
          ((e = { request: { MediaId: n, IsMobile: r } }),
          t
            .ajax({
              url:
                _LaRedoute.appPath + "/servicemyredoute/loadmyredoutelightbox",
              data: JSON.stringify(e),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: "POST",
            })
            .done(function (r) {
              if ((r.d != null && (r = r.d), r.IsSuccess)) {
                Utils.CookieManager.CreateCookie(
                  "quickzoomshoppingtool",
                  "UserGeneratedContent"
                );
                var h = t("<div>", {
                  id: "myRedouteLightboxPopin",
                  class: "popin my-redoute-lightbox-popin",
                  html: r.Html,
                });
                (f.$container = h),
                  h.popin("open"),
                  (_page.Blocs.MyRedoute = new UiMyRedouteLightbox(
                    o,
                    "UiMyRedouteLightbox",
                    n,
                    i,
                    u
                  ));
              }
            }));
      },
      ReportMyRedouteMedia: function (n, i, r, u) {
        var e = this,
          f = { request: { MediaId: n, Email: i, Reason: r } };
        t.ajax({
          url: _LaRedoute.appPath + "/servicemyredoute/reportmyredoutemedia",
          data: JSON.stringify(f),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          type: "POST",
        }).done(function (n) {
          n.d != null && (n = n.d), u(n.IsSuccess);
        });
      },
    };
  })(window, jQuery)),
  $(function () {
    _LaRedoute.init(),
      _UiHeader.Init(),
      $(window).width() <= 768 &&
        (Utils.StorageManager.ReadStorageValue("lr-keyFrameSupported", !1) ===
        !1
          ? animeJsKeyFrame()
          : keyFrameSupported());
  }),
  typeof _satellite == "undefined" &&
    ((_satellite = {}), (_satellite.track = function () {})),
  (function (n, t) {
    "use strict";
    n.UiMenuV2 = n.UiBloc.extend({
      init: function (n, i) {
        var r = this;
        r._super(n, i);
        var f = t("<a>", { class: "highlight" }),
          e = t("<img>", { class: "highlight_image" }),
          o = t("<div>", { class: "highlight_textContainer" }),
          s = t("<span>", { class: "highlight_title" }),
          c = t("<img>", { class: "highlight_logo" }),
          l = t("<img>", { class: "highlight_picto" }),
          h = t("<span>", { class: "highlight_subtitle" }),
          a = t("<a>", { class: "selection" }),
          v = t("<span>", { class: "selection_title" }),
          u = "shoppingtool=treestructureflyout",
          y = 3;
        (r.createBrandHighlight = function (i) {
          var r, h, s, l, a;
          if (
            (t.each(i, function (n, t) {
              switch (t.Name) {
                case "link":
                  s = t.LinkDesktop;
                  break;
                case "background":
                  r = t.ImageURL;
                  break;
                case "logo":
                  h = t.ImageURL;
              }
            }),
            r && h && s)
          )
            return (
              (l = "#"),
              s.indexOf("#") > 0 && (l = "&"),
              (a = f
                .clone()
                .attr("href", s + l + u)
                .append(o.clone().append(c.clone().attr("src", h)))),
              n.isMobileDevice
                ? a.prepend(e.clone().attr("src", r))
                : a.css("background-image", "url(" + r + ")")
            );
          console.error(
            "Required data are missing to create brand highlight | imgUrl : " +
              r +
              " | logoUrl : " +
              h +
              " | url : " +
              s
          );
        }),
          (r.createHighlight = function (i) {
            var r, l, v, y, c, a, p, w;
            if (
              (t.each(i, function (n, t) {
                switch (t.Name) {
                  case "link":
                    c = t.LinkDesktop;
                    break;
                  case "background":
                    r = t.ImageURL;
                    break;
                  case "subtitleLine1":
                    v = t.Text;
                    break;
                  case "subtitleLine2":
                    y = t.Text;
                    break;
                  case "title":
                    l = t.Text;
                }
              }),
              r && l && c)
            )
              return (
                (a = o.clone().append(s.clone().text(l))),
                v && a.append(h.clone().text(v)),
                y && a.append(h.clone().text(y)),
                (p = "#"),
                c.indexOf("#") > 0 && (p = "&"),
                (w = f
                  .clone()
                  .attr("href", c + p + u)
                  .append(a)),
                n.isMobileDevice
                  ? w.prepend(e.clone().attr("src", r))
                  : w.css("background-image", "url(" + r + ")")
              );
            console.error(
              "Required data are missing to create highlight | imgUrl : " +
                r +
                " | title : " +
                l +
                " | url : " +
                c
            );
          }),
          (r.createServiceHighlight = function (n) {
            var r, e, o, i, h;
            if (
              (t.each(n, function (n, t) {
                switch (t.Name) {
                  case "link":
                    i = t.LinkDesktop;
                    break;
                  case "background":
                    r = t.ImageURL;
                    break;
                  case "pictogram":
                    e = t.ImageURL;
                    break;
                  case "title":
                    o = t.Text;
                }
              }),
              r && e && o && i)
            )
              return (
                (h = "#"),
                i.indexOf("#") > 0 && (h = "&"),
                f
                  .clone()
                  .attr("href", i + h + u)
                  .css("background-image", "url(" + r + ")")
                  .append(l.clone().attr("src", e))
                  .append(s.clone().text(o))
              );
            console.error(
              "Required data are missing to create service highlight | imgUrl : " +
                r +
                " | pictoUrl : " +
                e +
                " | title : " +
                o +
                " | url : " +
                i
            );
          }),
          (r.createSelection = function (n) {
            var r, f, i, e;
            if (
              (t.each(n, function (n, t) {
                switch (t.Name) {
                  case "link":
                    i = t.LinkDesktop;
                    break;
                  case "background":
                    r = t.ImageURL;
                    break;
                  case "title":
                    f = t.Text;
                }
              }),
              r && f && i)
            )
              return (
                (e = "#"),
                i.indexOf("#") > 0 && (e = "&"),
                a
                  .clone()
                  .attr("href", i + e + u)
                  .css("background-image", "url(" + r + ")")
                  .append(v.clone().text(f))
              );
            console.error(
              "Required data are missing to create selection | imgUrl : " +
                r +
                " | text : " +
                f +
                " | url : " +
                i
            );
          });
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    var i = "dropdown";
    (t[i] = function (r, u) {
      function p() {
        return c && c.length > 0;
      }
      function it() {
        return l && l.length > 0;
      }
      function rt() {
        return h.hasClass("custom-dropdown-header--chevron");
      }
      var f = this,
        e = t(r),
        a = u,
        w = 200,
        o = !1,
        s = !1,
        h = e.find(".custom-dropdown-header:first"),
        b = e.find(".custom-dropdown-content:first"),
        c = h.find(".lr-arrow"),
        v = "lr-arrow-down",
        k = "lr-arrow-up",
        d = n.isMobileDevice
          ? ["lr-icon-chevron-big-bottom", "lr-icon-chevron-big-top"]
          : ["lr-icon-chevron-small-bottom", "lr-icon-chevron-small-top"],
        y = d[0],
        g = d[1],
        l = t("<i>", { class: "custom-dropdown-chevron lr-icon " + y }),
        nt = "opened",
        tt = "aria-expanded";
      (f.open = function () {
        o ||
          s ||
          ((s = !0),
          (o = !0),
          a.group !== undefined &&
            t(a.group).find(".custom-dropdown.opened:first").length > 0 &&
            t(a.group)
              .find(".custom-dropdown.opened:first")
              .data("dropdown")
              .close(),
          b.stop().slideDown({
            duration: w,
            start: function () {
              p() && c.removeClass(v).addClass(k),
                it() && l.removeClass(y).addClass(g);
            },
            complete: function () {
              (s = !1), e.addClass(nt).attr(tt, !0).trigger(dropdownEvent.open);
            },
          }));
      }),
        (f.close = function (n) {
          if (o && !s) {
            (s = !0), (o = !1);
            var t = n ? w : 0;
            b.stop().slideUp({
              duration: t,
              start: function () {
                p() && c.removeClass(k).addClass(v),
                  it() && l.removeClass(g).addClass(y);
              },
              complete: function () {
                (s = !1),
                  e.removeClass(nt).attr(tt, !1).trigger(dropdownEvent.close);
              },
            });
          }
        }),
        (f.destroy = function () {
          f.close(!1), h.off("click"), e.removeData(i);
        });
      h.on("click", function () {
        o ? f.close() : e.hasClass("disabled") || f.open();
      });
      p() && c.addClass(v),
        rt() && h.append(l),
        h.hasClass("preopened") &&
          (o
            ? f.close()
            : e.hasClass("disabled") ||
              (f.open(),
              t("html, body").animate(
                { scrollTop: t(".preopened").offset().top },
                2e3
              )));
    }),
      (t.fn[i] = function (n) {
        return this.each(function () {
          var r = t(this),
            f,
            e,
            u;
          r.data(i) === undefined &&
            ((f = r.data()),
            typeof n === varType.obj && t.extend(f, n),
            (e = new t[i](this, f)),
            r.data(i, e)),
            typeof n === varType.str
              ? (u = r.data(i)[n])
              : typeof n === varType.obj &&
                typeof n.method === varType.str &&
                (u = r.data(i)[n.method]),
            typeof u === varType.fn && u.apply(this);
        });
      });
  })(window, jQuery),
  (dropdownEvent = { close: "dropdown.close", open: "dropdown.open" }),
  (function (n, t) {
    "use strict";
    var i = "#header #autocompleteList";
    n.UiSearch = n.UiBloc.extend({
      init: function (r, u) {
        this._super(r, u);
        var f = this,
          r = f.Page,
          o = f.Model,
          ut = 3,
          p,
          s = 0,
          ft = { top: 38, bottom: 40 },
          w,
          h = "",
          a = "",
          c = n.globalTrackingEvent.SHOPPING_TOOL_USED,
          l = "autocomplete-result",
          v = "data-cerberus",
          y = "data-position",
          et = "for-search",
          b = "hovered",
          ot = "resultSuggestion",
          st = "show";
        (f.isOpen = !1), (f.maxSearchHistory = 5), (f.maxSearchSuggestions = 5);
        var e = t("#autocompleteList"),
          k = t("#eraseSearchButton"),
          d = t(".block-search-suggestion"),
          pt = t("#error_search_field"),
          g = t("#overlay");
        (f.$container = t(".block-search")),
          (f.$input = t("#header_search_field"));
        var ht = function () {
            e.hide(), it();
          },
          wt = function () {
            f.$input.val(""), lt(), f.$input.focus(), ht();
          },
          ct = function (n) {
            return Utils.Common.RemoveAccents(
              n
                .replace(/\./g, "")
                .replace(/[\/\+!”£$%\*&^‘.|:"]/g, " ")
                .replace(/\s\s+/g, " ")
            );
          },
          bt = function () {
            s += 1;
            var n = t(i).find("." + l + "[" + y + '="' + s + '"]');
            n.length > 0 ? rt(n) : (s -= 1);
          },
          kt = function () {
            s -= 1;
            var n = t(i).find("." + l + "[" + y + '="' + s + '"]');
            n.length > 0 ? rt(n) : it();
          },
          dt = function (n) {
            (n = n || 0), t("html, body").animate({ scrollTop: 0 }, n);
          },
          lt = function () {
            k.hide();
          },
          nt = function () {
            g.removeClass(et);
          },
          gt = function () {
            e.slideDown(300),
              o.$eventContainer.trigger("search.open.autocomplete");
          },
          tt = function (n, i, r) {
            f.$container.trigger("search.validate");
            var e = function () {
              var u, f, e;
              i !== undefined && i.preventDefault(),
                n !== "" &&
                  ((u = ""),
                  (f = t("#idVirtualSite")),
                  f.length > 0 && (u = "&virtualsite=" + f.val()),
                  (e = "/psrch/psrch.aspx?kwrd=" + encodeURIComponent(n) + u),
                  r && (e += "#" + r),
                  (window.location = e));
            };
            if (
              typeof f.history == "object" &&
              (Utils.Common.isAppleDevice() || Utils.Common.isFirefoxDevice())
            )
              f.history.$container.one("history.searchTermAdded", function () {
                e();
              });
            else e();
          },
          it = function () {
            (s = 0), yt();
          },
          rt = function (n) {
            yt(), n.addClass(b);
          },
          at = function () {
            k.show();
          },
          ni = function () {
            r.isMobileDevice && dt(), f.$container.addClass(st);
          },
          vt = function () {
            g.addClass(et);
          },
          yt = function () {
            t(i)
              .find("." + l)
              .removeClass(b);
          },
          ti = function () {
            var n = !0,
              i = !0;
            a.length >= ut
              ? (p = setTimeout(function () {
                  t.ajax({
                    url:
                      "/producthelper/getsearchsuggestionsv2?searchterm=" +
                      a +
                      "&noOfResults=" +
                      f.maxSearchSuggestions,
                    type: "GET",
                    cache: !1,
                    success: function (u) {
                      var c = u.Suggestions,
                        p = u.SuggestionCategories,
                        h = 1,
                        w = function () {
                          return a.length >= ut && s.length > 0;
                        },
                        s,
                        o,
                        b,
                        k;
                      if (c !== undefined)
                        if ((e.empty(), (s = c.Labels), w()))
                          for (
                            e.append(
                              t("<li>")
                                .addClass(
                                  "result-title block-search-suggestion-title"
                                )
                                .html(
                                  t("<div />")
                                    .html(c.ZoneTitle)
                                    .attr(
                                      v,
                                      "area_searchEngine_wordSuggestion1"
                                    )
                                )
                            ),
                              o = 0;
                            o < s.length && o < f.maxSearchSuggestions;
                            o++
                          )
                            e.append(
                              t("<li>")
                                .addClass(
                                  "block-search-suggestion-result result " + l
                                )
                                .attr(y, h)
                                .html(t("<div />").html(s[o]).text())
                                .attr(
                                  v,
                                  "area_searchEngine_wordSuggestion" + (o + 1)
                                )
                            ),
                              h++;
                        else n = !1;
                      if (p.Categories !== undefined)
                        if (((s = p.Categories), w()))
                          for (
                            e.append(
                              t("<li>")
                                .addClass(
                                  "result-title block-search-suggestion-title"
                                )
                                .html(
                                  t("<div />")
                                    .html(p.ZoneTitle)
                                    .attr(
                                      v,
                                      "area_searchEngine_categorySuggestion1"
                                    )
                                )
                            ),
                              o = 0;
                            o < s.length && o < f.maxSearchSuggestions;
                            o++
                          )
                            (b = t("<div/>").html(s[o].Name).text()),
                              (k = t("<a>")
                                .attr(
                                  "href",
                                  "/cat/cat-" + s[o].Id + r.urlSuffixe
                                )
                                .html(b)),
                              e.append(
                                t("<li>")
                                  .addClass(
                                    "resultSuggestion block-search-suggestion-result " +
                                      l
                                  )
                                  .attr(y, h)
                                  .html(
                                    t("<div />")
                                      .append(k)
                                      .attr(
                                        v,
                                        "area_searchEngine_categorySuggestion" +
                                          (o + 1)
                                      )
                                  )
                              ),
                              h++;
                        else i = !1;
                      n || i ? (gt(), vt()) : nt(0);
                    },
                    error: function () {
                      console.error("erreur (service hs)");
                    },
                  });
                }, 300))
              : e.hide();
          };
        (f.CloseSearch = function () {
          f.$container.removeClass(st),
            nt(),
            f.$input.blur(),
            d.hide(),
            f.$container.trigger("search.close"),
            (f.isOpen = !1);
        }),
          (f.searchBySuggestion = function (n, i, r) {
            var e = this,
              u = "keyword-selected",
              f = n.text();
            d.find("." + u).removeClass(u),
              n.addClass(u),
              e.$input.val(f),
              setTimeout(function () {
                var n = "";
                i === "autocomplete"
                  ? Utils.StorageManager.CreateStorageValue(
                      "OmnitureEntry_Autocomplete",
                      "1"
                    )
                  : i === "history" &&
                    (Utils.StorageManager.CreateStorageValue(
                      "OmnitureEntry_Autocomplete_SearchHistory",
                      "1"
                    ),
                    (n = "&shoppingtool=search")),
                  tt(f, t.noop(), "headerSearchContainer" + n, r);
              }, 200);
          });
        k.on("click", function () {
          wt();
        });
        f.$input.on("focus", function () {
          vt(),
            ni(),
            d.show(),
            f.history === undefined &&
              (f.history = new UiSearchHistory(r, "UiSearchHistory", f)),
            f.$container.trigger("search.focus"),
            (f.isOpen = !0);
        });
        f.$input.on("keyup", function (n) {
          var u = h !== f.$input.val(),
            i,
            r;
          (h = f.$input.val()),
            n.keyCode === 13
              ? w && s > 0
                ? ((i = f.$container.find("." + b)),
                  i.hasClass(ot)
                    ? (o.$eventContainer.trigger(c, [
                        {
                          type: "SEARCH",
                          subType: "Internal",
                          extraData: [
                            parseInt(i.data("position")) -
                              t(".resultSuggestion").length,
                            "cat-autocompletion",
                          ],
                          keyword: i.text(),
                        },
                      ]),
                      Utils.StorageManager.CreateStorageValue(
                        "OmnitureEntry_Autocomplete_Category",
                        "1"
                      ),
                      (window.location.href = i.find("a").attr("href")))
                    : (o.$eventContainer.trigger(c, [
                        {
                          type: "SEARCH",
                          subType: "Internal",
                          extraData: [
                            i.data("position"),
                            "keyword-autocompletion",
                          ],
                          keyword: i.text(),
                        },
                      ]),
                      f.searchBySuggestion(i, "autocomplete", !0)))
                : ((r = ct(t(this).val())),
                  o.$eventContainer.trigger(c, [
                    {
                      type: "SEARCH",
                      subType: "Internal",
                      extraData: [0, "internal"],
                      keyword: r,
                    },
                  ]),
                  tt(r, n))
              : n.keyCode === ft.bottom
              ? bt()
              : n.keyCode === ft.top
              ? kt()
              : u &&
                (w &&
                  ((a = h.replace(/\./g, "")),
                  p !== undefined && clearTimeout(p),
                  ti()),
                f.history !== undefined &&
                  (h.length > 0
                    ? f.history.closeSearchHistory()
                    : f.history.openSearchHistory()),
                h.length >= 1 ? at() : lt());
        });
        if (e.length > 0)
          e.on("click", "." + ot, function () {
            o.$eventContainer.trigger(c, [
              {
                type: "SEARCH",
                subType: "Internal",
                extraData: [
                  parseInt(t(this).data("position")) -
                    t(".resultSuggestion").length,
                  "cat-autocompletion",
                ],
                keyword: t(this).text(),
              },
            ]),
              Utils.StorageManager.CreateStorageValue(
                "OmnitureEntry_Autocomplete_Category",
                "1"
              );
          })
            .on("click", ".result", function () {
              o.$eventContainer.trigger(c, [
                {
                  type: "SEARCH",
                  subType: "Internal",
                  extraData: [
                    t(this).data("position"),
                    "keyword-autocompletion",
                  ],
                  keyword: t(this).text(),
                },
              ]),
                f.searchBySuggestion(t(this), "autocomplete");
            })
            .on("mouseover", "." + l, function () {
              it(), (s = parseInt(t(this).data("position"))), rt(t(this));
            });
        g.on("click", function () {
          f.isOpen && f.CloseSearch();
        });
        o.$eventContainer.on("menu.open", function () {
          ht(), nt();
        });
        t(".block-search-validate").on("click", function () {
          var i = f.$input,
            n;
          t.contains(t("#corePage").get(0), t(this).get(0)) && (i = pt),
            (n = ct(i.val())),
            o.$eventContainer.trigger(c, [
              {
                type: "SEARCH",
                subType: "Internal",
                extraData: [0, "internal"],
                keyword: n,
              },
            ]),
            tt(n, t.noop(), "", !0);
        });
        (w = e.length > 0),
          f.$input.val().length >= 1 && ((h = f.$input.val()), at());
      },
    });
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    n.SocialProfileReach5 = n.UiBloc.extend({
      init: function (i, r) {
        function tt() {
          u.$containerSocialLogin.removeLoading(), f.removeLoading();
        }
        function it() {
          var n = t("#socialLoginSnackbar");
          n.length === 0
            ? (t("<div>", {
                id: "socialLoginSnackbar",
                class: "snackbar snackbar--warning",
              })
                .appendTo("body")
                .append("<div>" + e.SocialLoginTooSlow + "</div>")
                .snackbar({ timeout: 1e4 }),
              t("#socialLoginSnackbar").snackbar("open"))
            : n.snackbar("open");
        }
        function rt() {
          var n = "socialLoginOverlay",
            i = "#" + n;
          t(i).length === 0 &&
            t("<div>", {
              id: n,
              class: "social-login-overlay",
              text: e.ServiceDown,
            }).appendTo(u.$containerSocialLogin),
            t(i).show();
        }
        function v() {
          tt(), rt();
        }
        var u = this,
          a,
          y,
          p;
        u._super(i, r),
          (u.$containerSocialLogin = t(".social-login-container"));
        var w = t(".btn-social-unlink"),
          b = t("#inputPassword"),
          s = t(".container-login"),
          f = t("body"),
          h = t("#iconProfil"),
          e = n.labels.MobileV3_Common,
          k = "/login/login" + n._LaRedoute.urlSuffixe,
          c = "socialProfileLoaded",
          o = 400,
          d = new Date(),
          g = d.getTime(),
          l = 3e4,
          nt = 1e4;
        if (!n.reach5) {
          (n.checkIfReach5LoadedAttempts = n.checkIfReach5LoadedAttempts || 0),
            (a = setInterval(function () {
              n.checkIfReach5LoadedAttempts >= 2 && (v(), clearInterval(a)),
                n.reach5 && (_page.Blocs.SocialLogin = new n[r](i, r)),
                (n.checkIfReach5LoadedAttempts =
                  n.checkIfReach5LoadedAttempts + 1);
            }, 1e3));
          return;
        }
        if (
          ((u.isAuthenticating = !1),
          n.location.hash.indexOf("token") > -1 &&
            n.location.href.indexOf("login") === -1 &&
            (h.feedback("add"), f.addLoading()),
          t(document).data(c))
        )
          return this;
        t(document).data(c, !0),
          (y = function () {
            var i = t.Deferred();
            return (
              n.reach5("on", "authenticated", function (r) {
                var e;
                if (
                  ((u.isAuthenticating = !0),
                  s.addLoading(),
                  (e = setTimeout(function () {
                    o && o.abort(),
                      s.removeLoading(),
                      h.feedback("remove"),
                      f.removeLoading(),
                      it();
                  }, nt)),
                  r.accessToken !== "undefined")
                )
                  var c = {
                      request: { Reach5Token: r.idToken, hash: r.state },
                    },
                    l = JSON.stringify(c),
                    o = t.ajax({
                      url: "/customerservices/logincustomer",
                      async: !0,
                      cache: !1,
                      type: "POST",
                      headers: { "cache-control": "no-cache" },
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      data: l,
                      success: function (t) {
                        if (t.RedirectUrl) {
                          (n.location.href = t.RedirectUrl), i.resolve(t);
                          return;
                        }
                        t.Email && t.Reach5Token
                          ? (u.Page.Blocs.UiSocialAccountLinking.displayLinkingLoginForm(
                              t,
                              k
                            ),
                            i.resolve(t))
                          : n.location.reload();
                      },
                      error: function (n) {
                        i.reject(n), u.$containerSocialLogin.removeLoading();
                      },
                      complete: function () {
                        clearTimeout(e);
                      },
                    });
              }),
              i.promise()
            );
          }),
          (p = function (n) {
            var i = n.data("provider"),
              r =
                "/customerservices/RemoveCustomerSocialProvider?provider=" + i;
            return t.ajax({
              url: r,
              async: !0,
              cache: !1,
              type: "GET",
              headers: { "cache-control": "no-cache" },
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (r) {
                r.IsSuccess
                  ? setTimeout(function () {
                      n.fadeOut(o, function () {
                        t(this)
                          .after(
                            '<div class="flex info-unlink-social"><i class="icon icon-check-ok"></i>' +
                              e.SocialLoginUnbinding.replace("{provider}", i) +
                              "</div>"
                          )
                          .remove();
                      }),
                        setTimeout(function () {
                          t(".info-unlink-social").fadeOut(o, function () {
                            t(".container-remove-social-" + i).slideUp();
                          }),
                            t(".btn-social-unlink").length === 0 &&
                              t(".titleHasSocialProfiles").fadeOut(
                                o,
                                function () {
                                  t(".titleNoSocialProfiles").show();
                                }
                              );
                        }, 3e3);
                    }, 400)
                  : t(".error-unlink").show();
              },
              complete: function () {
                u.$containerSocialLogin.removeLoading();
              },
            });
          });
        t("#textBox_loginPage_alreadyCustomer_password").on(
          "focus blur",
          function () {
            t(".btn-social-validate-login").length > 0 &&
              (t(".block-error").remove(),
              b
                .removeClass("has-feedback has-error")
                .find("i")
                .removeClass("icon-remove"));
          }
        );
        n.reach5("on", "ready", function () {
          t(document).on("click", ".btn-social-login", function () {
            var u = t(this),
              r = u.data("provider"),
              o = u.closest(".social-login-providers").data("origin"),
              f = "OmnitureEntry_SocialLogin_eVar51",
              i,
              e;
            n.Utils.StorageManager.EraseStorageValue(f, !0),
              (i = r.charAt(0).toUpperCase()),
              (i = i + r.slice(1).toLowerCase()),
              n.Utils.StorageManager.CreateStorageValue(f, "Login:" + i),
              localStorage.setItem("connectWithoutSocialLogin", !1),
              (e = n.location.hash),
              n.reach5("loginWithSocialProvider", r, {
                scope: "profile email phone openid address",
                state: encodeURIComponent(e),
                origin: o,
              });
          });
          if (Utils.UrlManager.GetHashValue("basketToLogin") === "true") {
            var i = {
              Email: Utils.UrlManager.GetHashValue("email"),
              Reach5Token: Utils.UrlManager.GetHashValue("token"),
            };
            u.Page.Blocs.UiSocialAccountLinking.displayLinkingLoginForm(i);
          }
          u.$containerSocialLogin.removeLoading(), y();
        });
        w.on("click", function () {
          var n = t(this);
          n.feedback("add"), p(n);
        });
        setTimeout(function () {
          u.$containerSocialLogin.hasClass("loading") &&
            isLoadingIsTooSlow() &&
            !u.isAuthenticating &&
            v();
        }, l);
      },
    });
  })(window, jQuery),
  (omnitureSessionVarsToClear = []),
  (_OmnitureTracking = (function (n, t, i) {
    return {
      finaliseTracking: function () {
        var u, f, r, e;
        for (
          this.handleShoppingTool(),
            this.handleOpeco(),
            this.handleCheckoutHistoryTracking(),
            this.checkSiteSectionVariables(),
            this.setEvar31AndProp31(),
            this.setEvent51(),
            this.setEvent76(),
            this.setEvar19(),
            this.setProp28(),
            this.setEvar97(),
            Utils.UrlManager.GetHashValue("mrslink") != null &&
              (n.wa_data.prop24 = Utils.UrlManager.GetHashValue("mrslink")),
            (pageType == PageTypeEnum.ListPage ||
              pageType == PageTypeEnum.ListPageBrand) &&
              n.wa_data.prop12 != i &&
              n.wa_data.prop12.toLowerCase() == "redirmoteur" &&
              Utils.OmnitureManager.removeEvents("event126"),
            u = Utils.UrlManager.GetHashValue("fbc"),
            u &&
              u != "connectAccount" &&
              Utils.UrlManager.RemoveHashValue("fbc"),
            u == "loggedInAccount"
              ? (n.wa_data.eVar51 = "Creation Account")
              : u == "registeredAccount" &&
                (Utils.OmnitureManager.addEvents("event34"),
                (n.wa_data.eVar51 = "Login Account")),
            f = Utils.StorageManager.ReadStorageValue(
              "OmnitureEntry_SocialLogin_eVar51"
            ),
            n.wa_data.eVar51 = "",
            n.wa_data.prop51 = "",
            f != null &&
            f != "" &&
            n.wa_data.pageName.indexOf("Fiche Produit") < 0
              ? document.referrer.indexOf("register") > 0
                ? ((r = n.wa_data.events.split(",")),
                  t.each(r, function (t, i) {
                    if (i == "event1")
                      return (
                        (n.wa_data.eVar51 =
                          "Account Creation " + f.split(":")[1]),
                        (n.wa_data.prop51 =
                          "Account Creation " + f.split(":")[1]),
                        !1
                      );
                  }))
                : document.referrer.indexOf("login") > 0 &&
                  n.wa_data.pageName.indexOf("register") < 0 &&
                  ((r = n.wa_data.events.split(",")),
                  t.each(r, function (t, i) {
                    if (i == "event1")
                      return (
                        (n.wa_data.eVar51 = f.replace(":", " ")),
                        (n.wa_data.prop51 = f.replace(":", " ")),
                        !1
                      );
                  }))
              : document.referrer.indexOf("register") > 0 &&
                n.wa_data.pageName.indexOf("register") > 0
              ? ((n.wa_data.eVar51 = "Account Creation Navigation"),
                (n.wa_data.prop51 = "Account Creation Navigation"))
              : document.referrer.indexOf("login") > 0 &&
                n.wa_data.pageName.indexOf("register") < 0 &&
                document.referrer.indexOf("login=checkout") < 0 &&
                n.wa_data.length > 0
              ? ((r = n.wa_data.events.split(",")),
                t.each(r, function (t, i) {
                  if (i == "event1")
                    return (
                      (n.wa_data.eVar51 = "Login Navigation"),
                      (n.wa_data.prop51 = "Login Navigation"),
                      !1
                    );
                }))
              : document.referrer.indexOf("register") > 0 &&
                n.wa_data.pageName.indexOf("Fiche Produit") > 0
              ? ((r = n.wa_data.events.split(",")),
                t.each(r, function (t, i) {
                  if (i == "event1")
                    return (
                      (n.wa_data.eVar51 = "Creation Wishlist PDP"),
                      (n.wa_data.prop51 = "Creation Wishlist PDP"),
                      !1
                    );
                }))
              : document.referrer.indexOf("login") > 0 &&
                n.wa_data.pageName.indexOf("Fiche Produit") > 0 &&
                ((n.wa_data.eVar51 = "Login Wishlist PDP"),
                (n.wa_data.prop51 = "Login Wishlist PDP")),
            document.referrer.indexOf("basketregister") > 0 &&
              n.wa_data.pageName.indexOf("Choix du mode de livraison") > 0 &&
              ((n.wa_data.eVar51 = "Account Creation Basket"),
              (n.wa_data.prop51 = "Account Creation Basket")),
            u == "loginConnectAccount" &&
              Utils.OmnitureManager.addEvents("event34"),
            u == "connectAccount" && Utils.OmnitureManager.addEvents("event34"),
            e = 0;
          e < omnitureSessionVarsToClear.length;
          e++
        )
          Utils.StorageManager.EraseStorageValue(omnitureSessionVarsToClear[e]);
      },
      finaliseTrackingForDirectCall: function () {
        (pageType == PageTypeEnum.ListPage ||
          pageType == PageTypeEnum.SearchPage ||
          pageType == PageTypeEnum.SerpPage ||
          pageType == PageTypeEnum.ListPageBrand ||
          pageType == PageTypeEnum.ListPageComparator) &&
          ((n.wa_data.eVar27 = n.wa_data_backup.eVar27),
          (n.wa_data.eVar33 = n.wa_data_backup.eVar33),
          (n.wa_data.eVar69 = n.wa_data_backup.eVar69),
          delete n.wa_data.prop12,
          delete n.wa_data.eVar12),
          this.checkSiteSectionVariables(),
          this.setEvar19();
        var t = Utils.CookieManager.ReadCookie("quickzoomshoppingtool");
        pageType == PageTypeEnum.MyRedouteLightBox &&
          typeof t != "undefined" &&
          (n.wa_data.eVar12 = n.wa_data.prop12 = t);
      },
      checkSiteSectionVariables: function () {
        Utils.Common.isLocalStorageEnabled() &&
          (Utils.StorageManager.ReadStorageValue("FirstEntry") ||
            (Utils.OmnitureManager.addEvents("event18"),
            Utils.StorageManager.CreateStorageValue("FirstEntry", !0)));
      },
      handleShoppingTool: function () {
        Utils.UrlManager.GetHashValue("shoppingtool") != null
          ? Utils.CookieManager.CreateCookie(
              "mainshoppingtool",
              Utils.UrlManager.GetHashValue("shoppingtool")
            )
          : n.wa_data.prop12 != i &&
            Utils.CookieManager.CreateCookie(
              "mainshoppingtool",
              n.wa_data.prop12
            ),
          (pageType == PageTypeEnum.LandingPage ||
            pageType == PageTypeEnum.ListPage ||
            pageType == PageTypeEnum.ListPageBrand ||
            pageType == PageTypeEnum.SearchPage ||
            pageType == PageTypeEnum.SerpPage ||
            pageType == PageTypeEnum.ProductPage ||
            pageType == PageTypeEnum.MultiProductPage ||
            pageType == PageTypeEnum.AddToCartLayer ||
            pageType == PageTypeEnum.WishList ||
            pageType == PageTypeEnum.StaticPage ||
            pageType == PageTypeEnum.ErrorPage) &&
            (Utils.UrlManager.GetHashValue("opeco") != null
              ? ((n.wa_data.prop12 = "internalcampaign"),
                Utils.UrlManager.GetHashValue("opeco") == "selection_hp" &&
                  ((n.wa_data.prop12 = "selection_hp"),
                  (n.wa_data.eVar12 = n.wa_data.prop12)))
              : Utils.UrlManager.GetHashValue("shoppingtool") != null
              ? (n.wa_data.prop12 = Utils.UrlManager.GetHashValue(
                  "shoppingtool"
                ))
              : Utils.CookieManager.ReadCookie("mainshoppingtool") &&
                (n.wa_data.prop12 = Utils.CookieManager.ReadCookie(
                  "mainshoppingtool"
                )),
            pageType == PageTypeEnum.ProductPage &&
              n.wa_data.prop12 != i &&
              (n.wa_data.prop12 ==
                Utils.UrlManager.GetHashValue("shoppingtool") ||
                n.wa_data.prop12 ==
                  Utils.CookieManager.ReadCookie("mainshoppingtool")) &&
              ((n.wa_data.eVar12 = n.wa_data.prop12),
              n.wa_data.prop12 == "associatedlookpdp" &&
                (n.wa_data.eVar73 = "ShopTheLook")),
            n.wa_data.prop12 != i &&
              n.wa_data.prop12 != "undefined" &&
              Utils.CookieManager.CreateCookie(
                "mainshoppingtool",
                n.wa_data.prop12
              ));
      },
      handleOpeco: function () {
        Utils.UrlManager.GetHashValue("opeco") != null &&
          (n.wa_data.eVar21 = Utils.UrlManager.GetHashValue("opeco"));
      },
      handleCheckoutHistoryTracking: function () {
        var i, t;
        pageType == PageTypeEnum.BasketPage &&
          ((i = Utils.StorageManager.ReadStorageValue("LoyaltyLRAndMeAdded")),
          i &&
            ((n.wa_data.prop44 = "basket:added"),
            Utils.StorageManager.EraseStorageValue("LoyaltyLRAndMeAdded"))),
          pageType == PageTypeEnum.DeliveryPage &&
            clearEvar10SessionStorageEntries(),
          pageType == PageTypeEnum.PaymentPage &&
            n.location.href.indexOf("posttosequra") != -1 &&
            ((t = Utils.StorageManager.ReadStorageValue(
              "OmnitureEntry_Payment_ChangesValue"
            )),
            t != null &&
              t.length > 0 &&
              (n.wa_data.pageName += ":" + t[t.length - 1]),
            Utils.OmnitureManager.removeEvents("event3"),
            (n.wa_data.list1 = null)),
          pageType == PageTypeEnum.ConfirmationOrderPage &&
            clearEvar10SessionStorageEntries();
      },
      handleRecommendedProductsTracking: function (i) {
        var f = t(i).data("typeofrecommendation"),
          u = t(i).closest("[data-internalname]").data("internalname"),
          r;
        if (u != "") {
          r = "";
          switch (u) {
            case "ProductPageUpSell":
              r = "SmartRecosPdpBottom";
              break;
            case "AddToBasketLayer":
              r = "SmartRecosAddToBasket";
              break;
            case "SearchPage":
              r = "SmartRecosSearchPage";
              break;
            case "BasketPage":
              r = "SmartRecosBasketPage";
              break;
            case "ProductPageMobile":
              r =
                f == "Automatic" ? "SmartRecosPdpTop" : "AssociatedProductsPdp";
              break;
            case "ProductHistory":
              switch (contextInfo.PageType) {
                case "HomePage":
                case "LandingPage":
                case "ListPage":
                case "SearchPage":
                case "BasketPage":
                case "RequestCataloguePage":
                  r = "lastviewedproducts_" + contextInfo.PageType;
                  break;
                case "ProductPage":
                  r = "lastviewedproducts_pdp";
                  break;
                default:
                  r = "lastviewedproducts";
              }
              (n.location.href.indexOf("webaccount") > -1 ||
                n.location.href.indexOf("myaccount") > -1) &&
                (r = "lastviewedproducts_mrs");
          }
          Utils.CookieManager.CreateCookie("mainshoppingtool", r, "");
        }
      },
      setEvar31AndProp31: function () {
        var t, r, i;
        (n.wa_data.prop31 && n.wa_data.prop31.length != 0) ||
          ((t = "unknow"),
          (r = Utils.UrlManager.getUrlParameter("brndid")),
          r &&
            (pageType == PageTypeEnum.LandingPage ||
              pageType == PageTypeEnum.ListPageBrand ||
              pageType == PageTypeEnum.SearchPage ||
              pageType == PageTypeEnum.ProductPage ||
              pageType == PageTypeEnum.MultiProductPage ||
              pageType == PageTypeEnum.AddToCartLayer ||
              pageType == PageTypeEnum.StaticPage ||
              pageType == PageTypeEnum.BrandPage ||
              pageType == PageTypeEnum.SerpPage ||
              pageType == PageTypeEnum.MultiDimensionProductPage) &&
            (n.wa_data.prop31 = n.wa_data.eVar31 =
              Utils.UrlManager.getUrlParameter("brndid") +
              "_" +
              Utils.UrlManager.getUrlParameter("brndid") +
              "_brandpage_" +
              t),
          pageType == PageTypeEnum.SerpPage &&
            n.location.href.indexOf("/lndng/") > -1 &&
            (n.wa_data.prop31 = n.wa_data.eVar31 =
              Utils.UrlManager.getUrlParameter("artcl") +
              "_" +
              Utils.UrlManager.getUrlParameter("artcl") +
              "_serp_" +
              t),
          typeof Utils.UrlManager.GetHashValue("kwrd") != "undefined" &&
            Utils.UrlManager.GetHashValue("kwrd") != null &&
            (n.wa_data.prop31 = n.wa_data.eVar31 =
              Utils.UrlManager.GetHashValue("kwrd") +
              "_" +
              Utils.UrlManager.GetHashValue("kwrd") +
              "_searchredirection_" +
              t),
          Utils.UrlManager.GetHashValue("shoppingtool") != null &&
            (Utils.UrlManager.GetHashValue("shoppingtool") || "").indexOf(
              "treestructureflyout"
            ) > -1 &&
            typeof Utils.UrlManager.getUrlParameter("kwrd") != "undefined" &&
            Utils.UrlManager.getUrlParameter("kwrd") != "" &&
            (n.wa_data.prop31 = n.wa_data.eVar31 =
              Utils.UrlManager.getUrlParameter("kwrd") +
              "_" +
              Utils.UrlManager.getUrlParameter("kwrd") +
              "_internalredirection_" +
              t),
          (pageType == PageTypeEnum.ListPage ||
            pageType == PageTypeEnum.ListPageBrand) &&
            Utils.StorageManager.ReadStorageValue(
              "OmnitureEntry_Autocomplete_Category"
            ) != null &&
            (omnitureSessionVarsToClear.push(
              "OmnitureEntry_Autocomplete_Category"
            ),
            (i =
              contextInfo.BreadCrumbDetail[
                contextInfo.BreadCrumbDetail.length - 1
              ]),
            (n.wa_data.prop31 = n.wa_data.eVar31 =
              i.Name.toLowerCase() +
              "_" +
              i.Name.toLowerCase() +
              "_cat-autocompletion_" +
              t)));
      },
      setEvent51: function () {
        n.wa_data.prop12 != i &&
          n.wa_data.prop12 == "redirmoteur" &&
          (n.wa_data.events != i && n.wa_data.events != ""
            ? n.wa_data.events.indexOf("event51") < 0 &&
              (n.wa_data.events += ",event51")
            : (n.wa_data.events = "event51")),
          pageType == 2 &&
            typeof n.wa_data.prop12 != "undefined" &&
            n.wa_data.prop12.toLowerCase() == "redirmoteur" &&
            (Utils.OmnitureManager.removeEvents("event51,event126"),
            Utils.OmnitureManager.addEvents("event51")),
          (Utils.StorageManager.ReadStorageValue(
            "OmnitureEntry_Autocomplete"
          ) != null ||
            Utils.StorageManager.ReadStorageValue(
              "OmnitureEntry_Autocomplete_Category"
            ) != null) &&
            Utils.OmnitureManager.addEvents("event51");
      },
      setEvent76: function () {
        Utils.UrlManager.HasHash("associated") &&
          Utils.OmnitureManager.addEvents("event76");
      },
      setEvar19: function () {
        pageType != PageTypeEnum.HomePage &&
          (typeof pageType != "undefined" &&
            typeof virtualSite != "undefined" &&
            (Utils.CookieManager.ReadCookie("OmnitureEntry_Header_SalesArea")
              ? ((n.wa_data.eVar19 = Utils.CookieManager.ReadCookie(
                  "OmnitureEntry_Header_SalesArea"
                )),
                typeof s != "undefined" && (s.eVar19 = n.wa_data.eVar19))
              : ((n.wa_data.eVar19 = null),
                omnitureSessionVarsToClear.push(
                  "OmnitureEntry_Header_SalesArea"
                ))),
          Utils.CookieManager.EraseCookie("OmnitureEntry_Header_SalesArea"));
      },
      setProp28: function () {
        var t = null;
        pageType == PageTypeEnum.PaymentPage &&
          (Utils.UrlManager.getUrlParameter("accepted") != null
            ? Utils.UrlManager.getUrlParameter("accepted") == 0
              ? (t = "accepted")
              : Utils.UrlManager.getUrlParameter("accepted") == 6 &&
                (t = "maybe")
            : Utils.UrlManager.getUrlParameter("rejected") != null &&
              (t = "rejected"),
          t && (n.wa_data.prop28 = t));
      },
      setEvar97: function () {
        var t = Utils.StorageManager.ReadStorageValue("dotaki.segment", !1);
        t != "" && (n.wa_data.eVar97 = t);
      },
    };
  })(window, jQuery)),
  (function (n, t) {
    "use strict";
    n.UiBreadcrumb = n.UiBloc.extend({
      init: function (i, r) {
        this._super(i, r);
        var u = this.Model,
          f = t(".breadcrumb");
        f.find("a").each(function (i) {
          n.Utils.Common.onCustomClick(t(this), function (r) {
            u.$eventContainer.trigger(
              n.globalTrackingEvent.SHOPPING_TOOL_USED,
              [
                {
                  type: "TREE",
                  subType: "Breadcrumb",
                  extraData: [
                    i + 1,
                    t(r).text().trim().toLowerCase().replace(/ /g, "-"),
                  ],
                },
              ]
            );
          });
        });
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiFooter = n.UiBloc.extend({
      init: function (i, r) {
        var l, a;
        this._super(i, r);
        var b = this,
          k = b.Model,
          s = !1,
          f = !1,
          e = 300,
          u = t("#footerSwitchText");
        u.length > 0 &&
          ((u = JSON.parse(u.text())),
          (l = u.toggleBtnShowText),
          (a = u.toggleBtnHideText));
        var o = t(".footer-services-title"),
          h = t("#footerServicesToggleBtn"),
          v = t("#moreCategories1"),
          y = t("#moreCategories2"),
          d = function () {
            return !f;
          },
          p = function (i, r) {
            n.Utils.Common.onCustomClick(i.find("a"), function (i) {
              k.$eventContainer.trigger(
                n.globalTrackingEvent.SHOPPING_TOOL_USED,
                [
                  {
                    type: "TREE",
                    subType: r,
                    extraData: [
                      "null",
                      t(i).text().trim().toLowerCase().replace(/ /g, "-"),
                    ],
                  },
                ]
              );
            });
          },
          g = function (n, t, i) {
            return n.text(n.text() == i ? t : i);
          },
          nt = function () {
            h.toggleClass("footer-services-toggleBtn--isToggled"), g(h, l, a);
          },
          tt = function () {
            var n = t("ul.footer-services-content");
            f ? n.slideUp(e) : s ? n.slideDown(e) : w(), (f = d());
          },
          it = function (n) {
            var t = document.createElement("ul");
            return (
              t.classList.add("footer-services-content"),
              n.Attributes["data-cerberus"] !== undefined &&
                t.setAttribute("data-cerberus", n.Attributes["data-cerberus"]),
              t
            );
          },
          rt = function (n) {
            var i = document.createElement("li"),
              t = document.createElement("a");
            return (
              t.classList.add("footer-services-link"),
              (t.href = n.CurrentElement.Url),
              (t.innerHTML = n.CurrentElement.Text),
              n.CurrentElement.Attributes["data-cerberus"] !== undefined &&
                t.setAttribute(
                  "data-cerberus",
                  n.CurrentElement.Attributes["data-cerberus"]
                ),
              i.appendChild(t),
              i
            );
          },
          w = function (n) {
            var r = "/servicefooter/loadcolumnsjson.aspx";
            t.ajax({
              cache: !1,
              type: "GET",
              url: r,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (t) {
                ut(t), i.isMobile && c(n);
              },
            });
          },
          ut = function (n) {
            var r,
              u = 0;
            n.FooterColumns.forEach(function (n) {
              n.Menus.forEach(function (n) {
                (r = it(n)),
                  n.IsNewsletterMenu !== !0 &&
                    n.ChildElements.forEach(function (n) {
                      r.appendChild(rt(n));
                    }),
                  o[u] && o[u].insertAdjacentElement("afterend", r),
                  i.isMobile && t("ul.footer-services-content").hide(),
                  u++;
              });
            }),
              (s = !0);
          },
          c = function (t) {
            var i = t,
              r = n.elementStatus.opened,
              u = i.hasClass(r);
            u
              ? (i.removeClass(r),
                i.next("ul.footer-services-content").slideUp(e),
                (u = !1))
              : (i.addClass(r),
                i.next("ul.footer-services-content").slideDown(e),
                (u = !0));
          };
        if ([n.pageName.hp, n.pageName.basket].indexOf(i.name) > -1)
          (f = !0),
            i.isMobile
              ? t("ul.footer-services-content").hide()
              : t("ul.footer-services-content").show();
        else if (!i.isMobile)
          h.add(o).on("click", function () {
            tt(), nt();
          });
        if (i.isMobile) {
          o.on("click", function () {
            [n.pageName.hp, n.pageName.basket].indexOf(i.name) == -1
              ? s
                ? c(t(this))
                : w(t(this))
              : c(t(this));
          });
          t("ul.footer-services-content").hide();
        }
        v.length > 0 && p(v, "BottomSEOKeywords"),
          y.length > 0 && p(y, "BottomSEOSeeAlso");
      },
    });
  })(window, jQuery),
  (UiLogAs = UiBloc.extend({
    init: function (n, t) {
      this._super(n, t);
      var i = this;
      if (
        ((this.$container = $("#log-as-container")),
        (this.$logout = $("#logAsLogout")),
        this.Page.name !== Utils.Enum.PageName.BasketThankYou)
      )
        this.$logout.on("click", function () {
          i.logout();
        });
      else this.logout();
    },
    logout: function () {
      var n = this,
        t = "/servicelogas/logout";
      this.$container.feedback("add"),
        $.ajax({
          async: !1,
          cache: !1,
          url: t,
          type: "GET",
          success: function () {
            n.Page.name === Utils.Enum.PageName.BasketThankYou
              ? (n.$container.css("color", "#d00000"),
                setTimeout(function () {
                  n.$container.text(labels.MobileV3_Common.NowDisconnected),
                    n.$container.css("color", "#fff");
                }, 500))
              : (window.location.href = "/");
          },
          error: function (n) {
            console.error(
              "AJAX on: " +
                this.url +
                " --- method: " +
                this.type +
                " --- status: " +
                n.status +
                " --- statusText: " +
                n.statusText
            );
          },
        });
    },
  })),
  (function (n, t) {
    "use strict";
    var u = "loyalty",
      i = "." + u,
      f = "popin-lrandme-toBasket",
      e = "CheckAddLoyalty",
      r = "pdp:added";
    n.UiLoyaltyLRandME = n.UiBloc.extend({
      init: function (u, o) {
        var s = this;
        if (
          (s._super(u, o),
          t.extend(s, JSON.parse(t("#loyaltyData").text())),
          (s.$container = t("#loyalty")),
          (s.$conditions = t(i + "-conditions")),
          (s.$details = t(i + "-details")),
          (s.$programTrigger = t(i + "-popin")),
          (s.$addToCartBtn = t(i + "-add-to-cart")),
          (s.$addToCartSuccessBtn = t(i + "-add-to-cart-success")),
          (s.$buttonToBasket = t("." + f)),
          s.Page.name === pageName.pdp)
        )
          s.Model.$eventContainer.on(pdpEvent.articleUpdated, function () {
            s.Model.LRandMe_isAvailable ? s.show() : s.hide();
          });
        s.$addToCartBtn.on("click", function (i) {
          i.preventDefault();
          var r = t(this);
          r.feedback(n.Utils.Enum.Feedback.Actions.add), s.AddLoyaltyToCart();
        });
        s.Model.$eventContainer.on(
          n.globalServiceEvent.addLoyaltyToCartSucceeded,
          function (t, i, u) {
            u &&
              (s.$addToCartBtn.addClass("hidden"),
              s.$addToCartSuccessBtn.removeClass("hidden"),
              n.Utils.StorageManager.EraseStorageValue(e),
              n.Utils.StorageManager.CreateStorageValue(
                "LoyaltyLRAndMeAdded",
                !0
              ),
              s.Page.name === n.Utils.Enum.PageName.Basket
                ? n.location.reload()
                : i.IsSuccess &&
                  ((n.wa_data.prop44 = r),
                  (n.wa_data.eVar95 = r),
                  n._LaRedoute.updateBasketCountItem()));
          }
        );
        s.Page.name === pageName.pdp &&
          s.Model.LRandMe_isAvailable !== undefined &&
          (s.Model.LRandMe_isAvailable ? s.show() : s.hide());
      },
      AddLoyaltyToCart: function () {
        var t = this,
          i = {};
        t.Page.name === n.Utils.Enum.PageName.Basket
          ? (i.componant = "basket")
          : t.Page.name === n.Utils.Enum.PageName.PDP && (i.componant = "pdp"),
          t.Model.$eventContainer.trigger(
            n.globalServiceEvent.addLoyaltyToCartRequested,
            [null, i]
          );
      },
      show: function () {
        this.$container.show();
      },
      hide: function () {
        this.$container.hide();
      },
    });
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    n.UiProductCarousel = n.UiBloc.extend({
      init: function (i, r) {
        function o(n) {
          var i = window._page.appPath + "/producthelper/getproducts.aspx";
          return t.ajax({
            type: "POST",
            url: i,
            async: !0,
            cache: !0,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            processData: !1,
            data: '{"productids":"' + n.join() + '"}',
            success: function (n) {
              var i = n.d;
              window._page !== undefined && (i = n),
                i.IsSuccess &&
                  t("[data-products2]").each(function () {
                    var n = t(this),
                      r = n.data("products2").toString().split(","),
                      u = n.data("opeco");
                    t.each(r, function (r, f) {
                      if (!isNaN(this)) {
                        var e = s(t.trim(f), i.Products);
                        e && h(e, n, u);
                      }
                    });
                  });
            },
          });
        }
        function s(n, i) {
          var r = null;
          return (
            t.each(i, function (t, i) {
              i.ProductId == n && (r = i);
            }),
            r
          );
        }
        function h(n, i, r) {
          var o = i.data("skipdiscount"),
            s = i.data("minprice"),
            e = "",
            u,
            f;
          if (
            (r != undefined && (e += "#" + r),
            (u = "/ppdp/prod-" + n.ProductId + ".aspx" + e),
            (f = t("<a />", { id: n.ProductId, href: u })
              .appendTo(i)
              .wrap('<div class="carousel-item product"></div>')),
            n)
          ) {
            if (s) {
              l(n, n.ProductId, u);
              return;
            }
            i.find(".product").length < 31 && c(n, f, o);
            return;
          }
          f.closest(".product").remove();
        }
        function c(n, t, i) {
          var r =
            '<span class="product-thumb-from">' +
            n.DisplaySalePriceBefore +
            '</span> <span class="product-thumb-discount-percentage"> -' +
            n.DiscountPercentage +
            '%</span> <span class="product-thumb-after">' +
            n.DisplaySalePriceAfter +
            "</span>";
          (i || n.DisplaySalePriceBefore === n.DisplaySalePriceAfter) &&
            (r =
              '<span class="product-thumb-after">' +
              n.DisplaySalePriceAfter +
              "</span>"),
            t.html(
              '<div class="product-thumb"><div class="product-thumb-picture"><picture><img src="' +
                n.DefaultImage.replace("|Dimension|", e) +
                '" class="product-thumb-image" title="" alt=""></picture> </div> <div class="product-thumb-info"> <div class="product-thumb-brand text-nowrap" title="">' +
                n.Brand +
                '</div> <div class="product-thumb-name text-nowrap">' +
                n.Title +
                '</div> <div class="product-thumb-price-container"> <div class="product-thumb-price">' +
                r +
                "</div> </div> </div> </div>"
            );
        }
        function l(n, i, r) {
          var u = n.Title;
          u.length > 23 && (u = u.substr(0, 23) + "..."),
            t("#" + i + "").html(
              '<a href="' +
                r +
                '"><p class="legende">' +
                u +
                '<span class="prix">' +
                n.DisplaySalePriceAfter +
                "</span></p></a>"
            );
        }
        function a() {
          var n = [];
          t("[data-products2]").each(function () {
            var i = t(this);
            n.push(i.data("products2").toString().split(","));
          }),
            o(n);
        }
        this._super(i, r);
        var u = this,
          f = u.Model,
          e = "products/250by250";
        f.$eventContainer.on(n.pageEvent.loaded, function () {
          a();
        });
      },
    });
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    (n.EB_landingEvent = {
      serviceSucceeded: "EB_service.succeeded",
      menuClicked: "EB_Landing.menu.clicked",
    }),
      (n.UiReco = UiBloc.extend({
        init: function (i, r) {
          var u = this;
          u._super(i, r);
          var i = this.Page,
            f = i.Model,
            l =
              contextInfo.RecoContext !== undefined
                ? contextInfo.RecoContext
                : "default",
            e = n.Utils.Common,
            s = [],
            o = t(".apply-reco"),
            h = function (n) {
              var t = n.find(".product-link:not(.adobe-tracked)");
              t.addClass("adobe-tracked");
              e.onCustomClick(t, function () {
                var t = [
                  a(n),
                  e.formatText(n.find(".reco-title").text()) || "notitle",
                ];
                i.Tracking.set_productOrigin({
                  type: "RECO",
                  subType: n.data("type") === "histo" ? "Histo" : "Auto",
                  extraData: t,
                });
              });
            },
            c = function (i) {
              var r = i.find(".product-link:not(.earlybirds-tracked)");
              r.addClass("earlybirds-tracked");
              r.on("click", function () {
                n._ebq.push([
                  "trackActivity",
                  {
                    original_id: t(this).data("productid").toString(),
                    verb: "click-on-reco",
                    recommandationId: i.data("callApiId"),
                    type: "product",
                    widget: i.data("widget").replace(/\s/g, ""),
                  },
                ]);
              });
            },
            a = function (n) {
              var i = 0;
              return n.closest("#layerAtb").length > 0
                ? "ATB"
                : (t(".apply-reco:visible, #completeLook").each(function (r) {
                    if (n.is(t(this))) return (i = r + 1), !1;
                  }),
                  i);
            },
            v = function () {
              o.each(function () {
                var i = t(this),
                  r = i.data("callApiId") !== undefined;
                r &&
                  (h(i),
                  (window.ebRecoIds = window.ebRecoIds || []),
                  window.ebRecoIds.push(i.data("callApiId")));
                e.onEarlyBirdsLoad(function () {
                  n._ebq.push([
                    "execute",
                    {
                      onload: (function () {
                        if (r) c(i);
                        else if (i.data("type") === "ATB")
                          n.$eventContainer.one(
                            n.pdpEvent.atbOpen,
                            function () {
                              u.applyReco(i);
                            }
                          );
                        else u.applyReco(i);
                      })(),
                    },
                  ]);
                });
              });
            },
            y = function (n, i) {
              var u = {},
                o = n.data("type"),
                c = n.data("widget"),
                r,
                e,
                s,
                h;
              return (
                typeof f.getDataReco === varType.fn
                  ? (u.variables = f.getDataReco(o))
                  : ((r = {}),
                    o === "ErrorPage"
                      ? (typeof genericColorId != "undefined" &&
                          (r.$genericColorId =
                            genericColorId === "" ? undefined : genericColorId),
                        typeof brand != "undefined" &&
                          (r.$brand = brand === "" ? undefined : brand),
                        typeof pageError_cat1 != "undefined" &&
                          (r.$pageError_cat1 =
                            pageError_cat1 === "" ? undefined : pageError_cat1),
                        typeof pageError_cat2 != "undefined" &&
                          (r.$pageError_cat2 =
                            pageError_cat2 === "" ? undefined : pageError_cat2),
                        typeof pageError_cat3 != "undefined" &&
                          (r.$pageError_cat3 =
                            pageError_cat3 === "" ? undefined : pageError_cat3))
                      : o === "landingPage" &&
                        ((r.$landingPageBrand = "La Redoute"),
                        i !== undefined
                          ? t.extend(r, i)
                          : ((e = Utils.UrlManager.getUrlParameter(
                              "productsIds"
                            )),
                            e !== undefined &&
                              ((s =
                                e.indexOf("_") !== -1
                                  ? e.split("_")
                                  : e.split("|")),
                              (r.$landingIds = s)))),
                    (u.variables = r)),
                (h = p()),
                h.hasOwnProperty(c) && (u = t.extend(!0, u, h[c])),
                u
              );
            },
            p = function () {
              var n = {},
                i = t(".EBdata");
              return (
                i.length > 0 &&
                  (i.length > 1
                    ? t.each(i, function (i, r) {
                        n = t.extend(!0, n, JSON.parse(t(r).text()));
                      })
                    : (n = JSON.parse(i.text()))),
                n
              );
            };
          u.applyReco = function (r, u) {
            var a = !1,
              o = r.data("widget"),
              e = {
                type: "recommendations",
                widgetKey: o,
                locale: i.lang,
                profile: n.eb.profile.id,
                metadata: "widgetId",
              },
              v = r.data("extendable");
            (e.store = r.data("type") === "histo" ? "default" : l),
              r.data("type") === "PDPUpSell" &&
                (e.metadata =
                  "widgetId,distribution.strategies.response.OnLoadBeacon,abWidgetId,profile.abtests"),
              (e = t.extend(e, y(r, u))),
              o
                ? (n.eb.ebWidgets.getRecommendations(
                    e,
                    function (u, e, o, l, y) {
                      var b, p, g, nt, k, w, d;
                      (a = !0),
                        u !== null || (e && e.length === 0)
                          ? r.hide()
                          : e &&
                            e.length > 0 &&
                            ((b = l.title),
                            (p = []),
                            b.indexOf("|") !== -1 &&
                              ((nt = b.split("|")),
                              nt.forEach(function (n) {
                                n.substring(0, 2) === i.lang &&
                                  (b = n.substring(3));
                              })),
                            typeof o === n.varType.obj &&
                              ((g = o.widgetId),
                              (k = ""),
                              (w = ""),
                              o.distribution &&
                                o.distribution.forEach(function (n) {
                                  n.strategies.length > 0 &&
                                    n.strategies.forEach(function (n) {
                                      n.response &&
                                        n.response.OnLoadBeacon &&
                                        (k = n.response.OnLoadBeacon);
                                    });
                                }),
                              o.abWidgetId &&
                                k !== "" &&
                                o.profile &&
                                o.profile.abtests &&
                                t.each(o.profile.abtests, function (n, t) {
                                  n === o.abWidgetId && (w = t.variation + 1);
                                }),
                              w !== "" &&
                                k !== "" &&
                                t("#corePage").prepend(
                                  '<div class="onLoadBeaconPSF018 csp-global" data-onloadbeacon="' +
                                    k +
                                    "&c=" +
                                    w +
                                    '"></div>'
                                )),
                            e.forEach(function (n) {
                              var t = n.product,
                                i = !0,
                                r =
                                  n.strategyData &&
                                  n.strategyData.OnClickBeacon &&
                                  n.strategyData.OnViewBeacon,
                                u = n.strategy === "criteo-productDetails";
                              u && (w === 2 || w === 3) && (i = !1),
                                i &&
                                  p.push({
                                    brand: t.brand,
                                    discount: t.discount,
                                    ecotax: t.ecotax,
                                    finalPrice: t.finalPrice,
                                    hasSeveralPrices: t.hasSeveralPrices,
                                    id: parseInt(t._id.original_id),
                                    photo: t.photo,
                                    priceCatalog: t.priceCatalog,
                                    rating: t.rating,
                                    sticker:
                                      t.stickers != undefined &&
                                      t.stickers.length > 0
                                        ? t.stickers[0].value
                                        : undefined,
                                    title: t.title,
                                    url: t.url,
                                    mainCat: {
                                      id: t.mainCat2Id,
                                      name: t.mainCat2,
                                    },
                                    subCat: {
                                      id: t.mainCat3Id,
                                      name: t.mainCat3,
                                    },
                                    categorieForContext: t.categories,
                                    reviewCount: t.reviewCount,
                                    onClickBeacon: r
                                      ? n.strategyData.OnClickBeacon
                                      : undefined,
                                    onViewBeacon: r
                                      ? n.strategyData.OnViewBeacon
                                      : undefined,
                                  });
                            }),
                            v &&
                              (p = p.filter(function (n) {
                                var t = s.indexOf(n.id) > -1;
                                return t ? !1 : (s.push(n.id), !0);
                              })),
                            (d = r.data("reco") !== undefined),
                            d
                              ? r.data("reco").addNewProducts(p)
                              : r
                                  .reco({
                                    title: b,
                                    widget: g,
                                    key: l.attributes.tracking,
                                    productsInfos: p,
                                  })
                                  .data("callApiId", y),
                            c(r),
                            h(r),
                            d ||
                              f.$eventContainer.trigger(
                                n.EB_landingEvent.serviceSucceeded,
                                [p]
                              ));
                    }
                  ),
                  n.setTimeout(function () {
                    a ||
                      ($el.hide(),
                      n.console.warn(
                        "Earlybirds timeout overpassed => widget : " + o
                      ));
                  }, 5e3))
                : n.console.warn("Earlybirds widget key is missing.");
          };
          f.$eventContainer.on(
            n.EB_landingEvent.menuClicked,
            function (n, t, i) {
              u.applyReco(t, i);
            }
          );
          if (o.length > 0) {
            v();
            f.$eventContainer.on(
              n.globalTrackingEvent.EARLYBIRDS_NOT_LOADED,
              function () {
                t.each(o, function (n, i) {
                  i.dataset.callApiId || t(i).fadeOut(300);
                }),
                  n.console.warn(
                    "Earlybirds global componant timeout overpassed"
                  );
              }
            );
          }
        },
      }));
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiSearchHistory = n.UiBloc.extend({
      init: function (i, r, u) {
        this._super(i, r, u);
        var f = this,
          h = f.Model,
          l = !1,
          a = !1,
          o = "/servicesearch/",
          v = "GetSearchTermHistory",
          y = "RemoveSearchTermHistory?searchTerm=",
          p = "ClearSearchTermHistory",
          w = "&noOfHistoryTerms=" + i.Blocs.Search.maxSearchHistory,
          c = "POST",
          b = "?",
          e = "virtualSiteId=";
        i.isLogged === "yes" &&
          ((o = "/servicemyaccount/"),
          (v = "getcustomerpersonalisation.aspx"),
          (y = "deletecustomerpersonalisation.aspx?keyword="),
          (p = "deletecustomerpersonalisation.aspx?keyword= "),
          (w =
            "&cache=false&noOfHistoryTerms=" + i.Blocs.Search.maxSearchHistory),
          (c = "DELETE"),
          (e = "virtualSiteId="),
          (b = "&")),
          (f.$container = t("#searchHistory"));
        var k = function (n) {
            var i = s(),
              r = [
                "/servicesearch/AddSearchTermHistory?searchTerm=",
                encodeURI(n),
                "&",
                e,
                i,
              ].join("");
            t.ajax({
              cache: !1,
              type: "POST",
              url: r,
              success: function () {
                f.$container.trigger("history.searchTermAdded");
              },
            });
          },
          d = function () {
            var n = s();
            u.$input.focus(),
              t.ajax({
                type: c,
                url: [o, p, b, e, n].join(""),
                success: function (n) {
                  typeof n == "string" && (n = JSON.parse(n)),
                    n.IsSuccess &&
                      (f.$container.slideUp(300, function () {
                        f.$container.remove();
                      }),
                      u.$input.focus());
                },
              });
          },
          g = function () {
            f.$container = t("header #header_search_field").is(":focus")
              ? t("header #searchHistory")
              : t(".duplicateSearch #searchHistory");
          },
          nt = function () {
            var n = s();
            t.ajax({
              cache: !1,
              url: [o, v, "?", e, n, w].join(""),
              success: function (r) {
                var o, e, s, c;
                if (i.isLogged === "yes") {
                  switch (n) {
                    case "100":
                      r = r["100"];
                      break;
                    case "85201":
                      r = r["85201"];
                      break;
                    case "151517":
                      r = r["151517"];
                      break;
                    case "151885":
                      r = r["151885"];
                      break;
                    case "1326":
                      r = r["1326"];
                      break;
                    case "253506":
                      r = r["253506"];
                      break;
                    case "laredouteforbusiness":
                      r = r.laredouteforbusiness;
                      break;
                    case "ampm":
                      r = r.ampm;
                      break;
                    case "lesaubaines":
                      r = r.lesaubaines;
                      break;
                    default:
                      r = r["100"];
                  }
                  typeof r == "string" && r.length > 0 && (r = r.split(","));
                } else typeof r == "string" && (r = JSON.parse(r));
                if (r && r.length > 0) {
                  (o = t("<li>", {
                    class: "result-title block-search-suggestion-title",
                    text: labels.MobileV3_Common.LastSearches,
                  }).appendTo(f.$container)),
                    (e = t("<span>", {
                      class: "block-search-history-clear btn btn-link btn-xs",
                      text: labels.MobileV3_Common.DeleteAll,
                    }).appendTo(o));
                  e.on("click", function () {
                    e.feedback("add"), d();
                  });
                  (s = t("<li>", {
                    class: "result block-search-suggestion-result",
                  })),
                    (c = t("<span>", {
                      class: "block-search-history-remove-item close",
                    })),
                    r.forEach(function (n, i) {
                      var r = s.clone(),
                        e;
                      r.text(n).appendTo(f.$container),
                        (e = c.clone().appendTo(r));
                      e.on("click", function (t) {
                        t.stopPropagation(), tt(r, n);
                      });
                      r.on("click", function () {
                        h.$eventContainer.trigger(
                          globalTrackingEvent.SHOPPING_TOOL_USED,
                          [
                            {
                              type: "SEARCH",
                              subType: "Internal",
                              extraData: [i + 1, "history"],
                              keyword: t(this).text(),
                            },
                          ]
                        ),
                          u.searchBySuggestion(t(this), "history", !0);
                      });
                    }),
                    (l = !0),
                    f.$container.slideDown();
                }
              },
            });
          },
          s = function () {
            var i = "100";
            return (
              t("#idVirtualSite").length > 0
                ? (i = t("#idVirtualSite").val())
                : n.contextInfo.BreadCrumbDetail &&
                  n.contextInfo.BreadCrumbDetail.length &&
                  (i = n.contextInfo.BreadCrumbDetail[0].Id),
              i
            );
          },
          tt = function (n, i) {
            var r = s();
            u.$input.focus(),
              t.ajax({
                type: c,
                url: [o, y, encodeURI(i), "&", e, r].join(""),
                success: function (t) {
                  typeof t == "string" && (t = JSON.parse(t)),
                    t.IsSuccess &&
                      n.fadeOut(300, function () {
                        n.remove(),
                          u.$input.focus(),
                          f.$container.find(".block-search-suggestion-result")
                            .length === 0 &&
                            f.$container.slideUp(300, function () {
                              f.$container.remove();
                            });
                      });
                },
              });
          };
        (f.closeSearchHistory = function () {
          f.$container.hide();
        }),
          (f.openSearchHistory = function () {
            l ? f.$container.slideDown() : a === !1 && ((a = !0), nt()),
              h.$eventContainer.trigger("search.open.history");
          });
        u.$container.on({
          "search.focus": function () {
            setTimeout(function () {
              g();
            }, 100),
              u.$input.val() === "" && f.openSearchHistory();
          },
          "search.validate": function () {
            k(u.$input.val());
          },
        });
        h.$eventContainer.on("menu.open", function () {
          f.closeSearchHistory();
        });
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiSocialAccountLinking = n.UiBloc.extend({
      init: function (i, r) {
        var u = this,
          f,
          e;
        u._super(i, r),
          (u.$containerLogin = t(".container-login")),
          (f = function (n) {
            return (
              typeof n != "string" && (n = ""),
              n.charAt(0).toUpperCase() + n.slice(1)
            );
          }),
          (e = function (i) {
            var f = t("#inputPassword");
            u.$containerLogin.addLoading(), i.preventDefault();
            var e = {
                req: {
                  Username: t(
                    "#textBox_loginPage_alreadyCustomer_loginMail"
                  ).val(),
                  Password: t(
                    "#textBox_loginPage_alreadyCustomer_password"
                  ).val(),
                  Reach5Token: t(".reach5token").val(),
                },
              },
              o = JSON.stringify(e),
              s = "/customerServices/ConnectSocialAccount";
            t.ajax({
              url: s,
              async: !0,
              cache: !1,
              type: "POST",
              headers: { "cache-control": "no-cache" },
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              data: o,
              beforeSend: function () {
                t(".error-login-connect").length > 0 &&
                  t(".btn-social-validate-login").length > 0 &&
                  (t(".error-login-connect").remove(),
                  f.remove("has-feedback has-error"));
              },
              success: function (i) {
                if (i.RedirectUrl) {
                  n.location = i.RedirectUrl;
                  return;
                }
                if (i.ReturnUrl) {
                  n.location = i.ReturnUrl;
                  return;
                }
                i.PropertyStatuses.length > 0 &&
                  typeof i.PropertyStatuses[0].Description != "undefined" &&
                  t(".error-login-connect").length == 0 &&
                  (t(".textBox_loginPage_alreadyCustomer_password").addClass(
                    "error"
                  ),
                  f
                    .after(
                      t("<div>", {
                        class: "error-login-connect block-error margin-b",
                        text: i.PropertyStatuses[0].Description,
                      })
                    )
                    .addClass("has-feedback has-error")
                    .find("i")
                    .removeClass("icon-ok")
                    .addClass("icon-remove"),
                  u.$containerLogin.removeLoading());
              },
              error: function () {
                f.val() === "" &&
                  (f
                    .after(
                      t("<div>", {
                        class: "error-login-connect block-error margin-b",
                        text: labels.MobileV3_Login.Error_BlankPassword,
                      })
                    )
                    .addClass("has-feedback has-error")
                    .find("i")
                    .removeClass("icon-ok")
                    .addClass("icon-remove"),
                  u.$containerLogin.removeLoading());
              },
              complete: function () {
                t(window).on("unload", function () {
                  u.$containerLogin.removeLoading();
                });
              },
            });
          }),
          (u.displayLinkingLoginForm = function (i, r) {
            var o = labels.MobileV3_Login,
              s = t("#validationButton_login"),
              h = "",
              c,
              l;
            if (
              (i.Provider !== "undefined" && (h = i.Provider),
              u.$containerLogin.length <= 0)
            ) {
              (c =
                "#email=" +
                i.Email +
                "&token=" +
                i.Reach5Token +
                "&basketToLogin=true"),
                (n.location.href = r + c);
              return;
            }
            t(".reach5token").val(i.Reach5Token),
              (l = t("<div>", { class: "social-login-subtitle" }).append(
                t("<span>", {
                  class: "block",
                  text: o.SocialLoginEmailMatchingAccount.replace(
                    "[provider]",
                    f(h)
                  ),
                }).append(
                  t("<span>", {
                    class: "block",
                    text: o.SocialLoginToLinkYourAccount,
                  })
                )
              )),
              t(".headerLogin").html(o.SocialLoginKnownUserTitle).after(l),
              u.$containerLogin
                .after(
                  t("<div>", {
                    class: "social-legal-connect margin-t text-muted col-sm-12",
                  }).append(o.LegalSocialLogin)
                )
                .removeLoading(),
              s.find("span").html(o.SocialLoginLinkButton),
              t(".login-bloc-already-customer")
                .show()
                .addClass("login-bloc-social-login"),
              t(".login-bloc-new-customer").hide(),
              s.addClass("btn-social-validate-login"),
              t("#textBox_loginPage_alreadyCustomer_loginMail")
                .val(i.Email)
                .focus()
                .attr("readonly", "readonly"),
              t("#textBox_loginPage_alreadyCustomer_loginMail")
                .closest(".right-inner-addon")
                .addClass("readonly"),
              t(".social-login-subtitle").remove(),
              t(".social-login-container").hide();
            s.on("click", function (n) {
              e(n, t(this));
            });
            t("#eventContainer").trigger("socialLogin.linking");
          });
      },
    });
  })(window, jQuery),
  typeof Utils == "undefined" && (Utils = {}),
  (Utils.Enum = {
    AppPicture: {
      Android: {
        "de-ch": "googlePlay_ch_de.svg",
        "es-es": "googlePlay_es.svg",
        "fr-ch": "googlePlay_ch_fr.svg",
        "fr-be": "googlePlay_fr_be.svg",
        "fr-fr": "googlePlay_fr_fr.svg",
        "en-gb": "googlePlay_en_gb.svg",
        "it-it": "googlePlay_it_it.svg",
        "nl-be": "googlePlay_nl_be.svg",
        "pt-pt": "googlePlay_pt_pt.svg",
        "ru-ru": "googlePlay_ru.svg",
        default: "googlePlay.svg",
      },
      Apple: {
        "de-ch": "appStore_de_ch.svg",
        "es-es": "appStore_es_es.svg",
        "fr-ch": "appStore_fr_ch.svg",
        "fr-be": "appStore_fr_be.svg",
        "fr-fr": "appStore_fr_fr.svg",
        "en-gb": "appStore_en_gb.svg",
        "it-it": "appStore_it_it.svg",
        "nl-be": "appStore_nl_be.svg",
        "pt-pt": "appStore_pt_pt.svg",
        "ru-ru": "appStore_ru_ru.svg",
        default: "appStore.png",
      },
    },
    BootstrapValidator: {
      Attribute: { Data: "bootstrapValidator" },
      FeedbackIcons: {
        valid: "icon icon-check-ok",
        invalid: "icon icon-error",
        validating: "icon icon-error",
      },
    },
    Class: {
      BlockInfo: {
        Default: "block-info",
        Error: "block-error",
        Success: "block-success",
        Warning: "block-warning",
      },
      Header: {
        TooltipDefaultClasses: [
          "tooltip",
          "tooltip-white",
          "tooltip-squared",
          "tooltip-border-grey",
          "tooltip-thick",
        ],
      },
    },
    CustomScrollBar: { DefaultParams: { theme: "dark", scrollInertia: 500 } },
    Form: {
      Input: {
        Address: { Maxlength: 40 },
        City: { Maxlength: 32 },
        Email: { Maxlength: 65, ValidationRegExp: getEmailRegex() },
        Firstname: { Maxlength: 32 },
        Lastname: { Maxlength: 32 },
      },
    },
    Event: { SlideOpen: "slide.open" },
    Feedback: { Actions: { add: "add", remove: "remove" } },
    Inputmask: { Unmasked: "unmaskedvalue" },
    PageName: {
      AddressMod: "MobileV3_AddressMod",
      Basket: "MobileV3_Basket",
      BasketThankYou: "MobileV3_BasketThankYou",
      Delivery: "MobileV3_Delivery",
      Login: "MobileV3_Login",
      ModifyDetails: "MobileV3_ModifyDetails",
      Payment: "MobileV3_Payment",
      PDP: "MobileV3_PDP",
      Register: "MobileV3_Register",
    },
    Selector: { CustomerLoginInformations: "#customerLoginInformations" },
    SiteId: {
      FR: 1,
      BE: 2,
      UK: 3,
      ES: 5,
      PT: 6,
      CH: 10,
      COM: 11,
      RU: 12,
      PL: 13,
      IT: 14,
    },
    Status: {
      Active: "active",
      Loading: "loading",
      Hidden: "hidden",
      Disabled: "disabled",
      Opened: "opened",
      Update: "update",
    },
    StorageName: {
      FLASHSALE_ORIGIN: "lr-flashsale-origin",
      INTERACTION_TIMER: "lr-interaction-timer",
      LAST_SEARCH_ID: "lr-last-searchId",
      PAGE_ORIGIN: "lr-page-origin",
      PRODUCT_ORIGIN: "lr-product-origin",
      USED_TOOL: "lr-used-tool",
      SHOPPING_TOOL: "lr-shopping-tool",
    },
    StorageManager: {
      ForgottenPasswordEmail: "forgottenPasswordEmail",
      RegisterEmail: "registerEmail",
    },
  });
var blockEvent = {},
  blockName = { adserve: "adserve" },
  constructorName = { adserve: "UiAdserve" },
  elementStatus = {
    active: "active",
    disabled: "disabled",
    hidden: "hidden",
    loading: "loading",
    opened: "opened",
    selected: "selected",
    visible: "visible",
  },
  imgSizes = [72, 302, 362, 641],
  model = {
    basket: "ModelBasket",
    MyAccount: { MyOffers: "ModelMyOffers" },
    OrderTracing: "ModelOrderTracing",
    PDP: "ModelPDP",
    PLP: "ModelPLP",
  },
  pageName = {
    accountFollowUp: "MobileV3_AccountFollowUp",
    afterSalesService: "MobileV3_AfterSalesService",
    basket: "MobileV3_Basket",
    blogInspiration: "MobileV3_BlogInspiration",
    common: "MobileV3_Common",
    delivery: "MobileV3_Delivery",
    error: "MobileV3_ErrorPage",
    flashSales: "MobileV3_FlashSalesList",
    hp: "MobileV3_Home",
    login: "MobileV3_Login",
    myOffers: "MobileV3_MyOffers",
    payment: "MobileV3_Payment",
    pdp: "MobileV3_PDP",
    plp: "MobileV3_PLP",
    plpCategory: "MobileV3_PLPCategories",
    summary: "MobileV3_BasketThankYou",
    wishlist: "MobileV3_WishList",
    static: "MobileV3_StaticPage",
  },
  pageNameJS = {},
  pageEvent = { loaded: "page.loaded" },
  pwStrength = { none: "none", low: "low", medium: "medium", high: "high" },
  siteName = {
    Ampm: "AM.PM.",
    Anneweyburn: "Anne Weyburn",
    Brandboutique: "La Brand Boutique",
    BrandboutiqueOutlet: "La Brand Boutique Outlet",
    Castaluna: "Castaluna",
    Laredoute: "La Redoute",
    LaRedouteForBusiness: "La Redoute For Business",
    Lesaubaines: "Outlet",
  },
  varType = {
    bool: "boolean",
    fn: "function",
    num: "number",
    obj: "object",
    str: "string",
  };
(pageNameJS[pageName.accountFollowUp] = "AccountFollowUp"),
  (pageNameJS[pageName.afterSalesService] = "AfterSalesService"),
  (pageNameJS[pageName.basket] = "Basket"),
  (pageNameJS[pageName.blogInspiration] = "BlogInspiration"),
  (pageNameJS[pageName.delivery] = "Delivery"),
  (pageNameJS[pageName.flashSales] = "FlashSales"),
  (pageNameJS[pageName.login] = "Login"),
  (pageNameJS[pageName.myOffers] = "MyOffers"),
  (pageNameJS[pageName.payment] = "Payment"),
  (pageNameJS[pageName.pdp] = "PDP"),
  (pageNameJS[pageName.plp] = "PLP"),
  (pageNameJS[pageName.plpCategory] = "PLP"),
  (pageNameJS[pageName.summary] = "Summary"),
  (pageNameJS[pageName.wishlist] = "Wishlist"),
  (pageNameJS[pageName.static] = "StaticPages"),
  typeof Utils == "undefined" && (Utils = {}),
  (Utils.Common = (function (n, t, i) {
    var r = "no-scroll",
      u = !1;
    return {
      formatImgUrl: function (i, r) {
        var u = i.indexOf("by"),
          o = i.indexOf("|Dimension|");
        if (o > -1) return i.replace("|Dimension|", "products/" + r + "by" + r);
        if (t.inArray(r, n.imgSizes) && u > -1) {
          var f = "72by72",
            e = "1200by1200",
            s = i.indexOf(f) > -1 ? 2 : i.indexOf(e) > -1 ? 4 : 3,
            h = i.indexOf(f) > -1 ? 4 : i.indexOf(e) > -1 ? 6 : 5;
          return i.replace(i.substring(u - s, u + h), r + "by" + r);
        }
        return i;
      },
      formatPrice: function (t) {
        if (
          (typeof t == "number" && (t = t.toFixed(2)),
          (t = "" + t),
          this.getCountry() !== "pt" && (t = t.replace(".", ",")),
          _page.country !== "com")
        )
          switch (n.wa_data.currencyCode) {
            case "CHF":
              t = "CHF " + t.replace(",", ".");
              break;
            case "GBP":
              t = "£" + t.replace(",", ".");
              break;
            case "PLN":
              t += " zł";
              break;
            case "RUB":
              t += " руб";
              break;
            case "USD":
              t += " $";
              break;
            default:
              t += " €";
          }
        else t += " €";
        return t;
      },
      formatText: function (n) {
        return this.RemoveAccents(
          this.removeSpace(this.removePunctuation(n))
        ).toLowerCase();
      },
      startNoScroll: function () {
        var n = t("body");
        return n.addClass(r), n.hasClass(r);
      },
      stopNoScroll: function () {
        var n = t("body");
        return n.removeClass(r), !n.hasClass(r);
      },
      isLocalStorageEnabled: function () {
        try {
          localStorage.setItem("__test", "data");
        } catch (n) {
          if (/QUOTA_?EXCEEDED/i.test(n.name)) return !1;
        }
        return !0;
      },
      isAndroidDevice: function () {
        return /Android/i.test(navigator.userAgent);
      },
      isOldAndroid: function () {
        return (
          /Android 4.0/i.test(navigator.userAgent) ||
          /Android 4.1/i.test(navigator.userAgent) ||
          /Android 4.2/i.test(navigator.userAgent)
        );
      },
      isBlackBerryDevice: function () {
        return /BlackBerry/i.test(navigator.userAgent);
      },
      isAppleDevice: function () {
        return (
          Utils.Common.isAppleDeviceResult === i &&
            (Utils.Common.isAppleDeviceResult = /iPhone|iPad|iPod/i.test(
              navigator.userAgent
            )),
          Utils.Common.isAppleDeviceResult
        );
      },
      isOldAppleDevice: function () {
        return (
          Utils.Common.isAppleDeviceResult === i &&
            (Utils.Common.isAppleDeviceResult = /OS 1_|OS 2_|OS 3_|OS 4_|OS 5_|OS 6_|OS 7_|OS 8_|OS 9_/i.test(
              navigator.userAgent
            )),
          Utils.Common.isAppleDeviceResult
        );
      },
      isWindowsDevice: function () {
        return /IEMobile/i.test(navigator.userAgent);
      },
      isChromeIOSDevice: function () {
        return /CriOS/i.test(navigator.userAgent);
      },
      isFirefoxDevice: function () {
        return /Firefox/i.test(navigator.userAgent);
      },
      isExternalMobileInterfacing: function (n) {
        return n === i
          ? t("body").hasClass("external")
          : t("body").is(".external.app-" + n);
      },
      isCFAO: function () {
        return t("body").hasClass("cfao");
      },
      RemoveAccents: function (n) {
        var r = "",
          u,
          f,
          t;
        for (
          n != i && (r = n.toString()),
            u = [
              /[\xC0-\xC2]/g,
              /[\xE0-\xE2]/g,
              /[\xC8-\xCA]/g,
              /[\xE8-\xEB]/g,
              /[\xCC-\xCE]/g,
              /[\xEC-\xEE]/g,
              /[\xD2-\xD4]/g,
              /[\xF2-\xF4]/g,
              /[\xD9-\xDB]/g,
              /[\xF9-\xFB]/g,
            ],
            f = ["A", "a", "E", "e", "I", "i", "O", "o", "U", "u"],
            t = 0;
          t < u.length;
          t++
        )
          r = r.replace(u[t], f[t]);
        return r;
      },
      removeSpace: function (n) {
        return n.replace(/\s/g, "");
      },
      removePunctuation: function (n) {
        return n != i && (n = n.toString()), n.replace(/[#?!.,;:%]/g, "");
      },
      getCountryCode: function () {
        return t("body").data("countrycode");
      },
      getCountry: function (n) {
        if (n) {
          var r = Utils.Common.getCountryResult;
          return r.indexOf(".") !== -1 && (r = r.split(".")[1]), r;
        }
        return (
          Utils.Common.getCountryResult === i &&
            (Utils.Common.getCountryResult = t("body").data("country")),
          Utils.Common.getCountryResult
        );
      },
      getSiteId: function () {
        return (
          Utils.Common.siteId === i &&
            (Utils.Common.siteId = t("body").data("siteid")),
          Utils.Common.siteId
        );
      },
      GetSessionViaAjax: function (n) {
        var i;
        return (
          t.ajax({
            url: "/ServiceGeneric/GetSession?sessionVar=" + n,
            dataType: "text",
            async: !1,
            cache: !1,
            success: function (n) {
              i = n;
            },
          }),
          i
        );
      },
      getImgUrl: function (n, t) {
        return n.replace("|Dimension|", "products/" + t + "by" + t);
      },
      isTouchDevice: function () {
        return (
          Utils.Common.isTouchDeviceResult === i &&
            (Utils.Common.isTouchDeviceResult =
              "ontouchstart" in n || navigator.maxTouchPoints > 0),
          Utils.Common.isTouchDeviceResult
        );
      },
      updateContextInfoCustomer: function (i) {
        t.ajax({
          url: "/servicegeneric/getcontextinfo",
          cache: !1,
          success: function (t) {
            t &&
              typeof t[0] != "undefined" &&
              t[0].Key == "contextInfo" &&
              typeof contextInfo === varType.obj &&
              ((n.contextInfo.Customer = t[0].Value.Customer),
              typeof i == "function" && i.call());
          },
        });
      },
      onCustomClick: function (n, t) {
        var i = this;
        return n.length > 0 && typeof t === varType.fn
          ? n.on("click auxclick", function (n) {
              (n.type === "click" ||
                (n.type === "auxclick" && n.which === 2)) &&
                t(this, n);
            })
          : !1;
      },
      onEarlyBirdsLoad: function (t, r) {
        if (typeof t !== varType.fn) return !1;
        if (((r = r !== i ? r : 5), n._ebq && n.eb)) t();
        else if (r > 0) {
          var f = this;
          setTimeout(function () {
            f.onEarlyBirdsLoad(t, --r);
          }, 1e3);
        } else
          return (
            u ||
              ((u = !0),
              typeof _page != "undefined" &&
                _page.Model.$eventContainer.trigger(
                  n.globalTrackingEvent.EARLYBIRDS_NOT_LOADED
                )),
            !1
          );
      },
      hasSomethingToDisplay: function (n) {
        if (n.tagName === "SCRIPT" || n.tagName === "STYLE") return !1;
        if (
          n.tagName === "IMG" ||
          n.tagName === "IFRAME" ||
          n.textContent.length > 0
        )
          return !0;
        if (n.childElementCount === 0) return !1;
        var t = !1;
        return (
          n.childNodes.forEach(function (n) {
            if (Utils.Common.hasSomethingToDisplay(n)) return (t = !0), !1;
          }),
          t
        );
      },
    };
  })(window, jQuery)),
  (Utils.CookieManager = (function () {
    return {
      EraseCookie: function (n) {
        Utils.CookieManager.CreateCookie(n, "", -1);
      },
      ReadCookie: function (n) {
        for (
          var u = escape(n) + "=", f = document.cookie.split(";"), t, r, i = 0;
          i < f.length;
          i++
        ) {
          for (t = f[i]; t.charAt(0) === " "; ) t = t.substring(1, t.length);
          if (t.indexOf(u) === 0) {
            r = "";
            try {
              r = decodeURIComponent(t.substring(u.length, t.length));
            } catch (e) {
              r = decodeURIComponent(unescape(t.substring(u.length, t.length)));
            }
            return r;
          }
        }
        return null;
      },
      CreateCookie: function (n, t, i, r) {
        var f, u;
        i && i != 0
          ? ((u = new Date()),
            u.setTime(u.getTime() + i * 864e5),
            (f = "; expires=" + u.toGMTString()))
          : (f = ""),
          r != !0 && (t = escape(t)),
          (document.cookie = escape(n) + "=" + t + f + "; path=/");
      },
    };
  })(window, jQuery)),
  (Utils.LocationManager = (function (n, t, i) {
    var r = t.extend({}, n.location);
    return {
      initMyLocation: function () {
        r = t.extend({}, n.location);
      },
      getMyLocation: function () {
        return r;
      },
      setMyLocation: function (n) {
        r = n;
      },
      getUrl: function () {
        var t = r.search,
          n;
        return (
          t == "?" && (t = ""),
          (n = r.hash),
          n == "#" && (n = ""),
          (r.origin || r.protocol + "//" + r.host) + r.pathname + t + n
        );
      },
      updateKeyValueFromString: function (n, t, r, u) {
        var f;
        if (t === i) return n;
        u = u || "&";
        var e = n.split(u),
          o = [],
          s = !1;
        for (f = 0; f < e.length; f++)
          t == e[f].split("=")[0]
            ? (r !== i && r !== "" && o.push(t + "=" + r), (s = !0))
            : e[f] != "" && o.push(e[f]);
        return s || (r !== i && r !== "" && o.push(t + "=" + r)), o.join(u);
      },
      updateHash: function (n, t, u) {
        var f = r.hash,
          e;
        f === i && (f = ""),
          f.charAt(0) == "#" && (f = f.substring(1)),
          (e = Utils.LocationManager.updateKeyValueFromString(f, n, t, u)),
          (r.hash = "#" + e);
      },
      updateParameter: function (n, t) {
        var u = r.search,
          f;
        u === i && (u = ""),
          u.charAt(0) == "?" && (u = u.substring(1)),
          (f = Utils.LocationManager.updateKeyValueFromString(u, n, t)),
          (r.search = "?" + f);
      },
    };
  })(window, jQuery)),
  (Utils.UrlManager = (function (n, t, i) {
    return {
      HasHash: function (t) {
        var i = n.location.hash.replace("#", "").split("&");
        return i.indexOf(t) > -1;
      },
      GetHashValue: function (t, r) {
        var f, u;
        if (t !== i) {
          if (((r = r || /[|&]+/), n.location.hash.length > 0))
            for (
              f = n.location.hash.replace("#", "").split(r), u = 0;
              u < f.length;
              u++
            )
              if (t == f[u].split("=")[0])
                return typeof f[u].split("=")[1] === i
                  ? decodeURIComponent(f[u].split("=")[0])
                  : decodeURIComponent(f[u].split("=")[1]);
          return null;
        }
        return decodeURIComponent(n.location.hash.replace("#", ""));
      },
      RemoveHashValue: function (t, r, u) {
        var o = "",
          f,
          e;
        if (
          (r === i &&
            (n.location.hash.indexOf("|") !== -1 &&
            n.location.hash.indexOf("&") !== -1
              ? console.error("Separator hash isn't defined")
              : n.location.hash.indexOf("|") !== -1
              ? (r = "|")
              : n.location.hash.indexOf("&") !== -1 && (r = "&")),
          n.location.hash.length > 0)
        ) {
          for (
            f = n.location.hash.replace("#", "").split(/[|&]+/), e = 0;
            e < f.length;
            e++
          )
            t == f[e].split("=")[0] && f.splice(e, 1);
          u === !1 ? (o = f.join(r)) : (n.location.hash = f.join(r));
        }
        return u === !1
          ? (n.location.origin ||
              n.location.protocol + "//" + n.location.host) +
              n.location.pathname +
              n.location.search +
              o
          : n.location.href;
      },
      addOrChangeHashValue: function (t, i, r) {
        if (
          typeof t != "string" ||
          (typeof i != "string" && typeof i != "number")
        )
          return n.location.href;
        var u = n.location.hash;
        return (
          u.length > 0 && (u += "&"),
          (u += t + "=" + i),
          r === !1
            ? (n.location.origin ||
                n.location.protocol + "//" + n.location.host) +
              n.location.pathname +
              n.location.search +
              u
            : ((n.location.hash = u), n.location.href)
        );
      },
      updateHashFromUrl: function (n, t, i) {
        var u = n.indexOf("#"),
          o = u > -1,
          r = "",
          e = new RegExp("(\\#|\\&)(" + t + "=).*?(&|$)", "i"),
          f = n;
        return (
          o && ((r = n.substring(u)), (f = n.substring(0, u))),
          (r =
            r.search(e) >= 0
              ? r.replace(e, "$1$2" + i + "$3")
              : r + (r.indexOf("#") >= 0 ? "&" : "#") + t + "=" + i),
          (f += r)
        );
      },
      removeHashFromUrl: function (n, t) {
        var r = new RegExp("&?" + t + "=([^&]$|[^&]*)", "i"),
          i = n.replace(r, "");
        return (
          (i = i.replace("#&", "#")),
          i.indexOf("#", i.length - 1) !== -1 ? i.split("#")[0] : i
        );
      },
      getUrlParameter: function (t, r) {
        for (
          var o = r !== i ? r : n.location.search.substring(1),
            e = o.split("&"),
            f,
            u = 0;
          u < e.length;
          u++
        )
          if (((f = e[u].split("=")), f[0].toLowerCase() == t.toLowerCase()))
            return decodeURIComponent(f[1]);
      },
      addOrChangeParameterFromUrl: function (n, t, i) {
        var u = n.indexOf("#"),
          o = u > -1,
          f = "",
          e = new RegExp("(\\?|\\&)(" + t + "=).*?(&|$)", "i"),
          r = n;
        return (
          o && ((f = n.substring(u)), (r = n.substring(0, u))),
          (r =
            r.search(e) >= 0
              ? n.replace(e, "$1$2" + i + "$3")
              : r + (r.indexOf("?") >= 0 ? "&" : "?") + t + "=" + i),
          (r += f)
        );
      },
      removeParameterFromUrl: function (n, t) {
        var f = new RegExp("&?" + t + "=([^&]$|[^&]*)", "i"),
          u = "",
          r = n.indexOf("#"),
          i;
        return (
          r > -1 && ((u = n.substring(r)), (n = n.substring(0, r))),
          (i = n.replace(f, "")),
          (i.indexOf("?", i.length - 1) !== -1 ? i.split("?")[0] : i) + u
        );
      },
      getLastElementFromUrl: function (n) {
        var t = n.split("/");
        return t[t.length - 1];
      },
    };
  })(window, jQuery)),
  (Utils.OmnitureManager = (function (n, t, i) {
    return {
      addEvents: function (t) {
        var u, r;
        if (n.wa_data !== i && n.wa_data.events !== i)
          for (u = t.split(","), r = 0; r < u.length; r++)
            n.wa_data.events.indexOf(u[r]) === -1 &&
              (n.wa_data.events =
                n.wa_data.events.length > 0
                  ? n.wa_data.events + "," + u[r]
                  : u[r]);
      },
      removeEvents: function (r) {
        var u, e, f, o;
        if (n.wa_data.events !== i) {
          for (
            u = n.wa_data.events.split(","), e = r.split(","), f = 0;
            f < e.length;
            f++
          )
            (o = t.inArray(e[f], u)), o > -1 && u.splice(o, 1);
          n.wa_data.events = u.join(",");
        }
      },
      addShoppingToolHash: function (n, t) {
        var i = n.attr("href");
        i &&
          ((i += i.indexOf("#") !== -1 ? "&" : "#"),
          (i += "shoppingtool=" + t),
          n.attr("href", i));
      },
    };
  })(window, jQuery)),
  (Utils.StorageManager = (function (n, t, i) {
    var r = i;
    return {
      isLocalStorageEnabled: function () {
        if (n.localStorage === null) r = !1;
        else if (r === i) {
          try {
            localStorage.setItem("__test", "data");
          } catch (t) {
            (/quotaexceedederror/i.test(t.name.toLowerCase()) ||
              /quota_exceeded_err/.test(t.name.toLowerCase())) &&
              (r = !1);
          }
          r === i && (r = !0);
        }
        return r;
      },
      EraseStorageValue: function (n, t) {
        var t = t === i ? !0 : t;
        this.isLocalStorageEnabled()
          ? t
            ? sessionStorage.removeItem(n)
            : localStorage.removeItem(n)
          : Utils.CookieManager.CreateCookie(n, "", -1);
      },
      ReadStorageValue: function (n, t) {
        var t = t === i ? !0 : t,
          u = null,
          f;
        if (
          ((u = this.isLocalStorageEnabled()
            ? t
              ? sessionStorage.getItem(n)
              : localStorage.getItem(n)
            : Utils.CookieManager.ReadCookie(n)),
          u !== null && typeof u == "string")
        ) {
          f = u;
          try {
            u = JSON.parse(u);
          } catch (e) {
            console.log(
              "UTILS : can JSON parse " +
                (r ? "session storage" : "cookie") +
                " " +
                n +
                " with value : " +
                f
            ),
              (u = f);
          }
        }
        return u;
      },
      CreateStorageValue: function (n, t, r) {
        return (
          typeof t == "object" && (t = JSON.stringify(t)),
          this.isLocalStorageEnabled()
            ? r === i
              ? sessionStorage.setItem(n, t)
              : localStorage.setItem(n, t)
            : Utils.CookieManager.CreateCookie(n, t, r),
          t
        );
      },
      createLocalStorageValue: function (n, t) {
        return this.CreateStorageValue(n, t, 30);
      },
      eraseLocalStorageValue: function (n) {
        this.EraseStorageValue(n, !1);
      },
      readLocalStorageValue: function (n) {
        return this.ReadStorageValue(n, !1);
      },
    };
  })(window, jQuery)),
  (function (n) {
    var t;
    "undefined" != typeof window
      ? (t = window)
      : "undefined" != typeof self && (t = self),
      (t.lazyload = n());
  })(function () {
    return (function n(t, i, r) {
      function u(f, o) {
        if (!i[f]) {
          if (!t[f]) {
            var s = "function" == typeof require && require;
            if (!o && s) return s(f, !0);
            if (e) return e(f, !0);
            s = Error("Cannot find module '" + f + "'");
            throw ((s.code = "MODULE_NOT_FOUND"), s);
          }
          (s = i[f] = { exports: {} }),
            t[f][0].call(
              s.exports,
              function (n) {
                var i = t[f][1][n];
                return u(i ? i : n);
              },
              s,
              s.exports,
              n,
              t,
              i,
              r
            );
        }
        return i[f].exports;
      }
      for (
        var e = "function" == typeof require && require, f = 0;
        f < r.length;
        f++
      )
        u(r[f]);
      return u;
    })(
      {
        1: [
          function (n, t) {
            (function (i) {
              function o(n) {
                -1 === u.call(r, n) && r.push(n);
              }
              function f(n) {
                function i(i) {
                  var r;
                  (r =
                    "function" == typeof n.src
                      ? n.src(i)
                      : i.getAttribute(n.src)),
                    r && (i.src = r),
                    i.setAttribute("data-lzled", !0),
                    (t[u.call(t, i)] = null);
                }
                (n = s(
                  { offset: 333, src: "data-src", container: !1 },
                  n || {}
                )),
                  "string" == typeof n.src && o(n.src);
                var t = [];
                return function (r) {
                  (r.onload = null),
                    r.removeAttribute("onload"),
                    (r.onerror = null),
                    r.removeAttribute("onerror"),
                    -1 === u.call(t, r) && h(r, n, i);
                };
              }
              function e(n) {
                if (((n = "HTML" + n + "Element"), !1 != n in i)) {
                  var t = i[n].prototype.getAttribute;
                  i[n].prototype.getAttribute = function (n) {
                    if ("src" === n) {
                      for (
                        var u, i = 0, f = r.length;
                        i < f && !(u = t.call(this, r[i]));
                        i++
                      );
                      return u || t.call(this, n);
                    }
                    return t.call(this, n);
                  };
                }
              }
              function s(n, t) {
                for (var i in n) void 0 === t[i] && (t[i] = n[i]);
                return t;
              }
              function u(n) {
                for (var t = this.length; t-- && this[t] !== n; );
                return t;
              }
              t.exports = f;
              var h = n("in-viewport"),
                r = ["data-src"];
              (i.lzld = f()), e("Image"), e("IFrame");
            }.call(
              this,
              "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                ? window
                : {}
            ));
          },
          { "in-viewport": 2 },
        ],
        2: [
          function (n, t) {
            (function (n) {
              function r(n, t, i) {
                n.attachEvent
                  ? n.attachEvent("on" + t, i)
                  : n.addEventListener(t, i, !1);
              }
              function f(n, t, i) {
                var r;
                return function () {
                  var u = this,
                    f = arguments,
                    e = i && !r;
                  clearTimeout(r),
                    (r = setTimeout(function () {
                      (r = null), i || n.apply(u, f);
                    }, t)),
                    e && n.apply(u, f);
                };
              }
              function e(t) {
                function a(n, t, r) {
                  return {
                    watch: function () {
                      i.add(n, t, r);
                    },
                    dispose: function () {
                      i.remove(n);
                    },
                  };
                }
                function c(i, r) {
                  if (
                    !(
                      u(n.document.documentElement, i) &&
                      u(n.document.documentElement, t) &&
                      i.offsetWidth &&
                      i.offsetHeight
                    )
                  )
                    return !1;
                  var e = i.getBoundingClientRect(),
                    o,
                    s,
                    h,
                    f;
                  return (
                    t === n.document.body
                      ? ((o = -r),
                        (s = -r),
                        (h = n.document.documentElement.clientWidth + r),
                        (f = n.document.documentElement.clientHeight + r))
                      : ((f = t.getBoundingClientRect()),
                        (o = f.top - r),
                        (s = f.left - r),
                        (h = f.right + r),
                        (f = f.bottom + r)),
                    e.right >= s && e.left <= h && e.bottom >= o && e.top <= f
                  );
                }
                var i = o(),
                  l = t === n.document.body ? n : t,
                  e = f(
                    i.checkAll(function (n, t, r) {
                      c(n, t) && (i.remove(n), r(n));
                    }),
                    15
                  );
                return (
                  r(l, "scroll", e),
                  l === n && r(n, "resize", e),
                  h && s(i, t, e),
                  setInterval(e, 150),
                  {
                    container: t,
                    isInViewport: function (n, t, i) {
                      return i ? ((n = a(n, t, i)), n.watch(), n) : c(n, t);
                    },
                  }
                );
              }
              function o() {
                function t(t) {
                  for (var i = n.length - 1; 0 <= i; i--)
                    if (n[i][0] === t) return i;
                  return -1;
                }
                function i(n) {
                  return -1 !== t(n);
                }
                var n = [];
                return {
                  add: function (t, r, u) {
                    i(t) || n.push([t, r, u]);
                  },
                  remove: function (i) {
                    (i = t(i)), -1 !== i && n.splice(i, 1);
                  },
                  isWatched: i,
                  checkAll: function (t) {
                    return function () {
                      for (var i = n.length - 1; 0 <= i; i--)
                        t.apply(this, n[i]);
                    };
                  },
                };
              }
              function s(n, t, i) {
                function r(t) {
                  return (
                    (t = e.call(
                      [],
                      Array.prototype.slice.call(t.addedNodes),
                      t.target
                    )),
                    0 < f.call(t, n.isWatched).length
                  );
                }
                var u = new MutationObserver(function (n) {
                    !0 === n.some(r) && setTimeout(i, 0);
                  }),
                  f = Array.prototype.filter,
                  e = Array.prototype.concat;
                u.observe(t, { childList: !0, subtree: !0, attributes: !0 });
              }
              t.exports = function (t, r, u) {
                var o = n.document.body,
                  f;
                for (
                  (void 0 === r || "function" == typeof r) &&
                    ((u = r), (r = {})),
                    o = r.container || o,
                    r = r.offset || 0,
                    f = 0;
                  f < i.length;
                  f++
                )
                  if (i[f].container === o) return i[f].isInViewport(t, r, u);
                return i[i.push(e(o)) - 1].isInViewport(t, r, u);
              };
              var i = [],
                h = "function" == typeof n.MutationObserver,
                u = n.document.documentElement.compareDocumentPosition
                  ? function (n, t) {
                      return !!(n.compareDocumentPosition(t) & 16);
                    }
                  : n.document.documentElement.contains
                  ? function (n, t) {
                      return n !== t && (n.contains ? n.contains(t) : !1);
                    }
                  : function (n, t) {
                      for (; (t = t.parentNode); ) if (t === n) return !0;
                      return !1;
                    };
            }.call(
              this,
              "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                ? window
                : {}
            ));
          },
          {},
        ],
      },
      {},
      [1]
    )(1);
  }),
  (function (n) {
    "use strict";
    var i = {
      item: 3,
      autoWidth: !1,
      slideMove: 1,
      slideMargin: 10,
      addClass: "",
      mode: "slide",
      useCSS: !0,
      cssEasing: "ease",
      easing: "linear",
      speed: 400,
      auto: !1,
      pauseOnHover: !1,
      loop: !1,
      slideEndAnimation: !0,
      pause: 2e3,
      keyPress: !1,
      controls: !0,
      prevHtml: "",
      nextHtml: "",
      rtl: !1,
      adaptiveHeight: !1,
      vertical: !1,
      verticalHeight: 500,
      vThumbWidth: 100,
      thumbItem: 10,
      pager: !0,
      gallery: !1,
      galleryMargin: 5,
      thumbMargin: 5,
      currentPagerPosition: "middle",
      enableTouch: !0,
      enableDrag: !0,
      freeMove: !0,
      swipeThreshold: 40,
      responsive: [],
      onBeforeStart: function () {},
      onSliderLoad: function () {},
      onBeforeSlide: function () {},
      onAfterSlide: function () {},
      onBeforeNextSlide: function () {},
      onBeforePrevSlide: function () {},
    };
    n.fn.lightSlider = function (t) {
      if (this.length === 0) return this;
      if (this.length > 1)
        return (
          this.each(function () {
            n(this).lightSlider(t);
          }),
          this
        );
      var a = {},
        r = n.extend(!0, {}, i, t),
        p = {},
        u = this;
      (a.$el = this), r.mode === "fade" && (r.vertical = !1);
      var s = u.children(),
        g = n(window).width(),
        ut = null,
        b = null,
        w = 0,
        c = 0,
        nt = !1,
        o = 0,
        f = "",
        e = 0,
        tt = r.vertical === !0 ? "height" : "width",
        it = r.vertical === !0 ? "margin-bottom" : "margin-right",
        l = 0,
        d = 0,
        y = 0,
        k = 0,
        v = null,
        rt = "ontouchstart" in document.documentElement,
        h = {};
      (h.chbreakpoint = function () {
        var f, i, t, u;
        if (((g = n(window).width()), r.responsive.length)) {
          if (
            (r.autoWidth === !1 && (f = r.item), g < r.responsive[0].breakpoint)
          )
            for (i = 0; i < r.responsive.length; i++)
              g < r.responsive[i].breakpoint &&
                ((ut = r.responsive[i].breakpoint), (b = r.responsive[i]));
          if (typeof b != "undefined" && b !== null)
            for (t in b.settings)
              b.settings.hasOwnProperty(t) &&
                ((typeof p[t] == "undefined" || p[t] === null) && (p[t] = r[t]),
                (r[t] = b.settings[t]));
          if (!n.isEmptyObject(p) && g > r.responsive[0].breakpoint)
            for (u in p) p.hasOwnProperty(u) && (r[u] = p[u]);
          r.autoWidth === !1 &&
            l > 0 &&
            y > 0 &&
            f !== r.item &&
            (e = Math.round(l / ((y + r.slideMargin) * r.slideMove)));
        }
      }),
        (h.calSW = function () {
          r.autoWidth === !1 &&
            (y = (o - (r.item * r.slideMargin - r.slideMargin)) / r.item);
        }),
        (h.calWidth = function (n) {
          var i = n === !0 ? f.find(".lslide").length : s.length,
            t;
          if (r.autoWidth === !1) c = i * (y + r.slideMargin);
          else
            for (c = 0, t = 0; t < i; t++)
              c += parseInt(s.eq(t).width()) + r.slideMargin;
          return c;
        }),
        (a = {
          doCss: function () {
            var n = function () {
              for (
                var t = [
                    "transition",
                    "MozTransition",
                    "WebkitTransition",
                    "OTransition",
                    "msTransition",
                    "KhtmlTransition",
                  ],
                  i = document.documentElement,
                  n = 0;
                n < t.length;
                n++
              )
                if (t[n] in i.style) return !0;
            };
            return r.useCSS && n() ? !0 : !1;
          },
          keyPress: function () {
            if (r.keyPress)
              n(document).on("keyup.lightslider", function (t) {
                n(":focus").is("input, textarea") ||
                  (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
                  t.keyCode === 37
                    ? u.goToPrevSlide()
                    : t.keyCode === 39 && u.goToNextSlide());
              });
          },
          controls: function () {
            if (r.controls) {
              u.after(
                '<div class="lSAction"><a class="lSPrev">' +
                  r.prevHtml +
                  '</a><a class="lSNext">' +
                  r.nextHtml +
                  "</a></div>"
              ),
                r.autoWidth
                  ? h.calWidth(!1) < o && f.find(".lSAction").hide()
                  : w <= r.item && f.find(".lSAction").hide();
              f.find(".lSAction a").on("click", function (t) {
                return (
                  t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
                  n(this).attr("class") === "lSPrev"
                    ? u.goToPrevSlide()
                    : u.goToNextSlide(),
                  !1
                );
              });
            }
          },
          initialStyle: function () {
            var n = this;
            r.mode === "fade" &&
              ((r.autoWidth = !1), (r.slideEndAnimation = !1)),
              r.auto && (r.slideEndAnimation = !1),
              r.autoWidth && ((r.slideMove = 1), (r.item = 1)),
              r.loop && ((r.slideMove = 1), (r.freeMove = !1)),
              r.onBeforeStart.call(this, u),
              h.chbreakpoint(),
              u
                .addClass("lightSlider")
                .wrap(
                  '<div class="lSSlideOuter ' +
                    r.addClass +
                    '"><div class="lSSlideWrapper"></div></div>'
                ),
              (f = u.parent(".lSSlideWrapper")),
              r.rtl === !0 && f.parent().addClass("lSrtl"),
              r.vertical
                ? (f.parent().addClass("vertical"),
                  (o = r.verticalHeight),
                  f.css("height", o + "px"))
                : (o = u.outerWidth()),
              s.addClass("lslide"),
              r.loop === !0 &&
                r.mode === "slide" &&
                (h.calSW(),
                (h.clone = function () {
                  var v, y, i, t, f, c, l, a;
                  if (h.calWidth(!0) > o) {
                    for (v = 0, y = 0, i = 0; i < s.length; i++)
                      if (
                        ((v +=
                          parseInt(u.find(".lslide").eq(i).width()) +
                          r.slideMargin),
                        y++,
                        v >= o + r.slideMargin)
                      )
                        break;
                    if (
                      ((t = r.autoWidth === !0 ? y : r.item),
                      t < u.find(".clone.left").length)
                    )
                      for (f = 0; f < u.find(".clone.left").length - t; f++)
                        s.eq(f).remove();
                    if (t < u.find(".clone.right").length)
                      for (
                        c = s.length - 1;
                        c > s.length - 1 - u.find(".clone.right").length;
                        c--
                      )
                        e--, s.eq(c).remove();
                    for (l = u.find(".clone.right").length; l < t; l++)
                      u
                        .find(".lslide")
                        .eq(l)
                        .clone()
                        .removeClass("lslide")
                        .addClass("clone right")
                        .appendTo(u),
                        e++;
                    for (
                      a =
                        u.find(".lslide").length - u.find(".clone.left").length;
                      a > u.find(".lslide").length - t;
                      a--
                    )
                      u.find(".lslide")
                        .eq(a - 1)
                        .clone()
                        .removeClass("lslide")
                        .addClass("clone left")
                        .prependTo(u);
                    s = u.children();
                  } else
                    s.hasClass("clone") &&
                      (u.find(".clone").remove(), n.move(u, 0));
                }),
                h.clone()),
              (h.sSW = function () {
                (w = s.length),
                  r.rtl === !0 && r.vertical === !1 && (it = "margin-left"),
                  r.autoWidth === !1 && s.css(tt, y + "px"),
                  s.css(it, r.slideMargin + "px"),
                  (c = h.calWidth(!1)),
                  u.css(tt, c + "px"),
                  r.loop === !0 &&
                    r.mode === "slide" &&
                    nt === !1 &&
                    (e = u.find(".clone.left").length);
              }),
              (h.calL = function () {
                (s = u.children()), (w = s.length);
              }),
              this.doCss() && f.addClass("usingCss"),
              h.calL(),
              r.mode === "slide"
                ? (h.calSW(),
                  h.sSW(),
                  r.loop === !0 && ((l = n.slideValue()), this.move(u, l)),
                  r.vertical === !1 && this.setHeight(u, !1))
                : (this.setHeight(u, !0),
                  u.addClass("lSFade"),
                  this.doCss() || (s.fadeOut(0), s.eq(e).fadeIn(0))),
              r.loop === !0 && r.mode === "slide"
                ? s.eq(e).addClass("active")
                : s.first().addClass("active");
          },
          pager: function () {
            var i = this,
              n,
              t;
            (h.createPager = function () {
              var p, a, t, h;
              k =
                (o - (r.thumbItem * r.thumbMargin - r.thumbMargin)) /
                r.thumbItem;
              for (
                var v = f.find(".lslide"),
                  w = f.find(".lslide").length,
                  n = 0,
                  s = "",
                  l = 0,
                  n = 0;
                n < w;
                n++
              )
                if (
                  (r.mode === "slide" &&
                    (r.autoWidth
                      ? (l +=
                          (parseInt(v.eq(n).width()) + r.slideMargin) *
                          r.slideMove)
                      : (l = n * (y + r.slideMargin) * r.slideMove)),
                  (p = v.eq(n * r.slideMove).attr("data-thumb")),
                  (s +=
                    r.gallery === !0
                      ? '<li style="width:100%;' +
                        tt +
                        ":" +
                        k +
                        "px;" +
                        it +
                        ":" +
                        r.thumbMargin +
                        'px"><a href="#"><img src="' +
                        p +
                        '" /></a></li>'
                      : '<li><a href="#">' + (n + 1) + "</a></li>"),
                  r.mode === "slide" && l >= c - o - r.slideMargin)
                ) {
                  (n = n + 1),
                    (a = 2),
                    r.autoWidth &&
                      ((s += '<li><a href="#">' + (n + 1) + "</a></li>"),
                      (a = 1)),
                    n < a
                      ? ((s = null), f.parent().addClass("noPager"))
                      : f.parent().removeClass("noPager");
                  break;
                }
              (t = f.parent()),
                t.find(".lSPager").html(s),
                r.gallery === !0 &&
                  (r.vertical === !0 &&
                    t.find(".lSPager").css("width", r.vThumbWidth + "px"),
                  (d = n * (r.thumbMargin + k) + 0.5),
                  t
                    .find(".lSPager")
                    .css({
                      property: d + "px",
                      "transition-duration": r.speed + "ms",
                    }),
                  r.vertical === !0 &&
                    f
                      .parent()
                      .css(
                        "padding-right",
                        r.vThumbWidth + r.galleryMargin + "px"
                      ),
                  t.find(".lSPager").css(tt, d + "px")),
                (h = t.find(".lSPager").find("li")),
                h.first().addClass("active");
              h.on("click", function () {
                return (
                  (e =
                    r.loop === !0 && r.mode === "slide"
                      ? e +
                        (h.index(this) -
                          t.find(".lSPager").find("li.active").index())
                      : h.index(this)),
                  u.mode(!1),
                  r.gallery === !0 && i.slideThumb(),
                  !1
                );
              });
            }),
              r.pager &&
                ((n = "lSpg"),
                r.gallery && (n = "lSGallery"),
                f.after('<ul class="lSPager ' + n + '"></ul>'),
                (t = r.vertical ? "margin-left" : "margin-top"),
                f
                  .parent()
                  .find(".lSPager")
                  .css(t, r.galleryMargin + "px"),
                h.createPager()),
              setTimeout(function () {
                h.init();
              }, 0);
          },
          setHeight: function (n, t) {
            var i = null,
              f = this,
              u;
            if (
              ((i = r.loop
                ? n.children(".lslide ").first()
                : n.children().first()),
              (u = function () {
                var r = i.outerHeight(),
                  u = 0,
                  f = r;
                t && ((r = 0), (u = (f * 100) / o)),
                  n.css({ height: r + "px", "padding-bottom": u + "%" });
              }),
              u(),
              i.find("img").length)
            )
              if (i.find("img")[0].complete) u(), v || f.auto();
              else
                i.find("img").on("load", function () {
                  setTimeout(function () {
                    u(), v || f.auto();
                  }, 100);
                });
            else v || f.auto();
          },
          active: function (n, t) {
            var i, o, s;
            this.doCss() && r.mode === "fade" && f.addClass("on"),
              (i = 0),
              e * r.slideMove < w
                ? (n.removeClass("active"),
                  this.doCss() ||
                    r.mode !== "fade" ||
                    t !== !1 ||
                    n.fadeOut(r.speed),
                  (i = t === !0 ? e : e * r.slideMove),
                  t === !0 &&
                    ((o = n.length), (s = o - 1), i + 1 >= o && (i = s)),
                  r.loop === !0 &&
                    r.mode === "slide" &&
                    ((i =
                      t === !0
                        ? e - u.find(".clone.left").length
                        : e * r.slideMove),
                    t === !0 &&
                      ((o = n.length),
                      (s = o - 1),
                      i + 1 === o ? (i = s) : i + 1 > o && (i = 0))),
                  this.doCss() ||
                    r.mode !== "fade" ||
                    t !== !1 ||
                    n.eq(i).fadeIn(r.speed),
                  n.eq(i).addClass("active"))
                : (n.removeClass("active"),
                  n.eq(n.length - 1).addClass("active"),
                  this.doCss() ||
                    r.mode !== "fade" ||
                    t !== !1 ||
                    (n.fadeOut(r.speed), n.eq(i).fadeIn(r.speed)));
          },
          move: function (n, t) {
            r.rtl === !0 && (t = -t),
              this.doCss()
                ? r.vertical === !0
                  ? n.css({
                      transform: "translate3d(0px, " + -t + "px, 0px)",
                      "-webkit-transform":
                        "translate3d(0px, " + -t + "px, 0px)",
                    })
                  : n.css({
                      transform: "translate3d(" + -t + "px, 0px, 0px)",
                      "-webkit-transform":
                        "translate3d(" + -t + "px, 0px, 0px)",
                    })
                : r.vertical === !0
                ? n
                    .css("position", "relative")
                    .animate({ top: -t + "px" }, r.speed, r.easing)
                : n
                    .css("position", "relative")
                    .animate({ left: -t + "px" }, r.speed, r.easing);
            var i = f.parent().find(".lSPager").find("li");
            this.active(i, !0);
          },
          fade: function () {
            this.active(s, !1);
            var n = f.parent().find(".lSPager").find("li");
            this.active(n, !0);
          },
          slide: function () {
            var n = this;
            (h.calSlide = function () {
              c > o &&
                ((l = n.slideValue()),
                n.active(s, !1),
                l > c - o - r.slideMargin
                  ? (l = c - o - r.slideMargin)
                  : l < 0 && (l = 0),
                n.move(u, l),
                r.loop === !0 &&
                  r.mode === "slide" &&
                  (e >= w - u.find(".clone.left").length / r.slideMove &&
                    n.resetSlide(u.find(".clone.left").length),
                  e === 0 && n.resetSlide(f.find(".lslide").length)));
            }),
              h.calSlide();
          },
          resetSlide: function (n) {
            var t = this;
            f.find(".lSAction a").addClass("disabled"),
              setTimeout(function () {
                (e = n),
                  f.css("transition-duration", "0ms"),
                  (l = t.slideValue()),
                  t.active(s, !1),
                  a.move(u, l),
                  setTimeout(function () {
                    f.css("transition-duration", r.speed + "ms"),
                      f.find(".lSAction a").removeClass("disabled");
                  }, 50);
              }, r.speed + 100);
          },
          slideValue: function () {
            var n = 0,
              t;
            if (r.autoWidth === !1) n = e * (y + r.slideMargin) * r.slideMove;
            else
              for (n = 0, t = 0; t < e; t++)
                n += parseInt(s.eq(t).width()) + r.slideMargin;
            return n;
          },
          slideThumb: function () {
            var i, n, s, t;
            switch (r.currentPagerPosition) {
              case "left":
                i = 0;
                break;
              case "middle":
                i = o / 2 - k / 2;
                break;
              case "right":
                i = o - k;
            }
            (n = e - u.find(".clone.left").length),
              (s = f.parent().find(".lSPager")),
              r.mode === "slide" &&
                r.loop === !0 &&
                (n >= s.children().length
                  ? (n = 0)
                  : n < 0 && (n = s.children().length)),
              (t = n * (k + r.thumbMargin) - i),
              t + o > d && (t = d - o - r.thumbMargin),
              t < 0 && (t = 0),
              this.move(s, t);
          },
          auto: function () {
            r.auto &&
              (clearInterval(v),
              (v = setInterval(function () {
                u.goToNextSlide();
              }, r.pause)));
          },
          pauseOnHover: function () {
            var t = this;
            if (r.auto && r.pauseOnHover) {
              f.on("mouseenter", function () {
                n(this).addClass("ls-hover"), u.pause(), (r.auto = !0);
              });
              f.on("mouseleave", function () {
                n(this).removeClass("ls-hover"),
                  f.find(".lightSlider").hasClass("lsGrabbing") || t.auto();
              });
            }
          },
          touchMove: function (n, t) {
            var s, i, e;
            f.css("transition-duration", "0ms"),
              r.mode === "slide" &&
                ((s = n - t),
                (i = l - s),
                i >= c - o - r.slideMargin
                  ? r.freeMove === !1
                    ? (i = c - o - r.slideMargin)
                    : ((e = c - o - r.slideMargin), (i = e + (i - e) / 5))
                  : i < 0 && (i = r.freeMove === !1 ? 0 : i / 5),
                this.move(u, i));
          },
          touchEnd: function (n) {
            var i, t, h;
            f.css("transition-duration", r.speed + "ms"),
              r.mode === "slide"
                ? ((i = !1),
                  (t = !0),
                  (l = l - n),
                  l > c - o - r.slideMargin
                    ? ((l = c - o - r.slideMargin),
                      r.autoWidth === !1 && (i = !0))
                    : l < 0 && (l = 0),
                  (h = function (n) {
                    var u = 0,
                      f,
                      h,
                      t;
                    if ((i || (n && (u = 1)), r.autoWidth)) {
                      for (h = 0, t = 0; t < s.length; t++)
                        if (
                          ((h += parseInt(s.eq(t).width()) + r.slideMargin),
                          (e = t + u),
                          h >= l)
                        )
                          break;
                    } else
                      (f = l / ((y + r.slideMargin) * r.slideMove)),
                        (e = parseInt(f) + u),
                        l >= c - o - r.slideMargin && f % 1 != 0 && e++;
                  }),
                  n >= r.swipeThreshold
                    ? (h(!1), (t = !1))
                    : n <= -r.swipeThreshold && (h(!0), (t = !1)),
                  u.mode(t),
                  this.slideThumb())
                : n >= r.swipeThreshold
                ? u.goToPrevSlide()
                : n <= -r.swipeThreshold && u.goToNextSlide();
          },
          enableDrag: function () {
            var e = this;
            if (!rt) {
              var u = 0,
                t = 0,
                i = !1;
              f.find(".lightSlider").addClass("lsGrab");
              f.on("mousedown", function (t) {
                if (c < o && c !== 0) return !1;
                n(t.target).attr("class") !== "lSPrev" &&
                  n(t.target).attr("class") !== "lSNext" &&
                  ((u = r.vertical === !0 ? t.pageY : t.pageX),
                  (i = !0),
                  t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
                  (f.scrollLeft += 1),
                  (f.scrollLeft -= 1),
                  f
                    .find(".lightSlider")
                    .removeClass("lsGrab")
                    .addClass("lsGrabbing"),
                  clearInterval(v));
              });
              n(window).on("mousemove", function (n) {
                i &&
                  ((t = r.vertical === !0 ? n.pageY : n.pageX),
                  e.touchMove(t, u));
              });
              n(window).on("mouseup", function (o) {
                if (i) {
                  f
                    .find(".lightSlider")
                    .removeClass("lsGrabbing")
                    .addClass("lsGrab"),
                    (i = !1),
                    (t = r.vertical === !0 ? o.pageY : o.pageX);
                  var s = t - u;
                  if (Math.abs(s) >= r.swipeThreshold)
                    n(window).on("click.ls", function (t) {
                      t.preventDefault
                        ? t.preventDefault()
                        : (t.returnValue = !1),
                        t.stopImmediatePropagation(),
                        t.stopPropagation(),
                        n(window).off("click.ls");
                    });
                  e.touchEnd(s);
                }
              });
            }
          },
          enableTouch: function () {
            var i = this,
              n,
              t;
            if (rt) {
              (n = {}), (t = {});
              f.on("touchstart", function (i) {
                (t = i.originalEvent.targetTouches[0]),
                  (n.pageX = i.originalEvent.targetTouches[0].pageX),
                  (n.pageY = i.originalEvent.targetTouches[0].pageY),
                  clearInterval(v);
              });
              f.on("touchmove", function (u) {
                var s, f, e;
                if (c < o && c !== 0) return !1;
                (s = u.originalEvent),
                  (t = s.targetTouches[0]),
                  (f = Math.abs(t.pageX - n.pageX)),
                  (e = Math.abs(t.pageY - n.pageY)),
                  r.vertical === !0
                    ? (e * 3 > f && u.preventDefault(),
                      i.touchMove(t.pageY, n.pageY))
                    : (f * 3 > e && u.preventDefault(),
                      i.touchMove(t.pageX, n.pageX));
              });
              f.on("touchend", function () {
                if (c < o && c !== 0) return !1;
                var u;
                (u = r.vertical === !0 ? t.pageY - n.pageY : t.pageX - n.pageX),
                  i.touchEnd(u);
              });
            }
          },
          build: function () {
            var t = this;
            t.initialStyle(),
              this.doCss() &&
                (r.enableTouch === !0 && t.enableTouch(),
                r.enableDrag === !0 && t.enableDrag());
            n(window).on("focus", function () {
              t.auto();
            });
            n(window).on("blur", function () {
              clearInterval(v);
            });
            t.pager(), t.pauseOnHover(), t.controls(), t.keyPress();
          },
        }),
        a.build(),
        (h.init = function () {
          h.chbreakpoint(),
            r.vertical === !0
              ? ((o = r.item > 1 ? r.verticalHeight : s.outerHeight()),
                f.css("height", o + "px"))
              : (o = f.outerWidth()),
            r.loop === !0 && r.mode === "slide" && h.clone(),
            h.calL(),
            r.mode === "slide" && u.removeClass("lSSlide"),
            r.mode === "slide" && (h.calSW(), h.sSW()),
            setTimeout(function () {
              r.mode === "slide" && u.addClass("lSSlide");
            }, 1e3),
            r.pager && h.createPager(),
            r.adaptiveHeight === !0 &&
              r.vertical === !1 &&
              u.css("height", s.eq(e).outerHeight(!0)),
            r.adaptiveHeight === !1 &&
              (r.mode === "slide"
                ? r.vertical === !1
                  ? a.setHeight(u, !1)
                  : a.auto()
                : a.setHeight(u, !0)),
            r.gallery === !0 && a.slideThumb(),
            r.mode === "slide" && a.slide(),
            r.autoWidth === !1
              ? s.length <= r.item
                ? f.find(".lSAction").hide()
                : f.find(".lSAction").show()
              : h.calWidth(!1) < o && c !== 0
              ? f.find(".lSAction").hide()
              : f.find(".lSAction").show();
        }),
        (u.goToPrevSlide = function () {
          if (e > 0)
            r.onBeforePrevSlide.call(this, u, e),
              e--,
              u.mode(!1),
              r.gallery === !0 && a.slideThumb();
          else if (r.loop === !0) {
            if ((r.onBeforePrevSlide.call(this, u, e), r.mode === "fade")) {
              var n = w - 1;
              e = parseInt(n / r.slideMove);
            }
            u.mode(!1), r.gallery === !0 && a.slideThumb();
          } else
            r.slideEndAnimation === !0 &&
              (u.addClass("leftEnd"),
              setTimeout(function () {
                u.removeClass("leftEnd");
              }, 400));
        }),
        (u.goToNextSlide = function () {
          var n = !0,
            t;
          r.mode === "slide" &&
            ((t = a.slideValue()), (n = t < c - o - r.slideMargin)),
            e * r.slideMove < w - r.slideMove && n
              ? (r.onBeforeNextSlide.call(this, u, e),
                e++,
                u.mode(!1),
                r.gallery === !0 && a.slideThumb())
              : r.loop === !0
              ? (r.onBeforeNextSlide.call(this, u, e),
                (e = 0),
                u.mode(!1),
                r.gallery === !0 && a.slideThumb())
              : r.slideEndAnimation === !0 &&
                (u.addClass("rightEnd"),
                setTimeout(function () {
                  u.removeClass("rightEnd");
                }, 400));
        }),
        (u.mode = function (n) {
          r.adaptiveHeight === !0 &&
            r.vertical === !1 &&
            u.css("height", s.eq(e).outerHeight(!0)),
            nt === !1 &&
              (r.mode === "slide"
                ? a.doCss() &&
                  (u.addClass("lSSlide"),
                  r.speed !== "" &&
                    f.css("transition-duration", r.speed + "ms"),
                  r.cssEasing !== "" &&
                    f.css("transition-timing-function", r.cssEasing))
                : a.doCss() &&
                  (r.speed !== "" &&
                    u.css("transition-duration", r.speed + "ms"),
                  r.cssEasing !== "" &&
                    u.css("transition-timing-function", r.cssEasing))),
            n || r.onBeforeSlide.call(this, u, e),
            r.mode === "slide" ? a.slide() : a.fade(),
            f.hasClass("ls-hover") || a.auto(),
            setTimeout(function () {
              n || r.onAfterSlide.call(this, u, e);
            }, r.speed),
            (nt = !0);
        }),
        (u.play = function () {
          u.goToNextSlide(), (r.auto = !0), a.auto();
        }),
        (u.pause = function () {
          (r.auto = !1), clearInterval(v);
        }),
        (u.refresh = function () {
          h.init();
        }),
        (u.getCurrentSlideCount = function () {
          var t = e,
            i,
            n;
          return (
            r.loop &&
              ((i = f.find(".lslide").length),
              (n = u.find(".clone.left").length),
              (t = e <= n - 1 ? i + (e - n) : e >= i + n ? e - i - n : e - n)),
            t + 1
          );
        }),
        (u.getTotalSlideCount = function () {
          return f.find(".lslide").length;
        }),
        (u.goToSlide = function (n) {
          (e = r.loop ? n + u.find(".clone.left").length - 1 : n),
            u.mode(!1),
            r.gallery === !0 && a.slideThumb();
        }),
        (u.destroy = function () {
          u.lightSlider &&
            ((u.goToPrevSlide = function () {}),
            (u.goToNextSlide = function () {}),
            (u.mode = function () {}),
            (u.play = function () {}),
            (u.pause = function () {}),
            (u.refresh = function () {}),
            (u.getCurrentSlideCount = function () {}),
            (u.getTotalSlideCount = function () {}),
            (u.goToSlide = function () {}),
            (u.lightSlider = null),
            (h = { init: function () {} }),
            u.parent().parent().find(".lSAction, .lSPager").remove(),
            u
              .removeClass(
                "lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right"
              )
              .removeAttr("style")
              .unwrap()
              .unwrap(),
            u.children().removeAttr("style"),
            s.removeClass("lslide active"),
            u.find(".clone").remove(),
            (s = null),
            (v = null),
            (nt = !1),
            (e = 0));
        }),
        setTimeout(function () {
          r.onSliderLoad.call(this, u);
        }, 10);
      n(window).on("resize orientationchange", function (n) {
        setTimeout(function () {
          n.preventDefault ? n.preventDefault() : (n.returnValue = !1),
            h.init();
        }, 200);
      });
      return this;
    };
  })(jQuery),
  (function (n, t) {
    "use strict";
    var r = "carousel",
      i = t("<span>", { class: "carousel-arrow", style: "display: none;" });
    t[r] = function (r, u) {
      var w = this,
        f = t(r),
        c = t.extend(
          { itemnumber: _LaRedoute.getScreenType() + 1, slidemargin: 10 },
          u
        ),
        b,
        l = !1,
        h =
          f.data("displayedItems") !== undefined
            ? f.data("displayedItems")
            : c.itemnumber,
        g = c.slidemargin,
        k = c.triggereventonslide,
        y,
        s,
        d,
        a,
        v,
        e,
        o,
        p;
      if (!n.isMobileDevice || c.enabledOnMobile) {
        (y = f.hasClass("zsb")),
          y && (h = 3),
          (s =
            f.data("enableableArrows") !== undefined
              ? f.data("enableableArrows")
              : !1),
          (d = f.data("hasItems") !== undefined ? f.data("hasItems") : !1),
          (this.isFillable = !1),
          (w.reset = function () {
            var n;
            (l || this.isFillable) &&
              ((n = y || d ? f.find(".carousel-item") : f.find("> div")),
              n.length <= Math.floor(h)
                ? ((l = !1),
                  v(),
                  f.addClass("carousel"),
                  n.addClass("carousel-item"),
                  this.isFillable || f.destroy())
                : (this.isFillable &&
                    ((l = !0),
                    a(),
                    f.removeClass("carousel"),
                    n.removeClass("carousel-item")),
                  f.refresh()));
          }),
          (w.goToFirstSlide = function () {
            f.goToSlide(0);
          }),
          (a = function () {
            b
              ? (f.getCurrentSlideCount() === 1
                  ? s
                    ? e.disable()
                    : e.hide()
                  : s
                  ? e.enable()
                  : e.show(),
                f.getCurrentSlideCount() * Math.floor(h) >=
                f.getTotalSlideCount()
                  ? s
                    ? o.disable()
                    : o.hide()
                  : s
                  ? o.enable()
                  : o.show())
              : v();
          }),
          (v = function () {
            s ? (e.disable(), o.disable()) : (e.hide(), o.hide());
          }),
          s &&
            ((e = t("#" + f.data("leftArrowId"))),
            (o = t("#" + f.data("rightArrowId")))),
          s ||
            ((e = i.clone().addClass("left")),
            (o = i.clone().addClass("right")),
            f.after(e, o));
        e.on("click", function () {
          f.goToPrevSlide();
        });
        o.on("click", function () {
          f.goToNextSlide();
        });
        if (((p = f.find(".carousel-item")), p.length <= Math.floor(h))) {
          v();
          return;
        }
        p.removeClass("carousel-item"),
          (l = !0),
          f.removeClass("carousel").lightSlider({
            item: h,
            slideMove: Math.floor(h),
            slideMargin: g,
            pager: !1,
            controls: !1,
            gallery: !1,
            enableDrag: !1,
            enableTouch: !0,
            useCSS: !0,
            onBeforeSlide: function () {
              typeof k === varType.str && n.$eventContainer.trigger(k), a();
            },
          }),
          (b = f.getTotalSlideCount() > Math.floor(h)),
          a();
      }
    };
  })(window, jQuery),
  (function (n) {
    (n.feedback = function (t, i) {
      var r = this,
        u = n(t),
        t = t;
      (r.init = function () {
        var t, e, u, f;
        if (
          ((r.isActive = !1),
          (r.$adjustment = n("<div>", { class: "feedback-adjustment" })),
          (r.$content = n("<div>", { class: "feedback" }).append(
            r.$adjustment
          )),
          i.style === "dot")
        )
          (t = n("<span>", { text: "." })),
            (r.$content = n("<span>", { class: "anim-blink-inf" }).append(
              t.clone(),
              t.clone(),
              t.clone()
            ));
        else
          for (
            e = n("<span>", { class: "anim-blink-inf-" + i.style }),
              u = n("<div>", { class: "feedback-content anim-blink-inf" }),
              r.$adjustment.append(u),
              f = 0;
            f < i.number;
            f++
          )
            u.append(e.clone());
      }),
        (r.add = function () {
          r.isActive === !1 &&
            (u.addClass("feedback-container").append(r.$content),
            r.height === undefined && (r.height = r.$adjustment.height()),
            r.$adjustment.css("margin-top", -(r.height / 2)),
            (r.isActive = !0));
        }),
        (r.remove = function () {
          r.isActive &&
            (u.removeClass("feedback-container"),
            r.$content.detach(),
            (r.isActive = !1));
        }),
        r.init();
    }),
      (n.fn.feedback = function (t) {
        if (Utils.Common.isAppleDevice() === !1 || t.forceIosDevice === !0)
          return this.each(function () {
            var i = n(this),
              r,
              u;
            i.data("feedback") === undefined &&
              ((r = { style: "point", number: 3 }),
              n.extend(r, i.data()),
              typeof t == "object" && n.extend(r, t),
              (u = new n.feedback(this, r)),
              i.data("feedback", u)),
              (typeof t == "object" && t.method === "add") || t === "add"
                ? i.data("feedback").add()
                : ((typeof t == "object" && t.method === "remove") ||
                    t === "remove") &&
                  i.data("feedback").remove();
          });
      });
  })(jQuery),
  (function (n) {
    var t = "field";
    (n[t] = function (i) {
      function s() {
        var n = setInterval(function () {
          h(), o++, (o > 9 || r.$label.hasClass(f)) && clearInterval(n);
        }, 1e3);
      }
      function h() {
        u.val() && r.activeFocus();
      }
      var r = this,
        u = n(i),
        f = "active",
        e = "is-unfocused",
        o = 0;
      (r.init = function () {
        (r.$field = u.parent(".field")),
          (r.$label = u.siblings(".field-label"));
        var n = function () {
            r.$label.addClass(f).removeClass(e);
          },
          t = function () {
            u.val() ? r.activeFocus() : r.removeFocus();
          };
        u.on("focus", n).on("focusout", t);
        h(), s();
      }),
        (r.activeFocus = function () {
          r.$label.addClass(f).removeClass(e);
        }),
        (r.removeFocus = function () {
          r.$label.addClass(e).removeClass(f);
        }),
        (r.update = function () {
          u.val() ? r.activeFocus() : u.val() || r.removeFocus(), s();
        }),
        (r.hide = function () {
          r.$field.hide();
        }),
        (r.show = function () {
          r.$field.show();
        }),
        (r.destroy = function () {
          u.data(t, undefined),
            typeof n.fields != "undefined" && delete n.fields[r.name];
        }),
        r.init();
    }),
      (n.fn[t] = function (i) {
        return this.each(function () {
          var r = n(this),
            u;
          r.data(t) === undefined && ((u = new n[t](this)), r.data(t, u)),
            i === "update" && r.data(t).update();
        });
      });
  })(jQuery),
  (function (n, t) {
    "use strict";
    t.fn.isChecked = function () {
      return this.is(":checked");
    };
    var i = function (t) {
        t = t || "";
        var i = [n.elementStatus.loading, t];
        return i.join(" ");
      },
      r = [
        n.elementStatus.disabled,
        n.elementStatus.hidden,
        n.elementStatus.opened,
        n.elementStatus.selected,
        n.elementStatus.visible,
      ];
    r.forEach(function (i) {
      var r = i.charAt(0).toUpperCase() + i.slice(1);
      (t.fn["add" + r] = function () {
        return this.addClass(n.elementStatus[i]);
      }),
        (t.fn["remove" + r] = function () {
          return this.removeClass(n.elementStatus[i]);
        }),
        (t.fn["is" + r] = function () {
          return this.hasClass(n.elementStatus[i]);
        });
    }),
      (t.fn.addActive = function (t) {
        return (t = t || ""), this.addClass(n.Utils.Enum.Status.Active, t);
      }),
      (t.fn.removeActive = function (t) {
        return (t = t || ""), this.removeClass(n.Utils.Enum.Status.Active, t);
      }),
      (t.fn.isActive = function () {
        return this.hasClass(n.Utils.Enum.Status.Active);
      }),
      (t.fn.addLoading = function (n) {
        return this.addClass(i(n));
      }),
      (t.fn.removeLoading = function (n) {
        return this.removeClass(i(n));
      }),
      (t.fn.mergeFieldsValue = function (n, i) {
        if (this.length !== 0) {
          if (!t.isArray(n)) {
            throw "mergeFieldsValue: fields must be Array";
            return;
          }
          var r = this;
          (r.settings = t.extend(
            {
              fieldValueSeparator: "",
              triggerEvent: "change",
              validatorActionDuringEvent: null,
              validatorTriggerEvent: "blur",
            },
            i
          )),
            (r.fields = n),
            (r.fieldsLength = r.fields.length),
            (r.allFieldsExists = function () {
              var n = !0;
              return (
                t.each(r.fields, function (i, r) {
                  if (t(r).length === 0) {
                    n = !1;
                    throw (
                      "mergeFieldsValue.fieldsExists() : " +
                      r +
                      " does not exist"
                    );
                  }
                }),
                n
              );
            }),
            (r.getFieldsSelector = function () {
              return r.allFieldsExists() ? r.fields.join() : "";
            }),
            (r.isAllFieldsEmpty = function () {
              var n = r.fields.filter(function (n) {
                var i = n instanceof t ? n : t(n);
                return i.val() === "";
              });
              return n.length === r.fieldsLength;
            });
          t(r.getFieldsSelector()).on(r.settings.triggerEvent, function () {
            if (r.isAllFieldsEmpty()) r.val("");
            else {
              var n = [];
              t.each(r.fields, function (i, r) {
                n.push(t(r).val().toString());
              }),
                r.val(n.join(r.settings.fieldValueSeparator));
            }
            typeof r.settings.validatorActionDuringEvent == "function" &&
              r.settings.validatorActionDuringEvent.apply(r);
          });
          return r;
        }
      }),
      (t.fn.enable = function () {
        return this.toggleDisable(!1);
      }),
      (t.fn.disable = function () {
        return this.toggleDisable(!0);
      }),
      (t.fn.toggleDisable = function (t) {
        return (
          typeof t != "boolean" && (t = !0),
          this.prop(n.Utils.Enum.Status.Disabled, t)
        );
      }),
      (t.fn.setMaxlength = function (n) {
        return this.prop("maxlength", n);
      }),
      (t.getHeaderTooltipClasses = function (i) {
        var f = " ",
          r = [],
          u;
        return (
          typeof i == "string" &&
            ((u = i.split(f)),
            u.length === 1 ? r.push(i) : (r = t.merge(r, u))),
          t.merge(r, n.Utils.Enum.Class.Header.TooltipDefaultClasses).join(f)
        );
      });
  })(window, window.jQuery),
  (function (n) {
    n.fn.optionPanel = function (t) {
      var i = this;
      if (n("#optionPanel").length === 0) {
        n("<div>", { id: "optionPanel", class: "loading" }).appendTo("body"),
          n("<span>", { class: "option-panel-close close" }).appendTo(
            "#optionPanel"
          );
        n(".option-panel-close, #overlay").on("click", function () {
          i.close();
        });
      }
      return (
        (this.open = function (t, r, u) {
          var f, e, o;
          t !== undefined ? (f = t) : r !== undefined && (f = r),
            typeof f != "undefined" &&
              (n("#" + f).length === 0
                ? (n("<div>", {
                    id: f,
                    class: "option-panel-content",
                  }).appendTo("#optionPanel"),
                  (e = window.callbackFunctions[r]),
                  window.callbackFunctions[r + "Instance"] !== undefined &&
                    (o = window.callbackFunctions[r + "Instance"]),
                  u && (u = u.replace(/\'/g, '"')),
                  typeof e == "function" &&
                    (o !== undefined ? e.call(o, f, u) : e(f, u)))
                : (n("#" + f).show(), i.endLoading()),
              n("body").addClass("no-scroll"),
              n("#optionPanel").addClass("show"),
              n("#overlay").addClass("for-right-panel is-visible"));
        }),
        (this.close = function () {
          n("body").removeClass("no-scroll"),
            n("#optionPanel").removeClass("show"),
            n("#overlay").removeClass("for-right-panel"),
            setTimeout(function () {
              n(".option-panel-content").hide(),
                n("#optionPanel").addClass("loading"),
                n("#overlay").removeClass("is-visible");
            }, 600);
        }),
        (this.endLoading = function () {
          n("#optionPanel").removeClass("loading");
        }),
        this.each(function () {
          var r = {},
            u,
            f;
          (r.beforeOpening = n(this).data("open")),
            (u = n(this).data("id")),
            (f = n(this).data("params"));
          switch (t) {
            case "close":
              i.close();
              break;
            case "open":
              i.open(u, r.beforeOpening, f);
              break;
            case "endLoading":
              i.endLoading();
              break;
            default:
              n(this).on("click", function (n) {
                n.preventDefault(), i.open(u, r.beforeOpening, f);
              });
          }
        })
      );
    };
  })(jQuery),
  (function (n, t) {
    var i = "popin";
    t[i] = function (r, u) {
      var e = this,
        f = u,
        d = ["fullscreen"],
        o = t(r),
        g = o.parent(),
        s,
        a;
      f.trigger !== undefined &&
        (typeof f.trigger === varType.obj && f.trigger.length > 0
          ? (s = e.$trigger = f.trigger)
          : typeof f.trigger === varType.str && (s = e.$trigger = t(f.trigger)),
        (a = s.find(".lr-arrow.lr-arrow-selector")));
      var c = (e.$container = t("<div>", {
          class: i + "-wrapper fade",
          "data-name": o.attr("id"),
        })),
        h = t("<div>", { class: i + "-container" }).appendTo(c),
        l = t("<div>", { class: i + "-overlay" }).appendTo(h),
        nt = t("<div>", { class: i + "-btn-close-container" }).appendTo(o),
        v = t("<div>", {
          class: i + "-btn-close close",
          "data-cerberus": "popin_close",
        }).appendTo(nt);
      o.appendTo(h), c.appendTo("body");
      var y = function () {
          l.addClass(i + "-high"), v.addClass(i + "-btn-close-fixed");
        },
        tt = function () {
          return a && a.length > 0;
        },
        p = function (n) {
          n.key === "Escape" && w();
        },
        w = function () {
          n.Utils.Common.stopNoScroll(),
            c.removeClass("in").removeAttr("style"),
            o.focusout(),
            o.trigger(i + ".close"),
            t(document).off("keyup", p);
        },
        it = function (n) {
          return t.inArray(n, d) !== -1 ? !0 : !1;
        },
        b = function () {
          return t.ajax({
            url: f.url,
            success: function (n) {
              var i = t("<div>", { html: n });
              if (
                (f.block !== undefined && (i = i.find(f.block)),
                i.appendTo(o),
                typeof f.onLoad == "function")
              )
                if (f.context !== undefined) f.onLoad.call(f.context, o);
                else f.onLoad(o);
              (e.isLoaded = !0), e.shouldBeOpened === !0 && k();
            },
            error: function () {
              console.error(i + " : ajax error");
            },
            complete: function () {
              s !== undefined && s.feedback("remove");
            },
          });
        },
        rt = function () {
          l.removeClass(i + "-high"), v.removeClass(i + "-btn-close-fixed");
        },
        k = function () {
          if (
            (n.Utils.Common.startNoScroll(),
            t(".popin-wrapper.in").length > 0 &&
              h.css("z-index", parseInt(c.css("z-index")) + 1),
            c.addClass("in"),
            f.position === undefined || f.position === "undefined"
              ? (e.determinePosition(),
                h.find("img").length > 0 &&
                  h.find("img").each(function (n, i) {
                    t(i).load(function () {
                      e.determinePosition();
                    });
                  }))
              : f.position === "defined" && y(),
            c.scrollTop(0),
            o.focusin().trigger(i + ".open"),
            f.trackName !== undefined)
          ) {
            var u = {
                pageName: n.wa_data.pageName,
                channel: n.wa_data.channel,
              },
              r = Utils.Common.getCountry(!0);
            typeof f.url != "undefined" &&
              typeof f.trackName != "undefined" &&
              ((n.wa_data.pageName =
                r.toUpperCase() +
                ":RE:" +
                f.trackName +
                (f.trackMergeUrl
                  ? ":" + f.url.split("?")[0].replace(/\/m\/|\/|.aspx/g, "")
                  : "")),
              (n.wa_data.channel = f.trackName.split(":")[0].toLowerCase())),
              _satellite.track("DC_POPINLOADED");
          }
          t(document).on("keyup", p);
        };
      if (
        ((e.open = function () {
          f.url !== undefined && e.isLoaded === !1
            ? (s !== undefined && s.feedback("add"),
              f.preload !== !0 && e.shouldBeOpened === !1 && b(),
              (e.shouldBeOpened = !0))
            : (k(), n.Utils.Common.startNoScroll());
        }),
        (e.close = function () {
          w();
        }),
        (e.destroy = function () {
          e.close(),
            l.remove(),
            o.appendTo(g),
            c.remove(),
            v.remove(),
            s !== undefined && s.off("click"),
            o.removeData(i);
        }),
        (e.determinePosition = function () {
          f.position = "done";
          var i = h.outerHeight(),
            r = t(n).height();
          i < r ? (h.css({ marginTop: -(i / 2), top: "50%" }), rt()) : y();
        }),
        s !== undefined)
      )
        s.on("click", function () {
          t(this).hasClass("disabled") === !1 && e.open();
        });
      v.on("click", function () {
        e.close();
      });
      if (f.onlyCloseButton !== !0)
        l.on("click", function () {
          e.close();
        });
      if ((o.show(), f.url !== undefined))
        (e.isLoaded = !1), (e.shouldBeOpened = !1), f.preload === !0 && b();
      else if (typeof f.onLoad == "function")
        if (f.context !== undefined) f.onLoad.call(f.context, o);
        else f.onLoad(o);
      it(f.size) &&
        (f.size === "fullscreen" &&
          (l.addClass(i + "-overlay-white"),
          n.Utils.Common.isAppleDevice() &&
            l.addClass(i + "-overlay-fullscreen")),
        h.addClass(i + "-" + f.size)),
        f.style && o.addClass(i + "-" + f.style),
        tt() && a.addClass("lr-arrow-right");
    };
  })(window, jQuery),
  (popinEvent = { close: "popin.close", open: "popin.open" }),
  (function (n) {
    var t = "progressBar";
    (n[t] = function (t) {
      var r = n(t),
        e = r.width(),
        u = r.find(".progressbar-progress"),
        i = r.find(".progressbar-info"),
        f = u.data("percentProgress"),
        o =
          f.toString().indexOf(",") !== -1
            ? parseFloat(f.replace(",", "."))
            : parseInt(f),
        h = r.find(".progressbar-triangle"),
        s = parseInt(u.css("transitionDuration")) * 500,
        c = function () {
          var n = i.width() / 2,
            t = (e * o) / 100;
          return (
            t < n
              ? i.css("left", 0)
              : t > n && e - n < t
              ? i.css("right", 0)
              : i.css("left", t - n),
            i.fadeIn(s)
          );
        };
      u.width(o + "%"),
        h.fadeIn(s, function () {
          i.length === 1 && c();
        });
    }),
      (n.fn[t] = function () {
        return this.each(function () {
          var i = n(this);
          i.data(t) === undefined && i.data(t, new n[t](this));
        });
      });
  })(jQuery),
  (function (n, t) {
    "use strict";
    var i = "readmore",
      r = "click";
    t[i] = function (u, f) {
      function c() {
        return e.isOpen ? h.hideText : h.showText;
      }
      var e = this,
        l = "readmore--opened",
        a = n.labels.MobileV3_Common,
        v = {
          maxHeight: 60,
          showText: a.ReadMore,
          hideText: a.ReadLess,
          openOnInit: !1,
        },
        h = t.extend({}, v, f),
        o,
        s;
      (e.isOpen = h.openOnInit),
        (o = t(u)),
        (s = t("<a>", { href: "#", class: "readmore_link", text: c() })),
        o.addClass(i),
        o.siblings(".readmore_link").length === 0
          ? o.after(s)
          : (s = o.siblings(".readmore_link")),
        (e.open = function () {
          e.isOpen ||
            (o.addClass(l).height("auto"), (e.isOpen = !0), s.text(c()));
        }),
        (e.close = function () {
          o.removeClass(l).height(h.maxHeight), (e.isOpen = !1), s.text(c());
        }),
        (e.toggle = function (n) {
          e.isOpen && n !== !0 ? e.close() : e.open();
        });
      s.on(r, function (n) {
        n.preventDefault(), e.toggle();
      });
      h.openOnInit ? e.open() : e.close();
    };
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    var i = "reco",
      r = { carousel: "carousel", destructive: "destructive", list: "list" },
      u = n.Utils.Common,
      f = { atb: "ATB", histo: "histo" },
      e = t("<div>", { class: "close" });
    (t[i] = function (o, s) {
      var it = this,
        a = t(o),
        h = s,
        y = h.type === f.histo,
        rt = h.rating === !0,
        k = h.template ? h.template : r.carousel,
        v = h.cerberus || h.key,
        p = "data-cerberus",
        d = !1,
        c,
        ut = 0,
        g,
        w = a.find("." + i + "-title"),
        ft = t("#productModel").find(".product"),
        l,
        b,
        et = function (n) {
          if (t.isArray(n) && n.length > 0) {
            var i = t();
            if (
              ((l = a.find("." + c)),
              l.length === 0 && (l = t("<div>", { class: c }).appendTo(a)),
              t.each(n, function () {
                i = i.add(tt(this));
              }),
              l.html(i),
              typeof t.fn[c] === varType.fn)
            )
              if (d)
                if (nt()) l[c]();
                else
                  window.$eventContainer.one(g, function () {
                    l[c]();
                  });
              else l[c]();
          } else a.hide();
        },
        nt = function () {
          return !0;
        },
        tt = function (i) {
          var o = b.clone(),
            f = ft.clone(),
            ot = f.find(".product-link"),
            nt = i.priceCatalog,
            tt = i.finalPrice,
            s = parseFloat(i.ecotax),
            st = s > 0,
            ht,
            ct,
            w,
            it,
            et;
          y && (ht = e.clone().appendTo(f)),
            st &&
              ((tt = (tt * 100 + s * 100) / 100),
              (nt = (nt * 100 + s * 100) / 100)),
            f.attr(p, v + "_product" + ut++),
            f.find(".product-brand").text(i.brand),
            f.find(".product-title").text(i.title),
            y ||
              (f.find(".product-price").text(u.formatPrice(tt)),
              i.priceCatalog !== i.finalPrice &&
                f
                  .find(".product-original-price")
                  .text(u.formatPrice(nt))
                  .show(),
              i.discount !== undefined &&
                i.discount !== 0 &&
                f
                  .find(".product-discount")
                  .text("-" + i.discount + "%")
                  .show(),
              i.hasSeveralPrices === 1 && f.find(".product-price-from").show(),
              st &&
                f
                  .find(".product-eco-part")
                  .text(function (n, t) {
                    return t.replace("{0}", u.formatPrice(s));
                  })
                  .show(),
              i.sticker === "Go For Good" &&
                f.find(".product-sticker-bottom-left").text(i.sticker).show()),
            rt &&
              i.rating !== undefined &&
              (i.rating >= 3.25 &&
                f
                  .find(".rating-stars-container")
                  .css("display", "inline-block"),
              (ct = (Math.round(i.rating * 2) / 2)
                .toString()
                .replace(".", "_")),
              f.find(".enable-stars").addClass("rating-" + ct),
              f.find(".review-number").text("(" + i.reviewCount + ")")),
            i.onClickBeacon !== undefined &&
              i.onViewBeacon !== undefined &&
              (f
                .find(".product-info")
                .append('<span class="PERSObutton5">Sponsorisé</span>'),
              f
                .addClass("PERSObutton6 onViewOnClickBeaconPSF018")
                .attr("data-onclickbeacon", i.onClickBeacon)
                .attr("data-onviewbeacon", i.onViewBeacon)),
            c === r.list &&
              (o.attr("data-maincatId", i.mainCat.id),
              o.attr("data-subcatId", i.subCat.id)),
            o.append(f),
            (w = i.photo),
            (it = 302),
            k == r.destructive &&
              ((w = Utils.Common.formatImgUrl(w, 641)), (it = 641)),
            (et = t("<img>", {
              src: "/images/PDP/placeholder_" + it + ".png",
              class: "product-img",
              "data-src": w,
              alt: i.title,
            }));
          et.one("load", function () {
            lzld(this);
          });
          f.find(".product-img").append(et);
          var lt = "https://www.laredoute." + _page.country,
            d = i.url.replace(lt, ""),
            at = d.indexOf("?") >= 0,
            vt = "",
            g = v;
          (g +=
            _page.name == pageName.hp
              ? "_" + u.formatText(h.title)
              : "_" + _page.pageType.toLowerCase()),
            at && (vt = d.split("?")[1]),
            n.isMobileDevice && (d += "#shoppingtool=" + g),
            ot.prop("href", d).data("productid", i.id);
          n.Utils.Common.onCustomClick(ot, function () {
            Utils.CookieManager.CreateCookie("quickzoomshoppingtool", g);
          });
          if (y)
            ht.on("click", function () {
              window._ebq.push([
                "trackActivity",
                {
                  original_id: i.id,
                  verb: "view",
                  opposite: !0,
                  type: "product",
                },
              ]),
                o.remove(),
                l.is(":empty") && a.hide(),
                typeof t.fn[c] === varType.fn && l[c]("reset");
            });
          return o;
        },
        ot = function () {
          (c = k),
            (b =
              c === r.list
                ? t("<li>", { class: "col-xs-6 col-md-4" })
                : t("<div>", { class: c + "-item" })),
            h.type === f.atb &&
              ((d = !0),
              (g = pdpEvent.atbOpen),
              (nt = function () {
                return t("#layerAtb").is(":visible");
              }));
        };
      (it.addNewProducts = function (n) {
        if (t.isArray(n) && n.length > 0) {
          var i = t();
          t.each(n, function () {
            i = i.add(tt(this));
          }),
            l.append(i);
        }
      }),
        ot(),
        a.show(),
        a.attr(p, v),
        typeof h.title === varType.str &&
          (w.length === 0 &&
            (w = t("<div>", { class: "reco-title catalog-subtitle" }).prependTo(
              a
            )),
          w.text(h.title).attr(p, v + "_title")),
        h.isMultiZone || et(h.productsInfos);
    }),
      (t.fn[i] = function (n) {
        return this.each(function () {
          var r = t(this),
            u,
            e,
            f;
          r.data(i) === undefined &&
            ((u = r.data()),
            typeof n === varType.obj && t.extend(u, n),
            (e = new t[i](this, u)),
            r.data(i, e)),
            typeof n === varType.str &&
              ((f = r.data(i)[n]), typeof f === varType.fn && f.apply(this));
        });
      });
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    var i = "sidePanel",
      r = 0;
    (n.sidePanelEvent = {
      childrenClosed: i + ".childrenClosed.",
      childrenOpening: i + ".childrenOpening.",
      parentClosing: i + ".parentClosing.",
    }),
      (t[i] = function (i, u) {
        var w,
          d = 50,
          o = !1,
          a = t(i).attr("id"),
          f = this,
          e = t.extend(
            { from: "right", parent: "none", stickedBtnPosition: "none" },
            u
          ),
          g = t(i),
          v = t("#overlay"),
          c = t(e.stickedBtn),
          s = t(e.trigger),
          h = t("<div>", {
            class: "panel-wrapper-" + e.from,
            "data-name": a,
          }).appendTo("body");
        h.append(g);
        var nt = function () {
            setTimeout(function () {
              n.$eventContainer.trigger(
                n.sidePanelEvent.childrenClosed + e.parent
              );
            }, 400);
          },
          tt = function () {
            n.$eventContainer.trigger(
              n.sidePanelEvent.childrenOpening + e.parent
            ),
              setTimeout(f.open, 400);
          },
          p = function () {
            e.stickedBtnPosition === "top" &&
              (c.parent().removeClass("panel-wrapper-bottom-with-sticked-btn"),
              c.prependTo(h),
              h.addClass("panel-wrapper-bottom-with-sticked-btn"));
          },
          y = function () {
            return e.stickedBtnPosition !== "none" && c.length > 0;
          },
          b = function () {
            h.css("zIndex", "").removeClass(n.elementStatus.opened);
          },
          l = function () {
            return e.parent === "none";
          },
          k = function () {
            h.css("zIndex", w).addClass(n.elementStatus.opened);
          };
        (f.open = function () {
          o ||
            ((o = !0),
            y() &&
              (p(),
              l() &&
                (c
                  .find(".lr-arrow")
                  .removeClass("lr-arrow-up")
                  .addClass("lr-arrow-down"),
                t("#backToTop").hide())),
            (w = d + r),
            k(),
            (r += 1),
            n.Utils.Common.startNoScroll(),
            v.addClass(n.elementStatus.visible));
        }),
          (f.close = function () {
            o &&
              ((o = !1),
              y() &&
                (n.$eventContainer.trigger(n.sidePanelEvent.parentClosing + a),
                l() &&
                  (c
                    .find(".lr-arrow")
                    .removeClass("lr-arrow-down")
                    .addClass("lr-arrow-up"),
                  setTimeout(function () {
                    t("#backToTop").show();
                  }, 400))),
              b(),
              (r -= 1),
              r === 0 &&
                (n.Utils.Common.stopNoScroll(),
                v.removeClass(n.elementStatus.visible)),
              l() || nt());
          }),
          (f.destroy = function () {
            f.close(),
              v.off("click", f.close),
              s.length > 0 && s.off("click", f.open),
              h.remove();
          }),
          (f.toggle = function () {
            o ? f.close() : f.open();
          }),
          (f.copyButtonOnParent = function () {
            l() && p();
          });
        v.on("click", f.close);
        if (s.length > 0)
          if (y())
            if (l()) s.on("click", f.toggle);
            else s.on("click", tt);
          else s.on("click", f.open);
        n.$eventContainer.on(n.sidePanelEvent.childrenClosed + a, function () {
          o && (y() && p(), k());
        });
        n.$eventContainer.on(n.sidePanelEvent.childrenOpening + a, function () {
          o && b();
        });
        n.$eventContainer.on(
          n.sidePanelEvent.parentClosing + e.parent,
          f.close
        );
      }),
      (t.fn[i] = function (n) {
        return this.each(function () {
          var r = t(this),
            u,
            e,
            f;
          r.data(i) === undefined &&
            ((u = r.data()),
            typeof n === varType.obj && t.extend(u, n),
            (e = new t[i](this, u)),
            r.data(i, e)),
            typeof n === varType.str &&
              ((f = r.data(i)[n]), typeof f === varType.fn && f.apply(this));
        });
      });
  })(window, jQuery),
  (function (n) {
    "use strict";
    var t = "slider";
    (n.slider = function (t, i) {
      var r = this,
        u = n(t),
        e,
        f;
      (r.init = function () {
        (r.$slides = u.find("> .slide")), r.$slides.slide();
        r.$slides.on("slide.open", function () {
          f(n(this));
        });
      }),
        (r.goTo = function (t, e) {
          var s, o;
          (e = e || {}),
            e.action !== undefined &&
              ((e.history = e.history || {}),
              (s =
                e.history.origin ||
                window.location.origin ||
                window.location.protocol + "//" + window.location.host),
              (s += e.history.pathname || window.location.pathname),
              (s += e.history.search || window.location.search),
              e.history.hash && (s += e.history.hash),
              e.action === "replace"
                ? window.history.replaceState(e.history.datas, t, s)
                : e.action === "push" &&
                  window.history.pushState(e.history.datas, t, s)),
            (o =
              t === undefined && r.$current !== undefined
                ? r.$current.next()
                : n((("" + t).indexOf("#") === -1 ? "#" : "") + t)),
            o.length > 0 && o.attr("id") !== r.currentId
              ? (o.data("slide").open(),
                f(o),
                i.fullpage !== !1 &&
                  n("html, body").animate({ scrollTop: 0 }, 0),
                u.trigger("slider.slide"))
              : o.length === 0 && u.trigger("slider.error"),
            typeof e.cb == "function" && e.cb();
        }),
        (r.isFirst = function () {
          return r.$current.is(":first-child");
        }),
        (r.next = function () {
          r.goTo();
        }),
        (r.prev = function () {
          r.$current !== undefined &&
            r.$current.is(":first-child") === !1 &&
            (r.$current.data("slide").close(),
            (r.$current = e()),
            r.$current.addClass("show"),
            (r.currentId = r.$current.attr("id")),
            u.trigger("slider.slide"));
        }),
        (r.addSlide = function (t, i) {
          i = i || {};
          var r;
          n("#" + t).length > 0
            ? ((r = n("#" + t)), r.addClass("slide"))
            : (r = n("<div>", { id: t, class: "slide", html: i.content })),
            i.after !== undefined ? n("#" + i.after).after(r) : u.append(r),
            r.addClass("slide").slide();
        }),
        (e = function () {
          return u.find(".slide.opened").last();
        }),
        (f = function (n) {
          (r.$current = n),
            (r.currentId = n.attr("id")),
            r.$current.prevAll(".opened").removeClass("show"),
            r.$current.nextAll().removeClass("show opened");
        }),
        r.init();
    }),
      (n.fn[t] = function (i) {
        return this.each(function () {
          var r = n(this),
            u,
            e,
            f;
          r.data(t) === undefined &&
            ((u = r.data()),
            typeof i === varType.obj && n.extend(u, i),
            (e = new n[t](this, u)),
            r.data(t, e)),
            typeof i === varType.str &&
              ((f = r.data(t)[i]), typeof f === varType.fn && f.apply(this));
        });
      });
  })(jQuery),
  (function (n) {
    "use strict";
    var t = "slide";
    (n.slide = function (t, i) {
      var r = this,
        u = n(t);
      (r.init = function () {
        if (
          (i.content !== undefined && u.html(i.content),
          i.trigger !== undefined)
        )
          n(i.trigger).on("click", function () {
            r.open();
          });
      }),
        (r.open = function () {
          u.addClass("show opened"), u.trigger("slide.open");
        }),
        (r.close = function () {
          u.removeClass("show opened"), u.trigger("slide.close");
        }),
        r.init();
    }),
      (n.fn[t] = function (i) {
        return this.each(function () {
          var r = n(this),
            u,
            e,
            f;
          r.data(t) === undefined &&
            ((u = r.data()),
            typeof i === varType.obj && n.extend(u, i),
            (e = new n[t](this, u)),
            r.data(t, e)),
            typeof i === varType.str &&
              ((f = r.data(t)[i]), typeof f === varType.fn && f.apply(this));
        });
      });
  })(jQuery),
  (function (n, t) {
    "use strict";
    var i = "snackbar",
      r = "click";
    t[i] = function (u, f) {
      function d() {
        var n = { top: 0 };
        return (
          h || (n = { right: y, opacity: 1 }),
          e.show().animate(n, {
            complete: function () {
              e.trigger(a);
            },
          })
        );
      }
      function g() {
        var n = { top: -w };
        return (
          h || (n = { right: -b, opacity: 0 }),
          e.animate(n, {
            complete: function () {
              e.hide().trigger(v);
            },
          })
        );
      }
      function nt() {
        return e.find(
          t(".snackbar_loadBar--loading").animate({ width: "100%" }, o.timeout)
        );
      }
      function tt() {
        return e.find(t(".snackbar_loadBar--loading").stop(!0, !0).width(0));
      }
      var s = this,
        l,
        k = ["error"],
        a = i + ".open",
        v = i + ".close",
        y = 16,
        e = t(u),
        h = _LaRedoute.dataGlobal.isMobileDevice,
        c = {
          timeout: 5e3,
          customCSS: null,
          icon: "info",
          type: "info",
          isStatic: !1,
        },
        o,
        p;
      if (
        (f.type === "error" || e.hasClass("snackbar--error")
          ? ((c.timeout = null), (c.icon = "warning"))
          : (f.type === "success" || e.hasClass("snackbar--succes")) &&
            (c.icon = "tick"),
        (l = h ? "big" : "small"),
        (o = t.extend({}, c, f)),
        (s.isOpen = !1),
        o.isStatic || e.appendTo("body"),
        e.hasClass("snackbar") || e.addClass("snackbar"),
        o.isStatic &&
          !e.hasClass("snackbar--static") &&
          e.addClass("snackbar--static"),
        o.isStatic ||
          ((p = t("<div />", {
            class: i + "_closeButton lr-icon lr-icon-cross-" + l,
          }).appendTo(e)),
          t(
            '<div class="snackbar_loadBar"><div class="snackbar_loadBar snackbar_loadBar--loading"></div></div>'
          ).appendTo(e)),
        t('<span class="lr-icon lr-icon-' + o.icon + '"></span>').prependTo(e),
        (s.open = function () {
          if (o.isStatic) e.show();
          else {
            if (s.isOpen) return e;
            t.inArray(o.type, k) === -1 && (tt(), nt()), d();
          }
        }),
        (s.close = function () {
          o.isStatic ? e.hide() : g();
        }),
        !o.isStatic)
      )
        p.on(r, function () {
          s.close();
        });
      e.on(a, function () {
        o.timeout > 0 &&
          (s.closeInterval = n.setInterval(function () {
            s.close();
          }, o.timeout));
      }).on(v, function () {
        s.closeInterval && clearInterval(s.closeInterval);
      });
      var w = e.outerHeight(),
        b = e.outerWidth(),
        it =
          t("#banner-container").outerHeight() +
          t("#header").outerHeight() +
          t("#menuMain").outerHeight() +
          t("#bannerBelowHeader").outerHeight() +
          y;
      o.isStatic ||
        e.css(
          h
            ? { maxWidth: "none", top: -w, paddingRight: "60px" }
            : { top: it, right: -b, opacity: 0 }
        ),
        e.addClass("snackbar--" + o.type),
        n._LaRedoute.getScreenType() > 1 && o.customCSS && e.css(o.customCSS);
    };
  })(window, jQuery),
  (function (n) {
    (n.fn.toggleBlock = function (t) {
      function o(n) {
        return n.replace(".", "");
      }
      var f = ".toggle",
        r = n.extend(
          {
            animationDuration: 400,
            blockTextClass: f + "text",
            blockTitleClass: f + "-title",
            chevronClass: ".chevron",
            chevronClosedClass: ".chevron-down",
            chevronOpenedClass: ".chevron-up",
            openedClass: "opened",
            toggleTargetClass: f + "-target",
            toggleTriggerClass: f + "-trigger",
            toggleTargetClosedHeight: 120,
            triggerEvent: "click",
          },
          t
        ),
        i = this,
        u = n(i),
        e = o(r.openedClass),
        s;
      return (
        (i.hasChevron = function () {
          return u.find(r.chevronClass).length > 0;
        }),
        (i.getInitialTargetHeight = function () {
          return i.toggleTargetInitialHeight;
        }),
        (i.setTargetInitialHeight = function (n) {
          i.toggleTargetInitialHeight = n;
        }),
        (i.switchCloseChevron = function () {
          i.toggleChevronClass(r.chevronOpenedClass, r.chevronClosedClass);
        }),
        (i.switchOpenChevron = function () {
          i.toggleChevronClass(r.chevronClosedClass, r.chevronOpenedClass);
        }),
        (i.toggleChevronClass = function (n, t) {
          if (i.hasChevron()) return u.find(n).removeClass(o(n)).addClass(o(t));
        }),
        (i.hasTarget = function () {
          return i.getTarget().length > 0;
        }),
        (i.getTarget = function () {
          return u.find(r.toggleTargetClass);
        }),
        (i.getTrigger = function () {
          return u.find(r.toggleTriggerClass);
        }),
        (i.isOpen = function () {
          return u.hasClass(r.openedClass);
        }),
        (s = { duration: r.animationDuration }),
        (i.openBlock = function () {
          u.addClass(e),
            i.getTarget().animate({ height: i.getInitialTargetHeight() }, s);
        }),
        (i.closeBlock = function () {
          u.removeClass(e),
            i.getTarget().animate({ height: r.toggleTargetClosedHeight }, s);
        }),
        (i.isTogglable = function () {
          return i.getInitialTargetHeight() > r.toggleTargetClosedHeight;
        }),
        n(function () {
          if (
            (i.setTargetInitialHeight(i.getTarget().height()),
            i.getTarget().css({ height: r.toggleTargetClosedHeight }),
            i.isTogglable())
          )
            n(r.toggleTriggerClass).on(r.triggerEvent, function (n) {
              n.preventDefault(),
                i.hasTarget() &&
                  (i.isOpen()
                    ? (i.closeBlock(), i.switchCloseChevron())
                    : (i.openBlock(), i.switchOpenChevron()));
            });
          else n(i).removeClass(e);
        }),
        this
      );
    }),
      n(function () {
        n(".toggle").toggleBlock();
      });
  })(window.jQuery),
  (function (n) {
    "use strict";
    var t = "tooltip",
      r = t + ".close",
      i = t + ".open";
    (n[t] = function (u, f) {
      var o = this,
        s = n(u),
        h = "is-visible",
        c = { closeOverlay: !1, showClose: !1, style: "default" };
      (o.open = function () {
        o.$wrapper.show(),
          (o.opened = !0),
          o.$overlay && o.$overlay.addClass(h),
          s.trigger(i);
      }),
        (o.close = function () {
          o.$wrapper.hide(),
            (o.opened = !1),
            s.trigger(r),
            o.$overlay && o.$overlay.removeClass(h);
        }),
        (function () {
          var r, u;
          if (
            ((o.settings = n.extend(c, f)),
            (o.opened = !1),
            (o.$parent = s.parent()),
            f.trigger !== undefined && (o.$trigger = n(f.trigger)),
            (o.$overlay = !1),
            f.closeOverlay &&
              (o.$overlay = n("<div>", { class: t + "-overlay" }).appendTo(
                o.$parent
              )),
            (o.$wrapper = n("<div>", { class: t + "-wrapper" })
              .insertAfter(s)
              .append(s)),
            (r = o.settings.style.split(" ")),
            r.forEach(function (n) {
              o.$wrapper.addClass(t + "-" + n);
            }),
            o.settings.showClose &&
              (o.$btnClose = n("<span>", {
                class: t + "-btn-close close",
              }).appendTo(s)),
            s.show(),
            n.inArray(o.settings.position, ["bottom", "top", "top left"]) !==
              -1 &&
              ((u = o.settings.position.split(" ")),
              o.$wrapper.addClass(function () {
                var i = [];
                return (
                  n.each(u, function (n, r) {
                    i.push(t + "-" + r);
                  }),
                  i.join(" ")
                );
              })),
            f.widthRestriction &&
              (o.$wrapper.css("max-width", "100%"), s.css("max-width", "100%")),
            f.trigger !== undefined && o.$trigger.length > 0)
          )
            if (Utils.Common.isTouchDevice() || f.triggerEvent == "click")
              o.$trigger.on("click", function (n) {
                n.stopPropagation(),
                  n.preventDefault(),
                  o.opened ? o.close() : o.open();
              });
            else
              o.$trigger.on("mouseenter", function () {
                o.open();
              });
          if (f.temp)
            s.on(i, function () {
              setTimeout(function () {
                o.close();
              }, f.tempDuration || 2e3);
            });
          else
            o.$parent.on("mouseleave", function () {
              o.close();
            });
          if (o.settings.showClose)
            o.$btnClose.on("click", function () {
              o.close();
            });
          if (f.closeOverlay)
            o.$overlay.on("click", function () {
              o.opened && o.close();
            });
        })();
    }),
      (n.fn[t] = function (i) {
        return this.each(function () {
          var r, f, u;
          n(this).data(t) === undefined &&
            ((r = n(this).data()),
            typeof i === varType.obj && n.extend(r, i),
            (f = new n[t](this, r)),
            n(this).data(t, f)),
            typeof i === varType.str &&
              ((u = n(this).data(t)[i]),
              typeof u === varType.fn && u.apply(this));
        });
      });
  })(jQuery),
  (function (n, t) {
    "use strict";
    var i = ["carousel", "popin", "readmore", "showpassword", "snackbar"];
    i.forEach(function (n) {
      t.fn[n] = function (i) {
        return this.each(function () {
          var u = t(this),
            f,
            e,
            r;
          u.data(n) === undefined &&
            ((f = u.data()),
            typeof i === varType.obj && t.extend(f, i),
            (e = new t[n](this, f)),
            u.data(n, e)),
            typeof i === varType.str
              ? ((r = u.data(n)[i]), typeof r === varType.fn && r.apply(this))
              : typeof i === varType.obj &&
                typeof i.method === varType.str &&
                ((r = u.data(n)[i.method]),
                typeof r === varType.fn && r.apply(this));
        });
      };
    });
  })(window, jQuery),
  (function (n, t) {
    typeof define == "function" && define.amd
      ? define([], function () {
          return (n.Swipe = t());
        })
      : typeof module == "object" && module.exports
      ? (module.exports = t())
      : (n.Swipe = t());
  })(this, function () {
    function i(i, r) {
      "use strict";
      function st() {
        y.addEventListener
          ? (f.removeEventListener("touchstart", c, !1),
            f.removeEventListener("mousedown", c, !1),
            f.removeEventListener("webkitTransitionEnd", c, !1),
            f.removeEventListener("msTransitionEnd", c, !1),
            f.removeEventListener("oTransitionEnd", c, !1),
            f.removeEventListener("otransitionend", c, !1),
            f.removeEventListener("transitionend", c, !1),
            n.removeEventListener("resize", c, !1))
          : (n.onresize = null);
      }
      function bt() {
        y.addEventListener
          ? (y.touch && f.addEventListener("touchstart", c, !1),
            r.draggable && f.addEventListener("mousedown", c, !1),
            y.transitions &&
              (f.addEventListener("webkitTransitionEnd", c, !1),
              f.addEventListener("msTransitionEnd", c, !1),
              f.addEventListener("oTransitionEnd", c, !1),
              f.addEventListener("otransitionend", c, !1),
              f.addEventListener("transitionend", c, !1)),
            n.addEventListener("resize", c, !1))
          : (n.onresize = rt);
      }
      function ht(n) {
        var t = n.cloneNode(!0);
        f.appendChild(t),
          t.setAttribute("data-cloned", !0),
          t.removeAttribute("id");
      }
      function et(n) {
        var v, c, t, l;
        if (n != null) for (v in n) r[v] = n[v];
        for (o = f.children, g = o.length, c = 0; c < o.length; c++)
          o[c].getAttribute("data-cloned") && g--;
        for (
          o.length < 2 && (r.continuous = !1),
            y.transitions &&
              r.continuous &&
              o.length < 3 &&
              (ht(o[0]), ht(o[1]), (o = f.children)),
            a = new Array(o.length),
            e = i.getBoundingClientRect().width || i.offsetWidth,
            f.style.width = o.length * e * 2 + "px",
            t = o.length;
          t--;

        )
          (l = o[t]),
            (l.style.width = e + "px"),
            l.setAttribute("data-index", t),
            y.transitions &&
              ((l.style.left = t * -e + "px"),
              h(t, u > t ? -e : u < t ? e : 0, 0));
        r.continuous &&
          y.transitions &&
          (h(s(u - 1), -e, 0), h(s(u + 1), e, 0)),
          y.transitions || (f.style.left = u * -e + "px"),
          (i.style.visibility = "visible"),
          st(),
          bt();
      }
      function kt() {
        d || (r.continuous ? tt(u - 1) : u && tt(u - 1));
      }
      function ct() {
        d || (r.continuous ? tt(u + 1) : u < o.length - 1 && tt(u + 1));
      }
      function lt(n, t, i) {
        r.callback && r.callback(n, t, i);
      }
      function at(n, t) {
        r.transitionEnd && r.transitionEnd(n, t);
      }
      function s(n) {
        return (o.length + (n % o.length)) % o.length;
      }
      function nt() {
        var n = u;
        return n >= g && (n = n - g), n;
      }
      function tt(n, t) {
        var i, c, f;
        if (((n = typeof n != "number" ? parseInt(n, 10) : n), u !== n)) {
          if (y.transitions) {
            for (
              i = Math.abs(u - n) / (u - n),
                r.continuous &&
                  ((c = i),
                  (i = -a[s(n)] / e),
                  i !== c && (n = -i * o.length + n)),
                f = Math.abs(u - n) - 1;
              f--;

            )
              h(s((n > u ? n : u) - f - 1), e * i, 0);
            (n = s(n)),
              h(u, e * i, t || v),
              h(n, 0, t || v),
              r.continuous && h(s(n - i), -(e * i), 0);
          } else (n = s(n)), dt(u * -e, n * -e, t || v);
          (u = n),
            pt(function () {
              lt(nt(), o[u], i);
            });
        }
      }
      function h(n, t, i) {
        p(n, t, i), (a[n] = t);
      }
      function p(n, t, i) {
        var u = o[n],
          r = u && u.style;
        r &&
          ((r.webkitTransitionDuration = r.MozTransitionDuration = r.msTransitionDuration = r.OTransitionDuration = r.transitionDuration =
            i + "ms"),
          (r.webkitTransform = "translate(" + t + "px,0)translateZ(0)"),
          (r.msTransform = r.MozTransform = r.OTransform =
            "translateX(" + t + "px)"));
      }
      function dt(n, t, i) {
        if (!i) {
          f.style.left = t + "px";
          return;
        }
        var e = +new Date(),
          s = setInterval(function () {
            var h = +new Date() - e;
            if (h > i) {
              (f.style.left = t + "px"),
                (k || r.autoRestart) && ut(),
                at(nt(), o[u]),
                clearInterval(s);
              return;
            }
            f.style.left =
              (t - n) * (Math.floor((h / i) * 100) / 100) + n + "px";
          }, 4);
      }
      function vt() {
        (k = r.auto || 0), k && (ot = setTimeout(ct, k));
      }
      function w() {
        (k = 0), clearTimeout(ot);
      }
      function ut() {
        w(), vt();
      }
      function gt() {
        w(), (d = !0);
      }
      function ni() {
        (d = !1), ut();
      }
      function ft(n) {
        return /^mouse/.test(n.type);
      }
      function ti() {
        var t, n, r;
        for (
          w(),
            i.style.visibility = "",
            f.style.width = "",
            f.style.left = "",
            t = o.length;
          t--;

        )
          y.transitions && p(t, 0, 0),
            (n = o[t]),
            n.getAttribute("data-cloned") &&
              ((r = n.parentElement), r.removeChild(n)),
            (n.style.width = ""),
            (n.style.left = ""),
            (n.style.webkitTransitionDuration = n.style.MozTransitionDuration = n.style.msTransitionDuration = n.style.OTransitionDuration = n.style.transitionDuration =
              ""),
            (n.style.webkitTransform = n.style.msTransform = n.style.MozTransform = n.style.OTransform =
              "");
        st(), rt.cancel();
      }
      var rt, c;
      r = r || {};
      var it = {},
        l = {},
        b,
        k = r.auto || 0,
        ot,
        d = !1,
        yt = function () {},
        pt = function (n) {
          setTimeout(n || yt, 0);
        },
        wt = function (n, t) {
          function r() {
            i && clearTimeout(i);
          }
          function u() {
            var u = this,
              f = arguments;
            r(),
              (i = setTimeout(function () {
                (i = null), n.apply(u, f);
              }, t));
          }
          t = t || 100;
          var i = null;
          return (u.cancel = r), u;
        },
        y = {
          addEventListener: !!n.addEventListener,
          touch:
            "ontouchstart" in n ||
            (n.DocumentTouch && t instanceof DocumentTouch),
          transitions: (function (n) {
            var t = [
                "transitionProperty",
                "WebkitTransition",
                "MozTransition",
                "OTransition",
                "msTransition",
              ],
              i;
            for (i in t) if (n.style[t[i]] !== undefined) return !0;
            return !1;
          })(t.createElement("swipe")),
        };
      if (i) {
        var f = i.children[0],
          o,
          a,
          e,
          g,
          u = parseInt(r.startSlide, 10) || 0,
          v = r.speed || 300;
        return (
          (r.continuous = r.continuous !== undefined ? r.continuous : !0),
          (r.autoRestart = r.autoRestart !== undefined ? r.autoRestart : !1),
          (rt = wt(et)),
          (c = {
            handleEvent: function (n) {
              if (!d) {
                switch (n.type) {
                  case "mousedown":
                  case "touchstart":
                    this.start(n);
                    break;
                  case "mousemove":
                  case "touchmove":
                    this.move(n);
                    break;
                  case "mouseup":
                  case "mouseleave":
                  case "touchend":
                    this.end(n);
                    break;
                  case "webkitTransitionEnd":
                  case "msTransitionEnd":
                  case "oTransitionEnd":
                  case "otransitionend":
                  case "transitionend":
                    this.transitionEnd(n);
                    break;
                  case "resize":
                    rt();
                }
                r.stopPropagation && n.stopPropagation();
              }
            },
            start: function (n) {
              var t;
              ft(n) ? ((t = n), n.preventDefault()) : (t = n.touches[0]),
                (it = { x: t.pageX, y: t.pageY, time: +new Date() }),
                (b = undefined),
                (l = {}),
                ft(n)
                  ? (f.addEventListener("mousemove", this, !1),
                    f.addEventListener("mouseup", this, !1),
                    f.addEventListener("mouseleave", this, !1))
                  : (f.addEventListener("touchmove", this, !1),
                    f.addEventListener("touchend", this, !1));
            },
            move: function (n) {
              var t;
              if (ft(n)) t = n;
              else {
                if (n.touches.length > 1 || (n.scale && n.scale !== 1)) return;
                r.disableScroll && n.preventDefault(), (t = n.touches[0]);
              }
              (l = { x: t.pageX - it.x, y: t.pageY - it.y }),
                typeof b == "undefined" &&
                  (b = !!(b || Math.abs(l.x) < Math.abs(l.y))),
                b ||
                  (n.preventDefault(),
                  w(),
                  r.continuous
                    ? (p(s(u - 1), l.x + a[s(u - 1)], 0),
                      p(u, l.x + a[u], 0),
                      p(s(u + 1), l.x + a[s(u + 1)], 0))
                    : ((l.x =
                        l.x /
                        ((!u && l.x > 0) || (u === o.length - 1 && l.x < 0)
                          ? Math.abs(l.x) / e + 1
                          : 1)),
                      p(u - 1, l.x + a[u - 1], 0),
                      p(u, l.x + a[u], 0),
                      p(u + 1, l.x + a[u + 1], 0)));
            },
            end: function (n) {
              var y = +new Date() - it.time,
                p =
                  (Number(y) < 250 && Math.abs(l.x) > 20) ||
                  Math.abs(l.x) > e / 2,
                i = (!u && l.x > 0) || (u === o.length - 1 && l.x < 0),
                t;
              r.continuous && (i = !1),
                (t = Math.abs(l.x) / l.x),
                b ||
                  (p && !i
                    ? (t < 0
                        ? (r.continuous
                            ? (h(s(u - 1), -e, 0), h(s(u + 2), e, 0))
                            : h(u - 1, -e, 0),
                          h(u, a[u] - e, v),
                          h(s(u + 1), a[s(u + 1)] - e, v),
                          (u = s(u + 1)))
                        : (r.continuous
                            ? (h(s(u + 1), e, 0), h(s(u - 2), -e, 0))
                            : h(u + 1, e, 0),
                          h(u, a[u] + e, v),
                          h(s(u - 1), a[s(u - 1)] + e, v),
                          (u = s(u - 1))),
                      lt(nt(), o[u], t))
                    : r.continuous
                    ? (h(s(u - 1), -e, v), h(u, 0, v), h(s(u + 1), e, v))
                    : (h(u - 1, -e, v), h(u, 0, v), h(u + 1, e, v))),
                ft(n)
                  ? (f.removeEventListener("mousemove", c, !1),
                    f.removeEventListener("mouseup", c, !1),
                    f.removeEventListener("mouseleave", c, !1))
                  : (f.removeEventListener("touchmove", c, !1),
                    f.removeEventListener("touchend", c, !1));
            },
            transitionEnd: function (n) {
              var t = parseInt(n.target.getAttribute("data-index"), 10);
              t === u && ((k || r.autoRestart) && ut(), at(nt(), o[u]));
            },
          }),
          et(),
          vt(),
          {
            setup: et,
            slide: function (n, t) {
              w(), tt(n, t);
            },
            prev: function () {
              w(), kt();
            },
            next: function () {
              w(), ct();
            },
            restart: ut,
            stop: w,
            getPos: nt,
            disable: gt,
            enable: ni,
            getNumSlides: function () {
              return g;
            },
            kill: ti,
          }
        );
      }
    }
    var n =
        (typeof self == "object" && self.self === self && self) ||
        (typeof global == "object" && global.global === global && global) ||
        this,
      t = n.document;
    return (
      (n.jQuery || n.Zepto) &&
        (function (n) {
          n.fn.Swipe = function (t) {
            return this.each(function () {
              n(this).data("Swipe", new i(n(this)[0], t));
            });
          };
        })(n.jQuery || n.Zepto),
      i
    );
  }),
  (function (n) {
    typeof define == "function" && define.amd
      ? define(["jquery"], n)
      : typeof module != "undefined" && module.exports
      ? (module.exports = n)
      : n(jQuery, window, document);
  })(function (n) {
    (function (t) {
      var i = typeof define == "function" && define.amd,
        r = typeof module != "undefined" && module.exports,
        u = "https:" == document.location.protocol ? "https:" : "http:",
        f =
          "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
      i ||
        (r
          ? require("jquery-mousewheel")(n)
          : n.event.special.mousewheel ||
            n("head").append(
              decodeURI("%3Cscript src=" + u + "//" + f + "%3E%3C/script%3E")
            )),
        t();
    })(function () {
      var h = "mCustomScrollbar",
        t = "mCS",
        it = ".mCustomScrollbar",
        ot = {
          setTop: 0,
          setLeft: 0,
          axis: "y",
          scrollbarPosition: "inside",
          scrollInertia: 950,
          autoDraggerLength: !0,
          alwaysShowScrollbar: 0,
          snapOffset: 0,
          mouseWheel: {
            enable: !0,
            scrollAmount: "auto",
            axis: "y",
            deltaFactor: "auto",
            disableOver: ["select", "option", "keygen", "datalist", "textarea"],
          },
          scrollButtons: { scrollType: "stepless", scrollAmount: "auto" },
          keyboard: {
            enable: !0,
            scrollType: "stepless",
            scrollAmount: "auto",
          },
          contentTouchScroll: 25,
          documentTouchScroll: !0,
          advanced: {
            autoScrollOnFocus:
              "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
            updateOnContentResize: !0,
            updateOnImageLoad: "auto",
            autoUpdateTimeout: 60,
          },
          theme: "light",
          callbacks: {
            onTotalScrollOffset: 0,
            onTotalScrollBackOffset: 0,
            alwaysTriggerOffsets: !0,
          },
        },
        pt = 0,
        b = {},
        p = window.attachEvent && !window.addEventListener ? 1 : 0,
        e = !1,
        c,
        i = [
          "mCSB_dragger_onDrag",
          "mCSB_scrollTools_onDrag",
          "mCS_img_loaded",
          "mCS_disabled",
          "mCS_destroyed",
          "mCS_no_scrollbar",
          "mCS-autoHide",
          "mCS-dir-rtl",
          "mCS_no_scrollbar_y",
          "mCS_no_scrollbar_x",
          "mCS_y_hidden",
          "mCS_x_hidden",
          "mCSB_draggerContainer",
          "mCSB_buttonUp",
          "mCSB_buttonDown",
          "mCSB_buttonLeft",
          "mCSB_buttonRight",
        ],
        s = {
          init: function (r) {
            var r = n.extend(!0, {}, ot, r),
              e = v.call(this),
              u,
              f;
            if (r.live) {
              if (
                ((u = r.liveSelector || this.selector || it),
                (f = n(u)),
                r.live === "off")
              ) {
                k(u);
                return;
              }
              b[u] = setTimeout(function () {
                f.mCustomScrollbar(r), r.live === "once" && f.length && k(u);
              }, 500);
            } else k(u);
            return (
              (r.setWidth = r.set_width ? r.set_width : r.setWidth),
              (r.setHeight = r.set_height ? r.set_height : r.setHeight),
              (r.axis = r.horizontalScroll ? "x" : wt(r.axis)),
              (r.scrollInertia =
                r.scrollInertia > 0 && r.scrollInertia < 17
                  ? 17
                  : r.scrollInertia),
              typeof r.mouseWheel != "object" &&
                r.mouseWheel == !0 &&
                (r.mouseWheel = {
                  enable: !0,
                  scrollAmount: "auto",
                  axis: "y",
                  preventDefault: !1,
                  deltaFactor: "auto",
                  normalizeDelta: !1,
                  invert: !1,
                }),
              (r.mouseWheel.scrollAmount = r.mouseWheelPixels
                ? r.mouseWheelPixels
                : r.mouseWheel.scrollAmount),
              (r.mouseWheel.normalizeDelta = r.advanced.normalizeMouseWheelDelta
                ? r.advanced.normalizeMouseWheelDelta
                : r.mouseWheel.normalizeDelta),
              (r.scrollButtons.scrollType = bt(r.scrollButtons.scrollType)),
              st(r),
              n(e).each(function () {
                var u = n(this);
                if (!u.data(t)) {
                  u.data(t, {
                    idx: ++pt,
                    opt: r,
                    scrollRatio: { y: null, x: null },
                    overflowed: null,
                    contentReset: { y: null, x: null },
                    bindEvents: !1,
                    tweenRunning: !1,
                    sequential: {},
                    langDir: u.css("direction"),
                    cbOffsets: null,
                    trigger: null,
                    poll: {
                      size: { o: 0, n: 0 },
                      img: { o: 0, n: 0 },
                      change: { o: 0, n: 0 },
                    },
                  });
                  var e = u.data(t),
                    f = e.opt,
                    o = u.data("mcs-axis"),
                    h = u.data("mcs-scrollbar-position"),
                    c = u.data("mcs-theme");
                  o && (f.axis = o),
                    h && (f.scrollbarPosition = h),
                    c && ((f.theme = c), st(f)),
                    kt.call(this),
                    e &&
                      f.callbacks.onCreate &&
                      typeof f.callbacks.onCreate == "function" &&
                      f.callbacks.onCreate.call(this),
                    n(
                      "#mCSB_" + e.idx + "_container img:not(." + i[2] + ")"
                    ).addClass(i[2]),
                    s.update.call(null, u);
                }
              })
            );
          },
          update: function (r, f) {
            var e = r || v.call(this);
            return n(e).each(function () {
              var s = n(this),
                c;
              if (s.data(t)) {
                var e = s.data(t),
                  r = e.opt,
                  h = n("#mCSB_" + e.idx + "_container"),
                  a = n("#mCSB_" + e.idx),
                  l = [
                    n("#mCSB_" + e.idx + "_dragger_vertical"),
                    n("#mCSB_" + e.idx + "_dragger_horizontal"),
                  ];
                if (!h.length) return;
                e.tweenRunning && o(s),
                  f &&
                    e &&
                    r.callbacks.onBeforeUpdate &&
                    typeof r.callbacks.onBeforeUpdate == "function" &&
                    r.callbacks.onBeforeUpdate.call(this),
                  s.hasClass(i[3]) && s.removeClass(i[3]),
                  s.hasClass(i[4]) && s.removeClass(i[4]),
                  a.css("max-height", "none"),
                  a.height() !== s.height() && a.css("max-height", s.height()),
                  dt.call(this),
                  r.axis === "y" ||
                    r.advanced.autoExpandHorizontalScroll ||
                    h.css("width", ht(h)),
                  (e.overflowed = ii.call(this)),
                  ct.call(this),
                  r.autoDraggerLength && ni.call(this),
                  ti.call(this),
                  ri.call(this),
                  (c = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)]),
                  r.axis !== "x" &&
                    (e.overflowed[0]
                      ? l[0].height() > l[0].parent().height()
                        ? y.call(this)
                        : (u(s, c[0].toString(), {
                            dir: "y",
                            dur: 0,
                            overwrite: "none",
                          }),
                          (e.contentReset.y = null))
                      : (y.call(this),
                        r.axis === "y"
                          ? g.call(this)
                          : r.axis === "yx" &&
                            e.overflowed[1] &&
                            u(s, c[1].toString(), {
                              dir: "x",
                              dur: 0,
                              overwrite: "none",
                            }))),
                  r.axis !== "y" &&
                    (e.overflowed[1]
                      ? l[1].width() > l[1].parent().width()
                        ? y.call(this)
                        : (u(s, c[1].toString(), {
                            dir: "x",
                            dur: 0,
                            overwrite: "none",
                          }),
                          (e.contentReset.x = null))
                      : (y.call(this),
                        r.axis === "x"
                          ? g.call(this)
                          : r.axis === "yx" &&
                            e.overflowed[0] &&
                            u(s, c[0].toString(), {
                              dir: "y",
                              dur: 0,
                              overwrite: "none",
                            }))),
                  f &&
                    e &&
                    (f === 2 &&
                    r.callbacks.onImageLoad &&
                    typeof r.callbacks.onImageLoad == "function"
                      ? r.callbacks.onImageLoad.call(this)
                      : f === 3 &&
                        r.callbacks.onSelectorChange &&
                        typeof r.callbacks.onSelectorChange == "function"
                      ? r.callbacks.onSelectorChange.call(this)
                      : r.callbacks.onUpdate &&
                        typeof r.callbacks.onUpdate == "function" &&
                        r.callbacks.onUpdate.call(this)),
                  et.call(this);
              }
            });
          },
          scrollTo: function (i, r) {
            if (typeof i != "undefined" && i != null) {
              var f = v.call(this);
              return n(f).each(function () {
                var s = n(this);
                if (s.data(t)) {
                  var o = s.data(t),
                    h = o.opt,
                    c = {
                      trigger: "external",
                      scrollInertia: h.scrollInertia,
                      scrollEasing: "mcsEaseInOut",
                      moveDragger: !1,
                      timeout: 60,
                      callbacks: !0,
                      onStart: !0,
                      onUpdate: !0,
                      onComplete: !0,
                    },
                    f = n.extend(!0, {}, c, r),
                    e = ft.call(this, i),
                    l =
                      f.scrollInertia > 0 && f.scrollInertia < 17
                        ? 17
                        : f.scrollInertia;
                  (e[0] = at.call(this, e[0], "y")),
                    (e[1] = at.call(this, e[1], "x")),
                    f.moveDragger &&
                      ((e[0] *= o.scrollRatio.y), (e[1] *= o.scrollRatio.x)),
                    (f.dur = wi() ? 0 : l),
                    setTimeout(function () {
                      e[0] !== null &&
                        typeof e[0] != "undefined" &&
                        h.axis !== "x" &&
                        o.overflowed[0] &&
                        ((f.dir = "y"),
                        (f.overwrite = "all"),
                        u(s, e[0].toString(), f)),
                        e[1] !== null &&
                          typeof e[1] != "undefined" &&
                          h.axis !== "y" &&
                          o.overflowed[1] &&
                          ((f.dir = "x"),
                          (f.overwrite = "none"),
                          u(s, e[1].toString(), f));
                    }, f.timeout);
                }
              });
            }
          },
          stop: function () {
            var i = v.call(this);
            return n(i).each(function () {
              var i = n(this);
              i.data(t) && o(i);
            });
          },
          disable: function (r) {
            var u = v.call(this);
            return n(u).each(function () {
              var u = n(this),
                f;
              u.data(t) &&
                ((f = u.data(t)),
                et.call(this, "remove"),
                g.call(this),
                r && y.call(this),
                ct.call(this, !0),
                u.addClass(i[3]));
            });
          },
          destroy: function () {
            var r = v.call(this);
            return n(r).each(function () {
              var f = n(this);
              if (f.data(t)) {
                var u = f.data(t),
                  e = u.opt,
                  s = n("#mCSB_" + u.idx),
                  o = n("#mCSB_" + u.idx + "_container"),
                  c = n(".mCSB_" + u.idx + "_scrollbar");
                e.live && k(e.liveSelector || n(r).selector),
                  et.call(this, "remove"),
                  g.call(this),
                  y.call(this),
                  f.removeData(t),
                  a(this, "mcs"),
                  c.remove(),
                  o.find("img." + i[2]).removeClass(i[2]),
                  s.replaceWith(o.contents()),
                  f
                    .removeClass(
                      h +
                        " _" +
                        t +
                        "_" +
                        u.idx +
                        " " +
                        i[6] +
                        " " +
                        i[7] +
                        " " +
                        i[5] +
                        " " +
                        i[3]
                    )
                    .addClass(i[4]);
              }
            });
          },
        },
        v = function () {
          return typeof n(this) != "object" || n(this).length < 1 ? it : this;
        },
        st = function (t) {
          var i = [
              "rounded",
              "rounded-dark",
              "rounded-dots",
              "rounded-dots-dark",
            ],
            r = [
              "rounded-dots",
              "rounded-dots-dark",
              "3d",
              "3d-dark",
              "3d-thick",
              "3d-thick-dark",
              "inset",
              "inset-dark",
              "inset-2",
              "inset-2-dark",
              "inset-3",
              "inset-3-dark",
            ],
            u = ["minimal", "minimal-dark"],
            f = ["minimal", "minimal-dark"],
            e = ["minimal", "minimal-dark"];
          (t.autoDraggerLength =
            n.inArray(t.theme, i) > -1 ? !1 : t.autoDraggerLength),
            (t.autoExpandScrollbar =
              n.inArray(t.theme, r) > -1 ? !1 : t.autoExpandScrollbar),
            (t.scrollButtons.enable =
              n.inArray(t.theme, u) > -1 ? !1 : t.scrollButtons.enable),
            (t.autoHideScrollbar =
              n.inArray(t.theme, f) > -1 ? !0 : t.autoHideScrollbar),
            (t.scrollbarPosition =
              n.inArray(t.theme, e) > -1 ? "outside" : t.scrollbarPosition);
        },
        k = function (n) {
          b[n] && (clearTimeout(b[n]), a(b, n));
        },
        wt = function (n) {
          return n === "yx" || n === "xy" || n === "auto"
            ? "yx"
            : n === "x" || n === "horizontal"
            ? "x"
            : "y";
        },
        bt = function (n) {
          return n === "stepped" ||
            n === "pixels" ||
            n === "step" ||
            n === "click"
            ? "stepped"
            : "stepless";
        },
        kt = function () {
          var f = n(this),
            u = f.data(t),
            r = u.opt,
            l = r.autoExpandScrollbar ? " " + i[1] + "_expand" : "",
            o = [
              "<div id='mCSB_" +
                u.idx +
                "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" +
                u.idx +
                "_scrollbar mCS-" +
                r.theme +
                " mCSB_scrollTools_vertical" +
                l +
                "'><div class='" +
                i[12] +
                "'><div id='mCSB_" +
                u.idx +
                "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
              "<div id='mCSB_" +
                u.idx +
                "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" +
                u.idx +
                "_scrollbar mCS-" +
                r.theme +
                " mCSB_scrollTools_horizontal" +
                l +
                "'><div class='" +
                i[12] +
                "'><div id='mCSB_" +
                u.idx +
                "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>",
            ],
            v =
              r.axis === "yx"
                ? "mCSB_vertical_horizontal"
                : r.axis === "x"
                ? "mCSB_horizontal"
                : "mCSB_vertical",
            a = r.axis === "yx" ? o[0] + o[1] : r.axis === "x" ? o[1] : o[0],
            y =
              r.axis === "yx"
                ? "<div id='mCSB_" +
                  u.idx +
                  "_container_wrapper' class='mCSB_container_wrapper' />"
                : "",
            p = r.autoHideScrollbar ? " " + i[6] : "",
            w = r.axis !== "x" && u.langDir === "rtl" ? " " + i[7] : "",
            c,
            s,
            e;
          r.setWidth && f.css("width", r.setWidth),
            r.setHeight && f.css("height", r.setHeight),
            (r.setLeft =
              r.axis !== "y" && u.langDir === "rtl" ? "989999px" : r.setLeft),
            f
              .addClass(h + " _" + t + "_" + u.idx + p + w)
              .wrapInner(
                "<div id='mCSB_" +
                  u.idx +
                  "' class='mCustomScrollBox mCS-" +
                  r.theme +
                  " " +
                  v +
                  "'><div id='mCSB_" +
                  u.idx +
                  "_container' class='mCSB_container' style='position:relative; top:" +
                  r.setTop +
                  "; left:" +
                  r.setLeft +
                  ";' dir='" +
                  u.langDir +
                  "' /></div>"
              ),
            (c = n("#mCSB_" + u.idx)),
            (s = n("#mCSB_" + u.idx + "_container")),
            r.axis === "y" ||
              r.advanced.autoExpandHorizontalScroll ||
              s.css("width", ht(s)),
            r.scrollbarPosition === "outside"
              ? (f.css("position") === "static" &&
                  f.css("position", "relative"),
                f.css("overflow", "visible"),
                c.addClass("mCSB_outside").after(a))
              : (c.addClass("mCSB_inside").append(a), s.wrap(y)),
            gt.call(this),
            (e = [
              n("#mCSB_" + u.idx + "_dragger_vertical"),
              n("#mCSB_" + u.idx + "_dragger_horizontal"),
            ]),
            e[0].css("min-height", e[0].height()),
            e[1].css("min-width", e[1].width());
        },
        ht = function (t) {
          var i = [
              t[0].scrollWidth,
              Math.max.apply(
                Math,
                t
                  .children()
                  .map(function () {
                    return n(this).outerWidth(!0);
                  })
                  .get()
              ),
            ],
            r = t.parent().width();
          return i[0] > r ? i[0] : i[1] > r ? i[1] : "100%";
        },
        dt = function () {
          var e = n(this),
            f = e.data(t),
            r = f.opt,
            i = n("#mCSB_" + f.idx + "_container"),
            u;
          r.advanced.autoExpandHorizontalScroll &&
            r.axis !== "y" &&
            (i.css({ width: "auto", "min-width": 0, "overflow-x": "scroll" }),
            (u = Math.ceil(i[0].scrollWidth)),
            r.advanced.autoExpandHorizontalScroll === 3 ||
            (r.advanced.autoExpandHorizontalScroll !== 2 &&
              u > i.parent().width())
              ? i.css({
                  width: u,
                  "min-width": "100%",
                  "overflow-x": "inherit",
                })
              : i
                  .css({ "overflow-x": "inherit", position: "absolute" })
                  .wrap(
                    "<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />"
                  )
                  .css({
                    width:
                      Math.ceil(i[0].getBoundingClientRect().right + 0.4) -
                      Math.floor(i[0].getBoundingClientRect().left),
                    "min-width": "100%",
                    position: "relative",
                  })
                  .unwrap());
        },
        gt = function () {
          var s = n(this),
            o = s.data(t),
            u = o.opt,
            h = n(".mCSB_" + o.idx + "_scrollbar:first"),
            f = tt(u.scrollButtons.tabindex)
              ? "tabindex='" + u.scrollButtons.tabindex + "'"
              : "",
            r = [
              "<a href='#' class='" + i[13] + "' " + f + " />",
              "<a href='#' class='" + i[14] + "' " + f + " />",
              "<a href='#' class='" + i[15] + "' " + f + " />",
              "<a href='#' class='" + i[16] + "' " + f + " />",
            ],
            e = [
              u.axis === "x" ? r[2] : r[0],
              u.axis === "x" ? r[3] : r[1],
              r[2],
              r[3],
            ];
          u.scrollButtons.enable &&
            h
              .prepend(e[0])
              .append(e[1])
              .next(".mCSB_scrollTools")
              .prepend(e[2])
              .append(e[3]);
        },
        ni = function () {
          var s = n(this),
            u = s.data(t),
            f = n("#mCSB_" + u.idx),
            e = n("#mCSB_" + u.idx + "_container"),
            r = [
              n("#mCSB_" + u.idx + "_dragger_vertical"),
              n("#mCSB_" + u.idx + "_dragger_horizontal"),
            ],
            o = [f.height() / e.outerHeight(!1), f.width() / e.outerWidth(!1)],
            i = [
              parseInt(r[0].css("min-height")),
              Math.round(o[0] * r[0].parent().height()),
              parseInt(r[1].css("min-width")),
              Math.round(o[1] * r[1].parent().width()),
            ],
            h = p && i[1] < i[0] ? i[0] : i[1],
            c = p && i[3] < i[2] ? i[2] : i[3];
          r[0]
            .css({ height: h, "max-height": r[0].parent().height() - 10 })
            .find(".mCSB_dragger_bar")
            .css({ "line-height": i[0] + "px" }),
            r[1].css({ width: c, "max-width": r[1].parent().width() - 10 });
        },
        ti = function () {
          var s = n(this),
            i = s.data(t),
            u = n("#mCSB_" + i.idx),
            f = n("#mCSB_" + i.idx + "_container"),
            r = [
              n("#mCSB_" + i.idx + "_dragger_vertical"),
              n("#mCSB_" + i.idx + "_dragger_horizontal"),
            ],
            e = [f.outerHeight(!1) - u.height(), f.outerWidth(!1) - u.width()],
            o = [
              e[0] / (r[0].parent().height() - r[0].height()),
              e[1] / (r[1].parent().width() - r[1].width()),
            ];
          i.scrollRatio = { y: o[0], x: o[1] };
        },
        d = function (n, t, r) {
          var f = r ? i[0] + "_expanded" : "",
            u = n.closest(".mCSB_scrollTools");
          t === "active"
            ? (n.toggleClass(i[0] + " " + f),
              u.toggleClass(i[1]),
              (n[0]._draggable = n[0]._draggable ? 0 : 1))
            : n[0]._draggable ||
              (t === "hide"
                ? (n.removeClass(i[0]), u.removeClass(i[1]))
                : (n.addClass(i[0]), u.addClass(i[1])));
        },
        ii = function () {
          var h = n(this),
            r = h.data(t),
            e = n("#mCSB_" + r.idx),
            i = n("#mCSB_" + r.idx + "_container"),
            u = r.overflowed == null ? i.height() : i.outerHeight(!1),
            f = r.overflowed == null ? i.width() : i.outerWidth(!1),
            o = i[0].scrollHeight,
            s = i[0].scrollWidth;
          return (
            o > u && (u = o), s > f && (f = s), [u > e.height(), f > e.width()]
          );
        },
        y = function () {
          var r = n(this),
            i = r.data(t),
            f = i.opt,
            c = n("#mCSB_" + i.idx),
            s = n("#mCSB_" + i.idx + "_container"),
            h = [
              n("#mCSB_" + i.idx + "_dragger_vertical"),
              n("#mCSB_" + i.idx + "_dragger_horizontal"),
            ],
            e;
          o(r),
            ((f.axis !== "x" && !i.overflowed[0]) ||
              (f.axis === "y" && i.overflowed[0])) &&
              (h[0].add(s).css("top", 0), u(r, "_resetY")),
            ((f.axis !== "y" && !i.overflowed[1]) ||
              (f.axis === "x" && i.overflowed[1])) &&
              ((e = dx = 0),
              i.langDir === "rtl" &&
                ((e = c.width() - s.outerWidth(!1)),
                (dx = Math.abs(e / i.scrollRatio.x))),
              s.css("left", e),
              h[1].css("left", dx),
              u(r, "_resetX"));
        },
        ri = function () {
          var u = n(this),
            r = u.data(t),
            i = r.opt,
            e;
          if (!r.bindEvents) {
            if (
              (ui.call(this),
              i.contentTouchScroll && fi.call(this),
              ei.call(this),
              i.mouseWheel.enable)
            ) {
              function f() {
                e = setTimeout(function () {
                  n.event.special.mousewheel
                    ? (clearTimeout(e), oi.call(u[0]))
                    : f();
                }, 100);
              }
              f();
            }
            hi.call(this),
              li.call(this),
              i.advanced.autoScrollOnFocus && ci.call(this),
              i.scrollButtons.enable && ai.call(this),
              i.keyboard.enable && vi.call(this),
              (r.bindEvents = !0);
          }
        },
        g = function () {
          var f = n(this),
            r = f.data(t),
            u = r.opt,
            o = t + "_" + r.idx,
            s = ".mCSB_" + r.idx + "_scrollbar",
            e = n(
              "#mCSB_" +
                r.idx +
                ",#mCSB_" +
                r.idx +
                "_container,#mCSB_" +
                r.idx +
                "_container_wrapper," +
                s +
                " ." +
                i[12] +
                ",#mCSB_" +
                r.idx +
                "_dragger_vertical,#mCSB_" +
                r.idx +
                "_dragger_horizontal," +
                s +
                ">a"
            ),
            h = n("#mCSB_" + r.idx + "_container");
          u.advanced.releaseDraggableSelectors &&
            e.add(n(u.advanced.releaseDraggableSelectors)),
            u.advanced.extraDraggableSelectors &&
              e.add(n(u.advanced.extraDraggableSelectors)),
            r.bindEvents &&
              (n(document)
                .add(n(!l() || top.document))
                .unbind("." + o),
              e.each(function () {
                n(this).unbind("." + o);
              }),
              clearTimeout(f[0]._focusTimeout),
              a(f[0], "_focusTimeout"),
              clearTimeout(r.sequential.step),
              a(r.sequential, "step"),
              clearTimeout(h[0].onCompleteTimeout),
              a(h[0], "onCompleteTimeout"),
              (r.bindEvents = !1));
        },
        ct = function (r) {
          var h = n(this),
            u = h.data(t),
            o = u.opt,
            c = n("#mCSB_" + u.idx + "_container_wrapper"),
            f = c.length ? c : n("#mCSB_" + u.idx + "_container"),
            e = [
              n("#mCSB_" + u.idx + "_scrollbar_vertical"),
              n("#mCSB_" + u.idx + "_scrollbar_horizontal"),
            ],
            s = [e[0].find(".mCSB_dragger"), e[1].find(".mCSB_dragger")];
          o.axis !== "x" &&
            (u.overflowed[0] && !r
              ? (e[0].add(s[0]).add(e[0].children("a")).css("display", "block"),
                f.removeClass(i[8] + " " + i[10]))
              : (o.alwaysShowScrollbar
                  ? (o.alwaysShowScrollbar !== 2 && s[0].css("display", "none"),
                    f.removeClass(i[10]))
                  : (e[0].css("display", "none"), f.addClass(i[10])),
                f.addClass(i[8]))),
            o.axis !== "y" &&
              (u.overflowed[1] && !r
                ? (e[1]
                    .add(s[1])
                    .add(e[1].children("a"))
                    .css("display", "block"),
                  f.removeClass(i[9] + " " + i[11]))
                : (o.alwaysShowScrollbar
                    ? (o.alwaysShowScrollbar !== 2 &&
                        s[1].css("display", "none"),
                      f.removeClass(i[11]))
                    : (e[1].css("display", "none"), f.addClass(i[11])),
                  f.addClass(i[9]))),
            u.overflowed[0] || u.overflowed[1]
              ? h.removeClass(i[5])
              : h.addClass(i[5]);
        },
        r = function (t) {
          var e = t.type,
            i =
              t.target.ownerDocument !== document && frameElement !== null
                ? [n(frameElement).offset().top, n(frameElement).offset().left]
                : null,
            u =
              l() &&
              t.target.ownerDocument !== top.document &&
              frameElement !== null
                ? [
                    n(t.view.frameElement).offset().top,
                    n(t.view.frameElement).offset().left,
                  ]
                : [0, 0],
            r,
            f;
          switch (e) {
            case "pointerdown":
            case "MSPointerDown":
            case "pointermove":
            case "MSPointerMove":
            case "pointerup":
            case "MSPointerUp":
              return i
                ? [
                    t.originalEvent.pageY - i[0] + u[0],
                    t.originalEvent.pageX - i[1] + u[1],
                    !1,
                  ]
                : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
            case "touchstart":
            case "touchmove":
            case "touchend":
              return (
                (r =
                  t.originalEvent.touches[0] ||
                  t.originalEvent.changedTouches[0]),
                (f =
                  t.originalEvent.touches.length ||
                  t.originalEvent.changedTouches.length),
                t.target.ownerDocument !== document
                  ? [r.screenY, r.screenX, f > 1]
                  : [r.pageY, r.pageX, f > 1]
              );
            default:
              return i
                ? [t.pageY - i[0] + u[0], t.pageX - i[1] + u[1], !1]
                : [t.pageY, t.pageX, !1];
          }
        },
        ui = function () {
          function k(n, t, r, f) {
            var e, o;
            (w[0].idleTimer = h.scrollInertia < 233 ? 250 : 0),
              i.attr("id") === y[1]
                ? ((e = "x"), (o = (i[0].offsetLeft - t + f) * s.scrollRatio.x))
                : ((e = "y"), (o = (i[0].offsetTop - n + r) * s.scrollRatio.y)),
              u(v, o.toString(), { dir: e, drag: !0 });
          }
          var v = n(this),
            s = v.data(t),
            h = s.opt,
            f = t + "_" + s.idx,
            y = [
              "mCSB_" + s.idx + "_dragger_vertical",
              "mCSB_" + s.idx + "_dragger_horizontal",
            ],
            w = n("#mCSB_" + s.idx + "_container"),
            b = n("#" + y[0] + ",#" + y[1]),
            i,
            c,
            a,
            g = h.advanced.releaseDraggableSelectors
              ? b.add(n(h.advanced.releaseDraggableSelectors))
              : b,
            nt = h.advanced.extraDraggableSelectors
              ? n(!l() || top.document).add(
                  n(h.advanced.extraDraggableSelectors)
                )
              : n(!l() || top.document);
          b
            .bind("contextmenu." + f, function (n) {
              n.preventDefault();
            })
            .bind(
              "mousedown." +
                f +
                " touchstart." +
                f +
                " pointerdown." +
                f +
                " MSPointerDown." +
                f,
              function (t) {
                if ((t.stopImmediatePropagation(), t.preventDefault(), yt(t))) {
                  (e = !0),
                    p &&
                      (document.onselectstart = function () {
                        return !1;
                      }),
                    lt.call(w, !1),
                    o(v),
                    (i = n(this));
                  var u = i.offset(),
                    f = r(t)[0] - u.top,
                    s = r(t)[1] - u.left,
                    l = i.height() + u.top,
                    y = i.width() + u.left;
                  f < l && f > 0 && s < y && s > 0 && ((c = f), (a = s)),
                    d(i, "active", h.autoExpandScrollbar);
                }
              }
            )
            .bind("touchmove." + f, function (n) {
              n.stopImmediatePropagation(), n.preventDefault();
              var t = i.offset(),
                u = r(n)[0] - t.top,
                f = r(n)[1] - t.left;
              k(c, a, u, f);
            }),
            n(document)
              .add(nt)
              .bind(
                "mousemove." + f + " pointermove." + f + " MSPointerMove." + f,
                function (n) {
                  if (i) {
                    var t = i.offset(),
                      u = r(n)[0] - t.top,
                      f = r(n)[1] - t.left;
                    if (c === u && a === f) return;
                    k(c, a, u, f);
                  }
                }
              )
              .add(g)
              .bind(
                "mouseup." +
                  f +
                  " touchend." +
                  f +
                  " pointerup." +
                  f +
                  " MSPointerUp." +
                  f,
                function () {
                  i && (d(i, "active", h.autoExpandScrollbar), (i = null)),
                    (e = !1),
                    p && (document.onselectstart = null),
                    lt.call(w, !0);
                }
              );
        },
        fi = function () {
          function dt(n) {
            if (!nt(n) || e || r(n)[2]) {
              c = 0;
              return;
            }
            (c = 1),
              (ft = 0),
              (et = 0),
              (st = 1),
              k.removeClass("mCS_touch_action");
            var t = b.offset();
            (d = r(n)[0] - t.top),
              (g = r(n)[1] - t.left),
              (v = [r(n)[0], r(n)[1]]);
          }
          function gt(n) {
            var c, l, a, y;
            if (
              nt(n) &&
              !e &&
              !r(n)[2] &&
              (f.documentTouchScroll || n.preventDefault(),
              n.stopImmediatePropagation(),
              !et || ft) &&
              st
            ) {
              pt = w();
              var o = tt.offset(),
                t = r(n)[0] - o.top,
                u = r(n)[1] - o.left,
                h = "mcsLinearOut";
              rt.push(t),
                ut.push(u),
                (v[2] = Math.abs(r(n)[0] - v[0])),
                (v[3] = Math.abs(r(n)[1] - v[1])),
                i.overflowed[0] &&
                  ((c = it[0].parent().height() - it[0].height()),
                  (l =
                    d - t > 0 &&
                    t - d > -(c * i.scrollRatio.y) &&
                    (v[3] * 2 < v[2] || f.axis === "yx"))),
                i.overflowed[1] &&
                  ((a = it[1].parent().width() - it[1].width()),
                  (y =
                    g - u > 0 &&
                    u - g > -(a * i.scrollRatio.x) &&
                    (v[2] * 2 < v[3] || f.axis === "yx"))),
                l || y
                  ? (kt || n.preventDefault(), (ft = 1))
                  : ((et = 1), k.addClass("mCS_touch_action")),
                kt && n.preventDefault(),
                (s =
                  f.axis === "yx"
                    ? [d - t, g - u]
                    : f.axis === "x"
                    ? [null, g - u]
                    : [d - t, null]),
                (b[0].idleTimer = 250),
                i.overflowed[0] && ot(s[0], wt, h, "y", "all", !0),
                i.overflowed[1] && ot(s[1], wt, h, "x", lt, !0);
            }
          }
          function ni(n) {
            if (!nt(n) || e || r(n)[2]) {
              c = 0;
              return;
            }
            (c = 1), n.stopImmediatePropagation(), o(k), (yt = w());
            var t = tt.offset();
            (at = r(n)[0] - t.top),
              (vt = r(n)[1] - t.left),
              (rt = []),
              (ut = []);
          }
          function ti(n) {
            var t, u, h;
            if (nt(n) && !e && !r(n)[2]) {
              (st = 0),
                n.stopImmediatePropagation(),
                (ft = 0),
                (et = 0),
                (ht = w());
              var c = tt.offset(),
                l = r(n)[0] - c.top,
                v = r(n)[1] - c.left;
              if (!(ht - pt > 30)) {
                a = 1e3 / (ht - yt);
                var p = "mcsEaseOut",
                  o = a < 2.5,
                  k = o ? [rt[rt.length - 2], ut[ut.length - 2]] : [0, 0];
                (y = o ? [l - k[0], v - k[1]] : [l - at, v - vt]),
                  (t = [Math.abs(y[0]), Math.abs(y[1])]),
                  (a = o ? [Math.abs(y[0] / 4), Math.abs(y[1] / 4)] : [a, a]),
                  (u = [
                    Math.abs(b[0].offsetTop) - y[0] * ii(t[0] / a[0], a[0]),
                    Math.abs(b[0].offsetLeft) - y[1] * ii(t[1] / a[1], a[1]),
                  ]),
                  (s =
                    f.axis === "yx"
                      ? [u[0], u[1]]
                      : f.axis === "x"
                      ? [null, u[1]]
                      : [u[0], null]),
                  (ct = [
                    t[0] * 4 + f.scrollInertia,
                    t[1] * 4 + f.scrollInertia,
                  ]),
                  (h = parseInt(f.contentTouchScroll) || 0),
                  (s[0] = t[0] > h ? s[0] : 0),
                  (s[1] = t[1] > h ? s[1] : 0),
                  i.overflowed[0] && ot(s[0], ct[0], p, "y", lt, !1),
                  i.overflowed[1] && ot(s[1], ct[1], p, "x", lt, !1);
              }
            }
          }
          function ii(n, t) {
            var i = [t * 1.5, t * 2, t / 1.5, t / 2];
            return n > 90
              ? t > 4
                ? i[0]
                : i[3]
              : n > 60
              ? t > 3
                ? i[3]
                : i[2]
              : n > 30
              ? t > 8
                ? i[1]
                : t > 6
                ? i[0]
                : t > 4
                ? t
                : i[2]
              : t > 8
              ? t
              : i[3];
          }
          function ot(n, t, i, r, f, e) {
            n &&
              u(k, n.toString(), {
                dur: t,
                scrollEasing: i,
                dir: r,
                overwrite: f,
                drag: e,
              });
          }
          var k = n(this),
            i = k.data(t),
            f = i.opt,
            h = t + "_" + i.idx,
            tt = n("#mCSB_" + i.idx),
            b = n("#mCSB_" + i.idx + "_container"),
            it = [
              n("#mCSB_" + i.idx + "_dragger_vertical"),
              n("#mCSB_" + i.idx + "_dragger_horizontal"),
            ],
            st,
            d,
            g,
            at,
            vt,
            rt = [],
            ut = [],
            yt,
            pt,
            ht,
            y,
            a,
            s,
            wt = 0,
            ct,
            lt = f.axis === "yx" ? "none" : "all",
            v = [],
            ft,
            et,
            bt = b.find("iframe"),
            p = [
              "touchstart." + h + " pointerdown." + h + " MSPointerDown." + h,
              "touchmove." + h + " pointermove." + h + " MSPointerMove." + h,
              "touchend." + h + " pointerup." + h + " MSPointerUp." + h,
            ],
            kt =
              document.body.style.touchAction !== undefined &&
              document.body.style.touchAction !== "";
          b
            .bind(p[0], function (n) {
              dt(n);
            })
            .bind(p[1], function (n) {
              gt(n);
            }),
            tt
              .bind(p[0], function (n) {
                ni(n);
              })
              .bind(p[2], function (n) {
                ti(n);
              }),
            bt.length &&
              bt.each(function () {
                n(this).bind("load", function () {
                  l(this) &&
                    n(this.contentDocument || this.contentWindow.document)
                      .bind(p[0], function (n) {
                        dt(n), ni(n);
                      })
                      .bind(p[1], function (n) {
                        gt(n);
                      })
                      .bind(p[2], function (n) {
                        ti(n);
                      });
                });
              });
        },
        ei = function () {
          function y() {
            return window.getSelection
              ? window.getSelection().toString()
              : document.selection && document.selection.type != "Control"
              ? document.selection.createRange().text
              : 0;
          }
          function f(n, t, i) {
            (l.type = i && u ? "stepped" : "stepless"),
              (l.scrollAmount = 10),
              ut(a, n, t, "mcsLinearOut", i ? 60 : null);
          }
          var a = n(this),
            i = a.data(t),
            v = i.opt,
            l = i.sequential,
            s = t + "_" + i.idx,
            o = n("#mCSB_" + i.idx + "_container"),
            h = o.parent(),
            u;
          o.bind("mousedown." + s, function () {
            c || u || ((u = 1), (e = !0));
          })
            .add(document)
            .bind("mousemove." + s, function (n) {
              if (!c && u && y()) {
                var s = o.offset(),
                  t = r(n)[0] - s.top + o[0].offsetTop,
                  e = r(n)[1] - s.left + o[0].offsetLeft;
                t > 0 && t < h.height() && e > 0 && e < h.width()
                  ? l.step && f("off", null, "stepped")
                  : (v.axis !== "x" &&
                      i.overflowed[0] &&
                      (t < 0 ? f("on", 38) : t > h.height() && f("on", 40)),
                    v.axis !== "y" &&
                      i.overflowed[1] &&
                      (e < 0 ? f("on", 37) : e > h.width() && f("on", 39)));
              }
            })
            .bind("mouseup." + s + " dragend." + s, function () {
              c || (u && ((u = 0), f("off", null)), (e = !1));
            });
        },
        oi = function () {
          function a(t, h) {
            var a, v;
            if ((o(s), !si(s, t.target))) {
              if (
                ((a =
                  i.mouseWheel.deltaFactor !== "auto"
                    ? parseInt(i.mouseWheel.deltaFactor)
                    : p && t.deltaFactor < 100
                    ? 100
                    : t.deltaFactor || 100),
                (v = i.scrollInertia),
                i.axis === "x" || i.mouseWheel.axis === "x")
              )
                var y = "x",
                  l = [
                    Math.round(a * r.scrollRatio.x),
                    parseInt(i.mouseWheel.scrollAmount),
                  ],
                  w =
                    i.mouseWheel.scrollAmount !== "auto"
                      ? l[1]
                      : l[0] >= e.width()
                      ? e.width() * 0.9
                      : l[0],
                  k = Math.abs(
                    n("#mCSB_" + r.idx + "_container")[0].offsetLeft
                  ),
                  b = f[1][0].offsetLeft,
                  d = f[1].parent().width() - f[1].width(),
                  c = i.mouseWheel.axis === "y" ? t.deltaY || h : t.deltaX;
              else
                var y = "y",
                  l = [
                    Math.round(a * r.scrollRatio.y),
                    parseInt(i.mouseWheel.scrollAmount),
                  ],
                  w =
                    i.mouseWheel.scrollAmount !== "auto"
                      ? l[1]
                      : l[0] >= e.height()
                      ? e.height() * 0.9
                      : l[0],
                  k = Math.abs(n("#mCSB_" + r.idx + "_container")[0].offsetTop),
                  b = f[0][0].offsetTop,
                  d = f[0].parent().height() - f[0].height(),
                  c = t.deltaY || h;
              (y !== "y" || r.overflowed[0]) &&
                (y !== "x" || r.overflowed[1]) &&
                ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) &&
                  (c = -c),
                i.mouseWheel.normalizeDelta && (c = c < 0 ? -1 : 1),
                ((c > 0 && b !== 0) ||
                  (c < 0 && b !== d) ||
                  i.mouseWheel.preventDefault) &&
                  (t.stopImmediatePropagation(), t.preventDefault()),
                t.deltaFactor < 5 &&
                  !i.mouseWheel.normalizeDelta &&
                  ((w = t.deltaFactor), (v = 17)),
                u(s, (k - c * w).toString(), { dir: y, dur: v }));
            }
          }
          if (n(this).data(t)) {
            var s = n(this),
              r = s.data(t),
              i = r.opt,
              h = t + "_" + r.idx,
              e = n("#mCSB_" + r.idx),
              f = [
                n("#mCSB_" + r.idx + "_dragger_vertical"),
                n("#mCSB_" + r.idx + "_dragger_horizontal"),
              ],
              c = n("#mCSB_" + r.idx + "_container").find("iframe");
            c.length &&
              c.each(function () {
                n(this).bind("load", function () {
                  l(this) &&
                    n(this.contentDocument || this.contentWindow.document).bind(
                      "mousewheel." + h,
                      function (n, t) {
                        a(n, t);
                      }
                    );
                });
              }),
              e.bind("mousewheel." + h, function (n, t) {
                a(n, t);
              });
          }
        },
        rt = {},
        l = function (t) {
          var r = !1,
            i = !1,
            u = null,
            f;
          if (
            (t === undefined
              ? (i = "#empty")
              : n(t).attr("id") !== undefined && (i = n(t).attr("id")),
            i !== !1 && rt[i] !== undefined)
          )
            return rt[i];
          if (t) {
            try {
              (f = t.contentDocument || t.contentWindow.document),
                (u = f.body.innerHTML);
            } catch (e) {}
            r = u !== null;
          } else {
            try {
              (f = top.document), (u = f.body.innerHTML);
            } catch (e) {}
            r = u !== null;
          }
          return i !== !1 && (rt[i] = r), r;
        },
        lt = function (n) {
          var t = this.find("iframe"),
            i;
          t.length && ((i = n ? "auto" : "none"), t.css("pointer-events", i));
        },
        si = function (i, r) {
          var u = r.nodeName.toLowerCase(),
            f = i.data(t).opt.mouseWheel.disableOver,
            e = ["select", "textarea"];
          return (
            n.inArray(u, f) > -1 &&
            !(n.inArray(u, e) > -1 && !n(r).is(":focus"))
          );
        },
        hi = function () {
          var s = n(this),
            f = s.data(t),
            r = t + "_" + f.idx,
            h = n("#mCSB_" + f.idx + "_container"),
            l = h.parent(),
            a = n(".mCSB_" + f.idx + "_scrollbar ." + i[12]),
            c;
          a.bind(
            "mousedown." +
              r +
              " touchstart." +
              r +
              " pointerdown." +
              r +
              " MSPointerDown." +
              r,
            function (t) {
              (e = !0), n(t.target).hasClass("mCSB_dragger") || (c = 1);
            }
          )
            .bind(
              "touchend." + r + " pointerup." + r + " MSPointerUp." + r,
              function () {
                e = !1;
              }
            )
            .bind("click." + r, function (t) {
              var r, e;
              if (
                c &&
                ((c = 0),
                n(t.target).hasClass(i[12]) ||
                  n(t.target).hasClass("mCSB_draggerRail"))
              ) {
                if (
                  (o(s),
                  (r = n(this)),
                  (e = r.find(".mCSB_dragger")),
                  r.parent(".mCSB_scrollTools_horizontal").length > 0)
                ) {
                  if (!f.overflowed[1]) return;
                  var v = "x",
                    a = t.pageX > e.offset().left ? -1 : 1,
                    y = Math.abs(h[0].offsetLeft) - a * l.width() * 0.9;
                } else {
                  if (!f.overflowed[0]) return;
                  var v = "y",
                    a = t.pageY > e.offset().top ? -1 : 1,
                    y = Math.abs(h[0].offsetTop) - a * l.height() * 0.9;
                }
                u(s, y.toString(), { dir: v, scrollEasing: "mcsEaseInOut" });
              }
            });
        },
        ci = function () {
          var i = n(this),
            s = i.data(t),
            e = s.opt,
            c = t + "_" + s.idx,
            r = n("#mCSB_" + s.idx + "_container"),
            h = r.parent();
          r.bind("focusin." + c, function () {
            var s = n(document.activeElement),
              l = r.find(".mCustomScrollBox").length,
              c = 0;
            s.is(e.advanced.autoScrollOnFocus) &&
              (o(i),
              clearTimeout(i[0]._focusTimeout),
              (i[0]._focusTimer = l ? (c + 17) * l : 0),
              (i[0]._focusTimeout = setTimeout(function () {
                var n = [f(s)[0], f(s)[1]],
                  t = [r[0].offsetTop, r[0].offsetLeft],
                  o = [
                    t[0] + n[0] >= 0 &&
                      t[0] + n[0] < h.height() - s.outerHeight(!1),
                    t[1] + n[1] >= 0 &&
                      t[0] + n[1] < h.width() - s.outerWidth(!1),
                  ],
                  l = e.axis === "yx" && !o[0] && !o[1] ? "none" : "all";
                e.axis === "x" ||
                  o[0] ||
                  u(i, n[0].toString(), {
                    dir: "y",
                    scrollEasing: "mcsEaseInOut",
                    overwrite: l,
                    dur: c,
                  }),
                  e.axis === "y" ||
                    o[1] ||
                    u(i, n[1].toString(), {
                      dir: "x",
                      scrollEasing: "mcsEaseInOut",
                      overwrite: l,
                      dur: c,
                    });
              }, i[0]._focusTimer)));
          });
        },
        li = function () {
          var u = n(this),
            i = u.data(t),
            f = t + "_" + i.idx,
            r = n("#mCSB_" + i.idx + "_container").parent();
          r.bind("scroll." + f, function () {
            (r.scrollTop() !== 0 || r.scrollLeft() !== 0) &&
              n(".mCSB_" + i.idx + "_scrollbar").css("visibility", "hidden");
          });
        },
        ai = function () {
          var f = n(this),
            r = f.data(t),
            o = r.opt,
            u = r.sequential,
            i = t + "_" + r.idx,
            s = ".mCSB_" + r.idx + "_scrollbar",
            h = n(s + ">a");
          h.bind("contextmenu." + i, function (n) {
            n.preventDefault();
          }).bind(
            "mousedown." +
              i +
              " touchstart." +
              i +
              " pointerdown." +
              i +
              " MSPointerDown." +
              i +
              " mouseup." +
              i +
              " touchend." +
              i +
              " pointerup." +
              i +
              " MSPointerUp." +
              i +
              " mouseout." +
              i +
              " pointerout." +
              i +
              " MSPointerOut." +
              i +
              " click." +
              i,
            function (t) {
              function s(n, t) {
                (u.scrollAmount = o.scrollButtons.scrollAmount), ut(f, n, t);
              }
              if ((t.preventDefault(), yt(t))) {
                var i = n(this).attr("class");
                u.type = o.scrollButtons.scrollType;
                switch (t.type) {
                  case "mousedown":
                  case "touchstart":
                  case "pointerdown":
                  case "MSPointerDown":
                    if (u.type === "stepped") return;
                    (e = !0), (r.tweenRunning = !1), s("on", i);
                    break;
                  case "mouseup":
                  case "touchend":
                  case "pointerup":
                  case "MSPointerUp":
                  case "mouseout":
                  case "pointerout":
                  case "MSPointerOut":
                    if (u.type === "stepped") return;
                    (e = !1), u.dir && s("off", i);
                    break;
                  case "click":
                    if (u.type !== "stepped" || r.tweenRunning) return;
                    s("on", i);
                }
              }
            }
          );
        },
        vi = function () {
          function p(t) {
            function w(n, t) {
              ((s.type = r.keyboard.scrollType),
              (s.scrollAmount = r.keyboard.scrollAmount),
              s.type === "stepped" && i.tweenRunning) || ut(e, n, t);
            }
            var c, y, p, l, v;
            switch (t.type) {
              case "blur":
                i.tweenRunning && s.dir && w("off", null);
                break;
              case "keydown":
              case "keyup":
                if (
                  ((c = t.keyCode ? t.keyCode : t.which),
                  (y = "on"),
                  (r.axis !== "x" && (c === 38 || c === 40)) ||
                    (r.axis !== "y" && (c === 37 || c === 39)))
                ) {
                  if (
                    ((c === 38 || c === 40) && !i.overflowed[0]) ||
                    ((c === 37 || c === 39) && !i.overflowed[1])
                  )
                    return;
                  t.type === "keyup" && (y = "off"),
                    n(document.activeElement).is(a) ||
                      (t.preventDefault(),
                      t.stopImmediatePropagation(),
                      w(y, c));
                } else
                  c === 33 || c === 34
                    ? ((i.overflowed[0] || i.overflowed[1]) &&
                        (t.preventDefault(), t.stopImmediatePropagation()),
                      t.type === "keyup" &&
                        (o(e),
                        (p = c === 34 ? -1 : 1),
                        r.axis === "x" ||
                        (r.axis === "yx" && i.overflowed[1] && !i.overflowed[0])
                          ? ((l = "x"),
                            (v =
                              Math.abs(f[0].offsetLeft) - p * h.width() * 0.9))
                          : ((l = "y"),
                            (v =
                              Math.abs(f[0].offsetTop) - p * h.height() * 0.9)),
                        u(e, v.toString(), {
                          dir: l,
                          scrollEasing: "mcsEaseInOut",
                        })))
                    : (c === 35 || c === 36) &&
                      (n(document.activeElement).is(a) ||
                        ((i.overflowed[0] || i.overflowed[1]) &&
                          (t.preventDefault(), t.stopImmediatePropagation()),
                        t.type === "keyup" &&
                          (r.axis === "x" ||
                          (r.axis === "yx" &&
                            i.overflowed[1] &&
                            !i.overflowed[0])
                            ? ((l = "x"),
                              (v =
                                c === 35
                                  ? Math.abs(h.width() - f.outerWidth(!1))
                                  : 0))
                            : ((l = "y"),
                              (v =
                                c === 35
                                  ? Math.abs(h.height() - f.outerHeight(!1))
                                  : 0)),
                          u(e, v.toString(), {
                            dir: l,
                            scrollEasing: "mcsEaseInOut",
                          }))));
            }
          }
          var e = n(this),
            i = e.data(t),
            r = i.opt,
            s = i.sequential,
            c = t + "_" + i.idx,
            w = n("#mCSB_" + i.idx),
            f = n("#mCSB_" + i.idx + "_container"),
            h = f.parent(),
            a =
              "input,textarea,select,datalist,keygen,[contenteditable='true']",
            v = f.find("iframe"),
            y = ["blur." + c + " keydown." + c + " keyup." + c];
          v.length &&
            v.each(function () {
              n(this).bind("load", function () {
                l(this) &&
                  n(this.contentDocument || this.contentWindow.document).bind(
                    y[0],
                    function (n) {
                      p(n);
                    }
                  );
              });
            }),
            w.attr("tabindex", "0").bind(y[0], function (n) {
              p(n);
            });
        },
        ut = function (r, f, e, s, h) {
          function y(n) {
            l.snapAmount &&
              (c.scrollAmount =
                l.snapAmount instanceof Array
                  ? c.dir[0] === "x"
                    ? l.snapAmount[1]
                    : l.snapAmount[0]
                  : l.snapAmount);
            var i = c.type !== "stepped",
              f = h ? h : n ? (i ? b / 1.5 : k) : 1e3 / 60,
              e = n ? (i ? 7.5 : 40) : 2.5,
              t = [Math.abs(p[0].offsetTop), Math.abs(p[0].offsetLeft)],
              o = [
                v.scrollRatio.y > 10 ? 10 : v.scrollRatio.y,
                v.scrollRatio.x > 10 ? 10 : v.scrollRatio.x,
              ],
              w =
                c.dir[0] === "x"
                  ? t[1] + c.dir[1] * o[1] * e
                  : t[0] + c.dir[1] * o[0] * e,
              d =
                c.dir[0] === "x"
                  ? t[1] + c.dir[1] * parseInt(c.scrollAmount)
                  : t[0] + c.dir[1] * parseInt(c.scrollAmount),
              a = c.scrollAmount !== "auto" ? d : w,
              g = s
                ? s
                : n
                ? i
                  ? "mcsLinearOut"
                  : "mcsEaseInOut"
                : "mcsLinear",
              nt = n ? !0 : !1;
            if (
              (n && f < 17 && (a = c.dir[0] === "x" ? t[1] : t[0]),
              u(r, a.toString(), {
                dir: c.dir[0],
                scrollEasing: g,
                dur: f,
                onComplete: nt,
              }),
              n)
            ) {
              c.dir = !1;
              return;
            }
            clearTimeout(c.step),
              (c.step = setTimeout(function () {
                y();
              }, f));
          }
          function d() {
            clearTimeout(c.step), a(c, "step"), o(r);
          }
          var v = r.data(t),
            l = v.opt,
            c = v.sequential,
            p = n("#mCSB_" + v.idx + "_container"),
            w = c.type === "stepped" ? !0 : !1,
            b = l.scrollInertia < 26 ? 26 : l.scrollInertia,
            k = l.scrollInertia < 1 ? 17 : l.scrollInertia;
          switch (f) {
            case "on":
              if (
                ((c.dir = [
                  e === i[16] || e === i[15] || e === 39 || e === 37
                    ? "x"
                    : "y",
                  e === i[13] || e === i[15] || e === 38 || e === 37 ? -1 : 1,
                ]),
                o(r),
                tt(e) && c.type === "stepped")
              )
                return;
              y(w);
              break;
            case "off":
              d(), (w || (v.tweenRunning && c.dir)) && y(!0);
          }
        },
        ft = function (i) {
          var u = n(this).data(t).opt,
            r = [];
          return (
            typeof i == "function" && (i = i()),
            i instanceof Array
              ? (r =
                  i.length > 1
                    ? [i[0], i[1]]
                    : u.axis === "x"
                    ? [null, i[0]]
                    : [i[0], null])
              : ((r[0] = i.y ? i.y : i.x || u.axis === "x" ? null : i),
                (r[1] = i.x ? i.x : i.y || u.axis === "y" ? null : i)),
            typeof r[0] == "function" && (r[0] = r[0]()),
            typeof r[1] == "function" && (r[1] = r[1]()),
            r
          );
        },
        at = function (i, r) {
          var h, e;
          if (i != null && typeof i != "undefined") {
            var c = n(this),
              l = c.data(t),
              v = l.opt,
              u = n("#mCSB_" + l.idx + "_container"),
              o = u.parent(),
              y = typeof i;
            r || (r = v.axis === "x" ? "x" : "y");
            var p =
                r === "x"
                  ? u.outerWidth(!1) - o.width()
                  : u.outerHeight(!1) - o.height(),
              a = r === "x" ? u[0].offsetLeft : u[0].offsetTop,
              w = r === "x" ? "left" : "top";
            switch (y) {
              case "function":
                return i();
              case "object":
                return ((e = i.jquery ? i : n(i)), !e.length)
                  ? void 0
                  : r === "x"
                  ? f(e)[1]
                  : f(e)[0];
              case "string":
              case "number":
                if (tt(i)) return Math.abs(i);
                if (i.indexOf("%") !== -1)
                  return Math.abs((p * parseInt(i)) / 100);
                if (i.indexOf("-=") !== -1)
                  return Math.abs(a - parseInt(i.split("-=")[1]));
                if (i.indexOf("+=") !== -1)
                  return (
                    (h = a + parseInt(i.split("+=")[1])),
                    h >= 0 ? 0 : Math.abs(h)
                  );
                if (i.indexOf("px") !== -1 && tt(i.split("px")[0]))
                  return Math.abs(i.split("px")[0]);
                if (i === "top" || i === "left") return 0;
                if (i === "bottom")
                  return Math.abs(o.height() - u.outerHeight(!1));
                if (i === "right")
                  return Math.abs(o.width() - u.outerWidth(!1));
                if (i === "first" || i === "last")
                  return (e = u.find(":" + i)), r === "x" ? f(e)[1] : f(e)[0];
                if (n(i).length) return r === "x" ? f(n(i))[1] : f(n(i))[0];
                u.css(w, i), s.update.call(null, c[0]);
                return;
            }
          }
        },
        et = function (r) {
          function c() {
            if (
              (clearTimeout(e[0].autoUpdate), o.parents("html").length === 0)
            ) {
              o = null;
              return;
            }
            e[0].autoUpdate = setTimeout(function () {
              if (
                f.advanced.updateOnSelectorChange &&
                ((u.poll.change.n = v()), u.poll.change.n !== u.poll.change.o)
              ) {
                (u.poll.change.o = u.poll.change.n), h(3);
                return;
              }
              if (
                f.advanced.updateOnContentResize &&
                ((u.poll.size.n =
                  o[0].scrollHeight +
                  o[0].scrollWidth +
                  e[0].offsetHeight +
                  o[0].offsetHeight +
                  o[0].offsetWidth),
                u.poll.size.n !== u.poll.size.o)
              ) {
                (u.poll.size.o = u.poll.size.n), h(1);
                return;
              }
              if (
                f.advanced.updateOnImageLoad &&
                !(f.advanced.updateOnImageLoad === "auto" && f.axis === "y") &&
                ((u.poll.img.n = e.find("img").length),
                u.poll.img.n !== u.poll.img.o)
              ) {
                (u.poll.img.o = u.poll.img.n),
                  e.find("img").each(function () {
                    l(this);
                  });
                return;
              }
              (f.advanced.updateOnSelectorChange ||
                f.advanced.updateOnContentResize ||
                f.advanced.updateOnImageLoad) &&
                c();
            }, f.advanced.autoUpdateTimeout);
          }
          function l(t) {
            function u(n, t) {
              return function () {
                return t.apply(n, arguments);
              };
            }
            function f() {
              (this.onload = null), n(t).addClass(i[2]), h(2);
            }
            if (n(t).hasClass(i[2])) {
              h();
              return;
            }
            var r = new Image();
            (r.onload = u(r, f)), (r.src = t.src);
          }
          function v() {
            f.advanced.updateOnSelectorChange === !0 &&
              (f.advanced.updateOnSelectorChange = "*");
            var n = 0,
              t = e.find(f.advanced.updateOnSelectorChange);
            return (
              f.advanced.updateOnSelectorChange &&
                t.length > 0 &&
                t.each(function () {
                  n += this.offsetHeight + this.offsetWidth;
                }),
              n
            );
          }
          function h(n) {
            clearTimeout(e[0].autoUpdate), s.update.call(null, o[0], n);
          }
          var o = n(this),
            u = o.data(t),
            f = u.opt,
            e = n("#mCSB_" + u.idx + "_container");
          if (r) {
            clearTimeout(e[0].autoUpdate), a(e[0], "autoUpdate");
            return;
          }
          c();
        },
        yi = function (n, t, i) {
          return Math.round(n / t) * t - i;
        },
        o = function (i) {
          var r = i.data(t),
            u = n(
              "#mCSB_" +
                r.idx +
                "_container,#mCSB_" +
                r.idx +
                "_container_wrapper,#mCSB_" +
                r.idx +
                "_dragger_vertical,#mCSB_" +
                r.idx +
                "_dragger_horizontal"
            );
          u.each(function () {
            pi.call(this);
          });
        },
        u = function (i, r, u) {
          function h(n) {
            return f && e.callbacks[n] && typeof e.callbacks[n] == "function";
          }
          function ot() {
            return [
              e.callbacks.alwaysTriggerOffsets || w >= l[0] + v,
              e.callbacks.alwaysTriggerOffsets || w <= -y,
            ];
          }
          function a() {
            var n = [o[0].offsetTop, o[0].offsetLeft],
              t = [c[0].offsetTop, c[0].offsetLeft],
              r = [o.outerHeight(!1), o.outerWidth(!1)],
              f = [p.height(), p.width()];
            i[0].mcs = {
              content: o,
              top: n[0],
              left: n[1],
              draggerTop: t[0],
              draggerLeft: t[1],
              topPct: Math.round(
                (100 * Math.abs(n[0])) / (Math.abs(r[0]) - f[0])
              ),
              leftPct: Math.round(
                (100 * Math.abs(n[1])) / (Math.abs(r[1]) - f[1])
              ),
              direction: u.dir,
            };
          }
          var f = i.data(t),
            e = f.opt,
            rt = {
              trigger: "internal",
              dir: "y",
              scrollEasing: "mcsEaseOut",
              drag: !1,
              dur: e.scrollInertia,
              overwrite: "all",
              callbacks: !0,
              onStart: !0,
              onUpdate: !0,
              onComplete: !0,
            },
            u = n.extend(rt, u),
            k = [u.dur, u.drag ? 0 : u.dur],
            p = n("#mCSB_" + f.idx),
            o = n("#mCSB_" + f.idx + "_container"),
            b = o.parent(),
            g = e.callbacks.onTotalScrollOffset
              ? ft.call(i, e.callbacks.onTotalScrollOffset)
              : [0, 0],
            nt = e.callbacks.onTotalScrollBackOffset
              ? ft.call(i, e.callbacks.onTotalScrollBackOffset)
              : [0, 0],
            tt;
          if (
            ((f.trigger = u.trigger),
            (b.scrollTop() !== 0 || b.scrollLeft() !== 0) &&
              (n(".mCSB_" + f.idx + "_scrollbar").css("visibility", "visible"),
              b.scrollTop(0).scrollLeft(0)),
            r !== "_resetY" ||
              f.contentReset.y ||
              (h("onOverflowYNone") && e.callbacks.onOverflowYNone.call(i[0]),
              (f.contentReset.y = 1)),
            r !== "_resetX" ||
              f.contentReset.x ||
              (h("onOverflowXNone") && e.callbacks.onOverflowXNone.call(i[0]),
              (f.contentReset.x = 1)),
            r !== "_resetY" && r !== "_resetX")
          ) {
            (f.contentReset.y || !i[0].mcs) &&
              f.overflowed[0] &&
              (h("onOverflowY") && e.callbacks.onOverflowY.call(i[0]),
              (f.contentReset.x = null)),
              (f.contentReset.x || !i[0].mcs) &&
                f.overflowed[1] &&
                (h("onOverflowX") && e.callbacks.onOverflowX.call(i[0]),
                (f.contentReset.x = null)),
              e.snapAmount &&
                ((tt =
                  e.snapAmount instanceof Array
                    ? u.dir === "x"
                      ? e.snapAmount[1]
                      : e.snapAmount[0]
                    : e.snapAmount),
                (r = yi(r, tt, e.snapOffset)));
            switch (u.dir) {
              case "x":
                var c = n("#mCSB_" + f.idx + "_dragger_horizontal"),
                  it = "left",
                  w = o[0].offsetLeft,
                  l = [
                    p.width() - o.outerWidth(!1),
                    c.parent().width() - c.width(),
                  ],
                  s = [r, r === 0 ? 0 : r / f.scrollRatio.x],
                  v = g[1],
                  y = nt[1],
                  ut = v > 0 ? v / f.scrollRatio.x : 0,
                  et = y > 0 ? y / f.scrollRatio.x : 0;
                break;
              case "y":
                var c = n("#mCSB_" + f.idx + "_dragger_vertical"),
                  it = "top",
                  w = o[0].offsetTop,
                  l = [
                    p.height() - o.outerHeight(!1),
                    c.parent().height() - c.height(),
                  ],
                  s = [r, r === 0 ? 0 : r / f.scrollRatio.y],
                  v = g[0],
                  y = nt[0],
                  ut = v > 0 ? v / f.scrollRatio.y : 0,
                  et = y > 0 ? y / f.scrollRatio.y : 0;
            }
            (s[1] < 0 || (s[0] === 0 && s[1] === 0)
              ? (s = [0, 0])
              : s[1] >= l[1]
              ? (s = [l[0], l[1]])
              : (s[0] = -s[0]),
            i[0].mcs || (a(), h("onInit") && e.callbacks.onInit.call(i[0])),
            clearTimeout(o[0].onCompleteTimeout),
            vt(c[0], it, Math.round(s[1]), k[1], u.scrollEasing),
            !f.tweenRunning &&
              ((w === 0 && s[0] >= 0) || (w === l[0] && s[0] <= l[0]))) ||
              vt(
                o[0],
                it,
                Math.round(s[0]),
                k[0],
                u.scrollEasing,
                u.overwrite,
                {
                  onStart: function () {
                    u.callbacks &&
                      u.onStart &&
                      !f.tweenRunning &&
                      (h("onScrollStart") &&
                        (a(), e.callbacks.onScrollStart.call(i[0])),
                      (f.tweenRunning = !0),
                      d(c),
                      (f.cbOffsets = ot()));
                  },
                  onUpdate: function () {
                    u.callbacks &&
                      u.onUpdate &&
                      h("whileScrolling") &&
                      (a(), e.callbacks.whileScrolling.call(i[0]));
                  },
                  onComplete: function () {
                    if (u.callbacks && u.onComplete) {
                      e.axis === "yx" && clearTimeout(o[0].onCompleteTimeout);
                      var n = o[0].idleTimer || 0;
                      o[0].onCompleteTimeout = setTimeout(function () {
                        h("onScroll") && (a(), e.callbacks.onScroll.call(i[0])),
                          h("onTotalScroll") &&
                            s[1] >= l[1] - ut &&
                            f.cbOffsets[0] &&
                            (a(), e.callbacks.onTotalScroll.call(i[0])),
                          h("onTotalScrollBack") &&
                            s[1] <= et &&
                            f.cbOffsets[1] &&
                            (a(), e.callbacks.onTotalScrollBack.call(i[0])),
                          (f.tweenRunning = !1),
                          (o[0].idleTimer = 0),
                          d(c, "hide");
                      }, n);
                    }
                  },
                }
              );
          }
        },
        vt = function (n, t, i, r, u, f, e) {
          function y() {
            o.stop ||
              (s || b.call(),
              (s = w() - g),
              p(),
              s >= o.time &&
                ((o.time = s > o.time ? s + h - (s - o.time) : s + h - 1),
                o.time < s + 1 && (o.time = s + 1)),
              o.time < r ? (o.id = l(y)) : d.call());
          }
          function p() {
            r > 0
              ? ((o.currVal = it(o.time, c, v, r, u)),
                (a[t] = Math.round(o.currVal) + "px"))
              : (a[t] = i + "px"),
              k.call();
          }
          function nt() {
            (h = 1e3 / 60),
              (o.time = s + h),
              (l = window.requestAnimationFrame
                ? window.requestAnimationFrame
                : function (n) {
                    return p(), setTimeout(n, 0.01);
                  }),
              (o.id = l(y));
          }
          function tt() {
            o.id != null &&
              (window.requestAnimationFrame
                ? window.cancelAnimationFrame(o.id)
                : clearTimeout(o.id),
              (o.id = null));
          }
          function it(n, t, i, r, u) {
            switch (u) {
              case "linear":
              case "mcsLinear":
                return (i * n) / r + t;
              case "mcsLinearOut":
                return (n /= r), n--, i * Math.sqrt(1 - n * n) + t;
              case "easeInOutSmooth":
                return ((n /= r / 2), n < 1)
                  ? (i / 2) * n * n + t
                  : (n--, (-i / 2) * (n * (n - 2) - 1) + t);
              case "easeInOutStrong":
                return ((n /= r / 2), n < 1)
                  ? (i / 2) * Math.pow(2, 10 * (n - 1)) + t
                  : (n--, (i / 2) * (-Math.pow(2, -10 * n) + 2) + t);
              case "easeInOut":
              case "mcsEaseInOut":
                return ((n /= r / 2), n < 1)
                  ? (i / 2) * n * n * n + t
                  : ((n -= 2), (i / 2) * (n * n * n + 2) + t);
              case "easeOutSmooth":
                return (n /= r), n--, -i * (n * n * n * n - 1) + t;
              case "easeOutStrong":
                return i * (-Math.pow(2, (-10 * n) / r) + 1) + t;
              case "easeOut":
              case "mcsEaseOut":
              default:
                var f = (n /= r) * n,
                  e = f * n;
                return (
                  t +
                  i *
                    (0.499999999999997 * e * f +
                      -2.5 * f * f +
                      5.5 * e +
                      -6.5 * f +
                      4 * n)
                );
            }
          }
          var v;
          n._mTween || (n._mTween = { top: {}, left: {} });
          var e = e || {},
            b = e.onStart || function () {},
            k = e.onUpdate || function () {},
            d = e.onComplete || function () {},
            g = w(),
            h,
            s = 0,
            c = n.offsetTop,
            a = n.style,
            l,
            o = n._mTween[t];
          t === "left" && (c = n.offsetLeft),
            (v = i - c),
            (o.stop = 0),
            f !== "none" && tt(),
            nt();
        },
        w = function () {
          return window.performance && window.performance.now
            ? window.performance.now()
            : window.performance && window.performance.webkitNow
            ? window.performance.webkitNow()
            : Date.now
            ? Date.now()
            : +new Date();
        },
        pi = function () {
          var n = this,
            r,
            i,
            t;
          for (
            n._mTween || (n._mTween = { top: {}, left: {} }),
              r = ["top", "left"],
              i = 0;
            i < r.length;
            i++
          )
            (t = r[i]),
              n._mTween[t].id &&
                (window.requestAnimationFrame
                  ? window.cancelAnimationFrame(n._mTween[t].id)
                  : clearTimeout(n._mTween[t].id),
                (n._mTween[t].id = null),
                (n._mTween[t].stop = 1));
        },
        a = function (n, t) {
          try {
            delete n[t];
          } catch (i) {
            n[t] = null;
          }
        },
        yt = function (n) {
          return !(n.which && n.which !== 1);
        },
        nt = function (n) {
          var t = n.originalEvent.pointerType;
          return !(t && t !== "touch" && t !== 2);
        },
        tt = function (n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        },
        f = function (n) {
          var t = n.parents(".mCSB_container");
          return [
            n.offset().top - t.offset().top,
            n.offset().left - t.offset().left,
          ];
        },
        wi = function () {
          function t() {
            var t = ["webkit", "moz", "ms", "o"],
              n;
            if ("hidden" in document) return "hidden";
            for (n = 0; n < t.length; n++)
              if (t[n] + "Hidden" in document) return t[n] + "Hidden";
            return null;
          }
          var n = t();
          return n ? document[n] : !1;
        };
      (n.fn[h] = function (t) {
        if (s[t])
          return s[t].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof t != "object" && t)
          n.error("Method " + t + " does not exist");
        else return s.init.apply(this, arguments);
      }),
        (n[h] = function (t) {
          if (s[t])
            return s[t].apply(this, Array.prototype.slice.call(arguments, 1));
          if (typeof t != "object" && t)
            n.error("Method " + t + " does not exist");
          else return s.init.apply(this, arguments);
        }),
        (n[h].defaults = ot),
        (window[h] = !0),
        n(window).bind("load", function () {
          n(it)[h](),
            n.extend(n.expr[":"], {
              mcsInView:
                n.expr[":"].mcsInView ||
                function (t) {
                  var i = n(t),
                    u = i.parents(".mCSB_container"),
                    e,
                    r;
                  if (u.length)
                    return (
                      (e = u.parent()),
                      (r = [u[0].offsetTop, u[0].offsetLeft]),
                      r[0] + f(i)[0] >= 0 &&
                        r[0] + f(i)[0] < e.height() - i.outerHeight(!1) &&
                        r[1] + f(i)[1] >= 0 &&
                        r[1] + f(i)[1] < e.width() - i.outerWidth(!1)
                    );
                },
              mcsInSight:
                n.expr[":"].mcsInSight ||
                function (t, i, r) {
                  var e = n(t),
                    o,
                    s = e.parents(".mCSB_container"),
                    u,
                    h,
                    c,
                    l =
                      r[3] === "exact"
                        ? [
                            [1, 0],
                            [1, 0],
                          ]
                        : [
                            [0.9, 0.1],
                            [0.6, 0.4],
                          ];
                  if (s.length)
                    return (
                      (o = [e.outerHeight(!1), e.outerWidth(!1)]),
                      (h = [
                        s[0].offsetTop + f(e)[0],
                        s[0].offsetLeft + f(e)[1],
                      ]),
                      (u = [
                        s.parent()[0].offsetHeight,
                        s.parent()[0].offsetWidth,
                      ]),
                      (c = [
                        o[0] < u[0] ? l[0] : l[1],
                        o[1] < u[1] ? l[0] : l[1],
                      ]),
                      h[0] - u[0] * c[0][0] < 0 &&
                        h[0] + o[0] - u[0] * c[0][1] >= 0 &&
                        h[1] - u[1] * c[1][0] < 0 &&
                        h[1] + o[1] - u[1] * c[1][1] >= 0
                    );
                },
              mcsOverflow:
                n.expr[":"].mcsOverflow ||
                function (i) {
                  var r = n(i).data(t);
                  if (r) return r.overflowed[0] || r.overflowed[1];
                },
            });
        });
    });
  }),
  (function (n) {
    typeof define == "function" && define.amd
      ? define(["jquery"], n)
      : typeof exports == "object"
      ? (module.exports = n)
      : n(jQuery);
  })(function (n) {
    function e(r) {
      var f = r || window.event,
        w = h.call(arguments, 1),
        l = 0,
        o = 0,
        e = 0,
        a = 0,
        b = 0,
        k = 0,
        v,
        y,
        p;
      if (
        ((r = n.event.fix(f)),
        (r.type = "mousewheel"),
        "detail" in f && (e = f.detail * -1),
        "wheelDelta" in f && (e = f.wheelDelta),
        "wheelDeltaY" in f && (e = f.wheelDeltaY),
        "wheelDeltaX" in f && (o = f.wheelDeltaX * -1),
        "axis" in f && f.axis === f.HORIZONTAL_AXIS && ((o = e * -1), (e = 0)),
        (l = e === 0 ? o : e),
        "deltaY" in f && ((e = f.deltaY * -1), (l = e)),
        "deltaX" in f && ((o = f.deltaX), e === 0 && (l = o * -1)),
        e !== 0 || o !== 0)
      )
        return (
          f.deltaMode === 1
            ? ((v = n.data(this, "mousewheel-line-height")),
              (l *= v),
              (e *= v),
              (o *= v))
            : f.deltaMode === 2 &&
              ((y = n.data(this, "mousewheel-page-height")),
              (l *= y),
              (e *= y),
              (o *= y)),
          (a = Math.max(Math.abs(e), Math.abs(o))),
          (!t || a < t) && ((t = a), s(f, a) && (t /= 40)),
          s(f, a) && ((l /= 40), (o /= 40), (e /= 40)),
          (l = Math[l >= 1 ? "floor" : "ceil"](l / t)),
          (o = Math[o >= 1 ? "floor" : "ceil"](o / t)),
          (e = Math[e >= 1 ? "floor" : "ceil"](e / t)),
          i.settings.normalizeOffset &&
            this.getBoundingClientRect &&
            ((p = this.getBoundingClientRect()),
            (b = r.clientX - p.left),
            (k = r.clientY - p.top)),
          (r.deltaX = o),
          (r.deltaY = e),
          (r.deltaFactor = t),
          (r.offsetX = b),
          (r.offsetY = k),
          (r.deltaMode = 0),
          w.unshift(r, l, o, e),
          u && clearTimeout(u),
          (u = setTimeout(c, 200)),
          (n.event.dispatch || n.event.handle).apply(this, w)
        );
    }
    function c() {
      t = null;
    }
    function s(n, t) {
      return (
        i.settings.adjustOldDeltas && n.type === "mousewheel" && t % 120 == 0
      );
    }
    var o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      r =
        "onwheel" in document || document.documentMode >= 9
          ? ["wheel"]
          : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      h = Array.prototype.slice,
      u,
      t,
      f,
      i;
    if (n.event.fixHooks)
      for (f = o.length; f; ) n.event.fixHooks[o[--f]] = n.event.mouseHooks;
    (i = n.event.special.mousewheel = {
      version: "3.1.12",
      setup: function () {
        if (this.addEventListener)
          for (var t = r.length; t; ) this.addEventListener(r[--t], e, !1);
        else this.onmousewheel = e;
        n.data(this, "mousewheel-line-height", i.getLineHeight(this)),
          n.data(this, "mousewheel-page-height", i.getPageHeight(this));
      },
      teardown: function () {
        if (this.removeEventListener)
          for (var t = r.length; t; ) this.removeEventListener(r[--t], e, !1);
        else this.onmousewheel = null;
        n.removeData(this, "mousewheel-line-height"),
          n.removeData(this, "mousewheel-page-height");
      },
      getLineHeight: function (t) {
        var r = n(t),
          i = r["offsetParent" in n.fn ? "offsetParent" : "parent"]();
        return (
          i.length || (i = n("body")),
          parseInt(i.css("fontSize"), 10) ||
            parseInt(r.css("fontSize"), 10) ||
            16
        );
      },
      getPageHeight: function (t) {
        return n(t).height();
      },
      settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    }),
      n.fn.extend({
        mousewheel: function (n) {
          return n ? this.bind("mousewheel", n) : this.trigger("mousewheel");
        },
        unmousewheel: function (n) {
          return this.unbind("mousewheel", n);
        },
      });
  }),
  (function (n, t) {
    "use strict";
    n.UiMenuMainV2 = n.UiBloc.extend({
      init: function (i, r) {
        this._super(i, r);
        var u = this,
          w = 0,
          s = !1,
          h = !1,
          c = !1,
          b = n.Utils.Common.isTouchDevice(),
          k = "shoppingtool=treestructureflyout",
          ut = 6,
          l = "",
          a = { LOADED: "loaded", LOADING: "loading" },
          f = { currentLvl2: null, currentLvl3: null },
          e = t("#menuLabels");
        e.length > 0 && (e = JSON.parse(e.text())),
          (this.trackingValues = []),
          (this.$container = t("#navigationMenu"));
        var tt = t("#navigationMenuMain"),
          ft = t("<div>", { class: "menu_panel" }),
          v = t("<li>", { class: "menu_li" }),
          y = t("<a>", { class: "menu_link" }),
          et = t("<ul>", { class: "menu_column" }),
          ot = t("<span>", { class: "menu_subtitle" }),
          o = t("<div>", {
            class: "menu-overlay",
            style: "display: none;",
          }).insertAfter(tt),
          p = t("<div>", { class: "menu-bg", style: "display: none;" }),
          d = t("<div>", {
            class: "menu-bg-lvl3 loading",
            style: "display: none;",
          }),
          it = function (n) {
            var i = "lvl3_" + n;
            f[i] === undefined
              ? ((f[i] = a.LOADING), st(n))
              : f[i] !== a.LOADING &&
                (t(".menu_panel").removeClass("open"),
                f[i].$panel.addClass("open"),
                o.show(),
                g(f[i].firstLvl4Id, f[i].firstLvl4Item),
                f[i].$panel
                  .find(".menu_column .menu_li:first .menu_link")
                  .addClass("menu_link--isActive")),
              f.currentLvl3 !== null &&
                t('[data-id="' + f.currentLvl3 + '"] .menu_link').addClass(
                  "menu_link--isActive"
                );
          },
          st = function (n) {
            var r = "lvl3_" + n,
              i = t('.menu_item[data-id="' + n + '"]'),
              e = i.data("lvl"),
              u = t('.menu_panel[data-trigger="' + i.attr("id") + '"]');
            i.find(".menu_title").addClass("menu_title--isActive"),
              u.length === 0 &&
                t.ajax({
                  url:
                    "/servicemenu/loadchildmenuitemsforparent.aspx?currentMenuItemId=" +
                    i.data("menuid") +
                    "&categoryid=" +
                    i.data("categoryid") +
                    "&level=" +
                    e +
                    "&parentmenuitemid=" +
                    i.data("parentMenuId"),
                  cache: !1,
                  type: "GET",
                  success: function (t) {
                    (f[r] = {}),
                      (u = ht(t, i, f[r])),
                      (f[r].$panel = u),
                      f.currentLvl2 === n && it(n);
                  },
                  error: function () {},
                });
          },
          ht = function (n, i, r) {
            var h, a;
            w++;
            var p = i.find(".menu_title"),
              e = ft.clone(),
              o = et.clone(),
              s = i.attr("id"),
              c = t("<div>", {
                class: "menu_grid lr-container flex flex--guttered",
              });
            e.attr("data-trigger", s);
            var l = t("<div>", { class: "flex_col--2 menu_column--first" }),
              b = t("<div>", {
                class: "flex_col--4 menu_column--second",
                id: "mainMenu_lvl4_" + s,
              }),
              d = t("<div>", {
                class: "flex_col--2",
                id: "mainMenu_selection_" + s,
              }),
              nt = t("<div>", {
                class: "flex_col--4",
                id: "mainMenu_highlight_" + s,
              });
            return (
              o.attr({ "data-brands": i.attr("data-brands") }),
              (h = typeof n != "object" ? JSON.parse(n) : n),
              h &&
                t.each(h, function (n, t) {
                  var i = y.clone(),
                    e = "#",
                    u;
                  t.Link.indexOf("#") > 0 && (e = "&"),
                    i
                      .text(t.Label)
                      .attr({
                        "data-cerberus": "mainmenu-l" + t.Level + "-cat",
                        href: t.Link + e + k,
                        "data-lvl": t.Level,
                      }),
                    (u = v
                      .clone()
                      .attr({
                        "data-brands":
                          t.LinkToBrands !== "null" ? t.LinkToBrands : null,
                        "data-lvl": t.Level,
                        "data-id": t.Id,
                        "data-categoryid": t.CategoryId,
                        "data-menuid": t.MenuId,
                        "data-parentMenuId": t.ParentMenuItemId,
                        "data-haschild": t.HasChildren,
                        id: "menuTrigger_" + t.Level + "_" + n + "_" + w,
                      })
                      .on("mouseenter", function () {
                        (f.currentLvl3 = t.Id), g(t.Id, t);
                      })),
                    u.append(i),
                    o.append(u),
                    n === 0 &&
                      (i.addClass("menu_link--isActive"),
                      (f.currentLvl3 = t.Id),
                      (r.firstLvl4Id = t.Id),
                      (r.firstLvl4Item = t));
                }),
              o.append(at(i, p)),
              l.append(o),
              c.append(l).append(b).append(d).append(nt).append("<hr />"),
              e.append(c),
              (a = u.computeTopMargin(e) - 0.1),
              e.css("margin-top", a),
              i.append(e),
              e
            );
          },
          g = function (n, i) {
            var r = "lvl4_" + n;
            f[r] === undefined
              ? ((f[r] = a.LOADING), ct(n, i), d.show(), p.addLoading().show())
              : f[r] !== a.LOADING &&
                (t(".menu_container").removeClass("open"),
                t(".selection_container").removeClass("open"),
                t(".highlight_container").removeClass("open"),
                d.hide(),
                p.removeLoading().hide(),
                f[r].$lvl4Container.addClass("open"),
                f[r].$selectionsContainer.addClass("open"),
                f[r].$highlightsContainer.addClass("open"));
          },
          ct = function (n, i) {
            var y = "lvl4_" + n,
              r = t('.menu_li[data-id="' + i.Id + '"]'),
              w = r.find(".menu_link"),
              k = t('.menu_container[data-trigger="' + r.attr("id") + '"]'),
              s,
              u,
              v;
            b &&
              r.data("haschild") === !0 &&
              ((c = !0),
              setTimeout(function () {
                c = !1;
              }, 10));
            var h = t(
                "#mainMenu_lvl4_" + r.closest(".menu_panel").data("trigger")
              ),
              e = h.find(
                '.menu_container[data-trigger="' + r.attr("id") + '"]'
              ),
              l = parseInt(r.attr("data-lvl"), 10),
              a = t(
                "#mainMenu_selection_" +
                  r.closest(".menu_panel").data("trigger")
              ),
              o = a.find(
                '.selection_container[data-trigger="' + r.attr("id") + '"]'
              );
            o.length === 0 && ((o = yt(r, i.WidgetsJson, l + 1)), a.append(o)),
              (s = t(
                "#mainMenu_highlight_" +
                  r.closest(".menu_panel").data("trigger")
              )),
              (u = s.find(
                '.highlight_container[data-trigger="' + r.attr("id") + '"]'
              )),
              u.length === 0 &&
                ((u = pt(r, i.WidgetsJson, l + 1)), s.append(u)),
              e.length === 0 &&
                k.length === 0 &&
                ((v = r.closest(".menu_panel").find(".menu_grid").first()),
                d.appendTo(p),
                p.appendTo(v),
                t.ajax({
                  url:
                    "/servicemenu/loadchildmenuitemsforparent.aspx?currentMenuItemId=" +
                    i.MenuId +
                    "&categoryid=" +
                    i.CategoryId +
                    "&level=3&parentmenuitemid=" +
                    i.ParentMenuItemId,
                  cache: !1,
                  type: "GET",
                  success: function (n) {
                    (e = lt({
                      items: n,
                      id: r.data("id"),
                      categoryid: r.data("categoryid"),
                      brands: r.data("brands"),
                      lvl: r.data("lvl"),
                      $link: w,
                    })),
                      h.append(e),
                      (f[y] = {
                        $lvl4Container: e,
                        $selectionsContainer: o,
                        $highlightsContainer: u,
                      }),
                      f.currentLvl3 === i.Id && g(i.Id);
                  },
                  error: function () {},
                }));
          },
          lt = function (i) {
            var l = "lvl4_" + i.id,
              r;
            if (
              (w++,
              (r = t("<div>", { class: "menu_container flex flex--guttered" })),
              r.attr("data-trigger", i.id),
              i.items)
            ) {
              var s = 22,
                f = s / 2,
                c = 1,
                h = 1,
                e = 0,
                o = i.items.length;
              if (o > f)
                for (
                  f = o >= s ? Math.floor(o / 2) : Math.ceil(o / 2), e = 1;
                  e <= 2;
                  e++
                )
                  r.append(
                    '<div class="flex_col--6" data-lvl="4" id="menu_column_' +
                      e +
                      '"><ul data-brands="' +
                      i.brands +
                      '"></ul></div>'
                  );
              else
                r.append(
                  '<div class="flex_col--12" data-lvl="4" id="menu_column_1"><ul data-brands="' +
                    i.brands +
                    '"></ul></div>'
                );
              t.each(i.items, function (t, e) {
                var l;
                if (t < s) {
                  var a = v.clone(),
                    p = y.clone(),
                    o = e.Level;
                  n.virtualSite !== "laredoute" && o--,
                    (l = "#"),
                    e.Link.indexOf("#") > 0 && (l = "&"),
                    p
                      .text(e.Label)
                      .attr({
                        "data-cerberus": "mainmenu-l" + e.Level + "-link",
                        href: e.Link + l + k,
                        "data-lvl": o,
                      }),
                    a
                      .attr({ "data-lvl": o })
                      .on("mouseenter", function () {
                        u.addValueToTracking(i.$link.text(), o - 1),
                          u.applyTracking(i.$link, o - 1);
                      })
                      .append(p),
                    h <= f ? h++ : ((h = 1), c++),
                    r.find("#menu_column_" + c + " > ul").append(a);
                }
              }),
                r.find('[data-lvl="4"] > ul').last().append(vt(i.lvl, i.$link));
            }
            return r;
          },
          rt = function (n) {
            return n.trim().toLowerCase();
          },
          at = function (t, i) {
            var f = v.clone(),
              o = y.clone(),
              s = parseInt(t.data("lvl")) + 1,
              r = e.MenuSeeArticles.replace("|category|", rt(i.text())),
              u;
            return (
              t.data("lvl") !== 2 &&
                n.virtualSite === "laredoute" &&
                (r = e.MenuSeeAll),
              (u = "#"),
              i.attr("data-href").indexOf("#") > 0 && (u = "&"),
              o
                .attr({
                  class: "menu_link--misc",
                  title: r,
                  href: i.attr("data-href") + u + k,
                  "data-cerberus": "mainmenu-l" + s + "-cat",
                })
                .text(r),
              f.data({ lvl: s }).append(o),
              f
            );
          },
          vt = function (t, i) {
            var f = v.clone(),
              o = y.clone(),
              r = parseInt(t) + 1,
              h = r > 2 ? "-collect" : "-cat",
              u = e.MenuSeeArticles.replace("|category|", rt(i.text())),
              s;
            return (
              (t !== 2 || n.virtualSite !== "laredoute") && (u = e.MenuSeeAll),
              (s = "#"),
              i.attr("href").indexOf("#") > 0 && (s = "&"),
              o
                .attr({
                  class: "menu_title--universe",
                  title: u,
                  href: i.attr("href"),
                  "data-cerberus": "mainmenu-l" + r + h,
                })
                .text(u),
              f.data({ lvl: r }).append(o),
              f
            );
          },
          yt = function (n, r, f) {
            var a = n.attr("id"),
              h = t("<div>", { class: "selection_container" })
                .attr("data-trigger", a)
                .attr("data-lvl", f),
              r = r ? JSON.parse(r) : [],
              c,
              l,
              o,
              s;
            if (
              r &&
              ((c = !1),
              (o = []),
              t.each(r, function (t, r) {
                switch (r.TemplateIdentifier) {
                  case "selection":
                    c ||
                      (h.append(ot.clone().text(e.SelectionTitle)), (c = !0)),
                      (l = i.Blocs.CommonMenu.createSelection(r.Components).on(
                        "mouseenter",
                        function () {
                          u.addValueToTracking(n.text(), f - 1),
                            u.applyTracking(n, f - 1);
                        }
                      )),
                      l && o.push(l);
                }
              }),
              o.length > 0)
            )
              for (s = 0; s < ut; s++) h.append(o[s]);
            return h;
          },
          pt = function (n, r, f) {
            var y = n.attr("id"),
              s = t("<div>", { class: "highlight_container" })
                .attr("data-trigger", y)
                .attr("data-lvl", f),
              r = r ? JSON.parse(r) : [],
              o,
              e,
              h,
              c,
              l,
              a,
              v;
            if (
              r &&
              ((e = []),
              t.each(r, function (t, r) {
                switch (r.TemplateIdentifier) {
                  case "promoted-brand":
                    (o = i.Blocs.CommonMenu.createBrandHighlight(
                      r.Components
                    ).on("mouseenter", function () {
                      u.addValueToTracking(n.text(), f - 1),
                        u.applyTracking(n, f - 1);
                    })),
                      o && e.push(o);
                    break;
                  case "promoted-default":
                    (o = i.Blocs.CommonMenu.createHighlight(r.Components).on(
                      "mouseenter",
                      function () {
                        u.addValueToTracking(n.text(), f - 1),
                          u.applyTracking(n, f - 1);
                      }
                    )),
                      o && e.push(o);
                }
              }),
              e.length > 0)
            )
              if (e.length === 1) s.append(e[0]);
              else {
                if (((c = t("<div>", { class: "flex" })), e.length === 2))
                  h = e[1];
                else
                  for (l = 1; l < 3; l++)
                    (a = t("<div>", { class: "flex_col--12" })),
                      (h = c
                        .clone()
                        .append(a.clone().append(e[1]))
                        .append(a.clone().append(e[2])));
                (v = t("<div>", { class: "flex_col--6" })),
                  s.append(
                    c
                      .clone()
                      .addClass("flex--guttered")
                      .append(v.clone().append(e[0]))
                      .append(v.clone().append(h))
                  );
              }
            return s;
          },
          wt = function (n) {
            n.find(".menu_title").first().addClass("menu_title--isActive"),
              o.show();
          },
          nt = function (n) {
            n.removeClass("open"), o.hide(), (f.currentLvl3 = null);
          },
          bt = function (t) {
            var i = t;
            return (
              (i = i.trim()),
              (i = i.replace(/\s+/g, "")),
              (i = n.Utils.Common.RemoveAccents(i)),
              (i = n.Utils.Common.removePunctuation(i)),
              (i = i.toLowerCase())
            );
          };
        (u.computeTopMargin = function (n) {
          return (
            t("#navigationMenuMainWrapper").outerHeight() +
            t(n).parent(".menu_list").outerHeight()
          );
        }),
          (u.addValueToTracking = function (t, i) {
            (t = bt(t)),
              typeof n.virtualSite != "undefined" &&
                u.trackingValues.indexOf(n.virtualSite) == -1 &&
                (u.trackingValues[0] = n.virtualSite),
              t &&
                u.trackingValues.indexOf(t) == -1 &&
                (u.trackingValues[i] = t),
              localStorage.setItem("lr-tracking-value", u.trackingValues);
          }),
          (u.removeValuesFromTracking = function (n) {
            (u.trackingValues = u.trackingValues.slice(0, n + 1)),
              localStorage.setItem("lr-tracking-value", u.trackingValues);
          }),
          (u.sendTrackingValue = function (t) {
            var r, i;
            if (t.length < 5) for (r = t.length; r < 5; r++) t.push("null");
            localStorage.setItem("lr-tracking-value", t),
              (i = localStorage.getItem("lr-tracking-value")),
              (i = i.replace(/[#?!.;:%]/g, "")),
              (i = n.Utils.Common.RemoveAccents(i)),
              (i = i.replace(/\s+/g, "")),
              (i = i.replace(/,/g, "_")),
              n.Utils.CookieManager.CreateCookie(
                "OmnitureEntry_Header_SalesArea",
                i
              );
          }),
          (u.applyTracking = function (n, t) {
            var i = n.text(),
              r = t;
            i === "" && (i = "image"),
              typeof r != "number" && (r = 4),
              this.Model.$eventContainer.trigger(
                window.globalTrackingEvent.SHOPPING_TOOL_USED,
                [
                  {
                    type: "TREE",
                    subType: "layertop",
                    extraData: [r, i.trim().toLowerCase().replace(/ /g, "")],
                  },
                ]
              );
          });
        tt.on("mouseleave", ".menu_item", function () {
          t(this).find(".menu_title").removeClass("menu_title--isActive"),
            (f.currentLvl2 = null);
        })
          .addBack()
          .on(
            "touchstart click",
            '.menu_item:not(.menu_backToMainSite) > .menu_title, .menu_li > a[class^="menu_link"], .menu_li > a[class^="menu_title"], .selection, .highlight',
            function (n) {
              var r = t(this),
                i = r.data("lvl"),
                f = t(this).data("menuid");
              (i > 1 && (f = t(this).parent("li").data("menuid")),
              t(this).data("haschild") === !0 &&
                (s
                  ? (n.preventDefault(), n.stopPropagation(), (s = !1))
                  : h
                  ? (n.preventDefault(), n.stopPropagation(), (h = !1))
                  : c && (n.preventDefault(), n.stopPropagation(), (c = !1))),
              u.sendTrackingValue(u.trackingValues),
              u.applyTracking(r, i),
              n.handled !== !1) &&
                (n.stopPropagation(),
                n.preventDefault(),
                (n.handled = !0),
                n.type === "click"
                  ? ((window.location.href = r.attr("href")), (l = ""))
                  : n.type === "touchstart" &&
                    (l === f
                      ? ((window.location.href = r.attr("href")), (l = ""))
                      : (i === 1 &&
                          t('.menu_item[data-lvl="' + i + '"]')
                            .not(this)
                            .trigger("mouseleave"),
                        t(this).trigger("mouseenter"),
                        (l = f)),
                    i > 1 &&
                      (t(this).addClass("menu_title--isActive"),
                      t(this).parent("li").addClass("menu_title--isActive"))));
            }
          )
          .on("mouseenter", ".menu_item", function () {
            var r = t(this),
              i = r.data("lvl"),
              c = r.find("> .menu_title"),
              e,
              o;
            return (
              u.removeValuesFromTracking(i),
              i === 1
                ? (nt(t(".menu_panel.open")),
                  wt(r),
                  u.addValueToTracking(c.text(), i),
                  r.data("haschild") === !0 &&
                    b &&
                    ((s = !0),
                    setTimeout(function () {
                      s = !1;
                    }, 10)),
                  n.virtualSite === "laredoute" &&
                    r
                      .children(".menu_list")
                      .first()
                      .removeClass("menu_list--isHidden"))
                : t('.menu_item[data-lvl="' + i + '"] .menu_title')
                    .not(this)
                    .removeClass("menu_title--isActive"),
              (i === 1 || i === 2) &&
                ((e = t(this)
                  .find(".menu_column--first .menu_li .menu_link")
                  .first()),
                e.length !== 0 && e.addClass("menu_link--isActive")),
              u.addValueToTracking(c.text(), i),
              r.data("haschild") === !0
                ? (b &&
                    ((h = !0),
                    setTimeout(function () {
                      h = !1;
                    }, 10)),
                  (i === 2 || n.virtualSite != "laredoute") &&
                    ((o = r.data("id")), (f.currentLvl2 = o), it(o)))
                : r.data("haschild") !== !0 &&
                  i === 2 &&
                  nt(t(".menu_panel.open")),
              !1
            );
          })
          .addBack()
          .on("mouseover", '.menu_item[data-lvl="1"]', function () {
            t(this).data("haschild") == !1 && o.hide();
          })
          .addBack()
          .on("mouseenter", ".menu_li", function () {
            var i = t(this).data("lvl"),
              r = t(this).find(
                '> a[class^="menu_link"], > a[class^="menu_title"]'
              );
            u.removeValuesFromTracking(i),
              t('.menu_li[data-lvl="' + i + '"] .menu_link').removeClass(
                "menu_link--isActive"
              ),
              t(this).find(".menu_link").addClass("menu_link--isActive"),
              i === 4 && n.virtualSite != "laredoute" && i--,
              u.addValueToTracking(r.text(), i);
          })
          .addBack()
          .on("mouseenter", ".menu_grid", function () {
            t(this)
              .closest('.menu_item[data-lvl="2"]')
              .find(".menu_title")
              .addClass("menu_title--isActive");
          })
          .on("mouseenter", ".selection", function () {
            var n = t(this).find("> .selection_title"),
              i = t(".selection_container.open").attr("data-lvl");
            u.addValueToTracking("nosselections|" + n.text(), i);
          })
          .on("mouseenter", ".highlight", function () {
            var n = t(".highlight_container.open .highlight").index(t(this)),
              i = t(".highlight_container.open").attr("data-lvl");
            u.addValueToTracking("image" + (n + 1), i);
          })
          .on("mouseleave", '.menu_item[data-lvl="1"]', function () {
            n.virtualSite != "laredoute"
              ? t(this).find(".menu_panel").removeClass("open")
              : t(this)
                  .children(".menu_list")
                  .first()
                  .addClass("menu_list--isHidden");
          })
          .on("mouseleave", function () {
            nt(t(".menu_panel.open")), o.hide();
          })
          .on("mouseenter", ".menu_spacer", function () {
            o.hide();
          });
        o.on("mouseenter", function () {
          t(this).hide();
        });
      },
    });
  })(window, window.jQuery),
  (UiAccountLayer = UiBloc.extend({
    init: function (n, t) {
      this._super(n, t);
      var i = this;
      if (
        ((this.status = "notLoaded"),
        (this.isOpen = !1),
        (this.isTouch = Utils.Common.isTouchDevice()),
        (this.$accountIcon = $("#iconProfil")),
        (this.$accountIconContainer = this.$accountIcon.parent()),
        (this.$container = $("<div>", {
          class: $.getHeaderTooltipClasses("tooltip-login"),
        })
          .insertAfter(this.$accountIcon)
          .tooltip()),
        this.isTouch)
      )
        this.$accountIcon.on("click", function () {
          i.isMouseEnter
            ? (i.isMouseEnter = !1)
            : i.isOpen
            ? i.redirection()
            : i.open();
        });
      else
        this.$accountIcon.on("click", function () {
          i.redirection();
        });
      this.$accountIconContainer.on("mouseenter", function () {
        i.isTouch &&
          ((i.isMouseEnter = !0),
          setTimeout(function () {
            i.isMouseEnter = !1;
          }, 10)),
          i.open();
      });
      this.$accountIconContainer.on("mouseleave", function () {
        i.close();
      });
      this.$container.on("tooltip.close", function () {
        i.isOpen = !1;
      });
    },
    load: function () {
      var n = this;
      $.ajax({
        async: !1,
        cache: !1,
        url: "/customerservices/loadloginlayer",
        type: "GET",
        success: function (t) {
          if (
            (n.$container.append(t),
            typeof window.reach5 != "undefined" &&
              window.reach5("on", "ready", function () {
                $(".social-login-container").show();
              }),
            (n.status = "loaded"),
            n.isOpen && n.open(),
            $("#logOutLayer").length === 1)
          )
            $("#logOutLayer").on("click", function () {
              n.logout();
            });
        },
        error: function () {},
      });
    },
    open: function () {
      (this.isOpen = !0),
        this.status === "notLoaded"
          ? ((this.status = "isLoading"), this.load())
          : this.status === "loaded" && this.$container.tooltip("open");
    },
    close: function () {
      (this.isOpen = !1), this.$container.tooltip("close");
    },
    redirection: function () {
      window.location =
        _LaRedoute.getScreenType() == 1 && _page.isMobileDevice
          ? "/myaccount/myaccount" + _LaRedoute.urlSuffixe
          : this.Page.isSiteUK()
          ? "/myaccount/myaccount" + _LaRedoute.urlSuffixe
          : "/myaccount/ordertracingall" + _LaRedoute.urlSuffixe;
    },
    logout: function () {
      var n = "/logout/logout";
      $.ajax({
        async: !1,
        cache: !1,
        url: n,
        type: "GET",
        success: function () {
          window.location.href = "/login/login" + _LaRedoute.urlSuffixe;
        },
        error: function (n, t, i) {
          console.error(
            "AJAX on " +
              this.url +
              " method " +
              this.type +
              " status " +
              n.status +
              " statusText " +
              n.statusText +
              " error " +
              i +
              " response " +
              n.responseText
          );
        },
      });
    },
  })),
  (function (n, t) {
    "use strict";
    var r = "tooltip-basket",
      i = "empty",
      f = "error",
      e = "isLoading",
      u = "notLoaded",
      o = "loaded",
      s = [i, f, u];
    n.UiBasketLayer = n.UiBloc.extend({
      init: function (f, e) {
        var o = this;
        o._super(f, e),
          (o.isTouch = n.Utils.Common.isTouchDevice()),
          (o.$basketIcon = t("#basketIcon")),
          (o.$basketIconContainer = o.$basketIcon.parent()),
          (o.$container = t("<div />", { class: t.getHeaderTooltipClasses(r) })
            .insertAfter(o.$basketIcon)
            .tooltip()),
          (o.isOpen = !1),
          o.loadBasketLayerXhr,
          (o.status = u);
        o.$basketIconContainer
          .on("click", function () {
            o.status !== i &&
              (o.isOpen
                ? o.isMouseEnter &&
                  (event.preventDefault(), (o.isMouseEnter = !1))
                : (event.preventDefault(), o.open(!0)));
          })
          .on("mouseenter", function (t) {
            (o.shouldBeOpened = !0),
              o.isTouch &&
                (t.preventDefault(),
                (o.isMouseEnter = !0),
                n.setTimeout(function () {
                  o.isMouseEnter = !1;
                }, 10)),
              o.open(!1);
          })
          .on("mouseleave", function () {
            (o.shouldBeOpened = !1),
              o.loadBasketLayerXhr && o.loadBasketLayerXhr.abort(),
              o.close();
          });
      },
      goto: function () {
        n.location = this.$basketIcon.attr("href");
      },
      load: function (u) {
        var s = this,
          h = t.Deferred();
        return (
          s.close(),
          (this.loadBasketLayerXhr = t.ajax({
            url: "/servicecheckoutnosession/loadbasketlayer",
            beforeSend: function () {
              s.status = e;
            },
            success: function (f) {
              var e = f.Html;
              e
                ? (s.$container
                    .empty()
                    .append(e)
                    .find("." + r + "-list")
                    .mCustomScrollbar(
                      t.extend({}, n.Utils.Enum.CustomScrollBar.DefaultParams, {
                        horizontalScroll: !1,
                      })
                    ),
                  (s.shouldBeOpened || s.isTouch) && s.openTooltip(),
                  h.resolve(f),
                  (s.status = o))
                : ((s.status = i), u && s.isTouch && s.goto());
            },
            error: function (n) {
              h.reject(n), (s.status = f);
            },
          })),
          h.promise()
        );
      },
      isStatus: function (n) {
        return this.status === n;
      },
      isEmptyStatus: function () {
        return t.inArray(this.status, s) !== -1;
      },
      isEmpty: function () {
        return this.isStatus(i);
      },
      isLoaded: function () {
        return this.isStatus(o);
      },
      isLoading: function () {
        return this.isStatus(e);
      },
      isNotLoaded: function () {
        return this.isStatus(u);
      },
      isTotalItemsDifferent: function () {
        var n = "." + r + "-item",
          i = 0;
        return (this.$container
          .find("#basketLayer " + n + " " + n + "-feature[data-quantity]")
          .each(function () {
            var r = t(this);
            r.closest(n).find(n + '-image[src*="/gift.png"]').length === 0 &&
              (i += parseInt(r.data("quantity")));
          }),
        i !== parseInt(this.$basketIcon.find(".badge").text()))
          ? !0
          : !1;
      },
      canBeLoaded: function () {
        return this.isTotalItemsDifferent();
      },
      canOpenTooltip: function () {
        return this.isLoaded() && !this.isOpen;
      },
      close: function () {
        this.closeTooltip(), (this.isOpen = !1);
      },
      closeTooltip: function () {
        this.$container.tooltip("close");
      },
      open: function (n) {
        var t = this;
        t.canBeLoaded() ? t.load(n) : t.canOpenTooltip() && t.openTooltip();
      },
      openTooltip: function () {
        this.$container.tooltip("open"), (this.isOpen = !0);
      },
    });
  })(window, window.jQuery),
  (function (n, t) {
    "use strict";
    n.UiHeader = n.UiBloc.extend({
      init: function (i, r) {
        var u = this;
        u._super(i, r);
        var i = u.Page,
          f = u.Model,
          e = n.globalServiceEvent,
          o = t("#lrandmeTooltipButton"),
          l = t("#icon-lrandme"),
          s = t(".tooltip-lrandme"),
          h = s.find(".lr-button"),
          a = t("#isLRandMeContent"),
          v = t("#isNotLRandMeContent"),
          c = function () {
            f.$eventContainer.trigger(e.addLoyaltyToCartRequested, [
              null,
              { fromHeader: !0, componant: "tooltip" },
            ]);
          };
        o.on("click", c);
        f.$eventContainer.on(e.addLoyaltyToCartSucceeded, function (r, u, f) {
          f &&
            f.fromHeader &&
            (h.toggleClass("hidden"),
            n.Utils.StorageManager.EraseStorageValue("CheckAddLoyalty"),
            i.name === n.Utils.Enum.PageName.Basket
              ? (t(".loyalty")
                  .addClass("load-message")
                  .html(t(".loyalty-loading").html()),
                n.location.reload())
              : n._LaRedoute.updateBasketCountItem());
        });
        (u.$lrandmeIcon = t("#icon-lrandme")),
          (u.$lrandmeTooltip = t(".tooltip-lrandme")),
          u.$lrandmeTooltip.addClass(t.getHeaderTooltipClasses()),
          u.$lrandmeTooltip.tooltip(),
          (u.$lrandmeIconContainer = u.$lrandmeIcon.parent());
        this.$lrandmeIconContainer
          .on("mouseenter", function () {
            u.$lrandmeTooltip.tooltip("open");
          })
          .on("mouseleave", function () {
            u.$lrandmeTooltip.tooltip("close");
          });
      },
    });
  })(window, jQuery),
  (function (n, t) {
    "use strict";
    var r = "#newsletterContainer",
      i = ".newsletter-container";
    n.UiNewsletterLayer = UiBloc.extend({
      init: function (i, r) {
        var u = this;
        if (
          (u._super(i, r),
          (u.isTouch = n.Utils.Common.isTouchDevice()),
          (u.hasFooterContent = !0),
          (u.$newslettertIcon = t("#iconNewsletter")),
          (u.$newslettertIconContainer = u.$newslettertIcon.parent()),
          (u.$container = t("<div>", {
            class: t.getHeaderTooltipClasses("tooltip-newsletter"),
          })
            .insertAfter(u.$newslettertIcon)
            .tooltip()),
          (u.isOpen = !1),
          u.isTouch)
        )
          u.$newslettertIcon.on("click", function (n) {
            u.isMouseEnter
              ? (n.preventDefault(), (u.isMouseEnter = !1))
              : u.isOpen === !1 && (n.preventDefault(), u.open());
          });
        u.$newslettertIconContainer
          .on("mouseenter", function () {
            u.isTouch &&
              ((u.isMouseEnter = !0),
              setTimeout(function () {
                u.isMouseEnter = !1;
              }, 10)),
              u.open();
          })
          .on("mouseleave", function () {
            u.close();
          });
      },
      open: function () {
        (this.isOpen = !0),
          this.moveIn(),
          this.hasFooterContent && this.$container.tooltip("open");
      },
      close: function () {
        (this.isOpen = !1), this.moveOut(), this.$container.tooltip("close");
      },
      moveIn: function () {
        var n = this,
          u = t("#footerExpandServices"),
          r;
        if (u.length > 0) {
          u.click();
          t("#footer").on("footer.expanded", function () {
            var r = t(this).find(i);
            r.length > 0 ? r.appendTo(n.$container) : (n.hasFooterContent = !1);
          });
        } else
          (r = t("#footer").find(i)),
            r.length > 0 ? r.appendTo(n.$container) : (n.hasFooterContent = !1);
      },
      moveOut: function () {
        t("#header").find(i).appendTo(t(r));
      },
    });
  })(window, window.jQuery),
  (UiWishlistLayer = UiBloc.extend({
    init: function (n, t) {
      var i, r;
      if (
        (this._super(n, t),
        (i = this),
        (this.isTouch = Utils.Common.isTouchDevice()),
        (this.$wishlistIcon = $("#IconWishlist")),
        (this.$wishlistIconContainer = this.$wishlistIcon.parent()),
        (this.$container = $("<div>", {
          class: $.getHeaderTooltipClasses("tooltip-wishlist"),
        })
          .insertAfter(this.$wishlistIcon)
          .tooltip()),
        (r = $("#msgTooltip").text()),
        (this.isOpen = !1),
        this.$container.append('<div class="text-left">' + r + "</div>"),
        this.isTouch)
      )
        this.$wishlistIcon.on("click", function (n) {
          i.isMouseEnter
            ? (n.preventDefault(), (i.isMouseEnter = !1))
            : i.isOpen === !1 && (n.preventDefault(), i.open());
        });
      this.$wishlistIconContainer
        .on("mouseenter", function () {
          i.isTouch &&
            ((i.isMouseEnter = !0),
            setTimeout(function () {
              i.isMouseEnter = !1;
            }, 10)),
            i.open();
        })
        .on("mouseleave", function () {
          i.close();
        });
    },
    open: function () {
      (this.isOpen = !0), this.$container.tooltip("open");
    },
    close: function () {
      (this.isOpen = !1), this.$container.tooltip("close");
    },
  }));
