import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Accordion from '../Accordion.vue';
import { i18n, createStore } from './helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Address', () => {
    const propsData = { title: 'Accordion Header', id: 'note' };
    const event = { preventDefault: jest.fn() };

    it('should be defined', () => {
        // Arrange
        const wrapper = shallowMount(Accordion, {
            i18n,
            store: createStore(),
            localVue,
            propsData
        });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    describe('methods ::', () => {
        describe('toggle ::', () => {
            let wrapper;

            it('should change `isExpanded` to true when it is initally set to false', () => {
                wrapper = shallowMount(Accordion, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            isExpanded: false
                        };
                    }
                });

                wrapper.vm.toggle(event);
                expect(event.preventDefault).toHaveBeenCalled();
                expect(wrapper.vm.$data.isExpanded).toBe(true);
            });

            it('should change `isExpanded` to false when it is initally set to true', () => {
                wrapper = shallowMount(Accordion, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            isExpanded: true
                        };
                    }
                });

                wrapper.vm.toggle(event);
                expect(event.preventDefault).toHaveBeenCalled();
                expect(wrapper.vm.$data.isExpanded).toBe(false);
            });

            it('should be called when the accordion header is clicked', () => {
                const toggleSpy = jest.spyOn(Accordion.methods, 'toggle');
                wrapper = shallowMount(Accordion, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            isExpanded: false
                        };
                    }
                });

                const header = wrapper.find('[data-test-id="note-accordion-header"]');
                header.trigger('click');
                expect(toggleSpy).toHaveBeenCalled();
                expect(wrapper.vm.$data.isExpanded).toBe(true);
            });
        });
    });
});
