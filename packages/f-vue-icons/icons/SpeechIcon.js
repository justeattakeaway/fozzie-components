import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'SpeechIcon',
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
        viewBox: "0 0 44 32"
      },
      "class": "c-ficon c-ficon--speech"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "#535353",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      attrs: {
        d: "M31.14 26.77h.76l2.16 2.13 2.65 2.62c.13.13.26.25.38.25.13 0 .26.13.38.13.13 0 .38-.13.51-.25.13-.25.25-.5.25-.88v-5.75c2.92-1.63 4.81-4.13 4.81-7 0-4.76-5.31-8.76-11.9-8.76-.88 0-1.77.12-2.65.25l-1.14 6.25-6.97 3.5-1.14-1.24c0 4.75 5.32 8.75 11.9 8.75z"
      }
    }), h("path", {
      attrs: {
        d: "M14.94 0C6.7 0 .13 4.88.13 10.88c0 3.63 2.4 6.76 6.07 8.76v7.25c0 .38.13.75.26 1 .12.13.38.26.63.26.13 0 .38-.13.5-.13.13-.12.39-.12.51-.37l3.3-3.26 2.65-2.62h1.01c8.23 0 14.82-4.88 14.82-10.89 0-6-6.71-10.88-14.94-10.88zm0 18.39c-6.2 0-11.4-3.5-11.4-7.38 0-4 5.2-7.5 11.4-7.5s11.4 3.5 11.4 7.37c.12 4.13-5.2 7.5-11.4 7.5z"
      }
    })])]);
  }
};