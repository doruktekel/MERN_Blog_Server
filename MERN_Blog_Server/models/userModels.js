import mongoose from "mongoose";

const usermodel = new mongoose.Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", usermodel);
export default UserModel;
