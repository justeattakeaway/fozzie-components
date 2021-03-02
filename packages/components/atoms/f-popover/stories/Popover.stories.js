// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Popover from '../src/components/Popover.vue';
import Card from '../../f-card/src/components/Card.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const PopoverComponent = () => ({
    components: { Popover, Card },
    props: {
    },
    template: `
        <div style="position: relative; padding: 16px;">
            Some text
            <popover 
                style="position: absolute;
                        top: 100%;
                        width: 300px;
                        opacity: 1;
                        z-index: 99999;
                        left: 0;">
                <card
                    cardHeading="Popover card"
                    cardHeadingPosition="left"
                    :isRounded="false"
                    :hasOutline="false"
                    :isPageContentWrapper="false">
                        <p>Card component rendered inside a popover</p>
                </card>
            </popover>
        </div>`
});

PopoverComponent.storyName = 'f-popover';
