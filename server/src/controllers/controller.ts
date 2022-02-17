import { Request, Response } from "express";
import { httpOK } from "../config/statusCode";

export const getHome = async (req: Request, res: Response) => {
  res.status(httpOK).json({ test: "Backend replied" });
};
