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
        const logo = wrapper.find('[data-js-test="c-icon--ml"]');

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
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        expect(logo).toBeDefined();
    });

    it('should have "c-icon-je--transparentBckgrnd" class if "isTransparent" property is true', () => {
        // Arrange & Act
        const propsData = {
            theme: 'je',
            isTransparent: true,
            companyName: 'Just Eat'
        };
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'c-icon--je,c-icon-je--transparentBckgrnd' not just 'c-icon-je--transparentBckgrnd'
        expect(logo.classes()).toContain('c-icon--je,c-icon-je--transparentBckgrnd');
    });

    it('shouldn\'t have "c-icon-je--transparentBckgrnd" class if "isTransparent" property is false', () => {
        // Arrange & Act
        const propsData = {
            theme: 'je',
            isTransparent: false,
            companyName: 'Just Eat'
        };
        const wrapper = shallowMount(Logo, { propsData });
        const logo = wrapper.find('[data-js-test="c-icon--je"]');

        // Assert
        // with dynamically rendered components
        // dynamic classes returned as one string in the array
        // so have to check for 'c-icon--je,c-icon-je--transparentBckgrnd' not just 'c-icon-je--transparentBckgrnd'
        expect(logo.classes()).not.toContain('c-icon--je,c-icon-je--transparentBckgrnd');
    });
});
