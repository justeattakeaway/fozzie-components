<template>
    <!-- NOTE: This is all placeholder markup, attributes and comments.
    This is not indicative of the actual HTML tags and attributes we
    will use (which will be much more accessible and semantic) -->
    <section
        :class="$style['c-restaurantCard']"
        data-test-id="restaurantCard-component">
        <a
            :href="url"
            @click="$emit('restaurant-card-clicked')">

            <!-- background image -->
            <img
                src=""
                alt=""
                loading="lazy"
                data-test-id="restaurant-cuisine-image">

            <!-- Logo image -->
            <img
                src=""
                alt=""
                width="50"
                height="50"
                loading="lazy"
                data-test-id="restaurant_logo">

            <!-- Restaurant Name -->
            <h3
                data-test-id="restaurant_name"
                data-search-name>
                Fake Restaurant
            </h3>

            <!-- Cuisines -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <slot name="cuisines" />
            </component>
            <!-- END ERROR BOUNDARY -->


            <!-- New label -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <slot name="new-label" />
            </component>
            <!-- END ERROR BOUNDARY -->

            <!-- Ratings -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <slot name="ratings" />
            </component>
            <!-- END ERROR BOUNDARY -->

            <!-- Offline Icon -->
            <div>Offline Icon</div>

            <!-- Meta Items List -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <slot name="meta-items" />
            </component>
            <!-- END ERROR BOUNDARY -->

            <!-- Local Legend label -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <slot name="local-legend" />
            </component>
            <!-- END ERROR BOUNDARY -->

            <!-- Badges -->
            <div>
                <!-- misc badges -->
                <!-- START ERROR BOUNDARY -->
                <component
                    :is="errorBoundary"
                    tier="3">
                    <slot name="badges" />
                </component>
                <!-- END ERROR BOUNDARY -->

                <!-- promoted badge -->
                <span>Promoted</span>
            </div>

            <!-- Optional items i.e. dish search results -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <slot name="optional-items" />
            </component>
            <!-- END ERROR BOUNDARY -->

        </a>
    </section>
</template>

<script>
import ErrorBoundaryMixin from '../assets/vue/mixins/errorBoundary.mixin.vue';

export default {
    name: 'RestaurantCardV1',
    mixins: [ErrorBoundaryMixin],
    // NOTE: These are merely some placeholder props and not indicative of the props we will end up using
    props: {
        // restaurant & display data
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        url: {
            type: String,
            default: null
        },
        logo: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        // feature flags
        flags: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>

<style lang="scss" module>

.c-restaurantCard {
    display: flex;
    justify-content: center;
    margin: auto;
    border: 1px solid purple;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
