import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'FlagDkIcon',
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
      "class": "c-ficon c-ficon--flag.dk"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#c60c30",
        d: "M0 0h640.1v480H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#fff",
        d: "M205.714 0h68.57v480h-68.57z"
      }
    }), h("path", {
      attrs: {
        fill: "#fff",
        d: "M0 205.714h640.1v68.57H0z"
      }
    })]);
  }
};