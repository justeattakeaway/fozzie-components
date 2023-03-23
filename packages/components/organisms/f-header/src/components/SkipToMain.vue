<template>
    <div
        :class="[
            $style['c-skipTo'],
            { [$style['c-skipTo--transparentBg']]: transparentBg }]">
        <a
            :class="[
                $style['c-skipTo-link'],
                'is-visuallyHidden',
                'focusable'
            ]"
            href="#skipToMain">{{ text }}</a>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        transparentBg: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-skipTo {
    position: absolute;
    top: f.spacing(b);
    left: f.spacing(b);
    background-color: f.$color-container-default;
    text-align: center;
    z-index: f.zIndex(high);

    .c-skipTo-link {
        &:active,
        &:focus,
        &:focus-visible {
            display: block;
            padding: 4px;
            color: f.$color-content-link;

            @extend %u-elementFocus--boxShadow;
            @extend %u-elementFocus--borderless;

            &, &:after {
                @include f.media('>mid') {
                    border-radius: common.$header-buttonFocus-borderRadius;
                }
            }
        }
    }
}

.c-skipTo--transparentBg {
    .c-skipTo-link {
        &:active,
        &:focus {
            color: f.$color-content-link-inverse;
        }
    }
}
</style>
