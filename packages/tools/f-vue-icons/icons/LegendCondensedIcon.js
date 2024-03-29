import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'LegendCondensedIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 56 32"
      },
      "class": "c-ficon c-ficon--legend-condensed"
    }, ctx.data]), [h("defs", [h("path", {
      "attrs": {
        "id": "legend-condensed-a",
        "d": "M9.802.266L8.514 1.56.939.529.807.266z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-c",
        "d": "M.336 10.331l2.343-4.915L.336.754v9.577zm6.203 2.433l7.575 1.03 2.07-2.077-10.916-1.483 1.27 2.53z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-e",
        "d": "M6.123 8.591L.917 3.581 11.976 1.84l.786-1.649h4.372v1.67L15.94 4.37l-8.258 1.3 3.035 2.922z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-g",
        "d": "M5.45 16.416L.919 12.051l11.06-1.74L16.827.139l.953 1.898v6.942l-1.842 3.86-8.257 1.301 2.364 2.276z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-i",
        "d": "M4.75 15.74L.917 12.05l11.06-1.74L16.827.14l.308.613v9.58L15.94 12.84l-8.257 1.3 1.662 1.6H4.75z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-k",
        "d": "M.002 12.998l1.004-.158 3.54-7.424L1.894.14.002 4.105z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-m",
        "d": "M.083.681L4.35 4.79 2.574 15.933 7.8 13.095l1.263-8.193L4.678.682z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-o",
        "d": "M.082.681L4.35 4.79l-1.344 8.433h4.559l.235-.127 1.263-8.193L4.677.68H.082z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-q",
        "d": "M.877 2.345L3.416 4.79 1.641 15.933l5.225-2.838 1.262-8.193L3.745.682H.877v1.663zm15.05 10.524l-4.258-2.199 2.49-1.446 1.767.913v2.732zm-4.344-2.243l.01.006-.01-.006z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-s",
        "d": "M.472 10.701l.794-.43 1.262-8.193L.472.098v10.604zM6.07 7.847l9.788 5.056-.544-3.013L8.56 6.4 6.07 7.848zm-.086-.045l.01.006-.01-.006z"
      }
    }), h("path", {
      "attrs": {
        "id": "legend-condensed-u",
        "d": "M.47 2.2l9.787 5.056-.544-3.013L2.96.753.47 2.2zm-.087-.045l.01.006-.01-.006z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      "attrs": {
        "fill": "#575756",
        "fill-rule": "nonzero",
        "d": "M17.288 21.898h3.924c.43 0 .678.276.678.657 0 .368-.312.632-.691.632h-4.472c-.638 0-.938-.381-.833-1.026l1.25-7.598c.08-.448.3-.671.679-.671.456 0 .743.355.651.868l-1.186 7.138zm9.125-2.748c.131 0 .21-.065.236-.183.22-1.17-.378-1.683-1.33-1.683-1.057 0-1.63.604-1.851 1.866h2.945zm-3.115 1.066l-.04.236c-.156 1.038.495 1.578 1.604 1.578.482 0 .978-.118 1.473-.355a.812.812 0 01.327-.093c.365 0 .599.264.599.618 0 .264-.157.474-.457.645-.573.315-1.225.474-1.967.474-.939 0-1.67-.264-2.205-.79-.533-.538-.755-1.248-.676-2.13.012-.17.103-.696.261-1.59.351-1.84 1.603-2.696 3.102-2.696 1.59 0 2.96.974 2.542 3.024l-.052.237c-.144.566-.457.842-.951.842h-3.56zm6.727-1.236c-.098.442-.168.89-.21 1.34-.116 1.04.418 1.67 1.448 1.67.482 0 .991-.158 1.512-.473l.613-3.746c-.43-.237-.952-.355-1.552-.355-.976 0-1.576.525-1.81 1.564zm3.859 3.892c-.326 2.103-1.434 2.931-3.194 2.931-.875 0-1.76-.355-2.217-.724-.233-.17-.352-.367-.352-.617 0-.315.249-.604.613-.604.13 0 .274.052.444.144.508.369 1.055.552 1.615.552.979 0 1.618-.605 1.787-1.762a3.455 3.455 0 01-1.577.382c-.809 0-1.447-.25-1.918-.763-.455-.512-.651-1.196-.586-2.051.04-.5.131-1.039.249-1.63.351-1.734 1.446-2.616 3.115-2.616 1.148 0 2.125.408 2.633.79.221.169.3.367.261.604l-.873 5.364zm6.023-3.722c.13 0 .209-.065.235-.183.22-1.17-.378-1.683-1.33-1.683-1.057 0-1.63.604-1.851 1.866h2.946zm-3.115 1.066l-.04.237c-.156 1.038.495 1.578 1.604 1.578.482 0 .978-.119 1.473-.355a.812.812 0 01.327-.093c.365 0 .599.264.599.618 0 .264-.157.474-.456.645-.574.315-1.226.474-1.968.474-.939 0-1.67-.264-2.204-.79-.534-.538-.756-1.248-.677-2.13.012-.17.103-.696.261-1.59.351-1.84 1.603-2.696 3.102-2.696 1.59 0 2.96.974 2.542 3.024l-.052.237c-.144.566-.457.841-.951.841h-3.56zm10.806 2.379c-.064.434-.287.645-.678.645-.43 0-.703-.343-.638-.829l.56-3.353c.222-1.302-.625-1.604-1.343-1.604a2.99 2.99 0 00-1.564.434l-.77 4.72c-.064.42-.298.632-.678.632-.455 0-.716-.355-.651-.843l.834-5.022c.04-.25.17-.433.392-.578a4.856 4.856 0 012.542-.684c.86 0 1.55.237 2.06.725.507.484.691 1.208.534 2.168l-.6 3.589zm3.143-.999c.274.276.678.42 1.185.42.51 0 .992-.144 1.422-.446l.6-3.681c-.312-.224-.951-.473-1.578-.473-.925 0-1.512.525-1.746 1.564-.078.328-.144.775-.21 1.34-.064.566.053.986.327 1.276zm1.526-5.483a3.93 3.93 0 011.903.46l.352-2.117c.065-.433.286-.644.665-.644.456 0 .716.355.652.842l-1.227 7.44c-.051.277-.13.382-.392.54a4.06 4.06 0 01-2.293.684c-.873 0-1.59-.264-2.138-.802-.547-.54-.782-1.29-.691-2.262.04-.355.118-.854.248-1.525.352-1.696 1.473-2.616 2.92-2.616z"
      }
    }), h("g", {
      "attrs": {
        "transform": "translate(22.4 12.76)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-b",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-a"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#EA5E65",
        "fill-rule": "nonzero",
        "d": "M22.139.266v6.692L-5.264 3.504z",
        "mask": "url(#legend-condensed-b)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(16.8 .524)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-d",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-c"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#E20613",
        "fill-rule": "nonzero",
        "d": "M4.143.138l23.595-.273v12.637L.335 15.739z",
        "mask": "url(#legend-condensed-d)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(0 8.995)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-f",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-e"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#81CFF4",
        "fill-rule": "nonzero",
        "d": "M-9.679 8.591l-.588-8.4L17.136 7.27z",
        "mask": "url(#legend-condensed-f)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(0 .524)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-h",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-g"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#F6A500",
        "fill-rule": "nonzero",
        "d": "M15.694-2.584l2.087 19L-1.456-3.76",
        "mask": "url(#legend-condensed-h)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(0 .524)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-j",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-i"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#EB6608",
        "fill-rule": "nonzero",
        "d": "M-10.267 8.662L.237-2.996 17.136 15.74z",
        "mask": "url(#legend-condensed-j)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(14.933 .524)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-l",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-k"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#FFDC00",
        "fill-rule": "nonzero",
        "d": "M.002-5.231L6.944-.135 2.203 15.74z",
        "mask": "url(#legend-condensed-l)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(4.667 15.583)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-n",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-m"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#2580C3",
        "fill-rule": "nonzero",
        "d": "M-12.595 13.223L12.469.68 1.462 18.118",
        "mask": "url(#legend-condensed-n)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(4.667 15.583)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-p",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-o"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#1DB4E9",
        "fill-rule": "nonzero",
        "d": "M12.47.681l-25.064 12.542-.934-11.518z",
        "mask": "url(#legend-condensed-p)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(5.6 15.583)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-r",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-q"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#D2D700",
        "fill-rule": "nonzero",
        "d": "M15.926 18.824L.877 17.176 11.536.681z",
        "mask": "url(#legend-condensed-r)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(11.2 18.407)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-t",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-s"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#93C01F",
        "fill-rule": "nonzero",
        "d": "M24.456 13.73H.472L5.936-2.141z",
        "mask": "url(#legend-condensed-t)"
      }
    })]), h("g", {
      "attrs": {
        "transform": "translate(16.8 24.054)"
      }
    }, [h("mask", {
      "attrs": {
        "id": "legend-condensed-v",
        "fill": "#fff"
      }
    }, [h("use", {
      "attrs": {
        "href": "#legend-condensed-u"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#00A65D",
        "fill-rule": "nonzero",
        "d": "M27.739 8.084h-8.883L.336-7.79l27.403 3.454z",
        "mask": "url(#legend-condensed-v)"
      }
    })])])]);
  }
};