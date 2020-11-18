import * as generalServices from '../general.services';
import * as helpers from '../../utils/helpers';

describe('`general.services`', () => {
    describe('`processLocationCookie`', () => {
        it('should exist', () => {
            expect(generalServices.processLocationCookie).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND `shouldSetCookie` is not defined', () => {
                it('should return `false`', () => {
                    expect(generalServices.processLocationCookie()).toBe(false);
                });
            });

            describe('AND `shouldSetCookie` is defined & `address` matches the correct `type`', () => {
                it('should invoke `setCookie` to manually set a location cookie', () => {
                    // Arrange
                    const address = 'AR511AR';
                    const spy = jest.spyOn(helpers, 'setCookie');

                    // Act
                    generalServices.processLocationCookie(true, address);

                    // Assert
                    expect(spy).toHaveBeenCalledWith('je-location', address, 365);
                });
            });
        });
    });

    describe('`onCustomSubmit`', () => {
        it('should exist', () => {
            expect(generalServices.onCustomSubmit).toBeDefined();
        });

        describe('when invoked', () => {
            describe('AND a custom submit handler is provided', () => {
                it('should `preventDefault`', () => {
                    // Arrange
                    const event = { preventDefault: jest.fn() };

                    // Act
                    generalServices.onCustomSubmit(() => {}, 'AR511AR', event);

                    // Assert
                    expect(event.preventDefault).toHaveBeenCalled();
                });
            });

            describe('AND a custom submit handler is NOT provided', () => {
                it('should `preventDefault`', () => {
                    // Arrange
                    const event = { preventDefault: jest.fn() };

                    // Act
                    generalServices.onCustomSubmit(false, 'AR511AR', event);

                    // Assert
                    expect(event.preventDefault).not.toHaveBeenCalled();
                });
            });
        });
    });
});
