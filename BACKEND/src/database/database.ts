import { createConnection, Connection } from "typeorm";
import User from "../entities/userEntity";

async function connectToDatabase(): Promise<Connection> {
  try {
    const connection = await createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "cars",
      synchronize: true,
      logging: false,
      entities: [User],
    });
    console.log("Connected to the database");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

export default connectToDatabase;
