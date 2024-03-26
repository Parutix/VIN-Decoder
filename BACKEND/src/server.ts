import express from "express";
import userRouter from "./routes/user_routes";
import database from "./database/database";
const app = express();

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
