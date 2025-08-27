import { Router } from "express";
// import getController from "./controllers/get.js";
import RegisterController from "./controllers/register.js";
import LoginController from "./controllers/login.js";
import LogoutController from "./controllers/logout.js";
import { deleteAccountController } from "./controllers/delete.js";
import { updateAccountController } from "./controllers/update.js";
import GetUserProfileController from "./controllers/get.js";
import authMiddleware from "../../middlewares/auth.js"; // JWT token checker

const router = Router();



router.post('/register',  RegisterController)
router.post('/login',  LoginController)
router.post("/logout",authMiddleware, LogoutController);

router.get("/my-profile", authMiddleware , GetUserProfileController);
router.delete("/delete-account", authMiddleware, deleteAccountController);
router.put("/update-account", authMiddleware, updateAccountController);

export default router;