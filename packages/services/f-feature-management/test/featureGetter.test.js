import { getFeature, init, poll } from '../src/featureGetter';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const settings = {
  scope: 'test-scope',
  environment: 'test-env',
  key: 'test-key'
};

const fetchResponse = {
  createdAt: '2021-09-10 15:00',
  features: [
    {
      key: 'key1',
      testVal: 'val1'
    }
  ]
};

const flushPromises = () => new Promise(res => process.nextTick(res))

describe('When calling poll', () => {  

  beforeEach(async () => {
    fetch.resetMocks();
    jest.useFakeTimers();

    fetch.mockResponse(JSON.stringify(fetchResponse));

    await poll(settings);    
  });

  it('should make an initial call to fetch', async () => {
    
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://features.api.justeattakeaway.com/config/v1/${settings.scope}/${settings.environment}-${settings.key}`);
  });

  it('should start polling', async () => {
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 30000);

    jest.advanceTimersByTime(29000);
    expect(fetch).toHaveBeenCalledTimes(1);    

    jest.advanceTimersByTime(1000);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(2, `https://features.api.justeattakeaway.com/config/v1/${settings.scope}/${settings.environment}-${settings.key}`);
  });

  it('should honour different host', async () => {
    
    //Arrange
    const newSettings = { ...settings, host: 'https://test.com', pollInterval: 60000 };

    //Act
    await poll(newSettings);

    //Assert
    expect(fetch).toHaveBeenCalledWith(`https://test.com/config/v1/${settings.scope}/${settings.environment}-${settings.key}`);
  });

  it('should honours different pollInterval', async () => {

    //Arrange
    const newSettings = { ...settings, host: 'https://test.com', pollInterval: 60000 };

    //Act
    await poll(newSettings);

    //Assert
    expect(fetch).toHaveBeenCalledTimes(2);    

    jest.advanceTimersByTime(35000);
    expect(fetch).toHaveBeenCalledTimes(2);    

    jest.advanceTimersByTime(30000);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenNthCalledWith(3, `https://test.com/config/v1/${settings.scope}/${settings.environment}-${settings.key}`);
  });

  it('should initialise features correctly', async () => {
    expect(getFeature('key2')).toBeFalsy();
    expect(getFeature('key1')).toBeTruthy();
    expect(getFeature('key1').testVal).toBe('val1');
  });

  it('should update features when config changes', async () => {

    //Arrange
    fetchResponse.features[0].key = 'key2';
    fetchResponse.createdAt = '2021-09-11 15:00';

    fetch.mockResponse(JSON.stringify(fetchResponse));

    //Act
    jest.advanceTimersToNextTimer();

    await flushPromises();

    //Assert
    expect(getFeature('key1')).toBeFalsy();
    expect(getFeature('key2')).toBeTruthy();    
    expect(getFeature('key2').testVal).toBe('val1');
  });

  it('should call callback when config timestamp changes', async () => {
    // Arrange
    const callbackMock = jest.fn();

    fetchResponse.createdAt = '2021-10-01 09:00';
    fetch.mockResponse(JSON.stringify(fetchResponse));
    
    // Act
    await poll(settings, callbackMock);

    // Assert
    expect(callbackMock).toHaveBeenCalled();
  });

  it('should not call callback when config timestamp is not changed', async () => {
    // Arrange
    const callbackMock = jest.fn();

    // Act
    await poll(settings, callbackMock);

    // Assert
    expect(callbackMock).not.toHaveBeenCalled();
  });

});