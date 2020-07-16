import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'LoyaltyStampAwardedIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 30 30"
      },
      "class": "c-ficon c-ficon--loyalty-stamp-awarded"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none",
        "fill-rule": "evenodd"
      }
    }, [h("circle", {
      attrs: {
        cx: "15",
        cy: "15",
        r: "15",
        fill: "#00AC41"
      }
    }), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M12.663 9h1.166v4c-.119 1.203-1.102 2.148-2.332 2.24V21h-1.165v-5.76C9.102 15.148 8.118 14.203 8 13V9h1.166v4c0 .486.495.914 1.166 1.07V9h1.165v5.07c.67-.161 1.166-.584 1.166-1.07V9zm6.412 0c-1.763.173-3.059 1.698-2.915 3.429-.087 1.507.87 2.885 2.332 3.358V21h1.166v-5.213c1.462-.473 2.418-1.85 2.331-3.358.144-1.731-1.152-3.256-2.914-3.429zm0 5.714c-.964 0-1.749-1.028-1.749-2.285 0-1.258.785-2.286 1.749-2.286.964 0 1.748 1.028 1.748 2.286 0 1.257-.784 2.285-1.748 2.285z"
      }
    })])]);
  }
};