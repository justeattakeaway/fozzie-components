import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'MinusIcon',
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
        viewBox: "0 0 12 1"
      },
      "class": "c-ficon c-ficon--minus"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M.33 1a.33.33 0 0 1 0-.67h11.34a.33.33 0 0 1 0 .67H.33z",
        fill: "#333"
      }
    })]);
  }
};