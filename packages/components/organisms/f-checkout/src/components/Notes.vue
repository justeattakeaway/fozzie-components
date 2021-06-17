<template>
    <form-field
        :label-text="$t(`userNote.${serviceType}.title`)"
        input-type="textarea"
        :placeholder="$t(`userNote.${serviceType}.placeholder`)"
        :value="userNote"
        cols="30"
        rows="7"
        maxlength="200"
        name="Note"
        has-input-description
        @input="updateUserNote({ note: $event, type: 'restaurant' })">
        {{ $t(`userNote.${serviceType}.text`) }}
    </form-field>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FormField from '@justeat/f-form-field';
import '@justeat/f-form-field/dist/f-form-field.css';
import {
    VUEX_CHECKOUT_MODULE,
    CHEKOUT_ERROR_FORM_TYPE
} from '../constants';
import loggerMixin from '../mixins/logger.mixin';

export default {
    components: {
        FormField
    },
    mixins: [
        loggerMixin
    ],
    props: {
        errorFormType: {
            type: String,
            required: true
        },
        redirectUrl: {
            type: String,
            default: ''
        }
    },

    computed: {
        ...mapState(VUEX_CHECKOUT_MODULE, [
            'noteTypes'
        ])
    },

    mounted () {
        this.logInvoker({
            message: 'Consumer Checkout Error Page',
            data: {},
            logMethod: this.$logger.logWarn
        });
    },

    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateUserNote',
            'getUserNote',
            'saveUserNote'
        ]),

        redirectToMenu () {
            if (this.errorFormType === CHEKOUT_ERROR_FORM_TYPE.accessForbidden) {
                const cookieName = `je-mw-basket-${this.restaurant.id}`;
                const basketCookie = this.$cookies.get(cookieName);
                if (basketCookie) {
                    this.$cookies.remove(cookieName);
                }
            }

            window.location.assign(this.redirectUrl);
        }
    }
};
</script>

<style lang="scss" module>
.c-checkout-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &.c-checkout-error--verticalPadding {
        @include media('<=narrow') {
            border: none;
            padding-top: spacing(x2);
            padding-bottom: spacing(x2);
        }
    }
}

.c-checkout-error-heading {
    @include font-size(heading-s);
    margin-top: spacing(x8);
    margin-bottom: 0;
}

.c-checkout-error-description {
    @include font-size(body-l);
    margin-top: spacing();
}

.c-checkout-error-button {
    margin: spacing(x4) 0 spacing(x0.5);
}
</style>
