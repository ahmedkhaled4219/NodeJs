const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
    },
    status: {
      type: String,
      required: false,
      default: "to-do",
    },
    tags: {
      type: [String],
      required: false,
      maxLength: 10,
      validate: {
        validator: function (arr) {
          return arr.every((tag) => tag.length <= 10);
        },
        message: "Each tag must be at most 10 characters",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Todos = mongoose.model("Todos", todosSchema);
module.exports = Todos;
