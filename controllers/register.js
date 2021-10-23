const bcrypt = require('bcrypt');
const User = require('./../models/User');

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * Register User
 *  - Check if user already exist. If so then send back user already exists
 *  - Hash the password
 *  - Save user to the Database
 */
const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    //checking for user if they already exist in the database
    const alreadyExist = await User.findOne({
      where: { email: email.toLowerCase() },
    });
    if (alreadyExist) {
      return res.status(401).send({ error: 'Email alraedy exists!!!' });
    }

    //Hashing password using bcrypt
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    //create a user object with hashed password
    const user = {
      fullName,
      email: email.toLowerCase(),
      password: passwordHash,
    };

    //Saving or Updating the changes to the database
    let savedUser = await User.create(user);

    //Passing saved user to main sigup function
    res.locals.savedUser = savedUser;

    next();
  } catch (e) {
    return res
      .status(500)
      .send({ error: 'Issue registering the User.', errorDetail: e.message });
  }
};

module.exports = register;
