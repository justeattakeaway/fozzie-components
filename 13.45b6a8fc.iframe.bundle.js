(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "99fb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/managers/braze-instance.js + 12 modules
var braze_instance = __webpack_require__("8a19");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/util/code-utils.js
var code_utils = __webpack_require__("0cce");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/models/push-token.js
var push_token = __webpack_require__("3a11");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/shared-lib/braze-shared-lib.js + 6 modules
var braze_shared_lib = __webpack_require__("728c");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/managers/storage-manager.js
var storage_manager = __webpack_require__("ecfe");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/User/user.js
var user = __webpack_require__("3989");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/util/window-utils.js
var window_utils = __webpack_require__("9d3f");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/Push/utils/push-utils.js
var push_utils = __webpack_require__("abbc");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/util/error-utils.js
var error_utils = __webpack_require__("8172");

// CONCATENATED MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/Push/push-manager.js








class push_manager_ea {
  constructor(i, t, e, s, r, n, o, u, h, a) {
    (this.hn = i),
      (this.cn = t),
      (this.fn = e),
      (this.dn = r),
      (this.bn = n),
      (this.wt = o),
      (this.yn = u),
      (this.gn = h),
      (this.u = a),
      (this.hn = i),
      (this.cn = t),
      (this.fn = e),
      (this.wn = s + "/safari/" + t),
      (this.dn = r || "/service-worker.js"),
      (this.bn = n),
      (this.wt = o),
      (this.yn = u || !1),
      (this.gn = h || !1),
      (this.u = a),
      (this.vn = push_utils["a" /* default */].kn()),
      (this.Pn = push_utils["a" /* default */].Dn());
  }
  Sn() {
    return this.gn;
  }
  An(i, t, e, s, n) {
    i.unsubscribe()
      .then((i) => {
        i
          ? this.jn(t, e, s, n)
          : (braze_shared_lib["a" /* default */].j.error("Failed to unsubscribe device from push."),
            "function" == typeof n && n(!1));
      })
      .catch((i) => {
        braze_shared_lib["a" /* default */].j.error("Push unsubscription error: " + i),
          "function" == typeof n && n(!1);
      });
  }
  Un(i, t, e) {
    const s = ((i) => {
      if ("string" == typeof i) return i;
      if (0 !== i.endpoint.indexOf("https://android.googleapis.com/gcm/send"))
        return i.endpoint;
      let t = i.endpoint;
      const e = i;
      return (
        e.Wn &&
          -1 === i.endpoint.indexOf(e.Wn) &&
          (t = i.endpoint + "/" + e.Wn),
        t
      );
    })(i);
    let r = null,
      n = null;
    const o = i;
    if (null != o.getKey)
      try {
        const i = Array.from(new Uint8Array(o.getKey("p256dh"))),
          t = Array.from(new Uint8Array(o.getKey("auth")));
        (r = btoa(String.fromCharCode.apply(null, i))),
          (n = btoa(String.fromCharCode.apply(null, t)));
      } catch (i) {
        if ("invalid arguments" !== Object(error_utils["a" /* getErrorMessage */])(i)) throw i;
      }
    const u = ((i) => {
      let t;
      return i.options &&
        (t = i.options.applicationServerKey) &&
        t.byteLength &&
        t.byteLength > 0
        ? btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(t))))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
        : null;
    })(o);
    this.hn && this.hn._n(s, t, r, n, u),
      s && "function" == typeof e && e(s, r, n);
  }
  xn() {
    this.hn && this.hn.Nn(!0);
  }
  Tn(i, t) {
    this.hn && this.hn.Nn(!1), braze_shared_lib["a" /* default */].j.info(i), "function" == typeof t && t(!1);
  }
  zn(i, t, e, s) {
    var n;
    if ("default" === t.permission)
      try {
        window.safari.pushNotification.requestPermission(
          this.wn,
          i,
          {
            api_key: this.cn,
            device_id:
              (null === (n = this.fn) || void 0 === n ? void 0 : n.ce().id) ||
              "",
          },
          (t) => {
            "granted" === t.permission &&
              this.hn &&
              this.hn.setPushNotificationSubscriptionType(
                user["a" /* default */].NotificationSubscriptionTypes.OPTED_IN,
              ),
              this.zn(i, t, e, s);
          },
        );
      } catch (i) {
        this.Tn("Could not request permission for push: " + i, s);
      }
    else
      "denied" === t.permission
        ? this.Tn(
            "The user has blocked notifications from this site, or Safari push is not configured in the Braze dashboard.",
            s,
          )
        : "granted" === t.permission &&
          (braze_shared_lib["a" /* default */].j.info("Device successfully subscribed to push."),
          this.Un(t.deviceToken, new Date(), e));
  }
  requestPermission(i, t, e) {
    const s = (s) => {
      switch (s) {
        case "granted":
          return void ("function" == typeof i && i());
        case "default":
          return void ("function" == typeof t && t());
        case "denied":
          return void ("function" == typeof e && e());
        default:
          braze_shared_lib["a" /* default */].j.error("Received unexpected permission result " + s);
      }
    };
    let n = !1;
    const o = window.Notification.requestPermission((i) => {
      n && s(i);
    });
    o
      ? o.then((i) => {
          s(i);
        })
      : (n = !0);
  }
  jn(i, t, e, s) {
    const n = { userVisibleOnly: !0 };
    null != t && (n.applicationServerKey = t),
      i.pushManager
        .subscribe(n)
        .then((i) => {
          braze_shared_lib["a" /* default */].j.info("Device successfully subscribed to push."),
            this.Un(i, new Date(), e);
        })
        .catch((i) => {
          push_utils["a" /* default */].isPushBlocked()
            ? (braze_shared_lib["a" /* default */].j.info("Permission for push notifications was denied."),
              "function" == typeof s && s(!1))
            : (braze_shared_lib["a" /* default */].j.error("Push subscription failed: " + i),
              "function" == typeof s && s(!0));
        });
  }
  In() {
    return this.yn
      ? navigator.serviceWorker.getRegistration(this.dn)
      : navigator.serviceWorker.register(this.dn).then(() =>
          navigator.serviceWorker.ready.then(
            (i) => (
              i &&
                "function" == typeof i.update &&
                i.update().catch((i) => {
                  braze_shared_lib["a" /* default */].j.info("ServiceWorker update failed: " + i);
                }),
              i
            ),
          ),
        );
  }
  Vn(i) {
    this.yn ||
      (i.unregister(), braze_shared_lib["a" /* default */].j.info("Service worker successfully unregistered."));
  }
  subscribe(t, e) {
    if (!push_utils["a" /* default */].isPushSupported())
      return braze_shared_lib["a" /* default */].j.info(push_manager_ea.qn), void ("function" == typeof e && e(!1));
    if (this.vn) {
      if (!this.yn && null != window.location) {
        let i = this.dn;
        -1 === i.indexOf(window.location.host) &&
          (i = window.location.host + i),
          -1 === i.indexOf(window.location.protocol) &&
            (i = window.location.protocol + "//" + i);
        const t = i.substr(0, i.lastIndexOf("/") + 1);
        if (0 !== window_utils["a" /* WindowUtils */].Cn().indexOf(t))
          return (
            braze_shared_lib["a" /* default */].j.error(
              "Cannot subscribe to push from a path higher than the service worker location (tried to subscribe from " +
                window.location.pathname +
                " but service worker is at " +
                i +
                ")",
            ),
            void ("function" == typeof e && e(!0))
          );
      }
      if (push_utils["a" /* default */].isPushBlocked())
        return void this.Tn(
          "Notifications from this site are blocked. This may be a temporary embargo or a permanent denial.",
          e,
        );
      if (this.wt && !this.wt.En() && 0 === this.wt.li())
        return (
          braze_shared_lib["a" /* default */].j.info(
            "Waiting for VAPID key from server config before subscribing to push.",
          ),
          void this.wt.Rn(() => {
            this.subscribe(t, e);
          })
        );
      const s = () => {
          braze_shared_lib["a" /* default */].j.info("Permission for push notifications was denied."),
            "function" == typeof e && e(!1);
        },
        n = () => {
          let i = "Permission for push notifications was ignored.";
          push_utils["a" /* default */].isPushBlocked() &&
            (i +=
              " The browser has automatically blocked further permission requests for a period (probably 1 week)."),
            braze_shared_lib["a" /* default */].j.info(i),
            "function" == typeof e && e(!0);
        },
        o = push_utils["a" /* default */].isPushPermissionGranted(),
        u = () => {
          !o &&
            this.hn &&
            this.hn.setPushNotificationSubscriptionType(
              user["a" /* default */].NotificationSubscriptionTypes.OPTED_IN,
            ),
            this.In()
              .then((s) => {
                if (null == s)
                  return (
                    braze_shared_lib["a" /* default */].j.error(
                      "No service worker registration. Set the `manageServiceWorkerExternally` initialization option to false or ensure that your service worker is registered before calling registerPush.",
                    ),
                    void ("function" == typeof e && e(!0))
                  );
                s.pushManager
                  .getSubscription()
                  .then((n) => {
                    let o = null;
                    if (
                      (this.wt &&
                        null != this.wt.En() &&
                        (o = braze_shared_lib["a" /* default */].On.Fn(this.wt.En())),
                      n)
                    ) {
                      let u,
                        h = null,
                        a = null;
                      if ((this.u && (u = this.u.v(storage_manager["a" /* STORAGE_KEYS */].k.Bn)), u && !Object(code_utils["a" /* isArray */])(u))) {
                        let i;
                        try {
                          i = push_token["a" /* default */].Yn(u).Mn;
                        } catch (t) {
                          i = null;
                        }
                        null == i ||
                          isNaN(i.getTime()) ||
                          0 === i.getTime() ||
                          ((h = i),
                          (a = new Date(h)),
                          a.setMonth(h.getMonth() + 6));
                      }
                      null != o &&
                      n.options &&
                      n.options.applicationServerKey &&
                      n.options.applicationServerKey.byteLength &&
                      n.options.applicationServerKey.byteLength > 0 &&
                      !Object(code_utils["c" /* isEqual */])(o, new Uint8Array(n.options.applicationServerKey))
                        ? (n.options.applicationServerKey.byteLength > 12
                            ? braze_shared_lib["a" /* default */].j.info(
                                "Device was already subscribed to push using a different VAPID provider, creating new subscription.",
                              )
                            : braze_shared_lib["a" /* default */].j.info(
                                "Attempting to upgrade a gcm_sender_id-based push registration to VAPID - depending on the browser this may or may not result in the same gcm_sender_id-based subscription.",
                              ),
                          this.An(n, s, o, t, e))
                        : n.expirationTime &&
                          new Date(n.expirationTime).valueOf() <=
                            new Date().valueOf()
                        ? (braze_shared_lib["a" /* default */].j.info(
                            "Push subscription is expired, creating new subscription.",
                          ),
                          this.An(n, s, o, t, e))
                        : u && Object(code_utils["a" /* isArray */])(u)
                        ? this.An(n, s, o, t, e)
                        : null == a
                        ? (braze_shared_lib["a" /* default */].j.info(
                            "No push subscription creation date found, creating new subscription.",
                          ),
                          this.An(n, s, o, t, e))
                        : a.valueOf() <= new Date().valueOf()
                        ? (braze_shared_lib["a" /* default */].j.info(
                            "Push subscription older than 6 months, creating new subscription.",
                          ),
                          this.An(n, s, o, t, e))
                        : (braze_shared_lib["a" /* default */].j.info(
                            "Device already subscribed to push, sending existing subscription to backend.",
                          ),
                          this.Un(n, h, t));
                    } else this.jn(s, o, t, e);
                  })
                  .catch((i) => {
                    braze_shared_lib["a" /* default */].j.error(
                      "Error checking current push subscriptions: " + i,
                    );
                  });
              })
              .catch((i) => {
                braze_shared_lib["a" /* default */].j.error("ServiceWorker registration failed: " + i);
              });
        };
      this.requestPermission(u, n, s);
    } else if (this.Pn) {
      if (null == this.bn || "" === this.bn)
        return (
          braze_shared_lib["a" /* default */].j.error(
            "You must supply the safariWebsitePushId initialization option in order to use registerPush on Safari",
          ),
          void ("function" == typeof e && e(!0))
        );
      const i = window.safari.pushNotification.permission(this.bn);
      this.zn(this.bn, i, t, e);
    }
  }
  unsubscribe(i, t) {
    if (!push_utils["a" /* default */].isPushSupported())
      return braze_shared_lib["a" /* default */].j.info(push_manager_ea.qn), void ("function" == typeof t && t());
    this.vn
      ? navigator.serviceWorker.getRegistration().then((e) => {
          e
            ? e.pushManager
                .getSubscription()
                .then((s) => {
                  s &&
                    (this.xn(),
                    s
                      .unsubscribe()
                      .then((s) => {
                        s
                          ? (braze_shared_lib["a" /* default */].j.info(
                              "Device successfully unsubscribed from push.",
                            ),
                            "function" == typeof i && i())
                          : (braze_shared_lib["a" /* default */].j.error(
                              "Failed to unsubscribe device from push.",
                            ),
                            "function" == typeof t && t()),
                          this.Vn(e);
                      })
                      .catch((i) => {
                        braze_shared_lib["a" /* default */].j.error("Push unsubscription error: " + i),
                          "function" == typeof t && t();
                      }));
                })
                .catch((i) => {
                  braze_shared_lib["a" /* default */].j.error("Error unsubscribing from push: " + i),
                    "function" == typeof t && t();
                })
            : (braze_shared_lib["a" /* default */].j.info("Device already unsubscribed from push."),
              "function" == typeof i && i());
        })
      : this.Pn &&
        (this.xn(),
        braze_shared_lib["a" /* default */].j.info("Device unsubscribed from push."),
        "function" == typeof i && i());
  }
}
push_manager_ea.qn = "Push notifications are not supported in this browser.";

