import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

/**
 * postValidation Object is used to validate the post api's payload request
 */
const postValidation = {
  createPostValidation: Joi.object().keys({
    title: Joi.string().required(),
    post: Joi.string().required(),
    userWallId:Joi.objectId().optional().label("User Id"),
  }),
  getPostDetailValidation: Joi.object().keys({
    postId: Joi.objectId().required().label("Post Id"),
  }),
  viewMyPostValidation: Joi.object().keys({
    skip: Joi.number().optional().label("Skip"),
    limit: Joi.number().optional().label("Limit"),
  }),
  viewAllPostValidation: Joi.object().keys({
    skip: Joi.number().optional().label("Skip"),
    limit: Joi.number().optional().label("Limit"),
  }),
  viewUserPostValidation: Joi.object().keys({
    userId: Joi.objectId().required().label("User Id"),
    skip: Joi.number().optional().label("Skip"),
    limit: Joi.number().optional().label("Limit"),
  }),
  likePostValidation: Joi.object().keys({
    postId: Joi.objectId().required().label("Post Id"),
  }),
  disLikePostValidation: Joi.object().keys({
    postId: Joi.objectId().required().label("Post Id"),
  }),
  postReplyValidation: Joi.object().keys({
    postId: Joi.objectId().required().label("Post Id"),
    comment: Joi.string().required(),
  }),
  deleteCommentValidation: Joi.object().keys({
    postId: Joi.objectId().required().label("Post Id"),
    commentId: Joi.objectId().required().label("Comment Id"),
  }),
  deletePostValidation: Joi.object().keys({
    postId: Joi.objectId().required().label("Post Id"),
  }),
  likeCommentValidation: Joi.object().keys({
    postId: Joi.objectId().required().label("Post Id"),
    commentId: Joi.objectId().required().label("Comment Id"),
  }),
  disLikeCommentValidation: Joi.object().keys({
    postId: Joi.objectId().required().label("Post Id"),
    commentId: Joi.objectId().required().label("Comment Id"),
  }),
};

module.exports = postValidation;
