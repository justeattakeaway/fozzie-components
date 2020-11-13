<template>
    <div
        :class="[$style['c-cookieBanner'], $style['cpOverlay']]"
        attr="data-cookie-consent-overlay">
        <div :class="$style['cpBanner']">
            <div
                id="dialog1"
                :class="$style['cpBanner-content']"
                role="dialog"
                aria-labelledby="cookieConsentLabel"
                aria-modal="true">
                <h2
                    id="cookieConsentLabel"
                    :class="$style['cpBanner-title']">
                    <a
                        name="cookieConsentTitle"
                        tabindex="-1"
                        data-consent-title>{{ copy.mainTitle }}</a>
                </h2>
                <p :class="$style['cpBanner-text']">
                    {{ copy.text1 }}
                </p>
                <p :class="$style['cpBanner-text']">
                    {{ copy.text2 }}
                </p>
                <p :class="[$style['cpBanner-text'], $style['cpBanner-text--last']]">
                    {{ copy.text3 }}
                    <a
                        :href="copy.linkHref"
                        :class="$style['cpBanner-link']"
                        target="_blank">{{ copy.linkText }}</a>
                    {{ copy.text4 }}
                </p>
            </div>
            <div :class="$style['cpBanner-CTA']">
                <button
                    :class="[$style['cpBanner-button'], $style['cpBanner-button--accept']]"
                    tabindex="0"
                    role="button"
                    data-button-accept>
                    {{ copy.buttonText2 }}
                </button>
                <button
                    :class="[$style['cpBanner-button'], $style['cpBanner-button--nonAccept']]"
                    tabindex="0"
                    role="button"
                    data-button-nonaccept>
                    {{ copy.buttonText1 }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import tenantConfigs from '../tenants';

export default {
    name: 'CookieBanner',
    components: {},
    props: {
        locale: {
            type: String,
            default: 'en-GB'
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
        };
    }
};

</script>

<style lang="scss" module>
.c-cookieBanner {
    font-family: $font-family-base;
    @include font-size(heading-m);
}

.cpOverlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99999991;
}

.cpBanner {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999992;
    display: flex;
    flex-direction: row;
}

.cpBanner-content,
.cpBanner-CTA {
    padding: 32px;
    margin: 0 auto;
}

.cpBanner-CTA {
    width: 352px;
}

.cpBanner-title {
    font-size: 24px;
    font-weight: 600;
    margin: 8px 0;
    padding: 0;
    color: #2a3846;
}

.cpBanner-text {
    font-size: 14px;
    margin: 0;
    padding: 0;
    color: #2a3846;
}

.cpBanner-link {
    color: #125fca;
}

.cpBanner-button {
    padding: 12px 1em;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 2px;
    width: 288px;
}

.cpBanner-button--accept {
    color: #fff;
    background-color: #125fca;
}

.cpBanner-button--nonAccept {
    color: #125fca;
    background-color: #fff;
}

.hideCPBanner {
    display: none;
}

@media (max-width: 768px) {
    .cpBanner {
        flex-direction: column;
        padding: 16px 0;
    }

    .cpBanner-content,
    .cpBanner-CTA {
        padding: 4px 24px;
    }

    .cpBanner-CTA {
        width: initial;
        display: flex;
        flex-direction: row-reverse;
        margin: 0;
    }

    .cpBanner-button {
        width: initial;
    }
}

@media (max-width: 600px) {
    .cpBanner-content,
    .cpBanner-CTA {
        padding: 4px 16px;
    }

    .cpBanner-title {
        font-size: 20px;
    }

    .cpBanner-CTA {
        display: block;
        margin: 0 auto;
        width: 320px;
    }

    .cpBanner-button {
        width: 276px;
    }
}
</style>
