const express = require("express");
const {
  addSchoolController,
  listSchoolsController
} = require("../controllers/schoolController");

const router = express.Router();

router.post("/addSchool", addSchoolController);
router.get("/listSchools", listSchoolsController);

module.exports = router;
