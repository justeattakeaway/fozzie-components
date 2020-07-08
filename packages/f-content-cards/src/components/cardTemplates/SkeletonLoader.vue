<template>
    <div>
        <div class="offers-preloading-wrap">
            <template v-for="(skeletons, index) in count">
                <div
                    :key="index"
                    class="offers-preloading"
                    data-test-id="contentCard-skeletonLoader"
                />
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SkeletonLoader',
    props: {
        count: {
            type: Number,
            default: 1
        }
    }
};
</script>
