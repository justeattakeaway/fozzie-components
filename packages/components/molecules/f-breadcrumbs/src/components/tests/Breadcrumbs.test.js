import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import BreadCrumbs from '../Breadcrumbs.vue';

describe('BreadCrumbs', () => {
    it('should be defined', () => {
        // Arrange
        const propsData = {};

        // Act
        const wrapper = shallowMount(BreadCrumbs, { propsData });

        // Assert
        expect(wrapper.exists()).toBe(true);
    });

    it('should render a link when a url is supplied', () => {
        // Arrange
        const propsData = {
            links: [{
                name: 'Link 1',
                url: '/link/1',
                routerLink: false
            }]
        };

        // Act
        const wrapper = shallowMount(BreadCrumbs, { propsData });
        const breadcrumbLinks = wrapper.findAll('li > a');

        // Assert
        expect(breadcrumbLinks).toHaveLength(1);
    });

    it('should render a router link if routerLink is true', () => {
        // Arrange
        const propsData = {
            links: [{
                name: 'Router Link 1',
                url: '/routerlink/1',
                routerLink: true
            }]
        };

        // Act
        const wrapper = shallowMount(BreadCrumbs, {
            propsData,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });
        const breadcrumbRouterLinks = wrapper.findAllComponents(RouterLinkStub);

        // Assert
        expect(breadcrumbRouterLinks).toHaveLength(1);
    });

    it('should render a link for each url supplied', () => {
        // Arrange
        const propsData = {
            links: [
                {
                    name: 'Link 1',
                    url: '/link/1',
                    routerLink: false
                },
                {
                    name: 'Link 2',
                    url: '/link/2',
                    routerLink: false
                }
            ]
        };

        // Act
        const wrapper = shallowMount(BreadCrumbs, { propsData });
        const breadcrumbLinks = wrapper.findAll('li > a');

        // Assert
        expect(breadcrumbLinks).toHaveLength(2);
    });

    it.each([
        ['empty', ''],
        ['undefined', undefined],
        ['null', null]
    ])('should render a text node when url is %s', (_, url) => {
        // Arrange
        const propsData = {
            links: [{
                name: 'Text 1',
                url,
                routerLink: false
            }]
        };

        // Act
        const wrapper = shallowMount(BreadCrumbs, { propsData });
        const breadcrumbElements = wrapper.findAll('li');
        const breadcrumbLinks = wrapper.findAll('li > a');

        // Assert
        expect(breadcrumbElements).toHaveLength(1); // There are no separators
        expect(breadcrumbLinks).toHaveLength(0);
    });

    it('should render a text node if router link url is missing', () => {
        // Arrange
        const propsData = {
            links: [{
                name: 'Router Link 1',
                url: '',
                routerLink: true
            }]
        };

        // Act
        const wrapper = shallowMount(BreadCrumbs, { propsData });
        const breadcrumbElements = wrapper.findAll('li');
        const breadcrumbLinks = wrapper.findAll('li > a');

        // Assert
        expect(breadcrumbElements).toHaveLength(1); // There are no separators
        expect(breadcrumbLinks).toHaveLength(0);
    });

    it('should render a mix of links and spans when not all links have urls', () => {
        // Arrange
        const propsData = {
            links: [
                {
                    name: 'Link 1',
                    url: '/link/1',
                    routerLink: false
                },
                {
                    name: 'Link 2',
                    url: '',
                    routerLink: false
                }
            ]
        };

        // Act
        const wrapper = shallowMount(BreadCrumbs, { propsData });

        const breadcrumbLinks = wrapper.findAll('li > a');
        const breadcrumbElements = wrapper.findAll('li');

        // Assert
        expect(breadcrumbLinks).toHaveLength(1);
        expect(breadcrumbElements).toHaveLength(3); // Includes separator
    });
});
