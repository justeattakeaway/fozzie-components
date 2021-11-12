import loggerService from '../logger.service';

const error = {
    name: 'Error adding to basket',
    message: 'timeout of 5000ms exceeded.',
    stack: 'at XMLHttpRequest.ontimeout (bundle.js:12:345)',
    toString: () => 'Error adding to basket'
};

const info = 'mounted hook';

describe('loggerService', () => {
    describe('buildVueError', () => {
        describe('when tier is passed', () => {
            it('should return expected object', () => {
                // Arrange
                const vm = undefined;
                const tier = '1';

                // Act
                const result = loggerService.buildVueError(error, vm, info, { tier });

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('when vm is undefined', () => {
            it('should return expected object', () => {
                // Arrange
                const vm = undefined;

                // Act
                const result = loggerService.buildVueError(error, vm, info);

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('when vm has props data', () => {
            it('should return expected object', () => {
                // Arrange
                const vm = {
                    $options: {
                        propsData: {
                            name: 'basket'
                        }
                    }
                };

                // Act
                const result = loggerService.buildVueError(error, vm, info);

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('when vm is for root component', () => {
            it('should return expected object', () => {
                // Arrange
                const vm = {};

                vm.$root = vm;

                // Act
                const result = loggerService.buildVueError(error, vm, info);

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('when vm contains component name', () => {
            it('should return expected object', () => {
                // Arrange
                const vm = {
                    name: 'Basket Component'
                };

                // Act
                const result = loggerService.buildVueError(error, vm, info);

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('when vm options contains name and file name', () => {
            it('should return expected object', () => {
                // Arrange
                const vm = {
                    _isVue: true,
                    $options: {
                        name: 'Basket Component',
                        __file: 'BasketComponent.vue'
                    }
                };

                // Act
                const result = loggerService.buildVueError(error, vm, info);

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('when vm options contains name', () => {
            it('should return expected object', () => {
                // Arrange
                const vm = {
                    _isVue: true,
                    $options: {
                        name: 'Basket Component'
                    }
                };

                // Act
                const result = loggerService.buildVueError(error, vm, info);

                // Assert
                expect(result).toMatchSnapshot();
            });
        });

        describe('when vm options contains component tag', () => {
            it('should return expected object', () => {
                // Arrange
                const vm = {
                    _isVue: true,
                    $options: {
                        _componentTag: 'Basket Component'
                    }
                };

                // Act
                const result = loggerService.buildVueError(error, vm, info);

                // Assert
                expect(result).toMatchSnapshot();
            });
        });
    });
});
