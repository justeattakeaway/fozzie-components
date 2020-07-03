import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'FlagItIcon',
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
        viewBox: "0 0 640 480"
      },
      "class": "c-ficon c-ficon--flag.it"
    }, ctx.data]), [h("g", {
      attrs: {
        "fill-rule": "evenodd",
        "stroke-width": "1pt"
      }
    }, [h("path", {
      attrs: {
        fill: "#fff",
        d: "M0 0h640v479.997H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#009246",
        d: "M0 0h213.33v479.997H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#ce2b37",
        d: "M426.663 0h213.33v479.997h-213.33z"
      }
    })])]);
  }
};