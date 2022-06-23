<template>
    <div
        :class="[$style['c-restaurantCard-dish']]"
        data-test-id="dishsearch-dish-item">
        <p :class="[$style['c-restaurantCard-dish-description']]">
            <span
                data-test-id="dishsearch-dish-item-name"
                :class="[$style['c-restaurantCard-dish-name']]">
                {{ name }}
            </span>
            <span
                v-if="calories || portion"
                :class="[$style['c-restaurantCard-dish-nutritionalInfo']]">
                <span
                    v-if="calories"
                    data-test-id="restaurant-dish-calories"
                    :class="[$style['c-restaurantCard-dish-nutritionalInfo-item']]">
                    {{ calories }}
                </span>
                <span
                    v-if="portion"
                    data-test-id="restaurant-dish-portion"
                    :class="[$style['c-restaurantCard-dish-nutritionalInfo-item']]">
                    {{ portion }}
                </span>
            </span>
        </p>
        <p
            v-if="price"
            data-test-id="dishsearch-dish-item-price"
            :class="[$style['c-restaurantCard-dish-price']]">
            {{ price }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'RestaurantDish',
    props: {
        name: {
            type: String,
            default: ''
        },
        /**
         * String representation of how much the dish costs, including currency. E.g. £2.79
         */
        price: {
            type: String,
            default: null
        },
        /**
         * String representation of the calorie count of the dish. Includes unit. E.g. 1000kcal
         */
        calories: {
            type: String,
            default: null
        },
        /**
         * String representation of the portion size of the dish. I.e. '2 Servings'
         */
        portion: {
            type: String,
            default: null
        }
    }
};
</script>

<style lang="scss" module>
@use '@justeat/fozzie/src/scss/fozzie' as f;

.c-restaurantCard-dish {
    background-color: f.$color-support-brand-02;
    padding: f.spacing(c);
    border-radius: f.$radius-rounded-b;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.c-restaurantCard-dish-description {
    margin-right: f.spacing(c);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.c-restaurantCard-dish-description,
.c-restaurantCard-dish-price {
    @include f.font-size(body-s);
    margin-top: 0;
    align-self: flex-start;
}

.c-restaurantCard-dish-name,
.c-restaurantCard-dish-price {
    font-weight: f.$font-weight-bold;
}

.c-restaurantCard-dish-nutritionalInfo {
    margin-top: f.spacing(a);
    color: f.$color-content-subdued;
}

.c-restaurantCard-dish-nutritionalInfo-item {
    padding-right: math.div(f.spacing(a), 2) * 3;
    margin-right: f.spacing(a);
    position: relative;

    &:after {
        content: '\2022';
        color: f.$color-content-subdued;
        position: absolute;
        right: 0;
    }

    &:last-of-type {
        padding-right: 0;
        margin-right: 0;

        &:after {
            display: none;
        }
    }
}
</style>
