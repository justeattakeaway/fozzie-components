import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'PlusThinIcon',
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
        viewBox: "0 0 21 21"
      },
      "class": "c-ficon c-ficon--plus-thin"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M11.25 10.08h8.83a.59.59 0 1 1 0 1.17h-8.83v8.83a.59.59 0 0 1-1.17 0v-8.83H1.25a.59.59 0 0 1 0-1.17h8.83V1.25a.59.59 0 1 1 1.17 0v8.83z"
      }
    })]);
  }
};