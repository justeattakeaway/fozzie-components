import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagEsRoundIcon',
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
      "class": "c-ficon c-ficon--flag.es.round"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#ffda44",
        d: "M0 256c0 31.3 5.6 61.3 16 89l240 22.3L496 345a255.5 255.5 0 0 0 0-178l-240-22.3L16 167a255.5 255.5 0 0 0-16 89z"
      }
    }), h("path", {
      attrs: {
        fill: "#d80027",
        d: "M496 167a256 256 0 0 0-480 0h480zM16 345a256 256 0 0 0 480 0H16z"
      }
    })]);
  }
};