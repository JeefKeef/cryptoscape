const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    commentId: {
      type: String,
    },
    desc: {
      type: String,
      max: 200,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    replies: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", ReplySchema);
