(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "0545":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "refreshFeatureFlags", function() { return /* binding */ refreshFeatureFlags; });

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/managers/braze-instance.js + 12 modules
var braze_instance = __webpack_require__("8a19");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/shared-lib/braze-shared-lib.js + 6 modules
var braze_shared_lib = __webpack_require__("728c");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/common/base-provider.js
var base_provider = __webpack_require__("572a");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/managers/storage-manager.js
var storage_manager = __webpack_require__("ecfe");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/managers/subscription-manager.js
var subscription_manager = __webpack_require__("954e");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/util/math.js
var math = __webpack_require__("83bc");

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/util/net.js
var net = __webpack_require__("0fc4");

// CONCATENATED MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/FeatureFlags/feature-flag.js

class feature_flag_FeatureFlag {
  constructor(t, r = !1, e = {}, s) {
    (this.id = t),
      (this.enabled = r),
      (this.properties = e),
      (this.trackingString = s),
      (this.id = t),
      (this.enabled = r),
      (this.properties = e),
      (this.trackingString = s);
  }
  getStringProperty(t) {
    const r = this.properties[t];
    return null == r
      ? (this.Er(t), null)
      : this.Ir(r)
      ? r.value
      : (this.Nr("string"), null);
  }
  getNumberProperty(t) {
    const r = this.properties[t];
    return null == r
      ? (this.Er(t), null)
      : this.Tr(r)
      ? r.value
      : (this.Nr("number"), null);
  }
  getBooleanProperty(t) {
    const r = this.properties[t];
    return null == r
      ? (this.Er(t), null)
      : this.Ar(r)
      ? r.value
      : (this.Nr("boolean"), null);
  }
  ss() {
    const t = {};
    return (
      (t[feature_flag_FeatureFlag.hs.ns] = this.id),
      (t[feature_flag_FeatureFlag.hs.Fe] = this.enabled),
      (t[feature_flag_FeatureFlag.hs.we] = this.properties),
      (t[feature_flag_FeatureFlag.hs.ze] = this.trackingString),
      t
    );
  }
  Nr(t) {
    braze_shared_lib["a" /* default */].j.info(`Property is not of type ${t}.`);
  }
  Er(t) {
    braze_shared_lib["a" /* default */].j.info(`${t} not found in feature flag properties.`);
  }
  Ir(t) {
    return "string" === t.type && "string" == typeof t.value;
  }
  Tr(t) {
    return "number" === t.type && "number" == typeof t.value;
  }
  Ar(t) {
    return "boolean" === t.type && "boolean" == typeof t.value;
  }
}
(feature_flag_FeatureFlag.hs = { ns: "id", Fe: "e", we: "pr", ze: "fts" }),
  (feature_flag_FeatureFlag.Tt = { ns: "id", Fe: "enabled", we: "properties", ze: "fts" });

// CONCATENATED MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/FeatureFlags/feature-flag-factory.js


function newFeatureFlagFromJson(e) {
  if (e[feature_flag_FeatureFlag.Tt.ns] && "boolean" == typeof e[feature_flag_FeatureFlag.Tt.Fe])
    return new feature_flag_FeatureFlag(
      e[feature_flag_FeatureFlag.Tt.ns],
      e[feature_flag_FeatureFlag.Tt.Fe],
      e[feature_flag_FeatureFlag.Tt.we],
      e[feature_flag_FeatureFlag.Tt.ze],
    );
  braze_shared_lib["a" /* default */].j.info(`Unable to create feature flag from ${JSON.stringify(e, null, 2)}`);
}
function newFeatureFlagFromSerializedValue(e) {
  if (e[feature_flag_FeatureFlag.hs.ns] && "boolean" == typeof e[feature_flag_FeatureFlag.hs.Fe])
    return new feature_flag_FeatureFlag(
      e[feature_flag_FeatureFlag.hs.ns],
      e[feature_flag_FeatureFlag.hs.Fe],
      e[feature_flag_FeatureFlag.hs.we],
      e[feature_flag_FeatureFlag.hs.ze],
    );
  braze_shared_lib["a" /* default */].j.info(
    `Unable to deserialize feature flag from ${JSON.stringify(e, null, 2)}`,
  );
}

// EXTERNAL MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/util/request-header-utils.js
var request_header_utils = __webpack_require__("e6c6");

// CONCATENATED MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/FeatureFlags/feature-flags-provider.js









