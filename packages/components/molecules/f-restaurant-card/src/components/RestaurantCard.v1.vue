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
            :img-url="imgUrl" />

        <!-- Logo image -->
        <restaurant-logo
            v-if="!!logoUrl"
            :class="$style['c-restaurantCard-logo']"
            :logo-url="logoUrl" />

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
import ErrorBoundaryMixin from '../assets/vue/mixins/errorBoundary.mixin';
import RestaurantImage from './RestaurantImage.vue';
import RestaurantLogo from './RestaurantLogo.vue';
import RestaurantDish from './RestaurantDish.vue';

export default {
    name: 'RestaurantCardV1',
    components: {
        RestaurantImage,
        RestaurantLogo,
        RestaurantDish
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
  text-decoration: none;
  display: grid;
  grid-gap: spacing(x2);
  grid-template-columns: 1fr;
  position: relative;

  &.c-restaurantCard--listItem {
      @include media('>mid') {
        grid-gap: spacing() spacing(x2);
        grid-template-columns: minmax(150px, 20%) 1fr;
      }
  }
}

.c-restaurantCard {
...

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
</style>
