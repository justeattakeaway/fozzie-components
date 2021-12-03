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

export const consumerAddressGetResponse = {
    data: {
        AddressId: 1050450174,
        City: 'Bristol',
        ZipCode: 'BS1 4DJ',
        AddressName: 'Office',
        IsDefault: true,
        Line1: 'Just Eat Takeaway',
        Line2: 'Broad Quay House'
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
    line1: consumerAddressGetResponse.data.Line1,
    line2: consumerAddressGetResponse.data.Line2,
    line3: consumerAddressGetResponse.data.Line3,
    city: consumerAddressGetResponse.data.City,
    postcode: consumerAddressGetResponse.data.ZipCode
};

export const consumerViewModel = {
    ...consumerDetailsMappedModel,
    ...consumerAddressMappedModel
};
