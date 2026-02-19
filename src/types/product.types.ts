export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  sellerId: string;
  sellerName?: string;
  sellerRating?: number;
  createdAt: string;
  /** @deprecated use imageUrls instead */
  imageUrl?: string;
  imageUrls?: string[];
};

export type AddProductPayload = {
  title: string;
  description: string;
  price: number;
  sellerId: string;
  sellerName?: string;
  sellerRating?: number;
  imageUrls?: string[];
};

export type UpdateProductPayload = {
  title?: string;
  description?: string;
  price?: number;
  imageUrls?: string[];
};
