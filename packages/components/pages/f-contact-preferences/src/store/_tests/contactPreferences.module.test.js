import contactPreferencesModule from '../contactPreferences.module';
import {
    UPDATE_PREFERENCE,
    UPDATE_PREFERENCES
} from '../../constants';
import {
    contactPreferencesViewModel,
    token,
    contactPreferencesGetResponse,
    contactPreferencesUpdateModel
} from '../../../test-utils/setup';

describe('ContactPreferences Store', () => {
    let httpClientMock;
    let getPreferencesMock;
    let postPreferencesMock;

    beforeEach(() => {
        // Arrange
        getPreferencesMock = jest.fn(() => contactPreferencesGetResponse);
        postPreferencesMock = jest.fn();
        httpClientMock = {
            getPreferences: getPreferencesMock,
            postPreferences: postPreferencesMock
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create default state when initialised.', () => {
        // Assert
        const actualState = contactPreferencesModule.state();

        expect(actualState).toEqual({
            preferenceVersionViewed: 0,
            preferences: []
        });
    });

    describe('actions ::', () => {
        describe('loadPreferences ::', () => {
            it('should call the getPreferences api method with the correct parameters', async () => {
                // Act
                await contactPreferencesModule.actions.loadPreferences({ commit: jest.fn() }, { api: httpClientMock, authToken: token });

                // Assert
                expect(getPreferencesMock).toHaveBeenCalledWith(token);
            });

            it(`should call ${UPDATE_PREFERENCES} mutation with the correct data`, async () => {
                // Arrange
                const commitSpy = jest.fn();
                const expectedVersion = contactPreferencesViewModel.preferenceVersionViewed;
                const expectedPreferences = contactPreferencesViewModel.preferences.filter(e => e.visible);

                // Act
                await contactPreferencesModule.actions.loadPreferences({ commit: commitSpy }, { api: httpClientMock, authToken: token });

                // Assert
                expect(commitSpy).toHaveBeenLastCalledWith(UPDATE_PREFERENCES, { preferences: expectedPreferences, preferenceVersionViewed: expectedVersion });
            });
        });

        describe('savePreferences ::', () => {
            it('should call the postPreferences api method with the correct parameters', async () => {
                // Act
                await contactPreferencesModule.actions.savePreferences({ state: contactPreferencesViewModel }, { api: httpClientMock, authToken: token });

                // Assert
                expect(postPreferencesMock).toHaveBeenCalledWith(token, contactPreferencesUpdateModel);
            });
        });

        describe('editPreference ::', () => {
            it(`should call ${UPDATE_PREFERENCE} mutation with the correct data`, () => {
                // Arrange
                const commitSpy = jest.fn();
                const expectedIndex = contactPreferencesViewModel.preferences.findIndex(e => e.key === 'news');
                const expectedValue = !contactPreferencesViewModel.preferences[expectedIndex].emailValue;

                // Act
                contactPreferencesModule.actions.editPreference({ state: contactPreferencesViewModel, commit: commitSpy }, { key: 'news', field: 'emailValue', value: expectedValue });

                // Assert
                expect(commitSpy).toHaveBeenLastCalledWith(UPDATE_PREFERENCE, { index: expectedIndex, field: 'emailValue', value: expectedValue });
            });

            it(`should not call ${UPDATE_PREFERENCE} mutation if the key not found`, () => {
                // Arrange
                const commitSpy = jest.fn();

                // Act
                contactPreferencesModule.actions.editPreference({ state: contactPreferencesViewModel, commit: commitSpy }, { key: 'X-X-X', field: 'emailValue', value: true });

                // Assert
                expect(commitSpy).not.toHaveBeenCalled();
            });

            it(`should not call ${UPDATE_PREFERENCE} mutation if the field not found`, () => {
                // Arrange
                const commitSpy = jest.fn();

                // Act
                contactPreferencesModule.actions.editPreference({ state: contactPreferencesViewModel, commit: commitSpy }, { key: 'news', field: 'X-X-X', value: true });

                // Assert
                expect(commitSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('mutations ::', () => {
        describe(`${UPDATE_PREFERENCES} ::`, () => {
            it('should update preference state with mapped/filtered/sorted preference data', () => {
                // Arrange
                const expectedPreferenceVersionViewed = 1;
                const expectedPreferences = { ...contactPreferencesViewModel }.preferences;
                const currentValue = expectedPreferences.find(e => e.key === 'news').emailValue;
                expectedPreferences.find(e => e.key === 'news').emailValue = !currentValue;

                // Act
                contactPreferencesModule.mutations[UPDATE_PREFERENCES](contactPreferencesViewModel, { preferences: expectedPreferences, preferenceVersionViewed: expectedPreferenceVersionViewed });
                const actualPreferences = contactPreferencesViewModel.preferences;
                const actualPreferenceVersionViewed = contactPreferencesViewModel.preferenceVersionViewed;

                // Assert
                expect(actualPreferences).toEqual(expectedPreferences);
                expect(actualPreferenceVersionViewed).toEqual(expectedPreferenceVersionViewed);
            });
        });

        describe(`${UPDATE_PREFERENCE} ::`, () => {
            it('should update state with new preference value', () => {
                // Arrange
                const index = contactPreferencesViewModel.preferences.findIndex(e => e.key === 'news');
                const expectedValue = !contactPreferencesViewModel.preferences[index].emailValue;

                // Act
                contactPreferencesModule.mutations[UPDATE_PREFERENCE](contactPreferencesViewModel, { index, field: 'emailValue', value: expectedValue });
                const actual = contactPreferencesViewModel.preferences.find(e => e.key === 'news').emailValue;

                // Assert
                expect(actual).toEqual(expectedValue);
            });
        });
    });
});
