const router = require("express").Router();
const todosController = require("../controllers/todos");
const verifyToken = require("../middlewares/authorization");
router.use(verifyToken)
router.post("/", todosController.createTodo);
router.delete("/:id", todosController.deleteTodo);
router.patch("/:id", todosController.updateTodo);
router.get("/", todosController.getTodosbyFilter);
module.exports = router;
