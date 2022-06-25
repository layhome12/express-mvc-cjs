const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const usersModel = require("../models/usersModel.js");

//Dotenv Load
dotenv.config();

const generateToken = async (res, userData) => {
  //Generate Access Token
  let accessToken = jwt.sign(
    {
      id: userData.id,
      username: userData.username,
    },
    process.env.ACCESS_SECRET_TOKEN,
    {
      expiresIn: "15m",
    }
  );

  //Generate Access Token
  let refreshToken = jwt.sign(
    {
      id: userData.id,
      username: userData.username,
    },
    process.env.REFRESH_SECRET_TOKEN,
    {
      expiresIn: "1h",
    }
  );

  //Update Token and Refresh
  await usersModel.update(
    {
      _token: refreshToken,
    },
    {
      where: {
        id: userData.id,
      },
    }
  );

  //Set Cookie Token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return accessToken;
};

const refreshToken = async (res, cookieToken) => {
  let userData = await usersModel.findOne({
    where: {
      _token: cookieToken,
    },
    attributes: ["id", "username"],
  });

  //Check is Valid
  if (!userData) return false;

  //Generate Access Token
  let accessToken = jwt.sign(
    {
      id: userData.id,
      username: userData.username,
    },
    process.env.ACCESS_SECRET_TOKEN,
    {
      expiresIn: "15m",
    }
  );

  return accessToken;
};

const destroyToken = async (res, cookieToken) => {
  let userData = await usersModel.findOne({
    where: {
      _token: cookieToken,
    },
    attributes: ["id", "_token", "username"],
  });

  //Check is Valid
  if (!userData) return false;

  //Update Token Refresh
  await usersModel.update(
    {
      _token: null,
    },
    {
      where: {
        id: userData.id,
      },
    }
  );

  res.clearCookie("refreshToken");

  return true;
};

module.exports = {
  generateToken,
  refreshToken,
  destroyToken,
};
