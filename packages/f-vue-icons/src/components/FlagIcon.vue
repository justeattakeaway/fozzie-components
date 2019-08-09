<template>
    <component :is="iconComponent" />
</template>

<script>
import FlagIconAu from '@justeat/f-icons/src/img/icons/flags/flag.au.svg';
import FlagIconBr from '@justeat/f-icons/src/img/icons/flags/flag.br.svg';
import FlagIconCa from '@justeat/f-icons/src/img/icons/flags/flag.ca.svg';
import FlagIconCh from '@justeat/f-icons/src/img/icons/flags/flag.ch.svg';
import FlagIconDk from '@justeat/f-icons/src/img/icons/flags/flag.dk.svg';
import FlagIconEs from '@justeat/f-icons/src/img/icons/flags/flag.es.svg';
import FlagIconFr from '@justeat/f-icons/src/img/icons/flags/flag.fr.svg';
import FlagIconGb from '@justeat/f-icons/src/img/icons/flags/flag.gb.svg';
import FlagIconIe from '@justeat/f-icons/src/img/icons/flags/flag.ie.svg';
import FlagIconIt from '@justeat/f-icons/src/img/icons/flags/flag.it.svg';
import FlagIconNo from '@justeat/f-icons/src/img/icons/flags/flag.no.svg';
import FlagIconNz from '@justeat/f-icons/src/img/icons/flags/flag.nz.svg';

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
