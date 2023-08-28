const express = require('express');
const passport = require('passport');

const router = express.Router();

const successLogin = 'https://web-app-nav5.onrender.com/dashboard'
const failureLogin = 'https://web-app-nav5.onrender.com/login'

router.get('/login', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/callback', passport.authenticate('google', {
    failureMessage: 'Error al tratar de iniciar sesión con Google, intentalo de nuevo',
    failureRedirect: failureLogin,
    successRedirect: successLogin,
}),
    (req, res) => {
        res.send('Inicion de sesión exitosa')
    }
)

router.get('/logout', (req, res) => {
    req.session.destroy(function () {
        res.clearCookie('connect.sid');
        res.redirect('https://web-app-nav5.onrender.com');
    });
})

module.exports = router