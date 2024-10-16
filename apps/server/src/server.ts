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

import * as dotenv from "dotenv";
dotenv.config();

import { createServer } from "./app";

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const server = createServer();

/**
 * Handle server errors
 * @param err - The error to handle
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (err: any): void => {
  if (err?.code === "EADDRINUSE") {
    console.log(`Port ${err.port} is already in use, trying port ${err.port + 1}`);
    startServer(err.port + 1);
    return;
  }

  console.error("Server error:", err);
};

/**
 * Start the server
 * @param port - The port to start the server on
 */
const startServer = (port: number): void => {
  server
    .listen(port, () => {
      console.log(`Server started on port ${port}:`);
      console.log(`http://localhost:${port}`);
    })
    .on("error", handleError);
};

startServer(port);
