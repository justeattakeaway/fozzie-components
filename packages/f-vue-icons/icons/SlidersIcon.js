import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'SlidersIcon',
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
        viewBox: "0 0 23 15"
      },
      "class": "c-ficon c-ficon--sliders"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M.88 3.3a.55.55 0 1 1 0-1.1h4.4a.55.55 0 1 1 0 1.1H.88zm20.9-1.1a.55.55 0 0 1 0 1.1h-11a.55.55 0 0 1 0-1.1h11zm0 8.8a.55.55 0 0 1 0 1.1h-4.4a.55.55 0 1 1 0-1.1h4.4zM.88 12.1a.55.55 0 0 1 0-1.1h11a.55.55 0 0 1 0 1.1h-11zm5.5-11c-.3 0-.55.25-.55.55v2.2c0 .3.25.55.55.55h3.3c.3 0 .55-.25.55-.55v-2.2c0-.3-.24-.55-.55-.55h-3.3zm0-1.1h3.3c.91 0 1.65.74 1.65 1.65v2.2c0 .91-.74 1.65-1.65 1.65h-3.3c-.9 0-1.65-.74-1.65-1.65v-2.2C4.73.74 5.47 0 6.38 0zm6.6 9.9c-.3 0-.55.25-.55.55v2.2c0 .3.25.55.55.55h3.3c.3 0 .55-.25.55-.55v-2.2c0-.3-.24-.55-.55-.55h-3.3zm0-1.1h3.3c.91 0 1.65.74 1.65 1.65v2.2c0 .91-.74 1.65-1.65 1.65h-3.3c-.9 0-1.65-.74-1.65-1.65v-2.2c0-.91.74-1.65 1.65-1.65z"
      }
    })]);
  }
};