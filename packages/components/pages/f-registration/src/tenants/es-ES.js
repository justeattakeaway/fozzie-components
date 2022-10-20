export default {
    locale: 'es-ES',
    genericErrorMessage: 'No es posible crear una cuenta en este momento',

    navLinks: {
        termsAndConditions: {
            prefix: 'Al crear una cuenta, aceptas nuestros ',
            suffix: '.',
            text: 'Términos y Condiciones',
            url: '/info/terms-and-conditions'
        },
        privacyPolicy: {
            prefix: 'Por favor, lee nuestra ',
            text: 'Política de Privacidad',
            url: '/info/privacy-policy'
        },
        cookiesPolicy: {
            prefix: ' y ',
            text: 'Política de Cookie',
            url: '/info/cookies-policy',
            suffix: '.'
        },
        login: {
            text: '¿Ya formas parte de [Just Eat]?'
        }
    },

    labels: {
        createAccountTitle: 'Crear cuenta',
        createAccountBtn: 'Crear cuenta',
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo electrónico',
        password: 'Contraseña'
    },

    validationMessages: {
        firstName: {
            requiredError: 'Por favor, introduce tu nombre',
            maxLengthError: 'El nombre supera los 50 caracteres',
            invalidCharError: 'Tu nombre solo puede tener letras, guiones o apóstrofes'
        },

        lastName: {
            requiredError: 'Por favor, introduce tu apellido',
            maxLengthError: 'El apellido supera los 50 caracteres',
            invalidCharError: 'Tu apellido solo puede tener letras, guiones o apóstrofes'
        },

        email: {
            requiredError: 'Por favor, introduce tu correo electrónico',
            maxLengthError: 'El correo electrónico supera los 50 caracteres',
            invalidEmailError: 'Por favor, introduce un correo electrónico válido',
            alreadyExistsError: 'Este correo electrónico ya está registrado'
        },

        password: {
            requiredError: 'Por favor, introduce una contraseña',
            minLengthError: 'Tu contraseña debe tener al menos 10 caracteres'
        }
    }
};
