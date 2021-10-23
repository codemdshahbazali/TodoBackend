const e = require('express');
const { emailValidate, passwordValidate } = require('../utils/validate');

/**
 *
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {next callback function} next
 *
 * email, password and confirm password -> string
 * email and password lenght -> 8 char
 * validate email and passowrd
 */
const initialRegisterChecks = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  let errorMessage = '';
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    errorMessage = 'email or password or confirm password is not a string';
  } else {
    if (password !== confirmPassword) {
      errorMessage = 'Password and Confirm password are not same';
    } else {
      if (!emailValidate(email)) {
        errorMessage = 'Email is not valid';
      } else {
        if (!passwordValidate(password)) {
          errorMessage = 'Password is not strong enough';
        }
      }
    }
  }

  if (errorMessage === '') {
    next();
  } else {
    res.status(400).send(errorMessage);
  }
};
/**
 *
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {next callback function} next
 *
 * Checks for valid email and password type - should be a string
 * Validates email
 */
const loginChecks = (req, res, next) => {
  const { email, password } = req.body;

  let errorMessage = '';
  if (typeof email !== 'string' || typeof password !== 'string') {
    errorMessage = 'email or password should be string';
  } else {
    if (!emailValidate(email)) {
      errorMessage = 'Not a valid email.';
    }
  }

  if (errorMessage == '') {
    next();
  } else {
    res.status(400).send({ errorMessage });
  }
};

module.exports = { loginChecks, initialRegisterChecks };
