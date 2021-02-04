/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import setupContext from '../../context';
import jetPieThemeDark from './jetPieThemeDark';

setupContext();

Vue.config.devtools = true;

export const parameters = {
    docs: {
        theme: jetPieThemeDark
    },
    options: {
        storySort: {
            order: ['Documentation',
                [
                    'Getting Started',
                    [
                        'Intro',
                        'Development Principles',
                        'Troubleshooting'
                    ],
                    'Standards',
                    'Setup Guides'
                ],
                'Components']
        }
    }
};
