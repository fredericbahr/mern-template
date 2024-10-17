import express, { Router } from "express";
import { getRoot, handleHealthCheck } from "../controllers/system-controller";

const systemRouter: Router = express.Router();

/**
 * Handles the root route.
 * @see getRoot
 */
systemRouter.get("/", getRoot);

/**
 * Handles the health check route.
 * @see handleHealthCheck
 */
systemRouter.get("/health", handleHealthCheck);

export { systemRouter };
