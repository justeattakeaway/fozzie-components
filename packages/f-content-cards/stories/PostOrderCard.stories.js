import { withKnobs, text } from '@storybook/addon-knobs';
import PostOrderCard from '../src/components/cardTemplates/PostOrderCard.vue';
import { withA11y } from '@storybook/addon-a11y';

export default {
    title: 'Components/Atoms',
    decorators: [withKnobs, withA11y]
};

export const ContentCardscomponent = () => ({
    components: { PostOrderCard },
    props: {
        title: {
            default: text('Title', 'Promotional Offer')
        },
        cardTitle: {
            default: text('Card Title', 'Treat them with a Just Eat gift card')
        },
        description: {
            default: text('Card Description', 'Whether you want to treat Mum to her Friday night favourite, or surprise your mate with a ‘KFC on me’, show them you care – the tasty way.')
        },
        image: {
            default: text('Card Image', 'https://appboy-images.com/appboy/communication/marketing/content_cards_message_variations/images/5edf97b6141af454f8197e93/f43c54c99f2deca37600fa16331d7080c51717ef/original.png?1591711674')
        },
        icon: {
            default: text('Card Icon', 'https://appboy-images.com/appboy/communication/assets/image_assets/images/5ed7aac3967e180c25132d24/original.png?1591192259')
        },
        cta: {
            default: text('Card CTA', 'Purchase now')
        }
    },
    data () {
        return {
            card: {
                id: 'NWU1NTJjMWU2YThkNjM0ODllYzE3OGI5XyRfY2M9ZDg1MzM1ODktM2IyMC0xZmJkLWYwMzEtMTE5MjNjYjhiMjcyJm12PTVlNTUyYzFlNmE4ZDYzNDg5ZWMxNzhiZCZwaT1jbXA=',
                viewed: false,
                title: this.cardTitle,
                imageUrl: null,
                description: this.description,
                created: null,
                updated: '2020-02-25T14:21:15.000Z',
                categories: [],
                expiresAt: '2020-03-25T23:55:00.000Z',
                url: 'https://www.just-eat.co.uk/area/s637jj',
                linkText: 'www.just-eat.co.uk',
                aspectRatio: 1,
                extras: {
                    order: '1',
                    image_1: this.image, // eslint-disable-line
                    button_1: this.cta, // eslint-disable-line
                    icon_1: this.icon, // eslint-disable-line
                    custom_card_type: 'Post_Order_Card_1' // eslint-disable-line
                },
                pinned: false,
                dismissible: true,
                dismissed: false,
                clicked: false,
                Ra: null,
                Rf: null
            }
        };
    },
    template: '<post-order-card :card="card" :title="title" />'
});

ContentCardscomponent.story = {
    name: 'f-post-order-card'
};
