<template>
    <a
        :href="url"
        :class="[
            $style['c-restaurantCard'], {
                [$style['c-restaurantCard--listItem']]: isListItem,
                [$style['c-restaurantCard--isLoading']]: isLoading
            }]"
        data-test-id="restaurant"
        :data-restaurant-id="id"
        :aria-busy="`${isLoading}`"
        @click="handleClick">

        <!-- background image -->
        <restaurant-image
            :class="[$style['c-restaurantCard-img']]"
            :img-url="imgUrl">
            <!-- Logo image -->
            <restaurant-logo
                v-if="logoUrl"
                :class="$style['c-restaurantCard-logo']"
                :logo-url="logoUrl" />
            <!-- Tags inside image container -->
            <component
                :is="errorBoundary"
                v-if="hasImageTags"
                :tier="3">
                <restaurant-tags
                    :class="$style['c-restaurantCard-imageTags']"
                    test-id-position="main-image"
                    :tags="tags.imageTags" />
            </component>

        </restaurant-image>

        <!-- primary content -->
        <section :class="$style['c-restaurantCard-content']">
            <!-- Restaurant Name -->
            <h3
                :class="[$style['c-restaurantCard-name']]"
                data-test-id="restaurant_name"
                data-search-name>
                {{ name }}
            </h3>

            <restaurant-rating-skeleton
                v-if="isLoading"
                :width-percentage="75"
                :class="$style['c-restaurantCard-ratingSkeleton']" />

            <div
                v-else
                :class="[
                    $style['c-restaurantCard-content--left-col'],
                    $style['c-restaurantCard-ratingContainer']]">
                <!-- 'New' label -->
                <restaurant-tag
                    v-if="newTagText"
                    :is-large="true"
                    :is-uppercase="true"
                    :text="newTagText"
                    data-test-id="restaurant-new-badge"
                    color-scheme="positive" />

                <!-- Ratings -->
                <component
                    :is="errorBoundary"
                    v-if="rating"
                    :tier="3">
                    <restaurant-rating
                        v-bind="rating" />
                </component>

                <!-- Premier Icon -->
                <span
                    v-if="isPremier"
                    :class="[$style['c-restaurantCard-premier']]">
                    <legend-icon
                        data-test-id="restaurant-premier" />
                </span>
            </div>

            <template v-if="isLoading">
                <restaurant-content-skeleton
                    :width-percentage="90"
                    :class="[
                        $style['c-restaurantCard-content--left-col'],
                        $style['c-restaurantCard--hideOnMobile']]" />
                <restaurant-content-skeleton
                    :width-percentage="80"
                    :class="[
                        $style['c-restaurantCard-content--left-col'],
                        $style['c-restaurantCard--hideOnMobile']]" />
                <restaurant-content-skeleton
                    :width-percentage="40"
                    :class="[
                        $style['c-restaurantCard--hideOnMobile']]" />
                <restaurant-content-skeleton :width-percentage="90" />
            </template>

            <template v-else>
                <!-- Cuisines -->
                <component
                    :is="errorBoundary"
                    v-if="hasCuisines"
                    :tier="3">
                    <restaurant-cuisines
                        :class="[
                            $style['c-restaurantCard-content--left-col'],
                            $style['c-restaurantCard-cuisines']]"
                        :cuisines="cuisines" />
                </component>

                <!-- This is a clearfix to force anything after cuisines to a new line (won't affect list-item mode) -->
                <div :class="[$style['c-restaurantCard-clearfix']]" />

                <!-- Delivery Meta (etas, distance etc) -->
                <component
                    :is="errorBoundary"
                    v-if="displayDeliveryTimeMeta"
                    :tier="3">
                    <delivery-time-meta
                        v-bind="deliveryTimeData"
                        :class="[$style['c-restaurantCard-distance']]"
                        data-test-id="restaurant-delivery-time-meta" />
                </component>

                <!-- Availability -->
                <component
                    :is="errorBoundary"
                    v-if="availability"
                    :tier="3">
                    <restaurant-availability v-bind="availability" />
                </component>


                <!-- Fees -->
                <component
                    :is="errorBoundary"
                    v-if="hasFees"
                    :tier="3">
                    <restaurant-fees v-bind="fees" />
                </component>

                <!-- Offer -->
                <icon-text
                    v-if="hasOffer"
                    data-test-id="restaurant-discounts"
                    :text="offer"
                    :class="$style['c-restaurantCard-offer']"
                    is-bold>
                    <offer-icon />
                </icon-text>

                <!-- Content Tags -->
                <component
                    :is="errorBoundary"
                    v-if="hasContentTags"
                    :tier="3">
                    <restaurant-tags
                        :class="[$style['c-restaurantCard-tags']]"
                        test-id-position="inner-content"
                        :tags="tags.contentTags" />
                </component>

                <!-- Disabled Message -->
                <icon-text
                    v-if="disabledMessage"
                    data-test-id="restaurant-offline"
                    :text="disabledMessage"
                    color="colorSupportError"
                    hide-icon-in-tile-view>
                    <clock-small-icon />
                </icon-text>
            </template>
        </section>

        <!-- Dishes -->
        <component
            :is="errorBoundary"
            v-if="hasDishes"
            :tier="3">
            <restaurant-dishes
                :dishes="dishes"
                :is-vertically-stacked="isListItem"
                :class="[$style['c-restaurantCard-dishes']]" />
        </component>
    </a>
</template>

<script>
import { OfferIcon, LegendIcon, ClockSmallIcon } from '@justeat/f-vue-icons';
import RestaurantImage from './subcomponents/RestaurantImage/RestaurantImage.vue';
import RestaurantLogo from './subcomponents/RestaurantLogo/RestaurantLogo.vue';
import RestaurantDishes from './subcomponents/RestaurantDishes/RestaurantDishes.vue';
import RestaurantCuisines from './subcomponents/RestaurantCuisines.vue';
import RestaurantTags from './subcomponents/RestaurantTags/RestaurantTags.vue';
import RestaurantTag from './subcomponents/RestaurantTags/RestaurantTag.vue';
import RestaurantRating from './subcomponents/RestaurantRating/RestaurantRating.vue';
import DeliveryTimeMeta from './subcomponents/DeliveryTimeMeta/DeliveryTimeMeta.vue';
import IconText from './subcomponents/IconText.vue';
import RestaurantFees from './subcomponents/RestaurantFees/RestaurantFees.vue';
import RestaurantAvailability from './subcomponents/RestaurantAvailability/RestaurantAvailability.vue';
import RenderlessSlotWrapper from './RenderlessSlotWrapper';
import RestaurantRatingSkeleton from './subcomponents/RestaurantSkeleton/RestaurantRatingSkeleton.vue';
import RestaurantContentSkeleton from './subcomponents/RestaurantSkeleton/RestaurantContentSkeleton.vue';
import { EVENT_CLICK_RESTAURANT_CARD } from '../constants/custom-events';

export default {
    name: 'RestaurantCard',
    components: {
        RestaurantImage,
        RestaurantLogo,
        RestaurantDishes,
        RestaurantCuisines,
        RestaurantTags,
        RestaurantTag,
        RestaurantRating,
        DeliveryTimeMeta,
        IconText,
        OfferIcon,
        LegendIcon,
        ClockSmallIcon,
        RestaurantFees,
        RestaurantAvailability,
        RenderlessSlotWrapper,
        RestaurantRatingSkeleton,
        RestaurantContentSkeleton
    },
    provide () {
        return {
            isListItem: this.isListItem,
            performanceTracker: this.performanceTracker
        };
    },
    props: {
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
        logoUrl: {
            type: String,
            default: null
        },
        imgUrl: {
            type: String,
            default: null
        },
        isListItem: {
            type: Boolean,
            default: true
        },
        cuisines: {
            type: Array,
            default: null
        },
        tags: {
            type: Object,
            default: null
        },
        newTagText: {
            type: String,
            default: null
        },
        rating: {
            type: Object,
            default: null
        },
        deliveryTimeData: {
            type: Object,
            default: null
        },
        dishes: {
            type: Array,
            default: null
        },
        offer: {
            type: String,
            default: null
        },
        isPremier: {
            type: Boolean,
            default: false
        },
        fees: {
            type: Object,
            default: null
        },
        availability: {
            type: Object,
            default: null
        },
        disabledMessage: {
            type: String,
            default: null
        },
        // An optional safeguard component to wrap around restaurant card data points such as ratings, cuisines etc.
        errorBoundary: {
            type: Object,
            default: () => RenderlessSlotWrapper // by default returns a renderless component that will just render it's slot and not bloat markup
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        // An optional library for tracking rendering performance
        performanceTracker: {
            type: Object,
            default: null
        }
    },
    computed: {
        hasContentTags () {
            return !!this.tags?.contentTags?.length;
        },
        hasImageTags () {
            return !!this.tags?.imageTags?.length;
        },
        hasOffer () {
            return !!this.offer?.length;
        },
        displayDeliveryTimeMeta () {
            return !!(this.deliveryTimeData?.eta ||
                this.deliveryTimeData?.distance ||
                this.deliveryTimeData?.address);
        },
        hasDishes () {
            return !!this.dishes?.length;
        },
        hasFees () {
            return !!(this.fees?.deliveryFeeText || this.fees?.minOrderText);
        },
        hasCuisines () {
            return !!this.cuisines?.length;
        }
    },
    mounted () {
        if (this.performanceTracker) {
            this.$nextTick(() => {
                // Hard coding temporarily. We can eventually configure this
                this.performanceTracker.time('tier-1');
            });
        }
    },
    methods: {
        handleClick () {
            this.$emit(EVENT_CLICK_RESTAURANT_CARD, {
                restaurantId: this.id
            });
        }
    }
};
</script>

<style lang="scss" module>
.c-restaurantCard {
    text-decoration: none;
    display: grid;
    grid-gap: spacing(c);
    grid-template-columns: 1fr;
    position: relative;
    outline-color: $color-focus;

    &.c-restaurantCard--listItem {
        @include media('>mid') {
        grid-gap: spacing() spacing(d);
        grid-template-columns: minmax(180px, 30%) 1fr;
        }
    }

    &:hover {
        .c-restaurantCard-name {
            text-decoration: underline;
        }
    }
}

.c-restaurantCard-img {
    width: 100%;
    height: 144px;

    .c-restaurantCard--listItem & {
        @include media('>mid') {
            min-height: 125px;
            height: 100%;
        }
    }
}

.c-restaurantCard-logo {
    top: spacing(d);
    left: spacing(d);
    position: absolute;
}

.c-restaurantCard-content {
    .c-restaurantCard--listItem & {
        @include media('>mid') {
            padding: spacing() 0;
            grid-column: 2/3;
        }
    }
}

.c-restaurantCard-dishes {
    .c-restaurantCard--listItem & {
        @include media('>mid') {
            grid-column: 1/3;
        }
    }
}

.c-restaurantCard-imageTags {
    bottom: spacing(b);
    left: spacing(d);
    position: absolute;
    margin-bottom: 0;
}

.c-restaurantCard-premier {
    width: 41px;
    height: auto;

    svg {
        width: 100%;
        height: 100%;
        display: block;
    }
}

.c-restaurantCard-ratingContainer {
    display: flex;
    gap: spacing(b);
    align-items: center;
    margin-right: spacing(b);
}

// Regular inner-content positioning
.c-restaurantCard-content {
    display: flex;
    align-items: center;
    flex-flow: row wrap;

    // an alternative to using bottom gap so that none is applied to the clearfix
    > * {
        margin-bottom: spacing(a);
    }
}

.c-restaurantCard-name,
.c-restaurantCard-tags,
.c-restaurantCard-offer {
    flex: 0 0 100%;
}

.c-restaurantCard-name {
    margin-bottom: spacing(a);
    width: 100%;

    @include media('>mid') {
        margin-bottom: spacing(b);
    }
}

.c-restaurantCard-offer {
    order: 1;
    margin-top: spacing(a);
}

// List-item inner-content positioning (should only kick in at larger screen sizes when the class is applied)
@include media('>mid') {
    .c-restaurantCard-content {
        .c-restaurantCard--listItem & {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-flow: dense;
            gap: 0 spacing(c);
            overflow-wrap: break-word;

            > * {
                grid-column: 2;
                margin: 0;
            }
        }

        .c-restaurantCard--listItem.c-restaurantCard--isLoading & {
            align-items: center;
        }
    }

    .c-restaurantCard--listItem .c-restaurantCard-content {
        .c-restaurantCard-content--left-col {
            grid-column: 1;
        }

        .c-restaurantCard-name,
        .c-restaurantCard-tags {
            grid-column: 1 / 3;
        }

        .c-restaurantCard-name {
            margin-bottom: spacing(a);
        }

        .c-restaurantCard-tags {
            margin-top: spacing(a);
        }

        // Prevent the cleafix from working on the list-item styling
        .c-restaurantCard-clearfix {
            display: none;
        }

        .c-restaurantCard-offer {
            margin-top: 0;
            order: initial;
        }

        .c-restaurantCard-ratingSkeleton {
            grid-column: 1;
            width: 100%;
        }

        .c-restaurantCard--hideOnMobile {
            display: block;
        }
    }
}

// forces elements after to a new line within a flex container/grid
.c-restaurantCard-clearfix {
    width: 100%;
    margin: 0;
}

.c-restaurantCard--hideOnMobile {
    display: none;
}
</style>
