
<template>
    <div
        data-test-id="skeleton-loader-component"
        :class="$style['c-skeleton-loader']">
        <component
            :is="skeletonType" />
    </div>
</template>

<script>
import * as skeletons from './skeletons';

export default {
    name: 'SkeletonLoader',
    components: { ...skeletons },
    props: {
        skeletonType: {
            type: String,
            default: 'Heading',
            validator (value) {
                return Object.keys(skeletons).includes(value);
            }
        }
    }
};
</script>

<style lang="scss" module>
.c-skeleton-loader {
    position: relative;
    vertical-align: top;
}
</style>
