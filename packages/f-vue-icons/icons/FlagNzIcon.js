import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagNzIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 480"
      },
      "class": "c-ficon c-ficon--flag.nz"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M0-.33v.5l1-.5z"
      }
    }), h("path", {
      attrs: {
        d: "M.19.263L-.104-.14.999-.324z"
      }
    }), h("use", {
      attrs: {
        transform: "scale(-1 1)",
        href: "#a"
      }
    }), h("use", {
      attrs: {
        transform: "rotate(72 0 0)",
        href: "#a"
      }
    }), h("use", {
      attrs: {
        transform: "rotate(-72 0 0)",
        href: "#a"
      }
    }), h("use", {
      attrs: {
        transform: "scale(-1 1) rotate(72)",
        href: "#a"
      }
    }), h("clipPath", {
      attrs: {
        id: "a"
      }
    }, [h("path", {
      attrs: {
        d: "M0 0h600v300H0z"
      }
    })]), h("clipPath", {
      attrs: {
        id: "b"
      }
    }, [h("path", {
      attrs: {
        d: "M0 0l300 150H0zm300 0h300L300 150zm0 150h300v150zm0 0v150H0z"
      }
    })]), h("path", {
      attrs: {
        d: "M0 0h640v480H0z",
        fill: "#00247d",
        "fill-rule": "evenodd"
      }
    }), h("g", {
      attrs: {
        transform: "translate(-92.95 36.12) scale(.66825)"
      }
    }, [h("use", {
      attrs: {
        fill: "#fff",
        height: "100%",
        width: "100%",
        href: "#b",
        transform: "matrix(45.4 0 0 45.4 900 120)"
      }
    }), h("use", {
      attrs: {
        fill: "#cc142b",
        height: "100%",
        width: "100%",
        href: "#b",
        transform: "matrix(30 0 0 30 900 120)"
      }
    })]), h("g", {
      attrs: {
        transform: "rotate(82 534.18 124.98) scale(.66825)"
      }
    }, [h("use", {
      attrs: {
        fill: "#fff",
        height: "100%",
        width: "100%",
        href: "#b",
        transform: "rotate(-82 519.02 -457.67) scale(40.4)"
      }
    }), h("use", {
      attrs: {
        fill: "#cc142b",
        height: "100%",
        width: "100%",
        href: "#b",
        transform: "rotate(-82 519.02 -457.67) scale(25)"
      }
    })]), h("g", {
      attrs: {
        transform: "rotate(82 534.18 124.98) scale(.66825)"
      }
    }, [h("use", {
      attrs: {
        fill: "#fff",
        height: "100%",
        width: "100%",
        href: "#b",
        transform: "rotate(-82 668.57 -327.67) scale(45.4)"
      }
    }), h("use", {
      attrs: {
        fill: "#cc142b",
        height: "100%",
        width: "100%",
        href: "#b",
        transform: "rotate(-82 668.57 -327.67) scale(30)"
      }
    })]), h("g", {
      attrs: {
        transform: "translate(-92.95 36.12) scale(.66825)"
      }
    }, [h("use", {
      attrs: {
        fill: "#fff",
        height: "100%",
        width: "100%",
        href: "#b",
        transform: "matrix(50.4 0 0 50.4 900 480)"
      }
    }), h("use", {
      attrs: {
        fill: "#cc142b",
        height: "100%",
        width: "100%",
        href: "#b",
        transform: "matrix(35 0 0 35 900 480)"
      }
    })]), h("path", {
      attrs: {
        "clip-path": "url(#a)",
        d: "M0 0l600 300M0 300L600 0",
        transform: "scale(.60681 .73139)",
        stroke: "#fff",
        "stroke-width": "60"
      }
    }), h("path", {
      attrs: {
        "clip-path": "url(#b)",
        d: "M0 0l600 300M0 300L600 0",
        transform: "scale(.60681 .73139)",
        stroke: "#cc142b",
        "stroke-width": "40"
      }
    }), h("path", {
      style: "line-height:normaltext-indent:0text-align:starttext-decoration-line:nonetext-decoration-style:solidtext-decoration-color:#000text-transform:noneblock-progression:tbisolation:automix-blend-mode:normal",
      attrs: {
        "clip-path": "url(#a)",
        d: "M151.7 0v79.37H0v60.68h151.7v79.37h60.69v-79.37h151.7V79.37H212.4V0z",
        color: "#000",
        "font-weight": "400",
        "font-family": "sans-serif",
        "white-space": "normal",
        overflow: "visible",
        fill: "#fff"
      }
    }), h("path", {
      style: "line-height:normaltext-indent:0text-align:starttext-decoration-line:nonetext-decoration-style:solidtext-decoration-color:#000text-transform:noneblock-progression:tbisolation:automix-blend-mode:normal",
      attrs: {
        d: "M163.84 0v91.5H0v36.41h163.84v91.5h36.41v-91.5H364.1v-36.4H200.25V0z",
        color: "#000",
        "font-weight": "400",
        "font-family": "sans-serif",
        "white-space": "normal",
        overflow: "visible",
        fill: "#cc142b"
      }
    })]);
  }
};