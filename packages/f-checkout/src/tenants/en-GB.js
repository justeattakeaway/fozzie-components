export default {
    locale: 'en-GB',

    labels: {
        mobileNumber: 'Mobile Number',
        addressGroup: 'Address',
        line1: 'Address line 1',
        line2: 'Address line 2 (optional)',
        city: 'City',
        postcode: 'Postcode',
        deliveryOrderMethod: 'Delivery time',
        collectionOrderMethod: 'Collection time'
    },

    validationMessages: {
        mobileNumber: {
            requiredError: 'Your phone number should be at least 10 characters long and shouldn\'t contain letters or special characters'
        },
        addressLine1: {
            requiredError: 'Please enter the first line of your address'
        },
        city: {
            requiredError: 'Please enter your town or city'
        },
        postcode: {
            requiredError: 'Please enter your full UK postcode',
            invalidCharError: 'This doesn\'t look like a UK postcode, can you enter it again please?'
        }
    },

    errorMessages: {
        errorHeading: 'Error',
        genericServerError: 'Something went wrong, please try again later'
    },

    buttonText: 'Go to payment',

    allergies: {
        allergy: 'If you or someone you’re ordering for has a food allergy or intolerance, click here',
        allergyTap: 'If you or someone you’re ordering for has a food allergy or intolerance, tap here',
        allergenHeading: 'Do you have a food allergy?',
        phoneNumberAndUrl: "If you have a food allergy or intolerance (or someone you're ordering for has), phone the restaurant on {number} before placing your order and {readMoreUrl}. Do not order if you cannot get the allergy information you need.",
        phoneNumberOnly: "If you have a food allergy or intolerance (or someone you're ordering for has), phone the restaurant on {number}. Do not order if you cannot get the allergy information you need.",
        urlOnly: "If you have a food allergy or intolerance (or someone you're ordering for has), {readMoreUrl} before placing your order. Do not order if you cannot get the allergy information you need.",
        noPhoneNumberAndNoUrl: "If you have a food allergy or intolerance (or someone you're ordering for has), please contact the restaurant before placing the order. Do not order if you cannot get the allergy information you need.",
        readMore: 'read what this restaurant has to say about allergies',
        allergenModalClose: 'Close',
        mcDonaldsAllergy: 'Your food and its packaging may come into contact with allergens during preparation, cooking or delivery. The food is produced in kitchens where allergens are handled and where equipment and utensils are used for multiple menu items, including those containing allergens.',
        mcDonaldsReadMore: 'Read our Allergen Information',
        mcDonaldsNutritionInformation: 'Read our Nutrition Information',
        mcDonaldsNutritionUrl: 'https://www.mcdonalds.com/gb/en-gb/good-to-know/nutrition-calculator.html'
    }
};
