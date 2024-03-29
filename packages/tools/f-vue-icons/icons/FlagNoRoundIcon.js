import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagNoRoundIcon',
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
      "class": "c-ficon c-ficon--flag.no.round"
    }, ctx.data]), [h("circle", {
      "attrs": {
        "cx": "256",
        "cy": "256",
        "r": "256",
        "fill": "#eee"
      }
    }), h("path", {
      "attrs": {
        "fill": "#d80027",
        "d": "M8.8 322.8A256.2 256.2 0 0 0 100.2 459V322.8H8.8zm225 188.2a259.3 259.3 0 0 0 22.2 1 256 256 0 0 0 247.2-189.2H233.7V511zm269.4-321.8A256 256 0 0 0 233.7 1v188.2h269.5zM100.2 53A256.2 256.2 0 0 0 8.8 189.2h91.4V53z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#0052b4",
        "d": "M509.8 222.6H200.3V6.1a254.3 254.3 0 0 0-66.7 25v191.5H2.2a258.2 258.2 0 0 0 0 66.8h131.4v191.5a254.3 254.3 0 0 0 66.7 25V289.4h309.5a258.6 258.6 0 0 0 0-66.8z"
      }
    })]);
  }
};