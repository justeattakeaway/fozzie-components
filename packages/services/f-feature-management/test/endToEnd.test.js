import createFeatureManagementInstance from '../src/index';
import { setContextGetter } from '../src/contextGetter';
import trackExperiment from '../src/trackExperiment';

const expectations = require('./data/e2e-expectations.json');
const config = require('./data/e2e-fmconfig-mixed.json');

const logger = {
    logError(){},
    logWarn(){},
    logInfo(){}
}



jest.mock('../src/trackExperiment');


describe('End-to-End Tests', () => {

    describe.each(expectations.expectations)('Expectation %# - ', ({
        description, expectation, feature, valueType, context
    }) => {       

        it(description, async () => {

            const fm = await createFeatureManagementInstance({
                initialConfigAsJson: JSON.stringify(config),
                logger: logger
            });
            
            const functionMap = {
                bool: fm.getBooleanValue.bind(fm),
                int: fm.getIntegerValue.bind(fm),
                string: fm.getStringValue.bind(fm)
            };
            

            setContextGetter(() => ({
                anonUserId: context.anonUserId,
                appVersion: context.appVersion,
                country: context.tenant
            }));

            trackExperiment.mockClear();

            const { value: expectedValue, experimentKey: expectedKey, experimentVariant: expectedVariant } = expectation;
            const featureValue = functionMap[valueType](feature);

            expect(featureValue).toBe(expectedValue);
            
            if (expectedKey && expectedVariant) {

                expect(trackExperiment).toHaveBeenCalled();
                const trackingEventSent = trackExperiment.mock.calls[0][0];
                
                expect(trackingEventSent.experimentKey).toBe(expectedKey);
                expect(trackingEventSent.experimentVariant).toBe(expectedVariant);
            } else {
                expect(trackExperiment).not.toHaveBeenCalled();
            }
        });
    });
});
