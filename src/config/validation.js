const { body, validationResult } = require("express-validator");
const systemApi = require("../libraries/systemApi.js");

const validationRun = (req, res, next) => {
  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 422,
        errors: validationResults.array(),
      },
      422
    );
  }
  next();
};

const userForm = async (req, res, next) => {
  await body("username").isAlphanumeric().run(req);
  await body("password").notEmpty().run(req);
  await body("user_nama").notEmpty().run(req);
  validationRun(req, res, next);
};

const loginForm = async (req, res, next) => {
  await body("username").isAlphanumeric().run(req);
  await body("password").notEmpty().run(req);
  validationRun(req, res, next);
};

module.exports = {
  loginForm,
  userForm,
};
