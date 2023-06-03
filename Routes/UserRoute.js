const express = require("express");
const router = express.Router();
const userController = require('../Controllers/UserController')
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");



// operations about user
router
  .route("/register")
  /**
   * @api {get} / get user's collection
   * @apiDescription Get All the users
   * @apiPermission everyone  can see access
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} all the users
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only admin can access the data
   */
  .get(userController.getAllUser)
  /**
   * @api {post} / create a new user account
   * @apiDescription create new user account
   * @apiPermission everyone can create account
   * @apiHeader empty
   * @apiSuccess {Object[]} successfully create a new account
   * @apiError  Couldn't register
   */
  .post(userController.registerUser);

router
  .route("/login")
  /**
   * @api {post} / post exists user
   * @apiDescription Login exists user
   * @apiPermission anyone can login after register
   * @apiSuccess {Object[]} successfully login
   * @apiError  User doesn't exists
   */ .post(userController.login);

// router.get("/me", verifyToken, userController.getMe);

router
  .route("/register/admin/:id")
  /**
   * @api {get} / get admin collection
   * @apiDescription Get All admin
   * @apiPermission anyone could be checked if he is admin or not
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} all the admins
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only admin can access the data
   */
  .get(userController.getAdmin)
  /**
   * @api {put} / update an admin
   * @apiDescription make a user an Admin
   * @apiPermission only admin can access this
   * @apiHeader {string} Authorization User's access token
   * @apiSuccess {Object[]} all the admins
   * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
   * @apiError  (Forbidden 403)  Forbidden  Only admin can access the data
   */
  .put(verifyToken, authorization("super-admin"), userController.makeUserAdmin);

// router
//   .route("/register/change-password/:id")
//   /**
//    * @api {patch} / update a users password
//    * @apiDescription a user can update their password
//    * @apiPermission any one can change their password
//    * @apiHeader {string} Authorization User's access token
//    * @apiSuccess {Object[]} password is changed
//    * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
//    * @apiError  (Forbidden 403)  Forbidden  Only authenticated person can access the data
//    */
//   .patch(verifyToken, userController.changePassword);

// router.route("/:id");
// // .get(userController.getAUserByID)
// router.route("/register/verify").post(userController.verifyOtp);

// router
//   .route("/register/:id")
//   /**
//    * @api {get} / load a user
//    * @apiDescription load a user with their id
//    * @apiPermission everyone can see their profile with their register id
//    */
//   .get(userController.getAUserByID)
//   /**
//    * @api {put} / update profile
//    * @apiDescription update user's and admin's profile
//    * @apiPermission everyone can update their profile with their register id
//    * @apiHeader {string} Authorization User's access token
//    * @apiSuccess {Object[]} update successful
//    * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
//    * @apiError  (Forbidden 403)  Forbidden  Only authenticated person can access the data
//    */
//   .put(
//     // verifyToken,
//     // uploader.single("imageURL"),
//     uploader.fields([{ name: "imageURL", maxCount: 1 }, { name: "binFile", maxCount: 1 }, { name: "tinFile", maxCount: 1 }, { name: "nidFile", maxCount: 1 },]),
//     userController.UpdateProfileById
//   )
//   /**
//      * @api {delete} / delete a user
//      * @apiDescription update user's and admin's profile
//      * @apiPermission everyone can update their profile with their register id
//      * @apiHeader {string} Authorization User's access token
//      * @apiSuccess {Object[]} update successful
//      * @apiError  (Unauthorized 401)  Unauthorized  Only authenticated person can access the data
//      * @apiError  (Forbidden 403)  Forbidden  Only authenticated person can access the data
//      */
//   .delete(verifyToken, authorization("super-admin"), userController.deleteAUserByID);


// router.route("/register2/:id").put(verifyToken, authorization("super-admin", "co-admin"), userController.makeUserVerified)

// user logout and update status into inactive
// router.route("/register/updateStatus/:id").put(verifyToken, userController.userLogOut);

module.exports = router;
