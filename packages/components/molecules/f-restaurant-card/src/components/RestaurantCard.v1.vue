<template>
    <!-- NOTE: This is all placeholder markup, attributes and comments.
    This is not indicative of the actual HTML tags and attributes we
    will use (which will be much more accessible and semantic) -->
    <a
        :href="url"
        :class="[
            $style['c-restaurantCard'],
            $style[displayModeModifier],
            { [$style['c-restaurantCard--img']]: !!imgUrl }]"
        data-test-id="restaurantCard-component"
        @click="$emit('restaurant-card-clicked')">

        <!-- background image -->
        <div
            v-if="imgUrl"
            :class="$style['c-restaurantCard-img']"
            :style="`background-image: url(${imgUrl});`" />

        <!-- card content -->
        <div :class="$style['c-restaurantCard-content']">
            <!-- Logo image -->
            <img
                src="https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/154079.gif"
                alt=""
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
    // NOTE: These are merely some placeholder props and not indicative of the props we will end up using
    props: {
        // restaurant & display data
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
// variants
// =====
// tile (img and no img)
// list item (img and no img) - turns into tile at a break point
// default to list-item - pass in tile boolean

$card-bgColor                             : $color-container-default;
$card-borderColor                         : $color-border-default;
$card-borderRadius                        : $radius-rounded-c;

@mixin card-frame {
    z-index: 1;
    background: #fff;
    box-shadow: 0 6px 8px rgba(54, 59, 73, 0.02), 0 1px 20px rgba(54, 59, 73, 0.08), 0 3px 6px -1px rgba(54, 59, 73, 0.08);
    border-radius: 12px;
    min-height: 100px;
    position: relative;
}

@mixin restaurantCard-tile {
  display: block;
 //   border: 2px dashed purple;
//   padding: 1rem;
  position: relative;
  cursor: pointer;

  .c-restaurantCard-img {
    background-size: cover;
    left: 0;
    right: 0;
    top: 0;
    bottom: 4rem;
    z-index: -1;
    max-height: 200px;
    position: absolute;
  }

  .c-restaurantCard-content {
    padding: 1rem;
    @include card-frame;
  }

  .c-restaurantCard-logo {
    position: absolute;
    left: 50%;
    top: -25px;
    transform: translateX(-50%);
    border: 0.5px solid #eaeaea;
    border-radius: 2px;
  }
}

.c-restaurantCard {
    text-decoration: none;
    padding: 0.5rem;
    display: flex;

    &-img {
        border-radius: $card-borderRadius;
    }

    &-content {
        // border: 2px dashed red;
        flex: 1;
        padding: 0.5rem 2.5rem;
        // padding-left: 5rem;
    }

    // more padding if no img, default
    &-content {
        .c-restaurantCard--list-item & {
            padding-left: 5rem;
        }
    }

    // less padding if img, override
    &-content {
        .c-restaurantCard--img & {
            padding-left: 2.5rem;
        }
    }

    &-logo {
        position: absolute;
        top: 50%;
        transform: translate(-130%, -50%);
        border: 0.5px solid #eaeaea;
        border-radius: 2px;
    }

    &--list-item {
        @media only screen and (min-width: 600px) {
            @include card-frame;
        }

        &.c-restaurantCard--img {
            padding-top: .5rem;
            // if we have an image and break to tile mode
            @media only screen and (max-width: 600px) {
                padding-top: 8.5rem;
            }
        }
    }

    &-img {
        .c-restaurantCard--list-item & {
            display: block;
            background-size: cover;
            flex-basis: 150px;
        }
    }

    &--tile {
        &.c-restaurantCard--img {
            padding-top: 8.5rem;
        }
    }
}

.c-restaurantCard--tile {
    @include restaurantCard-tile;
}

// .c-restaurantCard--tile .c-restaurantCard--img & {
//     background: red;
// }

.c-restaurantCard--list-item {
    // background: lightblue;

    // break down to tile
    @media only screen and (max-width: 600px) {
        @include restaurantCard-tile;
    }
}

// when list item and img classes present
  // less padding

// .parentClass { border 10px}

// .img {
//     .parentClass & {
//           magic stuff here
//    }
// }
// .parentClass .img {o over rides }
// Sonny Prince13:30
// .cloudinaryBroke { border 10px}

// .content {
//     .cloudinaryBroke & {
//           remove padding
//    }
// }

// .card {
//   &-thing, &-other {
//        generic stuff
//   }
//    &-other {
//        specific stuff
//   }
// }
</style>
