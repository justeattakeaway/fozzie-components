import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AgeVerification from '../AgeVerification.vue';
import {
    i18n,
    createStore,
    defaultCheckoutState
} from './helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('AgeVerification', () => {
    let wrapper;

    it('should be defined', () => {
        // Arrange & Act
        wrapper = shallowMount(AgeVerification, {
            i18n,
            localVue,
            store: createStore()
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('computed ::', () => {
        describe('days ::', () => {
            beforeEach(() => {
                // Arrange
                wrapper = shallowMount(AgeVerification, {
                    i18n,
                    localVue,
                    store: createStore()
                });
            });

            it('should return an array of 31 day objects', () => {
                // Assert
                expect(wrapper.vm.days.length).toEqual(31);
                expect(wrapper.vm.days).toMatchSnapshot();
            });
        });

        describe('months ::', () => {
            beforeEach(() => {
                // Arrange
                wrapper = shallowMount(AgeVerification, {
                    i18n,
                    localVue,
                    store: createStore()
                });
            });

            it('should return an array of 12 month objects', () => {
                // Assert
                expect(wrapper.vm.months.length).toEqual(12);
                expect(wrapper.vm.months).toMatchSnapshot();
            });
        });

        describe('years ::', () => {
            beforeEach(() => {
                // Arrange
                wrapper = shallowMount(AgeVerification, {
                    i18n,
                    localVue,
                    store: createStore()
                });
            });

            it('should return an array of 90 year objects', () => {
                // Assert
                expect(wrapper.vm.years.length).toEqual(90);
                expect(wrapper.vm.years).toMatchSnapshot();
            });
        });
    });

    describe('methods ::', () => {
        describe('`initDateOfBirth` ::', () => {
            describe('when `customer.dateOfBirth` exists', () => {
                it('should update `selectedDate` with `dateOfBirth`', () => {
                    // Arrange
                    const day = '4';
                    const month = '7';
                    const year = '1990';

                    const dateOfBirth = new Date(year, month, day);

                    wrapper = shallowMount(AgeVerification, {
                        i18n,
                        localVue,
                        store: createStore({
                            ...defaultCheckoutState,
                            customer: {
                                dateOfBirth
                            }
                        })
                    });

                    // Act
                    wrapper.vm.initDateOfBirth();

                    // Assert
                    expect(wrapper.vm.selectedDate.day).toEqual(day);
                    expect(wrapper.vm.selectedDate.month).toEqual(month);
                    expect(wrapper.vm.selectedDate.year).toEqual(year);
                });
            });

            describe('when `customer.dateOfBirth` does not exist', () => {
                const currentYear = '2025';

                beforeEach(() => {
                    // Arrange
                    jest.spyOn(Date.prototype, 'getFullYear').mockImplementation(() => currentYear);

                    wrapper = shallowMount(AgeVerification, {
                        i18n,
                        localVue,
                        store: createStore({
                            ...defaultCheckoutState,
                            customer: {
                                dateOfBirth: null
                            }
                        })
                    });

                    // Act
                    wrapper.vm.initDateOfBirth();
                });

                it('should update `selectedDate.day` with "1"', () => {
                    // Assert
                    expect(wrapper.vm.selectedDate.day).toEqual('1');
                });

                it('should update `selectedDate.month` with "0"', () => {
                    // Assert
                    expect(wrapper.vm.selectedDate.month).toEqual('0');
                });

                it('should update `selectedDate.year` with the most recent year', () => {
                    // Arrange
                    const expectedDate = (currentYear - 10).toString();

                    // Assert
                    expect(wrapper.vm.selectedDate.year).toEqual(expectedDate);
                });
            });
        });

        describe('`selectionChanged` ::', () => {
            it.each([
                ['day', '7'],
                ['month', '4'],
                ['year', '1990']
            ])('should update `selectedDate[%s]` with %s`', (type, selection) => {
                // Arrange
                wrapper = shallowMount(AgeVerification, {
                    i18n,
                    localVue,
                    store: createStore({
                        ...defaultCheckoutState,
                        customer: {
                            dateOfBirth: new Date('2010', '9', '2')
                        }
                    })
                });

                // Act
                wrapper.vm.selectionChanged(selection, type);

                // Assert
                expect(wrapper.vm.selectedDate[type]).toEqual(selection);
            });
        });

        describe('`handleAgeVerifcation` ::', () => {
            // Arrange
            let selectedDate;
            let date;
            let updateDateOfBirthSpy;

            beforeEach(() => {
                // Arrange
                selectedDate = {
                    day: '1',
                    month: '7',
                    year: '1987'
                };

                date = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
                updateDateOfBirthSpy = jest.spyOn(AgeVerification.methods, 'updateDateOfBirth');

                wrapper = shallowMount(AgeVerification, {
                    i18n,
                    localVue,
                    store: createStore({
                        ...defaultCheckoutState,
                        customer: {
                            dateOfBirth: new Date('2010', '9', '2')
                        }
                    })
                });
            });

            it('should call `updateDateOfBirth` with `selectedDate`', () => {
                // Arrange
                wrapper.setData({ selectedDate });

                // Act
                wrapper.vm.handleAgeVerifcation();

                // Assert
                expect(updateDateOfBirthSpy).toHaveBeenCalledWith(date);
            });

            it('should emit `verify-age`', () => {
                // Act
                wrapper.vm.handleAgeVerifcation();

                // Assert
                expect(wrapper.emitted('verify-age').length).toBe(1);
            });
        });
    });
});
