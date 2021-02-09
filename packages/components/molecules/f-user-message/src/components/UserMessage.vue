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
import sharedServices from '@justeat/f-services';
import { ClockIcon } from '@justeat/f-vue-icons';
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
        const locale = sharedServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const theme = sharedServices.getTheme(locale);

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
.c-userMessage {
    color: $white;
    background-color: $orange;
    max-width: 100%;
}

.c-userMessage-container {
    max-width: 350px;
    margin: 0 auto;
    padding: spacing(x2) 0;
    display: flex;

    @include media('>=narrow') {
        max-width: 540px;
    }

    @include media('>=mid') {
        max-width: 636px;
        margin: 0 auto;
    }

    svg {
        fill: $white;
        min-width: 28px;
        max-width: 28px;
        width: 28px;
        height: 28px;
        display: block;
        align-self: center;
    }
}

.c-userMessage-text {
    margin: 0 0 0 spacing(x2);
    font-family: $font-family-base;
    font-weight: $font-weight-base;
    @include font-size(body-s);

    @include media('>=mid') {
        padding-left: 0;
    }
}
</style>
