import Trak from '@justeat/f-trak';
import { pushToDataLayer, setGtmEventCookie } from '../helpers';

jest.mock('@justeat/f-trak');

const mockCategory = '__TEST_CATEGORY__';
const mockAction = '__TEST_ACTION__';
const mockLabel = '__TEST_LABEL__';

const mockWindowTrakData = {
    event: 'trackEvent',
    category: mockCategory,
    action: mockAction,
    label: mockLabel
};

describe('helpers', () => {
    describe('pushToDataLayer', () => {
        it('should call the window trak event with supplied object', () => {
            // Arrange
            window.trak = {}; // need to mock window

            // Act
            pushToDataLayer(mockCategory, mockAction, mockLabel);

            // Assert
            expect(Trak.event).toHaveBeenCalledWith(mockWindowTrakData);
        });
    });

    describe('setGtmEventCookie', () => {
        it('should pass the correct parameters to setCookie', () => {
            // Act
            setGtmEventCookie(mockCategory, mockAction, mockLabel);

            // Assert
            expect(document.cookie).toEqual(`je-gtm-event=${mockCategory}|${mockAction}|${mockLabel}`);
        });
    });
});
