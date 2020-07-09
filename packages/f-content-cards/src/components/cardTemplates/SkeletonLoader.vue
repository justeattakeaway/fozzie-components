<template>
    <div>
        <div :class="['offers-preloading-wrap',{ 'offers-preloading-full-width': count === 1 }]">
            <template v-for="(skeletons, index) in count">
                <div
                    :key="index"
                    :class="['offers-preloading', { 'offers-preloading-post-order': type === 'PostOrder' }]"
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
        },
        type: {
            type: String,
            default: 'Promo'
        }
    }
};
</script>
