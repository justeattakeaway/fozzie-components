import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagDkRoundIcon',
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
      "class": "c-ficon c-ficon--flag.dk.round"
    }, ctx.data]), [h("circle", {
      attrs: {
        cx: "256",
        cy: "256",
        fill: "#eee",
        r: "256"
      }
    }), h("path", {
      attrs: {
        d: "m200.3 222.6h309.5a256 256 0 0 0 -253.8-222.6 256.9 256.9 0 0 0 -55.7 6zm-66.7 0v-191.5a256.2 256.2 0 0 0 -131.4 191.5zm0 66.8h-131.4a256.2 256.2 0 0 0 131.4 191.5zm66.7 0v216.5a256.9 256.9 0 0 0 55.7 6.1 256 256 0 0 0 253.8-222.6z",
        fill: "#d80027"
      }
    })]);
  }
};