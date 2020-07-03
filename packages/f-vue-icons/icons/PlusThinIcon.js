import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'PlusThinIcon',
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