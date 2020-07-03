import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'RaysWhiteNarrowIcon',
  props: {
    classModifier: {
      type: String,
      default: ''
    }
  },
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    ctx.data.class = _defineProperty({}, "c-ficon--".concat(ctx.props.classModifier), ctx.props.classModifier !== '');
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 320 36"
      },
      "class": "c-ficon c-ficon--rays-white-narrow"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none"
      }
    }, [h("g", {
      attrs: {
        opacity: ".3"
      }
    }, [h("path", {
      attrs: {
        fill: "#000",
        d: "M0 0l320 36H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 0l320 36H0z"
      }
    })]), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 12l320 24H0z",
        opacity: ".6"
      }
    }), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 24l320 12H0z"
      }
    })])]);
  }
};