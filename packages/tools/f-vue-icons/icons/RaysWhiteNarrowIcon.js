import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'RaysWhiteNarrowIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 320 36"
      },
      "class": "c-ficon c-ficon--rays-white-narrow"
    }, ctx.data]), [h("g", {
      "attrs": {
        "fill": "none"
      }
    }, [h("g", {
      "attrs": {
        "opacity": ".3"
      }
    }, [h("path", {
      "attrs": {
        "fill": "#000",
        "d": "M0 0l320 36H0z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FFF",
        "d": "M0 0l320 36H0z"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#FFF",
        "d": "M0 12l320 24H0z",
        "opacity": ".6"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FFF",
        "d": "M0 24l320 12H0z"
      }
    })])]);
  }
};