import contactPreferencesModule from '../contactPreferences.module';
import {
    UPDATE_PREFERENCE,
    UPDATE_PREFERENCE_VERSION,
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
        postPreferencesMock = jest.fn(() => {});
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

            it(`should call the ${UPDATE_PREFERENCES} mutation with the correctly filtered/sorted data`, async () => {
                // Arrange
                const commitSpy = jest.fn();
                const expected = contactPreferencesViewModel.preferences.filter(e => !!e.visible);

                // Act
                await contactPreferencesModule.actions.loadPreferences({ commit: commitSpy }, { api: httpClientMock, authToken: token });

                // Assert
                expect(commitSpy).toHaveBeenLastCalledWith(UPDATE_PREFERENCES, expected);
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
    });

    describe('mutations ::', () => {
        describe(`${UPDATE_PREFERENCES} ::`, () => {
            it('should update preferences state with mapped/filtered/sorted preferences data', () => {
                // Arrange
                const expected = { ...contactPreferencesViewModel }.preferences;
                const currentValue = expected.find(e => e.key === 'news').emailValue;
                expected.find(e => e.key === 'news').emailValue = !currentValue;

                // Act
                contactPreferencesModule.mutations[UPDATE_PREFERENCES](contactPreferencesViewModel, expected);
                const actual = contactPreferencesViewModel.preferences;

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe(`${UPDATE_PREFERENCE_VERSION} ::`, () => {
            it('should update preference version state with the preference version data', () => {
                // Arrange
                const expected = 1;

                // Act
                contactPreferencesModule.mutations[UPDATE_PREFERENCE_VERSION](contactPreferencesViewModel, expected);
                const actual = contactPreferencesViewModel.preferenceVersionViewed;

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe(`${UPDATE_PREFERENCE} ::`, () => {
            it('should update state with new preference value', () => {
                // Arrange
                const expected = !contactPreferencesViewModel.preferences.find(e => e.key === 'news').emailValue;

                // Act
                contactPreferencesModule.mutations[UPDATE_PREFERENCE](contactPreferencesViewModel, { key: 'news', field: 'emailValue', value: expected });
                const actual = contactPreferencesViewModel.preferences.find(e => e.key === 'news').emailValue;

                // Assert
                expect(actual).toEqual(expected);
            });
        });
    });
});
