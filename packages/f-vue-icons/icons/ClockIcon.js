import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'ClockIcon',
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
        viewBox: "0 0 20 20"
      },
      "class": "c-ficon c-ficon--clock"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M12.795 12.205a.417.417 0 1 1-.59.59l-2.622-2.622V6.25a.417.417 0 1 1 .834 0v3.577l2.378 2.378zM10 17.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-.833a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.334z"
      }
    })]);
  }
};