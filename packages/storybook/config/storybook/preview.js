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
                        'Structure',
                        'Development Principles',
                        'Contributing',
                        'Troubleshooting'
                    ],
                    'Standards',
                    [
                        'Accessibility',
                        [
                            'Overview',
                            'Checklist'
                        ]
                    ],
                    'Capabilities',
                    [
                        'Overview'
                    ],
                    'Guides',
                    [
                        [
                            'Component Dependencies',
                            'Typography'
                        ]
                    ]
                ],
                'Components']
        }
    }
};
