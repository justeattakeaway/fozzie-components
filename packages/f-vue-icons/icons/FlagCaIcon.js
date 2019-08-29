import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagCaIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 480"
      },
      "class": "ficon ficon-flag.ca"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#fff",
        d: "M150.184 0h339.634v480H150.184z"
      }
    }), h("path", {
      attrs: {
        fill: "#bf0a30",
        d: "M-19.632 0h169.817v480H-19.632zm509.45 0h169.816v480H489.82zM200.97 231.947l-13.187 4.507 61.365 53.856c4.64 13.84-1.612 17.92-5.597 25.18l66.62-8.455-1.734 67.042 13.798-.396-3.01-66.485 66.685 7.905c-4.128-8.716-7.8-13.343-3.983-27.28l61.326-51.023-10.732-3.885c-8.774-6.77 3.793-32.61 5.688-48.917 0 0-35.807 12.314-38.154 5.87l-9.12-17.517-32.574 35.784c-3.56.854-5.075-.562-5.91-3.57l15.05-74.78-23.832 13.403c-1.995.853-3.99.117-5.304-2.208l-22.922-45.993-23.635 47.765c-1.78 1.71-3.565 1.91-5.045.746l-22.69-12.73 13.62 74.197c-1.083 2.944-3.678 3.773-6.73 2.18l-31.14-35.38c-4.074 6.527-6.835 17.19-12.22 19.58-5.384 2.238-23.418-4.522-35.505-7.16 4.13 14.902 17.04 39.658 8.87 47.772z"
      }
    })]);
  }
};