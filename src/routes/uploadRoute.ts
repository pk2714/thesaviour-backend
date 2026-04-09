import express from "express";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ url: (req.file as any).path });
});

export default router;