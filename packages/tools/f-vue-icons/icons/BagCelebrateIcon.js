import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';

export default {
    name: 'BagCelebrateIcon',
    props: {},
    functional: true,
    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;
        return h('svg', _mergeJSXProps([{
            attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 92 75'
            },
            class: 'c-ficon c-ficon--bag-celebrate'
        }, ctx.data]), [h('g', {
            attrs: {
                fill: 'none'
            }
        }, [h('path', {
            attrs: {
                fill: '#FFF',
                d: 'M2.3 62.5l3-12c.7-2.8 1.6-17 2.1-19.8.5-3 0-13.9 0-13.9s11.8-2.5 19.1-3.5c7.4-1 31.9.6 31.9.6s-.6 1.6-.6 2.2c0 .6-1.9 9.1-2.8 21-1 12 0 23.3 0 23.3s-17.2 3.8-27.2 4c-10 .2-25.5-1.9-25.5-1.9z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF8000',
                d: 'M8.3 63.6l-6.2-1s2.4-9.1 3.3-14.3c.8-5.2 1.9-12.1 2-17.6.2-5.6-.2-14.4-.2-14.4l5.3-1.2s1.5 13.5.8 20.8a236.3 236.3 0 01-5 27.7zm36.3-17.5a143 143 0 00-2.8-4v-3.6a.5.5 0 00-.2-.5l-.8-.4c-.3-.1-.7 0-.8.4l-.2 1.2-2-2.6c-.8-.7-1.6-.7-2.5-.3-4 1.9-7.7 5-10.5 8.5a.5.5 0 000 .9 4.8 4.8 0 002.7 1c-.5 1.8-.8 3.7-.8 5.6 0 1.2 1 1.2 2 1.3l1.3.1.8-4.5a1.8 1.8 0 01-.2-.2c-.6-.2-.8-.8-.8-1.4 0-.7.1-1.4.3-2l.5-2c.1-.6.8-.3.7.1l-.4 1.9-.2.8a.4.4 0 010 .2l.3.3h.2l.2.1.8-3.4c.1-.5.8-.3.7.2a63.5 63.5 0 00-.6 2.5l-.1.8.9-.2.9-3.2c0-.5.8-.3.7.2l-1 3.4a5 5 0 01-.6 1.5.9.9 0 01-.8.4.5.5 0 01-.2 0h-.3a49.1 49.1 0 01-.5 4.6l1.3.1 3.3.2.5-2.4h-.2a1.9 1.9 0 01-.9-.1.6.6 0 01-.3-.4.4.4 0 010-.4 13.4 13.4 0 013.3-7c0-.4.8-.4.7 0a.3.3 0 010 .2 82.5 82.5 0 01-.2 2.8 81.3 81.3 0 01-.6 4.6 76.3 76.3 0 01-.4 2.7c.7 0 1.5-.1 2.1-.5 1-.5 1-1.7 1.2-2.7l.7-3.6a6.2 6.2 0 002.5-.4.5.5 0 00.3-.8zm-18.7-1l.1-.1v.1zm6.2-3.4zm6.8-2l.8 1.1.2.4-1-1.5zm1.9.9a.4.4 0 000-.2v.2z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M22 64.4c0 2.6.2 5.1.4 7.7.1 1.4 2.3 1.4 2.2 0a89.3 89.3 0 01-.4-7.7c0-1.4-2.1-1.4-2.1 0zm12.7 0c0 2.5.1 5 .4 7.7 0 1.3 2.3 1.3 2.1 0a89.3 89.3 0 01-.3-7.8c0-1.4-2.2-1.4-2.2 0z'
            }
        }), h('g', {
            attrs: {
                fill: '#4C4C4C'
            }
        }, [h('path', {
            attrs: {
                d: 'M57.2 14.2c-.8 3.3-1.4 6.7-1.9 10.1-.1 1.2 1.7 1.8 1.9.5.5-3.4 1.1-6.8 1.9-10.1.3-1.2-1.6-1.8-1.9-.5zM6.5 16.8c.6 12-.4 24-3 35.8A147.3 147.3 0 011 62.4c-.3 1.2 1.6 1.8 2 .6A142.9 142.9 0 008.5 27a140.1 140.1 0 00-.1-10.3c-.1-1.2-2-1.2-2 0z'
            }
        }), h('path', {
            attrs: {
                d: 'M7.9 17.3a142.3 142.3 0 0150.5-2.4c1.2.2 1.2-1.8 0-2a144.6 144.6 0 00-40 .4 142 142 0 00-11 2c-1.3.4-.8 2.2.5 2zm47.6 6a208.6 208.6 0 00-1.8 37.1c0 1.3 2 1.3 2 0a206 206 0 011.7-36.6c.1-1.2-1.7-1.8-2-.5z'
            }
        }), h('path', {
            attrs: {
                d: 'M1.8 63.6c3.3 1 6.8 1 10.2 1.3 3.5.2 7 .4 10.6.4 6.9.2 13.8-.1 20.7-1.1a83.4 83.4 0 0011.6-2.5c1.2-.4.6-2.3-.6-2-13 4-27 4.1-40.5 3.3-3.8-.2-7.8-.2-11.4-1.3-1.2-.3-1.8 1.6-.6 2zM12 15.5c.5 2.7.8 5.4.7 8 0 .9 1.3.9 1.3 0a43 43 0 00-.8-8.3c-.1-.8-1.3-.5-1.2.3zm.8 16a81.7 81.7 0 01-1 12.2c-.2.8 1 1.1 1.2.3a84 84 0 001-12.5c0-.8-1.2-.9-1.2 0z'
            }
        }), h('path', {
            attrs: {
                d: 'M10 52c-.7 3.8-1.5 7.6-2.6 11.3-.2.8 1 1.1 1.2.3 1-3.7 2-7.4 2.6-11.2.1-.8-1-1.1-1.2-.3z'
            }
        })]), h('g', {
            attrs: {
                fill: '#4C4C4C'
            }
        }, [h('path', {
            attrs: {
                d: 'M29.3 12.8a56.2 56.2 0 00-2-5.3c-.4-1-2-.2-1.5.9a51.1 51.1 0 011.7 4.9c.4 1 2.1.6 1.8-.5z'
            }
        }), h('path', {
            attrs: {
                d: 'M27 8.6c3.3-1 7-.7 10.4-.6 1.1 0 1.1-1.8 0-1.8-3.6 0-7.4-.4-11 .6-1 .4-.5 2.1.6 1.8z'
            }
        }), h('path', {
            attrs: {
                d: 'M36.7 7.5l1.5 4.8c.3 1 2 .6 1.7-.5L38.4 7c-.3-1.1-2-.6-1.7.5zM17.4 14a108.6 108.6 0 01-1.7-3.8c-.5-1.1-2.2-.6-1.8.4l2 4.4c.4 1 2 .1 1.5-1z'
            }
        }), h('path', {
            attrs: {
                d: 'M15.2 11l3.8-.8c1.3-.3 2.6-.7 3.9-.5 1.1.1 1.1-1.7 0-1.8-1.4-.2-2.7.2-4 .5l-4.2.8c-1.1.3-.7 2 .5 1.8z'
            }
        }), h('path', {
            attrs: {
                d: 'M22.4 9.4a24.5 24.5 0 012.1 3.8c.5 1 2 .1 1.6-1a24.3 24.3 0 00-2.2-3.7c-.6-1-2.2 0-1.5.9z'
            }
        })]), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M27.5 16.5v.5a.3.3 0 000 .1.4.4 0 00.3.3H28.1a.4.4 0 00.2-.1.5.5 0 00.1-.3v-.5a.3.3 0 000-.2.4.4 0 00-.2-.2.3.3 0 00-.2 0h-.1a.4.4 0 00-.4.4zm12.1-.3v.4a.3.3 0 000 .2.4.4 0 00.3.2H40.2a.4.4 0 00.3-.4v-.4a.3.3 0 000-.2.4.4 0 00-.2-.3.3.3 0 00-.2 0H40a.4.4 0 00-.4.5z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF8000',
                d: 'M32.7 22.9h-.2s.1 0 0 0a.8.8 0 01-.3-.1.7.7 0 010-.1.4.4 0 01-.2-.1l-.2-.4a1.3 1.3 0 00-.8-.7 1 1 0 00-1 .3c-.5.5-.4 1.3-.3 2 .1.6.6 1.2 1.1 1.5.8.3 1.6.3 2.3-.1a.5.5 0 00.2-.7.5.5 0 00-.6-.1 1.6 1.6 0 01-1.4.1 2 2 0 01-.2-.1 2 2 0 01-.2-.2 1.4 1.4 0 01-.3-.6 2.3 2.3 0 010-.7v-.3s0-.1 0 0a.8.8 0 01.1-.1c.2-.1 0 0 0 0s.1 0 0 0a.4.4 0 01.2 0s.1.1 0 0l.1.1.1.2.2.3a1.6 1.6 0 001.7.7.5.5 0 00.3-.6.5.5 0 00-.6-.3z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF8000',
                d: 'M30.2 22.4a3.3 3.3 0 00.3 2l.3.4a.6.6 0 00.7 0c.4-.2.4-.7.3-1.1 0-.4-.2-.7-.3-1.1a.5.5 0 00-.9.1V24c.2.5.5.8.9 1 .4.1 1 0 1.2-.4a.9.9 0 000-.7.6.6 0 00-.6-.5.6.6 0 00-.5.7.6.6 0 00.7.6l-.2-1a.6.6 0 00-.4 1 .5.5 0 00.7.1.5.5 0 00.1-.6v.2a.4.4 0 01-.2.3.5.5 0 00.4-.6.5.5 0 00-.6-.3c.2 0 .4 0 .3.3v.2c-.1 0-.1 0 0 0a.2.2 0 01-.2 0 .3.3 0 01-.2 0 .2.2 0 010-.2s0-.1 0 0c-.1 0-.1 0 0 0-.2 0 0 0 0 0a.4.4 0 01-.1 0c-.2.1 0 0 0 0h-.1a.8.8 0 00-.1 0c-.1 0-.1 0 0 0l-.1-.1v-.1s0-.2 0 0v-.2-.9l-1 .1.3 1v.4a.3.3 0 01.2-.1.2.2 0 01.2 0V24l-.1-.1a2.7 2.7 0 01-.1-.5v-.1-.3-.4c-.1.1-.1.1 0 0a.5.5 0 00-.1-.3.5.5 0 00-.3-.2c-.2 0-.5 0-.6.3z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF5000',
                d: 'M32.3 23.8l.1 1a.5.5 0 00.5.4.5.5 0 00.4-.5v-.9a.5.5 0 00-.5-.4.5.5 0 00-.5.4z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF5000',
                d: 'M32.6 23.3v1.4c0 .6 1 .6 1 0l-.1-1.4c0-.6-1-.6-1 0z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF8000',
                d: 'M32.3 24c.4 0 .7 0 1-.3l.2-.2h.2a.2.2 0 01-.2-.1c0 .2 0 0 0 0l-.1.6v.2h-.1l-.1.1-.2.1a1.7 1.7 0 01-.1 0h-.2-.3-.5s.1 0 0 0h-.1s-.1 0 0 0h-.1a.5.5 0 10-.8.5c.3.4.8.5 1.3.5s1 0 1.4-.3c.4-.3.7-.7.8-1.2v-1a.8.8 0 00-.9-.3c-.3 0-.5.2-.7.4a2.5 2.5 0 01-.3.2h-.1a.9.9 0 01-.1 0 .5.5 0 00-.5.5.5.5 0 00.5.4z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF8000',
                d: 'M32.8 24.7l.7-.5a.4.4 0 00.1-.2.3.3 0 000-.2.5.5 0 00-.4-.4h-.1a.5.5 0 00-.2.1l-.7.6a.3.3 0 00-.1.1.3.3 0 000 .2.5.5 0 00.4.5h.1a.5.5 0 00.2-.2z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF8000',
                d: 'M29.8 23.2v.8l.4.8c.3.5.8.7 1.2.8l.9.2.9-.3c.4-.2.8-.5 1-1a1.8 1.8 0 000-1.6c-.3-.5-1.1 0-.8.5a.8.8 0 01-.2 1l-.3.2-.6.3a2.3 2.3 0 01-.7-.2 1.3 1.3 0 01-.5-.2 1.3 1.3 0 01-.3-.5 1.8 1.8 0 01-.1-.8.5.5 0 00-.5-.5.5.5 0 00-.4.5z'
            }
        }), h('path', {
            attrs: {
                fill: '#FF8000',
                d: 'M31.7 24.7c.5 0 .5-.9 0-.9s-.6 1 0 1z'
            }
        }), h('g', {
            attrs: {
                fill: '#4C4C4C'
            }
        }, [h('path', {
            attrs: {
                d: 'M10.6 25.8c-2-.3-3.7-1.9-5-3.3a14.6 14.6 0 01-2.8-4.7 14.8 14.8 0 01.7-11.7c.5-1-1-2-1.6-1a16.6 16.6 0 00-.7 13.7c1.6 3.9 5 8.3 9.4 8.8 1.2.2 1.2-1.7 0-1.8z'
            }
        }), h('path', {
            attrs: {
                d: 'M3.3 4.8C3 4 2.4 3.2 3 2.4c.6-1-1-2-1.6-1-.9 1.4-.4 3 .4 4.3.6 1 2.2.1 1.6-1z'
            }
        }), h('path', {
            attrs: {
                d: 'M4 6a12.9 12.9 0 001.6-3.4C6 1.4 4.2.9 3.8 2a11.1 11.1 0 01-1.4 3C1.7 6 3.4 7 4 6z'
            }
        }), h('path', {
            attrs: {
                d: 'M3.2 6.8a17.7 17.7 0 003.5-.5c1.1-.3.6-2.1-.5-1.8a15 15 0 01-3 .4C2 5 2 7 3.2 6.8z'
            }
        })]), h('g', {
            attrs: {
                fill: '#4C4C4C'
            }
        }, [h('path', {
            attrs: {
                d: 'M55.9 27.3c1.4 1 3 3.4 1 4.7-2 1.2-4-.8-4.8-2.4-1.7-3.4-1.6-7.5-1.8-11.2 0-1.2-2-1.3-2 0 .2 2.2.2 4.5.5 6.7.4 2.9 1.3 6.2 3.7 8 2 1.6 5.4 1.7 6.8-.8 1.4-2.6-.2-5.3-2.4-6.7-1-.7-2 1-1 1.7z'
            }
        }), h('path', {
            attrs: {
                d: 'M50 18.9l1.7-2c.3-.4.4-1 0-1.4-.4-.4-1.1-.4-1.4 0l-1.7 2c-.4.4-.4 1 0 1.4.3.4 1 .4 1.4 0z'
            }
        }), h('path', {
            attrs: {
                d: 'M50 18.1a16.7 16.7 0 01-.4-2.7c-.1-1.3-2.1-1.3-2 0 0 1 .2 2.2.5 3.2.3 1.3 2.2.7 2-.5z'
            }
        }), h('path', {
            attrs: {
                d: 'M49.2 17.5a3.9 3.9 0 01-1.4-1.2c-.3-.4-1-.6-1.4-.3-.4.2-.7.9-.4 1.3a5.9 5.9 0 002.2 2c.5.2 1 0 1.4-.4.2-.5 0-1.1-.4-1.4z'
            }
        })]), h('path', {
            attrs: {
                fill: '#82C9E3',
                d: 'M37.2 26a18 18 0 01.2-3.4s4-1.6 6.9-1.7c2.7 0 7-.3 9-1.3a17.4 17.4 0 016.8-2c2.6-.2 8-.4 10.3-1 2.3-.6 5.5-.7 7.8-1 2.3-.4 4-.7 4.1-2a3.6 3.6 0 00-.4-2.2s2.4-.2 3 1c.7 1.1 1.4 2.4-.1 3.6a26.7 26.7 0 01-7.3 3.6l-6 1.9s-3.6 1.3-6.4 1.4c-2.7 0-6 .8-6 .8s-3.6 1.6-5.5 1.7H49s-2.5.1-4.3.7c-1.9.5-3.8 1.3-3.8 1.3s-3.6 0-3.6-1.4z'
            }
        }), h('path', {
            attrs: {
                fill: '#DEE37A',
                d: 'M39.4 27.3c-1 .1-2.3-.9-2.3-.9v-2.7l.7-1.5 4-1s-.1 1.6-.6 2.8c-.5 1.2-1.8 3.3-1.8 3.3zm7.4-1.8l1.6-5s3.6-.2 5-1.2c1.3-1 2.5-1 2.5-1l-1.3 4c-.1.5-1.5 3.2-1.5 3.2a35.3 35.3 0 00-3.7 0h-2.6zM60 23.9s1-2.4 1.4-3.7l.7-2.8s4-.5 4.9-1l2.3-.7-1 3.6c-.2 1.1-1.5 3.5-1.5 3.5s-5.1.4-6.8 1zm13.5-2.6c0-.3 1.5-2.8 1.8-4l.5-1.7s3.2-.2 4-.6a11.7 11.7 0 001.7-.8s.7.8.2 2a60.3 60.3 0 00-.7 2.4s-3.6 1.2-4.8 1.7l-2.7 1z'
            }
        }), h('g', {
            attrs: {
                fill: '#4C4C4C'
            }
        }, [h('path', {
            attrs: {
                d: 'M38.5 20.5a5.5 5.5 0 00-.5 3.8c.3 1 1 2.7 2.2 2 .9-.5 0-1.9-.8-1.4h.1l.7.3a3.8 3.8 0 01-.3-3.9c.5-1-.9-1.8-1.4-.8z'
            }
        }), h('path', {
            attrs: {
                d: 'M38.4 21L33 22.6c-1 .4-.5 2 .5 1.6l5.3-1.8c1-.3.6-2-.4-1.6z'
            }
        }), h('path', {
            attrs: {
                d: 'M32.3 23.4a3 3 0 00.3 2.1.8.8 0 101.4-.8 1.2 1.2 0 01-.2-1 .8.8 0 00-.2-.7.8.8 0 00-1.3.4z'
            }
        }), h('path', {
            attrs: {
                d: 'M33.5 25.8c1.8 0 3.7 0 5.5-.4 1-.1.6-1.7-.5-1.5a33.3 33.3 0 01-5 .3c-1 0-1 1.6 0 1.6z'
            }
        }), h('path', {
            attrs: {
                d: 'M37 22.6c-.2.4-1 .5-1.4.6l-1.9.4c-1 .2-.5 1.8.5 1.5 1.4-.3 3.7-.3 4.3-2 .3-1-1.2-1.5-1.6-.5zm5 3.2a19 19 0 002-5.4.5.5 0 00-.4-.5.5.5 0 00-.5.3 18 18 0 01-1.9 5.1c-.3.5.5 1 .8.5zm7-2.2c.8-1.2.9-2.7 1.6-4 .3-.5-.5-1-.8-.4-.7 1.2-.8 2.7-1.6 4a.5.5 0 00.4.6.5.5 0 00.4-.2zm6.5.1a26.6 26.6 0 002.6-6.8c.1-.5-.8-.8-.9-.2a25.7 25.7 0 01-2.5 6.5c-.2.6.5 1 .8.5zm6.8-2.1a17.2 17.2 0 002-5.7.5.5 0 00-.2-.6.5.5 0 00-.6.4 16.5 16.5 0 01-2 5.4c-.2.5.5 1 .8.5zM69 21c1.4-1.7 2-3.8 2.6-5.8.1-.6-.7-.8-.9-.3-.5 2-1 4-2.4 5.5a.5.5 0 000 .6c.2.2.5.2.7 0z'
            }
        }), h('path', {
            attrs: {
                d: 'M39.4 21.7c1.6-.5 3-1.1 4.7-1.4 2-.4 4-.3 6-.5 3.7-.4 7-2.4 10.7-3l5.8-.5c1.8-.2 3.7-.5 5.5-.9 2-.3 4-.6 5.9-.7 1.6-.1 3.4 0 5-.7 1.3-.6 2.5-2 2-3.6-.4-1.5-2-2.3-3.4-1.7-1 .5-.1 1.9.8 1.4.5-.2 1 .4 1.1 1 0 .6-.7 1.2-1.3 1.5-1.3.6-3 .4-4.6.5-3.3.2-6.5 1-9.7 1.4-3.2.5-6.5.4-9.7 1.2l-4.4 1.6a19.8 19.8 0 01-5 1c-1.7 0-3.4.1-5.2.4-1.6.3-3 1-4.6 1.4-1 .3-.6 1.8.4 1.6z'
            }
        }), h('path', {
            attrs: {
                d: 'M39.3 26.4c3.8.9 7-1.8 10.6-2 2.1-.1 4.2.3 6.4-.2 2-.5 4-1.3 6-1.7a39.6 39.6 0 016.5-.9c2 0 4-.3 6-1.1.9-.4 1.7-.9 2.6-1.2 1-.5 2.2-.7 3.3-1 1.8-.5 3.5-1 5-2.3 1.4-1 2.6-3 2.1-4.9-.2-.8-.7-1.4-1.4-1.9-.6-.4-1.7-1-2.4-.7-.4 0-.7.4-.6.7a1 1 0 00.5.9c.3.2.7.1 1-.1.8-.8-.4-2-1.2-1.2l1-.1h-.1l.4.6-.6.7c-.2.1 0 0 .1.1l.5.2.9.6c.6.6.4 1.7 0 2.4-.7 1.4-2.2 2.3-3.6 2.8-1.7.6-3.5.9-5.2 1.5-1.7.7-3.1 1.7-4.9 2-1.8.4-3.7.4-5.5.6-1.9.1-3.7.4-5.6.9-1.8.4-3.5 1.1-5.3 1.5-1.9.5-3.7.1-5.6.1-1.8 0-3.4.7-5 1.2-1.8.6-3.6 1.4-5.5 1-1-.3-1.4 1.3-.4 1.5z'
            }
        }), h('path', {
            attrs: {
                d: 'M75.5 19.4a15.8 15.8 0 002.6-5c.1-.5-.7-.8-1-.2a15 15 0 01-2.3 4.8.5.5 0 00.1.6.5.5 0 00.7-.2zm7.9-3a12.3 12.3 0 001.1-4 .5.5 0 00-.4-.4.5.5 0 00-.5.5 11 11 0 01-1 3.5.5.5 0 00.1.6.5.5 0 00.7-.2zm-1-6.3c1.1-.6 2.5-.1 3.4.8.7.7 1.9-.5 1.1-1.2a4.7 4.7 0 00-5.4-1c-.9.5 0 1.9.9 1.4z'
            }
        })]), h('g', [h('path', {
            attrs: {
                fill: '#DEE37A',
                d: 'M82.4 9.4A9 9 0 0183 3l-2.8.2s-.7 2.8.5 5.5l.5.9S77.6 9.8 76 7l-1 3s1.4 1.7 6 .7c0 0-1.6 2.7-.7 4.3 1 1.7 2.9 2.1 2.9 2.1l1.4-2s-2.3-.6-2.5-2.4c-.2-1.8 0-2.1 0-2.1s3 .4 4.4.1C88 10.5 89 8.3 89 8.3l-2.1-1.7s-.3 1.8-2 2.4c-1.7.5-2.5.4-2.5.4z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M83.4 7.7a5.7 5.7 0 01-.8-5.9c.4-1-1.2-1.4-1.6-.4-1 2.5-.5 5.4 1.3 7.5.7.8 1.8-.4 1.1-1.2z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M82 2.4a14.1 14.1 0 002.3-.2c.4 0 .6-.6.5-1 0-.4-.5-.6-1-.5L82 .8c-1 0-1 1.6 0 1.6z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M83.6 1.4a11.7 11.7 0 00-.6 7.8c.2 1 1.8.5 1.5-.5a10 10 0 01.5-6.5c.4-1-1-1.8-1.4-.8z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M83.9 8c-2.1-.4-4.5-.9-5.7-2.8-.6-1-2-.1-1.4.8 1.5 2.3 4 3 6.6 3.5 1 .2 1.5-1.3.5-1.5z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M76.4 5.4L75.3 8c-.2.5.2 1 .5 1 .5.2.9-.1 1-.5L78 5.8c.1-.4-.2-.9-.6-1-.5-.1-.8.2-1 .6z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M76 9.3c2.6 1 5.4 1 8 .3 1-.3.6-1.8-.4-1.6-2.4.7-4.9.6-7.2-.2-1-.4-1.4 1.2-.5 1.5z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M82.2 8.5a5.3 5.3 0 00-1.3 4.8 4.5 4.5 0 003.3 3.2c1 .2 1.4-1.4.4-1.6-2.5-.6-2.8-3.5-1.3-5.2.7-.8-.5-2-1.1-1.2z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M85.1 16l1.4-2c.6-1-.8-1.7-1.4-.8a17.4 17.4 0 01-1.1 1.7c-.3.3-.4.8 0 1.1.2.3.8.4 1.1 0z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M82.6 9.1c-.5 2.3.4 5.3 3.2 5.2 1 0 1-1.7 0-1.7-1.6.1-2-1.8-1.7-3 .2-1-1.3-1.5-1.5-.5z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M83.1 9a5.3 5.3 0 004.6 1.1c1.6-.3 3.1-1.5 3-3.3 0-1-1.6-1-1.6 0 0 1.1-1.2 1.7-2 1.8a3.6 3.6 0 01-2.8-.7c-.9-.6-2 .5-1.2 1.2z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M90.3 6l-1.4-1.1c-.3-.3-.8-.3-1.1 0-.3.3-.4.9 0 1.1L89 7.1c.4.3.8.3 1.2 0 .3-.3.3-.9 0-1.1z'
            }
        }), h('path', {
            attrs: {
                fill: '#4C4C4C',
                d: 'M83.8 8.7a5 5 0 005-2.9c.4-1-1-1.8-1.4-.8-.7 1.5-2 2.2-3.6 2-1 0-1 1.6 0 1.7z'
            }
        })])])]);
    }
};
