import Mongoose, { Schema } from "mongoose";

const env = require("../env");

if (env.instance == "dev") {
  Mongoose.set("debug", true); // console mongo queries
}

const postSchema = new Schema({
  title: { type: String },
  post: { type: String },
  creationUser: { type: Schema.Types.ObjectId, ref: "user" },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date },
  is_blocked: { type: Boolean, default: false },
  is_reported: { type: Boolean, default: false },
  reply_count: { type: Number, default: 0 },
  post_reply: [
    {
      reply: { type: String },
      replied_at: { type: Date, default: Date.now },
      user_id: { type: Schema.Types.ObjectId, ref: "user" },
      reply_like: [{ type: Schema.Types.ObjectId, ref: "user" }],
      reply_likes_count: { type: Number, default: 0 },
      reply_dislike: [{ type: Schema.Types.ObjectId, ref: "user" }],
      reply_dislikes_count: { type: Number, default: 0 },
    },
  ],
  post_like: [
    {
      liked_at: { type: Date, default: Date.now },
      user_id: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],
  likes_count: { type: Number, default: 0 },
  post_dislike: [
    {
      disliked_at: { type: Date, default: Date.now },
      user_id: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],
  dislikes_count: { type: Number, default: 0 },
});

const post = Mongoose.model("post", postSchema);

module.exports = {
  post: post,
};
