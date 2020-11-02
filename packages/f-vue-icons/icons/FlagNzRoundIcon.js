import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagNzRoundIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      },
      "class": "c-ficon c-ficon--flag.nz.round"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "m512 256a256 256 0 0 1 -512 0l256-256a256 256 0 0 1 256 256z",
        fill: "#0052b4"
      }
    }), h("path", {
      attrs: {
        d: "m256 0a256 256 0 0 0 -256 256h133.6v-75.2l75.2 75.2h47.2v-47.2l-75.2-75.2h75.2zm125.8 91.5-11.3 35h-36.7l29.7 21.4-11.3 35 29.6-21.7 29.7 21.6-11.5-34.8 29.7-21.5h-36.7l-11.3-34.9zm61.3 72.5-11.3 35h-36.7l29.7 21.4-11.3 35 29.6-21.7 29.7 21.6-11.4-34.9 29.7-21.5h-36.7zm-122.8 10.3-11.3 34.9h-36.7l29.7 21.5-11.3 34.9 29.6-21.6 29.7 21.6-11.4-35 29.7-21.5h-36.7zm59.1 129.7-11.3 34.9h-36.7l29.7 21.5-11.3 34.9 29.6-21.6 29.7 21.6-11.4-35 29.7-21.5h-36.7z",
        fill: "#eee"
      }
    }), h("path", {
      attrs: {
        d: "m129.5 33.4a257.2 257.2 0 0 0 -96.1 96.1v126.5h66.8v-155.8h155.8v-66.8zm252.3 83.4-5.6 17.4h-18.4l14.9 10.8-5.7 17.4 14.8-10.8 14.9 10.8-5.7-17.4 14.8-10.8h-18.3zm-248.2 16.8 122.4 122.4v-31.5l-91-91h-31.4zm309.4 55.7-5.6 17.4h-18.4l14.9 10.8-5.7 17.4 14.8-10.8 15 10.9-5.7-17.4 14.8-10.8h-18.3l-5.7-17.4zm-122.8 10.2-5.6 17.5h-18.4l14.9 10.7-5.7 17.5 14.8-10.8 14.9 10.8-5.7-17.5 14.8-10.7h-18.2l-5.7-17.5zm59.1 129.7-5.6 17.5h-18.4l14.9 10.7-5.7 17.5 14.8-10.8 14.8 10.8-5.6-17.5 14.8-10.7h-18.3z",
        fill: "#d80027"
      }
    })]);
  }
};