import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'RaysWhiteWideIcon',
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
        viewBox: "0 0 1280 48"
      },
      "class": "c-ficon c-ficon--rays-white-wide"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 0l1280 48H0z",
        opacity: ".3"
      }
    }), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 16l1280 32H0z",
        opacity: ".6"
      }
    }), h("path", {
      attrs: {
        fill: "#F5F5F5",
        d: "M0 32l1280 16H0z"
      }
    })])]);
  }
};