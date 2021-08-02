import Vuex from 'vuex';
import { VueI18n } from '@justeat/f-globalisation';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Accordion from '../Accordion.vue';
import { i18n, createStore } from './helpers/setup';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Vuex);

describe('Accordion', () => {
    const propsData = { title: 'Accordion Header', id: 'note' };

    it('should be defined', () => {
        // Arrange & Act
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
                // Arrange
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

                // Act
                wrapper.vm.toggle();

                // Assert
                expect(wrapper.vm.$data.isExpanded).toBe(true);
            });

            it('should change `isExpanded` to false when it is initally set to true', () => {
                // Arrange
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

                // Act
                wrapper.vm.toggle();

                // Assert
                expect(wrapper.vm.$data.isExpanded).toBe(false);
            });
        });

        describe('template ::', () => {
            let wrapper;

            it('should toggle the accordion visibility when heading is clicked', () => {
                // Arrange
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

                // Act
                const header = wrapper.find('[data-test-id="note-accordion-header"]');
                header.trigger('click');

                // Assert
                expect(toggleSpy).toHaveBeenCalled();
                expect(wrapper.vm.$data.isExpanded).toBe(true);
            });
        });
    });
});
