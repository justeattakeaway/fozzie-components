import { createLocalVue, shallowMount } from '@vue/test-utils';
import copyToClipboard from 'copy-to-clipboard';
import VoucherCard from '../voucherCard/VoucherCard.vue';

const localVue = createLocalVue();

jest.mock('copy-to-clipboard');

const code = '__VOUCHER_CODE__';
const cardType = 'Voucher_Card_1';

const card = {
    url: 'https://foo.com/bar',
    voucherCode: code,
    type: cardType
};

const copy = {
    copyCodeLabel: 'Thou copiest',
    codeCopiedLabel: 'I have been copied'
};

const provide = {
    copy,
    emitVoucherCodeClick: jest.fn()
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
            beforeEach(() => {
                jest.useFakeTimers();
            });

            it('should make a call to `copy` with the correct params', () => {
                // Act
                wrapper.vm.copyVoucherCode();

                // Assert
                expect(copyToClipboard).toHaveBeenCalledWith(code);
            });

            it('should call the injected `emitVoucherCodeClick`', () => {
                // Act
                wrapper.vm.copyVoucherCode();

                // Assert
                expect(provide.emitVoucherCodeClick).toHaveBeenCalledWith(card.url);
            });

            it('should display the correct label while in cool down', async () => {
                // Act
                wrapper.vm.copyVoucherCode();
                await wrapper.vm.$nextTick();
                const copiedLabelSpan = wrapper.find('[data-test-id="contentCard-copied-label"]');

                // Assert
                expect(copiedLabelSpan.text()).toEqual(copy.codeCopiedLabel);
            });

            it('should display the correct label when cool down ends after 3 seconds', async () => {
                // Act
                wrapper.vm.copyVoucherCode();
                jest.advanceTimersByTime(3000);

                // run this to simulate transition
                wrapper.vm.copyCooldownComplete();
                await wrapper.vm.$nextTick();
                const copiedLabelSpan = wrapper.find('[data-test-id="contentCard-not-copied-label"]');

                // Assert
                expect(copiedLabelSpan.text()).toEqual(copy.copyCodeLabel);
            });
        });
    });
});
