<template>
    <card-case
        v-if="stampCardsPercentage"
        :card="card"
        :data-test-id="testId"
        :class="[$style['c-stampCard1']]">
        <div :class="[$style['c-stampCard1-headerDetails']]">
            <img
                :class="[$style['c-stampCard1-icon']]"
                :data-test-id="testIdForSection('image')"
                :src="card.image"
                :alt="card.title">
            <h3
                v-make-text-accessible
                :class="[$style['c-stampCard1-title']]"
                :data-test-id="testIdForSection('title')">
                {{ card.title }}
            </h3>

            <p
                v-make-text-accessible
                :class="[$style['c-stampCard1-statusText']]"
                :data-test-id="testIdForSection('statusText')"
            >
                {{ card.subtitle }}
            </p>
        </div>
        <div
            v-if="isReadyToClaim"
            :class="[
                $style['c-stampCard1-redemptionDetails']
            ]"
            :data-test-id="testIdForSection('redemptionDetails')">
            <div
                v-for="(subStatusLine, index) in card.description"
                :key="index"
                v-make-text-accessible
                :class="[$style['c-stampCard1-subStatusText']]"
                :data-test-id="testIdForSection('subStatusText', index)">
                {{ subStatusLine }}
            </div>
            <div
                :class="[$style['c-stampCard1-expiryInfo']]"
                :data-test-id="testIdForSection('expiryInfo')">
                {{ card.expiryLine }}
                <template v-if="hasValidExpiryDate">
                    <span :aria-label="expiryDateAccessible">
                        <span aria-hidden="true">{{ expiryDateVisual }}</span>
                    </span>
                </template>
            </div>
        </div>
        <div
            v-else
            :class="[$style['c-stampCard1-stamps']]"
            :data-test-id="testIdForSection('stamps')"
            role="img"
            :aria-label="stampCardsStatusCopy">
            <div
                v-for="({ stampImage, classSuffix }, index) in stamps"
                :key="index">
                <div
                    :class="[$style[`c-stampCard1-stamp`]]"
                    :data-test-id="testIdForSection(`stamp${classSuffix}`)">
                    <component
                        :is="stampImage"
                        :class="[
                            $style[`c-stampCard1-stampImage`],
                            $style[`c-stampCard1-stamp${classSuffix}`]
                        ]"
                    />
                </div>
            </div>
        </div>
    </card-case>
</template>

<script>

import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import lightFormat from 'date-fns/lightFormat';

import CardCase from './CardCase.vue';

import makeTextAccessible from '../MakeTextAccessible';

const PERMITTED_STAMPCARDS_PERCENTAGES = [
    '10',
    '15'
];

