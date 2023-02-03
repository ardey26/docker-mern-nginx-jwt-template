const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  changePassword,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/change", protect, changePassword);
router.delete("/", protect, deleteUser);

module.exports = router;
