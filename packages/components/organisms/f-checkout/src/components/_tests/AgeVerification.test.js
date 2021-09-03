import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AgeVerification from '../AgeVerification.vue';
import {
    i18n,
    createStore,
    defaultCheckoutState
} from './helpers/setup';
import EventNames from '../../event-names';

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
            describe('when selected month should has 31 days', () => {
                it.each([
                    [0, 'January'],
                    [2, 'March'],
                    [4, 'May'],
                    [6, 'July'],
                    [7, 'August'],
                    [9, 'October'],
                    [11, 'December']
                ])('should return an array of 31 day objects for %s', month => {
                    beforeEach(() => {
                        // Arrange
                        wrapper = shallowMount(AgeVerification, {
                            i18n,
                            localVue,
                            store: createStore()
                        });
                    });

                    // Act
                    wrapper.setData({
                        selectedDate: {
                            ...wrapper.vm.selectedDate,
                            month
                        }
                    });

                    // Assert
                    expect(wrapper.vm.days.length).toEqual(31);
                });
            });

            describe('when selected month should has 30 days', () => {
                it.each([
                    [3, 'April'],
                    [5, 'June'],
                    [8, 'September'],
                    [10, 'November']
                ])('should return an array of 30 day objects for %s', month => {
                    beforeEach(() => {
                        // Arrange
                        wrapper = shallowMount(AgeVerification, {
                            i18n,
                            localVue,
                            store: createStore()
                        });
                    });

                    // Act
                    wrapper.setData({
                        selectedDate: {
                            ...wrapper.vm.selectedDate,
                            month
                        }
                    });

                    // Assert
                    expect(wrapper.vm.days.length).toEqual(30);
                });
            });

            describe('when selected month is February', () => {
                it('should return an array of 28 day objects if it is not a leap year', () => {
                    beforeEach(() => {
                        // Arrange
                        wrapper = shallowMount(AgeVerification, {
                            i18n,
                            localVue,
                            store: createStore()
                        });
                    });

                    // Act
                    wrapper.setData({
                        selectedDate: {
                            month: 1,
                            year: 2010
                        }
                    });

                    // Assert
                    expect(wrapper.vm.days.length).toEqual(28);
                });

                it('should return an array of 29 day objects if it is a leap year', () => {
                    beforeEach(() => {
                        // Arrange
                        wrapper = shallowMount(AgeVerification, {
                            i18n,
                            localVue,
                            store: createStore()
                        });
                    });

                    // Act
                    wrapper.setData({
                        selectedDate: {
                            month: 1,
                            year: 2008
                        }
                    });

                    // Assert
                    expect(wrapper.vm.days.length).toEqual(29);
                });
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

        describe('isValidAge ::', () => {
            const validDateOfBirth = new Date(1990, 4, 7);
            const invalidDateOfBirth = new Date(2021, 4, 7);

            it.each([
                [true, validDateOfBirth],
                [false, invalidDateOfBirth]
            ])('should return %s when dateOfBirth is set to %s', (expectedValue, dateOfBirth) => {
                // Arrange
                wrapper = shallowMount(AgeVerification, {
                    i18n,
                    localVue,
                    store: createStore(),
                    computed: {
                        userDateOfBirth: () => dateOfBirth
                    }
                });

                // Assert
                expect(wrapper.vm.isValidAge).toBe(expectedValue);
            });
        });

        describe('shouldShowErrorMessage ::', () => {
            it.each([
                [true, true, false],
                [false, true, true],
                [false, false, true],
                [false, false, false]
            ])('should return %s when hasSelectedDateOfBirth is set to %s and isValidAge is %s', (expected, hasSelectedDateOfBirth, isValidAge) => {
                // Arrange
                wrapper = shallowMount(AgeVerification, {
                    i18n,
                    localVue,
                    store: createStore(),
                    computed: {
                        isValidAge: () => isValidAge
                    }
                });

                wrapper.setData({ hasSelectedDateOfBirth });

                // Assert
                expect(wrapper.vm.shouldShowErrorMessage).toBe(expected);
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

                it('should update `selectedDate.month` with the first month', () => {
                    // Assert
                    expect(wrapper.vm.selectedDate.month).toEqual('0'); // where 0 = January, 1 = February etc.
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

        describe('`handleAgeVerification` ::', () => {
            // Arrange
            let updateDateOfBirthSpy;

            beforeEach(() => {
                updateDateOfBirthSpy = jest.spyOn(AgeVerification.methods, 'updateDateOfBirth');
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('should set `hasSelectedDateOfBirth` to `true`', () => {
                // Arrange
                wrapper = shallowMount(AgeVerification, {
                    i18n,
                    localVue,
                    store: createStore()
                });

                // Act
                wrapper.vm.handleAgeVerification();

                // Assert
                expect(wrapper.vm.hasSelectedDateOfBirth).toBe(true);
            });

            describe('when `isValidAge` returns `true`', () => {
                let date;

                beforeEach(() => {
                    // Arrange
                    date = new Date('1987', '4', '7');

                    wrapper = shallowMount(AgeVerification, {
                        i18n,
                        localVue,
                        store: createStore(),
                        computed: {
                            userDateOfBirth: () => date,
                            isValidAge: () => true
                        }
                    });

                    // Act
                    wrapper.vm.handleAgeVerification();
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call `updateDateOfBirth` with `selectedDate`', () => {
                    // Assert
                    expect(updateDateOfBirthSpy).toHaveBeenCalledWith(date);
                });

                it('should emit `CheckoutVerifyAge`', () => {
                    // Assert
                    expect(wrapper.emitted(EventNames.CheckoutVerifyAge).length).toBe(1);
                });
            });

            describe('when `isValidAge` returns `false`', () => {
                beforeEach(() => {
                    // Arrange
                    wrapper = shallowMount(AgeVerification, {
                        i18n,
                        localVue,
                        store: createStore(),
                        computed: {
                            isValidAge: () => false
                        }
                    });
                });

                afterEach(() => {
                    jest.clearAllMocks();
                });

                it('should call not `updateDateOfBirth` with `selectedDate`', () => {
                    // Act
                    wrapper.vm.handleAgeVerification();

                    // Assert
                    expect(updateDateOfBirthSpy).not.toHaveBeenCalled();
                });

                it('should not emit `verify-age`', () => {
                    // Act
                    wrapper.vm.handleAgeVerification();

                    // Assert
                    expect(wrapper.emitted('verify-age')).toBeUndefined();
                });
            });
        });
    });
});
