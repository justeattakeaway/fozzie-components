const messages = {
    locale: 'es-ES',

    labels: {
        addressGroup: 'Dirección',
        deliveryOrderMethod: 'Hora de entrega',
        collectionOrderMethod: 'Hora de recogida',
        dineinOrderMethod: 'Hora de comida'
    },

    formFields: {
        dineIn: {
            tableIdentifier: {
                label: 'Número de mesa o nombre',
                validationMessages: {
                    required: 'Incluye tu nombre/número de mesa'
                }
            }
        },
        customer: {
            mobileNumber: {
                label: 'Teléfono',
                validationMessages: {
                    required: 'Introduce tu número de teléfono',
                    invalid: 'Tu número de teléfono debe contener al menos 9 caracteres y no puede incluir letras ni caracteres especiales'
                }
            },
            firstName: {
                label: 'Nombre',
                validationMessages: {
                    required: 'Indica tu nombre'
                }
            },
            lastName: {
                label: 'Apellido',
                validationMessages: {
                    required: 'Indica tus apellidos'
                }
            },
            email: {
                label: 'E-mail',
                validationMessages: {
                    required: 'Introduce tu correo electrónico',
                    invalid: 'Introduce una dirección de correo electrónico válida'
                }
            }
        },
        address: {
            line1: {
                label: 'Calle y número (Ej: Calle del alba 12)',
                isGrouped: true,
                validationMessages: {
                    required: 'Introduce la primera línea de tu dirección'
                }
            },
            line2: {
                label: 'Piso y puerta (Ej: Entresuelo B)',
                isGrouped: true,
                validationMessages: {
                    required: 'Introduce la segunda línea de tu dirección'
                }
            },
            line3: {
                label: 'Observaciones (Ej: Timbre 254)',
                isGrouped: true
            },
            locality: {
                label: 'Ciudad',
                validationMessages: {
                    required: 'Introduce tu ciudad o localidad'
                }
            },
            postcode: {
                label: 'Código Postal',
                validationMessages: {
                    required: 'Introduce tu código postal en España',
                    invalid: 'No parece un código postal español, ¿puedes volver a introducirlo?'
                }
            }
        }
    },

    asapFulfilmentOption: 'Lo antes posible',

    errorMessages: {
        errorHeading: 'Error',
        genericServerError: 'Algo salió mal, lo sentimos. Por favor, inténtelo de nuevo.',
        singleFieldError: 'Hay 1 error en el formulario',
        multipleFieldErrors: 'Hay {errorCount} errores en el formulario',
        pageLoad: {
            heading: 'Algo no ha ido bien',
            description: 'Se trata un problema en nuestro sistema, lo sentimos. Por favor, vuelve a intentarlo, tu cesta está guardada.',
            buttonText: 'Volver al pedido'
        },
        accessForbiddenError: {
            heading: 'Algo no ha ido bien',
            description: 'Esta cesta se creó con una cuenta distinta por lo que no podemos proceder, lo sentimos. Vuelve a añadir tus artículos.',
            buttonText: 'Volver al pedido'
        },
        noTimeAvailable: {
            heading: 'Algo no ha ido bien',
            description: 'Lo sentimos pero no hay horarios disponibles para {serviceType}. Por favor, elija otro restaurante para hacer su pedido.',
            buttonText: 'Busque un restaurante diferente'
        },

        guestUserCreationFailure: 'El pago para usuarios no registrados no está disponible, lo sentimos. Vuelva a intentarlo pronto o regístrese',

        checkoutIssues: {
            MINIMUM_ORDER_VALUE_NOT_MET: {
                title: 'No se ha alcanzado el pedido mínimo',
                message: 'Lo sentimos pero no se ha alcanzado el gasto mínimo para su pedido. Por favor, modifique su pedido.',
                buttonText: 'Volver al pedido'
            },

            RESTAURANT_NOT_TAKING_ORDERS: {
                title: 'Este restaurante no acepta pedidos',
                message: 'Lo sentimos pero el restaurante no está aceptando pedidos en este momento. Por favor, elija otro restaurante para hacer su pedido.',
                buttonText: 'Volver a la búsqueda'
            },

            SERVICE_TYPE_UNAVAILABLE: {
                title: '{serviceType} no disponible',
                message: 'Lo sentimos pero el restaurante no está aceptando pedidos {serviceType} en este momento. Por favor, elija otro restaurante para hacer su pedido.',
                buttonText: 'Volver al pedido'
            },

            ADDITIONAL_ITEMS_REQUIRED: {
                title: 'No se puede pedir el artículo(s)',
                message: 'Lo sentimos, pero el artículo(s) que está intentando pedir requiere añadir otros artículos antes para poder continuar. Por favor, modifique su pedido.',
                buttonText: 'Volver al pedido'
            },

            ITEMS_UNORDERABLE: {
                title: 'Artículo(s) no disponiible',
                message: 'Lo sentimos, pero algunos de los artículos que quería pedir ya no están disponibles. Por favor, modifique su pedido antes de continuar.',
                buttonText: 'Volver al pedido'
            },

            FULFILMENT_TIME_UNAVAILABLE: {
                title: 'Hora no disponible',
                message: 'Lo sentimos, pero la hora que ha seleccionado ya no está disponible. Por favor, seleccione otra hora.',
                buttonText: 'Aceptar'
            },

            LOCATION_UNDELIVERABLE: {
                title: 'No se puede entregar en esa dirección',
                message: 'Lo sentimos, pero el restaurante no entrega actualmente en esta dirección. Por favor, opte por pedir con recogida en el local o en otro restaurante.',
                buttonText: 'Aceptar'
            },

            TABLE_IDENTIFIER_REQUIRED: {
                title: 'Se requiere el númer de mesa o el nombre',
                message: 'Parece que no nos has indicado cómo encontrarte en el restaurante. Por favor, introduzca su número de mesa o nombre y vuelva a intentarlo.',
                buttonText: 'Aceptar'
            },

            GEOLOCATION_REQUIRED: {
                title: 'Algo no ha ido bien',
                message: 'Lo sentimos, pero el restaurante no entrega actualmente en esta dirección. Por favor, opte por pedir con recogida en el local o en otro restaurante.',
                buttonText: 'Volver al pedido'
            },

            KITCHEN_NOTE_NOT_ACCEPTED: {
                title: 'Nota no válida para la cocina',
                message: 'Lo sentimos, parece que su nota de cocina no ha sido aceptada',
                buttonText: 'Aceptar'
            },

            COURIER_NOTE_NOT_ACCEPTED: {
                title: 'Lo sentimos, parece que su nota de cocina no ha sido aceptada',
                message: 'Lo sentimos, parece que su nota de repartidor no ha sido aceptada',
                buttonText: 'Aceptar'
            },

            ORDER_NOTE_NOT_ACCEPTED: {
                title: 'Nota no válida',
                message: 'Lo sentimos, parece que su nota no ha sido aceptada',
                buttonText: 'Aceptar'
            },

            DEFAULT_CHECKOUT_ISSUE: {
                title: 'Algo no ha ido bien',
                message: 'Por favor, inténtelo de nuevo.',
                buttonText: 'Aceptar'
            },

            DuplicateOrder: {
                title: 'Este pedido no se ha realizado',
                message: 'Es el mismo que ha hecho hace un momento y queremos comprobar que no es un error. Espere 15 minutos o cambie un artículo de su pedido',
                buttonText: 'Cerrar',
                buttonTextPrimary: 'Ver mis pedidos'
            },

            BasketChanged: {
                title: 'Hemos quitado un artículo de tu pedido',
                message: 'Puede que se le haya acabado al restaurante o que este haya actualizado su menú mientras estabas realizando el pedido, lo sentimos. Puedes volver atrás para revisar tu pedido y elegir otro artículo.',
                buttonText: 'Volver al pedido'
            }
        }
    },

    warningMessages: {
        preOrder: {
            title: 'Por favor, tenga en cuenta que se trata de un pedido previo',
            body: 'Por favor, compruebe el día y la hora arriba indicados'
        }
    },

    buttonText: 'Ir al pago',

    userNote: {
        courier: {
            delivery: {
                title: 'Dejar una nota para el repartidor',
                text: 'Deje una nota para el repartidor con cualquier cosa que necesite saber (por ejemplo, que el timbre no funciona).',
                placeholder: 'Por ejemplo, que el timbre no funciona'
            },
            collection: {
                title: 'Dejar una nota',
                text: 'Deje una nota para el restaurante con cualquier cosa que necesiten saber. No incluya aquí ninguna información relativa a alergias.',
                placeholder: 'No incluya aquí detalles sobre cualquier alergia. \n\nEstamos trabajando con los restaurantes para reducir los residuos. Por favor, no pida cubiertos de plástico.'
            },
            dinein: {
                title: 'Dejar una nota',
                text: 'Deje una nota para el restaurante con cualquier cosa que necesiten saber. No incluya aquí ninguna información relativa a alergias.',
                placeholder: 'Por ejemplo, se ruega traer los entrantes y los platos principales al mismo tiempo.'
            }
        },
        order: {
            delivery: {
                title: 'Dejar una nota',
                text: 'Dejar una nota for the restaurant with anything they need to know (e.g. the doorbell doesn\'t work). Do not include details about any allergies here.',
                placeholder: 'Por ejemplo, que el timbre no funciona. No incluya aquí detalles sobre cualquier alergia. \n\nEstamos trabajando con los restaurantes para reducir los residuos. Por favor, no pida cubiertos de plástico.'
            },
            collection: {
                title: 'Dejar una nota',
                text: 'Deje una nota para el restaurante con cualquier cosa que necesiten saber. No incluya aquí ninguna información relativa a alergias.',
                placeholder: 'No incluya aquí detalles sobre cualquier alergia. \n\nEstamos trabajando con los restaurantes para reducir los residuos. Por favor, no pida cubiertos de plástico.'
            },
            dinein: {
                title: 'Dejar una nota',
                text: 'Deje una nota para el restaurante con cualquier cosa que necesiten saber. No incluya aquí ninguna información relativa a alergias.',
                placeholder: 'No incluya aquí ninguna información relativa a alergias.'
            }
        },
        kitchen: {
            delivery: {
                title: 'Dejar una nota for the kitchen',
                text: 'Deje una nota para el restaurante con cualquier cosa que necesiten saber.',
                placeholder: 'Estamos trabajando con los restaurantes para reducir los residuos. Por favor, no pida cubiertos de plástico.'
            },
            dinein: {
                title: 'Dejar una nota for the kitchen',
                text: 'Deje una nota para el restaurante con cualquier cosa que necesiten saber.',
                placeholder: 'Estamos trabajando con los restaurantes para reducir los residuos. Por favor, no pida cubiertos de plástico.'
            },
            collection: {
                title: 'Dejar una nota for the kitchen',
                text: 'Deje una nota para el restaurante con cualquier cosa que necesiten saber.',
                placeholder: 'Estamos trabajando con los restaurantes para reducir los residuos. Por favor, no pida cubiertos de plástico.'
            }
        }
    },

    checkoutHeader: {
        user: {
            title: '{name}, confirma tus datos',
            switchUser: '¿No eres {name}? Haz clic aquí?'
        },
        guest: {
            loginTitle: '¿Cómo prefieres continuar?',
            loginButton: 'Iniciar sesión o crear cuenta',
            option: 'o',
            guestTitle: 'Continuar como invitado/a',
            confirmation: 'Por favor confirme los detalles de su {serviceType} '
        }
    },

    serviceTypes: {
        collection: 'Recogida',
        delivery: 'Entrega a domicilio'
    },

    checkoutTermsAndConditions: 'Al hacer un pedido, aceptas nuestros {termsAndConditions}. Lee nuestra {privacyPolicy} y {coAceptariePolicy}.',

    termsAndConditionsLinkText: 'Términos y Condiciones',
    termsAndConditionsLinkUrl: 'https://www.just-eat.es/info/terminos-y-condiciones',

    privacyPolicyLinkText: 'Política de Privacidad',
    privacyPolicyLinkUrl: 'https://www.just-eat.es/info/politica-de-privacidad',

    coAceptariePolicyLinkText: 'Política de CoAceptaries',
    coAceptariePolicyLinkUrl: 'https://www.just-eat.es/info/politica-de-coAceptaries',

    ageVerification: {
        heading: 'Confirma tu fecha de nacimiento',
        description: 'Tu pedido contiene alcohol. Necesitamos comprobar que eres mayor de 18 años.',
        ageSelection: {
            day: 'Día',
            month: 'Mes',
            year: 'Año'
        },
        askForIdDescription: 'Es posible que le pidan un documento de identidad cuando le entreguen su pedido. El conductor no le entregará el pedido si el nombre que figura en él no coincide con el de su documento de identidad o haya alguien que parezca estar ebrio.',
        errorMessage: 'Debes tener más de 18 años para hacer un pedido con alcohol.',
        buttonText: 'Continuar'
    }
};

const dateTimeFormats = {
    short: {
        weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: false
    }
};

export default {
    messages,
    dateTimeFormats
};
