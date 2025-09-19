import { AppRoutes } from "./src/routes";
import { Server } from "./src/server-service";

(() => {
  bootstrap();
})();

function bootstrap(): void {
  new Server({
    apiPrefix: "/api",
    port: Number(process.env.port) || 5000,
    routes: AppRoutes.routes,
    corsOption: {
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    },
  }).start();
}
