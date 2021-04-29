const express = require("express");
const { route } = require("./users");
const router = express.Router();
// @route    Get api/profile/test
// @desc     test post route
// @access   public

router.get("/test", (req, res) => res.json({ meg: " profile works" }));

module.exports = router;
