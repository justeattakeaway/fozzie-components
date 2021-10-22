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
        <div
            :class="[$style['c-restaurantCard-img']]"
            :style="`background-image: url(${imgUrl});`"
            role="img">

            <!-- Logo image -->
            <img
                v-if="!!logoUrl"
                :src="logoUrl"
                alt=""
                width="50"
                height="50"
                loading="lazy"
                :class="$style['c-restaurantCard-logo']"
                data-test-id="restaurant_logo">
        </div>

        <!-- primary content -->
        <div :class="$style['c-restaurantCard-content']">
            <!-- Restaurant Name -->
            <h3
                data-test-id="restaurant_name"
                data-search-name>
                Fake Restaurant
            </h3>

            <!-- stress test the content size -->
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Eius mollitia distinctio magni enim neque, labore repellat
                quaerat quam magnam, sint vel, officiis nam voluptas hic.
                Assumenda illum repudiandae libero impedit?</p>

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
        <span :class="[$style['c-restaurantCard-dish']]">DISH RESULT</span>
    </a>
</template>

<script>
import ErrorBoundaryMixin from '../assets/vue/mixins/errorBoundary.mixin';

export default {
    name: 'RestaurantCardV1',
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
$img-borderRadius                         : $radius-rounded-c;
$logo-borderRadius                        : $radius-rounded-b;
$logo-borderColor                         : $color-border-default;

.c-restaurantCard {
  text-decoration: none;
  display: grid;
  grid-gap: spacing(x2);
  grid-template-columns: 1fr;

  &.c-restaurantCard--listItem {
      @include media('>mid') {
        grid-template-columns: minmax(150px, 20%) 1fr;
      }
  }
}

.c-restaurantCard-img {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px; // TODO: agree with design
  border-radius: $img-borderRadius;
  position: relative;

  .c-restaurantCard--listItem & {
      @include media('>mid') {
        min-height: 125px; // TODO: agree with design
        height: 100%;
        grid-column: 1/2;
      }
  }
}

.c-restaurantCard-content {
    .c-restaurantCard--listItem & {
        @include media('>mid') {
        padding: spacing() 0;
        grid-column: 2/3;
      }
  }
}

.c-restaurantCard-logo {
  border: 1px solid $logo-borderColor;
  border-radius: $logo-borderRadius;
  top: spacing(x2);
  left: spacing(x2);
  position: absolute;
}

// placeholder styles - will be extracted to subcomponent
.c-restaurantCard-dish {
  background: lightgreen;
  padding: 1rem;
  border: 2px dashed green;
  border-radius: 8px;

  .c-restaurantCard--listItem & {
      @include media('>mid') {
        grid-column: 1/3;
      }
  }
}
</style>
