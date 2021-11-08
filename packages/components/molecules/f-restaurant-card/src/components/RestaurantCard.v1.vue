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

            <restaurant-badges
                v-if="imageBadges.length"
                :class="$style['c-restaurantCard-imageBadges']"
                :test-id-position="'main-image'"
                :badges="imageBadges" />
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
                <restaurant-badge
                    v-if="newBadgeText"
                    :is-large="true"
                    :text="newBadgeText"
                    :background-colour="subcomponentColourSchemes.badges.new.background"
                    :text-colour="subcomponentColourSchemes.badges.new.text" />
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

            <!-- Badges -->
            <div>
                <!-- misc badges -->
                <!-- START ERROR BOUNDARY -->
                <component
                    :is="errorBoundary"
                    tier="3">
                    <restaurant-badges
                        v-if="contentBadges.length"
                        :class="$style['c-restaurantCard-badges']"
                        :test-id-position="'inner-content'"
                        :badges="contentBadges" />
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
        <restaurant-dish
            v-if="!disabled"
            :class="[$style['c-restaurantCard-dish']]" />
    </a>
</template>

<script>
import { theme as PieTokensTheme } from '@justeat/pie-design-tokens/dist/tokens.json';
import ErrorBoundaryMixin from '../assets/vue/mixins/errorBoundary.mixin';
import RestaurantImage from './subcomponents/RestaurantImage/RestaurantImage.vue';
import RestaurantLogo from './subcomponents/RestaurantLogo.vue';
import RestaurantDish from './subcomponents/RestaurantDish.vue';
import RestaurantCuisines from './subcomponents/RestaurantCuisines.vue';
import RestaurantBadges from './subcomponents/RestaurantBadges/RestaurantBadges.vue';
import RestaurantBadge from './subcomponents/RestaurantBadges/RestaurantBadge.vue';
import DeliveryTimeMeta from './subcomponents/DeliveryTimeMeta/DeliveryTimeMeta.vue';

const {
    'support-positive': newBadgeTextColour,
    'support-positive-02': newBadgeBackgroundColour
} = PieTokensTheme.jet.color.alias.default;

const subcomponentColourSchemes = {
    badges: {
        new: {
            text: newBadgeTextColour,
            background: newBadgeBackgroundColour
        }
    }
};

export default {
    name: 'RestaurantCardV1',
    components: {
        RestaurantImage,
        RestaurantLogo,
        RestaurantDish,
        RestaurantCuisines,
        RestaurantBadges,
        RestaurantBadge,
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
        imageBadges: {
            type: Array,
            default: () => []
        },
        contentBadges: {
            type: Array,
            default: () => []
        },
        newBadgeText: {
            type: String,
            default: null
        },
        deliveryTimeData: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            subcomponentColourSchemes
        };
    },
    computed: {
        displayDeliveryTimeMeta () {
            return this.deliveryTimeData.eta ||
                this.deliveryTimeData.distance ||
                this.deliveryTimeData.address;
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

.c-restaurantCard-dish {
  .c-restaurantCard--listItem & {
      @include media('>mid') {
        grid-column: 1/3;
      }
  }
}

.c-restaurantCard-imageBadges {
    bottom: spacing();
    left: spacing(x2);
    position: absolute;
    @include media('>mid') {
        bottom: spacing(x1.5);
    }
}
</style>
