/*====================================================
 *                 Example Controller
 *====================================================
 * const index = (req, res) => {
 *  res.render("view");
 * };
 *
 * export default {
 *  index,
 * };
 *===================================================
 */

const index = (req, res) => {
  res.render("home");
};

const debug = (req, res) => {
  res.send("Debugging..");
};

module.exports = {
  index,
  debug,
};
