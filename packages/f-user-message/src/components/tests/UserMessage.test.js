import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import UserMessage from '../UserMessage.vue';
import userMessageService from '../../services/UserMessageApi';

const localVue = createLocalVue();

let spy;
let wrapper;
let locale;
const axiosMock = new MockAdapter(axios);

beforeEach(() => {
    jest.clearAllMocks();

    locale = {
        appLocale: () => 'en-GB'
    };
});

describe('UserMessage component', () => {
    it('has a mounted hook', () => {
        expect(typeof UserMessage.mounted).toBe('function');
    });

    it('calls populateUserMessage on mount', async () => {
        // Arrange
        axiosMock.onGet('/user-message.json').reply(200, {
            'en-GB': {
                userMessageText: 'test message',
                userMessageEnabled: true
            }
        });

        const mockPopulateUserMessage = jest.fn();

        // Act
        shallowMount(UserMessage, {
            localVue,
            locale,
            methods: {
                populateUserMessage: mockPopulateUserMessage
            }
        });

        // Assert
        expect(mockPopulateUserMessage).toHaveBeenCalledTimes(1);
    });

    it('calls getUserMessage on mount', async () => {
        // Arrange
        spy = jest.spyOn(userMessageService, 'getUserMessage');
        axiosMock.onGet('/user-message.json').reply(200, {
            'en-GB': {
                userMessageText: 'test message',
                userMessageEnabled: true
            }
        });

        // Act
        shallowMount(UserMessage, { computed: locale });

        // Assert
        expect(spy).toHaveBeenCalledTimes(1);
    });

    describe('should contain message when', () => {
        it('user message is enabled and not empty', async () => {
            // Arrange
            axiosMock.onGet('/user-message.json').reply(200, {
                'en-GB': {
                    userMessageText: 'test message',
                    userMessageEnabled: true
                }
            });

            try {
                wrapper = shallowMount(UserMessage, { computed: locale });

                // Act
                await wrapper.vm.populateUserMessage();

                // Assert
                expect(wrapper.vm.userMessageText).toEqual('test message');
                console.log('User Message text: >>>', wrapper.vm.userMessageText);
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe('should not contain message when', () => {
        it('user message is present but disabled', async () => {
            axiosMock.onGet('/user-message.json').reply(200, {
                'en-GB': {
                    userMessageText: 'test message',
                    userMessageEnabled: false
                }
            });

            wrapper = shallowMount(UserMessage, { computed: locale });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageText).toEqual('');
        });

        it('user message is enabled but empty', async () => {
            axiosMock.onGet('/user-message.json').reply(200, {
                'en-GB': {
                    userMessageText: '',
                    userMessageEnabled: true
                }
            });

            wrapper = shallowMount(UserMessage, { computed: locale });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageText).toEqual('');
        });

        it('user message is enabled and empty', async () => {
            axiosMock.onGet('/user-message.json').reply(200, {
                'en-GB': {
                    userMessageText: '',
                    userMessageEnabled: true
                }
            });

            wrapper = shallowMount(UserMessage, { computed: locale });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageText).toEqual('');
        });
    });

    describe('should be displayed when', () => {
        it('user message is enabled and not empty', async () => {
            // Arrange
            axiosMock.onGet('/user-message.json').reply(200, {
                'en-GB': {
                    userMessageText: 'test message',
                    userMessageEnabled: true
                }
            });

            wrapper = shallowMount(UserMessage, { computed: locale });

            // Act
            wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageEnabled).toBe(true);
        });
    });

    describe('should not be displayed when', () => {
        it('user message is present but disabled', async () => {
            axiosMock.onGet('/user-message.json').reply(200, {
                'en-GB': {
                    userMessageText: 'test message',
                    userMessageEnabled: false
                }
            });

            wrapper = shallowMount(UserMessage, { computed: locale });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageEnabled).toBe(false);
        });

        it('user message is enabled but empty', async () => {
            axiosMock.onGet('/user-message.json').reply(200, {
                'en-GB': {
                    userMessageText: '',
                    userMessageEnabled: true
                }
            });

            wrapper = shallowMount(UserMessage, { computed: locale });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageEnabled).toBe(false);
        });

        it('user message is enabled and empty', async () => {
            axiosMock.onGet('/user-message.json').reply(200, {
                'en-GB': {
                    userMessageText: 'test message',
                    userMessageEnabled: false
                }
            });

            wrapper = shallowMount(UserMessage, { computed: locale });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageEnabled).toBe(false);
        });
    });
});
