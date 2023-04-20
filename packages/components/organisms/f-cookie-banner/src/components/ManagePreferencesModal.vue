<template>
    <div>
        hi

        <mega-modal
            is-open
            title="Manage your preferences"
            title-size="medium"
            class
            close-button-style="chevron">
            <form :class="$style['c-manageYourPreferences-form']">
                <p>You can find all the information in the <a href="">Cookie Statement</a> and <a href="">Cookie technology list</a>.</p>
                <fieldset :class="$style['c-manageYourPreferences-fieldset']">
                    <div>
                        <legend
                            id="labelID"
                            :class="$style['c-manageYourPreferences-legend']"
                        >
                            Necessary
                        </legend>
                        <p id="descriptionID">
                            These cookies allow the website to remember the choices you make to give you better functionality and personal features.
                        </p>
                    </div>
                    <f-switch
                        name="Necessary"
                        aria-labelledby="labelID"
                        ari-describedby="descriptionID"
                    />
                </fieldset>

                <fieldset :class="$style['c-manageYourPreferences-fieldset']">
                    <div>
                        <legend
                            id="labelID-F"
                            :class="$style['c-manageYourPreferences-legend']"
                        >
                            Functional
                        </legend>
                        <p id="descriptionID-F">
                            These cookies allow the website to remember the choices you make to give you better functionality and personal features.
                        </p>
                    </div>
                    <f-switch
                        name="Functional"
                        aria-labelledby="labelID-F"
                        ari-describedby="descriptionID-F"
                    />
                </fieldset>

                <fieldset :class="$style['c-manageYourPreferences-fieldset']">
                    <div>
                        <legend
                            id="labelID-A"
                            :class="$style['c-manageYourPreferences-legend']"
                        >
                            Analytical
                        </legend>
                        <p id="descriptionID-A">
                            These analytical cookies, including statistics, are used to understand how visitors interact with the website and we can measure and improve the performance of our website.
                        </p>
                    </div>
                    <f-switch
                        name="Analytical"
                        aria-labelledby="labelID-A"
                        ari-describedby="descriptionID-A"
                    />
                </fieldset>

                <fieldset :class="$style['c-manageYourPreferences-fieldset']">
                    <div>
                        <legend
                            id="labelID=P"
                            :class="$style['c-manageYourPreferences-legend']"
                        >
                            Personalized (targeting and advertising)
                        </legend>
                        <p id="descriptionID-P">
                            These marketing cookies are used to tailor the delivery of information to you based upon your interest and to measure the effectiveness of such advertisements, both on our website and our advertising partners' websites.
                        </p>
                    </div>
                    <f-switch
                        name="Personalized"
                        aria-labelledby="labelID=P"
                        ari-describedby="descriptionID-P"
                    />
                </fieldset>
                <div
                    ref="buttonContainer"
                    :class="$style['c-manageYourPreferences-cta']">
                    <button-component
                        data-test-id="only-selected-preferences-button"
                        button-type="secondary"
                        button-size="small">
                        Only selected
                    </button-component>

                    <button-component
                        data-test-id="accept-all-preferences-button"
                        button-size="small">
                        Accept all
                    </button-component>
                </div>
            </form>
        </mega-modal>
    </div>
</template>

<script>
// import CookieHelper from 'js-cookie';
// import { globalisationServices } from '@justeat/f-services';
import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import FSwitch from '@justeat/f-switch';
import '@justeat/f-switch/dist/f-switch.css';
// import VLink from '@justeat/f-link';
// import '@justeat/f-link/dist/f-link.css';
// import LegacyBanner from './LegacyBanner.vue';
// import ReopenBannerLink from './ReopenBannerLink.vue';
// import tenantConfigs from '../tenants';
// import { LEGACY_CONSENT_COOKIE_NAME, CONSENT_COOKIE_NAME } from '../constants';

export default {
    components: {
        ButtonComponent,
        FSwitch,
        // LegacyBanner,
        MegaModal
        // ReopenBannerLink,
        // VLink
    },

    props: {

    },



    computed: {

    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-megaModal-title {
    font-size: 24px;
}
.c-manageYourPreferences-form {
    /* margin-top: 20px; */
    font-size: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.c-manageYourPreferences-fieldset {
    padding: 0;
    border: 0;
    display: flex;
    gap: 16px;
}

.c-manageYourPreferences-legend {
    font-size: 20px;
    font-weight: 800;
}

.c-manageYourPreferences-cta {
    display: flex;
    align-self: end;
    gap: 8px
}
</style>
