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
        'emitCardClick',
        'observer'
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
        this.observer.observe(this.$el);
    },

    methods: {

        onClickContentCard () {
            this.emitCardClick(this.card, this.$el);
        },

        testIdForItemWithIndex (index) {
            return this.testId && `ContentCard-TextItem-${index}`;
        }
    }
};
</script>
