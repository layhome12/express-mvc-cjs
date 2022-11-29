/*=========================================================
 *               VUE GOOD TABLE SERVER SIDE
 *                 Created By : layhome12
 * ========================================================
 */

/*=========================================================
 *                       PENGGUNAAN
 *=========================================================
 * const dataTables = require("../libraries/dataTables.js");
 *
 * const dataTableFunc = async (req, res) => {
 *
 *  dataTables.configData({
 *    request: req,
 *    config: {
 *       attributes: ['foo', 'bar']
 *    },
 *    model: yourModel,
 *  });
 *
 *  let { resultData, totalRows } = await dataTables.getData();
 *
 *  console.log(resultData);
 *
 * };
 *
 * KETERANGAN
 * request => Berisi Request HTTP
 * config => Berisi Sequelize Query Builder
 * model => Berisi Model yang akan digunakan
 *=========================================================
 */

const { Op } = require("sequelize");

let tableModel;
let columnTable = [];
let configModels = {};

const configData = ({ request, config = {}, model }) => {
  tableModel = model;
  configModels = config;
  requestDataTable(request.body);
};

const searchingData = (searchTerm = "") => {
  let arrColumn = [];

  //Get All Column
  for (let key in tableModel.rawAttributes) {
    columnTable.push(key);

    //Remove Search Specific Column
    if (key != "id" && key != "created_at" && key != "updated_at") {
      arrColumn.push({
        [key]: {
          [Op.like]: `%${searchTerm}%`,
        },
      });
    }
  }

  //Append Where Object
  if (Object.prototype.hasOwnProperty.call(configModels, "where")) {
    var arrWhere = [];

    arrWhere.push(configModels.where);
    arrWhere.push({
      [Op.or]: arrColumn,
    });

    configModels.where = arrWhere;
  } else {
    configModels.where = {
      [Op.or]: arrColumn,
    };
  }
};

const sortingData = (sort) => {
  let isExist = Object.values(columnTable).indexOf(sort.field);

  if (isExist >= 0 && sort.type != "none")
    configModels.order = [[sort.field, sort.type]];
};

const limitOffsetData = (page, length) => {
  let offset = (page - 1) * length;

  configModels.limit = length;
  configModels.offset = offset;
};

const requestDataTable = (requestData) => {
  searchingData(requestData.searchTerm);
  sortingData(requestData.sort[0]);
  limitOffsetData(parseInt(requestData.page), parseInt(requestData.perPage));
};

const countTotalRows = async () => {
  let totalRows = await tableModel.count(configModels);
  return totalRows;
};

const getData = async () => {
  let resultData = await tableModel.findAll(configModels);
  let totalRows = await countTotalRows();

  return {
    resultData,
    totalRows,
  };
};

module.exports = {
  configData,
  getData,
};
