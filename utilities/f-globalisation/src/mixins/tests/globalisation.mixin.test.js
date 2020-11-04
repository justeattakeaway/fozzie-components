// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { shallowMount } from '@vue/test-utils';
import globalisationMixin from '../globalisation.mixin.vue';

Vue.use(VueI18n);

const DEFAULT_LOCALE = 'en-GB';
const ALTERNATIVE_LOCALE = 'es-ES';

const i18n = new VueI18n({
    locale: DEFAULT_LOCALE
});

const defaultData = {
    tenantConfigs: {
        [DEFAULT_LOCALE]: {
            test: 'Test message (EN)'
        },
        [ALTERNATIVE_LOCALE]: {
            test: 'Test message (ES)'
        }
    }
};

describe('Globalisation', () => {
    let component;

    beforeEach(() => {
        component = {
            render () {},
            mixins: [globalisationMixin]
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        const wrapper = shallowMount(component, {
            data () {
                return defaultData;
            },
            i18n
        });

        expect(wrapper.exists()).toBe(true);
    });

    describe('created', () => {
        it('should call `initialiseLocalisation`', () => {
            const initialiseLocalisationMock = jest.spyOn(component.mixins[0].methods, 'initialiseLocalisation');

            shallowMount(component, {
                data () {
                    return defaultData;
                },
                i18n
            });

            expect(initialiseLocalisationMock).toHaveBeenCalled();
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
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    propsData: {
                        locale: DEFAULT_LOCALE
                    },
                    i18n
                });

                wrapper.vm.initialiseLocalisation();

                expect(setupLocaleMock).toHaveBeenCalledTimes(1);
                expect(setupLocaleMock).toHaveBeenCalledWith(DEFAULT_LOCALE, true);
            });

            it('should call `setupLocale` twice to set up both the locale with the provided `locale` prop and the fallback locale when these are different', () => {
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    propsData: {
                        locale: ALTERNATIVE_LOCALE
                    },
                    i18n
                });

                wrapper.vm.initialiseLocalisation();

                expect(setupLocaleMock).toHaveBeenCalledTimes(2);
                expect(setupLocaleMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, true);
                expect(setupLocaleMock).toHaveBeenCalledWith(DEFAULT_LOCALE, false);
            });

            it('should call `setupLocale` twice to set up both the current locale and the fallback locale when these are different', () => {
                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    i18n: new VueI18n({
                        locale: ALTERNATIVE_LOCALE
                    })
                });

                wrapper.vm.initialiseLocalisation();

                expect(setupLocaleMock).toHaveBeenCalledTimes(2);
                expect(setupLocaleMock).toHaveBeenCalledWith(ALTERNATIVE_LOCALE, true);
                expect(setupLocaleMock).toHaveBeenCalledWith(DEFAULT_LOCALE, false);
            });
        });

        describe('setupLocale', () => {
            it('should set the messages for the provided locale and update the current i18n locale when `applyLocale` is `true`', () => {
                const setLocaleMessageMock = jest.spyOn(i18n, 'setLocaleMessage');

                // CONTINUE HERE, TEST THE LOCALE IS SET

                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    i18n
                });

                wrapper.vm.setupLocale(DEFAULT_LOCALE, true);

                expect(setLocaleMessageMock).toHaveBeenCalledTimes(1);
                expect(setLocaleMessageMock).toHaveBeenCalledWith(DEFAULT_LOCALE, defaultData.tenantConfigs[DEFAULT_LOCALE]);
            });

            it('should set the messages for the provided locale and update the current i18n locale when `applyLocale` is `true`', () => {
                const setLocaleMessageMock = jest.spyOn(i18n, 'setLocaleMessage');

                const wrapper = shallowMount(component, {
                    data () {
                        return defaultData;
                    },
                    i18n
                });

                wrapper.vm.setupLocale(DEFAULT_LOCALE, true);

                expect(setLocaleMessageMock).toHaveBeenCalledTimes(1);
                expect(setLocaleMessageMock).toHaveBeenCalledWith(DEFAULT_LOCALE, defaultData.tenantConfigs[DEFAULT_LOCALE]);
            });            
        });
    });
});

