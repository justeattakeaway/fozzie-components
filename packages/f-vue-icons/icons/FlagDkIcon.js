import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagDkIcon',
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