// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { shallowMount } from '@vue/test-utils';
import globalisationMixin from '../globalisation.mixin.vue';

Vue.use(VueI18n);

const DEFAULT_LOCALE = 'en-GB';

const i18n = new VueI18n({
    locale: DEFAULT_LOCALE,
    messages: {
        DEFAULT_LOCALE: {
            test: 'Test message'
        }
    }
});

const defaultData = {
    tenantConfigs: {
        DEFAULT_LOCALE: {
            test: 'Test message'
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
        describe('initialiseLocalisation', () => {
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
    });
});

