import { Request, Response } from "express";
import Campaign from "../models/Campaign";
import { sendDonationEmail } from "../utils/emailService";
import { AuthRequest } from "../middleware/auth";

export const saveCampaign = async (req: AuthRequest, res: Response) => {
  try {
    const { contractId, title, description, imageUrl, goalAmount, owner, ownerEmail, ownerName } = req.body;

    const existing = await Campaign.findOne({ contractId });
    if (existing) {
      return res.status(400).json({ message: "Campaign already exists" });
    }

    const campaign = await Campaign.create({
      contractId, title, description, imageUrl, goalAmount, owner, ownerEmail, ownerName
    });

    res.status(201).json({ message: "Campaign saved!", campaign });
  } catch (error) {
    console.error("Save campaign error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const notifyDonation = async (req: Request, res: Response) => {
  try {
    const { contractId, amount, donorAddress } = req.body;

    const campaign = await Campaign.findOne({ contractId });
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (campaign.ownerEmail) {
      try {
        await sendDonationEmail(
          campaign.ownerEmail,
          campaign.ownerName || "Campaign Owner",
          campaign.title,
          amount,
          donorAddress
        );
      } catch (emailError) {
        console.error("Email error:", emailError);
      }
    }

    res.json({ message: "Notification sent!" });
  } catch (error) {
    console.error("Notify donation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};