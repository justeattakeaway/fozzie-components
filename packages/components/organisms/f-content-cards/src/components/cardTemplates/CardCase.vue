<!--
  LightWeight version of "CardContainer" to just control the analytics/link part,
  and leave the styling to the card implementation
 -->
<template>
    <component
        :is="card.url ? 'a' : 'div'"
        :href="card.url"
        :target="target.attribute"
        :rel="target.rel"
        @click="onClickContentCard">
        <slot />
    </component>
</template>

<script>
export default {
    name: 'CardCase',

    inject: [
        'emitCardView',
        'emitCardClick'
    ],

    props: {
        card: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
        target () {
            return this.card.target || {};
        }
    },

    mounted () {
        this.onViewContentCard();
    },

    methods: {
        onViewContentCard () {
            this.emitCardView(this.card);
        },

        onClickContentCard () {
            this.emitCardClick(this.card);
        },

        testIdForItemWithIndex (index) {
            return this.testId && `ContentCard-TextItem-${index}`;
        }
    }
};
</script>
