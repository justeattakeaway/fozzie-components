<template>
    <div>
        <div
            :class="[$style['c-cookieWarning'], { [$style['c-cookieWarning--is-hidden']]: shouldHideLegacyBanner }]"
            :aria-hidden="shouldHideLegacyBanner">
            <div :class="$style['c-cookieWarning-inner']">
                <p>
                    {{ $t('legacyBannerText') }}
                    <a
                        class="c-cookieWarning-link"
                        :href="$t('cookiePolicyLinkUrl')">
                        {{ $t('legacyBannerLinkText') }}
                    </a>
                </p>
                <button-component
                    type="button"
                    :class="[$style['c-cookieWarning-btn']]"
                    button-type="icon"
                    button-size="xsmall"
                    data-test-id="cookieBanner-close-button"
                    aria-label="Close"
                    @click.native="$emit('hide-legacy-banner')">
                    <cross-icon />
                    <span class="is-visuallyHidden">
                        {{ $t('legacyBannerCloseBannerText') }}
                    </span>
                </button-component>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import { CrossIcon } from '@justeat/f-vue-icons';

export default {
    components: {
        ButtonComponent,
        CrossIcon
    },
    props: {
        shouldHideLegacyBanner: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" module>
    .c-cookieWarning {
        box-sizing: border-box;
        background-color: $grey--darkest;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        z-index: 99999990;
    }

    .c-cookieWarning-inner {
        margin: 0 auto;
        padding: spacing() spacing(x3) spacing() spacing();
        overflow: hidden;

            p {
                @include font-size(caption);
                color: $white;
                text-align: center;
                margin: 0 auto;

                    a {
                        color: $white;
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
                background: url('//dy3erx8o0a6nh.cloudfront.net/images/icon-close-banner.png') no-repeat 50%;
                background-size: 10px 10px;
                border: none;
                cursor: pointer;
            }
    }

    .c-cookieWarning--is-hidden {
        display: none;
    }
</style>
