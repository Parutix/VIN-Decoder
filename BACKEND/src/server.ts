import express from "express";
import userRouter from "./routes/user_routes";
import decodeRouter from "./routes/decode_routes";
import resultRouter from "./routes/result_routes";
import {
  connectToDatabase,
  connectToDatabaseResults,
} from "./database/database";

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/decoder", decodeRouter);
app.use("/api/results", resultRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const initializeDatabases = async () => {
  try {
    await connectToDatabase();
    await connectToDatabaseResults();
  } catch (error) {
    console.error("Error connecting to databases:", error);
  }
};

initializeDatabases();
