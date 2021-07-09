import AnalyticsModule from '../analyticsModule';
import {
    defaultState,
    modifieldState
} from '../../mixins/_tests/helpers/setup';

const { actions, mutations } = AnalyticsModule;
const { updatePlatformData } = actions;
let state = AnalyticsModule.state();

describe('AnalyticsModule', () => {
    it('should create default state when initialised.', () => {
        // Assert
        expect(state).toEqual(defaultState);
    });

    describe('mutations ::', () => {
        beforeEach(() => {
            // Arrange
            state = defaultState;
        });

        describe(`${updatePlatformData} ::`, () => {
            it('should update state with `platformData`', () => {
                // Act
                mutations.updatePlatformData(state, modifieldState);

                // Assert
                expect(state).toMatchSnapshot();
            });
        });
    });

    describe('actions ::', () => {
        describe(`${updatePlatformData} ::`, () => {
            it('should call the `updatePlatformData` mutation', () => {
                // Arrange
                const commit = jest.fn();

                // Act
                updatePlatformData({ commit }, modifieldState);

                // Assert
                expect(commit).toHaveBeenCalledWith('updatePlatformData', modifieldState);
            });
        });
    });
});
