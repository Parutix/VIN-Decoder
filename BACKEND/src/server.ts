import express from "express";
import userRouter from "./routes/user_routes";
import decodeRouter from "./routes/decode_routes";
import connectToDatabase from "./database/database";
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/decoder", decodeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

(async () => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();
