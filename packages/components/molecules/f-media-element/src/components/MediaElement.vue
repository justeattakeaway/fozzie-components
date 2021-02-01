<template>
    <div
        data-test-id="mediaElement-component"
        :class="[$style['c-mediaElement'], { [$style['c-mediaElement--stack']]: stacked }, { [$style['c-mediaElement--reverse']]: reverse }]">
        <div :class="[$style['c-mediaElement-content'], contentAlignClass]">
            <h3 :class="[$style['c-mediaElement-title'], { [$style['c-mediaElement-title--large']]: titleLarge }]">
                {{ title }}
            </h3>
            <p :class="[$style['c-mediaElement-text'], { [$style['c-mediaElement-text--large']]: textLarge }]">
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

const ALIGN = {
    LEFT: 'left',
    RIGHT: 'right',
    CENTER: 'center'
};

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
        titleLarge: {
            type: Boolean,
            default: false
        },
        textLarge: {
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

.c-mediaElement-title {
    @include font-size(heading-m);
    &--large {
        @include font-size(heading-xl);
        margin-bottom: spacing(x0.5);
    }
}

.c-mediaElement--stack .c-mediaElement-title {
    margin-top: spacing(x3);
}

.c-mediaElement-text {
    @include font-size(body-l);
    margin-top: spacing(x0.5);
    &--large {
        @include font-size(subheading-s);
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
