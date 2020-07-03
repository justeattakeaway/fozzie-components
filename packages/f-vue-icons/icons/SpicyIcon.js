import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'SpicyIcon',
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
      "class": "c-ficon c-ficon--spicy"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#D50525",
        d: "M10.73 4.16a.42.42 0 0 1 .14-.82 2.46 2.46 0 0 1 2.05 2.55v.36a.42.42 0 0 1-.84 0v-.38a1.64 1.64 0 0 0-1.35-1.7zm3.58 2.42A2.44 2.44 0 0 1 15 8.44v1.1c0 4.85-7.54 9.1-9.9 6.29a.42.42 0 0 1 .15-.65 11.67 11.67 0 0 0 2.4-1.52c1.46-1.2 2.33-2.6 2.33-4.13V8.48a2.43 2.43 0 0 1 2.49-2.65 2.46 2.46 0 0 1 1.84.75zm-1.84-.33l-.02.42a1.6 1.6 0 0 0-1.2.5c-.32.33-.48.78-.43 1.27v1.1c0 1.82-1 3.41-2.65 4.77a12.49 12.49 0 0 1-2 1.34c2.23 1.27 8-2.25 8-6.12V8.41a1.63 1.63 0 0 0-1.69-1.74l-.01-.42z"
      }
    })]);
  }
};