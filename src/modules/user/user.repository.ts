// Repository: only talks to the database, no business logic
import { UserModel, IUser } from "./user.model";

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).select("-password");
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    return UserModel.create(data);
  }

  async findAll(): Promise<IUser[]> {
    return UserModel.find().select("-password");
  }
}
