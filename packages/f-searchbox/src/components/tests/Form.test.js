import { shallowMount } from '@vue/test-utils';
import Form from '../Form.vue';
import * as processLocationCookie from '../../services/general.services';

describe('`Form`', () => {
    let propsData;
    let event;
    
    beforeEach(() => {
        event = { preventDefault: jest.fn() };
        propsData = {
            config: {
                address: 'something',
                locationFormat: () => jest.fn()
            },
            service: {
                isValid: jest.fn(() => []),
            }
        };
    });
    
    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(Form, { propsData });
        
        // Act & Assert
        expect(wrapper.exists()).toBe(true);
    });
    
    describe(`methods`, () => {
        describe('`submit` handler', () => {
            it('should exist', () => {
                // Arrange
                const wrapper = shallowMount(Form, { propsData });
    
                // Act & Assert
                expect(wrapper.vm.submit).toBeDefined();
            });
    
            describe('when invoked', () => {
                it('should call isValid `service` with `address`', () => {
                    // Arrange
                    const wrapper = shallowMount(Form, { propsData });
                    const address = 'Eridanus';
                    wrapper.setData({ address: address });
            
                    // Act
                    wrapper.vm.submit(event);
            
                    // Assert
                    expect(wrapper.vm.service.isValid).toHaveBeenCalledWith(address);
                });
        
                it('should commit the mutation `SET_IS_VALID` with a boolean `true` when the address is valid', () => {
                    // Arrange
                    const propsData = {
                        config: {
                            address: 'AR511AR',
                            locationFormat: () => jest.fn()
                        },
                        service: {
                            isValid: jest.fn(() => true),
                        }
                    };
                    const wrapper = shallowMount(Form, {
                        propsData
                    });
                    const address = 'AR511AR';
                    const SET_IS_VALID = 'SET_IS_VALID';
                    const spy = jest.spyOn(wrapper.vm.store, 'commit');
            
                    wrapper.setData({ address: address });
            
                    // Act
                    wrapper.vm.submit(event);
            
                    // Assert
                    expect(spy).toHaveBeenCalledWith(SET_IS_VALID, true);
                });
        
                it('should commit the mutation `SET_IS_VALID` with [] when the address is not valid', () => {
                    // Arrange
                    const wrapper = shallowMount(Form, { propsData });
                    const address = 'Eridanus';
                    const SET_IS_VALID = 'SET_IS_VALID';
                    wrapper.setData({ address: address });
                    const spy = jest.spyOn(wrapper.vm.store, 'commit');
            
                    // Act
                    wrapper.vm.submit(event);
            
                    // Assert
                    expect(spy).toHaveBeenCalledWith(SET_IS_VALID, []);
                });
        
                describe('when `address` `isValid` is truthy', () => {
                    it('should set `SET_ERRORS` to an empty array `[]`', () => {
                        // Arrange
                        const propsData = {
                            config: {
                                address: 'AR511AR',
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => true),
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData
                        });
                
                        // Act
                        wrapper.vm.submit(event);
                
                        // Assert
                        expect(wrapper.vm.store.state.errors).toEqual([]);
                    });
            
                    it('should invoke `processLocationCookie` to set je location cookies manually if `setCookies` is enabled', () => {
                        // Arrange
                        const address = 'AR511AR';
                        const propsData = {
                            config: {
                                address,
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => true),
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData
                        });
                
                        const spy = jest.spyOn(processLocationCookie, 'processLocationCookie');
                        wrapper.setData({ setCookies: false, address });
                
                        // Act
                        wrapper.vm.submit(event);
                
                        // Assert
                        expect(spy).toHaveBeenCalledWith(false, address);
                    });
    
                    it('should invoke `clearAddressValueOnSubmit` attempt to clear address value when', () => {
                        // Arrange
                        const address = 'AR511AR';
                        const propsData = {
                            config: {
                                address,
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => true),
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData
                        });
    
                        wrapper.setData({ clearAddressOnValidSubmit: true });
    
                        const spy = jest.spyOn(wrapper.vm, 'clearAddressValue');
        
                        // Act
                        wrapper.vm.submit(event);
        
                        // Assert
                        expect(spy).toHaveBeenCalledWith(true);
                    });
                });
        
                describe('when `address` `isValid` is falsy', () => {
                    it('should prevent default to stop the form from submitting a invalid search', () => {
                        // Arrange
                        const propsData = {
                            config: {
                                address: 'Cassiopeia',
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => []),
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData
                        });
                
                        // Act
                        wrapper.vm.submit(event);
                
                        // Assert
                        expect(event.preventDefault).toHaveBeenCalled();
                    });
            
                    it('should commit the invalid errors', () => {
                        // Arrange
                        const SET_ERRORS = 'SET_ERRORS';
                        const propsData = {
                            config: {
                                address: 'Cassiopeia',
                                locationFormat: () => jest.fn()
                            },
                            service: {
                                isValid: jest.fn(() => []),
                            }
                        };
                        const wrapper = shallowMount(Form, {
                            propsData
                        });
                        const spy = jest.spyOn(wrapper.vm.store, 'commit');
                
                        // Act
                        wrapper.vm.submit(event);
                
                        // Assert
                        expect(spy).toHaveBeenCalledWith(SET_ERRORS, []);
                    });
                });
            });
        });
        
        describe('`clearAddressValue`', () => {
            it('should exist', () => {
                // Arrange
                const wrapper = shallowMount(Form, { propsData });
    
                // Act & Assert
                expect(wrapper.vm.clearAddressValue).toBeDefined();
            });
            
            describe('when invoked', () => {
                describe('AND `clearAddressOnValidSubmit` is truthy', () => {
                   it('should set the `address` to ``', () => {
                       // Arrange
                       const wrapper = shallowMount(Form, { propsData });
                       wrapper.setData({ clearAddressOnValidSubmit: true });
                       
                       // Act
                       wrapper.vm.clearAddressValue(wrapper.vm.clearAddressOnValidSubmit);
                       
                       // Assert
                       expect(wrapper.vm.address).toBe('');
                   });
                });
            });
        });
    });
});
