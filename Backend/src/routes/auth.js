const express = require("express");
const router = express.Router();
const { skyconnect, skymine } = require("../controllers/auth");
const { protect } = require("../middlewares/auth");

router.route("/skyconnect").post(skyconnect);
router.route("/skymine").get(protect, skymine);

module.exports = router;
