export default {
    messages: {
        locale: 'it-IT',
        genericErrorMessage: 'Al momento non è possibile creare un account',
        navLinks: {
            termsAndConditions: {
                prefix: 'Creando un account, accetti i nostri ',
                suffix: '.',
                text: 'Termini e condizioni d\'uso',
                url: '/info/terms-and-conditions'
            },
            privacyPolicy: {
                prefix: 'Leggi la nostra informativa sulla ',
                text: 'Privacy',
                url: '/info/privacy-policy'
            },
            cookiesPolicy: {
                prefix: ' e sui ',
                text: 'Cookie',
                url: '/info/cookies-policy',
                suffix: '.'
            },
            login: {
                text: 'Hai già un account?'
            }
        },
        labels: {
            createAccountTitle: 'Crea un account',
            createAccountBtn: 'Crea un account',
            firstName: 'Nome',
            lastName: 'Cognome',
            email: 'Email',
            password: 'Password'
        },
        validationMessages: {
            singleFieldError: 'C’è un errore nel modulo',
            multipleFieldErrors: 'Ci sono {errorCount} errori nel modulo',
            firstName: {
                requiredError: 'Inserisci il tuo nome',
                maxLengthError: 'Il nome supera 50 caratteri',
                invalidCharError: 'Il tuo nome può contenere solo lettere, trattini o apostrofi'
            },
            lastName: {
                requiredError: 'Inserisci il tuo cognome',
                maxLengthError: 'Il cognome supera i 50 caratteri',
                invalidCharError: 'Il tuo cognome può contenere solo lettere, trattini o apostrofi'
            },
            email: {
                requiredError: 'Inserisci la tua email',
                maxLengthError: 'L\'indirizzo email supera i 50 caratteri',
                invalidEmailError: 'Si prega di inserire un indirizzo email valido',
                alreadyExistsError: 'Indirizzo email già registrato'
            },
            password: {
                requiredError: 'Inserisci una password',
                minLengthError: 'La password deve essere composta da almeno 10 caratteri'
            }
        }
    }
};
