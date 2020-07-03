import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'RaysColouredMidIcon',
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
        viewBox: "0 0 768 206"
      },
      "class": "c-ficon c-ficon--rays-coloured-mid"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      attrs: {
        fill: "#FFD700",
        d: "M396 139.846l372-58.46V36.008z"
      }
    }), h("path", {
      attrs: {
        fill: "#95D600",
        d: "M208 195.026V206h84.69L396 139.846z"
      }
    }), h("path", {
      attrs: {
        fill: "#00AC41",
        d: "M2 206h205.793L396 139.846z"
      }
    }), h("path", {
      attrs: {
        fill: "#7DCAEB",
        d: "M584.23 206H741l-345-66.154z"
      }
    }), h("path", {
      attrs: {
        fill: "#2F7DE1",
        d: "M379 206h126l-108.17-66.154z"
      }
    }), h("path", {
      attrs: {
        fill: "#E2E71F",
        d: "M293 205.997l86.233.003L396 139.846z"
      }
    }), h("path", {
      attrs: {
        fill: "#2BACE4",
        d: "M500.952 206H586l-190-66.154z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF5000",
        d: "M740.407 206H768v-53.455l-372-12.7z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF9E16",
        d: "M396 139.613l372 16.98V73.691z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF5959",
        d: "M0 156.324V206h5.05L396 139.846z"
      }
    }), h("path", {
      attrs: {
        fill: "#FA0029",
        d: "M0 0v156.593l396-16.955z"
      }
    })])]);
  }
};