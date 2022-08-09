<template>
    <div
        :class="$style['c-mfa']"
        data-test-id="v-mfa-help-component">
        <f-card
            :class="$style['c-mfa-card']"
            has-inner-spacing-large
            has-outline
            data-test-id="f-mfa-help-card">
            <div :class="$style['c-mfa-card-content']">
                <bag-sad-bg-icon
                    :class="$style['c-mfa-icon']" />

                <h2 :class="$style['c-mfa-heading']">
                    {{ $t('helpInfo.subTitle') }}
                </h2>

                <i18n
                    path="helpInfo.instructionsPrimaryText"
                    tag="p"
                    :class="$style['c-mfa-help-description']">
                    <strong>{{ email }}</strong>
                </i18n>

                <ul>
                    <li>{{ $t('helpInfo.instructionsPoint1Text') }}</li>
                    <li>{{ $t('helpInfo.instructionsPoint2Text') }}</li>
                    <li>{{ $t('helpInfo.instructionsPoint3Text') }}</li>
                    <i18n
                        path="helpInfo.instructionsPoint4Text"
                        tag="li">
                        <a :href="$t('helpInfo.instructionsHelpCentreLink')">{{ $t('helpInfo.instructionsHelpCentreText') }}</a>
                    </i18n>
                </ul>

                <f-button
                    :class="$style['c-mfa-primaryButton']"
                    action-type="button"
                    button-size="large"
                    is-full-width
                    data-test-id="mfa-help-enter-code-button"
                    @click="$emit('primary-button-click')">
                    {{ $t('helpInfo.primaryButtonText') }}
                </f-button>

                <f-button
                    :class="$style['c-mfa-secondaryButton']"
                    button-type="link"
                    button-size="large"
                    data-test-id="mfa-help-login-link">
                    {{ $t('helpInfo.secondaryButtonText') }}
                </f-button>
            </div>
        </f-card>
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';

import FCard from '@justeat/f-card';
import '@justeat/f-card/dist/f-card.css';
import FButton from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';

import {
    BagSadBgIcon
} from '@justeat/f-vue-icons';
import tenantConfigs from '../tenants';

export default {
    name: 'VMfa',

    components: {
        FCard,
        FButton,
        BagSadBgIcon
    },

    mixins: [VueGlobalisationMixin],

    props: {
        email: {
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
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-mfa {
    margin: auto;
    max-width: 600px;
}

.c-mfa-heading {
    margin-top: 0;
}

.c-mfa-heading,
.c-mfa-description {
    text-align: center;
}

.c-mfa-icon {
    transform: translate(10%);
    margin: -#{f.spacing(g)} 0 -#{f.spacing(d)};
    width: 212px;
}

.c-mfa-card {
    @include f.media('>=narrow') {
        box-shadow: f.$elevation-01;
    }
}

.c-mfa-card-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 392px;
    margin: 0 auto;
}

.c-mfa-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.c-mfa-formField {
    width: 100%;
    margin-top: f.spacing(f);
}

.c-mfa-submitButton {
    margin: f.spacing(f) 0;
}

.c-mfa-submit-error {
    width: 100%;
    margin-top: f.spacing(f);
}

.c-mfa-need-help-link {
    margin-bottom: f.spacing(d);
}
</style>
