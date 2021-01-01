import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagBgRoundIcon',
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
      "class": "c-ficon c-ficon--flag.bg.round"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#496e2d",
        d: "M512 256c0-31.3-5.6-61.3-16-89l-240-11.2L16 167a255.5 255.5 0 0 0 0 178l240 11.2L496 345c10.4-27.7 16-57.7 16-89z"
      }
    }), h("path", {
      attrs: {
        fill: "#d80027",
        d: "M256 512a256 256 0 0 0 240-167H16a256 256 0 0 0 240 167z"
      }
    }), h("path", {
      attrs: {
        fill: "#eee",
        d: "M16 167h480a256 256 0 0 0-480 0z"
      }
    })]);
  }
};