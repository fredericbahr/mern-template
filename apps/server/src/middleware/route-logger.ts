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

import morgan from "morgan";
import path from "path";
import { createStream } from "rotating-file-stream";

/** function to pad a number */
const pad = (number: number): string => (number > 9 ? "" : "0") + number;

/**
 * Function to generate a file name for the log file rotation
 * @param time - the time to generate the file name for
 * @returns the file name
 */
const fileNameGenerator = (time: number | Date) => {
  if (!time) return "requests.log";

  const year: number = (time as Date).getFullYear();
  const month: string = pad((time as Date).getMonth() + 1);
  const day: string = pad((time as Date).getDate());

  return `requests-${year}-${month}-${day}.log`;
};

/**
 * morgan logger for routes that logs the method, url, status, response time and total time to the console.
 */
export const routeLoggerConsole = morgan(":method :url :status :response-time ms :total-time ms");

/**
 * morgan logger for routes that logs the method, url, status, response time and total time to a rotating file
 */
export const routeLoggerFile = morgan(":method :url :status :response-time ms :total-time ms", {
  stream: createStream(fileNameGenerator, {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "../../logs/requests"),
  }),
});
