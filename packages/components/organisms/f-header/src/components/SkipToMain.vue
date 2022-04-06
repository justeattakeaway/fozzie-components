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
.c-skipTo {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    z-index: zIndex(high);

    .c-skipTo-link {
        &:active,
        &:focus {
            display: block;
            margin: 4px;
            padding: 4px;
            color: $color-content-link;
            outline-color: $color-focus;
        }
    }
}

.c-skipTo--transparentBg {
    .c-skipTo-link {
        &:active,
        &:focus {
            color: $color-content-link-inverse;
        }
    }
}
</style>
