<template>
    <div :class="$style['c-takeawaypayActivation']">
        <card-component
            is-rounded
            is-page-content-wrapper
            card-heading-position="center"
            data-test-id="takeawaypay-activation-component"
            :class="$style['c-takeawaypayActivation-card']">
            <component
                :is="activationStateComponent.name"
                ref="activationStateComponent"
                v-bind="activationStateComponent.props"
                @activation-result="handleActivationResult" />
        </card-component>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import CardComponent from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import tenantConfigs from '../tenants';
import ActivationLoggedIn from './ActivationLoggedIn.vue';
import ActivationNotLoggedIn from './ActivationNotLoggedIn.vue';
import ActivationSuccessful from './ActivationSuccessful.vue';
import ActivationFailed from './ActivationFailed.vue';
import TakeawaypayActivationServiceApi from '../services/TakeawaypayActivationServiceApi';
import {
    ACTIVATION_STATE_NONE,
    ACTIVATION_STATE_AVAILABLE_LOGGED_IN,
    ACTIVATION_STATE_AVAILABLE_NOT_LOGGED_IN,
    ACTIVATION_STATE_SUCCEEDED,
    ACTIVATION_STATE_FAILED,
    USER_ROLE_GUEST
} from '../constants';

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
        getActivationStatusUrl: {
            type: String,
            required: true
        },
        activateUrl: {
            type: String,
            required: true
        },
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
        },
        authToken: {
            type: String,
            default: ''
        },
        employeeId: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            tenantConfigs,
            consumerId: '',
            consumerEmail: '',
            consumerGivenName: '',
            consumerRole: '',
            activationState: ACTIVATION_STATE_NONE
        };
    },

    computed: {
        activationStateComponent () {
            if (this.activationState === ACTIVATION_STATE_AVAILABLE_LOGGED_IN) {
                return this.activationLoggedIn;
            }

            if (this.activationState === ACTIVATION_STATE_AVAILABLE_NOT_LOGGED_IN) {
                return this.activationNotLoggedIn;
            }

            if (this.activationState === ACTIVATION_STATE_SUCCEEDED) {
                return this.activationSucceeded;
            }
            return this.activationFailed;
        },

        activationFailed () {
            return {
                name: 'activation-failed',
                props: {
                    redirectUrl: this.redirectUrl
                }
            };
        },

        activationSucceeded () {
            return {
                name: 'activation-successful',
                props: {
                    homeUrl: this.homeUrl
                }
            };
        },

        activationLoggedIn () {
            return {
                name: 'activation-logged-in',
                props: {
                    loginUrl: this.loginUrl,
                    registrationUrl: this.registrationUrl,
                    activateUrl: this.activateUrl,
                    authToken: this.authToken,
                    consumerId: this.consumerId,
                    consumerEmail: this.consumerEmail,
                    consumerGivenName: this.consumerGivenName,
                    employeeId: this.employeeId
                }
            };
        },

        activationNotLoggedIn () {
            return {
                name: 'activation-not-logged-in',
                props: {
                    loginUrl: this.loginUrl,
                    registrationUrl: this.registrationUrl
                }
            };
        }
    },

    async mounted () {
        await this.initialize();
    },

    methods: {
        async initialize () {
            const available = await TakeawaypayActivationServiceApi.isActivationAvailable(this.getActivationStatusUrl, this.employeeId, this.$store, this.$logger);

            if (available) {
                this.determineActivationState();
            } else {
                this.activationState = ACTIVATION_STATE_FAILED;
            }
        },

        extractConsumerDetails () {
            const tokenData = jwtDecode(this.authToken);
            this.consumerId = tokenData.sub;
            this.consumerEmail = tokenData.email;
            this.consumerGivenName = tokenData.given_name;
            this.consumerRole = (tokenData.role || '').toLowerCase();
        },

        determineActivationState () {
            if (this.authToken) {
                this.extractConsumerDetails();
                this.activationState = this.consumerRole === USER_ROLE_GUEST ?
                    ACTIVATION_STATE_AVAILABLE_NOT_LOGGED_IN :
                    ACTIVATION_STATE_AVAILABLE_LOGGED_IN;
            } else {
                this.activationState = ACTIVATION_STATE_AVAILABLE_NOT_LOGGED_IN;
            }
        },

        handleActivationResult (successful) {
            this.activationState = successful ? ACTIVATION_STATE_SUCCEEDED : ACTIVATION_STATE_FAILED;
        }
    }
};
</script>

<style lang="scss" module>

.c-takeawaypayActivation {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    margin: auto;
    font-family: $font-family-base;
    @include font-size(heading-m);
    text-align: center;

    @include media('>=narrow') {
        width: 80vw;
    }
}

    .c-takeawaypayActivation-card {
        position: relative;

        @include media('>=narrow') {
            box-shadow: 0 1px 1px 0 rgba($color-black, 0.03), 0 2px 1px -1px rgba($color-black, 0.07), 0 1px 3px 0 rgba($color-black, 0.06);
        }
    }

</style>
