const router = require("express").Router();
const { createUser, getUsersFirstname, deleteUser, findUserTodos, updateUser, userLogin } = require("../controllers/users");

router.post('/login',userLogin)
router.post("/", createUser);
router.get("/",getUsersFirstname)
router.get('/:id/todos',findUserTodos)
router.delete("/:id",deleteUser)
router.patch("/:id",updateUser)

module.exports = router;
