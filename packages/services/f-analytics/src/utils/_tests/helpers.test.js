import { windowServices } from '@justeat/f-services';
import {
    getOrientation, getDisplaySize, mapRouteToGroup, mapRouteToFeature
} from '../helpers';

jest.mock('../../constants', () => ({
    get GROUPS_FEATURES_ROUTES () {
        return [
            {
                group: 'Test_Group',
                features: [
                    { feature: 'Test_Feature', routes: ['test-route-name', 'my-route'] }
                ]
            },
            {
                group: 'Test_Group2',
                features: [
                    { feature: 'Test_Feature2', routes: ['another-test-route-name'] },
                    { feature: 'Test_Feature3', routes: ['test-route-3'] }
                ]
            }
        ];
    }
}));


describe('Analytics', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('helpers ::', () => {
        describe('getDisplaySize', () => {
            it.each([
                ['full-size', 1281],
                ['huge', 1280],
                ['huge', 1026],
                ['wide', 1025],
                ['wide', 769],
                ['mid', 768],
                ['mid', 415],
                ['narrow', 414]
            ])('should return %s for page width %s px', (expected, width) => {
                // Arrange
                windowServices.getWindowWidth = jest.fn(() => width);

                // Act
                const actual = getDisplaySize();

                // Assert
                expect(actual).toBe(expected);
            });
        });

        describe('getOrientation ::', () => {
            it.each([
                ['Portrait', 1000, 500],
                ['Landscape', 500, 1000],
                ['Landscape', 500, 500]
            ])('should return %s for height: %s px and width %s px', (expected, height, width) => {
                // Arrange
                windowServices.getWindowWidth = jest.fn(() => width);
                windowServices.getWindowHeight = jest.fn(() => height);

                // Act
                const actual = getOrientation();

                // Assert
                expect(actual).toBe(expected);
            });
        });

        describe('mapRouteToGroup ::', () => {
            it.each([
                ['test-route-name', 'Test_Group'],
                ['my-route', 'Test_Group'],
                ['another-test-route-name', 'Test_Group2'],
                ['test-route-3', 'Test_Group2']
            ])(
                'should return the group',
                (route, expected) => {
                    const result = mapRouteToGroup(route);
                    expect(result).toEqual(expected);
                }
            );

            it('should return route when it does not match', () => {
                const expected = 'no-route-match';
                const result = mapRouteToGroup('no-route-match');
                expect(result).toEqual(expected);
            });
        });

        describe('mapRouteToFeature ::', () => {
            it.each([
                ['test-route-name', 'Test_Feature'],
                ['test-route-3', 'Test_Feature3']
            ])(
                'should return the feature',
                (route, expected) => {
                    const result = mapRouteToFeature(route);
                    expect(result).toEqual(expected);
                }
            );

            it('should return default object if route does not match', () => {

            });

            it('should return group and feature based on route when multiple features exist under group', () => {

            });
        });
    });
});
