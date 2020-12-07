<template>
    <div
        :class="$style['c-<%= name.class %>']"
        data-test-id='<%= name.class %>-component'>
        {{ $t('text') }}
    </div>
</template>

<script>
import { VueGlobalisationMixin } from '@justeat/f-globalisation';
import tenantConfigs from '../tenants';<% if(needsTestingApiMocks) { %>
import <%= name.filename%>ServiceApi from '../services/<%= name.filename%>ServiceApi';<%}%>

export default {
    name: '<%= name.component %>',

    mixins: [VueGlobalisationMixin],

    props: {
        locale: {
            type: String,
            default: ''
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

.c-<%= name.class %> {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
