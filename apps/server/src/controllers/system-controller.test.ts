import { getRoot, handleHealthCheck } from "./system-controller";
import { Request, Response } from "express";

describe("#controller test", () => {
  test("#getRoot", async () => {
    const req: Request = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    
    getRoot(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ test: "Backend replied" });
  });
});
