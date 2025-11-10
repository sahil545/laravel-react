import { RequestHandler } from "express";

const LARAVEL_API_URL = "https://ecommerce.standtogetherhelp.com/api";

export interface Vendor {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  photo: string | null;
  role: string;
  username: string;
  status: number;
  phone_number: string | null;
  address: string | null;
  social_id: string | null;
  social_type: string | null;
  created_at: string;
  updated_at: string;
}

interface VendorsResponse {
  status: boolean;
  data: Vendor[];
}

export const handleGetVendors: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(`${LARAVEL_API_URL}/users`);

    if (!response.ok) {
      throw new Error(`Laravel API responded with status ${response.status}`);
    }

    const data: VendorsResponse = await response.json();

    if (data.status && Array.isArray(data.data)) {
      const vendors = data.data.filter(
        (user: Vendor) => user.role === "vendor" && user.status === 1,
      );
      return res.json({ status: true, data: vendors });
    }

    res.json({ status: false, data: [] });
  } catch (error) {
    console.error("Error fetching vendors from Laravel API:", error);
    res.status(500).json({
      status: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
