import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'VegetarianIcon',
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
      "class": "c-ficon c-ficon--vegetarian"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#028A00",
        d: "M9.3 14.46a29.26 29.26 0 0 1 1.13-3.77c.72-1.9 1.58-3.41 2.61-4.4a.42.42 0 1 1 .58.6c-.92.89-1.73 2.3-2.41 4.1a28.45 28.45 0 0 0-1.1 3.66 30.5 30.5 0 0 0-.34 1.67.42.42 0 0 1-.41.35h-.4a.42.42 0 0 1-.38-.28 129.07 129.07 0 0 0-3.96-9.57.42.42 0 0 1 .75-.36A117.3 117.3 0 0 1 6.5 9a129.89 129.89 0 0 1 2.6 6.4c.05-.3.12-.6.2-.93zm7.37-10.72v.04c0 .32-.01.76-.07 1.3a10.46 10.46 0 0 1-.54 2.37 6.5 6.5 0 0 1-1.31 2.25 3.96 3.96 0 0 1-3.83 1.22.42.42 0 0 1-.3-.26C9.2 7.1 10.4 4.88 13.21 3.87a9.29 9.29 0 0 1 3.04-.54.42.42 0 0 1 .42.4zm-1.3.49a8.59 8.59 0 0 0-1.88.43c-2.34.83-3.3 2.5-2.18 5.49a3.14 3.14 0 0 0 2.82-1.02c.49-.52.87-1.19 1.15-1.96a9.63 9.63 0 0 0 .49-2.2l.06-.79-.46.05z"
      }
    })]);
  }
};