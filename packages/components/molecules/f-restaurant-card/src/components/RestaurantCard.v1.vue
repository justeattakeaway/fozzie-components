<template>
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
            <ul data-test-id="restaurant-cuisines">
                <li>Pizza</li>
                <li>Chicken</li>
            </ul>

            <!-- New label -->
            <strong>New</strong>

            <!-- Ratings -->
            <div>5 Stars</div>

            <!-- Offline Icon -->
            <div>Offline Icon</div>

            <!-- Meta Items List -->
            <ul>
                <li>Stampcard</li>
                <li>Offer icon + text</li>
                <li>Delivery fees</li>
                <li>Times</li>
                <li>ETA</li>
                <li>Location</li>
            </ul>

            <!-- Local Legend label -->
            <span data-test-id="restaurant-premier">Local Legend</span>

            <!-- Badges -->
            <div>
                <!-- misc badges -->
                <ul>
                    <li>Best awards 2020</li>
                    <li>Super restaurant 2019</li>
                </ul>

                <!-- promoted badge -->
                <span>Promoted</span>
            </div>

            <!-- Optional items i.e. dish search results -->
            <ul>
                <li>
                    Dish results list
                    <ul data-test-id="dishsearch-dish-list">
                        <li data-test-id="dishsearch-dish-item">Dish 1</li>
                        <li data-test-id="dishsearch-dish-item">Dish 2</li>
                    </ul>
                </li>
            </ul>
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
