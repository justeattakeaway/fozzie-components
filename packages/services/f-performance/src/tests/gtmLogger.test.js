import gtmLogger from '../gtmLogger';
import metrics from '../metrics';

const getRandomMetric = () => {
    const metricKeys = Object.keys(metrics);
    const randIndex = Math.floor(Math.random() * metricKeys.length);
    return metrics[metricKeys[randIndex]];
};

const mockLogEventName = getRandomMetric();
const mockLogData = { data: 'testData' };

describe('GTM Logger for fPerformance Module', () => {
    beforeAll(() => {
        gtmLogger(mockLogEventName, mockLogData);
    });

    it('should be defined as an Array', async () => {
        // Arrange, Act & Assert
        expect(window.dataLayer).toBeDefined();
        expect(Array.isArray(window.dataLayer)).toBeTruthy();
    });

    it('should not be empty', async () => {
        // Arrange, Act & Assert
        expect(window.dataLayer.length).toBeGreaterThan(0);
    });

    it(`should contain entry ${mockLogEventName}`, async () => {
        const dataLayerEvent = window.dataLayer.filter(e => e.eventLabel === mockLogEventName);

        // Arrange, Act & Assert
        expect(dataLayerEvent.length).toBeGreaterThan(0);
    });
});
