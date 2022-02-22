<template>
    <a
        :href="url"
        :class="[
            $style['c-restaurantCard'], {
                [$style['c-restaurantCard--listItem']]: isListItem
            }]"
        data-test-id="restaurant"
        :data-restaurant-id="id"
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

            <div
                :class="$style['c-restaurantCard-ratingContainer']">
                <!-- Ratings -->
                <component
                    :is="errorBoundary"
                    v-if="rating"
                    :tier="3">
                    <restaurant-rating
                        v-bind="rating" />
                </component>

                <!-- Premier Icon -->
                <legend-icon
                    v-if="isPremier"
                    :class="[$style['c-restaurantCard-premier']]"
                    data-test-id="restaurant-premier" />

                <!-- 'New' label -->
                <restaurant-tag
                    v-if="newTagText"
                    :is-large="true"
                    :is-uppercase="true"
                    :text="newTagText"
                    data-test-id="restaurant-new-badge"
                    color-scheme="positive" />
            </div>


            <!-- Cuisines -->
            <component
                :is="errorBoundary"
                v-if="hasCuisines"
                :tier="3">
                <restaurant-cuisines
                    :class="$style['c-restaurantCard-cuisines']"
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
                    :class="$style['c-restaurantCard-distance']"
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
        RenderlessSlotWrapper
    },
    provide () {
        return {
            isListItem: this.isListItem
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
  grid-gap: spacing(d);
  grid-template-columns: 1fr;
  position: relative;

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
        min-height: 100px;
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
    bottom: spacing(d);
    left: spacing(d);
    position: absolute;
    margin-bottom: 0;
}

.c-restaurantCard-premier {
    height: 21px;
}

.c-restaurantCard-ratingContainer {
    display: flex;
    gap: spacing(c);
    align-items: center;
}

// Regular inner-content positioning
.c-restaurantCard-content {
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    gap: 0 spacing(c);

    // an alternative to using bottom gap so that none is applied to the clearfix
    > * {
        margin-bottom: spacing(a);
    }
}

// name, tags and offer need to be full-width
.c-restaurantCard-name,
.c-restaurantCard-tags,
.c-restaurantCard-offer {
    flex: 0 0 100%;
}

.c-restaurantCard-offer {
    order: 1; // places as last flex item
    margin-top: spacing(a);
}

// List-item inner-content positioning (should only kick in at larger screen sizes when the class is applied)
@include media('>mid') {
    .c-restaurantCard-content {
        .c-restaurantCard--listItem & {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: min-content;
            place-content: center;
            grid-auto-flow: dense;
            align-items: center;
            gap: spacing(a) spacing(d);

            // all data points apart from ratingContainer and cuisines should be in the second column
            > * {
                grid-column: 2;
            }
        }
    }

    .c-restaurantCard-ratingContainer,
    .c-restaurantCard-cuisines {
        .c-restaurantCard--listItem .c-restaurantCard-content & {
            grid-column: 1;
        }
    }

    // name and tags should be full-width
    .c-restaurantCard-name,
    .c-restaurantCard-tags {
        .c-restaurantCard--listItem .c-restaurantCard-content & {
            grid-column: 1 / 3;
        }
    }

    // double the whitespace for name
    .c-restaurantCard-name {
        .c-restaurantCard--listItem .c-restaurantCard-content & {
            margin-bottom: spacing(a);
        }
    }

    // double the whitespace for tags
    .c-restaurantCard-tags {
        .c-restaurantCard--listItem .c-restaurantCard-content & {
            margin-top: spacing(a);
        }
    }

    // Prevent the cleafix from working on the list-item styling
    .c-restaurantCard-clearfix {
        .c-restaurantCard--listItem .c-restaurantCard-content & {
            display: none;
        }
    }

    .c-restaurantCard-content {
        .c-restaurantCard--listItem & {
            // remove gap set by base styles
            > * {
                margin-bottom: 0;
            }
        }
    }

    .c-restaurantCard-offer {
        .c-restaurantCard--listItem .c-restaurantCard-content & {
            margin-top: 0;
            order: initial;
        }
    }
}

// forces elements after to a new line within a flex container/grid
.c-restaurantCard-clearfix {
    width: 100%;
    margin: 0;
}
</style>
