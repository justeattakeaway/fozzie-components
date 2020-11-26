<template>
    <div :class="$style['c-search-innerFields']">
        <form-search-geo
            v-if="isGeoLocationAvailable"
            :copy="copy"
            :service="service" />

        <input
            v-if="streetNumberRequired"
            ref="streetNumberInput"
            :value="getStreetNumberValue"
            :class="$style['c-search-streetInput']"
            type="input"
            placeholder="N°">
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FormSearchGeo from '../formElements/FormSearchGeo.vue';
export default {
    components: {
        FormSearchGeo
    },

    props: {
        streetNumber: {
            type: String,
            default: ''
        },

        copy: {
            type: Object,
            default:  () => ({})
        },

        service: {
            type: Object,
            default: () => {}
        }
    },

    computed: {
        ...mapState('searchbox', [
            'streetNumberRequired',
            'isGeoLocationAvailable'
        ]),

        getStreetNumberValue () {
            return this.streetNumber;
        }
    }
};
</script>

<style lang="scss" module>
@import '../../assets/scss/form';

// c-search-innerFields represents the geolocation components
// i.e the geo locate button & street input field (available in I18n)
.c-search-innerFields {
    position: absolute;
    align-items: center;
    display: flex;
    height: 35px;
    right: 0;
    top: 11px;
}

.c-search-streetInput {
    border-left: $grey--lighter 1px solid;
    margin-right: spacing(x0.5);
    width: 48px;
    outline: $white 2px auto;

    &:focus {
        outline-color: $color-focus-outline;
    }
}

</style>
