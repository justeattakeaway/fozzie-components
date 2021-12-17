<template>
    <div :class="[$style['c-restaurantCard-dish']]">
        <p :class="[$style['c-restaurantCard-dish-description']]">
            <span
                data-test-id="restaurant-dish-name"
                :class="[$style['c-restaurantCard-dish-name']]">
                {{ name }}
            </span>
            <span
                v-if="calories"
                :class="[$style['c-restaurantCard-dish-nutritionalInfo']]">
                <span
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
            data-test-id="restaurant-dish-price"
            :class="[$style['c-restaurantCard-dish-price']]">
            {{ price }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'RestaurantDish',
    props: {
        /**
         * Name of the dish
         */
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
.c-restaurantCard-dish {
  background-color: $color-orange-10;
  padding: spacing(x1.5);
  border-radius: $radius-rounded-b;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.c-restaurantCard-dish-description {
    margin-right: spacing(x1.5);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.c-restaurantCard-dish-description,
.c-restaurantCard-dish-price {
    @include font-size(body-s);
    margin-top: 0;
    align-self: flex-start;
}

.c-restaurantCard-dish-name,
.c-restaurantCard-dish-price {
    font-weight: $font-weight-bold;
}

.c-restaurantCard-dish-nutritionalInfo {
    margin-top: spacing(x0.5);
    color: $color-content-subdued;
}

.c-restaurantCard-dish-nutritionalInfo-item {
    padding-right: spacing(x0.5) / 2 * 3;
    margin-right: spacing(x0.5);
    position: relative;

    &:after {
        content: '\2022';
        color: $color-content-subdued;
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
