import { withA11y } from '@storybook/addon-a11y';
import Vue from 'vue';
import Vuex from 'vuex';
import makeSever from '@justeat/f-loyalty/stories/mocks/server';
import VLoyalty from '../src/components/Loyalty.vue';
import loyaltyModule from '../src/store/loyalty.module';

Vue.use(Vuex);

/**
 * Resets all locally stored braze data so that the stubbed data is always fresh on page load
 */
function resetBrazeData () {
    document.cookie
        .split('; ')
        .filter(row => row.startsWith('ab.'))
        .map(row => row.split('=')[0])
        .forEach(cookieName => {
            document.cookie = `${cookieName}=;max-age=0`;
        });

    Object.keys(localStorage)
        .filter(row => row.startsWith('ab.'))
        .forEach(storageItem => {
            localStorage.removeItem(storageItem);
        });
}

export default {
    title: 'Components/Pages',
    decorators: [withA11y]
};

export const VLoyaltyComponent = (args, { argTypes }) => ({
    components: { VLoyalty },

    props: Object.keys(argTypes),

    store: new Vuex.Store({
        modules: {
            loyaltyModule
        }
    }),

    created () {
        this.startServer();
    },

    methods: {
        startServer () {
            // first check to see if we have server already started
            if (this.server !== undefined) {
                this.server.shutdown();
            }
            resetBrazeData();
            // now create the server with the seed based on currently selected display state
            this.server = makeSever();
        }
    },

    template: '<v-loyalty v-bind="$props" />'
});

VLoyaltyComponent.storyName = 'f-loyalty';

VLoyaltyComponent.args = {
    authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImxiRmxsR2dSVTRUaldlTEJxVzlacDNBNW00USIsImtpZCI6ImxiRmxsR2dSVTRUaldlTEJxVzlacDNBNW00USJ9.eyJpc3MiOiJodHRwczovL2FsbC1hdXRob3JpemVhcGktc3RhZ2luZy11ay5zdGFnaW5nLXVrLmplLWxhYnMuY29tL2lkZW50aXR5IiwiYXVkIjoiaHR0cHM6Ly9hbGwtYXV0aG9yaXplYXBpLXN0YWdpbmctdWsuc3RhZ2luZy11ay5qZS1sYWJzLmNvbS9pZGVudGl0eS9yZXNvdXJjZXMiLCJleHAiOjE2MzUyMzc3NzIsIm5iZiI6MTYzNTIzNDE3MiwiY2xpZW50X2lkIjoiamVfd2ViX25hdGl2ZSIsInJlYWxtX2lkIjoiYTNjMjQ2ZTEtMjRhNC00NWE2LWEzNjItZmRhNzNhNGI3NWFiIiwic2NvcGUiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiLCJtb2JpbGVfc2NvcGUiXSwic3ViIjoiMTc5ODQ3MDgiLCJhdXRoX3RpbWUiOjE2MzQ1NDgwMDIsImlkcCI6Imlkc3J2IiwiaXNfdGVtcG9yYXJ5X25hbWUiOiJGYWxzZSIsImVtYWlsIjoibWF0dGhld2hhcmRlcm5AZ21haWwuY29tIiwiY3JlYXRlZF9kYXRlIjoiMjAyMC0xMC0xNVQwOToyOToxNi4wMzAwMDAwWiIsIm5hbWUiOiJtYXR0aGV3IGhhcmRlcm4iLCJnbG9iYWxfdXNlcl9pZCI6IlUwdFpVeEFobys2ZEhrN1AvZHJkZVJSdnplbz0iLCJnaXZlbl9uYW1lIjoibWF0dGhldyIsInJvbGUiOiJSZWdpc3RlcmVkIiwiZmFtaWx5X25hbWUiOiJoYXJkZXJuIiwiamV0IjoiTWdFOG9jdDA0MHE0T3g4OUJwc0I3QSIsImdyYW50X3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiYW1yIjpbInBhc3N3b3JkIl19.DXbvasV9IRZcyaYCvBftYdFXbHSyWBmEydKTQO7Eg6QMLKyAr-5UZYmUwBDWk5bzdWVavJ3lqQPLW2r2G5a5RtBbbNon3ViyrKrW-Trf_gvGUkhnJKOKfkKsQwNH0EdPvxXZJ7cYEdzUmFEnKZHv0hkKyaTopHH1AD19-rkujm9Ymcm5Hvwyj8dUoAn6wVIIURXIioZxmP52KcmGUm1AidubWwvVe7SKypawEAxSPcBT4N_EFmyVNypn84CZQnWLaYaxoUGGXWg9BMr3_PbE9UTpwvcEgvgxrdrFilfW-nRAWuxScJA6dlwFtcK6CvK808rvrX-zK4Nj8Ua0MCSg52zr_1x3MsGCLLKUGiGvH28GO1uLnwlEYqEPypKUv9dqco_ERC-9KtxcEgDISgFFfBivPH-tim3IGpkuK8BFbHxR28vq7glQxHMaM3CkI5k83wXLNKZ63l5S-tfRwvSFynWePkPOmY6VD97iAxGFUUEI4DIHJPxD5G9450-n095Xbj8eAB34QwC4p2PNydIpebLLf98gjxHYDSlSp2HEUUb66zWPUksrgiOvP9ojuXG0MVthkQAiLVbn4OritfboSggzGj5wfAWjNZ3h7IgGW9chBFsilw-Q1gteVIyodHHnyv4ePGaQFQ6lpCwmaLnyRTzYFt3QovsCQggccQvX3Os',
    brazeApiKey: '__TEST_API_KEY__'
};
