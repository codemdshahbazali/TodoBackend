const Todo = require('./../models/Todo');
var jwt = require('jsonwebtoken');
const config = require('./../config');
const errorMessages = require('./../constants/errorMessages');

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

    var decoded = req.user;

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

    var decoded = req.user;

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
        error: errorMessages.todos.updateTodo.USER_NOT_FOUND,
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
    var decoded = req.user;

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
    var decoded = req.user;

    const todo = await Todo.findOne({
      where: {
        id: todoId,
        UserId: decoded.id,
      },
    });

    if (todo === null) {
      throw new Error(errorMessages.todos.getSingleTodo.TODO_NOT_FOUND);
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

    var decoded = req.user;
    const destroyedRowNumber = await Todo.destroy({
      where: {
        id: todoId,
        UserId: decoded.id,
      },
    });

    if (destroyedRowNumber == 0) {
      throw new Error(errorMessages.todos.deleteTodo.TODO_NOT_FOUND);
    }
    next();
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

/**
 * Verifies jwt token and returns decoded token
 * @param {Request passed from middleware} req
 * @param {Response passed from middleware} res
 * @param {Calls the next function} next
 * @returns
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  // verify a token symmetric - synchronous
  jwt.verify(token, config.AccessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = {
  createTodo,
  getAllTodos,
  getSingleTodo,
  deleteTodo,
  updateTodo,
  authenticateToken,
};
