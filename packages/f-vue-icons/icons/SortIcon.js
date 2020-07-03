import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'SortIcon',
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
        viewBox: "0 0 16 10"
      },
      "class": "c-ficon c-ficon--sort"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M.44.89a.44.44 0 0 1 0-.89h15.12a.44.44 0 0 1 0 .89H.44zm0 4.44a.44.44 0 0 1 0-.89h9.78a.44.44 0 1 1 0 .9H.44zm0 4.45a.44.44 0 0 1 0-.9H4.9a.44.44 0 1 1 0 .9H.44z"
      }
    })]);
  }
};