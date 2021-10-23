const Todo = require('./../models/Todo');
var jwt = require('jsonwebtoken');
const config = require('./../config');

/**
 *
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {calls the next function in middleware chain} next
 * @returns - creates a todo and returns the created todo on success. Also returns a failure message on failure
 */
const createTodo = async (req, res, next) => {
  try {
    const { item } = req.body;

    //verifying JWT
    var decoded = validateJWT(req);

    const createdTodo = await Todo.create({
      item,
      UserId: decoded.id,
    });

    res.locals.createdTodo = createdTodo;
    next();
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

/**
 *
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {calls the next function in middleware chain} next
 * @returns - Updates a todo and returns the updated todo on success. Also returns a failure message on failure
 */
const updateTodo = async (req, res, next) => {
  try {
    const { item, isCompleted } = req.body;
    const todoId = req.params.id;

    //verifying JWT
    var decoded = validateJWT(req);

    let updatedTodo = await Todo.update(
      { item, isCompleted },
      {
        where: {
          id: todoId,
          UserId: decoded.id,
        },
      }
    );

    if (updatedTodo[0] === 0) {
      updatedTodo = {
        message: 'User not found. Update failed !!!',
      };
    } else {
      const todo = await Todo.findOne({
        where: {
          id: todoId,
          UserId: decoded.id,
        },
      });

      updatedTodo = todo;
    }

    res.locals.updatedTodo = updatedTodo;
    next();
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

/**
 *
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {calls the next function in middleware chain} next
 * @returns - returns all the todos on success. Returns a failure message on failure
 */
const getAllTodos = async (req, res, next) => {
  try {
    //verifying JWT
    var decoded = validateJWT(req);

    const { count, rows } = await Todo.findAndCountAll({
      where: {
        UserId: decoded.id,
      },
    });

    res.locals.allTodos = { count, todos: rows };
    next();
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

/**
 *
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {calls the next function in middleware chain} next
 * @returns - returns a single todo on success based on passed id using params. Returns a failure message on failure
 */
const getSingleTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    //verifying JWT
    var decoded = validateJWT(req);

    const todo = await Todo.findOne({
      where: {
        id: todoId,
        UserId: decoded.id,
      },
    });

    if (todo === null) {
      throw new Error('Todo Not found!');
    }

    res.locals.individualTodo = todo;
    next();
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

/**
 *
 * @param {Request Object} req
 * @param {Response Object} res
 * @param {calls the next function in middleware chain} next
 * @returns - returns 204 on success based on passed id using params. Returns a failure message on failure
 */
const deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.id;

    //verifying JWT
    var decoded = validateJWT(req);
    const destroyedRowNumber = await Todo.destroy({
      where: {
        id: todoId,
        UserId: decoded.id,
      },
    });

    if (destroyedRowNumber == 0) {
      throw new Error("Todo doesn't exists!");
    }
    next();
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

/**
 * Verifies jwt token and returns decoded token
 * @param {Request passed from middleware} req
 * @returns returns decode values
 */
const validateJWT = (req) => {
  const token = req.headers['authorization'].split(' ')[1];

  // verify a token symmetric - synchronous
  return jwt.verify(token, config.AccessTokenSecret);
};

module.exports = {
  createTodo,
  getAllTodos,
  getSingleTodo,
  deleteTodo,
  updateTodo,
};
