<template>
    <component
        :is="iconType" />
</template>

<script>
// Social
import FacebookIcon from '../social/FacebookIcon/FacebookIcon.vue';
import TwitterIcon from '../social/TwitterIcon/TwitterIcon.vue';
import YoutubeIcon from '../social/YoutubeIcon/YoutubeIcon.vue';
import PinterestIcon from '../social/PinterestIcon/PinterestIcon.vue';
import InstagramIcon from '../social/InstagramIcon/InstagramIcon.vue';
import RssIcon from '../social/RssIcon/RssIcon.vue';
// Payments
import AmexIcon from '../payment/AmexIcon/AmexIcon.vue';
import AmexSafekeyIcon from '../payment/AmexSafekeyIcon/AmexSafekeyIcon.vue';
import DankortIcon from '../payment/DankortIcon/DankortIcon.vue';
import InteracIcon from '../payment/InteracIcon/InteracIcon.vue';
import MaestroIcon from '../payment/MaestroIcon/MaestroIcon.vue';
import MastercardIcon from '../payment/MastercardIcon/MastercardIcon.vue';
import MastercardSecurecodeIcon from '../payment/MastercardSecurecodeIcon/MastercardSecurecodeIcon.vue';
import PaypalIcon from '../payment/PaypalIcon/PaypalIcon.vue';
import VisaIcon from '../payment/VisaIcon/VisaIcon.vue';
import VisaVerifiedIcon from '../payment/VisaVerifiedIcon/VisaVerifiedIcon.vue';

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
