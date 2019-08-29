import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'OfferIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20"
      },
      "class": "ficon ficon-offer"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M12.19 8.22a2.08 2.08 0 0 1-.67.74 1.82 1.82 0 0 1-1.14.31h-.05a.42.42 0 0 1-.37-.42c0-1.25-.23-1.94-.58-2.23a.7.7 0 0 0-.08-.06c-.09.96-.39 1.6-.96 2.32l-.22.29c-.43.54-.58.87-.58 1.47 0 1.17.95 1.87 2.47 1.87a2.41 2.41 0 0 0 2.49-2.32c0-.84-.12-1.5-.31-1.97zm-1.13.05c.28-.2.5-.53.62-1.06a.42.42 0 0 1 .65-.24c.16.11.36.36.55.75.28.6.45 1.42.45 2.48A3.24 3.24 0 0 1 10 13.34c-1.93 0-3.3-1.01-3.3-2.7 0-.81.23-1.32.76-1.99l.23-.28c.55-.7.78-1.26.8-2.3a.42.42 0 0 1 .32-.4l.08-.01a1.32 1.32 0 0 1 1.02.32c.51.42.82 1.2.88 2.42.08-.03.18-.07.26-.13zm6.05 4.11c.05-.16-.04-.4-.4-.97-.4-.67-.54-.95-.53-1.35 0-.37.14-.7.44-1.18l.11-.18c.37-.58.47-.8.42-.95-.04-.15-.26-.28-.86-.53l-.04-.02c-.7-.3-.99-.46-1.22-.78-.23-.33-.3-.66-.34-1.4-.04-.7-.1-.95-.23-1.05-.11-.08-.36-.06-1 .1l-.12.02c-.64.15-1 .18-1.38.05-.39-.13-.65-.37-1.12-.94a20.97 20.97 0 0 0-.18-.21c-.3-.35-.47-.49-.6-.49-.14 0-.34.16-.7.59l-.09.1c-.5.57-.73.8-1.12.92-.38.12-.73.07-1.41-.1L6.68 4c-.66-.16-.9-.19-1.03-.1-.12.09-.18.33-.24.99v.06c-.06.72-.13 1.06-.37 1.38-.24.33-.52.47-1.24.76-.63.25-.86.38-.91.54-.05.16.04.4.4.98.4.66.54.94.53 1.34 0 .37-.14.7-.44 1.18l-.11.18c-.37.58-.47.8-.42.95.04.15.26.28.86.53l.04.02c.7.3.99.45 1.22.78.23.33.3.66.34 1.4.04.7.1.95.23 1.05.11.08.36.06 1-.1l.12-.02c.64-.15 1-.18 1.38-.06.39.14.65.38 1.12.95l.18.21c.3.35.47.49.6.49.14 0 .34-.16.7-.59l.09-.1c.5-.57.74-.8 1.12-.92.38-.12.73-.08 1.41.1l.06.01c.66.17.9.2 1.03.1.12-.08.18-.32.24-.98v-.06c.06-.72.13-1.06.38-1.38.23-.33.51-.47 1.23-.76.63-.25.86-.38.91-.54zm-.6 1.32c-.56.22-.77.33-.88.47-.1.15-.16.4-.2.96l-.01.06c-.08.94-.17 1.3-.59 1.6-.41.3-.78.26-1.71.02l-.06-.01c-.53-.14-.78-.17-.96-.11-.17.05-.36.22-.74.67l-.08.1c-.54.62-.86.88-1.36.87-.45 0-.77-.25-1.22-.78l-.18-.22c-.37-.44-.56-.62-.75-.68-.17-.06-.43-.04-.92.08l-.11.02c-.94.22-1.3.25-1.7-.05-.42-.31-.5-.68-.56-1.64-.04-.6-.08-.84-.19-1-.1-.14-.32-.27-.86-.49-.9-.38-1.22-.58-1.38-1.07-.15-.49-.01-.82.51-1.65l.11-.17c.22-.36.32-.58.32-.75 0-.17-.1-.4-.41-.9-.5-.82-.65-1.18-.48-1.68.17-.5.5-.7 1.4-1.05.55-.22.76-.33.87-.47.1-.15.16-.4.2-.96l.01-.06c.08-.94.17-1.3.58-1.6.42-.3.79-.26 1.72-.02l.06.01c.53.14.78.17.95.11.18-.05.37-.22.75-.67l.08-.1c.54-.62.86-.88 1.35-.87.46 0 .78.25 1.23.78l.18.22c.37.44.56.62.75.68.17.06.43.04.92-.08l.11-.02c.94-.22 1.3-.25 1.7.05.42.31.5.68.56 1.64.04.6.08.84.19 1 .1.14.32.26.86.49.9.37 1.22.58 1.38 1.07.15.5.01.82-.51 1.65l-.1.16c-.23.37-.33.59-.33.76 0 .17.1.4.41.9.5.82.65 1.18.48 1.68-.17.5-.5.7-1.4 1.05z"
      }
    })]);
  }
};