const express = require("express");
const router = express.Router();

const {localFileUpload , imageUpload} = require("../controllers/fileUpload");

//api route
// router.post("/videoUpload" , videoUpload);
router.post("/imageUpload" , imageUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;