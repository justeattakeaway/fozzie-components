import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'RaysWhiteNarrowIcon',
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
        viewBox: "0 0 320 36"
      },
      "class": "c-ficon c-ficon--rays-white-narrow"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none"
      }
    }, [h("g", {
      attrs: {
        opacity: ".3"
      }
    }, [h("path", {
      attrs: {
        fill: "#000",
        d: "M0 0l320 36H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 0l320 36H0z"
      }
    })]), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 12l320 24H0z",
        opacity: ".6"
      }
    }), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M0 24l320 12H0z"
      }
    })])]);
  }
};