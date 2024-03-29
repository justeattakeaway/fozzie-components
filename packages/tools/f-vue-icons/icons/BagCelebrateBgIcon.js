import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'BagCelebrateBgIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 104 66"
      },
      "class": "c-ficon c-ficon--bag-celebrate-bg"
    }, ctx.data]), [h("g", {
      "attrs": {
        "fill": "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      "attrs": {
        "d": "M-8 93h120V-27H-8z"
      }
    }), h("g", {
      "attrs": {
        "fill-rule": "nonzero"
      }
    }, [h("path", {
      "attrs": {
        "fill": "#FFD9B2",
        "d": "M.4 7.3l10.1 47.4H104z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FFF",
        "d": "M17.6 56l2.7-11c.6-2.4 1.4-15 2-17.7.4-2.6 0-12.4 0-12.4s10.5-2.3 17.1-3.2c6.7-1 28.7.6 28.7.6s-.5 1.4-.5 2c0 .5-1.7 8.1-2.5 18.9-.8 10.7 0 20.9 0 20.9s-15.5 3.3-24.5 3.5c-9 .2-23-1.6-23-1.6z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF8000",
        "d": "M23 57l-5.6-1s2.2-8.2 3-12.9a126 126 0 001.8-15.8c.1-5-.2-12.9-.2-12.9l4.8-1s1.3 12 .7 18.6c-.6 6.5-3.2 18.5-3.7 20.8a51.6 51.6 0 00-.8 4.1zm32.7-15.8a128.4 128.4 0 00-2.5-3.7v-3.2a.5.5 0 00-.2-.4l-.8-.3c-.2-.2-.6 0-.6.3l-.2 1.1c-.6-.8-1.2-1.7-1.9-2.3-.6-.7-1.3-.7-2.2-.3-3.6 1.7-7 4.5-9.5 7.6a.5.5 0 00.1.8 4.3 4.3 0 002.4.9 23 23 0 00-.7 5c0 1.2.9 1.1 1.8 1.2l1.2.1a30.6 30.6 0 01.7-4 1.7 1.7 0 01-.2-.2c-.5-.2-.7-.8-.8-1.3l.3-1.8.5-1.8c0-.5.7-.3.6.1l-.4 1.7c0 .2 0 .5-.2.7a.3.3 0 010 .2.2.2 0 00.1.1l.2.2h.3l.1.1.7-3c.1-.5.8-.3.7.1l-.5 2.2-.2.7a2.8 2.8 0 00.8-.1l.8-2.9c.1-.4.8-.2.7.2l-.9 3c-.1.5-.3 1-.6 1.4a.8.8 0 01-.7.4.4.4 0 01-.1 0h-.3a44 44 0 01-.5 4.1l1.2.1 3 .2c0-.8.2-1.5.4-2.2h-.2a1.7 1.7 0 01-.7-.1.5.5 0 01-.3-.3.4.4 0 01-.1-.4l.3-1.5A12.5 12.5 0 0150 39c.1-.4.7-.4.7 0a.3.3 0 010 .2 73.9 73.9 0 01-.2 2.5 72.8 72.8 0 01-.5 4.1.3.3 0 010 .1l-.4 2.4c.6 0 1.3-.2 1.9-.5.9-.4 1-1.5 1-2.4l.7-3.3c.8 0 1.5 0 2.2-.3a.5.5 0 00.3-.7zm-16.8-1l.1.1h-.1zm5.6-3zm6-1.8l.8 1 .2.3a10.3 10.3 0 01-1-1.3zm1.8.8a.3.3 0 000-.1v.1z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M35.4 57.6l.3 7c.1 1.2 2 1.2 2 0a80 80 0 01-.3-7c0-1.2-2-1.2-2 0zm11.4 0l.3 6.9c.1 1.2 2 1.2 2 0a80 80 0 01-.3-7c0-1.2-2-1.2-2 0z"
      }
    }), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M67 12.5a97.9 97.9 0 00-1.6 9.1c-.2 1.1 1.5 1.6 1.7.5.4-3.1 1-6.1 1.7-9.2.2-1-1.5-1.5-1.7-.4zm-45.6 2.4c.5 10.7-.4 21.5-2.7 32a132.1 132.1 0 01-2.3 9c-.3 1 1.4 1.5 1.7.4a128 128 0 005.1-32.2 125.5 125.5 0 000-9.2c-.1-1.2-1.9-1.2-1.8 0z"
      }
    }), h("path", {
      "attrs": {
        "d": "M22.6 15.3a128.7 128.7 0 0145.5-2.1c1.1.1 1.1-1.6 0-1.8a130.7 130.7 0 00-36 .3 128.3 128.3 0 00-10 1.9c-1 .2-.6 2 .5 1.7zm43 5.4c-1.7 11-2 22.2-1.7 33.4 0 1 1.8 1 1.8 0-.4-11-.1-22.1 1.5-33 .2-1-1.5-1.6-1.7-.4z"
      }
    }), h("path", {
      "attrs": {
        "d": "M17.2 57c3 .8 6 .8 9.1 1 3.2.2 6.4.4 9.6.4 6.2.2 12.4 0 18.6-1A75.4 75.4 0 0065 55.1c1-.3.6-2-.5-1.6A107 107 0 0128 56.4c-3.4-.2-7-.2-10.4-1.2-1-.3-1.5 1.4-.4 1.7zm9-43.3c.5 2.4.7 4.8.7 7.2 0 .8 1.1.8 1.1 0a38.6 38.6 0 00-.7-7.5c-.1-.7-1.2-.4-1 .3zM27 28a73.2 73.2 0 01-1 11c-.1.7 1 1 1.1.3.6-3.7 1-7.5 1-11.3 0-.7-1.2-.7-1.2 0z"
      }
    }), h("path", {
      "attrs": {
        "d": "M24.5 46.5a92 92 0 01-2.3 10.1c-.2.7.9 1 1 .3a92 92 0 002.4-10c.1-.8-1-1.1-1-.4z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M41.9 11.2A50.4 50.4 0 0040 6.5c-.4-1-1.8-.1-1.4.8a45.8 45.8 0 011.6 4.4c.3 1 1.9.5 1.6-.5z"
      }
    }), h("path", {
      "attrs": {
        "d": "M39.8 7.5c3-1 6.3-.6 9.4-.5 1 0 1-1.6 0-1.7-3.2 0-6.6-.3-9.8.6-1 .3-.6 1.9.4 1.6z"
      }
    }), h("path", {
      "attrs": {
        "d": "M48.6 6.5l1.3 4.3c.3 1 2 .6 1.6-.4L50.1 6c-.3-1-1.8-.5-1.5.5zm-17.4 6A97.4 97.4 0 0129.6 9c-.4-1-2-.6-1.5.4a99.9 99.9 0 001.7 3.9c.4 1 1.8.1 1.4-.8z"
      }
    }), h("path", {
      "attrs": {
        "d": "M29.2 9.6l3.4-.7c1.2-.3 2.3-.6 3.5-.4 1 0 1-1.5 0-1.7-1.2-.1-2.4.2-3.6.5l-3.7.8c-1 .2-.6 1.7.4 1.5z"
      }
    }), h("path", {
      "attrs": {
        "d": "M35.7 8.2a22 22 0 012 3.4c.4 1 1.8.1 1.3-.8a21.8 21.8 0 00-2-3.4c-.5-.9-2 0-1.3.8z"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M40.3 14.6v.4a.3.3 0 000 .2.3.3 0 00.3.2h.2a.4.4 0 00.2-.1.4.4 0 00.1-.3v-.4a.3.3 0 000-.2.3.3 0 00-.2-.2.3.3 0 00-.2 0 .4.4 0 00-.4.4zm11-.3v.4a.3.3 0 000 .1.3.3 0 00.2.3h.2a.4.4 0 00.3-.4v-.4a.3.3 0 000-.2.3.3 0 00-.2-.2.3.3 0 00-.2 0 .4.4 0 00-.4.4z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF8000",
        "d": "M45 20.3h-.2s.1 0 0 0a.7.7 0 01-.3 0 .6.6 0 010-.2.4.4 0 01-.1 0l-.2-.4a1.2 1.2 0 00-.7-.6 1 1 0 00-.9.3c-.5.4-.4 1.1-.3 1.7a2 2 0 001 1.4 2.2 2.2 0 002-.1.4.4 0 00-.3-.7 1.4 1.4 0 01-1.3 0s0 .1 0 0a1.7 1.7 0 01-.2 0 1.7 1.7 0 01-.1-.2 1.3 1.3 0 01-.3-.6 2 2 0 010-.6 1 1 0 010-.2V20a.7.7 0 01.1 0v-.1c.1 0 0 0 0 0s.1 0 0 0a.4.4 0 01.1 0l.1.1.1.2.2.3c.4.5 1 .8 1.6.6a.4.4 0 00.2-.5.4.4 0 00-.5-.3z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF8000",
        "d": "M42.7 19.9a3 3 0 00.3 1.8l.2.3c.2.2.5.2.7.1.4-.2.4-.7.3-1 0-.4-.2-.7-.3-1a.4.4 0 00-.8 0v1.2c.1.4.4.7.8.8a1 1 0 001-.4.8.8 0 00.2-.6.6.6 0 00-.7-.4.6.6 0 00-.2 1c.1.1.3.2.5.1l-.3-.8a.5.5 0 00-.3.8.4.4 0 00.7-.4v.2a.3.3 0 01-.1.2.4.4 0 00.2-.5.4.4 0 00-.5-.3c.2 0 .4.1.3.3v.2s-.1 0 0 0a.2.2 0 01-.2 0 .3.3 0 01-.2 0 .2.2 0 010-.2c0 .1 0 0 0 0h-.1a.7.7 0 00-.2 0s.1 0 0 0v-.1-.1-.1-.8H43l.3 1V21.6a.2.2 0 01.2-.1.2.2 0 01.1 0v-.2a2.4 2.4 0 01-.2-.4v-.1-.2-.4a.4.4 0 000-.3.4.4 0 00-.3-.2c-.2 0-.5 0-.5.3z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF5000",
        "d": "M44.7 21.2v.8c0 .2.2.4.5.4a.4.4 0 00.4-.4l-.1-.8a.4.4 0 00-.4-.4.4.4 0 00-.4.4z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF5000",
        "d": "M44.9 20.7V22c0 .6.9.6.9 0l-.1-1.2c0-.5-.8-.5-.8 0z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF8000",
        "d": "M44.6 21.4c.3 0 .7-.1 1-.4l.1-.1h.1l.1-.1a.2.2 0 01-.2 0c0 .1 0 0 0 0a2.7 2.7 0 010 .5h-.1v.2h-.1v.1h-.2c0 .1 0 0 0 0l-.2.1c-.1 0 0 0 0 0H45h-.3-.4a1.3 1.3 0 01-.1 0s-.1 0 0 0H44a.4.4 0 10-.7.4c.2.4.7.5 1.1.5.5 0 1 0 1.3-.3a1.7 1.7 0 00.7-1v-1a.7.7 0 00-.8-.3c-.2 0-.4.3-.6.4a2.3 2.3 0 01-.3.2h-.1a.8.8 0 01-.1 0 .4.4 0 00-.4.4c0 .2.2.4.4.4z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF8000",
        "d": "M45.1 22l.6-.5a.3.3 0 00.1-.2.3.3 0 000-.1.4.4 0 00-.4-.4.4.4 0 00-.2 0l-.7.6a.3.3 0 000 .1.3.3 0 000 .2.4.4 0 00.3.4h.1a.4.4 0 00.2-.1z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF8000",
        "d": "M42.4 20.6a2 2 0 000 .8l.3.7c.3.4.7.6 1.1.7l.8.1c.3 0 .6 0 .8-.2.4-.2.8-.5 1-.9a1.6 1.6 0 000-1.5c-.4-.4-1 0-.8.4a.8.8 0 01-.1 1l-.3.2-.6.2a2 2 0 01-.6-.1 1.1 1.1 0 01-.5-.2 1.2 1.2 0 01-.2-.5 1.6 1.6 0 01-.1-.7.4.4 0 00-.4-.4.4.4 0 00-.4.4z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF8000",
        "d": "M44 22c.6 0 .6-.8 0-.8s-.5.8 0 .8z"
      }
    }), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M25 23c-1.7-.3-3.2-1.7-4.4-3a13 13 0 01-2.6-4.2 13.2 13.2 0 01.7-10.5c.5-1-1-1.9-1.5-.9a15 15 0 00-.6 12.3C18 20 21 24 25 24.6c1 .1 1-1.6 0-1.7z"
      }
    }), h("path", {
      "attrs": {
        "d": "M18.5 4c-.4-.6-.8-1.4-.4-2.1.6-1-.9-1.8-1.5-.9-.7 1.3-.2 2.7.5 3.9.5 1 2 0 1.4-.9z"
      }
    }), h("path", {
      "attrs": {
        "d": "M19.1 5.2A11.5 11.5 0 0020.6 2c.3-1-1.3-1.5-1.6-.5a10 10 0 01-1.3 2.7c-.7.9.8 1.7 1.4.8z"
      }
    }), h("path", {
      "attrs": {
        "d": "M18.4 5.9a16 16 0 003.1-.5c1-.3.6-1.9-.4-1.6a13.6 13.6 0 01-2.7.4c-1 0-1 1.7 0 1.7z"
      }
    })]), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M65.9 24.3c1.3.8 2.7 3 .9 4.2-1.8 1-3.6-.7-4.3-2.2-1.6-3-1.5-6.7-1.6-10 0-1.1-1.9-1.1-1.8 0 0 2 .1 4 .4 6 .4 2.6 1.2 5.6 3.3 7.2 1.9 1.5 4.9 1.5 6.1-.8 1.3-2.2-.1-4.7-2.1-6-1-.6-1.9 1-1 1.6z"
      }
    }), h("path", {
      "attrs": {
        "d": "M60.6 16.7L62 15c.3-.3.3-.9 0-1.2-.3-.4-1-.4-1.3 0l-1.5 1.8c-.3.4-.4.9 0 1.2.3.4 1 .4 1.3 0z"
      }
    }), h("path", {
      "attrs": {
        "d": "M60.6 16a15 15 0 01-.4-2.4c-.1-1.1-1.9-1.2-1.8 0 0 1 .2 2 .5 2.9.3 1.1 2 .6 1.7-.5z"
      }
    }), h("path", {
      "attrs": {
        "d": "M59.9 15.5a3.5 3.5 0 01-1.3-1c-.3-.5-.8-.6-1.3-.4-.4.2-.6.8-.3 1.2a5.3 5.3 0 002 1.8 1 1 0 001.2-.4c.2-.4 0-1-.3-1.2z"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#82C9E3",
        "d": "M49 23.2c0-1 0-2.1.3-3.1 0 0 3.6-1.5 6.1-1.6a24 24 0 008.2-1.2 15.7 15.7 0 016.1-1.7c2.3-.2 7.2-.4 9.3-1 2-.5 4.9-.6 7-1 2.1-.2 3.5-.4 3.7-1.6a3.2 3.2 0 00-.4-2s2.2-.2 2.8.8c.5 1.1 1.2 2.3-.2 3.3a24 24 0 01-6.6 3.2L80 19s-3.3 1.2-5.8 1.3c-2.5.1-5.5.8-5.5.8s-3.2 1.4-4.9 1.5h-4.2s-2.3 0-4 .6l-3.3 1.1s-3.2 0-3.3-1.1z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#DEE37A",
        "d": "M51 24.2c-.9.2-2-.7-2-.7V21l.6-1.3 3.5-1s0 1.5-.4 2.6l-1.7 3zm6.7-1.5l1.5-4.5s3.2-.2 4.4-1c1.2-1 2.3-1 2.3-1l-1.1 3.7-1.4 2.8a32 32 0 00-3.4 0h-2.3zm11.9-1.5s1-2.2 1.3-3.3l.6-2.5s3.5-.5 4.4-.9a11 11 0 012-.6l-.8 3.2c-.2 1-1.4 3.2-1.4 3.2s-4.6.3-6.1.9zm12.2-2.3c0-.2 1.3-2.5 1.5-3.6l.6-1.6s2.8 0 3.6-.4a10.6 10.6 0 001.5-.8s.6.7.2 1.9l-.7 2-4.3 1.6a22.7 22.7 0 01-2.4.9z"
      }
    }), h("g", {
      "attrs": {
        "fill": "#4C4C4C"
      }
    }, [h("path", {
      "attrs": {
        "d": "M50.2 18.2a5 5 0 00-.4 3.4c.2.9.8 2.4 2 1.8.8-.5 0-1.7-.8-1.3h.1l.7.3a3.4 3.4 0 01-.3-3.5c.4-.8-.8-1.6-1.3-.7z"
      }
    }), h("path", {
      "attrs": {
        "d": "M50.1 18.6l-4.8 1.6c-.9.3-.5 1.7.4 1.4l4.8-1.6c.9-.3.5-1.7-.4-1.4z"
      }
    }), h("path", {
      "attrs": {
        "d": "M44.6 20.7a2.6 2.6 0 00.3 2 .7.7 0 101.2-.8 1 1 0 010-.8.7.7 0 10-1.5-.4z"
      }
    }), h("path", {
      "attrs": {
        "d": "M45.7 23c1.6 0 3.3-.1 5-.4.9-.1.5-1.5-.4-1.4-1.6.2-3 .3-4.6.3-1 0-1 1.5 0 1.5z"
      }
    }), h("path", {
      "attrs": {
        "d": "M48.8 20c-.1.5-.9.5-1.2.6l-1.7.3c-.9.3-.5 1.7.4 1.5 1.3-.3 3.4-.4 4-2 .2-.8-1.2-1.2-1.5-.3zm4.5 3a17 17 0 001.8-4.9.4.4 0 00-.3-.5.4.4 0 00-.5.3 16.2 16.2 0 01-1.7 4.6c-.2.5.5.9.7.4zm6.3-2c.8-1.1.9-2.5 1.5-3.6.3-.5-.4-.9-.7-.4-.7 1-.7 2.5-1.5 3.6a.4.4 0 10.7.4zm6 0a23.9 23.9 0 002.3-6c0-.5-.7-.8-.8-.2a23 23 0 01-2.3 5.8c-.2.5.5 1 .7.4zm6-1.8a15.4 15.4 0 002-5.2.4.4 0 00-.3-.5.4.4 0 00-.5.3 14.8 14.8 0 01-1.8 5c-.3.4.4.8.7.4zm6-.6c1.3-1.5 1.8-3.4 2.3-5.2.2-.5-.6-.7-.7-.2-.5 1.7-1 3.5-2.2 4.9a.4.4 0 000 .5.4.4 0 00.6 0z"
      }
    }), h("path", {
      "attrs": {
        "d": "M51 19.2c1.5-.4 2.8-1 4.2-1.2 1.8-.3 3.6-.3 5.4-.5 3.4-.3 6.3-2 9.7-2.6 1.7-.3 3.5-.3 5.2-.5l5-.8a49 49 0 015.3-.7c1.5 0 3 .1 4.5-.5 1.2-.6 2.3-2 1.8-3.3-.3-1.4-1.8-2-3-1.5-.9.4-.1 1.7.7 1.3.5-.2 1 .3 1 .7 0 .7-.7 1.2-1.2 1.5-1.2.5-2.8.3-4.1.4-3 .2-5.9.9-8.8 1.3-2.9.4-5.9.3-8.7 1l-4 1.5c-1.5.5-3 .8-4.5.9-1.5 0-3.1.1-4.7.4-1.4.2-2.7.8-4.1 1.2-1 .3-.6 1.7.4 1.4z"
      }
    }), h("path", {
      "attrs": {
        "d": "M51 23.5c3.3.7 6.2-1.7 9.5-1.9 2 0 3.8.3 5.7-.1l5.4-1.5a35.8 35.8 0 016-.8c1.8-.1 3.6-.3 5.3-1l2.4-1.1 3-1c1.5-.4 3.1-.9 4.4-2 1.3-1 2.4-2.7 2-4.3A3 3 0 0093.3 8c-.5-.3-1.5-.9-2.1-.6-.3 0-.6.3-.6.7a.9.9 0 00.5.7.7.7 0 00.9 0v-.1c.7-.6-.3-1.7-1-1l.8-.1.3.5-.5.7c-.2 0 0 0 0 0l.5.2.8.5c.6.6.4 1.5 0 2.2-.6 1.3-2 2-3.2 2.5-1.6.6-3.2.8-4.7 1.4-1.5.6-2.8 1.5-4.4 1.8-1.6.4-3.3.3-5 .5a33.6 33.6 0 00-5 .8L65.8 20c-1.7.4-3.3 0-5 0-1.6.1-3.1.6-4.6 1.2-1.6.5-3.2 1.2-4.9.8-.9-.2-1.3 1.2-.4 1.4z"
      }
    }), h("path", {
      "attrs": {
        "d": "M83.6 17.2a14.2 14.2 0 002.3-4.5c.1-.5-.7-.7-.8-.2a13.5 13.5 0 01-2.2 4.3.4.4 0 00.2.5.4.4 0 00.5-.1zm7-2.7a11 11 0 001.1-3.5.4.4 0 00-.4-.4.4.4 0 00-.4.4 9.9 9.9 0 01-1 3.1.4.4 0 00.2.6c.2 0 .4 0 .5-.2zM89.7 9c1-.6 2.3-.2 3.1.6.7.7 1.7-.4 1-1a4.2 4.2 0 00-4.8-1c-.8.5 0 1.8.7 1.4z"
      }
    })]), h("path", {
      "attrs": {
        "fill": "#DEE37A",
        "d": "M89.8 8.2a8.1 8.1 0 01.6-5.8l-2.6.3s-.7 2.4.5 5l.4.7S85.5 8.6 84 6l-1 2.7s1.4 1.4 5.5.6c0 0-1.4 2.4-.6 3.9.8 1.5 2.6 1.8 2.6 1.8l1.3-1.8s-2-.5-2.3-2.1c-.2-1.7 0-2 0-2s2.6.4 4 .2c1.3-.2 2.2-2.2 2.2-2.2l-1.9-1.6s-.2 1.7-1.7 2.2c-1.6.5-2.3.4-2.3.4z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M90.7 6.7a5.1 5.1 0 01-.8-5.3c.4-.9-1-1.3-1.4-.4-.9 2.3-.4 4.9 1.2 6.7.6.7 1.6-.3 1-1z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M89.4 2a12.8 12.8 0 002-.2c.5-.1.7-.6.6-1-.1-.4-.5-.5-1-.4h-1.6c-1 0-1 1.5 0 1.5z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M90.8 1a10.5 10.5 0 00-.5 7c.2.9 1.6.5 1.4-.4a9 9 0 01.4-5.9c.4-.8-.9-1.6-1.3-.7z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M91.1 7c-1.9-.4-4-.9-5.1-2.6-.5-.8-1.8 0-1.3.7 1.3 2.1 3.7 2.8 6 3.2 1 .2 1.3-1.2.4-1.4z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M84.4 4.6l-1 2.5c-.2.3.1.8.5.9.4 0 .7-.2.9-.5l1-2.5c.1-.4-.2-.8-.5-1-.4 0-.8.2-1 .6z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M84 8.2c2.3.7 4.9.8 7.3.2.9-.3.5-1.7-.4-1.4a11.3 11.3 0 01-6.5-.3c-1-.3-1.3 1.2-.4 1.5z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M89.6 7.4a4.7 4.7 0 00-1.2 4.3 4 4 0 003 2.8c.9.3 1.3-1.2.4-1.4-2.2-.5-2.5-3-1.2-4.6.6-.8-.4-1.8-1-1z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M92.2 14.2c.5-.6 1-1.2 1.3-1.9.5-.8-.8-1.5-1.2-.7a15.6 15.6 0 01-1.1 1.5c-.3.3-.3.8 0 1 .2.3.8.4 1 0z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M90 8c-.5 2 .4 4.7 2.9 4.6 1 0 1-1.5 0-1.5-1.5 0-1.8-1.6-1.6-2.8.2-.9-1.2-1.3-1.4-.3z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M90.4 7.9a4.8 4.8 0 004.2 1c1.4-.4 2.8-1.5 2.7-3 0-1-1.5-1-1.4 0 0 1-1.1 1.5-2 1.6-.8.1-1.7 0-2.4-.6-.8-.6-1.8.4-1 1z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M96.9 5.1l-1.2-1c-.3-.2-.8-.2-1 0-.3.3-.4.8 0 1l1.1 1c.4.3.8.3 1 0 .3-.2.4-.7 0-1z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#4C4C4C",
        "d": "M91 7.6A4.5 4.5 0 0095.7 5c.3-.9-1-1.6-1.3-.8a3 3 0 01-3.2 2c-1-.2-1 1.3 0 1.4z"
      }
    })])])]);
  }
};