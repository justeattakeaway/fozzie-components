import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'GiftIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 24 24"
      },
      "class": "c-ficon c-ficon--gift"
    }, ctx.data]), [h("path", {
      "attrs": {
        "d": "M15 2c1.66 0 3 1.34 3 3 0 .28-.045.554-.119.81L17.82 6H20c1.06 0 1.919.81 1.995 1.85L22 8v12c0 1.06-.81 1.919-1.85 1.995L20 22H4c-1.06 0-1.919-.81-1.995-1.85L2 20l.01-12c0-1.06.802-1.919 1.84-1.995L4 6h2.18C6.07 5.69 6 5.35 6 5c0-1.66 1.34-3 3-3 .98 0 1.838.47 2.387 1.184l.113.156.5.68.5-.67C13.04 2.54 13.95 2 15 2zM4 20h7v-5H4v5zm16-5h-7v5h7v-5zm-.884-6.993L19 8h-4.08l1.48 2.02c.33.45.23 1.08-.22 1.4a1.004 1.004 0 01-1.31-.125l-.08-.095L13 8.761V13h7V9c0-.51-.388-.935-.884-.993zM9.08 8H5c-.51 0-.935.388-.993.884L4 9v4h7V8.761L9.21 11.2a1.004 1.004 0 01-1.285.286l-.105-.066a.994.994 0 01-.284-1.301l.064-.099L9.08 8zM15 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM9 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z",
        "fill": "#000",
        "fill-rule": "evenodd"
      }
    })]);
  }
};