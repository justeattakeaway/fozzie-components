import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'StopwatchIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 20 20"
      },
      "class": "c-ficon c-ficon--stopwatch"
    }, ctx.data]), [h("path", {
      "attrs": {
        "d": "M10.711 11.545l-.589-.59 2.5-2.5.59.59-2.5 2.5zm5.244-6.423l.59.59-1.634 1.633-.589-.59 1.633-1.633zm-5.538 13.211a6.667 6.667 0 1 1 0-13.333 6.667 6.667 0 0 1 0 13.333zm0-.833a5.833 5.833 0 1 0 0-11.667 5.833 5.833 0 0 0 0 11.667zm0-11.667a2.083 2.083 0 1 1 0-4.166 2.083 2.083 0 0 1 0 4.166zm0-.833a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"
      }
    })]);
  }
};