import {
    mapToPreferencesViewModel,
    mapToPreferencesUpdateModel,
    filterSortPreferences
} from '../contactPreferences.mapper';

import {
    contactPreferencesGetResponse,
    contactPreferencesViewModel,
    contactPreferencesUpdateModel,
    filteredContactPreferencesModel
} from '../../../../test-utils/setup';

describe('ContactPreferencesMapper', () => {
    describe('When calling `mapToPreferencesViewModel`', () => {
        it('should return the expected view model', () => {
            // Arrange
            const expected = contactPreferencesViewModel;

            // Act
            const actual = mapToPreferencesViewModel(contactPreferencesGetResponse.data);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('When calling `mapToPreferencesUpdateModel`', () => {
        it('should return the expected update model', () => {
            // Arrange
            const expected = contactPreferencesUpdateModel;

            // Act
            const actual = mapToPreferencesUpdateModel(contactPreferencesViewModel);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('When calling `filterSortPreferences`', () => {
        it('should return the expected filtered/sorted model', () => {
            // Arrange
            const expected = filteredContactPreferencesModel;

            // Act
            const actual = filterSortPreferences(contactPreferencesViewModel.preferences);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return the empty array when no preferences', () => {
            // Arrange
            const expected = [];

            // Act
            const actual = filterSortPreferences(undefined);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});
