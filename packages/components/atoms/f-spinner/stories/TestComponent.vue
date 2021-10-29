<template>
    <p>
        Component has loaded
    </p>
</template>

<script>
export default {
    name: 'TestComponent',

    mounted () {
        setTimeout(() => {
            this.$parent.$emit('stop-spinner');
        }, 2000);
    }
};
</script>
