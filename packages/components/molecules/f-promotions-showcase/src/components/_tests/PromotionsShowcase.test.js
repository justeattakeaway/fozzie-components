import { createLocalVue, shallowMount } from '@vue/test-utils';
import PromotionsShowcase from '../PromotionsShowcase.vue';

describe('PromotionsShowcase', () => {
    it('should not render out the containing element if `items` provided is empty', () => {
        const propsData = {
            items: []
        };
        const wrapper = shallowMount(PromotionsShowcase, { propsData });
        expect(wrapper.find('[data-test-id="promotionsShowcase"]').exists()).toBe(false);
    });

    it('should not render out the containing element if no `items` provided', () => {
        const propsData = {};
        const wrapper = shallowMount(PromotionsShowcase, { propsData });
        expect(wrapper.find('[data-test-id="promotionsShowcase"]').exists()).toBe(false);
    });

    it.each([[1], [2], [3], [4]])('should render out the number of `items` provided (%s)', items => {
        const propsData = {
            items: (new Array(items)).fill({
                title: 'Foo',
                lines: ['Bar']
            })
        };
        const wrapper = shallowMount(PromotionsShowcase, { propsData });
        expect(wrapper.findAll('[data-test-id="promotionsShowcase--item"]').length).toBe(items);
    });

    it('should render an item with an illustration component if provided', () => {
        const localVue = createLocalVue();
        const illustration = localVue.extend({
            name: 'test',
            render (createElement) {
                return createElement('svg', 'foo');
            }
        });
        const propsData = {
            items: [{
                illustration,
                title: 'Foo',
                lines: ['Bar']
            }]
        };
        const wrapper = shallowMount(PromotionsShowcase, { localVue, propsData });
        const foundIllustration = wrapper.findComponent(illustration);
        expect(foundIllustration.exists()).toBe(true);
        expect(foundIllustration.attributes('data-test-id')).toBe('promotionsShowcase--itemIllustration');
    });

    it('should render a link when given a text link for an item', () => {
        const linkText = '#im-a-link';
        const propsData = {
            items: [{
                title: 'Foo',
                lines: ['Bar'],
                link: linkText
            }]
        };
        const wrapper = shallowMount(PromotionsShowcase, { propsData });
        const item = wrapper.find('[data-test-id="promotionsShowcase--item"]');
        expect(item.exists()).toBe(true);
        expect(item.element.tagName).toBe('A');
        expect(item.attributes('href')).toBe(linkText);
    });

    describe('when given a object link including href for an item', () => {
        const linkText = '#im-a-link';
        const rel = 'noopener';
        const target = '_blank';
        const propsData = {
            items: [{
                title: 'Foo',
                lines: ['Bar'],
                link: {
                    href: linkText,
                    target,
                    rel
                }
            }]
        };
        let wrapper;
        let item;

        beforeEach(() => {
            wrapper = shallowMount(PromotionsShowcase, { propsData });
            item = wrapper.find('[data-test-id="promotionsShowcase--item"]');
        });

        it('should render a link', () => {
            expect(item.exists()).toBe(true);
            expect(item.element.tagName).toBe('A');
        });

        it.each([
            ['href', linkText],
            ['target', target],
            ['rel', rel]
        ])('should render the correct `%s` attribute', (attr, expectedValue) => {
            expect(item.attributes(attr)).toBe(expectedValue);
        });
    });

    describe('when given neither a text, object or callback link for an item', () => {
        const propsData = {
            items: [{
                title: 'Foo',
                lines: ['Bar']
            }]
        };
        let wrapper;
        let item;

        beforeEach(() => {
            wrapper = shallowMount(PromotionsShowcase, { propsData });
            item = wrapper.find('[data-test-id="promotionsShowcase--item"]');
            expect(item.exists()).toBe(true);
        });

        it('should not render as a link', () => {
            expect(item.element.tagName).not.toBe('A');
            expect(item.attributes('href')).toBeUndefined();
        });

        it('should not render as a button ', () => {
            expect(item.element.tagName).not.toBe('BUTTON');
        });
    });

    describe('when provided with a function as the link for an item', () => {
        let callback;
        let item;

        beforeEach(() => {
            callback = jest.fn();
            const propsData = {
                items: [{
                    title: 'Foo',
                    lines: ['Bar'],
                    link: callback
                }]
            };
            const wrapper = shallowMount(PromotionsShowcase, { propsData });

            item = wrapper.find('[data-test-id="promotionsShowcase--item"]');
            expect(item.exists()).toBe(true);
        });

        it('should render a button', () => {
            expect(item.exists()).toBe(true);
            expect(item.element.tagName).toBe('BUTTON');
        });

        it('should not call the callback before item is clicked', () => {
            expect(callback).not.toHaveBeenCalled();
        });

        it('should not call the callback before item is clicked', () => {
            expect(callback).not.toHaveBeenCalled();
        });

        it('should invoke the callback when item is clicked', async () => {
            await item.trigger('click');
            expect(callback).toHaveBeenCalled();
        });
    });
});
