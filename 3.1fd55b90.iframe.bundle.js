(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "f8ca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "refreshFeatureFlags", function() { return /* binding */ refreshFeatureFlags; });

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/managers/braze-instance.js + 12 modules
var braze_instance = __webpack_require__("b121");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/shared-lib/braze-shared-lib.js + 6 modules
var braze_shared_lib = __webpack_require__("8106");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/common/base-provider.js
var base_provider = __webpack_require__("8bff");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/managers/storage-manager.js
var storage_manager = __webpack_require__("782f");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/managers/subscription-manager.js
var subscription_manager = __webpack_require__("b3d0");

// EXTERNAL MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/util/net.js
var net = __webpack_require__("e574");

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/FeatureFlags/feature-flag.js
class ee {
  constructor(t, s = !1, i = {}) {
    (this.id = t), (this.enabled = s), (this.properties = i);
  }
  ss() {
    const t = {};
    return (
      (t[ee.hs.ns] = this.id),
      (t[ee.hs.Fe] = this.enabled),
      (t[ee.hs.we] = this.properties),
      t
    );
  }
}
(ee.hs = { ns: "id", Fe: "e", we: "pr" }),
  (ee.At = { ns: "id", Fe: "enabled", we: "properties" });

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/FeatureFlags/feature-flag-factory.js


function newFeatureFlagFromJson(e) {
  if (e[ee.At.ns] && "boolean" == typeof e[ee.At.Fe])
    return new ee(e[ee.At.ns], e[ee.At.Fe], e[ee.At.we]);
  braze_shared_lib["a" /* default */].D.info(`Unable to create feature flag from ${JSON.stringify(e, null, 2)}`);
}
function newFeatureFlagFromSerializedValue(e) {
  if (e[ee.hs.ns] && "boolean" == typeof e[ee.hs.Fe])
    return new ee(e[ee.hs.ns], e[ee.hs.Fe], e[ee.hs.we]);
  braze_shared_lib["a" /* default */].D.info(
    `Unable to deserialize feature flag from ${JSON.stringify(e, null, 2)}`
  );
}

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/FeatureFlags/feature-flags-provider.js







class feature_flags_provider_er extends base_provider["a" /* default */] {
  constructor(t, s, r) {
    super(),
      (this.gt = t),
      (this.vt = s),
      (this.h = r),
      (this.he = new subscription_manager["a" /* default */]()),
      braze_instance["b" /* default */].jt(this.he);
  }
  Rs(t) {
    if (this.gt.ye() && null != t && t.feature_flags) {
      this.De = [];
      for (const e of t.feature_flags) {
        let t = newFeatureFlagFromJson(e);
        t && this.De.push(t);
      }
      (this.Ne = new Date().getTime()), this._e(), this.he.St(this.De);
    }
  }
  xe() {
    const t = this.h.I(storage_manager["a" /* STORAGE_KEYS */].q.ze) || {};
    let e = {};
    for (let s in t) {
      let r = newFeatureFlagFromSerializedValue(t[s]);
      r && (e[r.id] = r);
    }
    return e;
  }
  Ws(t) {
    return this.he.ut(t);
  }
  refreshFeatureFlags(t, e, s) {
    if (!this.Re(s))
      return void (
        this.Se ||
        (this.Se = this.gt.Te(() => {
          this.refreshFeatureFlags(t, e);
        }))
      );
    const r = this.vt.Ps({}, !0),
      i = this.vt.Bs(r, !1, !0);
    this.vt.Gs(r, () => {
      net["a" /* default */].Hs({
        url: `${this.vt.Ks()}/feature_flags/sync`,
        headers: i,
        data: r,
        S: s => {
          this.vt.Os(r, s)
            ? (this.vt.Qs(), this.Rs(s), "function" == typeof t && t())
            : "function" == typeof e && e();
        },
        error: t => {
          this.vt.Vs(t, "retrieving feature flags"),
            "function" == typeof e && e();
        }
      });
    });
  }
  Re(t) {
    if (!t) {
      const t = parseFloat(this.gt.$e());
      let e = !1;
      if (!isNaN(t)) {
        if (-1 === t) return braze_shared_lib["a" /* default */].D.info("Feature flag refreshes not allowed"), !1;
        e = new Date().getTime() >= (this.Ne || 0) + 1e3 * t;
      }
      if (!e)
        return (
          braze_shared_lib["a" /* default */].D.info(`Feature flag refreshes were rate limited to ${t} seconds`),
          !1
        );
    }
    return this.gt.ye();
  }
  _e() {
    const t = {};
    for (let e = 0; e < this.De.length; e++) {
      let s = this.De[e],
        r = s.ss();
      t[s.id] = r;
    }
    this.h.B(storage_manager["a" /* STORAGE_KEYS */].q.ze, t), this.h.B(storage_manager["a" /* STORAGE_KEYS */].q.qe, this.Ne);
  }
}

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/FeatureFlags/feature-flags-provider-factory.js


const ir = {
  t: !1,
  provider: null,
  er: () => (
    ir.o(),
    ir.provider ||
      ((ir.provider = new feature_flags_provider_er(braze_instance["b" /* default */].ir(), braze_instance["b" /* default */].nr(), braze_instance["b" /* default */].l())), braze_instance["b" /* default */].ar(ir.provider)),
    ir.provider
  ),
  o: () => {
    ir.t || (braze_instance["b" /* default */].u(ir), (ir.t = !0));
  },
  destroy: () => {
    (ir.provider = null), (ir.t = !1);
  }
};
/* harmony default export */ var feature_flags_provider_factory = (ir);

// CONCATENATED MODULE: /home/runner/work/fozzie-components/fozzie-components/node_modules/@braze/web-sdk/src/FeatureFlags/refresh-feature-flags.js


function tr(r, t, a) {
  if (braze_instance["b" /* default */].rr()) return feature_flags_provider_factory.er().refreshFeatureFlags(r, t, a);
}
function refreshFeatureFlags(r, e) {
  tr(r, e);
}
/* harmony default export */ var refresh_feature_flags = __webpack_exports__["default"] = (tr);


/***/ })

}]);
//# sourceMappingURL=3.1fd55b90.iframe.bundle.js.map