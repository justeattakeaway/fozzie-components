import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagAtRoundIcon',
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
      "class": "c-ficon c-ficon--flag.at.round"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#eee",
        d: "M496 345a255.4 255.4 0 0 0 0-178l-240-22.3L16 167a255.5 255.5 0 0 0 0 178l240 22.3L496 345z"
      }
    }), h("path", {
      attrs: {
        fill: "#d80027",
        d: "M256 512a256 256 0 0 0 240-167H16a256 256 0 0 0 240 167zm0-512A256 256 0 0 0 16 167h480A256 256 0 0 0 256 0z"
      }
    })]);
  }
};