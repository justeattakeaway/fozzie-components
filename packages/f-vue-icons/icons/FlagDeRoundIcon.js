import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagDeRoundIcon',
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
      "class": "c-ficon c-ficon--flag.de.round"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "m16 345a256 256 0 0 0 480 0l-240-22.2z",
        fill: "#ffda44"
      }
    }), h("path", {
      attrs: {
        d: "m256 0a256 256 0 0 0 -240 167l240 22.2 240-22.2a256 256 0 0 0 -240-167z",
        fill: "#333"
      }
    }), h("path", {
      attrs: {
        d: "m16 167a255.5 255.5 0 0 0 0 178h480a255.4 255.4 0 0 0 0-178z",
        fill: "#d80027"
      }
    })]);
  }
};