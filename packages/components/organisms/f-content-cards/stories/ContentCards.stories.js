import { withA11y } from '@storybook/addon-a11y';

import ContentCardsBraze from './content-cards/all-cards';
import ContentCardsCustom from './content-cards/custom-cards';
import ContentCardsLoading from './content-cards/loading';
import ContentCardsNoCards from './content-cards/no-cards';
import ContentCardsError from './content-cards/error';

export default {
    title: 'Components/Organisms/f-content-cards',
    argTypes: {
        apiKey: { control: { type: 'text' } },
        userId: { control: { type: 'text' } },
        title: { control: { type: 'text' } },
        locale: { control: { type: 'radio', options: ['da-DK', 'en-GB', 'en-AU'] } }
    },
    decorators: [withA11y]
};

export {
    ContentCardsBraze,
    ContentCardsCustom,
    ContentCardsLoading,
    ContentCardsNoCards,
    ContentCardsError
};
