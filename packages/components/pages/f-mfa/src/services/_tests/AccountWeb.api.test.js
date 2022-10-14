import AccountWebApi from '../AccountWeb.api';

describe('AccountWebApi Provider', () => {
    describe('When creating a new instance', () => {
        it('should not throw error when instance is created with valid parameters', () => {
            // Act
            const createInstance = () => new AccountWebApi({
                httpClient: {}
            });

            // Assert
            let instance;
            expect(() => { instance = createInstance(); }).not.toThrowError();
            expect(instance).toBeDefined();
        });
    });
});
