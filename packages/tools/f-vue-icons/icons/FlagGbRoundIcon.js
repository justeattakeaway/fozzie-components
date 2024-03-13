import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagGbRoundIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 512 512"
      },
      "class": "c-ficon c-ficon--flag.gb.round"
    }, ctx.data]), [h("circle", {
      "attrs": {
        "cx": "256",
        "cy": "256",
        "r": "256",
        "fill": "#eee"
      }
    }), h("path", {
      "attrs": {
        "fill": "#0052b4",
        "d": "M53 100.1a255 255 0 0 0-44.2 89.1H142l-89-89zm450.2 89.1a255 255 0 0 0-44.1-89l-89 89h133zM8.8 322.8a255 255 0 0 0 44.1 89l89-89H9zm403-269.9a255 255 0 0 0-89-44V142l89-89zM100.2 459.1a255 255 0 0 0 89.1 44V370l-89 89zm89-450.3a255 255 0 0 0-89 44.1l89 89.1V8.8zm133.6 494.4a255 255 0 0 0 89-44.1l-89-89v133zM370 322.8l89 89a255 255 0 0 0 44.2-89H370z"
      }
    }), h("g", {
      "attrs": {
        "fill": "#d80027"
      }
    }, [h("path", {
      "attrs": {
        "d": "M509.8 222.6H289.4V2.2A258.6 258.6 0 0 0 256 0c-11.3 0-22.5.7-33.4 2.2v220.4H2.2A258.6 258.6 0 0 0 0 256c0 11.3.7 22.5 2.2 33.4h220.4v220.4a258.4 258.4 0 0 0 66.8 0V289.4h220.4A258.5 258.5 0 0 0 512 256c0-11.3-.7-22.5-2.2-33.4z"
      }
    }), h("path", {
      "attrs": {
        "d": "M322.8 322.8L437 437a256.6 256.6 0 0 0 15-16.4l-97.7-97.8h-31.5zm-133.6 0L75 437a256.6 256.6 0 0 0 16.4 15l97.8-97.7v-31.5zm0-133.6L75 75a256.6 256.6 0 0 0-15 16.4l97.7 97.8h31.5zm133.6 0L437 75a256.3 256.3 0 0 0-16.4-15l-97.8 97.7v31.5z"
      }
    })])]);
  }
};