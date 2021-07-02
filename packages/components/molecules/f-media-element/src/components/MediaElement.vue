<template>
    <div
        data-test-id="mediaElement-component"
        :class="[
            $style['c-mediaElement'],
            ...flexClasses
        ]">
        <div
            :class="[
                $style['c-mediaElement-content'],
                contentAlignClass,
                fontSizeClass
            ]">
            <h3 :class="$style['c-mediaElement-title']">
                {{ title }}
            </h3>
            <p :class="$style['c-mediaElement-text']">
                {{ text }}
            </p>
            <slot />
        </div>
        <div
            :class="[
                $style['c-mediaElement-imgWrapper'],
                imageAlignClass
            ]">
            <img
                :class="[$style['c-mediaElement-img'], 'c-mediaElement-img--override']"
                :src="imageUrl"
                :alt="altText">
        </div>
    </div>
</template>

<script>
import {
    ALIGN, FONT_SIZE
} from '../constants';
import FlexStyles from '../FlexStyles';

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
        flex: {
            type: Object,
            default: () => ({
                default: {
                    column: false,
                    reverse: false
                }
            })
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
        },
        altText: {
            type: String,
            default: 'Media Element Image'
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
            const alignment = Object.keys(ALIGN)
                .find(key => this.contentAlign === ALIGN[key]);
            return alignment ? this.$style[`c-mediaElement-content--${ALIGN[alignment]}`] :
                this.$style['c-mediaElement-content--left'];
        },
        /**
         * Returns the class to modify the alignment of the image based on the prop imageAlign
         * @returns {*}
         */
        imageAlignClass () {
            const alignment = Object.keys(ALIGN)
                .find(key => this.imageAlign === ALIGN[key]);
            return alignment ? this.$style[`c-mediaElement-imgWrapper--${ALIGN[alignment]}`] :
                this.$style['c-mediaElement-imgWrapper--left'];
        },
        /**
         * Returns the class to modify the font size of the content based on the prop textSize
         * @returns {*}
         */
        fontSizeClass () {
            const size = Object.keys(FONT_SIZE).find(key => this.textSize === FONT_SIZE[key]);
            return size ? this.$style[`c-mediaElement-contentFontSize--${FONT_SIZE[size]}`] :
                this.$style['c-mediaElement-contentFontSize--md'];
        },


        /**
         * This applies flex classes based on the passed flex prop configuration.
         * @returns {*[]}
         */
        flexClasses () {
            return (new FlexStyles(this.flex)).classNames.map(style => this.$style[style]);
        }
    }
};
</script>

<style lang="scss" module>

$font-sizes: (
    sm: (
        title: heading-s,
        text: body-s,
    ),
    md: (
        title: heading-m,
        text: body-l,
    ),
    lg: (
        title: heading-l,
        text: subheading-s,
    ),
    xl: (
        title: heading-xl,
        text: subheading-s,
    ),
    xxl: (
        title: heading-xxl,
        text: subheading-l,
    )
);

$mediaElement-content-margin: spacing(x3);

.c-mediaElement {
    display: flex;
    width: 100%;
}

.c-mediaElement--col--reverse {
    flex-direction: column-reverse;

    & .c-mediaElement-content {
        margin-top: $mediaElement-content-margin;
    }
}
.c-mediaElement--col {
    flex-direction: column;

    & .c-mediaElement-content {
        margin-bottom: $mediaElement-content-margin;
    }
}
.c-mediaElement--row {
    flex-direction: row;
}
.c-mediaElement--row--reverse {
    flex-direction: row-reverse;
}


