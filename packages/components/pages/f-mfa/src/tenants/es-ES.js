const messages = {
    locale: 'es-ES',
    verificationPage: {
        subTitle: 'Te hemos enviado por correo electrónico tu código de inicio de sesión',
        instructionsPrimaryText: 'Hemos enviado un código de verificación a {0} para ayudarte a mantener tu cuenta segura. Introdúcelo a continuación para iniciar sesión.',
        instructionsSecondaryText: 'Tu código será válido durante 30 minutos.',
        formField: {
            labelText: 'Tu código de verificación',
            placeholderText: 'Introducir código',
            validationMessage: 'Por favor, ingresa un código válido'
        },
        submitErrorText: 'Compruébalo y vuelve a intentarlon',
        primaryButtonText: 'Continuar',
        secondaryButtonText: 'Necesitas ayuda?'
    },
    helpInfo: {
        title: 'Ayuda',
        subTitle: 'Necesitas ayuda?',
        instructionsPrimaryText: 'Hemos enviado un código al correo electrónico {0}. Será válido durante 30 minutos. Si tienes problemas:',
        instructionsPoint1Text: 'Espera unos minutos a que llegue el correo electrónico',
        instructionsPoint2Text: 'Comprueba tu carpeta de correo no deseado',
        instructionsPoint3Text: 'Intenta iniciar sesión de otra forma',
        instructionsPoint4Text: 'Consulta {0} si sigues necesitando ayuda',
        instructionsHelpLink: 'https://www.just-eat.es/help/article/8886741560465/por-que-se-me-pide-a-veces-que-introduzca-un-codigo-de-verificacion-al-usar-just-eat',
        instructionsHelpText: 'nuestras preguntas frecuentes',
        primaryButtonText: 'Entendido',
        secondaryButtonText: 'Iniciar sesión de otra forma'
    },
    errorMessages: {
        validation: 'Compruébalo y vuelve a intentarlo',
        submitMfa: {
            heading: 'Algo salió mal',
            description: 'Lo sentimos. Inténtalo de nuevo, por favor.'
        },
        loading: {
            heading: 'Algo salió mal',
            message: 'Lo sentimos. Inténtalo de nuevo, por favor.',
            primaryButtonText: 'Volver'
        }
    }
};

export default {
    messages
};
