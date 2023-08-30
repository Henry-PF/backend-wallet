const mercadoPago = require("mercadopago");
const axios = require("axios");
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
                price,
                title,
                currency_id,
                quantity,
            } = req.body;

            let preference = {
                items: [
                    {
                        id: id,
                        quantity: quantity,
                        title: title,
                        currency_id: currency_id,
                        unit_price: price
                    }
                ],
                back_urls: {
                    success: "http://localhost:3001/paymentByMp/success",
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
    try {
    const {data} = await axios.get(`https://api.mercadopago.com/v1/payments/${req.query.payment_id}`, {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      })
    const status = data.status;
    const montoIngresado = data.transaction_amount;

    /*
    Aca se tiene que relacionar el pago segun el status
    si el status es approved se tendria que crear un (registro de transferencia)
    y en usuario_bolsillo el saldo tendria que ser modificado sumandole el montoIngresado
    */

    return res.status(201).redirect("http://localhost:3000/dashboard/mi_billetera");
    } catch (error) {
        console.log({"error": error.message});
    }
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
