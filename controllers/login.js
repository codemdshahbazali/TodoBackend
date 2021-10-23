const User = require('./../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require('./../config');

/**
 *
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {calls the next function in middleware chain} next
 * @returns - checks for email in the database. If it exists then matches the password.
 * If that exists then it generates a JWT token and send it back.
 */
const loginController = async (req, res, next) => {
  try {
    //Fetching email and password
    const { email, password } = req.body;

    //Fetching registered user
    let user = await User.findAll({
      where: {
        email: email.toLowerCase(),
      },
    });

    //Checking if user exists using email
    if (user.length > 0) {
      user = Array.from(user)[0].dataValues;
    } else {
      throw new Error('Email not found');
    }

    //Verifying password
    if (bcrypt.compareSync(password, user.password)) {
      //Generating JWT token
      const token = jwt.sign(
        { id: user.id, fullName: user.fullName, email: user.email },
        config.AccessTokenSecret,
        {
          expiresIn: '5m',
        }
      );
      res.locals.token = token;
      next();
    } else {
      return res.status(400).send({ error: 'Incorrect Password' });
    }
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

module.exports = loginController;
