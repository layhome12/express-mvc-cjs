const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const systemApi = require("../libraries/systemApi.js");

//Dotenv Load
dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const tokenHeader = authHeader && authHeader.split(" ")[1];

  if (tokenHeader == null) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 401,
        message: "Authorization Required",
      },
      401
    );
  }

  //Verify Token
  jwt.verify(
    tokenHeader,
    process.env.ACCESS_SECRET_TOKEN,
    async (err, decode) => {
      if (err) {
        return systemApi.jsonResponse(
          res,
          {
            statusCode: 403,
            message: "Bearer token is not valid",
          },
          403
        );
      }

      next();
    }
  );
};

module.exports = {
  verifyToken
};
