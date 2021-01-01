import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagGbIcon',
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
      "class": "c-ficon c-ficon--flag.gb"
    }, ctx.data]), [h("g", {
      attrs: {
        "clip-path": "url(#)",
        transform: "translate(80) scale(.94)"
      }
    }, [h("g", {
      attrs: {
        "stroke-width": "1pt"
      }
    }, [h("path", {
      attrs: {
        fill: "#006",
        d: "M-256 0H768.02v512.01H-256z"
      }
    }), h("path", {
      attrs: {
        fill: "#fff",
        d: "M-256 0v57.244l909.535 454.768H768.02V454.77L-141.515 0H-256zM768.02 0v57.243L-141.515 512.01H-256v-57.243L653.535 0H768.02z"
      }
    }), h("path", {
      attrs: {
        fill: "#fff",
        d: "M170.675 0v512.01h170.67V0h-170.67zM-256 170.67v170.67H768.02V170.67H-256z"
      }
    }), h("path", {
      attrs: {
        fill: "#c00",
        d: "M-256 204.804v102.402H768.02V204.804H-256zM204.81 0v512.01h102.4V0h-102.4zM-256 512.01L85.34 341.34h76.324l-341.34 170.67H-256zM-256 0L85.34 170.67H9.016L-256 38.164V0zm606.356 170.67L691.696 0h76.324L426.68 170.67h-76.324zM768.02 512.01L426.68 341.34h76.324L768.02 473.848v38.162z"
      }
    })])])]);
  }
};