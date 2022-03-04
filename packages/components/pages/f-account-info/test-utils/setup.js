import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import tenantConfigs from '../src/tenants';

export const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);

export const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

export const baseUrl = 'https://smartGatewayBaseUrl.com';

export const token = 'some-auth-token';

export const conversationId = 'b7386108-95e6-4e73-9421-5b066c089153';

export const consumerDetailsGetResponse = {
    data: {
        ConsumerId: 1050450174,
        Id: '8It2lEaJjG82nJtxO00Iab0CoF0=',
        CreatedDate: '2019-04-16T17:25:00.000Z',
        EmailAddress: 'satchin.moriyoka@example.com',
        FirstName: 'Satchin',
        LastName: 'Moriyoka',
        PhoneNumber: '+441234567890',
        DateOfBirth: '1914-04-16T17:25:00.000Z',
        TermsAndConditionsId: 0,
        WantsNewsletter: true,
        AccountType: 'Default',
        ConsumerStatus: 'ReturnConsumer'
    }
};

const consumerAddressGetResponse = {
    AddressId: 1050450174,
    City: 'Bristol',
    ZipCode: 'BS1 4DJ',
    AddressName: 'Office',
    IsDefault: true, // Key field
    Line1: 'Just Eat',
    Line2: 'Broad Quay House'
};

export const consumerAddressesGetResponse = {
    data: {
        Addresses: [{
            ...consumerAddressGetResponse
        },
        {
            AddressId: 1050450175,
            City: 'Bristol',
            ZipCode: 'BS1 9DJ',
            AddressName: 'Office',
            IsDefault: false,
            Line1: 'Takeaway',
            Line2: 'Broad Quay House'
        }]
    }
};

export const consumerDetailsMappedModel = {
    id: consumerDetailsGetResponse.data.ConsumerId,
    firstName: consumerDetailsGetResponse.data.FirstName,
    lastName: consumerDetailsGetResponse.data.LastName,
    phoneNumber: consumerDetailsGetResponse.data.PhoneNumber,
    emailAddress: consumerDetailsGetResponse.data.EmailAddress
};

export const consumerAddressMappedModel = {
    line1: consumerAddressGetResponse.Line1,
    line2: consumerAddressGetResponse.Line2,
    line3: consumerAddressGetResponse.Line3,
    locality: consumerAddressGetResponse.City,
    postcode: consumerAddressGetResponse.ZipCode
};

export const consumerViewModel = {
    ...consumerDetailsMappedModel,
    ...consumerAddressMappedModel
};

export const consumerStateModel = {
    consumer: {
        ...consumerDetailsMappedModel,
        ...consumerAddressMappedModel
    }
};

export const consumerUpdateBody = {
    FirstName: 'harry',
    LastName: 'Potter',
    Address: {
        Line1: '4 Privet Drive',
        Line2: 'Little Whinging',
        Line3: null,
        City: 'Surrey',
        ZipCode: 'CR25ER'
    },
    PhoneNumber: '+441234567890'
};
