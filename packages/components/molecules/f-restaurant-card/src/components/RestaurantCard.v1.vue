<template>
    <a
        :href="url"
        :class="[
            $style['c-restaurantCard'],
            $style[displayModeModifier],
            { [$style['c-restaurantCard--hasImg']]: !!imgUrl }]"
        data-test-id="restaurantCard-component"
        @click="$emit('restaurant-card-clicked')">

        <!-- background image -->
        <!-- TODO: agree with design what should happen when the image is missing.
        Simply not rendering the image container means we won't render the logo and any badges etc.
        We could keep logos and badges outside of the img container and change padding when the image is missing. -->
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
            <slot name="cuisines" />
            <!-- END ERROR BOUNDARY -->


            <!-- New label -->
            <!-- START ERROR BOUNDARY -->
            <slot name="new-label" />
            <!-- END ERROR BOUNDARY -->

            <!-- Ratings -->
            <!-- START ERROR BOUNDARY -->
            <slot name="ratings" />
            <!-- END ERROR BOUNDARY -->

            <!-- Offline Icon -->
            <!-- <div>Offline Icon</div> -->

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
                <!-- <span>Promoted</span> -->
            </div>
            <!-- Optional items i.e. dish search results -->
            <slot name="optional-items" />
        </div>

        <!-- optional items -->
        <p :class="[$style['c-restaurantCard-dish']]">DISH RESULT</p>
        <p :class="[$style['c-restaurantCard-dish']]">DISH RESULT</p>
        <p :class="[$style['c-restaurantCard-dish']]">DISH RESULT</p>
    </a>
</template>

<script>

export default {
    name: 'RestaurantCardV1',
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
    },
    computed: {
        displayModeModifier () {
            return this.isListItem ? 'c-restaurantCard--listItem' : null;
        }
    }
};
</script>

<style lang="scss" module>
$card-bgColor                             : $color-container-default;
$card-borderRadius                        : $radius-rounded-c;
$img-borderRadius                         : $radius-rounded-c;
$logo-borderRadius                        : $radius-rounded-b;
$logo-borderColor                         : $color-border-default;


.c-restaurantCard {
  display: block;
  text-decoration: none;
  display: grid;
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
  border-radius: $card-borderRadius;
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
  padding: spacing() 0;

  .c-restaurantCard--listItem & {
      @include media('>mid') {
        grid-column: 2/3;
        padding-left: spacing(x1.5);
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
  margin: 5px 0 5px 0;
  background: lightgreen;
  padding: 1rem;
  border: 2px dashed green;
  border-radius: $card-borderRadius / 2;

  .c-restaurantCard--listItem & {
      @include media('>mid') {
        grid-column: 1/3;
      }
  }
}
</style>
