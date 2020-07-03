import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'WarningIcon',
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
        viewBox: "0 0 14 12"
      },
      "class": "c-ficon c-ficon--warning"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M6.5 4.24a.32.32 0 0 1 .66 0v2.6a.32.32 0 0 1-.65 0v-2.6zm.33 4.88a.65.65 0 1 1 0-1.3.65.65 0 0 1 0 1.3zm6.36 1.24a1.3 1.3 0 0 1-1.12.7H1.6a1.29 1.29 0 0 1-1.04-2L5.8 1.22a1.25 1.25 0 0 1 2.08 0l5.24 7.82c.27.4.3.9.08 1.31zm-.62-.94L7.33 1.59a.6.6 0 0 0-1 0L1.1 9.42a.64.64 0 0 0 .5 1h10.47a.64.64 0 0 0 .51-1z",
        fill: "#D50525"
      }
    })]);
  }
};