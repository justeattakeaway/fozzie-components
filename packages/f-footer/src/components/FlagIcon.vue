<template>
    <component :is="iconComponent" />
</template>

<script>
import {
    FlagAuIcon as FlagIconAu,
    FlagBrIcon as FlagIconBr,
    FlagCaIcon as FlagIconCa,
    FlagChIcon as FlagIconCh,
    FlagDkIcon as FlagIconDk,
    FlagEsIcon as FlagIconEs,
    FlagFrIcon as FlagIconFr,
    FlagGbIcon as FlagIconGb,
    FlagIeIcon as FlagIconIe,
    FlagItIcon as FlagIconIt,
    FlagNoIcon as FlagIconNo,
    FlagNzIcon as FlagIconNz
} from '@justeat/f-vue-icons';

export default {
    components: {
        FlagIconAu,
        FlagIconBr,
        FlagIconCa,
        FlagIconCh,
        FlagIconDk,
        FlagIconEs,
        FlagIconFr,
        FlagIconGb,
        FlagIconIe,
        FlagIconIt,
        FlagIconNo,
        FlagIconNz
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
