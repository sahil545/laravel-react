const API_BASE_URL = "https://ecommerce.standtogetherhelp.com/api";

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
}

export async function getVendors(): Promise<Vendor[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    const data = await response.json();

    if (data.status && Array.isArray(data.data)) {
      return data.data.filter(
        (user: Vendor) => user.role === "vendor" && user.status === 1,
      );
    }
    return [];
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();

    if (data.status && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export function getProductImageUrl(filename: string): string {
  return `https://ecommerce.standtogetherhelp.com/storage/products/${filename}`;
}
