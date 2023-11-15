const router = require('express').Router();
const userController = require('../../../controllers/userController');

// router.get('/', getTodos);

router.route('/')
    .get(getTodos)
    .post((req, res) => {
        const user = userController.createUser()})

router.route('/:id')
    .get(getTodoByID)
    .put(updateTodoByID)
    .delete(deleteTodoByID);


module.exports = router;