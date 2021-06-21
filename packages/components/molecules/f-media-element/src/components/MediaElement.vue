<template>
    <div
        data-test-id="mediaElement-component"
        :class="[
            $style['c-mediaElement'],
            (stacked ? $style['c-mediaElement--stack'] : ''),
            (reverse ? $style['c-mediaElement--reverse'] : ''),
            (stackOnMobile ? $style['c-mediaElement--stackMobile'] : '')
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
            <slot></slot>
        </div>
        <div
            :class="[
                $style['c-mediaElement-imgWrapper'],
                'c-mediaElement-imgWrapper--override',
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
import { ALIGN, FONT_SIZE } from '../constants';

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
        },
        altText: {
            type: String,
            default: 'Media Element Image'
        },
        stackOnMobile: {
            type: Boolean,
            default: false
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
                case FONT_SIZE.SM:
                    return this.$style['c-mediaElement-content--fontSizeSmall'];
                case FONT_SIZE.MD:
                    return this.$style['c-mediaElement-content--fontSizeMedium'];
                case FONT_SIZE.LG:
                    return this.$style['c-mediaElement-content--fontSizeLarge'];
                case FONT_SIZE.XL:
                    return this.$style['c-mediaElement-content--fontSizeXLarge'];
                case FONT_SIZE.XXL:
                    return this.$style['c-mediaElement-content--fontSizeXXLarge'];
                default:
                    return this.$style['c-mediaElement-content--fontSizeMedium'];
            }
        }
    }
};
</script>

<style lang="scss" module>

$font-sizes: (
    fontSizeSmall: (
        title: heading-s,
        text: body-s,
    ),
    fontSizeMedium: (
        title: heading-m,
        text: body-l,
    ),
    fontSizeLarge: (
        title: heading-l,
        text: subheading-s,
    ),
    fontSizeXLarge: (
        title: heading-xl,
        text: subheading-s,
    ),
    fontSizeXXLarge: (
        title: heading-xxl,
        text: subheading-l,
    )
);

.c-mediaElement {
    display: flex;
    width: 100%;

    &.c-mediaElement--reverse {
        flex-direction: row-reverse;
    }
}

/**
 * Modifier – .c-mediaElement--stackMobile
 *
 * Applies flex direction column on <=narrow
 */
.c-mediaElement--stackMobile {
    @include media('<=narrow') {
        flex-direction: column;
    }
    /**
     * Modifier – .c-mediaElement--reverse
     *
     * When stacked in flex col applies col-reverse
     */
    &.c-mediaElement--reverse {
        @include media('<=narrow') {
            flex-direction: column-reverse;
        }

        & .c-mediaElement-text {
            @include media('<=narrow') {
                margin-bottom: spacing(x3);
            }
        }
    }

    & .c-mediaElement-title {
        @include media('<=narrow') {
            margin-top: spacing(x3);
        }
    }
}

/**
 * Modifier – .c-mediaElement--stack
 *
 * Applies flex direction column
 */
.c-mediaElement--stack {
    flex-direction: column;

    /**
     * Modifier – .c-mediaElement--reverse
     *
     * When stacked in flex col applies col-reverse
     */
    &.c-mediaElement--reverse {
        flex-direction: column-reverse;

        & .c-mediaElement-text {
            margin-bottom: spacing(x3);
        }
    }

    & .c-mediaElement-title {
        margin-top: spacing(x3);
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
    .c-mediaElement-content--#{$size} {
        & .c-mediaElement-title {
            @include font-size(map-get($value, 'title'));
        }
        & .c-mediaElement-text {
            @include font-size(map-get($value, 'text'));
            @if $size == fontSizeSmall {
                margin-top: spacing(x0.5);
            }
            @else if $size == fontSizeMedium {
                margin-top: spacing();
            }
        }
    }
}

</style>
