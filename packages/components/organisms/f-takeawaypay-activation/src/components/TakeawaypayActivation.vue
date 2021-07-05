<template>
    <div :class="$style['c-takeawaypayActivation']">
        <card-component
            is-rounded
            is-page-content-wrapper
            card-heading-position="center"
            data-test-id="takeawaypay-activation-component"
            :class="$style['c-takeawaypayActivation-card']">
            <activation-logged-in
                :login-url="loginUrl"
                :registration-url="registrationUrl" />
            <activation-not-logged-in
                :login-url="loginUrl"
                :registration-url="registrationUrl" />
            <activation-successful
                :home-url="homeUrl" />
            <activation-failed />
        </card-component>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import tenantConfigs from '../tenants';
import ActivationLoggedIn from './ActivationLoggedIn.vue';
import ActivationNotLoggedIn from './ActivationNotLoggedIn.vue';
import ActivationSuccessful from './ActivationSuccessful.vue';
import ActivationFailed from './ActivationFailed.vue';

export default {

    components: {
        CardComponent,
        ActivationLoggedIn,
        ActivationNotLoggedIn,
        ActivationSuccessful,
        ActivationFailed
    },

    mixins: [
        VueGlobalisationMixin
    ],

    props: {
        loginUrl: {
            type: String,
            required: true
        },
        registrationUrl: {
            type: String,
            required: true
        },
        homeUrl: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            tenantConfigs
        };
    }
};
</script>

<style lang="scss" module>

.c-takeawaypayActivation {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    font-family: $font-family-base;
    @include font-size(heading-m);
    text-align: center;
}

    .c-takeawaypayActivation-card {
        position: relative;

        @include media('>=narrow') {
            box-shadow: 0 1px 1px 0 rgba($color-black, 0.03), 0 2px 1px -1px rgba($color-black, 0.07), 0 1px 3px 0 rgba($color-black, 0.06);
        }
    }

</style>
