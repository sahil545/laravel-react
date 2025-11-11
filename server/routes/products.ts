import { RequestHandler } from "express";

const LARAVEL_API_URL = "https://ecommerce.standtogetherhelp.com/api";

export interface Product {
  product_id: number;
  product_name: string;
  product_code: string;
  product_tags: string;
  product_colors: string;
  product_short_description: string;
  product_long_description: string | null;
  product_slug: string;
  product_price: number;
  product_thumbnail: string;
  product_status: string;
  sub_category_id: number;
  brand_id: number;
  vendor_id: number;
  product_quantity: number;
  gallery_images?: string[];
}

interface ProductsResponse {
  status: boolean;
  data: Product[];
}

export const handleGetProducts: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(`${LARAVEL_API_URL}/products`);

    if (!response.ok) {
      throw new Error(`Laravel API responded with status ${response.status}`);
    }

    const data: ProductsResponse = await response.json();

    if (data.status && Array.isArray(data.data)) {
      const activeProducts = data.data.filter(
        (product) => product.product_status === "1",
      );
      return res.json({ status: true, data: activeProducts });
    }

    res.json({ status: false, data: [] });
  } catch (error) {
    console.error("Error fetching products from Laravel API:", error);
    res.status(500).json({
      status: false,
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
