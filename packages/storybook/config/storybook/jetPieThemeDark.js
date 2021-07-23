import { create, color, typography } from '@storybook/theming';
import logo from '../../public/logo--pie.svg';

export default create({
    base: 'dark',

    // Storybook-specific color palette
    colorPrimary: '#f36d00',
    colorSecondary: '#4996FD',

    // UI
    appBg: '#162028',
    appContentBg: '#1b252e',
    appBorderColor: 'rgba(255,255,255,.1)',
    appBorderRadius: 4,

    // Fonts
    fontBase: '"JustEatBasis", Arial, sans-serif',
    fontCode: typography.fonts.mono,

    // Text colors
    textColor: '#ffffff',
    textInverseColor: '#2a3846',
    textMutedColor: color.mediumdark,

    // Toolbar default and active colors
    barTextColor: '#ffffff',
    barSelectedColor: '#f36d00',
    barBg: '#1b252e',

    // Form colors
    inputBg: '#111b22',
    inputBorder: '#1b252e',
    inputTextColor: '#f1f2f4',
    inputBorderRadius: 2,

    brandImage: logo,
    brandTitle: 'Just Eat Takeaway.com',
});
