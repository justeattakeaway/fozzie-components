import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'SearchIcon',
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
      "class": "c-ficon c-ficon--search"
    }, ctx.data]), [h("path", {
      attrs: {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        d: "M19.7201 18.28L15.4201 14C17.6179 11.1197 17.2178 7.03096 14.5034 4.63129C11.789 2.23163 7.68205 2.33594 5.09297 4.87032C2.5039 7.4047 2.31192 11.5085 4.65309 14.2735C6.99425 17.0385 11.0735 17.5258 14.0001 15.39L18.2901 19.69C18.4778 19.8793 18.7334 19.9858 19.0001 19.9858C19.2667 19.9858 19.5223 19.8793 19.7101 19.69C20.1006 19.3027 20.1051 18.6728 19.7201 18.28ZM4.92008 9.81999C4.91604 7.81609 6.12058 6.00744 7.97118 5.23871C9.82177 4.46998 11.9533 4.89285 13.3703 6.30982C14.7872 7.7268 15.2101 9.85831 14.4414 11.7089C13.6726 13.5595 11.864 14.764 9.86008 14.76C8.54991 14.76 7.2934 14.2395 6.36697 13.3131C5.44055 12.3867 4.92008 11.1302 4.92008 9.81999Z",
        fill: "black"
      }
    })]);
  }
};