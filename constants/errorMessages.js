const errorMessages = {
  login: {
    EMAIL_NOT_FOUND: 'Email not found',
    INCORRECT_PASSWORD: 'Incorrect Password',
  },
  register: {
    EMAIL_EXISTS: 'Email alraedy exists',
    REGISTER_ISSUE: 'Issue registering the User',
  },
  todos: {
    updateTodo: {
      USER_NOT_FOUND: 'Todo not found. Update failed',
    },
    getSingleTodo: {
      TODO_NOT_FOUND: 'Todo Not found',
    },
    deleteTodo: {
      TODO_NOT_FOUND: "Todo doesn't exists",
    },
  },
  checks: {
    register: {
      NOT_STRING:
        'Email or password or confirm password should be of type string',
      PASSWORD_NOT_SAME: 'Password and Confirm password mismatch',
      EMAIL_NOT_VALID: 'Invalid Email',
      PASSWORD_NOT_STRONG: 'Password is not strong enough',
    },
    login: {
      NOT_STRING: 'Email or password should be of type string',
      EMAIL_NOT_VALID: 'Invalid Email',
    },
  },
};

module.exports = errorMessages;
