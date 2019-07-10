<template>
    <paypal-icon />
</template>

<script>
import PaypalIcon from '@justeat/f-icons/src/img/icons/cards/paypal.svg';
import iconsMixin from '../../mixins/icons.mixin';

export default {
    components: {
        PaypalIcon
    },

    mixins: [iconsMixin]
}
</script>
