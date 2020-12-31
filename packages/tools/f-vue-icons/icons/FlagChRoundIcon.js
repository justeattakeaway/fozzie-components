import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagChRoundIcon',
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
      "class": "c-ficon c-ficon--flag.ch.round"
    }, ctx.data]), [h("circle", {
      attrs: {
        cx: "256",
        cy: "256",
        r: "256",
        fill: "#d80027"
      }
    }), h("path", {
      attrs: {
        fill: "#eee",
        d: "M389.6 211.5h-89v-89h-89.1v89h-89v89h89v89h89v-89h89z"
      }
    })]);
  }
};