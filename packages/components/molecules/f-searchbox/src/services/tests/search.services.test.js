import * as searchServices from '../search.services';
import * as helpers from '../../utils/helpers';

describe('`search.services`', () => {
    let event;

    beforeEach(() => {
        event = { preventDefault: jest.fn() };
    });

    describe('`search`', () => {
        it('should exist', () => {
            expect(searchServices.search).toBeDefined();
        });

        describe('when invoked', () => {
            it('should return false when `onSubmit` is `truthy`', () => {
                // Arrange
                const payload = {
                    onSubmit: function submit () {},
                    formUrl: '',
                    form: { submit: jest.fn() },
                    callback: function getLastLocation () {},
                    event
                };

                // Act
                const result = searchServices.search(payload);

                // Assert
                expect(result).toBe(false);
            });

            it('should `preventDefault` when `onSubmit` is `falsy` & `formUrl` is defined', () => {
                // Arrange
                const payload = {
                    onSubmit: false,
                    formUrl: 'search/AlphaAndromedae',
                    form: { submit: jest.fn() },
                    callback: function getLastLocation () {},
                    event
                };

                // Act
                searchServices.search(payload);

                // Assert
                expect(event.preventDefault).toHaveBeenCalled();
            });

            it('should call `form.submit` with a `location` when `onSubmit` is `falsy` & `formUrl` is defined', () => {
                // Arrange
                const payload = {
                    onSubmit: false,
                    formUrl: 'search/AlphaAndromedae',
                    form: { submit: jest.fn() },
                    event
                };

                const location = {};

                const spy = jest.spyOn(payload.form, 'submit');

                // Act
                searchServices.search(payload, {});

                // Assert
                expect(spy).toHaveBeenCalledWith(location);
            });

            it('should call `generatePostForm` with a `location` when `onSubmit` is `falsy` & `formUrl` is `falsy`', () => {
                // Arrange
                const payload = {
                    onSubmit: false,
                    formUrl: '',
                    form: { submit: jest.fn() },
                    event
                };

                window.HTMLFormElement.prototype.submit = () => {};

                const spy = jest.spyOn(helpers, 'generatePostForm');

                // Act
                searchServices.search(payload, {});

                // Assert
                expect(spy).toHaveBeenCalledWith('/HomeCW/SearchResultByGeoLocation', { cuisine: '', query: '' });
            });
        });
    });
});
