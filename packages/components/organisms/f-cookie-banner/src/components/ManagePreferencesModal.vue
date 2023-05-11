<template>
    <mega-modal
        :is-open="isOpen"
        :title="copy.title"
        close-button-style="chevron"
        title-html-tag="h2"
        :class="$style['c-manageYourPreferences']"
        is-full-width-mobile
        @close="closeModal">
        <div :class="$style['c-manageYourPreferences-content']">
            <div :class="$style['c-manageYourPreferences-form']">
                <p>
                    {{ copy.subheading.text1 }}
                    <a :href="copy.subheading.link1">{{ copy.subheading.linkText1 }}</a>
                    {{ copy.subheading.text2 }}
                    <a :href="copy.subheading.link2">{{ copy.subheading.linkText2 }}</a>
                </p>
                <fieldset
                    v-for="(cookieCopy, cookieName) in copy.cookies"
                    :key="`${cookieName}-fieldset`"
                    :class="$style['c-manageYourPreferences-fieldset']">
                    <legend
                        :id="`${cookieName}-label`"
                        :class="$style['c-manageYourPreferences-legend']"
                    >
                        {{ cookieCopy.title }}
                    </legend>
                    <div :class="$style['c-manageYourPreferences-cookieWrapper']">
                        <p :id="`${cookieName}-description`">
                            {{ cookieCopy.text }}
                        </p>
                        <toggle-switch
                            :name="cookieName"
                            :checked="preferences[cookieName].checked"
                            :disabled="preferences[cookieName].disabled"
                            :aria-labelledby="`${cookieName}-label`"
                            :ari-describedby="`${cookieName}-description`"
                            @update="toggleCookie({ cookieName, value: $event })"
                        />
                    </div>
                </fieldset>
            </div>
            <div :class="$style['c-manageYourPreferences-cta']">
                <button-component
                    data-test-id="only-selected-preferences-button"
                    button-type="secondary"
                    button-size="small"
                    @click="acceptOnlyNecessary">
                    {{ copy.buttons.onlySelected }}
                </button-component>

                <button-component
                    data-test-id="accept-all-preferences-button"
                    button-size="small"
                    @click="acceptAll">
                    {{ copy.buttons.acceptAll }}
                </button-component>
            </div>
        </div>
    </mega-modal>
</template>

<script>
import ButtonComponent from '@justeat/f-button';
import '@justeat/f-button/dist/f-button.css';
import MegaModal from '@justeat/f-mega-modal';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import ToggleSwitch from '@justeat/f-toggle-switch';
import '@justeat/f-toggle-switch/dist/f-toggle-switch.css';

export default {
    components: {
        ButtonComponent,
        ToggleSwitch,
        MegaModal
    },

    props: {
        isOpen: {
            default: false,
            type: Boolean
        },

        copy: {
            required: true,
            type: Object
        },

        cookiePreferences: {
            required: true,
            type: Object
        }
    },

    data () {
        return {
            preferences: {
                necessary: this.cookiePreferences.necessary,
                functional: this.cookiePreferences.functional,
                analytical: this.cookiePreferences.analytical,
                personalised: this.cookiePreferences.personalised
            }
        };
    },

    watch: {
        cookiePreferences (val) {
            this.preference = val;
        }
    },

    methods: {
        closeModal (event) {
            this.$emit('close', event);
        },

        acceptAll () {
            this.closeModal({
                necessary: { ...this.preferences.necessary, checked: true },
                functional: { ...this.preferences.functional, checked: true },
                analytical: { ...this.preferences.analytical, checked: true },
                personalised: { ...this.preferences.personalised, checked: true }
            });
        },

        acceptOnlyNecessary () {
            this.closeModal(this.preferences);
        },

        toggleCookie ({ cookieName, value }) {
            this.preferences[cookieName].checked = value;
        }
    }

};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-manageYourPreferences-content {
    max-height: calc(90vh - (28px + 32px + 32px));
    overflow-y: auto;
    scrollbar-gutter: stable both-edges;


    @include f.media('<mid') {
        max-height: calc(100vh - (32px + 48px));
    }
}

.c-manageYourPreferences-form {
    p {
        @include f.font-size(body-s);
    }

    display: flex;
    flex-direction: column;
    gap: f.spacing(e);
    padding: 0;

}

.c-manageYourPreferences-fieldset {
    padding: 0;
    border: 0;
    margin: 0;
}

.c-manageYourPreferences-cookieWrapper {
    display: flex;
    gap: f.spacing(d);
    @include f.font-size(body-s);
}

.c-manageYourPreferences-legend {
    @include f.font-size(heading-s);
    font-weight: 800;
}

.c-manageYourPreferences-cta {
    display: flex;
    justify-content: end;
    gap: 8px;
    margin-top: f.spacing(e);

    @include f.media('<mid') {
        flex-direction: column-reverse;
    }
}
</style>
