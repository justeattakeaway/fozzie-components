import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default {
  name: 'RaysColouredNarrowIcon',
  props: {
    classModifier: {
      type: String,
      default: ''
    }
  },
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    ctx.data.class = _defineProperty({}, "c-ficon--".concat(ctx.props.classModifier), ctx.props.classModifier !== '');
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 320 101"
      },
      "class": "c-ficon c-ficon--rays-coloured-narrow"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      attrs: {
        fill: "#FFD700",
        d: "M160 41l160-.712V1.183z"
      }
    }), h("path", {
      attrs: {
        fill: "#95D600",
        d: "M86 95.616V101h35.137L160 41z"
      }
    }), h("path", {
      attrs: {
        fill: "#00AC41",
        d: "M1 101h85.66L160 41z"
      }
    }), h("path", {
      attrs: {
        fill: "#7DCAEB",
        d: "M243.565 101H309L160 41z"
      }
    }), h("path", {
      attrs: {
        fill: "#2F7DE1",
        d: "M158 101h52l-50-60z"
      }
    }), h("path", {
      attrs: {
        fill: "#E2E71F",
        d: "M120 100.998l38 .002 2-60z"
      }
    }), h("path", {
      attrs: {
        fill: "#2BACE4",
        d: "M208.638 101H244l-84-60z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF5000",
        d: "M308.503 101H320V74.772L160 41z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF9E16",
        d: "M160 41l160 35V36z"
      }
    }), h("path", {
      attrs: {
        fill: "#FF5959",
        d: "M0 75.643V101h2.104L160 41z"
      }
    }), h("path", {
      attrs: {
        fill: "#FA0029",
        d: "M0 0v76l160-35z"
      }
    })])]);
  }
};