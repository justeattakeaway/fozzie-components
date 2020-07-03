import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'TickIcon',
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
        viewBox: "0 0 17 12"
      },
      "class": "c-ficon c-ficon--tick"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M5.53 10.57L15.65.45a.4.4 0 1 1 .57.57l-10.4 10.4a.4.4 0 0 1-.57 0l-4.8-4.8a.4.4 0 1 1 .57-.57l4.51 4.52z"
      }
    })]);
  }
};