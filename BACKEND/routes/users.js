import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World. This is a Page!");
});

router.get("/about", (req, res) => {
  res.send("About Us");
});

export default router;
