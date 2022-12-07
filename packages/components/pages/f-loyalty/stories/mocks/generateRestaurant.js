import { faker } from '@faker-js/faker';
import { range } from 'lodash-es';

faker.seed(192597);

const generateInProgressStampCards = () => ({
    stampsCollected: faker.datatype.number({ min: 1, max: 5, precision: 1 }),
    currentDiscountValue: faker.datatype.number({
        min: 1000,
        max: 10000,
        precision: 1
    }),
    expectedRewardIssueDate: faker.date.soon(1)
});

const generateRewards = () => {
    const issueDate = faker.date.recent(90);
    const d = new Date(issueDate);
    const expiryDate = new Date(d.setDate(d.getDate() + 90)).toISOString();
    return {
        rewardType: 'discount',
        issueDate,
        expiryDate,
        discountValue: faker.datatype.number({ min: 1000, max: 10000, precision: 1 })
    };
};

const generateRestaurant = id => ({
    restaurantInfo: {
        id,
        name: faker.company.companyName(),
        seoName: faker.company.bs()
    },
    restaurantSubscriptionInfo: {
        timeZone: faker.address.timeZone(),
        optInDate: faker.date.past(),
        optOutDate: null,
        optOutConfirmationDate: null,
        offerInformation: {
            offerType: 'default',
            stampCardSize: 5,
            discountPercentage: faker.helpers.arrayElement([10, 15])
        }
    },
    inProgressStampCards: [generateInProgressStampCards()],
    rewards: [
        ...range(faker.datatype.number({ min: 0, max: 2, precision: 1 })).map(generateRewards)
    ]
});

export default generateRestaurant;
