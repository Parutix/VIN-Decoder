import { getConnection } from "typeorm";
import Result from "../entities/resultEntity";

export const create_result = async (result: Result) => {
  try {
    const connection = getConnection("secondaryConnection");
    const newResult = connection.getRepository(Result).create(result);
    await connection.getRepository(Result).save(newResult);
    return true;
  } catch (error) {
    console.error("Error creating result:", error);
    return false;
  }
};

export const get_last_ten_results = async (user_id: number) => {
  try {
    const connection = getConnection("secondaryConnection");
    const results = await connection.getRepository(Result).find({
      where: { user_id },
      order: { id: "DESC" },
      take: 10,
    });
    return results;
  } catch (error) {
    console.error("Error getting results:", error);
    return null;
  }
};
