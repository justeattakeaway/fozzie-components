const fieldWithRequiredValidations = {
    name: 'firstName',
    value: 'John',
    translations: {
        label: 'First Name',
        validationMessages: {
            required: 'Enter First Name'
        }
    }
};

const fieldWithoutValidations = {
    name: 'lastName',
    value: 'Johnson',
    translations: {
        label: 'Last Name'
    }
};

const phoneNumberData = {
    name: 'mobileNumber',
    value: '07111111111',
    translations: {
        label: 'Mobile Number',
        validationMessages: {
            required: 'Enter Mobile Number',
            invalid: 'Enter valid Mobile Number'
        }
    }
};

const postcodeData = {
    name: 'postcode',
    value: 'EC1A1BB',
    translations: {
        label: 'Postcode',
        validationMessages: {
            required: 'Enter Postcode',
            invalid: 'Enter valid Postcode'
        }
    }
};

const fieldWithBothValidations = {
    name: 'email',
    value: 'John.Johnson@gmail.com',
    translations: {
        label: 'Email Address',
        validationMessages: {
            required: 'Enter Email Address',
            invalid: 'Enter valid Email Address'
        }
    }
};

const formData = {
    formFields: [
        fieldWithRequiredValidations,
        fieldWithoutValidations,
        fieldWithBothValidations,
        phoneNumberData,
        postcodeData
    ],
    buttonText: 'Continue'
};

export {
    formData,
    fieldWithRequiredValidations,
    fieldWithoutValidations,
    fieldWithBothValidations,
    phoneNumberData,
    postcodeData
};
