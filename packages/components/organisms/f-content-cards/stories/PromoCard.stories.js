import { withA11y } from '@storybook/addon-a11y';
import PromotionCard from '../src/components/cardTemplates/PromotionCard.vue';
import jeBackground from './images/je-marketing.jpg';
import jeIcon from './images/je-icon.png';

export default {
    title: 'Components/Molecules/f-content-cards',
    decorators: [withA11y]
};

function cardGenerator (type, title, image, icon, description, cta) {
    return {
        card: {
            type,
            id: 'NWU1NTJjMWU2YThkNjM0ODllYzE3OGI5XyRfY2M9ZDg1MzM1ODktM2IyMC0xZmJkLWYwMzEtMTE5MjNjYjhiMjcyJm12PTVlNTUyYzFlNmE4ZDYzNDg5ZWMxNzhiZCZwaT1jbXA=',
            viewed: false,
            title,
            imageUrl: null,
            subtitle: description,
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
        }
    };
}

function provide () {
    return {
        emitCardView () { },
        emitCardClick () { }
    };
}

export const PromotionCard1Component = (args, { argTypes }) => ({
    components: {
        PromotionCard
    },

    props: Object.keys(argTypes),

    provide,

    data () {
        return cardGenerator(
            'Promotion_Card_1',
            this.title,
            this.image,
            this.icon,
            this.description,
            this.cta
        );
    },

    template: '<promotion-card :card="card" />'
});

export const PromotionCard2Component = (args, { argTypes }) => ({
    components: {
        PromotionCard
    },

    props: Object.keys(argTypes),

    provide,

    data () {
        return cardGenerator(
            'Promotion_Card_2',
            this.title,
            this.image,
            this.icon,
            this.description,
            this.cta
        );
    },

    template: '<promotion-card :card="card" />'
});

const args = {
    title: 'Treat them with a Just Eat gift card',
    description: 'Whether you want to treat Mum to her Friday night favourite, or surprise your mate with a ‘KFC on me’, show them you care – the tasty way.',
    image: jeBackground,
    icon: jeIcon,
    cta: 'Purchase now'
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

PromotionCard1Component.storyName = 'promotion-card-1';
PromotionCard1Component.args = args;
PromotionCard1Component.argTypes = argTypes;

PromotionCard2Component.storyName = 'promotion-card-2';
PromotionCard2Component.args = args;
PromotionCard2Component.argTypes = argTypes;

