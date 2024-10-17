import { Request, Response } from "express";
import { statusCodes } from "../config/statusCode";

/**
 * Get the root of the API
 * @param req - Request object
 * @param res - Response object
 */
export const getRoot = (req: Request, res: Response): void => {
  res.status(statusCodes.httpOK).send("Backend Server. Die API ist unter /api erreichbar.");
};

/**
 * Handle the health check
 * @param req - Request object
 * @param res - Response object
 */
export const handleHealthCheck = (req: Request, res: Response): void => {
  res.status(statusCodes.httpOK).json({ status: "OK" });
};
