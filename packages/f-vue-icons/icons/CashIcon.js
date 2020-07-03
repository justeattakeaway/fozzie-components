import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'CashIcon',
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
      "class": "c-ficon c-ficon--cash"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M11.25 16.667a2.083 2.083 0 1 1 0-4.167 2.083 2.083 0 0 1 0 4.167zm0-.834a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm-6.258-4.166V17.5H17.5v-5.833H4.992zm-.417-.834h13.342c.23 0 .416.187.416.417v6.667c0 .23-.186.416-.416.416H4.575a.417.417 0 0 1-.417-.416V11.25c0-.23.187-.417.417-.417zm-1.872-1.45l.824 1.41a.417.417 0 0 1-.72.42l-1.033-1.77a.417.417 0 0 1 .15-.57l11.524-6.725a.417.417 0 0 1 .57.15l3.367 5.758a.417.417 0 0 1-.15.57l-2.258 1.317a.417.417 0 1 1-.42-.72l1.898-1.106-2.946-5.039L2.703 9.383zm8.682.41a.417.417 0 0 1-.72-.419 1.25 1.25 0 1 0-2.163 0 .417.417 0 0 1-.72.418 2.083 2.083 0 1 1 3.603 0z"
      }
    })]);
  }
};