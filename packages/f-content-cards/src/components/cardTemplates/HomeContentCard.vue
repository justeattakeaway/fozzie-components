<template>
    <div
        :data-test-id="testId"
        :style="{ background: backgroundColor }"
        :class="['c-homeContentCard', $style['c-homeContentCard']]">
        <div
            :data-test-id="containerTestId"
            :class="[
                'l-container',
                'c-homeContentCard-container',
                $style['c-homeContentCard-container']
            ]"
            :style="{ maxWidth: `${containerMaxWidth}px` }">
            <div
                :class="['c-homeContentCard-icon', $style['c-homeContentCard-icon']]">
                <img
                    :src="icon"
                    alt="">
            </div>
            <div
                :class="[
                    'c-homeContentCard-innerCard',
                    $style['c-homeContentCard-innerCard']
                ]"
                :style="{ background: contentContainerBackground }">
                <div
                    :style="{ backgroundImage: `url('${image}')` }"
                    :class="['c-homeContentCard-image', $style['c-homeContentCard-image']]" />
                <h3>{{ title }}</h3>
                <p>{{ description }}</p>
                <p v-if="url">
                    <a
                        :href="url"
                        :data-test-id="ctaTestId"
                        class="o-link--full o-link--bold u-color-link u-text-left">
                        {{ ctaText }}
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            default: () => ({})
        },
        containerMaxWidth: {
            type: Number,
            default: 1272
        },
        testId: {
            type: String,
            default: null
        }
    },
    data () {
        const {
            image,
            ctaText,
            button,
            backgroundColor,
            contentContainerBackground,
            type,
            icon,
            title,
            url,
            description
        } = this.card;

        return {
            title,
            backgroundColor,
            contentContainerBackground,
            image,
            ctaText,
            button,
            type,
            icon,
            url,
            description
        };
    },
    computed: {
        ctaTestId () {
            return this.testId ? `${this.testId}--cta` : false;
        },

        containerTestId () {
            return this.testId ? `${this.testId}--container` : false;
        }
    }
};
</script>

<style lang="scss" module>
.c-homeContentCard {
  padding: spacing(x3) 0 spacing(x2);

  @include media(">mid") {
    padding: spacing(x3) 0;
  }
}

.c-homeContentCard-container {
  display: flex;
  flex-wrap: wrap;
}

.c-homeContentCard-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: spacing(x3);

  img {
    max-height: 65px;
    max-width: 100%;
  }

  @include media(">mid") {
    width: 50%;
    margin-bottom: 0;
  }
}

.c-homeContentCard-innerCard {
  position: relative;
  width: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: $post-order-card-radius;
  padding: spacing(x3) calc(35% + 8px) spacing(x3) spacing(x3);

  @include media(">narrow") {
    padding-right: 208px;
  }

  @include media(">mid") {
    width: 50%;
  }
}

.c-homeContentCard-image {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 35%;
    height: 100%;
    background: right center no-repeat;
    background-size: contain;

    @include media(">narrow") {
        width: 200px;
    }
}
</style>
