import { Router } from "express";

const schemas = require("../Schemas/users");
const responses = require("../Utils/responses");
const middleware = require("../Utils/middleware");
const router = Router();
const Controllers = require("../Controllers");

router.post(
  "/v1/createUser",
  middleware.validateRequest(schemas.createUserValidation, "body"),
  async (req, res) => {
    const resp = await Controllers.users.registerUser(req["body"], res);
    return res.json(resp);
  }
);

router.post(
  "/v1/loginUser",
  middleware.validateRequest(schemas.loginUserValidation, "body"),
  async (req, res) => {
    const resp = await Controllers.users.loginUser(req["body"], res);
    if(resp.token)
    {
      res.header('X-logintoken', resp.token) 
      return res.json(responses.userLoginSuccess);
    }
    return res.json(resp)
  }
);

router.get(
  "/v1/getAllUsers",
  middleware.validateToken(),
  async (req, res) => {
    console.log(req.body.decoded);
    const resp = await Controllers.users.getAllUsers(req["body"], res);
    return res.json(resp)
  }
);

router.post(
  "/v1/logoutUser",
  middleware.validateToken(),
  async (req, res) => {
    console.log(req.body.decoded);
    const resp = await Controllers.users.logoutUser(req["body"], res);
    return res.json(resp)
  }
);

router.get(
  "/v1/getMyWallPost",
  middleware.validateToken(),
  middleware.validateRequest(schemas.getMyWallValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.users.getMyWallPost(req["body"], res);
    return res.json(resp);
  }
);

router.get(
  "/v1/getUserWall",
  middleware.validateToken(),
  middleware.validateRequest(schemas.getUserWall, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.users.getUserWall(req["body"], res);
    return res.json(resp);
  }
);

export default router;
