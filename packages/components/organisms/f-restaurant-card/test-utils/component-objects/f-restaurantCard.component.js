const restaurantCardComponent = () => $('[data-test-id="restaurantCard"]');

exports.waitForRestaurantCardComponent = () => restaurantCardComponent().waitForExist();

exports.isRestaurantCardComponentDisplayed = () => restaurantCardComponent().isDisplayed();
