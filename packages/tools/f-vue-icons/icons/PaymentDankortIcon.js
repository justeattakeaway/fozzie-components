import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'PaymentDankortIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 43 26"
      },
      "class": "c-ficon c-ficon--payment-dankort"
    }, ctx.data]), [h("defs", [h("linearGradient", {
      attrs: {
        id: "payment-dankort-a",
        x1: "49.988%",
        x2: "49.988%",
        y1: "-34.226%",
        y2: "137.575%"
      }
    }, [h("stop", {
      attrs: {
        offset: "0%",
        "stop-color": "#ED1C24"
      }
    }), h("stop", {
      attrs: {
        offset: "26%",
        "stop-color": "#EA1B23"
      }
    }), h("stop", {
      attrs: {
        offset: "48%",
        "stop-color": "#E01920"
      }
    }), h("stop", {
      attrs: {
        offset: "67%",
        "stop-color": "#CF161C"
      }
    }), h("stop", {
      attrs: {
        offset: "85%",
        "stop-color": "#B71016"
      }
    }), h("stop", {
      attrs: {
        offset: "100%",
        "stop-color": "#9E0B0F"
      }
    })]), h("linearGradient", {
      attrs: {
        id: "payment-dankort-b",
        x1: "5208%",
        x2: "5208%",
        y1: "624%",
        y2: "5754%"
      }
    }, [h("stop", {
      attrs: {
        offset: "0%",
        "stop-color": "#ED1C24"
      }
    }), h("stop", {
      attrs: {
        offset: "26%",
        "stop-color": "#EA1B23"
      }
    }), h("stop", {
      attrs: {
        offset: "48%",
        "stop-color": "#E01920"
      }
    }), h("stop", {
      attrs: {
        offset: "67%",
        "stop-color": "#CF161C"
      }
    }), h("stop", {
      attrs: {
        offset: "85%",
        "stop-color": "#B71016"
      }
    }), h("stop", {
      attrs: {
        offset: "100%",
        "stop-color": "#9E0B0F"
      }
    })]), h("linearGradient", {
      attrs: {
        id: "payment-dankort-c",
        x1: "3112%",
        x2: "3112%",
        y1: "624%",
        y2: "5754%"
      }
    }, [h("stop", {
      attrs: {
        offset: "0%",
        "stop-color": "#ED1C24"
      }
    }), h("stop", {
      attrs: {
        offset: "26%",
        "stop-color": "#EA1B23"
      }
    }), h("stop", {
      attrs: {
        offset: "48%",
        "stop-color": "#E01920"
      }
    }), h("stop", {
      attrs: {
        offset: "67%",
        "stop-color": "#CF161C"
      }
    }), h("stop", {
      attrs: {
        offset: "85%",
        "stop-color": "#B71016"
      }
    }), h("stop", {
      attrs: {
        offset: "100%",
        "stop-color": "#9E0B0F"
      }
    })])]), h("g", {
      attrs: {
        fill: "none"
      }
    }, [h("path", {
      attrs: {
        fill: "#FFF",
        stroke: "#333",
        "stroke-width": ".45",
        d: "M30.168.19H13.5c-4.466 0-8.592 2.364-10.825 6.2a12.317 12.317 0 000 12.402c2.233 3.836 6.36 6.2 10.825 6.2h16.668c6.904 0 12.5-5.552 12.5-12.4 0-6.85-5.596-12.402-12.5-12.402z"
      }
    }), h("path", {
      attrs: {
        fill: "url(#payment-dankort-a)",
        d: "M32.08 11.84l5.54 6.54a10.107 10.107 0 00-.196-11.848l-5.344 5.31z",
        transform: "translate(1)"
      }
    }), h("path", {
      attrs: {
        fill: "url(#payment-dankort-b)",
        d: "M16.376 5.98c4.14 0 7.256 1.044 7.576 4.504l4.356-4.504h8.676a10.298 10.298 0 00-7.816-3.6H12.5a10.308 10.308 0 00-7.816 3.573l11.692.028z",
        transform: "translate(1)"
      }
    }), h("path", {
      attrs: {
        fill: "url(#payment-dankort-c)",
        d: "M9.556 10.34L8.08 14.374h5.96c1.764 0 2.296-.722 2.692-2.12.396-1.396-.592-1.912-1.796-1.912h-5.38z",
        transform: "translate(1)"
      }
    }), h("path", {
      attrs: {
        fill: "url(#payment-dankort-b)",
        d: "M28.344 18.933l-4.604-5.778c-.852 3.936-3.64 5.774-8.868 5.774h-10.4a10.302 10.302 0 008.044 3.855h16.652a10.292 10.292 0 008.032-3.853h-8.856z",
        transform: "translate(1)"
      }
    })])]);
  }
};