const mercadoPago = require("mercadopago");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

mercadoPago.configure({
    access_token: ACCESS_TOKEN
});

const paymenyByMpController = {
    createOrder: async (req, res) => {
        try {
            {
                const {
                    id,
                    quantity,
                    title,
                    currency_id,
                    price,
                    description
                } = req.body;
                
                let preference = {
                    items: [
                        {
                            id: id,
                            title: title,
                            description: description,
                            quantity: quantity,
                            currency_id: currency_id,
                            unit_price: price,
                        }
                    ],
                    back_urls: {
                        success: `https://web-app-nav5.onrender.com/dashboard/mi_billetera`,
                        failure: "https://backend-6du3.onrender.com/paymentByMp/failure",
                        pending: "https://backend-6du3.onrender.com/paymentByMp/pending"
                    },
                    notification_url: "https://web-app-nav5.onrender.com/payment/webhook"
                };

                mercadoPago.preferences
                    .create(preference).then(response => res.json(response))
                    .catch(error => res.status(400).json({ "error": error.message }))
            }
        } catch (error) {

        }
    },
    success: async (req, res) => {
       
    },
    webhook: async (req, res) => {
        try {
            return res.status(201).send("Hola este es para cuando una orden se queda esperando el pago")
        } catch (error) {

        }
    },
    failure: async (req, res) => {
        try {
            return res.status(201).send("Hola este es para cuando una orden falla")
        } catch (error) {

        }
    },

};

module.exports = paymenyByMpController;
