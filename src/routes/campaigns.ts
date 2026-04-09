import express from "express";
import { saveCampaign, notifyDonation, getCampaigns } from "../controllers/campaignController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/save", authMiddleware, saveCampaign);
router.post("/notify-donation", notifyDonation);
router.get("/", getCampaigns);

export default router;