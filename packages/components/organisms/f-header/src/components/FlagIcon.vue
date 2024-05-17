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
    FlagNoRoundIcon as FlagIconNo,
    FlagPlRoundIcon as FlagIconPl,
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
        FlagIconNo,
        FlagIconPl,
        FlagIconEs,
        FlagIconGb
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
