import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'PadlockIcon',
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
        viewBox: "0 0 20 20"
      },
      "class": "c-ficon c-ficon--padlock"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M3.75 9.167a.417.417 0 0 0-.417.416v7.5c0 .23.187.417.417.417h12.5c.23 0 .417-.187.417-.417v-7.5a.417.417 0 0 0-.417-.416H3.75zm0-.834h12.5c.69 0 1.25.56 1.25 1.25v7.5c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25v-7.5c0-.69.56-1.25 1.25-1.25zm9.583 0v-2.5a3.333 3.333 0 1 0-6.666 0v2.5h6.666zm-3.75 4.93a1.25 1.25 0 1 1 .834 0v2.154h-.834v-2.155zM10 1.666a4.167 4.167 0 0 1 4.167 4.166v3.334H5.833V5.833A4.167 4.167 0 0 1 10 1.667z"
      }
    })]);
  }
};