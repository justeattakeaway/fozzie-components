import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'DeliveryIcon',
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
        viewBox: "0 0 16 16"
      },
      "class": "c-ficon c-ficon--delivery"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M1.7 6.7a.3.3 0 1 1 0-.7h3.7a1 1 0 0 1 .9.6l1.1 2.3a.3.3 0 1 1-.6.2L5.7 7a.3.3 0 0 0-.3-.2H1.7zm4.2 4a2 2 0 1 1-3.8 0h-.4a.3.3 0 0 1-.4-.4v-.6A3.7 3.7 0 0 1 5 6a.3.3 0 1 1 0 .7 3 3 0 0 0-3 3v.3h6.9l2.4-2.4-2.5-4.3H7.7a.3.3 0 1 1 0-.6H9l.3.1L12 7.5a.3.3 0 0 1-.1.4l-2.7 2.7a.3.3 0 0 1-.2 0H5.9zm-.7 0H2.8a1.3 1.3 0 1 0 2.4 0zm7.5 2.6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-.6a1.3 1.3 0 1 0 0-2.7 1.3 1.3 0 0 0 0 2.7z"
      }
    })]);
  }
};