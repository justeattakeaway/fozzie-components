<template>
    <a
        :href="url"
        :class="[
            $style['c-restaurantCard'],
            $style[displayModeModifier],
            { [$style['c-restaurantCard--with-img']]: !!imgUrl }]"
        data-test-id="restaurantCard-component"
        @click="$emit('restaurant-card-clicked')">

        <!-- background image -->
        <div
            v-if="imgUrl"
            :class="$style['c-restaurantCard-img']"
            :style="`background-image: url(${imgUrl});`"
            role="img"
            aria-label="TODO - Determine appropriate label" />

        <!-- card content -->
        <div :class="$style['c-restaurantCard-content']">
            <!-- Logo image -->
            <img
                :src="logoUrl"
                alt="TODO - Determine appropriate alt"
                width="50"
                height="50"
                loading="lazy"
                :class="$style['c-restaurantCard-logo']">



            <!-- Restaurant Name -->
            <h3
                data-test-id="restaurant_name"
                data-search-name>
                Fake Restaurant
            </h3>

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
        tileMode: {
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
            return this.tileMode ? 'c-restaurantCard--tile' : 'c-restaurantCard--list-item';
        }
    }
};
</script>

<style lang="scss" module>
$card-bgColor                             : $color-container-default;
$card-borderRadius                        : $radius-rounded-c;
$img-border-radius                        : $radius-rounded-c;
$img-width                                : 156px;
$logo-borderRadius                        : $radius-rounded-b;
$logo-borderColor                         : $color-border-default;

@mixin card-frame {
    z-index: 1;
    background: $card-bgColor;
    box-shadow: 0 6px 8px rgba($color-black, 0.02), 0 1px 20px rgba($color-black, 0.08), 0 3px 6px -1px rgba($color-black, 0.08);
    border-radius: $card-borderRadius;
    position: relative;
    min-height: 114px;

    @include media('>mid') {
        min-height: 96px;
    }
}

@mixin restaurantCard-tile {
  display: block;
  position: relative;
  cursor: pointer;

  &.c-restaurantCard--with-img {
      padding: spacing(x2);
      padding-top: spacing(x10) * 2;
  }

  &:not(.c-restaurantCard--with-img) {
      padding-top: spacing() * 3.5;
  }

  .c-restaurantCard-img {
    height: 228px;
    left: 0;
    right: 0;
    top: 0;
    bottom: spacing(x8);
    z-index: -1;
    position: absolute;
  }

  .c-restaurantCard-content {
    padding: spacing(x2);
    @include card-frame;
  }

  .c-restaurantCard-logo {
    left: 50%;
    top: -25px;
    transform: translateX(-50%);
  }
}

.c-restaurantCard {
    text-decoration: none;
    padding: spacing(x0.5);
    display: flex;

    &-logo {
        border: 0.5px solid $logo-borderColor;
        border-radius: $logo-borderRadius;
        position: absolute;

        .c-restaurantCard--list-item & {
            top: 50%;
            transform: translate(-130%, -50%);
        }
    }

    &-img {
        border-radius: $img-border-radius;
        background-size: cover;
        background-position: center;

        .c-restaurantCard--list-item & {
            display: block;
            flex-basis: $img-width;
        }
    }

    &-content {
        padding: spacing(x0.5) spacing(x5);

        .c-restaurantCard--list-item & {
            flex: 1;
            padding-left: spacing(x10);
        }

        .c-restaurantCard--with-img & {
            padding-left: spacing(x5);
        }
    }

    &--list-item {
        @include media('>mid') {
            @include card-frame;
        }

        @include media('<=mid') {
            @include restaurantCard-tile;
        }
    }

    &--tile {
        @include restaurantCard-tile;
    }
}
</style>