class feature_flags_provider_er extends base_provider["a" /* default */] {
  constructor(t, s, i) {
    super(),
      (this.wt = t),
      (this.gt = s),
      (this.u = i),
      (this.pi = []),
      (this.gi = 0),
      (this.wt = t),
      (this.gt = s),
      (this.u = i),
      (this.Fi = null),
      (this.wi = new subscription_manager["a" /* default */]()),
      (this.yi = 10),
      (this.ji = null),
      (this.bi = null),
      braze_instance["b" /* default */].jt(this.wi);
  }
  Ts(t) {
    if ((!this.wt || this.wt.vi()) && null != t && t.feature_flags) {
      this.pi = [];
      for (const s of t.feature_flags) {
        const t = newFeatureFlagFromJson(s);
        t && this.pi.push(t);
      }
      (this.gi = new Date().getTime()), this.Ti(), this.wi.Et(this.pi);
    }
  }
  Di() {
    let t = {};
    this.u && (t = this.u.v(storage_manager["a" /* STORAGE_KEYS */].k.Ri));
    const s = {};
    for (const i in t) {
      const e = newFeatureFlagFromSerializedValue(t[i]);
      e && (s[e.id] = e);
    }
    return s;
  }
  Ni() {
    var t;
    return (null === (t = this.u) || void 0 === t ? void 0 : t.v(storage_manager["a" /* STORAGE_KEYS */].k.qi)) || {};
  }
  xi(t) {
    this.u && this.u.D(storage_manager["a" /* STORAGE_KEYS */].k.qi, t);
  }
  ri(t) {
    return this.wi.lt(t);
  }
  refreshFeatureFlags(t, s, i = !1, e = !0) {
    if (!this.zi(i))
      return (
        !this.Fi &&
          this.wt &&
          (this.Fi = this.wt.Ci(() => {
            this.refreshFeatureFlags(t, s);
          })),
        void ("function" == typeof s && s())
      );
    if ((e && this.Ii(), !this.gt)) return void ("function" == typeof s && s());
    const r = this.gt.Bs({}, !0),
      h = this.gt.Hs(r, request_header_utils["a" /* default */].Os.Si);
    let o = !1;
    this.gt.Qs(r, () => {
      this.gt
        ? (request_header_utils["a" /* default */].Ws(this.u, request_header_utils["a" /* default */].Os.Si, new Date().valueOf()),
          net["a" /* default */].Xs({
            url: `${this.gt.Ys()}/feature_flags/sync`,
            headers: h,
            data: r,
            O: (i) => {
              if (!this.gt.Zs(r, i, h))
                return (o = !0), void ("function" == typeof s && s());
              this.gt.ti(),
                this.Ts(i),
                (o = !1),
                request_header_utils["a" /* default */].si(this.u, request_header_utils["a" /* default */].Os.Si, 1),
                "function" == typeof t && t();
            },
            error: (t) => {
              this.gt.ii(t, "retrieving feature flags"),
                (o = !0),
                "function" == typeof s && s();
            },
            ei: () => {
              if (e && o && !this.bi) {
                request_header_utils["a" /* default */].hi(this.u, request_header_utils["a" /* default */].Os.Si);
                let e = this.ji;
                (null == e || e < 1e3 * this.yi) && (e = 1e3 * this.yi),
                  this.$i(Math.min(3e5, Object(math["a" /* randomInclusive */])(1e3 * this.yi, 3 * e)), t, s, i);
              }
            },
          }))
        : "function" == typeof s && s();
    });
  }
  Ii() {
    null != this.bi && (clearTimeout(this.bi), (this.bi = null));
  }
  $i(t = 1e3 * this.yi, s, i, e = !1) {
    this.Ii(),
      (this.bi = window.setTimeout(() => {
        this.refreshFeatureFlags(s, i, e);
      }, t)),
      (this.ji = t);
  }
  zi(t) {
    if (!this.wt) return !1;
    if (!t) {
      const t = this.wt.Mi();
      if (null == t) return !1;
      let s = !1;
      if (!isNaN(t)) {
        if (-1 === t) return braze_shared_lib["a" /* default */].j.info("Feature flag refreshes not allowed"), !1;
        s = new Date().getTime() >= (this.gi || 0) + 1e3 * t;
      }
      if (!s)
        return (
          braze_shared_lib["a" /* default */].j.info(`Feature flag refreshes were rate limited to ${t} seconds`),
          !1
        );
    }
    return this.wt.vi();
  }
  Ti() {
    if (!this.u) return;
    const t = {};
    for (const s of this.pi) {
      const i = s.ss();
      t[s.id] = i;
    }
    this.u.D(storage_manager["a" /* STORAGE_KEYS */].k.Ri, t), this.u.D(storage_manager["a" /* STORAGE_KEYS */].k.Ui, this.gi);
  }
}

// CONCATENATED MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/FeatureFlags/feature-flags-provider-factory.js


const ir = {
  t: !1,
  provider: null,
  er: () => (
    ir.o(),
    ir.provider ||
      ((ir.provider = new feature_flags_provider_er(braze_instance["b" /* default */].tr(), braze_instance["b" /* default */].ar(), braze_instance["b" /* default */].l())), braze_instance["b" /* default */].dr(ir.provider)),
    ir.provider
  ),
  o: () => {
    ir.t || (braze_instance["b" /* default */].g(ir), (ir.t = !0));
  },
  destroy: () => {
    (ir.provider = null), (ir.t = !1);
  },
};
/* harmony default export */ var feature_flags_provider_factory = (ir);

// CONCATENATED MODULE: ../components/organisms/f-content-cards/node_modules/@braze/web-sdk/src/FeatureFlags/refresh-feature-flags.js


function tr(r, t, a = !1) {
  if (braze_instance["b" /* default */].rr()) return feature_flags_provider_factory.er().refreshFeatureFlags(r, t, a);
}
function refreshFeatureFlags(r, e) {
  tr(r, e);
}
/* harmony default export */ var refresh_feature_flags = __webpack_exports__["default"] = (tr);


/***/ })

}]);
//# sourceMappingURL=5.8d26755d.iframe.bundle.js.map