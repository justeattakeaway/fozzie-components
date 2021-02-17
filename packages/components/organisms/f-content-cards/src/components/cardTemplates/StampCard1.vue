<template>
    <component
        :is="url ? 'a' : 'div'"
        :href="url"
        :data-test-id="testId"
        :class="[
            $style['c-stampCard1']
        ]"
        @click="onClickContentCard"
    >
        <div
            :class="[
                $style['c-stampCard1-headerDetails']
            ]"
        >
            <img
                :class="[
                    $style['c-stampCard1-icon']
                ]"
                :data-test-id="testIdForSection('image')"
                :src="image"
                :alt="title"
            >
            <h3
                :class="[
                    $style['c-stampCard1-title']
                ]"
                :data-test-id="testIdForSection('title')"
            >
                {{ title }}
            </h3>

            <p
                :class="[
                    $style['c-stampCard1-statusText']
                ]"
                :data-test-id="testIdForSection('statusText')"
                v-html="statusText"
            />
        </div>
        <div
            v-if="isReadyToClaim"
            :class="[
                $style['c-stampCard1-redemptionDetails']
            ]"
            :data-test-id="testIdForSection('redemptionDetails')"
        >
            <div
                v-for="(subStatusLine, index) in subStatusText"
                :key="index"
                :class="[
                    $style['c-stampCard1-subStatusText']
                ]"
                :data-test-id="testIdForSection('subStatusText', index)"
            >
                {{ subStatusLine }}
            </div>
            <div
                :class="[
                    $style['c-stampCard1-expiryInfo']
                ]"
                :data-test-id="testIdForSection('expiryInfo')"
            >
                {{ expiryLine }}
            </div>
        </div>
        <div
            v-else
            :class="[
                $style['c-stampCard1-stamps']
            ]"
            :data-test-id="testIdForSection('stamps')"
        >
            <div
                v-for="({ stampImage, classSuffix }, index) in stamps"
                :key="index"
            >
                <div
                    :class="[
                        $style[`c-stampCard1-stamp`]
                    ]"
                    :data-test-id="testIdForSection(`stamp${classSuffix}`)"
                >
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
    </component>
</template>

<script>
import EmptyStamp from './images/stamp-empty-15.svg';
import FullStamp from './images/stamp-full-15.svg';

export default {
    name: 'StampCard1',

    components: {
        EmptyStamp,
        FullStamp
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

    computed: {
        title () {
            return this.card.title;
        },
        description () {
            return this.card.description;
        },
        image () {
            return this.card.image;
        },
        url () {
            return this.card.url;
        },
        discountPercentage () {
            return this.card.discountPercentage;
        },
        earnedStamps () {
            return this.card.earnedStamps;
        },
        expiryDate () {
            return this.card.expiryDate;
        },
        expiryLine () {
            return this.card.expiryLine;
        },
        isReadyToClaim () {
            return !!this.card.isReadyToClaim;
        },
        totalRequiredStamps () {
            // TBC by product - currently this.card.totalRequiredStamps is provided but we have no way of catering for
            // any amount other than 5 here
            return 5;
        },
        stamps () {
            const stamps = [];

            for (let i = 0; i < this.totalRequiredStamps; i++) {
                const full = (i < this.earnedStamps);
                stamps.push(full ? {
                    stampImage: 'FullStamp',
                    classSuffix: 'Full'
                } : {
                    stampImage: 'EmptyStamp',
                    classSuffix: 'Empty'
                });
            }

            return stamps;
        },
        statusText () {
            return this.description[0];
        },
        subStatusText () {
            return this.description.slice(1);
        },

        testIdForSection () {
            return (section, index) => (this.testId
                ? `${this.testId}--${section}${index === undefined ? '' : `--${index}`}`
                : false);
        }
    },

    mounted () {
        this.onViewContentCard();
    },

    inject: [
        'emitCardView',
        'emitCardClick'
    ],

    methods: {
        onViewContentCard () {
            this.emitCardView(this.card);
        },

        onClickContentCard () {
            this.emitCardClick(this.card);
        }
    }
};
</script>

<style lang="scss" module>

$stampCard-subStatus-colour: #017a39; /* $color-green in PIE - not in fozzie-colour-palette yet */
$stampCard-expiryInfo-colour: $grey--dark;

$stampCard-responsive-mobileViewBreakpoint: '<narrowMid';

.c-stampCard1 {
    text-decoration: initial;
    width: 392px;
    display: flex;
    flex-direction: column;
    padding: spacing(x2);
    border-radius: $border-radius;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.03),
    0 3px 1px -2px rgba(0, 0, 0, 0.07),
    0 1px 5px 0 rgba(0, 0, 0, 0.06);

    &,
    &:hover,
    &:visited,
    &:focus {
        color: $color-text;
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
    width: spacing(x7);
    height: spacing(x7);
    border-radius: $border-radius;

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        width: spacing(x6);
        height: spacing(x6);
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
}

.c-stampCard1-stampEmpty { /* Required to handle positioning of `empty` SVG relative to the 'full' graphic */
    margin-top: 5px;
    height: 89%;
    width: 89%;

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        margin-top: 4.5px;
    }
}
</style>
