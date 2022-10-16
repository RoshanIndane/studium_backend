const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  salary: { type: Number },
  profileImage: { type: String },
  designation: { type: String, required: true },
  userName: { type: String, required: true },
  paidStatus: { type: Number, required: true },
},{
  timestamps:false,
  versionKey:false

});

const User = mongoose.model("User", UserSchema);

module.exports = User;
