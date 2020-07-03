import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagChIcon',
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
      "class": "c-ficon c-ficon--flag.ch"
    }, ctx.data]), [h("g", {
      attrs: {
        "fill-rule": "evenodd",
        "stroke-width": "1pt"
      }
    }, [h("path", {
      attrs: {
        fill: "#d52b1e",
        d: "M0 0h640v480H0z"
      }
    }), h("g", {
      attrs: {
        fill: "#fff"
      }
    }, [h("path", {
      attrs: {
        d: "M170 194.997h299.996v89.997H170z"
      }
    }), h("path", {
      attrs: {
        d: "M275 89.997h89.996v299.996H275z"
      }
    })])])]);
  }
};