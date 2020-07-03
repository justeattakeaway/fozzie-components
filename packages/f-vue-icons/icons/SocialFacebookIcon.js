import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'SocialFacebookIcon',
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
        viewBox: "0 0 28 28"
      },
      "class": "c-ficon c-ficon--social-facebook"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#535353",
        d: "M15.167 20.417a.583.583 0 0 1-.584.583H12.25a.583.583 0 0 1-.583-.583v-5.25h-1.75a.583.583 0 0 1-.584-.584V12.25c0-.322.262-.583.584-.583h1.75v-.719a3.933 3.933 0 0 1 1.25-3.014c.832-.776 1.961-1.153 3.03-1.037.733-.003 1.466.033 2.195.106.298.03.525.28.525.58v2.334a.583.583 0 0 1-.584.583h-2.31c-.543 0-.606.078-.606.624v.543h2.157c.353 0 .625.31.578.66l-.31 2.333a.583.583 0 0 1-.578.507h-1.847v5.25zM14 14.583c0-.322.261-.583.583-.583h1.92l.155-1.167h-2.075A.583.583 0 0 1 14 12.25v-1.126c0-1.144.527-1.79 1.773-1.79H17.5V8.117a21.905 21.905 0 0 0-1.612-.057 2.766 2.766 0 0 0-3.055 2.867v1.322a.583.583 0 0 1-.583.583H10.5V14h1.75c.322 0 .583.261.583.583v5.25H14v-5.25zM14 28C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14zm0-1.167c7.088 0 12.833-5.745 12.833-12.833S21.088 1.167 14 1.167 1.167 6.912 1.167 14 6.912 26.833 14 26.833z"
      }
    })]);
  }
};