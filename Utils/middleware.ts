import jwtConfig from "../Configs";
import { verify } from "jsonwebtoken";
import { validate } from "joi";

/**
 * validateRequest method is used to validate api request payload
 * @param schema Joi schema
 * @param property body or params object
 * @returns success/failure
 */
const validateRequest = (schema, property) => {
  return (req, res, next) => {
    const { error } = validate(req[property], schema);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      res.status(422).json({ code: 10, error: details[0].message });
    }
  };
};

/**
 * validateToken method is used ti verify token
 * @returns success/failure
 */
const validateToken = () => {
  return (req, res, next) => {
    if (!req.headers["x-logintoken"]) {
      res.status(400).json({
        statusCode: 401,
        status: "warning",
        message: "Token missing.",
      });
      return;
    }

    const decoded = verify(
      req.headers["x-logintoken"],
      jwtConfig.jwtConfig.data.jwtkey
    );
    if (decoded) {
      req["verifyDecoded"] = decoded;
      next();
    } else {
      res
        .status(400)
        .json({
          statusCode: 1000,
          status: "warning",
          message: "Session Expired. Please login again to continue.",
        });
    }
  };
};
module.exports = { validateToken, validateRequest };
