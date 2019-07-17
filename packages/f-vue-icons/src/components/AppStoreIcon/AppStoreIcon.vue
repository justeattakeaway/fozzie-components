<template>
    <component :is="iconComponent" />
</template>

<script>
import AndroidIconDa from '@justeat/f-icons/src/img/icons/appstore/android.dk.svg';
import AndroidIconEn from '@justeat/f-icons/src/img/icons/appstore/android.svg';
import AndroidIconEs from '@justeat/f-icons/src/img/icons/appstore/android.es.svg';
import AndroidIconIt from '@justeat/f-icons/src/img/icons/appstore/android.it.svg';
import AndroidIconNb from '@justeat/f-icons/src/img/icons/appstore/android.no.svg';
import IosIconDa from '@justeat/f-icons/src/img/icons/appstore/ios.dk.svg';
import IosIconEn from '@justeat/f-icons/src/img/icons/appstore/ios.svg';
import IosIconEs from '@justeat/f-icons/src/img/icons/appstore/ios.es.svg';
import IosIconIt from '@justeat/f-icons/src/img/icons/appstore/ios.it.svg';
import IosIconNb from '@justeat/f-icons/src/img/icons/appstore/ios.no.svg';
import MicrosoftIconDa from '@justeat/f-icons/src/img/icons/appstore/microsoft.dk.svg';

export default {
    components: {
        AndroidIconDa,
        AndroidIconEn,
        AndroidIconEs,
        AndroidIconIt,
        AndroidIconNb,
        IosIconDa,
        IosIconEn,
        IosIconEs,
        IosIconIt,
        IosIconNb,
        MicrosoftIconDa
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
            return `${this.name}-icon-${this.language}`;
        },
        language () {
            return this.locale.split('-')[0];
        }
    }
};
</script>
