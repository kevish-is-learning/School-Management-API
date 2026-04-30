const {
  createSchool,
  getSchoolsSortedByDistance
} = require("../services/schoolService");
const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require("../utils/appError");
const {
  validateAddSchoolPayload,
  validateListSchoolsQuery
} = require("../validations/schoolValidation");

const addSchoolController = asyncHandler(async (req, res) => {
  const validation = validateAddSchoolPayload(req.body);

  if (!validation.isValid) {
    throw new AppError("Validation failed", 400, validation.errors);
  }

  const createdSchool = await createSchool(validation.value);

  return res.status(201).json({
    success: true,
    message: "School added successfully",
    data: createdSchool
  });
});

const listSchoolsController = asyncHandler(async (req, res) => {
  const validation = validateListSchoolsQuery(req.query);

  if (!validation.isValid) {
    throw new AppError("Validation failed", 400, validation.errors);
  }

  const schools = await getSchoolsSortedByDistance(validation.value);

  return res.status(200).json({
    success: true,
    message: "Schools fetched successfully",
    data: schools
  });
});

module.exports = {
  addSchoolController,
  listSchoolsController
};
