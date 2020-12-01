<template>
    <div :class="$style['c-search-innerFields']">
        <form-search-geo
            v-if="isGeoLocationAvailable"
            :copy="copy"
            :service="service" />

        <input
            v-if="streetNumberRequired"
            ref="streetNumberInput"
            v-model="streetNumber"
            :class="$style['c-search-streetInput']"
            type="input"
            placeholder="N°"
            @input="onStreetNumberEntered">
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FormSearchGeo from './FormSearchGeo.vue';

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
        ...mapState('searchbox', [
            'streetNumberRequired',
            'isGeoLocationAvailable'
        ])
    },

    methods: {
        ...mapActions('searchbox', [
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

$streetInput-border-colour: $grey--lighter 1px solid;
$streetInput-width: spacing(x6);

.c-search-innerFields {
    position: absolute;
    align-items: center;
    display: flex;
    height: 35px;
    right: 0;
    top: 11px;
}

.c-search-streetInput {
    border-left: $streetInput-border-colour;
    margin-right: spacing(x0.5);
    width: $streetInput-width;
    outline: $white 2px auto;

    &:focus {
        outline-color: $color-focus-outline;
    }
}

</style>
