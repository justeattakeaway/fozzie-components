import axios from 'axios';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import UserMessage from '../UserMessage.vue';
import UserMessageApi from '../../services/UserMessageApi';

jest.mock('axios');

const mockMessage = 'user message';
const localVue = createLocalVue();

let spy;
let wrapper;
let mockComputed;
let mock;


beforeEach(() => {
    jest.clearAllMocks();

    mockComputed = {
        appLocale: () => 'en-GB'
    };
});

describe('UserMessage component', () => {
    it('has a mounted hook', () => {
        expect(typeof UserMessage.mounted).toBe('function');
    });

    it('calls populateUserMessage on mount', async () => {
        // Arrange
        axios.get.mockResolvedValue({
            data: {
                'en-GB': {
                    userMessageText: mockMessage,
                    userMessageEnabled: true
                }
            }
        });

        mock = jest.fn();

        // Act
        shallowMount(UserMessage, {
            localVue,
            methods: {
                populateUserMessage: mock
            }
        });

        // Assert
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it('calls getUserMessage on mount', async () => {
        // Arrange
        spy = jest.spyOn(UserMessageApi, 'getUserMessage');

        axios.get.mockResolvedValue({
            data: {
                'en-GB': {
                    userMessageText: mockMessage,
                    userMessageEnabled: true
                }
            }
        });

        // Act
        shallowMount(UserMessage, {
            computed: mockComputed
        });

        // Assert
        expect(spy).toHaveBeenCalledTimes(1);
    });

    describe('should contain message when', () => {
        it('user message is enabled and not empty', async () => {
            // Arrange
            axios.get.mockResolvedValue({
                data: {
                    'en-GB': {
                        userMessageText: mockMessage,
                        userMessageEnabled: true
                    }
                }
            });

            wrapper = shallowMount(UserMessage, {
                computed: mockComputed
            });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageText).toEqual(mockMessage);
        });
    });

    describe('should not contain message when', () => {
        it('user message is present but disabled', async () => {
            axios.get.mockResolvedValue({
                data: {
                    'en-GB': {
                        userMessageText: mockMessage,
                        userMessageEnabled: false
                    }
                }
            });

            wrapper = shallowMount(UserMessage, {
                computed: mockComputed
            });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageText).toEqual('');
        });

        it('user message is enabled but empty', async () => {
            axios.get.mockResolvedValue({
                data: {
                    'en-GB': {
                        userMessageText: '',
                        userMessageEnabled: true
                    }
                }
            });

            wrapper = shallowMount(UserMessage, {
                computed: mockComputed
            });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageText).toEqual('');
        });

        it('user message is enabled and empty', async () => {
            axios.get.mockResolvedValue({
                data: {
                    'en-GB': {
                        userMessageText: '',
                        userMessageEnabled: true
                    }
                }
            });

            wrapper = shallowMount(UserMessage, {
                computed: mockComputed
            });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageText).toEqual('');
        });
    });

    describe('should be displayed when', () => {
        it('user message is enabled and not empty', async () => {
            // Arrange
            axios.get.mockResolvedValue({
                data: {
                    'en-GB': {
                        userMessageText: mockMessage,
                        userMessageEnabled: true
                    }
                }
            });

            wrapper = shallowMount(UserMessage, {
                computed: mockComputed
            });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageEnabled).toBe(true);
        });
    });

    describe('should not be displayed when', () => {
        it('user message is present but disabled', async () => {
            axios.get.mockResolvedValue({
                data: {
                    'en-GB': {
                        userMessageText: mockMessage,
                        userMessageEnabled: false
                    }
                }
            });

            wrapper = shallowMount(UserMessage, {
                computed: mockComputed
            });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageEnabled).toBe(false);
        });

        it('user message is enabled but empty', async () => {
            axios.get.mockResolvedValue({
                data: {
                    'en-GB': {
                        userMessageText: '',
                        userMessageEnabled: true
                    }
                }
            });

            wrapper = shallowMount(UserMessage, {
                computed: mockComputed
            });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageEnabled).toBe(false);
        });

        it('user message is enabled and empty', async () => {
            axios.get.mockResolvedValue({
                data: {
                    'en-GB': {
                        userMessageText: mockMessage,
                        userMessageEnabled: false
                    }
                }
            });

            wrapper = shallowMount(UserMessage, {
                computed: mockComputed
            });

            // Act
            await wrapper.vm.populateUserMessage();

            // Assert
            expect(wrapper.vm.userMessageEnabled).toBe(false);
        });
    });
});
