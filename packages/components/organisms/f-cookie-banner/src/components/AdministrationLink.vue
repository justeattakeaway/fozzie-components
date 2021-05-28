<template>
    <a
        href="#"
        :class="['o-link--bold', 'o-link--full', $style['admin-link'], { [$style['admin-link--greyBg']]: useGreyBackground }]"
        :use-grey-background="useGreyBackground"
        @click.prevent="resetPolicy">{{ message }}
    </a>
</template>

<script>
export default {
    name: 'AdministrationLink',
    props: {
        message: {
            type: String,
            default: ''
        },
        useGreyBackground: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        resetPolicy () {
            this.$emit('resetPolicy');
        }
    }
};
</script>

<style module lang="scss">

a.admin-link {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 0 spacing() spacing(x2);
}

.admin-link--greyBg {
    background-color: $color-container-strong;
}
</style>
