import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'CuisineIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 17 15"
      },
      "class": "c-ficon c-ficon--cuisine"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M5.1 4h3.6a.4.4 0 0 1 0 .8h-.4l-1.2 9.3a.4.4 0 0 1-.4.3h-4a.4.4 0 0 1-.4-.3l-1-9.3H.7a.4.4 0 1 1 0-.8h3.6V2.2L2.8.7a.4.4 0 1 1 .6-.6L5 1.7a.4.4 0 0 1 .1.3v2zm2.4.8H2l1 8.8h3.3l1-8.8zm7.2 4v-.4c0-.7-.5-1.2-1.2-1.2h-2.4c-.6 0-1.2.5-1.2 1.2v.4h4.8zm.8 3.2v.4a2 2 0 0 1-2 2h-2.4a2 2 0 0 1-2-2V12a1.7 1.7 0 0 1-.4 0 .4.4 0 1 1 0-.8c.3 0 .4 0 .7-.3.4-.4.6-.5 1.1-.5.5 0 .8.1 1.2.5l.6.3c.3 0 .4 0 .7-.3.4-.4.6-.5 1.1-.5.5 0 .8.1 1.2.5l.6.3a.4.4 0 1 1 0 .8 1.7 1.7 0 0 1-.4 0zm-5.6-.5v.9c0 .7.6 1.2 1.2 1.2h2.4c.7 0 1.2-.5 1.2-1.2v-1l-.6-.2c-.3 0-.3 0-.6.3-.4.4-.7.5-1.2.5s-.7-.1-1.1-.5c-.3-.2-.4-.3-.7-.3-.2 0-.3 0-.6.3zm-.8-3.1c0-1.1 1-2 2-2h2.4a2 2 0 0 1 2 2v.8a.4.4 0 0 1-.4.4H9.5a.4.4 0 0 1-.4-.4v-.8z"
      }
    })]);
  }
};