import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagRoRoundIcon',
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
      "class": "c-ficon c-ficon--flag.ro.round"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#ffda44",
        d: "M256 0c-31.3 0-61.3 5.6-89 16L9 256l158 240a255.4 255.4 0 0 0 89 16c31.3 0 61.3-5.6 89-16l158-240L345 16a255.5 255.5 0 0 0-89-16z"
      }
    }), h("path", {
      attrs: {
        fill: "#d80027",
        d: "M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"
      }
    }), h("path", {
      attrs: {
        fill: "#0052b4",
        d: "M167 496V16a256 256 0 0 0 0 480z"
      }
    })]);
  }
};