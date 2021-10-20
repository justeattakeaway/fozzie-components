<template>
    <a
        :href="url"
        :class="[
            $style['c-restaurantCard'],
            $style[displayModeModifier],
            { [$style['c-restaurantCard--hasImg']]: !!imgUrl }]"
        data-test-id="restaurantCard-component"
        @click="$emit('restaurant-card-clicked')">

        <div :class="[$style['c-restaurantCard-content']]">
            <div :class="[$style['c-restaurantCard-innerContent']]">
                <!-- background image -->
                <div
                    v-if="!!imgUrl"
                    :class="[$style['c-restaurantCard-img']]"
                    :style="`background-image: url(${imgUrl});`"
                    role="img" />

                <!-- Logo image -->
                <img
                    :src="logoUrl"
                    alt=""
                    width="50"
                    height="50"
                    loading="lazy"
                    :class="$style['c-restaurantCard-logo']"
                    data-test-id="restaurant_logo">

                <div :class="$style['c-restaurantCard-data']">
                    <!-- primary content -->
                    <h3>Name</h3>
                    <span>thing 1</span>
                    <span>thing 2</span>

                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quam assumenda odio fuga dolores, veritatis laboriosam nostrum
                    nihil incidunt adipisci non eaque, vero ratione qui quod itaque?
                    Molestias, nihil ullam. Dolores!
                </div>
            </div>
            <!-- optional items -->
            <p :class="[$style['c-restaurantCard-optionalItem']]">DISH RESULT</p>
            <p :class="[$style['c-restaurantCard-optionalItem']]">DISH RESULT</p>
            <p :class="[$style['c-restaurantCard-optionalItem']]">DISH RESULT</p>
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
$tile-imgSpacing                          : spacing(x10) * 2;
$img-borderRadius                         : $radius-rounded-c;
$img-width                                : 156px;
$logo-borderRadius                        : $radius-rounded-b;
$logo-borderColor                         : $color-border-default;

.c-restaurantCard {
  display: block;
  text-decoration: none;
  position: relative;
  z-index: 2;
  margin: 0 10px;
  padding-top: 20px;

  &.c-restaurantCard--hasImg {
      padding-top: 90px;
  }

  &.c-restaurantCard--listItem {
      @media only screen and (min-width: 600px){
        padding-top: 0;
      }
  }
}

.c-restaurantCard-content {
    background: white;
    border-radius: $card-borderRadius;
    box-shadow: 0 6px 8px rgba($color-black, 0.02),
                0 1px 20px rgba($color-black, 0.08),
                0 3px 6px -1px rgba($color-black, 0.08);
}

.c-restaurantCard-innerContent {
    position: relative;

    .c-restaurantCard--listItem & {
        @media only screen and (min-width: 600px){
            padding-left: 40px;
        }
    }

    .c-restaurantCard--listItem.c-restaurantCard--hasImg & {
        @media only screen and (min-width: 600px){
            min-height: 100px;
            padding-left: 30%;
        }
    }
}

.c-restaurantCard-img {
  height: 100px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: -10px;
  width: calc(100% + 20px);
  transform: translateY(calc(-100% + 10px));
  background-size: cover;
  background-position: center;
  border-radius: $img-borderRadius;

    .c-restaurantCard--listItem & {
        @media only screen and (min-width: 600px){
          transform: none;
          z-index: 1;
          width: 30%;
          height: 100%;
          left: 0;
        }
    }
}

.c-restaurantCard-logo {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;

    .c-restaurantCard--listItem & {
        @media only screen and (min-width: 600px) {
            left: initial;
            top: 50%;
        }
    }
}

.c-restaurantCard-data {
    .c-restaurantCard--hasImg & {
        padding-top: 40px;
    }

    .c-restaurantCard--listItem & {
        @media only screen and (min-width: 600px) {
            padding-left: 40px;
        }
    }
    .c-restaurantCard--listItem.c-restaurantCard--hasImg & {
        @media only screen and (min-width: 600px) {
            padding-top: 0;
            padding-left: 40px;
        }
    }
}
</style>
