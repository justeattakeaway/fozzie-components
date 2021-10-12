<template>
    <!-- NOTE: This is all placeholder markup, attributes and comments.
    This is not indicative of the actual HTML tags and attributes we
    will use (which will be much more accessible and semantic) -->
    <article
        :class="[
            $style['c-restaurantCard'],
            { [$style['c-restaurantCard--mobile']]: isMobileMode },
            { [$style['c-restaurantCard--mobile-img']]: isMobileMode && imgUrl }]"
        data-test-id="restaurantCard-component">
        <a
            :href="url"
            @click="$emit('restaurant-card-clicked')">

            <div
                v-if="imgUrl"
                :class="$style['c-restaurantCard-img']"
                :style="`background-image: url(${imgUrl});`" />
            <div :class="$style['c-restaurantCard-content']">
                <div :class="$style['c-restaurantCard-content-inner']">
                    <!-- Logo image -->
                    <img
                        src="https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/154079.gif"
                        alt=""
                        width="50"
                        height="50"
                        loading="lazy"
                        :class="$style['c-restaurantCard-logo']">

                    <!-- background image -->


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
            </div>
        </a>
    </article>
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
        displayMode: {
            type: String,
            default: 'mobile'
        },
        // feature flags
        flags: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isMobileMode () {
            return this.displayMode === 'mobile';
        }
    }
};
</script>

<style lang="scss" module>
@mixin restaurantCard-mobile {
  border: 2px dashed purple;
  padding: 1rem;
  position: relative;
  cursor: pointer;

  .c-restaurantCard-img {
    background-size: cover;
    border-radius: 12px;
    left: 1rem;
    right: 1rem;
    top: 1rem;
    bottom: 4rem;
    z-index: -1;
    max-height: 200px;
    position: absolute;
  }

  .c-restaurantCard-content {
    padding: 1rem;
    padding-bottom: 0;
    z-index: 1;
  }

  .c-restaurantCard-content-inner {
    padding: 1rem;
    background: #FFF;
    box-shadow: 0px 6px 8px rgba(54, 59, 73, 0.02), 0px 1px 20px rgba(54, 59, 73, 0.08), 0px 3px 6px -1px rgba(54, 59, 73, 0.08);
    border-radius: 12px;
    min-height: 100px;
    position: relative;
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

.c-restaurantCard {
  @media only screen and (max-width: 600px) {
    @include restaurantCard-mobile;
  }

  &--mobile {
    @include restaurantCard-mobile;
  }

  &--mobile-img {
    padding-top: 4rem;

    .c-restaurantCard-content {
        padding-top: 4.5rem;
    }
  }
}
</style>
