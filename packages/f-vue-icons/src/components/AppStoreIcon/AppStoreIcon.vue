<template>
    <component :is="iconComponent" />
</template>

<script>
import IosDkIcon from '@justeat/f-icons/src/img/icons/appstore/ios.dk.svg';
import IosEnIcon from '@justeat/f-icons/src/img/icons/appstore/ios.svg';
import IosEsIcon from '@justeat/f-icons/src/img/icons/appstore/ios.es.svg';
import IosItIcon from '@justeat/f-icons/src/img/icons/appstore/ios.it.svg';
import IosNoIcon from '@justeat/f-icons/src/img/icons/appstore/ios.no.svg';
import AndroidDkIcon from '@justeat/f-icons/src/img/icons/appstore/android.dk.svg';
import AndroidEnIcon from '@justeat/f-icons/src/img/icons/appstore/android.svg';
import AndroidEsIcon from '@justeat/f-icons/src/img/icons/appstore/android.es.svg';
import AndroidItIcon from '@justeat/f-icons/src/img/icons/appstore/android.it.svg';
import AndroidNoIcon from '@justeat/f-icons/src/img/icons/appstore/android.no.svg';
import MicrosoftDkIcon from '@justeat/f-icons/src/img/icons/appstore/microsoft.dk.svg';

export default {
    components: {
        IosEnIcon,
        IosEsIcon,
        IosDkIcon,
        IosNoIcon,
        IosItIcon,
        AndroidDkIcon,
        AndroidEnIcon,
        AndroidEsIcon,
        AndroidItIcon,
        AndroidNoIcon,
        MicrosoftDkIcon
    },
    props: {
        platform: {
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
            return `${this.platform}-${this.language}-icon`;
        }
    }
};
</script>
