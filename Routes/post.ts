import { Router } from "express";

const schemas = require("../Schemas/post");
const middleware = require("../Utils/middleware");
const router = Router();
const Controllers = require("../Controllers");

router.post(
  "/v1/createPost",
  middleware.validateToken(),
  middleware.validateRequest(schemas.createPostValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.createPost(req["body"], res);
    return res.json(resp);
  }
);

router.get(
  "/v1/getPostDetail",
  middleware.validateToken(),
  middleware.validateRequest(schemas.getPostDetailValidation, "query"),
  async (req, res) => {
    const resp = await Controllers.post.getPostDetail(req["query"], res);
    return res.json(resp);
  }
);

router.get(
  "/v1/viewMyPost",
  middleware.validateToken(),
  middleware.validateRequest(schemas.viewMyPostValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.viewMyPost(req["body"], res);
    return res.json(resp);
  }
);

router.get(
  "/v1/viewAllPost",
  middleware.validateToken(),
  middleware.validateRequest(schemas.viewAllPostValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.viewAllPost(req["body"], res);
    return res.json(resp);
  }
);

router.get(
  "/v1/viewUserPost",
  middleware.validateToken(),
  middleware.validateRequest(schemas.viewUserPostValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.viewUserPost(req["body"], res);
    return res.json(resp);
  }
);

router.post(
  "/v1/likePost",
  middleware.validateToken(),
  middleware.validateRequest(schemas.likePostValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.likePost(req["body"], res);
    return res.json(resp);
  }
);

router.post(
  "/v1/disLikePost",
  middleware.validateToken(),
  middleware.validateRequest(schemas.disLikePostValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.disLikePost(req["body"], res);
    return res.json(resp);
  }
);

router.post(
  "/v1/addComment",
  middleware.validateToken(),
  middleware.validateRequest(schemas.postReplyValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.addComment(req["body"], res);
    return res.json(resp);
  }
);

router.delete(
  "/v1/deleteComment",
  middleware.validateToken(),
  middleware.validateRequest(schemas.deleteCommentValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.deleteComment(req["body"], res);
    return res.json(resp);
  }
);

router.delete(
  "/v1/deletePost",
  middleware.validateToken(),
  middleware.validateRequest(schemas.deletePostValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.deletePost(req["body"], res);
    return res.json(resp);
  }
);

router.post(
  "/v1/likeComment",
  middleware.validateToken(),
  middleware.validateRequest(schemas.likeCommentValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.likeComment(req["body"], res);
    return res.json(resp);
  }
);

router.post(
  "/v1/disLikeComment",
  middleware.validateToken(),
  middleware.validateRequest(schemas.disLikeCommentValidation, "body"),
  async (req, res) => {
    req.body["decoded"] = req["verifyDecoded"];
    const resp = await Controllers.post.disLikeComment(req["body"], res);
    return res.json(resp);
  }
);
export default router;
