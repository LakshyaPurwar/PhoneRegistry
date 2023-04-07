const express = require('express');
const { createUser, updateUser, deleteUser, fetchUsers } = require('../Controllers/userController');

const router = express.Router();

router.post("/user/create",createUser);
router.post("/user/update",updateUser);
router.post("/user/delete",deleteUser);
router.get("/users",fetchUsers);

module.exports = router;