import { getFeature, init, loadFromCdn } from '../src/configStore';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const cdnSettings = {
  scope: 'test-scope',
  environment: 'test-env',
  key: 'test-key',
  poll: true
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

//this is used to resolve any promises / awaits called from within a mocked timer
const flushPromises = () => new Promise(res => process.nextTick(res))

describe('When calling loadFromCdn', () => {  

  beforeEach(async () => {
    fetch.resetMocks();
    jest.useFakeTimers();

    fetch.mockResponse(JSON.stringify(fetchResponse));

    await loadFromCdn(cdnSettings);    
  });

  it('should make an initial call to fetch', async () => {
    
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://features.api.justeattakeaway.com/config/v1/${cdnSettings.scope}/${cdnSettings.environment}-${cdnSettings.key}`);
  });

  it('should start polling', async () => {
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 30000);

    jest.advanceTimersByTime(29000);
    expect(fetch).toHaveBeenCalledTimes(1);    

    jest.advanceTimersByTime(5000);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(2, `https://features.api.justeattakeaway.com/config/v1/${cdnSettings.scope}/${cdnSettings.environment}-${cdnSettings.key}`);
  });

  it.only('should not poll if poll setting false', async () => {
    //Arrange
    const newSettings = { ...cdnSettings, poll: false };

    //Act
    await loadFromCdn(newSettings);
    await flushPromises();
    expect(fetch).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(100000);

    //Assert
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('should honour different host', async () => {
    
    //Arrange
    const newSettings = { ...cdnSettings, host: 'https://test.com', pollInterval: 60000 };

    //Act
    await loadFromCdn(newSettings);

    //Assert
    expect(fetch).toHaveBeenCalledWith(`https://test.com/config/v1/${cdnSettings.scope}/${cdnSettings.environment}-${cdnSettings.key}`);
  });

  it('should honour different pollInterval', async () => {

    //Arrange
    const newSettings = { ...cdnSettings, host: 'https://test.com', pollInterval: 60000 };

    //Act
    await loadFromCdn(newSettings);

    //Assert
    expect(fetch).toHaveBeenCalledTimes(2);    

    jest.advanceTimersByTime(35000);
    expect(fetch).toHaveBeenCalledTimes(2);    

    jest.advanceTimersByTime(30000);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(fetch).toHaveBeenNthCalledWith(3, `https://test.com/config/v1/${cdnSettings.scope}/${cdnSettings.environment}-${cdnSettings.key}`);
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
    await loadFromCdn(cdnSettings, callbackMock);

    // Assert
    expect(callbackMock).toHaveBeenCalled();
  });

  it('should not call callback when config timestamp is not changed', async () => {
    // Arrange
    const callbackMock = jest.fn();

    // Act
    await loadFromCdn(cdnSettings, callbackMock);

    // Assert
    expect(callbackMock).not.toHaveBeenCalled();
  });

});