"use strict";
class RequestService {
  RequestService() {}
  reqHelper(req) {
    // Send username and login status to view if authenticated.
    if (req.isAuthenticated()) {
      return { authenticated: true, username: req.user.username };
    } // Send logged out status to form if not authenticated.
    else {
      return { authenticated: false };
    }
  }
}
export default new RequestService();