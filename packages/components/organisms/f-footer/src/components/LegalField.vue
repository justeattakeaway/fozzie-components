<template>
    <div
        :class="$style['c-footer-certificates']">
        <p
            v-if="info.textField">
            {{ info.textField }}
        </p>

        <confianza-icon
            v-if="isConfianza"
            :class="[
                $style['c-footer-certificates-icons'],
                $style[iconClass]
            ]" />
    </div>
</template>

<script>
import { CertificateConfianzaIcon as ConfianzaIcon } from '@justeat/f-vue-icons';

export default {

    components: {
        ConfianzaIcon
    },
    props: {
        info: {
            type: Object,
            required: true
        }
    },

    computed: {
        isConfianza () {
            return this.info.icon.name === 'confianza';
        },
        iconClass () {
            return `c-footer-certificates-icons--${this.info.icon.name}`;
        }
    }
};
</script>

<style lang="scss" module>

.c-footer-certificates {
    display: flex;
    align-items: center;

    @include media('<wide') {
        order: 2;
        padding: spacing(x2);
    }

    p {
        margin: 0;
    }
}

.c-footer-certificates-icons {
    display: block;
}

.c-footer-certificates-icons--confianza {
    width: 50px;
    height: 50px;
}
</style>

