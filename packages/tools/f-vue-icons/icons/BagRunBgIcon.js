import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'BagRunBgIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 128 87"
      },
      "class": "c-ficon c-ficon--bag-run-bg"
    }, ctx.data]), [h("g", {
      "attrs": {
        "fill": "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      "attrs": {
        "d": "M-10 118h148V-30H-10z"
      }
    }), h("g", {
      "attrs": {
        "fill-rule": "nonzero"
      }
    }, [h("path", {
      "attrs": {
        "d": "M6.055.516l15.798 84.573 106.06-64.991z",
        "fill": "#FFD9B2"
      }
    }), h("path", {
      "attrs": {
        "d": "M72.029 68.319c6.328 3.088 10.584 9.632 10.692 16.689.029 1.7 2.675 1.707 2.646 0-.123-7.939-4.85-15.493-12.001-18.965-1.527-.742-2.868 1.544-1.337 2.285v-.009zM49.236 83.697c8.404 1.9 14.464-7.497 14.748-14.773.066-1.705-2.58-1.7-2.646 0a14.333 14.333 0 01-3.374 8.76c-1.951 2.267-4.917 4.175-8.024 3.474-1.659-.375-2.366 2.176-.704 2.55v-.01z",
        "fill": "#4C4C4C"
      }
    }), h("path", {
      "attrs": {
        "d": "M36.956 70.722l4.962-19.638 2.738-10.642 1.31-17.712 5.304-3.821 50.8-.726-4.144 21.249-1.972 9.416s.543 14.439-.736 20.834c0 0-19.73 3.484-30.02 3.563-10.292.08-28.242-2.523-28.242-2.523z",
        "fill": "#FFF"
      }
    }), h("path", {
      "attrs": {
        "d": "M51.453 18.646l-5.806 4.88-1.01 18.058-7.68 29.138 6.751.741s5.983-15.84 7.163-22.933c1.18-7.094.582-29.884.582-29.884z",
        "fill": "#FF8000"
      }
    }), h("path", {
      "attrs": {
        "d": "M44.645 23.526a266.452 266.452 0 00-1.005 17.932c-.029 1.277 1.956 1.277 1.985 0 .135-5.986.47-11.963 1.005-17.932.115-1.27-1.87-1.263-1.985 0z",
        "fill": "#4C4C4C"
      }
    }), h("path", {
      "attrs": {
        "d": "M43.662 41.321A499.875 499.875 0 0035.99 70.46c-.289 1.241 1.625 1.764 1.914.527a499.382 499.382 0 017.672-29.139c.364-1.228-1.544-1.75-1.914-.527z",
        "fill": "#4C4C4C"
      }
    }), h("path", {
      "attrs": {
        "d": "M36.76 71.757a166.569 166.569 0 0047.256 1.155c3.821-.44 7.62-1.072 11.431-1.616 1.398-.2.803-2.327-.586-2.126-6.911.988-13.752 1.912-20.729 2.346-7.771.5-15.569.438-23.332-.183-4.507-.37-8.991-.938-13.451-1.702-1.387-.238-1.985 1.887-.587 2.126h-.002zm9.18-47.633c1.93-1.47 3.892-2.891 5.885-4.263 1.162-.8.06-2.712-1.102-1.903a155.357 155.357 0 00-5.886 4.26c-1.102.85-.017 2.766 1.114 1.906h-.011z",
        "fill": "#4C4C4C"
      }
    }), h("path", {
      "attrs": {
        "d": "M51.453 19.748l27.491-.461c1.418-.025 1.422-2.23 0-2.206l-27.491.464c-1.418.024-1.423 2.229 0 2.205z",
        "fill": "#4C4C4C"
      }
    }), h("path", {
      "attrs": {
        "d": "M79.237 19.184c7.619-.49 15.216-.07 22.832.106 1.42.033 1.42-2.172 0-2.205-7.619-.177-15.215-.597-22.832-.107-1.409.09-1.42 2.298 0 2.205z",
        "fill": "#4C4C4C"
      }
    }), h("path", {
      "attrs": {
        "d": "M101.006 17.89l-5.92 30.351c-.27 1.387 1.854 1.985 2.127.587l5.92-30.352c.27-1.387-1.855-1.984-2.127-.586z",
        "fill": "#4C4C4C"
      }
    }), h("path", {
      "attrs": {
        "d": "M94.852 48.848c.346 7.14.077 14.296-.805 21.39-.174 1.404 2.03 1.39 2.205 0 .882-7.094 1.152-14.25.805-21.39-.068-1.414-2.274-1.423-2.205 0zm-44.299-29.99c.335 4.807.504 9.62.507 14.439 0 1.418 2.205 1.422 2.205 0 0-4.819-.169-9.632-.507-14.44-.1-1.408-2.304-1.42-2.205 0zm-4.931 41.368a77.704 77.704 0 01-2.977 10.944c-.472 1.34 1.659 1.916 2.126.584a77.246 77.246 0 002.977-10.944c.271-1.384-1.854-1.984-2.126-.584zm4.975-16.975a110.066 110.066 0 01-.994 6.082c-.267 1.387 1.856 1.984 2.125.586.388-2.017.72-4.044.995-6.082.187-1.387-1.936-1.984-2.126-.586zM84.635 24.45l-.143.441a.662.662 0 00.463.814.68.68 0 00.814-.463l.141-.441a.662.662 0 00-.46-.814.677.677 0 00-.815.463zm-14.789.875l.145.294a.662.662 0 001.21-.157.73.73 0 00-.068-.51l-.145-.295a.662.662 0 00-1.21.16.732.732 0 00.068.508zM88.547 67.79l-.626 2.774c-.25 1.102 1.451 1.579 1.702.47l.627-2.766c.249-1.102-1.451-1.577-1.703-.467v-.011z",
        "fill": "#4C4C4C"
      }
    }), h("path", {
      "attrs": {
        "d": "M84.13 51.858a160.475 160.475 0 00-3.166-4.651v-4.086a.593.593 0 00-.3-.52l-.937-.464a.613.613 0 00-.882.36c-.104.483-.178.972-.22 1.464-.733-1.017-1.452-2.137-2.343-3.001-.844-.82-1.764-.862-2.802-.375-4.708 2.205-8.905 5.777-12.129 9.815a.62.62 0 00.122.948 5.541 5.541 0 002.99 1.12c-.505 2.137-.882 4.353-.902 6.488 0 1.42 1.122 1.402 2.267 1.497l1.543.13c.19-1.764.498-3.513.924-5.235a2.086 2.086 0 01-.313-.121c-.635-.32-.895-1.006-.913-1.68-.022-.768.197-1.528.375-2.267l.578-2.388c.13-.54.964-.311.834.22l-.51 2.1c-.075.313-.16.626-.236.943.04.067.06.143.058.22a.253.253 0 00.048.153.692.692 0 00.258.2c.092.052.19.09.293.115.07.02.144.038.22.053.27-1.323.574-2.633.914-3.93.139-.537.972-.308.831.221a77.709 77.709 0 00-.683 2.84c-.067.307-.13.616-.195.922a3.753 3.753 0 001.026-.22c.348-1.211.69-2.426 1.034-3.634.152-.534.986-.307.834.22-.37 1.303-.728 2.61-1.114 3.91a5.687 5.687 0 01-.725 1.678 1.019 1.019 0 01-.953.467.6.6 0 01-.128.029 7.41 7.41 0 01-.346.033 57.262 57.262 0 01-.622 5.261l1.521.126c1.25.1 2.506.185 3.762.196.167-.933.362-1.86.587-2.78l-.282-.011a2.165 2.165 0 01-.942-.144.662.662 0 01-.335-.388.474.474 0 01-.163-.463c.103-.67.25-1.333.44-1.984a15.945 15.945 0 013.443-6.117c.117-.461.882-.441.849.09v.05a.426.426 0 010 .14 90.17 90.17 0 01-.243 3.177 85.55 85.55 0 01-.661 5.293.265.265 0 01-.016.101 65.335 65.335 0 01-.511 3.003c.864-.037 1.764-.147 2.445-.531 1.116-.62 1.211-1.967 1.42-3.087.264-1.403.525-2.806.785-4.21a7.19 7.19 0 002.812-.419.609.609 0 00.36-.877zm-21.469-1.17c.027-.034.053-.068.082-.1.018.062.042.124.07.182l-.152-.081zm7.13-3.889l-.056-.049.08-.06c-.007.038-.016.074-.024.109zm7.748-2.256c.316.426.633.851.946 1.28.09.125.179.25.272.376a12.59 12.59 0 01-1.218-1.656zm2.216.988l-.052-.07a.53.53 0 00.052-.12v.19z",
        "fill": "#FF8000"
      }
    }), h("g", {
      "attrs": {
        "fill": "#FF8000"
      }
    }, [h("path", {
      "attrs": {
        "d": "M62.672 24.889c2.291 6.234 9.37 7.573 15.202 6.364.834-.174.481-1.448-.352-1.276-5.057 1.049-11.553.061-13.576-5.441-.29-.791-1.57-.44-1.274.353z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "#FF8000"
      }
    }, [h("path", {
      "attrs": {
        "d": "M64.491 26.127c.49-.475 1.281-.305 1.74.134.703.675.187 1.323-.254 1.945-.491.697.662 1.358 1.143.661.44-.63.853-1.17.793-1.984a2.463 2.463 0 00-.882-1.683c-.996-.843-2.507-.955-3.474-.017-.613.593.324 1.528.935.937v.006z"
      }
    }), h("path", {
      "attrs": {
        "d": "M64.551 26.201a8.876 8.876 0 011.323 1.612c.456.717 1.603.053 1.144-.661a10.585 10.585 0 00-1.524-1.879c-.61-.595-1.543.34-.937.935l-.006-.007z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M48.41 31.584a15.374 15.374 0 00-14.067-.741c-1.945.895-3.694 2.463-4.113 4.645a6.174 6.174 0 001.873 5.76c1.267 1.131 3.144-.734 1.872-1.872a3.508 3.508 0 01-1.052-3.748c.547-1.566 2.287-2.4 3.749-2.882a12.757 12.757 0 0110.395 1.12c1.475.86 2.807-1.427 1.336-2.284l.006.002z"
      }
    }), h("path", {
      "attrs": {
        "d": "M34.713 38.96a2.386 2.386 0 00-2.355.882c-.566.688-1 1.581-.943 2.49.1 1.673 1.903 2.692 3.444 2.185 1.541-.507 2.234-2.32 1.848-3.828-.22-.83-.792-1.603-1.652-1.824-1.034-.262-1.876.353-2.256 1.268-.273.662.296 1.453.924 1.628.761.209 1.354-.263 1.628-.924l.048-.12-.337.583c-.27.313-.677-.15-.918-.014-.081.049.04-.22 0 .03-.03.151.058.244.047.325a.748.748 0 01-.141.375c.097-.145-.164.144.026-.015a.238.238 0 01-.121-.016c.086.09.05.108-.013-.024.013.027.147.265.116.265-.03 0 .188-.479.203-.505-.158.247.186-.311.146-.2.062-.18.428.114-.386 0 .706.105 1.422-.18 1.627-.925.172-.626-.22-1.52-.924-1.627l-.01-.009z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M99.386 31.312c4.256 2.195 9.599-.063 12.516-3.497 2.785-3.274 3.467-8.589-.13-11.599-1.299-1.085-3.18.776-1.872 1.872 5.777 4.832-3.614 13.809-9.178 10.94-1.513-.78-2.851 1.502-1.336 2.284z"
      }
    }), h("path", {
      "attrs": {
        "d": "M109.666 15.116c-1.241.84-2.399 2.747-1.462 4.214.937 1.466 3.26 1.193 4.311.015 1.09-1.22.882-3.279-.558-4.148-1.373-.827-3.37-.03-3.7 1.568-.176.703.23 1.42.924 1.63.662.178 1.482-.22 1.627-.924.053-.252 0-.088-.026-.018a.179.179 0 01-.086.075l.115-.066c-.047.121-.324-.044-.027.042l-.16-.022a.117.117 0 01-.07-.057c-.041-.062-.026-.03.054.099-.016.02-.031-.126-.031-.124.03.13.053.095-.018.22.031-.048.077-.107-.017-.023a.51.51 0 01-.256.108c-.016 0-.09.024-.077 0 0 .02.494.397.315.54.029-.022.13-.441.152-.468a1.1 1.1 0 01.324-.361c.617-.38.826-1.178.474-1.81-.341-.587-1.215-.883-1.808-.477v-.013z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M58.736 18.241a70.778 70.778 0 01-1.298-5.073c-.219-1.02-1.949-1.08-2.125 0l-.03.19c-.222 1.39 1.895 1.984 2.125.586l.031-.19h-2.126c.37 1.707.803 3.397 1.297 5.074.401 1.359 2.531.779 2.126-.586z"
      }
    }), h("path", {
      "attrs": {
        "d": "M56.416 14.472c4.005-.1 8.012.16 11.971.774 1.39.22 1.985-1.907.587-2.126a70.42 70.42 0 00-12.57-.852c-1.415.03-1.422 2.236 0 2.205h.012z"
      }
    }), h("path", {
      "attrs": {
        "d": "M67.918 15.085l1.305 2.803c.252.54 1.028.675 1.508.395.554-.325.647-.966.395-1.509l-1.303-2.803c-.251-.54-1.03-.674-1.508-.394-.554.324-.649.966-.397 1.508z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M75.263 18.239l1.627-7.498c.3-1.385-1.826-1.984-2.128-.586l-1.624 7.496c-.3 1.383 1.826 1.974 2.125.587z"
      }
    }), h("path", {
      "attrs": {
        "d": "M76.187 11.378c4.558.053 9.116.018 13.672 0 1.418 0 1.423-2.205 0-2.205-4.558.02-9.116.055-13.672 0-1.42-.015-1.42 2.19 0 2.205z"
      }
    }), h("path", {
      "attrs": {
        "d": "M89.116 10.34c-.184 2.297-.6 4.57-1.24 6.783-.392 1.367 1.736 1.95 2.127.586a37.17 37.17 0 001.323-7.37c.11-1.415-2.095-1.406-2.205 0h-.005z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "#FF8000"
      }
    }, [h("path", {
      "attrs": {
        "d": "M1.543 54.947h18.6c1.66 0 1.663-2.58 0-2.58h-18.6c-1.66 0-1.663 2.58 0 2.58zm11.742-11.172h6.962c1.66 0 1.663-2.58 0-2.58h-6.962c-1.66 0-1.662 2.58 0 2.58zM6.427 67.591h8.728c1.66 0 1.663-2.58 0-2.58H6.427c-1.66 0-1.662 2.58 0 2.58zm13.56-.148h2.505c1.66 0 1.662-2.58 0-2.58h-2.505c-1.66 0-1.663 2.58 0 2.58z"
      }
    })])])])]);
  }
};