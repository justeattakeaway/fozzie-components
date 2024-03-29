/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import StoryRouter from 'storybook-vue-router';

import setupContext from '../../context';
import jetPieThemeDocs from './jetPieThemeDocs';
import './scss-loader.scss';
import CUSTOM_VIEWPORTS from './viewports';

setupContext();

Vue.config.devtools = true;

export const decorators = [StoryRouter({}, {
    mode: 'history'
})];

export const parameters = {
    docs: {
        theme: jetPieThemeDocs
    },
    viewport: {
        viewports: CUSTOM_VIEWPORTS
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
                        ],
                        'Testing',
                        [
                            'Test Level Overview'
                        ]
                    ],
                    'Capabilities',
                    [
                        'Overview'
                    ],
                    'Guides',
                    [
                        'Fozzie',
                        [
                            'What is Fozzie?',
                            'Fozzie and Sass',
                            'Structure',
                            'CSS Naming',
                            'Fozzie Migration Guide'
                        ]
                    ]
                ],
                'Components']
        }
    },
    controls: { expanded: true }
};
