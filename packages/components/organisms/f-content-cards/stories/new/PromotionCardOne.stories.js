import { withA11y } from '@storybook/addon-a11y';
import PromotionCardOne from '../../src/components/cards/PromotionCardOne.vue';
import jeBackground from '../images/je-marketing.jpg';
import jeIcon from '../images/je-icon.png';

export default {
    title: 'Components/Molecules/f-content-cards/new',
    decorators: [withA11y]
};

function cardGenerator (type, title, image, icon, description, cta) {
    return {
        type,
        id: 'NWU1NTJjMWU2YThkNjM0ODllYzE3OGI5XyRfY2M9ZDg1MzM1ODktM2IyMC0xZmJkLWYwMzEtMTE5MjNjYjhiMjcyJm12PTVlNTUyYzFlNmE4ZDYzNDg5ZWMxNzhiZCZwaT1jbXA=',
        viewed: false,
        title,
        imageUrl: null,
        subtitle: description,
        description: ['Optional small T&C copy so it doesnt take up too much space making the card massive.'],
        created: null,
        updated: '2020-02-25T14:21:15.000Z',
        categories: [],
        expiresAt: '2020-03-25T23:55:00.000Z',
        url: 'https://www.just-eat.co.uk/area/s637jj',
        linkText: 'www.just-eat.co.uk',
        aspectRatio: 1,
        order: '1',
        image,
        ctaText: cta,
        icon,
        pinned: false,
        dismissible: true,
        dismissed: false,
        clicked: false,
        Ra: null,
        Rf: null
    };
}

function provide () {
    return {
        emitCardView () { },
        emitCardClick () { }
    };
}

export const PromotionCardOneComponent = (args, { argTypes }) => ({
    components: {
        PromotionCardOne
    },

    props: Object.keys(argTypes),

    provide,

    computed: {
        card () {
            return cardGenerator(
                'Promotion_Card_1',
                this.title,
                this.image,
                this.icon,
                this.description,
                this.cta
            );
        }
    },

    template: '<promotion-card-one :card="card" />'
});

const args = {
    title: 'StampCards are here',
    description: 'Earn money off your favourite restaurants wih our StampCard programme. Earn 5 stamps for a tasty discount.',
    image: jeBackground,
    icon: jeIcon,
    cta: 'View StampCards'
};

const argTypes = {
    title: {
        control: { type: 'text' },
        description: 'Changes text of card title'
    },
    description: {
        control: { type: 'text' },
        description: 'Changes text of card subtitle'
    },
    image: {
        control: { type: 'text' },
        description: 'Changes text of card mage'
    },
    icon: {
        control: { type: 'text' },
        description: 'Changes text of card icon'
    },
    cta: {
        control: { type: 'text' },
        description: 'Changes text of card cta'
    }
};

PromotionCardOneComponent.storyName = 'promotion-card-one';
PromotionCardOneComponent.args = args;
PromotionCardOneComponent.argTypes = argTypes;


