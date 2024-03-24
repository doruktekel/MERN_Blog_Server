import UserModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      res.cookie("token", token).json("ok");
    });
  } else {
    return res.status(400).json({ message: `Wrong credintials` });
  }
};

export { register, login };
