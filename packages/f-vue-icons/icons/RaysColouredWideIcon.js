import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'RaysColouredWideIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1272 215"
      },
      "class": "ficon ficon-rays-coloured-wide"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      attrs: {
        fill: "gold",
        d: "M656 135l616-68.81V0z"
      }
    }), h("path", {
      attrs: {
        fill: "#95D600",
        d: "M344 201.896V215h140.55L656 135z"
      }
    }), h("path", {
      attrs: {
        fill: "#00AC41",
        d: "M3 215h341.073L656 135z"
      }
    }), h("path", {
      attrs: {
        fill: "#7DCAEB",
        d: "M968.079 215H1228l-572-80z"
      }
    }), h("path", {
      attrs: {
        fill: "#2F7DE1",
        d: "M627 215h208l-179-80z"
      }
    }), h("path", {
      attrs: {
        fill: "#E2E71F",
        d: "M485 214.996l143.163.004L656 135z"
      }
    }), h("path", {
      attrs: {
        fill: "#2BACE4",
        d: "M829.448 215H970l-314-80z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF5000",
        d: "M1226.308 215H1272v-63.834L656 135z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF9E16",
        d: "M656 135l616 21V66z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF5959",
        d: "M0 155.678V215h8.364L656 135z"
      }
    }), h("path", {
      attrs: {
        fill: "#FA0029",
        d: "M0 1v155l656-21z"
      }
    })])]);
  }
};