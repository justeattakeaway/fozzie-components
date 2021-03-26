import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'CloseCircleIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24"
      },
      "class": "c-ficon c-ficon--close-circle"
    }, ctx.data]), [h("defs", [h("path", {
      attrs: {
        d: "M4.927 4.927c3.905-3.905 10.236-3.905 14.141 0a10 10 0 11-14.141 0zm11.518.422a8 8 0 00-10.102.994A7.948 7.948 0 004 12a8 8 0 1012.445-6.651zM15.197 7.8a1 1 0 01.609.207l.099.087a1 1 0 010 1.417L13.417 12l2.488 2.488a1 1 0 01.087 1.318l-.087.099a1 1 0 01-1.417 0L12 13.417l-2.488 2.488a1 1 0 01-1.318.087l-.099-.087a1 1 0 010-1.417L10.583 12 8.097 9.512a1 1 0 01-.087-1.318l.087-.099a1 1 0 011.416 0L12 10.583l2.488-2.488a1 1 0 01.709-.294z",
        id: "close-circle-a"
      }
    })]), h("use", {
      attrs: {
        href: "#close-circle-a",
        "fill-rule": "evenodd"
      }
    })]);
  }
};