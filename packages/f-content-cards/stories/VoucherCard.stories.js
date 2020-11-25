import { text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import VoucherCard from '../src/components/cardTemplates/voucherCard/VoucherCard.vue';

export default {
    title: 'Components/Atoms/f-content-cards',
    decorators: [withKnobs, withA11y]
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
        emitCardView () {},
        emitCardClick () {},
        emitVoucherCodeClick () {}
    };
}

export const VoucherCardComponent = () => ({
    components: {
        VoucherCard
    },

    props: {
        title: {
            default: text('Title', 'Voluptatem corporis eveniet aperiam cupiditate mollitia perferendis.')
        },
        cardTitle: {
            default: text('Card Title', ' Aliquam et aliquam et.')
        },
        subtitle: {
            default: text('Card Subtitle', 'Voluptas sint id pariatur.')
        },
        image: {
            default: text('Card Image', 'https://picsum.photos/seed/VoucherCard_image/384/216?blur=3')
        },
        icon: {
            default: text('Card Icon', 'https://picsum.photos/seed/VoucherCard_icon/48/48')
        },
        voucherCode: {
            default: text('Voucher Code', 'SPECIALVOUCHER')
        }
    },

    provide,

    data () {
        return voucherCard(
            'Voucher_Card_1',
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

VoucherCardComponent.storyName = 'voucher-card';

export const AnniversaryCardComponent = () => ({
    components: {
        VoucherCard
    },

    props: {
        title: {
            default: text('Title', 'Minus deserunt adipisci beatae et eligendi soluta.')
        },
        cardTitle: {
            default: text('Card Title', 'Aspernatur ipsum sunt omnis cum veritatis cumque animi.')
        },
        subtitle: {
            default: text('Card Description', 'Nemo quasi vitae omnis aliquid deserunt ut saepe.')
        },
        image: {
            default: text('Anniversary Hero Image', 'https://picsum.photos/seed/AnniversaryCard_image/109/96')
        },
        voucherCode: {
            default: text('Voucher Code', 'SPECIALVOUCHER')
        }
    },

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
