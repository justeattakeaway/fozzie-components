<template>
    <component :is="iconType" />
</template>

<script>
// Social and Payment icons
import {
    SocialFacebookIcon as FacebookIcon,
    SocialTwitterIcon as TwitterIcon,
    SocialYoutubeIcon as YoutubeIcon,
    SocialPinterestIcon as PinterestIcon,
    SocialInstagramIcon as InstagramIcon,
    SocialRssIcon as RssIcon,
    PaymentAmexIcon as AmexIcon,
    PaymentAmexSafekeyIcon as AmexSafekeyIcon,
    PaymentDankortIcon as DankortIcon,
    PaymentInteracIcon as InteracIcon,
    PaymentMaestroIcon as MaestroIcon,
    PaymentMastercardIcon as MastercardIcon,
    PaymentMastercardSecurecodeIcon as MastercardSecurecodeIcon,
    PaymentPaypalIcon as PaypalIcon,
    PaymentVisaIcon as VisaIcon,
    PaymentVisaTransparentNarrowIcon as VisaVerifiedIcon
} from '@justeat/f-vue-icons';
import iconPropsMixin from '../mixins/iconProps.mixin';

export default {
    components: {
        FacebookIcon,
        TwitterIcon,
        YoutubeIcon,
        PinterestIcon,
        InstagramIcon,
        RssIcon,
        AmexIcon,
        AmexSafekeyIcon,
        DankortIcon,
        InteracIcon,
        MaestroIcon,
        MastercardIcon,
        MastercardSecurecodeIcon,
        PaypalIcon,
        VisaIcon,
        VisaVerifiedIcon
    },

    mixins: [
        iconPropsMixin
    ],

    computed: {
        iconType () {
            return `${this.name}-icon`;
        }
    }
};
</script>
