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
            v-if="imgUrl"
            :class="[$style['c-restaurantCard-img']]"
            :img-url="imgUrl">
            <!-- Logo image -->
            <restaurant-logo
                v-if="logoUrl"
                :class="$style['c-restaurantCard-logo']"
                :logo-url="logoUrl" />

            <restaurant-tags
                v-if="hasImageTags"
                :class="$style['c-restaurantCard-imageTags']"
                :test-id-position="'main-image'"
                :tags="tags.imageTags" />
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
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <restaurant-cuisines
                    v-if="cuisines.length > 0"
                    data-test-id="restaurant-cuisines"
                    :cuisines="cuisines" />
            </component>
            <!-- END ERROR BOUNDARY -->


            <!-- New label -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <!-- TODO - we want to translate this within the component using i18n.
                For now we'll just need to pass down a translated string from the consuming site -->
                <restaurant-tag
                    v-if="newTagText"
                    :is-large="true"
                    :is-uppercase="true"
                    :text="newTagText"
                    color-scheme="positive" />
            </component>
            <!-- END ERROR BOUNDARY -->

            <!-- Ratings -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <restaurant-rating
                    data-test-id="restaurant-rating"
                    v-bind="rating" />
            </component>
            <!-- END ERROR BOUNDARY -->

            <!-- Offline Icon -->

            <!-- Meta Items List -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <slot name="meta-items" />

                <delivery-time-meta
                    v-if="displayDeliveryTimeMeta"
                    v-bind="deliveryTimeData"
                    data-test-id="restaurant-delivery-time-meta" />
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

            <!-- Tags -->
            <div>
                <!-- misc tags -->
                <!-- START ERROR BOUNDARY -->
                <component
                    :is="errorBoundary"
                    tier="3">
                    <restaurant-tags
                        v-if="hasContentTags"
                        :class="$style['c-restaurantCard-tags']"
                        :test-id-position="'inner-content'"
                        :tags="tags.contentTags" />
                </component>
                <!-- END ERROR BOUNDARY -->
            </div>
            <!-- Optional items i.e. dish search results -->
            <!-- START ERROR BOUNDARY -->
            <component
                :is="errorBoundary"
                tier="3">
                <slot name="optional-items" />
            </component>
            <!-- END ERROR BOUNDARY -->

        </div>

        <!-- optional items -->
        <restaurant-dishes
            v-if="!disabled && hasDishes"
            :dishes="dishes"
            :class="[$style['c-restaurantCard-dishes']]" />
    </a>
</template>

<script>
import ErrorBoundaryMixin from '../assets/vue/mixins/errorBoundary.mixin';
import RestaurantImage from './subcomponents/RestaurantImage/RestaurantImage.vue';
import RestaurantLogo from './subcomponents/RestaurantLogo.vue';
import RestaurantDishes from './subcomponents/RestaurantDishes/RestaurantDishes.vue';
import RestaurantCuisines from './subcomponents/RestaurantCuisines.vue';
import RestaurantTags from './subcomponents/RestaurantTags/RestaurantTags.vue';
import RestaurantTag from './subcomponents/RestaurantTags/RestaurantTag.vue';
import RestaurantRating from './subcomponents/RestaurantRating/RestaurantRating.vue';
import DeliveryTimeMeta from './subcomponents/DeliveryTimeMeta/DeliveryTimeMeta.vue';

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
        DeliveryTimeMeta
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
            default: () => ({})
        },
        deliveryTimeData: {
            type: Object,
            default: () => ({})
        },
        dishes: {
            type: Array,
            default: () => ([])
        }
    },
    computed: {
        hasContentTags () {
            return !!this.tags?.contentTags?.length;
        },
        hasImageTags () {
            return !!this.tags?.imageTags?.length;
        },
        displayDeliveryTimeMeta () {
            return this.deliveryTimeData.eta ||
                this.deliveryTimeData.distance ||
                this.deliveryTimeData.address;
        },
        hasDishes () {
            return this.dishes?.length || false;
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
  grid-gap: spacing(x2);
  grid-template-columns: 1fr;
  position: relative;

  &.c-restaurantCard--listItem {
      @include media('>mid') {
        grid-gap: spacing() spacing(x2);
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
  top: spacing(x2);
  left: spacing(x2);
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
    left: spacing(x2);
    position: absolute;
    @include media('>mid') {
        bottom: spacing(x1.5);
    }
}
</style>
