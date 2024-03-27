import UserModel from "../models/userModels.js";
import PostModel from "../models/postModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

const secret = "oimnadsijopqewijo23r90-2r3jko9-fmopl";

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.create({
      username,
      password: bcrypt.hashSync(password, 12),
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Your registiration failed" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(500).json({ message: `Not found with this ${username}` });
  }
  const passOK = bcrypt.compareSync(password, user.password);
  if (passOK) {
    jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
      if (err) {
        throw err;
      }
      res.cookie("token", token).json({
        username,
        id: user._id,
      });
    });
  } else {
    return res.status(400).json({ message: `Wrong credintials` });
  }
};

const logged = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};

const createPost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const post = await PostModel.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(post);
  });
};

const getPosts = async (req, res) => {
  const posts = await PostModel.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
};

export { register, login, logged, logout, createPost, getPosts };
