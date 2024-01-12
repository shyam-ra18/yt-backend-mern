import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  logOutUser,
  loginUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
router.post("/login", loginUser);

//Secured Routes
router.post("/logout", verifyJWT, logOutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/changePassword", verifyJWT, changeCurrentPassword);
router.get("/currentUser", verifyJWT, getCurrentUser);
router.patch("/updateAccount", verifyJWT, updateAccountDetails);
router.patch(
  "/updateAvatar",
  verifyJWT,
  upload.single("avatar"),
  updateUserAvatar
);
router.patch(
  "/updateCoverImage",
  verifyJWT,
  upload.single("coverImage"),
  updateUserCoverImage
);
router.get("/channel/:username", verifyJWT, getUserChannelProfile);
router.get("/history", verifyJWT, getWatchHistory);

export default router;
