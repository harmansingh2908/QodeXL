import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

/**
 * userValidation object is used to validate user request
 */
const userValidation = {
  createUserValidation: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
  loginUserValidation: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
  getMyWallValidation: Joi.object().keys({
    skip: Joi.number().optional().label("Skip"),
    limit: Joi.number().optional().label("Limit"),
  }),
  getUserWall: Joi.object().keys({
    userId: Joi.objectId().required().label("Post Id"),
    skip: Joi.number().optional().label("Skip"),
    limit: Joi.number().optional().label("Limit"),
  }),
};

module.exports = userValidation;
