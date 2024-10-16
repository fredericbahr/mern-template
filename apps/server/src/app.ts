/*
 * COPYRIGHT (C) 2023 Frederic Bahr
 *
 * The PROGRAM is protected by national and international copyright laws and conventions.
 * The copyright lies with Frederic Bahr, unless expressly stated otherwise.
 * All rights reserved.
 * Especially the reproduction and distribution of the PROGRAM without written permission of
 * the copyright owner is prohibited.
 *
 * See LICENSE for licensing information.
 */

import cors, { CorsOptions } from "cors";
import express from "express";

import { limiter } from "./middleware/rate-limiter";
import { routeLoggerConsole, routeLoggerFile } from "./middleware/route-logger";

import { systemRouter } from "./routes/system-routes";

export const createServer = (): express.Express => {
  const server: express.Express = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
  };

  server.use(cors(corsOptions));
  server.use(routeLoggerConsole);
  server.use(routeLoggerFile);
  server.use(limiter);

  /** unproteced routes */
  server.use("/", systemRouter);

  /** protected routes */

  /** static sources */

  return server;
};
