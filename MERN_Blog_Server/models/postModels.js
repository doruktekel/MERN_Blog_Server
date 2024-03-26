import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
