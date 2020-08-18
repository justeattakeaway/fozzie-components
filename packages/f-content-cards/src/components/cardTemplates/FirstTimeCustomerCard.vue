<template>
    <card-container
        :card="card">
        <span :class="['c-restaurantCard-banner', $style['c-restaurantCard-banner']]">
            <span
                :class="['c-restaurantCard-banner-content', $style['c-restaurantCard-banner-content']]"
                data-test-id="FirstTimeCustomerCard-Banner">
                {{ banner }}
            </span>
        </span> for first time user
        <p>{{ footer }}</p>
    </card-container>
</template>

<script>
import CardContainer from './CardContainer.vue';

export default {
    components: {
        CardContainer
    },
    props: {
        card: {
            type: Object,
            default: () => ({})
        },

        testId: {
            type: String,
            default: undefined
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard-banner {
    position: relative;
    display: inline-block;
    background: #cd381f;
    transform: skew(-20deg);
    border-radius: $border-radius;
    color: white;
    padding: 0 spacing();
}

.c-restaurantCard-banner-content {
    display: inline-block;
    transform: skew(20deg);
}
</style>
