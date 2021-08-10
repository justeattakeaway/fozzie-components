import AnalyticsModule from '../analytics.module';
import {
    defaultState,
    updatedPlatformData,
    updatedUserData,
    updatedPageData
} from '../../tests/helpers/setup';

const { actions, mutations } = AnalyticsModule;
const { updatePlatformData, updateUserData, updatePageData } = actions;
const { pushPlatformData, pushUserData, pushPageData } = mutations;
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

        describe(`${pushPlatformData} ::`, () => {
            it('should update state with `platformData`', () => {
                // Act
                mutations.pushPlatformData(state, updatedPlatformData);

                // Assert
                expect(state).toMatchSnapshot();
            });
        });

        describe(`${pushUserData} ::`, () => {
            it('should update state with `userData`', () => {
                // Act
                mutations.pushUserData(state, updatedUserData);

                // Assert
                expect(state).toMatchSnapshot();
            });
        });

        describe(`${pushPageData} ::`, () => {
            it('should update state with `pageData`', () => {
                // Act
                mutations.pushPageData(state, updatedPageData);

                // Assert
                expect(state).toMatchSnapshot();
            });
        });
    });

    describe('actions ::', () => {
        describe(`${updatePlatformData} ::`, () => {
            it('should call the `pushPlatformData` mutation', () => {
                // Arrange
                const commit = jest.fn();

                // Act
                updatePlatformData({ commit }, updatedPlatformData);

                // Assert
                expect(commit).toHaveBeenCalledWith('pushPlatformData', updatedPlatformData);
            });
        });
        describe(`${updateUserData} ::`, () => {
            it('should call the `pushUserData` mutation', () => {
                // Arrange
                const commit = jest.fn();

                // Act
                updateUserData({ commit }, updatedUserData);

                // Assert
                expect(commit).toHaveBeenCalledWith('pushUserData', updatedUserData);
            });
        });
        describe(`${updatePageData} ::`, () => {
            it('should call the `pushPageData` mutation', () => {
                // Arrange
                const commit = jest.fn();

                // Act
                updatePageData({ commit }, updatedPageData);

                // Assert
                expect(commit).toHaveBeenCalledWith('pushPageData', updatedPageData);
            });
        });
    });
});
