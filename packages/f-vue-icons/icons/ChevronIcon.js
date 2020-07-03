import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'ChevronIcon',
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
    isDarkestGrey: {
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
      'c-ficon--grey--darkest': ctx.props.isDarkestGrey,
      'c-ficon--pushLeft': ctx.props.pushLeft
    };
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