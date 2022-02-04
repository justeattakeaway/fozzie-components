import availabilityTypes from '../availabilityTypes';

const isValidAvailabilityType = value => !!availabilityTypes[value];

export default isValidAvailabilityType;
