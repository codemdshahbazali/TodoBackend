var express = require('express');
var router = express.Router();

const { initialRegisterChecks, loginChecks } = require('../middleware/check');
const register = require('./../controllers/register');
const loginController = require('./../controllers/login');

/**
 * Registers an user
 *
 * Step 1 - Initial Check
 *   email, password and confirm password -> string
 *   email and password length -> 8 char
 *   validate email and passowrd
 *  Step 2 - Sql Injection
 *  Step 3 - Register User
 */
router.post('/signup', initialRegisterChecks, register, function (req, res) {
  res.status(201).send(res.locals.savedUser);
});

/**
 * Log in an user
 */
router.post('/login', loginChecks, loginController, function (req, res, next) {
  res.status(201).send({ token: `Bearer ${res.locals.token}` });
});

module.exports = router;
