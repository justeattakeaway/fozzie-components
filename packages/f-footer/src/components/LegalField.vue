<template>
    <div
        :class="$style['c-footer-certificates']">
        <p
            v-if="info.textField">
            {{ info.textField }}
        </p>
        <img
            v-if="info.icon.name"
            :src="require(`../assets/img/${info.icon.name}.png`)"
            :alt="info.icon.alt"
            :class="[
                $style['c-footer-certificates-icons'],
                $style[iconClass]
            ]">
    </div>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            required: true
        }
    },

    computed: {
        iconClass () {
            return `c-footer-certificates-icons--${this.info.icon.name}`;
        }
    }
};
</script>

<style lang="scss" module>

.c-footer-certificates {
    display: flex;
    align-items: center;

    @include media('<wide') {
        order: 2;
        padding: spacing(x2);
    }

    p {
        margin: 0;
    }
}

.c-footer-certificates-icons {
    display: block;
}

.c-footer-certificates-icons--confianza {
    width: 195px;
    height: 39px;

    @include media('<wide') {
        width: 145px;
        height: 29px;
    }
}
</style>

