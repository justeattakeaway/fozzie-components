<template>
    <!-- NOTE: This is all placeholder markup, attributes and comments.
    This is not indicative of the actual HTML tags and attributes we
    will use (which will be much more accessible and semantic) -->
    <section
        :class="$style['c-restaurantCard']"
        data-test-id="restaurantCard-component">
        <a
            :href="'/12345/menu'"
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
            <slot name="cuisines">
                no cuisines slot loaded
            </slot>
            <!-- END ERROR BOUNDARY -->


            <!-- New label -->
            <!-- START ERROR BOUNDARY -->
            <slot name="new">
                no 'new' label slot loaded
            </slot>
            <!-- END ERROR BOUNDARY -->

            <!-- Ratings -->
            <!-- START ERROR BOUNDARY -->
            <slot name="ratings">
                no ratings slot loaded
            </slot>
            <!-- END ERROR BOUNDARY -->

            <!-- Offline Icon -->
            <div>Offline Icon</div>

            <!-- Meta Items List -->
            <slot name="meta-items">
                no meta-items slot loaded
            </slot>

            <!-- Local Legend label -->
            <slot name="local-legend">
                no local-legend slot loaded
            </slot>

            <!-- Badges -->
            <div>
                <!-- misc badges -->
                <!-- START ERROR BOUNDARY -->
                <slot name="badges">
                    no badges slot loaded
                </slot>
                <!-- END ERROR BOUNDARY -->

                <!-- promoted badge -->
                <span>Promoted</span>
            </div>

            <!-- Optional items i.e. dish search results -->
            <slot name="optional-items">
                no optional items slot loaded
            </slot>
        </a>
    </section>
</template>

<script>

export default {
    name: 'RestaurantCardV1',
    components: {},
    props: {
        // restaurant & display data
        address: {
            type: String,
            default: null
        },
        cuisines: {
            type: Array,
            default: () => []
        },
        id: {
            type: String,
            default: null
        },
        isNew: {
            type: Boolean,
            default: false
        },
        isPremier: {
            type: Boolean,
            default: false
        },
        isTemporarilyOffline: {
            type: Boolean,
            default: false
        },
        isTemporaryBoost: {
            type: Boolean,
            default: false
        },
        logo: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        },
        uniqueName: {
            type: String,
            default: null
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
