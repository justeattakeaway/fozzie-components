// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { shallowMount } from '@vue/test-utils';
import globalisationMixin from '../globalisation.mixin.vue';

Vue.use(VueI18n);

const DEFAULT_LOCALE = 'en-GB';
const ALTERNATIVE_LOCALE = 'es-ES';

const defaultData = {
    tenantConfigs: {
        [DEFAULT_LOCALE]: {
            messages: {
                test: 'Test message (EN)'
            },
            dateTimeFormats: {
                short: { hour: 'numeric' }
            }
        },
        [ALTERNATIVE_LOCALE]: {
            messages: {
                test: 'Test message (ES)'
            },
            dateTimeFormats: {
                short: { hour: 'numeric' }
            }
        }
    }
};

describe('Globalisation', () => {
    let i18n;
    let component;

    beforeEach(() => {
        i18n = new VueI18n({
            locale: DEFAULT_LOCALE
        });

        component = {
            render () {},
            mixins: [globalisationMixin]
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        // Arrange & Act
        const wrapper = shallowMount(component, {
            data () {
                return defaultData;
            },
            i18n
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('created', () => {
        it('should call `initialiseLocalisation`', () => {
            // Arrange
            const initialiseLocalisationMock = jest.spyOn(component.mixins[0].methods, 'initialiseLocalisation');

            // Act
            shallowMount(component, {
                data () {
                    return defaultData;
                },
                i18n
            });

            // Assert
            expect(initialiseLocalisationMock).toHaveBeenCalled();
        });
    });

    describe('watch', () => {
        describe('locale', () => {
            it('should call `setupLocale` with new value and `true`', async () => {
                // Arrange
                const setupLocaleMock = jest.spyOn(component.mixins[0].methods, 'setupLocale');
                component.mixins[0].created = jest.fn();

                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    i18n
                });

                // Act
                await wrapper.setProps({ locale: ALTERNATIVE_LOCALE });

                // Assert
                expect(setupLocaleMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, true);
            });
        });
    });

    describe('methods', () => {
        beforeEach(() => {
            component.mixins[0].created = jest.fn();
        });

        describe('initialiseLocalisation', () => {
            let setupLocaleMock;

            beforeEach(() => {
                setupLocaleMock = jest.spyOn(component.mixins[0].methods, 'setupLocale');
            });

            it('should call `setupLocale` once to set up the locale with the provided `locale` prop', () => {
                // Arrange
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    propsData: {
                        locale: DEFAULT_LOCALE
                    },
                    i18n
                });

                // Act
                wrapper.vm.initialiseLocalisation();

                // Assert
                expect(setupLocaleMock).toHaveBeenCalledTimes(1);
                expect(setupLocaleMock).toHaveBeenCalledWith(DEFAULT_LOCALE, true);
            });

            it('should call `setupLocale` twice to set up both the locale with the provided `locale` prop and the fallback locale when these are different', () => {
                // Arrange
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    propsData: {
                        locale: ALTERNATIVE_LOCALE
                    },
                    i18n
                });

                // Act
                wrapper.vm.initialiseLocalisation();

                // Assert
                expect(setupLocaleMock).toHaveBeenCalledTimes(2);
                expect(setupLocaleMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, true);
                expect(setupLocaleMock).toHaveBeenCalledWith(DEFAULT_LOCALE, false);
            });

            it('should call `setupLocale` twice to set up both the current locale and the fallback locale when these are different', () => {
                // Arrange
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    i18n: new VueI18n({
                        locale: ALTERNATIVE_LOCALE
                    })
                });

                // Act
                wrapper.vm.initialiseLocalisation();

                // Assert
                expect(setupLocaleMock).toHaveBeenCalledTimes(2);
                expect(setupLocaleMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, true);
                expect(setupLocaleMock).toHaveBeenCalledWith(DEFAULT_LOCALE, false);
            });
        });

        describe('setupLocale', () => {
            let setLocaleMessageMock;
            let setDateTimeFormatMock;

            beforeEach(() => {
                setLocaleMessageMock = jest.spyOn(i18n, 'setLocaleMessage');
                setDateTimeFormatMock = jest.spyOn(i18n, 'setDateTimeFormat');
            });

            it('should set the messages and datetime formats for the provided locale and update the current i18n locale when `applyLocale` is `true`', () => {
                // Arrange
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    i18n
                });

                // Act
                wrapper.vm.setupLocale(ALTERNATIVE_LOCALE, true);

                // Assert
                expect(setLocaleMessageMock).toHaveBeenCalledTimes(1);
                expect(setLocaleMessageMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, defaultData.tenantConfigs[ALTERNATIVE_LOCALE].messages);
                expect(setDateTimeFormatMock).toHaveBeenCalledTimes(1);
                expect(setDateTimeFormatMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, defaultData.tenantConfigs[ALTERNATIVE_LOCALE].dateTimeFormats);
                expect(i18n.locale).toBe(ALTERNATIVE_LOCALE);
            });

            it('should set the messages and datetime formats for the provided locale and not update the current i18n locale when `applyLocale` is `false`', () => {
                // Arrange
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    i18n
                });

                // Act
                wrapper.vm.setupLocale(ALTERNATIVE_LOCALE, false);

                // Assert
                expect(setLocaleMessageMock).toHaveBeenCalledTimes(1);
                expect(setLocaleMessageMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, defaultData.tenantConfigs[ALTERNATIVE_LOCALE].messages);
                expect(setDateTimeFormatMock).toHaveBeenCalledTimes(1);
                expect(setDateTimeFormatMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, defaultData.tenantConfigs[ALTERNATIVE_LOCALE].dateTimeFormats);
                expect(i18n.locale).toBe(DEFAULT_LOCALE);
            });

            it('should merge new messages over old ones when loading a new locale', () => {
                // Arrange
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    i18n
                });

                // Pre load some messages
                i18n.setLocaleMessage(DEFAULT_LOCALE, {
                    AN_ALREADY_LOADED_MESSAGE: 'Test String',
                    test: 'This will be replaced in the merge'
                });

                const expectedResult = {
                    AN_ALREADY_LOADED_MESSAGE: 'Test String',
                    test: 'Test message (EN)'
                };

                // Act
                wrapper.vm.setupLocale(DEFAULT_LOCALE, true);

                // Assert
                expect(setLocaleMessageMock).toHaveBeenCalledTimes(2);
                expect(setLocaleMessageMock).toHaveBeenCalledWith(DEFAULT_LOCALE, expectedResult);
            });
        });
    });

    describe('props', () => {
        describe('locale', () => {
            it('should not be required', () => {
                // Arrange
                const wrapper = shallowMount(component);

                // Act
                const { locale } = wrapper.vm.$options.props;

                // Assert
                expect(locale.required).toBe(undefined);
            });

            it('should be a string', () => {
                // Arrange
                const wrapper = shallowMount(component);

                // Act
                const { locale } = wrapper.vm.$options.props;

                // Assert
                expect(locale.type).toBe(String);
            });

            it('should default to \'\'', () => {
                // Arrange
                const wrapper = shallowMount(component);

                // Act
                const { locale } = wrapper.vm.$options.props;

                // Assert
                expect(locale.default).toBe('');
            });
        });
    });
});

