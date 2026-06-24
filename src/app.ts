import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/error.middleware";
import { connectDB } from "./config/db";
import { ENV } from "./config/config";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Error handler (must be last)
app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(ENV.PORT, () => console.log(`Server running on port ${ENV.PORT}`));
});
