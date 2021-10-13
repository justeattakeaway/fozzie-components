<template>
    <!-- NOTE: This is all placeholder markup, attributes and comments.
    This is not indicative of the actual HTML tags and attributes we
    will use (which will be much more accessible and semantic) -->
    <a
        :href="url"
        :class="[
            $style['c-restaurantCard'],
            { [$style['c-restaurantCard--mobile']]: mobile },
            { [$style['c-restaurantCard--img']]: imgUrl }]"
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
            <div>Offline Icon</div>

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
                <span>Promoted</span>
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
        mobile: {
            type: Boolean,
            default: false
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

@mixin card-frame {
    padding: 1rem;
    z-index: 1;
    background: #FFF;
    box-shadow: 0px 6px 8px rgba(54, 59, 73, 0.02), 0px 1px 20px rgba(54, 59, 73, 0.08), 0px 3px 6px -1px rgba(54, 59, 73, 0.08);
    border-radius: 12px;
    min-height: 100px;
    position: relative;
}

@mixin restaurantCard-mobile {
  display: block;
  border: 2px dashed purple;
  padding: 1rem;
  position: relative;
  cursor: pointer;

  // undo desktop settings
  background: none;
  box-shadow: none;
  border-radius: 0;
  z-index: 0;
  min-height: initial;

  .c-restaurantCard-img {
    background-size: cover;
    border-radius: 12px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 4rem;
    z-index: -1;
    max-height: 200px;
    position: absolute;

    // undo desktop settings
    border: 0;
  }

  .c-restaurantCard-content {
    padding: 1rem;
    z-index: 1;
    background: #FFF;
    box-shadow: 0px 6px 8px rgba(54, 59, 73, 0.02), 0px 1px 20px rgba(54, 59, 73, 0.08), 0px 3px 6px -1px rgba(54, 59, 73, 0.08);
    border-radius: 12px;
    min-height: 100px;
    position: relative;

    // undo desktop styling
    border: 0;
  }

  .c-restaurantCard-logo {
    position: absolute;
    left: 50%;
    top: -25px;
    transform: translateX(-50%);
    border: 0.5px solid #EAEAEA;
    border-radius: 2px;
  }
}

// this will break the mobile styles until the two are combined
.c-restaurantCard {
  display: block;
  @include card-frame;
  padding: 0.5rem;
  display: flex;

  &-img {
    display: block;
    background-size: cover;
    border-radius: 12px;
    // border: 2px dashed green;
    flex-basis: 150px;
  }

  &-content {
    // border: 2px dashed red;
    flex: 1;
    padding: .5rem 2.5rem;
  }

  &-logo {
    position: absolute;
    top: 50%;
    transform: translate(-130%, -50%);
    border: 0.5px solid #EAEAEA;
    border-radius: 2px;
  }

  @media only screen and (max-width: 600px) {
    @include restaurantCard-mobile;
  }

  &--mobile {
    @include restaurantCard-mobile;
  }

  &--img {
    @media only screen and (max-width: 600px) {
      padding-top: 8.5rem;
    }
  }
}
</style>
