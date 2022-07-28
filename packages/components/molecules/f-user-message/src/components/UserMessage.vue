<template>
    <div
        v-if="userMessageEnabled"
        :data-theme="theme"
        :class="$style['c-userMessage']"
        data-test-id="user-message-component"
        class="l-container">
        <div class="l-row">
            <div
                :class="$style['c-userMessage-container']"
                class="l-container--inner">
                <clock-icon />
                <p
                    :class="$style['c-userMessage-text']"
                    data-test-id="user-message-content">
                    {{ userMessageText }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import { ClockIcon } from '@justeattakeaway/pie-icons-vue';
import tenantConfigs from '../tenants';
import UserMessageApi from '../services/UserMessageApi';

export default {
    name: 'UserMessage',
    components: {
        ClockIcon
    },
    props: {
        locale: {
            type: String,
            default: ''
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const theme = globalisationServices.getTheme(locale);

        return {
            theme,
            userMessageEnabled: false,
            userMessageText: ''
        };
    },
    async mounted () {
        return this.populateUserMessage();
    },
    methods: {
        async populateUserMessage () {
            const message = await UserMessageApi.getUserMessage(this.locale);
            if (message && message.length) {
                this.userMessageText = message;
                this.userMessageEnabled = true;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

$userMessage-textColour : f.$color-content-default;

.c-userMessage {
    color: $userMessage-textColour;
    background-color: f.$color-support-warning-02;
    max-width: 100%;
}

.c-userMessage-container {
    max-width: 350px;
    margin: 0 auto;
    padding: f.spacing(d) 0;
    display: flex;

    @include f.media('>=narrow') {
        max-width: 540px;
    }

    @include f.media('>=mid') {
        max-width: 636px;
        margin: 0 auto;
    }

    svg {
        fill: $userMessage-textColour;
        min-width: 28px;
        max-width: 28px;
        width: 28px;
        height: 28px;
        display: block;
        align-self: center;
    }
}

.c-userMessage-text {
    margin: 0 0 0 f.spacing(d);
    @include f.font-size(body-s);

    @include f.media('>=mid') {
        padding-left: 0;
    }
}
</style>
