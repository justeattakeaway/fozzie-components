import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'AppIosEsIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 135 40"
      },
      "class": "ficon ficon-app-ios.es"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#A6A6A6",
        d: "M130.197 40H4.73A4.739 4.739 0 0 1 0 35.267V4.727A4.734 4.734 0 0 1 4.73 0h125.467C132.803 0 135 2.12 135 4.726v30.54c0 2.606-2.197 4.734-4.803 4.734z"
      }
    }), h("path", {
      attrs: {
        d: "M134.032 35.268a3.83 3.83 0 0 1-3.834 3.83H4.728a3.835 3.835 0 0 1-3.838-3.83V4.725A3.84 3.84 0 0 1 4.73.89h125.467c2.12 0 3.834 1.72 3.834 3.835l.01 30.543z"
      }
    }), h("path", {
      attrs: {
        fill: "#FFF",
        d: "M30.128 19.784c-.03-3.223 2.64-4.79 2.76-4.864-1.51-2.203-3.852-2.504-4.675-2.528-1.967-.207-3.875 1.177-4.877 1.177-1.022 0-2.565-1.16-4.228-1.13-2.14.03-4.142 1.27-5.24 3.19-2.266 3.92-.576 9.69 1.595 12.86 1.086 1.55 2.355 3.28 4.016 3.22 1.62-.07 2.23-1.04 4.19-1.04 1.94 0 2.51 1.03 4.2.99 1.74-.03 2.84-1.56 3.89-3.13 1.25-1.78 1.76-3.53 1.78-3.62-.04-.01-3.39-1.29-3.42-5.15zm-3.2-9.478c.874-1.093 1.472-2.58 1.306-4.09-1.265.057-2.847.876-3.758 1.945-.806.95-1.526 2.49-1.34 3.94 1.42.11 2.88-.71 3.792-1.79zm26.717 21.198h-2.27l-1.245-3.91h-4.324l-1.185 3.91h-2.21l4.29-13.308h2.65l4.31 13.308zm-3.89-5.55L48.63 22.48c-.12-.355-.342-1.19-.67-2.507h-.04c-.132.566-.343 1.402-.633 2.507l-1.105 3.475h3.573zm14.907.634c0 1.632-.44 2.922-1.323 3.87-.79.842-1.78 1.263-2.95 1.263-1.27 0-2.17-.45-2.73-1.36h-.04v5.06H55.5V25.07c0-1.026-.027-2.08-.08-3.16h1.876l.12 1.522h.04c.71-1.15 1.79-1.72 3.237-1.72 1.132 0 2.077.447 2.833 1.34.758.898 1.136 2.076 1.136 3.537zm-2.172.078c0-.934-.21-1.704-.632-2.31-.46-.632-1.08-.948-1.856-.948-.526 0-1.004.176-1.43.523-.43.35-.71.81-.84 1.38-.066.27-.1.48-.1.65v1.6c0 .7.215 1.29.643 1.77s.984.72 1.668.72c.803 0 1.428-.31 1.875-.92.448-.62.672-1.43.672-2.45zm13.21-.078c0 1.632-.442 2.922-1.325 3.87-.79.842-1.77 1.263-2.94 1.263-1.265 0-2.173-.45-2.725-1.36h-.04v5.06h-2.132V25.07c0-1.026-.027-2.08-.08-3.16h1.876l.12 1.522h.04c.71-1.15 1.788-1.72 3.237-1.72 1.14 0 2.08.447 2.84 1.34.76.898 1.14 2.076 1.14 3.537zm-2.173.078c0-.934-.21-1.704-.633-2.31-.46-.632-1.078-.948-1.855-.948-.53 0-1.01.176-1.44.523-.43.35-.71.81-.84 1.38-.07.27-.1.48-.1.65v1.6c0 .7.21 1.29.64 1.77.43.48.98.72 1.67.72.8 0 1.43-.31 1.87-.92.45-.62.67-1.43.67-2.45zm14.513 1.106c0 1.132-.394 2.053-1.183 2.764-.867.777-2.074 1.165-3.625 1.165-1.432 0-2.58-.27-3.45-.82l.495-1.77c.936.57 1.963.85 3.082.85.8 0 1.42-.18 1.87-.54.44-.36.67-.84.67-1.45 0-.54-.19-.99-.56-1.36-.37-.37-.98-.71-1.84-1.03-2.33-.87-3.5-2.14-3.5-3.81 0-1.09.41-1.99 1.22-2.69.81-.69 1.9-1.04 3.26-1.04 1.21 0 2.21.21 3.02.63l-.54 1.74c-.75-.41-1.6-.61-2.55-.61-.75 0-1.34.18-1.76.55-.36.33-.54.73-.54 1.21 0 .53.2.96.61 1.31.35.32 1 .66 1.94 1.03 1.14.46 1.98 1 2.53 1.62.54.62.81 1.39.81 2.31zm7.048-4.264h-2.35v4.66c0 1.184.414 1.776 1.244 1.776.38 0 .697-.033.947-.1l.05 1.62c-.42.157-.98.236-1.66.236-.85 0-1.5-.257-1.98-.77-.48-.514-.71-1.376-.71-2.587v-4.837h-1.4v-1.6h1.4V20.15l2.09-.633v2.39h2.35v1.6zm10.602 3.12c0 1.474-.42 2.685-1.263 3.632-.883.975-2.055 1.46-3.516 1.46-1.4 0-2.52-.466-3.36-1.4s-1.25-2.113-1.25-3.534c0-1.487.43-2.705 1.3-3.652.86-.948 2.03-1.422 3.49-1.422 1.41 0 2.54.467 3.4 1.402.82.907 1.23 2.078 1.23 3.513zm-2.21.07c0-.887-.19-1.646-.573-2.28-.447-.766-1.086-1.15-1.914-1.15-.857 0-1.508.385-1.955 1.15-.383.634-.572 1.405-.572 2.317 0 .885.19 1.644.572 2.276.46.77 1.105 1.15 1.936 1.15.814 0 1.453-.39 1.914-1.17.393-.64.59-1.41.59-2.29zm9.14-2.915c-.21-.04-.435-.06-.67-.06-.75 0-1.33.284-1.74.85-.354.5-.532 1.133-.532 1.896v5.03h-2.13l.02-6.58c0-1.11-.028-2.12-.08-3.02h1.856l.078 1.83h.06c.224-.63.58-1.14 1.065-1.52.475-.35.988-.52 1.54-.52.198 0 .376.01.534.04v2.03zm9.536 2.47c0 .38-.025.703-.078.966h-6.396c.025.94.334 1.67.928 2.17.54.44 1.236.67 2.092.67.947 0 1.81-.15 2.588-.46l.334 1.48c-.908.39-1.98.59-3.217.59-1.488 0-2.656-.44-3.506-1.32-.84-.88-1.27-2.05-1.27-3.53 0-1.45.4-2.65 1.19-3.62.83-1.03 1.95-1.54 3.36-1.54 1.39 0 2.43.51 3.14 1.54.57.81.85 1.82.85 3.02zm-2.033-.554c.014-.64-.125-1.18-.414-1.64-.37-.6-.94-.89-1.7-.89-.7 0-1.27.29-1.7.87-.36.46-.57 1.01-.63 1.65h4.44zM48.236 7.07l-.233.837a2.913 2.913 0 0 0-1.24-.25c-.706 0-1.266.213-1.68.642-.44.44-.66 1.07-.66 1.88 0 .77.205 1.37.612 1.81.407.43.973.65 1.697.65.51 0 .94-.08 1.29-.25l.185.82c-.39.18-.94.28-1.66.28-.98 0-1.76-.29-2.337-.87-.595-.6-.892-1.41-.892-2.43 0-1.05.323-1.89.97-2.52.627-.61 1.438-.91 2.435-.91.658 0 1.163.09 1.513.28zm5.79 3.96c0 .725-.206 1.32-.62 1.785-.434.48-1.01.72-1.727.72-.7 0-1.25-.23-1.66-.69-.41-.46-.62-1.04-.62-1.737 0-.73.21-1.33.63-1.793s.99-.696 1.71-.696c.69 0 1.24.23 1.67.69.4.44.6 1.02.6 1.72zm-1.086.034c0-.433-.094-.806-.28-1.117-.22-.376-.534-.564-.94-.564-.422 0-.742.186-.962.562-.188.31-.28.69-.28 1.136 0 .44.093.81.28 1.12.227.38.543.57.95.57.4 0 .715-.19.94-.57.195-.32.292-.69.292-1.13zm6.722 2.363h-1.048v-2.7c0-.83-.316-1.248-.95-1.248-.31 0-.562.11-.757.34-.193.23-.29.5-.29.8v2.79h-1.05v-3.36c0-.42-.012-.87-.037-1.35h.92l.05.74h.03c.12-.23.303-.42.542-.57.284-.18.602-.27.95-.27.44 0 .806.14 1.097.42.36.34.54.87.54 1.56v2.82zm4.724-1.353c0 .44-.16.79-.484 1.056s-.77.397-1.34.397c-.536 0-.99-.103-1.366-.32l.223-.772c.36.22.74.33 1.15.33.53 0 .8-.2.8-.594 0-.17-.06-.31-.18-.43-.12-.11-.33-.22-.62-.33-.84-.31-1.26-.76-1.26-1.36 0-.4.15-.74.46-1.02.31-.27.72-.4 1.23-.4.46 0 .86.1 1.19.29l-.23.75c-.31-.18-.63-.27-.96-.27-.22 0-.4.05-.52.16s-.18.24-.18.4.06.3.19.4c.11.1.32.2.64.32.81.31 1.22.78 1.22 1.42zm2.61 1.355h-1.048V8.72h1.048v4.713zm.902-6.7l-1.174 1.41h-.728l.834-1.41h1.068zm5.092 1.98c-.027.38-.04.82-.04 1.34v2.69c0 1.01-.226 1.72-.68 2.13-.413.37-.995.56-1.745.56-.652 0-1.18-.12-1.58-.37l.242-.8c.395.24.84.36 1.338.36.926 0 1.387-.5 1.387-1.5v-.46h-.02c-.29.48-.752.71-1.387.71-.568 0-1.037-.22-1.406-.65-.37-.43-.56-.98-.56-1.65 0-.76.21-1.37.64-1.83.39-.43.87-.65 1.44-.65.64 0 1.1.25 1.37.75h.02l.04-.65h.92zm-1.088 2.69v-.84c0-.32-.098-.59-.297-.82-.197-.23-.46-.34-.783-.34-.357 0-.652.15-.883.44-.23.29-.35.69-.35 1.19 0 .45.1.81.32 1.09.22.3.52.46.9.46.23 0 .44-.07.62-.21.18-.14.32-.33.39-.57.04-.12.06-.26.06-.43zm6.985 2.01h-.922l-.06-.72h-.02c-.33.55-.827.82-1.493.82-.465 0-.836-.15-1.115-.44-.33-.36-.494-.9-.494-1.61V8.72h1.047v2.6c0 .905.31 1.357.932 1.357.467 0 .79-.226.97-.68.046-.115.07-.248.07-.397V8.72h1.046v3.355c0 .446.013.9.04 1.358zm5.705-2.58c0 .19-.014.34-.04.47H81.41c.012.46.164.82.455 1.06.266.22.607.33 1.027.33.467 0 .89-.08 1.27-.23l.165.73c-.445.19-.973.29-1.58.29-.73 0-1.305-.22-1.723-.65-.416-.43-.625-1.01-.625-1.73s.19-1.31.58-1.78c.41-.51.95-.76 1.65-.76.68 0 1.19.25 1.54.752.28.4.42.892.42 1.48zm-1-.27c.006-.31-.062-.58-.203-.81-.19-.29-.46-.44-.84-.44-.35 0-.62.14-.84.43-.18.23-.28.5-.31.81h2.18zm3.568 2.85h-1.047V6.55h1.047v6.878zm6.17-2.4c0 .72-.207 1.32-.62 1.78-.435.48-1.01.71-1.728.71-.693 0-1.244-.23-1.654-.69-.41-.46-.615-1.04-.615-1.74 0-.73.21-1.33.635-1.8s.994-.7 1.71-.7c.694 0 1.25.23 1.67.68.4.45.602 1.02.602 1.73zm-1.088.03c0-.44-.094-.81-.28-1.12-.22-.38-.534-.56-.94-.56-.422 0-.742.19-.96.56-.19.31-.282.69-.282 1.14 0 .43.094.81.28 1.12.228.37.544.56.952.56.4 0 .713-.19.94-.58.194-.32.29-.7.29-1.13zm9.342-.22c0 .19-.014.35-.04.48h-3.142c.014.47.164.82.455 1.07.266.22.61.33 1.03.33.464 0 .888-.08 1.27-.23l.164.73c-.44.19-.97.29-1.58.29-.73 0-1.3-.22-1.72-.65-.42-.43-.62-1.01-.62-1.73 0-.71.2-1.31.58-1.78.41-.51.96-.76 1.65-.76.68 0 1.2.25 1.54.75.28.4.42.89.42 1.48zm-1-.27a1.43 1.43 0 0 0-.203-.81c-.18-.29-.45-.44-.83-.44-.34 0-.62.14-.83.42-.17.22-.27.49-.31.81h2.18zm6.616 2.85h-1.048v-2.7c0-.83-.316-1.25-.95-1.25-.312 0-.563.11-.757.34s-.29.5-.29.81v2.8h-1.05v-3.36c0-.42-.012-.87-.037-1.35h.92l.05.73h.028c.123-.23.305-.42.543-.57.28-.18.6-.27.95-.27.44 0 .8.14 1.09.422.36.35.54.87.54 1.56v2.83zm8.556-2.58c0 .19-.014.35-.04.48h-3.142c.012.47.164.82.455 1.07.26.22.6.33 1.02.33.46 0 .89-.08 1.27-.23l.16.73c-.45.19-.98.29-1.58.29-.73 0-1.31-.22-1.73-.65-.42-.43-.63-1.01-.63-1.73 0-.71.19-1.31.58-1.78.41-.51.96-.76 1.65-.76.68 0 1.19.25 1.54.75.28.4.42.89.42 1.48zm-1-.27c.006-.31-.062-.58-.203-.81-.182-.29-.46-.44-.834-.44-.35 0-.63.14-.84.42-.18.22-.28.49-.31.81h2.18zm3.57 2.85h-1.05V6.55h1.05v6.88z"
      }
    })]);
  }
};