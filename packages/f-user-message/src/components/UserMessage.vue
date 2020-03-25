<template>
    <div
        v-if="userMessageEnabled"
        :data-theme="theme"
        :class="$style['c-userMessage']"
        class="l-container">
        <div class="l-row">
            <div
                :class="$style['c-userMessageContainer']"
                class="l-container--inner">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28 28">
                    <path
                        fill-rule="nonzero"
                        d="M14 3c6.09 0 11 4.99 11 11s-4.99 11-11 11c-6.01.078-11-4.911-11-11C3 7.91 7.871 3 14 3zm2.16 11.785V7.832h-2.867v5.5H7.95v2.867h6.796c.825 0 1.415-.589 1.415-1.414z" />
                </svg>
                <p :class="$style['c-userMessageText']">
                    {{ userMessageText }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import sharedServices from '@justeat/f-services';
import tenantConfigs from '../tenants';
import UserMessageApi from '../services/UserMessageApi';

export default {
    name: 'UserMessage',
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
    margin-top: spacing(x2);
}

.c-userMessageContainer {
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
        fill: white;
        min-width: 28px;
        max-width: 28px;
        width: 28px;
        height: 28px;
        display: block;
        align-self: center;
    }
}

.c-userMessageText {
    margin: 0 0 0 spacing(x2);
    font-family: $font-family-base;
    font-weight: $font-weight-base;
    @include font-size(base);

    @include media('>=mid') {
        padding-left: 0;
    }
}
</style>
