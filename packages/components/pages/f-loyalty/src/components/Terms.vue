<template functional>
    <div :class="$style['c-loyalty-terms']">
        <a
            :class="$style['c-loyalty-terms-link']"
            data-test-id="terms-and-conditions"
            :href="props.termsUrl">
            {{ props.termsText }}
        </a>
    </div>
</template>

<script>
export default {
    name: 'LoyaltyTerms'
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-loyalty-terms {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.c-loyalty-terms-link {
    margin: f.spacing(e) 0;
    text-align: center;
    font-weight: f.$font-body-strong-s-weight;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>
