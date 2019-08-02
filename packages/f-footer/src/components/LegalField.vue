<template>
    <div
        v-if="info"
        class="c-footer-certificates">
        <p
            v-if="info.textField">
            {{ info.textField }}
        </p>
        <img
            v-if="info.icon.name"
            :src="iconUrl"
            :alt="info.icon.alt"
            :class="['c-footer-certificates-icons', iconClass]">
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
        },
        iconUrl () {
            return this.getImgUrl(this.info.icon.name);
        }
    },
    methods: {
        getImgUrl (name) {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            return require(`../assets/img/${name}.png`);
        }
    }
};
</script>

<style lang="scss">

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

