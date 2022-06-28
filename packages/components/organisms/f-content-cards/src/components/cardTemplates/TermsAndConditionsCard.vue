<!-- DEPRECATED - we don't need this on the frontend anymore -->
<template>
    <div
        :data-test-id="dataTestId('shell')"
        :class="$style['c-contentCards-tnc-card-shell']">
        <h1
            :data-test-id="dataTestId('title')"
            :class="$style['c-contentCards-tnc-card-primaryHeader']">
            {{ titleCard.title }}
        </h1>
        <h2
            :data-test-id="dataTestId('subtitle')"
            :class="$style['c-contentCards-tnc-card-secondaryHeader']">
            {{ titleCard.subtitle }}
        </h2>
        <p>
            <a
                :href="titleCard.url"
                :data-test-id="dataTestId('cta')"
                class="o-link--noDecoration o-link--bold">
                {{ titleCard.ctaText }}
            </a>
        </p>
    </div>
</template>

<script>
export default {

    inject: [
        // Locale-specific copy configuration
        'copy'
    ],
    props: {
        card: {
            type: Object,
            default: () => ({
                title: false,
                subtitle: false,
                ctaText: false,
                url: false
            })
        },

        testId: {
            type: String,
            default: undefined
        }
    },

    computed: {
        suppliedCardHasAllProperties () {
            return this.card.title &&
                this.card.subtitle &&
                this.card.ctaText &&
                this.card.url;
        },

        titleCard () {
            return this.suppliedCardHasAllProperties
                ? this.card
                : {
                    title: this.copy.loggedInTitle,
                    subtitle: this.copy.loggedInSubtitle,
                    ctaText: this.copy.loggedInTermsText,
                    url: this.copy.loggedInTermsUrl
                };
        }
    },

    methods: {
        /**
         * Returns an ID based on the given suffix if non-empty test ID supplied as prop
         * @param suffix
         * @return {false|string}
         */
        dataTestId (suffix) {
            return (this.testId || false)
                && `${this.testId}-${suffix}`;
        }
    }
};
</script>

<style lang="scss" module>
    @use '@justeat/fozzie/src/scss/fozzie' as f;

  .c-contentCards-tnc-card-shell {
    background-color: f.$color-container-default;
    padding: f.spacing(e);
    text-align: center;
  }

  .c-contentCards-tnc-card-primaryHeader {
    @include f.font-size(heading-s);
    color: f.$color-content-default;

    @include f.media('>=narrow') {
      @include f.font-size(heading-xl);
    }
  }

  .c-contentCards-tnc-card-secondaryHeader {
    @include f.font-size(body-s);
    color: f.$color-content-subdued;
    margin-top: f.spacing(d);

    @include f.media('>=narrow') {
      @include f.font-size(heading-s);
    }
  }
</style>
