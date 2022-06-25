const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware.js");

const usersController = require("../controllers/api/usersController.js");
const authController = require("../controllers/api/authController.js");
const validation = require("../config/validation.js");

const router = express.Router();

/*===================================
 * Configure your router API in here
 *===================================
 */

//Auth Route
router.post("/auth", validation.loginForm, authController.auth);
router.get("/auth/refresh", authController.refreshAuth);
router.get("/logout", authController.logout);

// User Route
router.get("/users", verifyToken, usersController.index);
router.get("/users/:id", verifyToken, usersController.show);
router.post(
  "/users",
  [verifyToken, validation.userForm],
  usersController.store
);
router.put(
  "/users/:id",
  [verifyToken, validation.userForm],
  usersController.update
);
router.delete("/users/:id", verifyToken, usersController.destroy);

module.exports = router;
