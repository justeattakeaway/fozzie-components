import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import TakeawaypayActivation from '../TakeawaypayActivation.vue';
import TakeawaypayActivationServiceApi from '../../services/TakeawaypayActivationServiceApi';
import i18n from './helpers/setup';

const localVue = createLocalVue();
localVue.use(VueI18n);

jest.mock('../../services/TakeawaypayActivationServiceApi', () => ({
    isActivationAvailable: jest.fn()
}));

// eslint-disable-next-line
const mockAuthTokenRegistered = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
    + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0Z'
    + 'WRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9'
    + 'lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rV'
    + 'HlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dn'
    + 'cyIsInN1YiI6IjEyMzQ1IiwiaWF0IjoxNjE1NDY5NTE2fQ.inx-zsHmOTM6zxNfLJIx'
    + '8W02Eqe-D4jMYAI_qCFBwlk';

// eslint-disable-next-line
const mockAuthTokenGuest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
    + 'eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZ'
    + 'WF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW'
    + '1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXp'
    + 'PZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1p'
    + 'bHlfbmFtZSI6IkJsb2dncyIsInN1YiI6IjEyMzQ1Iiwicm9sZSI6Ikd1ZXN0Ii'
    + 'wiaWF0IjoxNjE1NDY5NTE2fQ.ngfAKpiMH4Gk0Y4gAVC4KeLadWFtVXx4hD1_BSW9SN0';

describe('TakeawaypayActivation', () => {
    const propsData = {
        getActivationStatusUrl: '/status',
        activateUrl: '/activate',
        loginUrl: '/login',
        registrationUrl: '/register',
        homeUrl: '/',
        authToken: 'token',
        locale: 'en-GB'
    };
    const wrapper = shallowMount(TakeawaypayActivation, {
        i18n,
        localVue,
        propsData
    });

    it('should be defined', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should render ActivationFailed component', async () => {
        wrapper.setData({
            activationState: 'none'
        });
        await wrapper.vm.$nextTick();
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationSuccessful component', async () => {
        wrapper.setData({
            activationState: 'succeeded'
        });
        await wrapper.vm.$nextTick();
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationLoggedIn component', async () => {
        wrapper.setData({
            activationState: 'available_logged_in'
        });
        await wrapper.vm.$nextTick();
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    it('should render ActivationNotLoggedIn component', async () => {
        wrapper.setData({
            activationState: 'available_not_logged_in'
        });
        await wrapper.vm.$nextTick();
        const container = wrapper.find('[data-test-id="takeawaypay-activation-component"]');

        expect(container).toMatchSnapshot();
    });

    describe('methods ::', () => {
        describe('initialize ::', () => {
            beforeEach(() => {
                TakeawaypayActivationServiceApi.isActivationAvailable.mockClear();
            });

            it('should set state to `failed` when activation is not available', async () => {
                await wrapper.vm.initialize();

                expect(wrapper.vm.activationState).toBe('failed');
            });

            it('should set state to `available_not_logged_in` when activation is available and no auth token', async () => {
                TakeawaypayActivationServiceApi.isActivationAvailable.mockImplementation(async () => true);
                wrapper.setProps({
                    authToken: ''
                });

                await wrapper.vm.initialize();

                expect(wrapper.vm.activationState).toBe('available_not_logged_in');
            });

            it('should set state to `available_logged_in` when activation is available and auth token is present', async () => {
                TakeawaypayActivationServiceApi.isActivationAvailable.mockImplementation(async () => true);
                wrapper.setProps({
                    authToken: mockAuthTokenRegistered
                });

                await wrapper.vm.initialize();

                expect(wrapper.vm.activationState).toBe('available_logged_in');
            });

            it('should set state to `available_not_logged_in` when activation is available and auth token is for guest', async () => {
                TakeawaypayActivationServiceApi.isActivationAvailable.mockImplementation(async () => true);
                wrapper.setProps({
                    authToken: mockAuthTokenGuest
                });

                await wrapper.vm.initialize();

                expect(wrapper.vm.activationState).toBe('available_not_logged_in');
            });
        });
    });
});
