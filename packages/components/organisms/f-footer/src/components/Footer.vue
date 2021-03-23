<template>
    <footer
        :data-theme="theme"
        :class="$style['c-footer']"
        data-test-id="footer-component">
        <div
            :class="[
                $style['c-footer-container'],
                $style['c-footer-row'],
                $style['c-footer-row--noPadBelowWide']
            ]">
            <link-list
                v-for="(linkList, i) in copy.linkLists"
                :key="i + '_ButtonList'"
                :link-list="linkList" />
        </div>

        <div :class="$style['c-footer-light']">
            <div :class="$style['c-footer-container']">
                <div
                    v-if="copy.linkButtonList.length && showCourierLinks"
                    data-test-id="courierLinks-wrapper"
                    :class="[
                        $style['c-footer-row'],
                        $style['c-footer-row--noBottomPad']
                    ]">
                    <button-list
                        v-for="(buttonList, i) in copy.linkButtonList"
                        :key="i + '_ButtonList'"
                        :button-list="buttonList" />
                </div>

                <div :class="$style['c-footer-row']">
                    <icon-list
                        :title="copy.downloadOurApps"
                        :icons="copy.appStoreIcons"
                        :locale="copy.locale"
                        list-type="apps" />

                    <feedback-block
                        :title="copy.feedback"
                        :text="copy.improveOurWebsite"
                        :button-text="copy.sendFeedback"
                        data-test-id="feedbackLinks-wrapper" />

                    <icon-list
                        :icons="copy.socialIcons"
                        :title="copy.followUs"
                        list-type="social" />
                </div>
            </div>
        </div>

        <div
            :class="[
                $style['c-footer-container'],
                $style['c-footer-row'],
                $style['c-footer-row--combined'],
                $style['c-footer-row--notEqualTopAndBottomPad'],
                $style['c-footer-row--noPadBelowWide'],
                { [$style['c-footer-row--rightAlignedAboveWide']]: !showCountrySelector }
            ]">
            <country-selector
                v-if="showCountrySelector"
                data-test-id="country-selector"
                :current-country-name="copy.currentCountryName"
                :current-country-key="copy.currentCountryKey"
                :countries="countryList"
                :change-country-text="copy.changeCurrentCountry" />

            <legal-field
                v-if="metaLegalFieldEnabled"
                :class="{ [$style['c-footer-row-item--fullWidthAboveWide']]: !showCountrySelector }"
                :info="copy.metaLegalField" />

            <icon-list
                :icons="copy.paymentIcons"
                list-type="payments" />
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

<style lang="scss" module>
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
</style>
