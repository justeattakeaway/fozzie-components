import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'SocialInstagramIcon',
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
        viewBox: "0 0 28 28"
      },
      "class": "c-ficon c-ficon--social-instagram"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#535353",
        d: "M18.083 10.5a.583.583 0 1 0 0-1.167.583.583 0 0 0 0 1.167zM9.471 8.167c-.72 0-1.304.584-1.304 1.304v9.058c0 .72.584 1.304 1.304 1.304h9.058c.72 0 1.304-.584 1.304-1.304V9.471c0-.72-.584-1.304-1.304-1.304H9.471zm0-1.167h9.058A2.471 2.471 0 0 1 21 9.471v9.058A2.471 2.471 0 0 1 18.529 21H9.471A2.471 2.471 0 0 1 7 18.529V9.471A2.471 2.471 0 0 1 9.471 7zM14 17.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-1.167a2.333 2.333 0 1 0 0-4.666 2.333 2.333 0 0 0 0 4.666zM14 28C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14zm0-1.167c7.088 0 12.833-5.745 12.833-12.833S21.088 1.167 14 1.167 1.167 6.912 1.167 14 6.912 26.833 14 26.833z"
      }
    })]);
  }
};