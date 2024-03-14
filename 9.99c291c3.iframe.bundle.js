(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "e0ec5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/managers/braze-instance.js + 12 modules
var braze_instance = __webpack_require__("b121");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/util/code-utils.js
var code_utils = __webpack_require__("7ac0");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/models/push-token.js
var push_token = __webpack_require__("51c8");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/shared-lib/braze-shared-lib.js + 6 modules
var braze_shared_lib = __webpack_require__("8106");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/managers/storage-manager.js
var storage_manager = __webpack_require__("782f");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/User/user.js
var user = __webpack_require__("4f81");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/util/window-utils.js
var window_utils = __webpack_require__("f9b4f");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/Push/utils/push-utils.js
var push_utils = __webpack_require__("0c3b");

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/Push/push-manager.js







class push_manager_aa {
  constructor(i, e, t, s, r, n, o, u, a, h) {
    (this.Sr = i),
      (this._r = e),
      (this.Ur = t),
      (this.Wr = s + "/safari/" + e),
      (this.Nr = r || "/service-worker.js"),
      (this.Ir = n),
      (this.gt = o),
      (this.Vr = u || !1),
      (this.Er = a || !1),
      (this.h = h),
      (this.Or = push_utils["a" /* default */].Br()),
      (this.Mr = push_utils["a" /* default */].Yr());
  }
  Gr() {
    return this.Er;
  }
  Hr(i, e, t, s, n) {
    i.unsubscribe()
      .then(i => {
        i
          ? this.Jr(e, t, s, n)
          : (braze_shared_lib["a" /* default */].D.error("Failed to unsubscribe device from push."),
            "function" == typeof n && n(!1));
      })
      .catch(i => {
        braze_shared_lib["a" /* default */].D.error("Push unsubscription error: " + i),
          "function" == typeof n && n(!1);
      });
  }
  Kr(i, e, t) {
    const s = (i => {
      if ("string" == typeof i) return i;
      if (0 !== i.endpoint.indexOf("https://android.googleapis.com/gcm/send"))
        return i.endpoint;
      let e = i.endpoint;
      return (
        i.Lr &&
          -1 === i.endpoint.indexOf(i.Lr) &&
          (e = i.endpoint + "/" + i.Lr),
        e
      );
    })(i);
    let r = null,
      n = null;
    if (null != i.getKey)
      try {
        (r = btoa(
          String.fromCharCode.apply(null, new Uint8Array(i.getKey("p256dh")))
        )),
          (n = btoa(
            String.fromCharCode.apply(null, new Uint8Array(i.getKey("auth")))
          ));
      } catch (i) {
        if ("invalid arguments" !== i.message) throw i;
      }
    const o = (i => {
      let e;
      return i.options &&
        (e = i.options.applicationServerKey) &&
        e.byteLength &&
        e.byteLength > 0
        ? btoa(String.fromCharCode.apply(null, new Uint8Array(e)))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
        : null;
    })(i);
    this.Sr.Qr(s, t, r, n, o), s && "function" == typeof e && e(s, r, n);
  }
  Xr() {
    this.Sr.Zr(!0);
  }
  hn(i, e) {
    this.Sr.Zr(!1), braze_shared_lib["a" /* default */].D.info(i), "function" == typeof e && e(!1);
  }
  fn(i, e, t, s) {
    if ("default" === e.permission)
      try {
        window.safari.pushNotification.requestPermission(
          this.Wr,
          i,
          { api_key: this._r, device_id: this.Ur.te().id },
          e => {
            "granted" === e.permission &&
              this.Sr.setPushNotificationSubscriptionType(
                user["a" /* default */].NotificationSubscriptionTypes.OPTED_IN
              ),
              this.fn(i, e, t, s);
          }
        );
      } catch (i) {
        this.hn("Could not request permission for push: " + i, s);
      }
    else
      "denied" === e.permission
        ? this.hn(
            "The user has blocked notifications from this site, or Safari push is not configured in the Braze dashboard.",
            s
          )
        : "granted" === e.permission &&
          (braze_shared_lib["a" /* default */].D.info("Device successfully subscribed to push."),
          this.Kr(e.deviceToken, t, new Date()));
  }
  dn(i, e, t) {
    const s = s => {
      switch (s) {
        case "granted":
          return void ("function" == typeof i && i());
        case "default":
          return void ("function" == typeof e && e());
        case "denied":
          return void ("function" == typeof t && t());
        default:
          braze_shared_lib["a" /* default */].D.error("Received unexpected permission result " + s);
      }
    };
    let n = !1;
    const o = window.Notification.requestPermission(i => {
      n && s(i);
    });
    o
      ? o.then(i => {
          s(i);
        })
      : (n = !0);
  }
  Jr(i, e, t, s) {
    const n = { userVisibleOnly: !0 };
    null != e && (n.applicationServerKey = e),
      i.pushManager
        .subscribe(n)
        .then(i => {
          braze_shared_lib["a" /* default */].D.info("Device successfully subscribed to push."),
            this.Kr(i, t, new Date());
        })
        .catch(i => {
          push_utils["a" /* default */].isPushBlocked()
            ? (braze_shared_lib["a" /* default */].D.info("Permission for push notifications was denied."),
              "function" == typeof s && s(!1))
            : braze_shared_lib["a" /* default */].D.error("Push subscription failed: " + i);
        });
  }
  pn() {
    return this.Vr
      ? navigator.serviceWorker.getRegistration()
      : navigator.serviceWorker.register(this.Nr).then(() =>
          navigator.serviceWorker.ready.then(
            i => (
              i &&
                "function" == typeof i.update &&
                i.update().catch(i => {
                  braze_shared_lib["a" /* default */].D.info("ServiceWorker update failed: " + i);
                }),
              i
            )
          )
        );
  }
  bn(i) {
    this.Vr ||
      (i.unregister(), braze_shared_lib["a" /* default */].D.info("Service worker successfully unregistered."));
  }
  subscribe(i, e) {
    if (push_utils["a" /* default */].isPushSupported()) {
      if (this.Or) {
        if (!this.Vr && null != window.location) {
          let i = this.Nr;
          -1 === i.indexOf(window.location.host) &&
            (i = window.location.host + i),
            -1 === i.indexOf(window.location.protocol) &&
              (i = window.location.protocol + "//" + i);
          const e = i.substr(0, i.lastIndexOf("/") + 1);
          if (0 !== window_utils["a" /* WindowUtils */].gn().indexOf(e))
            return void braze_shared_lib["a" /* default */].D.error(
              "Cannot subscribe to push from a path higher than the service worker location (tried to subscribe from " +
                window.location.pathname +
                " but service worker is at " +
                i +
                ")"
            );
        }
        if (push_utils["a" /* default */].isPushBlocked())
          return void this.hn(
            "Notifications from this site are blocked. This may be a temporary embargo or a permanent denial.",
            e
          );
        if (this.gt && !this.gt.wn() && 0 === this.gt.Zs())
          return (
            braze_shared_lib["a" /* default */].D.info(
              "Waiting for VAPID key from server config before subscribing to push."
            ),
            void this.gt.yn(() => {
              this.subscribe(i, e);
            })
          );
        const t = () => {
            braze_shared_lib["a" /* default */].D.info("Permission for push notifications was denied."),
              "function" == typeof e && e(!1);
          },
          s = () => {
            let i = "Permission for push notifications was ignored.";
            push_utils["a" /* default */].isPushBlocked() &&
              (i +=
                " The browser has automatically blocked further permission requests for a period (probably 1 week)."),
              braze_shared_lib["a" /* default */].D.info(i),
              "function" == typeof e && e(!0);
          },
          n = push_utils["a" /* default */].isPushPermissionGranted(),
          u = () => {
            n ||
              this.Sr.setPushNotificationSubscriptionType(
                user["a" /* default */].NotificationSubscriptionTypes.OPTED_IN
              ),
              this.pn()
                .then(t => {
                  if (null == t)
                    return (
                      braze_shared_lib["a" /* default */].D.error(
                        "No service worker registration. Set the `manageServiceWorkerExternally` initialization option to false or ensure that your service worker is registered before calling registerPush."
                      ),
                      void ("function" == typeof e && e())
                    );
                  t.pushManager
                    .getSubscription()
                    .then(s => {
                      let n = null;
                      if (
                        (this.gt &&
                          null != this.gt.wn() &&
                          (n = braze_shared_lib["a" /* default */].kn.vn(this.gt.wn())),
                        s)
                      ) {
                        let u = null,
                          a = null;
                        const h = this.h.I(storage_manager["a" /* STORAGE_KEYS */].q.Pn);
                        if (h && !Object(code_utils["a" /* isArray */])(h)) {
                          let i;
                          try {
                            i = push_token["a" /* default */].Sn(h).Dn;
                          } catch (e) {
                            i = null;
                          }
                          null == i ||
                            isNaN(i.getTime()) ||
                            0 === i.getTime() ||
                            ((u = i),
                            (a = new Date(u)),
                            a.setMonth(u.getMonth() + 6));
                        }
                        null != n &&
                        s.options &&
                        s.options.applicationServerKey &&
                        s.options.applicationServerKey.byteLength &&
                        s.options.applicationServerKey.byteLength > 0 &&
                        !Object(code_utils["c" /* isEqual */])(n, new Uint8Array(s.options.applicationServerKey))
                          ? (s.options.applicationServerKey.byteLength > 12
                              ? braze_shared_lib["a" /* default */].D.info(
                                  "Device was already subscribed to push using a different VAPID provider, creating new subscription."
                                )
                              : braze_shared_lib["a" /* default */].D.info(
                                  "Attempting to upgrade a gcm_sender_id-based push registration to VAPID - depending on the browser this may or may not result in the same gcm_sender_id-based subscription."
                                ),
                            this.Hr(s, t, n, i, e))
                          : s.expirationTime &&
                            new Date(s.expirationTime) <= new Date().valueOf()
                          ? (braze_shared_lib["a" /* default */].D.info(
                              "Push subscription is expired, creating new subscription."
                            ),
                            this.Hr(s, t, n, i, e))
                          : h && Object(code_utils["a" /* isArray */])(h)
                          ? this.Hr(s, t, n, i, e)
                          : null == a
                          ? (braze_shared_lib["a" /* default */].D.info(
                              "No push subscription creation date found, creating new subscription."
                            ),
                            this.Hr(s, t, n, i, e))
                          : a <= new Date().valueOf()
                          ? (braze_shared_lib["a" /* default */].D.info(
                              "Push subscription older than 6 months, creating new subscription."
                            ),
                            this.Hr(s, t, n, i, e))
                          : (braze_shared_lib["a" /* default */].D.info(
                              "Device already subscribed to push, sending existing subscription to backend."
                            ),
                            this.Kr(s, i, u));
                      } else this.Jr(t, n, i, e);
                    })
                    .catch(i => {
                      braze_shared_lib["a" /* default */].D.error(
                        "Error checking current push subscriptions: " + i
                      );
                    });
                })
                .catch(i => {
                  braze_shared_lib["a" /* default */].D.error("ServiceWorker registration failed: " + i);
                });
          };
        this.dn(u, s, t);
      } else if (this.Mr) {
        if (null == this.Ir || "" === this.Ir)
          return void braze_shared_lib["a" /* default */].D.error(
            "You must supply the safariWebsitePushId initialization option in order to use registerPush on Safari"
          );
        const t = window.safari.pushNotification.permission(this.Ir);
        this.fn(this.Ir, t, i, e);
      }
    } else braze_shared_lib["a" /* default */].D.info(this._n);
  }
  unsubscribe(i, e) {
    push_utils["a" /* default */].isPushSupported()
      ? this.Or
        ? navigator.serviceWorker.getRegistration().then(t => {
            t
              ? t.pushManager
                  .getSubscription()
                  .then(s => {
                    s &&
                      (this.Xr(),
                      s
                        .unsubscribe()
                        .then(s => {
                          s
                            ? (braze_shared_lib["a" /* default */].D.info(
                                "Device successfully unsubscribed from push."
                              ),
                              "function" == typeof i && i())
                            : (braze_shared_lib["a" /* default */].D.error(
                                "Failed to unsubscribe device from push."
                              ),
                              "function" == typeof e && e()),
                            this.bn(t);
                        })
                        .catch(i => {
                          braze_shared_lib["a" /* default */].D.error("Push unsubscription error: " + i),
                            "function" == typeof e && e();
                        }));
                  })
                  .catch(i => {
                    braze_shared_lib["a" /* default */].D.error("Error unsubscribing from push: " + i),
                      "function" == typeof e && e();
                  })
              : (braze_shared_lib["a" /* default */].D.info("Device already unsubscribed from push."),
                "function" == typeof i && i());
          })
        : this.Mr &&
          (this.Xr(),
          braze_shared_lib["a" /* default */].D.info("Device unsubscribed from push."),
          "function" == typeof i && i())
      : braze_shared_lib["a" /* default */].D.info(this._n);
  }
}
push_manager_aa._n = "Push notifications are not supported in this browser.";

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/Push/push-manager-factory.js


const ea = {
  t: !1,
  pushManager: null,
  aa: () => (
    ea.o(),
    ea.pushManager ||
      (ea.pushManager = new push_manager_aa(
        braze_instance["b" /* default */].gr(),
        braze_instance["b" /* default */].ea(),
        braze_instance["b" /* default */].ce(),
        braze_instance["b" /* default */].Ks(),
        braze_instance["b" /* default */].nn(braze_instance["a" /* OPTIONS */].na),
        braze_instance["b" /* default */].nn(braze_instance["a" /* OPTIONS */].ra),
        braze_instance["b" /* default */].ir(),
        braze_instance["b" /* default */].nn(braze_instance["a" /* OPTIONS */].ta),
        braze_instance["b" /* default */].nn(braze_instance["a" /* OPTIONS */].ia),
        braze_instance["b" /* default */].l()
      )),
    ea.pushManager
  ),
  o: () => {
    ea.t || (braze_instance["b" /* default */].u(ea), (ea.t = !0));
  },
  destroy: () => {
    (ea.pushManager = null), (ea.t = !1);
  }
};
/* harmony default export */ var push_manager_factory = __webpack_exports__["default"] = (ea);


/***/ })

}]);
//# sourceMappingURL=9.99c291c3.iframe.bundle.js.map