import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'CrossIcon',
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
        viewBox: "0 0 9 9"
      },
      "class": "c-ficon c-ficon--cross"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M4.33 4.74L.83 8.25a.29.29 0 0 1-.41-.4l3.5-3.52L.43.83a.29.29 0 1 1 .4-.41l3.51 3.5L7.85.43a.29.29 0 0 1 .4.4l-3.51 3.5 3.51 3.52a.29.29 0 0 1-.4.4L4.33 4.74z"
      }
    })]);
  }
};