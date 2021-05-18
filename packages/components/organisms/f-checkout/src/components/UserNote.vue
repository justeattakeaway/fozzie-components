<template>
    <div :class="$style['c-userNote']">
        <form-field
            :label-text="$t('userNote.title')"
            input-type="textarea"
            :placeholder="$t('userNote.placeholder')"
            :cols="30"
            :rows="7"
            :maxlength="200"
            :show-extra-label-text="true"
            :name="notePlaceholder"
            :has-input-description="true"
            @input="updateUserNote($event)">
            {{ $t('userNote.text') }}
        </form-field>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import FormField from '@justeat/f-form-field';
import { VUEX_CHECKOUT_MODULE } from '../constants';
import '@justeat/f-form-field/dist/f-form-field.css';

export default {
    components: {
        FormField
    },
    methods: {
        ...mapActions(VUEX_CHECKOUT_MODULE, [
            'updateUserNote'
        ])
    }
};
</script>

<style lang="scss" module>
.c-userNote {
    margin-top: spacing(x3);
    color: $color-text;
}
</style>
