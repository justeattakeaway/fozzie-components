import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'MapPinIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20"
      },
      "class": "c-ficon c-ficon--map-pin"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M10 10.833a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM10 10a1.667 1.667 0 1 0 0-3.333A1.667 1.667 0 0 0 10 10zm4.716-6.485a6.633 6.633 0 0 1 2.034 4.657c0 2.256-1.23 4.621-3.268 6.974a25.286 25.286 0 0 1-3.228 3.101.417.417 0 0 1-.508 0 23.028 23.028 0 0 1-1.014-.857 25.286 25.286 0 0 1-2.214-2.244C4.48 12.793 3.25 10.428 3.25 8.163A6.628 6.628 0 0 1 10 1.667a6.628 6.628 0 0 1 4.716 1.848zM10.711 16.77a24.42 24.42 0 0 0 2.14-2.17c1.92-2.215 3.066-4.418 3.066-6.42a5.795 5.795 0 0 0-5.909-5.68 5.806 5.806 0 0 0-4.147 1.616 5.79 5.79 0 0 0-1.778 4.056c0 2.01 1.146 4.213 3.065 6.428a24.463 24.463 0 0 0 2.845 2.776c.226-.174.463-.377.718-.606z"
      }
    })]);
  }
};