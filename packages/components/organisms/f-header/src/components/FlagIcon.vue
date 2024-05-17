<template>
    <component :is="iconComponent" />
</template>

<script>
import {
    FlagAustriaIcon as FlagIconAt,
    FlagAustraliaIcon as FlagIconAu,
    FlagBelgiumIcon as FlagIconBe,
    FlagBulgariaIcon as FlagIconBg,
    FlagCanadaIcon as FlagIconCa,
    FlagSwitzerlandIcon as FlagIconCh,
    FlagDenmarkIcon as FlagIconDk,
    FlagGermanyIcon as FlagIconDe,
    FlagFranceIcon as FlagIconFr,
    FlagUnitedKingdomIcon as FlagIconGb,
    FlagIrelandIcon as FlagIconIe,
    FlagIsraelIcon as FlagIconIl,
    FlagItalyIcon as FlagIconIt,
    FlagLuxemburgIcon as FlagIconLu,
    FlagNetherlandsIcon as FlagIconNl,
    FlagNorwayIcon as FlagIconNo,
    FlagPolandIcon as FlagIconPl,
    FlagSpainIcon as FlagIconEs,
    FlagSlovakiaIcon as FlagIconSk
} from '@justeattakeaway/pie-icons-vue';

export default {
    components: {
        FlagIconAt,
        FlagIconBe,
        FlagIconBg,
        FlagIconCa,
        FlagIconCh,
        FlagIconDk,
        FlagIconAu,
        FlagIconFr,
        FlagIconDe,
        FlagIconIe,
        FlagIconIl,
        FlagIconIt,
        FlagIconLu,
        FlagIconNl,
        FlagIconNo,
        FlagIconPl,
        FlagIconEs,
        FlagIconGb,
        FlagIconSk
    },

    props: {
        countryCode: {
            type: String,
            default: 'gb'
        }
    },

    computed: {
        iconComponent () {
            return `flag-icon-${this.countryCode.toLowerCase()}`;
        }
    }
};
</script>
