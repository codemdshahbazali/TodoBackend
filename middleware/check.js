const e = require('express');
const { emailValidate, passwordValidate } = require('../utils/validate');
const errorMessages = require('./../constants/errorMessages');

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
    errorMessage = errorMessages.checks.register.NOT_STRING;
  } else {
    if (password !== confirmPassword) {
      errorMessage = errorMessages.checks.register.PASSWORD_NOT_SAME;
    } else {
      if (!emailValidate(email)) {
        errorMessage = errorMessages.checks.register.EMAIL_NOT_VALID;
      } else {
        if (!passwordValidate(password)) {
          errorMessage = errorMessages.checks.register.PASSWORD_NOT_STRONG;
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
    errorMessage = errorMessages.checks.login.NOT_STRING;
  } else {
    if (!emailValidate(email)) {
      errorMessage = errorMessages.checks.login.EMAIL_NOT_VALID;
    }
  }

  if (errorMessage == '') {
    next();
  } else {
    res.status(400).send({ errorMessage });
  }
};

module.exports = { loginChecks, initialRegisterChecks };
