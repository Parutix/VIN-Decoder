import { createConnection, Connection } from "typeorm";
import User from "../entities/userEntity";
import Result from "../entities/resultEntity";

export async function connectToDatabase(): Promise<Connection> {
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
    console.log(
      "Connected to the primary database" +
        connection.options.database +
        " " +
        connection.options.entities
    );
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

export async function connectToDatabaseResults(): Promise<Connection> {
  try {
    const connection = await createConnection({
      name: "secondaryConnection",
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "cars",
      synchronize: true,
      logging: false,
      entities: [Result],
    });
    console.log(
      "Connected to the database: " +
        connection.options.database +
        " " +
        connection.options.entities
    );
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}
