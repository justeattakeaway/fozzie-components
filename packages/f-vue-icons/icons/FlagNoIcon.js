import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagNoIcon',
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
        viewBox: "0 0 640 480"
      },
      "class": "c-ficon c-ficon--flag.no"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#ef2b2d",
        d: "M0 0h640v480H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#fff",
        d: "M180 0h120v480H180z"
      }
    }), h("path", {
      attrs: {
        fill: "#fff",
        d: "M0 180h640v120H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#002868",
        d: "M210 0h60v480h-60z"
      }
    }), h("path", {
      attrs: {
        fill: "#002868",
        d: "M0 210h640v60H0z"
      }
    })]);
  }
};