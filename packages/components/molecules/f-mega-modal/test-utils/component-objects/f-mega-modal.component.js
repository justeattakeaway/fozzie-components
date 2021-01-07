const megaModalComponent = () => $('[data-test-id="mega-modal-component"]');

exports.waitForMegaModal = () => megaModalComponent().waitForExist();
