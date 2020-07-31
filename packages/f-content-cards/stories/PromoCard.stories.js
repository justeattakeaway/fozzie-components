import { withKnobs, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import PromotionCard from '../src/components/cardTemplates/PromotionCard.vue';
import jeBackground from './images/je-marketing.png';
import jeIcon from './images/je-icon.png';

export default {
    title: 'Components/Atoms/f-content-cards',
    decorators: [withKnobs, withA11y]
};

function PromotionCardStoryGenerator (type) {
    return () => ({
        components: { PromotionCard },
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
                default: text('Card Image', jeBackground)
            },
            icon: {
                default: text('Card Icon', jeIcon)
            },
            cta: {
                default: text('Card CTA', 'Purchase now')
            }
        },
        provide () {
            return {
                emitCardView () {},
                emitCardClick () {}
            };
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
                        custom_card_type: type // eslint-disable-line
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
        template: '<promotion-card :card="card" />'
    });
}

export const PromotionCard1component = PromotionCardStoryGenerator('Promotion_Card_1');

PromotionCard1component.story = {
    name: 'promotion-card-1'
};


export const PromotionCard2component = PromotionCardStoryGenerator('Promotion_Card_2');

PromotionCard2component.story = {
    name: 'promotion-card-2'
};
