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

            it.each([
                [true, false],
                [false, true]
            ])('should change `isExpanded` to %s when it is initially set to %s', (expected, initial) => {
                // Arrange
                wrapper = shallowMount(Accordion, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            isExpanded: initial
                        };
                    }
                });

                // Act
                wrapper.vm.toggle();

                // Assert
                expect(wrapper.vm.$data.isExpanded).toBe(expected);
            });
        });

        describe('template ::', () => {
            let wrapper;

            it.each([
                [true, false],
                [false, true]
            ])('should toggle the accordion visibility from %s to %s when heading is clicked', (initial, expected) => {
                // Arrange
                const toggleSpy = jest.spyOn(Accordion.methods, 'toggle');
                wrapper = shallowMount(Accordion, {
                    i18n,
                    store: createStore(),
                    localVue,
                    propsData,
                    data () {
                        return {
                            isExpanded: initial
                        };
                    }
                });

                // Act
                const header = wrapper.find('[data-test-id="note-accordion-header"]');
                header.trigger('click');

                // Assert
                expect(toggleSpy).toHaveBeenCalled();
                expect(wrapper.vm.$data.isExpanded).toBe(expected);
            });
        });
    });
});
