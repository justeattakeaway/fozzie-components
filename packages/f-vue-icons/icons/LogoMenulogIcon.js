import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'LogoMenulogIcon',
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
      'c-ficon--pushLeft': ctx.props.pushLeft
    };
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 146 40"
      },
      "class": "c-ficon c-ficon--logo-menulog"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "#FF8000"
      }
    }, [h("path", {
      attrs: {
        d: "M37.824 18.46a57.24 57.24 0 0 0-4.141-6.012l-.038-.048-.012-.014c-.075-.094-.273-.337-.346-.432-.688-.938-1.493-8.452-1.588-9.006-.112-.652-.299-1.33-1.247-1.432-.77-.08-1.908-.208-3.168-.272-.583-.03-.884.283-1.037.57-.105.197-.152.42-.155.643-.017.963.003 1.434.003 1.553a.285.285 0 0 1-.103.203c-.107.09-.267.08-.379-.005-.597-.453-3.71-2.808-5.43-3.872a2.557 2.557 0 0 0-.25-.128c-.628-.281-1.36-.29-1.958.052-.042.024-.083.05-.123.076C17.285.692 7.585 6.183.242 18.4c0 0-.457.638-.115 1.235.331.687 3.537.881 4.05.94.58.06.576.533.576.533.06 5.014.148 7.448.968 15.95 0 0 .132.889 1.012.931.356.018 1.677-.058 5.196-.137a.242.242 0 0 0 .268-.216.24.24 0 0 0 0-.06c-.338-3.472-.445-6.474-.453-6.648-.008-.125-.122-.31-.238-.358-1.299-.74-2.07-2.036-2.082-3.527-.098-6.872.322-12.146.322-12.146s.041-.732.686-.673c.645.058.602.778.602.778-.231 2.96-.32 8.294-.32 8.294s0 1.015.974 1.013c.975-.002.975-1.013.975-1.013-.03-4.174.323-8.37.323-8.37s0-.711.687-.711c.375 0 .518.257.572.462.03.11.036.225.027.34-.286 3.613-.317 8.274-.317 8.274s0 1.014.975 1.012c.974-.001.97-1.096.97-1.096-.015-3.46.326-8.279.326-8.279.03-.375.219-.702.678-.706.573.018.617.566.606.706-.305 3.757-.314 9.515-.3 11.982a4.135 4.135 0 0 1-1.98 3.655.377.377 0 0 0-.163.356c.08 2.284.272 4.817.438 6.633a.25.25 0 0 0 .225.233c.973 0 2.84-.012 4.013-.012 1.882 0 2.633.012 4.014.031.155 0 .23-.113.243-.272.356-3.288.48-5.668.499-5.876.02-.235-.27-.279-.27-.279-.431-.059-1.441-.178-2.3-.318-.859-.14-.891-1.116-.891-1.116-.725-10.255 4.703-16.647 4.703-16.647s.54-.71 1.288-.431c.661.245.836 2.146.845 2.258.727 8.491-.094 18.393-.567 22.434-.019.166.06.296.208.33.187.03 3.447.14 3.744.106.53-.055.955-.457 1.037-.981 1.155-7.944.978-15.912.978-15.912a.587.587 0 0 1 .535-.533l3.124-.334c.41-.06.758-.222.939-.573.184-.385.17-.835-.048-1.201"
      }
    }), h("path", {
      attrs: {
        d: "M44.905 16.009h4.641c.227 0 .43.14.514.353l4.707 12.099c.091.234.42.235.513 0l4.759-12.101a.552.552 0 0 1 .513-.351h4.56c.304 0 .55.248.55.555v16.94a.553.553 0 0 1-.55.557h-3.143a.554.554 0 0 1-.551-.556v-8.94c0-.304-.418-.387-.532-.104l-3.74 9.253a.55.55 0 0 1-.51.347H53.38a.55.55 0 0 1-.511-.347l-3.74-9.253c-.114-.283-.53-.2-.53.105v8.939a.555.555 0 0 1-.553.556h-3.141a.554.554 0 0 1-.551-.556v-16.94c0-.308.247-.556.551-.556zM66.876 27.2c0-3.36 2.04-7.192 6.974-7.192 4.962 0 6.891 3.833 6.891 7.193 0 .262-.032.623-.077.938a.554.554 0 0 1-.547.478h-8.716a.279.279 0 0 0-.253.39c.532 1.226 1.807 1.777 3.06 1.777 1.01 0 2.003-.29 2.64-.772a.552.552 0 0 1 .715.056l1.716 1.672c.224.217.228.58.003.797-1.107 1.07-2.986 1.857-5.212 1.857-4.934 0-7.194-3.833-7.194-7.193zm4.434-1.443h5.052a.279.279 0 0 0 .263-.364c-.42-1.374-1.504-1.941-2.775-1.941-1.297 0-2.382.567-2.803 1.94a.28.28 0 0 0 .263.365zm10.865-5.416h2.729c.304 0 .551.249.551.556v.777h.055c.717-1 2.123-1.666 3.915-1.666 3.997 0 5.734 2.666 5.734 6.332v7.165a.554.554 0 0 1-.552.556H91.63a.554.554 0 0 1-.551-.556v-6.526c0-1.75-.69-3.194-2.646-3.194-1.875 0-2.73 1.36-2.73 3.194v6.526a.554.554 0 0 1-.551.556h-2.977a.554.554 0 0 1-.551-.556V20.897c0-.307.247-.556.551-.556zm14.086 7.721v-7.165c0-.307.247-.556.552-.556h2.976c.305 0 .552.249.552.556v6.582c0 1.722.634 3.138 2.481 3.138 1.82 0 2.674-1.333 2.674-3.138v-6.582c0-.307.247-.556.551-.556h2.977c.305 0 .552.249.552.556v12.608a.554.554 0 0 1-.552.556h-2.728a.555.555 0 0 1-.552-.556v-.777h-.055c-.717 1-2.068 1.666-3.804 1.666-3.915 0-5.624-2.666-5.624-6.332zm15.631-13.581h2.976c.305 0 .552.249.552.556v18.468a.554.554 0 0 1-.552.556h-2.976a.555.555 0 0 1-.552-.556V15.037c0-.307.247-.556.552-.556zm4.52 12.719c0-3.36 2.343-7.192 7.305-7.192s7.305 3.833 7.305 7.193c0 3.36-2.343 7.193-7.305 7.193s-7.305-3.833-7.305-7.193zm7.305 3.306c1.71 0 3.143-1.361 3.143-3.305 0-1.944-1.434-3.305-3.143-3.305-1.709 0-3.142 1.36-3.142 3.305 0 1.944 1.433 3.305 3.142 3.305zm9.634 6.504l1.822-1.874a.543.543 0 0 1 .723-.057c.633.491 1.605.87 2.652.87 1.737 0 3.28-.583 3.28-2.75v-1.36h-.055c-.496.666-1.764 1.472-3.694 1.472-4.107 0-6.395-3.083-6.395-6.527 0-3.86 2.646-6.776 6.395-6.776 1.902 0 3.198.667 3.942 1.61h.055v-.721c0-.307.247-.556.552-.556h2.756c.305 0 .552.249.552.556v12.386c0 3.694-2.647 6.249-7.388 6.249-2.213 0-4.105-.735-5.182-1.728a.556.556 0 0 1-.015-.793zm8.505-10.365c0-1.583-1.075-3.082-3.005-3.082s-3.005 1.5-3.005 3.082c0 1.584 1.075 3.083 3.005 3.083s3.005-1.5 3.005-3.083z"
      }
    })])]);
  }
};