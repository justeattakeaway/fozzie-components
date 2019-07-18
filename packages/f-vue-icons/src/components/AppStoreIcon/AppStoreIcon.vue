<template>
    <component :is="iconComponent" />
</template>

<script>
/* eslint-disable import/no-duplicates */
import AndroidIconDaDk from '@justeat/f-icons/src/img/icons/appstore/android.dk.svg';
import AndroidIconEnGb from '@justeat/f-icons/src/img/icons/appstore/android.svg';
import AndroidIconEnIe from '@justeat/f-icons/src/img/icons/appstore/android.svg';
import AndroidIconEnAu from '@justeat/f-icons/src/img/icons/appstore/android.svg';
import AndroidIconEnNz from '@justeat/f-icons/src/img/icons/appstore/android.svg';
import AndroidIconEsEs from '@justeat/f-icons/src/img/icons/appstore/android.es.svg';
import AndroidIconItIt from '@justeat/f-icons/src/img/icons/appstore/android.it.svg';
import AndroidIconNbNo from '@justeat/f-icons/src/img/icons/appstore/android.no.svg';
import IosIconDaDk from '@justeat/f-icons/src/img/icons/appstore/ios.dk.svg';
import IosIconEnGb from '@justeat/f-icons/src/img/icons/appstore/ios.svg';
import IosIconEnIe from '@justeat/f-icons/src/img/icons/appstore/ios.svg';
import IosIconEnAu from '@justeat/f-icons/src/img/icons/appstore/ios.svg';
import IosIconEnNz from '@justeat/f-icons/src/img/icons/appstore/ios.svg';
import IosIconEsEs from '@justeat/f-icons/src/img/icons/appstore/ios.es.svg';
import IosIconItIt from '@justeat/f-icons/src/img/icons/appstore/ios.it.svg';
import IosIconNbNo from '@justeat/f-icons/src/img/icons/appstore/ios.no.svg';
import MicrosoftIconDaDk from '@justeat/f-icons/src/img/icons/appstore/microsoft.dk.svg';
/* eslint-enable import/no-duplicates */

export default {
    components: {
        AndroidIconDaDk,
        AndroidIconEnGb,
        AndroidIconEnIe,
        AndroidIconEnAu,
        AndroidIconEnNz,
        AndroidIconEsEs,
        AndroidIconItIt,
        AndroidIconNbNo,
        IosIconDaDk,
        IosIconEnGb,
        IosIconEnIe,
        IosIconEnAu,
        IosIconEnNz,
        IosIconEsEs,
        IosIconItIt,
        IosIconNbNo,
        MicrosoftIconDaDk
    },
    props: {
        name: {
            type: String,
            required: true
        },
        locale: {
            type: String,
            required: false,
            default: 'en-GB'
        }
    },
    computed: {
        iconComponent () {
            return `${this.name}-icon-${this.locale.toLowerCase()}`;
        }
    }
};
</script>
