import ErrorBoundary from '../src/components/ErrorBoundary.vue';
import ErrorBoundaryDemoWrapper from './ErrorBoundaryDemoWrapper.vue';
import ErrorBoundaryDemoComponent from './ErrorBoundaryDemoComponent.vue';

export default {
    title: 'Components/Atoms'
};

export const ErrorBoundaryComponent = (args, { argTypes }) => ({
    components: {
        ErrorBoundary,
        ErrorBoundaryDemoWrapper,
        ErrorBoundaryDemoComponent
    },

    props: Object.keys(argTypes),

    template:
        `<div class="u-spacingBottom--large storybook-grid storybook-grid-columns--3 storybook-grid-stack--lessThanWide">
            <error-boundary-demo-wrapper #default="{ shouldTriggerError }">
                <error-boundary hideOnError>
                    <error-boundary-demo-component
                        :shouldTriggerError="shouldTriggerError"
                        class="u-bordered">
                        <p>This element will be hidden from view when a error is captured by setting the <code>hideOnError</code> prop to <code>true</code>.</p>
                    </error-boundary-demo-component>
                </error-boundary>
            </error-boundary-demo-wrapper>

            <error-boundary-demo-wrapper #default="{ shouldTriggerError }">
                <error-boundary #default="{ hasError, loggerPayload }">
                    <div class="u-bordered">
                        <p v-show="hasError">Caught error with message "<code>{{ loggerPayload.ExceptionMessage }}</code>"</p>

                        <error-boundary-demo-component
                            v-show="!hasError"
                            :shouldTriggerError="shouldTriggerError">
                            <p>This element will be hidden from view when a error is captured by using th.</p>
                        </error-boundary-demo-component>
                    </div>
                </error-boundary>
            </error-boundary-demo-wrapper>

            <error-boundary-demo-wrapper #default="{ shouldTriggerError }">
                <error-boundary
                    #default="{ loggerPayload }"
                    @on-error="shouldHideComponent = true">
                    <div class="u-bordered">
                        <p v-show="shouldHideComponent">Caught error with message "<code>{{ loggerPayload.ExceptionMessage }}</code>"</p>

                        <error-boundary-demo-component
                            v-show="!shouldHideComponent"
                            :shouldTriggerError="shouldTriggerError">
                            <p>Hide using event data</p>
                        </error-boundary-demo-component>
                    </div>
                </error-boundary>
            </error-boundary-demo-wrapper>
        </div>`
});

ErrorBoundaryComponent.storyName = 'f-error-boundary';
