<template>
    <div
        data-test-id="mediaElement-component"
        :class="[$style['c-mediaElement'], { [$style['c-mediaElement--stack']]: stacked }, { [$style['c-mediaElement--reverse']]: reverse }]">
        <div :class="[$style['c-mediaElement-content'], contentAlignClass]">
            <h3 :class="[$style['c-mediaElement-title'], fontSizeClass]">
                {{ title }}
            </h3>
            <p :class="[$style['c-mediaElement-text'], fontSizeClass]">
                {{ text }}
            </p>
        </div>
        <div :class="[$style['c-mediaElement-imgWrapper'], imageAlignClass]">
            <img
                :class="$style['c-mediaBlock-img']"
                :src="imageUrl"
                alt="test image">
        </div>
    </div>
</template>

<script>
import { ALIGN, TEXT_SIZE } from '../config';

export default {
    props: {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        imageUrl:  {
            type: String,
            required: true
        },
        stacked: {
            type: Boolean,
            default: false
        },
        reverse: {
            type: Boolean,
            default: false
        },
        contentAlign: {
            type: String,
            default: ALIGN.LEFT
        },
        imageAlign: {
            type: String,
            default: ALIGN.LEFT
        },
        textSize: {
            type: String,
            default: 'md'
        }
    },
    data () {
        return {
            componentName: 'MediaElement'
        };
    },
    computed: {
        /**
         * Returns the class to modify the alignment of the content based on the prop contentAlign
         * @returns {*}
         */
        contentAlignClass () {
            switch (this.contentAlign) {
                case ALIGN.LEFT:
                    return this.$style['c-mediaElement-content--left'];
                case ALIGN.RIGHT:
                    return this.$style['c-mediaElement-content--right'];
                case ALIGN.CENTER:
                    return this.$style['c-mediaElement-content--center'];
                default:
                    return this.$style['c-mediaElement-content--left'];
            }
        },
        /**
         * Returns the class to modify the alignment of the image based on the prop imageAlign
         * @returns {*}
         */
        imageAlignClass () {
            switch (this.imageAlign) {
                case ALIGN.LEFT:
                    return this.$style['c-mediaElement-imgWrapper--left'];
                case ALIGN.RIGHT:
                    return this.$style['c-mediaElement-imgWrapper--right'];
                case ALIGN.CENTER:
                    return this.$style['c-mediaElement-imgWrapper--center'];
                default:
                    return this.$style['c-mediaElement-imgWrapper--left'];
            }
        },
        /**
         * Returns the class to modify the font size of the content based on the prop textSize
         * @returns {*}
         */
        fontSizeClass () {
            switch (this.textSize) {
                case TEXT_SIZE.SM:
                    return this.$style['c-mediaElement-fontSize--sm'];
                case TEXT_SIZE.MD:
                    return this.$style['c-mediaElement-fontSize--md'];
                case TEXT_SIZE.LG:
                    return this.$style['c-mediaElement-fontSize--lg'];
                case TEXT_SIZE.XL:
                    return this.$style['c-mediaElement-fontSize--xl'];
                case TEXT_SIZE.XXL:
                    return this.$style['c-mediaElement-fontSize--xxl'];
                default:
                    return this.$style['c-mediaElement-fontSize--md'];
            }
        }
    }
};
</script>

<style lang="scss" module>

.c-mediaElement {
    display: flex;
    width: 100%;
}
.c-mediaElement--stack {
    flex-direction: column;
}
.c-mediaElement--stack.c-mediaElement--reverse {
    flex-direction: column-reverse;
}

.c-mediaElement-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 0;

    &--center {
        align-items: center;
        text-align: center;
    }
    &--left {
        align-items: flex-start;
    }
    &--right {
        align-items: flex-end;
    }
}

.c-mediaElement-title.c-mediaElement-fontSize {
    &--sm {
        @include font-size(heading-s);
    }
    &--md {
        @include font-size(heading-m);
    }
    &--lg {
        @include font-size(heading-l);
        margin-bottom: spacing(x0.5);
    }
    &--xl {
        @include font-size(heading-xl);
        margin-bottom: spacing(x0.5);
    }
    &--xxl {
        @include font-size(heading-xxl);
        margin-bottom: spacing(x0.5);
    }
}

.c-mediaElement--stack .c-mediaElement-title {
    margin-top: spacing(x3);
}

.c-mediaElement-text.c-mediaElement-fontSize {
    @include font-size(body-l);
    margin-top: spacing(x0.5);
    &--sm {
        @include font-size(body-s);
    }
    &--md {
        @include font-size(body-l);
    }
    &--lg {
        @include font-size(subheading-s);
        margin-bottom: spacing(x0.5);
    }
    &--xl {
        @include font-size(subheading-s);
        margin-bottom: spacing(x0.5);
    }
    &--xxl {
        @include font-size(subheading-l);
        margin-bottom: spacing(x0.5);
    }
}

.c-mediaElement-imgWrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;

    &--center {
        align-items: center;
        .c-mediaBlock-img {
            align-self: center;
        }
    }
    &--left {
        align-items: flex-start;
        .c-mediaBlock-img {
            align-self: flex-start;
        }
    }
    &--right {
        align-items: flex-end;
        .c-mediaBlock-img {
            align-self: flex-end;
        }
    }
}

</style>
