import { faker } from '@faker-js/faker';

faker.seed(194367);

const generateStampCards = () => ([
    {
        id: '29221-in-progress-card-0',
        source: 'StampCardsAdapter',
        title: 'Denesik - Labadie',
        restaurantId: '29221',
        type: 'Stamp_Card_1',
        subtitle: "You've saved up £79.84 so far. You're 3 stamps away from a delicious discount.",
        image: 'https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/29221.gif',
        url: '/morph magnetic functionalities/menu',
        discountPercentage: 10,
        currentDiscountValue: 7984,
        earnedStamps: 2,
        isReadyToClaim: false,
        totalRequiredStamps: 5,
        metadata: {
            viewTime: null,
            coordinates: {
                x: null,
                y: null
            }
        }
    },
    {
        id: '29221-completed-card-0',
        source: 'StampCardsAdapter',
        restaurantId: '29221',
        title: 'Denesik - Labadie',
        type: 'Stamp_Card_1',
        subtitle: 'Time to claim your <strong>£63.57</strong> discount',
        description: [
            'This will automatically be applied to your next order from this restaurant.'
        ],
        image: 'https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/29221.gif',
        url: '/morph magnetic functionalities/menu',
        discountPercentage: 10,
        earnedStamps: 5,
        rewardValue: 6357,
        expiryDate: '2023-02-11T06:33:30.131Z',
        expiryLine: 'Discount expires 11/02/2023',
        isReadyToClaim: true,
        totalRequiredStamps: 5,
        metadata: {
            viewTime: null,
            coordinates: {
                x: null,
                y: null
            }
        }
    },
    {
        id: '29221-completed-card-1',
        source: 'StampCardsAdapter',
        restaurantId: '29221',
        title: 'Denesik - Labadie',
        type: 'Stamp_Card_1',
        subtitle: 'Time to claim your <strong>£41.06</strong> discount',
        description: [
            'This will automatically be applied to your next order from this restaurant.'
        ],
        image: 'https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/29221.gif',
        url: '/morph magnetic functionalities/menu',
        discountPercentage: 10,
        earnedStamps: 5,
        rewardValue: 4106,
        expiryDate: '2023-01-30T18:43:05.725Z',
        expiryLine: 'Discount expires 30/01/2023',
        isReadyToClaim: true,
        totalRequiredStamps: 5,
        metadata: {
            viewTime: null,
            coordinates: {
                x: null,
                y: null
            }
        }
    },
    {
        id: '183152-in-progress-card-0',
        source: 'StampCardsAdapter',
        title: 'Gottlieb LLC',
        restaurantId: '183152',
        type: 'Stamp_Card_1',
        subtitle: "You've saved up £68.85 so far. You're 3 stamps away from a delicious discount.",
        image: 'https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/183152.gif',
        url: '/integrate one-to-one users/menu',
        discountPercentage: 10,
        currentDiscountValue: 6885,
        earnedStamps: 2,
        isReadyToClaim: false,
        totalRequiredStamps: 5,
        metadata: {
            viewTime: null,
            coordinates: {
                x: null,
                y: null
            }
        }
    },
    {
        id: '95259-in-progress-card-0',
        source: 'StampCardsAdapter',
        title: 'Windler, Jones and Kub',
        restaurantId: '95259',
        type: 'Stamp_Card_1',
        subtitle: "You've saved up £47.07 so far. You're 4 stamps away from a delicious discount.",
        image: 'https://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/95259.gif',
        url: '/iterate compelling platforms/menu',
        discountPercentage: 10,
        currentDiscountValue: 4707,
        earnedStamps: 1,
        isReadyToClaim: false,
        totalRequiredStamps: 5,
        metadata: {
            viewTime: null,
            coordinates: {
                x: null,
                y: null
            }
        }
    }
]);

export default generateStampCards;
