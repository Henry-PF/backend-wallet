const express = require('express');
const passport = require('passport');

const router = express.Router();

const successLogin = 'http://localhost:3000/dashboard'
const failureLogin = 'http://localhost:3000/login'

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
        res.redirect('http://localhost:3000/');
    });
})

module.exports = router