import User from "../models/User";

class UserOps {
  // Constructor
  UserOps() {}
  async getUserByEmail(email) {
    let user = await User.findOne({ email: email });
    if (user) {
      const response = { obj: user, errorMessage: "" };
      return response;
    } else {
      return null;
    }
  }
}

export default UserOps;