// CONCATENATED MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/Push/push-manager-factory.js


const na = {
  t: !1,
  i: null,
  m: () => (
    na.o(),
    na.i ||
      (na.i = new push_manager_ea(
        braze_instance["b" /* default */].br(),
        braze_instance["b" /* default */].Ma(),
        braze_instance["b" /* default */].te(),
        braze_instance["b" /* default */].Ys(),
        braze_instance["b" /* default */].nn(braze_instance["a" /* OPTIONS */]._a),
        braze_instance["b" /* default */].nn(braze_instance["a" /* OPTIONS */].ka),
        braze_instance["b" /* default */].tr(),
        braze_instance["b" /* default */].nn(braze_instance["a" /* OPTIONS */].qa),
        braze_instance["b" /* default */].nn(braze_instance["a" /* OPTIONS */].Aa),
        braze_instance["b" /* default */].l(),
      )),
    na.i
  ),
  o: () => {
    na.t || (braze_instance["b" /* default */].g(na), (na.t = !0));
  },
  destroy: () => {
    (na.i = null), (na.t = !1);
  },
};
/* harmony default export */ var push_manager_factory = __webpack_exports__["default"] = (na);


/***/ })

}]);
//# sourceMappingURL=13.45b6a8fc.iframe.bundle.js.map