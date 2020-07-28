import { createLocalVue, shallowMount } from '@vue/test-utils';
import copyToClipboard from 'copy-to-clipboard';
import VoucherCard from '../VoucherCard.vue';

const localVue = createLocalVue();

jest.mock('copy-to-clipboard');

const code = '__VOUCHER_CODE__';
const cardType = 'Voucher_Card_1';

const card = {
    url: 'https://foo.com/bar',
    extras: {
        voucher_code: code, // eslint-disable-line camelcase
        custom_card_type: cardType // eslint-disable-line camelcase
    }
};

const copy = {
    copyCodeLabel: 'Thou copiest'
};

const provide = {
    copy,
    emitVoucherCodeClicked: jest.fn()
};

function getWrapper () {
    return shallowMount(VoucherCard, {
        localVue,
        propsData: {
            card
        },
        provide
    });
}

describe('contentCards › VoucherCard', () => {
    let wrapper;

    beforeEach(() => {
        jest.resetAllMocks();

        // Arrange
        wrapper = getWrapper();
    });

    it('should display the voucher code', () => {
        // Assert
        expect(wrapper.find('[data-test-id="contentCard-voucherCard1-code"]').text()).toBe(code);
    });

    it('should call the copyVoucherCode method when clicked', () => {
        // Arrange
        const copyVoucherCodeSpy = jest.spyOn(VoucherCard.methods, 'copyVoucherCode');
        wrapper = getWrapper();

        // Act
        wrapper.find('[data-test-id="contentCard-voucherCard1"]').trigger('click');

        // Assert
        try {
            expect(copyVoucherCodeSpy).toHaveBeenCalled();
        } finally {
            // Clean Up - no point in having a afterEach just for this one test
            VoucherCard.methods.copyVoucherCode.mockRestore();
        }
    });

    describe('`copyVoucherCode` method', () => {
        it('should exist', () => {
            // Assert
            expect(wrapper.vm.copyVoucherCode).toBeDefined();
        });

        describe('when invoked', () => {
            it('should make a call to `copy` with the correct params', () => {
                // Act
                wrapper.vm.copyVoucherCode();

                // Assert
                expect(copyToClipboard).toHaveBeenCalledWith(code);
            });

            it('should call the injected `emitVoucherCodeClicked`', () => {
                // Act
                wrapper.vm.copyVoucherCode();

                // Assert
                expect(provide.emitVoucherCodeClicked).toHaveBeenCalledWith(card.url);
            });
        });
    });
});
