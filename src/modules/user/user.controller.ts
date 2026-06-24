import { Response, NextFunction } from "express";
import { UserService } from "./user.service";
import { AuthRequest } from "../../types";
import { ApiResponse } from "../../utils/ApiResponse";

const userService = new UserService();

export class UserController {
  async register(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.register(name, email, password);
      res.status(201).json(new ApiResponse("User registered", user));
    } catch (err) {
      next(err);
    }
  }

  async login(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      res.status(200).json(new ApiResponse("Login successful", result));
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await userService.getProfile(req.user!.id); // no error now
      res.status(200).json(new ApiResponse("Profile fetched", user));
    } catch (err) {
      next(err);
    }
  }
}
