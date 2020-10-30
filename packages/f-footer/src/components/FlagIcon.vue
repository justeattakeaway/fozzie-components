<template>
    <component :is="iconComponent" />
</template>

<script>
import {
    FlagAtRoundIcon as FlagIconAt,
    FlagBeRoundIcon as FlagIconBe,
    FlagBgRoundIcon as FlagIconBg,
    FlagCaRoundIcon as FlagIconCa,
    FlagChRoundIcon as FlagIconCh,
    FlagDkRoundIcon as FlagIconDk,
    FlagAuRoundIcon as FlagIconAu,
    FlagFrRoundIcon as FlagIconFr,
    FlagDeRoundIcon as FlagIconDe,
    FlagIeRoundIcon as FlagIconIe,
    FlagIlRoundIcon as FlagIconIl,
    FlagItRoundIcon as FlagIconIt,
    FlagLuRoundIcon as FlagIconLu,
    FlagNlRoundIcon as FlagIconNl,
    FlagNzRoundIcon as FlagIconNz,
    FlagNoRoundIcon as FlagIconNo,
    FlagPlRoundIcon as FlagIconPl,
    FlagPtRoundIcon as FlagIconPt,
    FlagRoRoundIcon as FlagIconRo,
    FlagEsRoundIcon as FlagIconEs,
    FlagGbRoundIcon as FlagIconGb
} from '@justeat/f-vue-icons';

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
        FlagIconNz,
        FlagIconNo,
        FlagIconPl,
        FlagIconPt,
        FlagIconRo,
        FlagIconEs,
        FlagIconGb
    },

    props: {
        countryCode: {
            type: String,
            required: true
        }
    },

    computed: {
        iconComponent () {
            return `flag-icon-${this.countryCode.toLowerCase()}`;
        }
    }
};
</script>
