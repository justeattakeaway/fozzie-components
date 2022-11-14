const messages = {
    locale: 'es-ES',
    percentage: '10',
    currency: 'euro',
    currencySymbol: '€',
    termsUrl: '/info/terms-and-conditions#ii.just-eat-voucher-terms-conditions',
    termsText: 'Ver Condiciones generales',
    header: {
        title: 'Tarjetas de sellos',
        text: 'Ve los sellos que has acumulado y cualquier descuento que hayas obtenido.',
        alt: 'Imagen para recoger tus sellos'
    },
    tabs: {
        stamps: {
            title: 'Tus tarjetas de sellos',
            readyToClaimTitle: 'Utiliza tu descuento',
            inProgressTitle: 'En curso'
        },
        howItWorks: {
            title: 'Cómo funciona'
        }
    },
    stamps: {
        errorNoCards: {
            title: 'Pide en uno de los restaurantes adheridos al programa de sellos y consulta todos tus sellos aquí',
            subTitle: '¿Echas de menos algún sello? Actualiza la pantalla volviendo a la página de inicio y vuelve de nuevo a esta sección..'
        }
    },
    unauthenticated: {
        loginTitle: 'Inicia sesión para empezar',
        loginButtonText: 'Iniciar sesión'
    },
    howItWorks: {
        imagePath: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/',
        title: 'Ahorra en tus sabores favoritos',
        text: 'Consigue recompensas por tu fidelidad. Empieza a acumular sellos de tus restaurantes favoritos y obtén un pequeño descuento jugoso de camino...',
        exampleSection: {
            title: 'Por ejemplo',
            orders: 'Tus pedidos',
            percentage: '10% por cada pedido',
            total: 'Descuento total para el sexto pedido',
            accessibilityText: 'Si realiza 5 pedidos por un total de 230€, obtendrá un descuento de 34,50€ para su sexto pedido.'
        },
        media: {
            title: '¿Cómo funciona?',
            cards: {
                order: {
                    title: 'Pedido',
                    text: 'Consigue un sello cada vez que pidas a un restaurante participante.',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-complex-object-restaurant-promo.svg'
                },
                earn: {
                    title: 'Gana',
                    text: 'Cada sello corresponde al 10% del valor de tu pedido (excepto gastos y cargos) y se guardará en su propia tarjeta de sellos.',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-complex-object-login-promo-full-colour-10.svg'
                },
                collect: {
                    title: 'Acumula',
                    text: 'Una vez que hayas acumulado cinco sellos del mismo restaurante, obtendrás un descuento para tu sexto pedido.',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-complex-object-stampcard-colour-03-10-full.svg'
                },
                reward: {
                    title: 'Recompensas',
                    text: 'Tu descuento es el total de tus cinco sellos guardados y se aplicará automáticamente al realizar tu sexto pedido.',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-bag-order-refund.svg'
                }
            }
        }
    }
};

export default {
    messages
};
