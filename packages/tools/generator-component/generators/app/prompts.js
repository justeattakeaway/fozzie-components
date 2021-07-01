const prompts = [
    {
        message: "What's your new component name (without the 'f-' prefix)? e.g. 'user-message'",
        name: 'name',
        type: 'input'
    },
    {
        message: 'How would you describe your new component?',
        name: 'description',
        type: 'input'
    },
    {
        message: 'What type of component are you creating?',
        name: 'componentType',
        type: 'list',
        choices: [
            {
                name: 'A Vue.js UI Component',
                value: 'uiComponent'
            },
            {
                name: 'A JavaScript Service/Middleware',
                value: 'service'
            }
        ]
    },
    {
        message: 'What category of UI Component are you creating?',
        name: 'componentCategory',
        type: 'list',
        choices: [
            {
                name: 'An Atom – A component that will not contain any other components e.g. button, card',
                value: 'atom'
            },
            {
                name: 'A Molecule – A group of atoms that make up a small fundamental component e.g. alert, modal',
                value: 'molecule'
            },
            {
                name: 'An Organism – A combination of atoms and molecules that make up a larger component e.g. header, checkout',
                value: 'organism'
            }
        ],
        when: function shouldShowThisQuestion (answers) {
            return answers.componentType === 'uiComponent';
        }
    },
    {
        message: 'Does your component require support for translations (i18n)?',
        name: 'needsComponentTranslations',
        type: 'confirm',
        default: true,
        when: function shouldShowThisQuestion (answers) {
            return answers.componentType === 'uiComponent';
        }
    },
    {
        message: 'Does your component require Bundlewatch checks?',
        name: 'needsBundlewatch',
        type: 'confirm',
        default: true,
    },
    {
        message: "What size limit do you want in place for your bundles (in kB)? e.g. '15'",
        name: 'bundlewatchMaxSize',
        type: 'input',
        when: function shouldShowThisQuestion (answers) {
            return answers.needsBundlewatch === true;
        }
    },
    {
        message: 'Does your component require browser-based Component Tests?',
        name: 'needsComponentTests',
        type: 'confirm',
        default: false,
        when: function shouldShowThisQuestion (answers) {
            return answers.componentType === 'uiComponent';
        }
    },
    {
        message: 'Does your component require API mocks?',
        name: 'needsTestingApiMocks',
        type: 'confirm',
        default: false,
        when: function shouldShowThisQuestion (answers) {
            return answers.componentType === 'uiComponent';
        }
    }
];

module.exports = prompts;
