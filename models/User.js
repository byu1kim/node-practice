const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
