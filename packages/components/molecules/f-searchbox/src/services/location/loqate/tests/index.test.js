import loqate from '../';
import axios from 'axios';

describe('`Loqate`', () => {
    describe('`getPartialAddressSearch`', () => {
       it('should exist', () => {
           expect(loqate.getPartialAddressSearch).toBeDefined();
       });
       
       describe('when invoked', () => {
           beforeEach(() => {
               axios.get = jest.fn(() => Promise.resolve({ data: 'E46 SMG' }));
           });
    
           afterEach(() => {
               axios.get.mockClear();
           });
           
           it('should make a call to the `loqate` endpoint with correct params passed', () => {
               // Arrange
               loqate.key = 'S55-E46-2006-2013';
               
               // Act
               loqate.getPartialAddressSearch({
                   address: 'S54',
                   streetLevelAddress: 'S54-E46-2001-2006'
               });
               
               // Assert
               expect(axios.get).toHaveBeenCalledWith(
                   '/Find/v1.10/json3.ws',
                   {
                       baseURL: "https://api.addressy.com/Capture/Interactive",
                       params: {
                           Container: 'S54-E46-2001-2006',
                           Countries: 'GB',
                           Field1Format: '',
                           Field2Format: '',
                           Id: '',
                           Key: 'KK28-HF54-YE69-RA96',
                           Limit: '20',
                           Text: 'S54'
                       }
                   }
               );
           });
           
           it('should return a response from the `loqate` api once resolved `ok`', async () => {
               const result = [{
                   Id: 'GB|RM|ENG|1AA-IG6',
                   Type: 'Postcode',
                   Text: 'S58 B58',
                   Description: 'F97 X3 M, Germany - 23 Addresses'
               }];
               axios.get = jest.fn().mockImplementation(() => {
                   return new Promise(resolve => {
                       resolve({ data: result });
                   });
               });
    
               const response = await loqate.getPartialAddressSearch({
                   address: 'S54',
                   streetLevelAddress: 'S54-E46-2001-2006'
               });
    
               expect(response).toEqual(result);
           });
    
           it('should `throw` if the call fails', () => {
               axios.get = jest.fn(() => Promise.reject(new Error()));
               
               expect(() => {
                   return loqate.getPartialAddressSearch()
               }).toThrow();
           });
       });
    });
});
