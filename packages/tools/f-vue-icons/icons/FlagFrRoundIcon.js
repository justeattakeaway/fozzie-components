import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagFrRoundIcon',
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
      "class": "c-ficon c-ficon--flag.fr.round"
    }, ctx.data]), [h("circle", {
      attrs: {
        cx: "256",
        cy: "256",
        r: "256",
        fill: "#eee"
      }
    }), h("path", {
      attrs: {
        fill: "#d80027",
        d: "M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"
      }
    }), h("path", {
      attrs: {
        fill: "#0052b4",
        d: "M0 256a256 256 0 0 0 167 240V16A256 256 0 0 0 0 256z"
      }
    })]);
  }
};