var express = require('express');
var router = express.Router();
const {
  createTodo,
  getAllTodos,
  getSingleTodo,
  deleteTodo,
  updateTodo,
} = require('./../controllers/todos');

/**
 * Gets all the todos
 */
router.get('/', getAllTodos, function (req, res) {
  res.status(200).send(res.locals.allTodos);
});

/**
 * Creates a todo
 */
router.post('/', createTodo, function (req, res) {
  res.status(201).send(res.locals.createdTodo);
});

/**
 * Gets an individual Todo
 */
router.get('/:id', getSingleTodo, function (req, res) {
  res.status(200).send(res.locals.individualTodo);
});

/**
 * Updates an exisiting todo
 */
router.put('/:id', updateTodo, function (req, res) {
  res.status(200).send(res.locals.updatedTodo);
});

/**
 * Deletes an existing todo
 */
router.delete('/:id', deleteTodo, function (req, res) {
  res.sendStatus(204);
});

module.exports = router;
