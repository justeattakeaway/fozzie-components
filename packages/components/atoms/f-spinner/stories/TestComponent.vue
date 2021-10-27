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
            this.$parent.$emit('stopSpinner');
        }, 2000);
    }
};
</script>
