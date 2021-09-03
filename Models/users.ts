const Mongoose = require("mongoose"),
  Schema = Mongoose.Schema;

const env = require("../env");

if (env.instance == "dev") {
  Mongoose.set("debug", true); // console mongo queries
}

const UserSchema = new Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  login_token: { type: String, default: 0 },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date },
  myWall: [{ type: Schema.Types.ObjectId, ref: "post" }], // Will store post ID created by me or created by some one on my
});

const user = Mongoose.model("user", UserSchema);

module.exports = {
  user: user,
};
