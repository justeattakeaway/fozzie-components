<template>
    <div :class="['c-skipTo', extraClasses]">
        <a
            class="is-visuallyHidden focusable"
            href="#skipToMain">{{ skipToMainContentText }}</a>
    </div>
</template>

<script>
export default {
    props: {
        skipToMainContentText: {
            type: String,
            required: true
        },
        extraClasses: {
            type: Array,
            required: false,
            default: () => ({})
        }
    }

};
</script>

<style lang="scss">

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

        &.focusable:active,
        &.focusable:focus {
            clip: auto;
            height: auto;
            overflow: visible;
            position: static;
            width: auto;
            display: block;
            margin: 4px;
            padding: 4px;
        }
    }
}

.c-skipTo--whiteLink {
    .is-visuallyHidden {
        &.focusable:active,
        &.focusable:focus {
            color: $white;
        }
    }
}

</style>
