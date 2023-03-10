import mongoose from "mongoose";
import bcrypt from "bcrypt";
import passportLocalmongoose from "passport-local-mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String,
  },
  roles: { type: Array },
});

// Password authentication
userSchema.plugin(passportLocalmongoose);

const User = mongoose.model("User", userSchema);
export default User;
