import { withA11y } from '@storybook/addon-a11y';
import VoucherCard from '../src/components/cardTemplates/voucherCard/VoucherCard.vue';

export default {
    title: 'Components/Molecules/f-content-cards',
    decorators: [withA11y]
};

function voucherCard (cardType, title, imageUrl, subtitle, voucherCode, icon1, line3) {
    return {
        card: {
            id: 'NWU1NTJjMWU2YThkNjM0ODllYzE3OGI5XyRfY2M9ZDg1MzM1ODktM2IyMC0xZmJkLWYwMzEtMTE5MjNjYjhiMjcyJm12PTVlNTUyYzFlNmE4ZDYzNDg5ZWMxNzhiZCZwaT1jbXA=',
            viewed: false,
            title,
            imageUrl,
            subtitle,
            created: null,
            updated: '2020-02-25T14:21:15.000Z',
            categories: [],
            expiresAt: '2020-03-25T23:55:00.000Z',
            url: 'https://www.just-eat.co.uk/area/s637jj',
            linkText: 'www.just-eat.co.uk',
            aspectRatio: 1,
            order: '1',
            image: imageUrl,
            voucherCode,
            icon: icon1,
            description: [line3],
            type: cardType,
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
        copy: {
            copyCodeLabel: 'Copy Code',
            codeCopiedLabel: 'Offer code copied'
        },
        emitCardView () { },
        emitCardClick () { },
        emitVoucherCodeClick () { }
    };
}

export const VoucherCardComponent = (args, { argTypes }) => ({
    components: {
        VoucherCard
    },

    props: Object.keys(argTypes),

    provide,

    data () {
        return voucherCard(
            'Voucher_Card_1',
            this.title,
            this.image,
            this.cardTitle,
            this.voucherCode,
            this.icon,
            this.subtitle,
            this.cardType
        );
    },

    template: '<voucher-card :card="card" />'
});

VoucherCardComponent.storyName = 'voucher-card';

VoucherCardComponent.args = {
    title: 'Voluptatem corporis eveniet aperiam cupiditate mollitia perferendis.',
    cardTitle: 'Aliquam et aliquam et.',
    subtitle: 'Voluptas sint id pariatur.',
    image: 'https://picsum.photos/seed/VoucherCard_image/384/216?blur=3',
    icon: 'https://picsum.photos/seed/VoucherCard_icon/48/48',
    voucherCode: 'SPECIALVOUCHER',
    cardType: 'Voucher_Card_1'
};

VoucherCardComponent.argTypes = {
    title: {
        control: { type: 'text' },
        description: 'Changes text of title'
    },
    cardTitle: {
        control: { type: 'text' },
        description: 'Changes text of card title'
    },
    subtitle: {
        control: { type: 'text' },
        description: 'Changes text of card subtitle'
    },
    image: {
        control: { type: 'text' },
        description: 'Change text of card image'
    },
    icon: {
        control: { type: 'text' },
        description: 'Change text of card icon'
    },
    voucherCode: {
        control: { type: 'text' },
        description: 'Change text of voucher code'
    }
};



export const AnniversaryCardComponent = (args, { argTypes }) => ({
    components: {
        VoucherCard
    },

    props: Object.keys(argTypes),

    provide,

    data () {
        return voucherCard(
            'Anniversary_Card_1',
            this.title,
            this.image,
            this.cardTitle,
            this.voucherCode,
            this.icon,
            this.subtitle
        );
    },

    template: '<voucher-card :card="card" />'
});

AnniversaryCardComponent.storyName = 'anniversary-card';

AnniversaryCardComponent.args = {
    title: 'Minus deserunt adipisci beatae et eligendi soluta.',
    cardTitle: 'Aspernatur ipsum sunt omnis cum veritatis cumque animi.',
    subtitle: 'Nemo quasi vitae omnis aliquid deserunt ut saepe.',
    image: 'https://picsum.photos/seed/AnniversaryCard_image/109/96',
    voucherCode: 'SPECIALVOUCHER'
};

AnniversaryCardComponent.argTypes = {
    title: {
        control: { type: 'text' },
        description: 'Changes text of title'
    },
    cardTitle: {
        control: { type: 'text' },
        description: 'Changes text of card title'
    },
    subtitle: {
        control: { type: 'text' },
        description: 'Changes text of card subtitle'
    },
    image: {
        control: { type: 'text' },
        description: 'Change text of card image'
    },
    voucherCode: {
        control: { type: 'text' },
        description: 'Change text of voucher code'
    }
};
