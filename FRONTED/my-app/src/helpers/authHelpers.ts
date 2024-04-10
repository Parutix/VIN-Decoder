export const isValidToken = async (token: String) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/users/verifyToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
