<template>
    <component :is="iconComponent" />
</template>

<script>
import AndroidIconDk from '@justeat/f-icons/src/img/icons/appstore/android.dk.svg';
import AndroidIconEn from '@justeat/f-icons/src/img/icons/appstore/android.svg';
import AndroidIconEs from '@justeat/f-icons/src/img/icons/appstore/android.es.svg';
import AndroidIconIt from '@justeat/f-icons/src/img/icons/appstore/android.it.svg';
import AndroidIconNo from '@justeat/f-icons/src/img/icons/appstore/android.no.svg';
import IosIconDk from '@justeat/f-icons/src/img/icons/appstore/ios.dk.svg';
import IosIconEn from '@justeat/f-icons/src/img/icons/appstore/ios.svg';
import IosIconEs from '@justeat/f-icons/src/img/icons/appstore/ios.es.svg';
import IosIconIt from '@justeat/f-icons/src/img/icons/appstore/ios.it.svg';
import IosIconNo from '@justeat/f-icons/src/img/icons/appstore/ios.no.svg';
import MicrosoftIconDk from '@justeat/f-icons/src/img/icons/appstore/microsoft.dk.svg';

export default {
    components: {
        AndroidIconDk,
        AndroidIconEn,
        AndroidIconEs,
        AndroidIconIt,
        AndroidIconNo,
        IosIconDk,
        IosIconEn,
        IosIconEs,
        IosIconIt,
        IosIconNo,
        MicrosoftIconDk
    },
    props: {
        name: {
            type: String,
            required: true
        },
        language: {
            type: String,
            default: 'en'
        }
    },
    computed: {
        iconComponent () {
            return `${this.name}-icon-${this.language}`;
        }
    }
};
</script>
