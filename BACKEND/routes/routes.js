import express from "express";
import db from "../database/database.js";
const router = express.Router();

router.get("/dbstatus", (req, res) => {
  db.connect((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Connected to database");
    }
  });
});

export default router;
