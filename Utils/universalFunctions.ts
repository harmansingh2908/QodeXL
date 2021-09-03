const Model = require("../Models");

module.exports = {
  check_email_exist: async (request) => {
    // check if any given email is already registered with us
    const queryResp = await Model.users.user.find({ email: request });
    return queryResp;
  },
};
