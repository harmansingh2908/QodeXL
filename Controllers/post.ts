const responses = require("../Utils/responses");
const Models = require("../Models");
import moment from "moment";

module.exports = {
  /**
   * createPost method is used for create post on user' wall
   * @param payload body/params object
   * @param res object
   * @returns success
   */
  createPost: async (payload, res) => {
    const obj = {
      post: payload.post,
      title: payload.title,
      creationUser: payload["decoded"].id,
    };
    const post = await Models.post.post(obj).save();
    await Models.users.user.updateOne(
      { _id: payload.userWallId || payload["decoded"].id },
      { $push: { myWall: post._id } }
    );
    responses.postCreatedSuccess["postId"] = post._id;
    return responses.postCreatedSuccess;
  },
  /**
   * getPostDetail method is used to get details of given post id
   * @param payload body/params object
   * @param res object
   * @returns post details
   */
  getPostDetail: async (payload, res) => {
    const queryParam = {
      _id: payload.postId,
      is_deleted: false,
    };
    const queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidPostId;
    }

    const obj = {
      _id: payload.postId,
      is_deleted: false,
    };
    const populateModel = [
      {
        path: "creationUser",
        model: "user",
        select: "username",
        options: { lean: true },
      },
      {
        path: "post_reply",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_reply",
        populate: {
          path: "reply_like",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_reply",
        populate: {
          path: "reply_dislike",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_like",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_dislike",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
    ];

    const post = await Models.post.post
      .findOne(obj, {
        title: 1,
        post: 1,
        creationUser: 1,
        reply_count: 1,
        post_reply: 1,
        post_like: 1,
        likes_count: 1,
        post_dislike: 1,
        dislikes_count: 1,
      })
      .populate(populateModel)
      .lean();
    responses.postDetail["postDetail"] = post;
    return responses.postDetail;
  },
  viewMyPost: async (payload, res) => {
    const obj = {
      creationUser: payload.decoded.id,
      is_deleted: false,
    };
    const populateModel = [
      {
        path: "creationUser",
        model: "user",
        select: "username",
        options: { lean: true },
      },
      {
        path: "post_reply",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_reply",
        populate: {
          path: "reply_like",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_reply",
        populate: {
          path: "reply_dislike",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_like",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_dislike",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
    ];
    const options = {
      sort: { created_at: -1 },
      skip: payload.skip || 0,
      limit: payload.limit || 10,
    };
    const post = await Models.post.post
      .find(
        obj,
        {
          title: 1,
          post: 1,
          creationUser: 1,
          reply_count: 1,
          post_reply: 1,
          post_like: 1,
          likes_count: 1,
          post_dislike: 1,
          dislikes_count: 1,
        },
        options
      )
      .populate(populateModel)
      .lean();
    responses.postList["totalMyPost"] = await Models.post.post.count(obj);
    responses.postList["myPosts"] = post;
    return responses.postList;
  },
  viewAllPost: async (payload, res) => {
    const obj = {
      is_deleted: false,
    };
    const populateModel = [
      {
        path: "creationUser",
        model: "user",
        select: "username",
        options: { lean: true },
      },
      {
        path: "post_reply",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_reply",
        populate: {
          path: "reply_like",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_reply",
        populate: {
          path: "reply_dislike",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_like",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_dislike",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
    ];
    const options = {
      sort: { created_at: -1 },
      skip: payload.skip || 0,
      limit: payload.limit || 10,
    };
    const post = await Models.post.post
      .find(
        obj,
        {
          title: 1,
          post: 1,
          creationUser: 1,
          reply_count: 1,
          post_reply: 1,
          post_like: 1,
          likes_count: 1,
          post_dislike: 1,
          dislikes_count: 1,
        },
        options
      )
      .populate(populateModel)
      .lean();
    responses.allPostList["allPostCount"] = await Models.post.post.count(obj);
    responses.allPostList["allPosts"] = post;
    return responses.allPostList;
  },
  viewUserPost: async (payload, res) => {
    const obj = {
      creationUser: payload.userId,
      is_deleted: false,
    };
    const populateModel = [
      {
        path: "creationUser",
        model: "user",
        select: "username",
        options: { lean: true },
      },
      {
        path: "post_reply",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_reply",
        populate: {
          path: "reply_like",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_reply",
        populate: {
          path: "reply_dislike",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_like",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
      {
        path: "post_dislike",
        populate: {
          path: "user_id",
          model: "user",
          select: "username",
          options: { lean: true },
        },
      },
    ];
    const options = {
      sort: { created_at: -1 },
      skip: payload.skip || 0,
      limit: payload.limit || 10,
    };
    const post = await Models.post.post
      .find(
        obj,
        {
          title: 1,
          post: 1,
          creationUser: 1,
          reply_count: 1,
          post_reply: 1,
          post_like: 1,
          likes_count: 1,
          post_dislike: 1,
          dislikes_count: 1,
        },
        options
      )
      .populate(populateModel)
      .lean();
    responses.postList["totalMyPost"] = await Models.post.post.count(obj);
    responses.postList["myPosts"] = post;
    return responses.postList;
  },
  /**
   * likePost is used to like a post
   * @param payload body/params object
   * @param res object
   * @returns success
   */
  likePost: async (payload, res) => {
    const queryParam = {
      _id: payload.postId,
      is_deleted: false,
    };
    const queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidPostId;
    }

    //******** criteria to match *******//
    const criteriaLike = {
      _id: payload.postId,
      post_like: {
        $elemMatch: {
          user_id: payload.decoded.id,
        },
      },
    };

    //****** projection *******//
    const projectionLike = {
      _id: 1,
    };

    const likeStatus = await Models.post.post.find(
      criteriaLike,
      projectionLike
    );
    if (likeStatus.length > 0) {
      return responses.postAlreadyLike;
    }

    //******** criteria to match *******//
    const criteria = {
      _id: payload.postId,
      post_dislike: {
        $elemMatch: {
          user_id: payload.decoded.id,
        },
      },
    };

    //****** projection *******//
    const projection = {
      _id: 1,
    };

    const dislikeStatus = await Models.post.post.find(criteria, projection);

    let dataToSet = {};
    dataToSet = {
      $push: {
        post_like: {
          user_id: payload.decoded.id,
          liked_at: moment().unix(),
        },
      },
      $inc: {
        likes_count: 1,
      },
    };
    if (dislikeStatus.length > 0) {
      dataToSet["$pull"] = {
        post_dislike: {
          user_id: payload.decoded.id,
        },
      };

      dataToSet["$inc"] = {
        dislikes_count: -1,
        likes_count: 1,
      };
    }

    await Models.post.post.updateOne(queryParam, dataToSet);
    return responses.postLike;
  },
  /**
   * disLikePost is used to dislike a post
   * @param payload body/params object
   * @param res object
   * @returns success
   */
  disLikePost: async (payload, res) => {
    const queryParam = {
      _id: payload.postId,
      is_deleted: false,
    };
    const queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidPostId;
    }

    //******** criteria to match *******//
    const criteriaDisLike = {
      _id: payload.postId,
      post_dislike: {
        $elemMatch: {
          user_id: payload.decoded.id,
        },
      },
    };

    //****** projection *******//
    const projectionDisLike = {
      _id: 1,
    };
    const dislikeStatus = await Models.post.post.find(
      criteriaDisLike,
      projectionDisLike
    );
    if (dislikeStatus.length > 0) {
      return responses.postAlreadyDisLike;
    }

    //******** criteria to match *******//
    const criteria = {
      _id: payload.postId,
      post_like: {
        $elemMatch: {
          user_id: payload.decoded.id,
        },
      },
    };

    //****** projection *******//
    const projection = {
      _id: 1,
    };

    const likeStatus = await Models.post.post.find(criteria, projection);

    let dataToSet = {};
    dataToSet = {
      $push: {
        post_dislike: {
          user_id: payload.decoded.id,
          liked_at: moment().unix(),
        },
      },
      $inc: {
        dislikes_count: 1,
      },
    };

    if (likeStatus.length > 0) {
      dataToSet["$pull"] = {
        post_like: {
          user_id: payload.decoded.id,
        },
      };

      dataToSet["$inc"] = {
        dislikes_count: 1,
        likes_count: -1,
      };
    }

    await Models.post.post.updateOne(queryParam, dataToSet);
    return responses.postDisLike;
  },
  /**
   * addComment is used to add comment on given postId
   * @param payload body/params object
   * @param res object
   * @returns success
   */
  addComment: async (payload, res) => {
    const queryParam = {
      _id: payload.postId,
      is_deleted: false,
    };
    const queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidPostId;
    }

    let dataToSet = {
      $push: {
        post_reply: {
          user_id: payload.decoded.id,
          liked_at: moment().unix(),
          reply: payload.comment,
        },
      },
      $inc: {
        reply_count: 1,
      },
    };

    await Models.post.post.updateOne(queryParam, dataToSet);
    return responses.commentAdded;
  },
  /**
   * deleteComment is used to delete comment on given postId/commentId
   * @param payload body/params object
   * @param res object
   * @returns success
   */
  deleteComment: async (payload, res) => {
    let queryParam = {
      _id: payload.postId,
      is_deleted: false,
    };
    let queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidPostId;
    }

    queryParam["post_reply"] = {
      $elemMatch: {
        _id: payload.commentId
      },
    };

    queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidCommentId;
    }

    queryParam["post_reply"] = {
      $elemMatch: {
        _id: payload.commentId,
        user_id: payload.decoded.id,
      },
    };

    queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.notPermission;
    }

    let dataToSet = {
      $pull: {
        post_reply: {
          _id: payload.commentId,
          user_id: payload.decoded.id,
        },
      },
      $inc: {
        reply_count: -1,
      },
    };

    await Models.post.post.updateOne(queryParam, dataToSet);
    return responses.commentDelete;
  },
  /**
   * deletePost is used to delete post on given postId
   * @param payload body/params object
   * @param res object
   * @returns success
   */
  deletePost: async (payload, res) => {
    const queryParam = {
      _id: payload.postId,
      is_deleted: false
    };
    const queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidPostId;
    }

    const query = {
      _id: payload.postId,
      is_deleted: false,
      creationUser: payload.decoded.id,
    };

    const queryResp1 = await Models.post.post.findOne(query);
    if (!queryResp1) {
      return responses.notPermission;
    }

    const obj = {
      _id: payload.postId,
    };
    await Models.post.post.updateOne(obj, {
      is_deleted: true,
    });
    await Models.users.user.updateOne(
      { _id: payload["decoded"].id },
      { $pull: { myWall: payload.postId } }
    );
    return responses.postDelete;
  },
  /**
   * likeComment is used to like a post reply
   * @param payload body/params object
   * @param res object
   * @returns success
   */
  likeComment: async (payload, res) => {
    let queryParam = {
      _id: payload.postId,
      is_deleted: false,
    };
    let queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidPostId;
    }

    queryParam["post_reply"] = {
      $elemMatch: {
        _id: payload.commentId,
      },
    };

    queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidCommentId;
    }

    queryParam["post_reply"] = {
      $elemMatch: {
        _id: payload.commentId,
        reply_like: payload.decoded.id,
      },
    };

    queryResp = await Models.post.post.findOne(queryParam);
    if (queryResp) {
      return responses.commentAlreadyLike;
    }

    queryParam["post_reply"] = {
      $elemMatch: {
        _id: payload.commentId,
        reply_dislike: payload.decoded.id,
      },
    };

    queryResp = await Models.post.post.findOne(queryParam);

    let query = {
      _id: payload.postId,
      is_deleted: false,
      post_reply: {
        $elemMatch: {
          _id: payload.commentId,
        },
      },
    };
    let dataToSet = {};
    dataToSet = {
      $push: { "post_reply.$.reply_like": payload.decoded.id },
      $inc: {
        "post_reply.$.reply_likes_count": 1,
      },
    };

    if (queryResp) {
      dataToSet["$pull"] = { "post_reply.$.reply_dislike": payload.decoded.id };
      dataToSet["$inc"] = {
        "post_reply.$.reply_likes_count": 1,
        "post_reply.$.reply_dislikes_count": -1,
      };
    }

    await Models.post.post.updateOne(query, dataToSet);
    return responses.commentLike;
  },
  /**
   * disLikeComment is used to dislike a post reply
   * @param payload body/params object
   * @param res object
   * @returns success
   */
  disLikeComment: async (payload, res) => {
    let queryParam = {
      _id: payload.postId,
      is_deleted: false,
    };
    let queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidPostId;
    }

    queryParam["post_reply"] = {
      $elemMatch: {
        _id: payload.commentId,
      },
    };

    queryResp = await Models.post.post.findOne(queryParam);
    if (!queryResp) {
      return responses.invalidCommentId;
    }

    queryParam["post_reply"] = {
      $elemMatch: {
        _id: payload.commentId,
        reply_dislike: payload.decoded.id,
      },
    };

    queryResp = await Models.post.post.findOne(queryParam);
    if (queryResp) {
      return responses.commentAlreadyDisLike;
    }

    queryParam["post_reply"] = {
      $elemMatch: {
        _id: payload.commentId,
        reply_like: payload.decoded.id,
      },
    };

    queryResp = await Models.post.post.findOne(queryParam);

    let query = {
      _id: payload.postId,
      is_deleted: false,
      post_reply: {
        $elemMatch: {
          _id: payload.commentId,
        },
      },
    };

    let dataToSet = {};
    dataToSet = {
      $push: { "post_reply.$.reply_dislike": payload.decoded.id },
      $inc: {
        "post_reply.$.reply_dislikes_count": 1,
      },
    };

    if (queryResp) {
      dataToSet["$pull"] = { "post_reply.$.reply_like": payload.decoded.id };
      dataToSet["$inc"] = {
        "post_reply.$.reply_likes_count": -1,
        "post_reply.$.reply_dislikes_count": 1,
      };
    }

    await Models.post.post.updateOne(query, dataToSet);
    return responses.commentDisLike;
  },
};
