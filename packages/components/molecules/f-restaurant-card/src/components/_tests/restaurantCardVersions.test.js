import restaurantCardVersions from '../restaurantCardVersions';

describe('restaurantCardVersions', () => {
    // not an exhaustive check, but good enough for testing purposes
    const isVueComponent = obj => 'render' in obj;

    it('should export an object', () => {
        expect(typeof restaurantCardVersions).toBe('object');
    });

    it('should export an object with a property named "components"', () => {
        expect(restaurantCardVersions).toHaveProperty('components');
    });

    it('"components" object should only contain keys of specified format "vX" where X is a digit', () => {
        const keys = Object.keys(restaurantCardVersions.components);
        const keysMatchRegex = keys.every(k => k.match('^v\\d$'));

        expect(keysMatchRegex).toBe(true);
    });

    it('"components" object values should only be vue components', () => {
        const allValuesAreObjects = Object
            .values(restaurantCardVersions.components)
            .every(c => isVueComponent(c));

        expect(allValuesAreObjects).toBe(true);
    });
});
