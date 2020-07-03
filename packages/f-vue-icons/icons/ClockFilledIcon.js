import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'ClockFilledIcon',
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
        viewBox: "0 0 28 28"
      },
      "class": "c-ficon c-ficon--clock-filled"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M14 3c6.09 0 11 4.99 11 11s-4.99 11-11 11c-6.01.078-11-4.911-11-11C3 7.91 7.871 3 14 3zm2.16 11.785V7.832h-2.867v5.5H7.95v2.867h6.796c.825 0 1.415-.589 1.415-1.414z"
      }
    })]);
  }
};