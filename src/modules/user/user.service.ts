// Service: business logic lives here
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository";
import { ENV } from "../../config/config";
import { IUser } from "./user.model";
import { ApiError } from "../../utils/ApiError";

const userRepo = new UserRepository();

export class UserService {
  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const existing = await userRepo.findByEmail(email);
    if (existing) throw new ApiError(400, "Email already in use");
    return userRepo.create({ name, email, password });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: IUser; token: string }> {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new ApiError(401, "Invalid credentials");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const token = jwt.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { user, token };
  }

  async getProfile(id: string): Promise<IUser | null> {
    const user = await userRepo.findById(id);
    if (!user) throw new ApiError(404, "User not found");
    return user;
  }
}
