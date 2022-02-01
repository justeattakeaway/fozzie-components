<template>
    <a
        :href="url"
        :class="[
            $style['c-restaurantCard'], {
                [$style['c-restaurantCard--listItem']]: isListItem,
                [$style['c-restaurantCard--hasImg']]: !!imgUrl
            }]"
        data-test-id="restaurantCard-component"
        @click="$emit('restaurant-card-clicked')">

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
                    :test-id-position="'main-image'"
                    :tags="tags.imageTags" />
            </component>

        </restaurant-image>

        <!-- primary content -->
        <div :class="$style['c-restaurantCard-content']">
            <!-- Restaurant Name -->
            <h3
                :class="$style['c-restaurantCard-name']"
                data-test-id="restaurant_name"
                data-search-name>
                {{ name }}
            </h3>

            <!-- Cuisines -->
            <component
                :is="errorBoundary"
                v-if="cuisines.length > 0"
                :tier="3">
                <restaurant-cuisines
                    data-test-id="restaurant-cuisines"
                    :cuisines="cuisines" />
            </component>

            <!-- Premier Icon -->
            <legend-icon
                v-if="isPremier"
                :class="[$style['c-restaurantCard-premier']]"
                data-test-id="premier-icon" />

            <!-- New label -->
            <!-- TODO - we want to translate this within the component using i18n.
            For now we'll just need to pass down a translated string from the consuming site -->
            <restaurant-tag
                v-if="newTagText"
                :is-large="true"
                :is-uppercase="true"
                :text="newTagText"
                color-scheme="positive" />

            <!-- Ratings -->
            <component
                :is="errorBoundary"
                v-if="rating"
                :tier="3">
                <restaurant-rating
                    data-test-id="restaurant-rating"
                    v-bind="rating" />
            </component>

            <!-- Offline Icon -->

            <!-- Meta Items List -->
            <component
                :is="errorBoundary"
                v-if="displayDeliveryTimeMeta"
                :tier="3">
                <delivery-time-meta
                    v-bind="deliveryTimeData"
                    data-test-id="restaurant-delivery-time-meta" />
            </component>

            <!-- Fees -->
            <component
                :is="errorBoundary"
                v-if="hasFees"
                :tier="3">
                <restaurant-fees
                    v-bind="fees"
                    data-test-id="restaurant-fees" />
            </component>

            <!-- misc tags -->
            <component
                :is="errorBoundary"
                v-if="hasContentTags"
                :tier="3">
                <restaurant-tags
                    :class="$style['c-restaurantCard-tags']"
                    :test-id-position="'inner-content'"
                    :tags="tags.contentTags" />
            </component>

            <!-- Offers -->
            <icon-text
                v-if="hasOffer"
                data-test-id="restaurant-offer"
                :text="offer"
                is-bold>
                <offer-icon />
            </icon-text>
        </div>

        <!-- Dishes -->
        <component
            :is="errorBoundary"
            v-if="!disabled && hasDishes"
            :tier="3">
            <restaurant-dishes
                data-test-id="restaurant-dishes"
                :dishes="dishes"
                :is-vertically-stacked="isListItem"
                :class="[$style['c-restaurantCard-dishes']]" />
        </component>
    </a>
</template>

<script>
import { OfferIcon, LegendIcon } from '@justeat/f-vue-icons';
import ErrorBoundaryMixin from '../assets/vue/mixins/errorBoundary.mixin';
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
import RenderlessSlotWrapper from './RenderlessSlotWrapper';

export default {
    name: 'RestaurantCardV1',
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
        RestaurantFees,
        RenderlessSlotWrapper
    },
    mixins: [ErrorBoundaryMixin],
    // NOTE: These are merely some placeholder props and not indicative of the props we will end up using
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
        disabled: {
            type: Boolean,
            default: false
        },
        isListItem: {
            type: Boolean,
            default: true
        },
        cuisines: {
            type: Array,
            default: () => []
        },
        // feature flags
        flags: {
            type: Object,
            default: () => ({})
        },
        tags: {
            type: Object,
            default: () => ({})
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
            default: () => ({})
        },
        dishes: {
            type: Array,
            default: () => ([])
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
            default: () => {}
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
            return this.deliveryTimeData.eta ||
                this.deliveryTimeData.distance ||
                this.deliveryTimeData.address;
        },
        hasDishes () {
            return !!this.dishes?.length;
        },
        hasFees () {
            return !!this.fees?.deliveryFeeText || !!this.fees?.minOrderText;
        }
    },
    provide () {
        return {
            isListItem: this.isListItem
        };
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
        grid-template-columns: minmax(180px, 20%) 1fr;
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
  height: 200px; // TODO: agree with design

  .c-restaurantCard--listItem & {
      @include media('>mid') {
        min-height: 125px; // TODO: agree with design
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
    bottom: spacing();
    left: spacing(d);
    position: absolute;
    @include media('>mid') {
        bottom: spacing(c);
    }
}

.c-restaurantCard-premier {
    height: 21px;
}
</style>
