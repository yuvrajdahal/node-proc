import { Router } from "express";
import AuthController from "./auth-controller";

export default class AuthRouter {
  static get routes(): Router {
    const router = Router();
    const authController = new AuthController();

    router.route("/login").post(authController.login);
    router.route("/register").post(authController.register);
    router.route("/me").get(authController.me);
    return router;
  }
}
