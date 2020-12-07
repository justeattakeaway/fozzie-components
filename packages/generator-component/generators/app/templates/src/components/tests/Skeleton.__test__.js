import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import <%= name.component %> from '../<%= name.filename %>.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();

localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: tenantConfigs['en-GB']
};

describe('<%= name.filename %>', () => {
    allure.feature('<%= name.filename %>');

    it('should be defined', () => {
        const wrapper = shallowMount(<%= name.component %>, {
            i18n,
            localVue
        });

        expect(wrapper.exists()).toBe(true);
    });
});
