<template>
    <div :class="$style['c-checkout-address-alert-container']">
        <alert-component
            type="info"
            :heading="$t('warningMessages.addressAlert.title')"
            :class="$style['c-checkout-address-alert']">
            {{ $t(`warningMessages.addressAlert.body`) }}
        </alert-component>
    </div>
</template>

<script>
import AlertComponent from '@justeat/f-alert';
import '@justeat/f-alert/dist/f-alert.css';

export default {
    name: 'AddressAlert',

    components: {
        AlertComponent
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;
.c-checkout-address-alert-container {
    width: 100%;
    display: flex;
    justify-content: center;
}
.c-checkout-address-alert {
    width: 100%;
    max-width: 470px;
    margin: f.spacing(e) f.spacing(f);
    margin-bottom: -12px;

    @include f.media('<narrow') {
        margin-bottom: 0; // Top margin has disappeared so no need to reduce it
    }

    @include f.media('>=narrowMid') {
        margin: f.spacing(g) auto calc(f.spacing(c) - f.spacing(g)); // Eat 28px from f-card's top margin to reduce it to 12px
    }
}
</style>
