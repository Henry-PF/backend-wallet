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
                        success: `http://localhost:3002/dashboard/mi_billetera`,
                        failure: "http://localhost:3001/paymentByMp/failure",
                        pending: "http://localhost:3001/paymentByMp/pending"
                    },
                    notification_url: "https://7671-2803-9800-b843-7f50-c987-8dd4-d2a1-7539.ngrok.io/payment/webhook"
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
