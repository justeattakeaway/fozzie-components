<template>
    <div data-test-id='collection-component'>
        <form-selector :type="Collection" />
    </div>
</template>

<script>
import FormSelector from './Selector.vue';

export default {
    components: {
        FormSelector
    },

    props: {
        labels: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="scss" module>
</style>
