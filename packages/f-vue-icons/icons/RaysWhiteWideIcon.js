import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'RaysWhiteWideIcon',
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
        viewBox: "0 0 1280 48"
      },
      "class": "c-ficon c-ficon--rays-white-wide"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 0l1280 48H0z",
        opacity: ".3"
      }
    }), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 16l1280 32H0z",
        opacity: ".6"
      }
    }), h("path", {
      attrs: {
        fill: "#F5F5F5",
        d: "M0 32l1280 16H0z"
      }
    })])]);
  }
};