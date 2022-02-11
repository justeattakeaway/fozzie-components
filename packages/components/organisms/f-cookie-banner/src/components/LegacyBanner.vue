<template>
    <div>
        <div
            :class="[$style['c-cookieWarning'], { [$style['c-cookieWarning--is-hidden']]: shouldHideLegacyBanner }]"
            :aria-hidden="shouldHideLegacyBanner"
            data-test-id="legacyCookieBanner-component">
            <div :class="$style['c-cookieWarning-inner']">
                <p>
                    {{ legacyBannerText }}
                    <a
                        class="c-cookieWarning-link"
                        data-test-id="cookie-policy-link"
                        :href="cookiePolicyLinkUrl">
                        {{ legacyBannerLinkText }}
                    </a>
                </p>
                <button
                    :class="[$style['c-cookieWarning-btn']]"
                    data-test-id="cookieBanner-close-button"
                    aria-label="Close"
                    type="button"
                    @click="$emit('hide-legacy-banner')">
                    <span class="is-visuallyHidden">
                        {{ legacyBannerCloseBannerText }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        shouldHideLegacyBanner: {
            type: Boolean,
            default: false
        },
        legacyBannerText: {
            type: String,
            required: true
        },
        cookiePolicyLinkUrl: {
            type: String,
            required: true
        },
        legacyBannerLinkText: {
            type: String,
            required: true
        },
        legacyBannerCloseBannerText: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" module>
    .c-cookieWarning {
        box-sizing: border-box;
        background-color: $color-grey;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        z-index: 99999990;
    }

    .c-cookieWarning-inner {
        margin: 0 auto;
        padding: spacing() spacing(e) spacing() spacing();
        overflow: hidden;

            p {
                @include font-size(caption);
                color: $color-white;
                text-align: center;
                margin: 0 auto;

                    a {
                        color: $color-white;
                    }
            }

            button {
                text-size-adjust: 100%;
                font-size: 100%;
                line-height: 1.15;
                margin: 0;
                display: block;
                position: absolute;
                top: 12px;
                right: 8px;
                width: 10px;
                height: 10px;
                background: url('https://dy3erx8o0a6nh.cloudfront.net/images/icon-close-banner.png') no-repeat 50%;
                background-size: 10px 10px;
                border: none;
                cursor: pointer;
            }
    }

    .c-cookieWarning--is-hidden {
        display: none;
    }
</style>
