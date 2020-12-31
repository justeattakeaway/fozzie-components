import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagPtRoundIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      },
      "class": "c-ficon c-ficon--flag.pt.round"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#6da544",
        d: "M0 256a256 256 0 0 0 167 240l22.2-240L167 16A256 256 0 0 0 0 256z"
      }
    }), h("path", {
      attrs: {
        fill: "#d80027",
        d: "M512 256A256 256 0 0 0 167 16v480a256 256 0 0 0 345-240z"
      }
    }), h("circle", {
      attrs: {
        cx: "167",
        cy: "256",
        r: "89",
        fill: "#ffda44"
      }
    }), h("path", {
      attrs: {
        fill: "#d80027",
        d: "M116.9 211.5V267a50 50 0 1 0 100.1 0v-55.6H117z"
      }
    }), h("path", {
      attrs: {
        fill: "#eee",
        d: "M167 283.8c-9.2 0-16.7-7.5-16.7-16.7V245h33.4v22c0 9.2-7.5 16.7-16.7 16.7z"
      }
    })]);
  }
};