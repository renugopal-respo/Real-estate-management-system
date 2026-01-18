const express = require("express");
const router = express.Router();
const userController = require('../controllers/Usercontoller');

// Routes
router.post("/createuser", userController.createUser);
router.post("/verifyUser", userController.verifyUser);

router.get("/:id", userController.getUserByID);
router.delete("/:id", userController.deleteUser);

module.exports = router;
