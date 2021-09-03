import { sign } from "jsonwebtoken";
import md5 from "md5";
import jwtConfig from "../Configs";

const utils = require("../Utils/universalFunctions");
const responses = require("../Utils/responses");
const Models = require("../Models");

module.exports = {
  registerUser: async (payload, res) => {
    const email = await utils.check_email_exist(payload.email);
    if (email && email.length > 0) {
      return responses.emailAlreadyExists;
    }
    const password_hash = md5(payload.password);
    const obj = {
      username: payload.username,
      email: payload.email,
      password: password_hash,
    };

    await Models.users.user(obj).save();
    return responses.userCreatedSuccess;
  },
  loginUser: async (payload, res) => {
    const email = await utils.check_email_exist(payload.email);
    if (email && email.length === 0) {
      return responses.emailNotRegister;
    }
    const password_hash = md5(payload.password);
    const obj = {
      email: payload.email,
      password: password_hash,
    };

    const checkUser = await Models.users.user.findOne(obj);
    if (!checkUser) {
      return responses.invalidCredentials;
    }
    const token = sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        first_name: checkUser.username,
        created_at: checkUser.created_at,
      },
      jwtConfig.jwtConfig.data.jwtkey,
      { algorithm: jwtConfig.jwtConfig.data.jwtAlgo, expiresIn: "2 days" }
    );

    await Models.users.user.updateOne(obj, { login_token: token });
    return { token };
  },
  getAllUsers: async (payload, res) => {
    const userList = await Models.users.user.find(
      {},
      { username: 1, _id: 1, email: 1 }
    );
    responses.userListing["data"] = userList;
    return responses.userListing;
  },
  logoutUser: async (payload, res) => {
    await Models.users.user.updateOne(
      { login_token: payload.token },
      { login_token: "0" }
    );
    return responses.userLogoutSuccess;
  },
  getMyWallPost: async (payload, res) => {
    const populateModel = [
      {
        path: "myWall",
        model: "post",
        options: {
          lean: true,
          sort: { created_at: -1 },
          skip: payload.skip || 0,
          limit: payload.limit || 10,
        },
        populate: [
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
        ],
      },
    ];
    const myWallPost = await Models.users.user
      .findOne({ _id: payload.decoded.id }, { myWall: 1 })
      .populate(populateModel)
      .lean();
    responses.postList["totalMyPost"] = 0;
    if (myWallPost.myWall && myWallPost.myWall.length)
      responses.postList["totalMyPost"] = myWallPost.myWall.length;
    responses.postList["myPosts"] = myWallPost.myWall || [];
    return responses.postList;
  },
  getUserWall: async (payload, res) => {
    const checkUser = await Models.users.user.findOne(
      { _id: payload.userId },
      { myWall: 1 }
    );

    if (!checkUser) {
      return responses.invalidUserId;
    }

    const populateModel = [
      {
        path: "myWall",
        model: "post",
        options: {
          lean: true,
          sort: { created_at: -1 },
          skip: payload.skip || 0,
          limit: payload.limit || 10,
        },
        populate: [
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
        ],
      },
    ];
    const userWallPost = await Models.users.user
      .findOne({ _id: payload.userId }, { myWall: 1, username: 1 })
      .populate(populateModel)
      .lean();
    responses.postList["totalUserPost"] = 0;
    if (userWallPost && userWallPost.myWall && userWallPost.myWall.length)
      responses.postList["totalUserPost"] = userWallPost.myWall.length;
    responses.postList["username"] = userWallPost.username;
    responses.postList["userWallPosts"] = userWallPost.myWall || [];
    return responses.postList;
  },
};
