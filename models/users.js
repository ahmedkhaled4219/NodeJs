const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
    },
    firstname: {
      type: String,
      required: true,
      minLength: 3,
      maxLenght: 15,
    },
    lastname: {
      type: String,
      required: true,
      minLength: 3,
      maxLenght: 15,
    },
    dob: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  [
    {
      toJSON: {
        transform: (doc, ret) => {
          ret.password = undefined;
          return ret;
        },
      },
    },
    {
      timestamps: true,
    },
  ]
);

usersSchema.pre("save", async function preSave(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

usersSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
