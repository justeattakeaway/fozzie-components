<template>
    <component
        :is="card.url && isClickable ? 'a' : 'div'"
        :class="$style['c-card-container']"
        :href="card.url"
        :target="target.attribute"
        :rel="target.rel"
        :data-test-id="`content-card-container-${card.id}`"
        @click="onClickContentCard">
        <slot :card="card" />
    </component>
</template>

<script>
export default {
    inject: [
        'emitCardView',
        'emitCardClick'
    ],

    props: {
        card: {
            type: Object,
            default: () => ({})
        },

        isClickable: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        target () {
            return this.card.target || {};
        }
    },

    mounted () {
        this.onViewContentCard(); // TODO should only fire if in view
    },

    methods: {
        onViewContentCard () {
            this.emitCardView(this.card);
        },

        onClickContentCard () {
            this.emitCardClick(this.card);
        }
    }
};
</script>

<style lang="scss" module>
.c-card-container {
    max-width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
