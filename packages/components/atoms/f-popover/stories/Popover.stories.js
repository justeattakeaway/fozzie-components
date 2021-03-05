import { withA11y } from '@storybook/addon-a11y';
import Popover from '../src/components/Popover.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const PopoverComponent = () => ({
    components: { Popover },
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
                <ul>
                    <li>List item 1</li>
                    <li>List item 2</li>
                    <li>List item 3</li>
                </ul>
            </popover>
        </div>`
});

PopoverComponent.storyName = 'f-popover';
