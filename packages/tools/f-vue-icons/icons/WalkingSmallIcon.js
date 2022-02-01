import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'WalkingSmallIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0.29 0.28 11 13.94"
      },
      "class": "c-ficon c-ficon--walking-small"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M10.646 6.125A4.086 4.086 0 0 1 7.89 3.937l-.14-.376h-.245a2.083 2.083 0 1 0-3.255.184A5.18 5.18 0 0 0 .934 6.44L.286 7.7l1.164.595L2.106 7a3.841 3.841 0 0 1 1.645-1.654v2.529a2.756 2.756 0 0 0 1.094 2.179 6.61 6.61 0 0 1-.787.42L1.23 11.777l.56 1.182 2.8-1.322a5.576 5.576 0 0 0 1.365-.875l1.138.77L8.24 14.22l1.207-.516-1.216-2.862a.665.665 0 0 0-.236-.28l-1.12-.717a4.12 4.12 0 0 0 .429-.797c.133-.327.219-.672.253-1.023l.193-2.03a5.311 5.311 0 0 0 2.546 1.426l.639.184.35-1.269-.639-.21ZM5.79 1.61a.77.77 0 1 1 0 1.54.77.77 0 0 1 0-1.54Zm-.088 7.437a1.461 1.461 0 0 1-.638-1.172V4.909c.177-.013.356-.013.534 0h.97l-.305 2.966a2.625 2.625 0 0 1-.167.665c-.08.19-.18.372-.297.542l-.097-.035Z",
        fill: "#242E30"
      }
    })]);
  }
};