<template>
    <div :class="['c-skipTo', { 'c-skipTo--whiteLink': transparentBg }]">
        <a
            class="is-visuallyHidden is-focusable"
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

<style lang="scss">
@import "../assets/scss/common.scss";

.c-skipTo {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    z-index: zIndex(high);

    .is-visuallyHidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;

        &.is-focusable:active,
        &.is-focusable:focus {
            clip: auto;
            height: auto;
            overflow: visible;
            position: static;
            width: auto;
            display: block;
            margin: 4px;
            padding: 4px;

            @include theme(ml) {
                color: $green;
            }
        }
    }
}



.c-skipTo--whiteLink {
    .is-visuallyHidden {
        &.is-focusable:active,
        &.is-focusable:focus {
            color: $white;

            @include theme(ml) {
                color: $white;
            }
        }
    }
}

</style>
