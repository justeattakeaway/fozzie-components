import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'PaymentMastercardIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 100 60"
      },
      "class": "c-ficon c-ficon--payment-mastercard"
    }, ctx.data]), [h("g", {
      "attrs": {
        "fill": "none",
        "fill-rule": "evenodd"
      }
    }, [h("rect", {
      "attrs": {
        "fill": "#006",
        "width": "100",
        "height": "60",
        "rx": "4"
      }
    }), h("path", {
      "attrs": {
        "d": "M56.13 30.485C56.13 41.265 47.39 50 36.613 50S17.1 41.264 17.1 30.485c-.002-10.778 8.736-19.515 19.514-19.515 10.778 0 19.515 8.737 19.515 19.515",
        "fill": "#C00"
      }
    }), h("path", {
      "attrs": {
        "d": "M62.814 10.97a19.447 19.447 0 0 0-13.1 5.05 19.73 19.73 0 0 0-1.97 2.067h3.942a20.278 20.278 0 0 1 1.488 2.067h-6.92c-.413.664-.79 1.353-1.124 2.067h9.167c.314.67.59 1.36.827 2.067h-10.82a19.545 19.545 0 0 0-.567 2.066H55.69c.286 1.332.44 2.714.44 4.132 0 2.167-.354 4.252-1.006 6.2h-10.82c.237.707.513 1.397.826 2.067h9.167c-.335.712-.71 1.402-1.125 2.067h-6.917c.45.718.948 1.41 1.488 2.063h3.942a19.453 19.453 0 0 1-1.972 2.067 19.446 19.446 0 0 0 13.1 5.05c10.78 0 19.516-8.736 19.516-19.515 0-10.777-8.738-19.515-19.516-19.515",
        "fill": "#F90"
      }
    }), h("path", {
      "attrs": {
        "d": "M32.057 32.622a3.69 3.69 0 0 0-.473-.033c-1.2 0-1.808.41-1.808 1.225 0 .5.296.82.76.82.862 0 1.484-.822 1.52-2.013zm1.54 3.587h-1.755l.04-.835c-.535.66-1.25.973-2.22.973-1.148 0-1.935-.896-1.935-2.2 0-1.96 1.37-3.102 3.72-3.102.24 0 .548.022.863.062.065-.266.082-.38.082-.522 0-.533-.37-.733-1.358-.733a7.087 7.087 0 0 0-2.243.363c.023-.134.295-1.81.295-1.81 1.055-.31 1.752-.427 2.535-.427 1.82 0 2.784.816 2.782 2.36.003.414-.066.923-.172 1.595-.184 1.165-.578 3.666-.632 4.274zm-6.757.001h-2.12l1.215-7.61-2.71 7.61H21.78l-.177-7.567-1.276 7.566h-1.983L20 26.31h3.047l.184 5.54 1.86-5.54h3.388l-1.638 9.9m38.591-3.588a3.688 3.688 0 0 0-.472-.033c-1.202 0-1.808.41-1.808 1.225 0 .5.295.82.76.82.86 0 1.484-.822 1.52-2.013zm1.542 3.587h-1.756l.04-.835c-.535.66-1.25.973-2.22.973-1.15 0-1.935-.896-1.935-2.2 0-1.96 1.37-3.102 3.72-3.102.24 0 .547.022.862.062.066-.266.083-.38.083-.522 0-.533-.37-.733-1.36-.733a7.096 7.096 0 0 0-2.242.363c.023-.134.296-1.81.296-1.81 1.054-.31 1.75-.427 2.534-.427 1.82 0 2.783.816 2.78 2.36.005.414-.063.923-.17 1.595-.183 1.165-.58 3.666-.632 4.274zm-23.961-.122c-.58.182-1.032.26-1.522.26-1.082 0-1.673-.62-1.673-1.768-.015-.356.156-1.292.29-2.146.123-.752.92-5.494.92-5.494h2.105l-.246 1.22h1.272l-.287 1.934h-1.275c-.245 1.53-.594 3.437-.598 3.69 0 .415.222.597.726.597.24 0 .428-.024.57-.075l-.28 1.782m6.455-.067c-.724.223-1.42.33-2.16.328-2.358-.003-3.587-1.234-3.587-3.59 0-2.753 1.563-4.78 3.686-4.78 1.735 0 2.844 1.135 2.844 2.914 0 .59-.076 1.167-.26 1.98H45.8c-.14 1.168.606 1.654 1.832 1.654.752 0 1.433-.155 2.19-.506l-.352 2zm-1.184-4.77c.012-.17.223-1.438-.98-1.438-.67 0-1.15.51-1.345 1.437h2.326zm-13.418-.546c0 1.017.494 1.72 1.613 2.247.86.405.993.524.993.89 0 .5-.38.73-1.217.73-.633 0-1.22-.1-1.9-.32l-.29 1.86c.482.104.91.2 2.205.238 2.236 0 3.27-.85 3.27-2.69 0-1.107-.433-1.756-1.494-2.244-.888-.408-.99-.5-.99-.875 0-.436.352-.658 1.036-.658.416 0 .984.044 1.522.12l.302-1.867c-.55-.087-1.38-.156-1.865-.156-2.37 0-3.19 1.237-3.182 2.724m24.903-2.511c.588 0 1.138.152 1.893.534l.347-2.148c-.31-.122-1.403-.838-2.33-.838-1.416 0-2.616.704-3.458 1.864-1.23-.407-1.736.416-2.355 1.236l-.55.128c.042-.27.08-.537.068-.81H51.44c-.264 2.493-.735 5.016-1.103 7.51l-.097.54h2.12c.353-2.298.547-3.77.665-4.766l.798-.442c.12-.445.492-.594 1.24-.576a9.089 9.089 0 0 0-.15 1.65c0 2.634 1.423 4.274 3.703 4.274.587 0 1.092-.077 1.873-.29l.37-2.255c-.702.345-1.278.507-1.8.507-1.23 0-1.976-.91-1.976-2.412 0-2.18 1.108-3.706 2.69-3.706M77.71 26.31l-.47 2.86c-.578-.762-1.2-1.314-2.022-1.314-1.07 0-2.042.81-2.68 2.004a17.462 17.462 0 0 1-1.803-.497v.008c.07-.667.1-1.072.093-1.21H68.88c-.263 2.49-.735 5.014-1.103 7.507l-.097.542h2.12c.286-1.86.505-3.403.666-4.626.725-.655 1.088-1.225 1.818-1.188a6.902 6.902 0 0 0-.513 2.612c0 2.012 1.018 3.34 2.56 3.34.775 0 1.37-.268 1.952-.888l-.1.748h2.005L79.8 26.31h-2.09zm-2.648 8.04c-.72 0-1.087-.535-1.087-1.588 0-1.582.683-2.704 1.644-2.704.727 0 1.12.554 1.12 1.577 0 1.596-.692 2.714-1.678 2.714z",
        "fill": "#006"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FFF",
        "d": "M27.45 35.62h-2.12l1.215-7.607-2.71 7.608H22.39l-.177-7.563-1.276 7.564h-1.983l1.656-9.896h3.047l.085 6.127 2.056-6.126h3.29l-1.64 9.897m5.219-3.588a3.516 3.516 0 0 0-.473-.033c-1.2 0-1.81.41-1.81 1.224 0 .5.298.82.76.82.864 0 1.486-.82 1.523-2.01zm1.54 3.585h-1.755l.04-.832c-.535.658-1.25.973-2.22.973-1.148 0-1.935-.896-1.935-2.198 0-1.96 1.37-3.103 3.72-3.103.24 0 .547.02.863.062.065-.267.082-.38.082-.524 0-.532-.368-.73-1.358-.73a7.021 7.021 0 0 0-2.243.36c.023-.133.295-1.81.295-1.81 1.055-.31 1.752-.426 2.535-.426 1.82 0 2.783.817 2.782 2.36.003.414-.065.926-.172 1.595-.184 1.165-.58 3.667-.633 4.274zm28.417-9.631l-.347 2.148c-.757-.38-1.305-.534-1.893-.534-1.582 0-2.69 1.53-2.69 3.71 0 1.5.745 2.41 1.976 2.41.522 0 1.098-.162 1.8-.51l-.373 2.257c-.78.213-1.285.29-1.872.29-2.28 0-3.702-1.64-3.702-4.272 0-3.54 1.964-6.012 4.772-6.012.925 0 2.018.392 2.33.514m3.415 6.045a3.456 3.456 0 0 0-.47-.033c-1.2 0-1.808.41-1.808 1.224 0 .5.296.82.758.82.863 0 1.486-.82 1.52-2.01zm1.543 3.585h-1.755l.04-.832c-.536.658-1.25.973-2.22.973-1.15 0-1.935-.896-1.935-2.198 0-1.96 1.368-3.103 3.72-3.103.24 0 .546.02.86.062.067-.267.084-.38.084-.524 0-.532-.368-.73-1.358-.73a7.033 7.033 0 0 0-2.243.36l.294-1.81c1.056-.31 1.752-.426 2.536-.426 1.82 0 2.783.817 2.78 2.36.005.414-.064.926-.17 1.595-.184 1.165-.58 3.667-.633 4.274zm-23.96-.121c-.58.182-1.032.26-1.522.26-1.082 0-1.674-.62-1.674-1.767-.014-.357.157-1.29.292-2.146.12-.753.918-5.493.918-5.493h2.106l-.246 1.218h1.08l-.287 1.934h-1.086c-.244 1.532-.593 3.438-.597 3.69 0 .417.222.598.726.598.24 0 .428-.024.57-.077l-.28 1.782m6.457-.063a7.245 7.245 0 0 1-2.16.325c-2.36 0-3.587-1.232-3.587-3.59 0-2.752 1.563-4.778 3.684-4.778 1.738 0 2.847 1.134 2.847 2.914 0 .59-.077 1.166-.26 1.98H46.41c-.142 1.167.606 1.654 1.83 1.654.754 0 1.434-.156 2.19-.507l-.35 2.003zm-1.183-4.774c.01-.17.223-1.437-.98-1.437-.67 0-1.15.512-1.346 1.437h2.327zm-13.419-.545c0 1.02.494 1.72 1.614 2.248.857.403.99.523.99.888 0 .502-.378.728-1.217.728-.632 0-1.22-.097-1.898-.315l-.29 1.857c.48.106.91.202 2.203.24 2.236 0 3.27-.852 3.27-2.69 0-1.108-.433-1.757-1.495-2.244-.888-.41-.99-.5-.99-.875 0-.435.352-.66 1.037-.66.415 0 .984.047 1.522.123l.302-1.867a14.21 14.21 0 0 0-1.865-.158c-2.37 0-3.19 1.237-3.182 2.725m43.318 5.503h-2.004l.1-.748c-.582.62-1.178.89-1.954.89-1.54 0-2.56-1.328-2.56-3.34 0-2.68 1.58-4.936 3.448-4.936.82 0 1.443.336 2.023 1.098l.47-2.86h2.09l-1.613 9.897zm-3.126-1.858c.988 0 1.68-1.118 1.68-2.713 0-1.024-.394-1.58-1.122-1.58-.96 0-1.643 1.122-1.643 2.705 0 1.054.366 1.587 1.086 1.587zm-6.179-6.19c-.265 2.492-.737 5.015-1.105 7.508l-.097.54h2.12c.757-4.92.94-5.882 2.13-5.762.188-1.007.54-1.89.803-2.334-.887-.186-1.383.316-2.032 1.27.052-.413.146-.813.128-1.222h-1.946m-17.441 0c-.266 2.492-.738 5.015-1.106 7.508l-.096.54h2.12c.758-4.92.94-5.882 2.127-5.762.19-1.007.543-1.89.805-2.334-.886-.186-1.383.316-2.03 1.27.05-.413.144-.813.126-1.222h-1.946"
      }
    })])]);
  }
};