import { shallowMount } from '@vue/test-utils';
import { windowServices } from '@justeat/f-services';
import root from 'window-or-global';
import LinkList from '../LinkList.vue';

jest.mock('@justeat/f-services', () => ({
    windowServices: {
        addEvent: jest.fn(),
        getWindowWidth: jest.fn()
    }
}));

const addEvent = (eventName, callbackFunction) => {
    root.addEventListener(eventName, callbackFunction);
    return callbackFunction;
};

windowServices.addEvent.mockImplementation(addEvent);
windowServices.getWindowWidth.mockImplementation(() => root.innerWidth);

const wrapper = shallowMount(LinkList, {
    propsData: {
        linkList: {
            title: 'Customer service',
            links: [
                {
                    url: '/contact',
                    text: 'Contact us'
                }
            ]
        }
    }
});

describe('LinkList component', () => {
    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    describe('for narrow viewport widths', () => {
        beforeEach(() => {
            window.innerWidth = 414;
            window.dispatchEvent(new Event('resize'));
        });

        it('should display the headers as buttons', () => {
            // Arrange
            const linkListHeaderButton = wrapper.find('[data-test-id="linkList-header-button"]');
            const linkListHeaderText = wrapper.find('[data-test-id="linkList-header-text"]');

            // Assert
            expect(linkListHeaderButton.exists()).toBe(true);
            expect(linkListHeaderText.exists()).toBe(false);
        });

        it('should be in a collapsed state', () => {
            // Arrange & Act
            const linkListCollapsedWrapper = wrapper.find('[data-test-id="linkList-wrapper-collapsed"]');

            // Assert
            expect(linkListCollapsedWrapper.exists()).toBe(true);
        });

        it('should be in an open state when linkList title has been clicked', async () => {
            // Arrange
            const linkListHeader = wrapper.find('[data-test-id="linkList-header-button"]');

            // Act
            await linkListHeader.trigger('click'); // wait for DOM to update as a result of click being triggered
            const linkListOpenWrapper = wrapper.find('[data-test-id="linkList-wrapper"]');
            const linkListCollapsedWrapper = wrapper.find('[data-test-id="linkList-wrapper-collapsed"]');

            // Assert
            expect(linkListOpenWrapper.exists()).toBe(true);
            expect(linkListCollapsedWrapper.exists()).toBe(false);
        });
    });

    describe('for wide viewport widths', () => {
        beforeEach(() => {
            window.innerWidth = 1200;
            window.dispatchEvent(new Event('resize'));
        });

        it('should display the headers as text', () => {
            // Arrange
            const linkListHeaderButton = wrapper.find('[data-test-id="linkList-header-button"]');
            const linkListHeaderText = wrapper.find('[data-test-id="linkList-header-text"]');

            // Assert
            expect(linkListHeaderButton.exists()).toBe(false);
            expect(linkListHeaderText.exists()).toBe(true);
        });

        it('should be in an open state', () => {
            // Arrange & Act
            const linkListCollapsedWrapper = wrapper.find('[data-test-id="linkList-wrapper-collapsed"]');
            const linkListOpenWrapper = wrapper.find('[data-test-id="linkList-wrapper"]');

            // Assert
            expect(linkListOpenWrapper.exists()).toBe(true);
            expect(linkListCollapsedWrapper.exists()).toBe(false);
        });
    });
});
