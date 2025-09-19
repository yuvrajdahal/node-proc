import { Router } from "express";
import AuthRouter from "./feature/auth/auth-router";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    
    router.use("/auth", AuthRouter.routes);

    return router;
  }
}
