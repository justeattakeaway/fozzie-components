import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagAuIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 480"
      },
      "class": "ficon ficon-flag.au"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#006",
        d: "M0 0h640v480H0z"
      }
    }), h("path", {
      attrs: {
        d: "M0 0v28l307 222h39v-28L39 0H0zm346 0v28L39 250H0v-28L307 0h39z",
        fill: "#fff"
      }
    }), h("path", {
      attrs: {
        d: "M144 0v250h58V0h-58zM0 83v84h346V83H0z",
        fill: "#fff"
      }
    }), h("path", {
      attrs: {
        d: "M0 100v50h346v-50H0zM156 0v250h34V0h-34zM0 250l115-83h26L26 250H0zM0 0l115 83H89L0 19V0zm205 83L320 0h26L230 83h-25zm141 167l-116-83h26l90 64v19z",
        fill: "#c00"
      }
    }), h("path", {
      attrs: {
        d: "M300 393l-44 3 6 44-30-32-30 32 6-44-44-3 38-23-24-36 41 15 13-42 13 42 41-15-24 36m225 63l-11-16 18 6 6-18 5 18 18-6-10 16 16 9-19 2 3 19-13-14-13 14 2-19-19-2m17-292l-11-15 18 6 6-18 5 18 18-6-10 15 16 10-19 2 3 19-13-14-13 14 2-19-19-2m-89 105l-11-16 18 7 6-18 6 18 17-7-10 16 16 10-19 1 3 19-13-14-13 14 2-19-19-1m217-38l-11-16 18 7 6-18 5 18 18-7-10 16 16 10-19 1 3 19-13-14-13 14 2-19-19-1m-22 73l-10 6 2-11-9-8 12-1 5-12 5 12 12 1-10 8 3 11",
        "fill-rule": "evenodd",
        fill: "#fff"
      }
    })]);
  }
};