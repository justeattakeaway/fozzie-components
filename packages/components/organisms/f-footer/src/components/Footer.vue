<template>
    <footer
        :data-theme="theme"
        class="c-footer"
        data-test-id="footer-component">
        <div
            class="c-footer-container c-footer-row c-footer-row--noPadBelowWide">
            <link-list
                v-for="(linkList, i) in copy.linkLists"
                :key="i + '_ButtonList'"
                :link-list="linkList" />
        </div>

        <div class="c-footer-light">
            <div class="c-footer-container">
                <div
                    v-if="copy.linkButtonList.length && showCourierLinks"
                    data-test-id="courierLinks-wrapper"
                    class="c-footer-row c-footer-row--noBottomPad">
                    <button-list
                        v-for="(buttonList, i) in copy.linkButtonList"
                        :key="i + '_ButtonList'"
                        :button-list="buttonList" />
                </div>

                <div class="c-footer-row">
                    <icon-list
                        :title="copy.downloadOurApps"
                        :icons="copy.appStoreIcons"
                        :locale="copy.locale"
                        is-apps />

                    <feedback-block
                        :title="copy.feedback"
                        :text="copy.improveOurWebsite"
                        :button-text="copy.sendFeedback" />

                    <icon-list
                        :icons="copy.socialIcons"
                        :title="copy.followUs"
                        is-social />
                </div>
            </div>
        </div>

        <div
            :class="['c-footer-container c-footer-row c-footer-row--combined c-footer-row--notEqualTopAndBottomPad c-footer-row--noPadBelowWide',
                     { 'c-footer-row--rightAlignedAboveWide': !showCountrySelector }]">
            <country-selector
                v-if="showCountrySelector"
                data-test-id="country-selector"
                :current-country-name="copy.currentCountryName"
                :current-country-key="copy.currentCountryKey"
                :countries="countryList"
                :change-country-text="copy.changeCurrentCountry" />

            <legal-field
                v-if="metaLegalFieldEnabled"
                :class="[{ 'c-footer-row-item--fullWidthAboveWide': !showCountrySelector }]"
                :info="copy.metaLegalField" />

            <icon-list
                :icons="copy.paymentIcons"
                is-payments />
        </div>
    </footer>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import ButtonList from './ButtonList.vue';
import CountrySelector from './CountrySelector.vue';
import FeedbackBlock from './FeedbackBlock.vue';
import IconList from './IconList.vue';
import LegalField from './LegalField.vue';
import LinkList from './LinkList.vue';
import { tenantConfigs, countries } from '../tenants';

export default {
    components: {
        ButtonList,
        CountrySelector,
        FeedbackBlock,
        IconList,
        LegalField,
        LinkList
    },
    props: {
        locale: {
            type: String,
            default: ''
        },

        showCourierLinks: {
            type: Boolean,
            default: true
        },
        showCountrySelector: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        footerLocale () {
            return globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        },
        copy () {
            const localeConfig = tenantConfigs[this.footerLocale];
            return localeConfig;
        },
        theme () {
            return globalisationServices.getTheme(this.footerLocale);
        },
        metaLegalFieldEnabled () {
            return Object.keys(this.copy.metaLegalField).length > 0;
        },
        countryList () {
            return countries.filter(country => country.key !== this.copy.currentCountryKey);
        }
    }
};
</script>

<style lang="scss">

$footer-heading-font-size: 'heading-s';

.c-footer {
    background-color: $footer-bgColor;
    color: $footer-textColor;
}

.c-footer-light {
    background-color: $footer-bgLight;
}

.c-footer-container {
    width: 100%;
    max-width: #{$layout-max-width}px;
    margin: 0 auto;
}

.c-footer-heading {
    @include font-size($footer-heading-font-size);
    font-family: $font-family-base;
    font-weight: $font-weight-headings;
    padding: spacing(x2);
    padding-left: 0;
}

.c-footer-heading--shortBelowWide {
    @include media('<wide') {
        padding: 0 0 spacing();
    }
}

.c-footer-heading--button {
    align-items: center;
    background: none;
    border-style: none;
    color: $color-headings;
    display: flex;
    font-weight: $font-weight-headings;
    justify-content: space-between;
    margin: 0;
    padding: spacing(x2);
    text-align: left;
    width: 100%;
    @include font-size($footer-heading-font-size);

    @include media('<wide') {
        cursor: pointer;
    }

    @include media('>=wide') {
        padding: 0;
    }
}

.c-footer-row {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding: spacing(x2);

    @include media('>=wide') {
        padding: spacing(x4);
        flex-flow: row nowrap;
    }
}

// this modifier allows children in the row to stay on one line
// if they fit together for screens smaller than 1025px
// standard c-footer-row splits children into separate rows for screens smaller than 1025px
.c-footer-row--combined {
    flex-flow: row wrap;

    @include media('>=wide') {
        flex-flow: row nowrap;
    }
}

.c-footer-row--notEqualTopAndBottomPad {
    padding-top: 20px;
    padding-bottom: 40px;
}

.c-footer-row--noPadBelowWide {
    @include media('<wide') {
        padding: 0;
    }
}

.c-footer-row--noBottomPad {
    padding-bottom: 0;
}

.c-footer-row--rightAlignedAboveWide {
    justify-content: flex-end;

    @include media('<wide') {
        justify-content: flex-start;
    }
}

.c-footer-row-item--fullWidthAboveWide {
    @include media('>=wide') {
        flex: 1;
    }
}

.c-footer-list {
    padding: 0;
    list-style: none;
    list-style-image: none;
    margin-top: 0;
    margin-bottom: spacing(x2);
    margin-left: spacing(x2);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    & > li {
        margin-bottom: 0;

        &:before {
            content: none;
        }
    }

    @include media('>=wide') {
        margin: spacing(x2) 0 0 0;
    }

    .is-collapsed & {
        display: none;
    }
}

.c-footer-list--inline {
    margin: 0 0 spacing(x2);
    align-items: center;
    flex-flow: row wrap;

    @include media('>=wide') {
        margin-bottom: 0;
    }
}

.c-footer-list--noBottomMargin {
    margin-bottom: 0;
}

</style>
