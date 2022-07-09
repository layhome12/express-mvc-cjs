const express = require("express");
const homeController = require("../controllers/homeController.js");

const router = express.Router();

/*================================
 * Configure your router in here
 *================================
 */

router.get("/", homeController.index);
router.get("/debug", homeController.debug);

module.exports = router;
