import { getSuccess } from '../../helpers';

function getCustomer () {
    return {
        ConsumerId: 0,
        Id: '00000000',
        CreatedDate: '2021-07-01T09:12:56.197Z',
        ConsumerStatus: 'NewConsumer',
        EmailAddress: 'test@test.com',
        FirstName: 'test',
        LastName: 'test',
        PhoneNumber: '07111111111',
        DateOfBirth: '1900-01-01T00:00:00Z',
        TermsAndConditionsId: 6,
        WantsNewsletter: true,
        AccountType: 'Guest'
    };
}

export default [
    {
        url: '/get-customer',
        ...getSuccess,
        payload: getCustomer()
    }
];

