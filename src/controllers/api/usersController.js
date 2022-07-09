const bcrypt = require("bcrypt");
const usersModel = require("../../models/usersModel.js");
const systemApi = require("../../libraries/systemApi.js");
const dateHelper = require("../../helpers/dateHelper.js");

const index = async (req, res) => {
  let userData = await usersModel.findAll();

  return systemApi.jsonResponse(res, {
    statusCode: 200,
    listData: userData,
  });
};

const show = async (req, res) => {
  let id = req.params.id;
  let userData = await usersModel.findOne({
    where: {
      id: id,
    },
  });

  return systemApi.jsonResponse(res, {
    statusCode: 200,
    listData: userData,
  });
};

const store = async (req, res) => {
  let data = req.body;
  let salt = await bcrypt.genSalt();

  data.password = await bcrypt.hash(data.password, salt);
  data.created_at = dateHelper.dateNow();

  try {
    await usersModel.create(data);

    return systemApi.jsonResponse(res, {
      statusCode: 200,
      message: "Data is Created",
    });
  } catch (error) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 500,
        message: error,
      },
      500
    );
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  if (data.password) {
    let salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
  }
  data.updated_at = dateHelper.dateNow();

  try {
    await usersModel.update(data, {
      where: {
        id: id,
      },
    });

    return systemApi.jsonResponse(res, {
      statusCode: 200,
      message: "Data is Updated",
    });
  } catch (error) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 500,
        message: error,
      },
      500
    );
  }
};

const destroy = async (req, res) => {
  let id = req.params.id;
  try {
    await usersModel.destroy({
      where: {
        id: id,
      },
    });

    return systemApi.jsonResponse(res, {
      statusCode: 200,
      message: "Data is Deleted",
    });
  } catch (error) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 500,
        message: error,
      },
      500
    );
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
