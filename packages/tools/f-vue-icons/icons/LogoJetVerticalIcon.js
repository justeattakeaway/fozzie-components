import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';

export default {
    name: 'LogoJetVerticalIcon',
    props: {},
    functional: true,
    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;
        return h('svg', _mergeJSXProps([{
            attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 50 46'
            },
            class: 'c-ficon c-ficon--logo-jet--vertical'
        }, ctx.data]), [h('path', {
            attrs: {
                d: 'M36.17 12.178c-.072-.186-1.05-2.01-2.868-4.3a.373.373 0 0 1-.083-.195 36.604 36.604 0 0 0-.548-3.971.648.648 0 0 0-.555-.503l-1.888-.23a.414.414 0 0 0-.05 0 .397.397 0 0 0-.281.118.404.404 0 0 0-.117.284v.663a.024.024 0 0 1-.024.024.023.023 0 0 1-.016-.006 26.645 26.645 0 0 0-3.814-2.905 1.663 1.663 0 0 0-1.87 0C17.538 5.219 13.95 11.822 13.812 12.185a.657.657 0 0 0 .425.91l1.88.358a.64.64 0 0 1 .47.553c.014.335.37 7.809.815 9.754a.654.654 0 0 0 .625.484h.014c1.096-.027 2.1-.046 3.188-.06H21.318a.21.21 0 0 0 .21-.212v-.013c-.044-.653-.139-2.145-.215-3.716 0-.039-.005-.09-.008-.128a.404.404 0 0 0-.19-.323 2.06 2.06 0 0 1-.985-1.651c-.1-2.622-.148-5.651-.007-8.021a.383.383 0 0 1 .116-.267.376.376 0 0 1 .534.011c.07.073.107.17.105.272v.03c-.092 1.58-.1 3.448-.067 5.291a.454.454 0 0 0 .456.445.446.446 0 0 0 .409-.287.456.456 0 0 0 .03-.174c-.033-1.855-.023-3.735.072-5.321a.383.383 0 0 1 .116-.267.376.376 0 0 1 .534.011.383.383 0 0 1 .105.301c-.092 1.573-.1 3.429-.068 5.263.002.12.05.234.136.318a.446.446 0 0 0 .76-.332c-.033-1.847-.024-3.72.071-5.295a.382.382 0 0 1 .386-.373.375.375 0 0 1 .343.243.386.386 0 0 1 .026.175c-.134 2.305-.09 5.222 0 7.78v.088a2.06 2.06 0 0 1-.878 1.688.391.391 0 0 0-.168.301s-.045.392.126 2.297c.08.831.141 1.407.17 1.668.006.049.03.093.067.125.037.033.084.05.132.05h2.849l1.065.01a.198.198 0 0 0 .2-.177c.246-2.283.304-3.564.304-3.564a.225.225 0 0 0-.2-.219l-1.294-.18a.438.438 0 0 1-.37-.32.616.616 0 0 1-.017-.202c.525-7.605 3.009-10.168 3.009-10.168a.745.745 0 0 1 .12-.1.396.396 0 0 1 .605.178.78.78 0 0 1 .032.182c.214 2.391.11 6.46-.023 9.633-.113 2.694-.25 4.807-.25 4.807v.005a.158.158 0 0 0 .097.145c.018.007.039.011.059.011.705.012 1.4.027 2.136.045h-.003a.644.644 0 0 0 .625-.484c.445-1.94.797-9.414.816-9.754a.649.649 0 0 1 .47-.553l1.874-.368a.646.646 0 0 0 .487-.632.647.647 0 0 0-.058-.278ZM10.539 28.605H8.965c-.509 0-.509 0-.615.604-.107.603-.106.62.361.62h.931l-.53 3.066c-.128.685-.426 1.157-1.338 1.436-.234.064-.299.15-.299.257 0 .129.043.236.148.494.15.364.234.428.362.428.15-.014.3-.043.445-.085 1.295-.43 1.827-1.437 2.04-2.637l.597-3.45c.105-.73.105-.73-.531-.73M15.866 28.605c-.637 0-.637 0-.722.536l-.467 2.786c-.127.815-.34 1.287-1.125 1.287-.765 0-1.04-.472-.913-1.201l.446-2.658c.127-.75.105-.75-.552-.75-.637 0-.658 0-.744.515l-.467 2.782c-.276 1.586.697 2.572 2.08 2.572 1.552 0 2.336-.703 2.59-2.379l.468-2.765c.106-.729.063-.729-.598-.729M18.775 33.17c.51-.02.785-.256.785-.492 0-.302-.36-.403-.848-.557-.957-.302-1.827-.644-1.827-1.673 0-1.221.996-1.886 2.251-1.886.53 0 1.126.022 1.507.064.34.044.425.151.319.686-.107.535-.233.58-.531.558-.36-.022-.828-.064-1.38-.064-.637 0-.828.235-.828.45 0 .278.255.429.85.603 1.103.321 1.825.772 1.825 1.736 0 1.136-.828 1.8-2.165 1.843-.64.023-1.28-.013-1.912-.107-.424-.064-.445-.064-.34-.686.107-.557.107-.604.51-.557a11.14 11.14 0 0 0 1.784.085M25.718 28.605h-3.586c-.51 0-.51 0-.616.622-.107.621-.085.621.361.621h1.168l-.659 3.837c-.127.75-.105.75.553.75.616 0 .637 0 .721-.536l.68-4.051h1.125c.51 0 .51 0 .616-.621.105-.622.106-.622-.36-.622M32.045 29.827c.51 0 .51 0 .616-.622.105-.62.106-.62-.36-.62h-2.57c-.913 0-.891 0-1.04.92l-.659 3.88c-.17 1.006-.148 1.006.765 1.006h2.505c.531 0 .51 0 .616-.603.106-.623.106-.623-.36-.623h-2.166l.17-1.114h1.804c.488 0 .488 0 .574-.58.084-.602.084-.602-.574-.602h-1.594l.17-1.051 2.103.009ZM34.764 31.884l.827-1.843c.064-.15.064-.15.17-.15.107 0 .106 0 .128.172l.254 1.821h-1.38Zm2.25-2.572c-.128-.728-.128-.728-1.147-.728-.955 0-.934 0-1.23.603l-2.145 4.525c-.32.644-.255.704.53.704.616 0 .616 0 .871-.58l.34-.77h2.08l.106.77c.086.58.107.58.722.58.698 0 .765-.043.638-.75l-.765-4.354ZM42.089 28.605h-3.61c-.51 0-.51 0-.616.622-.106.621-.084.621.36.621h1.17l-.66 3.837c-.127.75-.106.75.553.75.615 0 .637 0 .722-.536l.68-4.051h1.128c.509 0 .509 0 .615-.621.128-.622.128-.622-.34-.622M5.283 38.268v-.783a.189.189 0 0 0-.18-.176H.893a.185.185 0 0 0-.18.182v.771a.186.186 0 0 0 .177.183H2.27a.101.101 0 0 1 .092.093v4.415a.187.187 0 0 0 .177.187h.92a.188.188 0 0 0 .172-.177v-4.444a.1.1 0 0 1 .088-.072h1.383a.186.186 0 0 0 .178-.177',
                fill: '#242E30'
            }
        }), h('path', {
            attrs: {
                d: 'M7.627 39.335a1.285 1.285 0 0 0-.554-.402 2.476 2.476 0 0 0-.885-.136 2.813 2.813 0 0 0-.947.161c-.241.083-.466.207-.666.367a.19.19 0 0 0 .007.26l.382.395a.186.186 0 0 0 .264 0c.093-.085.197-.157.309-.215.171-.085.36-.13.551-.127.2-.003.396.065.551.194.144.12.221.336.232.681a.101.101 0 0 1-.092.08c-.143 0-.3 0-.458.009-.2.005-.4.021-.597.05a3.612 3.612 0 0 0-.575.126 1.728 1.728 0 0 0-.498.243c-.143.104-.26.24-.343.396-.089.182-.132.382-.126.585a1.135 1.135 0 0 0 .424.923c.135.108.29.189.454.24.41.12.849.099 1.245-.063.175-.072.33-.188.45-.335h.013a.066.066 0 0 1 .075.013c.013.012.02.028.021.045v.145a.188.188 0 0 0 .177.181h.772a.182.182 0 0 0 .124-.056.186.186 0 0 0 .052-.127v-1.852a6.853 6.853 0 0 0-.082-1.124 1.542 1.542 0 0 0-.289-.642l.01-.015ZM6.87 41.65a.667.667 0 0 1-.077.33.68.68 0 0 1-.213.23 1.163 1.163 0 0 1-.645.19.784.784 0 0 1-.398-.107.352.352 0 0 1-.187-.33.397.397 0 0 1 .135-.32.883.883 0 0 1 .325-.174c.13-.038.264-.062.399-.07.14-.008.256-.012.346-.012h.212a.1.1 0 0 1 .088.093l.015.17ZM19.814 39.335a1.284 1.284 0 0 0-.554-.402 2.479 2.479 0 0 0-.886-.136c-.322 0-.642.054-.947.161-.24.083-.465.207-.664.367a.188.188 0 0 0 0 .26l.382.395a.188.188 0 0 0 .265 0c.094-.085.198-.157.31-.215.171-.085.36-.13.552-.127.2-.003.395.065.55.194.144.12.22.336.231.681a.095.095 0 0 1-.092.08c-.143 0-.299 0-.457.009-.2.005-.4.021-.598.05a3.625 3.625 0 0 0-.576.126 1.71 1.71 0 0 0-.493.243c-.143.104-.26.24-.343.396-.09.182-.133.382-.127.585a1.136 1.136 0 0 0 .424.923c.135.106.29.186.453.235.412.122.851.1 1.249-.062.175-.072.33-.187.45-.335h.012a.069.069 0 0 1 .078.013.069.069 0 0 1 .018.045v.145a.186.186 0 0 0 .177.181H20a.188.188 0 0 0 .177-.183v-1.848a7.084 7.084 0 0 0-.08-1.124 1.533 1.533 0 0 0-.292-.642l.01-.015Zm-.762 2.314a.668.668 0 0 1-.077.33.669.669 0 0 1-.211.23 1.16 1.16 0 0 1-.646.19.77.77 0 0 1-.392-.107.35.35 0 0 1-.188-.33.398.398 0 0 1 .135-.32.885.885 0 0 1 .327-.174c.13-.038.263-.062.398-.07.141-.008.257-.012.347-.012h.21a.101.101 0 0 1 .089.093l.008.17ZM30.331 39.335a1.286 1.286 0 0 0-.555-.402 2.458 2.458 0 0 0-.885-.136c-.322 0-.642.055-.947.161-.24.084-.465.208-.665.367a.189.189 0 0 0 .007.26l.381.395a.188.188 0 0 0 .265 0c.094-.085.198-.157.31-.215.171-.086.36-.13.552-.127.2-.003.395.066.55.194.143.12.22.336.232.681a.1.1 0 0 1-.094.08c-.142 0-.299 0-.456.009-.2.005-.4.021-.598.05a3.625 3.625 0 0 0-.575.126 1.715 1.715 0 0 0-.498.243 1.133 1.133 0 0 0-.47.98c-.004.186.035.369.115.536.073.151.18.284.31.388.137.109.294.19.461.239.412.122.851.1 1.25-.062.173-.074.326-.191.443-.34h.012a.066.066 0 0 1 .076.013c.012.012.02.028.02.045v.145a.19.19 0 0 0 .054.125.186.186 0 0 0 .123.056h.771a.189.189 0 0 0 .178-.183v-1.847a6.959 6.959 0 0 0-.081-1.124 1.554 1.554 0 0 0-.29-.642l.004-.015Zm-.758 2.314a.676.676 0 0 1-.077.33.68.68 0 0 1-.212.23 1.157 1.157 0 0 1-.645.189.765.765 0 0 1-.392-.106.349.349 0 0 1-.187-.33.398.398 0 0 1 .134-.32.883.883 0 0 1 .326-.174c.13-.038.264-.062.399-.07.138-.008.255-.012.345-.012h.212a.091.091 0 0 1 .062.03c.016.016.025.04.025.063l.01.17ZM15.807 39.372a1.62 1.62 0 0 0-.587-.431c-.244-.1-.506-.15-.77-.148a2.521 2.521 0 0 0-.862.148c-.258.095-.495.24-.697.427-.2.187-.36.413-.47.664a2.904 2.904 0 0 0 0 1.968 2.028 2.028 0 0 0 1.166 1.09c.277.1.569.15.862.149.321.001.639-.067.93-.202.23-.101.437-.247.61-.428a.189.189 0 0 0 0-.253l-.554-.412-.041-.029a.184.184 0 0 0-.223.03 1.474 1.474 0 0 1-.264.23.93.93 0 0 1-.51.134.905.905 0 0 1-.605-.214 1.123 1.123 0 0 1-.313-.712.09.09 0 0 1 .076-.09h2.583a.19.19 0 0 0 .176-.187v-.201a2.682 2.682 0 0 0-.13-.866 1.946 1.946 0 0 0-.373-.664l-.004-.003Zm-.813 1.073h-1.422a.092.092 0 0 1-.092-.088.793.793 0 0 1 .06-.201c.04-.09.099-.171.171-.238a.878.878 0 0 1 .624-.235.718.718 0 0 1 .546.222c.117.12.187.279.199.447a.1.1 0 0 1-.094.088',
                fill: '#242E30'
            }
        }), h('path', {
            attrs: {
                d: 'm11.112 41.079-.027-.039a.185.185 0 0 1 0-.192l1.427-1.797a.095.095 0 0 0-.009-.128.09.09 0 0 0-.06-.022h-1.124a.372.372 0 0 0-.299.147l-.062.08-1.096 1.422-.015.017-.008.008H9.83a.07.07 0 0 1-.077-.012.081.081 0 0 1-.018-.034v-3.44a.188.188 0 0 0-.172-.176h-.879a.185.185 0 0 0-.172.18v5.87a.189.189 0 0 0 .176.179h.87a.183.183 0 0 0 .177-.176v-1.663a.07.07 0 0 1 .018-.034.069.069 0 0 1 .077-.013h.01l.009.008v.006l.021.025 1.066 1.619.061.078a.375.375 0 0 0 .292.147h1.187a.066.066 0 0 0 .036-.017.092.092 0 0 0 .02-.107l-1.421-1.936ZM26.954 39.197a.374.374 0 0 0 .021-.147.19.19 0 0 0-.172-.15h-.697a.372.372 0 0 0-.366.297l-.022.085-.588 2.18a.087.087 0 0 1-.058.03.081.081 0 0 1-.066-.044l-.009-.035-.589-2.204-.009-.04a.38.38 0 0 0-.357-.262h-.76a.372.372 0 0 0-.365.292v.02l-.016.067-.536 2.174a.07.07 0 0 1-.1.026.064.064 0 0 1-.025-.026l-.637-2.176-.03-.1a.061.061 0 0 0 0-.02.38.38 0 0 0-.355-.255h-.768a.188.188 0 0 0-.173.15v.023c0 .042.008.084.021.123l1.266 3.692a.371.371 0 0 0 .322.254h.741a.375.375 0 0 0 .33-.266l.03-.106.585-2.112a.07.07 0 0 1 .115 0l.669 2.156c.012.041.027.081.045.12a.372.372 0 0 0 .305.214h.723a.36.36 0 0 0 .304-.214c.01-.016.034-.088.05-.136l1.191-3.564c0-.008.003-.016.006-.023M35.025 39.047a.333.333 0 0 1-.01-.032.191.191 0 0 0-.16-.113h-.742a.374.374 0 0 0-.328.22.288.288 0 0 0-.011.034l-.007.02c0 .01-.005.02-.007.03l-.023.073-.675 2.229-.01.026a.086.086 0 0 1-.088.066.087.087 0 0 1-.086-.057l-.804-2.265-.009-.03-.055-.152a.376.376 0 0 0-.317-.201h-.834a.187.187 0 0 0-.146.136.204.204 0 0 0 .006.1l1.594 3.93a.374.374 0 0 1-.014.248v.012l-.03.074c-.042.107-.083.201-.121.289a.789.789 0 0 1-.143.214.562.562 0 0 1-.217.13 1.02 1.02 0 0 1-.334.047h-.53a.186.186 0 0 0-.18.183v.672a.19.19 0 0 0 .18.183h.71c.24.007.478-.022.71-.087.165-.05.317-.137.444-.255.121-.12.22-.26.29-.415.076-.166.155-.355.236-.57l1.71-4.667a.182.182 0 0 0 0-.074M34.856 42.281a.407.407 0 0 0-.318.137.455.455 0 0 0 .013.628.446.446 0 0 0 .622.01l.01-.01a.456.456 0 0 0-.144-.731.41.41 0 0 0-.174-.034M42.475 39.377a1.922 1.922 0 0 0-.653-.422c-.532-.2-1.117-.2-1.65 0a1.88 1.88 0 0 0-1.075 1.064c-.106.25-.157.743-.157 1.05-.003.322.05.643.157.948a1.91 1.91 0 0 0 1.08 1.07c.533.2 1.119.2 1.65 0 .244-.095.466-.238.653-.42.182-.184.326-.402.425-.642a2.8 2.8 0 0 0 .156-.95c0-.301-.053-.804-.156-1.05a1.985 1.985 0 0 0-.425-.64l-.005-.008Zm-.203 2.38a1.33 1.33 0 0 1-.277.458c-.122.13-.27.235-.433.307a1.48 1.48 0 0 1-1.13 0 1.292 1.292 0 0 1-.708-.766 2.361 2.361 0 0 1-.1-.686c0-.266.033-.53.1-.788a1.303 1.303 0 0 1 .71-.766c.361-.15.767-.15 1.129 0a1.293 1.293 0 0 1 .71.766c.064.258.095.522.094.788.002.232-.03.463-.094.686M36.402 39.83c.11-.135.25-.242.41-.313.18-.075.373-.112.567-.107.183-.004.363.033.53.107.124.06.237.142.334.24a.185.185 0 0 0 .242.006l.235-.214a.189.189 0 0 0 .019-.256 1.731 1.731 0 0 0-.545-.341 2.215 2.215 0 0 0-.814-.152 2.084 2.084 0 0 0-.812.155 1.879 1.879 0 0 0-.635.428 1.927 1.927 0 0 0-.408.65 3.449 3.449 0 0 0 0 1.974c.09.243.227.466.404.654.177.188.392.334.63.429.521.2 1.097.2 1.618 0 .2-.08.384-.198.539-.348a.189.189 0 0 0-.009-.25l-.2-.196a.187.187 0 0 0-.253 0 1.148 1.148 0 0 1-.87.35 1.264 1.264 0 0 1-.537-.112 1.216 1.216 0 0 1-.408-.314 1.5 1.5 0 0 1-.264-.463 2.76 2.76 0 0 1-.095-.728c0-.245.027-.49.083-.729.05-.168.132-.326.24-.464M49.197 39.763a1.304 1.304 0 0 0-.248-.515 1.104 1.104 0 0 0-.454-.321 1.844 1.844 0 0 0-.693-.114 1.245 1.245 0 0 0-.726.196c-.159.114-.297.254-.41.414l-.018.029-.01.014a.064.064 0 0 1-.082.011.07.07 0 0 1-.025-.026c0-.007-.012-.02-.017-.032a.952.952 0 0 0-.277-.342 1.324 1.324 0 0 0-.35-.191 1.7 1.7 0 0 0-.97-.017 1.467 1.467 0 0 0-.656.405 1.1 1.1 0 0 0-.075.093l-.008.01a.027.027 0 0 1-.008.011.066.066 0 0 1-.113-.033v-.27a.187.187 0 0 0-.055-.127.183.183 0 0 0-.125-.053h-.232a.184.184 0 0 0-.127.056.188.188 0 0 0-.053.13v3.86a.187.187 0 0 0 .181.185h.28a.186.186 0 0 0 .129-.056.19.19 0 0 0 .053-.132v-2.041c-.002-.205.022-.41.07-.609.04-.17.112-.33.212-.474a.968.968 0 0 1 .37-.308 1.26 1.26 0 0 1 .542-.107c.264 0 .454.09.569.27.114.182.173.488.173.921v2.353c0 .049.02.096.054.13.034.035.08.056.129.057h.28a.19.19 0 0 0 .182-.189v-2.392c-.003-.16.023-.32.077-.47.047-.133.119-.256.212-.362a.957.957 0 0 1 .316-.233.906.906 0 0 1 .389-.084c.158-.006.316.026.46.092a.78.78 0 0 1 .29.24c.072.103.123.22.15.343.026.128.04.26.039.39v2.482a.187.187 0 0 0 .182.184h.283a.19.19 0 0 0 .182-.189v-2.514a2.885 2.885 0 0 0-.072-.679',
                fill: '#242E30'
            }
        })]);
    }
};
