import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (name: string, email: string) => {
  await transporter.sendMail({
    from: `"TheSaviour" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to TheSaviour! 🎉",
    html: `
      <h2>Welcome ${name}!</h2>
      <p>Thank you for joining TheSaviour — a blockchain crowdfunding platform.</p>
      <p>You can now create campaigns and donate to causes you believe in!</p>
      <br/>
      <a href="https://thesaviour-static.vercel.app">Visit TheSaviour</a>
    `,
  });
};

export const sendDonationEmail = async (
  ownerEmail: string,
  ownerName: string,
  campaignTitle: string,
  amount: string,
  donorAddress: string
) => {
  await transporter.sendMail({
    from: `"TheSaviour" <${process.env.EMAIL_USER}>`,
    to: ownerEmail,
    subject: `New Donation on "${campaignTitle}"! 💰`,
    html: `
      <h2>Hi ${ownerName}!</h2>
      <p>Your campaign <strong>${campaignTitle}</strong> received a new donation!</p>
      <p>Amount: <strong>${amount} POL</strong></p>
      <p>From: ${donorAddress}</p>
      <br/>
      <a href="https://thesaviour-static.vercel.app">View Campaign</a>
    `,
  });
};