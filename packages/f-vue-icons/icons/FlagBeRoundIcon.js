import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagBeRoundIcon',
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
      "class": "c-ficon c-ficon--flag.be.round"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#ffda44",
        d: "M345 16a255.5 255.5 0 0 0-178 0l-22.3 240L167 496a255.4 255.4 0 0 0 178 0l22.3-240L345 16z"
      }
    }), h("path", {
      attrs: {
        fill: "#d80027",
        d: "M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"
      }
    }), h("path", {
      attrs: {
        fill: "#333",
        d: "M0 256a256 256 0 0 0 167 240V16A256 256 0 0 0 0 256z"
      }
    })]);
  }
};