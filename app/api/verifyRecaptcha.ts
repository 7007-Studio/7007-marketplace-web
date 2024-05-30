import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface RecaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recaptchaToken } = req.body;

  try {
    const response = await axios.post<RecaptchaResponse>(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    );

    const { success } = response.data;

    if (!success) {
      return res.status(400).json({ message: "Invalid reCAPTCHA" });
    }

    // reCAPTCHA 验证成功，继续处理请求
    res.status(200).json({ message: "reCAPTCHA verified successfully" });
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    res.status(500).json({ message: "reCAPTCHA verification failed" });
  }
}
