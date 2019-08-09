<template>
    <component
        :is="iconType" />
</template>

<script>
// Social
import FacebookIcon from '../social/FacebookIcon.vue';
import TwitterIcon from '../social/TwitterIcon.vue';
import YoutubeIcon from '../social/YoutubeIcon.vue';
import PinterestIcon from '../social/PinterestIcon.vue';
import InstagramIcon from '../social/InstagramIcon.vue';
import RssIcon from '../social/RssIcon.vue';
// Payments
import AmexIcon from '../payment/AmexIcon.vue';
import AmexSafekeyIcon from '../payment/AmexSafekeyIcon.vue';
import DankortIcon from '../payment/DankortIcon.vue';
import InteracIcon from '../payment/InteracIcon.vue';
import MaestroIcon from '../payment/MaestroIcon.vue';
import MastercardIcon from '../payment/MastercardIcon.vue';
import MastercardSecurecodeIcon from '../payment/MastercardSecurecodeIcon.vue';
import PaypalIcon from '../payment/PaypalIcon.vue';
import VisaIcon from '../payment/VisaIcon.vue';
import VisaVerifiedIcon from '../payment/VisaVerifiedIcon.vue';

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
    props: {
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        iconType () {
            return `${this.name}-icon`;
        }
    }
};
</script>
