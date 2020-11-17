import { create } from '@storybook/theming/create';
import logo from '../../public/logo--pie.svg';

export default create({
    base: 'dark',

    colorPrimary: '#fff',
    colorSecondary: '#2a3846',

    // UI
    appBg: '#0c151d',
    appContentBg: '#fff',
    // appBorderColor: '',
    // appBorderRadius: 0

    // Typography
    fontBase: '"JustEatBasis", Arial, sans-serif',
    // fontCode: 'monospace',

    // Text colors
    textColor: '#0c151d',
    textInverseColor: 'hotpink',

    // Toolbar default and active colors
    barTextColor: '#fff',
    barSelectedColor: '#f36d00',
    barBg: '#1b252e',

    // Form colors
    inputBg: '#fff',
    inputBorder: '#0c151d',
    inputTextColor: '#0c151d',
    inputBorderRadius: 2,

    // Meta
    brandTitle: 'Just Eat Takeaway.com',
    // brandUrl: '',
    brandImage: logo
});
