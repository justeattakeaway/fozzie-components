export default {
    locale: 'es-ES',
    genericErrorMessage: 'No es posible crear tu cuenta ahora mismo',

    navLinks: {
        termsAndConditions: {
            prefix: 'Al crear una cuenta, aceptas nuestros ',
            suffix: '.',
            text: 'términos y condiciones',
            url: '/info/terms-and-conditions'
        },
        privacyPolicy: {
            prefix: 'Lee nuestra ',
            text: 'política de privacidad',
            url: '/info/privacy-policy'
        },
        cookiesPolicy: {
            prefix: ' y ',
            text: 'política de cookies',
            url: '/info/cookies-policy',
            suffix: '.'
        },
        login: {
            text: '¿Ya tienes cuenta?'
        }
    },

    labels: {
        createAccountTitle: 'Regístrate',
        createAccountBtn: 'Regístrate',
        firstName: 'Nombre de pila',
        lastName: 'Nombre de familia',
        email: 'Tu email',
        password: 'Tu contraseña'
    },

    validationMessages: {
        firstName: {
            requiredError: 'Introduce tu nombre',
            maxLengthError: 'El nombre supera los 50 caracteres',
            invalidCharError: 'Tu nombre solo puede contener letras, guiones o apóstrofes'
        },

        lastName: {
            requiredError: 'Introduce tu apellido',
            maxLengthError: 'El apellido supera los 50 caracteres.',
            invalidCharError: 'Tu apellido solo puede contener letras, guiones o apóstrofos'
        },

        email: {
            requiredError: 'Introduce tu email',
            maxLengthError: 'El email supera los 50 caracteres',
            invalidEmailError: 'Introduce tu email',
            alreadyExistsError: 'Este email ya está registrado'
        },

        password: {
            requiredError: 'Introduce una contraseña',
            minLengthError: 'La contraseña debe tener como mínimo 10 caracteres'
        }
    }
};
