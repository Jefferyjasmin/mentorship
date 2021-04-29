const express = require("express");
const router = express.Router();
// @route    Get api/users/test
// @desc     test post route
// @access   public
router.get("/test", (req, res) => res.json({ mesg: " Users works" }));

module.exports = router;
