const firstNameData = {
    name: 'firstName',
    value: 'John',
    translations: {
        label: 'First Name',
        validationMessages: {
            required: 'Enter First Name'
        }
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

const formData = {
    formFields: [
        firstNameData,
        {
            name: 'lastName',
            value: 'Johnson',
            translations: {
                label: 'Last Name'
            }
        },
        {
            name: 'email',
            value: 'John.Johnson@gmail.com',
            translations: {
                label: 'Email Address',
                validationMessages: {
                    required: 'Enter Email Address',
                    invalid: 'Enter valid Email Address'
                }
            }
        },
        phoneNumberData,
        postcodeData
    ],
    buttonText: 'Continue'
};

export {
    formData,
    firstNameData,
    phoneNumberData,
    postcodeData
};
