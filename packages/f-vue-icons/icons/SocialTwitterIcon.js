import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'SocialTwitterIcon',
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
      "class": "c-ficon c-ficon--social-twitter"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#535353",
        d: "M14 26.833c7.088 0 12.833-5.745 12.833-12.833S21.088 1.167 14 1.167 1.167 6.912 1.167 14 6.912 26.833 14 26.833zM14 28C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14zm8.064-17.502c-.4.58-.886 1.093-1.441 1.523v.108a9.244 9.244 0 0 1-9.437 9.179 9.588 9.588 0 0 1-5.077-1.446c-.527-.327-.247-1.141.37-1.075.228.024.459.036.693.035a5.813 5.813 0 0 0 2.334-.482 3.662 3.662 0 0 1-1.9-2.143.58.58 0 0 1 .176-.63 3.454 3.454 0 0 1-1.006-2.57l.51-.039a3.814 3.814 0 0 1-.823-2.138c0-.64.175-1.267.503-1.815a.583.583 0 0 1 .946-.077 8.349 8.349 0 0 0 5.308 2.891v-.055a3.652 3.652 0 0 1 3.695-3.597 3.733 3.733 0 0 1 2.449.904 5.767 5.767 0 0 0 1.51-.605.583.583 0 0 1 .844.691c-.05.146-.108.289-.174.426.456-.036.812.491.52.915zM7.782 12.61a.28.28 0 0 1 .008.006l-.008-.006zm11.562-2.34a.583.583 0 0 1-.575-.157 2.573 2.573 0 0 0-1.86-.78 2.486 2.486 0 0 0-2.523 2.44c0 .187.022.373.065.555a.583.583 0 0 1-.594.717 9.516 9.516 0 0 1-6.187-2.67c-.027.137-.04.274-.041.406.058.852.532 1.62 1.268 2.054.52.306.289 1.105-.315 1.085a6.626 6.626 0 0 1-.51-.034 2.322 2.322 0 0 0 1.735 1.503c.614.123.63.996.02 1.14a4.546 4.546 0 0 1-.662.105 2.497 2.497 0 0 0 1.887.894c.557.006.79.713.346 1.049A6.983 6.983 0 0 1 8.8 19.8a8.48 8.48 0 0 0 2.397.341 8.077 8.077 0 0 0 8.258-8.016c0-.183 0-.26-.007-.35a.583.583 0 0 1 .247-.52l.042-.03c-.47-.037-.687-.614-.394-.956z"
      }
    })]);
  }
};