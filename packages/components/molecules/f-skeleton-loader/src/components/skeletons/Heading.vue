<template>
    <div
        :class="$style['c-heading']" />
</template>

<script>
export default {
    name: 'Heading'
};
</script>


<style lang="scss" module>

.c-heading {
    height: $skeleton-loader-heading-height;
    width: 65%;
}

</style>
