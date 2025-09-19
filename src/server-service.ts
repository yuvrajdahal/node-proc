import {
  IncomingMessage,
  type ServerResponse,
  type Server as HttpServer,
} from "http";
import { createServer, type ServerOptions } from "https";

import cors, { CorsOptions } from "cors";
import express, { Router, Request, Response, NextFunction } from "express";
import { HTTPStatusCode } from "./config/constant";
import { AppError } from "./lib/error";
import { ErrorMiddleware } from "./middleware/error-middleware";

interface ServerOption {
  port: number;
  routes: Router;
  apiPrefix: string;
  corsOption: CorsOptions;
  serverCertificateOptions?: ServerOptions;
}

export class Server {
  public readonly app = express();

  private readonly port: number;
  private readonly routes: Router;
  private readonly apiPrefix: string;
  private readonly corsOption: CorsOptions;
  private readonly certificate?: ServerOptions;
  private serverListner?: HttpServer<
    typeof IncomingMessage,
    typeof ServerResponse
  >;

  constructor(serverOption: ServerOption) {
    this.port = serverOption.port;
    this.routes = serverOption.routes;
    this.apiPrefix = serverOption.apiPrefix;
    this.corsOption = serverOption.corsOption;
    this.certificate = serverOption.serverCertificateOptions;
  }
  async start(): Promise<void> {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(this.corsOption)); 

    
    this.app.get("/", (req: Request, res: Response) => {
      res.status(HTTPStatusCode.Ok).json({
        status: "ok",
        message: "Welcome to TaskHive API",
      });
    });

    this.app.use(this.apiPrefix, this.routes);

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(AppError.notFound(`Cannot find ${req.originalUrl} on this server!`));
    });

    this.app.use(ErrorMiddleware.handleError);
    if (this.certificate) {
      const httpsServer = createServer(this.certificate, this.app);
      this.serverListner = httpsServer.listen(this.port, () => {
        console.log(`HTTPS Server running on PORT: ${this.port}`);
      });
    } else {
      this.serverListner = this.app.listen(this.port, () =>
        console.log(`Server Running on PORT: ${this.port}`)
      );
    }
  }
  close(): void {
    this.serverListner?.close();
  }
}
