import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'CrossIcon',
  props: {
    isWhite: {
      type: Boolean,
      default: false
    },
    isBlue: {
      type: Boolean,
      default: false
    },
    isGreen: {
      type: Boolean,
      default: false
    },
    isOrange: {
      type: Boolean,
      default: false
    },
    pushLeft: {
      type: Boolean,
      default: false
    }
  },
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    ctx.data.class = {
      'c-ficon--white': ctx.props.isWhite,
      'c-ficon--blue': ctx.props.isBlue,
      'c-ficon--green': ctx.props.isGreen,
      'c-ficon--orange': ctx.props.isOrange,
      'c-ficon--pushLeft': ctx.props.pushLeft
    };
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