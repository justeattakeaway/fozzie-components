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
            <slot name="cuisines" />
            <!-- END ERROR BOUNDARY -->


            <!-- New label -->
            <!-- START ERROR BOUNDARY -->
            <slot name="new" />
            <!-- END ERROR BOUNDARY -->

            <!-- Ratings -->
            <!-- START ERROR BOUNDARY -->
            <slot name="ratings" />
            <!-- END ERROR BOUNDARY -->

            <!-- Offline Icon -->
            <div>Offline Icon</div>

            <!-- Meta Items List -->
            <slot name="meta-items" />

            <!-- Local Legend label -->
            <slot name="local-legend" />

            <!-- Badges -->
            <div>
                <!-- misc badges -->
                <!-- START ERROR BOUNDARY -->
                <slot name="badges" />
                <!-- END ERROR BOUNDARY -->

                <!-- promoted badge -->
                <span>Promoted</span>
            </div>

            <!-- Optional items i.e. dish search results -->
            <slot name="optional-items" />
        </a>
    </section>
</template>

<script>

export default {
    name: 'RestaurantCardV1',
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
