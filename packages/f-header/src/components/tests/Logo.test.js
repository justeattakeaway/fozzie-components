import { shallowMount } from '@vue/test-utils';
import Logo from '../Logo.vue';
// import {
//     JeLogoNoColourIcon as JeLogo,
//     MlLogoIcon as MlLogo
// } from '@justeat/f-vue-icons';

describe('Logo', () => {
    it('should be defined', () => {
        const propsData = {
            theme: 'je',
            isTransparent: true,
            companyName: 'Just Eat'
        };
        const wrapper = shallowMount(Logo, { propsData });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render ml logo if ml theme passed', () => {
        // Arrange & Act
        const propsData = {
            theme: 'ml',
            isTransparent: true,
            companyName: 'MenuLog'
        };
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="ml-icon"]');

        // Assert
        expect(logo).toBeDefined();
    });

    it('should render je logo if je theme passed', () => {
        // Arrange & Act
        const propsData = {
            theme: 'je',
            isTransparent: true,
            companyName: 'Just Eat'
        };
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="je-icon"]');

        // Assert
        expect(logo).toBeDefined();
    });

    it('should have "je-icon--transparent" class if "isTransparent" property is true', () => {
        // Arrange & Act
        const propsData = {
            theme: 'je',
            isTransparent: true,
            companyName: 'Just Eat'
        };
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="je-icon"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'je-icon--transparent,je-icon' not just 'je-icon--transparen'
        expect(logo.classes()).toContain('je-icon--transparent,je-icon');
    });

    it('shouldn\'t have "je-icon--transparent" class if "isTransparent" property is false', () => {
        // Arrange & Act
        const propsData = {
            theme: 'je',
            isTransparent: false,
            companyName: 'Just Eat'
        };
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="je-icon"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'je-icon--transparent,je-icon' not just 'je-icon--transparen'
        expect(logo.classes()).not.toContain('je-icon--transparent,je-icon');
    });
});
