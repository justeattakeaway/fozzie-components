import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'ChevronIcon',
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
        viewBox: "0 0 10 6"
      },
      "class": "c-ficon c-ficon--chevron"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M5 4.41L9.29.12a.42.42 0 0 1 .59.6L5.29 5.28a.42.42 0 0 1-.58 0L.12.71a.42.42 0 0 1 .6-.59L5 4.42z",
        fill: "#333"
      }
    })]);
  }
};