@each $name, $value in $breakpoints {

    /**
    * Modifier – .c-mediaElement--gte--$name--col
    * Modifier – .c-mediaElement--gte--$name--col--reverse
    * Modifier – .c-mediaElement--gte--$name--row
    * Modifier – .c-mediaElement--gte--$name--row--reverse
     *
     * Applies flex direction column on $name
     */
    @include media('>='+$name) {
        .c-mediaElement--gte--#{$name}--col {
            flex-direction: column;

            & .c-mediaElement-content {
                margin-bottom: $mediaElement-content-margin;
            }
        }
        .c-mediaElement--gte--#{$name}--col--reverse {
            flex-direction: column-reverse;

            & .c-mediaElement-content {
                margin-top: $mediaElement-content-margin;
            }
        }
        .c-mediaElement--gte--#{$name}--row {
            flex-direction: row;
        }
        .c-mediaElement--gte--#{$name}--row--reverse {
            flex-direction: row-reverse;
        }
    }

    /**
    * Modifier – .c-mediaElement--gt--$name--col
    * Modifier – .c-mediaElement--gt--$name--col--reverse
    * Modifier – .c-mediaElement--gt--$name--row
    * Modifier – .c-mediaElement--gt--$name--row--reverse
    *
    * Applies flex direction column on $name
    */
    @include media('>'+$name) {
        .c-mediaElement--gt--#{$name}--col {
            flex-direction: column;

            & .c-mediaElement-content {
                margin-bottom: $mediaElement-content-margin;
            }
        }
        .c-mediaElement--gt--#{$name}--col--reverse {
            flex-direction: column-reverse;

            & .c-mediaElement-content {
                margin-top: $mediaElement-content-margin;
            }
        }
        .c-mediaElement--gt--#{$name}--row {
            flex-direction: row;
        }
        .c-mediaElement--gt--#{$name}--row--reverse {
            flex-direction: row-reverse;
        }
    }

    /**
    * Modifier – .c-mediaElement--lte--$name--col
    * Modifier – .c-mediaElement--lte--$name--col--reverse
    * Modifier – .c-mediaElement--lte--$name--row
    * Modifier – .c-mediaElement--lte--$name--row--reverse
    *
    * Applies flex direction column on $name
    */
    @include media('<='+$name) {
        .c-mediaElement--lte--#{$name}--col {
            flex-direction: column;

            & .c-mediaElement-content {
                margin-bottom: $mediaElement-content-margin;
            }
        }
        .c-mediaElement--lte--#{$name}--col--reverse {
            flex-direction: column-reverse;

            & .c-mediaElement-content {
                margin-top: $mediaElement-content-margin;
            }
        }
        .c-mediaElement--lte--#{$name}--row {
            flex-direction: row;
        }
        .c-mediaElement--lte--#{$name}--row--reverse {
            flex-direction: row-reverse;
        }
    }

    /**
    * Modifier – .c-mediaElement--lt--$name--col
    * Modifier – .c-mediaElement--lt--$name--col--reverse
    * Modifier – .c-mediaElement--lt--$name--row
    * Modifier – .c-mediaElement--lt--$name--row--reverse
    *
    * Applies flex direction column on $name
    */
    @include media('<'+$name) {
        .c-mediaElement--lt--#{$name}--col {
            flex-direction: column;

            & .c-mediaElement-content {
                margin-bottom: $mediaElement-content-margin;
            }
        }
        .c-mediaElement--lt--#{$name}--col--reverse {
            flex-direction: column-reverse;

            & .c-mediaElement-content {
                margin-top: $mediaElement-content-margin;
            }
        }
        .c-mediaElement--lt--#{$name}--row {
            flex-direction: row;
        }
        .c-mediaElement--lt--#{$name}--row--reverse {
            flex-direction: row-reverse;
        }
    }
}

.c-mediaElement-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 0%;
    white-space: pre-line;

    /**
     * Modifier – .c-mediaElement-content--center
     *
     * Aligns the content center using flex within the container
     */
    &.c-mediaElement-content--center {
        align-items: center;
        text-align: center;
    }
    /**
     * Modifier – .c-mediaElement-content--left
     *
     * Aligns the content left using flex within the container
     */
    &.c-mediaElement-content--left {
        align-items: flex-start;
    }
    /**
     * Modifier – .c-mediaElement-content--right
     *
     * Aligns the content right using flex within the container
     */
    &.c-mediaElement-content--right {
        align-items: flex-end;
        text-align: right;
    }
}

.c-mediaElement-imgWrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;

    /**
     * Modifier – .c-mediaElement-imgWrapper--center
     *
     * Aligns the image center using flex within the container
     */
    &.c-mediaElement-imgWrapper--center {
        align-items: center;
    }
    /**
     * Modifier – .c-mediaElement-imgWrapper--left
     *
     * Aligns the image left using flex within the container
     */
    &.c-mediaElement-imgWrapper--left {
        align-items: flex-start;
    }
    /**
     * Modifier – .c-mediaElement-imgWrapper--right
     *
     * Aligns the image right using flex within the container
     */
    &.c-mediaElement-imgWrapper--right {
        align-items: flex-end;
    }
}

/**
 * Modifier – .c-mediaElement--$size
 *
 * For each of the above map values under $font-sizes we loop over them applying the value to both title
 * and text depending on the key using map-get()
 */
@each $size, $value in $font-sizes {
    .c-mediaElement-contentFontSize--#{$size} {
        & .c-mediaElement-title {
            @include font-size(map-get($value, 'title'));
        }
        & .c-mediaElement-text {
            @include font-size(map-get($value, 'text'));
            @if $size == sm {
                margin-top: spacing(x0.5);
            }
            @else if $size == md {
                margin-top: spacing();
            }
        }
    }
}

</style>
