import { shallowMount } from '@vue/test-utils';
import Tab from '../Tab.vue';

const REGISTER_DATA = {
    name: '__TAB_NAME__',
    title: '__TAB_TITLE__',
    selected: true
};

describe('Tab.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Tab, {
            propsData: {
                name: REGISTER_DATA.name,
                title: REGISTER_DATA.title,
                selected: REGISTER_DATA.selected
            },
            provide: {
                register: jest.fn(),
                tabsComponent: {
                    activeTab: '',
                    animationDirection: 'LEFT',
                    animate: true
                }
            }
        });
    });

    it('should be defined', () => {
        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should call the register callback method when created', () => {
        // Assert
        expect(wrapper.vm.register).toHaveBeenCalled();
    });

    it('should supply the correct object to the callback method', () => {
        // Assert
        expect(wrapper.vm.register).toHaveBeenCalledWith(REGISTER_DATA);
    });
    it('should show only if isActive is true', () => {

    });
    describe('Animation', () => {
        it('should only animate when animateTab is true', () => {

        });
        it('should apply the fade-in-right class when animationDirection is LEFT', () => {

        });
        it('should apply the fade-in-left class when animationDirection is RIGHT', () => {

        });
    });
});
