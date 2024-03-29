import { postSuccess } from '../../helpers';

function getGeoLocation () {
    return {
        type: 'Feature',
        properties: {
            geocodingProvider: 'Google',
            accuracyScore: 100,
            matchScore: 100
        },
        geometry: {
            type: 'Point',
            _comment: 'I have verified with the Location Services Team and Longitude will be the first element and Latitude will be the second',
            coordinates: [
                -0.10358,
                51.51469
            ]
        }
    };
}

export default [
    {
        url: '/get-geo-location',
        ...postSuccess,
        payload: getGeoLocation()
    }
];