export default {
    name: 'StampCard1',

    components: {
        EmptyStamp15: () => import('./images/stamp-empty-15.svg'),
        FullStamp15: () => import('./images/stamp-full-15.svg'),
        EmptyStamp10: () => import('./images/stamp-empty-10.svg'),
        FullStamp10: () => import('./images/stamp-full-10.svg'),
        CardCase
    },

    directives: {
        makeTextAccessible
    },

    props: {
        card: {
            type: Object,
            required: true
        },

        testId: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            // Here for reference, TBC by product - currently this.card.totalRequiredStamps is provided but we have no
            // way of catering for any amount other than 5 when passed as part of the card data
            totalRequiredStamps: 5,
            dateFnsLocale: undefined
        };
    },

    computed: {
        /**
         * Converts the string value from the card data into a `Date`
         * @return {Date | *}
         */
        expiryDate () {
            return parseISO(this.card.expiryDate);
        },

        /**
         * Gives the date in two-digit Day/Month format eg "16/12"
         * @return {string}
         */
        expiryDateVisual () {
            return lightFormat(this.expiryDate, 'dd/MM');
        },

        /**
         * Gives the date in localised long-form for screenreaders - e.g. "December 16th"
         * @return {string}
         */
        expiryDateAccessible () {
            return format(this.expiryDate, 'LLLL do', { locale: this.dateFnsLocale });
        },

        /**
         * Truthy when the Date value given by expiryDate has parsed correctly
         * @return {boolean}
         */
        hasValidExpiryDate () {
            return !Number.isNaN(this.expiryDate.valueOf());
        },

        /**
         * Allows the card to interpret both `true` and the string value `"true"` as meaning ready to claim
         * @return {boolean}
         */
        isReadyToClaim () {
            return [true, 'true'].includes(this.card.isReadyToClaim);
        },

        /**
         * Gives an array of stamp objects that the component can scaffold into components for display
         * @return {Object[]}
         */
        stamps () {
            const stamps = [];

            for (let i = 0; i < this.card.totalRequiredStamps; i++) {
                const full = (i < this.card.earnedStamps);
                stamps.push(full ? {
                    stampImage: `FullStamp${this.stampCardsPercentage}`,
                    classSuffix: 'Full'
                } : {
                    stampImage: `EmptyStamp${this.stampCardsPercentage}`,
                    classSuffix: 'Empty'
                });
            }

            return stamps;
        },

        /**
         */
        stampCardsPercentage () {
            if (PERMITTED_STAMPCARDS_PERCENTAGES.includes(this.card.discountPercentage)) {
                return this.card.discountPercentage;
            }

            if (PERMITTED_STAMPCARDS_PERCENTAGES.includes(this.copy.stampCardDefaultPercentage)) {
                return this.copy.stampCardDefaultPercentage;
            }

            return null;
        },

        /**
         * Returns the stamp card status text based on the number of completed steps for accessibility
         * @return String
         */
        stampCardsStatusCopy () {
            return this.copy.stampCardStatus[this.card.earnedStamps];
        },

        /**
         * Creates a function that gives portions of the component's markup unique testIds for unit and browser testing
         * @return {function(*, *=): string|boolean}
         */
        testIdForSection () {
            return (section, index) => (this.testId
                ? `${this.testId}--${section}${index === undefined ? '' : `--${index}`}`
                : false);
        }

    },

    mounted () {
        this.getDateFnsLocale(this.copy.locale).then(locale => {
            this.dateFnsLocale = locale;
        });
    },

    inject: [
        'copy'
    ],

    methods: {
        /**
         * Takes the locale and lazyloads the correct date locale from the date-fns library
         * @param locale
         * @returns {
         *  Promise<module:date-fns/locale/da> |
         *  Promise<module:date-fns/locale/en-AU> |
         *  Promise<module:date-fns/locale/en-GB> |
         *  Promise<module:date-fns/locale/en-NZ> |
         *  Promise<module:date-fns/locale/es> |
         *  Promise<module:date-fns/locale/it> |
         *  Promise<module:date-fns/locale/nb>
         * }
         */
        getDateFnsLocale (locale) {
            switch (locale) {
                case 'da-DK':
                    return import(/* webpackChunkName: "date-fns-locale-da" */ 'date-fns/locale/da');
                case 'en-AU':
                    return import(/* webpackChunkName: "date-fns-locale-en-AU" */ 'date-fns/locale/en-AU');
                case 'en-GB':
                case 'en-IE':
                default:
                    return import(/* webpackChunkName: "date-fns-locale-en-GB" */ 'date-fns/locale/en-GB');
                case 'en-NZ':
                    return import(/* webpackChunkName: "date-fns-locale-en-NZ" */ 'date-fns/locale/en-NZ');
                case 'es-ES':
                    return import(/* webpackChunkName: "date-fns-locale-es" */ 'date-fns/locale/es');
                case 'it-IT':
                    return import(/* webpackChunkName: "date-fns-locale-it" */ 'date-fns/locale/it');
                case 'nb-NO':
                    return import(/* webpackChunkName: "date-fns-locale-nb" */ 'date-fns/locale/nb');
            }
        }
    }
};
</script>

<style lang="scss" module>

$stampCard-subStatus-colour: #017a39; /* $color-green in PIE - not in fozzie-colour-palette yet */
$stampCard-expiryInfo-colour: $color-content-subdued;

$stampCard-iconSize-landscape: 56px;
$stampCard-iconSize-portrait: 48px;

$stampCard-responsive-mobileViewBreakpoint: '<=narrowMid';
$stampCard-responsive-tabletViewBreakpoint: '<=mid';

.c-stampCard1 {
    text-decoration: initial;
    width: 392px;
    display: flex;
    flex-direction: column;
    padding: spacing(x2);
    border-radius: $radius-rounded-c;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.03),
    0 3px 1px -2px rgba(0, 0, 0, 0.07),
    0 1px 5px 0 rgba(0, 0, 0, 0.06);

    &,
    &:hover,
    &:visited,
    &:focus {
        color: $color-content-default;
    }

    @include media($stampCard-responsive-tabletViewBreakpoint) {
        width: 344px;
    }

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        width: auto;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
    }
}

.c-stampCard1-headerDetails {
    margin-bottom: spacing();
}

.c-stampCard1-icon {
    float: left;
    margin-right: spacing(x2);
    margin-bottom: spacing();
    width: $stampCard-iconSize-landscape;
    height: $stampCard-iconSize-landscape;
    border-radius: $radius-rounded-c;

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        width: $stampCard-iconSize-portrait;
        height: $stampCard-iconSize-portrait;
    }
}

.c-stampCard1-title {
    margin-top: 0;
    margin-bottom: spacing(x0.5);

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        @include font-size(heading-s, true, narrow);
    }
}

.c-stampCard1-statusText {
    margin: spacing(x0.5) spacing(x2) 0 spacing(x2);
}

.c-stampCard1-subStatusText {
    color: $stampCard-subStatus-colour;
    margin-bottom: spacing();
}

.c-stampCard1-expiryInfo {
    color: $stampCard-expiryInfo-colour;
}

.c-stampCard1-stamps {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 10px;

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        padding-top: 0;
    }
}

.c-stampCard1-stamp {
    position: relative;
    height: 0;
    width: 45px;
    padding: 0 0 100%;

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        width: 40px;
    }
}

.c-stampCard1-stampImage {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    &#{&} { // to increase specificity level to override svg:not(:root) rule
        overflow: visible;
    }
}
</style>
