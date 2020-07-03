import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'GiftIcon',
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
        viewBox: "0 0 28 28"
      },
      "class": "c-ficon c-ficon--gift"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M16.333 9.858v14.059h-1.166V9.858h1.166zm-3.5 0v14.059h-1.166V9.858h1.166zM10.35 6.067a1.397 1.397 0 0 0 .113 1.977c.32.318.815.578 1.439.771a8.36 8.36 0 0 0 1.491.306 5.75 5.75 0 0 0-1.139-2.938c-.518-.55-1.383-.586-1.904-.116zm2.783-.652l.032.039a6.916 6.916 0 0 1 1.418 4.311.583.583 0 0 1-.599.574 8.663 8.663 0 0 1-.764-.063 9.498 9.498 0 0 1-1.665-.346c-.787-.245-1.44-.588-1.896-1.042-1.04-.948-1.118-2.558-.135-3.644a2.556 2.556 0 0 1 3.609.17zm1.702.039l.032-.04c.95-1.042 2.565-1.118 3.65-.129.942 1.045.864 2.655-.157 3.585-.473.473-1.128.817-1.915 1.062-.535.166-1.1.277-1.666.345-.339.04-.605.058-.764.062a.583.583 0 0 1-.598-.574 6.916 6.916 0 0 1 1.418-4.311zm-.228 3.668l.033-.004c.5-.06.999-.158 1.458-.3.623-.194 1.118-.454 1.457-.792.565-.516.608-1.391.136-1.918a1.39 1.39 0 0 0-1.945.075 5.75 5.75 0 0 0-1.14 2.94zM23.333 14v-2.917a.583.583 0 0 0-.583-.583H5.25a.583.583 0 0 0-.583.583V14h18.666zM5.25 9.333h17.5c.966 0 1.75.784 1.75 1.75v3.5a.583.583 0 0 1-.583.584H4.083a.583.583 0 0 1-.583-.584v-3.5c0-.966.784-1.75 1.75-1.75zm.583 5.834v7.583c0 .322.262.583.584.583h15.166a.583.583 0 0 0 .584-.583v-7.583H5.833zM5.25 14h17.5c.322 0 .583.261.583.583v8.167a1.75 1.75 0 0 1-1.75 1.75H6.417a1.75 1.75 0 0 1-1.75-1.75v-8.167c0-.322.26-.583.583-.583z"
      }
    })]);
  }
};