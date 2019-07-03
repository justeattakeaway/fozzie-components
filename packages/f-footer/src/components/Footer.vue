<template>
    <div class="f-footer">
        <h1>Footer component</h1>
        <footer-list
            :copy="copy" />
    </div>
</template>

<script>
import FooterList from './FooterList.vue';
import tenantConfigs from '../tenants';

export default {
    name: 'VueFooter',
    components: { FooterList },
    props: {
        locale: {
            type: String,
            required: false,
            default: ''
        }
    },
    data () {
        const locale = this.getLocale();
        const localeConfig = tenantConfigs[locale];

        return {
            copy: { ...localeConfig }
        };
    },
    methods: {
        getLocale () {
            let locale = this.locale || (this.$i18n ? this.$i18n.locale : null); // use prop, or the i18n locale value set

            // if the locale is either
            // a) not set
            // or b) set to a country code that this component does not recognise
            // it will be set to 'en-GB'
            if (!tenantConfigs[locale]) {
                locale = 'en-GB';
            }

            return locale;
        }
    }
};
</script>

<style>
.f-footer {
    border: 2px solid red;
}
</style>
