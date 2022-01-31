<template>
    <div :class="$style['c-search-innerFields']">
        <form-search-geo
            v-if="isGeoLocationAvailable"
            data-test-id="geolocationButton"
            :copy="copy"
            :service="service" />

        <input
            v-if="isStreetNumberRequired"
            ref="streetNumberInput"
            v-model="streetNumber"
            data-test-id="streetNumberInput"
            :class="$style['c-search-streetInput']"
            type="input"
            placeholder="N°"
            :aria-label="copy.streetNumberLabel"
            @input="onStreetNumberEntered">
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FormSearchGeo from './FormSearchGeo.vue';
import { VUEX_MODULE_NAMESPACE } from '../../services/constants';

export default {
    components: {
        FormSearchGeo
    },

    props: {
        copy: {
            type: Object,
            default:  () => ({})
        },

        service: {
            type: Object,
            required: true
        }
    },

    data () {
        return {
            streetNumber: ''
        };
    },

    computed: {
        ...mapState(VUEX_MODULE_NAMESPACE, [
            'isStreetNumberRequired',
            'isGeoLocationAvailable'
        ])
    },

    methods: {
        ...mapActions(VUEX_MODULE_NAMESPACE, [
            'setStreetNumber'
        ]),

        onStreetNumberEntered () {
            this.setStreetNumber(this.streetNumber);
        }
    }
};
</script>

<style lang="scss" module>
@import '../../assets/scss/form';

$streetInput-width: spacing(h);

.c-search-innerFields {
    position: absolute;
    align-items: center;
    display: flex;
    height: 35px;
    right: 0;
    top: 11px;
}

.c-search-streetInput {
    border-left: $color-border-subtle 1px solid;
    margin-right: spacing(a);
    width: $streetInput-width;
    outline: $color-white 2px auto;

    &:focus {
        outline-color: $color-focus;
    }
}

</style>
